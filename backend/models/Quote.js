import mongoose from 'mongoose';

const quoteLineItemSchema = new mongoose.Schema({
    item: { type: String, required: true },
    description: { type: String },
    quantity: { type: Number, required: true, default: 1 },
    rate: { type: Number, required: true },
    amount: { type: Number, required: true }
});

const quoteSchema = new mongoose.Schema({
    customerName: { type: String, required: true },
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' },
    quoteNumber: { type: String, required: true, unique: true },
    quoteDate: { type: Date, required: true, default: Date.now },
    expiryDate: { type: Date },
    items: [quoteLineItemSchema],
    subTotal: { type: Number, required: true, default: 0 },
    taxTotal: { type: Number, default: 0 },
    total: { type: Number, required: true, default: 0 },
    status: { type: String, enum: ['Draft', 'Sent', 'Accepted', 'Declined', 'Converted'], default: 'Draft' },
    notes: { type: String },
    termsAndConditions: { type: String },
    convertedInvoiceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Invoice' }
}, { timestamps: true });

const Quote = mongoose.model('Quote', quoteSchema);
export default Quote;
