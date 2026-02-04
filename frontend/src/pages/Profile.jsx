import { useContext, useState, useEffect } from 'react'
import { AuthContext } from "../context/AuthContext";
import axios from 'axios';
import { server } from '../main';
import Loader from '../components/Loader';
import { MdOutlineEdit } from "react-icons/md";
import UpdateUser from '../components/UpdateUser';

const Profile = () => {
  
  const [loading, setLoading] = useState(false);
  const [showUpdateUser, setShowUpdateUser] = useState(false);

  let {user, setUser, setIsAuthenticated} = useContext(AuthContext);
  
  useEffect(() => {
    if(!user){
      setLoading(true);
      axios.get(`${server}/users/me`, { withCredentials: true })
      .then(res => {
        setUser(res.data.user);
        setIsAuthenticated(true);
      })
      .catch(() => {
        setUser(null);
        setIsAuthenticated(false);
      })
      .finally(() => {
        setLoading(false);
      });
    }
  }, []);

  
  return (
    <div className='flex flex-col justify-start items-center pt-20'>
      
      {loading && <Loader />}
      
      <div className='flex flex-col md:w-[70%] lg:w-[60%] w-full mt-20 gap-12 h-1/2 p-6 rounded-3xl bg-white dark:bg-zinc-900 drop-shadow-md justify-center'>
        
        <div className='flex w-full justify-between'>
          <h1 className='text-2xl'>
            <span className='text-(--secondary-color)'>Hi.</span> 
            <br/>
            <p className='text-xl sm:text-2xl wrap-break-word max-w-full capitalize'>{user?.name}</p>
          </h1>
          
          <button 
            className=' text-(--primary-color) text-2xl flex gap-2 cursor-pointer hover:text-(--secondary-color) rounded-full h-4'
            onClick={()=>setShowUpdateUser(true)}
          >
            <MdOutlineEdit/>
          </button>
        </div>
        
        <h1 className='text-2xl'>
          <span className='text-(--primary-color)'>Your Email.</span>
          <br/> 
          <p className='text-xl sm:text-2xl break-all max-w-full'>{user?.email}</p>
        </h1>  
      
      </div>

    {showUpdateUser && 
      <UpdateUser 
        onClose={()=>setShowUpdateUser(false)}
      />
    }
    </div>
  )
}

export default Profile