import express from 'express';
import CreditNote from '../models/CreditNote.js';

const router = express.Router();

// Get all credit notes
router.get('/', async (req, res) => {
    try {
        const notes = await CreditNote.find().sort({ createdAt: -1 });
        res.json(notes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create a credit note
router.post('/', async (req, res) => {
    try {
        const note = new CreditNote(req.body);
        const saved = await note.save();
        res.status(201).json(saved);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

export default router;
