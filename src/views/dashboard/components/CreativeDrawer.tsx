"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Copy, Check, MessageCircle, AlertCircle, Instagram, Wand2, Tag, Calendar, BadgePercent, Loader2, Edit3, Share2 } from 'lucide-react';
import { TrendCardSkeleton } from './TrendCard';
import { useDashboardStore } from '@/store/useDashboardStore';

export const CreativeDrawer = () => {
    const { isDrawerOpen, setDrawerOpen, selectedTrend, user } = useDashboardStore();
    const [copied, setCopied] = useState(false);
    const [isGenerating, setIsGenerating] = useState(false);
    const [aiResult, setAiResult] = useState<{ caption?: string } | null>(null);
    const [editableCaption, setEditableCaption] = useState("");
    const [extraDetails, setExtraDetails] = useState({
        price: "",
        date: "",
        offer: "",
        occasion: "Drinks and food"
    });

    // Update editable caption when AI result changes or initial load
    useEffect(() => {
        if (aiResult?.caption) {
            setEditableCaption(aiResult.caption);
        } else if (selectedTrend) {
            const defaultCaption = `Irinjalakudakkarude puthiya ishtam! 🌟 Try our signature ${selectedTrend.keyword} today. ${extraDetails.price ? `Price: ${extraDetails.price}.` : ''} ${extraDetails.offer ? `Offer: ${extraDetails.offer}!` : ''} Pure quality, pure locals. DM to order now! #TRNDOAI #IJK`;
            setEditableCaption(defaultCaption);
        }
    }, [aiResult, selectedTrend]);

    // Auto-generate description when drawer opens
    useEffect(() => {
        if (isDrawerOpen && selectedTrend) {
            handleGenerate();
        }
    }, [isDrawerOpen, selectedTrend?.id]);

    const handleGenerate = async () => {
        if (!selectedTrend) return;
        setIsGenerating(true);
        try {
            const response = await fetch('/api/descriptions', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    item: selectedTrend.keyword,
                    location: user?.location || 'IN-KL',
                    occasion: extraDetails.occasion
                })
            });
            const data = await response.json();
            if (data.description) {
                setAiResult({ caption: data.description });
            }
        } catch (error) {
            console.error('Generation failed:', error);
        } finally {
            setIsGenerating(false);
        }
    };

    const handleCopy = () => {
        const hashtags = `#Irinjalakuda #LocalTrend #${selectedTrend?.keyword?.replace(/\s/g, '') || 'Trend'} #KeralaRetail`;
        navigator.clipboard.writeText(`${editableCaption}\n\n${hashtags}`);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleShare = (platform: 'whatsapp' | 'instagram') => {
        const hashtags = `#Irinjalakuda #LocalTrend #${selectedTrend?.keyword?.replace(/\s/g, '') || 'Trend'} #KeralaRetail`;
        const text = encodeURIComponent(`${editableCaption}\n\n${hashtags}`);

        if (platform === 'whatsapp') {
            window.open(`https://wa.me/?text=${text}`);
        } else {
            window.open(`https://instagram.com/`);
        }
    };

    if (!selectedTrend) return null;

    return (
        <AnimatePresence>
            {isDrawerOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setDrawerOpen(false)}
                        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
                    />

                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: "spring", stiffness: 200, damping: 25 }}
                        className="fixed top-0 right-0 h-screen w-full lg:w-[460px] bg-white border-l border-black/5 z-50 shadow-2xl overflow-y-auto"
                    >
                        <div className="p-8 pb-32">
                            {/* Header */}
                            <div className="flex justify-between items-center mb-10">
                                <div className="flex items-center gap-3">
                                    <div className="p-2.5 rounded-2xl bg-black text-white shadow-lg">
                                        <Sparkles size={20} />
                                    </div>
                                    <div>
                                        <span className="text-[10px] font-bold-extended uppercase tracking-[0.2em] text-black/40 italic">Copywriting Engine</span>
                                        <h2 className="text-xl font-bold-extended uppercase italic tracking-tighter">Caption Studio</h2>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setDrawerOpen(false)}
                                    className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            <div className="space-y-10">
                                {/* 1. Caption Editor */}
                                <div className="space-y-6">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <Edit3 size={16} className="text-black/40" />
                                            <span className="text-[10px] font-bold-extended uppercase tracking-widest text-black/60 italic">Draft Blueprint</span>
                                        </div>
                                        <button
                                            onClick={handleCopy}
                                            className="text-[10px] font-bold-extended uppercase tracking-widest text-black/40 hover:text-black transition-colors flex items-center gap-2"
                                        >
                                            {copied ? <Check size={12} className="text-emerald-500" /> : <Copy size={12} />}
                                            {copied ? 'Copied' : 'Copy All'}
                                        </button>
                                    </div>

                                    <div className="relative p-8 rounded-[2.5rem] bg-orange-50/50 border border-orange-100/50 min-h-[16rem] overflow-hidden group">
                                        <AnimatePresence mode="wait">
                                            {isGenerating ? (
                                                <motion.div
                                                    key="loader"
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    exit={{ opacity: 0 }}
                                                    className="space-y-4"
                                                >
                                                    <div className="h-4 w-3/4 bg-orange-200/40 rounded-full animate-pulse" />
                                                    <div className="h-4 w-full bg-orange-200/40 rounded-full animate-pulse px-2" />
                                                    <div className="h-4 w-5/6 bg-orange-200/40 rounded-full animate-pulse px-4" />
                                                    <div className="h-4 w-1/2 bg-orange-200/40 rounded-full animate-pulse" />
                                                    <div className="pt-8 flex gap-2">
                                                        <div className="h-2 w-16 bg-pink-200/40 rounded-full animate-pulse" />
                                                        <div className="h-2 w-20 bg-pink-200/40 rounded-full animate-pulse" />
                                                    </div>
                                                </motion.div>
                                            ) : (
                                                <motion.div
                                                    key="content"
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    exit={{ opacity: 0 }}
                                                    className="space-y-4"
                                                >
                                                    <textarea
                                                        value={editableCaption}
                                                        onChange={(e) => setEditableCaption(e.target.value)}
                                                        className="w-full h-48 bg-transparent border-none focus:ring-0 text-sm font-thin-extended italic leading-relaxed text-orange-950 resize-none custom-scrollbar uppercase"
                                                        placeholder="Write your story..."
                                                    />
                                                    <div className="flex flex-wrap gap-2 opacity-50">
                                                        <span className="text-[9px] font-bold-extended text-[#F72585] uppercase italic">#Irinjalakuda</span>
                                                        <span className="text-[9px] font-bold-extended text-[#F72585] uppercase italic">#LocalTrend</span>
                                                        <span className="text-[9px] font-bold-extended text-[#F72585] uppercase italic">#{selectedTrend.keyword.replace(/\s/g, '')}</span>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>

                                        {/* Subtle overlay glow during loading */}
                                        {isGenerating && (
                                            <motion.div
                                                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-[shimmer_2s_infinite]"
                                            />
                                        )}
                                    </div>
                                </div>

                                {/* 2. Market Details */}
                                <div className="space-y-6">
                                    <div className="flex items-center gap-2 px-2">
                                        <Tag size={14} className="text-black/40" />
                                        <span className="text-[10px] font-bold-extended uppercase tracking-widest text-black/60 italic">Contextual Intelligence</span>
                                    </div>
                                    <div className="grid grid-cols-1 gap-3">
                                        <div className="flex items-center gap-3 bg-gray-50 rounded-xl px-5 py-4 transition-all focus-within:bg-white focus-within:shadow-md">
                                            <Tag size={14} className="text-black/30" />
                                            <input
                                                placeholder="Price (e.g. ₹199)"
                                                value={extraDetails.price}
                                                onChange={(e) => setExtraDetails({ ...extraDetails, price: e.target.value })}
                                                className="bg-transparent border-none focus:ring-0 outline-none text-[13px] font-bold-extended uppercase italic w-full p-0"
                                            />
                                        </div>
                                        <div className="flex items-center gap-3 bg-gray-50 rounded-xl px-5 py-4 transition-all focus-within:bg-white focus-within:shadow-md">
                                            <BadgePercent size={14} className="text-black/30" />
                                            <input
                                                placeholder="Offer (e.g. 20% OFF)"
                                                value={extraDetails.offer}
                                                onChange={(e) => setExtraDetails({ ...extraDetails, offer: e.target.value })}
                                                className="bg-transparent border-none focus:ring-0 outline-none text-[13px] font-bold-extended uppercase italic w-full p-0"
                                            />
                                        </div>
                                        <div className="flex items-center gap-3 bg-gray-50 rounded-xl px-5 py-4 transition-all focus-within:bg-white focus-within:shadow-md">
                                            <Sparkles size={14} className="text-black/30" />
                                            <input
                                                placeholder="Occasion (e.g. Drinks and food)"
                                                value={extraDetails.occasion}
                                                onChange={(e) => setExtraDetails({ ...extraDetails, occasion: e.target.value })}
                                                className="bg-transparent border-none focus:ring-0 outline-none text-[13px] font-bold-extended uppercase italic w-full p-0"
                                            />
                                        </div>
                                        <button
                                            onClick={handleGenerate}
                                            disabled={isGenerating}
                                            className="w-full py-5 rounded-2xl bg-black text-white flex items-center justify-center gap-3 font-bold-extended uppercase italic text-sm tracking-widest hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-black/10 disabled:opacity-50 mt-2"
                                        >
                                            {isGenerating ? <Loader2 className="w-5 h-5 animate-spin" /> : <Wand2 size={18} />}
                                            {isGenerating ? 'Drafting...' : 'Regenerate Caption'}
                                        </button>
                                    </div>
                                </div>

                                {/* 3. Social Distribution */}
                                <div className="space-y-6">
                                    <div className="flex items-center gap-2 px-2">
                                        <Share2 size={14} className="text-black/40" />
                                        <span className="text-[10px] font-bold-extended uppercase tracking-widest text-black/60 italic">Channel Distribution</span>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <button
                                            onClick={() => handleShare('whatsapp')}
                                            className="py-5 rounded-3xl border border-emerald-100 bg-emerald-50 text-emerald-950 hover:bg-emerald-100 transition-all flex flex-col items-center justify-center gap-3 text-center group"
                                        >
                                            <MessageCircle size={24} className="text-emerald-500 group-hover:scale-110 transition-transform" />
                                            <span className="text-[9px] font-bold-extended uppercase tracking-widest italic leading-none">Share to<br />WhatsApp</span>
                                        </button>
                                        <button
                                            onClick={() => handleShare('instagram')}
                                            className="py-5 rounded-3xl border border-pink-100 bg-pink-50 text-pink-950 hover:bg-pink-100 transition-all flex flex-col items-center justify-center gap-3 text-center group"
                                        >
                                            <Instagram size={24} className="text-pink-500 group-hover:scale-110 transition-transform" />
                                            <span className="text-[9px] font-bold-extended uppercase tracking-widest italic leading-none">Post to<br />Instagram</span>
                                        </button>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};
