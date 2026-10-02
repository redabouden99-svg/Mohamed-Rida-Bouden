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
        'mercedes_amg': 'https://upload.wikimedia.org/wikipedia/commons/f/fb/Mercedes_AMG_Petronas_F1_Logo.svg',
        'mclaren_f1': 'https://upload.wikimedia.org/wikipedia/en/6/66/McLaren_Racing_logo.svg',
        'scuderia_ferrari': 'https://upload.wikimedia.org/wikipedia/de/c/c0/Scuderia_Ferrari_Logo.svg',
        'redbull_racing': 'https://upload.wikimedia.org/wikipedia/en/5/52/Red_Bull_Racing_logo_2024.svg',
        'toyota_gazoo_wec': 'https://upload.wikimedia.org/wikipedia/commons/e/e7/Toyota_Gazoo_Racing_logo_2020.svg',
        'porsche_penske_wec': 'https://upload.wikimedia.org/wikipedia/de/2/2d/Porsche_Wappen.svg',
        'ferrari_af_corse': 'https://upload.wikimedia.org/wikipedia/de/c/c0/Scuderia_Ferrari_Logo.svg',
        'ducati_lenovo': 'https://upload.wikimedia.org/wikipedia/commons/8/87/Ducati_red_logo.svg',
        'schubert_motorsport_dtm': 'https://upload.wikimedia.org/wikipedia/commons/4/44/BMW.svg',
        'abt_sportsline_dtm': 'https://upload.wikimedia.org/wikipedia/commons/9/92/Audi-Logo_2016.svg',
        'manthey_ema_dtm': 'https://upload.wikimedia.org/wikipedia/de/2/2d/Porsche_Wappen.svg'
    },
    teamImages: {
        'mercedes_amg': 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=1200&auto=format&fit=crop',
        'mclaren_f1': 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?q=80&w=1200&auto=format&fit=crop',
        'scuderia_ferrari': 'https://images.unsplash.com/photo-1592634976722-13b3c3c78864?q=80&w=1200&auto=format&fit=crop',
        'toyota_gazoo_wec': 'https://images.unsplash.com/photo-1629219356886-c322b724497e?q=80&w=1200&auto=format&fit=crop',
        'porsche_penske_wec': 'https://newsroom.porsche.com/.imaging/mte/porsche-templating-theme/image_1290x726/dam/pnr/2023/Motorsports/WEC/Le-Mans-Test-Day/02-Porsche-963-Porsche-Penske-Motorsport.jpg/jcr:content/02-Porsche-963-Porsche-Penske-Motorsport.jpg',
        'ferrari_af_corse': 'https://images.unsplash.com/photo-1592634976722-13b3c3c78864?q=80&w=1200&auto=format&fit=crop',
        'ducati_lenovo': 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?q=80&w=1200&auto=format&fit=crop',
        'schubert_motorsport_dtm': 'https://images.unsplash.com/photo-1628185016593-3d0d8299d63c?q=80&w=1200&auto=format&fit=crop',
        'abt_sportsline_dtm': 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?q=80&w=1200&auto=format&fit=crop',
        'manthey_ema_dtm': 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?q=80&w=1200&auto=format&fit=crop'
    },
    driverImages: {
        'George Russell': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop',
        'Andrea Kimi Antonelli': 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600&auto=format&fit=crop',
        'Lando Norris': 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=600&auto=format&fit=crop',
        'Lewis Hamilton': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop',
        'Max Verstappen': 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600&auto=format&fit=crop',
        'Sébastien Buemi': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop',
        'Kévin Estre': 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600&auto=format&fit=crop',
        'Antonio Fuoco': 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=600&auto=format&fit=crop',
        'Francesco Bagnaia': 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=600&auto=format&fit=crop',
        'Marc Márquez': 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600&auto=format&fit=crop'
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

export const fetchRemoteMediaConfig = async (): Promise<MediaOverrides> => {
    try {
        const res = await fetch('/api/media');
        if (res.ok) {
            const data = await res.json();
            if (data && typeof data === 'object') {
                const merged: MediaOverrides = {
                    ...DEFAULT_MEDIA_CONFIG,
                    ...data,
                    championshipLogos: { ...DEFAULT_MEDIA_CONFIG.championshipLogos, ...(data.championshipLogos || {}) },
                    championshipImages: { ...DEFAULT_MEDIA_CONFIG.championshipImages, ...(data.championshipImages || {}) },
                    teamLogos: { ...DEFAULT_MEDIA_CONFIG.teamLogos, ...(data.teamLogos || {}) },
                    teamImages: { ...DEFAULT_MEDIA_CONFIG.teamImages, ...(data.teamImages || {}) },
                    driverImages: { ...DEFAULT_MEDIA_CONFIG.driverImages, ...(data.driverImages || {}) }
                };
                if (typeof window !== 'undefined') {
                    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(merged));
                }
                notifyListeners(merged);
                return merged;
            }
        }
    } catch {}
    return getLocalMediaOverrides();
};

export const saveMediaConfig = async (overrides: MediaOverrides): Promise<{ success: boolean; message?: string }> => {
    // 1. Immediately cache in localStorage and notify active UI components across the platform
    try {
        if (typeof window !== 'undefined') {
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(overrides));
        }
        notifyListeners(overrides);
    } catch (e) {
        console.warn("Failed to save media to localStorage:", e);
    }

    // 2. Persist to server if admin authenticated
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
            return { success: true, message: data.message || 'تم حفظ وتطبيق وسائط وشعارات المنصة بنجاح في الواجهة العامة فوراً' };
        }
    } catch (e) {
        console.warn("Failed to persist media to backend, saved locally:", e);
    }

    return { success: true, message: 'تم حفظ وتطبيق وسائط وشعارات المنصة محلياً بنجاح في الواجهة العامة فوراً' };
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
