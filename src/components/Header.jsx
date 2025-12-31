import {useContext} from 'react'
import { ThemeContext } from '../context/ThemeContext';
import { LuSun, LuMoon } from "react-icons/lu";
import { FaUserCircle } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { TbNotebook } from "react-icons/tb";

const Header = () => {

  const { theme, toggleTheme } = useContext(ThemeContext);

  return (

    <div className='flex justify-between md:grid md:grid-cols-3 w-full h-20  items-center'>


      <div className=' font-medium text-2xl flex items-center'>
        <Link to="/">
          <TbNotebook className='inline text-2xl text-(--secondary-color)'/>
          notes<span className='text-(--secondary-color)'>Nook</span>
        </Link>
      </div>
      
      <div className='md:flex items-center hidden'>
        MyTasks
        About
        Contact Us
      </div>
      
      <div className='justify-end flex gap-x-3 max-sm:gap-x-1'>

        <div className='w-10 h-10 rounded-full items-center justify-center flex'>
          <Link to="/profile">
          <FaUserCircle className='hover:cursor-pointer text-2xl text-(--primary-color) dark:text-(--secondary-color)'/>
          </Link>
        </div>

        <div className='max-sm:block hidden'>
          div
        </div>
        
        <div className="w-10 h-10 rounded-full">
          <button
            onClick={toggleTheme}
            className="w-full h-full flex items-center text-2xl justify-center rounded-full hover:cursor-pointer"
          >
            {theme === "dark" ? (
              <LuSun className=" text-(--primary-color)" />
            ) : (
              <LuMoon className=" text-(--secondary-color)" />
            )}
          </button>
        </div>
      
      </div>
    
    </div>
  
  )
}

export default Header