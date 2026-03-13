import React from 'react';
import PropTypes from 'prop-types';
import { Shield, Clock, Calendar, AlertCircle, ChevronLeft } from 'lucide-react';

const BookingPolicy = ({ onBack }) => {
    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <header className="bg-nova-navy py-12 px-6 text-center">
                <div className="max-w-4xl mx-auto">
                    <button
                        onClick={onBack}
                        className="flex items-center gap-2 text-nova-gold hover:text-white transition-colors mb-8"
                    >
                        <ChevronLeft className="w-5 h-5" />
                        Back to Home
                    </button>
                    <h1 className="text-4xl font-bold text-white mb-4">Booking &amp; Engagement Policy</h1>
                    <p className="text-nova-gray-300 max-w-2xl mx-auto">
                        Transparent, institutional-grade advisory standards for Chamas, SACCOs, and SMEs.
                    </p>
                </div>
            </header>

            {/* Content */}
            <main className="max-w-4xl mx-auto py-16 px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
                    <section className="space-y-4">
                        <div className="w-12 h-12 bg-nova-navy/5 rounded-xl flex items-center justify-center mb-6">
                            <Clock className="w-6 h-6 text-nova-navy" />
                        </div>
                        <h2 className="text-2xl font-bold text-nova-navy">1. Scheduling &amp; Punctuality</h2>
                        <p className="text-nova-gray-600 leading-relaxed">
                            Advisory sessions are scheduled for 60-minute blocks unless otherwise specified. We value your time and request that all participants join within 5 minutes of the start time to ensure full coverage of the agenda.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <div className="w-12 h-12 bg-nova-navy/5 rounded-xl flex items-center justify-center mb-6">
                            <Calendar className="w-6 h-6 text-nova-navy" />
                        </div>
                        <h2 className="text-2xl font-bold text-nova-navy">2. Rescheduling &amp; Cancellations</h2>
                        <p className="text-nova-gray-600 leading-relaxed">
                            We require at least **24 hours&apos; notice** for any rescheduling or cancellation. This allows us to reallocate the session to other clients awaiting advisory. Late cancellations may incur a 50% session fee.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <div className="w-12 h-12 bg-nova-navy/5 rounded-xl flex items-center justify-center mb-6">
                            <Shield className="w-6 h-6 text-nova-navy" />
                        </div>
                        <h2 className="text-2xl font-bold text-nova-navy">3. Confidentiality &amp; Governance</h2>
                        <p className="text-nova-gray-600 leading-relaxed">
                            Nova Wealth LLP maintains strict institutional confidentiality. All group discussions, financial records, and business strategies disclosed during sessions are protected under our non-disclosure agreement.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <div className="w-12 h-12 bg-nova-navy/5 rounded-xl flex items-center justify-center mb-6">
                            <AlertCircle className="w-6 h-6 text-nova-navy" />
                        </div>
                        <h2 className="text-2xl font-bold text-nova-navy">4. Preparation</h2>
                        <p className="text-nova-gray-600 leading-relaxed">
                            To maximize the value of the session, Chamas and SMEs are encouraged to share relevant financial reports or agendas at least 24 hours prior to the call.
                        </p>
                    </section>
                </div>

                <div className="bg-nova-gold/10 border-l-4 border-nova-gold p-8 rounded-r-2xl">
                    <h3 className="text-xl font-bold text-nova-navy mb-2">Expert Advisory Note</h3>
                    <p className="text-nova-navy/80 italic">
                        &quot;Effective wealth management begins with disciplined governance. Our booking policy ensures that both the advisor and the client remain committed to the strategic goals outlined in the Engagement Letter.&quot;
                    </p>
                </div>
            </main>

            {/* Branded Footer in Policy */}
            <div className="bg-nova-navy py-12 px-6 text-center text-white">
                <p className="font-bold text-xl tracking-tighter mb-2">
                    NOVA WEALTH <span className="text-nova-gold">LLP</span>
                </p>
                <p className="text-nova-gray-400 text-sm uppercase tracking-widest">Bridging Financial Gaps for Kenyan Groups</p>
            </div>
        </div>
    );
};

BookingPolicy.propTypes = {
    onBack: PropTypes.func.isRequired,
};

export default BookingPolicy;
