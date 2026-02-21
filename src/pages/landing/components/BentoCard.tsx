"use client";
import React from 'react';
import { motion } from 'framer-motion';

export const BentoCard = ({ title, description, children, className = "" }: any) => {
    return (
        <motion.div
            whileHover={{ y: -5 }}
            className={`relative overflow-hidden rounded-[2.5rem] bg-white p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-black/5 transition-all hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] ${className}`}
        >
            <div className="relative z-10">
                <h3 className="text-2xl font-bold-extended text-[#0A0A0A] mb-3 tracking-tighter uppercase italic">{title}</h3>
                <p className="text-base text-gray-500 font-thin-extended mb-8 leading-relaxed max-w-[95%]">{description}</p>
                {children}
            </div>
        </motion.div>
    );
};
