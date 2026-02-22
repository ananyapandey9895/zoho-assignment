import cron from 'node-cron';
import RecurringInvoice from './models/RecurringInvoice.js';
import Invoice from './models/Invoice.js';

const startJobs = () => {
    // Run daily at midnight
    cron.schedule('0 0 * * *', async () => {
        console.log('Running daily jobs...');
        await generateRecurringInvoices();
        await updateOverdueInvoices();
    });
};

const generateRecurringInvoices = async () => {
    const today = new Date();
    const templates = await RecurringInvoice.find({
        status: 'Active',
        nextRunDate: { $lte: today }
    });

    for (const template of templates) {
        try {
            // Create New Invoice
            const newInvoice = new Invoice({
                customerName: template.customerName,
                customerId: template.customerId,
                invoiceNumber: `INV-${Date.now()}`, // Simple unique number
                invoiceDate: today,
                dueDate: new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000), // 7 days due by default
                items: template.items,
                total: template.total,
                status: 'Sent',
                isRecurring: true
            });
            await newInvoice.save();

            // Update Template nextRunDate
            let nextRun = new Date(template.nextRunDate);
            if (template.frequency === 'Weekly') nextRun.setDate(nextRun.getDate() + 7);
            else if (template.frequency === 'Monthly') nextRun.setMonth(nextRun.getMonth() + 1);
            else if (template.frequency === 'Yearly') nextRun.setFullYear(nextRun.getFullYear() + 1);

            template.lastRunDate = today;
            template.nextRunDate = nextRun;
            await template.save();

            console.log(`Generated recurring invoice for ${template.customerName}`);
        } catch (err) {
            console.error(`Error generating recurring invoice for ${template._id}:`, err);
        }
    }
};

const updateOverdueInvoices = async () => {
    const today = new Date();
    try {
        const result = await Invoice.updateMany(
            {
                status: { $in: ['Sent', 'Viewed'] },
                dueDate: { $lt: today }
            },
            { status: 'Overdue' }
        );
        console.log(`Marked ${result.modifiedCount} invoices as overdue`);
    } catch (err) {
        console.error('Error updating overdue invoices:', err);
    }
};

export default startJobs;
