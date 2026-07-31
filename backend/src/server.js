import express from "express";
// const express = require("express");
import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";


const port = process.env.PORT||5001;


//middle ware
const app = express();
app.use(express.json());

connectDB();
app.listen(port,()=>{
    console.log('server started at :',port);
});

app.use("/api/notes",notesRoutes);
