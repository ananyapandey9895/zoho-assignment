import express from 'express';
import Invoice from '../models/Invoice.js';

const router = express.Router();

// Get summary report
router.get('/summary', async (req, res) => {
    try {
        const invoices = await Invoice.find();

        const totalRevenue = invoices.reduce((sum, inv) => sum + inv.total, 0);
        const paidInvoices = invoices.filter(inv => inv.status === 'Paid');
        const unpaidInvoices = invoices.filter(inv => inv.status !== 'Paid');

        const paidAmount = paidInvoices.reduce((sum, inv) => sum + inv.total, 0);
        const unpaidAmount = unpaidInvoices.reduce((sum, inv) => sum + inv.total, 0);

        const overdueInvoices = invoices.filter(inv =>
            inv.status !== 'Paid' && inv.dueDate && new Date(inv.dueDate) < new Date()
        );
        const overdueAmount = overdueInvoices.reduce((sum, inv) => sum + inv.total, 0);

        res.json({
            totalRevenue,
            totalInvoices: invoices.length,
            paidCount: paidInvoices.length,
            paidAmount,
            unpaidCount: unpaidInvoices.length,
            unpaidAmount,
            overdueCount: overdueInvoices.length,
            overdueAmount
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get monthly sales for last 12 months
router.get('/monthly', async (req, res) => {
    try {
        const now = new Date();
        const months = [];

        for (let i = 11; i >= 0; i--) {
            const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
            const nextMonth = new Date(now.getFullYear(), now.getMonth() - i + 1, 1);

            const invoices = await Invoice.find({
                invoiceDate: { $gte: date, $lt: nextMonth }
            });

            const total = invoices.reduce((sum, inv) => sum + inv.total, 0);
            const paid = invoices.filter(inv => inv.status === 'Paid').reduce((sum, inv) => sum + inv.total, 0);

            months.push({
                month: date.toLocaleString('default', { month: 'short' }),
                year: date.getFullYear(),
                total,
                paid,
                unpaid: total - paid,
                count: invoices.length
            });
        }

        res.json(months);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
