import mongoose from 'mongoose';

const recurringInvoiceSchema = new mongoose.Schema({
    customerName: { type: String, required: true },
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' },
    frequency: { type: String, enum: ['Weekly', 'Monthly', 'Yearly'], required: true },
    nextRunDate: { type: Date, required: true },
    lastRunDate: { type: Date },
    items: [{
        item: String,
        description: String,
        quantity: Number,
        rate: Number,
        amount: Number
    }],
    total: { type: Number, required: true },
    status: { type: String, enum: ['Active', 'Paused'], default: 'Active' }
}, { timestamps: true });

const RecurringInvoice = mongoose.model('RecurringInvoice', recurringInvoiceSchema);
export default RecurringInvoice;
