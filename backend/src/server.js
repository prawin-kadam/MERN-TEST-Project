import express from "express";
import cors from "cors";
// const express = require("express");
import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";

const port = process.env.PORT||5001;


//middle ware
const app = express();

app.use(cors({
    origin:"http://localhost:5173"
}));
app.use(express.json());

app.use(rateLimiter);


app.use((req,res,next)=>{
    // console.log("u got a res");
    console.log(`request MEthod :${req.method} Request URL ${req.url} `);
    next();

});

connectDB().then(()=>{
app.listen(port,()=>{
    console.log('server started at :',port);
});
});


app.use("/api/notes",notesRoutes);
