"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    MessageSquare,
    Zap,
    FileText,
    Bell,
    Send,
    CheckCircle2,
    Radar,
    MapPin,
    TrendingUp,
    ShieldAlert,
    Sparkles,
    RefreshCcw,
    ChevronRight,
    ArrowLeft,
    Globe
} from 'lucide-react';
import Link from 'next/link';

type DemoPart = 1 | 2;

export const DemoPage = () => {
    const [activePart, setActivePart] = useState<DemoPart>(1);
    const [activeStep, setActiveStep] = useState(0);

    const part1Steps = [
        {
            number: "01",
            title: "Informal Inquiry",
            desc: "A customer reaches out with casual intent on WhatsApp.",
            mobileContent: {
                type: 'chat',
                messages: [
                    { from: 'User', text: "Hi, is the Peri-Peri Mandhi available today?", time: "2:00 PM" }
                ],
                tag: "Flagged: Active Intent"
            }
        },
        {
            number: "02",
            title: "Contextual Engagement",
            desc: "Owner engages naturally. TRNDO AI listens in the background.",
            mobileContent: {
                type: 'chat',
                messages: [
                    { from: 'User', text: "Hi, is the Peri-Peri Mandhi available today?", time: "2:00 PM" },
                    { from: 'Me', text: "Yes! Freshly made. How many portions?", time: "2:01 PM" },
                    { from: 'User', text: "Cool, I need 2 full portions. My name is Rahul.", time: "2:02 PM" }
                ]
            }
        },
        {
            number: "03",
            title: "Logic Trigger",
            desc: "A 'Closing Keyword' like 'Done' triggers the NLP engine.",
            mobileContent: {
                type: 'chat',
                messages: [
                    { from: 'User', text: "Cool, I need 2 full portions. My name is Rahul.", time: "2:02 PM" },
                    { from: 'Me', text: "Perfect. Order Placed.", time: "2:03 PM" }
                ],
                overlay: {
                    icon: Zap,
                    text: "Gemini Engine Triggered",
                    color: "bg-yellow-400"
                }
            }
        },
        {
            number: "04",
            title: "Structured Extraction",
            desc: "AI parses the chat into structured transaction data.",
            mobileContent: {
                type: 'json',
                data: {
                    product: "Peri-Peri Mandhi",
                    quantity: 2,
                    customer: "Rahul",
                    total: "₹900",
                    status: "Drafted"
                }
            }
        },
        {
            number: "05",
            title: "The 'Draft Ready' Nudge",
            desc: "The shop owner receives a dashboard notification instantly.",
            mobileContent: {
                type: 'notification',
                title: "Invoice #8842 Ready",
                subtitle: "Draft for Rahul is ready to send.",
                icon: Bell
            }
        },
        {
            number: "06",
            title: "Finalization & Delivery",
            desc: "Preview the PDF with a dynamic UPI QR and forward to chat.",
            mobileContent: {
                type: 'invoice',
                customer: "Rahul",
                items: [{ name: "Peri-Peri Mandhi", qty: 2, price: 900 }],
                qr: true
            }
        }
    ];

    const part2Steps = [
        {
            number: "01",
            title: "Onboarding Intel",
            desc: "Gemini generates a dynamic watchlist based on your category.",
            mobileContent: {
                type: 'list',
                title: "Category: F&B",
                items: ["Kunafa", "Korean Wings", "Blue Lime", "Peri-Peri"],
                status: "Monitoring Hubs"
            }
        },
        {
            number: "02",
            title: "Hub Monitoring",
            desc: "Tracking velocity spikes in your nearest urban anchor hub.",
            mobileContent: {
                type: 'map',
                hub: "Thrissur",
                target: "Irinjalakuda",
                velocity: "+40%"
            }
        },
        {
            number: "03",
            title: "Propagation Radar",
            desc: "Predicting the ripple effect in your town within 48-72 hours.",
            mobileContent: {
                type: 'radar',
                prediction: "Surge Expected",
                eta: "48H",
                confidence: "88%"
            }
        },
        {
            number: "04",
            title: "Opportunity Nudge",
            desc: "Sentiment-checked alert ensures the trend is positive.",
            mobileContent: {
                type: 'alert',
                title: "NEW TREND: KUNAFA",
                sentiment: "Positive (+92)",
                action: "Stock Up Now"
            }
        },
        {
            number: "05",
            title: "Growth Kit",
            desc: "AI provides scripts, hashtags, and local SEO keywords.",
            mobileContent: {
                type: 'growth',
                hashtags: ["#KunafaSpike", "#IJKFoodies"],
                script: "Try our fresh Kunafa! Best in town."
            }
        },
        {
            number: "06",
            title: "Weekly Refresh",
            desc: "Automatically discarding dead trends to keep inventory fresh.",
            mobileContent: {
                type: 'refresh',
                removed: ["Linen Shirts"],
                added: ["K-Coffee"],
                nextRefresh: "7 Days"
            }
        }
    ];

    const steps = activePart === 1 ? part1Steps : part2Steps;
    const currentStep = steps[activeStep];

    useEffect(() => {
        setActiveStep(0);
    }, [activePart]);

    const handleNext = () => {
        if (activeStep < steps.length - 1) {
            setActiveStep(s => s + 1);
        }
    };

    const handlePrev = () => {
        if (activeStep > 0) {
            setActiveStep(s => s - 1);
        }
    };

    const menuItems = [
        { id: 1 as DemoPart, label: 'Part 1', icon: MessageSquare, mobileLabel: 'WhatsApp' },
        { id: 2 as DemoPart, label: 'Part 2', icon: Radar, mobileLabel: 'Radar' },
    ];

    return (
        <main className="min-h-screen bg-[#F8F8F8] font-thin-extended flex flex-col relative overflow-hidden">
            {/* Header */}
            <nav className="h-16 md:h-20 px-6 md:px-12 flex justify-between items-center bg-white/80 backdrop-blur-md border-b border-black/5 shrink-0 z-50">
                <Link href="/" className="flex items-center gap-3 group">
                    <div className="p-2 rounded-xl bg-gray-100 group-hover:bg-black group-hover:text-white transition-all">
                        <ArrowLeft className="w-4 h-4" />
                    </div>
                    <span className="hidden sm:inline text-xs font-bold-extended uppercase italic tracking-tighter">Exit Demo</span>
                </Link>
                <div className="flex items-center gap-2">
                    <span className="text-xl font-bold-extended tracking-tighter text-black uppercase italic">TRNDO AI</span>
                </div>
                <div className="hidden md:flex items-center gap-2">
                    <span className="text-[10px] font-bold-extended uppercase tracking-widest text-emerald-500 italic">● Demo Active</span>
                </div>
            </nav>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto no-scrollbar pb-32 pt-8 md:pt-0">
                <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-center">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20 items-center w-full max-w-5xl">

                        {/* Step Content: Top on Mobile, Right on Desktop */}
                        <div className="space-y-6 md:space-y-8 text-center lg:text-left order-1 lg:order-2">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={`${activePart}-${activeStep}`}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="space-y-4 md:space-y-6"
                                >
                                    <div className="flex items-center justify-center lg:justify-start gap-4">
                                        <span className={`text-5xl md:text-8xl font-bold-extended italic leading-none ${activePart === 1 ? 'text-[#4895EF]/10' : 'text-[#F72585]/10'}`}>
                                            {currentStep.number}
                                        </span>
                                        <div className={`h-px flex-1 ${activePart === 1 ? 'bg-[#4895EF]/20' : 'bg-[#F72585]/20'} hidden md:block`} />
                                    </div>
                                    <h2 className="text-3xl md:text-5xl font-bold-extended uppercase italic tracking-tighter leading-[0.9]">{currentStep.title}</h2>
                                    <p className="text-base md:text-xl text-black/50 italic leading-relaxed max-w-lg mx-auto lg:mx-0">
                                        {currentStep.desc}
                                    </p>
                                </motion.div>
                            </AnimatePresence>

                            <div className="flex items-center justify-center lg:justify-start gap-4 md:gap-6">
                                <button
                                    onClick={handlePrev}
                                    disabled={activeStep === 0}
                                    className={`p-4 rounded-2xl border border-black/5 transition-all bg-white shadow-sm ${activeStep === 0 ? 'opacity-20 pointer-events-none' : 'hover:bg-gray-100 hover:scale-105 active:scale-95'}`}
                                >
                                    <ArrowLeft size={18} />
                                </button>
                                <button
                                    onClick={handleNext}
                                    className={`flex-1 max-w-[240px] h-14 rounded-2xl flex items-center justify-center gap-3 font-bold-extended uppercase italic text-xs tracking-widest transition-all ${activePart === 1 ? 'bg-[#4895EF] text-white shadow-lg shadow-[#4895EF]/20' : 'bg-[#F72585] text-white shadow-lg shadow-[#F72585]/20'
                                        } hover:scale-105 active:scale-95`}
                                >
                                    {activeStep === steps.length - 1 ? 'Module End' : 'Play Scenario'}
                                    <ChevronRight size={14} />
                                </button>
                            </div>

                            {/* Progress Indicator */}
                            <div className="flex gap-2 justify-center lg:justify-start">
                                {steps.map((_, i) => (
                                    <div key={i} className={`h-1 !rounded-full transition-all duration-300 ${i === activeStep ? (activePart === 1 ? 'w-10 bg-[#4895EF]' : 'w-10 bg-[#F72585]') : 'w-3 bg-black/10'}`} />
                                ))}
                            </div>
                        </div>

                        {/* iPhone: Bottom on Mobile, Left on Desktop */}
                        <div className="flex justify-center order-2 lg:order-1 perspective-1000">
                            <motion.div
                                className="relative w-[280px] h-[580px] md:w-[320px] md:h-[640px] lg:w-[300px] lg:h-[600px] bg-black rounded-[3.5rem] p-3 shadow-2xl shadow-black/20 border-[8px] border-black overflow-hidden origin-center"
                                animate={{ rotateY: [0, 2, 0] }}
                                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                            >
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-black rounded-b-2xl z-20" />
                                <div className="w-full h-full bg-white rounded-[2.5rem] overflow-hidden flex flex-col pt-10">
                                    <AnimatePresence mode="wait">
                                        <motion.div
                                            key={`${activePart}-${activeStep}`}
                                            initial={{ opacity: 0, scale: 0.9, y: 10 }}
                                            animate={{ opacity: 1, scale: 1, y: 0 }}
                                            exit={{ opacity: 0, scale: 1.1, y: -10 }}
                                            className="h-full flex flex-col p-6 overflow-y-auto no-scrollbar"
                                        >
                                            <MobileDisplay content={currentStep.mobileContent} activePart={activePart} />
                                        </motion.div>
                                    </AnimatePresence>
                                </div>
                            </motion.div>
                        </div>

                    </div>
                </div>
            </div>

            {/* Bottom Navigation: Fixed Pill Design like Dashboard */}
            <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 px-6 w-full max-w-[480px]">
                <div className="bg-white/80 backdrop-blur-2xl rounded-[3rem] p-2 shadow-2xl shadow-black/10 border border-black/5 flex items-center justify-between gap-1">
                    <AnimatePresence mode="popLayout" initial={false}>
                        {menuItems.map((item) => {
                            const isActive = activePart === item.id;
                            const brandColor = item.id === 1 ? 'bg-[#4895EF]' : 'bg-[#F72585]';
                            const shadowColor = item.id === 1 ? 'shadow-[#4895EF]/30' : 'shadow-[#F72585]/30';

                            return (
                                <button
                                    key={item.id}
                                    onClick={() => setActivePart(item.id)}
                                    className={`relative flex items-center transition-all duration-500 ease-out h-14 ${isActive
                                        ? `${brandColor} text-white rounded-full px-8 flex-grow shadow-lg ${shadowColor} scale-105`
                                        : 'w-14 justify-center text-black/30 hover:text-black hover:bg-black/5 rounded-full'
                                        }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <item.icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                                        {isActive && (
                                            <motion.span
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                className="text-[10px] font-bold-extended uppercase tracking-[0.15em] italic"
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
        </main>
    );
};

const MobileDisplay = ({ content, activePart }: { content: any; activePart: number }) => {
    switch (content.type) {
        case 'chat':
            return (
                <div className="flex flex-col gap-4 relative h-full">
                    {content.messages.map((m: any, i: number) => (
                        <motion.div
                            key={i}
                            initial={{ x: m.from === 'Me' ? 20 : -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: i * 0.2 }}
                            className={`flex ${m.from === 'Me' ? 'justify-end' : 'justify-start'}`}
                        >
                            <div className={`max-w-[85%] p-4 rounded-[1.5rem] text-[11px] flex flex-col ${m.from === 'Me' ? 'bg-black text-white rounded-tr-none' : 'bg-gray-100 text-black rounded-tl-none'}`}>
                                <span className="italic leading-relaxed">{m.text}</span>
                                <span className="text-[8px] opacity-40 self-end mt-1">{m.time}</span>
                            </div>
                        </motion.div>
                    ))}
                    {content.tag && (
                        <div className="absolute top-0 right-0">
                            <span className="text-[8px] font-bold-extended uppercase tracking-widest bg-emerald-50 text-emerald-600 px-3 py-1.5 rounded-full border border-emerald-100 italic">
                                {content.tag}
                            </span>
                        </div>
                    )}
                    {content.overlay && (
                        <div className="absolute inset-0 flex items-center justify-center bg-white/40 backdrop-blur-sm rounded-3xl">
                            <motion.div
                                initial={{ scale: 0, rotate: -10 }}
                                animate={{ scale: 1, rotate: 0 }}
                                className="flex flex-col items-center gap-4"
                            >
                                <div className={`w-20 h-20 rounded-[2rem] ${content.overlay.color} flex items-center justify-center text-white shadow-2xl shadow-yellow-400/30`}>
                                    <content.overlay.icon size={40} className="animate-pulse" />
                                </div>
                                <span className="text-[10px] font-bold-extended uppercase italic tracking-[0.2em] text-black">
                                    {content.overlay.text}
                                </span>
                            </motion.div>
                        </div>
                    )}
                </div>
            );
        case 'json':
            return (
                <div className="bg-black rounded-3xl p-6 font-mono text-[10px] text-emerald-400 h-full overflow-hidden flex flex-col">
                    <div className="flex justify-between items-center mb-6 text-white/40 text-[8px] font-bold-extended uppercase tracking-widest">
                        <span>NLP Parser v1.5</span>
                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    </div>
                    <motion.pre
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="whitespace-pre-wrap leading-relaxed opacity-80 flex-1"
                    >
                        {`{
  "intent": "INVOICE",
  "customer": "${content.data.customer}",
  "product": "${content.data.product}",
  "quantity": ${content.data.quantity},
  "total": "${content.data.total}",
  "status": "${content.data.status}"
}`}
                    </motion.pre>
                    <div className="mt-8 pt-8 border-t border-white/10">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-white/20 italic block text-[8px] uppercase tracking-widest">Confidence</span>
                            <span className="text-emerald-500 font-bold">99.4%</span>
                        </div>
                        <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: '99%' }}
                                transition={{ duration: 1 }}
                                className="h-full bg-emerald-500 rounded-full"
                            />
                        </div>
                    </div>
                </div>
            );
        case 'notification':
            return (
                <div className="h-full flex items-center justify-center">
                    <motion.div
                        initial={{ y: 20, opacity: 0, scale: 0.9 }}
                        animate={{ y: 0, opacity: 1, scale: 1 }}
                        className="w-full bg-white border border-black/5 rounded-[2rem] p-6 shadow-2xl flex items-center gap-4 relative overflow-hidden"
                    >
                        <div className="w-12 h-12 rounded-2xl bg-[#4895EF] text-white flex items-center justify-center shadow-lg shadow-[#4895EF]/20">
                            <content.icon size={20} />
                        </div>
                        <div className="flex-1">
                            <h4 className="text-[11px] font-bold-extended uppercase italic tracking-tighter mb-1 text-black">{content.title}</h4>
                            <p className="text-[9px] font-thin-extended italic text-black/40 uppercase leading-none">{content.subtitle}</p>
                        </div>
                        <div className="absolute -right-4 -top-4 w-12 h-12 bg-[#4895EF]/5 rounded-full" />
                    </motion.div>
                </div>
            );
        case 'invoice':
            return (
                <div className="h-full flex flex-col bg-gray-50 rounded-[2.5rem] p-6 shadow-inner border border-black/5 relative overflow-hidden">
                    <div className="flex justify-between items-center mb-8 relative z-10">
                        <div className="flex flex-col">
                            <span className="text-[8px] text-black/20 uppercase font-bold-extended">Document</span>
                            <span className="text-[10px] font-bold-extended uppercase italic">Invoice #8842</span>
                        </div>
                        <div className="w-10 h-10 rounded-xl bg-black text-white flex items-center justify-center"><FileText size={18} /></div>
                    </div>

                    <div className="space-y-6 mb-auto relative z-10">
                        <div className="flex flex-col">
                            <span className="text-[8px] text-black/20 uppercase font-bold-extended mb-1">Bill To</span>
                            <span className="text-xs font-bold-extended italic uppercase text-black">{content.customer}</span>
                        </div>

                        <div className="pt-6 border-t border-black/5 space-y-4">
                            {content.items.map((it: any, i: number) => (
                                <div key={i} className="flex justify-between items-baseline">
                                    <div className="flex flex-col gap-0.5">
                                        <span className="text-[10px] italic uppercase text-black leading-none">{it.name}</span>
                                        <span className="text-[8px] text-black/30 font-bold-extended uppercase">Qty: {it.qty}</span>
                                    </div>
                                    <span className="text-[11px] font-bold-extended italic text-black">₹{it.price}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="mt-8 relative z-10 space-y-4">
                        <div className="flex justify-center">
                            <div className="w-24 h-24 bg-white rounded-2xl border border-black/5 p-4 relative group cursor-pointer">
                                <div className="p-2 border-2 border-dashed border-black/10 rounded-lg h-full flex flex-col items-center justify-center gap-1">
                                    <div className="grid grid-cols-2 gap-1 opacity-20">
                                        <div className="w-2 h-2 bg-black" /><div className="w-2 h-2 bg-black" />
                                        <div className="w-2 h-2 bg-black" /><div className="w-2 h-2 bg-black" />
                                    </div>
                                    <span className="text-[6px] font-bold-extended uppercase text-black/20">Digital QR</span>
                                </div>
                            </div>
                        </div>
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full py-4 rounded-xl bg-[#4895EF] text-white text-[9px] font-bold-extended uppercase italic tracking-wider flex items-center justify-center gap-3 shadow-lg shadow-[#4895EF]/20"
                        >
                            <Send size={12} /> Send to WhatsApp
                        </motion.button>
                    </div>

                    {/* Decor */}
                    <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-[#4895EF]/5 rounded-full" />
                </div>
            );
        case 'list':
            return (
                <div className="h-full flex flex-col space-y-6">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-8 h-8 rounded-xl bg-[#FF9F1C] flex items-center justify-center text-white shadow-lg shadow-[#FF9F1C]/20">
                            <Sparkles size={16} />
                        </div>
                        <h4 className="text-[11px] font-bold-extended uppercase italic tracking-tighter text-black">{content.title}</h4>
                    </div>
                    <div className="space-y-3">
                        {content.items.map((it: any, i: number) => (
                            <motion.div
                                key={i}
                                initial={{ x: -20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: i * 0.1 }}
                                className="p-4 rounded-2xl bg-white border border-black/5 flex items-center justify-between shadow-sm"
                            >
                                <span className="text-[10px] font-bold-extended uppercase italic text-black leading-none">{it}</span>
                                <div className="w-2 h-2 rounded-full bg-[#FF9F1C] animate-pulse" />
                            </motion.div>
                        ))}
                    </div>
                    <div className="mt-auto p-4 bg-black rounded-2xl text-[9px] font-bold-extended uppercase tracking-[0.3em] text-white/40 italic text-center">
                        {content.status}
                    </div>
                </div>
            );
        case 'map':
            return (
                <div className="h-full flex flex-col items-center justify-center space-y-10 relative overflow-hidden bg-white">
                    <div className="absolute inset-0 flex items-center justify-center opacity-[0.03]">
                        <Globe size={400} className="animate-spin-slow rotate-12" />
                    </div>
                    <div className="relative z-10 flex flex-col items-center gap-8 w-full px-4">
                        <div className="relative group">
                            <motion.div
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ repeat: Infinity, duration: 2 }}
                                className="absolute inset-0 bg-[#F72585]/20 rounded-full blur-xl"
                            />
                            <div className="relative w-20 h-20 rounded-[2.5rem] bg-white border border-black/5 flex items-center justify-center shadow-xl">
                                <MapPin className="text-[#F72585] fill-[#F72585]/10" size={40} />
                            </div>
                        </div>

                        <div className="text-center space-y-1">
                            <span className="text-[9px] font-bold-extended uppercase tracking-widest text-black/20 italic block">Hub Acceleration</span>
                            <span className="text-5xl font-bold-extended italic text-[#F72585] leading-none">{content.velocity}</span>
                        </div>

                        <div className="w-full space-y-3">
                            <div className="flex items-center justify-center gap-4 py-3 rounded-full bg-black text-white shadow-xl">
                                <span className="text-[10px] font-bold-extended uppercase italic tracking-widest">{content.hub}</span>
                                <div className="flex gap-1 opacity-20"><div className="w-1 h-1 rounded-full bg-white" /><div className="w-1 h-1 rounded-full bg-white" /><div className="w-1 h-1 rounded-full bg-white" /></div>
                                <span className="text-[10px] font-bold-extended uppercase italic tracking-widest">{content.target}</span>
                            </div>
                            <span className="text-[8px] font-bold-extended uppercase tracking-[0.4em] text-black/30 block text-center">Signal Lock: 0.4s</span>
                        </div>
                    </div>
                </div>
            );
        case 'radar':
            return (
                <div className="h-full flex flex-col items-center justify-center p-8 text-center bg-gray-50 rounded-[2.5rem] relative overflow-hidden">
                    <div className="relative mb-10 z-10">
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
                            className="w-32 h-32 border-2 border-dashed border-[#F72585]/30 rounded-full flex items-center justify-center"
                        >
                            <Radar className="text-[#F72585] fill-[#F72585]/10" size={48} />
                        </motion.div>
                        <motion.div
                            animate={{ scale: [1, 1.8, 1], opacity: [0.3, 0, 0.3] }}
                            transition={{ repeat: Infinity, duration: 2 }}
                            className="absolute inset-0 border border-[#F72585] rounded-full"
                        />
                    </div>
                    <div className="relative z-10 space-y-10 w-full">
                        <div className="space-y-2">
                            <h4 className="text-2xl font-bold-extended uppercase italic text-black tracking-tighter leading-none">{content.prediction}</h4>
                            <span className="text-[9px] font-bold-extended uppercase tracking-[0.2em] text-[#F72585] italic">Geographic Pulse Confirmed</span>
                        </div>

                        <div className="bg-white p-6 rounded-3xl border border-black/5 shadow-sm grid grid-cols-2 gap-4">
                            <div className="flex flex-col gap-1 items-start text-left">
                                <span className="text-[8px] text-black/20 uppercase font-bold-extended">ETA</span>
                                <span className="text-sm font-bold-extended italic text-black uppercase">{content.eta}</span>
                            </div>
                            <div className="flex flex-col gap-1 items-start text-left">
                                <span className="text-[8px] text-black/20 uppercase font-bold-extended">Accuracy</span>
                                <span className="text-sm font-bold-extended italic text-[#F72585] uppercase tracking-tighter">{content.confidence}</span>
                            </div>
                        </div>
                    </div>
                </div>
            );
        case 'alert':
            return (
                <div className="h-full flex flex-col items-center justify-center p-8 bg-black rounded-[2.5rem] relative overflow-hidden">
                    <div className="absolute inset-0 overflow-hidden">
                        <motion.div
                            animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
                            transition={{ duration: 4, repeat: Infinity }}
                            className="absolute -top-20 -right-20 w-64 h-64 bg-red-500 rounded-full blur-[80px]"
                        />
                    </div>

                    <div className="relative z-10 w-full flex flex-col items-center">
                        <div className="w-20 h-20 rounded-[2.5rem] bg-red-500 flex items-center justify-center text-white mb-10 shadow-2xl shadow-red-500/40">
                            <ShieldAlert size={40} className="animate-pulse" />
                        </div>

                        <h4 className="text-xl md:text-2xl font-bold-extended uppercase italic tracking-tighter leading-[0.85] mb-6 text-center text-white">
                            {content.title}
                        </h4>

                        <div className="flex items-center gap-3 bg-white/10 backdrop-blur-xl border border-white/20 px-6 py-2 rounded-full mb-10">
                            <TrendingUp size={14} className="text-emerald-400" />
                            <span className="text-[10px] font-bold-extended uppercase italic text-white tracking-widest">{content.sentiment}</span>
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="w-full py-5 rounded-2xl bg-white text-black text-[11px] font-bold-extended uppercase italic tracking-widest shadow-xl"
                        >
                            {content.action}
                        </motion.button>
                    </div>
                </div>
            );
        case 'growth':
            return (
                <div className="h-full flex flex-col space-y-10">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-2xl bg-purple-500 flex items-center justify-center text-white shadow-lg shadow-purple-500/20">
                            <Sparkles size={20} />
                        </div>
                        <h4 className="text-[11px] font-bold-extended uppercase italic tracking-tighter text-black">AI Launch Kit</h4>
                    </div>

                    <div className="space-y-8 flex-1">
                        <div className="space-y-3">
                            <span className="text-[9px] text-black/20 uppercase font-bold-extended tracking-widest">Local Script</span>
                            <div className="p-6 bg-gray-50 border border-black/5 rounded-[2rem] text-[11px] italic leading-relaxed text-black shadow-inner">
                                "{content.script}"
                            </div>
                        </div>

                        <div className="space-y-3">
                            <span className="text-[9px] text-black/20 uppercase font-bold-extended tracking-widest">Growth Signals</span>
                            <div className="flex flex-wrap gap-2">
                                {content.hashtags.map((tag: any, i: number) => (
                                    <span key={i} className="px-4 py-2 rounded-full bg-black text-white text-[9px] font-bold-extended uppercase italic tracking-widest">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    <button className="w-full py-5 rounded-2xl bg-black text-white text-[11px] font-bold-extended uppercase italic tracking-widest flex items-center justify-center gap-3 shadow-xl">
                        Copy Asset Package
                    </button>
                </div>
            );
        case 'refresh':
            return (
                <div className="h-full flex flex-col items-center justify-center p-8 bg-emerald-50 rounded-[3rem] border-2 border-emerald-500/5 relative overflow-hidden">
                    <div className="w-20 h-20 rounded-[2.5rem] bg-white flex items-center justify-center text-emerald-500 mb-10 shadow-xl relative z-10">
                        <RefreshCcw size={40} className="animate-spin-slow" />
                        <div className="absolute inset-0 bg-emerald-500/5 rounded-[2.5rem] animate-pulse" />
                    </div>

                    <div className="relative z-10 text-center w-full space-y-10">
                        <h4 className="text-3xl font-bold-extended uppercase italic text-emerald-900 leading-[0.8] tracking-tighter italic">
                            System<br />Refreshed.
                        </h4>

                        <div className="space-y-3 w-full">
                            <div className="flex justify-between items-center px-6 py-4 bg-white rounded-2xl border border-emerald-100 shadow-sm transition-all hover:scale-[1.02]">
                                <span className="text-[9px] text-red-400 uppercase font-bold-extended">Dropped Log</span>
                                <span className="text-[11px] font-bold-extended uppercase italic text-black">{content.removed[0]}</span>
                            </div>
                            <div className="flex justify-between items-center px-6 py-4 bg-white rounded-2xl border border-emerald-100 shadow-sm transition-all hover:scale-[1.02]">
                                <span className="text-[9px] text-emerald-500 uppercase font-bold-extended">Seeded Log</span>
                                <span className="text-[11px] font-bold-extended uppercase italic text-black">{content.added[0]}</span>
                            </div>
                        </div>

                        <div className="pt-6">
                            <div className="h-1 w-24 bg-emerald-200 rounded-full mx-auto mb-4 overflow-hidden">
                                <motion.div
                                    animate={{ x: [-100, 100] }}
                                    transition={{ repeat: Infinity, duration: 2 }}
                                    className="h-full w-1/2 bg-emerald-500"
                                />
                            </div>
                            <span className="text-[9px] font-bold-extended uppercase tracking-[0.4em] text-emerald-900/40 italic">Calibration: Sync Active</span>
                        </div>
                    </div>

                    {/* Abstract background */}
                    <div className="absolute -top-20 -left-20 w-64 h-64 bg-emerald-200/20 rounded-full blur-[80px]" />
                </div>
            );
        default:
            return null;
    }
};
