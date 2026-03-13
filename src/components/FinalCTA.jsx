import React from 'react';
import { ArrowRight, Calendar } from 'lucide-react';

const FinalCTA = () => {
    return (
        <section className="py-24 relative overflow-hidden bg-nova-navy">
            {/* Decorative Background Elements */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 right-0 w-96 h-96 bg-nova-gold rounded-full blur-[100px] transform translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-nova-gold rounded-full blur-[80px] transform -translate-x-1/2 translate-y-1/2"></div>
            </div>

            <div className="container-custom relative z-10">
                <div className="max-w-4xl mx-auto text-center border border-white/10 rounded-3xl p-8 md:p-16 backdrop-blur-md bg-black/20 shadow-2xl">
                    <h2 className="text-3xl md:text-5xl text-white mb-6 leading-tight">
                        Ready to Structure Your Group&apos;s Financial Future?
                    </h2>
                    <p className="text-nova-gray-300 text-lg mb-10 max-w-2xl mx-auto">
                        Schedule a no-obligation discovery call with our institutional wealth specialists to discuss your group&apos;s unique needs and investment objectives.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
                        <a href="#contact" className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-bold rounded-md text-nova-navy bg-nova-gold hover:bg-white hover:text-nova-navy transition-all duration-300 shadow-[0_0_20px_rgba(212,175,55,0.4)] group">
                            <Calendar className="mr-2 h-5 w-5" />
                            Book Discovery Call
                        </a>
                        <a href="#fees" className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 border-2 border-nova-gold text-lg font-semibold rounded-md text-nova-gold bg-transparent hover:bg-nova-gold hover:text-nova-navy transition-all duration-300 group">
                            Download Rate Card
                            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FinalCTA;
