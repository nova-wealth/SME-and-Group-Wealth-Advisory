import React from 'react';
import { Percent, ShieldAlert } from 'lucide-react';

const PerformanceFee = () => {
    return (
        <section className="section-padding bg-nova-navy text-white">
            <div className="container-custom">
                <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-10">

                    <div className="w-full md:w-1/2">
                        <h2 className="text-nova-gold font-sans font-bold tracking-widest text-sm uppercase mb-3">Alignment of Interests</h2>
                        <h3 className="text-3xl md:text-4xl text-white mb-6">Performance Fee Structure</h3>
                        <p className="text-nova-gray-300 text-lg mb-6 leading-relaxed">
                            We believe in being rewarded primarily for the absolute value we create. Our performance fee is only triggered when we exceed a pre-agreed hurdle rate, ensuring our goals are perfectly aligned with your group's growth.
                        </p>

                        <div className="flex items-start gap-4 mb-6">
                            <div className="mt-1 bg-white/10 p-2 rounded-full border border-nova-gold/30">
                                <Percent className="h-5 w-5 text-nova-gold" />
                            </div>
                            <div>
                                <h4 className="font-bold text-xl mb-1 text-white">20% Performance Fee</h4>
                                <p className="text-white/90 text-sm">Charged solely on the excess returns generated above the high-water mark and hurdle rate.</p>
                            </div>
                        </div>
                    </div>

                    <div className="w-full md:w-1/2">
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-nova-gold/10 rounded-bl-full -z-10"></div>

                            <h4 className="text-xl font-bold mb-6 flex items-center gap-2 text-white">
                                <ShieldAlert className="h-5 w-5 text-nova-gold" />
                                The High-Water Mark Principle
                            </h4>

                            <div className="space-y-4 text-sm text-white">
                                <p className="leading-relaxed">
                                    To protect our clients, we employ a strict <strong>High-Water Mark</strong> policy. This means if the portfolio value declines,
                                    we must first recover all losses before any future performance fees can be charged.
                                </p>
                                <div className="h-px w-full bg-white/10 my-4"></div>
                                <div className="grid grid-cols-2 gap-4 pt-2">
                                    <div>
                                        <span className="block text-nova-gray-500 mb-1 text-xs uppercase tracking-wider">Hurdle Rate</span>
                                        <span className="font-bold text-nova-gold text-lg">Treasury Bill + 2%</span>
                                    </div>
                                    <div>
                                        <span className="block text-nova-gray-500 mb-1 text-xs uppercase tracking-wider">Calculation</span>
                                        <span className="font-bold text-white text-lg">Annualized</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default PerformanceFee;
