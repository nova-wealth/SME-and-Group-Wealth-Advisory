import React from 'react';
import InteractiveRateCard from './components/InteractiveRateCard';

function App() {
    return (
        <div className="font-sans antialiased text-nova-black selection:bg-nova-gold selection:text-nova-navy max-w-[100vw]">
            <InteractiveRateCard onBack={() => window.location.reload()} />
        </div>
    );
}

export default App;
