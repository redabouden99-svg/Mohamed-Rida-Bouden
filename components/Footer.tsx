import React from 'react';
import { Shield } from 'lucide-react';

const Footer: React.FC = () => {
    return (
        <footer className="bg-dark-900 border-t border-white/10 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <p className="font-display text-2xl text-white italic mb-4 tracking-wider">
                    BOUDEN <span className="text-brand-red">MOTORSPORT</span>
                </p>

                <div className="flex flex-wrap justify-center items-center gap-6 mb-8 text-gray-400 text-sm">
                    <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                    <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                    <a href="/api/health" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">API Status</a>
                    <a href="#series-selector" className="hover:text-white transition-colors">Championships</a>
                    <span className="text-gray-600">•</span>
                    <a href="/admin" className="hover:text-brand-red transition-colors inline-flex items-center gap-1.5 text-xs text-gray-400">
                        <Shield className="w-3.5 h-3.5 text-brand-red" />
                        <span>Admin Portal</span>
                    </a>
                    <span className="text-gray-600">•</span>
                    <span className="text-gray-400 text-xs">Season 2026 Live Telemetry</span>
                </div>

                <p className="text-gray-600 text-xs sm:text-sm">
                    © 2026 Bouden Motorsport. AI strategy engine powered by Google Gemini.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
