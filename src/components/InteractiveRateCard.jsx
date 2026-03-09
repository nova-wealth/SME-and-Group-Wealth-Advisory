import React, { useState } from 'react';
import { ArrowLeft, Check, Copy, Download } from 'lucide-react';
import logoUrl from '../Images/Logo for Nova Wealth - Wordmark Style.svg';
import PrintableRateCard from './PrintableRateCard';

const InteractiveRateCard = ({ onBack }) => {
    const [selectedService, setSelectedService] = useState(null);

    const services = [
        {
            category: "Advisory Fees",
            items: [
                {
                    id: 'adv-1',
                    title: "10M – 50M KES",
                    description: "Annual Management Fee",
                    price: "1.50%",
                    duration: "Annually",
                },
                {
                    id: 'adv-2',
                    title: "50M – 100M KES",
                    description: "Annual Management Fee",
                    price: "1.25%",
                    duration: "Annually",
                },
                {
                    id: 'adv-3',
                    title: "100M – 500M KES",
                    description: "Annual Management Fee",
                    price: "1.00%",
                    duration: "Annually",
                },
                {
                    id: 'adv-4',
                    title: "500M+ KES",
                    description: "Annual Management Fee",
                    price: "Negotiable",
                    duration: "Annually",
                }
            ]
        },
        {
            category: "Performance Fees",
            items: [
                {
                    id: 'perf-1',
                    title: "Performance Fee Profile",
                    description: "Charged solely on excess returns generated above the high-water mark and hurdle rate (Treasury Bill + 2%).",
                    price: "20%",
                    duration: "Annualized",
                }
            ]
        },
        {
            category: "Specialist Services",
            items: [
                {
                    id: 'spec-1',
                    title: "Corporate Treasury",
                    description: "Yield optimization for corporate cash reserves and working capital management.",
                    price: "Custom Quote",
                    duration: "Per Engagement",
                },
                {
                    id: 'spec-2',
                    title: "Group Governance",
                    description: "Drafting group constitutions, dispute resolution protocols, and management frameworks.",
                    price: "Custom Quote",
                    duration: "Per Engagement",
                },
                {
                    id: 'spec-3',
                    title: "Succession Planning",
                    description: "Structuring trusts and legal entities to ensure smooth wealth transfer for SME owners.",
                    price: "Custom Quote",
                    duration: "Per Engagement",
                },
                {
                    id: 'spec-4',
                    title: "Capital Raising",
                    description: "Advising on debt restructuring and capital acquisition for operational expansion.",
                    price: "Custom Quote",
                    duration: "Per Engagement",
                }
            ]
        }
    ];

    const copyURL = () => {
        navigator.clipboard.writeText(window.location.href);
    };

    const handleDownloadPDF = () => {
        window.print();
    };
    return (
        <div className="flex flex-col md:flex-row min-h-screen bg-[#fafaf9] font-sans print:bg-white">
            {/* Sidebar / Branding (Left) - HIDDEN IN PRINT */}
            <div className="md:w-1/3 lg:w-1/4 bg-nova-navy text-white p-8 flex flex-col md:fixed md:h-screen z-10 print:hidden">
                <div className="mb-10 flex-grow mt-8">
                    <div className="mb-8">
                        <img src={logoUrl} alt="Nova Wealth" className="w-[200px] h-auto object-contain" />
                    </div>

                    <h2 className="text-2xl font-semibold mb-4 text-white">SME & Group Wealth Advisory</h2>
                    <p className="text-nova-gray-400 text-sm leading-relaxed mb-6">
                        Access world-class financial structuring, investment management, and corporate advisory services designed specifically for East African businesses and investment groups.
                    </p>

                    <button
                        onClick={handleDownloadPDF}
                        className="flex items-center gap-2 px-4 py-2 bg-nova-gold/10 border border-nova-gold/30 rounded text-nova-gold hover:bg-nova-gold hover:text-nova-navy transition-all duration-300 text-sm font-bold uppercase tracking-wider"
                    >
                        <Download className="h-4 w-4" /> Download Rate Card
                    </button>
                </div>

                <div className="space-y-4 text-sm text-nova-gray-400 border-t border-white/10 pt-6">
                    <p>Nairobi, Kenya</p>
                    <p>
                        <a href="mailto:info@novawealth.co.ke" className="hover:text-nova-gold transition-colors">info@novawealth.co.ke</a>
                    </p>
                    <p>
                        <a href="tel:+254000000000" className="hover:text-nova-gold transition-colors">+254 (0) 000 000 000</a>
                    </p>
                    <div className="pt-4 flex items-center justify-between">
                        <button
                            onClick={copyURL}
                            className="flex items-center hover:text-white transition-colors text-xs uppercase tracking-widest font-semibold"
                        >
                            <Copy className="h-4 w-4 mr-2" /> Copy link
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Content (Right) - HIDDEN IN PRINT */}
            <div className="md:w-2/3 lg:w-3/4 md:ml-auto p-6 md:p-12 lg:p-16 print:hidden">
                <div className="max-w-3xl mx-auto">
                    <h3 className="text-3xl lg:text-4xl text-nova-black mb-2">Select a Service</h3>
                    <p className="text-nova-gray-500 mb-10">Choose from our advisory tiers or specialist services below.</p>

                    <div className="space-y-12">
                        {services.map((categoryGroup, index) => (
                            <div key={index}>
                                <h4 className="text-xl font-bold text-nova-navy mb-6 border-b border-nova-gray-200 pb-2">
                                    {categoryGroup.category}
                                </h4>

                                <div className="space-y-4">
                                    {categoryGroup.items.map((item) => {
                                        const isSelected = selectedService === item.id;

                                        return (
                                            <div
                                                key={item.id}
                                                onClick={() => setSelectedService(item.id)}
                                                className={`
                                                    bg-white border rounded-xl p-6 cursor-pointer transition-all duration-300
                                                    hover:shadow-md hover:border-nova-gold/50
                                                    ${isSelected ? 'border-nova-gold shadow-md ring-1 ring-nova-gold/20' : 'border-nova-gray-200 shadow-sm'}
                                                `}
                                            >
                                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                                    <div className="flex-1">
                                                        <h5 className="font-bold text-lg text-nova-black mb-1">{item.title}</h5>
                                                        <p className="text-nova-gray-600 text-sm leading-relaxed">{item.description}</p>
                                                    </div>

                                                    <div className="flex items-end sm:items-center gap-6 sm:gap-4 shrink-0">
                                                        <div className="text-left sm:text-right">
                                                            <span className="block font-bold text-lg text-nova-navy">{item.price}</span>
                                                            <span className="text-xs text-nova-gray-400 uppercase tracking-wide">{item.duration}</span>
                                                        </div>

                                                        <button
                                                            className={`
                                                                w-10 h-10 rounded-full flex items-center justify-center transition-colors
                                                                ${isSelected ? 'bg-nova-gold text-nova-navy' : 'bg-nova-gray-100 text-nova-gray-500 hover:bg-nova-gray-200'}
                                                            `}
                                                            aria-label={`Select ${item.title}`}
                                                        >
                                                            {isSelected ? <Check className="h-5 w-5" /> : <span className="text-sm font-semibold">+</span>}
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Next Steps / Summary Header */}
                    {selectedService && (
                        <div className="fixed bottom-0 left-0 md:left-1/3 lg:left-1/4 right-0 p-4 bg-white border-t border-nova-gray-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-20 flex justify-between items-center animate-in slide-in-from-bottom-5">
                            <div className="px-4">
                                <p className="text-sm text-nova-gray-500">Service selected</p>
                                <p className="font-bold text-nova-navy truncate max-w-[200px] sm:max-w-xs text-sm sm:text-base">
                                    {services.flatMap(c => c.items).find(i => i.id === selectedService)?.title}
                                </p>
                            </div>
                            <button className="btn-primary space-x-2 text-sm px-6 py-3 whitespace-nowrap">
                                <span>Continue</span>
                                <span>→</span>
                            </button>
                        </div>
                    )}
                    {/* Bottom padding so content isn't hidden behind the fixed footer */}
                    {selectedService && <div className="h-24"></div>}
                </div>
            </div>

            {/* FULL DETAILED PDF VERSION - ONLY VISIBLE IN PRINT */}
            <PrintableRateCard />
        </div>
    );
};

export default InteractiveRateCard;
