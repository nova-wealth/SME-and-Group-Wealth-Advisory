import React from 'react';
import { Users, Building2, Briefcase } from 'lucide-react';

const WhoWeServe = () => {
    const segments = [
        {
            title: "Chamas & Investment Groups",
            icon: <Users className="h-10 w-10 text-nova-gold" />,
            description: "Transform your informal contributions into structured, high-yielding portfolios. We provide governance frameworks, dispute resolution guidelines, and diversified asset allocation beyond traditional real estate.",
            benefits: ["Formalized Investment Policies", "Transparent Member Reporting", "Diversified Asset Access"]
        },
        {
            title: "SACCOs & Cooperatives",
            icon: <Building2 className="h-10 w-10 text-nova-gold" />,
            description: "Enhance your treasury management and strategic investments. We act as your external investment committee, ensuring regulatory compliance while maximizing returns on surplus liquidity.",
            benefits: ["Treasury Optimization", "Regulatory Compliance (SASRA)", "Risk-adjusted Yield Enhancement"]
        },
        {
            title: "SMEs & Business Owners",
            icon: <Briefcase className="h-10 w-10 text-nova-gold" />,
            description: "Separate your personal wealth from business risk. We structure holding companies, manage corporate cash reserves, and plan for succession and eventual business exit.",
            benefits: ["Corporate Treasury Management", "Business Succession Planning", "Personal Wealth Ring-fencing"]
        }
    ];

    return (
        <section id="who-we-serve" className="section-padding bg-white border-t border-nova-gray-100">
            <div className="container-custom">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-nova-gold font-sans font-bold tracking-widest text-sm mb-3">Who We Serve</h2>
                    <h3 className="text-3xl md:text-4xl text-nova-black mb-6">Tailored Strategies for Unique Structures</h3>
                    <p className="text-nova-gray-600 text-lg">
                        Whether you are pooling resources with peers or managing corporate liquidity, our advisory services are specifically calibrated to your operational and regulatory environment.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {segments.map((segment, index) => (
                        <div key={index} className="bg-nova-navy text-white rounded-2xl p-8 shadow-xl hover:-translate-y-2 transition-transform duration-300">
                            <div className="mb-6 h-16 w-16 bg-white/10 rounded-xl border border-white/20 flex items-center justify-center">
                                {segment.icon}
                            </div>
                            <h4 className="text-2xl font-bold text-white mb-4">{segment.title}</h4>
                            <p className="text-nova-gray-300 mb-8 h-32 text-sm leading-relaxed">
                                {segment.description}
                            </p>

                            <div className="pt-6 border-t border-white/10">
                                <ul className="space-y-3">
                                    {segment.benefits.map((benefit, i) => (
                                        <li key={i} className="flex items-start">
                                            <div className="mt-1.5 min-w-1.5 h-1.5 rounded-full bg-nova-gold mr-3"></div>
                                            <span className="text-nova-gray-100 text-sm">{benefit}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhoWeServe;
