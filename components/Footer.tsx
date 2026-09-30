import React from 'react';
import { Shield, Lock } from 'lucide-react';

interface FooterProps {
    onNavigateToAdmin?: () => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigateToAdmin }) => {
    const handleAdminClick = (e: React.MouseEvent) => {
        e.preventDefault();
        if (onNavigateToAdmin) {
            onNavigateToAdmin();
        } else {
            window.location.href = '/admin';
        }
    };

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
                    
                    {/* Explicit Admin Panel Link */}
                    <a 
                        href="/admin" 
                        onClick={handleAdminClick}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-brand-red hover:text-white text-gray-300 border border-white/10 transition-all font-semibold text-xs tracking-wide shadow-sm"
                        title="لوحة تحكم الأدمن وضبط Gemini API"
                    >
                        <Shield className="w-3.5 h-3.5 text-brand-brightGreen" />
                        <span>لوحة تحكم الأدمن (Admin Panel)</span>
                    </a>
                </div>

                <p className="text-gray-600 text-xs sm:text-sm">
                    © 2026 Bouden Motorsport. AI strategy engine powered by Google Gemini.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
