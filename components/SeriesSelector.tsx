import React, { useState, useEffect } from 'react';
import { SeriesId, MediaOverrides } from '../types';
import { Users, Activity, ChevronRight, ShieldCheck } from 'lucide-react';
import { resolveSeriesImage, resolveSeriesLogo, subscribeMediaChanges, getLocalMediaOverrides } from '../services/mediaService';

interface SeriesSelectorProps {
    onSelect: (series: SeriesId, tab?: 'news' | 'analysis' | 'prediction' | 'teams') => void;
}

const SeriesSelector: React.FC<SeriesSelectorProps> = ({ onSelect }) => {
    const [, setMediaState] = useState<MediaOverrides>(getLocalMediaOverrides);

    useEffect(() => {
        const unsubscribe = subscribeMediaChanges((updated) => {
            setMediaState(updated);
        });
        return unsubscribe;
    }, []);

    const rawSeriesData = [
        { 
            id: SeriesId.F1, 
            color: 'border-brand-red', 
            accentColor: '#ff1801',
            badgeBg: 'bg-red-600/20 text-red-400 border-red-500/30',
            defaultImage: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=1200&auto=format&fit=crop',
            label: 'FORMULA 1',
            subLabel: 'FIA World Championship 2026',
            roundBadge: 'Round 18 • Singapore GP',
            defaultLogo: 'https://upload.wikimedia.org/wikipedia/commons/3/33/F1.svg',
            logoText: 'F1®',
            category: 'Open-Wheel Hybrid'
        },
        { 
            id: SeriesId.MOTOGP, 
            color: 'border-blue-500', 
            accentColor: '#0090ff',
            badgeBg: 'bg-blue-600/20 text-blue-400 border-blue-500/30',
            defaultImage: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?q=80&w=1200&auto=format&fit=crop',
            label: 'MOTOGP',
            subLabel: 'FIM World Championship 2026',
            roundBadge: 'Round 15 • Mandalika GP',
            defaultLogo: 'https://upload.wikimedia.org/wikipedia/commons/a/a0/Moto_Gp_logo.svg',
            logoText: 'MotoGP™',
            category: 'Prototype Motorcycles'
        },
        { 
            id: SeriesId.WEC, 
            color: 'border-emerald-500', 
            accentColor: '#10b981',
            badgeBg: 'bg-emerald-600/20 text-emerald-400 border-emerald-500/30',
            defaultImage: 'https://images.unsplash.com/photo-1592634976722-13b3c3c78864?q=80&w=1200&auto=format&fit=crop',
            label: 'FIA WEC',
            subLabel: 'World Endurance Championship',
            roundBadge: 'Round 7 • 6 Hours of Fuji',
            defaultLogo: 'https://upload.wikimedia.org/wikipedia/commons/e/e8/FIA_WEC_logo.svg',
            logoText: 'WEC',
            category: 'Hypercar & LMGT3'
        },
        { 
            id: SeriesId.IMSA, 
            color: 'border-amber-500', 
            accentColor: '#f59e0b',
            badgeBg: 'bg-amber-600/20 text-amber-400 border-amber-500/30',
            defaultImage: 'https://images.unsplash.com/photo-1558564244-64506927d2c3?q=80&w=1200&auto=format&fit=crop',
            label: 'IMSA WEATHERTECH',
            subLabel: 'SportsCar Championship',
            roundBadge: 'Round 10 • Battle on the Bricks',
            defaultLogo: 'https://upload.wikimedia.org/wikipedia/commons/d/d4/IMSA_WeatherTech_SportsCar_Championship_logo.svg',
            logoText: 'IMSA',
            category: 'GTP & GTD PRO'
        },
        { 
            id: SeriesId.GT_WORLD_CHALLENGE, 
            color: 'border-purple-500', 
            accentColor: '#a855f7',
            badgeBg: 'bg-purple-600/20 text-purple-400 border-purple-500/30',
            defaultImage: 'https://images.unsplash.com/photo-1628185016593-3d0d8299d63c?q=80&w=1200&auto=format&fit=crop',
            label: 'GT WORLD CHALLENGE',
            subLabel: 'Fanatec GT Europe & America',
            roundBadge: 'Round 8 • Circuit de Barcelona',
            defaultLogo: 'https://upload.wikimedia.org/wikipedia/commons/7/77/GT_World_Challenge_logo.svg',
            logoText: 'GTWC',
            category: 'FIA GT3 Sprint & Enduro'
        },
        { 
            id: SeriesId.DTM, 
            color: 'border-yellow-400', 
            accentColor: '#facc15',
            badgeBg: 'bg-yellow-500/20 text-yellow-300 border-yellow-400/30',
            defaultImage: 'https://images.unsplash.com/photo-1629219356886-c322b724497e?q=80&w=1200&auto=format&fit=crop',
            label: 'DTM MASTERS',
            subLabel: 'Deutsche Tourenwagen Masters',
            roundBadge: 'Round 14 • Red Bull Ring',
            defaultLogo: 'https://upload.wikimedia.org/wikipedia/commons/e/ee/DTM_Logo_2023.svg',
            logoText: 'DTM',
            category: 'German GT3 Championship'
        },
    ];

    const seriesData = rawSeriesData.map(s => ({
        ...s,
        image: resolveSeriesImage(s.id, s.defaultImage),
        logoSvg: resolveSeriesLogo(s.id, s.defaultLogo)
    }));

    return (
        <section className="py-24 bg-dark-900 relative overflow-hidden">
            {/* Subtle background ambient lights */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-3/4 h-96 bg-brand-red/5 rounded-full blur-[140px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-bold uppercase tracking-widest text-brand-brightGreen mb-4">
                        <Activity className="w-3.5 h-3.5" />
                        <span>6 البطولات العالمية المعتمدة لموسم 2026</span>
                    </div>
                    <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-wider uppercase">
                        Select Championship
                    </h2>
                    <p className="mt-3 text-sm sm:text-base text-gray-400">
                        اختر البطولة للوصول الفوري إلى لوحة القيادة الحية، الترتيب العام، الفرق، والتحليلات الفنية بالذكاء الاصطناعي.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {seriesData.map((item) => (
                        <div 
                            key={item.id}
                            className={`group relative h-[420px] rounded-3xl overflow-hidden border-2 ${item.color} shadow-2xl transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.8)] hover:-translate-y-2 bg-dark-800 flex flex-col justify-between`}
                        >
                            {/* Background Image with Hover Scale */}
                            <div 
                                className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-110 opacity-55"
                                style={{ backgroundImage: `url(${item.image})` }}
                            />
                            
                            {/* Multi-layer Dark Gradient for Readability */}
                            <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/75 to-dark-900/30" />

                            {/* Top Header: Official Logo + Live Bot Status */}
                            <div className="relative z-10 p-6 flex items-start justify-between">
                                {/* Official High-Res Logo Badge */}
                                <div className="bg-black/80 backdrop-blur-md px-3.5 py-2 rounded-2xl border border-white/20 flex items-center gap-2.5 shadow-lg group-hover:border-white/40 transition-colors">
                                    <img 
                                        src={item.logoSvg} 
                                        alt={`${item.label} Logo`} 
                                        className="h-5 w-auto max-w-[50px] object-contain filter drop-shadow brightness-110"
                                        onError={(e) => {
                                            // Fallback to text badge if SVG fails to load
                                            e.currentTarget.style.display = 'none';
                                        }}
                                    />
                                    <span className="font-display font-black text-white tracking-widest text-sm">
                                        {item.logoText}
                                    </span>
                                </div>

                                <div className="flex flex-col items-end gap-1">
                                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border backdrop-blur-md ${item.badgeBg}`}>
                                        <span className="w-1.5 h-1.5 rounded-full bg-current animate-ping" />
                                        <span>2026 LIVE</span>
                                    </span>
                                    <span className="text-[10px] font-mono text-gray-400 bg-black/50 px-2 py-0.5 rounded border border-white/5">
                                        {item.roundBadge}
                                    </span>
                                </div>
                            </div>

                            {/* Bottom Content Area */}
                            <div className="relative z-10 p-6">
                                <div className="mb-4">
                                    <span className="text-[11px] font-bold uppercase tracking-widest text-gray-400 block mb-1">
                                        {item.category}
                                    </span>
                                    <h3 className="text-2xl sm:text-3xl font-display font-black text-white tracking-wider group-hover:text-brand-brightGreen transition-colors">
                                        {item.label}
                                    </h3>
                                    <p className="text-xs text-gray-300 font-medium">
                                        {item.subLabel}
                                    </p>
                                </div>

                                <div className="grid grid-cols-2 gap-2 pt-2">
                                    <button 
                                        onClick={() => onSelect(item.id, 'news')}
                                        className="w-full bg-brand-red hover:bg-red-700 text-white py-2.5 rounded-xl font-bold uppercase text-xs tracking-wider transition-all shadow-md shadow-brand-red/30 flex items-center justify-center gap-1"
                                    >
                                        <span>Live Board</span>
                                        <ChevronRight className="w-3.5 h-3.5" />
                                    </button>
                                    <button 
                                        onClick={() => onSelect(item.id, 'teams')}
                                        className="w-full bg-white/10 hover:bg-white/20 text-gray-200 hover:text-white py-2.5 rounded-xl font-bold uppercase text-xs tracking-wider transition-all border border-white/15 flex items-center justify-center gap-1.5"
                                    >
                                        <Users className="w-3.5 h-3.5" />
                                        <span>الفرق والسيارات</span>
                                    </button>
                                </div>

                                {/* Bottom Accent Line */}
                                <div 
                                    className="h-1 w-0 mt-4 rounded-full transition-all duration-500 group-hover:w-full"
                                    style={{ backgroundColor: item.accentColor }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SeriesSelector;
