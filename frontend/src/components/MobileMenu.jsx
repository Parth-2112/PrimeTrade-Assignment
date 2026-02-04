import { Link } from "react-router-dom";
import { HiX } from "react-icons/hi";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const MobileMenu = ({ isOpen, onClose }) => {
  
  const{isAuthenticated, logout} = useContext(AuthContext);
  
  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        className={`
          fixed inset-0 z-40 bg-dark dark:bg-slate-600 transition-opacity
          ${isOpen ? "opacity-40 " : "opacity-0 pointer-events-none"}
        `}
      />

      {/* Sidebar */}
      <div
        className={`
          flex flex-col
          fixed top-0 right-0 z-50
          Py-12
          rounded-l-4xl
          h-full w-80
          dark:bg-dark bg-light
          shadow-lg
          transform transition-transform duration-300
          ${isOpen ? "translate-x-0" : "translate-x-full"}
        `}
      >
        <div className="flex-1">
          <div className="flex justify-between items-center p-4 border-b mt-4 dark:border-zinc-700">
            <h2 className="text-2xl font-semibold text-(--primary-color)">Menu</h2>
            <button onClick={onClose}>
              <HiX className="text-3xl text-(--secondary-color)" />
            </button>
          </div>

          <nav className="flex flex-col gap-4 p-4 mt-10 text-xl">
            <Link to="/" onClick={onClose}>Home</Link>
            <hr/>
            <Link to="/dashboard" onClick={onClose}>Dashboard</Link>
            <hr/>
            <Link to="/contact" onClick={onClose}>Contact</Link>
            <hr/>
          </nav>
        </div>

        {
          !isAuthenticated?
          <div className="p-4 my-8 flex items-center justify-evenly rounded-lg text-center">
            <Link onClick={onClose} to="/signup" className="btn-primary w-24">
              Sign Up 
            </Link>
            <Link onClick={onClose} to="login" className="btn-secondary w-24">
              Log In
            </Link>  
          </div>    
          :
          <div className="p-4 my-8 flex items-center justify-center rounded-lg text-center">
           <button className="btn-primary w-24" onClick={()=>{logout();onClose();}} >Log Out</button>
          </div>
        }  
      
      </div>
    </>
  );
};

export default MobileMenu;
