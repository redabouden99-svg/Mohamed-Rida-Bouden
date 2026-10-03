import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SeriesSelector from './components/SeriesSelector';
import QuickNews from './components/QuickNews';
import Dashboard from './components/Dashboard';
import Footer from './components/Footer';
import AdminPanel from './components/AdminPanel';
import AuthModal from './components/AuthModal';
import UserProfileModal from './components/UserProfileModal';
import RaceWeekendCountdown from './components/RaceWeekendCountdown';
import { SeriesId, SiteContent } from './types';
import { fetchSiteContent } from './services/adminService';
import { getStoredUser, UserAccount } from './services/authService';
import { initMediaRealtimeSync, fetchRemoteMediaConfig } from './services/mediaService';
import { applySyncTokenFromUrl } from './services/cloudSyncService';
import { initCrossDomainBridge } from './services/crossDomainBridge';
import { Globe, Lock, Shield } from 'lucide-react';

function App() {
  // Detection: Check if current route/hostname is admin portal (?subdomain=admin, /admin, #admin)
  const checkIsAdminPortal = (): boolean => {
    if (typeof window === 'undefined') return false;
    const host = window.location.hostname.toLowerCase();
    const path = window.location.pathname.toLowerCase();
    const hash = window.location.hash.toLowerCase();
    const search = new URLSearchParams(window.location.search);
    return (
      host.startsWith('admin.') ||
      host.startsWith('bouden-admin.') ||
      path === '/admin' ||
      path.startsWith('/admin') ||
      hash === '#admin' ||
      search.get('admin') === 'true' ||
      search.get('subdomain') === 'admin' ||
      search.get('domain') === 'admin' ||
      search.get('portal') === 'admin'
    );
  };

  const [isAdminPortal, setIsAdminPortal] = useState<boolean>(checkIsAdminPortal);

  // Main views on public site
  const [currentView, setCurrentView] = useState<'home' | 'dashboard'>('home');
  const [selectedSeries, setSelectedSeries] = useState<SeriesId | null>(null);
  const [dashboardTab, setDashboardTab] = useState<'results' | 'news' | 'analysis' | 'prediction' | 'teams' | 'standings' | 'archive'>('results');
  const [siteContent, setSiteContent] = useState<SiteContent | null>(null);

  // User Auth & Profile Modal State
  const [currentUser, setCurrentUser] = useState<UserAccount | null>(getStoredUser);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState<boolean>(false);

  // Load dynamic site content & start real-time cloud and cross-domain sync
  useEffect(() => {
    // 1. Check if visiting via a live sync token (?bms_sync=...)
    applySyncTokenFromUrl();

    // 2. Initialize cross-domain bridge listener
    initCrossDomainBridge(
      (freshMedia) => {
        // Handled automatically via local storage and listeners
      },
      (freshContent) => {
        if (freshContent) setSiteContent(freshContent);
      }
    );

    // 3. Initial load of content and media
    fetchSiteContent().then(content => {
      if (content) setSiteContent(content);
    });
    initMediaRealtimeSync();
    fetchRemoteMediaConfig();

    // 4. Background cloud sync check every 15 seconds (keeps visitors updated live)
    const syncInterval = setInterval(() => {
      fetchRemoteMediaConfig().catch(() => {});
      fetchSiteContent().then(c => {
        if (c) setSiteContent(c);
      }).catch(() => {});
    }, 15000);

    // 5. Listen for content updates triggered locally or via bridge
    const handleContentUpdated = (e: any) => {
      if (e.detail?.content) {
        setSiteContent(e.detail.content);
      }
    };
    window.addEventListener('bms_content_updated', handleContentUpdated);

    return () => {
      clearInterval(syncInterval);
      window.removeEventListener('bms_content_updated', handleContentUpdated);
    };
  }, []);

  // Sync user state on storage/event changes
  useEffect(() => {
    const handleAuthChange = (e: any) => {
      setCurrentUser(e.detail?.user || null);
    };
    window.addEventListener('bms_user_auth_change', handleAuthChange);
    return () => window.removeEventListener('bms_user_auth_change', handleAuthChange);
  }, []);

  // Listen for browser navigation & URL changes
  useEffect(() => {
    const handleLocationChange = () => {
      setIsAdminPortal(checkIsAdminPortal());
    };

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  // Switch between Admin Portal and Main Site
  const switchToAdminPortal = () => {
    const newUrl = '/admin';
    window.history.pushState(null, '', newUrl);
    setIsAdminPortal(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const switchToMainSite = () => {
    const newUrl = '/';
    window.history.pushState(null, '', newUrl);
    setIsAdminPortal(false);
    setCurrentView('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectSeries = (series: SeriesId, tab: 'results' | 'news' | 'analysis' | 'prediction' | 'teams' | 'standings' | 'archive' = 'results') => {
    setSelectedSeries(series);
    setDashboardTab(tab);
    setCurrentView('dashboard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigate = (view: 'home' | 'dashboard') => {
    if (view === 'dashboard' && !selectedSeries) {
      setSelectedSeries(SeriesId.F1);
    }
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // ==================== 1. DEDICATED ADMIN PORTAL ====================
  // If the visitor is on the admin path or subdomain (/admin, ?subdomain=admin, etc.)
  if (isAdminPortal) {
    return (
      <div className="min-h-screen bg-dark-900 text-white font-sans selection:bg-red-600 selection:text-white flex flex-col justify-between">
        <div>
          {/* Top Subdomain Bar indicator */}
          <div className="bg-gradient-to-r from-red-950 via-dark-900 to-red-950 border-b border-red-500/30 px-4 py-2 text-xs flex items-center justify-between">
            <div className="flex items-center gap-2 text-red-200">
              <span className="w-2 h-2 rounded-full bg-brand-brightGreen animate-pulse"></span>
              <strong className="font-mono text-white">bouden-admin.vercel.app</strong>
              <span className="hidden sm:inline text-gray-400">| لوحة التحكم المركزية للأدمن (Admin Central Portal)</span>
            </div>
            <button
              onClick={switchToMainSite}
              className="px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white text-[11px] font-bold flex items-center gap-1.5 transition-colors"
            >
              <Globe className="w-3 h-3 text-brand-brightGreen" />
              <span>الموقع الرئيسي (boudenmotorsport.vercel.app) →</span>
            </button>
          </div>

          <AdminPanel 
            isSubdomainPortal={true}
            onBackToSite={switchToMainSite}
            onContentUpdated={(newContent) => setSiteContent(newContent)}
          />
        </div>
      </div>
    );
  }

  // ==================== 2. MAIN PUBLIC PORTAL ====================
  return (
    <div className="min-h-screen bg-dark-900 text-white font-sans selection:bg-red-600 selection:text-white flex flex-col justify-between">
      <div>
        <Navbar 
          onNavigate={handleNavigate} 
          onSelectSeries={(s) => handleSelectSeries(s, 'news')} 
          currentSeries={selectedSeries}
          announcement={siteContent ? {
            active: siteContent.announcementActive,
            text: siteContent.announcementText,
            type: siteContent.announcementType,
            link: siteContent.announcementLink
          } : null}
          user={currentUser}
          onOpenAuth={() => setIsAuthModalOpen(true)}
          onOpenProfile={() => setIsProfileModalOpen(true)}
        />

        <main>
          {currentView === 'home' ? (
            <>
              <Hero 
                onExplore={() => {
                  const element = document.getElementById('race-weekend') || document.getElementById('series-selector');
                  element?.scrollIntoView({ behavior: 'smooth' });
                }} 
                siteContent={siteContent}
              />
              <RaceWeekendCountdown onSelectSeries={handleSelectSeries} />
              <div id="series-selector">
                <SeriesSelector onSelect={handleSelectSeries} />
              </div>
              <QuickNews />
            </>
          ) : (
            <Dashboard 
              series={selectedSeries || SeriesId.F1} 
              initialTab={dashboardTab}
            />
          )}
        </main>
      </div>

      <Footer />

      {/* User Login & Register Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onSuccess={(user) => {
          setCurrentUser(user);
        }}
      />

      {/* User Profile & Favorites Modal */}
      <UserProfileModal
        isOpen={isProfileModalOpen}
        user={currentUser}
        onClose={() => setIsProfileModalOpen(false)}
        onUserUpdated={(updated) => setCurrentUser(updated)}
        onLogout={() => setCurrentUser(null)}
      />
    </div>
  );
}

export default App;
