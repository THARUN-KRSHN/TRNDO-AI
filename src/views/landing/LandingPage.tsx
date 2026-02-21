"use client";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { BentoCard } from "./components/BentoCard";
import { ProblemSection } from "./components/ProblemSection";
import { NarrativeSection } from "./components/NarrativeSection";
import { RoadmapSection } from "./components/RoadmapSection";
import { FAQSection } from "./components/FAQSection";
import { FinalCTA } from "./components/FinalCTA";
import { Radar, MessageSquare, Sparkles, TrendingUp, BarChart3, Layers, ArrowRight, ShieldAlert } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { InteractiveMarquee, HighlightText, FloatingText } from "./components/LandingUtils";

export const LandingPage = () => {
    return (
        <main className="min-h-screen font-thin-extended bg-[#F8F8F8] text-[#0A0A0A] overflow-x-hidden">
            <Navbar />

            {/* Hero Section with colorful background */}
            <Hero />

            {/* Jump Text Banner 1 */}


            <InteractiveMarquee text="REAL-TIME INTELLIGENCE • LOCAL VELOCITY • GEOGRAPHIC RADAR" color="bg-[#F72585]" />

            <div id="problem">
                <ProblemSection />
            </div>

            <InteractiveMarquee text="WHATSAPP CRM • AUTOMATED INVOICING • GEMINI 1.5 PRO" color="bg-[#4895EF]" direction="right" />

            {/* Content Band - The Solution */}
            <section id="features" className="py-24 bg-white relative">
                <div className="px-8 max-w-[90rem] mx-auto">
                    <div className="mb-24 flex flex-col items-center text-center">
                        <h2 className="text-6xl md:text-9xl font-bold-extended mb-6 tracking-tighter uppercase italic leading-[0.85]">
                            The <br /> Solution.
                        </h2>
                        <p className="text-xl text-gray-400 max-w-2xl font-thin-extended italic">A Geo-fenced ecosystem designed to beat the late-mover penalty.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Pillar 1: Hyper-Local Radar */}
                        <BentoCard
                            title="01. Hyper-Local Radar"
                            description="Our Geo-Fenced Tracker monitors product demand flow from high-density urban hubs."
                            className="md:col-span-2 min-h-[450px] bg-[#F72585]/5"
                        >
                            <div className="flex items-center gap-6 mt-12">
                                <div className="w-20 h-20 rounded-3xl bg-black text-white flex items-center justify-center shadow-xl shadow-black/10">
                                    <Radar className="w-10 h-10" />
                                </div>
                                <div className="flex-1 space-y-4">
                                    <div className="flex justify-between text-[10px] font-bold-extended uppercase tracking-widest text-[#F72585]">
                                        <span>Thrissur Hub</span>
                                        <span>Irinjalakuda Feed</span>
                                    </div>
                                    <div className="h-4 bg-black/5 rounded-full w-full relative overflow-hidden">
                                        <motion.div
                                            initial={{ width: "30%" }}
                                            animate={{ width: ["30%", "85%", "35%"] }}
                                            transition={{ duration: 4, repeat: Infinity }}
                                            className="absolute top-0 left-0 h-full bg-[#FF9F1C] rounded-full"
                                        />
                                    </div>
                                    <p className="text-sm font-bold-extended uppercase tracking-widest text-[#FF9F1C] italic">PREDICTION: HOT ZONE</p>
                                </div>
                            </div>
                        </BentoCard>

                        {/* Pillar 2: Safety Valve */}
                        <BentoCard
                            title="02. Safety Valve"
                            description="Filter 'False Trends' caused by negative scandals."
                            className="min-h-[450px] bg-[#FF9F1C]/5"
                        >
                            <div className="mt-12 bg-white p-8 rounded-[2rem] border-2 border-[#FF9F1C]/20">
                                <div className="flex items-center gap-3 mb-6">
                                    <ShieldAlert className="w-6 h-6 text-[#F72585]" />
                                    <span className="text-[10px] font-bold-extended uppercase tracking-widest text-[#F72585]">Hazard Detected</span>
                                </div>
                                <p className="text-sm font-bold-extended italic text-black mb-4">"Rival quality scandals."</p>
                                <div className="pt-4 border-t border-black/5">
                                    <p className="text-xs font-bold-extended uppercase text-[#4895EF] italic">Push Clean Campaign</p>
                                </div>
                            </div>
                        </BentoCard>

                        {/* Pillar 3: WhatsApp Locker */}
                        <BentoCard
                            title="03. WhatsApp Locker"
                            description="Gemini 1.5 Pro parses casual chats into structured orders."
                            className="min-h-[450px] bg-[#4895EF]/5"
                        >
                            <div className="mt-12 space-y-4">
                                <div className="p-4 bg-white border border-[#4895EF]/20 rounded-2xl rounded-bl-none text-xs font-thin-extended italic">
                                    "ശരി, create invoice for 50 pieces..."
                                </div>
                                <div className="p-4 bg-[#4895EF] text-white rounded-2xl rounded-tr-none text-xs font-bold-extended shadow-lg shadow-[#4895EF]/20">
                                    ✅ Draft Invoice Ready.
                                </div>
                            </div>
                        </BentoCard>

                        {/* Pillar 4: The Command Center */}
                        <BentoCard
                            title="04. Command Center"
                            description="Monitor the Trend Matrix and access the Creative Drawer."
                            className="md:col-span-2 min-h-[450px] bg-black text-white"
                        >
                            <div className="mt-12 flex items-start gap-8">
                                <div className="flex-1 p-8 rounded-[2rem] bg-white/5 border border-white/10">
                                    <span className="text-[10px] font-bold-extended uppercase text-white/30 block mb-6">Pulse Matrix</span>
                                    <div className="grid grid-cols-3 gap-2">
                                        <div className="h-10 bg-[#4CC9F0]/20 rounded-lg flex items-center justify-center text-[8px] font-bold-extended italic">RISING</div>
                                        <div className="h-10 bg-[#FF9F1C]/20 rounded-lg flex items-center justify-center text-[8px] font-bold-extended italic border border-[#FF9F1C]">ACTIVE</div>
                                        <div className="h-10 bg-[#F72585]/20 rounded-lg flex items-center justify-center text-[8px] font-bold-extended italic">FADING</div>
                                    </div>
                                </div>
                            </div>
                        </BentoCard>
                    </div>
                </div>
            </section>

            <InteractiveMarquee text="INVENTORY OPTIMIZED • ZERO WASTE • HIGH MARGINS" color="bg-[#FF9F1C]" />

            <NarrativeSection />

            <div className="bg-[#4895EF] py-20 overflow-hidden relative">
                <div className="max-w-[90rem] mx-auto px-8 relative z-10 flex flex-col md:flex-row items-center justify-between gap-12 text-white">
                    <div className="max-w-xl">
                        <h2 className="text-5xl md:text-8xl font-bold-extended uppercase italic tracking-tighter leading-none mb-8">Handles <br /> the Chat.</h2>
                        <p className="text-xl font-thin-extended italic opacity-80">Stop losing sales to unread messages. Let TRNDO AI convert casual intent into physical checks.</p>
                    </div>
                    <div className="w-full md:w-96 aspect-square bg-white/10 backdrop-blur-xl rounded-[4rem] border border-white/20 p-8 shadow-2xl">
                        {/* CRM Preview Content */}
                        <div className="space-y-6">
                            <div className="w-12 h-12 rounded-2xl bg-white text-[#4895EF] flex items-center justify-center">
                                <MessageSquare />
                            </div>
                            <div className="h-2 w-32 bg-white/20 rounded-full" />
                            <div className="space-y-2">
                                <div className="h-2 w-full bg-white/10 rounded-full" />
                                <div className="h-2 w-4/5 bg-white/10 rounded-full" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <div id="roadmap">
                <RoadmapSection />
            </div>

            <InteractiveMarquee text="BEYOND E-COMMERCE • HYPER-LOCAL RETAIL • TRNDO AI" color="bg-[#F72585]" direction="right" />

            <div id="faq">
                <FAQSection />
            </div>
            <FinalCTA />

            <footer className="bg-white pt-32 pb-12 px-8 md:px-16 border-t border-black/5">
                <div className="max-w-[90rem] mx-auto">
                    {/* Top Section */}
                    <div className="flex flex-col md:flex-row justify-between gap-16 mb-24">
                        <div className="max-w-xs">
                            <h3 className="text-2xl font-bold-extended uppercase italic tracking-tighter mb-4">Experience the Ripple.</h3>
                            <p className="text-sm text-black/40 font-thin-extended">Hyper-local intelligence for the next generation of retailers. Built for the town, powered by the cloud.</p>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-3 gap-12 md:gap-24">
                            <div className="space-y-4">
                                <h4 className="text-[10px] font-bold-extended uppercase tracking-[0.2em] text-black">Product</h4>
                                <ul className="space-y-2 text-xs font-bold-extended uppercase italic text-black/40 tracking-widest">
                                    <li><Link href="#problem" className="hover:text-black transition-colors">Problem</Link></li>
                                    <li><Link href="#features" className="hover:text-black transition-colors">Solution</Link></li>
                                    <li><Link href="/demo" className="hover:text-black transition-colors">Demo</Link></li>
                                    <li><Link href="#faq" className="hover:text-black transition-colors">FAQ</Link></li>
                                </ul>
                            </div>
                            <div className="space-y-4">
                                <h4 className="text-[10px] font-bold-extended uppercase tracking-[0.2em] text-black">Team</h4>
                                <ul className="space-y-2 text-xs font-bold-extended uppercase italic text-black/40 tracking-widest">
                                    <li className="hover:text-black cursor-pointer transition-colors">Alvi A V</li>
                                    <li className="hover:text-black cursor-pointer transition-colors">Jhon Antony</li>
                                    <li className="hover:text-black cursor-pointer transition-colors">Minhaj Noushad</li>
                                    <li className="hover:text-black cursor-pointer transition-colors">Tharun Krishna C U</li>
                                </ul>
                            </div>
                            <div className="space-y-4">
                                <h4 className="text-[10px] font-bold-extended uppercase tracking-[0.2em] text-black">Legal</h4>
                                <ul className="space-y-2 text-xs font-bold-extended uppercase italic text-black/40 tracking-widest">
                                    <li className="hover:text-black cursor-pointer transition-colors">Privacy</li>
                                    <li className="hover:text-black cursor-pointer transition-colors">Terms</li>
                                    <li className="hover:text-black cursor-pointer transition-colors">SLA</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Huge Brand Text */}
                    <div className="mb-24">
                        <h1 className="text-[15vw] md:text-[18vw] font-bold-extended text-black leading-[0.8] tracking-[-0.08em] uppercase italic select-none">
                            TRNDO AI<span className="text-blue-500">.</span>
                        </h1>
                    </div>

                    {/* Bottom Bar */}
                    <div className="flex flex-col md:flex-row justify-between items-center gap-8 pt-12 border-t border-black/5">
                        <div className="flex items-center gap-4">
                            <div className="w-8 h-8 rounded-lg bg-black flex items-center justify-center text-white text-xs font-bold-extended italic">O</div>
                            <span className="text-[10px] font-bold-extended uppercase tracking-widest text-black/20 italic">
                                Built by Team Powerpuff Girls at Make-A-Ton 2026
                            </span>
                        </div>

                        <div className="flex gap-10">
                            {[
                                { icon: 'h-3 w-3 bg-black', label: 'Instagram' },
                                { icon: 'h-3 w-3 bg-black rounded-full', label: 'LinkedIn' },
                                { icon: 'w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[10px] border-b-black', label: 'Twitter' }
                            ].map((social, i) => (
                                <a key={i} href="#" className="hover:scale-110 transition-transform opacity-40 hover:opacity-100" title={social.label}>
                                    <div className={social.icon} />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </footer>
        </main>
    );
}
