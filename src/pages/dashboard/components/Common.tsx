"use client";
import React from 'react';
import { motion } from 'framer-motion';

export const BrandLogo = () => {
    return (
        <div className="flex items-center gap-2">
            <span className="text-xl font-bold-extended tracking-tighter text-black uppercase italic scale-x-110 origin-left">
                trnd
            </span>
            <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [1, 0.8, 1] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                className="w-6 h-6 rounded-lg bg-yellow-400 flex items-center justify-center shadow-lg shadow-yellow-400/20"
            >
                <span className="text-white text-xs font-bold-extended italic">O</span>
            </motion.div>
            <span className="text-xs font-thin-extended tracking-widest text-black/30 uppercase ml-2">
                AI Intelligence
            </span>
        </div>
    );
};

export const LiveIndicator = () => (
    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-100">
        <motion.div
            animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-2 h-2 rounded-full bg-emerald-500"
        />
        <span className="text-[10px] font-bold-extended uppercase tracking-widest text-emerald-600">Live Sync</span>
    </div>
);

export const StatusBadge = ({ type, label }: { type: 'rising' | 'saturated' | 'fading' | 'success', label: string }) => {
    const styles = {
        rising: 'bg-emerald-50 text-emerald-600 border-emerald-100',
        saturated: 'bg-yellow-50 text-yellow-600 border-yellow-100',
        fading: 'bg-red-50 text-red-600 border-red-100',
        success: 'bg-emerald-500 text-white border-emerald-600'
    };
    return (
        <span className={`px-3 py-1 rounded-full border text-[8px] font-bold-extended uppercase tracking-widest italic ${styles[type]}`}>
            {label}
        </span>
    );
};

export const ProgressBar = ({ progress }: { progress: number }) => (
    <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
        <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            className={`h-full ${progress === 100 ? 'bg-emerald-500' : 'bg-black'}`}
        />
    </div>
);

export const GlowButton = ({ children, onClick, variant = 'primary' }: { children: React.ReactNode, onClick?: () => void, variant?: 'primary' | 'secondary' }) => (
    <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onClick}
        className={`px-6 py-3 rounded-full font-bold-extended uppercase italic text-xs tracking-widest transition-all ${variant === 'primary'
                ? 'bg-yellow-400 text-black shadow-lg shadow-yellow-400/20 hover:bg-yellow-300'
                : 'bg-black text-white shadow-lg shadow-black/10'
            }`}
    >
        {children}
    </motion.button>
);
