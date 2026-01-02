import { useContext } from 'react'
import { AuthContext } from "../context/AuthContext";
import axios from 'axios';
import { server } from '../main';

const Profile = () => {
  
  let {user,setUser, setIsAuthenticated} = useContext(AuthContext);

  if(!user){
    user = axios.get(`${server}/users/me`, { withCredentials: true })
    .then(res => {
      setUser(res.data.user);
      setIsAuthenticated(true);
    })
    .catch(() => {
      setUser(null);
      setIsAuthenticated(false);
    })
  }

  return (
    <div className='h-[90vh] flex flex-col justify-start items-center pt-20'>
      <div className='flex flex-col md:w-[70%] lg:w-[60%] w-full mt-20 gap-12 h-1/2 p-6 rounded-3xl bg-white dark:bg-zinc-900 drop-shadow-md justify-center'>
        <h1 className='text-2xl'><span className='text-(--secondary-color)'>Hi.</span> <br/>{user?.name}</h1>
        <h1 className='text-2xl'><span className='text-(--primary-color)'>Your Email.</span> <br/>{user?.email}</h1>  
      </div>
    </div>
  )
}

export default Profile