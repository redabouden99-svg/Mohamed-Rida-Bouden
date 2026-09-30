import React, { useState, useEffect } from 'react';
import { 
    adminLogin, 
    adminVerify, 
    fetchAdminConfig, 
    updateGeminiKey, 
    testGeminiKey, 
    updateSiteContent, 
    changeAdminPassword, 
    adminLogout 
} from '../services/adminService';
import { SiteContent, CustomArticle } from '../types';
import { 
    Shield, Key, Lock, Unlock, CheckCircle2, AlertTriangle, 
    Sparkles, RefreshCw, Eye, EyeOff, Save, Trash2, Plus, 
    Globe, ArrowLeft, LogOut, Cpu, Layout, FileText, ExternalLink
} from 'lucide-react';

interface AdminPanelProps {
    onBackToSite: () => void;
    onContentUpdated?: (content: SiteContent) => void;
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
    // Auth State
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [checkingAuth, setCheckingAuth] = useState<boolean>(true);
    const [passwordInput, setPasswordInput] = useState<string>('');
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [loginLoading, setLoginLoading] = useState<boolean>(false);
    const [loginError, setLoginError] = useState<string | null>(null);

    // Active Admin Tab
    const [activeTab, setActiveTab] = useState<'gemini' | 'content' | 'news' | 'security'>('gemini');

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
    const [currentPassword, setCurrentPassword] = useState<string>('');
    const [newPassword, setNewPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [changingPassword, setChangingPassword] = useState<boolean>(false);

    // Check existing session on mount
    useEffect(() => {
        const verify = async () => {
            setCheckingAuth(true);
            const valid = await adminVerify();
            setIsAuthenticated(valid);
            if (valid) {
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

        const res = await adminLogin(passwordInput);
        setLoginLoading(false);

        if (res.success) {
            setIsAuthenticated(true);
            setPasswordInput('');
            loadConfig();
        } else {
            setLoginError(res.message || 'كلمة المرور غير صحيحة، يرجى المحاولة مجدداً');
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
            setStatusMessage({ type: 'success', text: res.message || 'تم حفظ المفتاح بنجاح' });
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
                setStatusMessage({ type: 'success', text: 'اتصال Gemini AI سليم ويعمل بكفاءة عالية!' });
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
            setStatusMessage({ type: 'success', text: res.message || 'تم حفظ محتوى الموقع بنجاح' });
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

        // Persist immediately
        updateSiteContent({ customNews: updated }).then(res => {
            if (onContentUpdated && res.siteContent) {
                onContentUpdated(res.siteContent);
            }
            setStatusMessage({ type: 'success', text: 'تمت إضافة المقال الإخباري وتحديث خلاصات الموقع' });
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

    const handleChangePassword = async (e: React.FormEvent) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            setStatusMessage({ type: 'error', text: 'كلمة المرور الجديدة غير متطابقة مع التأكيد' });
            return;
        }
        if (newPassword.length < 4) {
            setStatusMessage({ type: 'error', text: 'يجب أن تكون كلمة المرور 4 خانات على الأقل' });
            return;
        }

        setChangingPassword(true);
        setStatusMessage(null);
        try {
            const res = await changeAdminPassword(currentPassword, newPassword);
            setStatusMessage({ type: 'success', text: res.message || 'تم تغيير كلمة المرور بنجاح' });
            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');
            loadConfig();
        } catch (err: any) {
            setStatusMessage({ type: 'error', text: err.message || 'فشل تغيير كلمة المرور' });
        } finally {
            setChangingPassword(false);
        }
    };

    // Loading View
    if (checkingAuth) {
        return (
            <div className="min-h-screen bg-dark-900 flex items-center justify-center text-center p-6">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-red mb-4"></div>
            </div>
        );
    }

    // Login Screen
    if (!isAuthenticated) {
        return (
            <div className="min-h-[85vh] bg-gradient-to-b from-dark-900 via-dark-800 to-dark-900 flex items-center justify-center p-4">
                <div className="max-w-md w-full bg-dark-800/90 border border-white/10 rounded-2xl p-8 backdrop-blur-xl shadow-2xl relative overflow-hidden">
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
                            لوحة تحكم الأدمن وإدارة مفتاح الذكاء الاصطناعي
                        </p>
                    </div>

                    {loginError && (
                        <div className="mb-6 p-4 rounded-xl bg-red-900/30 border border-red-500/30 text-red-200 text-sm flex items-start gap-3">
                            <AlertTriangle className="w-5 h-5 flex-shrink-0 text-red-400 mt-0.5" />
                            <div>{loginError}</div>
                        </div>
                    )}

                    <form onSubmit={handleLogin} className="space-y-5">
                        <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
                                كلمة المرور / Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={passwordInput}
                                    onChange={(e) => setPasswordInput(e.target.value)}
                                    placeholder="أدخل كلمة مرور الأدمن..."
                                    className="w-full bg-dark-900/80 border border-white/15 rounded-xl px-4 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-red focus:border-transparent transition-all pr-12 text-sm"
                                    required
                                    autoFocus
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white p-1 transition-colors"
                                >
                                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                        </div>

                        <div className="p-3 bg-white/5 border border-white/10 rounded-xl text-xs text-gray-300 flex items-center justify-between">
                            <span>كلمة المرور الافتراضية:</span>
                            <code className="bg-black/50 text-brand-brightGreen font-mono px-2 py-0.5 rounded font-bold">admin123</code>
                        </div>

                        <button
                            type="submit"
                            disabled={loginLoading}
                            className="w-full bg-brand-red hover:bg-red-700 text-white font-bold py-3.5 px-4 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-brand-red/40 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50"
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
            {/* Top Admin Bar */}
            <div className="border-b border-white/10 bg-dark-800/90 backdrop-blur-md sticky top-0 z-40">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-brand-red/10 border border-brand-red/30 flex items-center justify-center text-brand-red">
                            <Shield className="w-5 h-5" />
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <h1 className="text-xl font-display font-bold text-white tracking-wide uppercase">
                                    Bouden <span className="text-brand-red">Admin Panel</span>
                                </h1>
                                <span className="bg-brand-brightGreen/20 text-brand-brightGreen text-[11px] font-mono font-bold px-2 py-0.5 rounded-full border border-brand-brightGreen/30">
                                    LIVE
                                </span>
                            </div>
                            <p className="text-xs text-gray-400">
                                لوحة التحكم المركزية • ضبط Gemini API وإدارة المحتوى
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
                                    مفعل ({adminConfig?.geminiModel || '2.5-flash'})
                                </span>
                            ) : (
                                <span className="text-amber-400 font-semibold flex items-center gap-1">
                                    <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                                    غير محدد
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
                        <button onClick={() => setStatusMessage(null)} className="text-xs opacity-60 hover:opacity-100">
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
                        <span>محتوى الواجهة والبانر</span>
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
                        onClick={() => setActiveTab('security')}
                        className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold tracking-wide transition-all ${
                            activeTab === 'security'
                                ? 'bg-brand-red text-white shadow-lg shadow-brand-red/30'
                                : 'bg-dark-800 text-gray-400 hover:text-white hover:bg-dark-700'
                        }`}
                    >
                        <Lock className="w-4 h-4" />
                        <span>الأمان وكلمة المرور</span>
                        {adminConfig?.hasDefaultPassword && (
                            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
                        )}
                    </button>
                </div>

                {/* TAB 1: GEMINI API KEY */}
                {activeTab === 'gemini' && (
                    <div className="space-y-8">
                        {/* Status Card */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="bg-dark-800 border border-white/10 rounded-2xl p-6">
                                <span className="text-xs uppercase text-gray-400 font-semibold tracking-wider">حالة المفتاح الحالية</span>
                                <div className="mt-3 flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <div className={`w-3 h-3 rounded-full ${adminConfig?.geminiConfigured ? 'bg-brand-brightGreen animate-pulse' : 'bg-amber-400'}`}></div>
                                        <span className="text-lg font-bold text-white">
                                            {adminConfig?.geminiConfigured ? 'مفعل وجاهز' : 'غير مكتمل'}
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
                                        المفتاح يحفظ على الخادم بشكل آمن، وتتم عبره كافة استعلامات التوقعات والتحليل الفني
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
                                        <span>فحص واختبار المفتاح مباشرة</span>
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
                            <h3 className="text-xl font-display font-bold text-white mb-2">
                                محتوى الواجهة الرئيسية (Hero Section)
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
                                            className="w-full bg-dark-900 border border-white/15 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-red"
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
                                            className="w-full bg-dark-900 border border-white/15 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-red"
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
                                        <div className="mt-4 relative h-36 rounded-xl overflow-hidden border border-white/10">
                                            <img src={heroBgImage} alt="Preview" className="w-full h-full object-cover" />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-3">
                                                <span className="text-xs text-gray-300 font-mono">معاينة خلفية الواجهة</span>
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
                                    <h3 className="text-xl font-display font-bold text-white">
                                        شريط الإعلانات والتنبيهات العلوية
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
                                <span>حفظ كافة التغييرات على الموقع</span>
                            </button>
                        </div>
                    </div>
                )}

                {/* TAB 3: CUSTOM NEWS */}
                {activeTab === 'news' && (
                    <div className="space-y-8">
                        {/* Add Article Form */}
                        <div className="bg-dark-800 border border-white/10 rounded-2xl p-6 md:p-8">
                            <h3 className="text-xl font-display font-bold text-white mb-2 flex items-center gap-2">
                                <Plus className="w-5 h-5 text-brand-brightGreen" />
                                <span>إضافة مقال أو خبر عاجل جديد</span>
                            </h3>
                            <p className="text-xs text-gray-400 mb-6">
                                الأخبار المضافة تظهر تلقائياً في صدارة شريط الأخبار ولوحة التحليلات لزوار الموقع
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
                                            placeholder="مثال: تحليل استراتيجي: تطورات انسيابية سيارات فورمولا 1 لموسم 2026..."
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
                                            رابط القراءة أو المصدر الخارجي (اختياري)
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

                {/* TAB 4: SECURITY */}
                {activeTab === 'security' && (
                    <div className="max-w-2xl bg-dark-800 border border-white/10 rounded-2xl p-6 md:p-8">
                        <h3 className="text-xl font-display font-bold text-white mb-2">
                            تغيير كلمة مرور لوحة التحكم
                        </h3>
                        <p className="text-xs text-gray-400 mb-6">
                            قم بتحديث كلمة المرور لحماية إعدادات ومفاتيح الذكاء الاصطناعي
                        </p>

                        {adminConfig?.hasDefaultPassword && (
                            <div className="mb-6 p-4 rounded-xl bg-amber-950/40 border border-amber-500/40 text-amber-200 text-xs flex items-center gap-3">
                                <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0" />
                                <span>
                                    تنبيه: أنت تستخدم كلمة المرور الافتراضية <code className="bg-black/50 px-1 py-0.5 rounded font-bold text-white">admin123</code>. يوصى بتغييرها الآن.
                                </span>
                            </div>
                        )}

                        <form onSubmit={handleChangePassword} className="space-y-4">
                            <div>
                                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-2">
                                    كلمة المرور الحالية
                                </label>
                                <input
                                    type="password"
                                    value={currentPassword}
                                    onChange={(e) => setCurrentPassword(e.target.value)}
                                    placeholder="أدخل كلمة المرور الحالية..."
                                    className="w-full bg-dark-900 border border-white/15 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-red"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-2">
                                    كلمة المرور الجديدة
                                </label>
                                <input
                                    type="password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    placeholder="كلمة مرور جديدة (4 خانات على الأقل)..."
                                    className="w-full bg-dark-900 border border-white/15 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-red"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-2">
                                    تأكيد كلمة المرور الجديدة
                                </label>
                                <input
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="أعد كتابة كلمة المرور..."
                                    className="w-full bg-dark-900 border border-white/15 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-red"
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={changingPassword}
                                className="bg-brand-red hover:bg-red-700 text-white font-bold px-6 py-3 rounded-xl transition-all flex items-center gap-2 shadow-lg disabled:opacity-40"
                            >
                                {changingPassword ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Lock className="w-4 h-4" />}
                                <span>تحديث كلمة المرور</span>
                            </button>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminPanel;
