"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';

export const FAQSection = () => {
    const [openIndex, setOpenIndex] = useState(0);
    const faqs = [
        { q: "Does trndO work with regular WhatsApp?", a: "Yes. It integrates with WhatsApp Business API but feels like regular chat to your customers. Owners don't need a separate app." },
        { q: "Is it really built for Malayalam?", a: "Our NLP is proprietary and specifically fine-tuned for Manglish and regional Kerala dialects. It won't fail or misunderstand local slang." },
        { q: "How accurate is the trend scoring?", a: "We use a 50km radius weighted scoring system that filters out national noise for local relevance. If Kochi reacts, Irinjalakuda knows." }
    ];

    return (
        <section className="py-32 px-8 bg-white">
            <div className="max-w-5xl mx-auto">
                <h2 className="text-7xl md:text-[10rem] font-bold-extended tracking-tighter mb-20 text-center leading-[0.8] uppercase italic">FAQ?</h2>
                <div className="space-y-4">
                    {faqs.map((f, i) => (
                        <div
                            key={i}
                            className={`rounded-[2rem] border transition-all cursor-pointer ${openIndex === i ? 'bg-[#F8F8F8] border-black shadow-xl' : 'bg-white border-black/5 shadow-sm hover:border-black/20'}`}
                            onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
                        >
                            <div className="px-10 py-8 flex justify-between items-center">
                                <h4 className="text-xl md:text-3xl font-bold-extended tracking-tighter uppercase italic">{f.q}</h4>
                                <div className={`w-8 h-8 rounded-full border border-black flex items-center justify-center transition-transform ${openIndex === i ? 'rotate-45 bg-black text-white' : ''}`}>
                                    <Plus className="w-5 h-5" />
                                </div>
                            </div>
                            <AnimatePresence>
                                {openIndex === i && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="px-10 pb-10 text-xl font-thin-extended text-gray-500 leading-relaxed max-w-3xl">
                                            {f.a}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
