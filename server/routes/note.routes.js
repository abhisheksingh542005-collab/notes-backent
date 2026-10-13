import express from "express";
import { 
  createNote, 
  getNotes, 
  updateNote, 
  togglePinNote, 
  toggleArchiveNote, 
  deleteNote 
} from "../controller/note.controller.js";

const router = express.Router();

router.post("/create", createNote);
router.get("/get/:userID", getNotes);
router.put("/update/:id", updateNote);
router.patch("/pin/:id", togglePinNote);
router.patch("/archive/:id", toggleArchiveNote);
router.delete("/delete/:id", deleteNote);

export default router;