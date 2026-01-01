import {useState, useContext} from 'react'
import { ThemeContext } from '../context/ThemeContext';
import { AuthContext } from "../context/AuthContext";
import { LuSun, LuMoon } from "react-icons/lu";
import { FaUserCircle, FaSearch } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { TbNotebook } from "react-icons/tb";
import { HiMenuAlt3 } from "react-icons/hi";
import MobileMenu from "./MobileMenu";


const Header = () => {

  const {isAuthenticated, setIsAuthenticated, logout, loading} = useContext(AuthContext);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [menuOpen, setMenuOpen] = useState(false);
  
  return (

    <div className='flex justify-between md:flex w-full h-20  items-center'>

      <div className='flex gap-4 items-center'>
        <div className=' font-medium text-2xl flex items-center'>
          <Link to="/">
            <TbNotebook className='inline text-3xl text-(--secondary-color)'/>
            notes<span className='text-(--secondary-color)'>Nook</span>
          </Link>
        </div>
        <nav className='hidden md:flex text-l ml-6 space-x-4 pl-6 lg:ml-10 lg:space-x-6 lg:pl-10 items-center '>
          <Link to='/dashboard' className='hover-underline left'>DashBoard</Link>
          <Link to='/contact' className='hover-underline left'>Contact Us</Link>
        </nav>
      </div>


      {/* This Div contains user profile icon, theme toggle button and mobile menu button */}
      <div className='justify-end flex gap-x-2 max-sm:gap-x-1'> 
        {/* <div className='w-10 h-10 rounded-full items-center justify-center flex'>
          <FaSearch className='hover:cursor-pointer text-xl '/>
        </div> */}

        <div className='w-10 h-10 rounded-full items-center justify-center flex'>
          <Link to="/profile">
          <FaUserCircle className='hover:cursor-pointer text-2xl text-(--primary-color) dark:text-(--secondary-color)'/>
          </Link>
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
        
        {
          isAuthenticated?
            <button
              disabled={loading} 
              className={`btn-primary hidden md:flex py-0 ${loading ? "opacity-60 cursor-not-allowed" : "cursor-pointer"}`}
              onClick={logout}
            >
              Log Out
            </button> : 
            <Link to="/login" className='btn-primary cursor-pointer hidden md:flex py-0'>Log In</Link>
        }

        <div className="md:hidden w-10 h-10">
          <button onClick={() => setMenuOpen(true)} className='w-full h-full flex items-center text-2xl justify-center cursor-pointer'>
            <HiMenuAlt3 className="text-3xl" />
          </button>
        </div>
      </div>
      
    
      {/* To render the mobile menu  */}
      <MobileMenu
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
      />
    
    </div>
  
  )
}

export default Header