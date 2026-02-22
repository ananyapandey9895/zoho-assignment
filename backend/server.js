import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
import invoiceRoutes from './routes/invoices.js';
import authRoutes from './routes/auth.js';
import customerRoutes from './routes/customers.js';
import quoteRoutes from './routes/quotes.js';
import paymentRoutes from './routes/payments.js';
import reportRoutes from './routes/reports.js';

import itemRoutes from './routes/items.js';
import recurringRoutes from './routes/recurring_invoices.js';
import creditNoteRoutes from './routes/credit_notes.js';
import settingsRoutes from './routes/settings.js';
import userRoutes from './routes/users.js';
import startJobs from './jobs.js';

app.use('/api/invoices', invoiceRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/quotes', quoteRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/items', itemRoutes);
app.use('/api/recurring', recurringRoutes);
app.use('/api/credit-notes', creditNoteRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/users', userRoutes);

app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'Zoho Clone Backend Running' });
});

// Database Connection
const startServer = async () => {
    let MONGODB_URI = process.env.MONGODB_URI;

    if (!MONGODB_URI) {
        try {
            const { MongoMemoryServer } = await import('mongodb-memory-server');
            const mongoServer = await MongoMemoryServer.create();
            MONGODB_URI = mongoServer.getUri();
            console.log('Using in-memory MongoDB:', MONGODB_URI);
        } catch (err) {
            console.error('Failed to start in-memory MongoDB, falling back to localhost');
            MONGODB_URI = 'mongodb://localhost:27017/zoho_clone';
        }
    }

    mongoose.connect(MONGODB_URI)
        .then(() => console.log('Connected to MongoDB'))
        .catch((err) => console.error('MongoDB connection error:', err));

    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
        startJobs();
    });
};

startServer();
