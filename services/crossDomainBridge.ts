/**
 * Bouden Motorsport - Real-Time Cross-Domain Sync Bridge
 * Links https://bouden-admin.vercel.app and https://boudenmotorsport.vercel.app
 * Ensures all modifications made on Admin are instantly applied to the Official Site.
 */

import { MediaOverrides, SiteContent } from '../types';

export const ADMIN_ORIGIN = 'https://bouden-admin.vercel.app';
export const MAIN_ORIGIN = 'https://boudenmotorsport.vercel.app';

const BROADCAST_CHANNEL_NAME = 'bms_cross_domain_sync_v1';
let broadcastChannel: BroadcastChannel | null = null;

try {
    if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
        broadcastChannel = new BroadcastChannel(BROADCAST_CHANNEL_NAME);
    }
} catch {
    broadcastChannel = null;
}

let bridgeIframe: HTMLIFrameElement | null = null;
let bridgeReady = false;
const pendingMessages: any[] = [];

/**
 * Check which domain we are currently running on
 */
export const getDomainInfo = () => {
    if (typeof window === 'undefined') {
        return { isAdminDomain: false, isMainDomain: false, currentOrigin: '' };
    }
    const host = window.location.hostname.toLowerCase();
    const origin = window.location.origin.toLowerCase();
    const search = new URLSearchParams(window.location.search);

    const isAdminDomain = 
        host.startsWith('bouden-admin') || 
        host.startsWith('admin.') || 
        search.get('portal') === 'admin' ||
        search.get('subdomain') === 'admin';

    const isMainDomain = !isAdminDomain;

    return {
        isAdminDomain,
        isMainDomain,
        currentOrigin: origin,
        peerOrigin: isAdminDomain ? MAIN_ORIGIN : ADMIN_ORIGIN
    };
};

/**
 * Initialize Bridge Receiver & Iframe Connector
 */
