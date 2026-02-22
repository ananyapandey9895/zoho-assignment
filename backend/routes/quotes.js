import express from 'express';
import Quote from '../models/Quote.js';
import Invoice from '../models/Invoice.js';

const router = express.Router();

// Get all quotes
router.get('/', async (req, res) => {
    try {
        const quotes = await Quote.find().sort({ createdAt: -1 });
        res.json(quotes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get single quote
router.get('/:id', async (req, res) => {
    try {
        const quote = await Quote.findById(req.params.id);
        if (!quote) return res.status(404).json({ message: 'Quote not found' });
        res.json(quote);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create quote
router.post('/', async (req, res) => {
    try {
        const quote = new Quote(req.body);
        const saved = await quote.save();
        res.status(201).json(saved);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Update quote
router.put('/:id', async (req, res) => {
    try {
        const quote = await Quote.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!quote) return res.status(404).json({ message: 'Quote not found' });
        res.json(quote);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete quote
router.delete('/:id', async (req, res) => {
    try {
        const quote = await Quote.findByIdAndDelete(req.params.id);
        if (!quote) return res.status(404).json({ message: 'Quote not found' });
        res.json({ message: 'Quote deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Convert quote to invoice
router.post('/:id/convert', async (req, res) => {
    try {
        const quote = await Quote.findById(req.params.id);
        if (!quote) return res.status(404).json({ message: 'Quote not found' });
        if (quote.status === 'Converted') return res.status(400).json({ message: 'Quote already converted' });

        // Generate invoice number
        const count = await Invoice.countDocuments();
        const invoiceNumber = `INV-${String(count + 1).padStart(6, '0')}`;

        const invoice = new Invoice({
            customerName: quote.customerName,
            customerId: quote.customerId,
            invoiceNumber,
            invoiceDate: new Date(),
            dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
            items: quote.items,
            subTotal: quote.subTotal,
            taxTotal: quote.taxTotal,
            total: quote.total,
            status: 'Draft',
            customerNotes: quote.notes,
            termsAndConditions: quote.termsAndConditions
        });

        const savedInvoice = await invoice.save();

        quote.status = 'Converted';
        quote.convertedInvoiceId = savedInvoice._id;
        await quote.save();

        res.status(201).json({ invoice: savedInvoice, quote });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
