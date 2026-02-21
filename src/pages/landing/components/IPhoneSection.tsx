"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, ShieldAlert, Mic, CheckCircle2 } from 'lucide-react';

export const IPhoneSection = () => {
    const [step, setStep] = useState(0);
    const steps = [
        {
            number: "01",
            title: "Urban Hub Scout",
            desc: "The system detects a 40% spike in 'Linen Shirts' in Kochi. It predicts a ripple effect for Irinjalakuda within 48 hours.",
            instruction: "Hyper-local propagation scout is live.",
            mobileContent: {
                type: "alert",
                title: "TREND SPIKE",
                content: "Linen Shirts peaking in Kochi Hub. Ripple ETA: 48h.",
                icon: Clock,
                color: "bg-yellow-400"
            }
        },
        {
            number: "02",
            title: "WhatsApp Nudge",
            desc: "You receive a conversational alert in Malayalam. trndO asks if you want to stock up or generate an ad.",
            instruction: "Conversation-first. No interface needed.",
            mobileContent: {
                type: "chat",
                messages: [
                    { from: "trndO", text: "Kochi-ൽ Linen Shirts ട്രെൻഡ് ആവുന്നുണ്ട്. 50 എണ്ണം ഓർഡർ ചെയ്യട്ടെ?", time: "10:30 AM" }
                ]
            }
        },
        {
            number: "03",
            title: "Locker Settlement",
            desc: "The AI parses your code-switched reply. Confirmation generates a UPI link and auto-updates inventory.",
            instruction: "Linguistic intelligence at work.",
            mobileContent: {
                type: "chat",
                messages: [
                    { from: "trndO", text: "Kochi-ൽ Linen Shirts ട്രെൻഡ് ആവുന്നുണ്ട്. 50 എണ്ണം ഓർഡർ ചെയ്യട്ടെ?", time: "10:30 AM" },
                    { from: "Me", text: "ശരി, create invoice for 50 pieces.", time: "10:31 AM" },
                    { from: "trndO", text: "✅ Invoice generated. Inventory updated (+50).", time: "10:31 AM" }
                ]
            }
        },
        {
            number: "04",
            title: "Regional Exit Signal",
            desc: "Caution: Interest has dropped by 30% in Thrissur. trndO suggests clear-out sales before it hits Irinjalakuda.",
            instruction: "Avoid the Bullwhip trap.",
            mobileContent: {
                type: "alert",
                title: "EXIT ALERT",
                content: "Trend cooling in Thrissur. Stop re-orders. Begin clear-out.",
                icon: ShieldAlert,
                color: "bg-red-500"
            }
        }
    ];

    const currentStep = steps[step];

    return (
        <section className="py-24 px-8 bg-[#F8F8F8]">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-20">
                {/* Mobile Screen Mockup */}
                <div className="flex-1 flex justify-center w-full">
                    <div className="relative w-[340px] h-[680px] bg-black rounded-[4rem] border-[12px] border-black shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] overflow-hidden">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-8 bg-black rounded-b-3xl z-20" />

                        <div className="w-full h-full bg-white p-8 pt-16 flex flex-col">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={step}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    className="flex-1 flex flex-col justify-center items-center text-center"
                                >
                                    {currentStep.mobileContent.type === 'alert' ? (
                                        <div className="w-full">
                                            <div className={`w-20 h-20 rounded-full ${currentStep.mobileContent.color} shadow-2xl shadow-yellow-400/20 flex items-center justify-center mx-auto mb-8 animate-pulse`}>
                                                {currentStep.mobileContent.icon && <currentStep.mobileContent.icon className="w-10 h-10 text-white" />}
                                            </div>
                                            <span className="text-[10px] font-bold-extended uppercase tracking-widest text-gray-400 block mb-2">{currentStep.mobileContent.title}</span>
                                            <p className="text-xl font-bold-extended text-black uppercase italic leading-tight px-4">{currentStep.mobileContent.content}</p>
                                        </div>
                                    ) : (
                                        <div className="w-full space-y-4 pt-10">
                                            {currentStep.mobileContent.messages?.map((m, mi) => (
                                                <div key={mi} className={`flex ${m.from === 'Me' ? 'justify-end' : 'justify-start'}`}>
                                                    <div className={`max-w-[85%] p-4 rounded-3xl text-sm leading-relaxed ${m.from === 'Me' ? 'bg-black text-white rounded-tr-none' : 'bg-gray-100 text-gray-800 rounded-tl-none'}`}>
                                                        {m.text}
                                                        <div className={`text-[8px] mt-1 uppercase ${m.from === 'Me' ? 'text-white/40' : 'text-gray-400'}`}>{m.time}</div>
                                                    </div>
                                                </div>
                                            ))}
                                            {step === 2 && (
                                                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="p-4 bg-green-50 border border-green-100 rounded-2xl flex items-center gap-3">
                                                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                                                    <span className="text-[10px] font-bold-extended uppercase text-green-600">Inventory updated</span>
                                                </motion.div>
                                            )}
                                        </div>
                                    )}
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>
                </div>

                {/* Content Side */}
                <div className="flex-1">
                    <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center mb-8">
                        <Mic className="w-6 h-6 text-yellow-500" />
                    </div>

                    <div className="mb-12">
                        <span className="text-7xl md:text-9xl font-bold-extended text-orange-200 block mb-4 uppercase italic leading-[0.8]">{currentStep.number}</span>
                        <h2 className="text-4xl md:text-5xl font-bold-extended uppercase italic mb-6 leading-tight">{currentStep.title}</h2>
                        <p className="text-xl text-gray-400 font-thin-extended leading-relaxed">{currentStep.desc}</p>
                    </div>

                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setStep(s => Math.max(0, s - 1))}
                            className={`px-8 py-4 rounded-2xl font-bold-extended uppercase italic text-sm transition-all ${step === 0 ? 'bg-gray-100 text-gray-300 pointer-events-none' : 'bg-white text-black border border-black/5 hover:bg-gray-50'}`}
                        >
                            Previous
                        </button>
                        <button
                            onClick={() => setStep(s => (s + 1) % steps.length)}
                            className="flex-1 px-8 py-4 rounded-2xl bg-yellow-400 text-white font-bold-extended uppercase italic text-sm shadow-xl shadow-orange-500/20 hover:scale-[1.02] active:scale-95 transition-all text-center"
                        >
                            {step === steps.length - 1 ? "Start Over" : "Next Step"}
                        </button>
                    </div>

                    <div className="mt-8 flex gap-2">
                        {steps.map((_, i) => (
                            <div key={i} className={`h-1 flex-1 rounded-full transition-all duration-500 ${i === step ? 'bg-orange-500' : 'bg-gray-200'}`} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};
