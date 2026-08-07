import React from 'react'
import { PencilLine } from 'lucide-react';
import { Trash2 } from 'lucide-react';
import formateDate from "../lib/utils";
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast';
import api from '../lib/axios';
import { confirmToast } from "../utils/confirmToast";


 const NoteCard = ({ note, setNotes  }) => {


  const handleDelete = async (e,id) => {

    e.preventDefault();

    
    const confirmed = await confirmToast({
      title: "Delete Note",
      message: "This action cannot be undone.",
      confirmText: "Delete",
    });

    if (!confirmed) return;

    await api.delete(`/notes/${id}`);
    setNotes((prev) =>prev.filter((note)=>note._id !==id));
    toast.success("Deleted successfully");
   
  };

    return (
      <Link to={`/note/${note._id}`}
      className="card bg-base-200 hover:shadow-lg transition-all duration-200 
      border-t-4 border-solid border-[#00ff9d]"
      >
        <div  className="card-body" >
          <h3 className="card-title text-base-content" >{note.title}</h3>
          <p className = "text-base-content/70 line-clamp-3" >{note.content}</p>
          <div className="card-actions justify-between items-center mt-4 ">
            <span className="text-sm text-base-content/60">
              {formateDate(note.createdAt)}
            </span>
              <div className="flex items-center gap-1">
                <PencilLine className="size-4" />
                <button className="btn btn-ghost btn-xs btn-error" onClick={(e)=>handleDelete(e,note._id)}>
                    <Trash2 className="size-4"  />
                </button>
              </div>


          </div>

        </div>

      </Link>
    )
  }

  export default NoteCard