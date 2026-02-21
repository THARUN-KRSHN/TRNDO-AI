"use client";
import React from 'react';
import Link from 'next/link';

export const FinalCTA = () => {
    return (
        <section className="py-32 px-8 bg-white">
            <div className="max-w-6xl mx-auto rounded-[5rem] bg-yellow-200 p-20 text-center relative overflow-hidden shadow-2xl shadow-orange-500/30 border border-white/10">
                <div className="relative z-10">
                    <h2 className="text-6xl md:text-[8rem] font-bold-extended tracking-tighter mb-12 uppercase italic leading-[0.85] text-black">Ready to<br />beat the lag?</h2>
                    <p className="text-xl md:text-2xl font-thin-extended mb-12 text-black italic opacity-80">Join the beta waitlist for Irinjalakuda shop owners today.</p>
                    <div className="flex flex-col sm:flex-row gap-6 justify-center">
                        <Link href="/signup" className="px-12 py-6 rounded-full bg-white text-black font-bold-extended text-2xl hover:scale-105 transition-all shadow-xl shadow-black/20 uppercase italic inline-block">
                            Get Started
                        </Link>
                        <button className="px-12 py-6 rounded-full border border-black/20 text-black font-bold-extended text-2xl hover:bg-black/5 transition-all uppercase italic">Contact Sales</button>
                    </div>
                </div>
                {/* Background Decor */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />
            </div>
        </section>
    );
};
