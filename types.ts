export enum SeriesId {
    F1 = 'Formula 1',
    MOTOGP = 'MotoGP',
    WEC = 'WEC',
    IMSA = 'IMSA',
    GT_WORLD_CHALLENGE = 'GT World Challenge',
    DTM = 'DTM'
}

export interface NewsItem {
    id?: string;
    title: string;
    summary: string;
    content?: string;
    source: string;
    url: string;
    date: string;
    image?: string;
    category?: string;
    author?: string;
    readTime?: string;
    tags?: string[];
}

export interface MediaOverrides {
    championshipLogos?: Record<string, string>;
    championshipImages?: Record<string, string>;
    teamLogos?: Record<string, string>;
    teamImages?: Record<string, string>;
    driverImages?: Record<string, string>;
    heroBgImage?: string;
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
    // Extended 2026 Motorsport Details
    history: string; // Historical overview
    points: number; // Championship points
    rank: number; // Current standing
    category?: string; // e.g., "Hypercar", "LMGT3", "GTP", "GTD", "Europe", "Asia"
    engine?: string; // Power Unit / Engine specs
    chassis?: string; // Detailed chassis information
    sponsors?: string[]; // Key official sponsors
    technicalDirector?: string; // Technical director / chief engineer
    firstEntry?: string; // Debut year in the championship
    worldChampionships?: number; // Total championships won
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

// ==================== AUTOMATED BOT & RESULTS TYPES ====================
export interface ChampionshipBot {
    name: string;
    series: SeriesId;
    status: 'active' | 'syncing' | 'idle';
    lastSynced: string;
    syncCount: number;
    feedSource: string;
    pingMs: number;
}

export interface RaceResultEntry {
    pos: number;
    driver: string;
    number: number;
    team: string;
    laps: number;
    time: string;
    gap: string;
    points: number;
    fastestLap?: boolean;
    status?: string;
    grid?: number;
}

export interface QualifyingResultEntry {
    pos: number;
    driver: string;
    number: number;
    team: string;
    q1?: string;
    q2?: string;
    q3?: string;
    bestLap: string;
    gap: string;
}

export interface DriverStandingEntry {
    pos: number;
    driver: string;
    nationality: string;
    team: string;
    points: number;
    wins: number;
    podiums: number;
}

export interface TeamStandingEntry {
    pos: number;
    team: string;
    points: number;
    wins: number;
    engine?: string;
}

export interface ChampionshipEventInfo {
    round: number;
    totalRounds: number;
    eventName: string;
    circuit: string;
    location: string;
    date: string;
    status: 'Completed' | 'Upcoming' | 'In Progress';
}

export interface SeriesResultsData {
    series: SeriesId;
    bot: ChampionshipBot;
    event: ChampionshipEventInfo;
    raceResults: RaceResultEntry[];
    qualifyingResults: QualifyingResultEntry[];
    driverStandings: DriverStandingEntry[];
    teamStandings: TeamStandingEntry[];
}

export interface UserProfile {
    id: string;
    username: string;
    email: string;
    avatar?: string;
    createdAt: string;
    favoriteTeams: string[];
    favoriteDrivers: string[];
    notificationsEnabled: boolean;
}

export interface HistoricalSeasonStandings {
    season: number;
    series: SeriesId;
    driverStandings: DriverStandingEntry[];
    teamStandings: TeamStandingEntry[];
    championDriver: string;
    championTeam: string;
    seasonSummary: string;
}

export interface AdminAnalytics {
    totalPageViews: number;
    liveVisitors: number;
    totalRegisteredUsers: number;
    seriesViews: Record<string, number>;
    recentLogins: { username: string; timestamp: string; ip?: string }[];
    apiCallsCount: number;
}

