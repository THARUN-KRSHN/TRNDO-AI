"use client";
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { HighlightText } from './LandingUtils';

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
        <div className="relative min-h-screen flex flex-col items-center justify-center pt-40 pb-20 px-4 bg-white overflow-hidden">
            {/* Background elements */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-0 w-96 h-96 bg-[#FF9F1C]/10 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2" />
                <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#4895EF]/10 rounded-full blur-[120px] translate-x-1/3 translate-y-1/3" />
            </div>

            <div className="relative z-10 text-center max-w-5xl mx-auto flex flex-col items-center">
                {/* Brand Logo Above Heading */}


                <h1 className="text-6xl md:text-[7rem] font-bold-extended tracking-[-0.05em] text-black leading-[0.9] mb-12 uppercase italic max-w-5xl">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        Read the <br /> <HighlightText color="bg-[#F72585]">Pulse.</HighlightText> beat the <br /> <HighlightText color="bg-[#4895EF]">Trend.</HighlightText>
                    </motion.div>
                </h1>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 1 }}
                    className="text-xl md:text-2xl text-black font-thin-extended mb-16 max-w-2xl leading-relaxed italic opacity-60"
                >
                    Effortlessly scout local trends, manage WhatsApp orders, and predict inventory drops—automated for your shop floor.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1, type: "spring" }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-6"
                >
                    <Link href="/signup" className="w-full sm:w-auto px-16 py-6 rounded-full bg-black text-white font-bold-extended text-lg hover:bg-[#FF9F1C] hover:text-black hover:scale-105 transition-all shadow-2xl shadow-black/10 uppercase italic flex items-center justify-center">
                        Get Started
                    </Link>
                    <Link href="/demo" className="w-full sm:w-auto px-16 py-6 rounded-full bg-white text-black border-2 border-black font-bold-extended text-lg hover:bg-black hover:text-white transition-all uppercase italic flex items-center justify-center">
                        Try Demo
                    </Link>
                </motion.div>
            </div>
        </div>
    );
};
