import React from 'react';
import {
    Phone,
    Mail,
    Globe,
    Calendar,
    Twitter,
    Instagram,
    Facebook,
    Youtube,
    Linkedin,
    CheckCircle2
} from 'lucide-react';

const Footer = ({ onNavigate, currentView }) => {
    const isRateCard = currentView === 'rate-card';

    return (
        <footer className={`bg-white border-t border-nova-gray-100 pt-16 pb-12 px-6 transition-all duration-300 ${isRateCard ? 'md:pl-[33.333%] lg:pl-[25%]' : ''}`}>
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
                    {/* Good to know & Contact Us */}
                    <div className="space-y-8">
                        <h4 className="text-xl font-bold text-nova-navy">Good to know</h4>
                        <div className="space-y-4">
                            <button
                                onClick={() => onNavigate('booking-policy')}
                                className="flex items-center gap-3 text-nova-gray-600 hover:text-nova-gold transition-colors"
                            >
                                <Calendar className="w-5 h-5 font-bold" />
                                <span className="underline underline-offset-4 decoration-1 font-bold">Booking policy</span>
                            </button>
                            <button
                                onClick={() => onNavigate('rate-card')}
                                className="flex items-center gap-3 text-nova-gray-600 hover:text-nova-gold transition-colors"
                            >
                                <CheckCircle2 className="w-5 h-5 font-bold" />
                                <span className="underline underline-offset-4 decoration-1 font-bold">Select a Service</span>
                            </button>
                        </div>

                        <div className="pt-4 space-y-4">
                            <h5 className="font-bold text-nova-navy uppercase tracking-wider text-xs">Contact us</h5>
                            <div className="space-y-4">
                                <a href="tel:+254737648915" className="flex items-center gap-3 text-nova-gray-600 hover:text-nova-gold transition-colors">
                                    <Phone className="w-5 h-5" />
                                    <span className="underline underline-offset-4 decoration-1 font-medium">Call us at: +254 737648915</span>
                                </a>
                                <a href="mailto:info@novawealth.co.ke" className="flex items-center gap-3 text-nova-gray-600 hover:text-nova-gold transition-colors">
                                    <Mail className="w-5 h-5" />
                                    <span className="underline underline-offset-4 decoration-1 font-medium">info@novawealth.co.ke</span>
                                </a>
                                <a href="https://www.novawealth.co.ke" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-nova-gray-600 hover:text-nova-gold transition-colors">
                                    <Globe className="w-5 h-5" />
                                    <span className="underline underline-offset-4 decoration-1 font-medium">www.novawealth.co.ke</span>
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Right Branding */}
                    <div className="flex flex-col justify-start md:text-right">
                        <div className="mb-8">
                            <p className="text-nova-navy font-bold text-2xl tracking-tighter">
                                NOVA WEALTH <span className="text-nova-gold">LLP</span>
                            </p>
                            <p className="text-nova-gray-400 text-sm mt-1 mb-4 uppercase tracking-[0.2em]">Group & Business Wealth</p>
                            <button
                                onClick={() => onNavigate('booking')}
                                className="bg-nova-navy text-white px-6 py-2 rounded-lg font-bold text-sm hover:bg-black transition-all shadow-md active:scale-95"
                            >
                                Book now
                            </button>
                        </div>

                        <div className="space-y-4">
                            <h4 className="text-xl font-bold text-nova-navy">Social media</h4>
                            <div className="flex gap-6 md:justify-end">
                                <a href="#" className="text-nova-gray-400 hover:text-nova-navy transition-colors">
                                    <Twitter className="w-6 h-6" />
                                </a>
                                <a href="#" className="text-nova-gray-400 hover:text-nova-navy transition-colors">
                                    <Instagram className="w-6 h-6" />
                                </a>
                                <a href="#" className="text-nova-gray-400 hover:text-nova-navy transition-colors">
                                    <Facebook className="w-6 h-6" />
                                </a>
                                <a href="#" className="text-nova-gray-400 hover:text-nova-navy transition-colors">
                                    <Youtube className="w-6 h-6" />
                                </a>
                                <a href="#" className="text-nova-gray-400 hover:text-nova-navy transition-colors">
                                    <Linkedin className="w-6 h-6" />
                                </a>
                                <a href="#" className="text-nova-gray-400 hover:text-nova-navy transition-colors">
                                    <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.04-.1z" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Footer */}
                <div className="pt-8 border-t border-nova-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="text-nova-gray-400 text-sm">
                        © 2026 Nova Wealth LLP. All rights reserved.
                    </div>
                    <div className="text-nova-gray-300 text-xs uppercase tracking-tighter">
                        Simplified Wealth Advisory
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
