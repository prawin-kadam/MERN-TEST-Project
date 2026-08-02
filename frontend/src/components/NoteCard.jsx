import { Link } from 'lucide-react'
import React from 'react'
import { PencilLine } from 'lucide-react';
import { Trash2 } from 'lucide-react';

const NoteCard = ({note}) => {
  return (
    <Link to={`/note/${note._id}`}
    className="card bg-base-200 hover:shadow-lg transition-all duration-200 
    border-t-4 border-solid border-[#00ff9d]
    "
    >
      <div  className="card-body" >
        <h3 className="card-title text-base-content" >{note.title}</h3>
        <p className = "text-base-content/70 line-clamp-3" >{note.content}</p>
        <div className="card-actions justify-between items-center mt-4 ">
          <span className="text-sm text-base-content/60">
            {note.createdAt}
          </span>
            <div className="flex items-center gap-1">
              <PencilLine className="size-4" />
              <button className="btn btn-ghost btn-xs btn-error">
                  <Trash2 className="size-4"  />
              </button>
            </div>


        </div>

      </div>

    </Link>
  )
}

export default NoteCard