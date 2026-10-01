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
import { SeriesId, SiteContent } from './types';
import { fetchSiteContent } from './services/adminService';
import { getStoredUser, UserAccount } from './services/authService';
import { ShieldAlert, ArrowLeft, ExternalLink, Globe, Lock, ArrowRight } from 'lucide-react';

function App() {
  // Subdomain Detection: Check if current hostname is admin subdomain or requested via ?subdomain=admin
  const checkIsAdminSubdomain = (): boolean => {
    if (typeof window === 'undefined') return false;
    const host = window.location.hostname.toLowerCase();
    const search = new URLSearchParams(window.location.search);
    return (
      host.startsWith('admin.') ||
      host.startsWith('bouden-admin.') ||
      search.get('subdomain') === 'admin' ||
      search.get('domain') === 'admin' ||
      search.get('portal') === 'admin'
    );
  };

  const [isAdminSubdomain, setIsAdminSubdomain] = useState<boolean>(checkIsAdminSubdomain);

  // Check if visitor on main site is attempting to access /admin or #admin
  const checkIsBlockedAdminPath = (): boolean => {
    if (typeof window === 'undefined') return false;
    if (checkIsAdminSubdomain()) return false;
    const path = window.location.pathname.toLowerCase();
    const hash = window.location.hash.toLowerCase();
    const search = new URLSearchParams(window.location.search);
    return path === '/admin' || path.startsWith('/admin/') || hash === '#admin' || search.get('blocked_admin') === 'true';
  };

  const [isBlockedAdminAttempt, setIsBlockedAdminAttempt] = useState<boolean>(checkIsBlockedAdminPath);

  // Main views on public site
  const [currentView, setCurrentView] = useState<'home' | 'dashboard'>('home');
  const [selectedSeries, setSelectedSeries] = useState<SeriesId | null>(null);
  const [dashboardTab, setDashboardTab] = useState<'results' | 'news' | 'analysis' | 'prediction' | 'teams' | 'standings' | 'archive'>('results');
  const [siteContent, setSiteContent] = useState<SiteContent | null>(null);

  // User Auth & Profile Modal State
  const [currentUser, setCurrentUser] = useState<UserAccount | null>(getStoredUser);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState<boolean>(false);

  // Load dynamic site content
  useEffect(() => {
    fetchSiteContent().then(content => {
      if (content) setSiteContent(content);
    });
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
      const isSub = checkIsAdminSubdomain();
      setIsAdminSubdomain(isSub);
      setIsBlockedAdminAttempt(checkIsBlockedAdminPath());
    };

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  // Switch between Subdomain (bouden-admin) and Main Site (boudenmotorsport)
  const switchToAdminSubdomain = () => {
    const search = new URLSearchParams(window.location.search);
    search.set('subdomain', 'admin');
    search.delete('blocked_admin');
    const newUrl = `${window.location.pathname}?${search.toString()}`;
    window.history.pushState(null, '', newUrl);
    setIsAdminSubdomain(true);
    setIsBlockedAdminAttempt(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const switchToMainSite = () => {
    const search = new URLSearchParams(window.location.search);
    search.delete('subdomain');
    search.delete('domain');
    search.delete('portal');
    search.delete('blocked_admin');
    const searchStr = search.toString();
    const newUrl = `/${searchStr ? `?${searchStr}` : ''}`;
    window.history.pushState(null, '', newUrl);
    setIsAdminSubdomain(false);
    setIsBlockedAdminAttempt(false);
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

  // ==================== 1. DEDICATED ADMIN SUBDOMAIN PORTAL ====================
  // If the visitor is on the admin subdomain (bouden-admin.vercel.app or ?subdomain=admin)
  if (isAdminSubdomain) {
    return (
      <div className="min-h-screen bg-dark-900 text-white font-sans selection:bg-red-600 selection:text-white flex flex-col justify-between">
        <div>
          {/* Top Subdomain Bar indicator */}
          <div className="bg-gradient-to-r from-red-950 via-dark-900 to-red-950 border-b border-red-500/30 px-4 py-2 text-xs flex items-center justify-between">
            <div className="flex items-center gap-2 text-red-200">
              <span className="w-2 h-2 rounded-full bg-brand-brightGreen animate-pulse"></span>
              <strong className="font-mono text-white">bouden-admin.vercel.app</strong>
              <span className="hidden sm:inline text-gray-400">| النطاق الفرعي المستقل للوحة التحكم (Admin Subdomain)</span>
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
          {/* If visitor attempted to access /admin or #admin on the main site -> Show Access Closed Notice */}
          {isBlockedAdminAttempt ? (
            <div className="max-w-3xl mx-auto px-4 py-20 text-center">
              <div className="bg-dark-800/90 border border-red-500/30 rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden backdrop-blur-xl">
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-brand-red via-orange-500 to-amber-500"></div>

                <div className="w-16 h-16 rounded-2xl bg-brand-red/10 border border-brand-red/30 text-brand-red flex items-center justify-center mx-auto mb-6 shadow-lg shadow-brand-red/20">
                  <ShieldAlert className="w-8 h-8" />
                </div>

                <span className="px-3.5 py-1 rounded-full bg-red-950/80 border border-red-500/40 text-red-300 text-xs font-bold uppercase tracking-wider inline-block mb-3">
                  مسار مغلق من الواجهة العامة / Access Restricted
                </span>

                <h1 className="text-2xl sm:text-3xl font-display font-black text-white mb-4">
                  تم إغلاق مسار <code className="text-brand-red font-mono px-2 py-0.5 bg-white/5 rounded-lg">/admin</code> نهائياً
                </h1>

                <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-6 max-w-xl mx-auto">
                  حفاظاً على أمان المنصة، تم فصل لوحة تحكم الأدمن بالكامل عن الموقع الرئيسي وتحويلها إلى نظام مستقل يعمل عبر <strong className="text-white">Subdomain مخصص</strong>:
                  <br />
                  <span className="inline-block mt-2 font-mono text-brand-brightGreen bg-dark-900 px-4 py-1.5 rounded-xl border border-white/10 text-sm">
                    bouden-admin.vercel.app
                  </span>
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    onClick={switchToAdminSubdomain}
                    className="w-full sm:w-auto px-6 py-3 rounded-xl bg-brand-red hover:bg-red-600 text-white font-bold text-sm tracking-wide shadow-lg shadow-brand-red/30 flex items-center justify-center gap-2 transition-all"
                  >
                    <Lock className="w-4 h-4" />
                    <span>الدخول عبر Subdomain الأدمن المستقل</span>
                  </button>

                  <button
                    onClick={() => {
                      setIsBlockedAdminAttempt(false);
                      handleNavigate('home');
                    }}
                    className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm flex items-center justify-center gap-2 transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>العودة للصفحة الرئيسية</span>
                  </button>
                </div>
              </div>
            </div>
          ) : currentView === 'home' ? (
            <>
              <Hero 
                onExplore={() => {
                  const element = document.getElementById('series-selector');
                  element?.scrollIntoView({ behavior: 'smooth' });
                }} 
                siteContent={siteContent}
              />
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

      {/* Floating Subdomain Testing Switcher (Pill for seamless preview testing between Main Site and Subdomain Admin) */}
      <div className="fixed bottom-4 left-4 z-40">
        <button
          onClick={switchToAdminSubdomain}
          className="group px-3 py-1.5 rounded-full bg-dark-800/90 hover:bg-dark-700 text-gray-400 hover:text-white border border-white/15 text-[11px] font-bold shadow-2xl backdrop-blur-md flex items-center gap-2 transition-all duration-200 hover:border-brand-red"
          title="محاكاة التبديل إلى Subdomain الأدمن المستقل (bouden-admin.vercel.app)"
        >
          <span className="w-2 h-2 rounded-full bg-yellow-400 group-hover:bg-brand-red transition-colors"></span>
          <span>تبديل النطاق: <strong>bouden-admin.vercel.app</strong></span>
          <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>

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
