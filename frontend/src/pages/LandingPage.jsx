import { useNavigate, Link } from 'react-router-dom';
import React, { useState } from 'react';
import {
    Search, ChevronDown, Building2, Phone, Mail, Lock,
    FileText, Send, Download, Clock, Bell, PieChart, Users, DollarSign,
    LayoutGrid, ArrowRight
} from 'lucide-react';
import LandingHeader from '../components/LandingHeader';
import Footer from '../components/Footer';

const LandingPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ companyName: '', email: '', password: '' });

    const handleSignup = (e) => {
        e.preventDefault();
        // Mock signup and navigate
        navigate('/dashboard');
    };

    return (
        <div className="bg-white min-h-screen font-['system-ui',_'-apple-system',_'BlinkMacSystemFont',_'Segoe_UI',_'Roboto',_'sans-serif'] text-[#111]">
            <LandingHeader />

            <main className="pt-0">
                {/* Hero Section */}
                <section className="max-w-[1400px] mx-auto px-8 pt-16 pb-24 grid grid-cols-1 lg:grid-cols-2 gap-8 items-start relative overflow-hidden">
                    {/* Left Column - Forms */}
                    <div className="pt-4 max-w-lg">
                        <h1 className="text-[52px] font-light text-black leading-[1.1] mb-6 tracking-tight">
                            <span className="text-[#8484f0]">Free</span> GST invoicing <br />
                            software for small <br />
                            businesses
                        </h1>
                        <p className="text-[17px] text-gray-600 mb-8 leading-relaxed font-light">
                            Create and send invoices, accept online payments, and simplify GST filing with Zoho Invoice.
                        </p>

                        {/* Signup Form */}
                        <form onSubmit={handleSignup} className="space-y-4 w-full sm:w-[400px]">
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                    <Building2 className="w-5 h-5 mx-1" />
                                </div>
                                <input required type="text" placeholder="Company Name" value={formData.companyName} onChange={e => setFormData({ ...formData, companyName: e.target.value })} className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-[4px] focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none text-[15px] placeholder-gray-400" />
                            </div>
                            <div className="relative flex">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400 border-r border-gray-300 pr-2 my-2 cursor-pointer">
                                    <Phone className="w-4 h-4 mr-1 ml-1" />
                                    <span className="text-black text-sm font-medium ml-1">+91</span>
                                </div>
                                <input type="tel" placeholder="Phone Number" className="w-full pl-[90px] pr-4 py-3 border border-gray-300 rounded-[4px] focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none text-[15px] placeholder-gray-400" />
                            </div>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                    <Mail className="w-5 h-5 mx-1" />
                                </div>
                                <input required type="email" placeholder="Email Address" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-[4px] focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none text-[15px] placeholder-gray-400" />
                            </div>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                    <Lock className="w-5 h-5 mx-1" />
                                </div>
                                <input required type="password" placeholder="Password" value={formData.password} onChange={e => setFormData({ ...formData, password: e.target.value })} className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-[4px] focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none text-[15px] placeholder-gray-400" />
                            </div>

                            <div className="pt-2 pb-2">
                                <p className="text-[13px] text-gray-600">
                                    Your data will be in INDIA data center. <a href="#" className="underline text-black font-medium">Change Country</a>
                                </p>
                                <label className="flex items-start mt-3">
                                    <input type="checkbox" className="mt-1 mr-2 rounded border-gray-300" />
                                    <span className="text-[13px] text-gray-600">
                                        I agree to the <a href="#" className="text-[#0055ff] hover:underline">Terms of Service</a> and <a href="#" className="text-[#0055ff] hover:underline">Privacy Policy</a>.
                                    </span>
                                </label>
                            </div>

                            <button type="submit" className="w-full bg-[#0066ff] hover:bg-[#0056e0] text-white py-3.5 rounded-[4px] font-bold text-[16px] transition-colors shadow-sm">
                                Create Free Account
                            </button>

                            <div className="pt-4 flex items-center space-x-3">
                                <span className="text-[14px] text-gray-700 font-medium">Or sign in using</span>
                                <div className="flex space-x-2">
                                    {/* Mock Social Icons */}
                                    <div className="w-6 h-6 rounded-full border border-gray-200 flex items-center justify-center font-bold text-[10px] text-red-500">G</div>
                                    <div className="w-6 h-6 rounded-full border border-gray-200 flex items-center justify-center font-bold text-[10px] text-blue-600">f</div>
                                    <div className="w-6 h-6 rounded-full border border-gray-200 flex items-center justify-center font-bold text-[10px] text-black">X</div>
                                    <div className="w-6 h-6 rounded-full border border-gray-200 flex items-center justify-center font-bold text-[10px] text-blue-400">in</div>
                                </div>
                            </div>
                        </form>
                    </div>

                    {/* Right Column - Mobile Mockup */}
                    <div className="relative lg:h-[600px] w-full mt-10 lg:mt-0 right-0 flex justify-center lg:justify-end">
                        <div className="relative w-[300px] h-[620px] z-20 mt-[-20px]">
                            <div className="absolute right-0 top-0 w-full h-[600px] bg-[#2c2c3a] rounded-[40px] border-[6px] border-[#2c2c3a] shadow-2xl overflow-hidden transform hover:scale-[1.02] transition-transform duration-500">
                                <div className="w-full h-full bg-[#f5f5f8] flex flex-col text-[#111] relative">
                                    {/* Status Bar */}
                                    <div className="bg-white px-5 pt-2 pb-1 flex justify-between items-center text-[11px] font-semibold">
                                        <span>9:30</span>
                                        <div className="flex items-center space-x-1">
                                            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3a4.237 4.237 0 00-6 0zm-4-4l2 2a7.074 7.074 0 0110 0l2-2C15.14 9.14 8.87 9.14 5 13z" /></svg>
                                            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M2 22h20V2z" /></svg>
                                            <div className="w-5 h-2.5 border border-current rounded-sm relative"><div className="absolute inset-[1px] right-[2px] bg-green-500 rounded-[1px]" style={{ width: '70%' }}></div></div>
                                        </div>
                                    </div>

                                    {/* Header */}
                                    <div className="bg-white px-4 py-2.5 flex justify-between items-center border-b border-gray-100">
                                        <div className="flex items-center space-x-3">
                                            <svg width="18" height="14" viewBox="0 0 18 14" fill="none" stroke="#333" strokeWidth="2" strokeLinecap="round"><line x1="1" y1="2" x2="17" y2="2" /><line x1="1" y1="7" x2="17" y2="7" /><line x1="1" y1="12" x2="17" y2="12" /></svg>
                                            <span className="text-[15px] font-semibold text-gray-800">Zylker</span>
                                        </div>
                                        <div className="flex items-center space-x-3 text-gray-500">
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 01-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" /></svg>
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 01-3.46 0" /></svg>
                                        </div>
                                    </div>

                                    {/* Welcome Section */}
                                    <div className="bg-white px-4 py-3">
                                        <div className="flex items-center space-x-2 mb-0.5">
                                            <span className="text-blue-600 text-lg">✦</span>
                                            <span className="text-[14px] font-bold text-gray-900">Welcome Patricia!</span>
                                        </div>
                                        <p className="text-[11px] text-gray-500 ml-6">Here's your organization's overview</p>
                                    </div>

                                    {/* Quick Actions */}
                                    <div className="bg-[#f0f0f5] mx-3 rounded-xl p-3 flex justify-between mt-1">
                                        {[
                                            { label: 'New\nInvoice', color: '#e8f0fe', iconColor: '#4285f4', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4285f4" strokeWidth="1.5"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><polyline points="14 2 14 8 20 8" /></svg> },
                                            { label: 'New\nCustomer', color: '#e6f7f0', iconColor: '#0d9d58', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0d9d58" strokeWidth="1.5"><path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="8.5" cy="7" r="4" /><line x1="20" y1="8" x2="20" y2="14" /><line x1="23" y1="11" x2="17" y2="11" /></svg> },
                                            { label: 'New\nExpense', color: '#fce8e6', iconColor: '#ea4335', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ea4335" strokeWidth="1.5"><rect x="1" y="4" width="22" height="16" rx="2" ry="2" /><line x1="1" y1="10" x2="23" y2="10" /></svg> },
                                            { label: 'Add\nTime log', color: '#fef7e0', iconColor: '#f9ab00', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#f9ab00" strokeWidth="1.5"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg> }
                                        ].map((item, i) => (
                                            <div key={i} className="flex flex-col items-center w-[60px]">
                                                <div className="w-11 h-11 rounded-full flex items-center justify-center mb-1.5" style={{ backgroundColor: item.color }}>
                                                    {item.icon}
                                                </div>
                                                <span className="text-[9px] text-gray-700 text-center leading-tight whitespace-pre-line font-medium">{item.label}</span>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Receivables Summary */}
                                    <div className="bg-white mx-3 rounded-xl p-3 mt-3 flex-1 overflow-hidden">
                                        <div className="flex justify-between items-center mb-2">
                                            <div className="flex items-center space-x-1.5">
                                                <div className="w-5 h-5 rounded-full bg-blue-50 flex items-center justify-center">
                                                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#4285f4" strokeWidth="2"><path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /><path d="M9 12l2 2 4-4" /></svg>
                                                </div>
                                                <span className="text-[12px] font-bold text-gray-800">Receivables Summary</span>
                                            </div>
                                            <ChevronDown className="w-3.5 h-3.5 text-gray-400 rotate-180" />
                                        </div>
                                        <div className="mb-1">
                                            <div className="text-[10px] text-gray-500">Total Receivables</div>
                                            <div className="text-[20px] font-bold text-gray-900">₹38,092.17</div>
                                        </div>

                                        {/* Bar Chart */}
                                        <div className="relative h-[120px] mt-2 pl-6">
                                            {/* Y-axis labels */}
                                            <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-[7px] text-gray-400 py-1">
                                                <span>18 K</span><span>15 K</span><span>12 K</span><span>9 K</span><span>6 K</span><span>3 K</span><span>0</span>
                                            </div>
                                            {/* Grid lines */}
                                            {[0, 1, 2, 3, 4, 5, 6].map(i => (
                                                <div key={i} className="absolute left-6 right-0 border-t border-gray-100" style={{ top: `${(i / 6) * 100}%` }}></div>
                                            ))}
                                            {/* Bars */}
                                            <div className="flex justify-around items-end h-full pl-2 pr-1">
                                                {[
                                                    { label: 'Current', h: '95%', color: '#4285f4' },
                                                    { label: '1-15', h: '45%', color: '#f9ab00' },
                                                    { label: '16-30', h: '35%', color: '#c47a1a' },
                                                    { label: '31-45', h: '25%', color: '#6d4c0e' },
                                                    { label: '46-60', h: '0%', color: '#999' }
                                                ].map((bar, i) => (
                                                    <div key={i} className="flex flex-col items-center justify-end h-full">
                                                        <div className="w-[22px] rounded-t-sm" style={{ height: bar.h, backgroundColor: bar.color, minHeight: bar.h === '0%' ? '0px' : '4px' }}></div>
                                                        <span className="text-[7px] text-gray-500 mt-1">{bar.label}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Bottom Navigation */}
                                    <div className="bg-white border-t border-gray-100 flex justify-around items-center py-2 px-1 mt-auto">
                                        {[
                                            { label: 'Dashboard', active: true, icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="#4285f4" stroke="none"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" /></svg> },
                                            { label: 'Customers', active: false, icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="1.5"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" /></svg> },
                                            { label: 'Invoices', active: false, icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="1.5"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><polyline points="14 2 14 8 20 8" /></svg> },
                                            { label: 'Expenses', active: false, icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="1.5"><rect x="1" y="4" width="22" height="16" rx="2" ry="2" /><line x1="1" y1="10" x2="23" y2="10" /></svg> },
                                            { label: 'More', active: false, icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2"><circle cx="12" cy="12" r="1" /><circle cx="12" cy="5" r="1" /><circle cx="12" cy="19" r="1" /><circle cx="5" cy="12" r="1" /><circle cx="19" cy="12" r="1" /></svg> }
                                        ].map((tab, i) => (
                                            <div key={i} className="flex flex-col items-center cursor-pointer">
                                                {tab.icon}
                                                <span className={`text-[8px] mt-0.5 font-medium ${tab.active ? 'text-[#4285f4]' : 'text-gray-500'}`}>{tab.label}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Desktop Mockup Section (Scroll Reveal) */}
                <section className="relative w-full max-w-[1050px] mx-auto px-8 -mt-20 z-30 hidden md:block pb-24">
                    <div className="bg-white rounded-3xl border-[10px] border-black shadow-2xl overflow-hidden h-[540px] relative flex">
                        {/* Dark Sidebar */}
                        <div className="w-[70px] bg-[#1a1c23] flex flex-col items-center py-6 space-y-6 shrink-0 z-10">
                            <div className="w-10 h-10 flex items-center justify-center bg-[#b87c1c] rounded">
                                {/* Abstract gauge icon */}
                                <div className="text-black">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v4" /><path d="m16.2 7.8 2.9-2.9" /><path d="M18 12h4" /><path d="m16.2 16.2 2.9 2.9" /><path d="M12 18v4" /><path d="m4.9 19.1 2.9-2.9" /><path d="M2 12h4" /><path d="m4.9 4.9 2.9 2.9" /></svg>
                                </div>
                            </div>
                            <div className="space-y-5 pt-4">
                                <div className="w-2.5 h-2.5 rounded-full bg-gray-600"></div>
                                <div className="w-2.5 h-2.5 rounded-full bg-gray-600"></div>
                                <div className="w-2.5 h-2.5 rounded-full bg-gray-600"></div>
                                <div className="w-2.5 h-2.5 rounded-full bg-gray-600"></div>
                                <div className="w-2.5 h-2.5 rounded-full bg-gray-600"></div>
                                <div className="w-2.5 h-2.5 rounded-full bg-gray-600"></div>
                                <div className="w-2.5 h-2.5 rounded-full bg-gray-600"></div>
                                <div className="w-2.5 h-2.5 rounded-full bg-gray-600"></div>
                            </div>
                        </div>

                        {/* Main Content Area */}
                        <div className="flex-1 bg-white p-10 overflow-hidden flex flex-col pt-8">
                            {/* Header */}
                            <div className="border-b border-gray-100 pb-2 mb-8 inline-block w-full">
                                <h2 className="text-[20px] font-medium text-[#111827] mb-2 relative">
                                    Dashboard
                                    <div className="absolute bottom-[-10px] left-0 w-16 h-[3px] bg-[#0091ff]"></div>
                                </h2>
                            </div>

                            {/* Total Receivables */}
                            <h3 className="text-[13px] font-bold tracking-wide text-[#2b2559] mb-3">Total Receivables</h3>
                            <div className="border border-gray-200 rounded-md p-6 mb-8 shadow-sm">
                                <div className="text-xs text-gray-500 mb-3 flex items-center">Total Receivables <span className="ml-2">— $78,970</span></div>
                                <div className="h-3 w-full bg-gray-100 flex mb-6 overflow-hidden">
                                    <div className="h-full bg-[#1dd3d5] w-[25%]"></div>
                                    <div className="h-full bg-[#ffb74d] w-[15%]"></div>
                                    <div className="h-full bg-[#ff7b25] w-[20%]"></div>
                                    <div className="h-full bg-[#e81b1b] w-[40%]"></div>
                                </div>
                                <div className="grid grid-cols-5 gap-4">
                                    <div className="border-r border-gray-200 pr-4"><div className="text-[#1dd3d5] text-[10px] font-bold uppercase mb-1">Current</div><div className="text-lg font-medium text-[#2b2559]">$4,400.00</div></div>
                                    <div className="pl-2"><div className="text-[#ff7b25] text-[10px] uppercase font-bold mb-1">Overdue</div><div className="text-lg font-medium text-[#2b2559]">$10,850.00</div><div className="text-[10px] text-gray-400 mt-1">1-15 Days</div></div>
                                    <div className="pl-2"><div className="text-transparent text-[10px] mb-1">.</div><div className="text-lg font-medium text-[#2b2559]">$13,500.00</div><div className="text-[10px] text-gray-400 mt-1">16-30 Days</div></div>
                                    <div className="pl-2"><div className="text-transparent text-[10px] mb-1">.</div><div className="text-lg font-medium text-[#2b2559]">$12,220.00</div><div className="text-[10px] text-gray-400 mt-1">31-45 Days</div></div>
                                    <div className="pl-2"><div className="text-transparent text-[10px] mb-1">.</div><div className="text-lg font-medium text-[#2b2559]">$38,000.00</div><div className="text-[10px] text-gray-400 mt-1">Above 45 days</div></div>
                                </div>
                            </div>

                            {/* Sales and Expenses */}
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-[13px] font-bold tracking-wide text-[#2b2559]">Sales and Expenses</h3>
                                <div className="text-[11px] font-bold text-[#2b2559] flex items-center cursor-pointer">Fiscal Year <ChevronDown className="w-3 h-3 ml-1" /></div>
                            </div>

                            <div className="flex flex-1 items-center">
                                {/* Bar Chart Area */}
                                <div className="flex-1 flex items-end h-[160px] border-b border-l border-gray-200 pb-2 px-4 relative">
                                    {/* Y Axis line mockups */}
                                    <div className="absolute left-0 w-full top-[20%] border-t border-gray-100 z-0 text-transparent">.</div>
                                    <div className="absolute left-0 w-full top-[40%] border-t border-gray-100 z-0 text-transparent">.</div>
                                    <div className="absolute left-0 w-full top-[60%] border-t border-gray-100 z-0 text-transparent">.</div>
                                    <div className="absolute left-0 w-full top-[80%] border-t border-gray-100 z-0 text-transparent">.</div>

                                    {/* Y Axis Labels */}
                                    <div className="absolute left-[-25px] top-0 h-[100%] flex flex-col justify-between text-[8px] text-gray-400 py-[2px] z-10">
                                        <span>60K</span><span>50K</span><span>40K</span><span>30K</span><span>20K</span><span>10K</span><span>0</span>
                                    </div>

                                    {/* Bars */}
                                    <div className="w-full flex justify-between px-2 z-10 h-[100%] items-end">
                                        {[
                                            { m: 'Apr', h1: '80%', h2: '60%', h3: '20%' },
                                            { m: 'May', h1: '70%', h2: '65%', h3: '10%' },
                                            { m: 'Jun', h1: '85%', h2: '70%', h3: '25%' },
                                            { m: 'Jul', h1: '60%', h2: '50%', h3: '15%' },
                                            { m: 'Aug', h1: '75%', h2: '60%', h3: '25%' },
                                            { m: 'Sep', h1: '65%', h2: '50%', h3: '30%' },
                                            { m: 'Oct', h1: '80%', h2: '75%', h3: '20%' },
                                            { m: 'Nov', h1: '60%', h2: '45%', h3: '20%' },
                                            { m: 'Dec', h1: '75%', h2: '65%', h3: '30%' },
                                            { m: 'Jan', h1: '60%', h2: '55%', h3: '20%' },
                                            { m: 'Feb', h1: '75%', h2: '55%', h3: '15%' },
                                            { m: 'Mar', h1: '85%', h2: '80%', h3: '20%' }
                                        ].map(data => (
                                            <div key={data.m} className="flex flex-col items-center justify-end h-full group">
                                                <div className="flex items-end space-x-[2px] h-[130px] w-5">
                                                    <div className="w-[6px] bg-[#63c6e9]" style={{ height: data.h1 }}></div>
                                                    <div className="w-[6px] bg-[#a8df65]" style={{ height: data.h2 }}></div>
                                                    <div className="w-[6px] bg-[#ffc107]" style={{ height: data.h3 }}></div>
                                                </div>
                                                <span className="text-[9px] text-gray-400 mt-2">{data.m}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Right Stats Box */}
                                <div className="w-[200px] ml-10">
                                    <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 w-full space-y-6">
                                        <div className="flex justify-between items-center"><span className="text-[#1dd3d5] text-[11px] font-bold">Total Sales</span><span className="font-medium text-[#2b2559] text-[15px]">$622,000</span></div>
                                        <div className="flex justify-between items-center"><span className="text-[#a8df65] text-[11px] font-bold">Total Receipts</span><span className="font-medium text-[#2b2559] text-[15px]">$562,250</span></div>
                                        <div className="flex justify-between items-center"><span className="text-[#ff7b25] text-[11px] font-bold whitespace-nowrap mr-2">Total Expenses</span><span className="font-medium text-[#2b2559] text-[15px]">$162,027</span></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 2. Carry your GST invoice feature */}
                <section className="bg-white py-24 border-t border-gray-100">
                    <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div className="max-w-md">
                            <h2 className="text-[40px] font-light text-black leading-tight mb-6">
                                Carry your GST invoice <br />software <span className="text-[#8484f0]">everywhere</span>
                            </h2>
                            <p className="text-[17px] text-gray-600 mb-8 font-light leading-relaxed">
                                Your data is on the cloud. It's safe and in sync across all your devices.
                            </p>
                            <div className="flex space-x-4">
                                <a href="#" className="bg-black text-white px-4 py-2 rounded-[6px] flex items-center hover:bg-gray-800 transition">
                                    <div className="mr-2"></div>
                                    <div className="flex flex-col text-left leading-none">
                                        <span className="text-[9px] text-gray-300">Download on the</span>
                                        <span className="text-[14px] font-medium">Mac App Store</span>
                                    </div>
                                </a>
                                <a href="#" className="bg-black text-white px-4 py-2 rounded-[6px] flex items-center hover:bg-gray-800 transition">
                                    <div className="mr-2 border border-white w-4 h-4 grid grid-cols-2 gap-[1px] p-[1px]"><div className="bg-white" /><div className="bg-white" /><div className="bg-white" /><div className="bg-white" /></div>
                                    <div className="flex flex-col text-left leading-none">
                                        <span className="text-[9px] text-gray-300">Get it from</span>
                                        <span className="text-[14px] font-medium">Microsoft</span>
                                    </div>
                                </a>
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4 h-[400px] relative">
                            <div className="col-span-1 bg-gray-100 rounded-2xl overflow-hidden mt-20 relative saturate-0 grayscale opacity-80 shadow-md">
                                <img src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=400" className="w-full h-full object-cover" alt="Laptop" />
                            </div>
                            <div className="col-span-1 bg-gray-100 rounded-2xl overflow-hidden mt-10 relative saturate-0 grayscale opacity-80 shadow-md">
                                <img src="https://images.unsplash.com/photo-1544396821-4dd40b938ad3?auto=format&fit=crop&q=80&w=400" className="w-full h-full object-cover" alt="Tablet" />
                            </div>
                            <div className="col-span-1 bg-gray-800 rounded-2xl overflow-hidden -mt-10 relative shadow-2xl border-4 border-gray-900 border-b-0 rounded-b-none h-[410px]">
                                {/* Mock Phone in pocket */}
                                <img src="https://images.unsplash.com/photo-1533228100845-08145b01de14?auto=format&fit=crop&q=80&w=400" className="w-full h-full object-cover opacity-60" alt="Pocket" />
                                <div className="absolute top-10 left-[10%] w-[80%] h-[400px] bg-gray-900 rounded-t-3xl border-4 border-gray-800 shadow-xl overflow-hidden">
                                    <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1550684376-efcbd6e3f031?auto=format&fit=crop&q=80&w=400")' }}>
                                        <div className="bg-black/40 w-full h-full p-4 pt-10">
                                            <h3 className="text-white text-4xl text-center font-light mb-8">4:00</h3>
                                            <div className="bg-[#0088FF] rounded-lg p-3 shadow-lg mb-3">
                                                <div className="flex items-start">
                                                    <div className="bg-white p-1 rounded mr-2"><FileText className="w-4 h-4 text-blue-500" /></div>
                                                    <div className="text-white text-xs leading-tight"><strong>Zoho Invoice</strong><br />An amount of ₹4,296.00 was received for invoice INV-008</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 3. Easy Invoicing Section (Dark Mode) */}
                <section className="bg-[#1a1a1a] text-white py-32 border-t-4 border-black relative">
                    <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-2 gap-16">
                        <div className="pt-10">
                            <h2 className="text-[44px] font-light leading-tight mb-16 tracking-tight">
                                Easy Invoicing, <span className="text-[#8484f0]">Instant <br />Payments</span>
                            </h2>

                            <div className="space-y-12 border-l border-gray-800 pl-8 relative">
                                <div className="relative group cursor-default">
                                    <div className="absolute -left-[49px] top-1 w-8 h-8 rounded-full bg-gray-800 border-4 border-[#1a1a1a] flex items-center justify-center text-gray-300 group-hover:bg-[#8484f0] group-hover:text-white transition-colors duration-300">
                                        <FileText className="w-4 h-4" />
                                    </div>
                                    <h3 className="text-[20px] font-bold text-white mb-2">Create</h3>
                                    <p className="text-gray-400 text-[16px] font-light leading-relaxed max-w-sm">
                                        Pick an invoice template, add your business logo, customize it, and make it more "you."
                                    </p>
                                </div>

                                <div className="relative group cursor-default opacity-50 hover:opacity-100 transition-opacity duration-300">
                                    <div className="absolute -left-[49px] top-1 w-8 h-8 rounded-full bg-gray-800 border-4 border-[#1a1a1a] flex items-center justify-center text-gray-300 group-hover:bg-[#8484f0] group-hover:text-white transition-colors duration-300">
                                        <Send className="w-4 h-4" />
                                    </div>
                                    <h3 className="text-[20px] font-bold text-white mb-2">Send</h3>
                                    <p className="text-gray-400 text-[16px] font-light leading-relaxed max-w-sm">
                                        Invoice your customers via email, SMS, or as a PDF on WhatsApp or iMessage.
                                    </p>
                                </div>

                                <div className="relative group cursor-default opacity-50 hover:opacity-100 transition-opacity duration-300">
                                    <div className="absolute -left-[49px] top-1 w-8 h-8 rounded-full bg-gray-800 border-4 border-[#1a1a1a] flex items-center justify-center text-gray-300 group-hover:bg-[#8484f0] group-hover:text-white transition-colors duration-300">
                                        <Download className="w-4 h-4" />
                                    </div>
                                    <h3 className="text-[20px] font-bold text-white mb-2">Receive</h3>
                                    <p className="text-gray-400 text-[16px] font-light leading-relaxed max-w-sm">
                                        Accept online payments via cards, net banking, and UPI with Zoho Payments and other PGs.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Right side sticky phone */}
                        <div className="relative lg:h-[600px] flex justify-center sticky top-32">
                            <div className="w-[300px] h-[620px] bg-[#2c2c3a] rounded-[40px] border-[6px] border-[#2c2c3a] shadow-2xl z-20 overflow-hidden mt-10 lg:-mt-20">
                                <div className="w-full h-full bg-[#f5f5f8] flex flex-col text-[#111] relative">
                                    {/* Status Bar */}
                                    <div className="bg-white px-5 pt-2 pb-1 flex justify-between items-center text-[11px] font-semibold">
                                        <span>9:30</span>
                                        <div className="flex items-center space-x-1">
                                            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3a4.237 4.237 0 00-6 0zm-4-4l2 2a7.074 7.074 0 0110 0l2-2C15.14 9.14 8.87 9.14 5 13z" /></svg>
                                            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M2 22h20V2z" /></svg>
                                            <div className="w-5 h-2.5 border border-current rounded-sm relative"><div className="absolute inset-[1px] right-[2px] bg-green-500 rounded-[1px]" style={{ width: '70%' }}></div></div>
                                        </div>
                                    </div>
                                    {/* Header */}
                                    <div className="bg-white px-4 py-2.5 flex justify-between items-center border-b border-gray-100">
                                        <div className="flex items-center space-x-3">
                                            <svg width="18" height="14" viewBox="0 0 18 14" fill="none" stroke="#333" strokeWidth="2" strokeLinecap="round"><line x1="1" y1="2" x2="17" y2="2" /><line x1="1" y1="7" x2="17" y2="7" /><line x1="1" y1="12" x2="17" y2="12" /></svg>
                                            <span className="text-[15px] font-semibold text-gray-800">Zylker</span>
                                        </div>
                                        <div className="flex items-center space-x-3 text-gray-500">
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 01-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" /></svg>
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 01-3.46 0" /></svg>
                                        </div>
                                    </div>
                                    {/* Welcome Section */}
                                    <div className="bg-white px-4 py-3">
                                        <div className="flex items-center space-x-2 mb-0.5">
                                            <span className="text-blue-600 text-lg">✦</span>
                                            <span className="text-[14px] font-bold text-gray-900">Welcome Patricia!</span>
                                        </div>
                                        <p className="text-[11px] text-gray-500 ml-6">Here's your organization's overview</p>
                                    </div>
                                    {/* Quick Actions */}
                                    <div className="bg-[#f0f0f5] mx-3 rounded-xl p-3 flex justify-between mt-1">
                                        {[
                                            { label: 'New\nInvoice', color: '#e8f0fe', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4285f4" strokeWidth="1.5"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><polyline points="14 2 14 8 20 8" /></svg> },
                                            { label: 'New\nCustomer', color: '#e6f7f0', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0d9d58" strokeWidth="1.5"><path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="8.5" cy="7" r="4" /><line x1="20" y1="8" x2="20" y2="14" /><line x1="23" y1="11" x2="17" y2="11" /></svg> },
                                            { label: 'New\nExpense', color: '#fce8e6', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ea4335" strokeWidth="1.5"><rect x="1" y="4" width="22" height="16" rx="2" ry="2" /><line x1="1" y1="10" x2="23" y2="10" /></svg> },
                                            { label: 'Add\nTime log', color: '#fef7e0', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#f9ab00" strokeWidth="1.5"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg> }
                                        ].map((item, i) => (
                                            <div key={i} className="flex flex-col items-center w-[60px]">
                                                <div className="w-11 h-11 rounded-full flex items-center justify-center mb-1.5" style={{ backgroundColor: item.color }}>
                                                    {item.icon}
                                                </div>
                                                <span className="text-[9px] text-gray-700 text-center leading-tight whitespace-pre-line font-medium">{item.label}</span>
                                            </div>
                                        ))}
                                    </div>
                                    {/* Receivables Summary */}
                                    <div className="bg-white mx-3 rounded-xl p-3 mt-3 flex-1 overflow-hidden">
                                        <div className="flex justify-between items-center mb-2">
                                            <div className="flex items-center space-x-1.5">
                                                <div className="w-5 h-5 rounded-full bg-blue-50 flex items-center justify-center">
                                                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#4285f4" strokeWidth="2"><path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /><path d="M9 12l2 2 4-4" /></svg>
                                                </div>
                                                <span className="text-[12px] font-bold text-gray-800">Receivables Summary</span>
                                            </div>
                                            <ChevronDown className="w-3.5 h-3.5 text-gray-400 rotate-180" />
                                        </div>
                                        <div className="mb-1">
                                            <div className="text-[10px] text-gray-500">Total Receivables</div>
                                            <div className="text-[20px] font-bold text-gray-900">₹38,092.17</div>
                                        </div>
                                        <div className="relative h-[120px] mt-2 pl-6">
                                            <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-[7px] text-gray-400 py-1">
                                                <span>18 K</span><span>15 K</span><span>12 K</span><span>9 K</span><span>6 K</span><span>3 K</span><span>0</span>
                                            </div>
                                            {[0, 1, 2, 3, 4, 5, 6].map(i => (
                                                <div key={i} className="absolute left-6 right-0 border-t border-gray-100" style={{ top: `${(i / 6) * 100}%` }}></div>
                                            ))}
                                            <div className="flex justify-around items-end h-full pl-2 pr-1">
                                                {[
                                                    { label: 'Current', h: '95%', color: '#4285f4' },
                                                    { label: '1-15', h: '45%', color: '#f9ab00' },
                                                    { label: '16-30', h: '35%', color: '#c47a1a' },
                                                    { label: '31-45', h: '25%', color: '#6d4c0e' },
                                                    { label: '46-60', h: '0%', color: '#999' }
                                                ].map((bar, i) => (
                                                    <div key={i} className="flex flex-col items-center justify-end h-full">
                                                        <div className="w-[22px] rounded-t-sm" style={{ height: bar.h, backgroundColor: bar.color, minHeight: bar.h === '0%' ? '0px' : '4px' }}></div>
                                                        <span className="text-[7px] text-gray-500 mt-1">{bar.label}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    {/* Bottom Navigation */}
                                    <div className="bg-white border-t border-gray-100 flex justify-around items-center py-2 px-1 mt-auto">
                                        {[
                                            { label: 'Dashboard', active: true, icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="#4285f4" stroke="none"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" /></svg> },
                                            { label: 'Customers', active: false, icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="1.5"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" /></svg> },
                                            { label: 'Invoices', active: false, icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="1.5"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><polyline points="14 2 14 8 20 8" /></svg> },
                                            { label: 'Expenses', active: false, icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="1.5"><rect x="1" y="4" width="22" height="16" rx="2" ry="2" /><line x1="1" y1="10" x2="23" y2="10" /></svg> },
                                            { label: 'More', active: false, icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2"><circle cx="12" cy="12" r="1" /><circle cx="12" cy="5" r="1" /><circle cx="12" cy="19" r="1" /><circle cx="5" cy="12" r="1" /><circle cx="19" cy="12" r="1" /></svg> }
                                        ].map((tab, i) => (
                                            <div key={i} className="flex flex-col items-center cursor-pointer">
                                                {tab.icon}
                                                <span className={`text-[8px] mt-0.5 font-medium ${tab.active ? 'text-[#4285f4]' : 'text-gray-500'}`}>{tab.label}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            {/* Hand mock holding phone */}
                            <div className="absolute right-0 top-20 w-[600px] h-[600px] bg-gradient-to-tr from-[#3a201c] to-transparent rounded-full opacity-30 z-0 blur-3xl pointer-events-none"></div>
                        </div>
                    </div>
                </section>

                {/* 4. Feature Grid Section */}
                <section className="bg-white py-24">
                    <div className="max-w-6xl mx-auto px-8">
                        <h2 className="text-[36px] font-light text-black mb-16">
                            <span className="text-[#8484f0]">Much more</span> than just invoicing
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
                            {/* Grid Item 1 */}
                            <div className="flex items-start pb-10 border-b border-gray-100">
                                <div className="w-10 h-10 bg-[#0066ff] rounded-full flex items-center justify-center text-white shrink-0 mr-5 mt-1">
                                    <FileText className="w-5 h-5 fill-current opacity-80" />
                                </div>
                                <div>
                                    <Link to="/quotes" className="text-[17px] font-bold text-gray-900 mb-2 hover:text-[#0088FF] transition-colors inline-block">Quotes</Link>
                                    <p className="text-[15px] text-gray-500 font-light leading-relaxed">
                                        Outline your payment terms, deliverables, and terms of sale in a well-crafted quote. Once approved, automatically convert the quote into an invoice.
                                    </p>
                                </div>
                            </div>

                            {/* Grid Item 2 */}
                            <div className="flex items-start pb-10 border-b border-gray-100">
                                <div className="w-10 h-10 bg-[#0066ff] rounded-full flex items-center justify-center text-white shrink-0 mr-5 mt-1">
                                    <Clock className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="text-[17px] font-bold text-gray-900 mb-2">Time tracking</h3>
                                    <p className="text-[15px] text-gray-500 font-light leading-relaxed">
                                        Track project hours and charge customers accurately. Your staff can log time from their personal devices, and the total amount owed will be calculated.
                                    </p>
                                </div>
                            </div>

                            {/* Grid Item 3 */}
                            <div className="flex items-start pb-10 border-b border-gray-100 md:border-b-0 md:pb-0">
                                <div className="w-10 h-10 bg-[#0066ff] rounded-full flex items-center justify-center text-white shrink-0 mr-5 mt-1">
                                    <DollarSign className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="text-[17px] font-bold text-gray-900 mb-2">Expenses</h3>
                                    <p className="text-[15px] text-gray-500 font-light leading-relaxed">
                                        Track every penny that leaves your business's pockets. Record billable expenses like fuel charges and raw material costs, and convert them into invoices.
                                    </p>
                                </div>
                            </div>

                            {/* Grid Item 4 */}
                            <div className="flex items-start pb-10 border-b border-gray-100 md:border-b-0 md:pb-0">
                                <div className="w-10 h-10 bg-[#0066ff] rounded-full flex items-center justify-center text-white shrink-0 mr-5 mt-1">
                                    <Bell className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="text-[17px] font-bold text-gray-900 mb-2">Payment reminders</h3>
                                    <p className="text-[15px] text-gray-500 font-light leading-relaxed">
                                        Following up with customers on their due payments is awkward and time-consuming. Send payment reminders using Zoho Invoice and get paid on time.
                                    </p>
                                </div>
                            </div>

                            {/* Grid Item 5 */}
                            <div className="flex items-start mt-4">
                                <div className="w-10 h-10 bg-[#0066ff] rounded-full flex items-center justify-center text-white shrink-0 mr-5 mt-1">
                                    <Users className="w-5 h-5" />
                                </div>
                                <div>
                                    <Link to="/customers" className="text-[17px] font-bold text-gray-900 mb-2 hover:text-[#0088FF] transition-colors inline-block">Customer portal</Link>
                                    <p className="text-[15px] text-gray-500 font-light leading-relaxed">
                                        Your customers can log in to a portal with a user ID and password where they can view credits, approve quotes, pay invoices, download statements, and more.
                                    </p>
                                </div>
                            </div>

                            {/* Grid Item 6 */}
                            <div className="flex items-start mt-4">
                                <div className="w-10 h-10 bg-[#0066ff] rounded-full flex items-center justify-center text-white shrink-0 mr-5 mt-1">
                                    <PieChart className="w-5 h-5 fill-current opacity-80" />
                                </div>
                                <div>
                                    <Link to="/reports" className="text-[17px] font-bold text-gray-900 mb-2 hover:text-[#0088FF] transition-colors inline-block">Reports</Link>
                                    <p className="text-[15px] text-gray-500 font-light leading-relaxed">
                                        Get a comprehensive view of your business performance on the dashboard. Dive deeper with reports on best-selling products, AR aging, top customers, and more.
                                    </p>
                                </div>
                            </div>

                        </div>
                    </div>
                </section>

            </main>
            <Footer />
        </div>
    );
};

export default LandingPage;
