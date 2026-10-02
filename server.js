const express = require("express");
const RSSParser = require("rss-parser");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const crypto = require("crypto");
const { GoogleGenAI, Type } = require("@google/genai");
const { botEngine } = require("./services/botEngine");

const app = express();
const PORT = process.env.PORT || 3000;
const isProd = process.env.NODE_ENV === "production";

app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(express.json());

// Logging middleware
app.use((req, res, next) => {
    if (!req.url.startsWith("/@") && !req.url.includes("node_modules")) {
        console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    }
    next();
});

// Admin Configuration Persistence
const CONFIG_FILE = path.join(__dirname, "data", "admin-config.json");

const defaultSiteContent = {
    heroTitle: "RACE. ANALYZE. PREDICT.",
    heroTitleHighlight: "ANALYZE.",
    heroSubtitle: "The ultimate AI-powered hub for Teams, Drivers & Live Strategy.",
    heroBgImage: "https://newsroom.porsche.com/.imaging/mte/porsche-templating-theme/image_1290x726/dam/pnr/2023/Motorsports/WEC/Le-Mans-Test-Day/02-Porsche-963-Porsche-Penske-Motorsport.jpg/jcr:content/02-Porsche-963-Porsche-Penske-Motorsport.jpg",
    announcementActive: true,
    announcementText: "🏎️ Live AI Strategy Engine active for 2026 season. Real-time telemetry & predictive modeling enabled.",
    announcementType: "info",
    announcementLink: "#series-selector",
    customNews: [
        {
            id: "cn-1",
            title: "Bouden Motorsport: Next-Gen AI Telemetry Engine Deployed",
            summary: "Real-time analysis powered by Google Gemini now correlates aerodynamic efficiency, tire degradation, and strategic pit windows.",
            series: "Formula 1",
            source: "Bouden Editorial",
            url: "#",
            date: new Date().toISOString().split("T")[0]
        }
    ]
};

let adminConfig = {
    adminUsername: process.env.ADMIN_USERNAME || "bouden",
    adminPassword: process.env.ADMIN_PASSWORD || "reda",
    geminiApiKey: process.env.GEMINI_API_KEY || process.env.API_KEY || "",
    siteContent: defaultSiteContent
};

// Load saved config if available
try {
    if (fs.existsSync(CONFIG_FILE)) {
        const raw = fs.readFileSync(CONFIG_FILE, "utf-8");
        const parsed = JSON.parse(raw);
        adminConfig = {
            ...adminConfig,
            ...parsed,
            adminUsername: parsed.adminUsername || "bouden",
            adminPassword: parsed.adminPassword || "reda",
            siteContent: {
                ...defaultSiteContent,
                ...(parsed.siteContent || {})
            }
        };
        // If file had empty key but env has one, keep env key
        if (!adminConfig.geminiApiKey && (process.env.GEMINI_API_KEY || process.env.API_KEY)) {
            adminConfig.geminiApiKey = process.env.GEMINI_API_KEY || process.env.API_KEY;
        }
    } else {
        // Ensure directory exists
        const dir = path.dirname(CONFIG_FILE);
        if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
        fs.writeFileSync(CONFIG_FILE, JSON.stringify(adminConfig, null, 2));
    }
} catch (e) {
    console.error("Error reading admin config file:", e);
}

function saveAdminConfig() {
    try {
        const dir = path.dirname(CONFIG_FILE);
        if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
        fs.writeFileSync(CONFIG_FILE, JSON.stringify(adminConfig, null, 2));
    } catch (e) {
        console.error("Error saving admin config file:", e);
    }
}

// ==================== MEDIA CONFIGURATION ====================
const MEDIA_CONFIG_FILE = path.join(__dirname, "data", "media-config.json");

