"use client";
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Send, Download, Instagram } from 'lucide-react';
import { useDashboardStore } from '@/store/useDashboardStore';
import { GlowButton } from './Common';

export const CreativeDrawer = () => {
    const { isDrawerOpen, setDrawerOpen, selectedTrend } = useDashboardStore();

    if (!selectedTrend) return null;

    return (
        <AnimatePresence>
            {isDrawerOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setDrawerOpen(false)}
                        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
                    />

                    {/* Drawer */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: "spring", stiffness: 200, damping: 25 }}
                        className="fixed top-0 right-0 h-screen w-full lg:w-[420px] bg-white border-l border-black/5 z-50 shadow-2xl overflow-y-auto"
                    >
                        <div className="p-8">
                            <div className="flex justify-between items-center mb-12">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-xl bg-purple-100 text-purple-600">
                                        <Sparkles size={20} />
                                    </div>
                                    <div>
                                        <span className="text-[10px] font-bold-extended uppercase tracking-widest text-black/40 italic">Creative Engine</span>
                                        <h2 className="text-xl font-bold-extended uppercase italic tracking-tighter">AI Studio</h2>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setDrawerOpen(false)}
                                    className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            <div className="space-y-8">
                                {/* Poster Preview */}
                                <div className="relative group rounded-[2.5rem] overflow-hidden bg-gray-100 aspect-[4/5] shadow-xl">
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                    <div className="absolute bottom-8 left-8 right-8">
                                        <p className="text-white text-2xl font-bold-extended uppercase italic mb-2 tracking-tighter">
                                            Fresh {selectedTrend.keyword} is here.
                                        </p>
                                        <span className="text-white/60 text-xs font-thin-extended uppercase tracking-widest">@YourShopIJK</span>
                                    </div>
                                    {/* Placeholder Image Feel */}
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                                        <Sparkles size={40} className="text-white/20 animate-pulse" />
                                    </div>
                                </div>

                                {/* AI Outputs */}
                                <div className="space-y-6">
                                    <div>
                                        <label className="text-[10px] font-bold-extended uppercase tracking-widest text-black/30 mb-3 block px-1">AI Generated Caption</label>
                                        <div className="p-6 rounded-3xl bg-gray-50 border border-black/5 text-sm font-thin-extended italic leading-relaxed">
                                            "Irinjalakudakkarude puthiya ishtam! 🌟 Try our signature {selectedTrend.keyword} today. Pure quality, pure locals. DM to order now! #trndO #IJK"
                                        </div>
                                    </div>

                                    <div>
                                        <label className="text-[10px] font-bold-extended uppercase tracking-widest text-black/30 mb-3 block px-1">Suggested Hashtags</label>
                                        <div className="flex flex-wrap gap-2 text-[10px] font-bold-extended text-purple-600 uppercase italic">
                                            <span>#Irinjalakuda</span>
                                            <span>#LocalTrend</span>
                                            <span>#{selectedTrend.keyword.replace(/\s/g, '')}</span>
                                            <span>#KeralaRetail</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="grid grid-cols-2 gap-4 pt-8 border-t border-black/5">
                                    <GlowButton onClick={() => { }} variant="primary">
                                        <div className="flex items-center gap-2 justify-center">
                                            <Send size={14} /> <span>Post Status</span>
                                        </div>
                                    </GlowButton>
                                    <GlowButton onClick={() => { }} variant="secondary">
                                        <div className="flex items-center gap-2 justify-center">
                                            <Download size={14} /> <span>Save Media</span>
                                        </div>
                                    </GlowButton>
                                    <button className="col-span-2 py-4 rounded-full border border-black/5 text-black hover:bg-gray-50 transition-all flex items-center justify-center gap-3 text-xs font-bold-extended uppercase italic tracking-widest">
                                        <Instagram size={14} />
                                        Open in Instagram
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};
