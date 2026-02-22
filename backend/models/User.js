import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    role: { type: String, enum: ['Admin', 'Staff'], default: 'Staff' },
    googleId: { type: String },
    picture: { type: String },
}, { timestamps: true });

export default mongoose.model('User', userSchema);
