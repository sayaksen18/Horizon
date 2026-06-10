import { TbRobotFace } from "react-icons/tb";
import { IoSparkles } from "react-icons/io5";
import { FaGoogle } from "react-icons/fa";
import {motion} from "motion/react"
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../utils/firebase";
import axios from "axios";
import { ServerUrl } from "../App";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";
function Auth({isModel = false}) {
  const dispatch = useDispatch();
  const handleGoogleSignIn = async () => {
    try {
      const response = await signInWithPopup(auth, provider);
      let User = response.user;
      let name = User.displayName;
      let email = User.email;
      const result = await axios.post(`${ServerUrl}/api/auth/google`, { name, email },{ withCredentials: true });
      dispatch(setUserData(result.data));
    }  catch (error) {
      console.error("Error during Google sign-in:", error);
    }
  };

  return (
    <div className={`w-full ${isModel ? "py-4" : "min-h-screen bg-[#f3f3f3] flex items-center justify-center px-6 py-20"}`}>
      <motion.div initial={{opacity:0,y:-40}} animate={{opacity:1,y:0}} transition={{duration:1.05}} className={`w-full ${isModel ? "max-w-md p-8 rounded-3xl" : "max-w-lg p-12 rounded-[32px]"} bg-white shadow-2xl border border-gray-200`}>
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="bg-black text-white p-2 rounded-lg">
            <TbRobotFace size = {18}/>
          </div>
          <h2 className="font-semibold text-lg">Horizon</h2>
        </div>
        <h1 className="text-2xl md:text-3xl font-semibold text-center leading-snug mb-4">
          Continue With{" "}
          <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full inline-flex items-center gap-2">
            <IoSparkles size={16}/>
            AI Smart Interview
          </span>
        </h1>
        <p className="text-grey-500 text-center text-sm md:text-base leading-relaxed mb-8">
          Join our community of professionals and enhance your interview skills with AI-powered insights.
        </p>
        <motion.button onClick={handleGoogleSignIn} whileHover={{opacity: 0.8, scale: 1.05 }} whileTap={{ opacity: 1,scale: 0.95 }} className="w-full flex items-center justify-center gap-3 py-3 bg-black text-white rounded-full shadow-md">
          <FaGoogle size={20}/>
          Continue with Google
        </motion.button>
      </motion.div>
    </div>
  )
}

export default Auth