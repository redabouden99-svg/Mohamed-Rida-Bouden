export enum SeriesId {
    F1 = 'Formula 1',
    MOTOGP = 'MotoGP',
    WEC = 'WEC',
    IMSA = 'IMSA',
    GT_WORLD_CHALLENGE = 'GT World Challenge'
}

export interface NewsItem {
    title: string;
    summary: string;
    source: string;
    url: string;
    date: string;
}

export interface Prediction {
    winner: string;
    podium: string[];
    reasoning: string;
    confidence: number;
}

export interface TelemetryData {
    time: string;
    speed: number;
    throttle: number;
    brake: number;
    rpm: number;
}

export interface AnalysisReport {
    technicalInsight: string;
    keyFactors: string[];
    trackConditions: string;
}

export interface GroundingSource {
    web?: {
        uri: string;
        title: string;
    };
    maps?: {
        uri: string;
        title: string;
    };
}

// New Types for Teams Feature
export interface DriverStats {
    titles: number;
    wins: number;
    podiums: number;
}

export interface Driver {
    name: string;
    number: number;
    nationality: string;
    image?: string;
    stats: DriverStats;
    bio: string;
}

export interface Team {
    id: string;
    name: string;
    fullName: string;
    principal: string;
    base: string;
    car: string;
    drivers: Driver[];
    logoColor: string; // CSS color for borders/accents
    image: string; // Car or team cover image
    logo: string; // Official Team Logo URL
    // New Fields
    history: string; // Historical overview
    points: number; // Championship points
    rank: number; // Current standing
    category?: string; // e.g., "Hypercar", "LMGT3", "GTP", "GTD", "Europe", "Asia"
}

export interface CustomArticle {
    id: string;
    title: string;
    summary: string;
    series: string;
    source: string;
    url: string;
    date: string;
}

export interface SiteContent {
    heroTitle: string;
    heroTitleHighlight: string;
    heroSubtitle: string;
    heroBgImage: string;
    announcementActive: boolean;
    announcementText: string;
    announcementType: 'info' | 'breaking' | 'warning' | 'success';
    announcementLink?: string;
    customNews: CustomArticle[];
}
