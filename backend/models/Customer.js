import mongoose from 'mongoose';

const customerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    company: { type: String },
    billingAddress: {
        street: String,
        city: String,
        state: String,
        zip: String,
        country: { type: String, default: 'India' }
    },
    gstin: { type: String },
    notes: { type: String }
}, { timestamps: true });

const Customer = mongoose.model('Customer', customerSchema);
export default Customer;
