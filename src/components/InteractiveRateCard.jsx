import React, { useState } from 'react';
import { ArrowLeft, Check, Copy, Download, Phone, Mail, Globe } from 'lucide-react';
import logoUrl from '../Images/Logo for Nova Wealth - Wordmark Style.svg';
import PrintableRateCard from './PrintableRateCard';

const InteractiveRateCard = ({ onBack, onContinue }) => {
    const [selectedServices, setSelectedServices] = useState([]);

    const services = [
        {
            category: "Onboarding Fees (One-time)",
            items: [
                {
                    id: 'onb-1',
                    title: "Chama Onboarding",
                    description: "Initial setup for Investment Groups including KYC and entity verification.",
                    price: "KES 10,000",
                    duration: "Once-off",
                },
                {
                    id: 'onb-2',
                    title: "SME / Entrepreneur Onboarding",
                    description: "Initial setup for businesses including risk profiling and onboarding docs.",
                    price: "KES 20,000",
                    duration: "Once-off",
                },
                {
                    id: 'onb-3',
                    title: "SACCO Onboarding",
                    description: "Initial setup for Credit Unions including SASRA alignment and verification.",
                    price: "KES 30,000",
                    duration: "Once-off",
                }
            ]
        },
        {
            category: "Annual Retainer Fees (Advisory)",
            items: [
                {
                    id: 'ret-1',
                    title: "Chama — Small (<20 members)",
                    description: "Annual retainer for small investment groups.",
                    price: "KES 100K - 200K",
                    duration: "Annually",
                },
                {
                    id: 'ret-2',
                    title: "Chama — Medium (21-50 members)",
                    description: "Annual retainer for medium-sized investment groups.",
                    price: "KES 200K - 350K",
                    duration: "Annually",
                },
                {
                    id: 'ret-3',
                    title: "SME — Small (Turnover 5M-50M)",
                    description: "Advisory for small enterprises and startups.",
                    price: "KES 170K - 350K",
                    duration: "Annually",
                },
                {
                    id: 'ret-4',
                    title: "SME — Medium (Turnover 50M-500M)",
                    description: "Advisory for established medium businesses.",
                    price: "KES 350K - 700K",
                    duration: "Annually",
                },
                {
                    id: 'ret-5',
                    title: "SACCO — Small (<500 members)",
                    description: "Retainer for smaller deposit/non-deposit SACCOs.",
                    price: "KES 280K - 520K",
                    duration: "Annually",
                },
                {
                    id: 'ret-6',
                    title: "SACCO — Medium (500-2,000 members)",
                    description: "Retainer for large-scale SACCOs.",
                    price: "KES 500K - 850K",
                    duration: "Annually",
                }
            ]
        },
        {
            category: "Specialist & Project Services",
            items: [
                {
                    id: 'spec-1',
                    title: "Investment Policy Statement (IPS)",
                    description: "Governance document with risk profiling and asset allocation framework.",
                    price: "KES 30K - 80K",
                    duration: "Project",
                },
                {
                    id: 'spec-2',
                    title: "Financial Wellness Workshop",
                    description: "Group education session for members or staff.",
                    price: "KES 15K - 50K",
                    duration: "Per Session",
                },
                {
                    id: 'spec-3',
                    title: "Business Valuation Advisory",
                    description: "For SMEs pre-sale, merger, or succession planning.",
                    price: "KES 80K - 250K",
                    duration: "Project",
                },
                {
                    id: 'spec-4',
                    title: "Occupational Pension Setup",
                    description: "Advisory for SMEs establishing umbrella or standalone pensions.",
                    price: "KES 40K - 100K",
                    duration: "Project",
                },
                {
                    id: 'spec-5',
                    title: "Governance Review",
                    description: "Constitution alignment and dividend/loan policy review.",
                    price: "KES 25K - 60K",
                    duration: "Project",
                },
                {
                    id: 'spec-6',
                    title: "Pick Our Brain from Nova Wealth Experts",
                    description: "High-impact advisory session for specific SME and Wealth challenges.",
                    price: "KES 20,000",
                    duration: "Per Session",
                }
            ]
        }
    ];

    const handleServiceToggle = (serviceId) => {
        setSelectedServices(prev =>
            prev.includes(serviceId)
                ? prev.filter(id => id !== serviceId)
                : [...prev, serviceId]
        );
    };

    const getSelectedServicesData = () => {
        return services.flatMap(c => c.items).filter(i => selectedServices.includes(i.id));
    };

    const calculateTotalStats = () => {
        const selectedData = getSelectedServicesData();

        let minTotal = 0;
        let maxTotal = 0;
        let isRange = false;

        selectedData.forEach(item => {
            // Extract numbers from "KES 30,000 - 60,000" or "KES 10,000"
            const prices = item.price.match(/\d+[,]?\d*/g);
            if (prices) {
                const nums = prices.map(p => parseInt(p.replace(/,/g, '')));
                if (nums.length > 1) {
                    minTotal += nums[0];
                    maxTotal += nums[1];
                    isRange = true;
                } else {
                    minTotal += nums[0];
                    maxTotal += nums[0];
                }
            }
        });

        const formatPrice = (num) => new Intl.NumberFormat('en-KE', { style: 'currency', currency: 'KES', maximumFractionDigits: 0 }).format(num);

        return {
            totalDisplay: isRange
                ? `${formatPrice(minTotal)} - ${formatPrice(maxTotal)}`
                : formatPrice(minTotal),
            count: selectedServices.length
        };
    };

    const totalStats = calculateTotalStats();

    const copyURL = () => {
        navigator.clipboard.writeText(window.location.href);
    };

    const handleDownloadPDF = () => {
        window.print();
    };
    return (
        <div className="flex flex-col md:flex-row min-h-screen bg-[#fafaf9] font-sans print:bg-white">
            {/* Sidebar / Branding (Left) - HIDDEN IN PRINT */}
            <div className="md:w-1/3 lg:w-1/4 bg-nova-navy text-white p-8 flex flex-col md:fixed md:h-screen z-10 overflow-y-auto print:hidden">
                <div className="mb-10 flex-grow mt-8">
                    <div className="mb-8">
                        <img src={logoUrl} alt="Nova Wealth" className="w-[180px] h-auto object-contain" />
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
                                        const isSelected = selectedServices.includes(item.id);

                                        return (
                                            <div
                                                key={item.id}
                                                onClick={() => handleServiceToggle(item.id)}
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
                    {selectedServices.length > 0 && (
                        <div className="fixed bottom-0 left-0 md:left-1/3 lg:left-1/4 right-0 p-4 bg-white border-t border-nova-gray-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-20 flex justify-between items-center animate-in slide-in-from-bottom-5">
                            <div className="px-4">
                                <p className="text-sm text-nova-gray-500">{totalStats.count} {totalStats.count === 1 ? 'service' : 'services'} selected</p>
                                <p className="font-bold text-nova-navy text-sm sm:text-base">
                                    Total Estimated: <span className="text-nova-gold">{totalStats.totalDisplay}</span>
                                </p>
                            </div>
                            <button
                                onClick={() => onContinue(selectedServices)}
                                className="bg-nova-navy text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-black transition-all shadow-lg active:scale-95 whitespace-nowrap"
                            >
                                <span>Continue to Booking</span>
                                <span>→</span>
                            </button>
                        </div>
                    )}
                    {/* Bottom padding so content isn't hidden behind the fixed footer */}
                    {selectedServices.length > 0 && <div className="h-24"></div>}
                </div>
            </div>

            {/* FULL DETAILED PDF VERSION - ONLY VISIBLE IN PRINT */}
            <PrintableRateCard />
        </div >
    );
};

export default InteractiveRateCard;
