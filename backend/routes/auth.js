import express from 'express';
import { OAuth2Client } from 'google-auth-library';
import jwt from 'jsonwebtoken';

const router = express.Router();
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Google OAuth - verify token and return user info
router.post('/google', async (req, res) => {
    try {
        const { credential } = req.body;

        const ticket = await client.verifyIdToken({
            idToken: credential,
            audience: process.env.GOOGLE_CLIENT_ID,
        });

        const payload = ticket.getPayload();

        const user = {
            googleId: payload.sub,
            email: payload.email,
            name: payload.name,
            picture: payload.picture,
        };

        // Generate a JWT token for the session
        const token = jwt.sign(
            { id: user.googleId, email: user.email, name: user.name },
            process.env.JWT_SECRET || 'zoho-clone-secret-key',
            { expiresIn: '7d' }
        );

        res.json({ success: true, user, token });
    } catch (error) {
        console.error('Google auth error:', error);
        res.status(401).json({ success: false, message: 'Invalid Google token' });
    }
});

// Regular signup
router.post('/signup', async (req, res) => {
    try {
        const { companyName, phone, email, password, state } = req.body;

        // For now, just return success (can be wired to MongoDB later)
        const token = jwt.sign(
            { email, companyName },
            process.env.JWT_SECRET || 'zoho-clone-secret-key',
            { expiresIn: '7d' }
        );

        res.json({ success: true, token, user: { email, companyName } });
    } catch (error) {
        console.error('Signup error:', error);
        res.status(500).json({ success: false, message: 'Signup failed' });
    }
});

export default router;
