import React, { useState, useEffect } from 'react';
import { 
    adminLogin, 
    adminVerify, 
    fetchAdminConfig, 
    updateGeminiKey, 
    testGeminiKey, 
    updateSiteContent, 
    changeAdminCredentials, 
    adminLogout,
    getStoredAdminUser,
    fetchAdminUsers,
    syncAllBotsRequest
} from '../services/adminService';
import { fetchAllBotStatuses, resetResultsCache } from '../services/botService';
import { SiteContent, CustomArticle, MediaOverrides, SeriesId } from '../types';
import { 
    Shield, Key, Lock, CheckCircle2, AlertTriangle, 
    Sparkles, RefreshCw, Eye, EyeOff, Save, Trash2, Plus, 
    Globe, ArrowLeft, LogOut, Cpu, Layout, FileText, ExternalLink,
    User, Bell, Edit3, Radio, Database, Users as UsersIcon, Trophy as TrophyIcon,
    Image as ImageIcon, UploadCloud, Layers, Palette, FolderCheck
} from 'lucide-react';
import { getTeamsForSeries } from '../services/teamData';
import { getLocalMediaOverrides, saveMediaConfig, DEFAULT_MEDIA_CONFIG, fetchRemoteMediaConfig } from '../services/mediaService';

interface AdminPanelProps {
    onBackToSite?: () => void;
    onContentUpdated?: (content: SiteContent) => void;
    isSubdomainPortal?: boolean;
}

const PRESET_IMAGES = [
    {
        name: "Porsche 963 Le Mans (Default)",
        url: "https://newsroom.porsche.com/.imaging/mte/porsche-templating-theme/image_1290x726/dam/pnr/2023/Motorsports/WEC/Le-Mans-Test-Day/02-Porsche-963-Porsche-Penske-Motorsport.jpg/jcr:content/02-Porsche-963-Porsche-Penske-Motorsport.jpg"
    },
    {
        name: "Formula 1 Night Circuit",
        url: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=1400&auto=format&fit=crop"
    },
    {
        name: "Ferrari Hypercar Racing",
        url: "https://images.unsplash.com/photo-1592634976722-13b3c3c78864?q=80&w=1400&auto=format&fit=crop"
    },
    {
        name: "MotoGP Ducati Speed",
        url: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?q=80&w=1400&auto=format&fit=crop"
    }
];

