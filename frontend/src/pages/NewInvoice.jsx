import React, { useState } from 'react';
import { ArrowLeft, Plus, Trash2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import API from '../config/api';

const NewInvoice = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        customerName: '',
        invoiceNumber: `INV-${Math.floor(Math.random() * 100000)}`,
        orderNumber: '',
        invoiceDate: new Date().toISOString().split('T')[0],
        terms: 'Net 15',
        dueDate: '',
        items: [{ item: '', description: '', quantity: 1, rate: 0, amount: 0 }],
        customerNotes: '',
        termsAndConditions: 'Thanks for your business.',
    });

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleItemChange = (index, field, value) => {
        const newItems = [...formData.items];
        newItems[index][field] = value;

        // Auto-calculate amount
        if (field === 'quantity' || field === 'rate') {
            newItems[index].amount = Number(newItems[index].quantity) * Number(newItems[index].rate);
        }

        setFormData({ ...formData, items: newItems });
    };

    const addItem = () => {
        setFormData({
            ...formData,
            items: [...formData.items, { item: '', description: '', quantity: 1, rate: 0, amount: 0 }]
        });
    };

    const removeItem = (index) => {
        const newItems = formData.items.filter((_, i) => i !== index);
        setFormData({ ...formData, items: newItems });
    };

    const calculateSubTotal = () => {
        return formData.items.reduce((acc, curr) => acc + curr.amount, 0);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const payload = {
                ...formData,
                subTotal: calculateSubTotal(),
                total: calculateSubTotal(),
                status: 'Draft'
            };
            await axios.post(`${API}/invoices`, payload);
            navigate('/invoices');
        } catch (error) {
            console.error('Error creating invoice', error);
            alert('Failed to create invoice');
        }
    };

    return (
        <div className="max-w-4xl mx-auto pb-20">
            <div className="flex items-center mb-6">
                <Link to="/invoices" className="text-gray-500 hover:text-gray-900 mr-4">
                    <ArrowLeft className="h-6 w-6" />
                </Link>
                <h1 className="text-2xl font-semibold text-gray-900">New Invoice</h1>
            </div>

            <form onSubmit={handleSubmit} className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                <div className="p-8">
                    {/* Top Section */}
                    <div className="grid grid-cols-12 gap-6 mb-8">
                        <div className="col-span-12 md:col-span-8 space-y-4">
                            <div className="flex items-center">
                                <label className="w-40 text-sm font-medium text-red-500">Customer Name*</label>
                                <div className="flex-1">
                                    <input
                                        type="text"
                                        required
                                        name="customerName"
                                        value={formData.customerName}
                                        onChange={handleInputChange}
                                        className="w-full border border-gray-300 rounded px-3 py-1.5 focus:border-[#0088FF] focus:ring-1 focus:ring-[#0088FF] outline-none transition"
                                        placeholder="E.g., Acme Corp"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="col-span-12 md:col-span-6 space-y-4 mt-6">
                            <div className="flex items-center">
                                <label className="w-40 text-sm font-medium text-gray-700">Invoice#*</label>
                                <div className="flex-1">
                                    <input
                                        type="text"
                                        required
                                        name="invoiceNumber"
                                        value={formData.invoiceNumber}
                                        onChange={handleInputChange}
                                        className="w-full border border-gray-300 rounded px-3 py-1.5 focus:border-[#0088FF] focus:ring-1 focus:ring-[#0088FF] outline-none text-sm"
                                    />
                                </div>
                            </div>
                            <div className="flex items-center">
                                <label className="w-40 text-sm font-medium text-gray-700">Order Number</label>
                                <div className="flex-1">
                                    <input
                                        type="text"
                                        name="orderNumber"
                                        value={formData.orderNumber}
                                        onChange={handleInputChange}
                                        className="w-full border border-gray-300 rounded px-3 py-1.5 focus:border-[#0088FF] focus:ring-1 focus:ring-[#0088FF] outline-none text-sm"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="col-span-12 md:col-span-6 space-y-4 mt-6">
                            <div className="flex items-center">
                                <label className="w-40 text-sm font-medium text-gray-700">Invoice Date*</label>
                                <div className="flex-1">
                                    <input
                                        type="date"
                                        required
                                        name="invoiceDate"
                                        value={formData.invoiceDate}
                                        onChange={handleInputChange}
                                        className="w-full border border-gray-300 rounded px-3 py-1.5 focus:border-[#0088FF] focus:ring-1 focus:ring-[#0088FF] outline-none text-sm"
                                    />
                                </div>
                            </div>
                            <div className="flex items-center">
                                <label className="w-40 text-sm font-medium text-gray-700">Terms</label>
                                <div className="flex-1 flex gap-2">
                                    <select
                                        name="terms"
                                        value={formData.terms}
                                        onChange={handleInputChange}
                                        className="w-1/2 border border-gray-300 rounded px-3 py-1.5 focus:border-[#0088FF] focus:ring-1 focus:ring-[#0088FF] outline-none text-sm"
                                    >
                                        <option>Due on Receipt</option>
                                        <option>Net 15</option>
                                        <option>Net 30</option>
                                        <option>Net 45</option>
                                        <option>Net 60</option>
                                    </select>
                                    <input
                                        type="date"
                                        name="dueDate"
                                        value={formData.dueDate}
                                        onChange={handleInputChange}
                                        className="w-1/2 border border-gray-300 rounded px-3 py-1.5 focus:border-[#0088FF] focus:ring-1 focus:ring-[#0088FF] outline-none text-sm"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Line Items Table */}
                    <div className="mt-10 overflow-x-auto border border-gray-200 rounded-t border-b-0">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-[#fcfdff]">
                                <tr>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-5/12">Item Details</th>
                                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider w-2/12">Quantity</th>
                                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider w-2/12">Rate</th>
                                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider w-2/12">Amount</th>
                                    <th className="px-4 py-3 w-1/12"></th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {formData.items.map((item, index) => (
                                    <tr key={index} className="group hover:bg-gray-50">
                                        <td className="px-4 py-3">
                                            <textarea
                                                rows="2"
                                                className="w-full border border-transparent hover:border-gray-300 focus:border-[#0088FF] rounded px-2 py-1 outline-none resize-none text-sm"
                                                placeholder="Type or click to select an item."
                                                value={item.item || item.description}
                                                onChange={(e) => handleItemChange(index, 'item', e.target.value)}
                                                required
                                            ></textarea>
                                        </td>
                                        <td className="px-4 py-3 text-right">
                                            <input
                                                type="number"
                                                min="1"
                                                className="w-full text-right border border-transparent hover:border-gray-300 focus:border-[#0088FF] rounded px-2 py-1 outline-none text-sm"
                                                value={item.quantity}
                                                onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
                                                required
                                            />
                                        </td>
                                        <td className="px-4 py-3 text-right">
                                            <input
                                                type="number"
                                                min="0"
                                                step="0.01"
                                                className="w-full text-right border border-transparent hover:border-gray-300 focus:border-[#0088FF] rounded px-2 py-1 outline-none text-sm"
                                                value={item.rate}
                                                onChange={(e) => handleItemChange(index, 'rate', e.target.value)}
                                                required
                                            />
                                        </td>
                                        <td className="px-4 py-3 text-right font-medium text-gray-900 text-sm">
                                            {item.amount.toFixed(2)}
                                        </td>
                                        <td className="px-4 py-3 text-center">
                                            {formData.items.length > 1 && (
                                                <button
                                                    type="button"
                                                    onClick={() => removeItem(index)}
                                                    className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="border border-t-0 border-gray-200 rounded-b p-4 bg-white flex justify-between">
                        <button
                            type="button"
                            onClick={addItem}
                            className="text-[#0088FF] text-sm font-medium flex items-center hover:underline"
                        >
                            <Plus className="h-4 w-4 mr-1" />
                            Add another line
                        </button>
                        <div className="w-1/3">
                            <div className="flex justify-between py-2 text-sm">
                                <span className="text-gray-600">Sub Total</span>
                                <span className="font-medium">{calculateSubTotal().toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between py-3 text-base border-t border-gray-200 font-semibold mt-2">
                                <span>Total ( ₹ )</span>
                                <span>{calculateSubTotal().toFixed(2)}</span>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 space-y-4 w-1/2">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Customer Notes</label>
                            <textarea
                                name="customerNotes"
                                value={formData.customerNotes}
                                onChange={handleInputChange}
                                className="w-full border border-gray-300 rounded px-3 py-2 focus:border-[#0088FF] focus:ring-1 focus:ring-[#0088FF] outline-none text-sm"
                                rows="3"
                                placeholder="Will be displayed on the invoice"
                            ></textarea>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Terms & Conditions</label>
                            <textarea
                                name="termsAndConditions"
                                value={formData.termsAndConditions}
                                onChange={handleInputChange}
                                className="w-full border border-gray-300 rounded px-3 py-2 focus:border-[#0088FF] focus:ring-1 focus:ring-[#0088FF] outline-none text-sm"
                                rows="3"
                            ></textarea>
                        </div>
                    </div>

                </div>

                {/* Footer Actions */}
                <div className="bg-gray-50 p-6 border-t border-gray-200 flex space-x-3 sticky bottom-0">
                    <button type="submit" className="bg-[#0088FF] text-white px-5 py-2 rounded shadow-sm text-sm font-medium hover:bg-[#0070d2] transition">
                        Save as Draft
                    </button>
                    <button type="button" className="bg-white border border-gray-300 text-gray-700 px-5 py-2 rounded shadow-sm text-sm font-medium hover:bg-gray-50 transition">
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default NewInvoice;
