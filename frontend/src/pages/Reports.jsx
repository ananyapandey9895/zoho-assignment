import React, { useState, useEffect } from 'react';
import { BarChart3, IndianRupee, TrendingUp, FileText, CheckCircle, AlertCircle } from 'lucide-react';
import axios from 'axios';

import API from '../config/api';

const Reports = () => {
    const [summary, setSummary] = useState(null);
    const [monthly, setMonthly] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetch = async () => {
            try {
                const [sumRes, monRes] = await Promise.all([
                    axios.get(`${API}/reports/summary`),
                    axios.get(`${API}/reports/monthly`)
                ]);
                setSummary(sumRes.data);
                setMonthly(monRes.data);
            } catch (err) { console.error(err); }
            finally { setLoading(false); }
        };
        fetch();
    }, []);

    if (loading) return <div className="flex items-center justify-center h-64 text-gray-500">Loading reports...</div>;

    const maxMonthly = Math.max(...monthly.map(m => m.total), 1);

    // Pie chart data
    const paidPct = summary && summary.totalRevenue > 0
        ? Math.round((summary.paidAmount / summary.totalRevenue) * 100) : 0;

    return (
        <div className="max-w-screen-xl mx-auto space-y-6">
            <div className="flex items-center mb-2">
                <BarChart3 className="h-6 w-6 text-gray-400 mr-2" />
                <h1 className="text-2xl font-semibold text-gray-900">Reports</h1>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-1 h-full bg-[#0088FF]"></div>
                    <h3 className="text-sm font-medium text-gray-500 flex items-center"><IndianRupee className="h-4 w-4 mr-1" />Total Revenue</h3>
                    <div className="mt-2 text-3xl font-bold text-gray-900">₹{(summary?.totalRevenue || 0).toLocaleString('en-IN', { minimumFractionDigits: 2 })}</div>
                    <p className="mt-2 text-xs text-gray-500">{summary?.totalInvoices || 0} invoices</p>
                </div>
                <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-1 h-full bg-green-500"></div>
                    <h3 className="text-sm font-medium text-gray-500 flex items-center"><CheckCircle className="h-4 w-4 mr-1" />Paid</h3>
                    <div className="mt-2 text-3xl font-bold text-green-600">₹{(summary?.paidAmount || 0).toLocaleString('en-IN', { minimumFractionDigits: 2 })}</div>
                    <p className="mt-2 text-xs text-gray-500">{summary?.paidCount || 0} invoices paid</p>
                </div>
                <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-1 h-full bg-orange-400"></div>
                    <h3 className="text-sm font-medium text-gray-500 flex items-center"><FileText className="h-4 w-4 mr-1" />Unpaid</h3>
                    <div className="mt-2 text-3xl font-bold text-orange-500">₹{(summary?.unpaidAmount || 0).toLocaleString('en-IN', { minimumFractionDigits: 2 })}</div>
                    <p className="mt-2 text-xs text-gray-500">{summary?.unpaidCount || 0} invoices pending</p>
                </div>
                <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-1 h-full bg-red-500"></div>
                    <h3 className="text-sm font-medium text-gray-500 flex items-center"><AlertCircle className="h-4 w-4 mr-1" />Overdue</h3>
                    <div className="mt-2 text-3xl font-bold text-red-500">₹{(summary?.overdueAmount || 0).toLocaleString('en-IN', { minimumFractionDigits: 2 })}</div>
                    <p className="mt-2 text-xs text-gray-500">{summary?.overdueCount || 0} overdue</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Monthly Sales Bar Chart */}
                <div className="lg:col-span-2 bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                    <h3 className="text-lg font-medium text-gray-900 mb-6 flex items-center">
                        <TrendingUp className="h-5 w-5 mr-2 text-[#0088FF]" /> Monthly Sales
                    </h3>
                    <div className="flex items-end space-x-2 h-[220px]">
                        {monthly.map((m, i) => (
                            <div key={i} className="flex-1 flex flex-col items-center justify-end h-full">
                                <div className="w-full max-w-[40px] relative group">
                                    {/* Unpaid portion */}
                                    {m.unpaid > 0 && (
                                        <div className="w-full bg-orange-200 rounded-t-sm transition-all"
                                            style={{ height: `${Math.max((m.unpaid / maxMonthly) * 180, m.unpaid > 0 ? 4 : 0)}px` }}>
                                        </div>
                                    )}
                                    {/* Paid portion */}
                                    <div className={`w-full bg-[#0088FF] transition-all ${m.unpaid <= 0 ? 'rounded-t-sm' : ''}`}
                                        style={{ height: `${Math.max((m.paid / maxMonthly) * 180, m.paid > 0 ? 4 : 0)}px` }}>
                                    </div>
                                    {/* Tooltip */}
                                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-gray-800 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
                                        ₹{m.total.toLocaleString('en-IN')}
                                    </div>
                                </div>
                                <span className="text-[10px] text-gray-500 mt-2 font-medium">{m.month}</span>
                            </div>
                        ))}
                    </div>
                    <div className="flex items-center justify-center space-x-6 mt-4 text-xs text-gray-500">
                        <div className="flex items-center"><div className="w-3 h-3 bg-[#0088FF] rounded-sm mr-1.5"></div>Paid</div>
                        <div className="flex items-center"><div className="w-3 h-3 bg-orange-200 rounded-sm mr-1.5"></div>Unpaid</div>
                    </div>
                </div>

                {/* Paid vs Unpaid Pie Chart */}
                <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                    <h3 className="text-lg font-medium text-gray-900 mb-6">Paid vs Unpaid</h3>
                    <div className="flex justify-center mb-6">
                        <div className="relative w-[160px] h-[160px]">
                            <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                                <circle cx="18" cy="18" r="15.91549430918954" fill="none" stroke="#f3f4f6" strokeWidth="3"></circle>
                                <circle cx="18" cy="18" r="15.91549430918954" fill="none" stroke="#0088FF" strokeWidth="3"
                                    strokeDasharray={`${paidPct} ${100 - paidPct}`} strokeLinecap="round"></circle>
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <span className="text-2xl font-bold text-gray-900">{paidPct}%</span>
                                <span className="text-[10px] text-gray-500">Paid</span>
                            </div>
                        </div>
                    </div>
                    <div className="space-y-3">
                        <div className="flex justify-between items-center">
                            <div className="flex items-center text-sm"><div className="w-3 h-3 bg-[#0088FF] rounded-full mr-2"></div>Paid</div>
                            <span className="text-sm font-medium">₹{(summary?.paidAmount || 0).toLocaleString('en-IN')}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <div className="flex items-center text-sm"><div className="w-3 h-3 bg-gray-200 rounded-full mr-2"></div>Unpaid</div>
                            <span className="text-sm font-medium">₹{(summary?.unpaidAmount || 0).toLocaleString('en-IN')}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Reports;
