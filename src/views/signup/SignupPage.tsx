"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Mail, Lock, Phone, User } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useDashboardStore } from '@/store/useDashboardStore';

export const SignupPage = () => {
    const router = useRouter();
    const setUser = useDashboardStore((state: any) => state.setUser);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: ''
    });

    const handleSignup = (e: React.FormEvent) => {
        e.preventDefault();
        // Simulate signup and save to store
        setUser({
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            businessName: '',
            category: '',
            location: ''
        });
        router.push('/onboarding');
    };

    return (
        <main className="min-h-screen flex flex-col md:flex-row bg-white overflow-hidden">
            {/* Left Side: Brand Narrative */}
            <section className="flex-1 relative overflow-hidden bg-gradient-to-br from-yellow-50 via-orange-50 to-white p-12 flex flex-col justify-between border-r border-black/5">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 relative z-10 transition-transform hover:scale-105">
                    <div className="w-8 h-8 rounded-lg bg-black flex items-center justify-center">
                        <span className="text-white text-xs font-bold-extended italic">O</span>
                    </div>
                    <span className="text-xl font-bold-extended tracking-tighter text-black uppercase italic">TRNDO AI</span>
                </Link>

                {/* Narrative Content */}
                <div className="relative z-10 max-w-md">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-6xl md:text-8xl font-bold-extended text-black leading-[0.9] mb-8 uppercase italic tracking-tighter"
                    >
                        Grow your <br /> business
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-xl text-black/60 font-thin-extended italic leading-relaxed"
                    >
                        Join the next-generation retail ecosystem. <br /> Built for speed and simplicity.
                    </motion.p>
                </div>

                {/* Social Proof */}
                <div className="relative z-10 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-orange-400 animate-pulse" />
                    <span className="text-[10px] font-bold-extended uppercase tracking-widest text-black/40">Join 1,000+ other shop owners</span>
                </div>

                {/* Abstract Background Shapes */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] aspect-square bg-gradient-to-tr from-yellow-200/20 via-orange-200/20 to-transparent rounded-full blur-[120px]" />
            </section>

            {/* Right Side: Signup Form */}
            <section className="flex-[1.2] flex items-center justify-center p-8 md:p-24 bg-white relative">
                <div className="w-full max-w-sm">
                    {/* Header with Navigation */}
                    <div className="flex items-center justify-between mb-12">
                        <Link href="/login" className="p-2 -ml-2 rounded-full hover:bg-gray-50 transition-colors group">
                            <ArrowLeft className="w-5 h-5 text-black transition-transform group-hover:-translate-x-1" />
                        </Link>
                        <span className="text-[10px] font-bold-extended uppercase tracking-widest text-black/30">New Account</span>
                    </div>

                    <div className="space-y-10">
                        <header>
                            <h1 className="text-4xl font-bold-extended uppercase italic tracking-tighter mb-4 flex items-center gap-3">
                                Create User ✨
                            </h1>
                            <p className="text-sm text-black/40 font-bold-extended uppercase tracking-widest italic">Enter your details to get started.</p>
                        </header>

                        <form onSubmit={handleSignup} className="space-y-6">
                            <div className="space-y-2">
                                <div className="relative">
                                    <User className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-black/20" />
                                    <input
                                        type="text"
                                        placeholder="full name"
                                        required
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full pl-14 pr-6 py-5 rounded-2xl bg-[#F8F8F8] border-none focus:ring-2 focus:ring-black transition-all font-bold-extended text-sm uppercase italic placeholder:text-black/20"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="relative">
                                    <Mail className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-black/20" />
                                    <input
                                        type="email"
                                        placeholder="business email"
                                        required
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="w-full pl-14 pr-6 py-5 rounded-2xl bg-[#F8F8F8] border-none focus:ring-2 focus:ring-black transition-all font-bold-extended text-sm uppercase italic placeholder:text-black/20"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="relative">
                                    <Phone className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-black/20" />
                                    <input
                                        type="tel"
                                        placeholder="whatsapp mobile number"
                                        required
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        className="w-full pl-14 pr-6 py-5 rounded-2xl bg-[#F8F8F8] border-none focus:ring-2 focus:ring-black transition-all font-bold-extended text-sm uppercase italic placeholder:text-black/20"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="relative">
                                    <Lock className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-black/20" />
                                    <input
                                        type="password"
                                        placeholder="create password (min. 8 chars)"
                                        required
                                        value={formData.password}
                                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                        className="w-full pl-14 pr-6 py-5 rounded-2xl bg-[#F8F8F8] border-none focus:ring-2 focus:ring-black transition-all font-bold-extended text-sm uppercase italic placeholder:text-black/20"
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="w-full py-5 rounded-2xl bg-black text-white font-bold-extended uppercase italic text-center text-sm hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-black/20 flex items-center justify-center gap-2"
                            >
                                Submit & Continue
                            </button>

                            <div className="text-center pt-4">
                                <p className="text-[10px] font-bold-extended uppercase tracking-widest text-black/30">
                                    Already have an account? <Link href="/login" className="text-black hover:underline transition-all">Sign In</Link>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </main>
    );
};
