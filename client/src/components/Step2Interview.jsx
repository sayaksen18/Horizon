import { useState, useRef, useEffect } from "react";
import { motion } from "motion/react";
import maleVideo from "../assets/Videos/male-ai.mp4";
import femaleVideo from "../assets/Videos/female-ai.mp4";
import Timer from "./Timer";
import { FaMicrophone, FaMicrophoneSlash } from "react-icons/fa";
import axios from "axios";
import { ServerUrl } from "../App.jsx";
import { BsArrowRight } from "react-icons/bs";


const Step2Interview = ({ interviewData, onFinish }) => {
  const { interviewId, questions, userName } = interviewData;
  const [isIntroPhase, setIsIntroPhase] = useState(true);
  const [isMicOn, setIsMicOn] = useState(true);
  const recognitionRef = useRef(null);
  const [isAISpeaking, setIsAISpeaking] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [timeLeft, setTimeLeft] = useState(questions[0]?.timeLimit || 60);
  const [selectedVoice, setSelectedVoice] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [voiceGender, setVoiceGender] = useState("female");
  const [subtitle, setSubtitle] = useState("");
  const videoRef = useRef(null);
  const currentQuestion = questions[currentIndex];
  const startMic = () => {
    if (recognitionRef.current && !isAISpeaking) {
      try {
        recognitionRef.current.start();
      } catch { }
    }
  };

  const stopMic = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
  }
  useEffect(() => {
    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      if (!voices.length) return;
      const femaleVoice = voices.find(
        (voice) =>
          voice.name.toLowerCase().includes("zira") ||
          voice.name.toLowerCase().includes("samantha") ||
          voice.name.toLowerCase().includes("female"),
      );
      if (femaleVoice) {
        setSelectedVoice(femaleVoice);
        setVoiceGender("female");
        return;
      }
      const maleVoice = voices.find(
        (voice) =>
          voice.name.toLowerCase().includes("david") ||
          voice.name.toLowerCase().includes("mark") ||
          voice.name.toLowerCase().includes("male"),
      );
      if (maleVoice) {
        setSelectedVoice(maleVoice);
        setVoiceGender("male");
        return;
      }
      setSelectedVoice(voices[0]);
      setVoiceGender("female");
    };
    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }, []);
  const videoSource = voiceGender === "male" ? maleVideo : femaleVideo;
  const speakText = (text) => {
    return new Promise((resolve) => {
      if (!window.speechSynthesis || !selectedVoice) {
        resolve();
        return;
      }
      window.speechSynthesis.cancel();

      const humanText = text.replace(/,/g, ", ... ").replace(/\./g, ". ... ");

      const utterance = new SpeechSynthesisUtterance(humanText);
      utterance.voice = selectedVoice;

      utterance.rate = 0.92;
      utterance.pitch = 1.05;
      utterance.volume = 1;

      utterance.onstart = () => {
        setIsAISpeaking(true);
        stopMic();
        videoRef.current?.play();
      };

      utterance.onend = () => {
        videoRef.current?.pause();
        videoRef.current.currentTime = 0;
        setIsAISpeaking(false);
        if(isMicOn) {
          startMic();
        }
        setTimeout(() => {
          setSubtitle("");
          resolve();
        }, 300);
      };
      setSubtitle(text);
      window.speechSynthesis.speak(utterance);
    });
  };
  useEffect(() => {
    if (!selectedVoice) return;
    const runIntro = async () => {
      if (isIntroPhase) {
        await speakText(
          `Hello ${userName}, welcome to your AI smart interview. I am your virtual interviewer and I will be asking you a series of questions. Let's get started!`,
        );
        await speakText(
          `I will ask you a question, you will have 60 seconds to answer. You can speak your answer or type it in the box. After you submit, I will provide feedback and move on to the next question. Let's begin!`,
        );
        setIsIntroPhase(false);
      } else if (currentQuestion) {
        await new Promise((resolve) => setTimeout(resolve, 800));
        if (currentIndex === questions.length - 1) {
          await speakText(
            "This is the last question. This will be a bit more challenging. But don't worry, just do your best and be yourself. Good luck!",
          );
        }
        await speakText(currentQuestion.question);
        if(isMicOn) {
          startMic();
        }
      }
    };
    runIntro();
  }, [selectedVoice, isIntroPhase, currentIndex]);

  useEffect(() => {
    if(isIntroPhase) return;
    if(!currentQuestion) return;
    const timerInterval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerInterval);
          return 0;
        }
        return prev - 1;
      })
    },1000);
    return () => clearInterval(timerInterval);
  }, [isIntroPhase, currentIndex]);

  useEffect(() => {
    if(!isIntroPhase && currentQuestion) {
        setTimeLeft(currentQuestion?.timeLimit || 60);
    }
  },[currentIndex])

  useEffect(() => {
    if(!("webkitSpeechRecognition" in window)){
      console.warn("Speech Recognition API not supported in this browser.")
      return;
    }
    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.continuous = true;

    recognition.onresult = (event) => {
      const transcript = event.results[event.results.length - 1][0].transcript;
      setAnswer((prev) => prev + " " + transcript);
    };
    recognitionRef.current = recognition;
  },[])
  const toggleMic = () => {
    if(isMicOn){
      stopMic();
    } else {
      startMic();
    }
    setIsMicOn(!isMicOn);
  };
  const submitAnswer = async () => {
    if(isSubmitting) return;
    stopMic();
    setIsSubmitting(true);
    try{
      const result = await axios.post(`${ServerUrl}/api/interview/submit-answer`, {
        interviewId,
        questionIndex: currentIndex,
        answer,
        timeTaken: currentQuestion.timeLimit - timeLeft,
      }, { withCredentials: true });
      setFeedback(result.data.feedback);
      speakText(result.data.feedback);
      setIsSubmitting(false);
    }catch(error){
      console.error("Error submitting answer:", error);
      setIsSubmitting(false);
    }
  }
  const finishInterview = async () => {
    stopMic();
    setIsMicOn(false);
    try{
      const result = await axios.post(`${ServerUrl}/api/interview/finish`, {
        interviewId,
      }, { withCredentials: true });
      console.log(result.data);
      onFinish(result.data);
    }catch(error){
      console.log("Error finishing interview:", error);
    }
  }
  const handleNext = async () =>{
    setAnswer("");
    setFeedback("");
    if(currentIndex + 1 >= questions.length) {
      finishInterview();
      return;
    }
    await speakText("Next question coming up.");
    setCurrentIndex(currentIndex + 1);
    setTimeout(() => {
      if(isMicOn) {
        startMic();
      }
    }, 500);
  }
  useEffect(() => {
    if(isIntroPhase) return;
    if(!currentQuestion) return;
    if(timeLeft === 0 && !isSubmitting && !feedback) {
      submitAnswer();
    }
  },[timeLeft])

  useEffect(() => {
    return () => {
      if(recognitionRef.current) {
        recognitionRef.current.stop();
        recognitionRef.current.abort();
      }
      window.speechSynthesis.cancel();
    }
  },[])


  return (
    <div className='min-h-screen bg-linear-to-br from-emerald-50 via-white to-teal-100 flex items-center justify-center p-4 sm:p-6'>
      <div className='w-full max-w-350 min-h-[80vh] bg-white rounded-3xl shadow-2xl border border-gray-200 flex flex-col lg:flex-row overflow-hidden'>
        {/* video section */}
        <div className='w-full lg:w-[35%] bg-white flex flex-col items-center p-6 space-y-6 border-r border-gray-200'>
          <div className='w-full max-w-md rounded-2xl overflow-hidden shadow-xl'>
            <video
              src={videoSource}
              key={videoSource}
              ref={videoRef}
              muted
              playsInline
              preload="auto"
              className="w-full h-auto object-cover"
            />
          </div>
          {/* subtitle */}
          {subtitle && (
            <div className='w-full max-w-md bg-gray-50 border border-gray-200 rounded-xl p-4 shadow-sm'>
              <p className='text-gray-700 text-sm sm:text-base font-medium text-center leading-relaxed'>{subtitle}</p>
            </div>
          )}
          {/* timer Area */}
          <div className='w-full max-w-md bg-white border border-gray-200 rounded-2xl shadow-md p-6 space-y-5'>
            <div className='flex justify-between items-center'>
              <span className='text-sm text-gray-500'>
                Interview Status
              </span>
              {isAISpeaking && <span className='text-sm font-semibold text-emerald-600'>
                {isAISpeaking ? "AI Speaking" : ""}
              </span>}
            </div>

            <div className="h-px bg-gray-200"></div>

            <div className='flex justify-center'>

              <Timer timeLeft={timeLeft} totalTime={currentQuestion?.timeLimit} />
            </div>

            <div className="h-px bg-gray-200"></div>

            <div className='grid grid-cols-2 gap-6 text-center'>
              <div>
                <span className='text-2xl font-bold text-emerald-600'>{currentIndex + 1}</span>
                <span className='text-xs text-gray-400'>Current Questions</span>
              </div>

              <div>
                <span className='text-2xl font-bold text-emerald-600'>{questions.length}</span>
                <span className='text-xs text-gray-400'>Total Questions</span>
              </div>
            </div>


          </div>
        </div>

        {/* Text section */}

        <div className='flex-1 flex flex-col p-4 sm:p-6 md:p-8 relative'>
          <h2 className='text-xl sm:text-2xl font-bold text-emerald-600 mb-6'>
            AI Smart Interview
          </h2>


          {!isIntroPhase && (<div className='relative mb-6 bg-gray-50 p-4 sm:p-6 rounded-2xl border border-gray-200 shadow-sm'>
            <p className='text-xs sm:text-sm text-gray-400 mb-2'>
              Question {currentIndex + 1} of {questions.length}
            </p>

            <div className='text-base sm:text-lg font-semibold text-gray-800 leading-relaxed '>{currentQuestion?.question}</div>
          </div>)
          }
          <textarea
            placeholder="Type your answer here..."
            onChange={(e) => setAnswer(e.target.value)}
            value={answer}
            className="flex-1 bg-gray-100 p-4 sm:p-6 rounded-2xl resize-none outline-none border border-gray-200 focus:ring-2 focus:ring-emerald-500 transition text-gray-800" />


         {!feedback ? ( <div className='flex items-center gap-4 mt-6'>
            <motion.button
              onClick={toggleMic}
              whileTap={{ scale: 0.9 }}
              className='w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center rounded-full bg-black text-white shadow-lg'>
              {isMicOn ? <FaMicrophone size={20} /> : <FaMicrophoneSlash size={20}/>}
            </motion.button>

            <motion.button
            onClick={submitAnswer}
            disabled={isSubmitting}
              whileTap={{ scale: 0.95 }}
              className='flex-1 bg-gradient-to-r from-emerald-600 to-teal-500 text-white py-3 sm:py-4 rounded-2xl shadow-lg hover:opacity-90 transition font-semibold disabled:bg-gray-500'>
              {isSubmitting?"Submitting...":"Submit Answer"}

            </motion.button>

          </div>):(
            <motion.div 
             initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            className='mt-6 bg-emerald-50 border border-emerald-200 p-5 rounded-2xl shadow-sm'>
              <p className='text-emerald-700 font-medium mb-4'>{feedback}</p>

              <button
              onClick={handleNext}

               className='w-full bg-gradient-to-r from-emerald-600 to-teal-500 text-white py-3 rounded-xl shadow-md hover:opacity-90 transition flex items-center justify-center gap-1'>
                Next Question <BsArrowRight size={18}/>
              </button>

            </motion.div>
          )}
        </div>
      </div>

    </div>
  )
}

export default Step2Interview;
