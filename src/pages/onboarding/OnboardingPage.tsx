"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Store, MapPin, Target, Sparkles, Check, QrCode, Upload, IndianRupee, Percent } from 'lucide-react';
import Link from 'next/link';

const steps = [
    { id: 1, name: "Business Profile", icon: Store },
    { id: 2, name: "Location & Trends", icon: MapPin },
    { id: 3, name: "Financial Setup", icon: IndianRupee }
];

const categories = [
    { name: "Bakery & Sweets", keywords: ["Sourdough", "Korean Buns", "Basque Cheesecake", "Donuts", "Artisan Bread", "Custom Cakes", "Pastries", "Cupcakes", "Cookies", "Brownies", "Macarons", "Pies", "Tarts"] },
    { name: "Fashion / Boutique", keywords: ["Linen Shirts", "Oversized Tees", "Co-ord Sets", "Indie Jewelry", "Sustainability", "Streetwear", "Vintage Wear", "Minimalist Style", "Accessories", "Footwear", "Handbags", "Ethnic Wear", "Denim"] },
    { name: "Café / Bistro", keywords: ["Cold Brew", "Matcha Latte", "Avocado Toast", "Açaí Bowls", "Specialty Coffee", "Vegan Options", "Healthy Bites", "Smoothies", "Brunch", "Artisan Coffee", "Pasta", "Sandwiches", "Salads"] },
    { name: "Electronics", keywords: ["Smart Watches", "TWS Earbuds", "Gaming Gear", "Home Automation", "Drones", "EV Chargers", "Laptop Skins", "Mech Keyboards", "Audio Setup", "Mobile Accs", "VR Sets", "Tablets", "Monitors"] }
];

