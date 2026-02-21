"use client";
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const TypewriterText = ({ text, delay = 0, speed = 0.03 }: { text: string; delay?: number; speed?: number }) => {
    const characters = Array.from(text);

    const container = {
        hidden: { opacity: 0 },
        visible: (i = 1) => ({
            opacity: 1,
            transition: { staggerChildren: speed, delayChildren: delay }
        })
    };

    const child = {
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring" as const,
                damping: 12,
                stiffness: 200
            }
        },
        hidden: {
            opacity: 0,
            y: 20,
            transition: {
                type: "spring" as const,
                damping: 12,
                stiffness: 200
            }
        }
    };

    return (
        <motion.span
            style={{ overflow: 'hidden', display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}
            variants={container}
            initial="hidden"
            animate="visible"
        >
            {characters.map((char, index) => (
                <motion.span key={index} variants={child} style={{ display: 'inline-block' }}>
                    {char === " " ? "\u00A0" : char}
                </motion.span>
            ))}
        </motion.span>
    );
};

export const Hero = () => {
    return (
        <div className="relative min-h-screen flex flex-col items-center justify-center pt-40 pb-20 px-4 bg-yellow-200 overflow-hidden">
            {/* Background decor like in the Antigravity image */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] aspect-square bg-[#F8F8F8] rounded-full blur-[120px] opacity-50" />
            </div>

            <div className="relative z-10 text-center max-w-5xl mx-auto flex flex-col items-center">
                {/* Brand Logo Above Heading */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 mb-12"
                >
                    <div className="w-8 h-8 rounded-lg bg-black flex items-center justify-center">
                        <span className="text-white text-xs font-bold-extended italic">O</span>
                    </div>
                    <span className="text-sm font-bold-extended uppercase tracking-[0.3em] text-black italic">TRNDO AI</span>
                </motion.div>

                <h1 className="text-6xl md:text-[5.5rem] font-bold-extended tracking-[ -0.05em] text-black leading-[1] mb-12 uppercase italic max-w-4xl">
                    <TypewriterText text="Be First to the Trend." delay={0.2} />
                    <TypewriterText text="Be Faster to the Sale." delay={1.2} />
                </h1>

                <div className="text-xl md:text-2xl text-black/50 font-thin-extended mb-16 max-w-3xl leading-relaxed italic">
                    <TypewriterText text="Effortlessly scout local trends, manage WhatsApp orders, and predict inventory drops—automated for your shop floor." delay={2.5} speed={0.01} />
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 4 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-6"
                >
                    <Link href="/signup" className="w-full sm:w-auto px-12 py-5 rounded-full bg-black text-white font-bold-extended text-lg hover:scale-105 transition-all shadow-2xl shadow-black/20 uppercase italic flex items-center justify-center">
                        Get Started
                    </Link>
                    <Link href="/demo" className="w-full sm:w-auto px-12 py-5 rounded-full bg-white text-black border border-black/10 font-bold-extended text-lg hover:bg-gray-50 transition-all uppercase italic flex items-center justify-center">
                        Try Demo
                    </Link>
                </motion.div>
            </div>
        </div>
    );
};
