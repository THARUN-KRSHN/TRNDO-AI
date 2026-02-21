"use client";
import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Clock, MessageSquare, TrendingDown, Search } from 'lucide-react';

const ScrollTypingText = ({ text, className }: { text: string; className?: string }) => {
    const words = text.split(" ");
    return (
        <span className={className}>
            {words.map((word, i) => (
                <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                    className="inline-block mr-[0.2em]"
                >
                    {word}
                </motion.span>
            ))}
        </span>
    );
};

const ProblemStep = ({
    id,
    title,
    desc,
    tagline,
    align = 'left',
    Visual,
    colorClass
}: {
    id: string;
    title: string;
    desc: string;
    tagline: string;
    align?: 'left' | 'right';
    Visual: React.ReactNode;
    colorClass: string;
}) => {
    return (
        <div className={`flex flex-col md:flex-row min-h-[70vh] items-center gap-12 md:gap-24 py-16 ${align === 'right' ? 'md:flex-row-reverse' : ''}`}>
            {/* Text Side */}
            <motion.div
                initial={{ opacity: 0, x: align === 'left' ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className="flex-1 space-y-6"
            >
                <span className={`text-8xl font-bold-extended block mb-4 italic opacity-10 ${colorClass}`}>{id}</span>
                <span className={`text-sm font-bold-extended uppercase tracking-[0.3em] italic block ${colorClass}`}>{tagline}</span>
                <h3 className="text-4xl md:text-6xl font-bold-extended uppercase italic leading-tight tracking-tighter">{title}</h3>
                <p className="text-xl md:text-2xl text-black/40 font-thin-extended italic leading-relaxed max-w-xl">{desc}</p>
            </motion.div>

            {/* Visual Side */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className="flex-1 w-full max-w-md"
            >
                <div className={`relative aspect-square flex items-center justify-center p-8 rounded-[4rem] bg-[#F8F8F8] border border-black/5 shadow-inner`}>
                    {Visual}
                </div>
            </motion.div>
        </div>
    );
};

export const ProblemSection = () => {
    const problems = [
        {
            id: "01",
            title: "The Late-Mover Penalty",
            tagline: "Trend Void",
            desc: "Small-town retailers miss high-profit windows because they see trends 2–7 days too late.",
            colorClass: "text-[#F72585]",
            align: 'left' as const,
            visual: (
                <div className="relative w-full h-full flex items-center justify-center">
                    <motion.div
                        animate={{ scale: [1, 1.5, 1], opacity: [0.1, 0.4, 0.1] }}
                        transition={{ duration: 3, repeat: Infinity }}
                        className="absolute inset-0 bg-[#F72585]/20 rounded-full"
                    />
                    <motion.div
                        animate={{ scale: [1, 1.3, 1] }}
                        transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                        className="w-32 h-32 rounded-3xl bg-black flex items-center justify-center relative z-10 shadow-2xl"
                    >
                        <Search className="w-12 h-12 text-[#FF9F1C]" />
                    </motion.div>
                </div>
            )
        },
        {
            id: "02",
            title: "The CRM Wall",
            tagline: "Language Gap",
            desc: "Owners revert to messy chats or notebooks. TRNDO AI speaks your local code-switched language.",
            colorClass: "text-[#4895EF]",
            align: 'right' as const,
            visual: (
                <div className="w-full space-y-4">
                    <motion.div
                        animate={{ x: [0, 10, 0] }}
                        transition={{ duration: 4, repeat: Infinity }}
                        className="p-8 bg-black rounded-[3rem] shadow-xl relative z-10"
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-2xl bg-[#4895EF] flex items-center justify-center">
                                <MessageSquare className="w-5 h-5 text-white" />
                            </div>
                            <div className="space-y-2 flex-1">
                                <div className="h-2 w-full bg-white/20 rounded-full" />
                                <div className="h-2 w-3/4 bg-white/10 rounded-full" />
                            </div>
                        </div>
                    </motion.div>
                </div>
            )
        },
        {
            id: "03",
            title: "The Bullwhip Trap",
            tagline: "Exit Void",
            desc: "Over-investing exactly when interest drops nearby. Capital locked in dead stock.",
            colorClass: "text-[#FF9F1C]",
            align: 'left' as const,
            visual: (
                <div className="w-full h-full flex items-center justify-center">
                    <div className="w-full h-full bg-white rounded-[3rem] p-8 border border-black/5 relative overflow-hidden">
                        <div className="flex justify-between items-end h-full gap-4">
                            <motion.div animate={{ height: '80%' }} className="w-4 bg-[#FF9F1C]/20 rounded-t-lg" />
                            <motion.div animate={{ height: '60%' }} className="w-4 bg-[#FF9F1C]/40 rounded-t-lg" />
                            <motion.div animate={{ height: '90%' }} className="w-4 bg-[#FF9F1C]/60 rounded-t-lg" />
                            <motion.div animate={{ height: '20%' }} className="w-4 bg-[#F72585] rounded-t-lg animate-pulse" />
                        </div>
                    </div>
                </div>
            )
        }
    ];

    return (
        <section className="py-24 px-8 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <div className="mb-32">
                    <h2 className="text-6xl md:text-9xl font-bold-extended tracking-tighter mb-8 uppercase italic leading-[0.8]">
                        <ScrollTypingText text="Core" />
                        <br />
                        <ScrollTypingText text="Frictions." className="text-black/20" />
                    </h2>
                    <p className="text-xl md:text-2xl text-black/40 font-thin-extended max-w-2xl italic leading-relaxed">Specific timing and linguistic gaps of the small-town economy solved.</p>
                </div>

                <div className="space-y-40">
                    {problems.map((p, i) => (
                        <ProblemStep
                            key={i}
                            id={p.id}
                            title={p.title}
                            tagline={p.tagline}
                            desc={p.desc}
                            align={p.align}
                            Visual={p.visual}
                            colorClass={p.colorClass}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};
