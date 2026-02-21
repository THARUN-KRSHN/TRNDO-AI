"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ArrowLeft,
    ArrowRight,
    Smartphone,
    Settings,
    Zap,
    CheckCircle,
    ChevronRight,
    MapPin,
    Monitor
} from 'lucide-react';
import Link from 'next/link';

export const DemoPage = () => {
    const [activeStep, setActiveStep] = useState(0);

    const steps = [
        {
            title: "Welcome to trndO",
            subtitle: "Onboarding",
            icon: Zap,
            desc: "Setting up your digital scout is a 2-minute process. No complex software, just simple configuration.",
            detail: "Enter your shop name and location. trndO will automatically identify the nearest Urban Hub anchors (Kochi, Thrissur, or Calicut) to monitor for your business pulse.",
            visual: (
                <div className="space-y-4">
                    <div className="p-6 rounded-3xl bg-[#F8F8F8] border border-black/5">
                        <label className="text-[10px] font-bold-extended text-gray-400 uppercase tracking-widest block mb-2">Shop Name</label>
                        <div className="h-4 w-1/2 bg-gray-200 rounded animate-pulse" />
                    </div>
                    <div className="p-6 rounded-3xl bg-[#F8F8F8] border border-black/5">
                        <label className="text-[10px] font-bold-extended text-gray-400 uppercase tracking-widest block mb-2">Location</label>
                        <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-yellow-400" />
                            <span className="text-sm font-bold-extended italic">IRINJALAKUDA, KERALA</span>
                        </div>
                    </div>
                </div>
            )
        },
        {
            title: "Connect WhatsApp",
            subtitle: "Integration",
            icon: Smartphone,
            desc: "The only app you'll ever use to run trndO. We've built the brain inside your favorite chat tool.",
            detail: "Link your WhatsApp Business number. Our agentic AI will introduce itself and handle all future trend scouting and inventory updates through this thread.",
            visual: (
                <div className="relative mx-auto w-64 h-32 rounded-3xl bg-green-500 flex items-center justify-center shadow-xl shadow-green-500/20">
                    <div className="text-white flex flex-col items-center">
                        <Smartphone className="w-10 h-10 mb-2" />
                        <span className="text-[10px] font-bold-extended uppercase">Linking...</span>
                    </div>
                    <div className="absolute -bottom-2 -right-2 w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-lg border-2 border-green-500">
                        <CheckCircle className="w-6 h-6 text-green-500" />
                    </div>
                </div>
            )
        },
        {
            title: "Urban Hub Anchors",
            subtitle: "Configuration",
            icon: Settings,
            desc: "Choose where you want to see fads 'rippling' from. Usually the nearest Tier-1 city.",
            detail: "If you sell garments in Irinjalakuda, we suggest Kochi and Thrissur as your Urban Anchors. We'll alert you if something viral starts moving from there towards your shop.",
            visual: (
                <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-3xl bg-white border-2 border-yellow-400 text-center">
                        <span className="text-[10px] font-bold-extended text-yellow-400 block mb-1">KOCHI</span>
                        <div className="h-1 w-full bg-yellow-400 rounded-full" />
                    </div>
                    <div className="p-4 rounded-3xl bg-white border border-gray-100 text-center opacity-50">
                        <span className="text-[10px] font-bold-extended text-gray-400 block mb-1">CALICUT</span>
                        <div className="h-1 w-full bg-gray-100 rounded-full" />
                    </div>
                </div>
            )
        },
        {
            title: "Zero UI Dashboard",
            subtitle: "Monitoring",
            icon: Monitor,
            desc: "While the action happens on WhatsApp, you get a beautiful 'Shadow Dashboard' for long-term logs.",
            detail: "Access your trend history, inventory audits, and profit reports through a simple, high-impact web dashboard. No messy tables—just beautiful signals.",
            visual: (
                <div className="p-6 rounded-[2.5rem] bg-black text-white space-y-4">
                    <div className="flex justify-between items-center">
                        <div className="w-3 h-3 rounded-full bg-red-500" />
                        <div className="h-2 w-12 bg-white/20 rounded-full" />
                    </div>
                    <div className="h-8 w-3/4 bg-white/10 rounded-xl" />
                    <div className="flex gap-2">
                        <div className="h-16 flex-1 bg-white/5 rounded-2xl" />
                        <div className="h-16 flex-1 bg-white/5 rounded-2xl" />
                        <div className="h-16 flex-1 bg-white/5 rounded-2xl" />
                    </div>
                </div>
            )
        }
    ];

    return (
        <main className="min-h-screen bg-[#F8F8F8] font-thin-extended">
            {/* Nav */}
            <nav className="p-8 flex justify-between items-center bg-white border-b border-black/5 sticky top-0 z-50">
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="p-2 rounded-xl bg-gray-100 group-hover:bg-black group-hover:text-white transition-all">
                        <ArrowLeft className="w-4 h-4" />
                    </div>
                    <span className="text-xl font-bold-extended uppercase italic tracking-tighter">Back to Home</span>
                </Link>
                <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold-extended tracking-tighter text-black uppercase italic">trnd</span>
                    <span className="text-2xl font-bold-extended text-yellow-400 italic">O</span>
                </div>
            </nav>

            <div className="max-w-7xl mx-auto py-24 px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-start">
                    {/* Left: Steps Navigation */}
                    <div className="space-y-6">
                        <div className="mb-12">
                            <span className="text-sm font-bold-extended uppercase tracking-widest text-yellow-400 italic mb-4 block">Interactive Walkthrough</span>
                            <h1 className="text-5xl md:text-7xl font-bold-extended uppercase italic leading-[0.8] tracking-tighter mb-8">Full Product<br />Demo.</h1>
                            <p className="text-gray-400 text-xl font-thin-extended">Follow the steps to understand how trndO integrates into your retail workflow.</p>
                        </div>

                        <div className="space-y-4">
                            {steps.map((s, i) => (
                                <button
                                    key={i}
                                    onClick={() => setActiveStep(i)}
                                    className={`w-full p-8 rounded-[2.5rem] text-left transition-all duration-500 flex items-center gap-6 border ${i === activeStep ? 'bg-white border-yellow-400 shadow-2xl shadow-yellow-400/10' : 'bg-transparent border-transparent opacity-40 hover:opacity-70'}`}
                                >
                                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors ${i === activeStep ? 'bg-yellow-400 text-white' : 'bg-gray-200 text-gray-500'}`}>
                                        <s.icon className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <span className={`text-[10px] font-bold-extended uppercase tracking-widest block mb-1 ${i === activeStep ? 'text-yellow-400' : 'text-gray-400'}`}>{s.subtitle}</span>
                                        <h4 className="text-2xl font-bold-extended uppercase italic tracking-tighter">{s.title}</h4>
                                    </div>
                                    <div className="ml-auto">
                                        <ChevronRight className={`w-6 h-6 transition-transform ${i === activeStep ? 'text-yellow-400 translate-x-2' : 'text-gray-200'}`} />
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Right: Preview Panel */}
                    <div className="sticky top-40">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeStep}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="p-12 rounded-[4rem] bg-white border border-black/5 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.05)] relative overflow-hidden"
                            >
                                <div className="relative z-10">
                                    <div className="w-16 h-16 rounded-[2rem] bg-yellow-400 flex items-center justify-center mb-8">
                                        <Zap className="w-8 h-8 text-yellow-400" />
                                    </div>
                                    <h2 className="text-4xl font-bold-extended uppercase italic mb-6 leading-tight tracking-tighter">{steps[activeStep].title}</h2>
                                    <p className="text-xl text-gray-500 leading-relaxed italic mb-10">{steps[activeStep].desc}</p>

                                    <div className="mb-12">
                                        {steps[activeStep].visual}
                                    </div>

                                    <div className="p-8 rounded-3xl bg-[#F8F8F8] border border-black/5">
                                        <span className="text-[10px] font-bold-extended uppercase tracking-[0.2em] text-gray-400 block mb-4 italic">How it works behind the scenes:</span>
                                        <p className="text-sm text-gray-600 font-thin-extended leading-relaxed">{steps[activeStep].detail}</p>
                                    </div>
                                </div>

                                {/* Abstract background decor */}
                                <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-400/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
                            </motion.div>
                        </AnimatePresence>

                        <div className="mt-12 flex justify-between items-center px-12">
                            <p className="text-xs font-bold-extended uppercase text-gray-400 tracking-widest italic">
                                Step {activeStep + 1} of {steps.length}
                            </p>
                            <button
                                onClick={() => setActiveStep(s => (s + 1) % steps.length)}
                                className="group flex items-center gap-3 text-sm font-bold-extended uppercase italic tracking-tighter"
                            >
                                <span>{activeStep === steps.length - 1 ? 'Finish Walkthrough' : 'Next Discovery'}</span>
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="py-24 border-t border-black/5 text-center bg-white">
                <h2 className="text-4xl font-bold-extended uppercase italic tracking-tighter mb-8">Ready to see it live?</h2>
                <div className="flex gap-4 justify-center">
                    <Link href="/" className="px-10 py-5 rounded-full bg-black text-white font-bold-extended text-lg uppercase italic hover:scale-105 transition-all">Join the waitlist</Link>
                    <button className="px-10 py-5 rounded-full border border-black text-black font-bold-extended text-lg uppercase italic hover:bg-gray-50 transition-all">Speak to team</button>
                </div>
            </footer>
        </main>
    );
}
