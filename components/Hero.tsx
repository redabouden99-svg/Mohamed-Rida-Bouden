import React from 'react';
import { SiteContent } from '../types';

interface HeroProps {
    onExplore: () => void;
    siteContent?: SiteContent | null;
}

const DEFAULT_BG = "https://newsroom.porsche.com/.imaging/mte/porsche-templating-theme/image_1290x726/dam/pnr/2023/Motorsports/WEC/Le-Mans-Test-Day/02-Porsche-963-Porsche-Penske-Motorsport.jpg/jcr:content/02-Porsche-963-Porsche-Penske-Motorsport.jpg";

const Hero: React.FC<HeroProps> = ({ onExplore, siteContent }) => {
    const bgImage = siteContent?.heroBgImage || DEFAULT_BG;
    const title = siteContent?.heroTitle || "RACE. ANALYZE. PREDICT.";
    const highlight = siteContent?.heroTitleHighlight || "ANALYZE.";
    const subtitle = siteContent?.heroSubtitle || "The ultimate AI-powered hub for Teams, Drivers & Live Strategy.";

    // Render headline with highlight word if present
    const renderHeadline = () => {
        if (highlight && title.includes(highlight)) {
            const parts = title.split(highlight);
            return (
                <h1 className="text-5xl sm:text-6xl md:text-8xl font-display font-bold tracking-tighter text-white mb-6 drop-shadow-2xl">
                    {parts[0]}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-red via-orange-500 to-amber-400">
                        {highlight}
                    </span>
                    {parts.slice(1).join(highlight)}
                </h1>
            );
        }
        return (
            <h1 className="text-5xl sm:text-6xl md:text-8xl font-display font-bold tracking-tighter text-white mb-6 drop-shadow-2xl">
                {title}
            </h1>
        );
    };

    return (
        <div className="relative overflow-hidden min-h-[580px] md:h-[620px] flex items-center justify-center text-center group">
            {/* Background Image */}
            <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-10000 ease-linear group-hover:scale-105"
                style={{ 
                    backgroundImage: `url("${bgImage}")`,
                    backgroundPosition: 'center 60%'
                }}
            />
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/60 to-transparent" />
            <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full py-12">
                <div className="mx-auto max-w-5xl transform transition-all duration-1000 translate-y-0 opacity-100 animate-in fade-in slide-in-from-bottom-10">
                    <div className="mb-6 flex justify-center space-x-4 sm:space-x-6 opacity-90">
                         {/* Championship Logos Simulation */}
                         <span className="font-display font-bold text-sm sm:text-base md:text-xl tracking-widest border border-white/25 px-3 py-1 rounded-lg bg-black/50 backdrop-blur-md">F1®</span>
                         <span className="font-display font-bold text-sm sm:text-base md:text-xl tracking-widest border border-white/25 px-3 py-1 rounded-lg bg-black/50 backdrop-blur-md">WEC</span>
                         <span className="font-display font-bold text-sm sm:text-base md:text-xl tracking-widest border border-white/25 px-3 py-1 rounded-lg bg-black/50 backdrop-blur-md">MOTOGP™</span>
                         <span className="font-display font-bold text-sm sm:text-base md:text-xl tracking-widest border border-white/25 px-3 py-1 rounded-lg bg-black/50 backdrop-blur-md hidden sm:inline-block">IMSA</span>
                    </div>

                    {renderHeadline()}
                    
                    <p className="mt-4 sm:mt-6 text-lg sm:text-2xl text-gray-200 max-w-3xl mx-auto mb-10 font-light tracking-wide shadow-black drop-shadow-md">
                        {subtitle}
                    </p>
                    
                    <button 
                        onClick={onExplore}
                        className="group relative inline-flex items-center justify-center px-8 py-4 text-base sm:text-lg font-bold text-white transition-all duration-200 bg-brand-red font-display rounded-full hover:bg-red-700 hover:scale-105 hover:shadow-[0_0_25px_rgba(255,51,51,0.6)] focus:outline-none ring-offset-2 focus:ring-2"
                    >
                        <span>Explore Teams & Live Data</span>
                        <svg className="w-5 h-5 ml-2 -mr-1 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path></svg>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Hero;
