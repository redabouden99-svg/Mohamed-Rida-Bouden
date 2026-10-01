import React, { useState, useEffect } from 'react';
import { 
    Clock, Calendar, MapPin, Flag, ChevronRight, 
    Sparkles, Radio, Timer, Globe, CheckCircle2, ChevronLeft
} from 'lucide-react';
import { SeriesId } from '../types';

interface SessionSchedule {
    name: string;
    arabicName: string;
    day: string;
    dateStr: string; // ISO date string
    trackTimeStr: string;
}

interface UpcomingRaceEvent {
    id: string;
    series: SeriesId;
    seriesKey: string;
    badge: string;
    accentColor: string;
    round: number;
    totalRounds: number;
    raceName: string;
    circuit: string;
    location: string;
    countryCode: string;
    targetRaceDate: string; // ISO format
    trackTimezone: string;
    trackUtcOffset: string;
    sessions: SessionSchedule[];
    circuitMapImg?: string;
}

export const UPCOMING_RACES: UpcomingRaceEvent[] = [
    {
        id: 'f1-malaysia',
        series: SeriesId.F1,
        seriesKey: 'f1',
        badge: 'F1®',
        accentColor: '#ff1801',
        round: 19,
        totalRounds: 24,
        raceName: 'Petronas Malaysian Grand Prix 2026',
        circuit: 'Sepang International Circuit',
        location: 'Sepang, Selangor, Malaysia',
        countryCode: 'MYS',
        targetRaceDate: new Date(Date.now() + 6 * 24 * 3600 * 1000 + 14 * 3600 * 1000).toISOString(),
        trackTimezone: 'Asia/Kuala_Lumpur',
        trackUtcOffset: 'UTC+8',
        sessions: [
            { name: 'Free Practice 1', arabicName: 'التجارب الحرة الأولى', day: 'الجمعة', dateStr: new Date(Date.now() + 4 * 24 * 3600 * 1000).toISOString(), trackTimeStr: '11:30 MYT' },
            { name: 'Free Practice 2', arabicName: 'التجارب الحرة الثانية', day: 'الجمعة', dateStr: new Date(Date.now() + 4 * 24 * 3600 * 1000 + 4 * 3600 * 1000).toISOString(), trackTimeStr: '15:00 MYT' },
            { name: 'Free Practice 3', arabicName: 'التجارب الحرة الثالثة', day: 'السبت', dateStr: new Date(Date.now() + 5 * 24 * 3600 * 1000).toISOString(), trackTimeStr: '11:30 MYT' },
            { name: 'Qualifying', arabicName: 'التجارب التأهيلية الرسمية', day: 'السبت', dateStr: new Date(Date.now() + 5 * 24 * 3600 * 1000 + 4 * 3600 * 1000).toISOString(), trackTimeStr: '15:00 MYT' },
            { name: 'Grand Prix Race', arabicName: 'السباق الرئيسي (56 لفة)', day: 'الأحد', dateStr: new Date(Date.now() + 6 * 24 * 3600 * 1000 + 14 * 3600 * 1000).toISOString(), trackTimeStr: '15:00 MYT' }
        ]
    },
    {
        id: 'motogp-motegi',
        series: SeriesId.MOTOGP,
        seriesKey: 'motogp',
        badge: 'MotoGP™',
        accentColor: '#0090ff',
        round: 16,
        totalRounds: 21,
        raceName: 'Motul Grand Prix of Japan 2026',
        circuit: 'Mobility Resort Motegi',
        location: 'Motegi, Tochigi, Japan',
        countryCode: 'JPN',
        targetRaceDate: new Date(Date.now() + 13 * 24 * 3600 * 1000 + 6 * 3600 * 1000).toISOString(),
        trackTimezone: 'Asia/Tokyo',
        trackUtcOffset: 'UTC+9',
        sessions: [
            { name: 'Free Practice 1', arabicName: 'التجارب الحرة', day: 'الجمعة', dateStr: new Date(Date.now() + 11 * 24 * 3600 * 1000).toISOString(), trackTimeStr: '10:45 JST' },
            { name: 'Qualifying 1 & 2', arabicName: 'التصفيات الرسمية', day: 'السبت', dateStr: new Date(Date.now() + 12 * 24 * 3600 * 1000).toISOString(), trackTimeStr: '10:50 JST' },
            { name: 'Sprint Race', arabicName: 'سباق السرعة القصير (سبرينت)', day: 'السبت', dateStr: new Date(Date.now() + 12 * 24 * 3600 * 1000 + 4 * 3600 * 1000).toISOString(), trackTimeStr: '15:00 JST' },
            { name: 'MotoGP Grand Prix', arabicName: 'السباق الرئيسي (24 لفة)', day: 'الأحد', dateStr: new Date(Date.now() + 13 * 24 * 3600 * 1000 + 6 * 3600 * 1000).toISOString(), trackTimeStr: '14:00 JST' }
        ]
    },
    {
        id: 'wec-bahrain',
        series: SeriesId.WEC,
        seriesKey: 'wec',
        badge: 'WEC',
        accentColor: '#10b981',
        round: 8,
        totalRounds: 8,
        raceName: 'Bapco Energies 8 Hours of Bahrain (Season Finale)',
        circuit: 'Bahrain International Circuit',
        location: 'Sakhir, Kingdom of Bahrain',
        countryCode: 'BHR',
        targetRaceDate: new Date(Date.now() + 20 * 24 * 3600 * 1000 + 11 * 3600 * 1000).toISOString(),
        trackTimezone: 'Asia/Bahrain',
        trackUtcOffset: 'UTC+3',
        sessions: [
            { name: 'Free Practice 1', arabicName: 'التجارب الحرة الأولى', day: 'الخميس', dateStr: new Date(Date.now() + 18 * 24 * 3600 * 1000).toISOString(), trackTimeStr: '12:15 AST' },
            { name: 'Hyperpole Qualifying', arabicName: 'تصفيات الهايبربول', day: 'الجمعة', dateStr: new Date(Date.now() + 19 * 24 * 3600 * 1000).toISOString(), trackTimeStr: '16:00 AST' },
            { name: '8 Hours of Bahrain Race', arabicName: 'سباق الـ 8 ساعات الختامي', day: 'السبت', dateStr: new Date(Date.now() + 20 * 24 * 3600 * 1000 + 11 * 3600 * 1000).toISOString(), trackTimeStr: '14:00 AST' }
        ]
    },
    {
        id: 'imsa-road-atlanta',
        series: SeriesId.IMSA,
        seriesKey: 'imsa',
        badge: 'IMSA',
        accentColor: '#f59e0b',
        round: 11,
        totalRounds: 11,
        raceName: 'Motul Petit Le Mans (10 Hours)',
        circuit: 'Michelin Raceway Road Atlanta',
        location: 'Braselton, Georgia, USA',
        countryCode: 'USA',
        targetRaceDate: new Date(Date.now() + 15 * 24 * 3600 * 1000 + 16 * 3600 * 1000).toISOString(),
        trackTimezone: 'America/New_York',
        trackUtcOffset: 'UTC-4',
        sessions: [
            { name: 'Night Practice', arabicName: 'التجارب الليلية', day: 'الخميس', dateStr: new Date(Date.now() + 13 * 24 * 3600 * 1000).toISOString(), trackTimeStr: '19:30 EDT' },
            { name: 'GTP Qualifying', arabicName: 'تصفيات فئة GTP', day: 'الجمعة', dateStr: new Date(Date.now() + 14 * 24 * 3600 * 1000).toISOString(), trackTimeStr: '15:25 EDT' },
            { name: '10-Hour Race', arabicName: 'سباق التحمل 10 ساعات', day: 'السبت', dateStr: new Date(Date.now() + 15 * 24 * 3600 * 1000 + 16 * 3600 * 1000).toISOString(), trackTimeStr: '12:10 EDT' }
        ]
    },
    {
        id: 'gtwc-monza',
        series: SeriesId.GT_WORLD_CHALLENGE,
        seriesKey: 'gtwc',
        badge: 'GTWC',
        accentColor: '#a855f7',
        round: 9,
        totalRounds: 10,
        raceName: 'Fanatec GT Europe 3 Hours of Monza',
        circuit: 'Autodromo Nazionale Monza',
        location: 'Monza, Lombardy, Italy',
        countryCode: 'ITA',
        targetRaceDate: new Date(Date.now() + 8 * 24 * 3600 * 1000 + 13 * 3600 * 1000).toISOString(),
        trackTimezone: 'Europe/Rome',
        trackUtcOffset: 'UTC+2',
        sessions: [
            { name: 'Free Practice', arabicName: 'التجارب الحرة', day: 'السبت', dateStr: new Date(Date.now() + 7 * 24 * 3600 * 1000).toISOString(), trackTimeStr: '09:00 CEST' },
            { name: 'Combined Qualifying', arabicName: 'التصفيات المجمعة Q1-Q3', day: 'الأحد', dateStr: new Date(Date.now() + 8 * 24 * 3600 * 1000).toISOString(), trackTimeStr: '09:00 CEST' },
            { name: '3-Hour Endurance Race', arabicName: 'سباق التحمل 3 ساعات بمونزا', day: 'الأحد', dateStr: new Date(Date.now() + 8 * 24 * 3600 * 1000 + 13 * 3600 * 1000).toISOString(), trackTimeStr: '15:00 CEST' }
        ]
    },
    {
        id: 'dtm-hockenheim',
        series: SeriesId.DTM,
        seriesKey: 'dtm',
        badge: 'DTM',
        accentColor: '#facc15',
        round: 15,
        totalRounds: 16,
        raceName: 'DTM Hockenheimring Season Finale',
        circuit: 'Hockenheimring Baden-Württemberg',
        location: 'Hockenheim, Germany',
        countryCode: 'GER',
        targetRaceDate: new Date(Date.now() + 10 * 24 * 3600 * 1000 + 12 * 3600 * 1000).toISOString(),
        trackTimezone: 'Europe/Berlin',
        trackUtcOffset: 'UTC+2',
        sessions: [
            { name: 'Qualifying 1', arabicName: 'تصفيات السباق الأول', day: 'السبت', dateStr: new Date(Date.now() + 9 * 24 * 3600 * 1000).toISOString(), trackTimeStr: '09:30 CEST' },
            { name: 'Race 1 (60 Min)', arabicName: 'السباق الأول (60 دقيقة)', day: 'السبت', dateStr: new Date(Date.now() + 9 * 24 * 3600 * 1000 + 4 * 3600 * 1000).toISOString(), trackTimeStr: '13:30 CEST' },
            { name: 'Qualifying 2', arabicName: 'تصفيات السباق الثاني', day: 'الأحد', dateStr: new Date(Date.now() + 10 * 24 * 3600 * 1000).toISOString(), trackTimeStr: '09:30 CEST' },
            { name: 'Race 2 (Title Decider)', arabicName: 'السباق الختامي الحاسم للقب', day: 'الأحد', dateStr: new Date(Date.now() + 10 * 24 * 3600 * 1000 + 12 * 3600 * 1000).toISOString(), trackTimeStr: '13:30 CEST' }
        ]
    }
];