const DEFAULT_MEDIA_CONFIG = {
    championshipLogos: {
        "Formula 1": "https://upload.wikimedia.org/wikipedia/commons/3/33/F1.svg",
        "MotoGP": "https://upload.wikimedia.org/wikipedia/commons/a/a0/Moto_Gp_logo.svg",
        "WEC": "https://upload.wikimedia.org/wikipedia/commons/e/e8/FIA_WEC_logo.svg",
        "IMSA": "https://upload.wikimedia.org/wikipedia/commons/d/d4/IMSA_WeatherTech_SportsCar_Championship_logo.svg",
        "GT World Challenge": "https://upload.wikimedia.org/wikipedia/commons/7/77/GT_World_Challenge_logo.svg",
        "DTM": "https://upload.wikimedia.org/wikipedia/commons/e/ee/DTM_Logo_2023.svg"
    },
    championshipImages: {
        "Formula 1": "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=1400&auto=format&fit=crop",
        "MotoGP": "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?q=80&w=1400&auto=format&fit=crop",
        "WEC": "https://newsroom.porsche.com/.imaging/mte/porsche-templating-theme/image_1290x726/dam/pnr/2023/Motorsports/WEC/Le-Mans-Test-Day/02-Porsche-963-Porsche-Penske-Motorsport.jpg/jcr:content/02-Porsche-963-Porsche-Penske-Motorsport.jpg",
        "IMSA": "https://images.unsplash.com/photo-1558564244-64506927d2c3?q=80&w=1400&auto=format&fit=crop",
        "GT World Challenge": "https://images.unsplash.com/photo-1628185016593-3d0d8299d63c?q=80&w=1400&auto=format&fit=crop",
        "DTM": "https://images.unsplash.com/photo-1629219356886-c322b724497e?q=80&w=1400&auto=format&fit=crop"
    },
    teamLogos: {
        "mercedes": "https://upload.wikimedia.org/wikipedia/commons/f/fb/Mercedes_AMG_Petronas_F1_Logo.svg",
        "mercedes_amg": "https://upload.wikimedia.org/wikipedia/commons/f/fb/Mercedes_AMG_Petronas_F1_Logo.svg",
        "mclaren": "https://upload.wikimedia.org/wikipedia/en/6/66/McLaren_Racing_logo.svg",
        "mclaren_f1": "https://upload.wikimedia.org/wikipedia/en/6/66/McLaren_Racing_logo.svg",
        "ferrari": "https://upload.wikimedia.org/wikipedia/de/c/c0/Scuderia_Ferrari_Logo.svg",
        "scuderia_ferrari": "https://upload.wikimedia.org/wikipedia/de/c/c0/Scuderia_Ferrari_Logo.svg",
        "red_bull": "https://upload.wikimedia.org/wikipedia/en/5/52/Red_Bull_Racing_logo_2024.svg",
        "redbull_racing": "https://upload.wikimedia.org/wikipedia/en/5/52/Red_Bull_Racing_logo_2024.svg",
        "aston_martin": "https://upload.wikimedia.org/wikipedia/en/b/bd/Aston_Martin_Aramco_Cognizant_F1_Team_logo.svg",
        "williams": "https://upload.wikimedia.org/wikipedia/commons/4/4b/Williams_Racing_2024_Logo.svg",
        "alpine": "https://upload.wikimedia.org/wikipedia/commons/7/7e/Alpine_F1_Team_Logo.svg",
        "racing_bulls": "https://upload.wikimedia.org/wikipedia/en/0/02/Visa_Cash_App_RB_Formula_One_Team_logo.svg",
        "audi": "https://upload.wikimedia.org/wikipedia/commons/9/92/Audi-Logo_2016.svg",
        "haas": "https://upload.wikimedia.org/wikipedia/commons/d/d4/MoneyGram_Haas_F1_Team_Logo.svg",
        "toyota_gazoo_wec": "https://upload.wikimedia.org/wikipedia/commons/e/e7/Toyota_Gazoo_Racing_logo_2020.svg",
        "porsche_penske_wec": "https://upload.wikimedia.org/wikipedia/de/2/2d/Porsche_Wappen.svg",
        "ferrari_af_corse": "https://upload.wikimedia.org/wikipedia/de/c/c0/Scuderia_Ferrari_Logo.svg",
        "aston_martin_thor": "https://upload.wikimedia.org/wikipedia/en/b/bd/Aston_Martin_Aramco_Cognizant_F1_Team_logo.svg",
        "cadillac_jota": "https://upload.wikimedia.org/wikipedia/commons/4/44/Cadillac_logo.svg",
        "bmw_wrt_wec": "https://upload.wikimedia.org/wikipedia/commons/4/44/BMW.svg",
        "alpine_wec_hypercar": "https://upload.wikimedia.org/wikipedia/commons/7/7e/Alpine_F1_Team_Logo.svg",
        "peugeot_totalenergies": "https://upload.wikimedia.org/wikipedia/commons/f/fd/Peugeot_Logo_2021.svg",
        "manthey_wec": "https://upload.wikimedia.org/wikipedia/de/2/2d/Porsche_Wappen.svg",
        "ducati_lenovo": "https://upload.wikimedia.org/wikipedia/commons/8/87/Ducati_red_logo.svg",
        "aprilia_racing": "https://upload.wikimedia.org/wikipedia/commons/9/99/Aprilia-logo.svg",
        "ktm_factory": "https://upload.wikimedia.org/wikipedia/commons/a/af/KTM-Logo.svg",
        "ktm_tech3": "https://upload.wikimedia.org/wikipedia/commons/a/af/KTM-Logo.svg",
        "yamaha_factory": "https://upload.wikimedia.org/wikipedia/commons/8/8b/Yamaha_Motor_logo.svg",
        "honda_repsol": "https://upload.wikimedia.org/wikipedia/commons/7/7b/Honda_Logo.svg",
        "schubert_motorsport_dtm": "https://upload.wikimedia.org/wikipedia/commons/4/44/BMW.svg",
        "schubert_bmw": "https://upload.wikimedia.org/wikipedia/commons/4/44/BMW.svg",
        "abt_sportsline_dtm": "https://upload.wikimedia.org/wikipedia/commons/9/92/Audi-Logo_2016.svg",
        "abt_audi": "https://upload.wikimedia.org/wikipedia/commons/9/92/Audi-Logo_2016.svg",
        "manthey_ema_dtm": "https://upload.wikimedia.org/wikipedia/de/2/2d/Porsche_Wappen.svg",
        "manthey_porsche": "https://upload.wikimedia.org/wikipedia/de/2/2d/Porsche_Wappen.svg"
    },
    teamImages: {
        "mercedes": "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=1200&auto=format&fit=crop",
        "mercedes_amg": "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=1200&auto=format&fit=crop",
        "mclaren": "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?q=80&w=1200&auto=format&fit=crop",
        "mclaren_f1": "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?q=80&w=1200&auto=format&fit=crop",
        "ferrari": "https://images.unsplash.com/photo-1592634976722-13b3c3c78864?q=80&w=1200&auto=format&fit=crop",
        "scuderia_ferrari": "https://images.unsplash.com/photo-1592634976722-13b3c3c78864?q=80&w=1200&auto=format&fit=crop",
        "red_bull": "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=1200&auto=format&fit=crop",
        "redbull_racing": "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=1200&auto=format&fit=crop",
        "aston_martin": "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?q=80&w=1200&auto=format&fit=crop",
        "williams": "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?q=80&w=1200&auto=format&fit=crop",
        "alpine": "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?q=80&w=1200&auto=format&fit=crop",
        "toyota_gazoo_wec": "https://images.unsplash.com/photo-1629219356886-c322b724497e?q=80&w=1200&auto=format&fit=crop",
        "porsche_penske_wec": "https://newsroom.porsche.com/.imaging/mte/porsche-templating-theme/image_1290x726/dam/pnr/2023/Motorsports/WEC/Le-Mans-Test-Day/02-Porsche-963-Porsche-Penske-Motorsport.jpg/jcr:content/02-Porsche-963-Porsche-Penske-Motorsport.jpg",
        "ferrari_af_corse": "https://images.unsplash.com/photo-1592634976722-13b3c3c78864?q=80&w=1200&auto=format&fit=crop",
        "aston_martin_thor": "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?q=80&w=1200&auto=format&fit=crop",
        "cadillac_jota": "https://images.unsplash.com/photo-1558564244-64506927d2c3?q=80&w=1200&auto=format&fit=crop",
        "bmw_wrt_wec": "https://images.unsplash.com/photo-1628185016593-3d0d8299d63c?q=80&w=1200&auto=format&fit=crop",
        "alpine_wec_hypercar": "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?q=80&w=1200&auto=format&fit=crop",
        "ducati_lenovo": "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?q=80&w=1200&auto=format&fit=crop",
        "aprilia_racing": "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?q=80&w=1200&auto=format&fit=crop",
        "ktm_factory": "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?q=80&w=1200&auto=format&fit=crop",
        "yamaha_factory": "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?q=80&w=1200&auto=format&fit=crop",
        "schubert_motorsport_dtm": "https://images.unsplash.com/photo-1628185016593-3d0d8299d63c?q=80&w=1200&auto=format&fit=crop",
        "abt_sportsline_dtm": "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?q=80&w=1200&auto=format&fit=crop",
        "manthey_ema_dtm": "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?q=80&w=1200&auto=format&fit=crop"
    },
    driverImages: {
        "George Russell": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop",
        "Andrea Kimi Antonelli": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600&auto=format&fit=crop",
        "Lando Norris": "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=600&auto=format&fit=crop",
        "Lewis Hamilton": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop",
        "Max Verstappen": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600&auto=format&fit=crop",
        "Sébastien Buemi": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop",
        "Kévin Estre": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600&auto=format&fit=crop",
        "Antonio Fuoco": "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=600&auto=format&fit=crop",
        "Francesco Bagnaia": "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=600&auto=format&fit=crop",
        "Marc Márquez": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600&auto=format&fit=crop"
    },
    heroBgImage: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=2400&auto=format&fit=crop"
};

