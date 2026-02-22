import express from 'express';
import Item from '../models/Item.js';

const router = express.Router();

// Get all items
router.get('/', async (req, res) => {
    try {
        const items = await Item.find().sort({ createdAt: -1 });
        res.json(items);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create item
router.post('/', async (req, res) => {
    try {
        const item = new Item(req.body);
        const saved = await item.save();
        res.status(201).json(saved);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Update item
router.put('/:id', async (req, res) => {
    try {
        const item = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!item) return res.status(404).json({ message: 'Item not found' });
        res.json(item);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete item
router.delete('/:id', async (req, res) => {
    try {
        const item = await Item.findByIdAndDelete(req.params.id);
        if (!item) return res.status(404).json({ message: 'Item not found' });
        res.json({ message: 'Item deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
