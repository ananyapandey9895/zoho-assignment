import express from 'express';
import Organization from '../models/Organization.js';

const router = express.Router();

// Get organization details
router.get('/organization', async (req, res) => {
    try {
        let org = await Organization.findOne();
        if (!org) {
            org = await Organization.create({});
        }
        res.json(org);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Update organization details
router.post('/organization', async (req, res) => {
    try {
        const org = await Organization.findOneAndUpdate({}, req.body, { upsert: true, new: true });
        res.json(org);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Preferences/Notifications (Simple storage for now)
router.get('/prefs', async (req, res) => {
    res.json({ language: 'English', dateFormat: 'DD/MM/YYYY', emailNotif: true });
});

export default router;
