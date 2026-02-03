import express from 'express';
import { 
  newNote,
  getMyNotes, 
  updateNote,
  deleteNote,
  getOneNote
} from "../controllers/note.js";
import { isAuthenticated } from '../middlewares/auth.js';

const router = express.Router();

router.post("/new",isAuthenticated, newNote);
router.get("/my",isAuthenticated, getMyNotes);

router.route("/:id")
  .get(isAuthenticated, getOneNote)
  .put(isAuthenticated, updateNote)
  .delete(isAuthenticated, deleteNote);

export default router;