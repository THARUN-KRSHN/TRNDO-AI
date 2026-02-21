"use client";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { BentoCard } from "./components/BentoCard";
import { ProblemSection } from "./components/ProblemSection";
import { NarrativeSection } from "./components/NarrativeSection";
import { IPhoneSection } from "./components/IPhoneSection";
import { RoadmapSection } from "./components/RoadmapSection";
import { FAQSection } from "./components/FAQSection";
import { FinalCTA } from "./components/FinalCTA";
import { Radar, MessageSquare, Sparkles, TrendingUp, BarChart3, Layers, ArrowRight, ShieldAlert } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export const LandingPage = () => {
    return (
        <main className="min-h-screen font-thin-extended bg-[#F8F8F8] text-[#0A0A0A]">
            <Navbar />
            <Hero />

            <ProblemSection />

            <section id="features" className="py-24 px-8 max-w-[90rem] mx-auto">
                <div className="mb-20 text-center">
                    <h2 className="text-5xl md:text-8xl font-bold-extended mb-6 tracking-tighter uppercase italic">The Solution.</h2>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto font-thin-extended">A Geo-fenced ecosystem designed to beat the late-mover penalty and inventory bullwhip.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Pillar 1: Hyper-Local Radar */}
                    <BentoCard
                        title="01. Hyper-Local Radar"
                        description="Our Geo-Fenced Tracker monitors product demand flow from high-density urban hubs to local towns, giving you a 48-hour headstart."
                        className="md:col-span-2 min-h-[450px]"
                    >
                        <div className="flex items-center gap-6 mt-12">
                            <div className="w-20 h-20 rounded-3xl bg-black text-white flex items-center justify-center shadow-xl shadow-black/10">
                                <Radar className="w-10 h-10" />
                            </div>
                            <div className="flex-1 space-y-4">
                                <div className="flex justify-between text-[10px] font-bold-extended uppercase tracking-widest text-gray-400">
                                    <span>Anchor: Thrissur</span>
                                    <span>Target: Irinjalakuda</span>
                                </div>
                                <div className="h-4 bg-gray-100 rounded-full w-full relative overflow-hidden">
                                    <motion.div
                                        initial={{ width: "30%" }}
                                        animate={{ width: ["30%", "85%", "35%"] }}
                                        transition={{ duration: 4, repeat: Infinity }}
                                        className="absolute top-0 left-0 h-full bg-yellow-400 rounded-full"
                                    />
                                </div>
                                <p className="text-sm font-bold-extended uppercase tracking-widest text-yellow-600 italic">48H PREDICTION: HIGH VELOCITY</p>
                            </div>
                        </div>
                        <div className="mt-12 grid grid-cols-2 gap-4">
                            <div className="p-6 rounded-3xl bg-white border border-black/5">
                                <span className="text-[10px] font-bold-extended text-gray-400 uppercase block mb-2">Watchlist</span>
                                <p className="text-sm font-bold-extended italic">Sourdough, Korean Buns, Basque...</p>
                            </div>
                            <div className="p-6 rounded-3xl bg-white border border-black/5">
                                <span className="text-[10px] font-bold-extended text-gray-400 uppercase block mb-2">Anchor Prop.</span>
                                <p className="text-sm font-bold-extended italic">THRISSUR → IRJLKDA</p>
                            </div>
                        </div>
                    </BentoCard>

                    {/* Pillar 2: Sentiment Analysis */}
                    <BentoCard
                        title="02. Safety Valve"
                        description="Not all viral spikes are good. Our Contextual Gatekeeper filters 'False Trends' caused by negative news or scandals."
                        className="min-h-[450px]"
                    >
                        <div className="mt-12 bg-red-50 p-8 rounded-[2rem] border border-red-100">
                            <div className="flex items-center gap-3 mb-6">
                                <ShieldAlert className="w-6 h-6 text-red-500" />
                                <span className="text-[10px] font-bold-extended uppercase tracking-widest text-red-600">Hazard Detected</span>
                            </div>
                            <p className="text-sm font-bold-extended italic text-red-900 mb-4">"Rival failing due to oil quality scandals."</p>
                            <div className="pt-4 border-t border-red-200">
                                <span className="text-[10px] font-bold-extended uppercase text-gray-400 block mb-2">Strategic Pivot:</span>
                                <p className="text-xs font-bold-extended uppercase text-black italic">Push 'Organic/Clean Oil' Campaign</p>
                            </div>
                        </div>
                    </BentoCard>

                    {/* Pillar 3: WhatsApp Locker */}
                    <BentoCard
                        title="03. WhatsApp Locker"
                        description="Gemini 1.5 Pro acts as your silent secretary, parsing casual Malayalam/Hinglish chats into structured orders."
                        className="min-h-[450px]"
                    >
                        <div className="mt-12 space-y-4">
                            <div className="p-4 bg-gray-50 rounded-2xl rounded-bl-none text-xs font-thin-extended italic">
                                "ശരി, create invoice for 50 pieces Korean Buns."
                            </div>
                            <div className="p-4 bg-black text-white rounded-2xl rounded-tr-none text-xs font-bold-extended">
                                ✅ Draft Invoice Ready. One-click to PDF.
                            </div>
                            <div className="mt-8 pt-8 border-t border-black/5 flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <MessageSquare className="w-5 h-5 opacity-30" />
                                    <span className="text-xs font-bold-extended uppercase italic">Linguist Intent Engine</span>
                                </div>
                                <ArrowRight className="w-5 h-5" />
                            </div>
                        </div>
                    </BentoCard>

                    {/* Pillar 4: The Command Center */}
                    <BentoCard
                        title="04. Command Center"
                        description="The 'Big Picture' for your shop. Monitor the Trend Matrix (Rising, Saturated, Fading), access the Creative Drawer for AI posters, and manage your Live Vault of orders."
                        className="md:col-span-2 min-h-[450px]"
                    >
                        <div className="mt-12 flex items-start gap-8">
                            <div className="flex-1 p-8 rounded-[2rem] bg-black text-white">
                                <span className="text-[10px] font-bold-extended uppercase text-white/30 block mb-6">The Trend Matrix</span>
                                <div className="grid grid-cols-3 gap-2">
                                    <div className="h-10 bg-green-500/20 rounded-lg flex items-center justify-center text-[8px] font-bold-extended italic">RISING</div>
                                    <div className="h-10 bg-yellow-500/20 rounded-lg flex items-center justify-center text-[8px] font-bold-extended italic">SATURATED</div>
                                    <div className="h-10 bg-red-500/20 rounded-lg flex items-center justify-center text-[8px] font-bold-extended italic">FADING</div>
                                </div>
                            </div>
                            <div className="w-1/3 space-y-4">
                                <div className="p-6 rounded-3xl bg-[#F8F8F8] border border-black/5">
                                    <Sparkles className="w-5 h-5 text-purple-500 mb-2" />
                                    <span className="text-[10px] font-bold-extended uppercase block text-gray-400 italic">Creative Drawer</span>
                                </div>
                                <div className="p-6 rounded-3xl bg-[#F8F8F8] border border-black/5">
                                    <Layers className="w-5 h-5 text-blue-500 mb-2" />
                                    <span className="text-[10px] font-bold-extended uppercase block text-gray-400 italic">Live Vault</span>
                                </div>
                            </div>
                        </div>
                    </BentoCard>
                </div>
            </section>


            <NarrativeSection />
            <IPhoneSection />
            <RoadmapSection />
            <FAQSection />
            <FinalCTA />

            <footer className="py-24 border-t border-black/5 text-center bg-white px-8 font-thin-extended">
                <div className="mb-12 flex justify-center items-center gap-2">
                    <span className="text-3xl font-bold-extended tracking-tighter text-black uppercase italic">TRND</span>
                    <span className="text-3xl font-bold-extended text-yellow-500 italic">O</span>
                </div>

                <div className="mb-16">
                    <Link href="/demo" className="inline-flex items-center gap-2 text-sm font-bold-extended uppercase italic border-b-2 border-orange-500 pb-1 hover:text-orange-500 transition-colors">
                        View Full Product Walkthrough <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>

                <div className="flex flex-wrap justify-center gap-10 text-sm font-bold-extended uppercase tracking-widest text-gray-400 mb-16 italic">
                    <a href="#" className="hover:text-black transition-colors">Instagram</a>
                    <a href="#" className="hover:text-black transition-colors">LinkedIn</a>
                    <a href="#" className="hover:text-black transition-colors">Twitter</a>
                    <a href="#" className="hover:text-black transition-colors">Privacy</a>
                </div>
                <p className="text-gray-300 text-xs font-bold-extended tracking-[0.5em] uppercase italic">
                    Irinjalakuda 2026. Built by trndO Labs.
                </p>
            </footer>
        </main>
    );
}
