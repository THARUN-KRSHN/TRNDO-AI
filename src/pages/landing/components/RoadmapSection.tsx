"use client";
import React from 'react';
import { Plus } from 'lucide-react';

export const RoadmapSection = () => {
    return (
        <section className="py-32 px-8 bg-white">
            <div className="max-w-7xl mx-auto text-center">
                <span className="text-sm font-bold-extended uppercase tracking-widest text-gray-400 mb-6 block italic">Beyond the Launch</span>
                <h2 className="text-5xl md:text-[6rem] font-bold-extended tracking-tighter mb-20 italic uppercase leading-[0.85]">Scaling<br />The Pulse.</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        { t: "Voice-to-Stock", desc: "Speak directly into WhatsApp to sync physical inventory.", c: "bg-purple-100 text-purple-600" },
                        { t: "District Viral Maps", desc: "Heatmaps for the entire state of Kerala.", c: "bg-orange-100 text-orange-600" },
                        { t: "Local Moat API", desc: "Connect with local supply chains for faster procurement.", c: "bg-green-100 text-green-600" }
                    ].map((item, i) => (
                        <div key={i} className="p-12 rounded-[3.5rem] bg-[#F8F8F8] border border-black/5 shadow-sm hover:shadow-xl transition-all text-left">
                            <div className={`w-16 h-16 rounded-3xl ${item.c} flex items-center justify-center mb-8 shadow-sm`}>
                                <Plus className="w-8 h-8" />
                            </div>
                            <h4 className="text-2xl font-bold-extended uppercase italic mb-4">{item.t}</h4>
                            <p className="text-gray-500 font-thin-extended leading-relaxed">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
