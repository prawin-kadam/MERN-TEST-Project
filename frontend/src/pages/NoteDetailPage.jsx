import  { useEffect, useState } from 'react';
import {Link,useNavigate,useParams} from 'react-router-dom'
import api from '../lib/axios';
import toast from 'react-hot-toast';
import { Loader2Icon,ArrowLeftIcon,Trash2 } from 'lucide-react';
import { confirmToast } from "../utils/confirmToast";

const NoteDetailPage = () => {

  const [notes,setNotes] = useState(null);
  const [title ,setTitle] = useState("");
  const [loading , setLoading] =  useState(true);
  const [saving,setSaving] = useState(false);
  const navigate = useNavigate();

  const {id} = useParams();
   useEffect(()=>{
    const fetchNote = async ()=>{
      try {
        const res = await api.get(`/notes/${id}`);
        setNotes(res.data);


      } catch (error) {
        console.log("error in fetching note !",error);
        toast.error("failed to fetch note ")
      }
      finally{
        setLoading(false);
      }
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect
      fetchNote();
   },[id]);
  //  console.log({notes});


   const handleDelete = async ()=>{
    const confirmed = await confirmToast({
      title: "Delete Note",
      message: "This action cannot be undone.",
      confirmText: "Delete",
    });

    if (!confirmed) return;
      try {
        const res = api.delete(`notes/${id}`);
        toast.success("notes delete duccesfully");
        navigate("/");
      } catch (error) {
        console.log("failed to delete",error);
        toast.error("failed to delete notes");
      }finally{
        setLoading(false);
      }
   }
  /* const handleDelete = async (e,id) => {

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
 */

  const handleSave = async ()=>{
    try {
      const confirmed = await confirmToast({
      title: "updated note Note",
      message: "",
      confirmText: "Update",
    });

    if (!confirmed) return;
    setSaving(true);
    await api.put(`notes/${id}`,notes);
    toast.success("note updated successfully");
    navigate("/");
    
    } catch (error) {
      toast.error("failed to update notes");
      console.log("error",error);
    }finally{
      setSaving(false);
    }
  }
   if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2Icon className="w-10 h-10 animate-spin" />
      </div>
    );
  }

  return (

    <div className='min-h-screen bg-base-200 flex items-center justify-center' >

     <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className='flex items-center justify-between mb-6 '> 
          <Link to="/" className="btn btn-ghost">
          <ArrowLeftIcon className='size-4'/> back to Notes 
          </Link>
          <button onClick={handleDelete} className='btn btn-error btn-outline'>
          <Trash2/> Delete</button>

        </div>
          <div className="card bg-base-100">
            <div className="card-body">
              <div className="form-control mb-4" >
                    <label className='label'>
                      <span className='label-title'>Title</span>
                    </label>
                    <input 
                      type="text" 
                      placeholder='Note title'
                      className="input input-bordered"
                      value={notes.title}
                      onChange={(e)=>setNotes({...notes,title:e.target.value})}
                    />
              </div>
              <div className="form-control mb-4" >
                    <label className='label'>
                      <span className='label-title'>Content</span>
                    </label>
                    <textarea
                      placeholder='write something here ..........'
                      className="textarea textarea-bordered h-32 textarea-md"
                      value={notes.content}
                      onChange={(e)=>setNotes({...notes,content:e.target.value})}
                    />
              </div>
              <div className='card-actions justify-end' >
                  <button type='submit' className='btn btn-primary ' disabled={saving} onClick={handleSave}>
                    {saving? "Updating" : "update Note"}
                  </button>
              </div>
            </div>
          </div>

      </div>
      
     </div>

    </div>
  
  );
}

export default NoteDetailPage