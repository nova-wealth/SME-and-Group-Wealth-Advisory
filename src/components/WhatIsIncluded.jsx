import React from 'react';
import { Check, Minus } from 'lucide-react';

const WhatIsIncluded = () => {
    const features = [
        { name: 'Dedicated Wealth Manager', tier1: true, tier2: true },
        { name: 'Quarterly Portfolio Reviews', tier1: true, tier2: true },
        { name: 'Custom Investment Policy Statement', tier1: true, tier2: true },
        { name: 'Consolidated Reporting', tier1: true, tier2: true },
        { name: 'Institutional Pricing on Assets', tier1: true, tier2: true },
        { name: 'Tax Optimization Strategies', tier1: false, tier2: true },
        { name: 'Direct Access to Investment Committee', tier1: false, tier2: true },
        { name: 'Bespoke Private Equity Access', tier1: false, tier2: true },
        { name: 'Offshore Structuring', tier1: false, tier2: true },
    ];

    return (
        <section className="section-padding bg-white">
            <div className="container-custom">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-nova-gold font-sans font-bold tracking-widest text-sm uppercase mb-3">Service Tiers</h2>
                    <h3 className="text-3xl md:text-4xl text-nova-black mb-6">What Is Included</h3>
                    <p className="text-nova-gray-600 text-lg">
                        Comprehensive wealth management solutions scaled to the size and complexity of your group&apos;s assets.
                    </p>
                </div>

                <div className="max-w-5xl mx-auto glass-card overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr>
                                    <th className="px-6 py-6 bg-nova-navy text-white font-bold w-1/2 rounded-tl-xl border-r border-white/10">Service Feature</th>
                                    <th className="px-6 py-6 bg-nova-navy text-white text-center font-bold font-montserrat tracking-wide border-r border-white/10">
                                        <div className="text-nova-gold text-sm mb-1 uppercase tracking-widest">Standard</div>
                                        &lt; 100M KES
                                    </th>
                                    <th className="px-6 py-6 bg-nova-navy text-white text-center font-bold font-montserrat tracking-wide rounded-tr-xl">
                                        <div className="text-nova-gold text-sm mb-1 uppercase tracking-widest">Premium</div>
                                        &gt; 100M KES
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-nova-gray-200">
                                {features.map((feature, index) => (
                                    <tr key={index} className="hover:bg-nova-gray-50 transition-colors">
                                        <td className="px-6 py-4 text-nova-black font-medium">{feature.name}</td>
                                        <td className="px-6 py-4 text-center border-l border-nova-gray-200">
                                            {feature.tier1 ? (
                                                <Check className="h-6 w-6 text-green-600 mx-auto" strokeWidth={3} />
                                            ) : (
                                                <Minus className="h-5 w-5 text-nova-gray-300 mx-auto" />
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-center border-l border-nova-gray-200">
                                            {feature.tier2 ? (
                                                <Check className="h-6 w-6 text-green-600 mx-auto" strokeWidth={3} />
                                            ) : (
                                                <Minus className="h-5 w-5 text-nova-gray-300 mx-auto" />
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WhatIsIncluded;
