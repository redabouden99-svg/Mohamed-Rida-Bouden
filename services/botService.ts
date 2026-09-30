import { SeriesId, SeriesResultsData } from '../types';

export const fetchSeriesResults = async (series: SeriesId): Promise<SeriesResultsData | null> => {
    try {
        const encoded = encodeURIComponent(series);
        const res = await fetch(`/api/results/${encoded}`, {
            headers: { 'Accept': 'application/json' }
        });
        if (!res.ok) {
            console.warn(`Failed to fetch results for ${series}: ${res.status}`);
            return null;
        }
        const data = await res.json();
        if (data && data.success) {
            return data as SeriesResultsData;
        }
        return null;
    } catch (e) {
        console.error(`Error in fetchSeriesResults for ${series}:`, e);
        return null;
    }
};

export const syncSeriesBot = async (series: SeriesId): Promise<{ success: boolean; data?: SeriesResultsData; message?: string }> => {
    try {
        const encoded = encodeURIComponent(series);
        const res = await fetch(`/api/results/${encoded}/sync`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });
        const data = await res.json();
        if (res.ok && data.success) {
            return { success: true, data: data as SeriesResultsData, message: data.message };
        }
        return { success: false, message: data.error || data.message || 'Sync failed' };
    } catch (e: any) {
        console.error(`Error in syncSeriesBot for ${series}:`, e);
        return { success: false, message: e.message || 'Network error during bot sync' };
    }
};

export const fetchAllBotStatuses = async (): Promise<any[]> => {
    try {
        const res = await fetch('/api/bots', {
            headers: { 'Accept': 'application/json' }
        });
        if (!res.ok) return [];
        const data = await res.json();
        return data.bots || [];
    } catch {
        return [];
    }
};

export const resetResultsCache = async (): Promise<boolean> => {
    try {
        const res = await fetch('/api/results/reset', {
            method: 'POST',
            headers: { 'Accept': 'application/json' }
        });
        const data = await res.json();
        return Boolean(data.success);
    } catch {
        return false;
    }
};

