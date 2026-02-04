import { MdDeleteOutline} from "react-icons/md";
import { MdOutlineEdit } from "react-icons/md";
import { useState } from "react";
import UpdateNote from "./UpdateNote";
import deleteHandler from "../utils/DeleteHandler";

const NoteItem = ({ title, description, id, setRefresh, onView }) => {
  
  const [showNewNote, setShowNewNote] = useState(false);

  return (
    <div 
      className="w-full mb-4 break-inside-avoid flex flex-col gap-2 rounded-2xl p-4 shadow-md bg-light dark:bg-slate-800 text-dark dark:text-light transition-transform hover:scale-[1.02] cursor-pointer"
    >
      <div onClick={onView} className="cursor-pointer">
        <h2 className="text-lg font-semibold tracking-tight capitalize">
          {title}
        </h2>
        
        <p className="text-sm text-gray-600 dark:text-gray-300">
          {description}
        </p>
      </div>

      <div className="flex justify-end gap-4 text-xl">
        <button 
          className="text-(--primary-color) cursor-pointer" 
          onClick={()=>setShowNewNote(true)}
        >
          <MdOutlineEdit/>
        </button>
        <button 
          className="text-(--secondary-color) cursor-pointer" 
          onClick={()=>{deleteHandler({id,setRefresh})}}
        >
          <MdDeleteOutline/>
        </button>
      </div>

      {showNewNote && (
        <UpdateNote 
          id={id}
          onClose={() => setShowNewNote(false)}
          setRefresh={setRefresh}
          oldtitle={title}
          olddescription={description}
        />
      )}

    </div>
  );
};

export default NoteItem;  
