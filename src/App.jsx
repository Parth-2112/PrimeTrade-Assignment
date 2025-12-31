import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {

  return (
    <div className="bg-light w-full min-h-screen p-4 lg:px-20 lg:py-4 text-dark dark:bg-dark font-primary dark:text-light">
      <Header/>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      <Footer/>
    </div>
  );
} 

export default App;
