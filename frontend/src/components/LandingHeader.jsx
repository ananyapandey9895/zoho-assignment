import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, LayoutGrid, ArrowRight } from 'lucide-react';

const LandingHeader = () => {
    const [scrolled, setScrolled] = useState(false);
    const [showFeaturesDropdown, setShowFeaturesDropdown] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 40);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            {/* Top Global Nav - Zoho Network */}
            <div className="bg-white border-b border-gray-100 py-2 px-8 flex justify-between items-center text-[13px] z-[60] relative">
                <div className="flex items-center space-x-6">
                    <div className="flex items-center">
                        <div className="flex space-x-[2px] mr-2">
                            <div className="w-3 h-3 border-[2px] border-red-500 rounded-sm rounded-tl-lg scale-90 -rotate-12"></div>
                            <div className="w-3 h-3 border-[2px] border-green-500 rounded-sm scale-110 -translate-y-[2px]"></div>
                            <div className="w-3 h-3 border-[2px] border-blue-500 rounded-sm scale-100 rotate-12"></div>
                            <div className="w-3 h-3 border-[2px] border-yellow-500 rounded-sm rounded-br-lg scale-90 translate-y-[2px]"></div>
                        </div>
                        <span className="font-bold tracking-[0.2em] text-[8px] mt-4 ml-[-40px]">ZOHO</span>
                    </div>
                    <div className="hidden lg:flex items-center space-x-6 text-gray-700">
                        <a href="#" className="hover:text-black transition-colors">Books</a>
                        <a href="#" className="hover:text-black transition-colors">Inventory</a>
                        <a href="#" className="hover:text-black transition-colors">Payroll</a>
                        <a href="#" className="hover:text-black transition-colors">Billing</a>
                        <a href="#" className="hover:text-black transition-colors">Expense</a>
                        <a href="#" className="hover:text-black transition-colors">FSM</a>
                        <div className="flex items-center cursor-pointer hover:text-black transition-colors">
                            All Products <ChevronDown className="ml-1 w-3 h-3" />
                        </div>
                    </div>
                </div>
                <div className="flex items-center space-x-6 text-gray-700">
                    <svg className="w-4 h-4 cursor-pointer hover:text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                    <Link to="/signin" className="text-red-500 hover:text-red-600 font-medium">Sign In</Link>
                    <Link to="/signup" className="bg-[#f0483e] hover:bg-[#d93f36] text-white px-4 py-1.5 rounded-[3px] font-semibold transition-colors">
                        Sign Up For Free
                    </Link>
                </div>
            </div>

            {/* Main Product Nav */}
            <nav className={`w-full py-4 px-8 flex justify-between items-center bg-white z-[50] transition-all duration-300 ${scrolled ? 'fixed top-0 left-0 shadow-md py-3' : 'relative'}`}>
                <div className="flex items-center cursor-pointer">
                    <div className="text-[#0055ff] mr-2">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                            <polyline points="14 2 14 8 20 8"></polyline>
                            <line x1="16" y1="13" x2="8" y2="13"></line>
                            <line x1="16" y1="17" x2="8" y2="17"></line>
                            <polyline points="10 9 9 9 8 9"></polyline>
                        </svg>
                    </div>
                    <div className="flex flex-col leading-tight">
                        <span className="text-sm font-semibold text-gray-700">Zoho</span>
                        <span className="text-xl font-bold text-black tracking-tight -mt-1">Invoice</span>
                    </div>
                </div>

                <div className="hidden lg:flex items-center space-x-8 text-[14px] text-gray-700">
                    <div
                        className="relative flex items-center cursor-pointer hover:text-blue-600 py-4"
                        onMouseEnter={() => setShowFeaturesDropdown(true)}
                        onMouseLeave={() => setShowFeaturesDropdown(false)}
                    >
                        Features <ChevronDown className="ml-1 w-4 h-4" />

                        {/* Features Dropdown Menu */}
                        {showFeaturesDropdown && (
                            <div className="absolute top-full left-[-20px] w-[500px] bg-white rounded-xl shadow-xl border border-gray-100 flex overflow-hidden z-[100] mt-[-4px] transition-opacity duration-200">
                                {/* Left List */}
                                <div className="w-[45%] border-r border-gray-100 p-6 flex flex-col pl-8">
                                    <div className="text-[11px] font-bold text-gray-500 tracking-widest mb-6 flex items-center">
                                        <LayoutGrid className="w-4 h-4 mr-2" /> FEATURES
                                    </div>
                                    <div className="space-y-5 flex-1">
                                        <Link to="/quotes" className="flex items-center text-[15px] font-medium text-gray-800 hover:text-blue-600 transition-colors">
                                            <span className="w-3 h-[1px] bg-gray-400 mr-3"></span> Quotes
                                        </Link>
                                        <Link to="/features/invoices" className="flex items-center text-[15px] font-medium text-gray-800 hover:text-blue-600 transition-colors">
                                            <span className="w-3 h-[1px] bg-gray-400 mr-3"></span> Invoices
                                        </Link>
                                        <Link to="/payments" className="flex items-center text-[15px] font-medium text-gray-800 hover:text-blue-600 transition-colors">
                                            <span className="w-3 h-[1px] bg-gray-400 mr-3"></span> Payments
                                        </Link>
                                        <Link to="/templates" className="flex items-center text-[15px] font-medium text-gray-800 hover:text-blue-600 transition-colors">
                                            <span className="w-3 h-[1px] bg-gray-400 mr-3"></span> Templates
                                        </Link>
                                    </div>
                                    <Link to="/dashboard" className="flex items-center justify-between mt-8 pt-4 border-t border-gray-100 text-[15px] font-medium text-gray-900 group hover:text-blue-600 transition-colors">
                                        All features <ArrowRight className="w-4 h-4 text-gray-500 group-hover:text-blue-600 transition-colors" />
                                    </Link>
                                </div>

                                {/* Right Image Banner */}
                                <div className="w-[55%] p-6 bg-white">
                                    <h4 className="text-[13px] font-bold tracking-wide text-gray-900 mb-4 leading-relaxed uppercase">HOW TO BECOME A VOICE-<br />OVER ARTIST</h4>
                                    <div className="rounded-md overflow-hidden mb-4">
                                        <img src="https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&q=80&w=400" alt="Podcast Microphone" className="w-full h-[140px] object-cover hover:scale-105 transition-transform duration-500" />
                                    </div>
                                    <a href="#" className="text-blue-500 text-[15px] font-medium hover:underline">Explore now</a>
                                </div>
                            </div>
                        )}
                    </div>

                    <a href="#" className="hover:text-blue-600 cursor-pointer">Pricing</a>
                    <div className="flex items-center cursor-pointer hover:text-blue-600 py-4">Integrations <ChevronDown className="ml-1 w-4 h-4" /></div>
                    <div className="flex items-center cursor-pointer hover:text-blue-600">Download <ChevronDown className="ml-1 w-4 h-4" /></div>
                    <div className="flex items-center cursor-pointer hover:text-blue-600">Resources <ChevronDown className="ml-1 w-4 h-4" /></div>

                    {scrolled && (
                        <Link to="/signup" className="bg-[#f0483e] hover:bg-[#d93f36] text-white px-4 py-2 rounded-[3px] font-semibold text-[14px] transition-colors ml-4">
                            Sign Up For Free
                        </Link>
                    )}
                </div>
            </nav>
        </>
    );
};

export default LandingHeader;
