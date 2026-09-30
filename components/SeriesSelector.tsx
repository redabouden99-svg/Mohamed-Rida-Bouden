import React from 'react';
import { SeriesId } from '../types';
import { Users } from 'lucide-react';

interface SeriesSelectorProps {
    onSelect: (series: SeriesId, tab?: 'news' | 'analysis' | 'prediction' | 'teams') => void;
}

const SeriesSelector: React.FC<SeriesSelectorProps> = ({ onSelect }) => {
    const seriesData = [
        { 
            id: SeriesId.F1, 
            color: 'border-f1', 
            image: 'https://images.unsplash.com/photo-1574780650638-349f7b6058be?q=80&w=800&auto=format&fit=crop',
            label: 'FORMULA 1',
            logo: 'F1®'
        },
        { 
            id: SeriesId.MOTOGP, 
            color: 'border-motogp', 
            image: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?q=80&w=800&auto=format&fit=crop',
            label: 'MOTOGP',
            logo: 'MotoGP™'
        },
        { 
            id: SeriesId.WEC, 
            color: 'border-wec', 
            image: 'https://images.unsplash.com/photo-1592634976722-13b3c3c78864?q=80&w=800&auto=format&fit=crop',
            label: 'WEC',
            logo: 'WEC'
        },
        { 
            id: SeriesId.IMSA, 
            color: 'border-imsa', 
            image: 'https://images.unsplash.com/photo-1558564244-64506927d2c3?q=80&w=800&auto=format&fit=crop',
            label: 'IMSA',
            logo: 'IMSA'
        },
        { 
            id: SeriesId.GT_WORLD_CHALLENGE, 
            color: 'border-gtwc', 
            image: 'https://images.unsplash.com/photo-1628185016593-3d0d8299d63c?q=80&w=800&auto=format&fit=crop',
            label: 'GT WORLD CHALLENGE',
            logo: 'GTWC'
        },
    ];

    return (
        <section className="py-20 bg-dark-900 relative">
             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-display font-bold text-white mb-10 text-center uppercase tracking-widest">Select Championship</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                    {seriesData.map((item) => (
                        <div 
                            key={item.id}
                            className={`group relative h-[350px] rounded-2xl overflow-hidden border-b-4 ${item.color} shadow-lg transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 bg-dark-800`}
                        >
                            <div 
                                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110 opacity-60"
                                style={{ backgroundImage: `url(${item.image})` }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
                            
                            {/* Logo Overlay */}
                            <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-md px-3 py-1 rounded border border-white/20">
                                <span className="font-display font-bold text-white tracking-widest">{item.logo}</span>
                            </div>
                            
                            <div className="absolute bottom-0 left-0 w-full p-6">
                                <h3 className="text-3xl font-display font-bold text-white tracking-wider mb-4 group-hover:text-brand-brightGreen transition-colors text-lg md:text-xl xl:text-2xl">
                                    {item.label}
                                </h3>
                                
                                <div className="space-y-2 opacity-90">
                                    <button 
                                        onClick={() => onSelect(item.id, 'news')}
                                        className="w-full bg-white/10 hover:bg-brand-red text-white py-2 rounded font-bold uppercase text-xs tracking-wider transition-colors border border-white/10 backdrop-blur-sm"
                                    >
                                        Live Dashboard
                                    </button>
                                    <button 
                                        onClick={() => onSelect(item.id, 'teams')}
                                        className="w-full bg-transparent hover:bg-white/10 text-gray-300 hover:text-white py-2 rounded font-bold uppercase text-xs tracking-wider transition-colors border border-white/20 flex items-center justify-center gap-2"
                                    >
                                        <Users size={12} /> View Teams
                                    </button>
                                </div>

                                <div className="h-1 w-0 bg-brand-brightGreen mt-4 transition-all duration-300 group-hover:w-full" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SeriesSelector;