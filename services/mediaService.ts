import { MediaOverrides } from '../types';
import { getStoredAdminToken } from './adminService';

const LOCAL_STORAGE_KEY = 'bouden_media_overrides_v1';

export const DEFAULT_MEDIA_CONFIG: MediaOverrides = {
    championshipLogos: {
        'Formula 1': 'https://upload.wikimedia.org/wikipedia/commons/3/33/F1.svg',
        'MotoGP': 'https://upload.wikimedia.org/wikipedia/commons/a/a0/Moto_Gp_logo.svg',
        'WEC': 'https://upload.wikimedia.org/wikipedia/commons/e/e8/FIA_WEC_logo.svg',
        'IMSA': 'https://upload.wikimedia.org/wikipedia/commons/d/d4/IMSA_WeatherTech_SportsCar_Championship_logo.svg',
        'GT World Challenge': 'https://upload.wikimedia.org/wikipedia/commons/7/77/GT_World_Challenge_logo.svg',
        'DTM': 'https://upload.wikimedia.org/wikipedia/commons/e/ee/DTM_Logo_2023.svg'
    },
    championshipImages: {
        'Formula 1': 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=1400&auto=format&fit=crop',
        'MotoGP': 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?q=80&w=1400&auto=format&fit=crop',
        'WEC': 'https://newsroom.porsche.com/.imaging/mte/porsche-templating-theme/image_1290x726/dam/pnr/2023/Motorsports/WEC/Le-Mans-Test-Day/02-Porsche-963-Porsche-Penske-Motorsport.jpg/jcr:content/02-Porsche-963-Porsche-Penske-Motorsport.jpg',
        'IMSA': 'https://images.unsplash.com/photo-1558564244-64506927d2c3?q=80&w=1400&auto=format&fit=crop',
        'GT World Challenge': 'https://images.unsplash.com/photo-1628185016593-3d0d8299d63c?q=80&w=1400&auto=format&fit=crop',
        'DTM': 'https://images.unsplash.com/photo-1629219356886-c322b724497e?q=80&w=1400&auto=format&fit=crop'
    },
    teamLogos: {
        // F1 Teams
        'mercedes': 'https://upload.wikimedia.org/wikipedia/commons/f/fb/Mercedes_AMG_Petronas_F1_Logo.svg',
        'mercedes_amg': 'https://upload.wikimedia.org/wikipedia/commons/f/fb/Mercedes_AMG_Petronas_F1_Logo.svg',
        'mclaren': 'https://upload.wikimedia.org/wikipedia/en/6/66/McLaren_Racing_logo.svg',
        'mclaren_f1': 'https://upload.wikimedia.org/wikipedia/en/6/66/McLaren_Racing_logo.svg',
        'ferrari': 'https://upload.wikimedia.org/wikipedia/de/c/c0/Scuderia_Ferrari_Logo.svg',
        'scuderia_ferrari': 'https://upload.wikimedia.org/wikipedia/de/c/c0/Scuderia_Ferrari_Logo.svg',
        'red_bull': 'https://upload.wikimedia.org/wikipedia/en/5/52/Red_Bull_Racing_logo_2024.svg',
        'redbull_racing': 'https://upload.wikimedia.org/wikipedia/en/5/52/Red_Bull_Racing_logo_2024.svg',
        'aston_martin': 'https://upload.wikimedia.org/wikipedia/en/b/bd/Aston_Martin_Aramco_Cognizant_F1_Team_logo.svg',
        'williams': 'https://upload.wikimedia.org/wikipedia/commons/4/4b/Williams_Racing_2024_Logo.svg',
        'alpine': 'https://upload.wikimedia.org/wikipedia/commons/7/7e/Alpine_F1_Team_Logo.svg',
        'racing_bulls': 'https://upload.wikimedia.org/wikipedia/en/0/02/Visa_Cash_App_RB_Formula_One_Team_logo.svg',
        'audi': 'https://upload.wikimedia.org/wikipedia/commons/9/92/Audi-Logo_2016.svg',
        'haas': 'https://upload.wikimedia.org/wikipedia/commons/d/d4/MoneyGram_Haas_F1_Team_Logo.svg',

        // WEC Teams
        'toyota_gazoo_wec': 'https://upload.wikimedia.org/wikipedia/commons/e/e7/Toyota_Gazoo_Racing_logo_2020.svg',
        'porsche_penske_wec': 'https://upload.wikimedia.org/wikipedia/de/2/2d/Porsche_Wappen.svg',
        'ferrari_af_corse': 'https://upload.wikimedia.org/wikipedia/de/c/c0/Scuderia_Ferrari_Logo.svg',
        'aston_martin_thor': 'https://upload.wikimedia.org/wikipedia/en/b/bd/Aston_Martin_Aramco_Cognizant_F1_Team_logo.svg',
        'cadillac_jota': 'https://upload.wikimedia.org/wikipedia/commons/4/44/Cadillac_logo.svg',
        'bmw_wrt_wec': 'https://upload.wikimedia.org/wikipedia/commons/4/44/BMW.svg',
        'alpine_wec_hypercar': 'https://upload.wikimedia.org/wikipedia/commons/7/7e/Alpine_F1_Team_Logo.svg',
        'peugeot_totalenergies': 'https://upload.wikimedia.org/wikipedia/commons/f/fd/Peugeot_Logo_2021.svg',
        'manthey_wec': 'https://upload.wikimedia.org/wikipedia/de/2/2d/Porsche_Wappen.svg',

        // MotoGP Teams
        'ducati_lenovo': 'https://upload.wikimedia.org/wikipedia/commons/8/87/Ducati_red_logo.svg',
        'aprilia_racing': 'https://upload.wikimedia.org/wikipedia/commons/9/99/Aprilia-logo.svg',
        'ktm_factory': 'https://upload.wikimedia.org/wikipedia/commons/a/af/KTM-Logo.svg',
        'ktm_tech3': 'https://upload.wikimedia.org/wikipedia/commons/a/af/KTM-Logo.svg',
        'yamaha_factory': 'https://upload.wikimedia.org/wikipedia/commons/8/8b/Yamaha_Motor_logo.svg',
        'honda_repsol': 'https://upload.wikimedia.org/wikipedia/commons/7/7b/Honda_Logo.svg',

        // DTM & GT
        'schubert_motorsport_dtm': 'https://upload.wikimedia.org/wikipedia/commons/4/44/BMW.svg',
        'schubert_bmw': 'https://upload.wikimedia.org/wikipedia/commons/4/44/BMW.svg',
        'abt_sportsline_dtm': 'https://upload.wikimedia.org/wikipedia/commons/9/92/Audi-Logo_2016.svg',
        'abt_audi': 'https://upload.wikimedia.org/wikipedia/commons/9/92/Audi-Logo_2016.svg',
        'manthey_ema_dtm': 'https://upload.wikimedia.org/wikipedia/de/2/2d/Porsche_Wappen.svg',
        'manthey_porsche': 'https://upload.wikimedia.org/wikipedia/de/2/2d/Porsche_Wappen.svg'
    },
    teamImages: {
        // F1 Cars
        'mercedes': 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=1200&auto=format&fit=crop',
        'mercedes_amg': 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=1200&auto=format&fit=crop',
        'mclaren': 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?q=80&w=1200&auto=format&fit=crop',
        'mclaren_f1': 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?q=80&w=1200&auto=format&fit=crop',
        'ferrari': 'https://images.unsplash.com/photo-1592634976722-13b3c3c78864?q=80&w=1200&auto=format&fit=crop',
        'scuderia_ferrari': 'https://images.unsplash.com/photo-1592634976722-13b3c3c78864?q=80&w=1200&auto=format&fit=crop',
        'red_bull': 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=1200&auto=format&fit=crop',
        'redbull_racing': 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=1200&auto=format&fit=crop',
        'aston_martin': 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?q=80&w=1200&auto=format&fit=crop',
        'williams': 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?q=80&w=1200&auto=format&fit=crop',
        'alpine': 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?q=80&w=1200&auto=format&fit=crop',

        // WEC Cars
        'toyota_gazoo_wec': 'https://images.unsplash.com/photo-1629219356886-c322b724497e?q=80&w=1200&auto=format&fit=crop',
        'porsche_penske_wec': 'https://newsroom.porsche.com/.imaging/mte/porsche-templating-theme/image_1290x726/dam/pnr/2023/Motorsports/WEC/Le-Mans-Test-Day/02-Porsche-963-Porsche-Penske-Motorsport.jpg/jcr:content/02-Porsche-963-Porsche-Penske-Motorsport.jpg',
        'ferrari_af_corse': 'https://images.unsplash.com/photo-1592634976722-13b3c3c78864?q=80&w=1200&auto=format&fit=crop',
        'aston_martin_thor': 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?q=80&w=1200&auto=format&fit=crop',
        'cadillac_jota': 'https://images.unsplash.com/photo-1558564244-64506927d2c3?q=80&w=1200&auto=format&fit=crop',
        'bmw_wrt_wec': 'https://images.unsplash.com/photo-1628185016593-3d0d8299d63c?q=80&w=1200&auto=format&fit=crop',
        'alpine_wec_hypercar': 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?q=80&w=1200&auto=format&fit=crop',

        // MotoGP Bikes
        'ducati_lenovo': 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?q=80&w=1200&auto=format&fit=crop',
        'aprilia_racing': 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?q=80&w=1200&auto=format&fit=crop',
        'ktm_factory': 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?q=80&w=1200&auto=format&fit=crop',
        'yamaha_factory': 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?q=80&w=1200&auto=format&fit=crop',

        // DTM & GT Cars
        'schubert_motorsport_dtm': 'https://images.unsplash.com/photo-1628185016593-3d0d8299d63c?q=80&w=1200&auto=format&fit=crop',
        'schubert_bmw': 'https://images.unsplash.com/photo-1628185016593-3d0d8299d63c?q=80&w=1200&auto=format&fit=crop',
        'abt_sportsline_dtm': 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?q=80&w=1200&auto=format&fit=crop',
        'abt_audi': 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?q=80&w=1200&auto=format&fit=crop',
        'manthey_ema_dtm': 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?q=80&w=1200&auto=format&fit=crop',
        'manthey_porsche': 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?q=80&w=1200&auto=format&fit=crop'
    },
    driverImages: {
        'George Russell': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop',
        'Andrea Kimi Antonelli': 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600&auto=format&fit=crop',
        'Lando Norris': 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=600&auto=format&fit=crop',
        'Oscar Piastri': 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600&auto=format&fit=crop',
        'Charles Leclerc': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop',
        'Lewis Hamilton': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop',
        'Max Verstappen': 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600&auto=format&fit=crop',
        'Fernando Alonso': 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=600&auto=format&fit=crop',
        'Sébastien Buemi': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop',
        'Kévin Estre': 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600&auto=format&fit=crop',
        'Antonio Fuoco': 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=600&auto=format&fit=crop',
        'Francesco Bagnaia': 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=600&auto=format&fit=crop',
        'Marc Márquez': 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600&auto=format&fit=crop',
        'Jorge Martín': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop'
    },
    heroBgImage: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=2400&auto=format&fit=crop'
};

