"use client";
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutDashboard, Store, Package, Eye, LogOut, MessageSquare, Globe, Home } from 'lucide-react';
import { useDashboardStore, DashboardTab } from '@/store/useDashboardStore';

const menuItems = [
    { id: 'overview' as DashboardTab, label: 'Pulse', icon: Home, mobileLabel: 'Home' },
    { id: 'orders' as DashboardTab, label: 'Order Locker', icon: MessageSquare, mobileLabel: 'CRM' },
    { id: 'trends' as DashboardTab, label: 'Matrix', icon: Globe, mobileLabel: 'Space' },
    { id: 'settings' as DashboardTab, label: 'My Store', icon: Store, mobileLabel: 'Store' },
];

export const Sidebar = () => {
    const activeTab = useDashboardStore((state: any) => state.activeTab);
    const setActiveTab = useDashboardStore((state: any) => state.setActiveTab);
    const user = useDashboardStore((state: any) => state.user);
    const logout = useDashboardStore((state: any) => state.logout);

    return (
        <>
            {/* Desktop Sidebar */}
            <aside className="hidden lg:flex flex-col w-[300px] h-screen bg-white border-r border-black/5 sticky top-0 left-0 p-8">
                {/* Profile Header */}
                <div className="flex items-center gap-4 mb-16">
                    <div className="w-12 h-12 rounded-2xl bg-yellow-400 flex items-center justify-center text-black font-bold-extended italic shadow-lg shadow-yellow-400/20">
                        <Store size={24} />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold-extended uppercase italic tracking-tighter leading-none">{user?.businessName || 'Your Shop'}</h3>
                        <span className="text-[10px] font-thin-extended uppercase tracking-widest text-black/30">{user?.name?.toLowerCase().replace(' ', '.') || 'owner'}.trndo.ai</span>
                    </div>
                </div>

                {/* Navigation Menu */}
                <nav className="flex-1 space-y-3">
                    {menuItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            className={`w-full flex items-center justify-between px-6 py-5 rounded-3xl transition-all group ${activeTab === item.id ? 'bg-black text-white shadow-2xl shadow-black/20' : 'text-black/40 hover:bg-gray-50'}`}
                        >
                            <div className="flex items-center gap-4 font-bold-extended uppercase italic text-[11px] tracking-widest">
                                <item.icon size={18} className={activeTab === item.id ? 'text-white' : 'text-black/20 group-hover:text-black'} />
                                {item.label}
                            </div>
                        </button>
                    ))}
                </nav>

                {/* Footer Actions */}
                <div className="space-y-4 pt-8 border-t border-black/5">
                    <button className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl bg-[#F8F8F8] text-black font-bold-extended uppercase italic text-xs tracking-widest hover:bg-blue-50 hover:text-blue-600 transition-all">
                        <Eye size={18} />
                        Visit Store
                    </button>
                    <button onClick={logout} className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-black/40 font-bold-extended uppercase italic text-xs tracking-widest hover:bg-red-50 hover:text-red-500 transition-all group">
                        <LogOut size={18} className="group-hover:text-red-400" />
                        Logout
                    </button>
                </div>
            </aside>

            {/* Mobile Bottom Navigation - Pill Design */}
            <div className="lg:hidden fixed bottom-8 left-1/2 -translate-x-1/2 z-50 px-6 w-full max-w-[440px]">
                <div className="bg-white/80 backdrop-blur-2xl rounded-[3rem] p-2 shadow-2xl shadow-black/10 border border-black/5 flex items-center justify-between gap-1">
                    <AnimatePresence mode="popLayout" initial={false}>
                        {menuItems.map((item) => {
                            const isActive = activeTab === item.id;
                            return (
                                <button
                                    key={item.id}
                                    onClick={() => setActiveTab(item.id)}
                                    className={`relative flex items-center transition-all duration-500 ease-out h-14 ${isActive
                                            ? 'bg-black text-white rounded-full px-8 flex-grow shadow-lg shadow-black/20'
                                            : 'w-14 justify-center text-black/40 hover:text-black hover:bg-black/5 rounded-full'
                                        }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <item.icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                                        {isActive && (
                                            <motion.span
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                className="text-xs font-bold-extended uppercase tracking-wider"
                                            >
                                                {item.mobileLabel}
                                            </motion.span>
                                        )}
                                    </div>
                                </button>
                            );
                        })}
                    </AnimatePresence>
                </div>
            </div>
        </>
    );
};
