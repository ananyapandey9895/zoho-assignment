import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

const DashboardLayout = () => {
    return (
        <div className="flex h-screen overflow-hidden bg-[#f8f9fa]">
            <Sidebar />
            <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
                <Header />
                <main className="w-full grow p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
