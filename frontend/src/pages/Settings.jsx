import React, { useState, useEffect } from 'react';
import { Settings as SettingsIcon, Building2, User, Bell, Shield, CreditCard, Plus, Trash2 } from 'lucide-react';
import axios from 'axios';

import API from '../config/api';

const Settings = () => {
    const [activeTab, setActiveTab] = useState('organization');
    const [loading, setLoading] = useState(false);

    // States for different sections
    const [org, setOrg] = useState({ name: '', industry: '', address: '', currency: 'Indian Rupee (INR)', timezone: '(GMT +5:30) Asia/Kolkata' });
    const [users, setUsers] = useState([]);
    const [prefs, setPrefs] = useState({ language: 'English', dateFormat: 'DD/MM/YYYY', emailNotif: true });
    const [security, setSecurity] = useState({ currentPassword: '', newPassword: '' });

    const [showAddUserModal, setShowAddUserModal] = useState(false);
    const [newUser, setNewUser] = useState({ name: '', email: '', role: 'Staff' });

    useEffect(() => {
        fetchData();
    }, [activeTab]);

    const fetchData = async () => {
        setLoading(true);
        try {
            if (activeTab === 'organization') {
                const res = await axios.get(`${API}/settings/organization`);
                if (res.data) setOrg(res.data);
            } else if (activeTab === 'users') {
                const res = await axios.get(`${API}/users`);
                setUsers(res.data);
            } else if (activeTab === 'preferences') {
                const res = await axios.get(`${API}/settings/prefs`);
                setPrefs(prev => ({ ...prev, ...res.data }));
            }
        } catch (err) {
            console.error('Fetch settings error:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleSaveOrg = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${API}/settings/organization`, org);
            alert('Organization profile updated!');
        } catch (err) { alert('Error updating profile'); }
    };

    const handleAddUser = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${API}/users`, newUser);
            setShowAddUserModal(false);
            setNewUser({ name: '', email: '', role: 'Staff' });
            fetchData();
        } catch (err) { alert('Error adding user'); }
    };

    const handleDeleteUser = async (id) => {
        if (!confirm('Remove this user?')) return;
        try {
            await axios.delete(`${API}/users/${id}`);
            fetchData();
        } catch (err) { alert('Error removing user'); }
    };

    const tabs = [
        { id: 'organization', name: 'Organization Profile', icon: Building2 },
        { id: 'users', name: 'Users & Roles', icon: User },
        { id: 'preferences', name: 'Preferences', icon: SettingsIcon },
        { id: 'notifications', name: 'Notifications', icon: Bell },
        { id: 'security', name: 'Security', icon: Shield },
        { id: 'subscriptions', name: 'Subscription', icon: CreditCard },
    ];

    return (
        <div className="max-w-screen-xl mx-auto flex h-full gap-8">
            {/* Nav */}
            <div className="w-64 space-y-1">
                <h1 className="text-xl font-semibold mb-6 px-3">Settings</h1>
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`w-full flex items-center px-4 py-2.5 text-sm font-medium rounded-md transition-colors ${activeTab === tab.id
                            ? 'bg-[#eef2fa] text-[#0088FF]'
                            : 'text-gray-600 hover:bg-gray-50'
                            }`}
                    >
                        <tab.icon className="mr-3 h-4 w-4" />
                        {tab.name}
                    </button>
                ))}
            </div>

            {/* Content */}
            <div className="flex-1 bg-white border border-gray-200 rounded-lg shadow-sm min-h-[600px]">
                {loading ? (
                    <div className="p-12 text-center text-gray-500">Loading...</div>
                ) : (
                    <>
                        {activeTab === 'organization' && (
                            <div className="p-8">
                                <h2 className="text-lg font-semibold mb-6">Organization Profile</h2>
                                <form onSubmit={handleSaveOrg} className="space-y-6 max-w-2xl">
                                    <div className="flex items-center gap-6 pb-6 border-b border-gray-100">
                                        <div className="h-20 w-20 bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
                                            <Building2 className="h-8 w-8 text-gray-400" />
                                        </div>
                                        <div>
                                            <button type="button" className="text-sm font-medium text-[#0088FF] hover:underline">Upload Logo</button>
                                            <p className="text-xs text-gray-500 mt-1">Preferably 240x240 pixels (JPEG, PNG)</p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Organization Name</label>
                                            <input type="text" value={org.name} onChange={e => setOrg({ ...org, name: e.target.value })} className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:border-[#0088FF] outline-none" />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Industry</label>
                                            <input type="text" value={org.industry} onChange={e => setOrg({ ...org, industry: e.target.value })} className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:border-[#0088FF] outline-none" />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Address</label>
                                        <textarea rows="3" value={org.address} onChange={e => setOrg({ ...org, address: e.target.value })} className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:border-[#0088FF] outline-none"></textarea>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Currency</label>
                                            <select value={org.currency} onChange={e => setOrg({ ...org, currency: e.target.value })} className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:border-[#0088FF] outline-none bg-white">
                                                <option>Indian Rupee (INR)</option>
                                                <option>US Dollar (USD)</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Time Zone</label>
                                            <select value={org.timezone} onChange={e => setOrg({ ...org, timezone: e.target.value })} className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:border-[#0088FF] outline-none bg-white">
                                                <option>(GMT +5:30) Asia/Kolkata</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="pt-4">
                                        <button type="submit" className="bg-[#0088FF] text-white px-6 py-2 rounded text-sm font-medium hover:bg-[#0070d2] transition">Save Changes</button>
                                    </div>
                                </form>
                            </div>
                        )}

                        {activeTab === 'users' && (
                            <div className="p-8">
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="text-lg font-semibold">Users & Roles</h2>
                                    <button onClick={() => setShowAddUserModal(true)} className="bg-[#0088FF] text-white px-4 py-2 rounded text-sm font-medium flex items-center hover:bg-[#0070d2]">
                                        <Plus className="h-4 w-4 mr-1.5" /> Add User
                                    </button>
                                </div>
                                <div className="bg-white border border-gray-100 rounded-lg overflow-hidden">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">User</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
                                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-100">
                                            {users.map(u => (
                                                <tr key={u._id}>
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center">
                                                            <div className="h-8 w-8 rounded-full bg-blue-100 text-[#0088FF] flex items-center justify-center font-bold text-xs mr-3">
                                                                {u.name.charAt(0)}
                                                            </div>
                                                            <div>
                                                                <div className="text-sm font-medium text-gray-900">{u.name}</div>
                                                                <div className="text-xs text-gray-500">{u.email}</div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <span className="px-2 py-1 text-[10px] font-bold rounded-full bg-green-100 text-green-700 uppercase">
                                                            {u.role}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 text-right">
                                                        <button onClick={() => handleDeleteUser(u._id)} className="text-gray-400 hover:text-red-500">
                                                            <Trash2 className="h-4 w-4" />
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                            {users.length === 0 && (
                                                <tr><td colSpan="3" className="px-6 py-8 text-center text-gray-400 text-sm">No users found.</td></tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>

                                {showAddUserModal && (
                                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                                        <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden">
                                            <div className="p-6 border-b border-gray-100">
                                                <h3 className="text-xl font-bold text-gray-900">Invite User</h3>
                                            </div>
                                            <form onSubmit={handleAddUser} className="p-6 space-y-4">
                                                <div>
                                                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Full Name</label>
                                                    <input required type="text" value={newUser.name} onChange={e => setNewUser({ ...newUser, name: e.target.value })} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#0088FF]/20 focus:border-[#0088FF]" placeholder="e.g. John Doe" />
                                                </div>
                                                <div>
                                                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Email Address</label>
                                                    <input required type="email" value={newUser.email} onChange={e => setNewUser({ ...newUser, email: e.target.value })} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#0088FF]/20 focus:border-[#0088FF]" placeholder="john@example.com" />
                                                </div>
                                                <div>
                                                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Role</label>
                                                    <select value={newUser.role} onChange={e => setNewUser({ ...newUser, role: e.target.value })} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none bg-white">
                                                        <option value="Staff">Staff</option>
                                                        <option value="Admin">Admin</option>
                                                    </select>
                                                </div>
                                                <div className="flex gap-3 pt-4">
                                                    <button type="button" onClick={() => setShowAddUserModal(false)} className="flex-1 px-4 py-2 border border-gray-200 text-gray-600 rounded-lg text-sm font-semibold hover:bg-gray-50 transition">Cancel</button>
                                                    <button type="submit" className="flex-1 px-4 py-2 bg-[#0088FF] text-white rounded-lg text-sm font-semibold hover:bg-[#0070d2] transition shadow-md shadow-blue-100">Invite User</button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                        {activeTab === 'preferences' && (
                            <div className="p-8">
                                <h2 className="text-lg font-semibold mb-6">Preferences</h2>
                                <div className="space-y-6 max-w-md">
                                    <div>
                                        <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Language</label>
                                        <select value={prefs.language} onChange={e => setPrefs({ ...prefs, language: e.target.value })} className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:border-[#0088FF] outline-none bg-white">
                                            <option>English</option>
                                            <option>Hindi</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Date Format</label>
                                        <select value={prefs.dateFormat} onChange={e => setPrefs({ ...prefs, dateFormat: e.target.value })} className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:border-[#0088FF] outline-none bg-white">
                                            <option>DD/MM/YYYY</option>
                                            <option>MM/DD/YYYY</option>
                                        </select>
                                    </div>
                                    <div className="flex items-center justify-between py-4 border-t border-gray-100">
                                        <div>
                                            <div className="text-sm font-medium text-gray-900">Email Notifications</div>
                                            <div className="text-xs text-gray-500">Receive weekly revenue summaries</div>
                                        </div>
                                        <input type="checkbox" checked={prefs.emailNotif} onChange={e => setPrefs({ ...prefs, emailNotif: e.target.checked })} className="h-4 w-4 text-[#0088FF] rounded border-gray-300 focus:ring-[#0088FF]" />
                                    </div>
                                    <button className="bg-[#0088FF] text-white px-6 py-2 rounded text-sm font-medium hover:bg-[#0070d2]">Save Preferences</button>
                                </div>
                            </div>
                        )}

                        {activeTab === 'notifications' && (
                            <div className="p-8">
                                <h2 className="text-lg font-semibold mb-6">Notification Settings</h2>
                                <div className="space-y-4">
                                    {['Invoice Sent', 'Payment Received', 'Quote Accepted', 'Overdue Reminder'].map((item, i) => (
                                        <div key={i} className="flex items-center justify-between py-3 border-b border-gray-50">
                                            <span className="text-sm text-gray-700">{item}</span>
                                            <div className="flex gap-4">
                                                <label className="flex items-center gap-2 cursor-pointer">
                                                    <input type="checkbox" defaultChecked className="h-4 w-4 text-[#0088FF] rounded border-gray-300" />
                                                    <span className="text-xs text-gray-500">Email</span>
                                                </label>
                                                <label className="flex items-center gap-2 cursor-pointer">
                                                    <input type="checkbox" className="h-4 w-4 text-[#0088FF] rounded border-gray-300" />
                                                    <span className="text-xs text-gray-500">SMS</span>
                                                </label>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {activeTab === 'security' && (
                            <div className="p-8">
                                <h2 className="text-lg font-semibold mb-6">Security Settings</h2>
                                <div className="max-w-md space-y-4">
                                    <div>
                                        <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Current Password</label>
                                        <input type="password" className="w-full border border-gray-200 rounded px-3 py-2 text-sm outline-none focus:border-[#0088FF]" />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">New Password</label>
                                        <input type="password" className="w-full border border-gray-200 rounded px-3 py-2 text-sm outline-none focus:border-[#0088FF]" />
                                    </div>
                                    <button className="bg-[#0088FF] text-white px-6 py-2 rounded text-sm font-medium hover:bg-[#0070d2]">Change Password</button>
                                </div>
                            </div>
                        )}

                        {activeTab === 'subscriptions' && (
                            <div className="p-8">
                                <h2 className="text-lg font-semibold mb-6">Subscription & Billing</h2>
                                <div className="bg-[#f6faff] border border-blue-100 rounded-lg p-6 flex justify-between items-center">
                                    <div>
                                        <div className="text-xs font-bold text-[#0088FF] uppercase tracking-wider mb-1">Current Plan</div>
                                        <div className="text-2xl font-bold text-gray-900">Standard Plan</div>
                                        <div className="text-sm text-gray-500 mt-1">₹1,500 / month · Next billing: Mar 15, 2026</div>
                                    </div>
                                    <button className="bg-white border border-gray-200 text-gray-700 px-6 py-2 rounded-lg text-sm font-semibold hover:bg-gray-50 transition shadow-sm">Upgrade Plan</button>
                                </div>
                                <div className="mt-8">
                                    <h3 className="text-sm font-semibold mb-4 text-gray-700">Recent Invoices</h3>
                                    <div className="text-xs text-gray-400 italic">No billing history available yet.</div>
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default Settings;
