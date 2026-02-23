import React, { useState, useEffect } from 'react';
import { Plus, RefreshCcw, Search, Trash2, Play, Pause } from 'lucide-react';
import axios from 'axios';

import API from '../config/api';

const RecurringInvoices = () => {
    const [templates, setTemplates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [form, setForm] = useState({
        customerName: '', frequency: 'Monthly', nextRunDate: new Date().toISOString().split('T')[0]
    });
    const [items, setItems] = useState([{ item: '', quantity: 1, rate: 0, amount: 0 }]);

    useEffect(() => { fetchTemplates(); }, []);

    const fetchTemplates = async () => {
        try {
            const res = await axios.get(`${API}/recurring`);
            setTemplates(res.data);
        } catch (err) { console.error(err); }
        finally { setLoading(false); }
    };

    const toggleStatus = async (template) => {
        const newStatus = template.status === 'Active' ? 'Paused' : 'Active';
        await axios.put(`${API}/recurring/${template._id}`, { status: newStatus });
        fetchTemplates();
    };

    const handleDelete = async (id) => {
        if (!confirm('Delete this template?')) return;
        await axios.delete(`${API}/recurring/${id}`);
        fetchTemplates();
    };

    const handleCreate = async (e) => {
        e.preventDefault();
        try {
            const total = items.reduce((s, it) => s + it.amount, 0);
            await axios.post(`${API}/recurring`, { ...form, items, total });
            setShowModal(false);
            setItems([{ item: '', quantity: 1, rate: 0, amount: 0 }]);
            fetchTemplates();
        } catch (err) { alert('Error creating template'); }
    };

    const handleItemChange = (i, field, val) => {
        const updated = [...items];
        updated[i][field] = field === 'item' ? val : Number(val);
        updated[i].amount = updated[i].quantity * updated[i].rate;
        setItems(updated);
    };

    return (
        <div className="max-w-screen-xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center">
                    <RefreshCcw className="h-6 w-6 text-gray-400 mr-2" />
                    <h1 className="text-2xl font-semibold text-gray-900">Recurring Invoices</h1>
                </div>
                <button
                    onClick={() => setShowModal(true)}
                    className="bg-[#0088FF] text-white px-4 py-2 rounded shadow-sm text-sm font-medium hover:bg-[#0070d2] transition flex items-center">
                    <Plus className="h-4 w-4 mr-1.5" /> New Template
                </button>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-[#fcfdff]">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Profile Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Frequency</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Last Run</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Next Run</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Amount</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {loading ? (
                            <tr><td colSpan="7" className="px-6 py-8 text-center">Loading templates...</td></tr>
                        ) : templates.length === 0 ? (
                            <tr><td colSpan="7" className="px-6 py-16 text-center">
                                <RefreshCcw className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                                <p className="text-sm text-gray-500">No recurring templates yet.</p>
                            </td></tr>
                        ) : templates.map(t => (
                            <tr key={t._id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 text-sm font-medium text-gray-900">{t.customerName}</td>
                                <td className="px-6 py-4 text-sm text-gray-600">{t.frequency}</td>
                                <td className="px-6 py-4 text-sm text-gray-600">{t.lastRunDate ? new Date(t.lastRunDate).toLocaleDateString() : '—'}</td>
                                <td className="px-6 py-4 text-sm text-gray-900 font-medium">{new Date(t.nextRunDate).toLocaleDateString()}</td>
                                <td className="px-6 py-4 text-sm">
                                    <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${t.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                                        {t.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-900 text-right font-mono font-bold">₹{t.total.toFixed(2)}</td>
                                <td className="px-6 py-4 text-right space-x-2">
                                    <button onClick={() => toggleStatus(t)} className="text-gray-400 hover:text-[#0088FF]">
                                        {t.status === 'Active' ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                                    </button>
                                    <button onClick={() => handleDelete(t._id)} className="text-gray-400 hover:text-red-500">
                                        <Trash2 className="h-4 w-4" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl">
                        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                            <h2 className="text-xl font-bold text-gray-800">New Recurring Template</h2>
                            <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600 p-1">
                                <Plus className="h-6 w-6 rotate-45" />
                            </button>
                        </div>
                        <form onSubmit={handleCreate} className="p-6 space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Customer Name</label>
                                    <input required value={form.customerName} onChange={e => setForm({ ...form, customerName: e.target.value })}
                                        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:border-[#0088FF] outline-none" />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Frequency</label>
                                    <select value={form.frequency} onChange={e => setForm({ ...form, frequency: e.target.value })}
                                        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:border-[#0088FF] outline-none">
                                        <option>Weekly</option>
                                        <option>Monthly</option>
                                        <option>Yearly</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Start Date</label>
                                    <input type="date" required value={form.nextRunDate} onChange={e => setForm({ ...form, nextRunDate: e.target.value })}
                                        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:border-[#0088FF] outline-none" />
                                </div>
                            </div>

                            <div className="mt-6">
                                <label className="block text-xs font-semibold text-gray-500 uppercase mb-2">Line Items</label>
                                <div className="space-y-2">
                                    {items.map((it, i) => (
                                        <div key={i} className="flex space-x-2 items-center">
                                            <input placeholder="Item" value={it.item} onChange={e => handleItemChange(i, 'item', e.target.value)}
                                                className="flex-1 border border-gray-200 rounded px-2 py-1 text-sm focus:border-[#0088FF] outline-none" />
                                            <input type="number" placeholder="Qty" value={it.quantity} onChange={e => handleItemChange(i, 'quantity', e.target.value)}
                                                className="w-16 border border-gray-200 rounded px-2 py-1 text-sm text-center focus:border-[#0088FF] outline-none" />
                                            <input type="number" placeholder="Rate" value={it.rate} onChange={e => handleItemChange(i, 'rate', e.target.value)}
                                                className="w-24 border border-gray-200 rounded px-2 py-1 text-sm text-right focus:border-[#0088FF] outline-none" />
                                            <span className="w-24 text-right font-mono text-sm px-2">₹{(it.amount || 0).toFixed(2)}</span>
                                        </div>
                                    ))}
                                </div>
                                <button type="button" onClick={() => setItems([...items, { item: '', quantity: 1, rate: 0, amount: 0 }])}
                                    className="text-xs text-[#0088FF] font-medium mt-2 hover:underline">
                                    + Add Item
                                </button>
                            </div>

                            <div className="flex justify-end pt-4 border-t border-gray-100">
                                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 text-sm text-gray-600 mr-2">Cancel</button>
                                <button type="submit" className="px-6 py-2 bg-[#0088FF] text-white rounded text-sm font-medium hover:bg-[#0070d2]">Create Template</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RecurringInvoices;