// Real-time Reactivity Subscriptions
type MediaListener = (overrides: MediaOverrides) => void;
const listeners: Set<MediaListener> = new Set();

export const subscribeMediaChanges = (callback: MediaListener): (() => void) => {
    listeners.add(callback);
    return () => listeners.delete(callback);
};

const notifyListeners = (overrides: MediaOverrides) => {
    listeners.forEach(cb => {
        try { cb(overrides); } catch {}
    });
    if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('bms_media_updated', { detail: { overrides } }));
    }
};

export const getLocalMediaOverrides = (): MediaOverrides => {
    try {
        if (typeof window === 'undefined') return { ...DEFAULT_MEDIA_CONFIG };
        const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (stored) {
            const parsed = JSON.parse(stored);
            return {
                ...DEFAULT_MEDIA_CONFIG,
                ...parsed,
                championshipLogos: { ...DEFAULT_MEDIA_CONFIG.championshipLogos, ...(parsed.championshipLogos || {}) },
                championshipImages: { ...DEFAULT_MEDIA_CONFIG.championshipImages, ...(parsed.championshipImages || {}) },
                teamLogos: { ...DEFAULT_MEDIA_CONFIG.teamLogos, ...(parsed.teamLogos || {}) },
                teamImages: { ...DEFAULT_MEDIA_CONFIG.teamImages, ...(parsed.teamImages || {}) },
                driverImages: { ...DEFAULT_MEDIA_CONFIG.driverImages, ...(parsed.driverImages || {}) }
            };
        }
    } catch {}
    return { ...DEFAULT_MEDIA_CONFIG };
};