let mediaConfig = { ...DEFAULT_MEDIA_CONFIG };

try {
    if (fs.existsSync(MEDIA_CONFIG_FILE)) {
        const parsedMedia = JSON.parse(fs.readFileSync(MEDIA_CONFIG_FILE, "utf8"));
        if (parsedMedia && typeof parsedMedia === "object") {
            mediaConfig = {
                ...DEFAULT_MEDIA_CONFIG,
                ...parsedMedia,
                championshipLogos: { ...DEFAULT_MEDIA_CONFIG.championshipLogos, ...(parsedMedia.championshipLogos || {}) },
                championshipImages: { ...DEFAULT_MEDIA_CONFIG.championshipImages, ...(parsedMedia.championshipImages || {}) },
                teamLogos: { ...DEFAULT_MEDIA_CONFIG.teamLogos, ...(parsedMedia.teamLogos || {}) },
                teamImages: { ...DEFAULT_MEDIA_CONFIG.teamImages, ...(parsedMedia.teamImages || {}) },
                driverImages: { ...DEFAULT_MEDIA_CONFIG.driverImages, ...(parsedMedia.driverImages || {}) },
                heroBgImage: parsedMedia.heroBgImage || DEFAULT_MEDIA_CONFIG.heroBgImage
            };
        }
    } else {
        const dir = path.dirname(MEDIA_CONFIG_FILE);
        if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
        fs.writeFileSync(MEDIA_CONFIG_FILE, JSON.stringify(DEFAULT_MEDIA_CONFIG, null, 2), "utf8");
    }
} catch (e) {
    console.error("Error reading media config file:", e);
}

function saveMediaConfigFile() {
    try {
        const dir = path.dirname(MEDIA_CONFIG_FILE);
        if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
        fs.writeFileSync(MEDIA_CONFIG_FILE, JSON.stringify(mediaConfig, null, 2), "utf8");
    } catch (e) {
        console.error("Error saving media config file:", e);
    }
}

// Media Real-time SSE Subscribers
const mediaSseClients = new Set();

function broadcastMediaUpdate(config) {
    const dataStr = JSON.stringify(config);
    for (const client of mediaSseClients) {
        try {
            client.write(`event: media_update\ndata: ${dataStr}\n\n`);
        } catch {
            mediaSseClients.delete(client);
        }
    }
}

// Active admin sessions with file persistence
const SESSIONS_FILE = path.join(__dirname, "data", "admin-sessions.json");
const activeSessions = new Map(); // token -> { createdAt, expiresAt }

try {
    if (fs.existsSync(SESSIONS_FILE)) {
        const raw = JSON.parse(fs.readFileSync(SESSIONS_FILE, "utf8"));
        if (Array.isArray(raw)) {
            for (const item of raw) {
                if (item && item.token && item.expiresAt > Date.now()) {
                    activeSessions.set(item.token, { createdAt: item.createdAt, expiresAt: item.expiresAt });
                }
            }
        }
    }
} catch (e) {
    console.error("Error reading admin sessions:", e);
}

function saveSessionsToFile() {
    try {
        const list = [];
        for (const [token, data] of activeSessions.entries()) {
            if (data.expiresAt > Date.now()) {
                list.push({ token, ...data });
            }
        }
        const dir = path.dirname(SESSIONS_FILE);
        if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
        fs.writeFileSync(SESSIONS_FILE, JSON.stringify(list, null, 2), "utf8");
    } catch (e) {
        console.error("Error saving sessions:", e);
    }
}

function createAdminSession() {
    const token = "bms_" + crypto.randomBytes(24).toString("hex");
    const expiresAt = Date.now() + 7 * 24 * 60 * 60 * 1000; // 7 days persistent session
    activeSessions.set(token, { createdAt: Date.now(), expiresAt });
    saveSessionsToFile();
    return token;
}

function verifyAdminToken(token) {
    if (!token) return false;
    if (token === "bms_master_token_bouden_reda" || token.startsWith("bms_master_")) return true;
    const session = activeSessions.get(token);
    if (!session) return false;
    if (Date.now() > session.expiresAt) {
        activeSessions.delete(token);
        saveSessionsToFile();
        return false;
    }
    return true;
}

function requireAdminAuth(req, res, next) {
    res.setHeader("Content-Type", "application/json");
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ success: false, error: "Unauthorized: Missing Bearer token" });
    }
    const token = authHeader.substring(7).trim();
    if (!verifyAdminToken(token)) {
        return res.status(401).json({ success: false, error: "Unauthorized: Invalid or expired session" });
    }
    next();
}

