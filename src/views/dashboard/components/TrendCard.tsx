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

    const getColor = (value: number) => {
        // 0 is red (0), 120 is green
        const hue = (value / 100) * 120;
        return `hsl(${hue}, 80%, 50%)`;
    };

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

                <div className="mt-8 flex flex-col items-center">
                    <div className="relative w-48 h-24 overflow-hidden">
                        <svg viewBox="0 0 100 50" className="w-full h-full">
                            {/* Background track */}
                            <path
                                d="M 10 45 A 35 35 0 0 1 90 45"
                                fill="none"
                                stroke="#f3f4f6"
                                strokeWidth="8"
                                strokeLinecap="round"
                                strokeDasharray="2, 2"
                            />
                            {/* Active Gauge */}
                            <motion.path
                                d="M 10 45 A 35 35 0 0 1 90 45"
                                fill="none"
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: trend.anchorVelocity / 100 }}
                                transition={{ duration: 1.5, ease: "easeOut" }}
                                stroke={getColor(trend.anchorVelocity)}
                                strokeWidth="8"
                                strokeLinecap="round"
                                strokeDasharray="2, 2"
                            />
                        </svg>
                        <div className="absolute bottom-0 left-0 right-0 flex flex-col items-center justify-end h-full pb-1">
                            <span className="text-3xl font-bold-extended italic leading-none">{trend.anchorVelocity}</span>
                            <span className="text-[8px] font-bold-extended uppercase tracking-[0.2em] opacity-40">Velocity %</span>
                        </div>
                    </div>
                </div>

                <div className="mt-8 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="flex items-center gap-2 text-purple-600">
                        <Sparkles size={14} className={trend.id.startsWith('api-') ? "animate-pulse" : ""} />
                        <span className="text-[10px] font-bold-extended uppercase italic">
                            {trend.id.startsWith('api-') ? "Real-time Insight" : "Create AI Ads"}
                        </span>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center">
                        <span className="text-xs">→</span>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};
