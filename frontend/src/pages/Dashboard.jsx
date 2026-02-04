import { useState, useEffect } from 'react'
import NewNote from '../components/NewNote'
import axios from 'axios';
import { server } from '../main';
import NoteItem from '../components/NoteItem';
import { CiSearch } from "react-icons/ci";
import Loader from '../components/Loader';
import ViewNote from "../components/ViewNote";

const Dashboard = () => {

  const [showNewNote, setShowNewNote] = useState(false);
  const [notes, setNotes] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedNoteId, setSelectedNoteId] = useState(null);

  useEffect(()=>{
    setLoading(true);
    axios.get(`${server}/notes/my`,{
      withCredentials:true,
    })
    .then(res=>{
      setNotes(res.data.notes);
    })
    .catch(e=>{
      toast.error(e.response.data.message);
    })
    .finally(()=>{
      setLoading(false);
    });
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

      {loading && <Loader />}
      
      <section className="w-full mt-10 p-4 columns-1 md:columns-3 lg:columns-4 gap-4">
        {
          filteredNotes.length > 0 ? (
            filteredNotes.map((i) => (
              <NoteItem
                key={i._id}
                id={i._id}
                title={i.title}
                description={i.description}
                setRefresh={setRefresh}
                onView={() => {
                    setTimeout(() => {
                    setSelectedNoteId(i._id);
                  }, 2);
                }}
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

      {selectedNoteId && (
        <ViewNote
          id={selectedNoteId}
          onClose={() => setSelectedNoteId(null)}
        />
      )}
    </div>
  )
}

export default Dashboard