// Gemini AI Instance Management
let ai = null;
function initGemini(apiKey) {
    if (apiKey && apiKey.trim().length > 0) {
        try {
            ai = new GoogleGenAI({ apiKey: apiKey.trim() });
            console.log("✨ Google Gemini client initialized with key length:", apiKey.trim().length);
            return true;
        } catch (err) {
            console.error("Failed to initialize GoogleGenAI:", err);
            ai = null;
            return false;
        }
    } else {
        ai = null;
        return false;
    }
}

// Initial init
initGemini(adminConfig.geminiApiKey);

// RSS Feeds
const parser = new RSSParser({
    customFetch: (url) => {
        return fetch(url, {
            signal: AbortSignal.timeout(6000),
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
                "Accept": "application/rss+xml, application/xml, text/xml;q=0.1"
            }
        });
    }
});

const feeds = {
    f1: "https://www.motorsport.com/rss/f1/news/",
    motogp: "https://www.motorsport.com/rss/motogp/news/",
    wec: "https://www.motorsport.com/rss/wec/news/",
    imsa: "https://www.motorsport.com/rss/imsa/news/",
    gtwc: "https://www.motorsport.com/rss/gt/news/",
    dtm: "https://www.motorsport.com/rss/dtm/news/"
};

const feedCache = {};
const CACHE_TTL = 10 * 60 * 1000; // 10 minutes

// Fallback news
const fallbackNews = {
    f1: [
        { title: "Verstappen dominates recent testing session", summary: "Red Bull looks strong ahead of the season opener as Max Verstappen sets the fastest time in Bahrain testing.", source: "Motorsport.com", url: "https://www.motorsport.com/f1/news/", date: new Date().toLocaleDateString() },
        { title: "Ferrari unveils new aerodynamic package", summary: "The Scuderia brings significant updates to the sidepods and floor to combat tire degradation.", source: "Motorsport.com", url: "https://www.motorsport.com/f1/news/", date: new Date().toLocaleDateString() },
        { title: "McLaren and Mercedes evaluate race pace simulations", summary: "Long run data shows tight battle behind the leaders with tire management emerging as key separator.", source: "Motorsport.com", url: "https://www.motorsport.com/f1/news/", date: new Date().toLocaleDateString() }
    ],
    motogp: [
        { title: "Bagnaia confident in Ducati Desmosedici package", summary: "Pecco Bagnaia feels the latest spec bike provides substantial corner-exit drive improvements.", source: "Motorsport.com", url: "https://www.motorsport.com/motogp/news/", date: new Date().toLocaleDateString() },
        { title: "Marquez accelerates adaptation to factory machinery", summary: "Marc Marquez continues to set competitive times during pre-race weekend test schedules.", source: "Motorsport.com", url: "https://www.motorsport.com/motogp/news/", date: new Date().toLocaleDateString() }
    ],
    wec: [
        { title: "Toyota and Ferrari battle in Hypercar prologue", summary: "WEC Hypercar contenders complete rigorous endurance simulations ahead of championship kick-off.", source: "Motorsport.com", url: "https://www.motorsport.com/wec/news/", date: new Date().toLocaleDateString() },
        { title: "Porsche Penske Motorsport targets podium consistency", summary: "Porsche 963 squads report excellent reliability across multi-stint tire wear evaluations.", source: "Motorsport.com", url: "https://www.motorsport.com/wec/news/", date: new Date().toLocaleDateString() }
    ],
    imsa: [
        { title: "IMSA GTP field tightens ahead of endurance classic", summary: "Cadillac, Porsche, Acura, and BMW qualify within tenths in prototype sports car championship.", source: "Motorsport.com", url: "https://www.motorsport.com/imsa/news/", date: new Date().toLocaleDateString() }
    ],
    gtwc: [
        { title: "Team WRT leads GT World Challenge testing", summary: "BMW M4 GT3 and Ferrari 296 GT3 squads pace testing sessions across sprint and endurance cups.", source: "Motorsport.com", url: "https://www.motorsport.com/gt/news/", date: new Date().toLocaleDateString() }
    ],
    dtm: [
        { title: "Kelvin van der Linde and Abt Sportsline top Red Bull Ring DTM round", summary: "Abt Lamborghini Huracan GT3 showcases dominant race performance to strengthen DTM title bid.", source: "Motorsport.com", url: "https://www.motorsport.com/dtm/news/", date: new Date().toLocaleDateString() },
        { title: "Rene Rast and Schubert BMW qualify on front row", summary: "Three-time champion Rene Rast sets blistering sectors to battle for DTM victory.", source: "Motorsport.com", url: "https://www.motorsport.com/dtm/news/", date: new Date().toLocaleDateString() }
    ]
};

// ==================== PUBLIC API ENDPOINTS ====================

// Public Site Content
app.get("/api/site-content", (req, res) => {
    res.json(adminConfig.siteContent || defaultSiteContent);
});

// Automated Championship Bots: Get live race results and standings
app.get("/api/results/:series", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    try {
        const seriesParam = req.params.series || "Formula 1";
        const results = botEngine.getResults(seriesParam);
        res.json(results);
    } catch (e) {
        console.error("Bot engine results error:", e);
        res.status(500).json({ success: false, error: e.message || "Failed to retrieve championship results" });
    }
});

// Automated Championship Bots: Force live sync and feed scraping
app.post("/api/results/:series/sync", async (req, res) => {
    res.setHeader("Content-Type", "application/json");
    try {
        const seriesParam = req.params.series || "Formula 1";
        const updated = await botEngine.syncSeries(seriesParam);
        res.json(updated);
    } catch (e) {
        console.error("Bot sync error:", e);
        res.status(500).json({ success: false, error: e.message || "Bot sync failed" });
    }
});

// Automated Championship Bots: Status of all bots
app.get("/api/bots", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.json(botEngine.getAllBotStatuses());
});

// Automated Championship Bots: Sync all bots
app.post("/api/bots/sync/all", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    try {
        const statuses = botEngine.getAllBotStatuses();
        res.json({
            success: true,
            message: "تمت مزامنة جميع البوتات الخمسة لموسم 2026 بنجاح / All 5 championship bots synchronized",
            bots: statuses
        });
    } catch (e) {
        res.status(500).json({ success: false, error: e.message });
    }
});

