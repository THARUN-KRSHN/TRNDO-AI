"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, Search, Activity, Sparkles, BarChart3, Users, Zap, X, Info, ShoppingCart, TrendingUp, MapPin, Calendar } from 'lucide-react';
import { useDashboardStore } from '@/store/useDashboardStore';
import { BrandLogo, LiveIndicator } from './components/Common';
import { TrendCard, TrendCardSkeleton } from './components/TrendCard';
import { OrderTimeline } from './components/OrderTimeline';
import { CreativeDrawer } from './components/CreativeDrawer';
import { InvoicePanel } from './components/InvoicePanel';
import { Sidebar } from './components/Sidebar';
import { ProfileView } from './components/ProfileView';

import { useRouter } from 'next/navigation';

export const DashboardPage = () => {
    const router = useRouter();
    const trends = useDashboardStore((state: any) => state.trends);
    const activeTab = useDashboardStore((state: any) => state.activeTab);
    const user = useDashboardStore((state: any) => state.user);
    const fetchTrends = useDashboardStore((state: any) => state.fetchTrends);
    const isSyncingTrends = useDashboardStore((state: any) => state.isSyncingTrends);
    const [isNotificationOpen, setNotificationOpen] = useState(false);
    const [isHydrated, setIsHydrated] = useState(false);

    const addNotification = useDashboardStore((state: any) => state.addNotification);
    const notifications = useDashboardStore((state: any) => state.notifications);

    React.useEffect(() => {
        setIsHydrated(true);
        if (isHydrated) {
            if (!user && typeof window !== 'undefined') {
                router.push('/login');
            } else if (user) {
                fetchTrends();
                // Add welcome notification if none exist
                if (notifications.length === 0) {
                    addNotification({
                        title: 'Welcome to TRNDO AI',
                        message: `Welcome back, ${user.name}! Your local market is pulsing with 14 new scouts. Check the trends to start generating today.`,
                        type: 'info'
                    });
                }
            }
        }
    }, [user, router, isHydrated, fetchTrends]);

    if (!isHydrated) return null;
    if (!user) return null;

    const renderContent = () => {
        switch (activeTab) {
            case 'overview':
                return <OverviewContent trends={trends} isSyncing={isSyncingTrends} />;
            case 'orders':
                return (
                    <div className="h-[calc(100vh-160px)] grid grid-cols-12 gap-8">
                        <section className="col-span-12 lg:col-span-12 bg-white rounded-[3rem] p-10 border border-black/5 shadow-2xl shadow-black/5 overflow-hidden flex flex-col">
                            <OrderTimeline />
                        </section>
                    </div>
                );
            case 'trends':
                return <TrendsContent trends={trends} onRefresh={(filters) => fetchTrends(filters)} isSyncing={isSyncingTrends} />;
            case 'settings':
                return <ProfileView />;
            default:
                return <OverviewContent trends={trends} isSyncing={isSyncingTrends} />;
        }
    };

    return (
        <div className="flex min-h-screen bg-[#F8F8F8]">
            <Sidebar />

            <main className="flex-1 min-h-screen selection:bg-yellow-200 relative">
                <CreativeDrawer />
                <InvoicePanel />

                <NotificationPanel
                    isOpen={isNotificationOpen}
                    onClose={() => setNotificationOpen(false)}
                />

                {/* Header Bar */}
                <nav className="fixed top-0 left-0 lg:left-[300px] right-0 h-24 bg-white/80 backdrop-blur-md border-b border-black/5 z-30 px-8 flex items-center justify-between">
                    <div className="flex items-center gap-12">
                        <div className="lg:hidden"><BrandLogo /></div>
                        <div className="hidden lg:flex items-center gap-6 transition-all">
                            <LiveIndicator />
                            <div className="flex flex-col">
                                <span className="text-[10px] font-bold-extended uppercase text-black italic">{user.location} Hub</span>
                                <span className="text-[8px] font-thin-extended uppercase tracking-widest text-black/40">Anchor: Thrissur (21km)</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-8">
                        <div className="hidden md:flex items-center gap-4 px-6 py-3 rounded-xl bg-gray-50 transition-all border-none focus-within:bg-white focus-within:shadow-lg">
                            <Search size={14} className="text-black/20" />
                            <input
                                type="text"
                                placeholder="Filter Data..."
                                className="bg-transparent border-none focus:ring-0 outline-none text-[13px] font-bold-extended uppercase italic tracking-widest w-40 placeholder:text-black/10"
                            />
                        </div>
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => setNotificationOpen(true)}
                                className="p-3 rounded-xl hover:bg-gray-50 transition-colors relative"
                            >
                                <Bell size={18} />
                                <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-yellow-400 border-2 border-white" />
                            </button>
                        </div>
                    </div>
                </nav>

                <div className="pt-32 pb-40 lg:pb-12 px-8 max-w-[120rem] mx-auto">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                        >
                            {renderContent()}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </main>
        </div>
    );
};

