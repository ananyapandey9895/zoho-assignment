import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, FileText, Package, Wallet, Settings, ClipboardList, BarChart3, RefreshCcw, CreditCard, Palette, LayoutGrid } from 'lucide-react';

const Sidebar = () => {
    const mainItems = [
        { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
        { name: 'Customers', path: '/customers', icon: Users },
        { name: 'Items', path: '/items', icon: Package },
    ];

    const featureItems = [
        { name: 'Quotes', path: '/quotes', icon: ClipboardList },
        { name: 'Invoices', path: '/invoices', icon: FileText },
        { name: 'Payments', path: '/payments', icon: Wallet },
        { name: 'Templates', path: '/templates', icon: Palette },
    ];

    const otherItems = [
        { name: 'Recurring Invoices', path: '/recurring', icon: RefreshCcw },
        { name: 'Credit Notes', path: '/credit-notes', icon: CreditCard },
        { name: 'Reports', path: '/reports', icon: BarChart3 },
    ];

    return (
        <aside className="w-64 bg-white border-r border-gray-200 flex flex-col h-full shadow-sm">
            <div className="h-16 flex items-center px-6 border-b border-gray-100">
                <span className="text-xl font-bold text-[#0088FF] tracking-tight">Zoho Invoice</span>
            </div>
            <div className="flex-1 overflow-y-auto py-4">
                <nav className="space-y-6 px-3">
                    <div>
                        {mainItems.map((item) => (
                            <NavLink key={item.name} to={item.path} className={({ isActive }) => `flex items-center px-3 py-2 text-sm font-medium rounded-md mb-1 transition-colors ${isActive ? 'bg-[#eef2fa] text-[#0088FF]' : 'text-gray-600 hover:bg-gray-50'}`}>
                                <item.icon className="mr-3 h-4 w-4" /> {item.name}
                            </NavLink>
                        ))}
                    </div>

                    <div>
                        <div className="px-3 mb-2 flex items-center text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                            <LayoutGrid className="h-3.5 w-3.5 mr-2" /> Features
                        </div>
                        {featureItems.map((item) => (
                            <NavLink key={item.name} to={item.path} className={({ isActive }) => `flex items-center px-3 py-2 text-sm font-medium rounded-md mb-1 transition-colors ${isActive ? 'bg-[#eef2fa] text-[#0088FF]' : 'text-gray-600 hover:bg-gray-50'}`}>
                                <div className="w-4 flex justify-center mr-3">—</div> {item.name}
                            </NavLink>
                        ))}
                    </div>

                    <div className="border-t border-gray-50 pt-4">
                        {otherItems.map((item) => (
                            <NavLink key={item.name} to={item.path} className={({ isActive }) => `flex items-center px-3 py-2 text-sm font-medium rounded-md mb-1 transition-colors ${isActive ? 'bg-[#eef2fa] text-[#0088FF]' : 'text-gray-600 hover:bg-gray-50'}`}>
                                <item.icon className="mr-3 h-4 w-4" /> {item.name}
                            </NavLink>
                        ))}
                    </div>
                </nav>
            </div>
            <div className="p-4 border-t border-gray-100">
                <NavLink
                    to="/settings"
                    className="flex items-center px-3 py-2.5 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors duration-150"
                >
                    <Settings className="mr-3 h-5 w-5" />
                    Settings
                </NavLink>
            </div>
        </aside>
    );
};

export default Sidebar;
