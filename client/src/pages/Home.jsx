import Navbar from "../components/Navbar"
import { useSelector } from "react-redux"
import { motion } from "motion/react"
import { BsRobot, BsMic, BsClock, BsBarChart, BsFileEarmarkText } from "react-icons/bs"
import { HiSparkles } from "react-icons/hi"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import AuthModel from "../components/AuthModel"
import evalImg from "../assets/ai-ans.png"
import hrImg from "../assets/HR.png"
import techImg from "../assets/tech.png"
import confidenceImg from "../assets/confi.png"
import creditImg from "../assets/credit.png"
import resumeImg from "../assets/resume.png"
import pdfImg from "../assets/pdf.png"
import analyticsImg from "../assets/history.png"
import Footer from "../components/Footer"
const Home = () => {
  const { userData } = useSelector((state) => state.user)
  const [showAuth, setShowAuth] = useState(false)
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-[#f3f3f3] flex flex-col">
      <Navbar />
      <div className="flex-1 px-6 py-20 ">
        <div className="max-w-6xl mx-auto">
        <div className="flex justify-center mb-6">
          <div className="bg-gray-100 text-gray-600 text-sm px-4 py-2 rounded-full flex items-center gap-2">
            <HiSparkles size={16} className="bg-green-50 text-green-600" />
            Welcome to Horizon
          </div>
        </div>

        <div className="text-center mb-28">
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-4xl md:text-6xl font-semibold leading-tight max-w-4xl mx-auto">
            Practice Interviews with
            <span className="relative inline-block"> {/* Fixed "inline block" to "inline-block" */}
              <span className="bg-green-100 text-green-600 px-5 py-1 rounded-full">
                AI Smart Interview
              </span>
            </span>
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }} className="text-gray-500 mt-6 max-w-2xl mx-auto text-lg">
            Role Based Mock Interviews, Instant Feedback and Performance Analytics to Ace Your Next Interview.
          </motion.p>
          <div className="flex flex-wrap justify-center gap-4 mt-10">
            <motion.button onClick={() => {
              if (!userData) {
                setShowAuth(true)
                return;
              }
              navigate("/interview")
            }}
              whileHover={{ opacity: 0.9, scale: 1.03 }} whileTap={{ opacity: 1, scale: 0.98 }} className="bg-black text-white px-10 py-3 rounded-full hover:opacity-90 transition shadow-md"> {/* Fixed "hover:capacity-90" to "hover:opacity-90" */}
              Start Practicing
            </motion.button>
            <motion.button onClick={() => {
              if (!userData) {
                setShowAuth(true)
                return;
              }
              navigate("/history")
            }}
              whileHover={{ opacity: 0.9, scale: 1.03 }} whileTap={{ opacity: 1, scale: 0.98 }} className="border border-gray-300 px-10 py-3 rounded-full hover:bg-gray-100 transition">
              View History
            </motion.button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-center items-center gap-10 mb-28">
          {
            [
              {
                icon: <BsRobot size={24} />,
                step: "STEP 1",
                title: "Select Role and Interview Type",
                desc: "Choose from a variety of roles and interview formats to tailor your practice sessions to your specific needs and goals."
              },
              {
                icon: <BsMic size={24} />,
                step: "STEP 2",
                title: "Smart AI-Generated Interview",
                desc: "Engage in realistic mock interviews with AI-generated questions that adapt to your responses, providing a dynamic and personalized practice experience."
              },
              {
                icon: <BsClock size={24} />,
                step: "STEP 3",
                title: "Get Instant Feedback and Analytics",
                desc: "Receive immediate feedback on your performance, including insights on your strengths and areas for improvement, to help you ace your next interview."
              }
            ].map((item, index) => (
              <motion.div key={index}
                initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 * index }} whileHover={{ rotate: 0, scale: 1.06 }}
                className={`relative bg-white rounded-3xl border-2 border-green-100 hover:border-green-500 p-10 w-80 max-w-[90%] shadow-md hover:shadow-2xl
                transition-all duration-300 ${index === 0 ? "rotate-[-4deg]" : ""} ${index === 1 ? "rotate-[3deg] md:-mt-6 shadow-xl" : ""} ${index === 2 ? "rotate-[-3deg]" : ""}`}> {/* Fixed "rortate-[-4deg]" */}
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white border-2 border-green-500 text-green-600 w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg">
                  {item.icon}
                </div>
                <div className="pt-10 text-center">
                  <div className="text-xs text-green-600 font-semibold mb-2 tracking-wider">{item.step}</div>
                  <h3 className="font-semibold mb-3 text-lg">{item.title}</h3>
                  <p className="text-sm text-gray-500 loading-relaxed">{item.desc}</p>
                </div>
              </motion.div>

            ))
          }
        </div>

        <div className="mb-32">
          <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-4xl font-semibold text-center mb-16">Advanced AI{" "}
            <span className="text-green-600">
              Capabilities
            </span>
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-10">
            {
              [
                {
                  image: evalImg,
                  icon: <BsBarChart size={20} />,
                  title: "AI Answer Evaluation",
                  desc: "Our AI evaluates your interview answers in real-time, providing detailed feedback on content, delivery, and areas for improvement to help you refine your responses and boost your confidence."
                },
                {
                  image: resumeImg,
                  icon: <BsFileEarmarkText size={20} />,
                  title: "Resume Based Interviewing",
                  desc: "Tailor your interview practice to your resume by engaging in targeted mock interviews that focus on your background, experiences, and qualifications."
                },
                {
                  image: pdfImg,
                  icon: <BsFileEarmarkText size={20} />,
                  title: "Downloadable PDF Reports",
                  desc: "Receive comprehensive PDF reports after each interview session, summarizing your performance, feedback, and actionable insights to track your progress and prepare effectively for future interviews."
                },
                {
                  image: analyticsImg,
                  icon: <BsBarChart size={20} />,
                  title: "Performance Analytics And History",
                  desc: "Track your interview performance over time with detailed analytics, including trends, strengths, and areas for improvement, to help you continuously refine your skills and ace your next interview."
                }
              ].map((item, index) => (
                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.1 }} whileHover={{ scale: 1.02 }}
                  key={index} className="bg-white border border-gray-200 rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all">
                    <div className="flex flex-col md:flex-row items-center gap-8">
                      <div className="w-full md:w-1/2 flex justify-center">
                      <img src={item.image} alt={item.title} className="w-full h-auto object-contain max-h-64" />
                      </div>
                      <div className="w-full md:w-1/2">
                       <div className="bg-green-50 text-green-600 w-12 h-12 rounded-xl flex items-center justify-center mb-6">
                        {item.icon}
                      </div>
                      <h3 className="font-semibold mb-3 text-xl">{item.title}</h3>
                      <p className="text-gray-500 text-sm loading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                </motion.div>
              ))
            }
          </div>
        </div>
         <div className="mb-32">
          <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-4xl font-semibold text-center mb-16">Multiple Interview{" "}
            <span className="text-green-600">
              Modes
            </span>
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-10">
            {
              [
                {
                  image: hrImg,
                  title: "HR Interview Mode",
                  desc: "Practice for HR interviews with questions focused on behavioral and situational topics, helping you prepare for the human side of the interview process."
                },
                {
                  image: techImg,
                  title: "Technical Interview Mode",
                  desc: "Sharpen your technical skills with role-specific questions and coding challenges designed to prepare you for the technical aspects of your interviews."
                },
                {
                  image: confidenceImg,
                  title: "Confidence Detection",
                  desc: "Build your confidence with real-time feedback and analysis of your interview performance, helping you identify areas for improvement and track your progress over time."
                },
                {
                  image: creditImg,
                  title: "Credit Based System",
                  desc: "Our credit-based system allows you to earn credits for practicing and redeem them for additional interview sessions, personalized feedback, and other premium features to enhance your interview preparation experience."
                }
              ].map((item, index) => (
                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.1 }} whileHover={{ y:-6 }}
                  key={index} className="bg-white border border-gray-200 rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all">
                    <div className="flex items-center justify-between gap-6">
                      <div className="w-1/2">
                        <h3 className="font-semibold text-xl mb-3">{item.title}</h3>
                        <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                      </div>
                      <div className="w-1/2 flex justify-end">
                      <img src={item.image} alt={item.title} className="w-28 h-28 object-contain" />
                    </div>
                    </div>
                    
                </motion.div>
              ))
            }
          </div>
        </div>
      </div>
      </div>
      <Footer />
      {showAuth && <AuthModel onClose={() => setShowAuth(false)} />}
    </div>
  )
}

export default Home