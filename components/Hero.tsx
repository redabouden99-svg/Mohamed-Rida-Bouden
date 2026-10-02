import React, { useState, useEffect } from 'react';
import { SiteContent } from '../types';
import { ChevronRight, Sparkles, Activity } from 'lucide-react';
import { resolveHeroBg, subscribeMediaChanges } from '../services/mediaService';

interface HeroProps {
    onExplore: () => void;
    siteContent?: SiteContent | null;
}

// High-resolution dramatic motorsport endurance racing image
const DEFAULT_BG = "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=2400&auto=format&fit=crop";
const BACKUP_BG = "https://newsroom.porsche.com/.imaging/mte/porsche-templating-theme/image_1290x726/dam/pnr/2023/Motorsports/WEC/Le-Mans-Test-Day/02-Porsche-963-Porsche-Penske-Motorsport.jpg/jcr:content/02-Porsche-963-Porsche-Penske-Motorsport.jpg";

const Hero: React.FC<HeroProps> = ({ onExplore, siteContent }) => {
    const [bgImage, setBgImage] = useState<string>(() => resolveHeroBg(siteContent?.heroBgImage || DEFAULT_BG));

    useEffect(() => {
        if (siteContent?.heroBgImage) {
            setBgImage(resolveHeroBg(siteContent.heroBgImage));
        }
    }, [siteContent?.heroBgImage]);

    useEffect(() => {
        const unsubscribe = subscribeMediaChanges((overrides) => {
            if (overrides.heroBgImage) {
                setBgImage(overrides.heroBgImage);
            }
        });
        return unsubscribe;
    }, []);

    const title = siteContent?.heroTitle || "RACE. ANALYZE. PREDICT.";
    const highlight = siteContent?.heroTitleHighlight || "ANALYZE.";
    const subtitle = siteContent?.heroSubtitle || "The ultimate AI-powered hub for Teams, Drivers & Live Strategy.";

    // Render headline with fixed line-height, proper padding, and non-overlapping spacing
    const renderHeadline = () => {
        if (highlight && title.includes(highlight)) {
            const parts = title.split(highlight);
            return (
                <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-extrabold tracking-tight text-white mb-6 leading-[1.2] sm:leading-[1.18] md:leading-[1.1] pb-3 pt-1 select-none drop-shadow-[0_8px_24px_rgba(0,0,0,0.9)]">
                    <span className="inline-block">{parts[0]}</span>
                    <span className="inline-block mx-1 sm:mx-2 text-transparent bg-clip-text bg-gradient-to-r from-brand-red via-orange-500 to-amber-400 drop-shadow-[0_0_35px_rgba(255,51,51,0.6)]">
                        {highlight}
                    </span>
                    <span className="inline-block">{parts.slice(1).join(highlight)}</span>
                </h1>
            );
        }
        return (
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-extrabold tracking-tight text-white mb-6 leading-[1.2] sm:leading-[1.18] md:leading-[1.1] pb-3 pt-1 select-none drop-shadow-[0_8px_24px_rgba(0,0,0,0.9)]">
                {title}
            </h1>
        );
    };

    return (
        <section className="relative overflow-hidden min-h-[620px] md:min-h-[680px] flex items-center justify-center text-center group">
            {/* Background Racing Image with subtle zoom on hover */}
            <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-10000 ease-out group-hover:scale-105"
                style={{ 
                    backgroundImage: `url("${bgImage}"), url("${BACKUP_BG}")`,
                    backgroundPosition: 'center 45%'
                }}
            />
            
            {/* Professional Multi-Layer Dark Overlay for Maximum Text Readability */}
            {/* 1. Deep Top & Bottom Vignette Gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-dark-900/90 via-dark-900/60 to-dark-900" />
            
            {/* 2. Radial Darkening Mask behind the typography */}
            <div 
                className="absolute inset-0 opacity-80"
                style={{
                    background: 'radial-gradient(circle at center 48%, rgba(13, 17, 23, 0.45) 0%, rgba(13, 17, 23, 0.85) 65%, rgba(13, 17, 23, 0.98) 100%)'
                }}
            />
            
            {/* 3. Subtle dark carbon mesh overlay */}
            <div className="absolute inset-0 bg-black/35 backdrop-blur-[0.5px]" />

            {/* Content Container */}
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full py-16 sm:py-20">
                <div className="mx-auto max-w-4xl transform transition-all duration-700 translate-y-0 opacity-100">
                    
                    {/* Championship Badges & Season Pill */}
                    <div className="mb-6 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-red/20 border border-brand-red/40 text-brand-red font-mono text-xs font-bold uppercase tracking-wider backdrop-blur-md">
                            <Activity className="w-3.5 h-3.5 animate-pulse" />
                            <span>2026 Live Telemetry</span>
                        </span>
                        
                        <div className="hidden sm:flex items-center gap-2 opacity-90">
                            <span className="font-display font-bold text-xs tracking-widest border border-white/20 px-2.5 py-1 rounded bg-black/60 backdrop-blur-md text-gray-200">F1®</span>
                            <span className="font-display font-bold text-xs tracking-widest border border-white/20 px-2.5 py-1 rounded bg-black/60 backdrop-blur-md text-gray-200">MOTOGP™</span>
                            <span className="font-display font-bold text-xs tracking-widest border border-white/20 px-2.5 py-1 rounded bg-black/60 backdrop-blur-md text-gray-200">WEC</span>
                            <span className="font-display font-bold text-xs tracking-widest border border-white/20 px-2.5 py-1 rounded bg-black/60 backdrop-blur-md text-gray-200">IMSA</span>
                            <span className="font-display font-bold text-xs tracking-widest border border-white/20 px-2.5 py-1 rounded bg-black/60 backdrop-blur-md text-gray-200">GTWC</span>
                            <span className="font-display font-bold text-xs tracking-widest border border-white/20 px-2.5 py-1 rounded bg-black/60 backdrop-blur-md text-gray-200">DTM</span>
                        </div>
                    </div>

                    {/* Headline with fixed line-height & spacing */}
                    {renderHeadline()}
                    
                    {/* Subtitle with high contrast against the dark overlay */}
                    <p className="mt-2 text-base sm:text-xl md:text-2xl text-gray-200 max-w-2xl mx-auto mb-10 font-normal tracking-normal leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                        {subtitle}
                    </p>
                    
                    {/* Call to Action Button */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <button 
                            onClick={onExplore}
                            className="group relative inline-flex items-center justify-center px-8 py-4 text-base sm:text-lg font-bold text-white transition-all duration-300 bg-brand-red font-display rounded-full hover:bg-red-700 hover:scale-105 hover:shadow-[0_0_30px_rgba(255,51,51,0.6)] focus:outline-none focus:ring-2 focus:ring-brand-red focus:ring-offset-2 focus:ring-offset-dark-900"
                        >
                            <span>Explore Teams & Live Data</span>
                            <ChevronRight className="w-5 h-5 ml-1 transition-transform group-hover:translate-x-1" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Bottom Gradient Fade to seamless black */}
            <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-dark-900 to-transparent pointer-events-none" />
        </section>
    );
};

export default Hero;
