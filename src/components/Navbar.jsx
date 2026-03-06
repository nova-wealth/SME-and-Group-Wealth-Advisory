import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import logoUrl from '../Images/Logo for Nova Wealth - Wordmark Style.svg';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const whoWeServeSection = document.getElementById('who-we-serve');
            if (whoWeServeSection) {
                const rect = whoWeServeSection.getBoundingClientRect();
                // Trigger solid background when Tailored Strategies reaches near top of viewport (offset by 100px)
                if (rect.top <= 100) {
                    setIsScrolled(true);
                } else {
                    setIsScrolled(false);
                }
            } else {
                // Fallback if section isn't found
                if (window.scrollY > 10) {
                    setIsScrolled(true);
                } else {
                    setIsScrolled(false);
                }
            }
        };
        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Check initial position
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Our Approach', href: '#approach' },
        { name: 'Who We Serve', href: '#who-we-serve' },
        { name: 'Advisory Fees', href: '#fees' },
        { name: 'Specialist Services', href: '#services' },
    ];

    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-nova-navy shadow-lg py-3' : 'bg-transparent py-5'}`}>
            <div className="max-w-[1400px] w-full mx-auto px-8 lg:px-12">
                <div className="flex items-center justify-between">

                    {/* Logo & Main Nav Container */}
                    <div className="flex items-center gap-12 lg:gap-16">
                        {/* Logo */}
                        <div className="flex-shrink-0">
                            <a href="#" className="flex items-center gap-2 group">
                                <img src={logoUrl} alt="Nova Wealth" className="w-[180px] h-auto object-contain" />
                            </a>
                        </div>

                        {/* Desktop Navigation Links */}
                        <div className="hidden lg:flex items-center space-x-8">
                            {navLinks.map((link) => (
                                <a key={link.name} href={link.href} className="text-white hover:text-nova-gold font-sans font-medium text-[13px] transition-colors duration-200 tracking-wide">
                                    {link.name}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Desktop CTAs */}
                    <div className="hidden lg:flex items-center space-x-8">
                        <a href="#fees" className="text-nova-gold hover:text-white text-[11px] font-bold uppercase tracking-[0.15em] transition-colors duration-200">
                            Download PDF
                        </a>
                        <a href="#contact" className="bg-[#c5a046] text-[#0A101D] hover:bg-[#ebd582] px-6 py-2.5 rounded border border-[#c5a046] text-[13px] font-bold transition-all duration-300">
                            Book Discovery Call
                        </a>
                    </div>

                    {/* Mobile menu button */}
                    <div className="lg:hidden flex items-center">
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="text-white hover:text-nova-gold focus:outline-none"
                        >
                            {isMobileMenuOpen ? (
                                <X className="h-8 w-8" />
                            ) : (
                                <Menu className="h-8 w-8" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div className="lg:hidden absolute top-full left-0 w-full bg-nova-navy border-t border-nova-gray-800 shadow-2xl py-4 flex flex-col px-6 space-y-4 pb-8">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            className="text-white hover:text-nova-gold text-lg font-medium py-3 border-b border-white/5"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            {link.name}
                        </a>
                    ))}
                    <div className="pt-4 flex flex-col space-y-4">
                        <a href="#fees" className="text-center text-nova-gold py-3 font-bold uppercase tracking-wider">
                            Download PDF
                        </a>
                        <a href="#contact" className="text-center bg-nova-gold text-nova-navy py-3 rounded font-bold">
                            Book Discovery Call
                        </a>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
