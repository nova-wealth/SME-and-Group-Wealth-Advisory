import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import OurApproach from './components/OurApproach';
import WhoWeServe from './components/WhoWeServe';
import AdvisoryFees from './components/AdvisoryFees';
import WhatIsIncluded from './components/WhatIsIncluded';
import PerformanceFee from './components/PerformanceFee';
import SpecialistServices from './components/SpecialistServices';
import HowToGetStarted from './components/HowToGetStarted';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';
import LoadingScreen from './components/LoadingScreen';

function App() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simulate initial site load delay for effect
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1500);
        return () => clearTimeout(timer);
    }, []);

    const handleDownloadPDF = () => {
        window.print();
    };

    return (
        <div className="font-sans antialiased text-nova-black bg-white selection:bg-nova-gold selection:text-nova-navy max-w-[100vw] overflow-x-hidden">
            <LoadingScreen isVisible={isLoading} />
            <Navbar onDownloadPDF={handleDownloadPDF} />

            <div id="pdf-content">
                <main>
                    <Hero />
                    <OurApproach />
                    <WhoWeServe />
                    <AdvisoryFees />
                    <WhatIsIncluded />
                    <PerformanceFee />
                    <SpecialistServices />
                    <HowToGetStarted />
                    <FinalCTA />
                </main>
                <Footer />
            </div>
        </div>
    );
}

export default App;
