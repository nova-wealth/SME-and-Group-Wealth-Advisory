import React from 'react';
import { Check } from 'lucide-react';

const AdvisoryFees = () => {
    return (
        <section id="fees" className="section-padding bg-[#fafaf9]">
            <div className="container-custom">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-nova-gold font-sans font-bold tracking-widest text-sm mb-3">Transparent Pricing</h2>
                    <h3 className="text-3xl md:text-4xl text-nova-black mb-6">Advisory Fee Structure</h3>
                    <p className="text-nova-gray-600 text-lg mb-8">
                        Our fees are strictly tied to the value we manage and the performance we deliver, ensuring complete alignment with your financial objectives.
                    </p>
                </div>

                <div className="max-w-4xl mx-auto glass-card overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-nova-navy text-white text-sm uppercase tracking-wider">
                                    <th className="px-6 py-5 font-bold border-b border-nova-navy">Assets Under Management (AUM)</th>
                                    <th className="px-6 py-5 font-bold border-b border-nova-navy">Annual Management Fee</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-nova-gray-200">
                                <tr className="hover:bg-nova-gray-50 transition-colors">
                                    <td className="px-6 py-5 text-nova-black font-semibold">10M – 50M KES</td>
                                    <td className="px-6 py-5 text-nova-gray-700">1.50%</td>
                                </tr>
                                <tr className="hover:bg-nova-gray-50 transition-colors">
                                    <td className="px-6 py-5 text-nova-black font-semibold">50M – 100M KES</td>
                                    <td className="px-6 py-5 text-nova-gray-700">1.25%</td>
                                </tr>
                                <tr className="hover:bg-nova-gray-50 transition-colors">
                                    <td className="px-6 py-5 text-nova-black font-semibold">100M – 500M KES</td>
                                    <td className="px-6 py-5 text-nova-gray-700">1.00%</td>
                                </tr>
                                <tr className="hover:bg-nova-gray-50 transition-colors">
                                    <td className="px-6 py-5 text-nova-black font-semibold">500M+ KES</td>
                                    <td className="px-6 py-5 text-nova-gray-700">Negotiable</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="bg-nova-gray-50 p-6 border-t border-nova-gray-200">
                        <p className="text-sm text-nova-gray-500 italic flex flex-col md:flex-row gap-4 items-center justify-between">
                            <span>* Fees are calculated daily and billed quarterly in arrears.</span>
                            <button className="btn-outline border-nova-gold text-nova-navy hover:bg-nova-gold hover:text-nova-navy px-4 py-2 text-sm">
                                Download Full Rate Card PDF
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AdvisoryFees;