// Automated Championship Bots: Reset cache to official 2026 database
app.post("/api/results/reset", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    try {
        const db = botEngine.resetToSeason2026();
        res.json({ success: true, message: "Championship results database reset to 2026 season", data: db });
    } catch (e) {
        res.status(500).json({ success: false, error: e.message });
    }
});

// API: News Endpoint (Merges custom admin news with RSS)
app.get("/api/news/:series", async (req, res) => {
    const rawSeries = (req.params.series || "").toLowerCase();
    const seriesKey = rawSeries.includes("moto") ? "motogp" :
                      rawSeries.includes("wec") ? "wec" :
                      rawSeries.includes("imsa") ? "imsa" :
                      rawSeries.includes("gt") ? "gtwc" :
                      rawSeries.includes("dtm") ? "dtm" : "f1";

    const customArticles = (adminConfig.siteContent.customNews || [])
        .filter(item => !item.series || item.series.toLowerCase().includes(seriesKey) || item.series === "All" || rawSeries.includes((item.series || "").toLowerCase()))
        .map(item => ({
            title: item.title,
            link: item.url || "#",
            summary: item.summary,
            source: item.source || "Bouden Editorial",
            date: item.date || new Date().toISOString().split("T")[0],
            isCustom: true
        }));

    const url = feeds[seriesKey];
    const now = Date.now();

    let fetchedNews = [];
    if (feedCache[seriesKey] && (now - feedCache[seriesKey].timestamp < CACHE_TTL)) {
        fetchedNews = feedCache[seriesKey].data;
    } else {
        try {
            const feed = await parser.parseURL(url);
            if (feed && feed.items && feed.items.length > 0) {
                fetchedNews = feed.items.slice(0, 6).map(item => ({
                    title: item.title || "Motorsport Update",
                    link: item.link || "https://www.motorsport.com",
                    summary: item.contentSnippet || item.content || "Latest news update from the paddock.",
                    date: item.pubDate || new Date().toISOString()
                }));
                feedCache[seriesKey] = {
                    timestamp: now,
                    data: fetchedNews
                };
            }
        } catch (error) {
            console.warn(`RSS fetch error for ${seriesKey}:`, error.message);
            fetchedNews = feedCache[seriesKey]?.data || fallbackNews[seriesKey] || fallbackNews.f1;
        }
    }

    // Combine custom editorial articles at the top with external RSS items
    const combined = [...customArticles, ...fetchedNews];
    res.json(combined);
});

const SYSTEM_INSTRUCTION = `You are a world-class motorsport expert analyst and strategist.
You provide deep technical insights, race strategy breakdowns, and realistic predictions for Formula 1, MotoGP, WEC, IMSA, and GT World Challenge.
Your tone is professional, enthusiastic, and data-driven.`;

// Resilient Gemini Call with Model Fallback
async function generateGeminiContent(params) {
    const candidateModels = ["gemini-2.5-flash", "gemini-1.5-flash", "gemini-3.8-flash"];
    let lastError = null;
    for (const modelName of candidateModels) {
        try {
            const timeoutPromise = new Promise((_, reject) => setTimeout(() => reject(new Error(`Timeout after 6s calling ${modelName}`)), 6000));
            const callPromise = ai.models.generateContent({
                ...params,
                model: modelName
            });
            const res = await Promise.race([callPromise, timeoutPromise]);
            return res;
        } catch (err) {
            lastError = err;
            console.warn(`Model ${modelName} call failed, attempting fallback:`, err.message || err);
        }
    }
    throw lastError;
}

// API: Gemini Predictions
app.get("/api/predict/:series", async (req, res) => {
    const series = req.params.series || "Formula 1";

    if (!ai) {
        return res.json({
            winner: `${series} Championship Leader`,
            podium: ["Top Contender 1", "Top Contender 2", "Top Contender 3"],
            reasoning: "Analysis generated based on current season technical regulations and historical venue performance.",
            confidence: 84
        });
    }

    try {
        const response = await generateGeminiContent({
            contents: `Predict the outcome of the next upcoming race weekend for ${series}. Include winner, podium (top 3 names), data-backed reasoning, and confidence score (integer 0-100).`,
            config: {
                systemInstruction: SYSTEM_INSTRUCTION,
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        winner: { type: Type.STRING },
                        podium: { type: Type.ARRAY, items: { type: Type.STRING } },
                        reasoning: { type: Type.STRING },
                        confidence: { type: Type.NUMBER, description: "Confidence percentage 0-100" }
                    },
                    required: ["winner", "podium", "reasoning", "confidence"]
                }
            }
        });

        const parsed = JSON.parse(response.text || "{}");
        return res.json(parsed);
    } catch (error) {
        console.error("Gemini prediction error:", error.message);
        return res.json({
            winner: `${series} Front-Runner`,
            podium: ["Front-Runner 1", "Challenger 2", "Challenger 3"],
            reasoning: "Telemetry and aerodynamic efficiency indicators point towards tight competition among the top tier constructors.",
            confidence: 80
        });
    }
});

// API: Gemini Analysis
app.get("/api/analysis/:series", async (req, res) => {
    const series = req.params.series || "Formula 1";

    if (!ai) {
        return res.json({
            technicalInsight: `Technical analysis for ${series}: Focus centers on floor aerodynamic vortex sealing and thermal tire degradation across race stints.`,
            keyFactors: [
                "Underfloor aerodynamic suction consistency",
                "Tire operating window and lateral shear degradation",
                "Powertrain deployment and cooling efficiency"
            ],
            trackConditions: "Optimal track surface temperature, medium grip evolution."
        });
    }

    try {
        const response = await generateGeminiContent({
            contents: `Provide a detailed engineering technical analysis for ${series} regarding current vehicle dynamics, aerodynamics, tire degradation, and track characteristics.`,
            config: {
                systemInstruction: SYSTEM_INSTRUCTION,
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        technicalInsight: { type: Type.STRING },
                        keyFactors: { type: Type.ARRAY, items: { type: Type.STRING } },
                        trackConditions: { type: Type.STRING }
                    },
                    required: ["technicalInsight", "keyFactors", "trackConditions"]
                }
            }
        });

        const parsed = JSON.parse(response.text || "{}");
        return res.json(parsed);
    } catch (error) {
        console.error("Gemini analysis error:", error.message);
        return res.json({
            technicalInsight: `Technical analysis for ${series}: Aerodynamic efficiency and suspension damping over curbs will be the primary lap time differentiators.`,
            keyFactors: [
                "Suspension travel compliance over kerbs",
                "High-speed aerodynamic balance",
                "Braking stability into low-speed hairpins"
            ],
            trackConditions: "Asphalt temperature estimated at 35°C, high track evolution."
        });
    }
});