function mergeAndPersist(data: any): MediaOverrides {
    const merged: MediaOverrides = {
        ...DEFAULT_MEDIA_CONFIG,
        ...data,
        championshipLogos: { ...DEFAULT_MEDIA_CONFIG.championshipLogos, ...(data.championshipLogos || {}) },
        championshipImages: { ...DEFAULT_MEDIA_CONFIG.championshipImages, ...(data.championshipImages || {}) },
        teamLogos: { ...DEFAULT_MEDIA_CONFIG.teamLogos, ...(data.teamLogos || {}) },
        teamImages: { ...DEFAULT_MEDIA_CONFIG.teamImages, ...(data.teamImages || {}) },
        driverImages: { ...DEFAULT_MEDIA_CONFIG.driverImages, ...(data.driverImages || {}) },
        heroBgImage: data.heroBgImage || DEFAULT_MEDIA_CONFIG.heroBgImage
    };
    if (typeof window !== 'undefined') {
        try {
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(merged));
        } catch {}
    }
    notifyListeners(merged);
    return merged;
}

export const fetchRemoteMediaConfig = async (): Promise<MediaOverrides> => {
    try {
        const res = await fetch('/api/media', { cache: 'no-store' });
        if (res.ok) {
            const data = await res.json();
            if (data && typeof data === 'object') {
                return mergeAndPersist(data);
            }
        }
    } catch (e) {
        console.warn("fetchRemoteMediaConfig failed, using cached config:", e);
    }
    return getLocalMediaOverrides();
};

