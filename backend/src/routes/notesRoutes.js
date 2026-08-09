import express from "express";
import { createNote, deleteNote, getAllNotes, updateNote ,getNoteByID} from "../Controller/notesController.js";
import { cronJob } from "../Controller/cronController.js";

const router = express.Router();
import rateLimiter from "../middleware/rateLimiter.js";


router.get("/",getAllNotes);
router.get("/health",cronJob);
router.get("/:id",getNoteByID);


router.post("/", rateLimiter, createNote);


router.put("/:id",updateNote);

router.delete("/:id",deleteNote);






export default router;