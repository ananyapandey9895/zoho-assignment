import mongoose from 'mongoose';

const organizationSchema = new mongoose.Schema({
    name: { type: String, default: 'Zoho Clone Inc.' },
    industry: { type: String, default: 'Software' },
    address: { type: String, default: '123 tech street, Bangalore, Karnataka, India' },
    currency: { type: String, default: 'Indian Rupee (INR)' },
    timezone: { type: String, default: '(GMT +5:30) Asia/Kolkata' },
    logo: { type: String },
    selectedTemplate: { type: String, default: 'standard' },
}, { timestamps: true });

export default mongoose.model('Organization', organizationSchema);
