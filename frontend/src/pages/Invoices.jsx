import React, { useState, useEffect } from 'react';
import { Plus, Filter, Search, FileText, CreditCard, ChevronDown, Download } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import jsPDF from 'jspdf';

const API = 'http://localhost:5001/api';

const Invoices = () => {
    const [invoices, setInvoices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchParams] = useSearchParams();
    const [statusDropdown, setStatusDropdown] = useState(null);
    const [recordingPayment, setRecordingPayment] = useState(null);
    const [paymentDetails, setPaymentDetails] = useState({ mode: 'Cash', date: new Date().toISOString().split('T')[0] });

    useEffect(() => {
        fetchInvoices();
        // Check for payment success callback
        const payment = searchParams.get('payment');
        const invoiceId = searchParams.get('invoiceId');
        if (payment === 'success' && invoiceId) {
            axios.post(`${API}/payments/verify`, { invoiceId }).then(() => fetchInvoices());
        }
    }, []);

    const fetchInvoices = async () => {
        try {
            const res = await axios.get(`${API}/invoices`);
            setInvoices(res.data);
        } catch (error) { console.error('Error fetching invoices', error); }
        finally { setLoading(false); }
    };

    const updateStatus = async (id, status) => {
        try {
            await axios.patch(`${API}/invoices/${id}/status`, { status });
            setStatusDropdown(null);
            fetchInvoices();
        } catch (err) { alert('Error updating status'); }
    };

    const handlePay = async (invoice) => {
        try {
            const res = await axios.post(`${API}/payments/create-session`, { invoiceId: invoice._id });
            if (res.data.url) {
                window.location.href = res.data.url;
            }
        } catch (err) {
            // If Stripe not configured, mark as paid manually
            if (confirm('Stripe not configured. Mark as paid manually?')) {
                await axios.post(`${API}/payments/verify`, { invoiceId: invoice._id });
                fetchInvoices();
            }
        }
    };

    const handleRecordPayment = async () => {
        try {
            await axios.post(`${API}/payments/verify`, {
                invoiceId: recordingPayment._id,
                paymentMode: paymentDetails.mode,
                paidAt: paymentDetails.date
            });
            setRecordingPayment(null);
            setStatusDropdown(null);
            fetchInvoices();
        } catch (err) { alert('Error recording payment'); }
    };

    const handleDownload = (invoice) => {
        const doc = new jsPDF();

        // Add Header
        doc.setFontSize(22);
        doc.text('INVOICE', 105, 20, { align: 'center' });

        doc.setFontSize(12);
        doc.text(`Invoice #: ${invoice.invoiceNumber}`, 20, 40);
        doc.text(`Date: ${new Date(invoice.invoiceDate).toLocaleDateString()}`, 20, 50);
        doc.text(`Status: ${invoice.status}`, 20, 60);

        doc.setFontSize(14);
        doc.text('Bill To:', 20, 80);
        doc.setFontSize(12);
        doc.text(invoice.customerName, 20, 90);

        // Items Table Header
        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        doc.text('Item', 20, 110);
        doc.text('Qty', 120, 110, { align: 'right' });
        doc.text('Rate', 150, 110, { align: 'right' });
        doc.text('Amount', 190, 110, { align: 'right' });
        doc.line(20, 115, 190, 115);

        // Items
        doc.setFont('helvetica', 'normal');
        let y = 125;
        invoice.items.forEach(item => {
            doc.text(item.item || item.description, 20, y);
            doc.text(item.quantity.toString(), 120, y, { align: 'right' });
            doc.text(item.rate.toFixed(2), 150, y, { align: 'right' });
            doc.text(item.amount.toFixed(2), 190, y, { align: 'right' });
            y += 10;
        });

        doc.line(20, y, 190, y);
        y += 10;

        // Totals
        doc.setFont('helvetica', 'bold');
        doc.text('Total:', 150, y, { align: 'right' });
        doc.text(`₹${invoice.total.toFixed(2)}`, 190, y, { align: 'right' });

        doc.save(`${invoice.invoiceNumber}.pdf`);
    };

    const statusColor = (s) => {
        const map = { Draft: 'bg-gray-100 text-gray-700', Sent: 'bg-blue-100 text-blue-700', Viewed: 'bg-yellow-100 text-yellow-700', Paid: 'bg-green-100 text-green-700', Overdue: 'bg-red-100 text-red-700' };
        return map[s] || 'bg-gray-100 text-gray-700';
    };

    return (
        <div className="max-w-screen-xl mx-auto h-full flex flex-col">
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center">
                    <FileText className="h-6 w-6 text-gray-400 mr-2" />
                    <h1 className="text-2xl font-semibold text-gray-900">All Invoices</h1>
                </div>
                <div className="flex space-x-3">
                    <Link to="/invoices/new" className="bg-[#0088FF] text-white px-4 py-2 rounded shadow-sm text-sm font-medium hover:bg-[#0070d2] transition flex items-center">
                        <Plus className="h-4 w-4 mr-1.5" /> New
                    </Link>
                </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg shadow-sm flex-1 overflow-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-[#fcfdff] sticky top-0">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Invoice#</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Amount</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {loading ? (
                            <tr><td colSpan="6" className="px-6 py-8 text-center text-sm text-gray-500">Loading invoices...</td></tr>
                        ) : invoices.length === 0 ? (
                            <tr><td colSpan="6" className="px-6 py-16 text-center">
                                <FileText className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                                <p className="text-sm text-gray-500 mb-4">No invoices found. Create a new one to get started.</p>
                                <Link to="/invoices/new" className="bg-[#0088FF] text-white px-4 py-2 rounded shadow-sm text-sm font-medium">New Invoice</Link>
                            </td></tr>
                        ) : invoices.map((invoice) => (
                            <tr key={invoice._id} className="hover:bg-[#f6faff] transition-colors">
                                <td className="px-6 py-4 text-sm text-gray-900">{new Date(invoice.invoiceDate).toLocaleDateString()}</td>
                                <td className="px-6 py-4 text-sm text-[#0088FF] font-medium">{invoice.invoiceNumber}</td>
                                <td className="px-6 py-4 text-sm text-gray-900 font-medium">{invoice.customerName}</td>
                                <td className="px-6 py-4 text-sm relative">
                                    <button onClick={() => setStatusDropdown(statusDropdown === invoice._id ? null : invoice._id)}
                                        className={`px-2 py-0.5 text-xs font-semibold rounded inline-flex items-center ${statusColor(invoice.status)}`}>
                                        {invoice.status} <ChevronDown className="h-3 w-3 ml-1" />
                                    </button>
                                    {statusDropdown === invoice._id && (
                                        <div className="absolute top-12 left-6 bg-white border border-gray-200 rounded-lg shadow-xl py-1 z-20 w-32">
                                            {['Draft', 'Sent', 'Viewed', 'Paid', 'Overdue'].map(s => (
                                                <button key={s} onClick={() => updateStatus(invoice._id, s)}
                                                    className={`block w-full text-left px-3 py-1.5 text-xs hover:bg-gray-50 ${invoice.status === s ? 'font-bold text-[#0088FF]' : 'text-gray-700'}`}>
                                                    {s}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-900 text-right font-medium font-mono">₹{invoice.total.toFixed(2)}</td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex justify-end space-x-2">
                                        <button onClick={() => handleDownload(invoice)}
                                            className="p-1.5 text-gray-500 hover:text-[#0088FF] hover:bg-blue-50 rounded-lg transition-colors group relative"
                                            title="Download PDF">
                                            <Download className="h-4 w-4" />
                                        </button>
                                        {invoice.status !== 'Paid' && (
                                            <>
                                                <button onClick={() => handlePay(invoice)}
                                                    className="text-white hover:bg-[#0070d2] text-xs font-medium inline-flex items-center bg-[#0088FF] px-2.5 py-1 rounded transition-colors">
                                                    <CreditCard className="h-3 w-3 mr-1" /> Pay
                                                </button>
                                                <button onClick={() => setRecordingPayment(invoice)}
                                                    className="text-gray-600 hover:bg-gray-200 text-xs font-medium inline-flex items-center bg-gray-100 px-2.5 py-1 rounded transition-colors">
                                                    Record
                                                </button>
                                            </>
                                        )}
                                        {invoice.status === 'Paid' && (
                                            <span className="text-green-600 text-xs font-medium flex items-center">✓ Paid</span>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {/* Record Payment Modal */}
            {recordingPayment && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
                        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                            <h2 className="text-xl font-bold text-gray-800">Record Payment</h2>
                            <button onClick={() => setRecordingPayment(null)} className="text-gray-400 hover:text-gray-600 transition-colors p-1 hover:bg-gray-100 rounded-full">
                                <Plus className="h-6 w-6 rotate-45" />
                            </button>
                        </div>
                        <div className="p-8 space-y-6">
                            <div>
                                <p className="text-sm font-medium text-gray-500 mb-1 uppercase tracking-wider">Invoice</p>
                                <p className="text-lg font-bold text-gray-900 bg-blue-50 px-3 py-2 rounded-lg border border-blue-100 inline-block">
                                    {recordingPayment.invoiceNumber} — ₹{recordingPayment.total.toFixed(2)}
                                </p>
                            </div>

                            <div className="grid grid-cols-1 gap-6">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Payment Mode</label>
                                    <div className="grid grid-cols-2 gap-3">
                                        {['Cash', 'Check', 'Bank Transfer', 'Online'].map(mode => (
                                            <button
                                                key={mode}
                                                onClick={() => setPaymentDetails({ ...paymentDetails, mode })}
                                                className={`px-4 py-2.5 rounded-lg border text-sm font-medium transition-all duration-200 ${paymentDetails.mode === mode
                                                    ? 'border-[#0088FF] bg-[#0088FF]/5 text-[#0088FF] shadow-sm'
                                                    : 'border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50'
                                                    }`}
                                            >
                                                {mode}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Payment Date</label>
                                    <input
                                        type="date"
                                        className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-gray-900 focus:ring-2 focus:ring-[#0088FF]/20 focus:border-[#0088FF] transition-all outline-none"
                                        value={paymentDetails.date}
                                        onChange={(e) => setPaymentDetails({ ...paymentDetails, date: e.target.value })}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="px-8 py-5 bg-gray-50 border-t border-gray-100 flex justify-end space-x-3">
                            <button
                                onClick={() => setRecordingPayment(null)}
                                className="px-6 py-2.5 text-gray-600 font-semibold hover:text-gray-800 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleRecordPayment}
                                className="bg-[#0088FF] text-white px-8 py-2.5 rounded-lg font-bold shadow-lg hover:bg-[#0070d2] hover:shadow-xl active:transform active:scale-95 transition-all duration-200"
                            >
                                Record Payment
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Invoices;
