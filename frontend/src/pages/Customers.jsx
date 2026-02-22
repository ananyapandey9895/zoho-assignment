import React, { useState, useEffect } from 'react';
import { Plus, Search, Users, Mail, Phone, Building2, X, Trash2, FileText } from 'lucide-react';
import axios from 'axios';

const API = 'http://localhost:5001/api';

const Customers = () => {
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editing, setEditing] = useState(null);
    const [search, setSearch] = useState('');
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [customerInvoices, setCustomerInvoices] = useState([]);
    const [form, setForm] = useState({ name: '', email: '', phone: '', company: '', gstin: '' });

    useEffect(() => { fetchCustomers(); }, []);

    const fetchCustomers = async () => {
        try {
            const res = await axios.get(`${API}/customers`);
            setCustomers(res.data);
        } catch (err) { console.error(err); }
        finally { setLoading(false); }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editing) {
                await axios.put(`${API}/customers/${editing._id}`, form);
            } else {
                await axios.post(`${API}/customers`, form);
            }
            setShowModal(false);
            setEditing(null);
            setForm({ name: '', email: '', phone: '', company: '', gstin: '' });
            fetchCustomers();
        } catch (err) { alert(err.response?.data?.message || 'Error saving customer'); }
    };

    const handleDelete = async (id) => {
        if (!confirm('Delete this customer?')) return;
        await axios.delete(`${API}/customers/${id}`);
        fetchCustomers();
    };

    const viewInvoices = async (customer) => {
        setSelectedCustomer(customer);
        try {
            const res = await axios.get(`${API}/customers/${customer._id}/invoices`);
            setCustomerInvoices(res.data);
        } catch (err) { setCustomerInvoices([]); }
    };

    const filtered = customers.filter(c =>
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.email.toLowerCase().includes(search.toLowerCase()) ||
        (c.company || '').toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="max-w-screen-xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center">
                    <Users className="h-6 w-6 text-gray-400 mr-2" />
                    <h1 className="text-2xl font-semibold text-gray-900">Customers</h1>
                </div>
                <button onClick={() => { setEditing(null); setForm({ name: '', email: '', phone: '', company: '', gstin: '' }); setShowModal(true); }}
                    className="bg-[#0088FF] text-white px-4 py-2 rounded shadow-sm text-sm font-medium hover:bg-[#0070d2] transition flex items-center">
                    <Plus className="h-4 w-4 mr-1.5" /> New Customer
                </button>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 shadow-sm mb-4 p-4">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input type="text" placeholder="Search customers..." value={search} onChange={e => setSearch(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-md text-sm focus:border-[#0088FF] focus:ring-1 focus:ring-[#0088FF]/30 outline-none" />
                </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-[#fcfdff]">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Company</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Phone</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {loading ? (
                            <tr><td colSpan="5" className="px-6 py-8 text-center text-sm text-gray-500">Loading...</td></tr>
                        ) : filtered.length === 0 ? (
                            <tr><td colSpan="5" className="px-6 py-16 text-center">
                                <Users className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                                <p className="text-sm text-gray-500">No customers yet.</p>
                            </td></tr>
                        ) : filtered.map(c => (
                            <tr key={c._id} className="hover:bg-[#f6faff] transition-colors cursor-pointer" onClick={() => viewInvoices(c)}>
                                <td className="px-6 py-4 text-sm font-medium text-gray-900">{c.name}</td>
                                <td className="px-6 py-4 text-sm text-gray-600">{c.company || '—'}</td>
                                <td className="px-6 py-4 text-sm text-gray-600">{c.email}</td>
                                <td className="px-6 py-4 text-sm text-gray-600">{c.phone || '—'}</td>
                                <td className="px-6 py-4 text-right space-x-2" onClick={e => e.stopPropagation()}>
                                    <button onClick={() => { setEditing(c); setForm({ name: c.name, email: c.email, phone: c.phone || '', company: c.company || '', gstin: c.gstin || '' }); setShowModal(true); }}
                                        className="text-[#0088FF] hover:underline text-sm">Edit</button>
                                    <button onClick={() => handleDelete(c._id)} className="text-red-500 hover:underline text-sm">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Customer Invoices Panel */}
            {selectedCustomer && (
                <div className="fixed inset-0 bg-black/30 z-50 flex justify-end" onClick={() => setSelectedCustomer(null)}>
                    <div className="w-[480px] bg-white h-full shadow-xl overflow-y-auto" onClick={e => e.stopPropagation()}>
                        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                            <div>
                                <h2 className="text-lg font-semibold">{selectedCustomer.name}</h2>
                                <p className="text-sm text-gray-500">{selectedCustomer.email}</p>
                            </div>
                            <button onClick={() => setSelectedCustomer(null)}><X className="h-5 w-5 text-gray-400" /></button>
                        </div>
                        <div className="p-6">
                            <h3 className="text-sm font-semibold text-gray-700 mb-4 flex items-center"><FileText className="h-4 w-4 mr-2" />Invoices</h3>
                            {customerInvoices.length === 0 ? (
                                <p className="text-sm text-gray-400">No invoices for this customer.</p>
                            ) : customerInvoices.map(inv => (
                                <div key={inv._id} className="flex justify-between items-center py-3 border-b border-gray-100">
                                    <div>
                                        <div className="text-sm font-medium text-[#0088FF]">{inv.invoiceNumber}</div>
                                        <div className="text-xs text-gray-500">{new Date(inv.invoiceDate).toLocaleDateString()}</div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-sm font-medium">₹{inv.total.toFixed(2)}</div>
                                        <span className={`text-xs px-1.5 py-0.5 rounded ${inv.status === 'Paid' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>{inv.status}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Add/Edit Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center" onClick={() => setShowModal(false)}>
                    <div className="bg-white rounded-xl shadow-2xl w-[500px] max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
                        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                            <h2 className="text-lg font-semibold">{editing ? 'Edit Customer' : 'New Customer'}</h2>
                            <button onClick={() => setShowModal(false)}><X className="h-5 w-5 text-gray-400" /></button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                                <input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:border-[#0088FF] outline-none" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                                <input required type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:border-[#0088FF] outline-none" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                                    <input value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })}
                                        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:border-[#0088FF] outline-none" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                                    <input value={form.company} onChange={e => setForm({ ...form, company: e.target.value })}
                                        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:border-[#0088FF] outline-none" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">GSTIN</label>
                                <input value={form.gstin} onChange={e => setForm({ ...form, gstin: e.target.value })}
                                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:border-[#0088FF] outline-none" />
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

export default Customers;
