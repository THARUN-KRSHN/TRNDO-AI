"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, QrCode, ClipboardCheck, Send, Phone, User, Package, IndianRupee } from 'lucide-react';
import { useDashboardStore } from '@/store/useDashboardStore';
import { GlowButton, StatusBadge } from './Common';

interface InvoiceForm {
    item: string;
    variant: string;
    quantity: string;
    customer: string;
    phone: string;
    amount: string;
}

export const InvoicePanel = () => {
    const { isInvoiceOpen, setInvoiceOpen, selectedOrder, updateOrder, addNotification } = useDashboardStore();
    const [form, setForm] = useState<InvoiceForm>({
        item: '',
        variant: 'Standard',
        quantity: '',
        customer: '',
        phone: '',
        amount: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isDone, setIsDone] = useState(false);

    useEffect(() => {
        if (selectedOrder) {
            setForm({
                item: selectedOrder.item || '',
                variant: 'Standard',
                quantity: selectedOrder.quantity?.toString() || '',
                customer: selectedOrder.customer || '',
                phone: selectedOrder.phone || '',
                amount: selectedOrder.amount?.toString() || ''
            });
            setIsDone(false);
        }
    }, [selectedOrder]);

    if (!selectedOrder) return null;

    const user = useDashboardStore((state: any) => state.user);

    const handleSubmit = async () => {
        if (!user) {
            addNotification({
                title: 'Error',
                message: 'Please complete your business profile first.',
                type: 'info'
            });
            return;
        }

        setIsSubmitting(true);
        try {
            const response = await fetch('https://invoice-makeaton-production.up.railway.app/api/generate-invoice-direct', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    items: [{
                        item: form.item,
                        quantity: parseInt(form.quantity) || 1,
                        price: parseFloat(form.amount) || 0
                    }],
                    upi_id: user.defaultUpiId || "merchant@upi",
                    customer_name: form.customer,
                    customer_phone: form.phone,
                    payee_name: user.businessName
                })
            });

            if (response.ok) {
                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', `invoice_${form.customer}.pdf`);
                document.body.appendChild(link);
                link.click();
                link.parentNode?.removeChild(link);

                setIsDone(true);
                updateOrder(selectedOrder.id, {
                    status: 'completed',
                    amount: parseFloat(form.amount),
                    phone: form.phone,
                    quantity: parseInt(form.quantity)
                });

                addNotification({
                    title: 'Invoice Generated',
                    message: `Invoice for ${form.customer} has been created and downloaded.`,
                    type: 'invoice'
                });

                setTimeout(() => setInvoiceOpen(false), 2000);
            } else {
                throw new Error('Failed to generate invoice');
            }
        } catch (error) {
            console.error('Invoice generation failed:', error);
            addNotification({
                title: 'Error',
                message: 'Failed to generate invoice. Please check your connection.',
                type: 'info'
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <AnimatePresence>
            {isInvoiceOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setInvoiceOpen(false)}
                        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
                    />

                    {/* Panel */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: "spring", stiffness: 200, damping: 25 }}
                        className="fixed top-0 right-0 h-screen w-full lg:w-[480px] bg-white border-l border-black/5 z-50 shadow-2xl overflow-y-auto"
                    >
                        <div className="p-8">
                            <div className="flex justify-between items-center mb-12">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-xl bg-yellow-100 text-yellow-600">
                                        <QrCode size={20} />
                                    </div>
                                    <div>
                                        <span className="text-[10px] font-bold-extended uppercase tracking-widest text-black/40 italic">Locker Engine</span>
                                        <h2 className="text-xl font-bold-extended uppercase italic tracking-tighter">Draft Invoice</h2>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setInvoiceOpen(false)}
                                    className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            <div className="space-y-10">
                                <div className="space-y-6">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold-extended uppercase tracking-widest text-black/30 px-1 italic">Customer Name</label>
                                            <div className="relative">
                                                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-black/20" />
                                                <input
                                                    type="text"
                                                    value={form.customer}
                                                    onChange={(e) => setForm({ ...form, customer: e.target.value })}
                                                    className="w-full pl-10 pr-4 py-4 rounded-2xl bg-gray-50 border-none focus:ring-1 focus:ring-black transition-all font-bold-extended text-xs uppercase italic"
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold-extended uppercase tracking-widest text-black/30 px-1 italic">WhatsApp #</label>
                                            <div className="relative">
                                                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-black/20" />
                                                <input
                                                    type="text"
                                                    value={form.phone}
                                                    placeholder="+91..."
                                                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                                                    className="w-full pl-10 pr-4 py-4 rounded-2xl bg-gray-50 border-none focus:ring-1 focus:ring-black transition-all font-bold-extended text-xs uppercase italic"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold-extended uppercase tracking-widest text-black/30 px-1 italic">Item Detected</label>
                                        <div className="relative">
                                            <Package className="absolute left-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-black/20" />
                                            <input
                                                type="text"
                                                value={form.item}
                                                onChange={(e) => setForm({ ...form, item: e.target.value })}
                                                className="w-full pl-10 pr-4 py-4 rounded-2xl bg-gray-50 border-none focus:ring-1 focus:ring-black transition-all font-bold-extended text-xs uppercase italic"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold-extended uppercase tracking-widest text-black/30 px-1 italic">Quantity</label>
                                            <input
                                                type="number"
                                                value={form.quantity}
                                                onChange={(e) => setForm({ ...form, quantity: e.target.value })}
                                                className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-none focus:ring-1 focus:ring-black transition-all font-bold-extended text-xs uppercase italic"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold-extended uppercase tracking-widest text-black/30 px-1 italic">Amount (INR)</label>
                                            <div className="relative">
                                                <IndianRupee className="absolute left-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-black/20" />
                                                <input
                                                    type="number"
                                                    value={form.amount}
                                                    onChange={(e) => setForm({ ...form, amount: e.target.value })}
                                                    className="w-full pl-10 pr-4 py-4 rounded-2xl bg-gray-50 border-none focus:ring-1 focus:ring-black transition-all font-bold-extended text-xs uppercase italic"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* QR Placeholder */}
                                <div className="p-10 rounded-[3rem] bg-gray-50 border border-black/5 flex flex-col items-center justify-center text-center space-y-4">
                                    <div className="w-32 h-32 rounded-3xl bg-white shadow-xl flex items-center justify-center">
                                        <QrCode size={64} className="text-black/5" />
                                    </div>
                                    <p className="text-[10px] font-bold-extended text-black/40 uppercase tracking-widest italic leading-relaxed">
                                        Razorpay Smart QR <br /> will be embedded here.
                                    </p>
                                </div>

                                <div className="pt-8 border-t border-black/5">
                                    <motion.button
                                        whileHover={{ scale: isDone ? 1 : 1.02 }}
                                        whileTap={{ scale: isDone ? 1 : 0.98 }}
                                        onClick={handleSubmit}
                                        disabled={isSubmitting || isDone}
                                        className={`w-full py-6 rounded-full font-bold-extended uppercase italic text-sm tracking-widest transition-all overflow-hidden relative ${isDone ? 'bg-emerald-500 text-white' : 'bg-black text-white hover:bg-black/90'
                                            }`}
                                    >
                                        <AnimatePresence mode="wait">
                                            {isSubmitting ? (
                                                <motion.div
                                                    key="loading"
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: -10 }}
                                                    className="flex items-center justify-center gap-2"
                                                >
                                                    <Activity size={16} className="animate-spin" />
                                                    <span>Generating...</span>
                                                </motion.div>
                                            ) : isDone ? (
                                                <motion.div
                                                    key="done"
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    className="flex items-center justify-center gap-2"
                                                >
                                                    <ClipboardCheck size={18} />
                                                    <span>Sent to WhatsApp!</span>
                                                </motion.div>
                                            ) : (
                                                <motion.div
                                                    key="idle"
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    className="flex items-center justify-center gap-2"
                                                >
                                                    <Send size={16} />
                                                    <span>Complete & Send</span>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </motion.button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

const Activity = ({ size, className }: { size: number, className?: string }) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
    </svg>
);
