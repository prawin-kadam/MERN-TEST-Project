import mongoose from "mongoose";
// 1 -> create schema 
//  2-> create model


const notesSchema = new mongoose.Schema(
    {
        title:{
            type:String,
            required:true
        },
        content:{
            type:String,
            required:true
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },{timestamps:true}
);

const Note = mongoose.model("Note",notesSchema);
export default Note