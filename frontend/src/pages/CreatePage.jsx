import  { useState } from 'react'
import { Link ,useNavigate} from 'react-router-dom'
import { ArrowLeftIcon } from 'lucide-react';
import {toast} from 'react-hot-toast'
import api from '../lib/axios';

const CreatePage = () => {
  const [title,setTitle] = useState("");
  const [content,setContent] = useState("");
  const [loading,setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmt = async  (e) =>{
    e.preventDefault();
    if(!title.trim()||!content.trim()){
      toast.error("all feilds needs fields");
      return;
    }
    setLoading(true);
    try {
      await api.post("/notes/",{title,content});
      toast.success("Notes added");
      navigate("/notes");
        
    } catch (error) {
      
    
      if (error.response?.status === 429) {
      toast.error("Slow down! You're making too many notes.", {
        duration: 4000,
        icon: "💀",
      });
      return;
    }

    toast.error(error.response?.data?.message || "Failed to create note.");
     
      
    }finally {
    setLoading(false);
    }

  }


  return (
    <div className="min-h-screen bg-base-200" >
      <div className="container mx-auto px-4 py-8">
        <div className='max-w-2xl mx-auto' >
          <Link to={"/"} className='btn btn-ghost mb-6' >
          <ArrowLeftIcon className='size-5' />
          back to homepage</Link>

          <div className='card bg-base-100' >
            <div className='card-body' >
              <h2 className='card-title text-2xl mb-0' >Create note for me</h2> 
              <form onSubmit={handleSubmt}>
                <div className="form-control mb-4" >
                  <label className='label'>
                    <span className='label-title'>Title</span>
                  </label>
                  <input 
                    type="text" 
                    placeholder='Note title'
                    className="input input-bordered"
                    value={title}
                    onChange={(e)=>setTitle(e.target.value)}
                  />
                </div>
                <div className="form-control mb-4" >
                  <label className='label'>
                    <span className='label-title'>Content</span>
                  </label>
                  <textarea
                    placeholder='write something here ..........'
                    className="textarea textarea-bordered h-32 textarea-md"
                    value={content}
                    onChange={(e)=>setContent(e.target.value)}
                  />
                </div>
                <div className='card-actions justify-end' >
                  <button type='submit' className='btn btn-primary ' disabled={loading}>
                    {loading? "creating" : "Create Note"}
                  </button>
                </div>

              </form>
            </div>
            
          </div>
        </div>
      </div>

    </div>
  )
}

export default CreatePage