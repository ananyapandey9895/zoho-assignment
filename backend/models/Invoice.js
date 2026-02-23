import mongoose from 'mongoose';

const lineItemSchema = new mongoose.Schema({
    item: { type: String, required: true },
    description: { type: String },
    quantity: { type: Number, required: true, default: 1 },
    rate: { type: Number, required: true },
    amount: { type: Number, required: true }
});

const invoiceSchema = new mongoose.Schema({
    customerName: { type: String, required: true },
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' },
    invoiceNumber: { type: String, required: true, unique: true },
    orderNumber: { type: String },
    invoiceDate: { type: Date, required: true, default: Date.now },
    dueDate: { type: Date },
    terms: { type: String },
    salesperson: { type: String },
    items: [lineItemSchema],
    subTotal: { type: Number, required: true, default: 0 },
    taxTotal: { type: Number, default: 0 },
    total: { type: Number, required: true, default: 0 },
    status: { type: String, enum: ['Draft', 'Sent', 'Viewed', 'Paid', 'Overdue'], default: 'Draft' },
    customerNotes: { type: String },
    termsAndConditions: { type: String },
    paymentId: { type: String },
    paidAt: { type: Date },
    paymentMode: { type: String, enum: ['Cash', 'Check', 'Bank Transfer', 'Online', 'Stripe (Online)'], default: 'Online' },
    isRecurring: { type: Boolean, default: false }
}, { timestamps: true });

const Invoice = mongoose.model('Invoice', invoiceSchema);
export default Invoice;
