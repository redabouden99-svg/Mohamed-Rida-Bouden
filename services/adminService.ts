import { SiteContent } from '../types';

const TOKEN_KEY = 'bms_admin_token';

export const getStoredAdminToken = (): string | null => {
    try {
        return localStorage.getItem(TOKEN_KEY);
    } catch {
        return null;
    }
};

export const setStoredAdminToken = (token: string): void => {
    try {
        localStorage.setItem(TOKEN_KEY, token);
    } catch (e) {
        console.error("Storage error:", e);
    }
};

export const clearStoredAdminToken = (): void => {
    try {
        localStorage.removeItem(TOKEN_KEY);
    } catch (e) {
        console.error("Storage error:", e);
    }
};

const getAuthHeaders = (): Record<string, string> => {
    const token = getStoredAdminToken();
    return {
        'Content-Type': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {})
    };
};

export const fetchSiteContent = async (): Promise<SiteContent> => {
    try {
        const res = await fetch('/api/site-content');
        if (res.ok) {
            return await res.json();
        }
    } catch (e) {
        console.warn("Failed to fetch dynamic site content:", e);
    }
    return {
        heroTitle: "RACE. ANALYZE. PREDICT.",
        heroTitleHighlight: "ANALYZE.",
        heroSubtitle: "The ultimate AI-powered hub for Teams, Drivers & Live Strategy.",
        heroBgImage: "https://newsroom.porsche.com/.imaging/mte/porsche-templating-theme/image_1290x726/dam/pnr/2023/Motorsports/WEC/Le-Mans-Test-Day/02-Porsche-963-Porsche-Penske-Motorsport.jpg/jcr:content/02-Porsche-963-Porsche-Penske-Motorsport.jpg",
        announcementActive: true,
        announcementText: "🏎️ Live AI Strategy Engine active for 2026 season. Real-time telemetry & predictive modeling enabled.",
        announcementType: "info",
        announcementLink: "#series-selector",
        customNews: []
    };
};

export const adminLogin = async (password: string): Promise<{ success: boolean; token?: string; message?: string }> => {
    try {
        const res = await fetch('/api/admin/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ password })
        });
        const data = await res.json();
        if (res.ok && data.success && data.token) {
            setStoredAdminToken(data.token);
        }
        return data;
    } catch (err: any) {
        return { success: false, message: err.message || "Failed to reach server" };
    }
};

export const adminVerify = async (): Promise<boolean> => {
    const token = getStoredAdminToken();
    if (!token) return false;
    try {
        const res = await fetch('/api/admin/verify', {
            headers: getAuthHeaders()
        });
        return res.ok;
    } catch {
        return false;
    }
};

export const fetchAdminConfig = async () => {
    const res = await fetch('/api/admin/config', {
        headers: getAuthHeaders()
    });
    if (!res.ok) throw new Error("Failed to fetch admin config");
    return await res.json();
};

export const updateGeminiKey = async (apiKey: string) => {
    const res = await fetch('/api/admin/gemini-key', {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ apiKey })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to update Gemini key");
    return data;
};

export const testGeminiKey = async () => {
    const res = await fetch('/api/admin/test-gemini', {
        method: 'POST',
        headers: getAuthHeaders()
    });
    const data = await res.json();
    return data;
};

export const updateSiteContent = async (siteContent: Partial<SiteContent>) => {
    const res = await fetch('/api/admin/content', {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ siteContent })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to update site content");
    return data;
};

export const changeAdminPassword = async (currentPassword: string, newPassword: string) => {
    const res = await fetch('/api/admin/change-password', {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ currentPassword, newPassword })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to change password");
    return data;
};

export const adminLogout = async (): Promise<void> => {
    try {
        await fetch('/api/admin/logout', {
            method: 'POST',
            headers: getAuthHeaders()
        });
    } catch {}
    clearStoredAdminToken();
};
