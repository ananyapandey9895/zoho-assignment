import mongoose from 'mongoose';

const creditNoteSchema = new mongoose.Schema({
    creditNoteNumber: { type: String, required: true, unique: true },
    customerName: { type: String, required: true },
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' },
    invoiceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Invoice' },
    date: { type: Date, default: Date.now },
    amount: { type: Number, required: true },
    reason: { type: String },
    status: { type: String, enum: ['Open', 'Closed'], default: 'Open' }
}, { timestamps: true });

const CreditNote = mongoose.model('CreditNote', creditNoteSchema);
export default CreditNote;
