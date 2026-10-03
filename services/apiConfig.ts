/**
 * Bouden Motorsport - API & Cloud Synchronization Configuration
 */

const CUSTOM_CLOUD_URL_KEY = 'bms_custom_cloud_url';

export const getCustomCloudUrl = (): string => {
    try {
        if (typeof window !== 'undefined') {
            return localStorage.getItem(CUSTOM_CLOUD_URL_KEY) || '';
        }
    } catch {}
    return '';
};

export const setCustomCloudUrl = (url: string): void => {
    try {
        if (typeof window !== 'undefined') {
            if (url.trim()) {
                localStorage.setItem(CUSTOM_CLOUD_URL_KEY, url.trim().replace(/\/+$/, ''));
            } else {
                localStorage.removeItem(CUSTOM_CLOUD_URL_KEY);
            }
        }
    } catch {}
};

export const getApiUrl = (endpoint: string): string => {
    const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
    const customUrl = getCustomCloudUrl();
    if (customUrl) {
        return `${customUrl}${cleanEndpoint}`;
    }
    return cleanEndpoint;
};