export const initCrossDomainBridge = (
    onMediaReceived?: (media: MediaOverrides) => void,
    onContentReceived?: (content: SiteContent) => void
) => {
    if (typeof window === 'undefined') return;

    const { isAdminDomain, peerOrigin } = getDomainInfo();

    // 1. Listen for BroadcastChannel messages (same-origin & multiple tabs)
    if (broadcastChannel) {
        broadcastChannel.onmessage = (event) => {
            const { type, payload } = event.data || {};
            if (type === 'BMS_SYNC_MEDIA' && payload) {
                try {
                    localStorage.setItem('bouden_media_overrides_v1', JSON.stringify(payload));
                    window.dispatchEvent(new CustomEvent('bms_media_updated', { detail: { overrides: payload } }));
                    onMediaReceived?.(payload);
                } catch {}
            }
            if (type === 'BMS_SYNC_CONTENT' && payload) {
                try {
                    localStorage.setItem('bms_site_content_override', JSON.stringify(payload));
                    window.dispatchEvent(new CustomEvent('bms_content_updated', { detail: { content: payload } }));
                    onContentReceived?.(payload);
                } catch {}
            }
        };
    }

    // 2. Listen for postMessage from parent / iframe bridge
    window.addEventListener('message', (event) => {
        // Security check: allow peer origin, current origin, vercel previews, and localhost
        const origin = (event.origin || '').toLowerCase();
        const isAllowedOrigin = 
            origin.includes('bouden') || 
            origin.includes('vercel.app') || 
            origin.includes('localhost') || 
            origin.includes('127.0.0.1');

        if (!isAllowedOrigin && event.origin !== '*') return;

        const { type, payload } = event.data || {};

        if (type === 'BMS_BRIDGE_PING') {
            event.source?.postMessage?.({ type: 'BMS_BRIDGE_PONG', timestamp: Date.now() }, event.origin as any);
        }

        if (type === 'BMS_BRIDGE_READY') {
            bridgeReady = true;
            // Flush pending messages
            while (pendingMessages.length > 0) {
                const msg = pendingMessages.shift();
                bridgeIframe?.contentWindow?.postMessage(msg, '*');
            }
        }

        if (type === 'BMS_SYNC_MEDIA' && payload) {
            try {
                localStorage.setItem('bouden_media_overrides_v1', JSON.stringify(payload));
                window.dispatchEvent(new CustomEvent('bms_media_updated', { detail: { overrides: payload } }));
                onMediaReceived?.(payload);
                // Send acknowledgment back
                event.source?.postMessage?.({ type: 'BMS_ACK_MEDIA', success: true }, event.origin as any);
            } catch (err) {
                console.warn("Bridge media storage error:", err);
            }
        }

        if (type === 'BMS_SYNC_CONTENT' && payload) {
            try {
                localStorage.setItem('bms_site_content_override', JSON.stringify(payload));
                window.dispatchEvent(new CustomEvent('bms_content_updated', { detail: { content: payload } }));
                onContentReceived?.(payload);
                // Send acknowledgment back
                event.source?.postMessage?.({ type: 'BMS_ACK_CONTENT', success: true }, event.origin as any);
            } catch (err) {
                console.warn("Bridge content storage error:", err);
            }
        }
    });

    // 3. If on admin domain or running standalone: mount hidden bridge iframe to peer domain
    const search = new URLSearchParams(window.location.search);
    const isBridgeFrame = search.get('bms_bridge') === '1';

    if (isBridgeFrame) {
        // We are inside the hidden iframe bridge -> notify parent window
        try {
            window.parent?.postMessage({ type: 'BMS_BRIDGE_READY' }, '*');
        } catch {}
        return;
    }

    // Mount peer bridge iframe to synchronize cross-origin storage
    if (typeof document !== 'undefined' && !bridgeIframe) {
        try {
            const iframe = document.createElement('iframe');
            iframe.id = 'bms-cross-domain-bridge';
            iframe.style.position = 'absolute';
            iframe.style.width = '1px';
            iframe.style.height = '1px';
            iframe.style.top = '-9999px';
            iframe.style.left = '-9999px';
            iframe.style.border = 'none';
            iframe.style.visibility = 'hidden';
            iframe.src = `${peerOrigin}/?bms_bridge=1`;

            iframe.onload = () => {
                bridgeReady = true;
                iframe.contentWindow?.postMessage({ type: 'BMS_BRIDGE_READY' }, '*');
            };

            document.body.appendChild(iframe);
            bridgeIframe = iframe;
        } catch (e) {
            console.warn("Could not mount cross-domain bridge iframe:", e);
        }
    }
};

/**
 * Push Media Overrides to Peer Domain & All Open Tabs
 */
export const syncMediaCrossDomain = (media: MediaOverrides): { broadcasted: boolean } => {
    // 1. Same-origin BroadcastChannel
    if (broadcastChannel) {
        try {
            broadcastChannel.postMessage({ type: 'BMS_SYNC_MEDIA', payload: media });
        } catch {}
    }

    // 2. Cross-domain Iframe postMessage
    const msg = { type: 'BMS_SYNC_MEDIA', payload: media };
    if (bridgeIframe && bridgeIframe.contentWindow) {
        try {
            bridgeIframe.contentWindow.postMessage(msg, '*');
        } catch (err) {
            console.warn("Failed to post message to bridge iframe:", err);
        }
    } else {
        pendingMessages.push(msg);
    }

    return { broadcasted: true };
};

/**
 * Push Site Content to Peer Domain & All Open Tabs
 */
export const syncContentCrossDomain = (content: SiteContent): { broadcasted: boolean } => {
    // 1. Same-origin BroadcastChannel
    if (broadcastChannel) {
        try {
            broadcastChannel.postMessage({ type: 'BMS_SYNC_CONTENT', payload: content });
        } catch {}
    }

    // 2. Cross-domain Iframe postMessage
    const msg = { type: 'BMS_SYNC_CONTENT', payload: content };
    if (bridgeIframe && bridgeIframe.contentWindow) {
        try {
            bridgeIframe.contentWindow.postMessage(msg, '*');
        } catch (err) {
            console.warn("Failed to post message to bridge iframe:", err);
        }
    } else {
        pendingMessages.push(msg);
    }

    return { broadcasted: true };
};
