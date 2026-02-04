import NotesVector from '../assets/NotesVector.jpg'
import CardSlider from '../components/CardSlider'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import { AuthContext } from '../context/AuthContext'
import { useContext } from 'react'

const Home = () => {
  
  const {isAuthenticated} = useContext(AuthContext);
  const onClickHandler = () => {
    if(isAuthenticated){
      toast.success("You are already logged in");
    }
  }
  return (
    <div className='min-h-full'>
    
      <section className='w-full h-[85vh] md:h-[90vh] max-sm:flex-col-reverse flex items-center justify-evenly'>
        <div>
          <h1 className='text-[min(10vw,70px)] tracking-wide md:leading-15 leading-12 font-bold '>Welcome to <br/><span className='text-(--primary-color) tracking-tight'>notesNook</span></h1>    
          <p className='mt-4 md:text-2xl'>Your personal space to organize and manage your notes efficiently.</p>
          <div className='flex flex-row gap-x-6 mt-6 text-2xl max-sm:text-lg'>
            <Link to="/signup">
              <button className='btn-primary' onClick={onClickHandler}>
                Sign Up
              </button>
            </Link>
            <Link to="/login">
              <button className='btn-secondary' onClick={onClickHandler}>
                Log In
              </button>
            </Link>
          </div>
        </div>
        <div className='md:max-w-[30%] max-sm:w-[50%] md:rounded-[30px] rounded-full overflow-hidden '>
          <img src={NotesVector} alt="Notes Illustration" className='w-full h-full object-contain'/>
        </div>
      </section>


      <section className='w-full h-[85vh] md:h-[90vh] flex flex-col gap-10 items-center justify-center text-center'> 
        <h1 className='text-[min(10vw,52px)] tracking-tight md:leading-13 leading-10 font-bold lg:mb-10 lg:-mt-20'>Make the most of your <span className='text-(--primary-color)'>ideas</span> - <br/>and your <span className='text-(--secondary-color)'>time</span></h1>
        <p className='mt-4 md:text-xl lg:mb-20'>Capture everything important and access it from anywhere, whenever you want.</p>
        <CardSlider/>
      </section>
      

    </div>
  )
}

export default Home