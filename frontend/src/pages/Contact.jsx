import { GrUserManager } from "react-icons/gr";
import { MdEmail } from "react-icons/md";
import { FiMessageSquare } from "react-icons/fi";

const Contact = () => {
  return (
    <div className='flex flex-col justify-start items-center pt-20 '>
      <h1 className='text-[min(8vw,70px)] tracking-wide md:leading-15 leading-12 font-bold '><span className='text-(--primary-color) tracking-tight'>Contact </span>Us</h1>

      <div className='flex flex-col md:w-[70%] lg:w-[60%] w-full mt-20 gap-6 h-1/2 p-6 rounded-3xl bg-white dark:bg-zinc-900 drop-shadow-md justify-center items-center'>
       
        <div className="relative w-full">
          <GrUserManager className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl"/>
          <input
            type="text"
            placeholder="Name"
            required
            className="w-full p-4 pl-12 rounded-md focus:outline-none focus:ring-2 focus:ring-(--primary-color)"
          />
        </div>


        <div className="relative w-full">
          <MdEmail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
          <input
            type="email"
            placeholder="Email"
            required
            className="w-full p-4 pl-12 rounded-md focus:outline-none focus:ring-2 focus:ring-(--primary-color)"
          />
        </div>

        <div className="relative w-full">
          <FiMessageSquare className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
          <input
            type="text"
            placeholder="Message"
            className="w-full p-4 pl-12 rounded-md focus:outline-none focus:ring-2 focus:ring-(--primary-color)"
          />
        </div>
        <button className='btn-primary w-1/4 mx-auto mt-4'>Submit</button>
      </div>
    
    </div>
  )
}

export default Contact