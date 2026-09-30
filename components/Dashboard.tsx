import React, { useState, useEffect, useRef } from 'react';
import { SeriesId, NewsItem, Prediction, AnalysisReport, GroundingSource, Team, Driver } from '../types';
import { getLatestNews } from '../services/newsService';
import { getRacePrediction, getTechnicalAnalysis } from '../services/geminiService';
import { getTeamsForSeries } from '../services/teamData';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Newspaper, Brain, Activity, Loader2, ExternalLink, MapPin, Zap, Users, Trophy, Flag, X, ListOrdered, Globe } from 'lucide-react';

interface DashboardProps {
    series: SeriesId;
    initialTab?: 'news' | 'analysis' | 'prediction' | 'teams' | 'standings';
}

const Dashboard: React.FC<DashboardProps> = ({ series, initialTab = 'news' }) => {
    const [activeTab, setActiveTab] = useState<'news' | 'analysis' | 'prediction' | 'teams' | 'standings'>(initialTab);
    const [loading, setLoading] = useState(false);
    
    const [newsData, setNewsData] = useState<{ news: NewsItem[], sources: GroundingSource[] } | null>(null);
    const [predictionData, setPredictionData] = useState<Prediction | null>(null);
    const [analysisData, setAnalysisData] = useState<AnalysisReport | null>(null);
    const [teamsData, setTeamsData] = useState<Team[]>([]);
    
    // Filtering State for Teams/Standings
    const [selectedCategory, setSelectedCategory] = useState<string>('All');
    
    // Live Telemetry State
    const [liveTelemetry, setLiveTelemetry] = useState<any[]>([]);
    
    // Driver Modal State
    const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);

    const isMounted = useRef(true);

    useEffect(() => {
        isMounted.current = true;
        return () => { isMounted.current = false; };
    }, []);

    // Update active tab when initialTab changes (e.g. navigation from home)
    useEffect(() => {
        if (initialTab) setActiveTab(initialTab);
    }, [initialTab]);

    // Initial Telemetry Population and Team Loading
    useEffect(() => {
        const initialData = Array.from({ length: 20 }, (_, i) => ({
            time: i,
            speed: 280 + Math.random() * 40,
            throttle: 80 + Math.random() * 20,
            rpm: 10000 + Math.random() * 2000
        }));
        setLiveTelemetry(initialData);
        setTeamsData(getTeamsForSeries(series));
        setSelectedCategory('All'); // Reset filter on series change
    }, [series]);

    // Live Telemetry Animation Effect
    useEffect(() => {
        const interval = setInterval(() => {
            if (activeTab === 'analysis') {
                setLiveTelemetry(prevData => {
                    const lastTime = prevData[prevData.length - 1].time;
                    const newDataPoint = {
                        time: lastTime + 1,
                        speed: 280 + Math.random() * 50 - 25, 
                        throttle: Math.min(100, Math.max(0, 80 + Math.random() * 40 - 20)),
                        rpm: 10000 + Math.random() * 3000 - 1500
                    };
                    return [...prevData.slice(1), newDataPoint];
                });
            }
        }, 1000); 

        return () => clearInterval(interval);
    }, [activeTab]);


    useEffect(() => {
        // Reset data on series change, but we keep teamsData as it's sync
        setNewsData(null);
        setPredictionData(null);
        setAnalysisData(null);
        
        // Fetch data for the active tab
        fetchData(activeTab, true);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [series, activeTab]);

    const fetchData = async (tab: 'news' | 'analysis' | 'prediction' | 'teams' | 'standings', force = false) => {
        if (tab === 'teams' || tab === 'standings') return; // Teams are static data 

        setLoading(true);
        try {
            if (tab === 'news' && (!newsData || force)) {
                const data = await getLatestNews(series);
                if (isMounted.current) setNewsData(data);
            } else if (tab === 'prediction' && !predictionData) {
                const data = await getRacePrediction(series);
                if (isMounted.current) setPredictionData(data);
            } else if (tab === 'analysis' && !analysisData) {
                const data = await getTechnicalAnalysis(series);
                if (isMounted.current) setAnalysisData(data);
            }
        } catch (e) {
            console.error(e);
        } finally {
            if (isMounted.current) setLoading(false);
        }
    };

    const handleTabChange = (tab: 'news' | 'analysis' | 'prediction' | 'teams' | 'standings') => {
        setActiveTab(tab);
    };

    const getSeriesColor = () => {
        switch (series) {
            case SeriesId.F1: return 'text-f1 border-f1 shadow-f1/50';
            case SeriesId.MOTOGP: return 'text-motogp border-motogp shadow-motogp/50';
            case SeriesId.WEC: return 'text-wec border-wec shadow-wec/50';
            case SeriesId.IMSA: return 'text-imsa border-imsa shadow-imsa/50';
            default: return 'text-white border-white';
        }
    };

    const getSeriesBg = () => {
         switch (series) {
            case SeriesId.F1: return 'bg-f1';
            case SeriesId.MOTOGP: return 'bg-motogp';
            case SeriesId.WEC: return 'bg-wec';
            case SeriesId.IMSA: return 'bg-imsa';
            default: return 'bg-white';
        }
    }

    const getSeriesGradient = () => {
        switch (series) {
            case SeriesId.F1: return 'from-f1/20 to-transparent';
            case SeriesId.MOTOGP: return 'from-motogp/20 to-transparent';
            case SeriesId.WEC: return 'from-wec/20 to-transparent';
            case SeriesId.IMSA: return 'from-imsa/20 to-transparent';
            default: return 'from-white/20 to-transparent';
        }
    }

    // Filter Logic
    const availableCategories = ['All', ...Array.from(new Set(teamsData.filter(t => t.category).map(t => t.category!)))];
    
    const filteredTeams = selectedCategory === 'All' 
        ? teamsData 
        : teamsData.filter(team => team.category === selectedCategory);

    const sortedStandings = [...filteredTeams].sort((a, b) => (a.rank || 999) - (b.rank || 999));

    return (
        <div className="min-h-screen bg-dark-900 pt-8 pb-20 relative">
            {/* Background Texture */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-8 border-b border-white/10 pb-6">
                    <div>
                        <h2 className={`text-5xl font-display font-bold mb-2 tracking-tighter drop-shadow-lg ${getSeriesColor().split(' ')[0]}`}>{series} HUB</h2>
                        <div className="flex items-center gap-2">
                            <span className="relative flex h-3 w-3">
                              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${getSeriesBg()}`}></span>
                              <span className={`relative inline-flex rounded-full h-3 w-3 ${getSeriesBg()}`}></span>
                            </span>
                            <p className="text-gray-400 font-mono text-sm uppercase tracking-widest">Live System Active</p>
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-4 md:mt-0 bg-dark-800/50 p-1.5 rounded-full backdrop-blur-sm border border-white/5">
                        <button 
                            onClick={() => handleTabChange('news')}
                            className={`flex items-center gap-2 px-5 py-2.5 rounded-full transition-all duration-300 font-bold text-sm ${activeTab === 'news' ? `bg-white/10 text-white shadow-[0_0_15px_rgba(255,255,255,0.1)] ${getSeriesColor()}` : 'text-gray-500 hover:text-white hover:bg-white/5'}`}
                        >
                            <Newspaper size={16} /> News
                        </button>
                         <button 
                            onClick={() => handleTabChange('standings')}
                            className={`flex items-center gap-2 px-5 py-2.5 rounded-full transition-all duration-300 font-bold text-sm ${activeTab === 'standings' ? `bg-white/10 text-white shadow-[0_0_15px_rgba(255,255,255,0.1)] ${getSeriesColor()}` : 'text-gray-500 hover:text-white hover:bg-white/5'}`}
                        >
                            <ListOrdered size={16} /> Standings
                        </button>
                        <button 
                            onClick={() => handleTabChange('teams')}
                            className={`flex items-center gap-2 px-5 py-2.5 rounded-full transition-all duration-300 font-bold text-sm ${activeTab === 'teams' ? `bg-white/10 text-white shadow-[0_0_15px_rgba(255,255,255,0.1)] ${getSeriesColor()}` : 'text-gray-500 hover:text-white hover:bg-white/5'}`}
                        >
                            <Users size={16} /> Teams
                        </button>
                        <button 
                            onClick={() => handleTabChange('analysis')}
                            className={`flex items-center gap-2 px-5 py-2.5 rounded-full transition-all duration-300 font-bold text-sm ${activeTab === 'analysis' ? `bg-white/10 text-white shadow-[0_0_15px_rgba(255,255,255,0.1)] ${getSeriesColor()}` : 'text-gray-500 hover:text-white hover:bg-white/5'}`}
                        >
                            <Activity size={16} /> Telemetry
                        </button>
                        <button 
                            onClick={() => handleTabChange('prediction')}
                            className={`flex items-center gap-2 px-5 py-2.5 rounded-full transition-all duration-300 font-bold text-sm ${activeTab === 'prediction' ? `bg-white/10 text-white shadow-[0_0_15px_rgba(255,255,255,0.1)] ${getSeriesColor()}` : 'text-gray-500 hover:text-white hover:bg-white/5'}`}
                        >
                            <Brain size={16} /> Predict
                        </button>
                    </div>
                </div>

                {/* Sub-Category Filter (Visible on Teams and Standings) */}
                {(activeTab === 'teams' || activeTab === 'standings') && availableCategories.length > 2 && (
                    <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                        {availableCategories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-colors border ${selectedCategory === cat ? 'bg-white text-dark-900 border-white' : 'bg-dark-800 text-gray-400 border-white/10 hover:border-white/30'}`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                )}

                {/* Content Area */}
                <div className="min-h-[400px]">
                    {loading ? (
                        <div className="flex flex-col items-center justify-center h-96 text-gray-400 animate-pulse">
                            <div className="relative">
                                <div className={`absolute inset-0 blur-xl opacity-50 ${getSeriesBg()}`}></div>
                                <Loader2 className="relative w-16 h-16 animate-spin mb-4 text-white" />
                            </div>
                            <p className="font-display tracking-widest text-lg">INITIALIZING GEMINI...</p>
                        </div>
                    ) : (
                        <>
                            {activeTab === 'standings' && (
                                <div className="animate-in fade-in slide-in-from-bottom-8 duration-500">
                                    <div className="bg-dark-800 rounded-2xl border border-white/5 overflow-hidden">
                                        <div className="overflow-x-auto">
                                            <table className="w-full text-left">
                                                <thead className="bg-white/5 text-gray-400 text-xs uppercase font-bold tracking-wider">
                                                    <tr>
                                                        <th className="p-4 w-16 text-center">Pos</th>
                                                        <th className="p-4">Team</th>
                                                        <th className="p-4 hidden md:table-cell">Car</th>
                                                        {series === SeriesId.GT_WORLD_CHALLENGE && <th className="p-4">Region</th>}
                                                        <th className="p-4 text-right">Points</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-white/5">
                                                    {sortedStandings.length > 0 ? sortedStandings.map((team) => (
                                                        <tr key={team.id} className="hover:bg-white/5 transition-colors group">
                                                            <td className="p-4 text-center font-display font-bold text-xl text-white">
                                                                <span className={team.rank === 1 ? 'text-yellow-500' : ''}>{team.rank || '-'}</span>
                                                            </td>
                                                            <td className="p-4">
                                                                <div className="flex items-center gap-3">
                                                                    <div className="w-1 bg-white h-8 rounded-full" style={{backgroundColor: team.logoColor}}></div>
                                                                    <div>
                                                                        <div className="font-bold text-white group-hover:text-brand-brightGreen transition-colors">{team.name}</div>
                                                                        <div className="text-xs text-gray-500">{team.principal}</div>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td className="p-4 text-gray-400 hidden md:table-cell font-mono text-sm">{team.car}</td>
                                                            {series === SeriesId.GT_WORLD_CHALLENGE && (
                                                                <td className="p-4 text-gray-400 text-xs uppercase">
                                                                    <span className="bg-white/10 px-2 py-1 rounded">{team.category}</span>
                                                                </td>
                                                            )}
                                                            <td className="p-4 text-right font-display font-bold text-white">{team.points || 0}</td>
                                                        </tr>
                                                    )) : (
                                                        <tr><td colSpan={5} className="p-8 text-center text-gray-500">No standings data available for this category.</td></tr>
                                                    )}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'teams' && (
                                <div className="animate-in fade-in slide-in-from-bottom-8 duration-500 relative">
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                        {filteredTeams.length === 0 ? (
                                            <div className="col-span-2 text-center py-20 text-gray-500">
                                                <Users size={48} className="mx-auto mb-4 opacity-50"/>
                                                <p>Team data currently unavailable for this filter.</p>
                                            </div>
                                        ) : (
                                            filteredTeams.map((team, idx) => (
                                                <div key={idx} className="group relative bg-dark-800 rounded-2xl overflow-hidden border border-white/5 hover:border-white/20 transition-all duration-300 hover:shadow-2xl flex flex-col">
                                                     {/* Colored Accent Line */}
                                                     <div className="h-1 w-full shadow-[0_0_15px_currentColor]" style={{ backgroundColor: team.logoColor, color: team.logoColor }}></div>
                                                     
                                                     <div className="relative h-56 overflow-hidden">
                                                        <img src={team.image} alt={team.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 hover:opacity-100" />
                                                        <div className="absolute inset-0 bg-gradient-to-t from-dark-800 via-dark-800/40 to-transparent"></div>
                                                        
                                                        {/* Team Logo Overlay */}
                                                        {team.logo && (
                                                            <div className="absolute top-4 right-4 bg-white/90 p-2 rounded-lg shadow-lg backdrop-blur-sm max-w-[80px] h-[50px] flex items-center justify-center">
                                                                <img src={team.logo} alt={`${team.name} Logo`} className="max-w-full max-h-full object-contain" />
                                                            </div>
                                                        )}
                                                        
                                                        {/* Category Badge */}
                                                        {team.category && (
                                                            <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-2 py-1 rounded text-xs font-bold uppercase text-white border border-white/20">
                                                                {team.category}
                                                            </div>
                                                        )}

                                                        <div className="absolute bottom-4 left-6 right-6">
                                                            <div className="flex justify-between items-end">
                                                                <div>
                                                                    <h3 className="text-4xl font-display font-bold text-white italic tracking-tighter drop-shadow-md">{team.name}</h3>
                                                                    <p className="text-sm text-gray-300 flex items-center gap-1"><MapPin size={12}/> {team.base}</p>
                                                                </div>
                                                                <div className="text-right">
                                                                    <p className="text-xs text-gray-400 uppercase font-bold tracking-wider">Chassis</p>
                                                                    <p className="text-xl font-bold font-mono text-white">{team.car}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                     </div>

                                                     <div className="p-6 flex-grow flex flex-col justify-between bg-dark-800">
                                                         <div className="mb-4">
                                                            <div className="flex items-center gap-2 mb-4 bg-white/5 p-3 rounded-lg border border-white/5">
                                                                <Trophy size={16} className="text-yellow-500" />
                                                                <div>
                                                                    <p className="text-xs text-gray-500 uppercase font-bold">Team Principal</p>
                                                                    <p className="text-white font-bold">{team.principal}</p>
                                                                </div>
                                                            </div>
                                                            
                                                            {/* Team History Section */}
                                                            {team.history && (
                                                                <div className="mb-4">
                                                                    <p className="text-xs text-gray-500 uppercase font-bold mb-1 flex items-center gap-1"><Globe size={10} /> Heritage</p>
                                                                    <p className="text-xs text-gray-400 leading-relaxed line-clamp-3 hover:line-clamp-none transition-all">{team.history}</p>
                                                                </div>
                                                            )}
                                                         </div>

                                                         <div className="space-y-3">
                                                             <p className="text-xs text-gray-500 uppercase font-bold border-b border-white/10 pb-2 flex items-center gap-2">
                                                                <Users size={12} /> Official Drivers <span className="text-[10px] text-brand-brightGreen ml-auto font-normal normal-case">Click driver for profile</span>
                                                             </p>
                                                             <div className="grid grid-cols-2 gap-3">
                                                                {team.drivers.map((driver, dIdx) => (
                                                                    <div 
                                                                        key={dIdx} 
                                                                        onClick={() => setSelectedDriver(driver)}
                                                                        className="flex items-center gap-3 group/driver p-2.5 rounded-xl bg-dark-900 border border-white/5 hover:border-brand-brightGreen/50 cursor-pointer transition-all hover:bg-white/5"
                                                                    >
                                                                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center font-display font-bold text-lg text-white group-hover/driver:text-brand-brightGreen transition-colors border border-white/10 shrink-0">
                                                                            {driver.number}
                                                                        </div>
                                                                        <div className="overflow-hidden">
                                                                            <span className="block font-bold text-white truncate text-sm group-hover/driver:text-brand-brightGreen transition-colors">{driver.name}</span>
                                                                            <span className="flex items-center gap-1 text-[10px] font-mono text-gray-500 uppercase">
                                                                                <Flag size={8} /> {driver.nationality}
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                ))}
                                                             </div>
                                                         </div>
                                                     </div>
                                                </div>
                                            ))
                                        )}
                                    </div>
                                    
                                    {/* Driver Stats Modal (Same as before) */}
                                    {selectedDriver && (
                                        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                                            <div 
                                                className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                                                onClick={() => setSelectedDriver(null)}
                                            ></div>
                                            <div className="relative bg-dark-800 border border-white/10 w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col md:flex-row max-h-[90vh] md:max-h-none overflow-y-auto md:overflow-visible">
                                                <div className={`absolute top-0 left-0 w-full h-1 bg-brand-brightGreen md:hidden`}></div>
                                                <button 
                                                    onClick={() => setSelectedDriver(null)}
                                                    className="absolute top-4 right-4 text-gray-400 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors z-10 bg-black/20 backdrop-blur-md"
                                                >
                                                    <X size={20} />
                                                </button>

                                                {/* Driver Image Section */}
                                                <div className="w-full md:w-5/12 relative min-h-[300px] md:min-h-full bg-dark-900">
                                                    {selectedDriver.image ? (
                                                        <img 
                                                            src={selectedDriver.image} 
                                                            alt={selectedDriver.name} 
                                                            className="absolute inset-0 w-full h-full object-cover"
                                                        />
                                                    ) : (
                                                        <div className="absolute inset-0 flex items-center justify-center text-dark-700">
                                                            <Users size={64} className="opacity-20" />
                                                        </div>
                                                    )}
                                                    <div className="absolute inset-0 bg-gradient-to-t from-dark-800 via-transparent to-transparent md:bg-gradient-to-r"></div>
                                                    
                                                    {/* Number overlay on image */}
                                                    <div className="absolute bottom-4 left-4 font-display font-bold text-6xl text-white/10 drop-shadow-md">
                                                        {selectedDriver.number}
                                                    </div>
                                                </div>

                                                <div className="flex-1 p-8 relative">
                                                    <div className="mb-8">
                                                         <div className="flex items-baseline gap-3 mb-2">
                                                            <h3 className="text-3xl font-display font-bold text-white leading-none">{selectedDriver.name}</h3>
                                                            <span className="text-2xl font-display text-brand-brightGreen">#{selectedDriver.number}</span>
                                                         </div>
                                                         <div className="flex items-center gap-2 text-gray-400 font-mono text-sm uppercase">
                                                             <Flag size={14} /> {selectedDriver.nationality}
                                                         </div>
                                                    </div>

                                                    <div className="grid grid-cols-3 gap-3 mb-8">
                                                        <div className="bg-dark-900/50 p-4 rounded-xl border border-white/5 text-center group hover:border-brand-brightGreen/30 transition-colors">
                                                            <div className="text-[10px] text-gray-500 uppercase font-bold mb-1 tracking-wider">Titles</div>
                                                            <div className="text-2xl font-display font-bold text-white group-hover:text-brand-brightGreen transition-colors">{selectedDriver.stats?.titles ?? 0}</div>
                                                        </div>
                                                        <div className="bg-dark-900/50 p-4 rounded-xl border border-white/5 text-center group hover:border-brand-brightGreen/30 transition-colors">
                                                            <div className="text-[10px] text-gray-500 uppercase font-bold mb-1 tracking-wider">Wins</div>
                                                            <div className="text-2xl font-display font-bold text-white group-hover:text-brand-brightGreen transition-colors">{selectedDriver.stats?.wins ?? 0}</div>
                                                        </div>
                                                        <div className="bg-dark-900/50 p-4 rounded-xl border border-white/5 text-center group hover:border-brand-brightGreen/30 transition-colors">
                                                            <div className="text-[10px] text-gray-500 uppercase font-bold mb-1 tracking-wider">Podiums</div>
                                                            <div className="text-2xl font-display font-bold text-white group-hover:text-brand-brightGreen transition-colors">{selectedDriver.stats?.podiums ?? 0}</div>
                                                        </div>
                                                    </div>

                                                    <div className="space-y-3">
                                                        <h4 className="text-xs font-bold text-brand-brightGreen uppercase tracking-widest flex items-center gap-2 mb-2">
                                                            Driver Biography
                                                        </h4>
                                                        <p className="text-gray-300 text-sm leading-relaxed border-l-2 border-white/5 pl-4 text-justify">
                                                            {selectedDriver.bio || "Bio unavailable for this driver."}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}

                            {activeTab === 'news' && newsData && (
                                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-500">
                                    {newsData.news.length === 0 ? (
                                        <div className="text-center text-gray-500 py-10">
                                            <p>No news available. Ensure the local RSS server is running on port 3000.</p>
                                        </div>
                                    ) : (
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            {newsData.news.map((item, idx) => (
                                                <div key={idx} className="group relative bg-dark-800/80 backdrop-blur-sm border border-white/5 p-6 rounded-2xl hover:bg-dark-700/80 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/50 overflow-hidden">
                                                    <div className={`absolute top-0 left-0 w-1 h-full ${getSeriesBg()} opacity-0 group-hover:opacity-100 transition-opacity`}></div>
                                                    <div className="flex justify-between items-start mb-3">
                                                        <span className="text-xs font-bold uppercase tracking-wider text-gray-500 bg-black/30 px-2 py-1 rounded">{item.source}</span>
                                                        <span className="text-xs text-gray-500 font-mono">{item.date}</span>
                                                    </div>
                                                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-brand-brightGreen transition-colors">{item.title}</h3>
                                                    <p className="text-gray-300 text-sm leading-relaxed mb-4 line-clamp-3 group-hover:text-gray-200">{item.summary}</p>
                                                    {item.url && (
                                                         <a href={item.url} target="_blank" rel="noreferrer" className="text-xs text-gray-400 group-hover:text-white flex items-center gap-1 uppercase font-bold tracking-wide transition-colors">
                                                             Read Full Story <ExternalLink size={12} className="group-hover:translate-x-1 transition-transform" />
                                                         </a>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                    
                                    {newsData.sources.length > 0 && (
                                        <div className="mt-8 pt-6 border-t border-white/5">
                                            <h4 className="text-sm font-semibold text-gray-400 mb-3 flex items-center gap-2"><Zap size={14} className="text-yellow-400" /> AI Grounding Sources</h4>
                                            <div className="flex flex-wrap gap-2">
                                                {newsData.sources.map((source, i) => (
                                                    source.web ? (
                                                        <a key={i} href={source.web.uri} target="_blank" rel="noreferrer" className="text-xs bg-dark-800 hover:bg-dark-700 text-gray-400 px-3 py-1 rounded-full border border-white/5 truncate max-w-[200px] flex items-center gap-1 transition-colors">
                                                            <ExternalLink size={10} /> {source.web.title}
                                                        </a>
                                                    ) : null
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}

                            {activeTab === 'analysis' && analysisData && (
                                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-500">
                                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                        <div className="lg:col-span-2 bg-dark-800/80 backdrop-blur-md p-6 rounded-2xl border border-white/5 shadow-xl">
                                            <div className="flex justify-between items-center mb-6">
                                                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                                                    <Activity className="text-brand-red animate-pulse" /> Live Telemetry Stream
                                                </h3>
                                                <span className="text-xs font-mono text-brand-brightGreen animate-pulse">● LIVE DATA</span>
                                            </div>
                                            
                                            <div className="h-[350px] w-full">
                                                <ResponsiveContainer width="100%" height="100%">
                                                    <AreaChart data={liveTelemetry}>
                                                        <defs>
                                                            <linearGradient id="colorSpeed" x1="0" y1="0" x2="0" y2="1">
                                                                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.4}/>
                                                                <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                                                            </linearGradient>
                                                            <linearGradient id="colorRpm" x1="0" y1="0" x2="0" y2="1">
                                                                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4}/>
                                                                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                                                            </linearGradient>
                                                        </defs>
                                                        <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                                                        <XAxis dataKey="time" hide />
                                                        <YAxis yAxisId="left" stroke="#ef4444" fontSize={10} domain={['auto', 'auto']} tickFormatter={(v) => `${Math.round(v)} km/h`} />
                                                        <YAxis yAxisId="right" orientation="right" stroke="#3b82f6" fontSize={10} domain={['auto', 'auto']} tickFormatter={(v) => `${Math.round(v/1000)}k rpm`} />
                                                        <Tooltip 
                                                            contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', borderColor: '#333', color: '#fff', borderRadius: '8px', backdropFilter: 'blur(4px)' }}
                                                            itemStyle={{ color: '#fff', fontWeight: 'bold' }}
                                                            labelStyle={{ display: 'none' }}
                                                        />
                                                        <Area 
                                                            type="monotone" 
                                                            yAxisId="left" 
                                                            dataKey="speed" 
                                                            stroke="#ef4444" 
                                                            strokeWidth={3}
                                                            fillOpacity={1} 
                                                            fill="url(#colorSpeed)" 
                                                            name="Speed" 
                                                            isAnimationActive={false} // Disable internal animation for smooth updates
                                                        />
                                                        <Area 
                                                            type="monotone" 
                                                            yAxisId="right" 
                                                            dataKey="rpm" 
                                                            stroke="#3b82f6" 
                                                            strokeWidth={2}
                                                            fillOpacity={1} 
                                                            fill="url(#colorRpm)" 
                                                            name="RPM" 
                                                            isAnimationActive={false}
                                                        />
                                                    </AreaChart>
                                                </ResponsiveContainer>
                                            </div>
                                        </div>

                                        <div className="space-y-6">
                                            <div className="bg-dark-800/80 backdrop-blur-md p-6 rounded-2xl border border-white/5 h-full">
                                                <h3 className="text-lg font-bold text-white mb-4">Track DNA</h3>
                                                <div className="flex items-start gap-4 mb-6">
                                                    <div className="p-3 bg-white/5 rounded-full">
                                                        <MapPin className="text-brand-brightGreen" size={24} />
                                                    </div>
                                                    <p className="text-gray-300 text-sm leading-relaxed">{analysisData.trackConditions}</p>
                                                </div>
                                                
                                                <h3 className="text-lg font-bold text-white mb-4 border-t border-white/10 pt-4">Key Factors</h3>
                                                <ul className="space-y-3">
                                                    {analysisData.keyFactors.map((factor, idx) => (
                                                        <li key={idx} className="flex items-center gap-3 text-sm text-gray-300 p-2 rounded-lg hover:bg-white/5 transition-colors">
                                                            <span className={`w-2 h-2 rounded-full ${getSeriesBg()} shadow-[0_0_10px_currentColor]`}></span>
                                                            {factor}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className={`bg-gradient-to-r ${getSeriesGradient()} p-[1px] rounded-2xl`}>
                                        <div className="bg-dark-900/90 backdrop-blur-xl p-8 rounded-2xl">
                                            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                                                <Brain className="text-brand-brightGreen" /> AI Technical Insight
                                            </h3>
                                            <p className="text-gray-200 leading-relaxed text-lg font-light border-l-4 border-brand-brightGreen pl-6">
                                                "{analysisData.technicalInsight}"
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'prediction' && predictionData && (
                                <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-500">
                                    <div className="relative group">
                                        <div className={`absolute -inset-1 rounded-2xl bg-gradient-to-r ${getSeriesGradient()} opacity-50 blur group-hover:opacity-100 transition duration-1000`}></div>
                                        <div className="relative bg-dark-900 border border-white/10 p-10 rounded-2xl overflow-hidden">
                                            {/* Background decoration */}
                                            <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                                                <Brain size={200} />
                                            </div>
                                            
                                            <div className="relative z-10 text-center mb-10">
                                                <span className="inline-block py-1.5 px-4 rounded-full bg-white/10 text-xs font-bold uppercase tracking-widest text-brand-brightGreen mb-6 border border-brand-brightGreen/20">
                                                    Gemini Model Confidence
                                                </span>
                                                <h2 className="text-5xl md:text-7xl font-display font-bold text-white mb-4 drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">
                                                    {predictionData.winner}
                                                </h2>
                                                <div className="flex flex-col items-center justify-center gap-3 text-sm text-gray-400 mt-4">
                                                    <div className="w-64 h-3 bg-dark-700 rounded-full overflow-hidden relative">
                                                        <div 
                                                            className={`h-full ${getSeriesBg()} shadow-[0_0_10px_currentColor] transition-all duration-1000 ease-out`} 
                                                            style={{ width: `${predictionData.confidence}%` }}
                                                        ></div>
                                                    </div>
                                                    <span className="text-brand-brightGreen font-bold font-mono">{predictionData.confidence}% PROBABILITY</span>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-3 gap-4 border-t border-white/10 pt-10">
                                                <div className="text-center transform translate-y-4">
                                                    <div className="text-xs text-gray-500 uppercase font-bold mb-2">2nd Place</div>
                                                    <div className="font-bold text-xl text-gray-300">{predictionData.podium[1] || "N/A"}</div>
                                                </div>
                                                <div className="text-center -mt-6">
                                                    <div className="text-xs text-yellow-500 uppercase font-bold mb-2">Winner</div>
                                                    <div className="font-bold text-3xl text-white">{predictionData.podium[0] || "N/A"}</div>
                                                    <div className="w-12 h-1 bg-yellow-500 mx-auto mt-2 rounded-full shadow-[0_0_10px_rgba(234,179,8,0.5)]"></div>
                                                </div>
                                                <div className="text-center transform translate-y-4">
                                                    <div className="text-xs text-gray-500 uppercase font-bold mb-2">3rd Place</div>
                                                    <div className="font-bold text-xl text-gray-300">{predictionData.podium[2] || "N/A"}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-dark-800/50 p-8 rounded-2xl border border-white/5 backdrop-blur-sm">
                                        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                                            <div className="p-2 bg-purple-500/10 rounded-lg">
                                                <Brain size={20} className="text-purple-400" />
                                            </div>
                                            Strategic Reasoning
                                        </h3>
                                        <p className="text-gray-300 leading-relaxed text-lg font-light">
                                            {predictionData.reasoning}
                                        </p>
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;