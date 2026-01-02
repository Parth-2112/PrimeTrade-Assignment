import { useState, useEffect } from 'react'
import NewNote from '../components/NewNote'
import axios from 'axios';
import { server } from '../main';
import NoteItem from '../components/NoteItem';
import { CiSearch } from "react-icons/ci";

const Dashboard = () => {

  const [showNewNote, setShowNewNote] = useState(false);
  const [notes, setNotes] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(()=>{
    axios.get(`${server}/notes/my`,{
      withCredentials:true,
    })
    .then(res=>{
      setNotes(res.data.notes);
    })
    .catch(e=>{
      toast.error(e.response.data.message);
    })
  },[showNewNote,refresh]);

  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(search.toLowerCase()) ||
    note.description.toLowerCase().includes(search.toLowerCase())
  );
  
  return (
    <div className='min-h-[90vh] flex flex-col justify-start items-center'>

      <div className='w-full flex justify-between items-center'>
        <div className='flex w-full justify-end gap-4 items-center'>
          <div className="relative w-[60%] max-w-xs">
            <CiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-xl text-(--primary-color)"/>

            <input
              type="text"
              placeholder="Search notes..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="
                w-full
                px-2 py-1
                pl-10
                rounded-xl
                border
                border-gray-300
                dark:border-gray-700
                bg-white
                dark:bg-zinc-800
                text-sm
                focus:outline-none
                focus:ring-2
                focus:ring-(--primary-color)"
              />
          </div>

          <button 
            className='flex items-center cursor-pointer'
            onClick={()=>setShowNewNote(true)}
          >
            <span className='text-3xl mr-1 text-(--primary-color)'>+</span>Add Note
          </button>
        </div>
      </div>

      <section className="w-full mt-10 p-4 grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-4 items-start ">
        {
          filteredNotes.length > 0 ? (
            filteredNotes.map((i) => (
              <NoteItem
                key={i._id}
                id={i._id}
                title={i.title}
                description={i.description}
                setRefresh={setRefresh}
              />
            ))
          ) : (
            <p className="text-gray-500 text-sm">No notes found</p>
          )
        }
      </section>


      {showNewNote && (
        <NewNote onClose={() => setShowNewNote(false)} />
      )}

    </div>
  )
}

export default Dashboard