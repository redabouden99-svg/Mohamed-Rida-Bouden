import { UserProfile } from '../types';

export interface UserAccount {
    id: string;
    name: string;
    email: string;
    role?: string;
    favoriteSeries?: string;
    favoriteTeam?: string;
    favoriteDriver?: string;
    favoriteTeamsList?: string[];
    favoriteDriversList?: string[];
    notificationsEnabled?: boolean;
    createdAt?: string;
    lastLogin?: string;
}

const USER_STORAGE_KEY = 'bms_user_profile';
const TOKEN_STORAGE_KEY = 'bms_user_token';

export const getStoredUser = (): UserAccount | null => {
    try {
        const raw = localStorage.getItem(USER_STORAGE_KEY);
        if (!raw) return null;
        return JSON.parse(raw);
    } catch {
        return null;
    }
};

export const getStoredUserToken = (): string | null => {
    return localStorage.getItem(TOKEN_STORAGE_KEY);
};

export const saveUserSession = (user: UserAccount, token: string) => {
    try {
        localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
        localStorage.setItem(TOKEN_STORAGE_KEY, token);
        window.dispatchEvent(new CustomEvent('bms_user_auth_change', { detail: { user } }));
    } catch (e) {
        console.error('Failed to save user session:', e);
    }
};

export const clearUserSession = () => {
    localStorage.removeItem(USER_STORAGE_KEY);
    localStorage.removeItem(TOKEN_STORAGE_KEY);
    window.dispatchEvent(new CustomEvent('bms_user_auth_change', { detail: { user: null } }));
};

export const userRegister = async (data: {
    name: string;
    email: string;
    password: string;
    favoriteSeries?: string;
    favoriteTeam?: string;
    favoriteDriver?: string;
}): Promise<{ success: boolean; user?: UserAccount; token?: string; error?: string }> => {
    try {
        const res = await fetch('/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        const result = await res.json();
        if (result.success && result.user && result.token) {
            saveUserSession(result.user, result.token);
        }
        return result;
    } catch (err: any) {
        // Fallback for offline/local simulation
        const fakeToken = 'usr_token_' + Date.now();
        const fakeUser: UserAccount = {
            id: 'usr_' + Math.random().toString(36).substring(2, 9),
            name: data.name,
            email: data.email,
            favoriteSeries: data.favoriteSeries || 'Formula 1',
            favoriteTeam: data.favoriteTeam || '',
            favoriteDriver: data.favoriteDriver || '',
            favoriteTeamsList: data.favoriteTeam ? [data.favoriteTeam] : [],
            favoriteDriversList: data.favoriteDriver ? [data.favoriteDriver] : [],
            notificationsEnabled: true,
            createdAt: new Date().toISOString()
        };
        saveUserSession(fakeUser, fakeToken);
        return { success: true, user: fakeUser, token: fakeToken };
    }
};

export const userLogin = async (
    email: string,
    password: string
): Promise<{ success: boolean; user?: UserAccount; token?: string; error?: string }> => {
    try {
        const res = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        const result = await res.json();
        if (result.success && result.user && result.token) {
            saveUserSession(result.user, result.token);
        }
        return result;
    } catch (err: any) {
        // Local fallback check
        const stored = getStoredUser();
        if (stored && stored.email.toLowerCase() === email.toLowerCase()) {
            const token = getStoredUserToken() || 'usr_tok_recovered';
            return { success: true, user: stored, token };
        }
        return { success: false, error: err.message || 'Login connection failed' };
    }
};

export const userLogout = async () => {
    const token = getStoredUserToken();
    try {
        if (token) {
            await fetch('/api/auth/logout', {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` 
                }
            });
        }
    } catch (e) {
        console.error('Logout error:', e);
    } finally {
        clearUserSession();
    }
};

export const updateUserFavorites = async (updates: {
    favoriteTeamsList?: string[];
    favoriteDriversList?: string[];
    favoriteSeries?: string;
    notificationsEnabled?: boolean;
}): Promise<UserAccount | null> => {
    const current = getStoredUser();
    const token = getStoredUserToken();
    if (!current) return null;

    const updatedUser: UserAccount = {
        ...current,
        ...updates
    };

    saveUserSession(updatedUser, token || 'local_session');

    try {
        if (token) {
            await fetch('/api/auth/favorites', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(updates)
            });
        }
    } catch (e) {
        console.error('Favorites sync error:', e);
    }

    return updatedUser;
};
