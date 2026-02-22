"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Mail, Phone, Store, MapPin, Target, ShieldCheck, Sparkles, CreditCard, ChevronRight, Edit3, Save, X, Settings, Shield, Check, Info } from 'lucide-react';
import { useDashboardStore } from '@/store/useDashboardStore';

type SettingsTab = 'main' | 'dna' | 'billing' | 'security';

export const ProfileView = () => {
    const user = useDashboardStore((state: any) => state.user);
    const setUser = useDashboardStore((state: any) => state.setUser);
    const [currentTab, setCurrentTab] = useState<SettingsTab>('main');
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: user?.name || '',
        businessName: user?.businessName || '',
        businessAddress: user?.businessAddress || '',
        businessGst: user?.businessGst || '',
        defaultUpiId: user?.defaultUpiId || '',
        email: user?.email || '',
        phone: user?.phone || '',
        location: user?.location || '',
        category: user?.category || ''
    });

    const handleSave = async () => {
        const updatedUser = { ...user, ...formData };
        setUser(updatedUser);
        setIsEditing(false);

        // Sync to Flask Backend
        try {
            await fetch('http://localhost:5000/api/business-profile', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    business_name: formData.businessName,
                    business_address: formData.businessAddress,
                    business_phone: formData.phone,
                    business_email: formData.email,
                    business_gst: formData.businessGst,
                    default_upi_id: formData.defaultUpiId,
                    payee_name: formData.businessName
                })
            });
        } catch (error) {
            console.error('Failed to sync profile to backend:', error);
        }
    };

    const handleCancel = () => {
        setFormData({
            name: user?.name || '',
            businessName: user?.businessName || '',
            businessAddress: user?.businessAddress || '',
            businessGst: user?.businessGst || '',
            defaultUpiId: user?.defaultUpiId || '',
            email: user?.email || '',
            phone: user?.phone || '',
            location: user?.location || '',
            category: user?.category || ''
        });
        setIsEditing(false);
    };

    return (
        <div className="space-y-12">
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                <div>
                    <span className="text-[10px] font-bold-extended uppercase tracking-widest text-yellow-500 italic mb-2 block">
                        {currentTab === 'main' ? 'Merchant Profile' : `Store / ${currentTab.toUpperCase()}`}
                    </span>
                    <h1 className="text-5xl md:text-7xl font-bold-extended uppercase italic leading-[0.85] tracking-tighter">
                        {currentTab === 'main' ? 'Your\nAccount.' : currentTab === 'dna' ? 'Trend\nDNA.' : currentTab === 'billing' ? 'Billing\nCenter.' : 'Account\nSecurity.'}
                    </h1>
                </div>
                {currentTab !== 'main' && (
                    <button
                        onClick={() => setCurrentTab('main')}
                        className="flex items-center gap-2 text-[10px] font-bold-extended uppercase italic tracking-widest text-black/40 hover:text-black transition-colors"
                    >
                        <ChevronRight className="w-4 h-4 rotate-180" /> Back to Profile
                    </button>
                )}
            </header>

            <AnimatePresence mode="wait">
                {currentTab === 'main' && (
                    <motion.div
                        key="main"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="space-y-12"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Personal Info Card */}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="p-8 rounded-[3.5rem] bg-white border border-black/5 shadow-2xl shadow-black/5 space-y-8 relative group"
                            >
                                <div className="flex justify-between items-start">
                                    <div className="flex items-center gap-6">
                                        <div className="w-20 h-20 rounded-[2rem] bg-black flex items-center justify-center text-white">
                                            <User size={32} />
                                        </div>
                                        <div>
                                            {isEditing ? (
                                                <input
                                                    value={formData.name}
                                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                                    className="text-2xl font-bold-extended uppercase italic tracking-tighter w-full bg-gray-50 rounded-lg px-2 border-none focus:ring-1 focus:ring-black"
                                                />
                                            ) : (
                                                <h3 className="text-2xl font-bold-extended uppercase italic tracking-tighter leading-none mb-2">{user?.name}</h3>
                                            )}
                                            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 w-fit">
                                                <ShieldCheck size={12} />
                                                <span className="text-[8px] font-bold-extended uppercase tracking-widest italic">Verified merchant</span>
                                            </div>
                                        </div>
                                    </div>
                                    <button
                                        onClick={isEditing ? handleSave : () => setIsEditing(true)}
                                        className="p-3 rounded-2xl bg-black text-white hover:scale-110 transition-transform"
                                    >
                                        {isEditing ? <Save size={16} /> : <Edit3 size={16} />}
                                    </button>
                                </div>

                                <div className="space-y-6 pt-8 border-t border-black/5">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-4 text-black/40">
                                            <Mail size={18} />
                                            <span className="text-xs font-bold-extended uppercase italic tracking-widest">Email</span>
                                        </div>
                                        {isEditing ? (
                                            <input
                                                value={formData.email}
                                                onChange={e => setFormData({ ...formData, email: e.target.value })}
                                                className="text-xs font-bold-extended italic bg-gray-50 rounded px-2"
                                            />
                                        ) : (
                                            <span className="text-xs font-bold-extended italic">{user?.email}</span>
                                        )}
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-4 text-black/40">
                                            <Phone size={18} />
                                            <span className="text-xs font-bold-extended uppercase italic tracking-widest">WhatsApp</span>
                                        </div>
                                        {isEditing ? (
                                            <input
                                                value={formData.phone}
                                                onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                                className="text-xs font-bold-extended italic bg-gray-50 rounded px-2"
                                            />
                                        ) : (
                                            <span className="text-xs font-bold-extended italic">{user?.phone}</span>
                                        )}
                                    </div>
                                </div>
                                {isEditing && (
                                    <button onClick={handleCancel} className="absolute -top-4 -right-4 bg-red-500 text-white p-2 rounded-full shadow-lg">
                                        <X size={14} />
                                    </button>
                                )}
                            </motion.div>

                            {/* Business Info Card */}
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.1 }}
                                className="p-8 rounded-[3.5rem] bg-black text-white shadow-2xl shadow-black/20 space-y-8 relative overflow-hidden"
                            >
                                <div className="flex items-center gap-6 relative z-10">
                                    <div className="w-20 h-20 rounded-[2rem] bg-yellow-400 flex items-center justify-center text-black overflow-hidden p-4">
                                        {user?.logo ? (
                                            <img src={user.logo} alt="Business logo" className="w-full h-full object-contain" />
                                        ) : (
                                            <Store size={32} />
                                        )}
                                    </div>
                                    <div className="flex-1">
                                        {isEditing ? (
                                            <input
                                                value={formData.businessName}
                                                onChange={e => setFormData({ ...formData, businessName: e.target.value })}
                                                className="text-2xl font-bold-extended uppercase italic tracking-tighter w-full bg-white/10 rounded-lg px-2 text-white border-none focus:ring-1 focus:ring-yellow-400"
                                            />
                                        ) : (
                                            <h3 className="text-2xl font-bold-extended uppercase italic tracking-tighter leading-none mb-2">{user?.businessName}</h3>
                                        )}
                                        <span className="text-[10px] font-bold-extended uppercase tracking-widest text-white/30 italic">{user?.category}</span>
                                    </div>
                                </div>

                                <div className="space-y-6 pt-8 border-t border-white/10 relative z-10">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-4 text-white/40">
                                            <MapPin size={18} />
                                            <span className="text-xs font-bold-extended uppercase italic tracking-widest">Location</span>
                                        </div>
                                        {isEditing ? (
                                            <input
                                                value={formData.location}
                                                onChange={e => setFormData({ ...formData, location: e.target.value })}
                                                className="text-xs font-bold-extended italic bg-white/10 rounded px-2"
                                            />
                                        ) : (
                                            <span className="text-xs font-bold-extended italic">{user?.location}</span>
                                        )}
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-4 text-white/40">
                                            <Store size={18} />
                                            <span className="text-xs font-bold-extended uppercase italic tracking-widest">Address</span>
                                        </div>
                                        {isEditing ? (
                                            <input
                                                value={formData.businessAddress}
                                                onChange={e => setFormData({ ...formData, businessAddress: e.target.value })}
                                                className="text-xs font-bold-extended italic bg-white/10 rounded px-2"
                                            />
                                        ) : (
                                            <span className="text-xs font-bold-extended italic">{user?.businessAddress}</span>
                                        )}
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-4 text-white/40">
                                            <Shield size={18} />
                                            <span className="text-xs font-bold-extended uppercase italic tracking-widest">GST Number</span>
                                        </div>
                                        {isEditing ? (
                                            <input
                                                value={formData.businessGst}
                                                onChange={e => setFormData({ ...formData, businessGst: e.target.value })}
                                                className="text-xs font-bold-extended italic bg-white/10 rounded px-2"
                                            />
                                        ) : (
                                            <span className="text-xs font-bold-extended italic">{user?.businessGst}</span>
                                        )}
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-4 text-white/40">
                                            <CreditCard size={18} />
                                            <span className="text-xs font-bold-extended uppercase italic tracking-widest">Default UPI</span>
                                        </div>
                                        {isEditing ? (
                                            <input
                                                value={formData.defaultUpiId}
                                                onChange={e => setFormData({ ...formData, defaultUpiId: e.target.value })}
                                                className="text-xs font-bold-extended italic bg-white/10 rounded px-2"
                                            />
                                        ) : (
                                            <span className="text-xs font-bold-extended italic">{user?.defaultUpiId}</span>
                                        )}
                                    </div>
                                </div>
                                <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-400/10 rounded-full blur-[100px]" />
                            </motion.div>

                            {/* Settings Quick Access Grid */}
                            <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-6">
                                <button
                                    onClick={() => setCurrentTab('dna')}
                                    className="p-8 rounded-[2.5rem] bg-purple-50 border border-purple-100 group cursor-pointer hover:scale-[1.02] transition-all text-left"
                                >
                                    <Sparkles className="w-8 h-8 text-purple-500 mb-6" />
                                    <h4 className="text-lg font-bold-extended uppercase italic tracking-tighter mb-2">Trend DNA</h4>
                                    <p className="text-[10px] font-bold-extended uppercase tracking-widest text-purple-900/40 italic">Customize your intelligence pulse.</p>
                                </button>
                                <button
                                    onClick={() => setCurrentTab('billing')}
                                    className="p-8 rounded-[2.5rem] bg-blue-50 border border-blue-100 group cursor-pointer hover:scale-[1.02] transition-all text-left"
                                >
                                    <CreditCard className="w-8 h-8 text-blue-500 mb-6" />
                                    <h4 className="text-lg font-bold-extended uppercase italic tracking-tighter mb-2">Billing</h4>
                                    <p className="text-[10px] font-bold-extended uppercase tracking-widest text-blue-900/40 italic">Manage subscription & invoices.</p>
                                </button>
                                <button
                                    onClick={() => setCurrentTab('security')}
                                    className="p-8 rounded-[2.5rem] bg-orange-50 border border-orange-100 group cursor-pointer hover:scale-[1.02] transition-all text-left"
                                >
                                    <Shield size={18} className="w-8 h-8 text-orange-500 mb-6" />
                                    <h4 className="text-lg font-bold-extended uppercase italic tracking-tighter mb-2">Security</h4>
                                    <p className="text-[10px] font-bold-extended uppercase tracking-widest text-orange-900/40 italic">Passwords & MFA settings.</p>
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}

                {currentTab === 'dna' && (
                    <motion.div
                        key="dna"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="bg-white p-12 rounded-[3.5rem] border border-black/5 shadow-2xl shadow-black/5"
                    >
                        <TrendDNAContent />
                    </motion.div>
                )}

                {currentTab === 'billing' && (
                    <motion.div
                        key="billing"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="bg-white p-12 rounded-[3.5rem] border border-black/5 shadow-2xl shadow-black/5"
                    >
                        <SettingsContent
                            title="Merchant Subscriptions"
                            description="Active Plan: Merchant Pro - Irinjalakuda Region. Next renewal: March 15, 2026."
                            icon={CreditCard}
                            color="text-blue-600"
                        />
                    </motion.div>
                )}

                {currentTab === 'security' && (
                    <motion.div
                        key="security"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="bg-white p-12 rounded-[3.5rem] border border-black/5 shadow-2xl shadow-black/5"
                    >
                        <SettingsContent
                            title="Merchant Guard"
                            description="Ensure your intelligence terminal and merchant ID are protected via two-factor auth."
                            icon={Shield}
                            color="text-orange-600"
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const TrendDNAContent = () => {
    const { posterConfig, setPosterConfig, user } = useDashboardStore();
    const [locked, setLocked] = useState(false);
    const colors = ['#000000', '#FFFFFF', '#F72585', '#4895EF', '#FF9F1C', '#4CC9F0', '#7209B7', '#3F37C9'];

    const templates = [
        { id: 1, img: '/templates/temp1.png', name: 'Elite', style: 'Minimalist Editorial' },
        { id: 2, img: '/templates/temp2.png', name: 'Impact', style: 'High-Contrast Urban' },
        { id: 3, img: '/templates/temp3.png', name: 'Studio', style: 'Premium Commercial' }
    ];

    const handleLock = () => {
        setLocked(true);
        setTimeout(() => setLocked(false), 3000);
    };

    return (
        <div className="space-y-12">
            <div className="flex items-center gap-6">
                <div className="p-4 rounded-3xl bg-purple-50 text-purple-600">
                    <Sparkles size={32} />
                </div>
                <div>
                    <h2 className="text-3xl font-bold-extended uppercase italic tracking-tighter">Poster Framework</h2>
                    <p className="text-sm font-thin-extended italic text-black/40 mt-1 max-w-lg">Define the visual identity for all AI-generated trend posters.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Preview */}
                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold-extended uppercase tracking-widest text-black/30 italic">Live Identity Preview</span>
                        {locked && (
                            <motion.div
                                initial={{ opacity: 0, x: 10 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="flex items-center gap-2 text-emerald-600 text-[10px] font-bold-extended uppercase italic"
                            >
                                <Check size={12} />
                                DNA Configuration Locked
                            </motion.div>
                        )}
                    </div>
                    <div
                        className="aspect-[4/5] rounded-[2.5rem] shadow-2xl overflow-hidden relative transition-all duration-500 border border-black/5"
                        style={{ backgroundColor: posterConfig.bgColor }}
                    >
                        {/* Selected Template Image as Background */}
                        <img
                            src={`/templates/temp${posterConfig.template}.png`}
                            className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-overlay"
                            alt="Template Base"
                        />

                        {/* User Logo - Top Right */}
                        {user?.logo && (
                            <div className="absolute top-8 right-8 w-12 h-12 rounded-xl overflow-hidden bg-white/10 backdrop-blur-md p-2 flex items-center justify-center border border-white/20 z-20">
                                <img src={user.logo} alt="Logo" className="w-full h-full object-contain" />
                            </div>
                        )}

                        <div className="relative z-10 h-full">
                            <PosterTemplate
                                template={posterConfig.template}
                                keyword="Sample Trend"
                                textColor={posterConfig.textColor}
                            />
                        </div>

                        {/* Watermark - Bottom Middle */}
                        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-2 opacity-30 z-20 whitespace-nowrap">
                            <div className="w-3 h-3 rounded bg-white/40" />
                            <span className="text-[8px] font-bold-extended uppercase tracking-widest" style={{ color: posterConfig.textColor }}>TRNDO AI Watermark</span>
                        </div>
                    </div>
                </div>

                {/* Controls */}
                <div className="space-y-10">
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <label className="text-[10px] font-bold-extended uppercase tracking-widest text-black/30 italic">Poster Style Collection</label>
                            <div className="group relative">
                                <Info size={12} className="text-black/20" />
                                <div className="absolute bottom-full left-0 mb-2 w-48 p-3 bg-black text-white text-[8px] font-bold-extended uppercase italic leading-relaxed tracking-widest rounded-xl opacity-0 group-hover:opacity-100 pointer-events-none transition-all z-30">
                                    Selection here defines the structural layout, font positioning, and image composition for the AI Studio.
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-3 gap-3">
                            {templates.map((t) => (
                                <div key={t.id} className="space-y-3">
                                    <button
                                        onClick={() => setPosterConfig({ template: t.id })}
                                        className={`relative aspect-[3/4] rounded-2xl overflow-hidden border-2 transition-all ${posterConfig.template === t.id ? 'border-black scale-[1.02] shadow-xl' : 'border-transparent opacity-40 hover:opacity-100'}`}
                                    >
                                        <img src={t.img} className="w-full h-full object-cover" alt={t.name} />
                                        <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                                            <span className="text-[8px] font-bold-extended uppercase italic text-white tracking-widest">{t.name}</span>
                                        </div>
                                        {posterConfig.template === t.id && (
                                            <div className="absolute top-2 right-2 bg-black text-white p-1 rounded-full">
                                                <Check size={8} />
                                            </div>
                                        )}
                                    </button>
                                    <div className="text-center px-1">
                                        <span className="text-[7px] font-bold-extended uppercase tracking-tighter text-black/40 italic block leading-none">{t.style}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-8 p-8 rounded-[2.5rem] bg-gray-50 border border-black/5">
                        <div className="space-y-4">
                            <label className="text-[10px] font-bold-extended uppercase tracking-widest text-black/30 block italic">Theme Background</label>
                            <div className="flex flex-wrap gap-3">
                                {colors.map(c => (
                                    <button
                                        key={c}
                                        onClick={() => setPosterConfig({ bgColor: c })}
                                        className={`w-10 h-10 rounded-full border-2 transition-all ${posterConfig.bgColor === c ? 'border-black scale-110 shadow-lg' : 'border-transparent'}`}
                                        style={{ backgroundColor: c }}
                                    />
                                ))}
                            </div>
                        </div>
                        <div className="space-y-4">
                            <label className="text-[10px] font-bold-extended uppercase tracking-widest text-black/30 block italic">Typography Accent</label>
                            <div className="flex flex-wrap gap-3">
                                {colors.map(c => (
                                    <button
                                        key={c}
                                        onClick={() => setPosterConfig({ textColor: c })}
                                        className={`w-10 h-10 rounded-full border-2 transition-all ${posterConfig.textColor === c ? 'border-black scale-110 shadow-lg' : 'border-black/5'}`}
                                        style={{ backgroundColor: c }}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={handleLock}
                        disabled={locked}
                        className={`w-full py-5 rounded-2xl font-bold-extended uppercase italic text-sm tracking-widest flex items-center justify-center gap-3 transition-all ${locked
                            ? 'bg-emerald-500 text-white cursor-default'
                            : 'bg-black text-white shadow-xl shadow-black/20 hover:scale-[1.02] active:scale-[0.98]'
                            }`}
                    >
                        {locked ? <Check size={18} /> : <ShieldCheck size={18} />}
                        {locked ? 'DNA Synchronized' : 'Lock Configuration'}
                    </button>
                </div>
            </div>
        </div>
    );
};

const PosterTemplate = ({ template, keyword, textColor }: { template: number; keyword: string; textColor: string }) => {
    switch (template) {
        case 1:
            return (
                <div className="h-full w-full flex flex-col items-center justify-center p-12 text-center" style={{ color: textColor }}>
                    <span className="text-[10px] font-bold-extended uppercase tracking-[0.4em] mb-4 opacity-60 italic">Now Serving</span>
                    <h1 className="text-4xl md:text-5xl font-bold-extended uppercase italic tracking-tighter leading-none mb-6">
                        {keyword}
                    </h1>
                    <div className="w-12 h-px bg-current opacity-20 mb-6" />
                    <p className="text-xs font-thin-extended italic uppercase tracking-widest opacity-60">Best in Town</p>
                </div>
            );
        case 2:
            return (
                <div className="h-full w-full relative p-12 overflow-hidden" style={{ color: textColor }}>
                    <div className="absolute -top-10 -left-10 text-[12rem] font-bold-extended opacity-5 italic select-none">HOT</div>
                    <div className="relative h-full flex flex-col justify-end">
                        <span className="text-xs font-bold-extended uppercase italic mb-4">Exclusive Release</span>
                        <h1 className="text-6xl font-bold-extended uppercase italic tracking-tighter leading-[0.8] mb-12">{keyword}</h1>
                    </div>
                </div>
            );
        case 3:
            return (
                <div className="h-full w-full p-12 flex flex-col justify-between" style={{ color: textColor }}>
                    <div className="flex justify-between items-start">
                        <div className="flex flex-col">
                            <span className="text-[8px] font-bold-extended uppercase tracking-widest opacity-40">Collection</span>
                            <span className="text-[10px] font-bold-extended uppercase italic">2026 / TREND</span>
                        </div>
                        <div className="w-10 h-10 rounded-full border border-current opacity-20 flex items-center justify-center text-[8px] font-bold-extended">NEW</div>
                    </div>
                    <div className="space-y-6">
                        <h1 className="text-4xl font-bold-extended uppercase italic tracking-tighter leading-tight">The {keyword}<br />Experience.</h1>
                        <p className="text-[10px] font-thin-extended italic uppercase tracking-[0.2em] opacity-60">Limited Local Availability</p>
                    </div>
                </div>
            );
        default:
            return null;
    }
};

const SettingsContent = ({ title, description, icon: Icon, color }: any) => (
    <div className="space-y-10">
        <div className="flex items-center gap-6">
            <div className={`p-4 rounded-3xl bg-gray-50 ${color}`}>
                <Icon size={32} />
            </div>
            <div>
                <h2 className="text-3xl font-bold-extended uppercase italic tracking-tighter">{title}</h2>
                <p className="text-sm font-thin-extended italic text-black/40 mt-1 max-w-lg">{description}</p>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 opacity-40 selection:bg-none pointer-events-none">
            {[1, 2, 3, 4].map(i => (
                <div key={i} className="p-6 rounded-3xl border border-dashed border-black/10 flex justify-between items-center">
                    <div className="h-4 w-32 bg-black/5 rounded-full" />
                    <div className="h-6 w-12 bg-black/5 rounded-full" />
                </div>
            ))}
        </div>

        <div className="pt-8 border-t border-black/5 flex justify-end">
            <span className="text-[10px] font-bold-extended uppercase tracking-widest text-black/20 italic">Module development in progress.</span>
        </div>
    </div>
);
