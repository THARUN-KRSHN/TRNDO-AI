"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { HighlightText } from './LandingUtils';

export const NarrativeSection = () => {
    return (
        <section className="py-24 px-8 flex justify-center bg-white border-y border-black/5">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="max-w-6xl text-center"
            >
                <h3 className="text-4xl md:text-[5.5rem] font-bold-extended tracking-tighter text-[#111] leading-[0.9] mb-12 uppercase italic">
                    TRNDO AI is the
                    <HighlightText color="bg-[#FF9F1C]">Ghost Assistant</HighlightText>
                    that watches the town while you run the floor.
                    <br />
                    It reads the pulse,
                    <HighlightText color="bg-[#4895EF]">handles the chat</HighlightText>
                    and stops the
                    <HighlightText color="bg-[#F72585]">late-mover loss.</HighlightText>
                </h3>
            </motion.div>
        </section>
    );
};
