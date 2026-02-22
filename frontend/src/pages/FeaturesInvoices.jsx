import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, Mail, Clock } from 'lucide-react';
import LandingHeader from '../components/LandingHeader';
import Footer from '../components/Footer';

const FeaturesInvoices = () => {
    const navigate = useNavigate();
    return (
        <div className="bg-white min-h-screen font-['system-ui',_'-apple-system',_'BlinkMacSystemFont',_'Segoe_UI',_'Roboto',_'sans-serif'] text-[#111]">
            <LandingHeader />

            <main className="pt-20 pb-24 border-b border-gray-100">
                {/* Hero Section */}
                <section className="max-w-[1200px] mx-auto px-8 text-center mb-24">
                    <h1 className="text-[48px] font-light text-[#111] leading-tight mb-6">
                        Create and send professional <br /> invoices online <span className="inline-block w-12 h-6 bg-blue-100 rounded-full align-middle relative ml-2"><div className="absolute right-1 top-1 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center text-white"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" /></svg></div></span>
                    </h1>
                    <p className="text-[17px] text-gray-500 font-light leading-relaxed mb-10 max-w-2xl mx-auto">
                        Zoho Invoice helps you make good-looking invoices, add discounts, and send invoices
                        to customers directly from the app. Best of all, it's completely free!
                    </p>
                    <div className="flex items-center justify-center space-x-4 mb-20">
                        <button onClick={() => navigate('/signup')} className="bg-[#0055ff] hover:bg-[#0044cc] text-white px-8 py-3 rounded-md font-semibold text-[15px] transition-colors">
                            Get started for free
                        </button>
                        <button onClick={() => navigate('/dashboard')} className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-800 px-8 py-3 rounded-md font-semibold text-[15px] transition-colors">
                            Explore demo account
                        </button>
                    </div>

                    {/* Three mockups row */}
                    <div className="flex justify-center items-end space-x-6 relative h-[400px] overflow-hidden">
                        {/* Mobile left */}
                        <div className="w-[280px] h-[350px] bg-gray-100 rounded-t-[30px] border-[8px] border-b-0 border-gray-200 shadow-lg relative translate-y-10">
                            {/* Inner screen content mock */}
                            <div className="absolute top-4 left-4 right-4 h-10 bg-white rounded flex items-center px-3 shadow-sm"><div className="w-6 h-6 rounded-full bg-blue-100 mr-2 flex items-center justify-center text-blue-500 font-bold text-[10px]">Z</div><div className="h-2 w-20 bg-gray-200 rounded"></div></div>
                        </div>

                        {/* Desktop center */}
                        <div className="w-[500px] h-[380px] bg-[#111] rounded-t-xl border-[6px] border-[#111] border-b-0 shadow-2xl relative translate-y-4 z-10">
                            <div className="w-full h-full bg-white rounded overflow-hidden p-4 flex">
                                <div className="w-1/4 h-full border-r border-gray-100 flex flex-col space-y-2 pr-4 pt-2">
                                    <div className="h-2 w-full bg-gray-200 rounded"></div><div className="h-2 w-3/4 bg-gray-200 rounded"></div>
                                </div>
                                <div className="flex-1 pl-4 pt-4">
                                    <div className="h-3 w-1/3 bg-gray-300 rounded mb-4"></div>
                                    <div className="h-40 w-full bg-gray-100 rounded"></div>
                                </div>
                            </div>
                        </div>

                        {/* Mobile right */}
                        <div className="w-[280px] h-[350px] bg-white rounded-t-[30px] border-[8px] border-b-0 border-gray-800 shadow-lg relative translate-y-10">
                            <div className="p-6 text-center">
                                <div className="text-[10px] text-gray-400 mb-1">Total Amount</div>
                                <div className="text-xl font-bold mb-4">4,296.00</div>
                                <div className="h-10 w-full bg-blue-500 rounded-md text-white text-[12px] font-medium flex items-center justify-center mt-20">Send via Mail</div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Feature 1: Craft your perfect invoice */}
                <section className="py-24 max-w-[1200px] mx-auto px-8 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                    <div className="max-w-md">
                        <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center mb-6">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                        </div>
                        <h2 className="text-[36px] font-light text-[#111] leading-tight mb-6">
                            Craft your <span className="text-[#0055ff]">perfect invoice</span>
                        </h2>
                        <p className="text-[16px] text-gray-600 font-light leading-relaxed">
                            Take control of how your tax invoices look—professional, funky, or casual. Pick an invoice template and tweak it to ensure your brand stands out.
                        </p>
                    </div>
                    <div className="bg-[#f9f9f9] rounded-2xl p-10 flex items-center justify-center relative min-h-[400px]">
                        {/* Mock Template Layout */}
                        <div className="w-[320px] bg-white shadow-xl rounded-md p-6 border border-gray-100 relative z-10 bottom-8">
                            <div className="flex justify-between items-start mb-6 border-b border-gray-100 pb-4">
                                <div className="text-red-500 font-bold text-xl tracking-tighter">Z Y L K E R</div>
                                <div className="text-right">
                                    <div className="text-xl font-light text-gray-800">INVOICE</div>
                                    <div className="text-[8px] text-gray-400 mt-1">#INV-000001 <br /> Date: 2024-06-25</div>
                                </div>
                            </div>
                            <div className="w-full h-4 bg-gray-100 rounded mb-2"></div>
                            <div className="w-full h-4 bg-gray-100 rounded mb-2"></div>
                            <div className="w-3/4 h-4 bg-gray-100 rounded mb-6"></div>
                            <div className="flex justify-between border-t border-gray-100 pt-4 mt-8">
                                <div className="text-[10px] font-bold text-gray-800">TOTAL</div>
                                <div className="text-[12px] font-bold text-gray-800">$1,120.00</div>
                            </div>
                        </div>
                        {/* Selector Mock */}
                        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-black rounded-xl p-3 flex space-x-3 z-20">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <div key={i} className={`w-12 h-16 rounded border ${i === 1 ? 'border-blue-500 opacity-100' : 'border-gray-700 opacity-50 relative'}`}>
                                    {i === 1 && <div className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-blue-500 rounded-full"></div>}
                                    <div className="w-full h-full bg-white/10 p-1 flex flex-col items-center pt-2">
                                        <div className="w-6 h-1 bg-white/20 rounded mb-1"></div><div className="w-4 h-1 bg-white/20 rounded"></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Feature 2: Add invoice details */}
                <section className="py-24 max-w-[1200px] mx-auto px-8 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                    <div className="max-w-md">
                        <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center mb-6">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>
                        </div>
                        <h2 className="text-[36px] font-light text-[#111] leading-tight mb-6">
                            Add <span className="text-[#0055ff]">invoice details</span>
                        </h2>
                        <p className="text-[16px] text-gray-600 font-light leading-relaxed">
                            Fill out necessary invoice details of your invoice, such as due date, payment terms, discounts, and total amount.
                        </p>
                    </div>
                    <div className="bg-[#f9f9f9] rounded-2xl p-10 flex items-center justify-center min-h-[400px]">
                        {/* Form Mock */}
                        <div className="w-full max-w-[450px] bg-white rounded-xl shadow-lg border border-gray-100 p-6">
                            <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-50">
                                <div className="font-semibold text-gray-800">New Invoice <span className="text-gray-400 text-xs ml-2 font-normal">| Use Simplified View</span></div>
                            </div>
                            <div className="space-y-4">
                                <div className="flex items-center">
                                    <div className="w-1/3 text-xs text-gray-500">Customer Name*</div>
                                    <div className="w-2/3 border border-gray-200 rounded px-3 py-1.5 flex justify-between items-center bg-gray-50">
                                        <span className="text-sm font-medium">Kevin Williams</span>
                                        <ChevronDown className="w-3 h-3 text-gray-400" />
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <div className="w-1/3 text-xs text-gray-500">Invoice#</div>
                                    <div className="w-2/3 border border-gray-200 rounded px-3 py-1.5 bg-gray-50 text-sm font-medium">QT-000915</div>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <div className="w-1/2 flex items-center">
                                        <div className="w-1/2 text-xs text-gray-500">Invoice Date</div>
                                        <div className="w-1/2 border border-gray-200 rounded px-2 py-1 text-xs">29 Jul 2024</div>
                                    </div>
                                    <div className="w-1/2 flex items-center">
                                        <div className="w-1/2 text-xs text-gray-500">Due Date</div>
                                        <div className="w-1/2 border border-gray-200 rounded px-2 py-1 text-xs">22/08/2024</div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-end space-x-3 mt-8 pt-4 border-t border-gray-50">
                                <button className="px-4 py-1.5 border border-gray-200 rounded text-sm text-gray-600 font-medium">Save as Draft</button>
                                <button className="px-4 py-1.5 bg-[#0055ff] rounded text-sm text-white font-medium">Save and Send</button>
                                <button className="px-4 py-1.5 border border-gray-200 rounded text-sm text-gray-600 font-medium">Cancel</button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Feature 3: Send invoices flexibly */}
                <section className="py-24 max-w-[1200px] mx-auto px-8 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                    <div className="max-w-md">
                        <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center mb-6">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                        </div>
                        <h2 className="text-[36px] font-light text-[#111] leading-tight mb-6">
                            Send invoices <span className="text-[#0055ff]">flexibly</span>
                        </h2>
                        <p className="text-[16px] text-gray-600 font-light leading-relaxed">
                            Send invoices to customers however you like—email, PDF, invoice link, SMS, and mail post directly from Zoho Invoice.
                        </p>
                    </div>
                    <div className="bg-[#f9f9f9] rounded-2xl p-10 flex items-center justify-center min-h-[400px]">
                        {/* Dropdown Mock */}
                        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 w-full max-w-[350px]">
                            <div className="flex space-x-2 border-b border-gray-100 pb-4 mb-4 relative z-0">
                                <button className="text-[11px] font-medium text-gray-600 bg-gray-50 px-3 py-1.5 rounded flex items-center">Edit</button>
                                <div className="relative z-50">
                                    <button className="text-[11px] font-medium text-gray-800 bg-gray-100 px-3 py-1.5 rounded flex items-center">Send <ChevronDown className="w-3 h-3 ml-1" /></button>
                                    <div className="absolute top-10 left-0 w-36 bg-white rounded-lg shadow-xl border border-gray-100 py-2">
                                        <div className="px-3 py-1.5 text-[12px] bg-[#0055ff] text-white flex items-center rounded flex"><Mail className="w-3 h-3 mr-2" /> Send Mail</div>
                                        <div className="px-3 py-1.5 text-[12px] text-gray-700 hover:bg-gray-50 flex items-center"><svg className="w-3 h-3 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path></svg> Send SMS</div>
                                        <div className="px-3 py-1.5 text-[12px] text-gray-700 hover:bg-gray-50 flex items-center"><Clock className="w-3 h-3 mr-2" /> Schedule Email</div>
                                    </div>
                                </div>
                                <button className="text-[11px] font-medium text-gray-600 bg-gray-50 px-3 py-1.5 rounded flex items-center">Share</button>
                            </div>
                            <div className="flex justify-between items-center mb-6 pt-10">
                                <div className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center text-xl font-bold">Z</div>
                                <div className="text-right">
                                    <div className="text-xl font-light text-gray-800">Quote</div>
                                    <div className="text-[10px] text-gray-400 mt-1">#QT-000016</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Feature 4: Your invoicing process on autopilot */}
                <section className="py-24 max-w-[1200px] mx-auto px-8 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                    <div className="max-w-md">
                        <h2 className="text-[36px] font-light text-[#111] leading-tight mb-6">
                            Your invoicing process <br /> <span className="text-[#0055ff]">on autopilot</span>
                        </h2>
                        <p className="text-[16px] text-gray-600 font-light leading-relaxed mb-6">
                            Automatically create and send tax invoices online with Zoho Invoice's recurring invoicing feature. Select the frequency, enter the start and end date, and voila! Your invoicing process runs like clockwork!
                        </p>
                        <button onClick={() => navigate('/signup')} className="border border-gray-300 hover:bg-gray-50 text-gray-800 px-6 py-2.5 rounded text-[14px] font-medium transition-colors">
                            Create free invoices
                        </button>
                    </div>
                    <div className="bg-[#f2eadc] rounded-2xl p-0 flex items-center justify-center overflow-hidden h-[450px]">
                        <img
                            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800"
                            alt="Mobile app usage"
                            className="w-full h-full object-cover opacity-80 mix-blend-multiply"
                        />
                    </div>
                </section>

            </main>
            <Footer />
        </div>
    );
};

export default FeaturesInvoices;
