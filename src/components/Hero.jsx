import React from 'react';
import PropTypes from 'prop-types';
import { TrendingUp, ShieldCheck, Users } from 'lucide-react';
import videoBg from '../videos/Business_Growth.mp4';

const Hero = ({ onGetStarted }) => {
    return (
        <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-nova-navy">
            {/* Background Video */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover"
                >
                    <source src={videoBg} type="video/mp4" />
                </video>
                {/* Dark overlay for readability */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-[#050912]/90 backdrop-blur-[1px]"></div>
                {/* Subtle geometric pattern overlay */}
                <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjEiIGZpbGw9IiNENEFGMzciLz48L3N2Zz4=')]"></div>
            </div>

            <div className="container-custom relative z-10">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-nova-gold/20 bg-[#0A101D]/40 backdrop-blur-sm text-nova-gold text-[0.65rem] font-medium tracking-[0.2em] uppercase mb-8 animate-fade-in shadow-xl">
                        SME &amp; Group Advisory
                    </div>

                    <h1 className="text-4xl md:text-5xl lg:text-6xl text-white leading-[1.15] mb-6 font-montserrat font-bold tracking-tight">
                        Structured Wealth Advisory for <br />
                        <span className="text-nova-gold italic font-playfair pr-2">Groups</span> and Growing <span className="text-nova-gold italic font-playfair pr-2">Businesses</span>
                    </h1>

                    <p className="text-lg text-white md:text-xl font-sans font-medium mb-12 max-w-3xl mx-auto leading-relaxed drop-shadow-md">
                        Expert financial structuring, rigorous governance, and dedicated portfolio management for entrepreneurs, Chamas, SACCOs, and SMEs in Kenya.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20 md:mb-28">
                        <button
                            onClick={onGetStarted}
                            className="w-full sm:w-auto bg-[#c5a046] hover:bg-nova-gold text-nova-navy px-8 py-3.5 rounded text-sm font-semibold transition-all duration-300"
                        >
                            View Rates &amp; Get Started
                        </button>
                        <a href="#approach" className="w-full sm:w-auto border border-white/20 text-white hover:bg-white hover:text-nova-navy px-8 py-3.5 rounded text-sm font-semibold transition-all duration-300 backdrop-blur-sm bg-black/10">
                            Explore Our Approach
                        </a>
                    </div>

                    {/* Quick Stats/Trust indicators */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-10 border-t border-white/10">
                        <div className="flex flex-col items-center">
                            <div className="h-12 w-12 rounded-full bg-nova-navy border border-nova-gold/40 flex items-center justify-center mb-4 text-nova-gold">
                                <TrendingUp className="h-6 w-6" />
                            </div>
                            <h3 className="text-white text-lg font-semibold">Institutional Grade</h3>
                            <p className="text-nova-gray-400 text-sm mt-2">Professional portfolio construction</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="h-12 w-12 rounded-full bg-nova-navy border border-nova-gold/40 flex items-center justify-center mb-4 text-nova-gold">
                                <ShieldCheck className="h-6 w-6" />
                            </div>
                            <h3 className="text-white text-lg font-semibold">Robust Governance</h3>
                            <p className="text-nova-gray-400 text-sm mt-2">Transparent reporting and compliance</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="h-12 w-12 rounded-full bg-nova-navy border border-nova-gold/40 flex items-center justify-center mb-4 text-nova-gold">
                                <Users className="h-6 w-6" />
                            </div>
                            <h3 className="text-white text-lg font-semibold">Tailored for Groups</h3>
                            <p className="text-nova-gray-400 text-sm mt-2">Chamas, SACCOs &amp; SME structures</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

Hero.propTypes = {
    onGetStarted: PropTypes.func.isRequired,
};

export default Hero;