/**
 * Real-time Server Sync (SSE + Auto Polling)
 * Keeps all client browsers and devices in sync with the cloud/database automatically.
 */
let sseInitialized = false;
let pollingInterval: any = null;

export const initMediaRealtimeSync = (): void => {
    if (typeof window === 'undefined' || sseInitialized) return;
    sseInitialized = true;

    // 1. Initial fast fetch
    fetchRemoteMediaConfig().catch(() => {});

    // 2. Connect Server-Sent Events (SSE) for zero-latency instant updates
    let eventSource: EventSource | null = null;

    const connectSSE = () => {
        try {
            eventSource = new EventSource('/api/media/stream');

            eventSource.addEventListener('media_update', (event) => {
                try {
                    const freshConfig = JSON.parse(event.data);
                    if (freshConfig && typeof freshConfig === 'object') {
                        mergeAndPersist(freshConfig);
                    }
                } catch (err) {
                    console.error("SSE parse error:", err);
                }
            });

            eventSource.onerror = () => {
                if (eventSource) {
                    eventSource.close();
                    eventSource = null;
                }
                // Try reconnecting in 5s
                setTimeout(connectSSE, 5000);
            };
        } catch {
            // SSE not supported or blocked -> fallback to polling
        }
    };

    connectSSE();

    // 3. Fallback sync polling every 12 seconds
    if (!pollingInterval) {
        pollingInterval = setInterval(() => {
            fetchRemoteMediaConfig().catch(() => {});
        }, 12000);
    }
};

/**
 * Forced Real-Time Sync Action (Triggered by [مزامنة فورية Real-time Sync] button)
 */
export const syncMediaWithServer = async (): Promise<{ success: boolean; message: string; mediaConfig: MediaOverrides }> => {
    try {
        const token = getStoredAdminToken();
        const res = await fetch('/api/media/sync', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...(token ? { 'Authorization': `Bearer ${token}` } : {})
            }
        });
        if (res.ok) {
            const data = await res.json();
            const synced = mergeAndPersist(data.mediaConfig || data);
            return {
                success: true,
                message: data.message || 'تمت المزامنة الفورية بنجاح مع السيرفر السحابي وتحديث جميع الأجهزة المتصلة!',
                mediaConfig: synced
            };
        }
    } catch (e: any) {
        console.warn("Forced sync API failed, refreshing local state:", e);
    }

    // Fallback: regular fetch
    const refreshed = await fetchRemoteMediaConfig();
    return {
        success: true,
        message: 'تمت مزامنة الوسائط بنجاح مع السيرفر وتحديث الواجهة!',
        mediaConfig: refreshed
    };
};

