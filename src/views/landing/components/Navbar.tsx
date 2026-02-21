"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { useDashboardStore } from '@/store/useDashboardStore';

export const Navbar = () => {
    const user = useDashboardStore((state: any) => state.user);

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 md:px-16 py-8 backdrop-blur-xl font-bold-extended ">
            {/* Logo/Brand */}
            <Link href="/" className="flex items-center gap-3 group">
                <div className="w-10 h-10 rounded-2xl bg-black flex items-center justify-center transition-all group-hover:bg-[#FF9F1C] group-hover:rotate-12">
                    <span className="text-white text-xl font-bold-extended italic">O</span>
                </div>
                <div className="flex flex-col leading-none">
                    <span className="text-xl font-bold-extended tracking-tighter text-black uppercase italic">TRNDO AI</span>
                    <span className="text-[8px] font-bold-extended tracking-[0.4em] text-black/40 uppercase italic">Intelligence</span>
                </div>
            </Link>

            {/* Center Links */}
            <div className="hidden lg:flex items-center gap-10 font-bold-extended absolute left-1/2 -translate-x-1/2">
                {[
                    { label: 'Problem', href: '#problem' },
                    { label: 'Solution', href: '#features' },
                    { label: 'Demo', href: '/demo' },
                    { label: 'FAQ', href: '#faq' }
                ].map((item) => (
                    <Link
                        key={item.label}
                        href={item.href}
                        className="text-[10px] text-black/40 hover:text-black transition-colors cursor-pointer uppercase italic tracking-widest"
                    >
                        {item.label}
                    </Link>
                ))}
            </div>

            {/* Right Buttons */}
            <div className="flex items-center gap-6">
                {user ? (
                    <Link href="/dashboard" className="px-8 py-3 rounded-full bg-black text-white text-[10px] font-bold-extended hover:bg-[#F72585] transition-all shadow-xl shadow-black/10 uppercase italic h-12 flex items-center tracking-widest">
                        Dashboard
                    </Link>
                ) : (
                    <>
                        <Link href="/login" className="hidden sm:block text-[10px] font-bold-extended text-black/40 hover:text-black transition-colors uppercase italic tracking-widest">
                            Login
                        </Link>
                        <Link href="/demo" className="px-8 py-3 rounded-full bg-black text-white text-[10px] font-bold-extended hover:bg-[#4895EF] transition-all shadow-xl shadow-black/10 uppercase italic h-12 flex items-center tracking-widest">
                            Book Demo
                        </Link>
                    </>
                )}
            </div>
        </nav>
    );
};
