import React from 'react';
import { ChevronDown } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-[#111111] text-gray-300 pt-16 pb-8 px-8 font-['system-ui',_'-apple-system',_'BlinkMacSystemFont',_'Segoe_UI',_'Roboto',_'sans-serif']">
            <div className="max-w-[1200px] mx-auto">

                {/* Top Section - 3 Columns */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">

                    {/* Column 1: Help & Resources */}
                    <div>
                        <h3 className="text-[11px] font-bold text-white tracking-[0.15em] uppercase mb-1">Help & Resources</h3>
                        <div className="w-8 h-[2px] bg-[#f0483e] mb-6"></div>
                        <div className="flex space-x-12">
                            <div className="space-y-3">
                                {['Resources', 'FAQs', 'Webinars', 'Videos', 'Community', 'Marketplace', 'Integrations'].map(item => (
                                    <a key={item} href="#" className="block text-[13px] text-gray-400 hover:text-white transition-colors">{item}</a>
                                ))}
                            </div>
                            <div>
                                <h4 className="text-[13px] text-white font-medium mb-4">Quick Links</h4>
                                <div className="space-y-3">
                                    {['Support', 'Business guides', 'Blog', '#MyFirstInvoice'].map(item => (
                                        <a key={item} href="#" className="block text-[13px] text-gray-400 hover:text-white transition-colors">{item}</a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Column 2: Best Suited For */}
                    <div>
                        <h3 className="text-[11px] font-bold text-white tracking-[0.15em] uppercase mb-1">Best Suited For</h3>
                        <div className="w-8 h-[2px] bg-[#f0483e] mb-6"></div>
                        <div className="space-y-3">
                            {['Freelancers', 'Consultancies', 'Travel and tourism', 'Contractors and construction business', 'Auto repairs', 'Law firms'].map(item => (
                                <a key={item} href="#" className="block text-[13px] text-gray-400 hover:text-white transition-colors">{item}</a>
                            ))}
                        </div>
                    </div>

                    {/* Column 3: Available on Platforms + Contact */}
                    <div>
                        <h3 className="text-[11px] font-bold text-white tracking-[0.15em] uppercase mb-1">Available on Platforms</h3>
                        <div className="w-8 h-[2px] bg-[#f0483e] mb-6"></div>
                        <div className="flex flex-wrap gap-3 mb-8">
                            {/* Google Play */}
                            <a href="#" className="bg-black border border-gray-700 rounded-md px-3 py-1.5 flex items-center space-x-2 hover:border-gray-500 transition-colors">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.609-.92z" fill="#4285F4" /><path d="M17.297 8.502L5.865.965C5.58.8 5.28.7 4.99.67l9.11 9.11 3.197-1.278z" fill="#EA4335" /><path d="M17.297 15.498L14.1 14.22l-9.11 9.11c.29-.03.59-.13.875-.295l11.432-7.537z" fill="#34A853" /><path d="M20.39 10.837l-3.093-1.335L14.1 12l3.197 2.498 3.093-1.335c.79-.41 1.21-1.04 1.21-1.663s-.42-1.253-1.21-1.663z" fill="#FBBC05" /></svg>
                                <div className="leading-none">
                                    <div className="text-[7px] text-gray-400 uppercase">Get it on</div>
                                    <div className="text-[11px] text-white font-medium">Google Play</div>
                                </div>
                            </a>
                            {/* App Store */}
                            <a href="#" className="bg-black border border-gray-700 rounded-md px-3 py-1.5 flex items-center space-x-2 hover:border-gray-500 transition-colors">
                                <svg width="14" height="16" viewBox="0 0 14 17" fill="white"><path d="M11.35 8.94c-.02-2.08 1.7-3.08 1.78-3.13-1.97-2.88-5.03-3.27-6.11-3.31-2.58-.27-5.07 1.53-6.39 1.53-1.34 0-3.35-1.5-5.52-1.46C-7.47 2.62-9.72 4.29-10.93 6.72c-2.56 4.44-.65 11 1.82 14.61 1.23 1.77 2.67 3.75 4.57 3.68 1.85-.08 2.54-1.18 4.77-1.18 2.21 0 2.85 1.18 4.78 1.14 1.98-.03 3.22-1.79 4.41-3.57 1.41-2.04 1.98-4.03 2.01-4.13-.04-.02-3.84-1.47-3.88-5.83z" /></svg>
                                <div className="leading-none">
                                    <div className="text-[7px] text-gray-400 uppercase">Download on the</div>
                                    <div className="text-[11px] text-white font-medium">App Store</div>
                                </div>
                            </a>
                            {/* Microsoft */}
                            <a href="#" className="bg-black border border-gray-700 rounded-md px-3 py-1.5 flex items-center space-x-2 hover:border-gray-500 transition-colors">
                                <div className="grid grid-cols-2 gap-[2px] w-3.5 h-3.5">
                                    <div className="bg-[#f25022]"></div>
                                    <div className="bg-[#7fba00]"></div>
                                    <div className="bg-[#00a4ef]"></div>
                                    <div className="bg-[#ffb900]"></div>
                                </div>
                                <div className="leading-none">
                                    <div className="text-[7px] text-gray-400 uppercase">Get it from</div>
                                    <div className="text-[11px] text-white font-medium">Microsoft</div>
                                </div>
                            </a>
                        </div>

                        <h3 className="text-[11px] font-bold text-white tracking-[0.15em] uppercase mb-1">Contact Us On</h3>
                        <div className="w-8 h-[2px] bg-[#f0483e] mb-5"></div>
                        <div className="flex items-start space-x-3">
                            <div className="w-9 h-9 rounded-full border border-gray-700 flex items-center justify-center text-gray-400 shrink-0">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
                            </div>
                            <div>
                                <div className="text-[12px] text-gray-500 mb-0.5">Email us</div>
                                <a href="mailto:support@zohoinvoice.com" className="text-[13px] text-gray-300 hover:text-white transition-colors">support@zohoinvoice.com</a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Free Tools Section */}
                <div className="mb-12">
                    <h3 className="text-[11px] font-bold text-white tracking-[0.15em] uppercase mb-1">Free Tools</h3>
                    <div className="w-8 h-[2px] bg-[#f0483e] mb-6"></div>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-x-16 gap-y-3">
                        {['Free Invoice Templates', 'Free Invoice Generator', 'Free Estimate Generator', 'Free Receipt Generator', 'Free Discount Calculator', 'Markup Calculator', 'Free timesheet templates'].map(item => (
                            <a key={item} href="#" className="text-[13px] text-gray-400 hover:text-white transition-colors">{item}</a>
                        ))}
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row justify-between items-center">
                    <div className="flex items-center space-x-4 mb-4 md:mb-0">
                        <span className="text-[11px] font-bold text-white tracking-[0.15em] uppercase">Select Edition:</span>
                        <div className="bg-[#222] border border-gray-700 rounded-md px-3 py-2 flex items-center space-x-2 cursor-pointer hover:border-gray-500 transition-colors min-w-[140px]">
                            <span className="text-lg">🇮🇳</span>
                            <span className="text-[13px] text-white flex-1">India</span>
                            <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
                        </div>
                    </div>
                    <div className="flex items-center space-x-4">
                        <span className="text-[11px] font-bold text-white tracking-[0.15em] uppercase">Find Us on Our Socials</span>
                        <div className="flex items-center space-x-3">
                            {/* X (Twitter) */}
                            <a href="#" className="w-8 h-8 rounded-full bg-[#222] border border-gray-700 flex items-center justify-center text-white hover:bg-gray-700 transition-colors">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                            </a>
                            {/* Instagram */}
                            <a href="#" className="w-8 h-8 rounded-full bg-[#222] border border-gray-700 flex items-center justify-center text-white hover:bg-gray-700 transition-colors">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>
                            </a>
                            {/* YouTube */}
                            <a href="#" className="w-8 h-8 rounded-full bg-[#222] border border-gray-700 flex items-center justify-center text-white hover:bg-gray-700 transition-colors">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
