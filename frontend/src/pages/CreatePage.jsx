import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeftIcon } from 'lucide-react';

const CreatePage = () => {
  const [title,setTitle] = useState("");
  const [content,setContent] = useState("");
  const [loading,setLoading] = useState(false);

  const handleSubmt =  () =>{
    return 1;
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
            </div>
            
          </div>
        </div>
      </div>

    </div>
  )
}

export default CreatePage