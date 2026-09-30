import React, { useState } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { SeriesId } from '../types';

interface NavbarProps {
    onNavigate: (view: 'home' | 'dashboard') => void;
    onSelectSeries: (series: SeriesId) => void;
    currentSeries: SeriesId | null;
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate, onSelectSeries, currentSeries }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const handleSeriesClick = (series: SeriesId) => {
        onSelectSeries(series);
        onNavigate('dashboard');
        setDropdownOpen(false);
        setIsOpen(false);
    };

    return (
        <nav className="sticky top-0 z-50 bg-dark-900/80 backdrop-blur-md border-b border-white/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <div className="flex-shrink-0 cursor-pointer group" onClick={() => onNavigate('home')}>
                        <span className="font-display text-2xl tracking-wider text-white font-bold uppercase group-hover:text-brand-brightGreen transition-colors duration-300">
                            Bouden <span className="text-brand-red group-hover:text-white transition-colors">Motorsport</span>
                        </span>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-8">
                            <button onClick={() => onNavigate('home')} className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-bold uppercase tracking-wide transition-colors">Home</button>
                            
                            <div className="relative group">
                                <button 
                                    className="flex items-center text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-bold uppercase tracking-wide transition-colors"
                                    onClick={() => setDropdownOpen(!dropdownOpen)}
                                    onMouseEnter={() => setDropdownOpen(true)}
                                >
                                    Series ▾
                                </button>
                                {/* Dropdown */}
                                {(dropdownOpen) && (
                                    <div 
                                        className="absolute left-0 mt-2 w-48 bg-dark-800 border border-white/10 rounded-xl shadow-2xl z-50 backdrop-blur-xl overflow-hidden"
                                        onMouseLeave={() => setDropdownOpen(false)}
                                    >
                                        <div className="py-1">
                                            {Object.values(SeriesId).map((series) => (
                                                <button
                                                    key={series}
                                                    onClick={() => handleSeriesClick(series)}
                                                    className="block w-full text-left px-4 py-3 text-sm text-gray-300 hover:bg-white/10 hover:text-brand-brightGreen transition-colors"
                                                >
                                                    {series}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            <button onClick={() => onNavigate('dashboard')} className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-bold uppercase tracking-wide transition-colors">Live Analysis</button>
                            <button onClick={() => onNavigate('dashboard')} className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-bold uppercase tracking-wide transition-colors">Predictions</button>
                            <button onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })} className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-bold uppercase tracking-wide transition-colors">About</button>
                        </div>
                    </div>

                    {/* Mobile menu button */}
                    <div className="-mr-2 flex md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-white/10 focus:outline-none"
                        >
                            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-dark-900/95 border-b border-white/10 backdrop-blur-xl">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <button onClick={() => {onNavigate('home'); setIsOpen(false)}} className="block w-full text-left px-3 py-2 rounded-md text-base font-bold text-white hover:text-brand-brightGreen hover:bg-white/5">Home</button>
                        <div className="px-3 py-2 text-gray-500 text-xs uppercase tracking-wider font-bold">Series</div>
                        {Object.values(SeriesId).map((series) => (
                            <button
                                key={series}
                                onClick={() => handleSeriesClick(series)}
                                className="block w-full text-left pl-6 px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-brand-brightGreen hover:bg-white/5"
                            >
                                {series}
                            </button>
                        ))}
                        <button onClick={() => {onNavigate('dashboard'); setIsOpen(false)}} className="block w-full text-left px-3 py-2 rounded-md text-base font-bold text-white hover:text-brand-brightGreen hover:bg-white/5">Live Analysis</button>
                        <button onClick={() => {onNavigate('dashboard'); setIsOpen(false)}} className="block w-full text-left px-3 py-2 rounded-md text-base font-bold text-white hover:text-brand-brightGreen hover:bg-white/5">Predictions</button>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;