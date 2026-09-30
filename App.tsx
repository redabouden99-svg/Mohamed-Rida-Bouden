import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SeriesSelector from './components/SeriesSelector';
import QuickNews from './components/QuickNews';
import Dashboard from './components/Dashboard';
import Footer from './components/Footer';
import { SeriesId } from './types';

function App() {
  const [currentView, setCurrentView] = useState<'home' | 'dashboard'>('home');
  const [selectedSeries, setSelectedSeries] = useState<SeriesId | null>(null);
  const [dashboardTab, setDashboardTab] = useState<'news' | 'analysis' | 'prediction' | 'teams'>('news');

  const handleSelectSeries = (series: SeriesId, tab: 'news' | 'analysis' | 'prediction' | 'teams' = 'news') => {
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

  return (
    <div className="min-h-screen bg-dark-900 text-white font-sans selection:bg-red-600 selection:text-white">
      <Navbar 
        onNavigate={handleNavigate} 
        onSelectSeries={(s) => handleSelectSeries(s, 'news')} 
        currentSeries={selectedSeries}
      />

      <main>
        {currentView === 'home' ? (
          <>
            <Hero onExplore={() => {
                const element = document.getElementById('series-selector');
                element?.scrollIntoView({ behavior: 'smooth' });
            }} />
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

      <Footer />
    </div>
  );
}

export default App;