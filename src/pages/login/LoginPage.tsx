"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Mail, Lock } from 'lucide-react';
import Link from 'next/link';

export const LoginPage = () => {
    return (
        <main className="min-h-screen flex flex-col md:flex-row bg-white overflow-hidden">
            {/* Left Side: Brand Narrative */}
            <section className="flex-1 relative overflow-hidden bg-gradient-to-br from-purple-50 via-blue-50 to-white p-12 flex flex-col justify-between border-r border-black/5">
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
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-6xl md:text-8xl font-bold-extended text-black leading-[0.9] mb-8 uppercase italic tracking-tighter"
                    >
                        Start your <br /> journey
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-xl text-black/60 font-thin-extended italic leading-relaxed"
                    >
                        Monitor local trends in minutes. <br /> No complex setup required.
                    </motion.p>
                </div>

                {/* Social Proof */}
                <div className="relative z-10 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[10px] font-bold-extended uppercase tracking-widest text-black/40">Join 1,000+ other shop owners</span>
                </div>

                {/* Abstract Background Shapes */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] aspect-square bg-gradient-to-tr from-purple-200/20 via-blue-200/20 to-transparent rounded-full blur-[120px]" />
            </section>

            {/* Right Side: Login Form */}
            <section className="flex-[1.2] flex items-center justify-center p-8 md:p-24 bg-white relative">
                <div className="w-full max-w-sm">
                    {/* Header with Navigation */}
                    <div className="flex items-center justify-between mb-12">
                        <Link href="/" className="p-2 -ml-2 rounded-full hover:bg-gray-50 transition-colors group">
                            <ArrowLeft className="w-5 h-5 text-black transition-transform group-hover:-translate-x-1" />
                        </Link>
                        <span className="text-[10px] font-bold-extended uppercase tracking-widest text-black/30">Existing User</span>
                    </div>

                    <div className="space-y-10">
                        <header>
                            <h1 className="text-4xl font-bold-extended uppercase italic tracking-tighter mb-4 flex items-center gap-3">
                                Welcome! 👋
                            </h1>
                            <p className="text-sm text-black/40 font-bold-extended uppercase tracking-widest italic">Enter your credentials to manage your store.</p>
                        </header>

                        <form className="space-y-6">
                            <div className="space-y-2">
                                <div className="relative">
                                    <Mail className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-black/20" />
                                    <input
                                        type="text"
                                        placeholder="email or phone number"
                                        className="w-full pl-14 pr-6 py-5 rounded-2xl bg-[#F8F8F8] border-none focus:ring-2 focus:ring-black transition-all font-bold-extended text-sm uppercase italic placeholder:text-black/20"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="relative">
                                    <Lock className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-black/20" />
                                    <input
                                        type="password"
                                        placeholder="password"
                                        className="w-full pl-14 pr-6 py-5 rounded-2xl bg-[#F8F8F8] border-none focus:ring-2 focus:ring-black transition-all font-bold-extended text-sm uppercase italic placeholder:text-black/20"
                                    />
                                </div>
                            </div>

                            <div className="flex items-center justify-between px-2">
                                <label className="flex items-center gap-2 cursor-pointer group">
                                    <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-black focus:ring-black" />
                                    <span className="text-[10px] font-bold-extended uppercase tracking-widest text-black/40 group-hover:text-black transition-colors">Remember Me</span>
                                </label>
                                <button type="button" className="text-[10px] font-bold-extended uppercase tracking-widest text-black/30 hover:text-black transition-colors">Forgot Password?</button>
                            </div>

                            <div className="flex gap-4">
                                <Link
                                    href="/dashboard"
                                    className="flex-1 py-5 rounded-2xl bg-black text-white font-bold-extended uppercase italic text-center text-sm hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-black/10 flex items-center justify-center"
                                >
                                    Sign In
                                </Link>
                                <Link
                                    href="/signup"
                                    className="flex-1 py-5 rounded-2xl border-2 border-black/5 text-black font-bold-extended uppercase italic text-center text-sm hover:bg-gray-50 transition-all flex items-center justify-center"
                                >
                                    Sign Up
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </main>
    );
}
