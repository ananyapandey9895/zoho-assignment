import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, FileText, Send, Download, CheckCircle, RefreshCcw } from 'lucide-react';
import axios from 'axios';
import jsPDF from 'jspdf';

import API from '../config/api';

const QuoteDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [quote, setQuote] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchQuote = async () => {
            try {
                const res = await axios.get(`${API}/quotes/${id}`);
                setQuote(res.data);
            } catch (err) { console.error(err); }
            finally { setLoading(false); }
        };
        fetchQuote();
    }, [id]);

    const handleConvert = async () => {
        if (!confirm('Convert this quote to an invoice?')) return;
        try {
            await axios.post(`${API}/quotes/${id}/convert`);
            alert('Quote converted to invoice!');
            navigate('/invoices');
        } catch (err) { alert(err.response?.data?.message || 'Error converting'); }
    };

    const handleDownload = () => {
        if (!quote) return;
        const doc = new jsPDF();

        doc.setFontSize(22);
        doc.text('QUOTE', 105, 20, { align: 'center' });

        doc.setFontSize(12);
        doc.text(`Quote #: ${quote.quoteNumber}`, 20, 40);
        doc.text(`Date: ${new Date(quote.quoteDate).toLocaleDateString()}`, 20, 50);
        doc.text(`Status: ${quote.status}`, 20, 60);

        doc.setFontSize(14);
        doc.text('Bill To:', 20, 80);
        doc.setFontSize(12);
        doc.text(quote.customerName, 20, 90);

        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        doc.text('Item', 20, 110);
        doc.text('Qty', 120, 110, { align: 'right' });
        doc.text('Rate', 150, 110, { align: 'right' });
        doc.text('Amount', 190, 110, { align: 'right' });
        doc.line(20, 115, 190, 115);

        doc.setFont('helvetica', 'normal');
        let y = 125;
        quote.items.forEach(item => {
            doc.text(item.item || item.description, 20, y);
            doc.text(item.quantity.toString(), 120, y, { align: 'right' });
            doc.text(item.rate.toFixed(2), 150, y, { align: 'right' });
            doc.text(item.amount.toFixed(2), 190, y, { align: 'right' });
            y += 10;
        });

        doc.line(20, y, 190, y);
        y += 10;

        doc.setFont('helvetica', 'bold');
        doc.text('Total:', 150, y, { align: 'right' });
        doc.text(`₹${quote.total.toFixed(2)}`, 190, y, { align: 'right' });

        doc.save(`${quote.quoteNumber}.pdf`);
    };

    if (loading) return <div className="p-8 text-center text-gray-500">Loading quote...</div>;
    if (!quote) return <div className="p-8 text-center text-red-500">Quote not found.</div>;

    return (
        <div className="max-w-4xl mx-auto pb-12">
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center">
                    <Link to="/quotes" className="mr-4 text-gray-400 hover:text-gray-600">
                        <ArrowLeft className="h-5 w-5" />
                    </Link>
                    <h1 className="text-2xl font-bold text-gray-900">{quote.quoteNumber}</h1>
                    <span className={`ml-4 px-2.5 py-0.5 rounded-full text-xs font-semibold ${quote.status === 'Converted' ? 'bg-purple-100 text-purple-700' :
                        quote.status === 'Accepted' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                        }`}>
                        {quote.status}
                    </span>
                </div>
                <div className="flex items-center space-x-3">
                    {quote.status !== 'Converted' && (
                        <button onClick={handleConvert} className="bg-[#0088FF] text-white px-4 py-2 rounded-lg text-sm font-semibold flex items-center hover:bg-[#0070d2] transition">
                            Convert to Invoice
                        </button>
                    )}
                    <button onClick={handleDownload} className="bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-semibold flex items-center hover:bg-gray-50 transition">
                        <Download className="h-4 w-4 mr-2" /> PDF
                    </button>
                </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
                <div className="p-8 border-b border-gray-100 flex justify-between">
                    <div>
                        <div className="text-xl font-bold text-[#0088FF] mb-4">Zoho Clone</div>
                        <div className="text-sm text-gray-600 leading-relaxed">
                            123 Tech Street<br />
                            Whitefield, Bangalore<br />
                            Karnataka, 560066
                        </div>
                    </div>
                    <div className="text-right">
                        <h2 className="text-3xl font-light text-gray-400 uppercase tracking-widest mb-4">Quote</h2>
                        <div className="text-sm space-y-1">
                            <p><span className="text-gray-500">Quote Number:</span> <span className="font-semibold">{quote.quoteNumber}</span></p>
                            <p><span className="text-gray-500">Date:</span> <span>{new Date(quote.quoteDate).toLocaleDateString()}</span></p>
                            {quote.expiryDate && <p><span className="text-gray-500">Expiry Date:</span> <span>{new Date(quote.expiryDate).toLocaleDateString()}</span></p>}
                        </div>
                    </div>
                </div>

                <div className="p-8">
                    <div className="mb-8 font-semibold text-gray-400 text-xs uppercase tracking-wider">Bill To</div>
                    <div className="text-lg font-bold text-gray-800 mb-8">{quote.customerName}</div>

                    <table className="w-full text-sm mb-12">
                        <thead>
                            <tr className="border-b border-gray-200 text-gray-400">
                                <th className="text-left font-medium py-3">Item Details</th>
                                <th className="text-right font-medium py-3 w-24">Quantity</th>
                                <th className="text-right font-medium py-3 w-32">Rate</th>
                                <th className="text-right font-medium py-3 w-32">Amount</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {quote.items.map((item, idx) => (
                                <tr key={idx}>
                                    <td className="py-4">
                                        <div className="font-semibold text-gray-800">{item.item}</div>
                                        <div className="text-xs text-gray-500 mt-1">{item.description}</div>
                                    </td>
                                    <td className="py-4 text-right text-gray-600">{item.quantity}</td>
                                    <td className="py-4 text-right text-gray-600">₹{item.rate.toFixed(2)}</td>
                                    <td className="py-4 text-right font-semibold text-gray-800 font-mono">₹{item.amount.toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className="flex justify-end">
                        <div className="w-64 space-y-3">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-500">Sub Total</span>
                                <span className="text-gray-800 font-mono">₹{quote.subTotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-500">Tax (0%)</span>
                                <span className="text-gray-800 font-mono">₹{quote.taxTotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-lg font-bold border-t border-gray-200 pt-3">
                                <span>Total</span>
                                <span className="text-[#0088FF] font-mono">₹{quote.total.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {quote.notes && (
                    <div className="p-8 bg-gray-50 border-t border-gray-100">
                        <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Notes</div>
                        <p className="text-sm text-gray-600 leading-relaxed">{quote.notes}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default QuoteDetails;
