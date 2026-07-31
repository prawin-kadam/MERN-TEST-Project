import Note from "../models/Notes.js";
import Notes from "../models/Notes.js";

export async function getAllNotes(req,res) {
    try {
        const notes = await Notes.find();
        res.status(200).json(notes);

    } catch (error) {
        console.log(error)
        res.status(500).json({message:"internal server error"})
    }
}

export async function createNote(req,res) {
    try {
        const {title,content} = req.body;
        const  note = new Notes({title,content});
        

        await note.save();
        res.status(201).json({message:"Note has been added!"});

    } catch (error) {
         console.log(error)
        res.status(500).json({message:"internal server error",error:error});
    }
    
}
export async function updateNote(req,res) {
    try {
       const {title,content} = req.body;
       const updatedID =  await Notes.findByIdAndUpdate(req.params.id,{title,content});
       if(!updatedID) return res.status(404).json({message:"Note not found"});

       res.status(200).json({message:"updated the note "});
    } catch (error) {
        
        res.status(500).json({message:"internal server error",error:error});
        console.log(error);
    }
}

export async function deleteNote(req,res) {
    try {
    //    const {id} = req.body;
      const deletedID =  await Notes.findByIdAndDelete(req.params.id);
      if(!deletedID) return res.status(404).json({message:"Note not found"});
       res.status(200).json({message:"delted the note succesfully"});
    } catch (error) {
        
        res.status(500).json({message:"internal server error",error:error});
        console.log(error);
    }
}

