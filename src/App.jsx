import React from 'react';
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

function App() {
    return (
        <div className="font-sans antialiased text-nova-black bg-white selection:bg-nova-gold selection:text-nova-navy max-w-[100vw] overflow-x-hidden">
            <Navbar />
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
    );
}

export default App;
