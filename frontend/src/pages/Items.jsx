import React, { useState, useEffect } from 'react';
import { Plus, Search, Package, X, Trash2, Edit2 } from 'lucide-react';
import axios from 'axios';

const API = 'http://localhost:5001/api';

const Items = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editing, setEditing] = useState(null);
    const [search, setSearch] = useState('');
    const [form, setForm] = useState({ name: '', description: '', rate: 0, unit: 'pcs' });

    useEffect(() => { fetchItems(); }, []);

    const fetchItems = async () => {
        try {
            const res = await axios.get(`${API}/items`);
            setItems(res.data);
        } catch (err) { console.error(err); }
        finally { setLoading(false); }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editing) {
                await axios.put(`${API}/items/${editing._id}`, form);
            } else {
                await axios.post(`${API}/items`, form);
            }
            setShowModal(false);
            setEditing(null);
            setForm({ name: '', description: '', rate: 0, unit: 'pcs' });
            fetchItems();
        } catch (err) { alert(err.response?.data?.message || 'Error saving item'); }
    };

    const handleDelete = async (id) => {
        if (!confirm('Delete this item?')) return;
        await axios.delete(`${API}/items/${id}`);
        fetchItems();
    };

    const filtered = items.filter(i =>
        i.name.toLowerCase().includes(search.toLowerCase()) ||
        (i.description || '').toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="max-w-screen-xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center">
                    <Package className="h-6 w-6 text-gray-400 mr-2" />
                    <h1 className="text-2xl font-semibold text-gray-900">Items</h1>
                </div>
                <button onClick={() => { setEditing(null); setForm({ name: '', description: '', rate: 0, unit: 'pcs' }); setShowModal(true); }}
                    className="bg-[#0088FF] text-white px-4 py-2 rounded shadow-sm text-sm font-medium hover:bg-[#0070d2] transition flex items-center">
                    <Plus className="h-4 w-4 mr-1.5" /> New Item
                </button>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 shadow-sm mb-4 p-4">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input type="text" placeholder="Search items..." value={search} onChange={e => setSearch(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-md text-sm focus:border-[#0088FF] focus:ring-1 focus:ring-[#0088FF]/30 outline-none" />
                </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-[#fcfdff]">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Rate</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Unit</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {loading ? (
                            <tr><td colSpan="5" className="px-6 py-8 text-center text-sm text-gray-500">Loading...</td></tr>
                        ) : filtered.length === 0 ? (
                            <tr><td colSpan="5" className="px-6 py-16 text-center">
                                <Package className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                                <p className="text-sm text-gray-500">No items yet.</p>
                            </td></tr>
                        ) : filtered.map(item => (
                            <tr key={item._id} className="hover:bg-[#f6faff] transition-colors">
                                <td className="px-6 py-4 text-sm font-medium text-gray-900">{item.name}</td>
                                <td className="px-6 py-4 text-sm text-gray-600 truncate max-w-xs">{item.description || '—'}</td>
                                <td className="px-6 py-4 text-sm text-gray-900 font-mono">₹{item.rate.toFixed(2)}</td>
                                <td className="px-6 py-4 text-sm text-gray-600 uppercase">{item.unit}</td>
                                <td className="px-6 py-4 text-right space-x-2">
                                    <button onClick={() => { setEditing(item); setForm({ name: item.name, description: item.description || '', rate: item.rate, unit: item.unit }); setShowModal(true); }}
                                        className="text-[#0088FF] hover:bg-blue-50 p-1 rounded-full"><Edit2 className="h-4 w-4" /></button>
                                    <button onClick={() => handleDelete(item._id)} className="text-red-500 hover:bg-red-50 p-1 rounded-full"><Trash2 className="h-4 w-4" /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Add/Edit Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden" onClick={e => e.stopPropagation()}>
                        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                            <h2 className="text-lg font-semibold">{editing ? 'Edit Item' : 'New Item'}</h2>
                            <button onClick={() => setShowModal(false)}><X className="h-5 w-5 text-gray-400" /></button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Item Name *</label>
                                <input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:border-[#0088FF] outline-none" placeholder="e.g. Consulting Fee" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                <textarea rows="2" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })}
                                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:border-[#0088FF] outline-none" placeholder="Item details..." />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Rate *</label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">₹</span>
                                        <input required type="number" step="0.01" value={form.rate} onChange={e => setForm({ ...form, rate: Number(e.target.value) })}
                                            className="w-full border border-gray-200 rounded-lg pl-7 pr-3 py-2 text-sm focus:border-[#0088FF] outline-none font-mono" />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Unit</label>
                                    <input value={form.unit} onChange={e => setForm({ ...form, unit: e.target.value })}
                                        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:border-[#0088FF] outline-none" placeholder="pcs, hrs, etc." />
                                </div>
                            </div>
                            <div className="flex justify-end space-x-3 pt-4">
                                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50">Cancel</button>
                                <button type="submit" className="px-4 py-2 bg-[#0088FF] text-white rounded-lg text-sm font-medium hover:bg-[#0070d2]">{editing ? 'Update' : 'Create'}</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Items;
