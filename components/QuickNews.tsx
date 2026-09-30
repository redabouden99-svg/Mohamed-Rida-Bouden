import React, { useState, useEffect, useRef } from 'react';
import { SeriesId, NewsItem } from '../types';
import { getLatestNews } from '../services/newsService';
import { ExternalLink, Loader2 } from 'lucide-react';

const QuickNews: React.FC = () => {
    const [selectedSeries, setSelectedSeries] = useState<SeriesId>(SeriesId.F1);
    const [news, setNews] = useState<NewsItem[]>([]);
    const [loading, setLoading] = useState(false);
    
    const isMounted = useRef(true);

    useEffect(() => {
        isMounted.current = true;
        return () => { isMounted.current = false; };
    }, []);

    useEffect(() => {
        const fetchNews = async () => {
            setLoading(true);
            try {
                const data = await getLatestNews(selectedSeries);
                if (isMounted.current) {
                    setNews(data.news);
                }
            } catch (error) {
                console.error("Error fetching news:", error);
            } finally {
                if (isMounted.current) {
                    setLoading(false);
                }
            }
        };

        fetchNews();

        // Auto-refresh every 10 minutes (600,000 ms) as per requirement
        const intervalId = setInterval(fetchNews, 600000);

        return () => clearInterval(intervalId);
    }, [selectedSeries]);

    const handleSeriesChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const val = e.target.value;
        let series: SeriesId = SeriesId.F1;
        if (val === 'f1') series = SeriesId.F1;
        if (val === 'motogp') series = SeriesId.MOTOGP;
        if (val === 'wec') series = SeriesId.WEC;
        if (val === 'imsa') series = SeriesId.IMSA;
        if (val === 'gtwc') series = SeriesId.GT_WORLD_CHALLENGE;
        
        setSelectedSeries(series);
    };

    return (
        <section className="py-12 bg-dark-800 border-t border-white/5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                    <h2 className="text-3xl font-display font-bold text-white">Latest Official News</h2>
                    
                    <div className="relative">
                        <select 
                            id="series" 
                            onChange={handleSeriesChange}
                            className="appearance-none bg-dark-900 text-white border border-white/20 hover:border-brand-brightGreen px-4 py-2 pr-8 rounded-lg shadow leading-tight focus:outline-none focus:shadow-outline transition-colors"
                            defaultValue="f1"
                        >
                            <option value="f1">Formula 1</option>
                            <option value="motogp">MotoGP</option>
                            <option value="wec">WEC</option>
                            <option value="imsa">IMSA</option>
                            <option value="gtwc">GT World Challenge</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-white">
                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                        </div>
                    </div>
                </div>

                <div id="news-container" className="min-h-[200px]">
                    {loading ? (
                        <div className="flex justify-center items-center h-40">
                            <Loader2 className="w-8 h-8 text-brand-brightGreen animate-spin" />
                            <span className="ml-2 text-gray-400">Loading official news...</span>
                        </div>
                    ) : news.length === 0 ? (
                        <div className="text-center text-gray-500 py-10">
                             <p>No news available. Ensure the local RSS server is running.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {news.map((item, idx) => (
                                <div key={idx} className="bg-dark-900 border border-white/5 p-5 rounded-xl hover:bg-dark-700 transition-colors group">
                                    <div className="flex justify-between items-start mb-2">
                                        <span className="text-xs font-bold uppercase tracking-wider text-brand-brightGreen opacity-80">{selectedSeries}</span>
                                        <span className="text-xs text-gray-500">{item.date}</span>
                                    </div>
                                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-brand-brightGreen transition-colors line-clamp-2">{item.title}</h3>
                                    <p className="text-gray-400 text-sm mb-4 line-clamp-3">{item.summary}</p>
                                    <a href={item.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-xs text-white hover:text-brand-brightGreen transition-colors uppercase font-bold tracking-wide">
                                        Read from official site <ExternalLink size={10} />
                                    </a>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default QuickNews;