import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    rate: { type: Number, required: true },
    unit: { type: String, default: 'pcs' }
}, { timestamps: true });

const Item = mongoose.model('Item', itemSchema);
export default Item;
