import React, { useState } from 'react';
import { HISTORICAL_SEASONS_DATA, getSeriesHistoricalKey, SeasonArchive } from '../services/historicalData';
import { Trophy, Calendar, Flag, Award, Car, Users, Sparkles, ChevronRight } from 'lucide-react';

interface HistoricalStandingsViewProps {
    seriesName: string;
    seriesColor?: string;
    seriesBg?: string;
}

const HistoricalStandingsView: React.FC<HistoricalStandingsViewProps> = ({
    seriesName,
    seriesColor = 'text-brand-red',
    seriesBg = 'bg-brand-red'
}) => {
    const seriesKey = getSeriesHistoricalKey(seriesName);
    const seriesArchives = HISTORICAL_SEASONS_DATA[seriesKey] || HISTORICAL_SEASONS_DATA.f1;

    const availableYears = Object.keys(seriesArchives)
        .map(Number)
        .sort((a, b) => b - a);

    const [selectedYear, setSelectedYear] = useState<number>(availableYears[0] || 2025);
    const [subTab, setSubTab] = useState<'drivers' | 'constructors'>('drivers');

    const archive: SeasonArchive | undefined = seriesArchives[selectedYear];

    if (!archive) {
        return (
            <div className="p-8 text-center text-gray-400 bg-dark-800 rounded-2xl border border-white/10">
                لا تتوفر بيانات أرشيفية لهذه البطولة حالياً.
            </div>
        );
    }

    return (
        <div className="space-y-6 animate-in fade-in duration-300">
            {/* Year Selector & Summary Header */}
            <div className="bg-gradient-to-br from-dark-800 to-dark-850 p-6 rounded-3xl border border-white/10 shadow-xl">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/10">
                    <div className="flex items-center gap-3">
                        <div className="p-3 rounded-2xl bg-amber-500/20 text-yellow-400 border border-amber-500/30">
                            <Trophy className="w-6 h-6" />
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <span className="px-2 py-0.5 rounded-full bg-white/10 text-gray-300 text-[11px] font-bold uppercase tracking-wider">
                                    Official Archive
                                </span>
                                <span className="text-xs text-gray-400">سجل المواسم السابقة المعتمدة</span>
                            </div>
                            <h2 className="text-xl sm:text-2xl font-black text-white uppercase tracking-wider flex items-center gap-2">
                                <span>{seriesName}</span>
                                <span className="text-amber-400">({selectedYear} Season)</span>
                            </h2>
                        </div>
                    </div>

                    {/* Year Switcher Pills */}
                    <div className="flex items-center gap-2 bg-dark-900/80 p-1.5 rounded-2xl border border-white/10">
                        <span className="text-xs font-bold text-gray-400 px-3 flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5" />
                            <span>الموسم:</span>
                        </span>
                        {availableYears.map((yr) => (
                            <button
                                key={yr}
                                onClick={() => setSelectedYear(yr)}
                                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                                    selectedYear === yr
                                        ? 'bg-amber-500 text-black font-black shadow-lg shadow-amber-500/30 scale-105'
                                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                                }`}
                            >
                                {yr} Season
                            </button>
                        ))}
                    </div>
                </div>

                {/* Season Champions Banner */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                    <div className="p-4 rounded-2xl bg-dark-900/60 border border-white/5 flex items-center gap-3.5">
                        <div className="w-10 h-10 rounded-xl bg-yellow-500/20 text-yellow-400 flex items-center justify-center font-bold">
                            🥇
                        </div>
                        <div>
                            <span className="text-[11px] uppercase font-bold text-gray-400">بطل السائقين / World Champion</span>
                            <p className="text-base font-bold text-white flex items-center gap-1.5">
                                <span>{archive.championDriver}</span>
                                <Award className="w-4 h-4 text-yellow-400" />
                            </p>
                        </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-dark-900/60 border border-white/5 flex items-center gap-3.5">
                        <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold">
                            🏆
                        </div>
                        <div>
                            <span className="text-[11px] uppercase font-bold text-gray-400">بطل الفرق والصانعين / Constructors Champion</span>
                            <p className="text-base font-bold text-white flex items-center gap-1.5">
                                <span>{archive.championConstructor}</span>
                                <Flag className="w-4 h-4 text-blue-400" />
                            </p>
                        </div>
                    </div>
                </div>

                {/* Season Summary paragraph */}
                <p className="mt-4 text-xs sm:text-sm text-gray-300 italic bg-white/5 p-3.5 rounded-xl border border-white/5">
                    "{archive.summary}"
                </p>
            </div>

            {/* Drivers vs Constructors Subtabs */}
            <div className="flex gap-2">
                <button
                    onClick={() => setSubTab('drivers')}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all ${
                        subTab === 'drivers'
                            ? 'bg-white text-black shadow-lg'
                            : 'bg-dark-800 text-gray-400 hover:text-white hover:bg-dark-700'
                    }`}
                >
                    <Trophy className="w-4 h-4" />
                    <span>ترتيب السائقين النهائي ({selectedYear})</span>
                </button>

                <button
                    onClick={() => setSubTab('constructors')}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all ${
                        subTab === 'constructors'
                            ? 'bg-white text-black shadow-lg'
                            : 'bg-dark-800 text-gray-400 hover:text-white hover:bg-dark-700'
                    }`}
                >
                    <Users className="w-4 h-4" />
                    <span>ترتيب الفرق والصانعين ({selectedYear})</span>
                </button>
            </div>

            {/* Standings Table */}
            <div className="bg-dark-800 rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
                {subTab === 'drivers' ? (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-white/5 text-gray-400 text-xs uppercase font-bold tracking-wider">
                                <tr>
                                    <th className="p-4 w-16 text-center">Pos</th>
                                    <th className="p-4">Driver</th>
                                    <th className="p-4">Team</th>
                                    <th className="p-4 text-center">Wins</th>
                                    <th className="p-4 text-center">Podiums</th>
                                    <th className="p-4 text-right">Final Points</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {archive.drivers.map((d) => (
                                    <tr key={d.rank} className="hover:bg-white/5 transition-colors">
                                        <td className="p-4 text-center font-display font-black text-lg">
                                            {d.rank === 1 ? (
                                                <span className="text-yellow-400 inline-flex items-center gap-1">
                                                    1 <Trophy className="w-3.5 h-3.5" />
                                                </span>
                                            ) : d.rank === 2 ? (
                                                <span className="text-gray-300">2</span>
                                            ) : d.rank === 3 ? (
                                                <span className="text-amber-600">3</span>
                                            ) : (
                                                <span className="text-gray-500">{d.rank}</span>
                                            )}
                                        </td>
                                        <td className="p-4">
                                            <div className="font-bold text-white flex items-center gap-2">
                                                <span>{d.name}</span>
                                                {d.nationality && (
                                                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/10 text-gray-300 font-mono">
                                                        {d.nationality}
                                                    </span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="p-4 text-gray-300 text-sm font-medium">
                                            {d.team}
                                        </td>
                                        <td className="p-4 text-center text-sm font-mono text-gray-300">
                                            {d.wins ?? '-'}
                                        </td>
                                        <td className="p-4 text-center text-sm font-mono text-gray-300">
                                            {d.podiums ?? '-'}
                                        </td>
                                        <td className="p-4 text-right font-display font-bold text-lg text-white">
                                            <span className="text-amber-400">{d.points}</span>
                                            <span className="text-xs text-gray-500 ml-1">pts</span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-white/5 text-gray-400 text-xs uppercase font-bold tracking-wider">
                                <tr>
                                    <th className="p-4 w-16 text-center">Pos</th>
                                    <th className="p-4">Constructor / Team</th>
                                    <th className="p-4">Chassis / Car</th>
                                    <th className="p-4 text-center">Wins</th>
                                    <th className="p-4 text-center">Podiums</th>
                                    <th className="p-4 text-right">Final Points</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {archive.constructors.map((c) => (
                                    <tr key={c.rank} className="hover:bg-white/5 transition-colors">
                                        <td className="p-4 text-center font-display font-black text-lg">
                                            {c.rank === 1 ? (
                                                <span className="text-yellow-400 inline-flex items-center gap-1">
                                                    1 🏆
                                                </span>
                                            ) : (
                                                <span className="text-gray-400">{c.rank}</span>
                                            )}
                                        </td>
                                        <td className="p-4 font-bold text-white">
                                            {c.name}
                                        </td>
                                        <td className="p-4 text-gray-400 font-mono text-xs">
                                            {c.car || '-'}
                                        </td>
                                        <td className="p-4 text-center text-sm font-mono text-gray-300">
                                            {c.wins ?? '-'}
                                        </td>
                                        <td className="p-4 text-center text-sm font-mono text-gray-300">
                                            {c.podiums ?? '-'}
                                        </td>
                                        <td className="p-4 text-right font-display font-bold text-lg text-white">
                                            <span className="text-brand-brightGreen">{c.points}</span>
                                            <span className="text-xs text-gray-500 ml-1">pts</span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default HistoricalStandingsView;
