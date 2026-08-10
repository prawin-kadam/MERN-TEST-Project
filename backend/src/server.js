    import express from "express";
    import cors from "cors";
    // const express = require("express");
    import notesRoutes from "./routes/notesRoutes.js";
    import authRoutes from "./routes/authRoutes.js";
    import { connectDB } from "./config/db.js";
    import rateLimiter from "./middleware/rateLimiter.js";
    import cookieParser from "cookie-parser";
    import path from "path";
    import { get } from "http";

    const port = process.env.PORT||5001;
    const __dirname = path.resolve();


    //middle ware
    const app = express();

    if(process.env.NODE_MODULE!=="prod"){

        app.use(cors({
            origin:"http://localhost:5173",
            credentials: true

        }));
    }
    app.use(cookieParser());

    app.use(express.json());

    app.use(rateLimiter);


    app.use((req,res,next)=>{
        // console.log("u got a res");
        console.log(`request MEthod :${req.method} Request URL ${req.url} `);
        next();

    });

    app.use("/api/notes",notesRoutes);
    app.use("/api/auth",authRoutes);

    if(process.env.NODE_ENV==="production"){
        app.use(express.static(path.join(__dirname,"../frontend/dist")))
        app.get("*",(req,res) =>{
            res.sendFile(path.join(__dirname,"../frontend","dist","index.html"));
        });
    }

    connectDB().then(()=>{
    app.listen(port,()=>{
        console.log('server started at :',port);
    });
    });



