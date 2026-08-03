import React, { useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import RateLimitUI from '../components/RateLimitUI';
import NoteCard from "../components/NoteCard"
import axios from "axios";
import toast from "react-hot-toast";
import formateDate from "../lib/utils";

const HomePage = () => {
  const [israteLimt,setIsRateLimited]= useState(false)
  const [notes,setNotes] = useState([]);
  const [loading,setLoading] = useState(true);
  

  useEffect(()=>{
    const fetchnotes = async() =>{
      try {
        const res = await axios.get("http://localhost:5001/api/notes/");
        console.log(res.data);
        setNotes(res.data);
        setIsRateLimited(false);

      } catch (error) {
        console.log(error);
        if(error.response?.status===429){
            setIsRateLimited(true);
        }else{
          toast.error("failed to load the notes");
        }
      }finally{
        setLoading(false);
      }
    }
    fetchnotes();
  },[]);



  return (
    <div className="min-h-screen">
      <NavBar/>
      {israteLimt && <RateLimitUI/>}
        <div className="max-w-7xl mx-auto p-4 mt-6">
          {loading && <div className="text-center text-primary py-10">laoding notes ...</div>}

          {notes.length>0 && !israteLimt &&(

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {notes.map((note)=>{
                 return (
                <div>
                  {/* {note.title}| {note.content} */}
                  <NoteCard key={note._id} note={note} />
                </div>
                 )
              })}

             

            </div>
          ) 

          }
        </div>

    </div>
  )
}

export default HomePage