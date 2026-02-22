import express from 'express';
import User from '../models/User.js';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const users = await User.find().select('-password');
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(201).json(user);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.id, req.body, { new: true });
        res.json(user);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.json({ message: 'User removed' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export default router;
