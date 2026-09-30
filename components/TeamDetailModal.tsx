import React, { useState } from 'react';
import { Team, Driver } from '../types';
import { 
    X, Trophy, MapPin, Flag, Cpu, Shield, Globe, Award, 
    Calendar, Users, ChevronRight, Activity, Zap
} from 'lucide-react';

interface TeamDetailModalProps {
    team: Team | null;
    onClose: () => void;
    onSelectDriver?: (driver: Driver) => void;
}

export const TeamDetailModal: React.FC<TeamDetailModalProps> = ({ team, onClose, onSelectDriver }) => {
    const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);

    if (!team) return null;

    const activeDriver = selectedDriver || team.drivers[0];

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto">
            {/* Backdrop */}
            <div 
                className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity animate-in fade-in"
                onClick={onClose}
            />

            {/* Modal Dialog */}
            <div className="relative w-full max-w-4xl bg-dark-900 border border-white/15 rounded-3xl shadow-2xl overflow-hidden z-10 my-auto animate-in zoom-in-95 duration-200">
                {/* Team Brand Accent Bar */}
                <div 
                    className="h-1.5 w-full shadow-[0_0_20px_currentColor]" 
                    style={{ backgroundColor: team.logoColor, color: team.logoColor }}
                />

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-black/60 hover:bg-white/20 text-gray-300 hover:text-white backdrop-blur-md border border-white/10 transition-colors shadow-lg"
                    title="Close"
                >
                    <X size={20} />
                </button>

                {/* Hero Car Banner */}
                <div className="relative h-60 sm:h-72 w-full overflow-hidden bg-dark-800">
                    <img 
                        src={team.image} 
                        alt={team.name} 
                        className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-1000"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/60 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-r from-dark-900/90 via-transparent to-dark-900/40" />

                    {/* Team Logo Badge */}
                    {team.logo && (
                        <div className="absolute top-4 left-4 sm:top-6 sm:left-6 bg-white/95 p-2.5 rounded-2xl shadow-xl backdrop-blur-md h-14 sm:h-16 max-w-[120px] flex items-center justify-center border border-white/20">
                            <img src={team.logo} alt={`${team.name} logo`} className="max-h-full max-w-full object-contain" />
                        </div>
                    )}

                    {/* Rank & Category Badges */}
                    <div className="absolute top-4 right-16 sm:top-6 sm:right-16 flex items-center gap-2">
                        {team.category && (
                            <span className="px-3 py-1 rounded-full bg-black/70 text-xs font-bold font-mono tracking-wider text-white border border-white/20 backdrop-blur-md uppercase">
                                {team.category}
                            </span>
                        )}
                        <span className="px-3 py-1 rounded-full bg-brand-red text-white text-xs font-bold font-mono tracking-wider shadow-md">
                            2026 Rank #{team.rank || 1}
                        </span>
                    </div>

                    {/* Title & Car Details Overlay */}
                    <div className="absolute bottom-5 left-4 sm:left-8 right-4 sm:right-8 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <span className="text-xs font-bold uppercase tracking-widest text-brand-brightGreen">
                                    2026 Official Competitor
                                </span>
                            </div>
                            <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight drop-shadow-md">
                                {team.fullName || team.name}
                            </h2>
                            <p className="text-sm sm:text-base text-gray-300 flex items-center gap-1.5 mt-1">
                                <MapPin size={14} className="text-brand-red shrink-0" />
                                <span>{team.base}</span>
                            </p>
                        </div>

                        <div className="bg-black/60 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/10 self-start sm:self-auto">
                            <div className="text-[11px] font-bold uppercase tracking-wider text-gray-400">2026 Chassis</div>
                            <div className="text-xl sm:text-2xl font-mono font-extrabold text-white">{team.car}</div>
                        </div>
                    </div>
                </div>

                {/* Modal Body Container */}
                <div className="p-4 sm:p-8 space-y-6 max-h-[60vh] overflow-y-auto">
                    {/* Key Technical & Leadership Specifications Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                        <div className="bg-dark-800/80 p-3.5 rounded-2xl border border-white/10">
                            <div className="flex items-center gap-1.5 text-xs text-gray-400 uppercase font-semibold mb-1">
                                <Trophy size={14} className="text-amber-400" />
                                <span>Team Principal</span>
                            </div>
                            <div className="font-bold text-white text-sm sm:text-base truncate">
                                {team.principal}
                            </div>
                        </div>

                        <div className="bg-dark-800/80 p-3.5 rounded-2xl border border-white/10">
                            <div className="flex items-center gap-1.5 text-xs text-gray-400 uppercase font-semibold mb-1">
                                <Cpu size={14} className="text-brand-brightGreen" />
                                <span>Power Unit / Engine</span>
                            </div>
                            <div className="font-bold text-white text-xs sm:text-sm line-clamp-1" title={team.engine || team.car}>
                                {team.engine || 'High Performance Works Spec'}
                            </div>
                        </div>

                        <div className="bg-dark-800/80 p-3.5 rounded-2xl border border-white/10">
                            <div className="flex items-center gap-1.5 text-xs text-gray-400 uppercase font-semibold mb-1">
                                <Award size={14} className="text-blue-400" />
                                <span>World Titles</span>
                            </div>
                            <div className="font-bold text-white text-sm sm:text-base">
                                {team.worldChampionships ? `${team.worldChampionships} Championships` : 'Contender'}
                            </div>
                        </div>

                        <div className="bg-dark-800/80 p-3.5 rounded-2xl border border-white/10">
                            <div className="flex items-center gap-1.5 text-xs text-gray-400 uppercase font-semibold mb-1">
                                <Activity size={14} className="text-brand-red" />
                                <span>Season Points</span>
                            </div>
                            <div className="font-display font-bold text-white text-lg sm:text-xl text-brand-brightGreen">
                                {team.points} pts
                            </div>
                        </div>
                    </div>

                    {/* Detailed Technical Specifications Panel */}
                    {(team.engine || team.chassis || team.technicalDirector) && (
                        <div className="bg-dark-800/60 p-4 sm:p-5 rounded-2xl border border-white/10 space-y-2.5">
                            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 flex items-center gap-2">
                                <Zap size={14} className="text-amber-400" />
                                <span>Technical Architecture & Engineering Leadership</span>
                            </h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
                                {team.engine && (
                                    <div>
                                        <span className="text-gray-500 font-semibold block text-[11px] uppercase">Engine Specifications:</span>
                                        <span className="text-gray-200 font-mono">{team.engine}</span>
                                    </div>
                                )}
                                {team.chassis && (
                                    <div>
                                        <span className="text-gray-500 font-semibold block text-[11px] uppercase">Chassis Construction:</span>
                                        <span className="text-gray-200 font-mono">{team.chassis}</span>
                                    </div>
                                )}
                                {team.technicalDirector && (
                                    <div>
                                        <span className="text-gray-500 font-semibold block text-[11px] uppercase">Technical Director:</span>
                                        <span className="text-gray-200">{team.technicalDirector}</span>
                                    </div>
                                )}
                                {team.firstEntry && (
                                    <div>
                                        <span className="text-gray-500 font-semibold block text-[11px] uppercase">Championship Heritage:</span>
                                        <span className="text-gray-200">Debut: {team.firstEntry}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Team Heritage & Background */}
                    {team.history && (
                        <div className="bg-dark-800/40 p-4 sm:p-5 rounded-2xl border border-white/5 space-y-2">
                            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 flex items-center gap-2">
                                <Globe size={14} className="text-brand-red" />
                                <span>Team Heritage & 2026 Season Outlook</span>
                            </h4>
                            <p className="text-gray-300 text-sm leading-relaxed text-justify">
                                {team.history}
                            </p>
                        </div>
                    )}

                    {/* 2026 Official Drivers Roster */}
                    <div className="space-y-4">
                        <div className="flex items-center justify-between border-b border-white/10 pb-2">
                            <h4 className="text-sm font-bold uppercase tracking-wider text-white flex items-center gap-2">
                                <Users size={16} className="text-brand-brightGreen" />
                                <span>2026 Official Driver Lineup</span>
                            </h4>
                            <span className="text-xs text-gray-400">
                                Click driver to inspect profile & career stats
                            </span>
                        </div>

                        {/* Driver Selector Pills */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                            {team.drivers.map((driver, dIdx) => (
                                <button
                                    key={dIdx}
                                    type="button"
                                    onClick={() => setSelectedDriver(driver)}
                                    className={`flex items-center gap-3 p-3 rounded-2xl border text-left transition-all ${
                                        activeDriver?.name === driver.name
                                            ? 'bg-dark-700 border-brand-brightGreen shadow-lg shadow-brand-brightGreen/10 scale-[1.02]'
                                            : 'bg-dark-800/80 border-white/10 hover:border-white/30 hover:bg-dark-700/60'
                                    }`}
                                >
                                    <div 
                                        className="w-12 h-12 rounded-xl flex items-center justify-center font-display font-black text-xl text-white shrink-0 shadow-md"
                                        style={{ backgroundColor: team.logoColor }}
                                    >
                                        #{driver.number}
                                    </div>
                                    <div className="overflow-hidden flex-1">
                                        <div className="font-bold text-white text-sm sm:text-base truncate">
                                            {driver.name}
                                        </div>
                                        <div className="flex items-center gap-1.5 text-xs text-gray-400 font-mono uppercase mt-0.5">
                                            <Flag size={10} className="text-gray-400" />
                                            <span>{driver.nationality}</span>
                                            <span>•</span>
                                            <span className="text-brand-brightGreen font-semibold">{driver.stats.wins} Wins</span>
                                        </div>
                                    </div>
                                    <ChevronRight size={16} className="text-gray-500 shrink-0" />
                                </button>
                            ))}
                        </div>

                        {/* Active Driver Detailed Profile Card */}
                        {activeDriver && (
                            <div className="bg-gradient-to-br from-dark-800 to-dark-800/80 border border-white/15 rounded-2xl p-5 sm:p-6 shadow-xl animate-in fade-in duration-300">
                                <div className="flex flex-col md:flex-row gap-6 items-start">
                                    {/* Driver Portrait */}
                                    <div className="relative w-full md:w-36 h-48 md:h-44 rounded-2xl overflow-hidden bg-dark-900 border border-white/10 shrink-0">
                                        {activeDriver.image ? (
                                            <img 
                                                src={activeDriver.image} 
                                                alt={activeDriver.name} 
                                                className="w-full h-full object-cover object-top" 
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-gray-600">
                                                <Users size={48} />
                                            </div>
                                        )}
                                        <div className="absolute top-2 left-2 bg-black/70 backdrop-blur-md px-2 py-0.5 rounded text-xs font-mono font-bold text-brand-brightGreen border border-white/10">
                                            #{activeDriver.number}
                                        </div>
                                    </div>

                                    {/* Driver Stats & Bio */}
                                    <div className="flex-1 space-y-4 w-full">
                                        <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-white/10 pb-3">
                                            <div>
                                                <h3 className="text-2xl font-display font-bold text-white">
                                                    {activeDriver.name}
                                                </h3>
                                                <div className="flex items-center gap-2 text-xs font-mono text-gray-400 uppercase mt-0.5">
                                                    <Flag size={12} />
                                                    <span>{activeDriver.nationality}</span>
                                                    <span>•</span>
                                                    <span>Official 2026 Driver</span>
                                                </div>
                                            </div>

                                            {/* Driver Stat Counter Pills */}
                                            <div className="flex gap-2">
                                                <div className="bg-black/50 px-3 py-1.5 rounded-xl border border-white/10 text-center min-w-[60px]">
                                                    <div className="text-[10px] text-gray-400 uppercase font-bold">Titles</div>
                                                    <div className="text-lg font-display font-bold text-amber-400">{activeDriver.stats.titles}</div>
                                                </div>
                                                <div className="bg-black/50 px-3 py-1.5 rounded-xl border border-white/10 text-center min-w-[60px]">
                                                    <div className="text-[10px] text-gray-400 uppercase font-bold">Wins</div>
                                                    <div className="text-lg font-display font-bold text-brand-brightGreen">{activeDriver.stats.wins}</div>
                                                </div>
                                                <div className="bg-black/50 px-3 py-1.5 rounded-xl border border-white/10 text-center min-w-[60px]">
                                                    <div className="text-[10px] text-gray-400 uppercase font-bold">Podiums</div>
                                                    <div className="text-lg font-display font-bold text-blue-400">{activeDriver.stats.podiums}</div>
                                                </div>
                                            </div>
                                        </div>

                                        <p className="text-gray-300 text-sm leading-relaxed">
                                            {activeDriver.bio}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Official Sponsors Bar */}
                    {team.sponsors && team.sponsors.length > 0 && (
                        <div className="pt-2">
                            <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500 block mb-2">
                                Official 2026 Team Partners & Sponsors:
                            </span>
                            <div className="flex flex-wrap gap-2">
                                {team.sponsors.map((sponsor, sIdx) => (
                                    <span 
                                        key={sIdx}
                                        className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-xs font-medium text-gray-300 hover:text-white transition-colors"
                                    >
                                        {sponsor}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer Bar */}
                <div className="p-4 bg-dark-800/90 border-t border-white/10 flex justify-between items-center text-xs text-gray-400">
                    <span className="font-mono">Bouden Motorsport 2026 Technical Database</span>
                    <button
                        onClick={onClose}
                        className="px-5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold transition-colors"
                    >
                        Close Window
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TeamDetailModal;