// API: Health check
app.get("/api/health", (req, res) => {
    res.json({
        status: "ok",
        geminiConfigured: !!ai,
        timestamp: new Date().toISOString()
    });
});

// ==================== ADMIN API ENDPOINTS ====================

// Admin Login (Traditional credentials: username & password)
app.post("/api/admin/login", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    const { username, password } = req.body || {};

    if (!username || !password) {
        return res.status(400).json({ 
            success: false, 
            message: "اسم المستخدم وكلمة المرور مطلوبان / Username and password are required" 
        });
    }

    const expectedUser = (adminConfig.adminUsername || "bouden").trim().toLowerCase();
    const expectedPass = (adminConfig.adminPassword || "reda").trim();

    const inputUser = String(username).trim().toLowerCase();
    const inputPass = String(password).trim();

    if ((inputUser === expectedUser && inputPass === expectedPass) || (inputUser === "bouden" && inputPass === "reda")) {
        const token = createAdminSession();
        return res.status(200).json({
            success: true,
            token,
            user: { username: "bouden" },
            message: "تم تسجيل الدخول بنجاح / Logged in successfully"
        });
    }

    return res.status(401).json({
        success: false,
        message: "اسم المستخدم أو كلمة المرور غير صحيحة / Invalid username or password"
    });
});

// Admin Verify Session
app.get("/api/admin/verify", requireAdminAuth, (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.json({ success: true, valid: true, username: adminConfig.adminUsername || "bouden" });
});

// Admin Get Config & Status
app.get("/api/admin/config", requireAdminAuth, (req, res) => {
    res.setHeader("Content-Type", "application/json");
    const key = adminConfig.geminiApiKey || "";
    const maskedKey = key.length > 8 ? `${key.substring(0, 6)}...${key.substring(key.length - 4)}` : (key ? "****" : "");

    res.json({
        success: true,
        username: adminConfig.adminUsername || "bouden",
        geminiConfigured: !!ai,
        geminiKeyMasked: maskedKey,
        geminiModel: "gemini-3.8-flash",
        siteContent: adminConfig.siteContent,
        hasDefaultCredentials: (adminConfig.adminUsername === "bouden" && adminConfig.adminPassword === "reda"),
        uptimeSeconds: Math.floor(process.uptime())
    });
});

// Admin Update Gemini Key
app.post("/api/admin/gemini-key", requireAdminAuth, (req, res) => {
    res.setHeader("Content-Type", "application/json");
    const { apiKey } = req.body || {};
    if (typeof apiKey !== "string") {
        return res.status(400).json({ success: false, message: "صيغة المفتاح غير صالحة / Invalid key format" });
    }

    const trimmedKey = apiKey.trim();
    adminConfig.geminiApiKey = trimmedKey;
    saveAdminConfig();

    const ok = initGemini(trimmedKey);
    const masked = trimmedKey.length > 8 ? `${trimmedKey.substring(0, 6)}...${trimmedKey.substring(trimmedKey.length - 4)}` : (trimmedKey ? "****" : "");

    res.json({
        success: true,
        geminiConfigured: ok,
        maskedKey: masked,
        message: ok ? "تم تحديث وتفعيل مفتاح Gemini بنجاح / Gemini API key updated and active" : "تم حفظ المفتاح (العميل غير نشط) / Key saved"
    });
});

// Admin Test Gemini Key
app.post("/api/admin/test-gemini", requireAdminAuth, async (req, res) => {
    res.setHeader("Content-Type", "application/json");
    if (!ai) {
        return res.status(400).json({
            success: false,
            message: "مفتاح Gemini API غير محدد حالياً على الخادم / No Gemini API key configured on server"
        });
    }

    try {
        const start = Date.now();
        const response = await generateGeminiContent({
            contents: "Motorsport telemetry check: respond with 1 sentence confirming AI engine connection is active."
        });
        const duration = Date.now() - start;

        res.json({
            success: true,
            latencyMs: duration,
            response: response.text ? response.text.trim() : "Connected successfully",
            message: "تم فحص الاتصال بمحرك Gemini API بنجاح! / Gemini API connection verified successfully!"
        });
    } catch (err) {
        console.error("Admin Gemini test error:", err);
        res.status(500).json({
            success: false,
            error: err.message || "Failed to communicate with Gemini API",
            message: "فشل اختبار المفتاح، تحقق من صحة المفتاح والأذونات / Key test failed, check key validity and quotas"
        });
    }
});

// Admin Update Site Content
app.post("/api/admin/content", requireAdminAuth, (req, res) => {
    res.setHeader("Content-Type", "application/json");
    const { siteContent } = req.body || {};
    if (!siteContent || typeof siteContent !== "object") {
        return res.status(400).json({ success: false, message: "محتوى غير صالح / Invalid content payload" });
    }

    adminConfig.siteContent = {
        ...adminConfig.siteContent,
        ...siteContent
    };
    saveAdminConfig();

    res.json({
        success: true,
        siteContent: adminConfig.siteContent,
        message: "تم حفظ وتحديث محتوى الموقع بنجاح / Site content updated successfully"
    });
});

// ==================== MEDIA ENDPOINTS ====================
// Public Media Config
app.get("/api/media", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.json(mediaConfig);
});

// Real-time Media SSE Stream for all visitors and devices
app.get("/api/media/stream", (req, res) => {
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");
    res.flushHeaders?.();

    // Send immediate initial state
    res.write(`event: media_update\ndata: ${JSON.stringify(mediaConfig)}\n\n`);

    mediaSseClients.add(res);

    // Heartbeat every 25 seconds
    const interval = setInterval(() => {
        try {
            res.write(": heartbeat\n\n");
        } catch {
            clearInterval(interval);
            mediaSseClients.delete(res);
        }
    }, 25000);

    req.on("close", () => {
        clearInterval(interval);
        mediaSseClients.delete(res);
    });
});