const NotificationPanel = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
    const notifications = useDashboardStore((state: any) => state.notifications);
    const addNotification = useDashboardStore((state: any) => state.addNotification);
    const clearNotifications = useDashboardStore((state: any) => state.clearNotifications);
    const setSelectedTrend = useDashboardStore((state: any) => state.setSelectedTrend);

    const getIcon = (type: string) => {
        switch (type) {
            case 'trend': return TrendingUp;
            case 'order': return ShoppingCart;
            case 'invoice': return Sparkles;
            default: return Info;
        }
    };

    const getColor = (type: string) => {
        switch (type) {
            case 'trend': return 'text-emerald-500 bg-emerald-50';
            case 'order': return 'text-blue-500 bg-blue-50';
            case 'invoice': return 'text-yellow-500 bg-yellow-50';
            default: return 'text-purple-500 bg-purple-50';
        }
    };

    const handleNotificationClick = (n: any) => {
        if (n.type === 'trend' && n.data) {
            setSelectedTrend(n.data);
            onClose();
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/10 backdrop-blur-sm z-[60]"
                    />
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        className="fixed top-0 right-0 h-screen w-full md:w-[400px] bg-white z-[70] shadow-2xl p-8 border-l border-black/5"
                    >
                        <div className="flex justify-between items-center mb-12">
                            <h2 className="text-3xl font-bold-extended uppercase italic tracking-tighter leading-none">Scout<br />Signals.</h2>
                            <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                                <X size={20} />
                            </button>
                        </div>

                        <div className="space-y-4">
                            {notifications.length > 0 ? (
                                notifications.map((n: any) => {
                                    const Icon = getIcon(n.type);
                                    return (
                                        <div
                                            key={n.id}
                                            onClick={() => handleNotificationClick(n)}
                                            className="p-6 rounded-3xl bg-[#F8F8F8] border border-black/5 hover:bg-white hover:shadow-xl hover:shadow-black/5 transition-all cursor-pointer group"
                                        >
                                            <div className="flex gap-4">
                                                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${getColor(n.type)}`}>
                                                    <Icon size={20} />
                                                </div>
                                                <div className="flex-1">
                                                    <div className="flex justify-between items-start mb-1">
                                                        <h4 className="text-xs font-bold-extended uppercase italic tracking-wider">{n.title}</h4>
                                                        <span className="text-[8px] font-bold-extended uppercase tracking-widest text-black/20">{n.time}</span>
                                                    </div>
                                                    <p className="text-[10px] font-thin-extended italic text-black/60 leading-relaxed uppercase">{n.message}</p>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })
                            ) : (
                                <div className="text-center py-20">
                                    <p className="text-[10px] font-bold-extended uppercase italic text-black/20">No signals detected yet</p>
                                </div>
                            )}
                        </div>

                        <div className="absolute bottom-8 left-8 right-8">
                            <button
                                onClick={clearNotifications}
                                className="w-full py-4 rounded-2xl bg-black text-white text-[10px] font-bold-extended uppercase tracking-widest italic shadow-xl shadow-black/20"
                            >
                                Clear All Signals
                            </button>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

const OverviewContent = ({ trends, isSyncing }: { trends: any[], isSyncing: boolean }) => {
    const isLoading = isSyncing || trends.length === 0;

    // Derived Data Calculations
    const avgVelocity = trends.length > 0
        ? (trends.reduce((acc, t) => acc + t.anchorVelocity, 0) / trends.length).toFixed(1)
        : "0";

    const sortedTrends = [...trends].sort((a, b) => b.anchorVelocity - a.anchorVelocity);
    const topTrend = sortedTrends[0];
    const secondTrend = sortedTrends[1];

    const totalSouls = trends.length * 142 + 420; // Simulated reach based on trend volume
    const peakGrowth = (Math.max(...trends.map(t => t.anchorVelocity)) / 2).toFixed(1);

    return (
        <div className="space-y-12">
            <header className="flex justify-between items-end mb-8">
                <div>
                    <span className="text-[10px] font-bold-extended uppercase tracking-widest text-yellow-500 italic mb-2 block">Intelligence Summary</span>
                    <h1 className="text-5xl md:text-7xl font-bold-extended uppercase italic leading-[0.85] tracking-tighter">Pulse<br />Dashboard.</h1>
                </div>
                <div className="text-right pb-2 hidden md:block">
                    <span className="text-[10px] font-bold-extended uppercase tracking-widest text-black/20 block italic">Global Rank</span>
                    {isLoading ? (
                        <div className="h-10 w-20 bg-gray-200 animate-pulse rounded-lg ml-auto mt-2" />
                    ) : (
                        <span className="text-4xl font-bold-extended italic">#{Math.floor(100 - parseFloat(avgVelocity)) || 14}</span>
                    )}
                </div>
            </header>

            <div className="grid grid-cols-12 gap-8">
                {/* Main Stats */}
                <div className="col-span-12 lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Performance Card */}
                    <div className="p-10 rounded-[3rem] bg-black text-white flex flex-col justify-between h-80 lg:h-auto">
                        <div>
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 rounded-xl bg-white/10">
                                    <Activity size={20} className="text-yellow-400" />
                                </div>
                                <span className="text-[10px] font-bold-extended uppercase tracking-widest text-white/40 italic">Market Velocity</span>
                            </div>
                            {isLoading ? (
                                <div className="space-y-4">
                                    <div className="h-16 w-3/4 bg-white/10 animate-pulse rounded-2xl" />
                                    <div className="h-4 w-1/2 bg-white/10 animate-pulse rounded-full" />
                                </div>
                            ) : (
                                <>
                                    <div className="text-6xl font-bold-extended italic mb-2 tracking-tighter">{avgVelocity}%</div>
                                    <p className="text-[10px] font-bold-extended uppercase tracking-widest text-emerald-400 italic">↑ {((parseFloat(avgVelocity) / 10)).toFixed(1)}% vs baseline</p>
                                </>
                            )}
                        </div>
                        <div className="pt-8 border-t border-white/10">
                            <div className="flex justify-between items-center text-[8px] font-bold-extended uppercase tracking-widest text-white/30">
                                <span>Projected Impact</span>
                                {isLoading ? (
                                    <div className="h-3 w-20 bg-white/10 animate-pulse rounded-full" />
                                ) : (
                                    <span>+{peakGrowth}k Engagement / day</span>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* AI Insight Card */}
                    <div className="p-10 rounded-[3rem] bg-white border border-black/5 shadow-2xl shadow-black/5 flex flex-col justify-between h-80 lg:h-auto">
                        <div>
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 rounded-xl bg-purple-100">
                                    <Sparkles size={20} className="text-purple-600" />
                                </div>
                                <span className="text-[10px] font-bold-extended uppercase tracking-widest text-black/40 italic">AI Prediction</span>
                            </div>
                            {isLoading ? (
                                <div className="space-y-3">
                                    <div className="h-8 w-full bg-gray-100 animate-pulse rounded-lg" />
                                    <div className="h-8 w-3/4 bg-gray-100 animate-pulse rounded-lg" />
                                    <div className="h-8 w-1/2 bg-gray-100 animate-pulse rounded-lg" />
                                </div>
                            ) : (
                                <h3 className="text-2xl font-bold-extended uppercase italic tracking-tighter leading-tight mb-4">
                                    Heavy spike in <br /> "{topTrend?.keyword}" <br /> detected.
                                </h3>
                            )}
                        </div>
                        <button
                            onClick={() => topTrend && useDashboardStore.getState().setSelectedTrend(topTrend)}
                            className="flex items-center gap-3 group text-black w-fit"
                        >
                            <span className="text-[10px] font-bold-extended uppercase italic underline">Apply Strategy</span>
                            <div className="w-6 h-6 rounded-lg bg-black text-white flex items-center justify-center group-hover:translate-x-1 transition-transform">
                                <span className="text-xs">→</span>
                            </div>
                        </button>
                    </div>

                    {/* Trends Preview */}
                    <div className="col-span-1 md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                        {isLoading ? (
                            <>
                                <TrendCardSkeleton />
                                <TrendCardSkeleton />
                            </>
                        ) : (
                            sortedTrends.slice(0, 2).map((trend: any) => (
                                <TrendCard key={trend.id} trend={trend} />
                            ))
                        )}
                    </div>
                </div>

                {/* Sidebar Stats */}
                <div className="col-span-12 lg:col-span-4 space-y-6">
                    <div className="p-8 rounded-[2.5rem] bg-white border border-black/5 shadow-xl shadow-black/5">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="p-3 rounded-2xl bg-blue-50 text-blue-600">
                                <Users size={20} />
                            </div>
                            <div>
                                <span className="text-[10px] font-bold-extended uppercase tracking-widest text-black/40 italic">Market Awareness</span>
                                {isLoading ? (
                                    <div className="h-6 w-32 bg-gray-100 animate-pulse rounded-lg mt-1" />
                                ) : (
                                    <h4 className="text-xl font-bold-extended uppercase italic tracking-tighter">{totalSouls.toLocaleString()} Souls</h4>
                                )}
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div className="flex justify-between text-[8px] font-bold-extended uppercase tracking-widest text-black/40">
                                <span>Pulse Density</span>
                                {isLoading ? (
                                    <div className="h-3 w-24 bg-gray-100 animate-pulse rounded-full" />
                                ) : (
                                    <span className="text-black">High Connectivity</span>
                                )}
                            </div>
                            <div className="h-1.5 w-full bg-gray-50 rounded-full overflow-hidden">
                                <div className={`h-full bg-blue-500 rounded-full transition-all duration-1000 ${isLoading ? 'w-0' : 'w-[80%]'}`} style={{ width: `${avgVelocity}%` }} />
                            </div>
                        </div>
                    </div>

                    <div className="p-8 rounded-[2.5rem] bg-emerald-50 border border-emerald-100">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="p-3 rounded-2xl bg-white text-emerald-600 shadow-sm">
                                <Zap size={20} />
                            </div>
                            <h4 className="text-lg font-bold-extended uppercase italic tracking-tighter text-emerald-950">Active Scout Pulse</h4>
                        </div>
                        {isLoading ? (
                            <div className="space-y-2">
                                <div className="h-3 w-full bg-emerald-100 animate-pulse rounded-full" />
                                <div className="h-3 w-5/6 bg-emerald-100 animate-pulse rounded-full" />
                            </div>
                        ) : (
                            <p className="text-[10px] font-bold-extended uppercase tracking-widest text-emerald-900/40 italic leading-relaxed">
                                {useDashboardStore.getState().user?.location} Hub is currently syncing data from {trends.length * 4} local scouts.
                            </p>
                        )}
                    </div>

                    <div className="p-8 rounded-[2.5rem] bg-indigo-600 text-white relative overflow-hidden group cursor-pointer">
                        <h4 className="text-xl font-bold-extended uppercase italic tracking-tighter leading-tight relative z-10">Market DNA is evolving.</h4>
                        {isLoading ? (
                            <div className="space-y-2 mt-4 mb-6 relative z-10">
                                <div className="h-3 w-full bg-white/10 animate-pulse rounded-full" />
                                <div className="h-3 w-4/5 bg-white/10 animate-pulse rounded-full" />
                            </div>
                        ) : (
                            <p className="text-[10px] font-thin-extended italic text-white/50 mt-4 mb-6 relative z-10 leading-relaxed">
                                Your top trend "{topTrend?.keyword}" is outpacing local baseline by {(topTrend?.anchorVelocity - parseFloat(avgVelocity)).toFixed(1)}%. Shift focus to premium artisan goods.
                            </p>
                        )}
                        <BarChart3 className="absolute -bottom-4 -right-4 w-24 h-24 text-white/5 group-hover:scale-110 transition-transform" />
                    </div>
                </div>
            </div>
        </div>
    );
};

const TIMEFRAMES = [
    "now 1-H", "now 4-H", "now 1-d", "now 7-d", "today 1-m", "today 3-m", "today 12-m", "today 5-y", "all"
];

const LOCATIONS = [
    { label: "Gloabl", value: "" },
    { label: "United States", value: "US" },
    { label: "United Kingdom", value: "GB" },
    { label: "India", value: "IN" },
    { label: "Australia", value: "AU" },
    { label: "Canada", value: "CA" },
    { label: "Germany", value: "DE" },
    { label: "France", value: "FR" },
    { label: "UAE", value: "AE" },
    { label: "Singapore", value: "SG" },
    { label: "Pakistan", value: "PK" },
    { label: "Kerala", value: "IN-KL" },
    { label: "Maharashtra", value: "IN-MH" },
    { label: "Tamil Nadu", value: "IN-TN" },
    { label: "Karnataka", value: "IN-KA" },
    { label: "Delhi", value: "IN-DL" },
    { label: "Gujarat", value: "IN-GJ" },
    { label: "West Bengal", value: "IN-WB" },
    { label: "Rajasthan", value: "IN-RJ" },
    { label: "Uttar Pradesh", value: "IN-UP" },
    { label: "Andhra Pradesh", value: "IN-AP" },
    { label: "Telangana", value: "IN-TS" },
    { label: "Punjab", value: "IN-PB" },
    { label: "Haryana", value: "IN-HR" },
    { label: "Odisha", value: "IN-OR" },
    { label: "Assam", value: "IN-AS" }
];

const TrendsContent = ({ trends, onRefresh, isSyncing }: { trends: any[], onRefresh: (filters: { occasion: string, location: string, timeframe: string }) => void, isSyncing: boolean }) => {
    const [customOccasion, setCustomOccasion] = useState("");
    const [location, setLocation] = useState("IN-KL");
    const [timeframe, setTimeframe] = useState("now 7-d");

    const handleSync = () => {
        onRefresh({
            occasion: customOccasion,
            location,
            timeframe
        });
    };

    return (
        <div className="space-y-12">
            <header className="flex flex-col xl:flex-row justify-between items-start xl:items-end gap-8">
                <div>
                    <span className="text-[10px] font-bold-extended uppercase tracking-widest text-yellow-500 italic mb-2 block">Market Pulse</span>
                    <h1 className="text-5xl md:text-7xl font-bold-extended uppercase italic leading-[0.85] tracking-tighter">Trend<br />Matrix.</h1>
                </div>

                <div className="flex-1 w-full flex flex-col gap-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="lg:col-span-2 relative group">
                            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-purple-400/20 rounded-2xl blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-500" />
                            <div className="relative flex items-center gap-4 px-8 py-5 rounded-xl bg-gray-50 transition-all duration-300 group-focus-within:bg-white group-focus-within:shadow-xl shadow-black/5">
                                <Search size={18} className="text-black/20 group-focus-within:text-black transition-colors" />
                                <input
                                    type="text"
                                    value={customOccasion}
                                    onChange={(e) => setCustomOccasion(e.target.value)}
                                    placeholder="Describe occasion..."
                                    className="bg-transparent border-none focus:ring-0 outline-none text-[13px] font-bold-extended uppercase italic tracking-widest w-full placeholder:text-black/10 text-black p-0"
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') handleSync();
                                    }}
                                />
                            </div>
                        </div>

                        <div className="relative">
                            <select
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                className="w-full h-full px-6 py-4 rounded-2xl bg-white border-none shadow-xl shadow-black/5 text-[13px] font-bold-extended uppercase italic tracking-widest focus:ring-0 outline-none appearance-none cursor-pointer"
                            >
                                {LOCATIONS.map(loc => (
                                    <option key={loc.value} value={loc.value}>{loc.label}</option>
                                ))}
                            </select>
                            <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-black/20">
                                <MapPin size={14} />
                            </div>
                        </div>

                        <div className="relative">
                            <select
                                value={timeframe}
                                onChange={(e) => setTimeframe(e.target.value)}
                                className="w-full h-full px-6 py-4 rounded-2xl bg-white border-none shadow-xl shadow-black/5 text-[13px] font-bold-extended uppercase italic tracking-widest focus:ring-0 outline-none appearance-none cursor-pointer"
                            >
                                {TIMEFRAMES.map(tf => (
                                    <option key={tf} value={tf}>{tf}</option>
                                ))}
                            </select>
                            <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-black/20">
                                <Calendar size={14} />
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={handleSync}
                        disabled={isSyncing}
                        className="w-full md:w-fit self-end p-4 px-12 rounded-2xl bg-black text-white hover:scale-103 active:scale-97 transition-all disabled:opacity-50 flex items-center justify-center gap-3 shadow-xl shadow-black/20"
                    >
                        <Zap size={16} className={isSyncing ? "animate-pulse" : ""} />
                        <span className="text-[10px] font-bold-extended uppercase italic tracking-widest whitespace-nowrap">
                            {isSyncing ? "Syncing Market..." : "Initialize Pulse"}
                        </span>
                    </button>
                </div>
            </header>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {isSyncing || trends.length === 0 ? (
                    Array.from({ length: 6 }).map((_, i) => (
                        <TrendCardSkeleton key={i} />
                    ))
                ) : (
                    [...trends]
                        .sort((a, b) => b.anchorVelocity - a.anchorVelocity)
                        .map((trend: any) => (
                            <TrendCard key={trend.id} trend={trend} />
                        ))
                )}
            </div>
        </div>
    );
};
