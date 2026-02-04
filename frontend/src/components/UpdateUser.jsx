import axios from "axios";
import { useState, useContext } from "react";
import { server } from "../main";
import { GrUserManager } from "react-icons/gr";
import { MdEmail } from "react-icons/md";
import toast from "react-hot-toast";
import { AuthContext } from "../context/AuthContext";


const UpdateUser = ({onClose}) => {

  const {user, setUser} = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");

  const submitHandler = async (e) => {
  
  e.preventDefault();
  
  try {
    setLoading(true);
    const {data} = await axios.put(
      `${server}/users/me`,
      { name, email },
      {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      }
    );

    toast.success(data.message);
    setUser(prev=> ({...prev, name, email})); 
    onClose();
  } catch (error) {
    toast.error(error?.response?.data?.message || "Something went wrong");
  } finally {
    setLoading(false);
  }
}

  return(
    <div 
      className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <form 
        onClick={(e) => e.stopPropagation()}
        className='flex flex-col md:w-[70%] lg:w-[50%] w-[90%] max-w-xl gap-6 p-6  rounded-3xl bg-white dark:bg-zinc-900 drop-shadow-md justify-center items-center'
        onSubmit={submitHandler}
      >
       
        <div className="relative w-full">
          <GrUserManager className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl"/>
          <input
            type="text"
            name="name"
            value={name}
            placeholder="Name"
            onChange={(e)=>setName(e.target.value)}
            required
            className="w-full p-4 pl-12 rounded-md focus:outline-none focus:ring-2 focus:ring-(--primary-color)"
          />
        </div>


        <div className="relative w-full">
          <MdEmail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
          <input
            type="email"
            name="email"
            value={email}
            placeholder="Email"
            onChange={(e)=>setEmail(e.target.value)}
            required
            className="w-full p-4 pl-12 rounded-md focus:outline-none focus:ring-2 focus:ring-(--primary-color)"
          />
        </div>

        <button disabled={loading} type="submit" className={`btn-primary md:w-1/4 mx-auto md:mt-4 ${loading? "opacity-60 cursor-not-allowed" : "cursor-pointer"}`}>Save changes</button>
      </form>
    </div>
  )
}

export default UpdateUser;