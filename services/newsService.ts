import { SeriesId, NewsItem, GroundingSource } from "../types";

// Use relative URL for client requests
const API_URL = "/api/news";

const SERIES_MAP: Record<SeriesId, string> = {
    [SeriesId.F1]: 'f1',
    [SeriesId.MOTOGP]: 'motogp',
    [SeriesId.WEC]: 'wec',
    [SeriesId.IMSA]: 'imsa',
    [SeriesId.GT_WORLD_CHALLENGE]: 'gtwc'
};

const getFallbackNews = (series: SeriesId): NewsItem[] => {
    const date = new Date().toLocaleDateString();
    switch (series) {
        case SeriesId.F1:
            return [
                { title: "Norris and Verstappen battle intensifies in 2026", summary: "McLaren and Red Bull push technological boundaries as Lewis Hamilton continues his podium pursuit with Ferrari.", source: "Fallback Feed", url: "https://www.formula1.com", date },
                { title: "Ferrari unveils next-gen aerodynamic package", summary: "The Scuderia brings significant updates to the SF-26 floor to combat tire degradation at high-speed circuits.", source: "Fallback Feed", url: "https://www.formula1.com", date },
                { title: "Hamilton praises Maranello team morale", summary: "Lewis Hamilton praises Ferrari's relentless development push and seamless cockpit ergonomics.", source: "Fallback Feed", url: "https://www.formula1.com", date }
            ];
        case SeriesId.MOTOGP:
            return [
                { title: "Bagnaia and Marc Márquez duel on Factory Ducatis", summary: "Pecco Bagnaia and Marc Márquez push the Desmosedici GP26 to unprecedented lap records in 2026.", source: "Fallback Feed", url: "https://www.motogp.com", date },
                { title: "Marc Márquez triumphs in European rounds", summary: "Marc Márquez continues his electrifying form on the factory Ducati Lenovo GP26 machine.", source: "Fallback Feed", url: "https://www.motogp.com", date }
            ];
        case SeriesId.GT_WORLD_CHALLENGE:
            return [
                { title: "Team WRT confirms driver lineup for 2026", summary: "The Belgian squad announces a star-studded lineup including Valentino Rossi and Dries Vanthoor for the 2026 season.", source: "Fallback Feed", url: "https://www.gt-world-challenge-europe.com/", date },
                { title: "Ferrari 296 GT3 tops Spa 24H tests", summary: "AF Corse tops the timing sheets at Spa-Francorchamps during the official 2026 pre-season tests.", source: "Fallback Feed", url: "https://www.gt-world-challenge-europe.com/", date }
            ];
        default:
            return [
                {
                    title: "Live News Temporarily Unavailable",
                    summary: "We couldn't connect to the local news server. Please ensure 'node bot.js' is running on port 3001.",
                    source: "System",
                    url: "#",
                    date
                }
            ];
    }
};

export const getLatestNews = async (series: SeriesId): Promise<{ news: NewsItem[], sources: GroundingSource[] }> => {
    try {
        const key = SERIES_MAP[series];
        // Add a timeout to the fetch to fail fast if server is down or busy
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 seconds timeout for UI responsiveness

        const res = await fetch(`${API_URL}/${key}`, { signal: controller.signal });
        clearTimeout(timeoutId);
        
        if (!res.ok) {
            // Server responded but with error
            console.warn(`News API returned ${res.status}: ${res.statusText}`);
            return { news: getFallbackNews(series), sources: [] };
        }
        
        const data = await res.json();
        
        if (!Array.isArray(data) || data.length === 0) {
             return { news: getFallbackNews(series), sources: [] };
        }

        const news: NewsItem[] = data.map((item: any) => ({
            title: item.title,
            summary: item.summary || "No summary available",
            source: "Motorsport.com",
            url: item.link,
            date: item.date ? new Date(item.date).toLocaleDateString() : 'Recent'
        }));

        return { news, sources: [] };
    } catch (error) {
        // Suppress 'Failed to fetch' noise in console if it's just local dev server missing
        console.log("News server unreachable, using fallback data.");
        return { news: getFallbackNews(series), sources: [] };
    }
}