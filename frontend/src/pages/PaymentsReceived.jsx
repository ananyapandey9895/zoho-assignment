import React, { useState, useEffect } from 'react';
import { CreditCard, FileText, Search, User, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import API from '../config/api';

const PaymentsReceived = () => {
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');

    useEffect(() => {
        const fetchPayments = async () => {
            try {
                const res = await axios.get(`${API}/invoices`);
                // Filtering for invoices that are "Paid"
                setPayments(res.data.filter(inv => inv.status === 'Paid'));
            } catch (err) { console.error(err); }
            finally { setLoading(false); }
        };
        fetchPayments();
    }, []);

    const filtered = payments.filter(p =>
        p.customerName.toLowerCase().includes(search.toLowerCase()) ||
        p.invoiceNumber.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="max-w-screen-xl mx-auto h-full flex flex-col">
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center">
                    <CreditCard className="h-6 w-6 text-gray-400 mr-2" />
                    <h1 className="text-2xl font-semibold text-gray-900">Payments Received</h1>
                </div>
                <Link to="/payments/new" className="bg-[#0088FF] text-white px-4 py-2 rounded shadow-sm text-sm font-semibold hover:bg-[#0070d2] transition flex items-center">
                    <Plus className="h-4 w-4 mr-1.5" /> Record Payment
                </Link>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 shadow-sm mb-4 p-4">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input type="text" placeholder="Search by customer or invoice#..." value={search} onChange={e => setSearch(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-md text-sm focus:border-[#0088FF] outline-none" />
                </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg shadow-sm flex-1 overflow-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-[#fcfdff] sticky top-0">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Invoice#</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment Mode</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {loading ? (
                            <tr><td colSpan="5" className="px-6 py-8 text-center text-sm text-gray-500">Loading...</td></tr>
                        ) : filtered.length === 0 ? (
                            <tr><td colSpan="5" className="px-6 py-16 text-center">
                                <CreditCard className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                                <p className="text-sm text-gray-500">No payments recorded yet.</p>
                            </td></tr>
                        ) : filtered.map((p) => (
                            <tr key={p._id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                    {p.paidAt ? new Date(p.paidAt).toLocaleDateString() : new Date(p.updatedAt).toLocaleDateString()}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-[#0088FF] font-medium">{p.invoiceNumber}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className="h-7 w-7 rounded-full bg-gray-100 flex items-center justify-center mr-2">
                                            <User className="h-4 w-4 text-gray-400" />
                                        </div>
                                        <span className="text-sm font-medium text-gray-900">{p.customerName}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 uppercase">
                                    {p.paymentId ? 'Stripe (Online)' : 'Manual'}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right font-bold font-mono">
                                    ₹{p.total.toFixed(2)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PaymentsReceived;
