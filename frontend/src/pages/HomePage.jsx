import React, { useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import RateLimitUI from '../components/RateLimitUI';
import axios from "axios";
const HomePage = () => {
  const [israteLimt,setIsRateLimited]= useState(true)
  const [notes,setNotes] = useState([]);
  const [loading,setLoadinf] = useState(true);
  

  useEffect(()=>{
    const fetchnotes = async() =>{
      try {
        const res = await axios.get("http://localhost:5001/api/notes/");
        // const data = await res.json();
        console.log(res);
      } catch (error) {
          console.log("error fecthing notes",error);
      }
    }
    fetchnotes();
  });



  return (
    <div className="min-h-screen">
      <NavBar/>
      {israteLimt && <RateLimitUI/>}
    </div>
  )
}

export default HomePage