import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth, googleProvider, signInWithPopup, signInWithRedirect } from '../firebase';
import { getRedirectResult } from 'firebase/auth';

const SignIn = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    // Check for redirect result on component mount
    useEffect(() => {
        const checkRedirectResult = async () => {
            try {
                const result = await getRedirectResult(auth);
                if (result?.user) {
                    localStorage.setItem('user', JSON.stringify({
                        name: result.user.displayName,
                        email: result.user.email,
                        picture: result.user.photoURL,
                        uid: result.user.uid
                    }));
                    navigate('/dashboard');
                }
            } catch (error) {
                console.error('Redirect result error:', error);
            }
        };
        checkRedirectResult();
    }, [navigate]);

    const handleGoogleSignIn = async () => {
        setLoading(true);
        try {
            // Try popup first
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
            console.error('Google sign-in error:', error.code, error.message);
            
            // If popup is blocked or CORS issue, try redirect
            if (error.code === 'auth/popup-blocked' || 
                error.code === 'auth/popup-closed-by-user' ||
                error.message.includes('Cross-Origin-Opener-Policy')) {
                console.log('Popup blocked, trying redirect method...');
                try {
                    await signInWithRedirect(auth, googleProvider);
                    // User will be redirected, no need to set loading to false
                    return;
                } catch (redirectError) {
                    console.error('Redirect error:', redirectError);
                }
            }
            
            // For demo purposes, allow navigation if Firebase not configured
            if (error.code === 'auth/configuration-not-found' || 
                error.code === 'auth/invalid-api-key') {
                alert('Firebase not configured. Navigating to dashboard for demo...');
                navigate('/dashboard');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex font-['system-ui',_'-apple-system',_'BlinkMacSystemFont',_'Segoe_UI',_'Roboto',_'sans-serif']">
            {/* Left Panel - Branding */}
            <div className="hidden lg:flex w-[45%] bg-gradient-to-br from-[#f7f7ff] to-[#eef0ff] flex-col justify-between p-12 relative overflow-hidden">
                {/* Background decorative circles */}
                <div className="absolute top-[-100px] right-[-100px] w-[400px] h-[400px] rounded-full bg-[#e8e5ff] opacity-40"></div>
                <div className="absolute bottom-[-80px] left-[-80px] w-[300px] h-[300px] rounded-full bg-[#dde8ff] opacity-30"></div>

                <div>
                    {/* Zoho Logo */}
                    <div className="flex items-center mb-20">
                        <div className="flex space-x-[2px] mr-2">
                            <div className="w-4 h-4 border-[2.5px] border-red-500 rounded-sm rounded-tl-lg scale-90 -rotate-12"></div>
                            <div className="w-4 h-4 border-[2.5px] border-green-500 rounded-sm scale-110 -translate-y-[2px]"></div>
                            <div className="w-4 h-4 border-[2.5px] border-blue-500 rounded-sm scale-100 rotate-12"></div>
                            <div className="w-4 h-4 border-[2.5px] border-yellow-500 rounded-sm rounded-br-lg scale-90 translate-y-[2px]"></div>
                        </div>
                    </div>

                    <div className="relative z-10">
                        <h1 className="text-[42px] font-light text-[#1a1a2e] leading-tight mb-6">
                            Sign in to access<br />
                            <span className="text-[#4b44c9] font-normal">Zoho Invoice</span>
                        </h1>
                        <p className="text-[16px] text-gray-500 font-light leading-relaxed max-w-sm">
                            Manage your invoices, track payments, and grow your business — all in one place.
                        </p>
                    </div>
                </div>

                <div className="relative z-10">
                    <div className="flex items-center space-x-3 mb-4">
                        <div className="w-10 h-10 rounded-full bg-[#4b44c9] flex items-center justify-center text-white">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><polyline points="14 2 14 8 20 8" /></svg>
                        </div>
                        <div>
                            <div className="text-sm font-semibold text-gray-700">Zoho Invoice</div>
                            <div className="text-xs text-gray-400">Free invoicing for small businesses</div>
                        </div>
                    </div>
                    <p className="text-[12px] text-gray-400">
                        © 2024 Zoho Corporation. All rights reserved.
                    </p>
                </div>
            </div>

            {/* Right Panel - Form */}
            <div className="flex-1 flex items-center justify-center bg-white px-6">
                <div className="w-full max-w-[400px]">
                    {/* Mobile logo */}
                    <div className="flex items-center mb-8 lg:hidden">
                        <div className="flex space-x-[2px] mr-2">
                            <div className="w-3.5 h-3.5 border-[2px] border-red-500 rounded-sm -rotate-12"></div>
                            <div className="w-3.5 h-3.5 border-[2px] border-green-500 rounded-sm rotate-3"></div>
                            <div className="w-3.5 h-3.5 border-[2px] border-blue-500 rounded-sm rotate-12"></div>
                            <div className="w-3.5 h-3.5 border-[2px] border-yellow-500 rounded-sm -rotate-3"></div>
                        </div>
                    </div>

                    <h2 className="text-[26px] font-semibold text-[#1a1a2e] mb-2">Sign in</h2>
                    <p className="text-[14px] text-gray-500 mb-8">to access Zoho Invoice</p>

                    <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                        {!showPassword ? (
                            <>
                                <div>
                                    <label className="block text-[13px] font-medium text-gray-700 mb-1.5">Email address or mobile number</label>
                                    <input
                                        type="text"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Enter your email or mobile"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-[#4b44c9] focus:ring-2 focus:ring-[#4b44c9]/20 outline-none text-[15px] placeholder-gray-400 transition-all"
                                    />
                                </div>

                                <button
                                    type="button"
                                    onClick={() => setShowPassword(true)}
                                    className="w-full bg-[#4b44c9] hover:bg-[#3d38a8] text-white py-3 rounded-lg font-semibold text-[15px] transition-colors shadow-sm"
                                >
                                    Next
                                </button>
                            </>
                        ) : (
                            <>
                                <div className="flex items-center space-x-2 mb-4 pb-4 border-b border-gray-100">
                                    <div className="w-8 h-8 rounded-full bg-[#4b44c9] flex items-center justify-center text-white text-sm font-bold">
                                        {email.charAt(0).toUpperCase()}
                                    </div>
                                    <div>
                                        <div className="text-[13px] font-medium text-gray-800">{email}</div>
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(false)}
                                            className="text-[11px] text-[#4b44c9] hover:underline"
                                        >
                                            Change account
                                        </button>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-[13px] font-medium text-gray-700 mb-1.5">Password</label>
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Enter your password"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-[#4b44c9] focus:ring-2 focus:ring-[#4b44c9]/20 outline-none text-[15px] placeholder-gray-400 transition-all"
                                    />
                                </div>

                                <div className="flex justify-end">
                                    <a href="#" className="text-[13px] text-[#4b44c9] hover:underline font-medium">Forgot password?</a>
                                </div>

                                <Link
                                    to="/dashboard"
                                    className="block w-full bg-[#4b44c9] hover:bg-[#3d38a8] text-white py-3 rounded-lg font-semibold text-[15px] transition-colors shadow-sm text-center"
                                >
                                    Sign in
                                </Link>
                            </>
                        )}

                        {/* Divider */}
                        <div className="relative my-6">
                            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200"></div></div>
                            <div className="relative flex justify-center text-[12px]"><span className="bg-white px-3 text-gray-400 font-medium">or sign in using</span></div>
                        </div>

                        {/* Social Buttons */}
                        <div className="flex justify-center space-x-4">
                            <button type="button" onClick={handleGoogleSignIn} disabled={loading} className="w-11 h-11 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 hover:border-gray-300 transition-all group disabled:opacity-50" title="Sign in with Google">
                                <svg width="18" height="18" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" /><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" /><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" /><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" /></svg>
                            </button>
                            <button type="button" className="w-11 h-11 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 hover:border-gray-300 transition-all">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="#1877F2"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                            </button>
                            <button type="button" className="w-11 h-11 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 hover:border-gray-300 transition-all">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="#333"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                            </button>
                            <button type="button" className="w-11 h-11 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 hover:border-gray-300 transition-all">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="#0A66C2"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
                            </button>
                        </div>

                        <p className="text-center text-[13px] text-gray-500 mt-6">
                            Don't have a Zoho account?{' '}
                            <Link to="/signup" className="text-[#4b44c9] font-semibold hover:underline">Sign up now</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignIn;
