"use client";
import React from 'react';

export const NarrativeSection = () => {
    return (
        <section className="py-24 px-8 flex justify-center bg-[#F8F8F8]">
            <div className="max-w-5xl text-center">
                <h3 className="text-3xl md:text-[4.5rem] font-bold-extended tracking-tighter text-[#111] leading-[0.9] mb-12 uppercase italic">
                    trndO is the
                    <span className="inline-flex items-center gap-2 px-6 py-2 mx-2 rounded-full bg-orange-400 text-white shadow-sm transform -rotate-1 not-italic font-bold-extended">
                        Ghost Assistant
                    </span>
                    that watches the town while you run the floor.
                    <br />
                    It reads the pulse,
                    <span className="inline-flex items-center gap-2 px-6 py-2 mx-2 rounded-full bg-blue-400 text-white shadow-sm transform rotate-1 not-italic font-bold-extended">
                        handles the chat
                    </span>
                    and stops the
                    <span className="inline-flex items-center gap-2 px-6 py-2 mx-2 rounded-full bg-red-400 text-white shadow-sm transform -rotate-1 not-italic font-bold-extended">
                        late-mover loss.
                    </span>
                </h3>
            </div>
        </section>
    );
};
