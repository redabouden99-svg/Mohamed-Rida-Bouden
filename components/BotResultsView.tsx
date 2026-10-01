import React, { useState } from 'react';
import { SeriesResultsData } from '../types';
import { 
    Trophy, Flag, Timer, Award, CheckCircle2, 
    Sparkles, ArrowUpRight, Zap, Shield, Globe, Users, 
    Calendar, MapPin, Radio, Activity, ChevronRight 
} from 'lucide-react';

interface BotResultsViewProps {
    data: SeriesResultsData | null;
    seriesColor: string;
    seriesBg: string;
    onSelectDriver?: (driverName: string) => void;
}

export const BotResultsView: React.FC<BotResultsViewProps> = ({ 
    data, 
    seriesColor, 
    seriesBg,
    onSelectDriver 
}) => {
    const [subTab, setSubTab] = useState<'race' | 'qualifying' | 'drivers' | 'constructors'>('race');

    if (!data) {
        return (
            <div className="bg-dark-800/60 rounded-3xl border border-white/10 p-12 text-center">
                <Radio className="w-12 h-12 text-brand-brightGreen animate-pulse mx-auto mb-4" />
                <h3 className="text-xl font-display font-bold text-white mb-2">جاري استدعاء بيانات البوت...</h3>
                <p className="text-gray-400 text-sm">Automated Championship Bot is initializing telemetry and official timing records.</p>
            </div>
        );
    }

    const { event, raceResults, qualifyingResults, driverStandings, teamStandings, bot } = data;

    const getPosBadge = (pos: number) => {
        if (pos === 1) {
            return (
                <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-gradient-to-br from-amber-400 to-yellow-600 text-dark-900 font-display font-black text-sm shadow-[0_0_12px_rgba(245,158,11,0.5)]">
                    1
                </div>
            );
        }
        if (pos === 2) {
            return (
                <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-gradient-to-br from-slate-300 to-gray-400 text-dark-900 font-display font-black text-sm shadow-[0_0_8px_rgba(203,213,225,0.4)]">
                    2
                </div>
            );
        }
        if (pos === 3) {
            return (
                <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-gradient-to-br from-amber-700 to-amber-900 text-white font-display font-black text-sm">
                    3
                </div>
            );
        }
        return (
            <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-dark-700 text-gray-300 font-mono font-bold text-xs border border-white/10">
                {pos}
            </div>
        );
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-300">
            {/* Latest Event Banner */}
            <div className="relative overflow-hidden bg-gradient-to-r from-dark-800 via-dark-800/90 to-dark-800/60 rounded-3xl border border-white/10 p-6 sm:p-8 shadow-2xl">
                <div className="absolute top-0 right-0 w-96 h-96 bg-brand-red/5 rounded-full blur-3xl pointer-events-none" />
                
                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                        <div className="flex flex-wrap items-center gap-2.5 mb-2.5">
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-brightGreen/15 border border-brand-brightGreen/30 text-brand-brightGreen text-xs font-mono font-bold uppercase tracking-wider">
                                <span className="w-2 h-2 rounded-full bg-brand-brightGreen animate-ping" />
                                Official Event Results
                            </span>
                            <span className="px-3 py-1 rounded-full bg-brand-red/20 border border-brand-red/40 text-brand-red text-xs font-mono font-bold uppercase tracking-wider">
                                2026 Season
                            </span>
                            <span className="px-3 py-1 rounded-full bg-white/10 text-gray-300 text-xs font-mono font-bold uppercase tracking-wider">
                                Round {event.round} of {event.totalRounds}
                            </span>
                            <span className="px-3 py-1 rounded-full bg-dark-700 text-gray-400 text-xs font-mono">
                                {event.status}
                            </span>
                        </div>

                        <h3 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
                            {event.eventName}
                        </h3>

                        <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-gray-300">
                            <span className="flex items-center gap-1.5">
                                <MapPin size={14} className="text-brand-red shrink-0" />
                                <span>{event.circuit}, {event.location}</span>
                            </span>
                            <span className="flex items-center gap-1.5 text-gray-400">
                                <Calendar size={14} />
                                <span>{event.date}</span>
                            </span>
                        </div>
                    </div>

                    {/* Official Timing Classification Badge */}
                    <div className="bg-black/60 backdrop-blur-md p-4 rounded-2xl border border-white/10 shrink-0 min-w-[220px]">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-[11px] font-mono text-gray-400 uppercase font-bold tracking-wider">Classification Status</span>
                            <span className="inline-flex items-center gap-1 text-[10px] text-brand-brightGreen font-bold bg-brand-brightGreen/10 px-2 py-0.5 rounded-full border border-brand-brightGreen/20">
                                <span className="w-1.5 h-1.5 rounded-full bg-brand-brightGreen animate-pulse" />
                                Confirmed
                            </span>
                        </div>
                        <div className="text-sm font-bold text-white flex items-center gap-1.5">
                            <Trophy className="w-4 h-4 text-amber-400 shrink-0" />
                            <span>Official Timing Data</span>
                        </div>
                        <div className="mt-2 pt-2 border-t border-white/10 flex justify-between text-[11px] text-gray-400 font-mono">
                            <span>Season 2026</span>
                            <span className="text-gray-300">Verified Results</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Sub-Tab Navigation Bar */}
            <div className="flex flex-wrap items-center gap-2 border-b border-white/10 pb-3">
                <button
                    onClick={() => setSubTab('race')}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm uppercase tracking-wide transition-all ${
                        subTab === 'race'
                            ? 'bg-brand-red text-white shadow-[0_0_20px_rgba(255,51,51,0.5)]'
                            : 'bg-dark-800 text-gray-400 hover:text-white hover:bg-dark-700'
                    }`}
                >
                    <Flag size={15} />
                    <span>نتائج السباق (Race Classification)</span>
                </button>

                <button
                    onClick={() => setSubTab('qualifying')}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm uppercase tracking-wide transition-all ${
                        subTab === 'qualifying'
                            ? 'bg-brand-red text-white shadow-[0_0_20px_rgba(255,51,51,0.5)]'
                            : 'bg-dark-800 text-gray-400 hover:text-white hover:bg-dark-700'
                    }`}
                >
                    <Timer size={15} />
                    <span>أوقات التأهل (Qualifying Times)</span>
                </button>

                <button
                    onClick={() => setSubTab('drivers')}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm uppercase tracking-wide transition-all ${
                        subTab === 'drivers'
                            ? 'bg-brand-red text-white shadow-[0_0_20px_rgba(255,51,51,0.5)]'
                            : 'bg-dark-800 text-gray-400 hover:text-white hover:bg-dark-700'
                    }`}
                >
                    <Trophy size={15} />
                    <span>ترتيب السائقين (Driver Standings)</span>
                </button>

                <button
                    onClick={() => setSubTab('constructors')}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm uppercase tracking-wide transition-all ${
                        subTab === 'constructors'
                            ? 'bg-brand-red text-white shadow-[0_0_20px_rgba(255,51,51,0.5)]'
                            : 'bg-dark-800 text-gray-400 hover:text-white hover:bg-dark-700'
                    }`}
                >
                    <Award size={15} />
                    <span>ترتيب الفرق (Team Standings)</span>
                </button>
            </div>

            {/* Sub-Tab 1: Race Classification Table */}
            {subTab === 'race' && (
                <div className="bg-dark-800/80 rounded-3xl border border-white/10 overflow-hidden shadow-2xl backdrop-blur-md">
                    <div className="p-4 sm:p-6 border-b border-white/10 flex items-center justify-between">
                        <div>
                            <h4 className="text-lg font-display font-bold text-white flex items-center gap-2">
                                <Flag size={18} className="text-brand-red" />
                                <span>Official Race Results & Points Allocation</span>
                            </h4>
                            <p className="text-xs text-gray-400 mt-0.5">Scraped directly by championship bot from official timing sheets</p>
                        </div>
                        <span className="text-xs font-mono font-bold text-brand-brightGreen bg-brand-brightGreen/10 border border-brand-brightGreen/30 px-3 py-1 rounded-full">
                            {raceResults.length} Classified Drivers
                        </span>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-white/10 bg-black/40 text-[11px] font-mono uppercase text-gray-400 tracking-wider">
                                    <th className="py-3.5 px-4 text-center w-14">Pos</th>
                                    <th className="py-3.5 px-4">Driver</th>
                                    <th className="py-3.5 px-4">Team</th>
                                    <th className="py-3.5 px-4 text-center">Laps</th>
                                    <th className="py-3.5 px-4">Time / Gap</th>
                                    <th className="py-3.5 px-4 text-center">Pts</th>
                                    <th className="py-3.5 px-4 text-center">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5 text-sm">
                                {raceResults.map((row, idx) => (
                                    <tr 
                                        key={idx}
                                        className={`transition-colors hover:bg-white/5 ${
                                            row.pos === 1 ? 'bg-amber-400/5' : ''
                                        }`}
                                    >
                                        <td className="py-3 px-4 text-center">
                                            {getPosBadge(row.pos)}
                                        </td>
                                        <td className="py-3 px-4">
                                            <div className="flex items-center gap-2.5">
                                                <span className="px-2 py-0.5 rounded bg-dark-900 border border-white/10 font-mono text-xs font-bold text-gray-300">
                                                    #{row.number}
                                                </span>
                                                <span className="font-bold text-white hover:text-brand-brightGreen transition-colors">
                                                    {row.driver}
                                                </span>
                                                {row.fastestLap && (
                                                    <span 
                                                        className="px-2 py-0.5 rounded-full bg-purple-500/20 border border-purple-500/40 text-purple-300 font-mono text-[10px] font-bold inline-flex items-center gap-1 shadow-sm"
                                                        title="Fastest Lap of the Race (+1 Championship Point)"
                                                    >
                                                        <Timer size={10} /> FL
                                                    </span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="py-3 px-4 text-gray-300 font-medium text-xs sm:text-sm">
                                            {row.team}
                                        </td>
                                        <td className="py-3 px-4 text-center font-mono text-gray-400 text-xs sm:text-sm">
                                            {row.laps}
                                        </td>
                                        <td className="py-3 px-4 font-mono font-bold text-xs sm:text-sm">
                                            <span className={row.pos === 1 ? 'text-brand-brightGreen' : 'text-gray-300'}>
                                                {row.time}
                                            </span>
                                        </td>
                                        <td className="py-3 px-4 text-center">
                                            {row.points > 0 ? (
                                                <span className="inline-flex items-center justify-center min-w-[32px] px-2 py-0.5 rounded-lg bg-white/10 border border-white/15 text-white font-mono font-bold text-xs">
                                                    +{row.points}
                                                </span>
                                            ) : (
                                                <span className="text-gray-600 font-mono text-xs">0</span>
                                            )}
                                        </td>
                                        <td className="py-3 px-4 text-center">
                                            <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold ${
                                                row.status === 'DNF'
                                                    ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                                                    : 'bg-emerald-500/10 text-emerald-400'
                                            }`}>
                                                {row.status || 'Finished'}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Sub-Tab 2: Qualifying Times Table */}
            {subTab === 'qualifying' && (
                <div className="bg-dark-800/80 rounded-3xl border border-white/10 overflow-hidden shadow-2xl backdrop-blur-md">
                    <div className="p-4 sm:p-6 border-b border-white/10 flex items-center justify-between">
                        <div>
                            <h4 className="text-lg font-display font-bold text-white flex items-center gap-2">
                                <Timer size={18} className="text-amber-400" />
                                <span>Official Qualifying Lap Times & Starting Grid</span>
                            </h4>
                            <p className="text-xs text-gray-400 mt-0.5">Session telemetry times tracked by bot</p>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-white/10 bg-black/40 text-[11px] font-mono uppercase text-gray-400 tracking-wider">
                                    <th className="py-3.5 px-4 text-center w-14">Grid</th>
                                    <th className="py-3.5 px-4">Driver</th>
                                    <th className="py-3.5 px-4">Team</th>
                                    {qualifyingResults[0]?.q1 && <th className="py-3.5 px-4">Q1</th>}
                                    {qualifyingResults[0]?.q2 && <th className="py-3.5 px-4">Q2</th>}
                                    <th className="py-3.5 px-4">Best Lap</th>
                                    <th className="py-3.5 px-4">Gap to Pole</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5 text-sm font-mono">
                                {qualifyingResults.map((q, idx) => (
                                    <tr 
                                        key={idx}
                                        className={`transition-colors hover:bg-white/5 ${
                                            q.pos === 1 ? 'bg-amber-400/5' : ''
                                        }`}
                                    >
                                        <td className="py-3 px-4 text-center">
                                            {getPosBadge(q.pos)}
                                        </td>
                                        <td className="py-3 px-4 font-sans font-bold text-white">
                                            <div className="flex items-center gap-2">
                                                <span className="px-1.5 py-0.5 rounded bg-dark-900 text-xs font-mono text-gray-400">
                                                    #{q.number}
                                                </span>
                                                <span>{q.driver}</span>
                                                {q.pos === 1 && (
                                                    <span className="px-2 py-0.5 rounded-full bg-yellow-400/20 text-yellow-300 font-mono text-[10px] font-bold border border-yellow-400/40">
                                                        POLE
                                                    </span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="py-3 px-4 font-sans text-gray-300 text-xs sm:text-sm">
                                            {q.team}
                                        </td>
                                        {q.q1 && <td className="py-3 px-4 text-gray-400 text-xs">{q.q1}</td>}
                                        {q.q2 && <td className="py-3 px-4 text-gray-300 text-xs">{q.q2}</td>}
                                        <td className="py-3 px-4 font-bold text-brand-brightGreen text-xs sm:text-sm">
                                            {q.bestLap}
                                        </td>
                                        <td className="py-3 px-4 text-gray-400 text-xs">
                                            {q.gap}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Sub-Tab 3: Driver Standings */}
            {subTab === 'drivers' && (
                <div className="bg-dark-800/80 rounded-3xl border border-white/10 overflow-hidden shadow-2xl backdrop-blur-md">
                    <div className="p-4 sm:p-6 border-b border-white/10 flex items-center justify-between">
                        <div>
                            <h4 className="text-lg font-display font-bold text-white flex items-center gap-2">
                                <Trophy size={18} className="text-yellow-400" />
                                <span>2026 World Championship Driver Standings</span>
                            </h4>
                            <p className="text-xs text-gray-400 mt-0.5">Updated live following latest race results</p>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-white/10 bg-black/40 text-[11px] font-mono uppercase text-gray-400 tracking-wider">
                                    <th className="py-3.5 px-4 text-center w-14">Rank</th>
                                    <th className="py-3.5 px-4">Driver</th>
                                    <th className="py-3.5 px-4">Team</th>
                                    <th className="py-3.5 px-4 text-center">Wins</th>
                                    <th className="py-3.5 px-4 text-center">Podiums</th>
                                    <th className="py-3.5 px-4 text-right">Points</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5 text-sm">
                                {driverStandings.map((ds, idx) => (
                                    <tr key={idx} className="transition-colors hover:bg-white/5">
                                        <td className="py-3 px-4 text-center font-display font-extrabold">
                                            {getPosBadge(ds.pos)}
                                        </td>
                                        <td className="py-3 px-4">
                                            <div className="flex items-center gap-2">
                                                <span className="font-bold text-white text-sm sm:text-base">
                                                    {ds.driver}
                                                </span>
                                                <span className="text-[10px] font-mono text-gray-400 uppercase bg-dark-900 px-1.5 py-0.5 rounded">
                                                    {ds.nationality}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="py-3 px-4 text-gray-300 text-xs sm:text-sm">
                                            {ds.team}
                                        </td>
                                        <td className="py-3 px-4 text-center font-mono font-bold text-brand-brightGreen">
                                            {ds.wins}
                                        </td>
                                        <td className="py-3 px-4 text-center font-mono text-gray-300">
                                            {ds.podiums}
                                        </td>
                                        <td className="py-3 px-4 text-right">
                                            <span className="text-xl font-display font-black text-white text-brand-brightGreen">
                                                {ds.points}
                                            </span>
                                            <span className="text-xs text-gray-500 ml-1">pts</span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Sub-Tab 4: Team Standings */}
            {subTab === 'constructors' && (
                <div className="bg-dark-800/80 rounded-3xl border border-white/10 overflow-hidden shadow-2xl backdrop-blur-md">
                    <div className="p-4 sm:p-6 border-b border-white/10 flex items-center justify-between">
                        <div>
                            <h4 className="text-lg font-display font-bold text-white flex items-center gap-2">
                                <Award size={18} className="text-blue-400" />
                                <span>2026 World Championship Team Standings</span>
                            </h4>
                            <p className="text-xs text-gray-400 mt-0.5">Constructor classification and points tally</p>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-white/10 bg-black/40 text-[11px] font-mono uppercase text-gray-400 tracking-wider">
                                    <th className="py-3.5 px-4 text-center w-14">Rank</th>
                                    <th className="py-3.5 px-4">Team</th>
                                    <th className="py-3.5 px-4">Power Unit / Engine</th>
                                    <th className="py-3.5 px-4 text-center">Wins</th>
                                    <th className="py-3.5 px-4 text-right">Total Points</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5 text-sm">
                                {teamStandings.map((ts, idx) => (
                                    <tr key={idx} className="transition-colors hover:bg-white/5">
                                        <td className="py-3.5 px-4 text-center font-display font-extrabold">
                                            {getPosBadge(ts.pos)}
                                        </td>
                                        <td className="py-3.5 px-4 font-bold text-white text-base">
                                            {ts.team}
                                        </td>
                                        <td className="py-3.5 px-4 text-gray-400 font-mono text-xs">
                                            {ts.engine || 'Works Specification'}
                                        </td>
                                        <td className="py-3.5 px-4 text-center font-mono font-bold text-brand-brightGreen">
                                            {ts.wins}
                                        </td>
                                        <td className="py-3.5 px-4 text-right">
                                            <span className="text-2xl font-display font-black text-white">
                                                {ts.points}
                                            </span>
                                            <span className="text-xs text-gray-500 ml-1">pts</span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BotResultsView;