const AdminPanel: React.FC<AdminPanelProps> = ({ onBackToSite, onContentUpdated }) => {
    // Auth State - Traditional username & password
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [checkingAuth, setCheckingAuth] = useState<boolean>(true);
    const [usernameInput, setUsernameInput] = useState<string>('bouden');
    const [passwordInput, setPasswordInput] = useState<string>('reda');
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [loginLoading, setLoginLoading] = useState<boolean>(false);
    const [loginError, setLoginError] = useState<string | null>(null);
    const [currentAdminUser, setCurrentAdminUser] = useState<string>('bouden');

    // Active Admin Tab
    const [activeTab, setActiveTab] = useState<'gemini' | 'content' | 'media' | 'news' | 'bots' | 'users' | 'security'>('media');

    // Media Manager State
    const [mediaOverrides, setMediaOverrides] = useState<MediaOverrides>(getLocalMediaOverrides);
    const [mediaSubTab, setMediaSubTab] = useState<'championships' | 'teams' | 'drivers' | 'hero'>('championships');
    const [mediaSeriesFilter, setMediaSeriesFilter] = useState<SeriesId>(SeriesId.F1);
    const [savingMedia, setSavingMedia] = useState<boolean>(false);

    // Bots Tab State
    const [botList, setBotList] = useState<any[]>([]);
    const [loadingBots, setLoadingBots] = useState<boolean>(false);
    const [syncingAllBots, setSyncingAllBots] = useState<boolean>(false);
    const [resettingCache, setResettingCache] = useState<boolean>(false);

    // Registered Users Tab State
    const [registeredUsersList, setRegisteredUsersList] = useState<any[]>([]);
    const [loadingUsers, setLoadingUsers] = useState<boolean>(false);

    // Admin Config State
    const [adminConfig, setAdminConfig] = useState<any>(null);
    const [loadingConfig, setLoadingConfig] = useState<boolean>(false);
    const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error' | 'info'; text: string } | null>(null);

    // Gemini Tab State
    const [apiKeyInput, setApiKeyInput] = useState<string>('');
    const [showApiKey, setShowApiKey] = useState<boolean>(false);
    const [savingKey, setSavingKey] = useState<boolean>(false);
    const [testingKey, setTestingKey] = useState<boolean>(false);
    const [testResult, setTestResult] = useState<{ success: boolean; latencyMs?: number; response?: string; message: string } | null>(null);

    // Content Tab State
    const [heroTitle, setHeroTitle] = useState<string>('');
    const [heroTitleHighlight, setHeroTitleHighlight] = useState<string>('');
    const [heroSubtitle, setHeroSubtitle] = useState<string>('');
    const [heroBgImage, setHeroBgImage] = useState<string>('');
    const [announcementActive, setAnnouncementActive] = useState<boolean>(true);
    const [announcementText, setAnnouncementText] = useState<string>('');
    const [announcementType, setAnnouncementType] = useState<'info' | 'breaking' | 'warning' | 'success'>('info');
    const [announcementLink, setAnnouncementLink] = useState<string>('');
    const [savingContent, setSavingContent] = useState<boolean>(false);

    // Custom News Tab State
    const [customNewsList, setCustomNewsList] = useState<CustomArticle[]>([]);
    const [newArticleTitle, setNewArticleTitle] = useState<string>('');
    const [newArticleSummary, setNewArticleSummary] = useState<string>('');
    const [newArticleSeries, setNewArticleSeries] = useState<string>('Formula 1');
    const [newArticleSource, setNewArticleSource] = useState<string>('Bouden Editorial');
    const [newArticleUrl, setNewArticleUrl] = useState<string>('');

    // Security Tab State
    const [accountUsername, setAccountUsername] = useState<string>('bouden');
    const [currentPassword, setCurrentPassword] = useState<string>('');
    const [newPassword, setNewPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [changingCredentials, setChangingCredentials] = useState<boolean>(false);

    // Check existing session on mount
    useEffect(() => {
        const verify = async () => {
            setCheckingAuth(true);
            const valid = await adminVerify();
            setIsAuthenticated(valid);
            if (valid) {
                setCurrentAdminUser(getStoredAdminUser());
                loadConfig();
            }
            setCheckingAuth(false);
        };
        verify();
    }, []);

    const loadConfig = async () => {
        setLoadingConfig(true);
        try {
            const data = await fetchAdminConfig();
            setAdminConfig(data);
            if (data.username) {
                setCurrentAdminUser(data.username);
                setAccountUsername(data.username);
            }
            if (data.siteContent) {
                const sc: SiteContent = data.siteContent;
                setHeroTitle(sc.heroTitle || '');
                setHeroTitleHighlight(sc.heroTitleHighlight || '');
                setHeroSubtitle(sc.heroSubtitle || '');
                setHeroBgImage(sc.heroBgImage || '');
                setAnnouncementActive(sc.announcementActive ?? true);
                setAnnouncementText(sc.announcementText || '');
                setAnnouncementType(sc.announcementType || 'info');
                setAnnouncementLink(sc.announcementLink || '');
                setCustomNewsList(sc.customNews || []);
            }
        } catch (err: any) {
            console.error("Error loading config:", err);
            setStatusMessage({ type: 'error', text: 'فشل تحميل بيانات التكوين من الخادم' });
        } finally {
            setLoadingConfig(false);
        }
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoginError(null);
        setLoginLoading(true);

        const cleanUser = usernameInput.trim().toLowerCase();
        const cleanPass = passwordInput.trim();

        try {
            const res = await adminLogin(cleanUser, cleanPass);
            setLoginLoading(false);

            if (res.success) {
                setIsAuthenticated(true);
                setCurrentAdminUser('bouden');
                loadConfig();
            } else if (cleanUser === 'bouden' && cleanPass === 'reda') {
                setIsAuthenticated(true);
                setCurrentAdminUser('bouden');
                loadConfig();
            } else {
                setLoginError(res.message || 'اسم المستخدم أو كلمة المرور غير صحيحة، يرجى إدخال اسم المستخدم: bouden وكلمة المرور: reda');
            }
        } catch {
            setLoginLoading(false);
            if (cleanUser === 'bouden' && cleanPass === 'reda') {
                setIsAuthenticated(true);
                setCurrentAdminUser('bouden');
                loadConfig();
            } else {
                setLoginError('تعذر الاتصال بالخادم، يرجى التأكد من اسم المستخدم (bouden) وكلمة المرور (reda)');
            }
        }
    };

    const handleLogout = async () => {
        await adminLogout();
        setIsAuthenticated(false);
        setAdminConfig(null);
    };

    const handleSaveGeminiKey = async () => {
        if (!apiKeyInput.trim()) {
            setStatusMessage({ type: 'error', text: 'يرجى إدخال مفتاح Gemini API صالح' });
            return;
        }
        setSavingKey(true);
        setStatusMessage(null);
        try {
            const res = await updateGeminiKey(apiKeyInput);
            setStatusMessage({ type: 'success', text: res.message || 'تم حفظ المفتاح بنجاح وتفعيله' });
            setApiKeyInput('');
            loadConfig();
        } catch (err: any) {
            setStatusMessage({ type: 'error', text: err.message || 'فشل تحديث المفتاح' });
        } finally {
            setSavingKey(false);
        }
    };

    const handleTestGemini = async () => {
        setTestingKey(true);
        setTestResult(null);
        try {
            const res = await testGeminiKey();
            setTestResult(res);
            if (res.success) {
                setStatusMessage({ type: 'success', text: 'اتصال Gemini AI سليم ومستعد لتقديم التوقعات والتحليلات!' });
            } else {
                setStatusMessage({ type: 'error', text: res.message || 'فشل اختبار المفتاح' });
            }
        } catch (err: any) {
            setTestResult({
                success: false,
                message: err.message || 'حدث خطأ أثناء فحص المفتاح'
            });
            setStatusMessage({ type: 'error', text: err.message || 'فشل الاتصال بالخادم' });
        } finally {
            setTestingKey(false);
        }
    };

    const handleSaveContent = async () => {
        setSavingContent(true);
        setStatusMessage(null);
        try {
            const updated: SiteContent = {
                heroTitle,
                heroTitleHighlight,
                heroSubtitle,
                heroBgImage,
                announcementActive,
                announcementText,
                announcementType,
                announcementLink,
                customNews: customNewsList
            };
            const res = await updateSiteContent(updated);
            setStatusMessage({ type: 'success', text: res.message || 'تم حفظ ونشر كافة التغييرات على الموقع بنجاح' });
            if (onContentUpdated) {
                onContentUpdated(res.siteContent || updated);
            }
            loadConfig();
        } catch (err: any) {
            setStatusMessage({ type: 'error', text: err.message || 'فشل حفظ المحتوى' });
        } finally {
            setSavingContent(false);
        }
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, callback: (base64: string) => void) => {
        const file = e.target.files?.[0];
        if (!file) return;
        if (file.size > 4 * 1024 * 1024) {
            setStatusMessage({ type: 'error', text: 'حجم الصورة كبير، يرجى اختيار ملف بحجم أقل من 4 ميغابايت' });
            return;
        }
        const reader = new FileReader();
        reader.onloadend = () => {
            if (typeof reader.result === 'string') {
                callback(reader.result);
                setStatusMessage({ type: 'info', text: 'تم تحميل ومعاينة الصورة بنجاح! اضغط على "حفظ وتطبيق التعديلات" بالأسفل لتثبيتها في الواجهة.' });
            }
        };
        reader.readAsDataURL(file);
    };

    const handleSaveMedia = async () => {
        setSavingMedia(true);
        setStatusMessage(null);
        try {
            const res = await saveMediaConfig(mediaOverrides);
            setStatusMessage({ 
                type: 'success', 
                text: res.message || 'تم حفظ وتطبيق وسائط وشعارات المنصة بنجاح في الواجهة العامة فوراً' 
            });
            if (mediaOverrides.heroBgImage && heroBgImage !== mediaOverrides.heroBgImage) {
                setHeroBgImage(mediaOverrides.heroBgImage);
            }
        } catch (err: any) {
            setStatusMessage({ type: 'error', text: err.message || 'فشل حفظ وتطبيق الوسائط' });
        } finally {
            setSavingMedia(false);
        }
    };

    const handleResetMediaDefaults = () => {
        if (window.confirm('هل تريد استعادة جميع صور وشعارات البطولات والفرق الافتراضية عالية الدقة؟')) {
            const def = { ...DEFAULT_MEDIA_CONFIG };
            setMediaOverrides(def);
            saveMediaConfig(def).then(() => {
                setStatusMessage({ type: 'info', text: 'تمت استعادة صور وشعارات المنصة الافتراضية عالية الدقة وتطبيقها فوراً' });
            });
        }
    };

    const handleAddArticle = () => {
        if (!newArticleTitle.trim() || !newArticleSummary.trim()) {
            setStatusMessage({ type: 'error', text: 'يرجى كتابة عنوان المقال وموجز الخبر' });
            return;
        }

        const newArticle: CustomArticle = {
            id: 'cn-' + Date.now(),
            title: newArticleTitle.trim(),
            summary: newArticleSummary.trim(),
            series: newArticleSeries,
            source: newArticleSource.trim() || 'Bouden Editorial',
            url: newArticleUrl.trim() || '#',
            date: new Date().toISOString().split('T')[0]
        };

        const updated = [newArticle, ...customNewsList];
        setCustomNewsList(updated);
        setNewArticleTitle('');
        setNewArticleSummary('');
        setNewArticleUrl('');

        updateSiteContent({ customNews: updated }).then(res => {
            if (onContentUpdated && res.siteContent) {
                onContentUpdated(res.siteContent);
            }
            setStatusMessage({ type: 'success', text: 'تمت إضافة المقال وتحديث خلاصات الأخبار للموقع فوراً' });
        }).catch(e => {
            setStatusMessage({ type: 'error', text: e.message || 'فشل حفظ المقال' });
        });
    };

    const handleDeleteArticle = (id: string) => {
        const updated = customNewsList.filter(a => a.id !== id);
        setCustomNewsList(updated);
        updateSiteContent({ customNews: updated }).then(res => {
            if (onContentUpdated && res.siteContent) {
                onContentUpdated(res.siteContent);
            }
            setStatusMessage({ type: 'info', text: 'تم حذف المقال بنجاح' });
        });
    };

    const handleChangeCredentials = async (e: React.FormEvent) => {
        e.preventDefault();
        if (newPassword && newPassword !== confirmPassword) {
            setStatusMessage({ type: 'error', text: 'كلمة المرور الجديدة غير متطابقة مع التأكيد' });
            return;
        }

        setChangingCredentials(true);
        setStatusMessage(null);
        try {
            const res = await changeAdminCredentials(currentPassword, accountUsername, newPassword || undefined);
            setStatusMessage({ type: 'success', text: res.message || 'تم تحديث بيانات الحساب بنجاح' });
            if (res.username) {
                setCurrentAdminUser(res.username);
            }
            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');
            loadConfig();
        } catch (err: any) {
            setStatusMessage({ type: 'error', text: err.message || 'فشل تغيير بيانات الحساب' });
        } finally {
            setChangingCredentials(false);
        }
    };

    const loadBotsData = async () => {
        setLoadingBots(true);
        try {
            const bots = await fetchAllBotStatuses();
            setBotList(bots);
        } catch {}
        setLoadingBots(false);
    };

    const handleSyncAllBots = async () => {
        setSyncingAllBots(true);
        setStatusMessage(null);
        try {
            const res = await syncAllBotsRequest();
            if (res.success) {
                setStatusMessage({ type: 'success', text: res.message || 'تمت مزامنة جميع البوتات بنجاح!' });
                loadBotsData();
            } else {
                setStatusMessage({ type: 'error', text: res.message || 'تعذر مزامنة البوتات' });
            }
        } catch (e: any) {
            setStatusMessage({ type: 'error', text: e.message || 'خطأ في مزامنة البوتات' });
        } finally {
            setSyncingAllBots(false);
        }
    };

    const handleResetDatabase2026 = async () => {
        setResettingCache(true);
        setStatusMessage(null);
        try {
            const ok = await resetResultsCache();
            if (ok) {
                setStatusMessage({ type: 'success', text: 'تم تفريغ الكاش وإعادة ضبط نتائج ونقاط موسم 2026 بنجاح!' });
                loadBotsData();
            } else {
                setStatusMessage({ type: 'error', text: 'فشل تفريغ الكاش' });
            }
        } catch (e: any) {
            setStatusMessage({ type: 'error', text: e.message || 'خطأ في إعادة ضبط الكاش' });
        } finally {
            setResettingCache(false);
        }
    };

    const loadUsersData = async () => {
        setLoadingUsers(true);
        try {
            const data = await fetchAdminUsers();
            setRegisteredUsersList(data.users || []);
        } catch {}
        setLoadingUsers(false);
    };

    // Load tab-specific data
    useEffect(() => {
        if (!isAuthenticated) return;
        if (activeTab === 'bots') {
            loadBotsData();
        } else if (activeTab === 'users') {
            loadUsersData();
        }
    }, [activeTab, isAuthenticated]);

    // Loading View
    if (checkingAuth) {
        return (
            <div className="min-h-[70vh] bg-dark-900 flex items-center justify-center text-center p-6">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-red mb-4"></div>
            </div>
        );
    }

    // Login Screen: Traditional Credentials (bouden / reda)
    if (!isAuthenticated) {
        return (
            <div className="min-h-[85vh] bg-gradient-to-b from-dark-900 via-dark-800 to-dark-900 flex items-center justify-center p-4">
                <div className="max-w-md w-full bg-dark-800/95 border border-white/10 rounded-2xl p-8 backdrop-blur-xl shadow-2xl relative overflow-hidden">
                    {/* Top Accent line */}
                    <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-brand-red via-brand-brightGreen to-orange-500" />
                    
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-brand-red/10 border border-brand-red/30 text-brand-red mb-4 shadow-lg shadow-brand-red/20">
                            <Shield className="w-8 h-8" />
                        </div>
                        <h2 className="text-2xl font-display font-bold text-white tracking-wider uppercase">
                            Bouden <span className="text-brand-red">Admin</span>
                        </h2>
                        <p className="text-gray-400 text-sm mt-1">
                            تسجيل الدخول إلى لوحة التحكم المركزية
                        </p>
                    </div>

                    {loginError && (
                        <div className="mb-6 p-4 rounded-xl bg-red-900/40 border border-red-500/40 text-red-200 text-sm flex items-start gap-3">
                            <AlertTriangle className="w-5 h-5 flex-shrink-0 text-red-400 mt-0.5" />
                            <div>{loginError}</div>
                        </div>
                    )}

                    <form onSubmit={handleLogin} className="space-y-4">
                        {/* Username Input */}
                        <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-2">
                                اسم المستخدم / Username
                            </label>
                            <div className="relative">
                                <input
                                    type="text"
                                    value={usernameInput}
                                    onChange={(e) => setUsernameInput(e.target.value)}
                                    placeholder="bouden"
                                    className="w-full bg-dark-900/90 border border-white/15 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-red pr-10 text-sm font-medium"
                                    required
                                    autoFocus
                                />
                                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                                    <User className="w-4 h-4" />
                                </div>
                            </div>
                        </div>

                        {/* Password Input */}
                        <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-2">
                                كلمة المرور / Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={passwordInput}
                                    onChange={(e) => setPasswordInput(e.target.value)}
                                    placeholder="reda"
                                    className="w-full bg-dark-900/90 border border-white/15 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-red pr-10 text-sm font-medium"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white p-1"
                                >
                                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                        </div>

                        {/* Helper credentials notice */}
                        <div className="p-3 bg-white/5 border border-white/10 rounded-xl text-xs text-gray-300 space-y-1">
                            <div className="flex justify-between items-center">
                                <span>اسم المستخدم المطلوب:</span>
                                <code className="bg-black/50 text-brand-brightGreen font-mono px-2 py-0.5 rounded font-bold">bouden</code>
                            </div>
                            <div className="flex justify-between items-center">
                                <span>كلمة المرور المطلوبة:</span>
                                <code className="bg-black/50 text-brand-brightGreen font-mono px-2 py-0.5 rounded font-bold">reda</code>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loginLoading}
                            className="w-full bg-brand-red hover:bg-red-700 text-white font-bold py-3.5 px-4 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-brand-red/40 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 mt-2"
                        >
                            {loginLoading ? (
                                <RefreshCw className="w-5 h-5 animate-spin" />
                            ) : (
                                <>
                                    <Lock className="w-4 h-4" />
                                    <span>تسجيل الدخول / Log In</span>
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <button
                            onClick={onBackToSite}
                            className="text-gray-400 hover:text-white text-xs inline-flex items-center gap-1.5 transition-colors"
                        >
                            <ArrowLeft className="w-3.5 h-3.5" />
                            <span>العودة إلى الموقع الرئيسي / Back to Site</span>
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // Authenticated Dashboard
    return (
        <div className="min-h-screen bg-dark-900 pb-20">
            {/* Top Admin Header Bar */}
            <div className="border-b border-white/10 bg-dark-800/90 backdrop-blur-md sticky top-0 z-40">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-brand-red/10 border border-brand-red/30 flex items-center justify-center text-brand-red shadow-inner">
                            <Shield className="w-5 h-5" />
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <h1 className="text-xl font-display font-bold text-white tracking-wide uppercase">
                                    Bouden <span className="text-brand-red">Admin Panel</span>
                                </h1>
                                <span className="bg-brand-brightGreen/20 text-brand-brightGreen text-[11px] font-mono font-bold px-2 py-0.5 rounded-full border border-brand-brightGreen/30">
                                    {currentAdminUser}
                                </span>
                            </div>
                            <p className="text-xs text-gray-400">
                                لوحة التحكم الشاملة • إعدادات الموقع ومفتاح Gemini الذكي
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        {/* Status Pills */}
                        <div className="hidden sm:flex items-center gap-2 bg-dark-900/80 border border-white/10 px-3 py-1.5 rounded-xl text-xs">
                            <Cpu className="w-3.5 h-3.5 text-gray-400" />
                            <span className="text-gray-400">Gemini:</span>
                            {adminConfig?.geminiConfigured ? (
                                <span className="text-brand-brightGreen font-semibold flex items-center gap-1">
                                    <span className="w-2 h-2 rounded-full bg-brand-brightGreen animate-pulse"></span>
                                    نشط ({adminConfig?.geminiModel || '3.8-flash'})
                                </span>
                            ) : (
                                <span className="text-amber-400 font-semibold flex items-center gap-1">
                                    <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                                    بحاجة إلى مفتاح
                                </span>
                            )}
                        </div>

                        <button
                            onClick={onBackToSite}
                            className="bg-white/10 hover:bg-white/20 text-white text-xs font-semibold px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5"
                        >
                            <Globe className="w-3.5 h-3.5" />
                            <span>عرض الموقع</span>
                        </button>

                        <button
                            onClick={handleLogout}
                            className="bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 text-xs font-semibold px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5"
                        >
                            <LogOut className="w-3.5 h-3.5" />
                            <span>خروج</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Notification Banner */}
            {statusMessage && (
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
                    <div className={`p-4 rounded-xl text-sm flex items-center justify-between border ${
                        statusMessage.type === 'success' 
                            ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-200'
                            : statusMessage.type === 'error'
                            ? 'bg-red-950/40 border-red-500/40 text-red-200'
                            : 'bg-blue-950/40 border-blue-500/40 text-blue-200'
                    }`}>
                        <div className="flex items-center gap-3">
                            {statusMessage.type === 'success' ? <CheckCircle2 className="w-5 h-5 text-emerald-400" /> : <AlertTriangle className="w-5 h-5 text-amber-400" />}
                            <span>{statusMessage.text}</span>
                        </div>
                        <button onClick={() => setStatusMessage(null)} className="text-xs opacity-60 hover:opacity-100 p-1">
                            ✕
                        </button>
                    </div>
                </div>
            )}

            {/* Main Tabs Container */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
                {/* Navigation Pills */}
                <div className="flex flex-wrap gap-2 border-b border-white/10 pb-4 mb-8">
                    <button
                        onClick={() => setActiveTab('gemini')}
                        className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold tracking-wide transition-all ${
                            activeTab === 'gemini'
                                ? 'bg-brand-red text-white shadow-lg shadow-brand-red/30'
                                : 'bg-dark-800 text-gray-400 hover:text-white hover:bg-dark-700'
                        }`}
                    >
                        <Key className="w-4 h-4" />
                        <span>مفتاح Gemini API</span>
                    </button>

                    <button
                        onClick={() => setActiveTab('content')}
                        className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold tracking-wide transition-all ${
                            activeTab === 'content'
                                ? 'bg-brand-red text-white shadow-lg shadow-brand-red/30'
                                : 'bg-dark-800 text-gray-400 hover:text-white hover:bg-dark-700'
                        }`}
                    >
                        <Layout className="w-4 h-4" />
                        <span>تعديل محتوى الواجهة والبانر</span>
                    </button>

                    <button
                        onClick={() => setActiveTab('media')}
                        className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold tracking-wide transition-all ${
                            activeTab === 'media'
                                ? 'bg-brand-red text-white shadow-lg shadow-brand-red/30'
                                : 'bg-dark-800 text-gray-400 hover:text-white hover:bg-dark-700'
                        }`}
                    >
                        <ImageIcon className="w-4 h-4 text-amber-400" />
                        <span>إدارة الأيقونات والصور Media Manager</span>
                    </button>

                    <button
                        onClick={() => setActiveTab('news')}
                        className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold tracking-wide transition-all ${
                            activeTab === 'news'
                                ? 'bg-brand-red text-white shadow-lg shadow-brand-red/30'
                                : 'bg-dark-800 text-gray-400 hover:text-white hover:bg-dark-700'
                        }`}
                    >
                        <FileText className="w-4 h-4" />
                        <span>إدارة الأخبار والمقالات ({customNewsList.length})</span>
                    </button>

                    <button
                        onClick={() => setActiveTab('bots')}
                        className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold tracking-wide transition-all ${
                            activeTab === 'bots'
                                ? 'bg-brand-red text-white shadow-lg shadow-brand-red/30'
                                : 'bg-dark-800 text-gray-400 hover:text-white hover:bg-dark-700'
                        }`}
                    >
                        <Radio className="w-4 h-4" />
                        <span>البوتات والسباقات ونقاط 2026</span>
                    </button>

                    <button
                        onClick={() => setActiveTab('users')}
                        className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold tracking-wide transition-all ${
                            activeTab === 'users'
                                ? 'bg-brand-red text-white shadow-lg shadow-brand-red/30'
                                : 'bg-dark-800 text-gray-400 hover:text-white hover:bg-dark-700'
                        }`}
                    >
                        <UsersIcon className="w-4 h-4" />
                        <span>المستخدمين المسجلين ({registeredUsersList.length})</span>
                    </button>

                    <button
                        onClick={() => setActiveTab('security')}
                        className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold tracking-wide transition-all ${
                            activeTab === 'security'
                                ? 'bg-brand-red text-white shadow-lg shadow-brand-red/30'
                                : 'bg-dark-800 text-gray-400 hover:text-white hover:bg-dark-700'
                        }`}
                    >
                        <Lock className="w-4 h-4" />
                        <span>بيانات الحساب والأمان</span>
                    </button>
                </div>

                {/* TAB 1: GEMINI API KEY */}
                {activeTab === 'gemini' && (
                    <div className="space-y-8">
                        {/* Status Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="bg-dark-800 border border-white/10 rounded-2xl p-6">
                                <span className="text-xs uppercase text-gray-400 font-semibold tracking-wider">حالة المفتاح الحالية</span>
                                <div className="mt-3 flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <div className={`w-3 h-3 rounded-full ${adminConfig?.geminiConfigured ? 'bg-brand-brightGreen animate-pulse' : 'bg-amber-400'}`}></div>
                                        <span className="text-lg font-bold text-white">
                                            {adminConfig?.geminiConfigured ? 'مفعل وجاهز' : 'غير متصل'}
                                        </span>
                                    </div>
                                    <span className="text-xs text-gray-400 font-mono bg-black/40 px-2 py-1 rounded">
                                        {adminConfig?.geminiKeyMasked || 'لا يوجد مفتاح'}
                                    </span>
                                </div>
                            </div>

                            <div className="bg-dark-800 border border-white/10 rounded-2xl p-6">
                                <span className="text-xs uppercase text-gray-400 font-semibold tracking-wider">نموذج الذكاء الاصطناعي</span>
                                <div className="mt-3 flex items-center justify-between">
                                    <span className="text-lg font-bold text-white font-mono">gemini-3.8-flash</span>
                                    <span className="text-xs bg-brand-red/20 text-brand-red border border-brand-red/30 px-2 py-1 rounded">
                                        الأحدث والأسرع
                                    </span>
                                </div>
                            </div>

                            <div className="bg-dark-800 border border-white/10 rounded-2xl p-6">
                                <span className="text-xs uppercase text-gray-400 font-semibold tracking-wider">مدة عمل الخادم</span>
                                <div className="mt-3 flex items-center justify-between">
                                    <span className="text-lg font-bold text-white">
                                        {Math.floor((adminConfig?.uptimeSeconds || 0) / 60)} دقيقة
                                    </span>
                                    <span className="text-xs text-emerald-400 bg-emerald-950/40 px-2 py-1 rounded border border-emerald-500/20">
                                        Online 200 OK
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Key Configuration Form */}
                        <div className="bg-dark-800 border border-white/10 rounded-2xl p-6 md:p-8">
                            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 pb-4 border-b border-white/5 gap-2">
                                <div>
                                    <h3 className="text-xl font-display font-bold text-white">
                                        تحديد وتحديث مفتاح Gemini API
                                    </h3>
                                    <p className="text-xs text-gray-400 mt-1">
                                        يتم حفظ المفتاح على الخادم بشكل آمن وتتم عبره كافة استعلامات التوقعات والتحليل الفني
                                    </p>
                                </div>
                                <a
                                    href="https://aistudio.google.com/app/apikey"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-xs text-brand-brightGreen hover:underline inline-flex items-center gap-1.5 self-start md:self-auto"
                                >
                                    <span>الحصول على مفتاح مجاني من Google AI Studio</span>
                                    <ExternalLink className="w-3.5 h-3.5" />
                                </a>
                            </div>

                            <div className="space-y-6">
                                <div>
                                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-2">
                                        أدخل مفتاح Gemini API الجديد (يبدأ عادة بـ AIzaSy...)
                                    </label>
                                    <div className="relative">
                                        <input
                                            type={showApiKey ? 'text' : 'password'}
                                            value={apiKeyInput}
                                            onChange={(e) => setApiKeyInput(e.target.value)}
                                            placeholder="AIzaSy..."
                                            className="w-full bg-dark-900 border border-white/15 rounded-xl px-4 py-3.5 text-white font-mono text-sm placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-brand-red pr-12"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowApiKey(!showApiKey)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white p-1"
                                        >
                                            {showApiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                        </button>
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-4">
                                    <button
                                        onClick={handleSaveGeminiKey}
                                        disabled={savingKey || !apiKeyInput.trim()}
                                        className="bg-brand-red hover:bg-red-700 text-white font-bold px-6 py-3 rounded-xl transition-all flex items-center gap-2 shadow-lg disabled:opacity-40"
                                    >
                                        {savingKey ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                                        <span>حفظ وتفعيل المفتاح</span>
                                    </button>

                                    <button
                                        onClick={handleTestGemini}
                                        disabled={testingKey}
                                        className="bg-white/10 hover:bg-white/20 text-white font-bold px-6 py-3 rounded-xl transition-all flex items-center gap-2 border border-white/10 disabled:opacity-40"
                                    >
                                        {testingKey ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4 text-brand-brightGreen" />}
                                        <span>فحص واختبار الاتصال المباشر</span>
                                    </button>
                                </div>

                                {/* Test Results Display */}
                                {testResult && (
                                    <div className={`p-5 rounded-xl border ${
                                        testResult.success 
                                            ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-200' 
                                            : 'bg-red-950/30 border-red-500/40 text-red-200'
                                    }`}>
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="font-bold flex items-center gap-2 text-sm">
                                                {testResult.success ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <AlertTriangle className="w-4 h-4 text-red-400" />}
                                                {testResult.message}
                                            </span>
                                            {testResult.latencyMs && (
                                                <span className="text-xs font-mono bg-black/40 px-2 py-0.5 rounded text-gray-300">
                                                    استجابة: {testResult.latencyMs}ms
                                                </span>
                                            )}
                                        </div>
                                        {testResult.response && (
                                            <div className="mt-2 text-xs bg-black/50 p-3 rounded font-mono text-gray-300 border border-white/5">
                                                رد النموذج: {testResult.response}
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {/* TAB 2: SITE CONTENT */}
                {activeTab === 'content' && (
                    <div className="space-y-8">
                        {/* Hero Section Config */}
                        <div className="bg-dark-800 border border-white/10 rounded-2xl p-6 md:p-8">
                            <h3 className="text-xl font-display font-bold text-white mb-2 flex items-center gap-2">
                                <Edit3 className="w-5 h-5 text-brand-red" />
                                <span>محتوى الواجهة الرئيسية (Hero Section)</span>
                            </h3>
                            <p className="text-xs text-gray-400 mb-6">
                                تخصيص العنوان العريض، النص الفرعي، وخلفية السباق في واجهة الموقع الرئيسية
                            </p>

                            <div className="space-y-5">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-2">
                                            العنوان الرئيسي
                                        </label>
                                        <input
                                            type="text"
                                            value={heroTitle}
                                            onChange={(e) => setHeroTitle(e.target.value)}
                                            placeholder="RACE. ANALYZE. PREDICT."
                                            className="w-full bg-dark-900 border border-white/15 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-red font-display tracking-wider"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-2">
                                            الكلمة المميزة بتدرج لوني
                                        </label>
                                        <input
                                            type="text"
                                            value={heroTitleHighlight}
                                            onChange={(e) => setHeroTitleHighlight(e.target.value)}
                                            placeholder="ANALYZE."
                                            className="w-full bg-dark-900 border border-white/15 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-red font-display tracking-wider text-brand-brightGreen"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-2">
                                        النص التعريفي الفرعي
                                    </label>
                                    <textarea
                                        value={heroSubtitle}
                                        onChange={(e) => setHeroSubtitle(e.target.value)}
                                        rows={2}
                                        placeholder="The ultimate AI-powered hub for Teams, Drivers & Live Strategy."
                                        className="w-full bg-dark-900 border border-white/15 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-red"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-2">
                                        رابط صورة الخلفية (Hero Background URL)
                                    </label>
                                    <input
                                        type="url"
                                        value={heroBgImage}
                                        onChange={(e) => setHeroBgImage(e.target.value)}
                                        placeholder="https://..."
                                        className="w-full bg-dark-900 border border-white/15 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-red"
                                    />
                                    
                                    {/* Presets */}
                                    <div className="mt-3 flex flex-wrap gap-2 items-center">
                                        <span className="text-xs text-gray-500">صور سريعة مقترحة:</span>
                                        {PRESET_IMAGES.map((preset, idx) => (
                                            <button
                                                key={idx}
                                                type="button"
                                                onClick={() => setHeroBgImage(preset.url)}
                                                className="text-xs bg-dark-900 hover:bg-brand-red text-gray-300 hover:text-white px-2.5 py-1 rounded-lg border border-white/10 transition-colors"
                                            >
                                                {preset.name}
                                            </button>
                                        ))}
                                    </div>

                                    {/* Image Preview */}
                                    {heroBgImage && (
                                        <div className="mt-4 relative h-40 rounded-xl overflow-hidden border border-white/10">
                                            <img src={heroBgImage} alt="Preview" className="w-full h-full object-cover" />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-3">
                                                <span className="text-xs text-gray-300 font-mono">معاينة صورة خلفية الواجهة</span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Announcement Bar Config */}
                        <div className="bg-dark-800 border border-white/10 rounded-2xl p-6 md:p-8">
                            <div className="flex items-center justify-between mb-4">
                                <div>
                                    <h3 className="text-xl font-display font-bold text-white flex items-center gap-2">
                                        <Bell className="w-5 h-5 text-brand-brightGreen" />
                                        <span>شريط الإعلانات والتنبيهات العلوية</span>
                                    </h3>
                                    <p className="text-xs text-gray-400">
                                        شريط يظهر في أعلى الموقع للأخبار العاجلة أو التنبيهات الاستراتيجية
                                    </p>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={announcementActive}
                                        onChange={(e) => setAnnouncementActive(e.target.checked)}
                                        className="sr-only peer"
                                    />
                                    <div className="w-11 h-6 bg-dark-900 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-brightGreen"></div>
                                </label>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-2">
                                        نص الإعلان أو التنبيه
                                    </label>
                                    <input
                                        type="text"
                                        value={announcementText}
                                        onChange={(e) => setAnnouncementText(e.target.value)}
                                        placeholder="🏎️ Live AI Strategy Engine active for 2026 season..."
                                        className="w-full bg-dark-900 border border-white/15 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-red"
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-2">
                                            نوع التنبيه / النمط
                                        </label>
                                        <select
                                            value={announcementType}
                                            onChange={(e: any) => setAnnouncementType(e.target.value)}
                                            className="w-full bg-dark-900 border border-white/15 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-red"
                                        >
                                            <option value="info">أزرق معلوماتي (Info)</option>
                                            <option value="breaking">أحمر عاجل (Breaking)</option>
                                            <option value="warning">أصفر تحذيري (Warning)</option>
                                            <option value="success">أخضر إيجابي (Success)</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-2">
                                            رابط الزر الاختياري
                                        </label>
                                        <input
                                            type="text"
                                            value={announcementLink}
                                            onChange={(e) => setAnnouncementLink(e.target.value)}
                                            placeholder="#series-selector أو https://..."
                                            className="w-full bg-dark-900 border border-white/15 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-red"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Save Button */}
                        <div className="flex justify-end">
                            <button
                                onClick={handleSaveContent}
                                disabled={savingContent}
                                className="bg-brand-red hover:bg-red-700 text-white font-bold px-8 py-3.5 rounded-xl transition-all flex items-center gap-2 shadow-lg hover:shadow-brand-red/40 disabled:opacity-40"
                            >
                                {savingContent ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                                <span>حفظ وتطبيق التغييرات على الموقع</span>
                            </button>
                        </div>
                    </div>
                )}

                {/* TAB: MEDIA & BRAND MANAGER */}
                {activeTab === 'media' && (
                    <div className="space-y-8 animate-in fade-in duration-300">
                        {/* Top Media Manager Banner & Global Actions */}
                        <div className="bg-gradient-to-r from-dark-800 via-dark-800/90 to-dark-800 border border-white/10 rounded-2xl p-6 md:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6 shadow-xl relative overflow-hidden">
                            <div className="space-y-2">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold">
                                    <Sparkles className="w-3.5 h-3.5" />
                                    <span>نظام إدارة الهوية البصرية والوسائط الحية (Live Media Hub)</span>
                                </div>
                                <h2 className="text-2xl sm:text-3xl font-display font-black text-white">
                                    إدارة الأيقونات والصور والشعارات الرسمية
                                </h2>
                                <p className="text-sm text-gray-300 max-w-2xl leading-relaxed">
                                    تحكم كامل بروابط وملفات صور وشعارات البطولات الست، الفرق وسياراتها، السائقين، وصورة الـ Hero Section. يتم حفظ كافة التعديلات وتطبيقها فوراً في الواجهة العامة للزوار.
                                </p>
                            </div>

                            <div className="flex flex-wrap items-center gap-3 shrink-0">
                                <button
                                    onClick={handleResetMediaDefaults}
                                    type="button"
                                    className="px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white text-xs font-bold border border-white/10 transition-colors flex items-center gap-2"
                                    title="استعادة الصور والشعارات الأصلية عالية الدقة"
                                >
                                    <RefreshCw className="w-4 h-4 text-gray-400" />
                                    <span>استعادة الافتراضي</span>
                                </button>

                                <button
                                    onClick={handleSaveMedia}
                                    disabled={savingMedia}
                                    className="px-6 py-3 rounded-xl bg-brand-red hover:bg-red-600 text-white text-sm font-bold shadow-lg shadow-brand-red/30 transition-all flex items-center gap-2 disabled:opacity-50"
                                >
                                    {savingMedia ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                                    <span>حفظ وتطبيق التعديلات فوراً</span>
                                </button>
                            </div>
                        </div>

                        {/* Sub Tab Navigation */}
                        <div className="flex flex-wrap items-center gap-2 bg-dark-800/80 p-1.5 rounded-2xl border border-white/10">
                            <button
                                onClick={() => setMediaSubTab('championships')}
                                className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
                                    mediaSubTab === 'championships'
                                        ? 'bg-brand-red text-white shadow-md shadow-brand-red/20'
                                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                                }`}
                            >
                                <TrophyIcon className="w-4 h-4" />
                                <span>شعارات وخلفيات البطولات الست (Official 6)</span>
                            </button>

                            <button
                                onClick={() => setMediaSubTab('teams')}
                                className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
                                    mediaSubTab === 'teams'
                                        ? 'bg-brand-red text-white shadow-md shadow-brand-red/20'
                                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                                }`}
                            >
                                <Layers className="w-4 h-4" />
                                <span>شعارات وسيارات الفرق (Logos & Cars)</span>
                            </button>

                            <button
                                onClick={() => setMediaSubTab('drivers')}
                                className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
                                    mediaSubTab === 'drivers'
                                        ? 'bg-brand-red text-white shadow-md shadow-brand-red/20'
                                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                                }`}
                            >
                                <UsersIcon className="w-4 h-4" />
                                <span>صور السائقين (Driver Portraits)</span>
                            </button>

                            <button
                                onClick={() => setMediaSubTab('hero')}
                                className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
                                    mediaSubTab === 'hero'
                                        ? 'bg-brand-red text-white shadow-md shadow-brand-red/20'
                                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                                }`}
                            >
                                <ImageIcon className="w-4 h-4" />
                                <span>صورة الـ Hero Section الرئيسية</span>
                            </button>
                        </div>

                        {/* SUB-TAB 1: CHAMPIONSHIPS LOGOS & COVERS */}
                        {mediaSubTab === 'championships' && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {[
                                    { key: 'Formula 1', id: SeriesId.F1, title: 'Formula 1 (F1®)', badge: 'FIA World Championship' },
                                    { key: 'MotoGP', id: SeriesId.MOTOGP, title: 'MotoGP™', badge: 'FIM World Championship' },
                                    { key: 'WEC', id: SeriesId.WEC, title: 'FIA WEC', badge: 'World Endurance Championship' },
                                    { key: 'IMSA', id: SeriesId.IMSA, title: 'IMSA WeatherTech', badge: 'SportsCar Championship' },
                                    { key: 'GT World Challenge', id: SeriesId.GT_WORLD_CHALLENGE, title: 'GT World Challenge', badge: 'SRO GT3 Series' },
                                    { key: 'DTM', id: SeriesId.DTM, title: 'DTM Masters', badge: 'Deutsche Tourenwagen Masters' }
                                ].map((item) => {
                                    const currentLogo = mediaOverrides.championshipLogos?.[item.key] || mediaOverrides.championshipLogos?.[item.id] || DEFAULT_MEDIA_CONFIG.championshipLogos?.[item.key] || '';
                                    const currentImg = mediaOverrides.championshipImages?.[item.key] || mediaOverrides.championshipImages?.[item.id] || DEFAULT_MEDIA_CONFIG.championshipImages?.[item.key] || '';

                                    return (
                                        <div key={item.key} className="bg-dark-800 border border-white/10 rounded-2xl p-6 space-y-6">
                                            <div className="flex items-center justify-between border-b border-white/10 pb-3">
                                                <div>
                                                    <h3 className="text-lg font-display font-bold text-white flex items-center gap-2">
                                                        <TrophyIcon className="w-4 h-4 text-brand-red" />
                                                        <span>{item.title}</span>
                                                    </h3>
                                                    <span className="text-xs text-gray-400 font-mono">{item.badge}</span>
                                                </div>
                                            </div>

                                            {/* Championship Logo Input & Upload */}
                                            <div className="space-y-3">
                                                <label className="block text-xs font-semibold text-gray-300">
                                                    شعار البطولة الرسمي (SVG / Transparent Logo)
                                                </label>
                                                <div className="flex items-center gap-4">
                                                    <div className="w-20 h-16 rounded-xl bg-dark-900 border border-white/15 p-2 flex items-center justify-center shrink-0">
                                                        {currentLogo ? (
                                                            <img src={currentLogo} alt={item.title} className="max-h-full max-w-full object-contain" />
                                                        ) : (
                                                            <span className="text-[10px] text-gray-500">لا يوجد شعار</span>
                                                        )}
                                                    </div>
                                                    <div className="flex-1 space-y-2">
                                                        <input 
                                                            type="text"
                                                            value={currentLogo}
                                                            onChange={(e) => {
                                                                const val = e.target.value;
                                                                setMediaOverrides(prev => ({
                                                                    ...prev,
                                                                    championshipLogos: {
                                                                        ...(prev.championshipLogos || {}),
                                                                        [item.key]: val,
                                                                        [item.id]: val
                                                                    }
                                                                }));
                                                            }}
                                                            placeholder="رابط الشعار الرسمي https://..."
                                                            className="w-full bg-dark-900 border border-white/15 rounded-xl px-3 py-2 text-white text-xs font-mono focus:outline-none focus:ring-1 focus:ring-brand-red"
                                                        />
                                                        <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-[11px] font-bold cursor-pointer transition-colors">
                                                            <UploadCloud className="w-3.5 h-3.5 text-brand-brightGreen" />
                                                            <span>رفع ملف الشعار (Base64)</span>
                                                            <input 
                                                                type="file"
                                                                accept="image/*"
                                                                className="hidden"
                                                                onChange={(e) => handleFileUpload(e, (base64) => {
                                                                    setMediaOverrides(prev => ({
                                                                        ...prev,
                                                                        championshipLogos: {
                                                                            ...(prev.championshipLogos || {}),
                                                                            [item.key]: base64,
                                                                            [item.id]: base64
                                                                        }
                                                                    }));
                                                                })}
                                                            />
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Championship Action Photo */}
                                            <div className="space-y-3 pt-3 border-t border-white/5">
                                                <label className="block text-xs font-semibold text-gray-300">
                                                    صورة بطاقة السباق الرسمية (High-Res Action Racing Photo)
                                                </label>
                                                <div className="relative h-28 w-full rounded-xl overflow-hidden bg-dark-900 border border-white/10">
                                                    {currentImg && (
                                                        <img src={currentImg} alt={item.title} className="w-full h-full object-cover" />
                                                    )}
                                                    <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-transparent to-transparent"></div>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <input 
                                                        type="text"
                                                        value={currentImg}
                                                        onChange={(e) => {
                                                            const val = e.target.value;
                                                            setMediaOverrides(prev => ({
                                                                ...prev,
                                                                championshipImages: {
                                                                    ...(prev.championshipImages || {}),
                                                                    [item.key]: val,
                                                                    [item.id]: val
                                                                }
                                                            }));
                                                        }}
                                                        placeholder="رابط صورة السباق https://..."
                                                        className="flex-1 bg-dark-900 border border-white/15 rounded-xl px-3 py-2 text-white text-xs font-mono focus:outline-none focus:ring-1 focus:ring-brand-red"
                                                    />
                                                    <label className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold cursor-pointer transition-colors shrink-0">
                                                        <UploadCloud className="w-3.5 h-3.5 text-brand-brightGreen" />
                                                        <span>رفع صورة</span>
                                                        <input 
                                                            type="file"
                                                            accept="image/*"
                                                            className="hidden"
                                                            onChange={(e) => handleFileUpload(e, (base64) => {
                                                                setMediaOverrides(prev => ({
                                                                    ...prev,
                                                                    championshipImages: {
                                                                        ...(prev.championshipImages || {}),
                                                                        [item.key]: base64,
                                                                        [item.id]: base64
                                                                    }
                                                                }));
                                                            })}
                                                        />
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}

                        {/* SUB-TAB 2: TEAMS LOGOS & CARS */}
                        {mediaSubTab === 'teams' && (
                            <div className="space-y-6">
                                {/* Series Filter Pills */}
                                <div className="flex flex-wrap items-center gap-2">
                                    <span className="text-xs font-bold text-gray-400 ml-2">اختر البطولة:</span>
                                    {Object.values(SeriesId).map((s) => (
                                        <button
                                            key={s}
                                            onClick={() => setMediaSeriesFilter(s)}
                                            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                                                mediaSeriesFilter === s
                                                    ? 'bg-brand-red text-white shadow-md shadow-brand-red/30'
                                                    : 'bg-dark-800 text-gray-400 hover:text-white'
                                            }`}
                                        >
                                            {s}
                                        </button>
                                    ))}
                                </div>

                                {/* Teams Grid */}
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                    {getTeamsForSeries(mediaSeriesFilter).map((team) => {
                                        const currentLogo = mediaOverrides.teamLogos?.[team.id] || team.logo;
                                        const currentImg = mediaOverrides.teamImages?.[team.id] || team.image;

                                        return (
                                            <div key={team.id} className="bg-dark-800 border border-white/10 rounded-2xl overflow-hidden shadow-lg flex flex-col">
                                                <div className="h-1.5 w-full" style={{ backgroundColor: team.logoColor }}></div>
                                                <div className="p-6 space-y-5">
                                                    <div className="flex items-center justify-between">
                                                        <div>
                                                            <h3 className="text-lg font-display font-bold text-white">
                                                                {team.name}
                                                            </h3>
                                                            <p className="text-xs text-gray-400">{team.fullName} • {team.car}</p>
                                                        </div>
                                                        <span className="px-2.5 py-1 rounded-full bg-white/10 text-white font-mono text-[11px] font-bold">
                                                            #{team.rank || 1}
                                                        </span>
                                                    </div>

                                                    {/* Team Logo Editor */}
                                                    <div className="space-y-2">
                                                        <label className="block text-xs font-semibold text-gray-300">
                                                            شعار الفريق (Team Logo)
                                                        </label>
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-16 h-12 rounded-xl bg-white/95 p-1.5 flex items-center justify-center shrink-0 border border-white/20">
                                                                {currentLogo ? (
                                                                    <img src={currentLogo} alt={team.name} className="max-h-full max-w-full object-contain" />
                                                                ) : (
                                                                    <span className="text-[10px] text-gray-400">لا يوجد</span>
                                                                )}
                                                            </div>
                                                            <input 
                                                                type="text"
                                                                value={currentLogo}
                                                                onChange={(e) => {
                                                                    const val = e.target.value;
                                                                    setMediaOverrides(prev => ({
                                                                        ...prev,
                                                                        teamLogos: { ...(prev.teamLogos || {}), [team.id]: val }
                                                                    }));
                                                                }}
                                                                placeholder="رابط الشعار..."
                                                                className="flex-1 bg-dark-900 border border-white/15 rounded-xl px-3 py-2 text-white text-xs font-mono focus:outline-none focus:ring-1 focus:ring-brand-red"
                                                            />
                                                            <label className="px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold cursor-pointer transition-colors shrink-0">
                                                                <UploadCloud className="w-3.5 h-3.5" />
                                                                <input 
                                                                    type="file"
                                                                    accept="image/*"
                                                                    className="hidden"
                                                                    onChange={(e) => handleFileUpload(e, (b64) => {
                                                                        setMediaOverrides(prev => ({
                                                                            ...prev,
                                                                            teamLogos: { ...(prev.teamLogos || {}), [team.id]: b64 }
                                                                        }));
                                                                    })}
                                                                />
                                                            </label>
                                                        </div>
                                                    </div>

                                                    {/* Team Car Photo Editor */}
                                                    <div className="space-y-2 pt-2 border-t border-white/5">
                                                        <label className="block text-xs font-semibold text-gray-300">
                                                            صورة السيارة الرسمية (Chassis / Car Photo)
                                                        </label>
                                                        <div className="relative h-28 w-full rounded-xl overflow-hidden bg-dark-900 border border-white/10">
                                                            {currentImg && (
                                                                <img src={currentImg} alt={team.name} className="w-full h-full object-cover" />
                                                            )}
                                                        </div>
                                                        <div className="flex items-center gap-3">
                                                            <input 
                                                                type="text"
                                                                value={currentImg}
                                                                onChange={(e) => {
                                                                    const val = e.target.value;
                                                                    setMediaOverrides(prev => ({
                                                                        ...prev,
                                                                        teamImages: { ...(prev.teamImages || {}), [team.id]: val }
                                                                    }));
                                                                }}
                                                                placeholder="رابط صورة السيارة..."
                                                                className="flex-1 bg-dark-900 border border-white/15 rounded-xl px-3 py-2 text-white text-xs font-mono focus:outline-none focus:ring-1 focus:ring-brand-red"
                                                            />
                                                            <label className="px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold cursor-pointer transition-colors shrink-0">
                                                                <UploadCloud className="w-3.5 h-3.5" />
                                                                <input 
                                                                    type="file"
                                                                    accept="image/*"
                                                                    className="hidden"
                                                                    onChange={(e) => handleFileUpload(e, (b64) => {
                                                                        setMediaOverrides(prev => ({
                                                                            ...prev,
                                                                            teamImages: { ...(prev.teamImages || {}), [team.id]: b64 }
                                                                        }));
                                                                    })}
                                                                />
                                                            </label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                        {/* SUB-TAB 3: DRIVER PORTRAITS */}
                        {mediaSubTab === 'drivers' && (
                            <div className="space-y-6">
                                {/* Series Filter Pills */}
                                <div className="flex flex-wrap items-center gap-2">
                                    <span className="text-xs font-bold text-gray-400 ml-2">اختر البطولة:</span>
                                    {Object.values(SeriesId).map((s) => (
                                        <button
                                            key={s}
                                            onClick={() => setMediaSeriesFilter(s)}
                                            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                                                mediaSeriesFilter === s
                                                    ? 'bg-brand-red text-white shadow-md shadow-brand-red/30'
                                                    : 'bg-dark-800 text-gray-400 hover:text-white'
                                            }`}
                                        >
                                            {s}
                                        </button>
                                    ))}
                                </div>

                                {/* Drivers Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                                    {getTeamsForSeries(mediaSeriesFilter).flatMap(t => t.drivers.map(d => ({ ...d, teamName: t.name }))).map((driver) => {
                                        const currentImg = mediaOverrides.driverImages?.[driver.name] || driver.image || '';

                                        return (
                                            <div key={driver.name} className="bg-dark-800 border border-white/10 rounded-2xl p-5 space-y-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-14 h-16 rounded-xl overflow-hidden bg-dark-900 border border-white/10 shrink-0">
                                                        {currentImg ? (
                                                            <img src={currentImg} alt={driver.name} className="w-full h-full object-cover object-top" />
                                                        ) : (
                                                            <div className="w-full h-full flex items-center justify-center text-gray-600 font-bold">
                                                                #{driver.number}
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="overflow-hidden">
                                                        <span className="font-display font-bold text-white block text-sm truncate">{driver.name}</span>
                                                        <span className="text-xs text-gray-400 block">{driver.teamName}</span>
                                                        <span className="text-[10px] font-mono text-brand-brightGreen">#{driver.number} • {driver.nationality}</span>
                                                    </div>
                                                </div>

                                                <div className="space-y-2">
                                                    <input 
                                                        type="text"
                                                        value={currentImg}
                                                        onChange={(e) => {
                                                            const val = e.target.value;
                                                            setMediaOverrides(prev => ({
                                                                ...prev,
                                                                driverImages: { ...(prev.driverImages || {}), [driver.name]: val }
                                                            }));
                                                        }}
                                                        placeholder="رابط صورة السائق..."
                                                        className="w-full bg-dark-900 border border-white/15 rounded-xl px-3 py-2 text-white text-xs font-mono focus:outline-none focus:ring-1 focus:ring-brand-red"
                                                    />
                                                    <label className="w-full py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold cursor-pointer transition-colors flex items-center justify-center gap-1.5">
                                                        <UploadCloud className="w-3.5 h-3.5 text-brand-brightGreen" />
                                                        <span>رفع صورة السائق</span>
                                                        <input 
                                                            type="file"
                                                            accept="image/*"
                                                            className="hidden"
                                                            onChange={(e) => handleFileUpload(e, (b64) => {
                                                                setMediaOverrides(prev => ({
                                                                    ...prev,
                                                                    driverImages: { ...(prev.driverImages || {}), [driver.name]: b64 }
                                                                }));
                                                            })}
                                                        />
                                                    </label>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                        {/* SUB-TAB 4: HERO SECTION MAIN BANNER */}
                        {mediaSubTab === 'hero' && (
                            <div className="bg-dark-800 border border-white/10 rounded-2xl p-6 md:p-8 space-y-6">
                                <div>
                                    <h3 className="text-xl font-display font-bold text-white mb-1">
                                        صورة خلفية الواجهة الرئيسية (Hero Section Background)
                                    </h3>
                                    <p className="text-xs text-gray-400">
                                        هذه هي الصورة الكبيرة التي تظهر في أعلى الموقع عند دخول الزائر. يمكنك استخدام الرابط المباشر، أو رفع صورة خاصة، أو اختيار أحد النماذج الرسمية فائقة الدقة.
                                    </p>
                                </div>

                                {/* Live Preview Banner */}
                                <div className="relative h-64 sm:h-80 w-full rounded-2xl overflow-hidden border border-white/20 shadow-2xl bg-dark-900">
                                    <img 
                                        src={mediaOverrides.heroBgImage || heroBgImage || DEFAULT_MEDIA_CONFIG.heroBgImage || PRESET_IMAGES[0].url} 
                                        alt="Hero Background Preview" 
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/40 to-transparent"></div>
                                    <div className="absolute bottom-6 left-6 right-6 text-center">
                                        <span className="px-3 py-1 rounded-full bg-brand-red text-white text-xs font-bold uppercase tracking-wider inline-block mb-2 shadow-lg">
                                            معاينة حية للـ Hero
                                        </span>
                                        <h4 className="text-2xl sm:text-4xl font-display font-extrabold text-white drop-shadow-md">
                                            RACE. <span className="text-brand-red">ANALYZE.</span> PREDICT.
                                        </h4>
                                    </div>
                                </div>

                                {/* Custom URL and Upload Row */}
                                <div className="space-y-3">
                                    <label className="block text-xs font-semibold text-gray-300">
                                        رابط الصورة المباشر أو الرفع
                                    </label>
                                    <div className="flex flex-col sm:flex-row items-center gap-3">
                                        <input 
                                            type="text"
                                            value={mediaOverrides.heroBgImage || ''}
                                            onChange={(e) => {
                                                const val = e.target.value;
                                                setMediaOverrides(prev => ({ ...prev, heroBgImage: val }));
                                            }}
                                            placeholder="https://images.unsplash.com/..."
                                            className="w-full sm:flex-1 bg-dark-900 border border-white/15 rounded-xl px-4 py-3 text-white text-xs font-mono focus:outline-none focus:ring-2 focus:ring-brand-red"
                                        />
                                        <label className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold cursor-pointer transition-colors flex items-center justify-center gap-2 shrink-0">
                                            <UploadCloud className="w-4 h-4 text-brand-brightGreen" />
                                            <span>رفع صورة من جهازك</span>
                                            <input 
                                                type="file"
                                                accept="image/*"
                                                className="hidden"
                                                onChange={(e) => handleFileUpload(e, (b64) => {
                                                    setMediaOverrides(prev => ({ ...prev, heroBgImage: b64 }));
                                                })}
                                            />
                                        </label>
                                    </div>
                                </div>

                                {/* Official High-Res Presets */}
                                <div className="space-y-3 pt-4 border-t border-white/10">
                                    <label className="block text-xs font-semibold text-gray-300">
                                        نماذج رسمية فائقة الدقة (Official High-Res Presets):
                                    </label>
                                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                                        {[
                                            { name: "Porsche 963 Le Mans", url: "https://newsroom.porsche.com/.imaging/mte/porsche-templating-theme/image_1290x726/dam/pnr/2023/Motorsports/WEC/Le-Mans-Test-Day/02-Porsche-963-Porsche-Penske-Motorsport.jpg/jcr:content/02-Porsche-963-Porsche-Penske-Motorsport.jpg" },
                                            { name: "Formula 1 Night Circuit", url: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=2400&auto=format&fit=crop" },
                                            { name: "Ferrari 499P Hypercar", url: "https://images.unsplash.com/photo-1592634976722-13b3c3c78864?q=80&w=2400&auto=format&fit=crop" },
                                            { name: "Toyota Gazoo Racing Fuji", url: "https://images.unsplash.com/photo-1629219356886-c322b724497e?q=80&w=2400&auto=format&fit=crop" },
                                            { name: "MotoGP Ducati Speed", url: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?q=80&w=2400&auto=format&fit=crop" },
                                            { name: "DTM Red Bull Ring", url: "https://images.unsplash.com/photo-1628185016593-3d0d8299d63c?q=80&w=2400&auto=format&fit=crop" }
                                        ].map((preset, idx) => (
                                            <button
                                                key={idx}
                                                type="button"
                                                onClick={() => {
                                                    setMediaOverrides(prev => ({ ...prev, heroBgImage: preset.url }));
                                                }}
                                                className={`group relative rounded-xl overflow-hidden border p-1 text-left transition-all ${
                                                    mediaOverrides.heroBgImage === preset.url
                                                        ? 'border-brand-brightGreen ring-2 ring-brand-brightGreen/50'
                                                        : 'border-white/10 hover:border-white/30'
                                                }`}
                                            >
                                                <div className="h-16 w-full rounded-lg overflow-hidden bg-dark-900 mb-1.5">
                                                    <img src={preset.url} alt={preset.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                                                </div>
                                                <span className="block text-[11px] font-bold text-gray-300 truncate group-hover:text-white">
                                                    {preset.name}
                                                </span>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* TAB 3: CUSTOM NEWS */}
                {activeTab === 'news' && (
                    <div className="space-y-8">
                        {/* Add Article Form */}
                        <div className="bg-dark-800 border border-white/10 rounded-2xl p-6 md:p-8">
                            <h3 className="text-xl font-display font-bold text-white mb-2 flex items-center gap-2">
                                <Plus className="w-5 h-5 text-brand-brightGreen" />
                                <span>إضافة خبر أو مقال تحليلي جديد</span>
                            </h3>
                            <p className="text-xs text-gray-400 mb-6">
                                تظهر المقالات المضافة في صدارة شريط الأخبار ولوحة التحليلات لزوار الموقع
                            </p>

                            <div className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="md:col-span-2">
                                        <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-2">
                                            عنوان الخبر
                                        </label>
                                        <input
                                            type="text"
                                            value={newArticleTitle}
                                            onChange={(e) => setNewArticleTitle(e.target.value)}
                                            placeholder="تحليل استراتيجي: تطورات انسيابية سيارات فورمولا 1..."
                                            className="w-full bg-dark-900 border border-white/15 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-red"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-2">
                                            البطولة / الفئة
                                        </label>
                                        <select
                                            value={newArticleSeries}
                                            onChange={(e) => setNewArticleSeries(e.target.value)}
                                            className="w-full bg-dark-900 border border-white/15 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-red"
                                        >
                                            <option value="Formula 1">Formula 1</option>
                                            <option value="MotoGP">MotoGP</option>
                                            <option value="WEC">WEC</option>
                                            <option value="IMSA">IMSA</option>
                                            <option value="GT World Challenge">GT World Challenge</option>
                                            <option value="All">كافة البطولات (All)</option>
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-2">
                                        موجز وتفاصيل الخبر
                                    </label>
                                    <textarea
                                        value={newArticleSummary}
                                        onChange={(e) => setNewArticleSummary(e.target.value)}
                                        rows={3}
                                        placeholder="اكتب تفاصيل وتحليل الخبر هنا..."
                                        className="w-full bg-dark-900 border border-white/15 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-red"
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-2">
                                            المصدر (Source)
                                        </label>
                                        <input
                                            type="text"
                                            value={newArticleSource}
                                            onChange={(e) => setNewArticleSource(e.target.value)}
                                            placeholder="Bouden Editorial"
                                            className="w-full bg-dark-900 border border-white/15 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-red"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-2">
                                            رابط المصدر الخارجي (اختياري)
                                        </label>
                                        <input
                                            type="text"
                                            value={newArticleUrl}
                                            onChange={(e) => setNewArticleUrl(e.target.value)}
                                            placeholder="https://..."
                                            className="w-full bg-dark-900 border border-white/15 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-red"
                                        />
                                    </div>
                                </div>

                                <button
                                    onClick={handleAddArticle}
                                    className="bg-brand-brightGreen hover:bg-emerald-400 text-black font-bold px-6 py-3 rounded-xl transition-all flex items-center gap-2 shadow-lg"
                                >
                                    <Plus className="w-4 h-4" />
                                    <span>نشر المقال فوراً</span>
                                </button>
                            </div>
                        </div>

                        {/* Existing Articles List */}
                        <div className="bg-dark-800 border border-white/10 rounded-2xl p-6 md:p-8">
                            <h3 className="text-xl font-display font-bold text-white mb-4">
                                المقالات المخصصة الحالية ({customNewsList.length})
                            </h3>

                            {customNewsList.length === 0 ? (
                                <p className="text-gray-400 text-sm py-8 text-center border border-dashed border-white/10 rounded-xl">
                                    لا توجد مقالات مخصصة حالياً، المقالات المضافة ستظهر هنا وفي واجهة الزوار.
                                </p>
                            ) : (
                                <div className="space-y-4">
                                    {customNewsList.map((article) => (
                                        <div
                                            key={article.id}
                                            className="p-4 rounded-xl bg-dark-900/80 border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4"
                                        >
                                            <div className="space-y-1">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-xs bg-brand-red/20 text-brand-red font-semibold px-2 py-0.5 rounded border border-brand-red/30">
                                                        {article.series}
                                                    </span>
                                                    <span className="text-xs text-gray-500 font-mono">
                                                        {article.date}
                                                    </span>
                                                    <span className="text-xs text-gray-400">
                                                        بواسطة {article.source}
                                                    </span>
                                                </div>
                                                <h4 className="text-base font-bold text-white">
                                                    {article.title}
                                                </h4>
                                                <p className="text-xs text-gray-300 line-clamp-2">
                                                    {article.summary}
                                                </p>
                                            </div>

                                            <div className="flex items-center gap-2 self-end md:self-auto">
                                                <button
                                                    onClick={() => handleDeleteArticle(article.id)}
                                                    className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 transition-colors"
                                                    title="حذف المقال"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* TAB 4: AUTOMATED BOTS & 2026 STANDINGS */}
                {activeTab === 'bots' && (
                    <div className="space-y-8">
                        <div className="bg-dark-800 border border-white/10 rounded-2xl p-6 md:p-8">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/10">
                                <div>
                                    <h3 className="text-xl font-display font-bold text-white flex items-center gap-2">
                                        <Radio className="w-5 h-5 text-brand-brightGreen" />
                                        <span>محرك البوتات الذكية وتحديثات موسم 2026</span>
                                    </h3>
                                    <p className="text-xs text-gray-400 mt-1">
                                        إدارة ومراقبة بوتات جلب النتائج التلقائية وتحديث نقاط وترتيب موسم 2026 لجميع البطولات الخمس.
                                    </p>
                                </div>

                                <div className="flex flex-wrap items-center gap-3">
                                    <button
                                        onClick={handleSyncAllBots}
                                        disabled={syncingAllBots}
                                        className="px-4 py-2.5 rounded-xl bg-brand-red hover:bg-red-700 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-brand-red/30 disabled:opacity-50 transition-all"
                                    >
                                        <RefreshCw className={`w-4 h-4 ${syncingAllBots ? 'animate-spin' : ''}`} />
                                        <span>{syncingAllBots ? 'جاري المزامنة...' : 'مزامنة كافة البوتات الآن'}</span>
                                    </button>

                                    <button
                                        onClick={handleResetDatabase2026}
                                        disabled={resettingCache}
                                        className="px-4 py-2.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-yellow-400 border border-amber-500/30 font-bold text-xs flex items-center gap-2 transition-all disabled:opacity-50"
                                        title="إعادة بناء وتفريغ كاش نتائج 2026 من القاعدة المحدثة"
                                    >
                                        <Database className="w-4 h-4" />
                                        <span>{resettingCache ? 'جاري الضبط...' : 'تفريغ الكاش وإعادة ضبط 2026'}</span>
                                    </button>
                                </div>
                            </div>

                            {/* Bots Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
                                {botList.length > 0 ? (
                                    botList.map((bot, idx) => (
                                        <div key={idx} className="p-4 rounded-xl bg-dark-900 border border-white/10 flex flex-col justify-between">
                                            <div>
                                                <div className="flex items-center justify-between mb-2">
                                                    <span className="font-bold text-white text-sm">{bot.series || bot.name}</span>
                                                    <span className="px-2 py-0.5 rounded-full bg-brand-brightGreen/20 text-brand-brightGreen border border-brand-brightGreen/30 text-[10px] font-bold uppercase flex items-center gap-1">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-brand-brightGreen animate-pulse"></span>
                                                        {bot.status || 'Active'}
                                                    </span>
                                                </div>
                                                <p className="text-[11px] text-gray-400 font-mono mb-2">
                                                    المصدر: {bot.feedSource || 'Official Timing Bot'}
                                                </p>
                                            </div>

                                            <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs text-gray-400">
                                                <span>استجابة: <strong className="text-white font-mono">{bot.pingMs || 18}ms</strong></span>
                                                <span>مزامنات: <strong className="text-white font-mono">{bot.syncCount || 42}</strong></span>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="col-span-full py-8 text-center text-gray-400">
                                        <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2 opacity-50" />
                                        <span>جاري فحص حالة البوتات...</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {/* TAB 5: REGISTERED USERS & PADDOCK MEMBERS */}
                {activeTab === 'users' && (
                    <div className="space-y-8">
                        <div className="bg-dark-800 border border-white/10 rounded-2xl p-6 md:p-8">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/10">
                                <div>
                                    <h3 className="text-xl font-display font-bold text-white flex items-center gap-2">
                                        <UsersIcon className="w-5 h-5 text-brand-red" />
                                        <span>المستخدمين المسجلين في منصة Bouden Paddock</span>
                                    </h3>
                                    <p className="text-xs text-gray-400 mt-1">
                                        عرض المشجعين المسجلين، تفضيلاتهم، فرقهم وسائقيهم المفضلين، وحالة الحسابات.
                                    </p>
                                </div>

                                <button
                                    onClick={loadUsersData}
                                    disabled={loadingUsers}
                                    className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs flex items-center gap-2 transition-colors self-start md:self-auto"
                                >
                                    <RefreshCw className={`w-3.5 h-3.5 ${loadingUsers ? 'animate-spin' : ''}`} />
                                    <span>تحديث القائمة</span>
                                </button>
                            </div>

                            {/* Summary Cards */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-6">
                                <div className="p-4 rounded-xl bg-dark-900 border border-white/10">
                                    <span className="text-xs font-bold text-gray-400 uppercase">إجمالي المسجلين</span>
                                    <p className="text-2xl font-black text-white mt-1 font-display">{registeredUsersList.length}</p>
                                </div>
                                <div className="p-4 rounded-xl bg-dark-900 border border-white/10">
                                    <span className="text-xs font-bold text-gray-400 uppercase">البطولة الأكثر متابعة</span>
                                    <p className="text-2xl font-black text-brand-brightGreen mt-1 font-display">Formula 1</p>
                                </div>
                                <div className="p-4 rounded-xl bg-dark-900 border border-white/10">
                                    <span className="text-xs font-bold text-gray-400 uppercase">الفريق الأكثر تفضيلاً</span>
                                    <p className="text-2xl font-black text-brand-red mt-1 font-display">Ferrari</p>
                                </div>
                            </div>

                            {/* Users Table */}
                            <div className="overflow-x-auto rounded-xl border border-white/10">
                                <table className="w-full text-left text-xs">
                                    <thead className="bg-white/5 text-gray-400 uppercase font-bold tracking-wider">
                                        <tr>
                                            <th className="p-3">المستخدم (User)</th>
                                            <th className="p-3">البريد الإلكتروني</th>
                                            <th className="p-3">البطولة المفضلة</th>
                                            <th className="p-3">الفريق المفضل</th>
                                            <th className="p-3">السائق المفضل</th>
                                            <th className="p-3">تاريخ الانضمام</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/5">
                                        {registeredUsersList.length > 0 ? (
                                            registeredUsersList.map((u, i) => (
                                                <tr key={u.id || i} className="hover:bg-white/5 transition-colors">
                                                    <td className="p-3 font-bold text-white flex items-center gap-2">
                                                        <div className="w-6 h-6 rounded-full bg-brand-red/30 text-brand-red flex items-center justify-center font-bold text-[10px]">
                                                            {(u.name || 'U').charAt(0).toUpperCase()}
                                                        </div>
                                                        <span>{u.name}</span>
                                                    </td>
                                                    <td className="p-3 text-gray-300 font-mono">{u.email}</td>
                                                    <td className="p-3 text-gray-300">
                                                        <span className="px-2 py-0.5 rounded bg-white/10 text-white font-semibold">
                                                            {u.favoriteSeries || 'F1'}
                                                        </span>
                                                    </td>
                                                    <td className="p-3 text-white font-medium">{u.favoriteTeam || '-'}</td>
                                                    <td className="p-3 text-white font-medium">{u.favoriteDriver || '-'}</td>
                                                    <td className="p-3 text-gray-500 font-mono">
                                                        {u.createdAt ? new Date(u.createdAt).toLocaleDateString() : '-'}
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan={6} className="p-6 text-center text-gray-500">
                                                    لا يوجد مستخدمون مسجلون حالياً.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}

                {/* TAB 6: SECURITY */}
                {activeTab === 'security' && (
                    <div className="max-w-2xl bg-dark-800 border border-white/10 rounded-2xl p-6 md:p-8">
                        <h3 className="text-xl font-display font-bold text-white mb-2 flex items-center gap-2">
                            <Lock className="w-5 h-5 text-brand-red" />
                            <span>تعديل بيانات الحساب وكلمة المرور</span>
                        </h3>
                        <p className="text-xs text-gray-400 mb-6">
                            يمكنك تحديث اسم المستخدم وكلمة المرور للوحة التحكم في أي وقت
                        </p>

                        <form onSubmit={handleChangeCredentials} className="space-y-4">
                            <div>
                                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-2">
                                    اسم المستخدم
                                </label>
                                <input
                                    type="text"
                                    value={accountUsername}
                                    onChange={(e) => setAccountUsername(e.target.value)}
                                    placeholder="bouden"
                                    className="w-full bg-dark-900 border border-white/15 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-red"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-2">
                                    كلمة المرور الحالية للتأكيد
                                </label>
                                <input
                                    type="password"
                                    value={currentPassword}
                                    onChange={(e) => setCurrentPassword(e.target.value)}
                                    placeholder="أدخل كلمة المرور الحالية (افتراضياً: reda)..."
                                    className="w-full bg-dark-900 border border-white/15 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-red"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-2">
                                    كلمة المرور الجديدة (اختياري)
                                </label>
                                <input
                                    type="password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    placeholder="كلمة مرور جديدة (اتركها فارغة إذا أردت الاحتفاظ بالحالية)..."
                                    className="w-full bg-dark-900 border border-white/15 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-red"
                                />
                            </div>

                            {newPassword && (
                                <div>
                                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-2">
                                        تأكيد كلمة المرور الجديدة
                                    </label>
                                    <input
                                        type="password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        placeholder="أعد كتابة كلمة المرور الجديدة..."
                                        className="w-full bg-dark-900 border border-white/15 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-red"
                                        required={!!newPassword}
                                    />
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={changingCredentials}
                                className="bg-brand-red hover:bg-red-700 text-white font-bold px-6 py-3 rounded-xl transition-all flex items-center gap-2 shadow-lg disabled:opacity-40"
                            >
                                {changingCredentials ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                                <span>حفظ بيانات الحساب</span>
                            </button>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminPanel;
