"use client";
import React from 'react';
import { motion } from 'framer-motion';

export const InteractiveMarquee = ({ text, color, direction = 'left' }: { text: string; color: string; direction?: 'left' | 'right' }) => {
    return (
        <div className={`py-4 ${color} overflow-hidden whitespace-nowrap border-y-2 border-black flex items-center`}>
            <motion.div
                animate={{ x: direction === 'left' ? [0, -1000] : [-1000, 0] }}
                transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
                className="flex items-center gap-8"
            >
                {[...Array(10)].map((_, i) => (
                    <span key={i} className="text-2xl md:text-4xl font-bold-extended uppercase italic tracking-tighter text-black">
                        {text} •
                    </span>
                ))}
            </motion.div>
        </div>
    );
};

export const FloatingText = ({ text, className = "" }: { text: string; className?: string }) => {
    return (
        <motion.div
            initial={{ y: 0 }}
            animate={{ y: [-10, 10, -10] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className={`text-6xl md:text-9xl font-bold-extended uppercase italic tracking-tighter opacity-10 select-none pointer-events-none absolute ${className}`}
        >
            {text}
        </motion.div>
    );
};

export const HighlightText = ({ children, color }: { children: React.ReactNode; color: string }) => (
    <span className={`px-4 py-1 rounded-full ${color} text-white inline-block mx-1 shadow-lg transform -rotate-1`}>
        {children}
    </span>
);