interface RaceWeekendCountdownProps {
    onSelectSeries?: (series: SeriesId) => void;
}

export const RaceWeekendCountdown: React.FC<RaceWeekendCountdownProps> = ({ onSelectSeries }) => {
    const [selectedEventId, setSelectedEventId] = useState<string>('f1-malaysia');
    const [timeLeft, setTimeLeft] = useState<{ days: number; hours: number; minutes: number; seconds: number }>({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });
    const [userTimezone, setUserTimezone] = useState<string>('');

    const activeEvent = UPCOMING_RACES.find(r => r.id === selectedEventId) || UPCOMING_RACES[0];

    // Detect visitor's local timezone
    useEffect(() => {
        try {
            const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
            setUserTimezone(tz || 'Local');
        } catch {
            setUserTimezone('Local Time');
        }
    }, []);

    // Live 1-second Countdown calculation
    useEffect(() => {
        const updateTimer = () => {
            const targetTime = new Date(activeEvent.targetRaceDate).getTime();
            const now = Date.now();
            const diff = Math.max(0, targetTime - now);

            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);

            setTimeLeft({ days, hours, minutes, seconds });
        };

        updateTimer();
        const interval = setInterval(updateTimer, 1000);
        return () => clearInterval(interval);
    }, [activeEvent]);

    // Format ISO string to user's localized time
    const formatToUserLocalTime = (isoString: string) => {
        try {
            const d = new Date(isoString);
            return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        } catch {
            return '--:--';
        }
    };

    return (
        <section className="py-12 bg-dark-900 border-b border-white/10 relative overflow-hidden" id="race-weekend">
            {/* Ambient Background Glow */}
            <div 
                className="absolute top-0 right-1/4 w-96 h-96 rounded-full blur-[130px] opacity-15 pointer-events-none transition-colors duration-700"
                style={{ backgroundColor: activeEvent.accentColor }}
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                
                {/* Section Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-red/15 border border-brand-red/30 text-brand-red text-xs font-mono font-bold uppercase tracking-wider mb-2">
                            <Radio className="w-3.5 h-3.5 animate-pulse" />
                            <span>Next Race Weekend • الجولة القادمة</span>
                        </div>
                        <h2 className="text-3xl sm:text-4xl font-display font-black text-white tracking-wide uppercase">
                            Race Schedule & Live Countdown
                        </h2>
                    </div>

                    {/* Local Timezone Indicator */}
                    <div className="flex items-center gap-2 bg-dark-800/80 px-3.5 py-1.5 rounded-xl border border-white/10 text-xs text-gray-300 font-mono">
                        <Globe className="w-3.5 h-3.5 text-brand-brightGreen shrink-0" />
                        <span>توقيتك المحلي المحول:</span>
                        <span className="text-brand-brightGreen font-bold">{userTimezone}</span>
                    </div>
                </div>

                {/* Championship Switcher Ribbon (All 6 Series) */}
                <div className="flex items-center gap-2.5 overflow-x-auto pb-4 mb-6 scrollbar-none">
                    {UPCOMING_RACES.map((race) => {
                        const isSelected = selectedEventId === race.id;
                        return (
                            <button
                                key={race.id}
                                onClick={() => setSelectedEventId(race.id)}
                                className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all shrink-0 border ${
                                    isSelected
                                        ? 'bg-white text-dark-900 border-white shadow-xl scale-105'
                                        : 'bg-dark-800 text-gray-300 hover:text-white hover:bg-dark-700 border-white/10'
                                }`}
                            >
                                <span 
                                    className="w-2 h-2 rounded-full" 
                                    style={{ backgroundColor: race.accentColor }} 
                                />
                                <span className="font-display tracking-wider">{race.badge}</span>
                                <span className="text-[11px] opacity-80 truncate max-w-[130px] font-sans">
                                    {race.raceName.split(' ')[0]} {race.raceName.split(' ')[1]}
                                </span>
                            </button>
                        );
                    })}
                </div>

                {/* Main Countdown & Timetable Showcase Card */}
                <div className="bg-gradient-to-br from-dark-800 via-dark-850 to-dark-900 rounded-3xl border border-white/15 p-6 sm:p-10 shadow-2xl relative overflow-hidden">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                        
                        {/* Left / Main Info & Countdown (7 Cols) */}
                        <div className="lg:col-span-7 space-y-6">
                            <div>
                                <div className="flex flex-wrap items-center gap-2 mb-3">
                                    <span 
                                        className="px-3 py-1 rounded-full text-white text-xs font-display font-black tracking-widest shadow-md"
                                        style={{ backgroundColor: activeEvent.accentColor }}
                                    >
                                        {activeEvent.badge}
                                    </span>
                                    <span className="px-3 py-1 rounded-full bg-white/10 text-gray-300 text-xs font-mono font-bold uppercase">
                                        الجولة {activeEvent.round} من {activeEvent.totalRounds}
                                    </span>
                                    <span className="px-2.5 py-0.5 rounded bg-black/40 text-brand-brightGreen border border-brand-brightGreen/30 text-[11px] font-mono font-bold flex items-center gap-1">
                                        <CheckCircle2 className="w-3 h-3" />
                                        Official Calendar 2026
                                    </span>
                                </div>

                                <h3 className="text-2xl sm:text-4xl font-display font-extrabold text-white tracking-tight leading-tight">
                                    {activeEvent.raceName}
                                </h3>

                                <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-gray-300">
                                    <span className="flex items-center gap-1.5">
                                        <MapPin className="w-4 h-4 text-brand-red shrink-0" />
                                        <span className="font-semibold text-white">{activeEvent.circuit}</span>
                                    </span>
                                    <span className="text-gray-400">
                                        {activeEvent.location}
                                    </span>
                                </div>
                            </div>

                            {/* Live Countdown Timer Digits */}
                            <div className="bg-black/60 backdrop-blur-md p-6 rounded-3xl border border-white/15 shadow-inner">
                                <div className="flex items-center justify-between mb-4">
                                    <span className="text-xs font-mono font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1.5">
                                        <Timer className="w-4 h-4 text-amber-400" />
                                        <span>الوقت المتبقي حتى انطلاق السباق الرئيسي / Lights Out In</span>
                                    </span>
                                    <span className="text-[11px] font-mono text-gray-400 bg-white/5 px-2 py-0.5 rounded">
                                        Track Time: {activeEvent.trackUtcOffset}
                                    </span>
                                </div>

                                <div className="grid grid-cols-4 gap-2 sm:gap-4 text-center">
                                    {/* Days */}
                                    <div className="bg-dark-900/90 p-3 sm:p-4 rounded-2xl border border-white/10">
                                        <span className="text-2xl sm:text-4xl font-mono font-black text-white block">
                                            {String(timeLeft.days).padStart(2, '0')}
                                        </span>
                                        <span className="text-[10px] sm:text-xs font-bold text-gray-400 uppercase tracking-wider mt-1 block">
                                            يوم / Days
                                        </span>
                                    </div>

                                    {/* Hours */}
                                    <div className="bg-dark-900/90 p-3 sm:p-4 rounded-2xl border border-white/10">
                                        <span className="text-2xl sm:text-4xl font-mono font-black text-white block">
                                            {String(timeLeft.hours).padStart(2, '0')}
                                        </span>
                                        <span className="text-[10px] sm:text-xs font-bold text-gray-400 uppercase tracking-wider mt-1 block">
                                            ساعة / Hours
                                        </span>
                                    </div>

                                    {/* Minutes */}
                                    <div className="bg-dark-900/90 p-3 sm:p-4 rounded-2xl border border-white/10">
                                        <span className="text-2xl sm:text-4xl font-mono font-black text-white block">
                                            {String(timeLeft.minutes).padStart(2, '0')}
                                        </span>
                                        <span className="text-[10px] sm:text-xs font-bold text-gray-400 uppercase tracking-wider mt-1 block">
                                            دقيقة / Mins
                                        </span>
                                    </div>

                                    {/* Seconds */}
                                    <div className="bg-dark-900/90 p-3 sm:p-4 rounded-2xl border border-white/10 border-brand-red/40">
                                        <span className="text-2xl sm:text-4xl font-mono font-black text-brand-red block animate-pulse">
                                            {String(timeLeft.seconds).padStart(2, '0')}
                                        </span>
                                        <span className="text-[10px] sm:text-xs font-bold text-brand-red uppercase tracking-wider mt-1 block">
                                            ثانية / Secs
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Action Button */}
                            {onSelectSeries && (
                                <div>
                                    <button
                                        onClick={() => onSelectSeries(activeEvent.series)}
                                        className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-brand-red hover:bg-red-700 text-white font-bold text-sm tracking-wide transition-all shadow-lg shadow-brand-red/30 hover:scale-105 active:scale-95"
                                    >
                                        <span>الانتقال إلى لوحة {activeEvent.series} الكاملة</span>
                                        <ChevronRight className="w-4 h-4" />
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Right / Full Weekend Timetable (5 Cols) */}
                        <div className="lg:col-span-5 bg-dark-900/80 p-6 rounded-3xl border border-white/10">
                            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
                                <h4 className="text-base font-bold text-white flex items-center gap-2">
                                    <Calendar className="w-4 h-4 text-brand-brightGreen" />
                                    <span>جدول حصص عطلة نهاية الأسبوع</span>
                                </h4>
                                <span className="text-xs text-gray-400 font-mono">Weekend Sessions</span>
                            </div>

                            <div className="space-y-3">
                                {activeEvent.sessions.map((sess, idx) => {
                                    const isRace = sess.name.toLowerCase().includes('race') || sess.name.toLowerCase().includes('grand prix');
                                    const isQuali = sess.name.toLowerCase().includes('qualifying');

                                    return (
                                        <div 
                                            key={idx}
                                            className={`p-3.5 rounded-2xl border transition-all ${
                                                isRace 
                                                    ? 'bg-brand-red/10 border-brand-red/30 shadow-md' 
                                                    : isQuali 
                                                    ? 'bg-amber-500/10 border-amber-500/20' 
                                                    : 'bg-white/5 border-white/5 hover:border-white/15'
                                            }`}
                                        >
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <span className="text-xs font-bold text-white block">
                                                        {sess.arabicName}
                                                    </span>
                                                    <span className="text-[11px] text-gray-400 font-mono block">
                                                        {sess.day} • {sess.name}
                                                    </span>
                                                </div>

                                                <div className="text-left shrink-0">
                                                    {/* User Local Converted Time */}
                                                    <div className="flex items-center gap-1 text-xs font-mono font-bold text-brand-brightGreen">
                                                        <Clock className="w-3 h-3" />
                                                        <span>{formatToUserLocalTime(sess.dateStr)}</span>
                                                    </div>
                                                    {/* Track Time */}
                                                    <span className="text-[10px] text-gray-400 font-mono block">
                                                        {sess.trackTimeStr}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            <div className="mt-4 pt-3 border-t border-white/10 text-center">
                                <p className="text-[11px] text-gray-400 font-mono">
                                    * الأوقات الخضراء محولة تلقائياً وفق التوقيت المحلي لجهازك ({userTimezone})
                                </p>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </section>
    );
};

export default RaceWeekendCountdown;
