import React from 'react';

interface HeroProps {
    onExplore: () => void;
}

const Hero: React.FC<HeroProps> = ({ onExplore }) => {
    return (
        <div className="relative overflow-hidden h-[600px] flex items-center justify-center text-center group">
            {/* Background Image - Porsche Penske Motorsport Le Mans */}
            <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-10000 ease-linear group-hover:scale-105"
                style={{ 
                    // Explicitly using the requested Porsche 963 image
                    backgroundImage: 'url("https://newsroom.porsche.com/.imaging/mte/porsche-templating-theme/image_1290x726/dam/pnr/2023/Motorsports/WEC/Le-Mans-Test-Day/02-Porsche-963-Porsche-Penske-Motorsport.jpg/jcr:content/02-Porsche-963-Porsche-Penske-Motorsport.jpg")',
                    backgroundPosition: 'center 60%'
                }}
            />
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/60 to-transparent" />
            <div className="absolute inset-0 bg-black/30" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
                <div className="mx-auto max-w-5xl transform transition-all duration-1000 translate-y-0 opacity-100 animate-in fade-in slide-in-from-bottom-10">
                    <div className="mb-6 flex justify-center space-x-6 opacity-80">
                         {/* Championship Logos Simulation */}
                         <span className="font-display font-bold text-xl tracking-widest border-2 border-white/20 px-3 py-1 rounded bg-black/40 backdrop-blur-md">F1®</span>
                         <span className="font-display font-bold text-xl tracking-widest border-2 border-white/20 px-3 py-1 rounded bg-black/40 backdrop-blur-md">WEC</span>
                         <span className="font-display font-bold text-xl tracking-widest border-2 border-white/20 px-3 py-1 rounded bg-black/40 backdrop-blur-md">MOTOGP™</span>
                    </div>

                    <h1 className="text-6xl md:text-8xl font-display font-bold tracking-tighter text-white mb-6 drop-shadow-2xl">
                        RACE. <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-red to-orange-500">ANALYZE.</span> PREDICT.
                    </h1>
                    
                    <p className="mt-6 text-2xl text-gray-200 max-w-3xl mx-auto mb-10 font-light tracking-wide shadow-black drop-shadow-md">
                        The ultimate AI-powered hub for <span className="text-brand-brightGreen font-bold">Teams</span>, <span className="text-brand-brightGreen font-bold">Drivers</span> & <span className="text-brand-brightGreen font-bold">Live Strategy</span>.
                    </p>
                    
                    <button 
                        onClick={onExplore}
                        className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-200 bg-brand-red font-display rounded-full hover:bg-red-700 hover:scale-105 hover:shadow-[0_0_20px_rgba(255,51,51,0.5)] focus:outline-none ring-offset-2 focus:ring-2"
                    >
                        <span>Explore Teams & Data</span>
                        <svg className="w-5 h-5 ml-2 -mr-1 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path></svg>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Hero;