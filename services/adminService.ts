import { SiteContent } from '../types';

const TOKEN_KEY = 'bms_admin_token';
const USER_KEY = 'bms_admin_user';

export const getStoredAdminToken = (): string | null => {
    try {
        return localStorage.getItem(TOKEN_KEY);
    } catch {
        return null;
    }
};

export const setStoredAdminSession = (token: string, username?: string): void => {
    try {
        localStorage.setItem(TOKEN_KEY, token);
        if (username) localStorage.setItem(USER_KEY, username);
    } catch (e) {
        console.error("Storage error:", e);
    }
};

export const getStoredAdminUser = (): string => {
    try {
        return localStorage.getItem(USER_KEY) || 'bouden';
    } catch {
        return 'bouden';
    }
};

export const clearStoredAdminToken = (): void => {
    try {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(USER_KEY);
    } catch (e) {
        console.error("Storage error:", e);
    }
};

const getAuthHeaders = (): Record<string, string> => {
    const token = getStoredAdminToken();
    return {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {})
    };
};

// Safe JSON parser to completely eliminate "Unexpected token 'T', not valid JSON" errors
async function safeJsonParse(res: Response): Promise<any> {
    const text = await res.text();
    if (!text || text.trim() === '') {
        return { success: res.ok, status: res.status };
    }
    try {
        return JSON.parse(text);
    } catch {
        return {
            success: false,
            message: text.length > 200 ? text.substring(0, 200) + '...' : text,
            status: res.status
        };
    }
}

export const fetchSiteContent = async (): Promise<SiteContent> => {
    try {
        const res = await fetch('/api/site-content', {
            headers: { 'Accept': 'application/json' }
        });
        if (res.ok) {
            const data = await safeJsonParse(res);
            if (data && typeof data === 'object') {
                return data;
            }
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

export const adminLogin = async (username: string, password: string): Promise<{ success: boolean; token?: string; message?: string; user?: any }> => {
    try {
        const res = await fetch('/api/admin/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({ 
                username: username.trim(), 
                password: password.trim() 
            })
        });
        const data = await safeJsonParse(res);
        if (res.ok && data.success && data.token) {
            setStoredAdminSession(data.token, data.user?.username || username);
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
        if (!res.ok) {
            clearStoredAdminToken();
            return false;
        }
        const data = await safeJsonParse(res);
        return Boolean(data.success && data.valid);
    } catch {
        return false;
    }
};

export const fetchAdminConfig = async () => {
    const res = await fetch('/api/admin/config', {
        headers: getAuthHeaders()
    });
    const data = await safeJsonParse(res);
    if (!res.ok || !data.success) {
        throw new Error(data.message || data.error || "Failed to fetch admin config");
    }
    return data;
};

export const updateGeminiKey = async (apiKey: string) => {
    const res = await fetch('/api/admin/gemini-key', {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ apiKey })
    });
    const data = await safeJsonParse(res);
    if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to update Gemini key");
    }
    return data;
};

export const testGeminiKey = async () => {
    const res = await fetch('/api/admin/test-gemini', {
        method: 'POST',
        headers: getAuthHeaders()
    });
    return await safeJsonParse(res);
};

export const updateSiteContent = async (siteContent: Partial<SiteContent>) => {
    const res = await fetch('/api/admin/content', {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ siteContent })
    });
    const data = await safeJsonParse(res);
    if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to update site content");
    }
    return data;
};

export const changeAdminCredentials = async (currentPassword: string, newUsername?: string, newPassword?: string) => {
    const res = await fetch('/api/admin/change-password', {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ currentPassword, newUsername, newPassword })
    });
    const data = await safeJsonParse(res);
    if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to update credentials");
    }
    if (newUsername) {
        localStorage.setItem(USER_KEY, newUsername);
    }
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

export const fetchAdminUsers = async (): Promise<{ count: number; users: any[] }> => {
    try {
        const res = await fetch('/api/admin/users', {
            headers: getAuthHeaders()
        });
        const data = await safeJsonParse(res);
        if (data && data.success) {
            return { count: data.count || 0, users: data.users || [] };
        }
        return { count: 0, users: [] };
    } catch {
        return { count: 0, users: [] };
    }
};

export const syncAllBotsRequest = async (): Promise<{ success: boolean; message: string; results?: any[] }> => {
    try {
        const res = await fetch('/api/bots/sync/all', {
            method: 'POST',
            headers: getAuthHeaders()
        });
        const data = await safeJsonParse(res);
        return data;
    } catch (e: any) {
        return { success: false, message: e.message || 'Bot sync network error' };
    }
};
