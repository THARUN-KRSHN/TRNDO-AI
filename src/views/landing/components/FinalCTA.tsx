"use client";
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export const FinalCTA = () => {
    return (
        <section className="py-32 px-8 bg-white overflow-hidden">
            <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                className="max-w-6xl mx-auto rounded-[5rem] bg-blue-500 p-20 text-center relative overflow-hidden shadow-2xl shadow-[#F72585]/30"
            >
                <div className="relative z-10">
                    <h2 className="text-6xl md:text-[8rem] font-bold-extended tracking-tighter mb-12 uppercase italic leading-[0.85] text-white">Ready to<br />beat the lag?</h2>
                    <p className="text-xl md:text-2xl font-thin-extended mb-12 text-white italic opacity-80">Join the beta waitlist for local shop owners today.</p>
                    <div className="flex flex-col sm:flex-row gap-6 justify-center">
                        <Link href="/signup" className="px-16 py-6 rounded-full bg-white text-black font-bold-extended text-2xl hover:scale-105 transition-all shadow-xl shadow-black/20 uppercase italic inline-block">
                            Get Started
                        </Link>
                        <button className="px-16 py-6 rounded-full border border-white/30 text-white font-bold-extended text-2xl hover:bg-white/10 transition-all uppercase italic">Contact Sales</button>
                    </div>
                </div>
                {/* Background Decor */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#FF9F1C]/20 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />
            </motion.div>
        </section>
    );
};
