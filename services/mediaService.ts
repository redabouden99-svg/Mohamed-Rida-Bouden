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
        'Formula 1': 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=1200&auto=format&fit=crop',
        'MotoGP': 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?q=80&w=1200&auto=format&fit=crop',
        'WEC': 'https://images.unsplash.com/photo-1592634976722-13b3c3c78864?q=80&w=1200&auto=format&fit=crop',
        'IMSA': 'https://images.unsplash.com/photo-1558564244-64506927d2c3?q=80&w=1200&auto=format&fit=crop',
        'GT World Challenge': 'https://images.unsplash.com/photo-1628185016593-3d0d8299d63c?q=80&w=1200&auto=format&fit=crop',
        'DTM': 'https://images.unsplash.com/photo-1629219356886-c322b724497e?q=80&w=1200&auto=format&fit=crop'
    },
    teamLogos: {},
    teamImages: {},
    driverImages: {},
    heroBgImage: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=2400&auto=format&fit=crop'
};

// Listeners for real-time reactivity across components
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
};

export const getLocalMediaOverrides = (): MediaOverrides => {
    try {
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
                localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(merged));
                notifyListeners(merged);
                return merged;
            }
        }
    } catch {}
    return getLocalMediaOverrides();
};

export const saveMediaConfig = async (overrides: MediaOverrides): Promise<{ success: boolean; message?: string }> => {
    // 1. Immediately cache in localStorage and notify active UI components
    try {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(overrides));
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
            return { success: true, message: data.message || 'تم حفظ وتطبيق التعديلات بنجاح' };
        }
    } catch (e) {
        console.warn("Failed to persist media to backend, saved locally:", e);
    }

    return { success: true, message: 'تم حفظ وتطبيق التعديلات محلياً بنجاح' };
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
    return config.teamLogos?.[teamId] || fallback || '';
};

export const resolveTeamImage = (teamId: string, fallback?: string): string => {
    const config = getLocalMediaOverrides();
    return config.teamImages?.[teamId] || fallback || '';
};

export const resolveDriverImage = (driverName: string, fallback?: string): string => {
    const config = getLocalMediaOverrides();
    return config.driverImages?.[driverName] || fallback || '';
};

export const resolveHeroBg = (fallback?: string): string => {
    const config = getLocalMediaOverrides();
    return config.heroBgImage || fallback || DEFAULT_MEDIA_CONFIG.heroBgImage || '';
};
