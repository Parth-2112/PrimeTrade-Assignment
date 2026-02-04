import { FaRegCopyright } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <div className=" w-full items-center justify-center flex-col mt-10">
      <div className="flex-col justify-center items-center w-full mb-4 text-center">
        <h3 className="flex justify-center items-center mb-4 text-xl font-medium"><span className="text-(--secondary-color) mr-2">Follow</span> Us On</h3>
        <a href="https://www.facebook.com/">
          <FaFacebook className="inline mx-4 text-2xl hover:text-(--primary-color)"/>
        </a>
        <a href="https://www.instagram.com/">
          <FaInstagram className="inline mx-4 text-2xl hover:text-(--primary-color)"/>
        </a>
        <a href="https://x.com/">
          <FaXTwitter className="inline mx-4 text-2xl hover:text-(--primary-color)"/>
        </a>
      </div>
      <div className="flex items-center text-lg max-sm:text-sm justify-center md:justify-end">
        <FaRegCopyright/> 2026 notesNook.
      </div>
    
    </div>
  )
}

export default Footer