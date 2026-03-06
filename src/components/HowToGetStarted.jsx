import React from 'react';
import { PhoneCall, FileText, PlayCircle } from 'lucide-react';

const HowToGetStarted = () => {
    return (
        <section className="section-padding bg-white">
            <div className="container-custom">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-nova-gold font-sans font-bold tracking-widest text-sm uppercase mb-3">Partnership Journey</h2>
                    <h3 className="text-3xl md:text-4xl text-nova-black mb-6">How To Get Started</h3>
                </div>

                <div className="relative max-w-4xl mx-auto">
                    {/* Connecting Line */}
                    <div className="hidden md:block absolute top-12 left-[10%] right-[10%] h-0.5 bg-nova-gray-200 z-0"></div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        {/* Step 1 */}
                        <div className="relative z-10 flex flex-col items-center text-center">
                            <div className="h-24 w-24 rounded-full bg-white border-4 border-nova-gray-50 shadow-md flex items-center justify-center mb-6 transition-transform hover:scale-105 hover:border-nova-gold">
                                <PhoneCall className="h-8 w-8 text-nova-navy" />
                            </div>
                            <div className="bg-nova-navy text-white text-xs font-bold px-3 py-1 rounded-full mb-4 uppercase tracking-wider">Step 1</div>
                            <h4 className="text-xl font-bold mb-3">Discovery Call</h4>
                            <p className="text-nova-gray-600 text-sm">
                                A brief introductory meeting with your committee leaders to align on high-level objectives and group dynamics.
                            </p>
                        </div>

                        {/* Step 2 */}
                        <div className="relative z-10 flex flex-col items-center text-center">
                            <div className="h-24 w-24 rounded-full bg-white border-4 border-nova-gray-50 shadow-md flex items-center justify-center mb-6 transition-transform hover:scale-105 hover:border-nova-gold">
                                <FileText className="h-8 w-8 text-nova-navy" />
                            </div>
                            <div className="bg-nova-navy text-white text-xs font-bold px-3 py-1 rounded-full mb-4 uppercase tracking-wider">Step 2</div>
                            <h4 className="text-xl font-bold mb-3">Review & Proposal</h4>
                            <p className="text-nova-gray-600 text-sm">
                                We analyze your existing structures and present a customized advisory proposal and preliminary investment framework.
                            </p>
                        </div>

                        {/* Step 3 */}
                        <div className="relative z-10 flex flex-col items-center text-center">
                            <div className="h-24 w-24 rounded-full bg-white border-4 border-nova-gray-50 shadow-md flex items-center justify-center mb-6 transition-transform hover:scale-105 hover:border-nova-gold">
                                <PlayCircle className="h-8 w-8 text-nova-navy" />
                            </div>
                            <div className="bg-nova-gold text-nova-navy text-xs font-bold px-3 py-1 rounded-full mb-4 uppercase tracking-wider">Step 3</div>
                            <h4 className="text-xl font-bold mb-3">Onboarding & Execution</h4>
                            <p className="text-nova-gray-600 text-sm">
                                Formalizing the engagement, drafting the Investment Policy Statement, and initiating active portfolio management.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HowToGetStarted;