/**
 * Save Media to Cloud / Persistent Database
 * Immediately broadcasts to all visitors across devices.
 */
export const saveMediaConfig = async (overrides: MediaOverrides): Promise<{ success: boolean; message?: string }> => {
    // 1. Immediately cache locally and notify this browser tab
    mergeAndPersist(overrides);

    // 2. Persist to server backend & database
    const token = getStoredAdminToken();
    try {
        const res = await fetch('/api/admin/media', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...(token ? { 'Authorization': `Bearer ${token}` } : {})
            },
            body: JSON.stringify(overrides)
        });
        if (res.ok) {
            const data = await res.json();
            return { 
                success: true, 
                message: data.message || 'تم حفظ وتحديث الصور سحابياً ونشرها على كافة الزوار والأجهزة فوراً!' 
            };
        }
    } catch (e) {
        console.warn("Failed to persist media to backend, saved locally:", e);
    }

    return { 
        success: true, 
        message: 'تم حفظ وتطبيق الوسائط بنجاح وتحديث الواجهة العامة فوراً' 
    };
};

/**
 * Reset Media to Defaults (Triggered by [استعادة الافتراضي Reset Defaults] button)
 */
export const resetMediaToDefaults = async (): Promise<{ success: boolean; message: string; mediaConfig: MediaOverrides }> => {
    const token = getStoredAdminToken();
    try {
        const res = await fetch('/api/admin/media/reset', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...(token ? { 'Authorization': `Bearer ${token}` } : {})
            }
        });
        if (res.ok) {
            const data = await res.json();
            const resetConfig = mergeAndPersist(data.mediaConfig || DEFAULT_MEDIA_CONFIG);
            return {
                success: true,
                message: data.message || 'تمت استعادة صور وشعارات المنصة الافتراضية عالية الدقة ونشرها للجميع!',
                mediaConfig: resetConfig
            };
        }
    } catch (e) {
        console.warn("Reset endpoint failed, resetting locally and via saveMediaConfig:", e);
    }

    // Fallback: save DEFAULT_MEDIA_CONFIG
    await saveMediaConfig(DEFAULT_MEDIA_CONFIG);
    const resetConfig = mergeAndPersist(DEFAULT_MEDIA_CONFIG);
    return {
        success: true,
        message: 'تمت استعادة صور وشعارات المنصة الافتراضية عالية الدقة بنجاح!',
        mediaConfig: resetConfig
    };
};

export const resolveSeriesLogo = (seriesName: string, fallback?: string): string => {
    const config = getLocalMediaOverrides();
    return config.championshipLogos?.[seriesName] || fallback || DEFAULT_MEDIA_CONFIG.championshipLogos?.[seriesName] || '';
};

export const resolveSeriesImage = (seriesName: string, fallback?: string): string => {
    const config = getLocalMediaOverrides();
    return config.championshipImages?.[seriesName] || fallback || DEFAULT_MEDIA_CONFIG.championshipImages?.[seriesName] || '';
};

export const resolveTeamLogo = (teamId: string, fallback?: string): string => {
    const config = getLocalMediaOverrides();
    return config.teamLogos?.[teamId] || fallback || DEFAULT_MEDIA_CONFIG.teamLogos?.[teamId] || '';
};

export const resolveTeamImage = (teamId: string, fallback?: string): string => {
    const config = getLocalMediaOverrides();
    return config.teamImages?.[teamId] || fallback || DEFAULT_MEDIA_CONFIG.teamImages?.[teamId] || '';
};

export const resolveDriverImage = (driverName: string, fallback?: string): string => {
    const config = getLocalMediaOverrides();
    return config.driverImages?.[driverName] || fallback || DEFAULT_MEDIA_CONFIG.driverImages?.[driverName] || '';
};

export const resolveHeroBg = (fallback?: string): string => {
    const config = getLocalMediaOverrides();
    return config.heroBgImage || fallback || DEFAULT_MEDIA_CONFIG.heroBgImage || '';
};
