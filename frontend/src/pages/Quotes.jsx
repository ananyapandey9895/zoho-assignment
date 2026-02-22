import React, { useState, useEffect } from 'react';
import { Plus, FileText, MoreVertical, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const API = 'http://localhost:5001/api';

const Quotes = () => {
    const [quotes, setQuotes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => { fetchQuotes(); }, []);

    const fetchQuotes = async () => {
        try {
            const res = await axios.get(`${API}/quotes`);
            setQuotes(res.data);
        } catch (err) { console.error(err); }
        finally { setLoading(false); }
    };

    const convertToInvoice = async (id) => {
        if (!confirm('Convert this quote to an invoice?')) return;
        try {
            const res = await axios.post(`${API}/quotes/${id}/convert`);
            alert(`Invoice ${res.data.invoice.invoiceNumber} created!`);
            fetchQuotes();
        } catch (err) { alert(err.response?.data?.message || 'Error converting'); }
    };

    const handleDelete = async (id) => {
        if (!confirm('Delete this quote?')) return;
        await axios.delete(`${API}/quotes/${id}`);
        fetchQuotes();
    };

    const statusColor = (s) => {
        const map = { Draft: 'bg-gray-100 text-gray-700', Sent: 'bg-blue-100 text-blue-700', Accepted: 'bg-green-100 text-green-700', Declined: 'bg-red-100 text-red-700', Converted: 'bg-purple-100 text-purple-700' };
        return map[s] || 'bg-gray-100 text-gray-700';
    };

    return (
        <div className="max-w-screen-xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center">
                    <FileText className="h-6 w-6 text-gray-400 mr-2" />
                    <h1 className="text-2xl font-semibold text-gray-900">Quotes</h1>
                </div>
                <Link to="/quotes/new" className="bg-[#0088FF] text-white px-4 py-2 rounded shadow-sm text-sm font-medium hover:bg-[#0070d2] transition flex items-center">
                    <Plus className="h-4 w-4 mr-1.5" /> New Quote
                </Link>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-[#fcfdff]">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Quote#</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Amount</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {loading ? (
                            <tr><td colSpan="6" className="px-6 py-8 text-center text-sm text-gray-500">Loading...</td></tr>
                        ) : quotes.length === 0 ? (
                            <tr><td colSpan="6" className="px-6 py-16 text-center">
                                <FileText className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                                <p className="text-sm text-gray-500 mb-4">No quotes yet.</p>
                                <Link to="/quotes/new" className="bg-[#0088FF] text-white px-4 py-2 rounded text-sm font-medium">Create Quote</Link>
                            </td></tr>
                        ) : quotes.map(q => (
                            <tr key={q._id} className="hover:bg-[#f6faff] transition-colors">
                                <td className="px-6 py-4 text-sm text-gray-900">{new Date(q.quoteDate).toLocaleDateString()}</td>
                                <td className="px-6 py-4 text-sm text-[#0088FF] font-medium">{q.quoteNumber}</td>
                                <td className="px-6 py-4 text-sm text-gray-900 font-medium">{q.customerName}</td>
                                <td className="px-6 py-4 text-sm">
                                    <span className={`px-2 py-0.5 text-xs font-semibold rounded ${statusColor(q.status)}`}>{q.status}</span>
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-900 text-right font-medium font-mono">₹{q.total.toFixed(2)}</td>
                                <td className="px-6 py-4 text-right space-y-1">
                                    <div className="flex items-center justify-end space-x-3">
                                        <Link to={`/quotes/${q._id}`} className="text-[#0088FF] hover:underline text-xs font-semibold">View</Link>
                                        {q.status !== 'Converted' && (
                                            <button onClick={() => convertToInvoice(q._id)} className="text-purple-600 hover:underline text-xs font-semibold flex items-center">
                                                Convert
                                            </button>
                                        )}
                                        <button onClick={() => handleDelete(q._id)} className="text-red-500 hover:underline text-xs">Delete</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Quotes;
