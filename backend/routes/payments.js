import express from 'express';
import Stripe from 'stripe';
import Invoice from '../models/Invoice.js';

const router = express.Router();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder');

// Create a Stripe Checkout Session for an invoice
router.post('/create-session', async (req, res) => {
    try {
        const { invoiceId } = req.body;
        const invoice = await Invoice.findById(invoiceId);
        if (!invoice) return res.status(404).json({ message: 'Invoice not found' });
        if (invoice.status === 'Paid') return res.status(400).json({ message: 'Invoice already paid' });

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: invoice.items.map(item => ({
                price_data: {
                    currency: 'inr',
                    product_data: {
                        name: item.item,
                        description: item.description || undefined,
                    },
                    unit_amount: Math.round(item.rate * 100), // Stripe uses paisa
                },
                quantity: item.quantity,
            })),
            mode: 'payment',
            success_url: `${process.env.FRONTEND_URL || 'http://localhost:5173'}/invoices?payment=success&invoiceId=${invoiceId}`,
            cancel_url: `${process.env.FRONTEND_URL || 'http://localhost:5173'}/invoices?payment=cancelled`,
            metadata: { invoiceId: invoiceId.toString() }
        });

        res.json({ sessionId: session.id, url: session.url });
    } catch (error) {
        console.error('Stripe session error:', error);
        res.status(500).json({ message: error.message });
    }
});

// Verify payment and mark invoice as paid
router.post('/verify', async (req, res) => {
    try {
        const { invoiceId, sessionId } = req.body;

        if (sessionId) {
            const session = await stripe.checkout.sessions.retrieve(sessionId);
            if (session.payment_status === 'paid') {
                const invoice = await Invoice.findByIdAndUpdate(
                    invoiceId,
                    { status: 'Paid', paymentId: session.payment_intent, paidAt: new Date() },
                    { new: true }
                );
                return res.json({ success: true, invoice });
            }
            return res.status(400).json({ success: false, message: 'Payment not completed' });
        }

        // Manual mark as paid (no Stripe)
        const { paymentMode, paidAt } = req.body;
        const invoice = await Invoice.findByIdAndUpdate(
            invoiceId,
            {
                status: 'Paid',
                paymentMode: paymentMode || 'Online',
                paidAt: paidAt ? new Date(paidAt) : new Date()
            },
            { new: true }
        );
        res.json({ success: true, invoice });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
