"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Activity, Sparkles } from 'lucide-react';
import { Trend, useDashboardStore } from '@/store/useDashboardStore';
import { StatusBadge } from './Common';

export const TrendCard = ({ trend }: { trend: Trend }) => {
    const setSelectedTrend = useDashboardStore((state: any) => state.setSelectedTrend);

    const config = {
        rising: {
            icon: TrendingUp,
            color: 'text-emerald-500',
            bgGlow: 'bg-emerald-400/20',
            label: 'Action Window Open'
        },
        saturated: {
            icon: Activity,
            color: 'text-yellow-500',
            bgGlow: 'bg-yellow-400/20',
            label: 'Maintain Presence'
        },
        fading: {
            icon: TrendingDown,
            color: 'text-red-500',
            bgGlow: 'bg-red-400/20',
            label: 'Exit Strategy'
        }
    };

    const { icon: Icon, color, bgGlow, label } = config[trend.state];

    return (
        <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 200, damping: 12 }}
            onClick={() => setSelectedTrend(trend)}
            className="relative group cursor-pointer p-8 rounded-3xl bg-white shadow-2xl shadow-black/5 border border-black/5 overflow-hidden"
        >
            {/* Ambient Glow */}
            <div className={`absolute -top-20 -right-20 w-40 h-40 rounded-full blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${bgGlow}`} />

            <div className="relative z-10">
                <div className="flex justify-between items-start mb-6">
                    <div className={`p-3 rounded-2xl bg-gray-50 ${color}`}>
                        <Icon size={20} />
                    </div>
                    <StatusBadge type={trend.state} label={label} />
                </div>

                <h3 className="text-2xl font-bold-extended uppercase italic tracking-tighter mb-2 scale-x-105 origin-left">
                    {trend.keyword}
                </h3>

                <div className="flex flex-col gap-4 mt-8">
                    <div className="flex justify-between items-end">
                        <span className="text-[10px] font-thin-extended uppercase tracking-widest text-black/40">Anchor Velocity</span>
                        <span className="text-sm font-bold-extended italic">{trend.anchorVelocity}%</span>
                    </div>
                    <div className="h-1 w-full bg-gray-100 rounded-full overflow-hidden">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${trend.anchorVelocity}%` }}
                            className={`h-full ${color.replace('text', 'bg')}`}
                        />
                    </div>

                    <div className="flex justify-between items-end">
                        <span className="text-[10px] font-thin-extended uppercase tracking-widest text-black/40">Local Pulse</span>
                        <span className="text-sm font-bold-extended italic">{trend.localVelocity}%</span>
                    </div>
                    <div className="h-1 w-full bg-gray-100 rounded-full overflow-hidden">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${trend.localVelocity}%` }}
                            className="h-full bg-black/10"
                        />
                    </div>
                </div>

                <div className="mt-8 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="flex items-center gap-2 text-purple-600">
                        <Sparkles size={14} />
                        <span className="text-[10px] font-bold-extended uppercase italic">Create AI Ads</span>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center">
                        <span className="text-xs">→</span>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};
