"use client";
import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Clock, MessageSquare, TrendingDown, ShieldAlert, Zap, Search } from 'lucide-react';

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
    Visual
}: {
    id: string;
    title: string;
    desc: string;
    tagline: string;
    align?: 'left' | 'right';
    Visual: React.ReactNode
}) => {
    return (
        <div className={`flex flex-col md:flex-row min-h-[80vh] items-center gap-12 md:gap-24 py-20 ${align === 'right' ? 'md:flex-row-reverse' : ''}`}>
            {/* Text Side */}
            <motion.div
                initial={{ opacity: 0, x: align === 'left' ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className="flex-1 space-y-6"
            >
                <span className="text-8xl font-bold-extended text-black/5 block mb-4 italic">{id}</span>
                <span className="text-sm font-bold-extended uppercase tracking-[0.3em] text-yellow-600 italic block">{tagline}</span>
                <h3 className="text-4xl md:text-6xl font-bold-extended uppercase italic leading-tight tracking-tighter">{title}</h3>
                <p className="text-xl md:text-2xl text-gray-500 font-thin-extended italic leading-relaxed max-w-xl">{desc}</p>
            </motion.div>

            {/* Visual Side */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className="flex-1 w-full max-w-md"
            >
                <div className="relative aspect-square flex items-center justify-center p-8 rounded-[4rem] bg-[#F8F8F8] border border-black/5 shadow-inner">
                    {Visual}
                </div>
            </motion.div>
        </div>
    );
};

export const ProblemSection = () => {
    const sectionRef = useRef(null);
    const problems = [
        {
            id: "01",
            title: "The Late-Mover Penalty",
            tagline: "Trend Timing Void",
            desc: "Small-town retailers miss high-profit windows because they see trends 2–7 days too late.",
            solution: "Hyper-Local Propagation Scout. Monitors Urban Hubs like Kochi/Thrissur to detect spikes before they reach your town.",
            icon: Clock,
            color: "bg-red-50 text-red-600",
            align: 'left' as const,
            visual: (
                <div className="relative w-full h-full flex items-center justify-center">
                    <motion.div
                        animate={{ scale: [1, 1.5, 1], opacity: [0.1, 0.4, 0.1] }}
                        transition={{ duration: 3, repeat: Infinity }}
                        className="absolute inset-0 bg-yellow-400 rounded-full"
                    />
                    <motion.div
                        animate={{ scale: [1, 1.3, 1] }}
                        transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                        className="w-32 h-32 rounded-3xl bg-black flex items-center justify-center relative z-10 shadow-2xl"
                    >
                        <Search className="w-12 h-12 text-yellow-400" />
                    </motion.div>
                    <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-[10px] font-bold-extended uppercase italic border border-black/5 shadow-sm">Kochi Hub Spike</div>
                </div>
            )
        },
        {
            id: "02",
            title: "The CRM Wall",
            tagline: "Linguistic Barrier",
            desc: "Complex SaaS dashboards are intimidating. Owners revert to manual notebooks or messy, unorganized chats.",
            solution: "Multilingual WhatsApp Locker. Understands 'Code-switched' Malayalam + English. Zero interface—just chat.",
            icon: MessageSquare,
            color: "bg-blue-50 text-blue-600",
            align: 'right' as const,
            visual: (
                <div className="w-full space-y-4">
                    <div className="p-4 bg-white rounded-3xl border border-black/5 shadow-sm rotate-[-2deg]">
                        <p className="text-xs font-thin-extended text-gray-400 mb-2">Manual Ledger #42</p>
                        <div className="h-2 w-3/4 bg-gray-100 rounded-full" />
                        <div className="mt-2 h-2 w-1/2 bg-gray-100 rounded-full" />
                    </div>
                    <motion.div
                        animate={{ x: [0, 10, 0] }}
                        transition={{ duration: 4, repeat: Infinity }}
                        className="p-6 bg-black rounded-[2.5rem] shadow-xl relative z-10"
                    >
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
                                <MessageSquare className="w-4 h-4 text-white" />
                            </div>
                            <div className="space-y-1">
                                <div className="h-2 w-20 bg-white/20 rounded-full" />
                                <div className="h-1.5 w-12 bg-white/10 rounded-full" />
                            </div>
                        </div>
                    </motion.div>
                </div>
            )
        },
        {
            id: "03",
            title: "The Bullwhip Trap",
            tagline: "Inventory Fatigue",
            desc: "Shops over-invest exactly when a trend starts to 'die' 20km away, locking capital in dead stock.",
            solution: "Regional Exit Signals. Suggests clear-out sales when interest drops by 30% in nearby regions like Thrissur.",
            icon: TrendingDown,
            color: "bg-yellow-50 text-yellow-600",
            align: 'left' as const,
            visual: (
                <div className="w-full h-full flex items-center justify-center p-8">
                    <div className="w-full h-full bg-white rounded-[3rem] p-8 border border-black/5 relative overflow-hidden">
                        <motion.div
                            animate={{ opacity: [0.3, 0.7, 0.3] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="absolute inset-0 bg-red-500/5"
                        />
                        <div className="flex justify-between items-end h-full gap-4">
                            <motion.div animate={{ height: '80%' }} className="w-4 bg-orange-100 rounded-t-lg" />
                            <motion.div animate={{ height: '60%' }} className="w-4 bg-orange-200 rounded-t-lg" />
                            <motion.div animate={{ height: '90%' }} className="w-4 bg-orange-400 rounded-t-lg" />
                            <motion.div animate={{ height: '30%' }} className="w-4 bg-red-500 rounded-t-lg animate-pulse" />
                        </div>
                        <div className="absolute top-6 left-6 text-[10px] font-bold-extended text-red-500 uppercase italic">Exit Signal!</div>
                    </div>
                </div>
            )
        }
    ];

    return (
        <section ref={sectionRef} className="py-24 px-8 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <div className="mb-32">
                    <h2 className="text-6xl md:text-9xl font-bold-extended tracking-tighter mb-8 uppercase italic leading-[0.8]">
                        <ScrollTypingText text="The Core" />
                        <br />
                        <ScrollTypingText text="Frictions." />
                    </h2>
                    <p className="text-xl md:text-2xl text-gray-400 font-thin-extended max-w-2xl italic leading-relaxed">We don't solve generic retail problems. We solve the specific timing and linguistic gaps of the small-town economy.</p>
                </div>

                {/* Scrolly narrative sections */}
                <div className="space-y-20">
                    {problems.map((p, i) => (
                        <ProblemStep
                            key={i}
                            id={p.id}
                            title={p.title}
                            tagline={p.tagline}
                            desc={p.desc}
                            align={p.align}
                            Visual={p.visual}
                        />
                    ))}
                </div>

                {/* Side-by-side finale */}

            </div>
        </section>
    );
};
