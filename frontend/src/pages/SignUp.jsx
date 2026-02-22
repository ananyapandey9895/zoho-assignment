import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth, googleProvider, signInWithPopup } from '../firebase';
import { ChevronDown, Building2, Phone, Mail, Lock, MapPin } from 'lucide-react';

const SignUp = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        companyName: '',
        phone: '',
        email: '',
        password: '',
        state: 'Maharashtra'
    });
    const [agreed, setAgreed] = useState(false);
    const [showStateDropdown, setShowStateDropdown] = useState(false);
    const [loading, setLoading] = useState(false);

    const states = [
        'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
        'Delhi', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh',
        'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra',
        'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha',
        'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana',
        'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal'
    ];

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate('/dashboard');
    };

    const handleGoogleSignIn = async () => {
        setLoading(true);
        try {
            const result = await signInWithPopup(auth, googleProvider);
            const user = result.user;
            localStorage.setItem('user', JSON.stringify({
                name: user.displayName,
                email: user.email,
                picture: user.photoURL,
                uid: user.uid
            }));
            navigate('/dashboard');
        } catch (error) {
            console.error('Google sign-in error:', error.message);
            // If Firebase is not configured, navigate anyway for demo
            if (error.code === 'auth/configuration-not-found' || error.code === 'auth/invalid-api-key') {
                alert('Firebase not configured yet. Please add your Firebase config to src/firebase.js\n\nNavigating to dashboard for demo...');
                navigate('/dashboard');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen font-['system-ui',_'-apple-system',_'BlinkMacSystemFont',_'Segoe_UI',_'Roboto',_'sans-serif'] relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-[#f5f3ef]"></div>
            <div className="absolute inset-0 opacity-[0.03]" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.15'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }}></div>

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center pt-10 pb-16 px-4">
                {/* Logo */}
                <div className="flex flex-col items-center mb-8">
                    <div className="w-12 h-12 bg-white rounded-lg shadow-md flex items-center justify-center mb-3">
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0066ff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                            <polyline points="14 2 14 8 20 8" />
                            <line x1="16" y1="13" x2="8" y2="13" />
                            <line x1="16" y1="17" x2="8" y2="17" />
                            <polyline points="10 9 9 9 8 9" />
                        </svg>
                    </div>
                    <div className="flex flex-col items-center leading-tight">
                        <span className="text-[11px] font-semibold text-gray-500 tracking-wide">Zoho</span>
                        <span className="text-[18px] font-bold text-black tracking-tight -mt-0.5">Invoice</span>
                    </div>
                </div>

                {/* Heading */}
                <h1 className="text-[32px] font-light text-[#2b2b2b] text-center leading-snug mb-10">
                    Your invoicing is about to<br />
                    get a <span className="text-[#0066ff] font-normal">whole lot easier</span>
                </h1>

                {/* Form Card */}
                <div className="w-full max-w-[520px] bg-white rounded-xl shadow-lg p-8 pb-10">
                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Company Name */}
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                                <Building2 className="w-[18px] h-[18px]" />
                            </div>
                            <input
                                type="text"
                                name="companyName"
                                value={formData.companyName}
                                onChange={handleChange}
                                placeholder="Company Name"
                                className="w-full pl-12 pr-4 py-3.5 border border-gray-200 rounded-lg focus:border-[#0066ff] focus:ring-1 focus:ring-[#0066ff]/30 outline-none text-[15px] placeholder-gray-400 transition-all bg-white"
                            />
                        </div>

                        {/* Phone Number */}
                        <div className="relative flex">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-400">
                                <Phone className="w-[18px] h-[18px]" />
                            </div>
                            <div className="absolute inset-y-0 left-12 flex items-center border-r border-gray-200 pr-2.5 my-3">
                                <span className="text-[14px] text-gray-700 font-medium">+91</span>
                            </div>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="Phone Number"
                                className="w-full pl-[90px] pr-4 py-3.5 border border-gray-200 rounded-lg focus:border-[#0066ff] focus:ring-1 focus:ring-[#0066ff]/30 outline-none text-[15px] placeholder-gray-400 transition-all bg-white"
                            />
                        </div>

                        {/* Email */}
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                                <Mail className="w-[18px] h-[18px]" />
                            </div>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Email Address"
                                className="w-full pl-12 pr-4 py-3.5 border border-gray-200 rounded-lg focus:border-[#0066ff] focus:ring-1 focus:ring-[#0066ff]/30 outline-none text-[15px] placeholder-gray-400 transition-all bg-white"
                            />
                        </div>

                        {/* Password */}
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                                <Lock className="w-[18px] h-[18px]" />
                            </div>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Password"
                                className="w-full pl-12 pr-4 py-3.5 border border-gray-200 rounded-lg focus:border-[#0066ff] focus:ring-1 focus:ring-[#0066ff]/30 outline-none text-[15px] placeholder-gray-400 transition-all bg-white"
                            />
                        </div>

                        {/* State Dropdown */}
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                                <MapPin className="w-[18px] h-[18px]" />
                            </div>
                            <div
                                className="w-full pl-12 pr-10 py-3.5 border border-gray-200 rounded-lg text-[15px] cursor-pointer bg-white flex items-center hover:border-gray-300 transition-all"
                                onClick={() => setShowStateDropdown(!showStateDropdown)}
                            >
                                <span className={formData.state ? 'text-gray-800' : 'text-gray-400'}>{formData.state || 'Select State'}</span>
                            </div>
                            <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-gray-400">
                                <ChevronDown className="w-[18px] h-[18px]" />
                            </div>
                            {showStateDropdown && (
                                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-xl z-50 max-h-[200px] overflow-y-auto">
                                    {states.map(state => (
                                        <div
                                            key={state}
                                            className={`px-4 py-2.5 text-[14px] cursor-pointer hover:bg-blue-50 transition-colors ${formData.state === state ? 'text-[#0066ff] bg-blue-50 font-medium' : 'text-gray-700'}`}
                                            onClick={() => { setFormData({ ...formData, state }); setShowStateDropdown(false); }}
                                        >
                                            {state}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Data Location */}
                        <p className="text-[13px] text-gray-500">
                            Your data will be in <span className="font-medium text-gray-700">INDIA</span> data center.{' '}
                            <a href="#" className="text-black font-medium underline hover:text-[#0066ff] transition-colors">Change Country</a>
                        </p>

                        {/* Terms */}
                        <label className="flex items-start cursor-pointer">
                            <input
                                type="checkbox"
                                checked={agreed}
                                onChange={() => setAgreed(!agreed)}
                                className="mt-0.5 mr-2.5 w-4 h-4 rounded border-gray-300 text-[#0066ff] focus:ring-[#0066ff] cursor-pointer"
                            />
                            <span className="text-[13px] text-gray-600 leading-relaxed">
                                I agree to the <a href="#" className="text-[#0066ff] hover:underline font-medium">Terms of Service</a> and <a href="#" className="text-[#0066ff] hover:underline font-medium">Privacy Policy</a>.
                            </span>
                        </label>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full bg-[#0066ff] hover:bg-[#0055dd] text-white py-3.5 rounded-full font-semibold text-[16px] transition-colors shadow-md hover:shadow-lg"
                        >
                            Create Free Account
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="text-center mt-6 mb-5">
                        <span className="text-[13px] text-gray-500">Or sign in using</span>
                    </div>

                    {/* Social Logins */}
                    <div className="flex justify-center items-center space-x-4">
                        {/* Google - Firebase Auth */}
                        <button
                            type="button"
                            onClick={handleGoogleSignIn}
                            disabled={loading}
                            className="w-10 h-10 rounded-full flex items-center justify-center hover:opacity-80 transition-opacity disabled:opacity-50"
                            title="Sign in with Google"
                        >
                            <svg width="28" height="28" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" /><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" /><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" /><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" /></svg>
                        </button>

                        {/* Facebook */}
                        <button type="button" className="w-10 h-10 rounded-full flex items-center justify-center hover:opacity-80 transition-opacity">
                            <svg width="28" height="28" viewBox="0 0 24 24" fill="#1877F2"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                        </button>

                        {/* X (Twitter) */}
                        <button type="button" className="w-10 h-10 rounded-full flex items-center justify-center hover:opacity-80 transition-opacity">
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="#333"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                        </button>

                        {/* Microsoft */}
                        <button type="button" className="w-10 h-10 rounded-full flex items-center justify-center hover:opacity-80 transition-opacity">
                            <div className="grid grid-cols-2 gap-[2px] w-[22px] h-[22px]">
                                <div className="bg-[#f25022]"></div>
                                <div className="bg-[#7fba00]"></div>
                                <div className="bg-[#00a4ef]"></div>
                                <div className="bg-[#ffb900]"></div>
                            </div>
                        </button>

                        {/* LinkedIn */}
                        <button type="button" className="w-10 h-10 rounded-full flex items-center justify-center hover:opacity-80 transition-opacity">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="#0A66C2"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
                        </button>
                    </div>
                </div>

                {/* Bottom text */}
                <p className="text-center text-[13px] text-gray-500 mt-6">
                    Already have a Zoho account?{' '}
                    <Link to="/signin" className="text-[#0066ff] font-semibold hover:underline">Sign in</Link>
                </p>
            </div>
        </div>
    );
};

export default SignUp;
