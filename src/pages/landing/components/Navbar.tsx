"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import Link from 'next/link';

export const Navbar = () => {
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-16 py-8  backdrop-blur-xl font-bold-extended ">
            {/* Logo/Brand */}
            <Link href="/" className="flex items-center gap-2 group">
                <div className="w-10 h-10 rounded-2xl bg-black flex items-center justify-center transition-transform group-hover:scale-110">
                    <span className="text-white text-xl font-bold-extended italic">O</span>
                </div>
                <span className="text-xl font-bold-extended tracking-tighter text-black uppercase italic">TRNDO AI</span>
            </Link>

            {/* Center Links */}
            <div className="hidden lg:flex items-center gap-10 font-bold-extended absolute left-1/2 -translate-x-1/2">
                <div className="flex items-center gap-1.5 text-xs text-black/40 hover:text-black transition-colors cursor-pointer uppercase italic">
                    Features <ChevronDown className="w-3.5 h-3.5" />
                </div>
                <div className="text-xs text-black/40 hover:text-black transition-colors cursor-pointer uppercase italic">
                    Pricing
                </div>
                <div className="flex items-center gap-1.5 text-xs text-black/40 hover:text-black transition-colors cursor-pointer uppercase italic">
                    Resources <ChevronDown className="w-3.5 h-3.5" />
                </div>
                <div className="text-xs text-black/40 hover:text-black transition-colors cursor-pointer uppercase italic">
                    Events
                </div>
            </div>

            {/* Right Buttons */}
            <div className="flex items-center gap-10">
                <Link href="/login" className="text-xs font-bold-extended text-black/40 hover:text-black transition-colors uppercase italic flex items-center">
                    Login
                </Link>
                <Link href="/demo" className="px-8 py-3 rounded-full bg-black text-white text-xs font-bold-extended hover:scale-105 transition-all shadow-xl shadow-black/10 uppercase italic h-12 flex items-center">
                    Book a Demo
                </Link>
            </div>
        </nav>
    );
};