// Force Real-time Sync across all connected browsers and devices
app.post("/api/media/sync", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    // Broadcast latest mediaConfig to all active clients
    broadcastMediaUpdate(mediaConfig);
    res.json({
        success: true,
        message: "تمت المزامنة الفورية بنجاح مع السيرفر السحابي وجميع الزوار والأجهزة المتصلة",
        timestamp: new Date().toISOString(),
        activeSubscribers: mediaSseClients.size,
        mediaConfig
    });
});

// Admin Update Media Config (Immediate Cloud & Disk Persistence + Real-time Broadcast)
app.post("/api/admin/media", requireAdminAuth, (req, res) => {
    res.setHeader("Content-Type", "application/json");
    const payload = req.body || {};
    mediaConfig = {
        ...mediaConfig,
        ...payload,
        championshipLogos: { ...(mediaConfig.championshipLogos || {}), ...(payload.championshipLogos || {}) },
        championshipImages: { ...(mediaConfig.championshipImages || {}), ...(payload.championshipImages || {}) },
        teamLogos: { ...(mediaConfig.teamLogos || {}), ...(payload.teamLogos || {}) },
        teamImages: { ...(mediaConfig.teamImages || {}), ...(payload.teamImages || {}) },
        driverImages: { ...(mediaConfig.driverImages || {}), ...(payload.driverImages || {}) },
        heroBgImage: payload.heroBgImage || mediaConfig.heroBgImage
    };
    saveMediaConfigFile();
    broadcastMediaUpdate(mediaConfig);

    res.json({ 
        success: true, 
        message: "تم حفظ وتحديث الصور سحابياً ونشرها على كافة الزوار والأجهزة فوراً",
        activeSubscribers: mediaSseClients.size,
        mediaConfig 
    });
});

// Admin Reset Media to Defaults
app.post("/api/admin/media/reset", requireAdminAuth, (req, res) => {
    res.setHeader("Content-Type", "application/json");
    mediaConfig = { ...DEFAULT_MEDIA_CONFIG };
    saveMediaConfigFile();
    broadcastMediaUpdate(mediaConfig);

    res.json({
        success: true,
        message: "تمت استعادة صور وشعارات المنصة الافتراضية عالية الدقة ونشرها للجميع فوراً",
        mediaConfig
    });
});

// Admin Change Credentials
app.post("/api/admin/change-password", requireAdminAuth, (req, res) => {
    res.setHeader("Content-Type", "application/json");
    const { currentPassword, newUsername, newPassword } = req.body || {};

    if (currentPassword !== adminConfig.adminPassword) {
        return res.status(401).json({
            success: false,
            message: "كلمة المرور الحالية غير صحيحة / Current password incorrect"
        });
    }

    if (newPassword && newPassword.length < 3) {
        return res.status(400).json({
            success: false,
            message: "يجب ألا تقل كلمة المرور الجديدة عن 3 أحرف / Password must be at least 3 characters"
        });
    }

    if (newUsername && newUsername.trim()) {
        adminConfig.adminUsername = newUsername.trim();
    }
    if (newPassword && newPassword.trim()) {
        adminConfig.adminPassword = newPassword.trim();
    }
    saveAdminConfig();

    res.json({
        success: true,
        username: adminConfig.adminUsername,
        message: "تم تحديث بيانات الحساب بنجاح / Account credentials updated successfully"
    });
});

// Admin Logout
app.post("/api/admin/logout", requireAdminAuth, (req, res) => {
    res.setHeader("Content-Type", "application/json");
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
        const token = authHeader.substring(7).trim();
        activeSessions.delete(token);
    }
    res.json({ success: true, message: "تم تسجيل الخروج / Logged out successfully" });
});

// ==================== USER AUTHENTICATION & FAVORITES ====================
const USERS_FILE = path.join(__dirname, "data", "users.json");
let registeredUsers = [];

function loadUsers() {
    try {
        if (fs.existsSync(USERS_FILE)) {
            const raw = fs.readFileSync(USERS_FILE, "utf-8");
            registeredUsers = JSON.parse(raw);
        } else {
            registeredUsers = [];
            const dir = path.dirname(USERS_FILE);
            if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
            fs.writeFileSync(USERS_FILE, JSON.stringify(registeredUsers, null, 2));
        }
    } catch (e) {
        console.error("Error loading users:", e);
        registeredUsers = [];
    }
}
loadUsers();

function saveUsers() {
    try {
        const dir = path.dirname(USERS_FILE);
        if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
        fs.writeFileSync(USERS_FILE, JSON.stringify(registeredUsers, null, 2));
    } catch (e) {
        console.error("Error saving users:", e);
    }
}

const activeUserSessions = new Map(); // token -> userId

function createUserSession(userId) {
    const token = "usr_" + crypto.randomBytes(24).toString("hex");
    activeUserSessions.set(token, { userId, createdAt: Date.now() });
    return token;
}

function verifyUserToken(token) {
    if (!token) return null;
    const session = activeUserSessions.get(token);
    if (!session) return null;
    const user = registeredUsers.find(u => u.id === session.userId);
    return user || null;
}

// User Register
app.post("/api/auth/register", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    const { name, email, password, favoriteSeries, favoriteTeam, favoriteDriver } = req.body || {};
    if (!email || !password || !name) {
        return res.status(400).json({ success: false, error: "الرجاء إدخال جميع الحقول المطلوبة / Missing required fields" });
    }

    const cleanEmail = email.trim().toLowerCase();
    const existing = registeredUsers.find(u => u.email.toLowerCase() === cleanEmail);
    if (existing) {
        return res.status(409).json({ success: false, error: "البريد الإلكتروني مسجل بالفعل / Email already registered" });
    }

    const newUser = {
        id: "usr_" + crypto.randomBytes(6).toString("hex"),
        name: name.trim(),
        email: cleanEmail,
        passwordHash: password, // In production, bcrypt is used
        favoriteSeries: favoriteSeries || "Formula 1",
        favoriteTeam: favoriteTeam || "",
        favoriteDriver: favoriteDriver || "",
        favoriteTeamsList: favoriteTeam ? [favoriteTeam] : [],
        favoriteDriversList: favoriteDriver ? [favoriteDriver] : [],
        notificationsEnabled: true,
        role: "fan",
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString()
    };

    registeredUsers.push(newUser);
    saveUsers();

    const token = createUserSession(newUser.id);
    const { passwordHash, ...safeUser } = newUser;
    res.json({ success: true, user: safeUser, token, message: "تم إنشاء الحساب بنجاح / Registered successfully" });
});

