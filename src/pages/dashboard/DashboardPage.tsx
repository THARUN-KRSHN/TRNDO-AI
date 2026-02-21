"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Bell, Search, Settings, User } from 'lucide-react';
import { useDashboardStore } from '@/store/useDashboardStore';
import { BrandLogo, LiveIndicator } from './components/Common';
import { TrendCard } from './components/TrendCard';
import { OrderTimeline } from './components/OrderTimeline';
import { CreativeDrawer } from './components/CreativeDrawer';
import { InvoicePanel } from './components/InvoicePanel';

export const DashboardPage = () => {
    const trends = useDashboardStore((state: any) => state.trends);

    return (
        <main className="min-h-screen bg-[#F8F8F8] text-[#0A0A0A] selection:bg-yellow-200">
            <CreativeDrawer />
            <InvoicePanel />

            {/* Header Bar */}
            <nav className="fixed top-0 left-0 right-0 h-24 bg-white/80 backdrop-blur-md border-b border-black/5 z-30 px-8 flex items-center justify-between">
                <div className="flex items-center gap-12">
                    <BrandLogo />
                    <div className="hidden lg:flex items-center gap-6 pl-12 border-l border-black/5 transition-all">
                        <LiveIndicator />
                        <div className="flex flex-col">
                            <span className="text-[10px] font-bold-extended uppercase text-black italic">Irinjalakuda Hub</span>
                            <span className="text-[8px] font-thin-extended uppercase tracking-widest text-black/40">Anchor: Thrissur (21km)</span>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-8">
                    <div className="hidden md:flex items-center gap-4 px-6 py-3 rounded-full bg-gray-50 border border-black/5">
                        <Search size={14} className="text-black/20" />
                        <input
                            type="text"
                            placeholder="Filter Trends..."
                            className="bg-transparent border-none focus:ring-0 text-[10px] font-bold-extended uppercase italic tracking-widest w-40 placeholder:text-black/10"
                        />
                    </div>
                    <div className="flex items-center gap-4">
                        <button className="p-3 rounded-xl hover:bg-gray-50 transition-colors relative">
                            <Bell size={18} />
                            <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-yellow-400 border-2 border-white" />
                        </button>
                        <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center text-white cursor-pointer hover:scale-105 transition-all">
                            <User size={18} />
                        </div>
                    </div>
                </div>
            </nav>

            <div className="pt-32 pb-12 px-8 max-w-[120rem] mx-auto grid grid-cols-12 gap-8 items-start">
                {/* Left: Live Order Feed (4 columns) */}
                <section className="col-span-12 lg:col-span-4 lg:sticky lg:top-32 h-[calc(100vh-160px)]">
                    <OrderTimeline />
                </section>

                {/* Center: Pulse Dashboard (5 columns) */}
                <section className="col-span-12 lg:col-span-5 space-y-12">
                    <div>
                        <div className="flex justify-between items-end mb-8">
                            <div>
                                <span className="text-[10px] font-bold-extended uppercase tracking-widest text-yellow-500 italic mb-2 block">Real-Time Intelligence</span>
                                <h1 className="text-5xl md:text-7xl font-bold-extended uppercase italic leading-[0.85] tracking-tighter">Pulse<br />Dashboard.</h1>
                            </div>
                            <div className="text-right pb-2">
                                <span className="text-[10px] font-bold-extended uppercase tracking-widest text-black/20 block italic">Active Scouts</span>
                                <span className="text-2xl font-bold-extended italic">12</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 capitalize">
                            {trends.map((trend: any) => (
                                <TrendCard key={trend.id} trend={trend} />
                            ))}

                            {/* Stats Card */}
                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                className="p-8 rounded-3xl bg-black text-white flex flex-col justify-between"
                            >
                                <div>
                                    <span className="text-[10px] font-bold-extended uppercase tracking-widest text-white/30 block mb-4 italic">Efficiency</span>
                                    <div className="text-4xl font-bold-extended italic">+24%</div>
                                </div>
                                <div className="flex items-center justify-between text-yellow-400">
                                    <span className="text-[10px] font-bold-extended uppercase italic">Inventory Yield</span>
                                    <Activity size={20} className="animate-pulse" />
                                </div>
                            </motion.div>
                        </div>
                    </div>

                    {/* Market DNA Meta-Section */}
                    <div className="p-12 rounded-[3.5rem] bg-gradient-to-br from-purple-50 to-blue-50 border border-black/5 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-200/20 rounded-full blur-[100px]" />
                        <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
                            <div className="flex-1">
                                <h2 className="text-3xl font-bold-extended uppercase italic tracking-tighter mb-4 leading-tight">Your market DNA is evolving.</h2>
                                <p className="text-sm font-thin-extended italic text-black/50 leading-relaxed mb-8">
                                    Irinjalakuda consumers are shifting from 'Mainstream Sweets' to 'Artisan Bakery' spikes. Your local velocity is outpacing the Thrissur anchor by 12%.
                                </p>
                                <button className="px-8 py-3 rounded-full bg-white text-black font-bold-extended text-[10px] uppercase italic tracking-widest border border-black/5 hover:bg-black hover:text-white transition-all">
                                    Deep Dive Analysis
                                </button>
                            </div>
                            <div className="w-full md:w-1/3 p-6 rounded-3xl bg-white shadow-xl shadow-black/5 flex flex-col items-center">
                                <div className="w-16 h-1 w-full bg-gray-100 rounded-full overflow-hidden mb-4">
                                    <motion.div
                                        animate={{ width: ["20%", "80%", "20%"] }}
                                        transition={{ duration: 4, repeat: Infinity }}
                                        className="h-full bg-purple-500"
                                    />
                                </div>
                                <span className="text-[8px] font-bold-extended uppercase text-black/30">Niche Shift Alpha</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Right: Summary/Utility Panel (3 columns) */}
                <section className="col-span-12 lg:col-span-3 space-y-8">
                    <div className="p-8 rounded-3xl bg-white border border-black/5 shadow-2xl shadow-black/5">
                        <h4 className="text-xs font-bold-extended uppercase italic tracking-widest mb-6 border-b border-black/5 pb-4">Revenue Guard</h4>
                        <div className="space-y-6">
                            <div>
                                <span className="text-[10px] font-thin-extended uppercase tracking-widest text-black/40 block mb-2">Today's Forecast</span>
                                <div className="text-2xl font-bold-extended text-black italic">₹12,450</div>
                            </div>
                            <div>
                                <span className="text-[10px] font-thin-extended uppercase tracking-widest text-black/40 block mb-2">Saved from Lag</span>
                                <div className="text-2xl font-bold-extended text-emerald-500 italic">₹4,200</div>
                            </div>
                            <div className="pt-4">
                                <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-50 text-emerald-600">
                                    <Settings size={12} />
                                    <span className="text-[8px] font-bold-extended uppercase tracking-widest italic">Inventory Optimized</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="p-8 rounded-3xl bg-emerald-500 text-white relative overflow-hidden cursor-pointer group hover:scale-[1.02] transition-all">
                        <div className="relative z-10">
                            <span className="text-[10px] font-bold-extended uppercase italic mb-4 block">New Prediction</span>
                            <h4 className="text-xl font-bold-extended uppercase italic leading-tight mb-8">Heavy spike in <br /> "K-Coffee" <br /> detected.</h4>
                            <div className="flex items-center gap-3">
                                <span className="text-xs font-bold-extended italic underline">Review Data</span>
                                <div className="w-6 h-6 rounded-lg bg-white/20 flex items-center justify-center group-hover:translate-x-1 transition-transform">
                                    <span className="text-xs">→</span>
                                </div>
                            </div>
                        </div>
                        <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-white/10 rounded-full blur-3xl" />
                    </div>
                </section>
            </div>
        </main>
    );
};

const Activity = ({ size, className }: { size: number, className?: string }) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
    </svg>
);
