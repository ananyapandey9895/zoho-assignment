import React, { useState, useEffect } from 'react';
import { Plus, CreditCard, Search, User } from 'lucide-react';
import axios from 'axios';

import API from '../config/api';

const CreditNotes = () => {
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [form, setForm] = useState({
        customerName: '', amount: 0, reason: '', date: new Date().toISOString().split('T')[0]
    });

    useEffect(() => { fetchNotes(); }, []);

    const fetchNotes = async () => {
        try {
            const res = await axios.get(`${API}/credit-notes`);
            setNotes(res.data);
        } catch (err) { console.error(err); }
        finally { setLoading(false); }
    };

    const handleCreate = async (e) => {
        e.preventDefault();
        try {
            const noteNumber = `CN-${Date.now().toString().slice(-6)}`;
            await axios.post(`${API}/credit-notes`, { ...form, creditNoteNumber: noteNumber });
            setShowModal(false);
            setForm({ customerName: '', amount: 0, reason: '', date: new Date().toISOString().split('T')[0] });
            fetchNotes();
        } catch (err) { alert('Error creating credit note'); }
    };

    return (
        <div className="max-w-screen-xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center">
                    <CreditCard className="h-6 w-6 text-gray-400 mr-2" />
                    <h1 className="text-2xl font-semibold text-gray-900">Credit Notes</h1>
                </div>
                <button
                    onClick={() => setShowModal(true)}
                    className="bg-[#0088FF] text-white px-4 py-2 rounded shadow-sm text-sm font-medium hover:bg-[#0070d2] transition flex items-center">
                    <Plus className="h-4 w-4 mr-1.5" /> New Credit Note
                </button>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-[#fcfdff]">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Note#</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Amount</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {loading ? (
                            <tr><td colSpan="5" className="px-6 py-8 text-center">Loading credit notes...</td></tr>
                        ) : notes.length === 0 ? (
                            <tr><td colSpan="5" className="px-6 py-16 text-center">
                                <CreditCard className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                                <p className="text-sm text-gray-500">No credit notes found.</p>
                            </td></tr>
                        ) : notes.map(n => (
                            <tr key={n._id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 text-sm text-gray-600">{new Date(n.date).toLocaleDateString()}</td>
                                <td className="px-6 py-4 text-sm text-[#0088FF] font-medium">{n.creditNoteNumber}</td>
                                <td className="px-6 py-4 text-sm text-gray-900 font-medium">{n.customerName}</td>
                                <td className="px-6 py-4 text-sm">
                                    <span className={`px-2 py-0.5 rounded text-xs font-semibold ${n.status === 'Open' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'}`}>
                                        {n.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-900 text-right font-mono font-bold">₹{n.amount.toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                            <h2 className="text-xl font-bold text-gray-800">New Credit Note</h2>
                            <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600 p-1 hover:bg-gray-100 rounded-full transition-colors">
                                <Plus className="h-6 w-6 rotate-45" />
                            </button>
                        </div>
                        <form onSubmit={handleCreate} className="p-6 space-y-4">
                            <div>
                                <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Customer Name</label>
                                <input required value={form.customerName} onChange={e => setForm({ ...form, customerName: e.target.value })}
                                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:border-[#0088FF] outline-none" />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Amount (₹)</label>
                                <input type="number" required value={form.amount} onChange={e => setForm({ ...form, amount: Number(e.target.value) })}
                                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:border-[#0088FF] outline-none" />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Reason</label>
                                <textarea value={form.reason} onChange={e => setForm({ ...form, reason: e.target.value })}
                                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:border-[#0088FF] outline-none h-20" />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Date</label>
                                <input type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })}
                                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:border-[#0088FF] outline-none" />
                            </div>

                            <div className="flex justify-end pt-4 border-t border-gray-100">
                                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 text-sm text-gray-600 mr-2">Cancel</button>
                                <button type="submit" className="px-6 py-2 bg-[#0088FF] text-white rounded text-sm font-medium hover:bg-[#0070d2]">Save Credit Note</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CreditNotes;
