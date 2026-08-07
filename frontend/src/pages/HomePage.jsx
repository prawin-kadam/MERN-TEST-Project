  import React, { useEffect, useState } from 'react';
  import NavBar from '../components/NavBar';
  import RateLimitUI from '../components/RateLimitUI';
  import NoteCard from "../components/NoteCard"
  import api from "../lib/axios";
  import toast from "react-hot-toast";
  import formateDate from "../lib/utils";
  import  NotesNotFound  from '../components/NotesNotFound';

  const HomePage = () => {
    const [israteLimt,setIsRateLimited]= useState(false)
    const [notes,setNotes] = useState([]);
    const [loading,setLoading] = useState(true);

    const fetchNotes = async () => {
    try {
      const res = await api.get("/notes");
      // console.log(res.data);
      setNotes(res.data);
      setIsRateLimited(false);
    } catch (error) {
      if (error.response?.status === 429) {
        setIsRateLimited(true);
      } else {
        toast.error("Failed to load notes");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);



    return (
      <div className="min-h-screen">
        <NavBar/>
        {israteLimt && <RateLimitUI/>}
          <div className="max-w-7xl mx-auto p-4 mt-6">
            {loading && <div className="text-center text-primary py-10">laoding notes ...</div>}


            {notes.length ===0 &&!israteLimt && <NotesNotFound/>}
            
            {Array.isArray(notes) && notes.length > 0 && !israteLimt &&(
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {notes.map(note => (
                <NoteCard
                  key={note._id}
                  note={note}
                  setNotes={setNotes}
                />
              ))}
            </div>
          )}

          </div>

      </div>
    )
  }

  export default HomePage