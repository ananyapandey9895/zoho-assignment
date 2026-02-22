import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowLeft, CreditCard, Calendar, User, Search } from 'lucide-react';
import axios from 'axios';

const API = 'http://localhost:5001/api';

const RecordPayment = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const preselectedInvoiceId = searchParams.get('invoiceId');

    const [invoices, setInvoices] = useState([]);
    const [selectedInvoice, setSelectedInvoice] = useState(null);
    const [paymentData, setPaymentData] = useState({
        amount: 0,
        paidAt: new Date().toISOString().split('T')[0],
        paymentMode: 'Cash'
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchInvoices = async () => {
            try {
                const res = await axios.get(`${API}/invoices`);
                const unpaid = res.data.filter(inv => inv.status !== 'Paid' && inv.status !== 'Void');
                setInvoices(unpaid);
                if (preselectedInvoiceId) {
                    const inv = unpaid.find(i => i._id === preselectedInvoiceId);
                    if (inv) {
                        setSelectedInvoice(inv);
                        setPaymentData(prev => ({ ...prev, amount: inv.total }));
                    }
                }
            } catch (err) { console.error(err); }
            finally { setLoading(false); }
        };
        fetchInvoices();
    }, [preselectedInvoiceId]);

    const handleInvoiceSelect = (inv) => {
        setSelectedInvoice(inv);
        setPaymentData(prev => ({ ...prev, amount: inv.total }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedInvoice) return alert('Please select an invoice');
        try {
            await axios.post(`${API}/payments/verify`, {
                invoiceId: selectedInvoice._id,
                paymentMode: paymentData.paymentMode,
                paidAt: paymentData.paidAt
            });
            alert('Payment recorded successfully!');
            navigate('/payments');
        } catch (err) { alert(err.response?.data?.message || 'Error recording payment'); }
    };

    return (
        <div className="max-w-4xl mx-auto pb-12">
            <div className="flex items-center mb-8">
                <button onClick={() => navigate(-1)} className="mr-4 text-gray-400 hover:text-gray-600 transition">
                    <ArrowLeft className="h-5 w-5" />
                </button>
                <h1 className="text-2xl font-bold text-gray-900">Record Payment</h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-xl shadow-sm p-8 space-y-6">
                        {!selectedInvoice ? (
                            <div className="space-y-4">
                                <label className="block text-sm font-semibold text-gray-700">Select Invoice to Pay</label>
                                <div className="space-y-2 max-h-64 overflow-auto border border-gray-100 rounded-lg p-2">
                                    {invoices.length === 0 ? (
                                        <p className="p-4 text-center text-gray-500 text-sm">No unpaid invoices found.</p>
                                    ) : invoices.map(inv => (
                                        <div key={inv._id} onClick={() => handleInvoiceSelect(inv)}
                                            className="p-3 border border-gray-50 rounded-lg hover:bg-blue-50 cursor-pointer transition flex justify-between items-center">
                                            <div>
                                                <div className="font-bold text-sm text-gray-800">{inv.invoiceNumber}</div>
                                                <div className="text-xs text-gray-500">{inv.customerName}</div>
                                            </div>
                                            <div className="font-mono font-bold text-gray-700 text-sm">₹{inv.total.toFixed(2)}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <div className="flex justify-between items-center bg-blue-50 p-4 rounded-lg">
                                <div>
                                    <div className="text-xs text-blue-500 font-bold uppercase tracking-wider mb-1">Selected Invoice</div>
                                    <div className="font-bold text-lg text-blue-900">{selectedInvoice.invoiceNumber} — {selectedInvoice.customerName}</div>
                                </div>
                                <button type="button" onClick={() => setSelectedInvoice(null)} className="text-xs text-blue-600 hover:underline">Change</button>
                            </div>
                        )}

                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                                    <Calendar className="h-4 w-4 mr-2 text-gray-400" /> Payment Date
                                </label>
                                <input type="date" value={paymentData.paidAt} onChange={e => setPaymentData(prev => ({ ...prev, paidAt: e.target.value }))}
                                    className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:border-[#0088FF] focus:ring-1 focus:ring-blue-100 outline-none transition" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                                    <CreditCard className="h-4 w-4 mr-2 text-gray-400" /> Payment Mode
                                </label>
                                <select value={paymentData.paymentMode} onChange={e => setPaymentData(prev => ({ ...prev, paymentMode: e.target.value }))}
                                    className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:border-[#0088FF] outline-none bg-white">
                                    <option value="Cash">Cash</option>
                                    <option value="Check">Check</option>
                                    <option value="Bank Transfer">Bank Transfer</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Amount Received</label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-medium">₹</span>
                                <input readOnly type="number" value={paymentData.amount}
                                    className="w-full border border-gray-200 rounded-lg pl-8 pr-4 py-2.5 text-sm bg-gray-50 text-gray-500 font-mono font-bold" />
                            </div>
                            <p className="text-[11px] text-gray-400 mt-2 italic">Full payment recording is currently supported.</p>
                        </div>

                        <div className="pt-4 border-t border-gray-50 flex justify-end space-x-3">
                            <button type="button" onClick={() => navigate('/payments')} className="px-6 py-2.5 border border-gray-200 rounded-lg text-sm font-semibold text-gray-600 hover:bg-gray-50 transition">Cancel</button>
                            <button type="submit" disabled={!selectedInvoice} className="px-8 py-2.5 bg-[#0088FF] text-white rounded-lg text-sm font-bold shadow-md shadow-blue-100 hover:bg-[#0070d2] disabled:opacity-50 transition">Record Payment</button>
                        </div>
                    </form>
                </div>

                <div className="space-y-6">
                    <div className="bg-[#fcfdff] border border-blue-50 rounded-xl p-6">
                        <h3 className="text-sm font-bold text-gray-800 mb-4 uppercase tracking-wider text-[11px]">Payment Tips</h3>
                        <ul className="space-y-4">
                            <li className="flex items-start text-sm text-gray-600">
                                <div className="h-5 w-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-[10px] font-bold mr-3 mt-0.5">1</div>
                                <span>Record offline payments like cash or check to keep your records straight.</span>
                            </li>
                            <li className="flex items-start text-sm text-gray-600">
                                <div className="h-5 w-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-[10px] font-bold mr-3 mt-0.5">2</div>
                                <span>Manually recording a payment will mark the associated invoice as <b>Paid</b>.</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RecordPayment;
