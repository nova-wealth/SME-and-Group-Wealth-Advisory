import React from 'react';
import { Target, BarChart3, Presentation, Lock } from 'lucide-react';

const OurApproach = () => {
    const steps = [
        {
            title: "Discovery & Analysis",
            description: "We begin by understanding your group's collective goals, risk tolerance, liquidity needs, and current governance structure.",
            icon: <Target className="h-8 w-8 text-nova-gold" />
        },
        {
            title: "Strategic Structuring",
            description: "Developing a robust investment policy statement (IPS) and formalizing group structures for tax efficiency and legal protection.",
            icon: <Presentation className="h-8 w-8 text-nova-gold" />
        },
        {
            title: "Portfolio Construction",
            description: "Deploying capital across multi-asset classes, leveraging institutional access normally reserved for ultra-high-net-worth clients.",
            icon: <BarChart3 className="h-8 w-8 text-nova-gold" />
        },
        {
            title: "Governance & Reporting",
            description: "Continuous oversight with transparent quarterly reporting, committee meetings, and strict risk management protocols.",
            icon: <Lock className="h-8 w-8 text-nova-gold" />
        }
    ];

    return (
        <section id="approach" className="section-padding bg-[#fafaf9]">
            <div className="container-custom">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-nova-gold font-sans font-bold tracking-widest text-sm mb-3">Our Approach</h2>
                    <h3 className="text-3xl md:text-4xl text-nova-black mb-6">A Disciplined Framework for Collective Growth</h3>
                    <p className="text-nova-gray-600 text-lg">
                        We apply the same rigorous investment methodologies used by large pension funds and institutional investors, tailored specifically to the unique dynamics of groups and SMEs.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {steps.map((step, index) => (
                        <div key={index} className="glass-card p-8 relative flex flex-col h-full group">
                            <div className="absolute -top-4 -left-4 font-montserrat font-bold text-8xl text-nova-gray-100 opacity-50 z-0 pointer-events-none transition-all group-hover:text-nova-gold/10">
                                0{index + 1}
                            </div>
                            <div className="relative z-10 flex-grow">
                                <div className="h-16 w-16 bg-white border border-nova-gray-200 rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:border-nova-gold transition-colors">
                                    {step.icon}
                                </div>
                                <h4 className="text-xl mb-4 group-hover:text-nova-gold transition-colors">{step.title}</h4>
                                <p className="text-nova-gray-600 text-sm leading-relaxed">
                                    {step.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default OurApproach;
