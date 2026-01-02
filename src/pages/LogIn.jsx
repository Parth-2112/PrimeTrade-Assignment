import { useContext, useState } from "react";
import { MdEmail } from "react-icons/md";
import { TbLockPassword } from "react-icons/tb";
import { Link, Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";
import axios from "axios";
import { server } from "../main";

const LogIn = () => {

  const {isAuthenticated, setIsAuthenticated, loading, setLoading, setUser} = useContext(AuthContext);
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const submitHandler = async (e)=>{
    e.preventDefault();
    setLoading(true);
    try {
      const {data} = await axios.post(`${server}/users/login`,
        {
          email,
          password,
        },
        {
          headers:{
            "Content-Type" : "application/json",
          },
          withCredentials : true,
        }
      ); 
      toast.success(data.message);
      toast.success("logged In");
      setIsAuthenticated(true);
      await axios.get(`${server}/users/me`, { withCredentials: true }).then(res => {setUser(res.data.user);})
      setLoading(false);
    } catch (error) {
      toast.error(error.response.data.message);
      setIsAuthenticated(false);
      setLoading(false);
    }  
  }

  if(isAuthenticated){
  return <Navigate to="/"/>
  }

  return (
    <div className='h-[90vh] flex flex-col justify-start items-center pt-20 '>
      <h1 className='text-[min(8vw,70px)] tracking-wide md:leading-15 leading-12 font-bold '><span className='text-(--primary-color) tracking-tight'>Log </span>In</h1>
      
      <form 
        className='flex flex-col md:w-[70%] lg:w-[60%] w-full mt-20 gap-6 h-1/2 p-6 rounded-3xl bg-white dark:bg-zinc-900 drop-shadow-md justify-center items-center'
        onSubmit={submitHandler}  
      >
       
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

        <div className="relative w-full">
          <TbLockPassword className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
          <input
            type="password"
            name="password"
            value={password}
            placeholder="Password"
            onChange={(e)=>setPassword(e.target.value)}
            required
            className="w-full p-4 pl-12 rounded-md focus:outline-none focus:ring-2 focus:ring-(--primary-color)"
          />
        </div>
        <button disabled={loading} type="submit" className={`btn-primary w-1/4 mx-auto md:mt-4 ${loading ? "opacity-60 cursor-not-allowed" : "cursor-pointer"}`}>Log In</button>

        <div className="flex w-full justify-end items-center">
          Don't have an account? <span className="ml-2 text-(--primary-color) hover:text-(--secondary-color)"><Link to="/signup"> Sign Up</Link></span>
        </div>
      </form>
    
    </div>
  )
}

export default LogIn