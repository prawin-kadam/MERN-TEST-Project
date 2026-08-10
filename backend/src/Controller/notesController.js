import Notes from "../models/Notes.js";

export async function getAllNotes(req,res) {
    try {
        const notes = await Notes.find({ user: req.userId }).sort({createdAt:-1});
        res.status(200).json(notes);

    } catch (error) {
        console.log(error)
        res.status(500).json({message:"internal server error"})
    }
}

export async function getNoteByID(req,res) {
    try {
        const note = await Notes.findOne({
            _id: req.params.id,
            user: req.userId
        });
        if(!notes) return res.status(404).json({message:"note    not found "});
        res.status(200).json(notes);

    } catch (error) {
        console.log(error)
        res.status(500).json({message:"internal server error"})
    }
}

export async function createNote(req,res) {
    try {
        const {title,content} = req.body;
        const note = new Notes({
            title,
            content,
            user: req.userId
        });
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
       const updatedID =   await Notes.findOneAndUpdate(
            {
                _id: req.params.id,
                user: req.userId
            },
            {
                title,
                content
            },
            {
                new: true,
                runValidators: true
            }
        );
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
      const deletedID =  await Notes.findOneAndDelete({
            _id: req.params.id,
            user: req.userId
        });
      if(!deletedID) return res.status(404).json({message:"Note not found"});
       res.status(200).json({message:"delted the note succesfully"});
    } catch (error) {
        
        res.status(500).json({message:"internal server error",error:error});
        console.log(error);
    }
}

