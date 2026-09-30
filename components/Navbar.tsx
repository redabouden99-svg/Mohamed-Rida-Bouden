import React, { useState } from 'react';
import { Menu, X, ChevronDown, Bell, LogIn, Shield, Activity } from 'lucide-react';
import { SeriesId } from '../types';

interface NavbarProps {
    onNavigate: (view: 'home' | 'dashboard' | 'admin') => void;
    onSelectSeries: (series: SeriesId) => void;
    currentSeries: SeriesId | null;
    announcement?: {
        active: boolean;
        text: string;
        type: 'info' | 'breaking' | 'warning' | 'success';
        link?: string;
    } | null;
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate, onSelectSeries, currentSeries, announcement }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const handleSeriesClick = (series: SeriesId) => {
        onSelectSeries(series);
        onNavigate('dashboard');
        setDropdownOpen(false);
        setIsOpen(false);
    };

    const getBannerBg = () => {
        if (!announcement) return '';
        switch (announcement.type) {
            case 'breaking':
                return 'bg-gradient-to-r from-red-600 via-rose-600 to-red-700 text-white';
            case 'warning':
                return 'bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 text-white';
            case 'success':
                return 'bg-gradient-to-r from-emerald-600 via-teal-600 to-green-700 text-white';
            default:
                return 'bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-800 text-white';
        }
    };

    return (
        <header className="sticky top-0 z-50">
            {/* Dynamic Announcement Banner */}
            {announcement && announcement.active && announcement.text && (
                <div className={`px-4 py-2 text-xs sm:text-sm font-semibold tracking-wide text-center flex items-center justify-center gap-2 shadow-md transition-all ${getBannerBg()}`}>
                    <Bell className="w-3.5 h-3.5 flex-shrink-0 animate-bounce" />
                    <span>{announcement.text}</span>
                    {announcement.link && (
                        <a 
                            href={announcement.link}
                            className="underline font-bold hover:text-white/90 ml-1 inline-flex items-center text-xs"
                        >
                            تفاصيل / Details →
                        </a>
                    )}
                </div>
            )}

            <nav className="bg-dark-900/95 backdrop-blur-md border-b border-white/10 shadow-lg">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-20">
                        {/* Logo */}
                        <div className="flex-shrink-0 cursor-pointer group flex items-center gap-2.5" onClick={() => onNavigate('home')}>
                            <div className="w-8 h-8 rounded-lg bg-brand-red flex items-center justify-center text-white font-display font-black text-lg shadow-[0_0_12px_rgba(255,51,51,0.5)] group-hover:scale-105 transition-transform">
                                B
                            </div>
                            <span className="font-display text-2xl tracking-wider text-white font-bold uppercase group-hover:text-brand-brightGreen transition-colors duration-300">
                                Bouden <span className="text-brand-red group-hover:text-white transition-colors">Motorsport</span>
                            </span>
                        </div>

                        {/* Desktop Menu */}
                        <div className="hidden md:flex md:items-center md:space-x-6">
                            <button 
                                onClick={() => onNavigate('home')} 
                                className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-bold uppercase tracking-wide transition-colors"
                            >
                                Home
                            </button>
                            
                            <div className="relative group">
                                <button 
                                    className="flex items-center gap-1 text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-bold uppercase tracking-wide transition-colors"
                                    onClick={() => setDropdownOpen(!dropdownOpen)}
                                    onMouseEnter={() => setDropdownOpen(true)}
                                >
                                    <span>Series</span>
                                    <ChevronDown className="w-3.5 h-3.5 transition-transform group-hover:rotate-180" />
                                </button>
                                
                                {/* Dropdown */}
                                {dropdownOpen && (
                                    <div 
                                        className="absolute left-0 mt-2 w-52 bg-dark-800 border border-white/10 rounded-xl shadow-2xl z-50 backdrop-blur-xl overflow-hidden py-1.5"
                                        onMouseLeave={() => setDropdownOpen(false)}
                                    >
                                        {Object.values(SeriesId).map((series) => (
                                            <button
                                                key={series}
                                                onClick={() => handleSeriesClick(series)}
                                                className="block w-full text-left px-4 py-2.5 text-sm text-gray-300 hover:bg-white/10 hover:text-brand-brightGreen transition-colors"
                                            >
                                                {series}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <button 
                                onClick={() => onNavigate('dashboard')} 
                                className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-bold uppercase tracking-wide transition-colors"
                            >
                                Live Analysis
                            </button>

                            <button 
                                onClick={() => onNavigate('dashboard')} 
                                className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-bold uppercase tracking-wide transition-colors"
                            >
                                Predictions
                            </button>

                            {/* Small Dedicated Login Button for /admin */}
                            <button
                                onClick={() => onNavigate('admin')}
                                className="group relative inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-red/15 hover:bg-brand-red text-white border border-brand-red/40 hover:border-brand-red text-xs font-bold tracking-wide transition-all duration-200 shadow-sm hover:shadow-[0_0_16px_rgba(255,51,51,0.5)] hover:scale-105 active:scale-95"
                                title="تسجيل الدخول إلى لوحة تحكم الأدمن (/admin)"
                            >
                                <LogIn className="w-3.5 h-3.5 text-brand-red group-hover:text-white transition-colors" />
                                <span>تسجيل الدخول</span>
                            </button>
                        </div>

                        {/* Mobile menu button */}
                        <div className="-mr-2 flex md:hidden items-center gap-2">
                            {/* Mobile Quick Login Icon */}
                            <button
                                onClick={() => onNavigate('admin')}
                                className="p-2 rounded-lg bg-brand-red/15 border border-brand-red/40 text-brand-red hover:bg-brand-red hover:text-white transition-colors"
                                title="تسجيل الدخول"
                            >
                                <LogIn className="w-4 h-4" />
                            </button>

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
                    <div className="md:hidden bg-dark-900/98 border-b border-white/10 backdrop-blur-2xl">
                        <div className="px-3 pt-2 pb-5 space-y-1">
                            <button 
                                onClick={() => { onNavigate('home'); setIsOpen(false); }} 
                                className="block w-full text-left px-3 py-2.5 rounded-md text-base font-bold text-white hover:text-brand-brightGreen hover:bg-white/5"
                            >
                                Home
                            </button>
                            
                            <div className="px-3 py-1.5 text-gray-500 text-xs uppercase tracking-wider font-bold">Series</div>
                            {Object.values(SeriesId).map((series) => (
                                <button
                                    key={series}
                                    onClick={() => handleSeriesClick(series)}
                                    className="block w-full text-left pl-6 px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-brand-brightGreen hover:bg-white/5"
                                >
                                    {series}
                                </button>
                            ))}
                            
                            <button 
                                onClick={() => { onNavigate('dashboard'); setIsOpen(false); }} 
                                className="block w-full text-left px-3 py-2.5 rounded-md text-base font-bold text-white hover:text-brand-brightGreen hover:bg-white/5"
                            >
                                Live Analysis
                            </button>

                            <button 
                                onClick={() => { onNavigate('dashboard'); setIsOpen(false); }} 
                                className="block w-full text-left px-3 py-2.5 rounded-md text-base font-bold text-white hover:text-brand-brightGreen hover:bg-white/5"
                            >
                                Predictions
                            </button>

                            {/* Mobile Login Button */}
                            <div className="pt-2 mt-2 border-t border-white/10">
                                <button 
                                    onClick={() => { onNavigate('admin'); setIsOpen(false); }} 
                                    className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-brand-red text-white text-sm font-bold shadow-lg shadow-brand-red/30"
                                >
                                    <LogIn className="w-4 h-4" />
                                    <span>تسجيل الدخول (لوحة تحكم الأدمن)</span>
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </nav>
        </header>
    );
};

export default Navbar;
