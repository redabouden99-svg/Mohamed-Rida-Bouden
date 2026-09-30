import React, { useState } from 'react';
import { Menu, X, ChevronDown, Shield, Bell, Sparkles, AlertCircle } from 'lucide-react';
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

            <nav className="bg-dark-900/90 backdrop-blur-md border-b border-white/10">
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
                            <div className="ml-10 flex items-center space-x-6">
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
                                        <ChevronDown className="w-3.5 h-3.5" />
                                    </button>
                                    
                                    {/* Dropdown */}
                                    {dropdownOpen && (
                                        <div 
                                            className="absolute left-0 mt-2 w-52 bg-dark-800 border border-white/10 rounded-xl shadow-2xl z-50 backdrop-blur-xl overflow-hidden"
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

                                {/* Admin Button */}
                                <button
                                    onClick={() => onNavigate('admin')}
                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-brand-red text-gray-300 hover:text-white border border-white/10 text-xs font-bold uppercase tracking-wider transition-all"
                                    title="لوحة تحكم الأدمن"
                                >
                                    <Shield className="w-3.5 h-3.5 text-brand-brightGreen" />
                                    <span>Admin</span>
                                </button>
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
                        <div className="px-3 pt-2 pb-4 space-y-1">
                            <button 
                                onClick={() => { onNavigate('home'); setIsOpen(false); }} 
                                className="block w-full text-left px-3 py-2 rounded-md text-base font-bold text-white hover:text-brand-brightGreen hover:bg-white/5"
                            >
                                Home
                            </button>
                            
                            <div className="px-3 py-1 text-gray-500 text-xs uppercase tracking-wider font-bold">Series</div>
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
                                className="block w-full text-left px-3 py-2 rounded-md text-base font-bold text-white hover:text-brand-brightGreen hover:bg-white/5"
                            >
                                Live Analysis
                            </button>

                            <button 
                                onClick={() => { onNavigate('dashboard'); setIsOpen(false); }} 
                                className="block w-full text-left px-3 py-2 rounded-md text-base font-bold text-white hover:text-brand-brightGreen hover:bg-white/5"
                            >
                                Predictions
                            </button>

                            <button 
                                onClick={() => { onNavigate('admin'); setIsOpen(false); }} 
                                className="block w-full text-left px-3 py-2 rounded-md text-base font-bold text-brand-brightGreen hover:bg-white/5 flex items-center gap-2"
                            >
                                <Shield className="w-4 h-4" />
                                <span>لوحة تحكم الأدمن (Admin Panel)</span>
                            </button>
                        </div>
                    </div>
                )}
            </nav>
        </header>
    );
};

export default Navbar;
