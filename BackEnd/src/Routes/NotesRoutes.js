// Import required modules and controller functions
import express from 'express';
import { addNote, deleteNote, getNotes, updateNote,getNote } from '../Controllers/notesController.js';

const router = express.Router();

// Route to get all notes
router.get('/', getNotes);
router.get('/:id',getNote);
// Route to add a new note
router.post('/addnote', addNote);

// Route to update an existing note by ID
router.put('/updatenote/:id', updateNote);

// Route to delete a note by ID
router.delete('/deletenote/:id', deleteNote);

export default router;
