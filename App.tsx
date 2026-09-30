import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SeriesSelector from './components/SeriesSelector';
import QuickNews from './components/QuickNews';
import Dashboard from './components/Dashboard';
import Footer from './components/Footer';
import AdminPanel from './components/AdminPanel';
import { SeriesId, SiteContent } from './types';
import { fetchSiteContent } from './services/adminService';

function App() {
  const [currentView, setCurrentView] = useState<'home' | 'dashboard' | 'admin'>(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();
      if (path === '/admin' || hash === '#admin') return 'admin';
    }
    return 'home';
  });

  const [selectedSeries, setSelectedSeries] = useState<SeriesId | null>(null);
  const [dashboardTab, setDashboardTab] = useState<'results' | 'news' | 'analysis' | 'prediction' | 'teams' | 'standings'>('results');
  const [siteContent, setSiteContent] = useState<SiteContent | null>(null);

  // Load dynamic site content
  useEffect(() => {
    fetchSiteContent().then(content => {
      if (content) setSiteContent(content);
    });
  }, []);

  // Handle browser back/forward and hash changes
  useEffect(() => {
    const handleLocationChange = () => {
      const path = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();
      if (path === '/admin' || hash === '#admin') {
        setCurrentView('admin');
      } else if (currentView === 'admin') {
        setCurrentView('home');
      }
    };

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, [currentView]);

  const handleSelectSeries = (series: SeriesId, tab: 'results' | 'news' | 'analysis' | 'prediction' | 'teams' | 'standings' = 'results') => {
    setSelectedSeries(series);
    setDashboardTab(tab);
    setCurrentView('dashboard');
    if (window.location.pathname === '/admin' || window.location.hash === '#admin') {
      window.history.pushState(null, '', '/');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigate = (view: 'home' | 'dashboard' | 'admin') => {
    if (view === 'dashboard' && !selectedSeries) {
      setSelectedSeries(SeriesId.F1);
    }
    setCurrentView(view);

    // Update URL bar cleanly
    if (view === 'admin') {
      window.history.pushState(null, '', '/admin');
    } else {
      if (window.location.pathname === '/admin' || window.location.hash === '#admin') {
        window.history.pushState(null, '', '/');
      }
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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
        />

        <main>
          {currentView === 'admin' ? (
            <AdminPanel 
              onBackToSite={() => handleNavigate('home')}
              onContentUpdated={(newContent) => setSiteContent(newContent)}
            />
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

      <Footer onNavigateToAdmin={() => handleNavigate('admin')} />
    </div>
  );
}

export default App;
