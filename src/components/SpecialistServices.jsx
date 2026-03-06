import React from 'react';
import { Landmark, Scale, FileSignature, Coins, ArrowRight } from 'lucide-react';

const SpecialistServices = () => {
    const services = [
        {
            title: "Corporate Treasury",
            description: "Yield optimization for corporate cash reserves and working capital management.",
            icon: <Landmark className="h-6 w-6 text-nova-gold" />
        },
        {
            title: "Group Governance",
            description: "Drafting group constitutions, dispute resolution protocols, and management frameworks.",
            icon: <Scale className="h-6 w-6 text-nova-gold" />
        },
        {
            title: "Succession Planning",
            description: "Structuring trusts and legal entities to ensure smooth wealth transfer for SME owners.",
            icon: <FileSignature className="h-6 w-6 text-nova-gold" />
        },
        {
            title: "Capital Raising",
            description: "Advising on debt restructuring and capital acquisition for operational expansion.",
            icon: <Coins className="h-6 w-6 text-nova-gold" />
        }
    ];

    return (
        <section id="services" className="section-padding bg-[#fafaf9]">
            <div className="container-custom">
                <div className="flex flex-col lg:flex-row justify-between items-end mb-12 gap-6">
                    <div className="max-w-2xl">
                        <h2 className="text-nova-gold font-sans font-bold tracking-widest text-sm mb-3">Beyond Standard Advisory</h2>
                        <h3 className="text-3xl md:text-4xl text-nova-black">Specialist Services</h3>
                        <p className="text-nova-gray-600 text-lg mt-4">
                            Comprehensive financial solutions for complex group scenarios.
                        </p>
                    </div>
                    <a href="#contact" className="hidden lg:inline-flex items-center text-nova-navy font-bold hover:text-nova-gold transition-colors">
                        Request Custom Service <ArrowRight className="ml-2 h-5 w-5" />
                    </a>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {services.map((service, index) => (
                        <div key={index} className="bg-white border text-left border-nova-gray-200 rounded-xl p-8 hover:border-nova-gold hover:shadow-lg transition-all duration-300 group cursor-pointer">
                            <div className="h-12 w-12 rounded-lg bg-nova-gray-50 border border-nova-gray-100 flex items-center justify-center mb-6 group-hover:bg-nova-navy transition-colors">
                                {service.icon}
                            </div>
                            <h4 className="text-xl font-bold mb-3">{service.title}</h4>
                            <p className="text-nova-gray-600 text-sm leading-relaxed mb-6">
                                {service.description}
                            </p>
                            <div className="flex items-center text-nova-gold font-semibold text-sm group-hover:translate-x-2 transition-transform">
                                Learn more <ArrowRight className="ml-1 h-4 w-4" />
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-8 text-center lg:hidden">
                    <a href="#contact" className="inline-flex items-center text-nova-navy font-bold hover:text-nova-gold transition-colors">
                        Request Custom Service <ArrowRight className="ml-2 h-5 w-5" />
                    </a>
                </div>
            </div>
        </section>
    );
};

export default SpecialistServices;
