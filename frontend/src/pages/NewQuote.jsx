import React, { useState } from 'react';
import { ArrowLeft, Plus, Trash2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import API from '../config/api';

const NewQuote = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        customerName: '', quoteDate: new Date().toISOString().split('T')[0],
        expiryDate: '', notes: ''
    });
    const [items, setItems] = useState([{ item: '', description: '', quantity: 1, rate: 0, amount: 0 }]);

    const handleItemChange = (i, field, val) => {
        const updated = [...items];
        updated[i][field] = field === 'quantity' || field === 'rate' ? Number(val) : val;
        updated[i].amount = updated[i].quantity * updated[i].rate;
        setItems(updated);
    };

    const addItem = () => setItems([...items, { item: '', description: '', quantity: 1, rate: 0, amount: 0 }]);
    const removeItem = (i) => items.length > 1 && setItems(items.filter((_, idx) => idx !== i));

    const subTotal = items.reduce((s, it) => s + it.amount, 0);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const count = Date.now();
            await axios.post(`${API}/quotes`, {
                ...form, quoteNumber: `QT-${String(count).slice(-6)}`,
                items, subTotal, taxTotal: 0, total: subTotal
            });
            navigate('/quotes');
        } catch (err) { alert(err.response?.data?.message || 'Error creating quote'); }
    };

    return (
        <div className="max-w-4xl mx-auto">
            <div className="flex items-center mb-6">
                <Link to="/quotes" className="mr-4 text-gray-400 hover:text-gray-600"><ArrowLeft className="h-5 w-5" /></Link>
                <h1 className="text-2xl font-semibold text-gray-900">New Quote</h1>
            </div>

            <form onSubmit={handleSubmit} className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 space-y-6">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Customer Name *</label>
                        <input required value={form.customerName} onChange={e => setForm({ ...form, customerName: e.target.value })}
                            className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:border-[#0088FF] outline-none" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Quote Date</label>
                        <input type="date" value={form.quoteDate} onChange={e => setForm({ ...form, quoteDate: e.target.value })}
                            className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:border-[#0088FF] outline-none" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                        <input type="date" value={form.expiryDate} onChange={e => setForm({ ...form, expiryDate: e.target.value })}
                            className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:border-[#0088FF] outline-none" />
                    </div>
                </div>

                {/* Line Items */}
                <div>
                    <h3 className="text-sm font-semibold text-gray-700 mb-3">Line Items</h3>
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-gray-200">
                                <th className="text-left py-2 text-gray-500 font-medium">Item</th>
                                <th className="text-left py-2 text-gray-500 font-medium">Qty</th>
                                <th className="text-left py-2 text-gray-500 font-medium">Rate</th>
                                <th className="text-right py-2 text-gray-500 font-medium">Amount</th>
                                <th className="w-8"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((it, i) => (
                                <tr key={i} className="border-b border-gray-100">
                                    <td className="py-2 pr-2"><input value={it.item} onChange={e => handleItemChange(i, 'item', e.target.value)}
                                        className="w-full border border-gray-200 rounded px-2 py-1.5 text-sm focus:border-[#0088FF] outline-none" placeholder="Item name" /></td>
                                    <td className="py-2 pr-2 w-20"><input type="number" min="1" value={it.quantity} onChange={e => handleItemChange(i, 'quantity', e.target.value)}
                                        className="w-full border border-gray-200 rounded px-2 py-1.5 text-sm text-center focus:border-[#0088FF] outline-none" /></td>
                                    <td className="py-2 pr-2 w-28"><input type="number" min="0" value={it.rate} onChange={e => handleItemChange(i, 'rate', e.target.value)}
                                        className="w-full border border-gray-200 rounded px-2 py-1.5 text-sm text-right focus:border-[#0088FF] outline-none" /></td>
                                    <td className="py-2 text-right font-medium font-mono">₹{it.amount.toFixed(2)}</td>
                                    <td className="py-2 pl-2"><button type="button" onClick={() => removeItem(i)} className="text-red-400 hover:text-red-600"><Trash2 className="h-4 w-4" /></button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <button type="button" onClick={addItem} className="mt-3 text-[#0088FF] text-sm font-medium flex items-center hover:underline">
                        <Plus className="h-4 w-4 mr-1" /> Add Item
                    </button>
                </div>

                <div className="flex justify-between items-center border-t border-gray-200 pt-4">
                    <div className="text-lg font-bold">Total: <span className="font-mono">₹{subTotal.toFixed(2)}</span></div>
                    <div className="space-x-3">
                        <Link to="/quotes" className="px-4 py-2 border border-gray-300 rounded text-sm text-gray-700 hover:bg-gray-50">Cancel</Link>
                        <button type="submit" className="px-6 py-2 bg-[#0088FF] text-white rounded text-sm font-medium hover:bg-[#0070d2]">Save Quote</button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default NewQuote;
