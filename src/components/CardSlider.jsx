import { useRef } from "react";

import { MdOutlineAccessTime } from "react-icons/md";
import { CiSearch } from "react-icons/ci";
import { CiLock } from "react-icons/ci";
import { IoSync } from "react-icons/io5";
import { GoPeople } from "react-icons/go";
import { HiOutlineTemplate, HiChevronLeft, HiChevronRight} from "react-icons/hi";


const features = [
  {
    icon: MdOutlineAccessTime,
    title: 'Fast Access',
    description: 'Open your notes instantly on any device.',
  },
  {
    icon: CiLock,
    title: 'Secure',
    description: 'Your data is encrypted and protected.',
  },
  {
    icon: CiSearch,
    title: 'Search Notes',
    description: 'Find exactly what you need in seconds.',
  },
  {
    icon: IoSync,
    title: 'Sync Everywhere',
    description: 'Access notes from web, mobile, or desktop.',
  },
  { 
    icon: GoPeople,
    title: 'Collaborate',
    description: 'Share notes and work together in real-time.',
  },
  {
    icon: HiOutlineTemplate,
    title: 'Template',
    description: 'Use pre-designed templates to organize your notes efficiently.',
  }
];


const CardSlider = () => {
  
  const sliderRef = useRef(null);
  const scroll = (direction) => {
    if (!sliderRef.current) return;
    const cardWidth = 360;
    sliderRef.current.scrollBy({
      left: direction === "left" ? -cardWidth : cardWidth,
      behavior: "smooth",
    });
  }
  
  return (
    
    <div className="relative w-full mt-15">
      
      <button
        onClick={() => scroll('left')}
        className="
          cursor-pointer
          hidden xl:flex
          absolute left-0 top-1/2 -translate-y-1/2 z-10
          w-10 h-10 rounded-full
          bg-white dark:bg-zinc-800
          shadow-md
          items-center justify-center
          hover:bg-(--primary-color)/10" 
      >
        <HiChevronLeft className="text-2xl" />
      </button>

      <button
        onClick={() => scroll('right')}
        className="
          cursor-pointer
          hidden xl:flex
          absolute right-0 top-1/2 -translate-y-1/2 z-10
          w-10 h-10 rounded-full
          bg-white dark:bg-zinc-800
          shadow-md
          items-center justify-center
          hover:bg-(--primary-color)/10"
      >
        <HiChevronRight className="text-2xl" />
      </button>

      <div ref={sliderRef} className="flex gap-4 overflow-x-auto snap-x snap-mandatory px-2 py-4 scrollbar-hide">
        
        {
          features.map((feature, index) => {
          const Icon = feature.icon;

          return (
            <div
              key={index}
              className="
                min-w-[80%] sm:min-w-[60%] md:min-w-[40%] lg:min-w-[320px] xl:min-w-90
                min-h-65
                snap-center
                bg-white dark:bg-zinc-800
                rounded-2xl
                px-6
                py-8
                text-left
                drop-shadow-md
                shadow-(--primary-color)
                hover:scale-[1.05] transition-transform 
                hover:shadow-lg
                hover:border-2
                dark:hover:border-(--secondary-color)
                hover:border-(--primary-color)"
            >
              <Icon className="text-4xl mb-8 dark:text-(--primary-color) text-(--secondary-color)"/>
              <h3 className="text-2xl font-medium mb-2">
                {feature.title}
              </h3>
              <p className="text-dark dark:text-light text-sm">
                {feature.description}
              </p>
            </div>
          )})
        }
      </div>
    </div>
  )
}

export default CardSlider;
