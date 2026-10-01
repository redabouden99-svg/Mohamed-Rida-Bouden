import React, { useState } from 'react';
import { X, User, Heart, Trophy, Bell, Shield, LogOut, Check, Plus, Trash2 } from 'lucide-react';
import { UserAccount, updateUserFavorites, userLogout } from '../services/authService';

interface UserProfileModalProps {
    isOpen: boolean;
    user: UserAccount | null;
    onClose: () => void;
    onUserUpdated: (user: UserAccount) => void;
    onLogout: () => void;
}

const UserProfileModal: React.FC<UserProfileModalProps> = ({
    isOpen,
    user,
    onClose,
    onUserUpdated,
    onLogout
}) => {
    if (!isOpen || !user) return null;

    const [favoriteSeries, setFavoriteSeries] = useState(user.favoriteSeries || 'Formula 1');
    const [teams, setTeams] = useState<string[]>(user.favoriteTeamsList || (user.favoriteTeam ? [user.favoriteTeam] : []));
    const [drivers, setDrivers] = useState<string[]>(user.favoriteDriversList || (user.favoriteDriver ? [user.favoriteDriver] : []));
    const [notifications, setNotifications] = useState(user.notificationsEnabled ?? true);
    const [newTeamInput, setNewTeamInput] = useState('');
    const [newDriverInput, setNewDriverInput] = useState('');
    const [savedNotice, setSavedNotice] = useState(false);

    const handleSave = async () => {
        const updated = await updateUserFavorites({
            favoriteSeries,
            favoriteTeamsList: teams,
            favoriteDriversList: drivers,
            notificationsEnabled: notifications
        });
        if (updated) {
            onUserUpdated(updated);
            setSavedNotice(true);
            setTimeout(() => setSavedNotice(false), 2000);
        }
    };

    const handleAddTeam = () => {
        if (!newTeamInput.trim()) return;
        if (!teams.includes(newTeamInput.trim())) {
            setTeams([...teams, newTeamInput.trim()]);
        }
        setNewTeamInput('');
    };

    const handleRemoveTeam = (teamName: string) => {
        setTeams(teams.filter(t => t !== teamName));
    };

    const handleAddDriver = () => {
        if (!newDriverInput.trim()) return;
        if (!drivers.includes(newDriverInput.trim())) {
            setDrivers([...drivers, newDriverInput.trim()]);
        }
        setNewDriverInput('');
    };

    const handleRemoveDriver = (driverName: string) => {
        setDrivers(drivers.filter(d => d !== driverName));
    };

    const handleLogoutClick = async () => {
        await userLogout();
        onLogout();
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
            <div 
                className="relative w-full max-w-lg bg-dark-900 border border-white/15 rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header Graphic Accent */}
                <div className="h-1.5 w-full bg-gradient-to-r from-brand-red via-brand-brightGreen to-orange-500" />

                {/* Top User Bar */}
                <div className="p-6 border-b border-white/10 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-brand-red to-orange-600 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-brand-red/30">
                            {user.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <h3 className="text-lg font-bold text-white">{user.name}</h3>
                                <span className="px-2 py-0.5 rounded-full bg-brand-brightGreen/20 text-brand-brightGreen border border-brand-brightGreen/40 text-[10px] font-bold">
                                    Paddock Member
                                </span>
                            </div>
                            <p className="text-xs text-gray-400">{user.email}</p>
                        </div>
                    </div>

                    <button 
                        onClick={onClose}
                        className="p-2 text-gray-400 hover:text-white rounded-full hover:bg-white/10 transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Body Content */}
                <div className="p-6 space-y-6 overflow-y-auto">
                    {/* Preferred Championship */}
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                            البطولة الرئيسية المفضلة / Primary Series
                        </label>
                        <select
                            value={favoriteSeries}
                            onChange={(e) => setFavoriteSeries(e.target.value)}
                            className="w-full bg-dark-800 border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-brand-red"
                        >
                            <option value="Formula 1">Formula 1 (F1)</option>
                            <option value="MotoGP">MotoGP World Championship</option>
                            <option value="WEC">FIA World Endurance Championship (WEC)</option>
                            <option value="IMSA">IMSA WeatherTech SportsCar</option>
                            <option value="GT World Challenge">Fanatec GT World Challenge</option>
                        </select>
                    </div>

                    {/* Favorite Teams */}
                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <label className="text-xs font-bold uppercase tracking-wider text-gray-400 flex items-center gap-1.5">
                                <Heart className="w-3.5 h-3.5 text-brand-red" />
                                <span>الفرق المفضلة / Favorite Teams</span>
                            </label>
                            <span className="text-[11px] text-gray-500">{teams.length} فرق مختارة</span>
                        </div>

                        <div className="flex flex-wrap gap-2 mb-3">
                            {teams.map((t) => (
                                <span 
                                    key={t}
                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 border border-white/15 text-xs text-white font-medium"
                                >
                                    <span>{t}</span>
                                    <button 
                                        onClick={() => handleRemoveTeam(t)}
                                        className="text-gray-400 hover:text-red-400"
                                    >
                                        <X className="w-3 h-3" />
                                    </button>
                                </span>
                            ))}
                        </div>

                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={newTeamInput}
                                onChange={(e) => setNewTeamInput(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTeam())}
                                placeholder="إضافة فريق (مثال: Scuderia Ferrari, Ducati, Porsche Penske)"
                                className="flex-1 bg-dark-800 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-brand-red"
                            />
                            <button
                                type="button"
                                onClick={handleAddTeam}
                                className="px-3 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold flex items-center gap-1"
                            >
                                <Plus className="w-3.5 h-3.5" />
                                <span>إضافة</span>
                            </button>
                        </div>
                    </div>

                    {/* Favorite Drivers */}
                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <label className="text-xs font-bold uppercase tracking-wider text-gray-400 flex items-center gap-1.5">
                                <Trophy className="w-3.5 h-3.5 text-yellow-500" />
                                <span>السائقين المفضلين / Favorite Drivers</span>
                            </label>
                            <span className="text-[11px] text-gray-500">{drivers.length} سائقين مختارين</span>
                        </div>

                        <div className="flex flex-wrap gap-2 mb-3">
                            {drivers.map((d) => (
                                <span 
                                    key={d}
                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 border border-white/15 text-xs text-white font-medium"
                                >
                                    <span>{d}</span>
                                    <button 
                                        onClick={() => handleRemoveDriver(d)}
                                        className="text-gray-400 hover:text-red-400"
                                    >
                                        <X className="w-3 h-3" />
                                    </button>
                                </span>
                            ))}
                        </div>

                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={newDriverInput}
                                onChange={(e) => setNewDriverInput(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddDriver())}
                                placeholder="إضافة سائق (مثال: Lewis Hamilton, Marc Marquez, Charles Leclerc)"
                                className="flex-1 bg-dark-800 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-brand-red"
                            />
                            <button
                                type="button"
                                onClick={handleAddDriver}
                                className="px-3 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold flex items-center gap-1"
                            >
                                <Plus className="w-3.5 h-3.5" />
                                <span>إضافة</span>
                            </button>
                        </div>
                    </div>

                    {/* Notifications Toggle */}
                    <div className="p-4 bg-dark-800 rounded-2xl border border-white/10 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="p-2 rounded-xl bg-blue-500/20 text-blue-400">
                                <Bell className="w-4 h-4" />
                            </div>
                            <div>
                                <h4 className="text-xs font-bold text-white">إشعارات السباقات الحية</h4>
                                <p className="text-[11px] text-gray-400">تلقي تنبيهات بداية الحصص والنتائج المباشرة</p>
                            </div>
                        </div>

                        <button
                            type="button"
                            onClick={() => setNotifications(!notifications)}
                            className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors ${
                                notifications ? 'bg-brand-brightGreen justify-end' : 'bg-gray-700 justify-start'
                            }`}
                        >
                            <div className="w-4 h-4 rounded-full bg-dark-900 shadow-md transform transition-transform" />
                        </button>
                    </div>
                </div>

                {/* Footer Controls */}
                <div className="p-6 border-t border-white/10 bg-dark-850 flex items-center justify-between">
                    <button
                        onClick={handleLogoutClick}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-red-950/60 hover:bg-red-900 border border-red-500/30 text-red-300 text-xs font-bold transition-colors"
                    >
                        <LogOut className="w-4 h-4" />
                        <span>تسجيل الخروج</span>
                    </button>

                    <div className="flex items-center gap-3">
                        {savedNotice && (
                            <span className="text-xs text-brand-brightGreen font-semibold flex items-center gap-1">
                                <Check className="w-3.5 h-3.5" />
                                <span>تم الحفظ!</span>
                            </span>
                        )}
                        <button
                            onClick={handleSave}
                            className="px-5 py-2 rounded-xl bg-brand-red hover:bg-red-600 text-white font-bold text-xs tracking-wide shadow-md shadow-brand-red/30 transition-all"
                        >
                            حفظ التفضيلات
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfileModal;
