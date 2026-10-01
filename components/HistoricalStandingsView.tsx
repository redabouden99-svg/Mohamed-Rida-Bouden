import React, { useState } from 'react';
import { HISTORICAL_SEASONS_DATA, getSeriesHistoricalKey, SeasonArchive } from '../services/historicalData';
import { Trophy, Calendar, Award, Car, Users, Sparkles, ChevronDown, Check, Filter } from 'lucide-react';

interface HistoricalStandingsViewProps {
    seriesName: string;
    seriesColor?: string;
    seriesBg?: string;
    onSelectSeries?: (seriesKey: string) => void;
}

const SERIES_TABS = [
    { key: 'f1', label: 'Formula 1', badge: 'F1®' },
    { key: 'motogp', label: 'MotoGP', badge: 'MotoGP™' },
    { key: 'wec', label: 'WEC Hypercar', badge: 'WEC' },
    { key: 'imsa', label: 'IMSA GTP', badge: 'IMSA' },
    { key: 'gtwc', label: 'GT World Challenge', badge: 'GTWC' },
    { key: 'dtm', label: 'DTM Masters', badge: 'DTM' }
];

const HistoricalStandingsView: React.FC<HistoricalStandingsViewProps> = ({
    seriesName,
    seriesColor = 'text-brand-red',
    seriesBg = 'bg-brand-red'
}) => {
    const initialKey = getSeriesHistoricalKey(seriesName);
    const [activeSeriesKey, setActiveSeriesKey] = useState<string>(initialKey);

    const seriesArchives = HISTORICAL_SEASONS_DATA[activeSeriesKey] || HISTORICAL_SEASONS_DATA.f1;
    const availableYears = Object.keys(seriesArchives)
        .map(Number)
        .sort((a, b) => b - a);

    const [selectedYear, setSelectedYear] = useState<number>(availableYears[0] || 2025);
    const [subTab, setSubTab] = useState<'drivers' | 'constructors'>('drivers');

    // If activeSeriesKey changes and selectedYear is not available, set to first available
    const archive: SeasonArchive | undefined = seriesArchives[selectedYear] || seriesArchives[availableYears[0]];
    const currentYear = archive?.year || selectedYear;

    return (
        <div className="space-y-6 animate-in fade-in duration-300">
            {/* Championship Quick Switcher Bar */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5 pl-2 flex-shrink-0">
                    <Filter className="w-3.5 h-3.5 text-brand-red" />
                    <span>البطولة:</span>
                </span>
                {SERIES_TABS.map((tab) => {
                    const isSelected = activeSeriesKey === tab.key;
                    return (
                        <button
                            key={tab.key}
                            onClick={() => {
                                setActiveSeriesKey(tab.key);
                                const archives = HISTORICAL_SEASONS_DATA[tab.key] || {};
                                const years = Object.keys(archives).map(Number).sort((a, b) => b - a);
                                if (!archives[selectedYear] && years.length > 0) {
                                    setSelectedYear(years[0]);
                                }
                            }}
                            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 flex-shrink-0 border ${
                                isSelected
                                    ? 'bg-brand-red text-white border-brand-red shadow-lg shadow-brand-red/20 scale-105'
                                    : 'bg-dark-800 text-gray-400 hover:text-white hover:bg-dark-700 border-white/5'
                            }`}
                        >
                            <span>{tab.label}</span>
                            <span className="text-[10px] px-1.5 py-0.2 rounded bg-black/40 text-gray-300 font-mono">
                                {tab.badge}
                            </span>
                        </button>
                    );
                })}
            </div>

            {/* Year Selector & Summary Header */}
            <div className="bg-gradient-to-br from-dark-800 via-dark-850 to-dark-900 p-6 sm:p-8 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-brand-red/5 rounded-full blur-3xl pointer-events-none" />
                
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-white/10 relative z-10">
                    <div className="flex items-center gap-3.5">
                        <div className="p-3.5 rounded-2xl bg-amber-500/15 text-yellow-400 border border-amber-500/30 shadow-[0_0_20px_rgba(245,158,11,0.15)]">
                            <Trophy className="w-7 h-7" />
                        </div>
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px] font-bold uppercase tracking-wider">
                                    Official Historical Archive
                                </span>
                                <span className="text-xs text-gray-400 font-medium">سجل المواسم والترتيب التاريخي الكامل</span>
                            </div>
                            <h2 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-wider flex items-center gap-2">
                                <span>{SERIES_TABS.find(t => t.key === activeSeriesKey)?.label || seriesName}</span>
                                <span className="text-amber-400 font-mono">({currentYear} Season)</span>
                            </h2>
                        </div>
                    </div>

                    {/* Year Selector: Dropdown + Quick Pills */}
                    <div className="flex flex-wrap items-center gap-3 bg-dark-900/90 p-2 sm:p-2.5 rounded-2xl border border-white/10 shadow-inner">
                        {/* Dropdown Menu */}
                        <div className="relative flex items-center">
                            <Calendar className="w-4 h-4 text-amber-400 absolute right-3 pointer-events-none" />
                            <select
                                value={currentYear}
                                onChange={(e) => setSelectedYear(Number(e.target.value))}
                                className="appearance-none bg-dark-800 hover:bg-dark-750 text-white font-bold text-sm pl-4 pr-10 py-2.5 rounded-xl border border-white/20 focus:border-amber-400 focus:outline-none transition-all cursor-pointer shadow-md font-mono"
                            >
                                {availableYears.map((yr) => (
                                    <option key={yr} value={yr} className="bg-dark-800 text-white py-1">
                                        موسم {yr} ({yr} Season)
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Quick Year Switcher Pills */}
                        <div className="hidden sm:flex items-center gap-1.5 border-r border-white/10 pr-2">
                            {availableYears.map((yr) => (
                                <button
                                    key={yr}
                                    onClick={() => setSelectedYear(yr)}
                                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all font-mono ${
                                        currentYear === yr
                                            ? 'bg-amber-500 text-black font-black shadow-lg shadow-amber-500/30 scale-105'
                                            : 'text-gray-400 hover:text-white hover:bg-white/5'
                                    }`}
                                >
                                    {yr}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {archive && (
                    <>
                        {/* Season Champions Banner */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                            <div className="p-4 sm:p-5 rounded-2xl bg-dark-900/80 border border-white/10 flex items-center gap-4 hover:border-amber-500/30 transition-all">
                                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-yellow-400 to-amber-600 text-black flex items-center justify-center font-black text-xl shadow-lg shadow-amber-500/20 flex-shrink-0">
                                    🥇
                                </div>
                                <div>
                                    <span className="text-[11px] uppercase font-bold text-gray-400 tracking-wider">بطل السائقين / World Driver Champion</span>
                                    <p className="text-base sm:text-lg font-bold text-white flex items-center gap-1.5 mt-0.5">
                                        <span>{archive.championDriver}</span>
                                        <Award className="w-4 h-4 text-yellow-400 flex-shrink-0" />
                                    </p>
                                </div>
                            </div>

                            <div className="p-4 sm:p-5 rounded-2xl bg-dark-900/80 border border-white/10 flex items-center gap-4 hover:border-blue-500/30 transition-all">
                                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-400 to-indigo-600 text-white flex items-center justify-center font-black text-xl shadow-lg shadow-blue-500/20 flex-shrink-0">
                                    🏆
                                </div>
                                <div>
                                    <span className="text-[11px] uppercase font-bold text-gray-400 tracking-wider">بطل الصانعين والفرق / Constructors Champion</span>
                                    <p className="text-base sm:text-lg font-bold text-white flex items-center gap-1.5 mt-0.5">
                                        <span>{archive.championConstructor}</span>
                                        <Car className="w-4 h-4 text-blue-400 flex-shrink-0" />
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Season Editorial Summary */}
                        {archive.summary && (
                            <div className="mt-4 p-4 rounded-2xl bg-white/5 border border-white/5 text-gray-300 text-xs sm:text-sm leading-relaxed flex items-start gap-2.5">
                                <Sparkles className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                                <div>
                                    <span className="font-bold text-white ml-1">ملخص الموسم:</span>
                                    <span>{archive.summary}</span>
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>

            {/* Drivers vs Constructors Standings Sub-Tabs */}
            <div className="flex items-center justify-between flex-wrap gap-4 pt-2">
                <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-dark-800 border border-white/10 shadow-lg">
                    <button
                        onClick={() => setSubTab('drivers')}
                        className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all ${
                            subTab === 'drivers'
                                ? 'bg-brand-red text-white shadow-lg shadow-brand-red/30'
                                : 'text-gray-400 hover:text-white'
                        }`}
                    >
                        <Users className="w-4 h-4" />
                        <span>ترتيب السائقين (Drivers)</span>
                    </button>

                    <button
                        onClick={() => setSubTab('constructors')}
                        className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all ${
                            subTab === 'constructors'
                                ? 'bg-brand-red text-white shadow-lg shadow-brand-red/30'
                                : 'text-gray-400 hover:text-white'
                        }`}
                    >
                        <Car className="w-4 h-4" />
                        <span>ترتيب الصانعين والفرق (Constructors)</span>
                    </button>
                </div>

                <div className="text-xs text-gray-400 font-mono">
                    عرض نتائج موسم <span className="text-white font-bold">{currentYear}</span> الرسمية الموثقة
                </div>
            </div>

            {/* Standings Table */}
            {archive && (
                <div className="bg-dark-800 rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
                    <div className="overflow-x-auto">
                        <table className="w-full text-right text-sm">
                            <thead className="bg-dark-900/90 text-gray-400 text-xs uppercase font-bold tracking-wider border-b border-white/10">
                                <tr>
                                    <th className="py-4 px-6 text-center w-16">المركز (POS)</th>
                                    <th className="py-4 px-6 text-right">
                                        {subTab === 'drivers' ? 'السائق / Driver' : 'الفريق / Constructor'}
                                    </th>
                                    {subTab === 'drivers' && (
                                        <th className="py-4 px-6 text-right">الفريق / Team</th>
                                    )}
                                    {subTab === 'constructors' && (
                                        <th className="py-4 px-6 text-right">السيارة / Chassis</th>
                                    )}
                                    <th className="py-4 px-6 text-center">الانتصارات (WINS)</th>
                                    <th className="py-4 px-6 text-center">منصات التتويج (PODIUMS)</th>
                                    <th className="py-4 px-6 text-center font-black text-amber-400">النقاط (PTS)</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {(subTab === 'drivers' ? archive.drivers : archive.constructors).map((item, idx) => {
                                    const isTop3 = item.rank <= 3;
                                    const badgeColor = 
                                        item.rank === 1 ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' :
                                        item.rank === 2 ? 'bg-slate-300/20 text-slate-200 border border-slate-300/30' :
                                        item.rank === 3 ? 'bg-amber-700/20 text-amber-500 border border-amber-700/30' :
                                        'bg-white/5 text-gray-400';

                                    return (
                                        <tr
                                            key={idx}
                                            className={`hover:bg-white/5 transition-colors ${
                                                item.rank === 1 ? 'bg-amber-500/5' : ''
                                            }`}
                                        >
                                            {/* Rank Badge */}
                                            <td className="py-4 px-6 text-center">
                                                <span className={`inline-flex items-center justify-center w-8 h-8 rounded-xl font-bold font-mono text-xs ${badgeColor}`}>
                                                    {item.rank}
                                                </span>
                                            </td>

                                            {/* Name */}
                                            <td className="py-4 px-6 text-right font-bold text-white">
                                                <div className="flex items-center gap-2">
                                                    {item.nationality && (
                                                        <span className="px-1.5 py-0.5 rounded bg-white/10 text-gray-300 font-mono text-[10px]">
                                                            {item.nationality}
                                                        </span>
                                                    )}
                                                    <span className="text-base">{item.name}</span>
                                                    {item.rank === 1 && (
                                                        <span className="px-2 py-0.5 rounded-full bg-yellow-500/20 text-yellow-400 text-[10px] font-bold">
                                                            CHAMPION
                                                        </span>
                                                    )}
                                                </div>
                                            </td>

                                            {/* Team or Car */}
                                            {subTab === 'drivers' ? (
                                                <td className="py-4 px-6 text-right text-gray-300 font-medium">
                                                    {item.team || '-'}
                                                </td>
                                            ) : (
                                                <td className="py-4 px-6 text-right text-gray-300 font-mono text-xs">
                                                    {item.car || '-'}
                                                </td>
                                            )}

                                            {/* Wins */}
                                            <td className="py-4 px-6 text-center font-mono font-bold text-gray-300">
                                                {item.wins ?? 0}
                                            </td>

                                            {/* Podiums */}
                                            <td className="py-4 px-6 text-center font-mono text-gray-300">
                                                {item.podiums ?? '-'}
                                            </td>

                                            {/* Points */}
                                            <td className="py-4 px-6 text-center font-mono font-black text-amber-400 text-base">
                                                {item.points}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default HistoricalStandingsView;
