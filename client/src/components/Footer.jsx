import {BsRobot} from "react-icons/bs"

const Footer = () => {
  return (
    <div className = "bg-[#f3f3f3] flex justify-center px-4 pb-10 py-4 pt-10">
      <div className="w-full max-w-6xl bg-white rounded-[24px] shadow-sm border border-gray-200 py-8 px-3 text-center">
        <div className="flex justify-center items-center gap-3 mb-3">
           <div>
            <div className="bg-black text-white p-2 rounded-lg">
              <BsRobot size={16} className="text-yellow-500"/>
            </div>
           </div>
           <h2 className="font-semibold">Horizon</h2>
        </div>
        <p className="text-gray-500 text-sm max-w-xl mx-auto">
          Horizon is an AI-powered interview preparation platform designed to help job seekers excel in their interviews. With personalized feedback, mock interviews, and a vast library of resources, Horizon empowers users to build confidence and land their dream jobs.
        </p>
      </div>
    </div>
  )
}

export default Footer