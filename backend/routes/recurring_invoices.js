import express from 'express';
import RecurringInvoice from '../models/RecurringInvoice.js';

const router = express.Router();

// Get all recurring templates
router.get('/', async (req, res) => {
    try {
        const templates = await RecurringInvoice.find().sort({ createdAt: -1 });
        res.json(templates);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create a new recurring template
router.post('/', async (req, res) => {
    try {
        const template = new RecurringInvoice(req.body);
        const saved = await template.save();
        res.status(201).json(saved);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Update a template
router.put('/:id', async (req, res) => {
    try {
        const template = await RecurringInvoice.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(template);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete a template
router.delete('/:id', async (req, res) => {
    try {
        await RecurringInvoice.findByIdAndDelete(req.params.id);
        res.json({ message: 'Template deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
