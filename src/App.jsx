import React, { useState, useEffect } from 'react';
import InteractiveRateCard from './components/InteractiveRateCard';
import BookingManager from './components/BookingManager';
import BookingPolicy from './components/BookingPolicy';
import Footer from './components/Footer';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
    const [view, setView] = useState('rate-card'); // 'rate-card', 'booking', or 'booking-policy'
    const [selectedServiceIds, setSelectedServiceIds] = useState([]);

    // Scroll to top on view change
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [view]);

    return (
        <ErrorBoundary>
            <div className="font-sans antialiased text-nova-black selection:bg-nova-gold selection:text-nova-navy max-w-[100vw] min-h-screen flex flex-col bg-white overflow-x-hidden">
                <main className="flex-grow w-full">
                    {view === 'rate-card' ? (
                        <InteractiveRateCard
                            onContinue={(serviceIds) => {
                                setSelectedServiceIds(serviceIds);
                                setView('booking');
                            }}
                            onBack={() => window.location.reload()}
                        />
                    ) : view === 'booking' ? (
                        <BookingManager
                            initialServiceIds={selectedServiceIds}
                            onBack={() => setView('rate-card')}
                        />
                    ) : (
                        <BookingPolicy onBack={() => setView('rate-card')} />
                    )}
                </main>
                <Footer onNavigate={setView} currentView={view} />
            </div>
        </ErrorBoundary>
    );
}

export default App;
