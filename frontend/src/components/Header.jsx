import React, { useState } from 'react';
import { Search, Bell, Plus, UserCircle, ChevronDown, FileText, User, ClipboardList, Package, RefreshCcw, CreditCard } from 'lucide-react';
import { Link } from 'react-router-dom';

const Header = () => {
    const [showNewMenu, setShowNewMenu] = useState(false);

    const newOptions = [
        { name: 'Invoice', path: '/invoices/new', icon: FileText },
        { name: 'Customer', path: '/customers', icon: User },
        { name: 'Quote', path: '/quotes/new', icon: ClipboardList },
        { name: 'Item', path: '/items', icon: Package },
        { name: 'Recurring Template', path: '/recurring', icon: RefreshCcw },
        { name: 'Credit Note', path: '/credit-notes', icon: CreditCard },
    ];

    return (
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 shadow-sm z-30 sticky top-0">
            <div className="flex-1 flex items-center">
                <div className="relative w-96">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                        type="text"
                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-gray-50 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-[#0088FF] focus:border-[#0088FF] sm:text-sm transition-shadow"
                        placeholder="Search in Customers, Invoices, Items..."
                    />
                </div>
            </div>
            <div className="ml-4 flex items-center space-x-4">
                <div className="relative">
                    <button
                        onClick={() => setShowNewMenu(!showNewMenu)}
                        className="bg-[#0088FF] text-white px-3 py-1.5 rounded-md text-sm font-medium flex items-center hover:bg-[#0070d2] transition-colors shadow-sm"
                    >
                        <Plus className="h-4 w-4 mr-1.5" />
                        New
                        <ChevronDown className={`h-3.5 w-3.5 ml-1 transition-transform ${showNewMenu ? 'rotate-180' : ''}`} />
                    </button>

                    {showNewMenu && (
                        <>
                            <div className="fixed inset-0 z-10" onClick={() => setShowNewMenu(false)}></div>
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-100 py-1 z-20">
                                {newOptions.map((opt) => (
                                    <Link
                                        key={opt.name}
                                        to={opt.path}
                                        onClick={() => setShowNewMenu(false)}
                                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-[#f6faff] hover:text-[#0088FF] transition-colors"
                                    >
                                        <opt.icon className="h-4 w-4 mr-3 text-gray-400" />
                                        <span>New {opt.name}</span>
                                    </Link>
                                ))}
                            </div>
                        </>
                    )}
                </div>
                <button className="text-gray-400 hover:text-gray-500 transition-colors">
                    <Bell className="h-6 w-6" />
                </button>
                <Link to="/settings" className="text-gray-400 hover:text-gray-500 transition-colors">
                    <UserCircle className="h-8 w-8 text-gray-400" />
                </Link>
            </div>
        </header>
    );
};

export default Header;
