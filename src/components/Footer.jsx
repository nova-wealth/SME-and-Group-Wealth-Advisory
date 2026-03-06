import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-[#050912] py-16 text-nova-gray-400 border-t border-nova-gray-800">
            <div className="container-custom">
                <div className="flex flex-col items-center text-center max-w-2xl mx-auto space-y-6">

                    {/* Location */}
                    <div>
                        <h4 className="text-white font-montserrat font-semibold text-lg mb-2 tracking-wide">Location</h4>
                        <p className="text-sm leading-relaxed">Office 47, Park Court Ojijo Road, Parklands, Nairobi, Kenya</p>
                    </div>

                    {/* Legal Links */}
                    <div className="flex items-center space-x-6 text-sm pt-4 border-t border-nova-gray-800 w-full justify-center">
                        <a href="#" className="hover:text-nova-gold transition-colors">Privacy Policy</a>
                        <span className="text-nova-gray-700">|</span>
                        <a href="#" className="hover:text-nova-gold transition-colors">Terms of Service</a>
                    </div>

                    {/* Copyright */}
                    <div className="text-xs text-nova-gray-600 pt-2">
                        &copy; 2026 Nova Wealth LLP. All rights reserved.
                    </div>

                </div>
            </div>
        </footer>
    );
};

export default Footer;
