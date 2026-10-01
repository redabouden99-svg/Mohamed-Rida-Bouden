import React, { useState, useEffect, useRef } from 'react';
import { SeriesId, NewsItem } from '../types';
import { getLatestNews } from '../services/newsService';
import { ExternalLink, Loader2, BookOpen, Clock, Calendar, Sparkles } from 'lucide-react';
import NewsReaderModal from './NewsReaderModal';

const QuickNews: React.FC = () => {
    const [selectedSeries, setSelectedSeries] = useState<SeriesId>(SeriesId.F1);
    const [news, setNews] = useState<NewsItem[]>([]);
    const [loading, setLoading] = useState(false);
    const [activeArticle, setActiveArticle] = useState<NewsItem | null>(null);
    
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
        const intervalId = setInterval(fetchNews, 600000); // 10 mins
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
        if (val === 'dtm') series = SeriesId.DTM;
        
        setSelectedSeries(series);
    };

    return (
        <section className="py-16 bg-dark-900 border-t border-white/10" id="latest-news">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
                    <div>
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-bold font-mono uppercase tracking-wider text-brand-brightGreen mb-2">
                            <Sparkles className="w-3.5 h-3.5" />
                            <span>Official Verified News Desk</span>
                        </div>
                        <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-wide uppercase">
                            Latest Official News & Articles
                        </h2>
                    </div>
                    
                    {/* Series Dropdown Filter */}
                    <div className="relative">
                        <select 
                            id="series" 
                            onChange={handleSeriesChange}
                            className="appearance-none bg-dark-800 text-white border border-white/20 hover:border-brand-brightGreen px-5 py-2.5 pr-10 rounded-2xl shadow-xl leading-tight focus:outline-none transition-all font-bold text-sm cursor-pointer"
                            defaultValue="f1"
                        >
                            <option value="f1">Formula 1</option>
                            <option value="motogp">MotoGP</option>
                            <option value="wec">WEC Hypercar</option>
                            <option value="imsa">IMSA SportsCar</option>
                            <option value="gtwc">GT World Challenge</option>
                            <option value="dtm">DTM Masters</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-white">
                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                        </div>
                    </div>
                </div>

                {/* News Grid Area */}
                <div className="min-h-[220px]">
                    {loading ? (
                        <div className="flex justify-center items-center h-48">
                            <Loader2 className="w-8 h-8 text-brand-brightGreen animate-spin" />
                            <span className="mr-3 text-gray-400 font-bold font-mono">جاري جلب أحدث المقالات والأخبار الرسمية...</span>
                        </div>
                    ) : news.length === 0 ? (
                        <div className="text-center text-gray-500 py-12">
                            <p>لا توجد مقالات متوفرة حالياً لهذه البطولة.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {news.map((item, idx) => (
                                <article 
                                    key={idx} 
                                    onClick={() => setActiveArticle(item)}
                                    className="bg-dark-800 border border-white/10 rounded-3xl overflow-hidden hover:border-brand-red/50 transition-all duration-300 hover:-translate-y-1.5 shadow-xl flex flex-col justify-between cursor-pointer group"
                                >
                                    {/* Cover Image */}
                                    {item.image && (
                                        <div className="relative h-48 w-full overflow-hidden bg-dark-900">
                                            <img 
                                                src={item.image} 
                                                alt={item.title} 
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-dark-800 via-transparent to-transparent" />
                                            <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10 text-[10px] font-bold text-gray-200">
                                                {item.source}
                                            </div>
                                        </div>
                                    )}

                                    <div className="p-6 flex-grow flex flex-col justify-between">
                                        <div>
                                            <div className="flex items-center justify-between text-xs text-gray-400 font-mono mb-2">
                                                <span className="text-brand-brightGreen font-bold uppercase tracking-wider">{item.category || selectedSeries}</span>
                                                <span className="flex items-center gap-1">
                                                    <Calendar className="w-3 h-3" />
                                                    {item.date}
                                                </span>
                                            </div>

                                            <h3 className="text-lg font-bold text-white mb-2.5 group-hover:text-brand-brightGreen transition-colors line-clamp-2 leading-snug">
                                                {item.title}
                                            </h3>

                                            <p className="text-gray-400 text-xs sm:text-sm leading-relaxed mb-4 line-clamp-3">
                                                {item.summary}
                                            </p>
                                        </div>

                                        <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                                            <span className="inline-flex items-center gap-1.5 text-xs text-brand-red font-bold group-hover:underline">
                                                <BookOpen className="w-3.5 h-3.5" />
                                                <span>قراءة المقال كاملاً</span>
                                            </span>

                                            <a 
                                                href={item.url} 
                                                target="_blank" 
                                                rel="noopener noreferrer" 
                                                onClick={(e) => e.stopPropagation()}
                                                className="inline-flex items-center gap-1 text-[11px] text-gray-400 hover:text-white transition-colors font-mono"
                                                title="فتح في الموقع الرسمي"
                                            >
                                                <span>المصدر</span>
                                                <ExternalLink className="w-3 h-3" />
                                            </a>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* In-Depth Article Reader Modal */}
            <NewsReaderModal 
                article={activeArticle} 
                onClose={() => setActiveArticle(null)} 
            />
        </section>
    );
};

export default QuickNews;
