import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Contact from "./pages/Contact";  
import Dashboard from "./pages/Dashboard";
import SignUp from "./pages/SignUp";
import LogIn from "./pages/LogIn";
import Profile from "./pages/Profile";
import { Toaster } from "react-hot-toast";
import ProtectedRoutes from "./utils/ProtectedRoutes";



function App() {

  return (
    <div className="bg-light w-full min-h-screen p-4 lg:px-20 lg:py-4 text-dark dark:bg-dark font-primary dark:text-light">
      <Header/>
      <Routes>
        
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={ <LogIn />} />

        <Route 
          path="/profile" 
          element={
          <ProtectedRoutes>
            <Profile />
          </ProtectedRoutes>
          } 
        />
        <Route 
          path="/dashboard" 
          element={
          <ProtectedRoutes>
            <Dashboard />
          </ProtectedRoutes> 
          } 
        />
      
      </Routes>
      <Toaster/>
      <Footer/>
    </div>
  );
} 

export default App;
