"use client";
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Clock, CheckCircle2, MoreVertical, Trash2 } from 'lucide-react';
import { useDashboardStore, Order } from '@/store/useDashboardStore';
import { ProgressBar, StatusBadge } from './Common';

const OrderCard = ({ order }: { order: Order }) => {
    const setSelectedOrder = useDashboardStore((state: any) => state.setSelectedOrder);
    const deleteOrder = useDashboardStore((state: any) => state.deleteOrder);

    const handleDelete = (e: React.MouseEvent) => {
        e.stopPropagation();
        console.log('Delete button clicked for:', order.id);
        deleteOrder(order.id);
    };

    const getProgress = (o: Order) => {
        let p = 25;
        if (o.item && o.quantity) p = 50;
        if (o.phone) p = 75;
        if (o.status === 'completed') p = 100;
        return p;
    };

    const progress = getProgress(order);

    return (
        <motion.div
            whileHover={{ scale: 1.02 }}
            onClick={() => setSelectedOrder(order)}
            className="p-6 rounded-3xl bg-white shadow-2xl shadow-black/5 border border-black/5 mb-4 cursor-pointer group"
        >
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h4 className="text-lg font-bold-extended uppercase italic tracking-tighter leading-none mb-1">
                        {order.customer}
                    </h4>
                    <span className="text-[10px] font-thin-extended uppercase tracking-widest text-black/30">
                        {order.status === 'completed' ? 'Delivered' : 'Awaiting Details'}
                    </span>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={handleDelete}
                        className="p-2 rounded-lg bg-red-50 text-red-400 opacity-40 hover:opacity-100 group-hover:opacity-100 transition-all hover:bg-red-500 hover:text-white"
                        title="Delete Order"
                    >
                        <Trash2 size={14} />
                    </button>
                    {order.status === 'completed' ? (
                        <CheckCircle2 size={16} className="text-emerald-500" />
                    ) : (
                        <div className="p-2 rounded-lg bg-gray-50 text-black/20 group-hover:text-black transition-colors">
                            <MoreVertical size={14} />
                        </div>
                    )}
                </div>
            </div>

            <div className="flex items-start gap-3 mb-6 p-4 rounded-2xl bg-[#F8F8F8]">
                <MessageSquare size={14} className="text-black/20 mt-1" />
                <p className="text-xs font-thin-extended italic text-black/60 leading-relaxed">
                    Order contains: <span className="text-black font-bold-extended not-italic">{order.item}</span>
                </p>
            </div>

            <div className="space-y-3">
                <div className="flex justify-between items-center text-[8px] font-bold-extended uppercase tracking-widest">
                    <span className="text-black/40">Order Readiness</span>
                    <span className={progress === 100 ? 'text-emerald-500' : 'text-black'}>{progress}%</span>
                </div>
                <ProgressBar progress={progress} />
            </div>
        </motion.div>
    );
};

export const OrderTimeline = () => {
    const orders = useDashboardStore((state: any) => state.orders);

    React.useEffect(() => {
        console.log('Orders updated. Count:', orders.length);
    }, [orders]);
    const setOrders = useDashboardStore((state: any) => state.setOrders);

    const handleClearAll = () => {
        if (window.confirm('Clear all orders?')) {
            setOrders([]);
        }
    };

    return (
        <div className="h-full flex flex-col">
            <div className="flex justify-between items-center mb-10">
                <div className="flex items-center gap-3">
                    <div className="p-3 rounded-2xl bg-black text-white">
                        <MessageSquare size={18} />
                    </div>
                    <div>
                        <span className="text-[10px] font-bold-extended uppercase tracking-widest text-black/40 italic">WhatsApp CRM</span>
                        <h2 className="text-xl font-bold-extended uppercase italic tracking-tighter">Order Feed</h2>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <button
                        onClick={handleClearAll}
                        className="text-[10px] font-bold-extended uppercase tracking-widest text-black/20 hover:text-red-500 transition-colors italic"
                    >
                        Clear All
                    </button>
                    <div className="flex items-center gap-2 text-emerald-500">
                        <span className="text-[8px] font-bold-extended uppercase tracking-widest italic animate-pulse">Syncing...</span>
                    </div>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto pr-4 custom-scrollbar">
                <AnimatePresence mode="popLayout">
                    {orders.map((order: Order) => (
                        <OrderCard key={order.id} order={order} />
                    ))}
                </AnimatePresence>
            </div>
        </div>
    );
};
