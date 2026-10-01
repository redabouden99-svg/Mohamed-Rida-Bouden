import React, { useState } from 'react';
import { X, Lock, Mail, User, Trophy, Heart, ArrowRight, ShieldCheck, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { userLogin, userRegister, UserAccount } from '../services/authService';
import { SeriesId } from '../types';

interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: (user: UserAccount) => void;
    initialTab?: 'login' | 'register';
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onSuccess, initialTab = 'login' }) => {
    const [tab, setTab] = useState<'login' | 'register'>(initialTab);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    // Form inputs
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [favoriteSeries, setFavoriteSeries] = useState<string>('Formula 1');
    const [favoriteTeam, setFavoriteTeam] = useState<string>('Ferrari');
    const [favoriteDriver, setFavoriteDriver] = useState<string>('Lewis Hamilton');

    if (!isOpen) return null;

    const handleLoginSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setSuccessMessage(null);
        if (!email || !password) {
            setError('يرجى إدخال البريد الإلكتروني وكلمة المرور / Please fill in all fields');
            return;
        }

        setLoading(true);
        try {
            const res = await userLogin(email, password);
            if (res.success && res.user) {
                setSuccessMessage('مرحباً بك مجدداً في حلبة Bouden Motorsport!');
                setTimeout(() => {
                    onSuccess(res.user!);
                    onClose();
                }, 800);
            } else {
                setError(res.error || 'فشل تسجيل الدخول: تحقق من بياناتك / Invalid credentials');
            }
        } catch (err: any) {
            setError(err.message || 'حدث خطأ في الاتصال / Connection error');
        } finally {
            setLoading(false);
        }
    };

    const handleRegisterSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setSuccessMessage(null);
        if (!name || !email || !password) {
            setError('يرجى ملء جميع الحقول المطلوبة / Please fill required fields');
            return;
        }

        setLoading(true);
        try {
            const res = await userRegister({
                name,
                email,
                password,
                favoriteSeries,
                favoriteTeam,
                favoriteDriver
            });
            if (res.success && res.user) {
                setSuccessMessage('تم إنشاء حسابك بنجاح! تم تفعيل ميزات المشجع المفضل.');
                setTimeout(() => {
                    onSuccess(res.user!);
                    onClose();
                }, 800);
            } else {
                setError(res.error || 'تعذر إتمام التسجيل / Registration failed');
            }
        } catch (err: any) {
            setError(err.message || 'خطأ أثناء التسجيل / Registration error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
            <div 
                className="relative w-full max-w-md bg-dark-900 border border-white/15 rounded-3xl shadow-2xl overflow-hidden"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header Graphic Accent */}
                <div className="h-1.5 w-full bg-gradient-to-r from-brand-red via-orange-500 to-brand-brightGreen" />

                <div className="p-6 sm:p-8">
                    {/* Top bar with Close */}
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-xl bg-brand-red flex items-center justify-center text-white font-black text-sm shadow-[0_0_12px_rgba(255,51,51,0.5)]">
                                B
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-white tracking-wide">
                                    Bouden <span className="text-brand-red">Paddock Club</span>
                                </h3>
                                <p className="text-xs text-gray-400">بوابة المشجعين والتحليلات الحية</p>
                            </div>
                        </div>

                        <button 
                            onClick={onClose}
                            className="p-1.5 text-gray-400 hover:text-white rounded-full hover:bg-white/10 transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Mode Tabs */}
                    <div className="grid grid-cols-2 p-1 bg-dark-800 rounded-xl mb-6 border border-white/10">
                        <button
                            type="button"
                            onClick={() => { setTab('login'); setError(null); }}
                            className={`py-2 text-xs sm:text-sm font-bold rounded-lg transition-all ${
                                tab === 'login' 
                                    ? 'bg-brand-red text-white shadow-md shadow-brand-red/30' 
                                    : 'text-gray-400 hover:text-white'
                            }`}
                        >
                            تسجيل الدخول (Sign In)
                        </button>
                        <button
                            type="button"
                            onClick={() => { setTab('register'); setError(null); }}
                            className={`py-2 text-xs sm:text-sm font-bold rounded-lg transition-all ${
                                tab === 'register' 
                                    ? 'bg-brand-red text-white shadow-md shadow-brand-red/30' 
                                    : 'text-gray-400 hover:text-white'
                            }`}
                        >
                            إنشاء حساب جديد (Join)
                        </button>
                    </div>

                    {/* Feedback Messages */}
                    {error && (
                        <div className="mb-4 p-3 bg-red-950/60 border border-red-500/40 rounded-xl text-red-300 text-xs flex items-center gap-2">
                            <AlertCircle className="w-4 h-4 flex-shrink-0" />
                            <span>{error}</span>
                        </div>
                    )}

                    {successMessage && (
                        <div className="mb-4 p-3 bg-emerald-950/60 border border-emerald-500/40 rounded-xl text-emerald-300 text-xs flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                            <span>{successMessage}</span>
                        </div>
                    )}

                    {/* Login Form */}
                    {tab === 'login' ? (
                        <form onSubmit={handleLoginSubmit} className="space-y-4">
                            <div>
                                <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                                    البريد الإلكتروني / Email
                                </label>
                                <div className="relative">
                                    <Mail className="absolute left-3.5 top-3 w-4 h-4 text-gray-400" />
                                    <input
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="fan@motorsport.com"
                                        className="w-full bg-dark-800 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-brand-red transition-colors"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                                    كلمة المرور / Password
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-3.5 top-3 w-4 h-4 text-gray-400" />
                                    <input
                                        type="password"
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="••••••••"
                                        className="w-full bg-dark-800 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-brand-red transition-colors"
                                    />
                                </div>
                            </div>

                            {/* Demo quick credential helper */}
                            <div className="p-2.5 bg-white/5 rounded-xl border border-white/5 flex items-center justify-between text-[11px] text-gray-400">
                                <span>تجربة سريعة (Demo Fan):</span>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setEmail('user@boudenmotorsport.com');
                                        setPassword('reda123');
                                    }}
                                    className="text-brand-brightGreen hover:underline font-mono"
                                >
                                    user@boudenmotorsport.com
                                </button>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-3 rounded-xl bg-brand-red hover:bg-red-600 text-white font-bold text-sm tracking-wide transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-brand-red/30 disabled:opacity-50"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        <span>جاري الدخول...</span>
                                    </>
                                ) : (
                                    <>
                                        <span>تسجيل الدخول إلى حسابك</span>
                                        <ArrowRight className="w-4 h-4" />
                                    </>
                                )}
                            </button>
                        </form>
                    ) : (
                        /* Register Form */
                        <form onSubmit={handleRegisterSubmit} className="space-y-3.5">
                            <div>
                                <label className="block text-xs font-semibold text-gray-300 mb-1">
                                    الاسم الكامل / Full Name
                                </label>
                                <div className="relative">
                                    <User className="absolute left-3.5 top-2.5 w-4 h-4 text-gray-400" />
                                    <input
                                        type="text"
                                        required
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="Mohamed Rida"
                                        className="w-full bg-dark-800 border border-white/10 rounded-xl pl-10 pr-4 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-brand-red"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-gray-300 mb-1">
                                    البريد الإلكتروني / Email
                                </label>
                                <div className="relative">
                                    <Mail className="absolute left-3.5 top-2.5 w-4 h-4 text-gray-400" />
                                    <input
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="fan@motorsport.com"
                                        className="w-full bg-dark-800 border border-white/10 rounded-xl pl-10 pr-4 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-brand-red"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-gray-300 mb-1">
                                    كلمة المرور / Password
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-3.5 top-2.5 w-4 h-4 text-gray-400" />
                                    <input
                                        type="password"
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="••••••••"
                                        className="w-full bg-dark-800 border border-white/10 rounded-xl pl-10 pr-4 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-brand-red"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-2 pt-1">
                                <div>
                                    <label className="block text-[11px] font-semibold text-gray-400 mb-1">
                                        البطولة المفضلة
                                    </label>
                                    <select
                                        value={favoriteSeries}
                                        onChange={(e) => setFavoriteSeries(e.target.value)}
                                        className="w-full bg-dark-800 border border-white/10 rounded-xl px-2.5 py-2 text-xs text-white focus:outline-none"
                                    >
                                        <option value="Formula 1">Formula 1</option>
                                        <option value="MotoGP">MotoGP</option>
                                        <option value="WEC">WEC</option>
                                        <option value="IMSA">IMSA</option>
                                        <option value="GT World Challenge">GT World Challenge</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-[11px] font-semibold text-gray-400 mb-1">
                                        الفريق المفضل
                                    </label>
                                    <input
                                        type="text"
                                        value={favoriteTeam}
                                        onChange={(e) => setFavoriteTeam(e.target.value)}
                                        placeholder="Ferrari / Ducati / Porsche"
                                        className="w-full bg-dark-800 border border-white/10 rounded-xl px-2.5 py-2 text-xs text-white focus:outline-none"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-[11px] font-semibold text-gray-400 mb-1">
                                    السائق المفضل
                                </label>
                                <input
                                    type="text"
                                    value={favoriteDriver}
                                    onChange={(e) => setFavoriteDriver(e.target.value)}
                                    placeholder="Lewis Hamilton / Marc Marquez"
                                    className="w-full bg-dark-800 border border-white/10 rounded-xl px-2.5 py-2 text-xs text-white focus:outline-none"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-3 mt-2 rounded-xl bg-gradient-to-r from-brand-red to-orange-600 hover:from-red-600 hover:to-orange-500 text-white font-bold text-sm tracking-wide transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-brand-red/30 disabled:opacity-50"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        <span>جاري إنشاء الحساب...</span>
                                    </>
                                ) : (
                                    <>
                                        <span>الانضمام لعشاق رياضة المحركات</span>
                                        <CheckCircle2 className="w-4 h-4" />
                                    </>
                                )}
                            </button>
                        </form>
                    )}

                    <div className="mt-5 pt-4 border-t border-white/10 text-center text-[11px] text-gray-500">
                        حساب مخصص لتخصيص جدول السباقات وحفظ التنبيهات المباشرة لموسم 2026.
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthModal;