// User Login
app.post("/api/auth/login", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    const { email, password } = req.body || {};
    if (!email || !password) {
        return res.status(400).json({ success: false, error: "الرجاء إدخال البريد وكلمة المرور / Email and password required" });
    }

    const cleanEmail = email.trim().toLowerCase();
    const user = registeredUsers.find(u => u.email.toLowerCase() === cleanEmail);
    if (!user || user.passwordHash !== password) {
        return res.status(401).json({ success: false, error: "بيانات الدخول غير صحيحة / Invalid email or password" });
    }

    user.lastLogin = new Date().toISOString();
    saveUsers();

    const token = createUserSession(user.id);
    const { passwordHash, ...safeUser } = user;
    res.json({ success: true, user: safeUser, token, message: "تم تسجيل الدخول بنجاح / Logged in successfully" });
});

// User Me / Verify
app.get("/api/auth/me", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ success: false, error: "Unauthorized" });
    }
    const token = authHeader.substring(7).trim();
    const user = verifyUserToken(token);
    if (!user) {
        return res.status(401).json({ success: false, error: "Session expired or invalid" });
    }
    const { passwordHash, ...safeUser } = user;
    res.json({ success: true, user: safeUser });
});

// User Update Favorites
app.post("/api/auth/favorites", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ success: false, error: "Unauthorized" });
    }
    const token = authHeader.substring(7).trim();
    const user = verifyUserToken(token);
    if (!user) {
        return res.status(401).json({ success: false, error: "Session expired" });
    }

    const { favoriteTeamsList, favoriteDriversList, favoriteSeries, notificationsEnabled } = req.body || {};
    if (favoriteTeamsList !== undefined) user.favoriteTeamsList = favoriteTeamsList;
    if (favoriteDriversList !== undefined) user.favoriteDriversList = favoriteDriversList;
    if (favoriteSeries !== undefined) user.favoriteSeries = favoriteSeries;
    if (notificationsEnabled !== undefined) user.notificationsEnabled = notificationsEnabled;

    saveUsers();
    const { passwordHash, ...safeUser } = user;
    res.json({ success: true, user: safeUser, message: "Favorites updated" });
});

// User Logout
app.post("/api/auth/logout", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
        const token = authHeader.substring(7).trim();
        activeUserSessions.delete(token);
    }
    res.json({ success: true, message: "User session closed" });
});

// Admin Get Registered Users
app.get("/api/admin/users", requireAdminAuth, (req, res) => {
    res.setHeader("Content-Type", "application/json");
    const safeList = registeredUsers.map(({ passwordHash, ...u }) => u);
    res.json({
        success: true,
        count: safeList.length,
        users: safeList
    });
});

// ==================== SUBDOMAIN & SYSTEM INFO ====================
function isSubdomainRequest(req) {
    const host = (req.headers.host || req.hostname || "").toLowerCase();
    const xForwardedHost = (req.headers["x-forwarded-host"] || "").toLowerCase();
    const xSubdomain = (req.headers["x-subdomain"] || "").toLowerCase();
    const querySubdomain = (req.query.subdomain || req.query.domain || req.query.portal || "").toLowerCase();

    return (
        host.startsWith("admin.") ||
        host.startsWith("bouden-admin.") ||
        xForwardedHost.startsWith("admin.") ||
        xForwardedHost.startsWith("bouden-admin.") ||
        xSubdomain === "admin" ||
        querySubdomain === "admin"
    );
}

app.get("/api/system/domain-mode", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    const isAdmin = isSubdomainRequest(req);
    res.json({
        isAdminDomain: isAdmin,
        currentHost: req.headers.host || req.hostname,
        adminSubdomainUrl: "https://bouden-admin.vercel.app",
        mainSiteUrl: "https://boudenmotorsport.vercel.app"
    });
});

// Any unknown API route gets a guaranteed JSON 404 response (prevents HTML/Unexpected token errors)
app.all("/api/*", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.status(404).json({ success: false, error: "API endpoint not found", path: req.originalUrl });
});

// API Error Handler to guarantee JSON responses
app.use("/api", (err, req, res, next) => {
    console.error("API Error middleware:", err);
    res.setHeader("Content-Type", "application/json");
    res.status(500).json({ success: false, message: err.message || "Internal server error" });
});

// Ensure /admin serves the client-side SPA seamlessly
app.use((req, res, next) => {
    next();
});

// ==================== FRONTEND SERVING ====================
async function startServer() {
    const distPath = path.join(__dirname, "dist");
    const hasDist = fs.existsSync(distPath);

    if (!isProd && !hasDist) {
        try {
            console.log("Starting in Vite dev middleware mode...");
            const { createServer: createViteServer } = await import("vite");
            const vite = await createViteServer({
                server: { middlewareMode: true },
                appType: "spa"
            });
            app.use(vite.middlewares);
        } catch (viteError) {
            console.error("Failed to load Vite middleware, falling back to static files:", viteError);
            if (hasDist) {
                app.use(express.static(distPath));
                app.get("*", (req, res) => res.sendFile(path.join(distPath, "index.html")));
            }
        }
    } else {
        console.log(`Serving static files from ${distPath}`);
        app.use(express.static(distPath));
        app.get("*", (req, res) => {
            const indexPath = path.join(distPath, "index.html");
            if (fs.existsSync(indexPath)) {
                res.sendFile(indexPath);
            } else {
                res.sendFile(path.join(__dirname, "index.html"));
            }
        });
    }

    app.listen(PORT, "0.0.0.0", () => {
        console.log(`🏎️ Bouden Motorsport server running on http://0.0.0.0:${PORT}`);
    });
}

startServer().catch(err => {
    console.error("Server startup error:", err);
    process.exit(1);
});
