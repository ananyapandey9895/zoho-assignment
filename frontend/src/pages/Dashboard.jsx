import React, { useState, useEffect } from 'react';
import { ArrowUpRight, IndianRupee, FileText, Users, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import API from '../config/api';

const Dashboard = () => {
    const [summary, setSummary] = useState(null);
    const [monthly, setMonthly] = useState([]);
    const [recentInvoices, setRecentInvoices] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [sumRes, monRes, invRes] = await Promise.all([
                    axios.get(`${API}/reports/summary`),
                    axios.get(`${API}/reports/monthly`),
                    axios.get(`${API}/invoices`)
                ]);
                setSummary(sumRes.data);
                setMonthly(monRes.data);
                setRecentInvoices(invRes.data.slice(0, 5));
            } catch (err) { console.error(err); }
            finally { setLoading(false); }
        };
        fetchData();
    }, []);

    const maxMonthly = Math.max(...(monthly.map(m => m.total) || [0]), 1);

    return (
        <div className="max-w-7xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
                <div className="text-sm text-gray-500">
                    Last Updated: <strong>{new Date().toLocaleDateString()}</strong>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-1 h-full bg-[#0088FF]"></div>
                    <h3 className="text-sm font-medium text-gray-500">Total Receivables</h3>
                    <div className="mt-2 flex items-baseline">
                        <IndianRupee className="h-5 w-5 text-gray-700 mr-1" />
                        <span className="text-3xl font-bold text-gray-900">{loading ? '...' : (summary?.totalRevenue || 0).toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
                    </div>
                    <div className="mt-4 flex items-center text-sm text-gray-500">
                        Current: ₹{(summary?.unpaidAmount || 0).toLocaleString('en-IN')} | Overdue: <span className="text-red-500 ml-1">₹{(summary?.overdueAmount || 0).toLocaleString('en-IN')}</span>
                    </div>
                </div>
                <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-1 h-full bg-green-500"></div>
                    <h3 className="text-sm font-medium text-gray-500">Paid Amount</h3>
                    <div className="mt-2 flex items-baseline">
                        <IndianRupee className="h-5 w-5 text-gray-700 mr-1" />
                        <span className="text-3xl font-bold text-gray-900">{loading ? '...' : (summary?.paidAmount || 0).toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
                    </div>
                    <p className="mt-4 text-sm text-green-600 flex items-center">
                        <ArrowUpRight className="h-4 w-4 mr-1" />
                        {summary?.paidCount || 0} invoices paid
                    </p>
                </div>
                <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-1 h-full bg-orange-400"></div>
                    <h3 className="text-sm font-medium text-gray-500">Total Invoices</h3>
                    <div className="mt-2 flex items-baseline">
                        <FileText className="h-5 w-5 text-gray-700 mr-1" />
                        <span className="text-3xl font-bold text-gray-900">{loading ? '...' : summary?.totalInvoices || 0}</span>
                    </div>
                    <p className="mt-4 text-sm text-gray-500">{summary?.unpaidCount || 0} unpaid</p>
                </div>
                <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-1 h-full bg-purple-500"></div>
                    <h3 className="text-sm font-medium text-gray-500">Overdue</h3>
                    <div className="mt-2 flex items-baseline">
                        <span className="text-3xl font-bold text-red-500">{loading ? '...' : summary?.overdueCount || 0}</span>
                    </div>
                    <p className="mt-4 text-sm text-red-500">₹{(summary?.overdueAmount || 0).toLocaleString('en-IN')} overdue</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Monthly Sales Chart */}
                <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                    <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                        <TrendingUp className="h-5 w-5 mr-2 text-[#0088FF]" /> Sales & Payments
                    </h3>
                    <div className="flex items-end space-x-1 h-[180px]">
                        {monthly.map((m, i) => (
                            <div key={i} className="flex-1 flex flex-col items-center justify-end h-full group">
                                <div className="w-full max-w-[32px] relative">
                                    <div className="w-full bg-[#0088FF] rounded-t-sm transition-all hover:bg-[#0070d2]"
                                        style={{ height: `${Math.max((m.total / maxMonthly) * 160, m.total > 0 ? 4 : 0)}px` }}></div>
                                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 bg-gray-800 text-white text-[9px] px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                                        ₹{m.total.toLocaleString('en-IN')}
                                    </div>
                                </div>
                                <span className="text-[9px] text-gray-500 mt-1.5">{m.month}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Recent Invoices */}
                <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-medium text-gray-900 flex items-center">
                            <FileText className="h-5 w-5 mr-2 text-gray-400" /> Recent Invoices
                        </h3>
                        <Link to="/invoices" className="text-[#0088FF] text-sm hover:underline">View all</Link>
                    </div>
                    {recentInvoices.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-[180px] text-gray-400 text-sm">
                            <FileText className="h-10 w-10 mb-2 text-gray-300" />
                            No invoices yet
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {recentInvoices.map(inv => (
                                <div key={inv._id} className="flex justify-between items-center py-2 border-b border-gray-50">
                                    <div>
                                        <div className="text-sm font-medium text-gray-900">{inv.customerName}</div>
                                        <div className="text-xs text-gray-500">{inv.invoiceNumber} · {new Date(inv.invoiceDate).toLocaleDateString()}</div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-sm font-medium font-mono">₹{inv.total.toFixed(2)}</div>
                                        <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${inv.status === 'Paid' ? 'bg-green-100 text-green-700' : inv.status === 'Overdue' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-600'}`}>{inv.status}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