export const OnboardingPage = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        businessName: "",
        gstId: "",
        category: "",
        location: "Irinjalakuda",
        urbanHub: "Thrissur",
        selectedKeywords: [] as string[],
        upiId: "",
        currency: "INR",
        taxPercentage: "5",
    });

    const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, 3));
    const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

    const toggleKeyword = (keyword: string) => {
        setFormData(prev => ({
            ...prev,
            selectedKeywords: prev.selectedKeywords.includes(keyword)
                ? prev.selectedKeywords.filter(k => k !== keyword)
                : [...prev.selectedKeywords, keyword]
        }));
    };

    return (
        <main className="min-h-screen flex flex-col md:flex-row bg-white overflow-hidden">
            {/* Left Side: Onboarding Narrative */}
            <section className="flex-1 relative overflow-hidden bg-gradient-to-br from-emerald-50 via-cyan-50 to-white p-12 flex flex-col justify-between border-r border-black/5">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 relative z-10 transition-transform hover:scale-105">
                    <div className="w-8 h-8 rounded-lg bg-black flex items-center justify-center">
                        <span className="text-white text-xs font-bold-extended italic">O</span>
                    </div>
                    <span className="text-xl font-bold-extended tracking-tighter text-black uppercase italic">trndO AI</span>
                </Link>

                {/* Narrative Content */}
                <div className="relative z-10 max-w-md">
                    <motion.h2
                        key={currentStep}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-6xl md:text-8xl font-bold-extended text-black leading-[0.9] mb-8 uppercase italic tracking-tighter"
                    >
                        {steps[currentStep - 1].name.split(" ").map((word, i) => (
                            <React.Fragment key={i}>{word} <br /></React.Fragment>
                        ))}
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-xl text-black/60 font-thin-extended italic leading-relaxed"
                    >
                        {currentStep === 1 && "Start with your official business profile for compliant tracking."}
                        {currentStep === 2 && "Ground your intelligence in your city and target urban hubs."}
                        {currentStep === 3 && "Complete your financial setup for seamless automated invoicing."}
                    </motion.p>
                </div>

                {/* Step Indicator */}
                <div className="relative z-10 flex items-center gap-4">
                    <div className="flex gap-1">
                        {[1, 2, 3].map((s) => (
                            <div key={s} className={`h-1 w-8 rounded-full transition-all duration-500 ${currentStep >= s ? 'bg-black' : 'bg-black/10'}`} />
                        ))}
                    </div>
                    <span className="text-[10px] font-bold-extended uppercase tracking-widest text-black/40 italic">Step {currentStep}/3</span>
                </div>

                {/* Abstract Background Shapes */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] aspect-square bg-gradient-to-tr from-emerald-200/20 via-cyan-200/20 to-transparent rounded-full blur-[120px]" />
            </section>

            {/* Right Side: Onboarding Form */}
            <section className="flex-[1.2] flex items-center justify-center p-8 md:p-24 bg-white relative">
                <div className="w-full max-w-sm">
                    {/* Header with Navigation */}
                    <div className="flex items-center justify-between mb-12">
                        <button
                            onClick={prevStep}
                            disabled={currentStep === 1}
                            className={`p-2 -ml-2 rounded-full hover:bg-gray-50 transition-colors group disabled:opacity-0`}
                        >
                            <ArrowLeft className="w-5 h-5 text-black transition-transform group-hover:-translate-x-1" />
                        </button>
                        <span className="text-[10px] font-bold-extended uppercase tracking-widest text-black/30">Intelligence Setup</span>
                    </div>

                    <div className="space-y-10 min-h-[550px] flex flex-col">
                        <AnimatePresence mode="wait">
                            {currentStep === 1 && (
                                <motion.div
                                    key="step1"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="space-y-8 flex-1"
                                >
                                    <header>
                                        <h1 className="text-4xl font-bold-extended uppercase italic tracking-tighter mb-4">Business Profile 🏢</h1>
                                        <p className="text-sm text-black/40 font-bold-extended uppercase tracking-widest italic">Identity and brand grounding.</p>
                                    </header>

                                    <div className="space-y-6">
                                        <div className="flex justify-center mb-4">
                                            <div className="relative group">
                                                <div className="w-24 h-24 rounded-3xl bg-[#F8F8F8] border-2 border-dashed border-black/5 flex flex-col items-center justify-center cursor-pointer transition-all hover:bg-black/5">
                                                    <Upload className="w-6 h-6 text-black/20" />
                                                    <span className="text-[8px] font-bold-extended uppercase text-black/40 mt-1">Upload Logo</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <div className="relative">
                                                <Store className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-black/20" />
                                                <input
                                                    type="text"
                                                    placeholder="Official Business Name"
                                                    value={formData.businessName}
                                                    onChange={e => setFormData({ ...formData, businessName: e.target.value })}
                                                    className="w-full pl-14 pr-6 py-5 rounded-2xl bg-[#F8F8F8] border-none focus:ring-2 focus:ring-black transition-all font-bold-extended text-sm uppercase italic placeholder:text-black/20"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <div className="relative">
                                                <Check className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-black/20" />
                                                <input
                                                    type="text"
                                                    placeholder="GST ID (Optional)"
                                                    value={formData.gstId}
                                                    onChange={e => setFormData({ ...formData, gstId: e.target.value })}
                                                    className="w-full pl-14 pr-6 py-5 rounded-2xl bg-[#F8F8F8] border-none focus:ring-2 focus:ring-black transition-all font-bold-extended text-sm uppercase italic placeholder:text-black/20"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <div className="relative">
                                                <Sparkles className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-black/20" />
                                                <select
                                                    value={formData.category}
                                                    onChange={e => setFormData({ ...formData, category: e.target.value, selectedKeywords: [] })}
                                                    className="w-full pl-14 pr-6 py-5 rounded-2xl bg-[#F8F8F8] border-none focus:ring-2 focus:ring-black transition-all font-bold-extended text-sm uppercase italic appearance-none"
                                                >
                                                    <option value="">Select Shop Category</option>
                                                    {categories.map(c => <option key={c.name} value={c.name}>{c.name}</option>)}
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {currentStep === 2 && (
                                <motion.div
                                    key="step2"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="space-y-8 flex-1"
                                >
                                    <header>
                                        <h1 className="text-4xl font-bold-extended uppercase italic tracking-tighter mb-4">Location & Trends ✨</h1>
                                        <p className="text-sm text-black/40 font-bold-extended uppercase tracking-widest italic">Grounding the Trend Scout.</p>
                                    </header>

                                    <div className="space-y-6">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-bold-extended uppercase tracking-widest text-black/40 px-2 italic">Your Location</label>
                                                <div className="relative">
                                                    <MapPin className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-black/20" />
                                                    <input
                                                        type="text"
                                                        placeholder="e.g. Irinjalakuda"
                                                        value={formData.location}
                                                        onChange={e => setFormData({ ...formData, location: e.target.value })}
                                                        className="w-full pl-14 pr-4 py-5 rounded-2xl bg-[#F8F8F8] border-none focus:ring-2 focus:ring-black transition-all font-bold-extended text-xs uppercase italic"
                                                    />
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-bold-extended uppercase tracking-widest text-black/40 px-2 italic">Anchor Hub</label>
                                                <div className="relative">
                                                    <Target className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-black/20" />
                                                    <select
                                                        value={formData.urbanHub}
                                                        onChange={e => setFormData({ ...formData, urbanHub: e.target.value })}
                                                        className="w-full pl-10 pr-4 py-5 rounded-2xl bg-[#F8F8F8] border-none focus:ring-2 focus:ring-black transition-all font-bold-extended text-[10px] uppercase italic appearance-none"
                                                    >
                                                        <option>Thrissur</option>
                                                        <option>Kochi</option>
                                                        <option>Calicut</option>
                                                        <option>Trivandrum</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            <label className="text-[10px] font-bold-extended uppercase tracking-widest text-black/40 px-2 italic">Select keywords to track (Target DNA)</label>
                                            <div className="flex flex-wrap gap-2 max-h-[200px] overflow-y-auto pr-2 custom-scrollbar">
                                                {categories.find(c => c.name === formData.category)?.keywords.map((kw) => (
                                                    <button
                                                        key={kw}
                                                        onClick={() => toggleKeyword(kw)}
                                                        className={`px-4 py-2 rounded-full border text-[10px] font-bold-extended uppercase tracking-widest transition-all ${formData.selectedKeywords.includes(kw) ? 'bg-emerald-400 text-black border-emerald-500 shadow-lg shadow-emerald-400/20' : 'bg-white text-black/40 border-black/5'}`}
                                                    >
                                                        {kw}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {currentStep === 3 && (
                                <motion.div
                                    key="step3"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="space-y-8 flex-1"
                                >
                                    <header>
                                        <h1 className="text-4xl font-bold-extended uppercase italic tracking-tighter mb-4">Financial Setup 💰</h1>
                                        <p className="text-sm text-black/40 font-bold-extended uppercase tracking-widest italic">The "Locker" configuration.</p>
                                    </header>

                                    <div className="space-y-6">
                                        <div className="space-y-2">
                                            <div className="relative">
                                                <QrCode className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-black/20" />
                                                <input
                                                    type="text"
                                                    placeholder="UPI ID (VPA) e.g. shop@upi"
                                                    value={formData.upiId}
                                                    onChange={e => setFormData({ ...formData, upiId: e.target.value })}
                                                    className="w-full pl-14 pr-6 py-5 rounded-2xl bg-[#F8F8F8] border-none focus:ring-2 focus:ring-black transition-all font-bold-extended text-sm uppercase italic placeholder:text-black/20"
                                                />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-bold-extended uppercase tracking-widest text-black/40 px-2 italic">Currency</label>
                                                <div className="relative">
                                                    <IndianRupee className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-black/20" />
                                                    <select
                                                        value={formData.currency}
                                                        onChange={e => setFormData({ ...formData, currency: e.target.value })}
                                                        className="w-full pl-14 pr-4 py-5 rounded-2xl bg-[#F8F8F8] border-none focus:ring-2 focus:ring-black transition-all font-bold-extended text-xs uppercase italic appearance-none"
                                                    >
                                                        <option value="INR">INR (₹)</option>
                                                        <option value="USD">USD ($)</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-bold-extended uppercase tracking-widest text-black/40 px-2 italic">Tax % (GST)</label>
                                                <div className="relative">
                                                    <Percent className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-black/20" />
                                                    <select
                                                        value={formData.taxPercentage}
                                                        onChange={e => setFormData({ ...formData, taxPercentage: e.target.value })}
                                                        className="w-full pl-12 pr-4 py-5 rounded-2xl bg-[#F8F8F8] border-none focus:ring-2 focus:ring-black transition-all font-bold-extended text-xs uppercase italic appearance-none"
                                                    >
                                                        <option value="5">5%</option>
                                                        <option value="12">12%</option>
                                                        <option value="18">18%</option>
                                                        <option value="28">28%</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="p-8 rounded-3xl bg-emerald-50 border border-emerald-100 flex flex-col items-center text-center space-y-4">
                                            <Sparkles className="w-8 h-8 text-emerald-500" />
                                            <p className="text-[10px] font-bold-extended text-emerald-900 uppercase tracking-widest italic leading-relaxed">
                                                Setting up these fields ensures your <br /> WhatsApp Chat-to-Invoice engine <br /> works with 100% precision.
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Persistent Footer Buttons */}
                        <div className="flex gap-4 pt-8">
                            {currentStep < 3 ? (
                                <button
                                    onClick={nextStep}
                                    disabled={currentStep === 1 && (!formData.businessName || !formData.category)}
                                    className="w-full py-5 rounded-2xl bg-black text-white font-bold-extended uppercase italic text-center text-sm hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-black/10 flex items-center justify-center gap-2 disabled:opacity-20"
                                >
                                    Next <ArrowRight className="w-4 h-4" />
                                </button>
                            ) : (
                                <Link
                                    href="/dashboard"
                                    className="w-full py-5 rounded-2xl bg-emerald-400 text-black font-bold-extended uppercase italic text-center text-sm hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-emerald-400/20 flex items-center justify-center gap-2"
                                >
                                    Finish Launch <Check className="w-4 h-4" />
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
