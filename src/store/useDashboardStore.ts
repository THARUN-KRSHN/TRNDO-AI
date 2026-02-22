import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface Trend {
    id: string;
    keyword: string;
    anchorVelocity: number;
    localVelocity: number;
    state: 'rising' | 'saturated' | 'fading';
}

export interface Order {
    id: string;
    customer: string;
    item: string;
    quantity: number | null;
    phone: string | null;
    amount: number | null;
    status: 'pending' | 'in_progress' | 'completed';
    raw_items?: any[];
}

export interface UserProfile {
    name: string;
    email: string;
    phone: string;
    businessName: string;
    businessAddress: string;
    businessGst: string;
    defaultUpiId: string;
    category: string;
    location: string;
    logo?: string;
}

export interface PosterConfig {
    template: number;
    bgColor: string;
    textColor: string;
}

export interface Notification {
    id: string;
    title: string;
    message: string;
    time: string;
    type: 'trend' | 'order' | 'info' | 'invoice';
    data?: any;
    read?: boolean;
}

export type DashboardTab = 'overview' | 'orders' | 'trends' | 'settings';

interface DashboardState {
    trends: Trend[];
    orders: Order[];
    selectedTrend: Trend | null;
    selectedOrder: Order | null;
    isDrawerOpen: boolean;
    isInvoiceOpen: boolean;
    user: UserProfile | null;
    activeTab: DashboardTab;
    posterConfig: PosterConfig;
    notifications: Notification[];
    isSyncingTrends: boolean;
    lastOccasion: string | null;
    setTrends: (trends: Trend[]) => void;
    setOrders: (orders: Order[]) => void;
    setSelectedTrend: (trend: Trend | null) => void;
    setSelectedOrder: (order: Order | null) => void;
    setDrawerOpen: (isOpen: boolean) => void;
    setInvoiceOpen: (isOpen: boolean) => void;
    addNotification: (notification: Omit<Notification, 'id' | 'time'>) => void;
    clearNotifications: () => void;
    updateOrder: (orderId: string, updates: Partial<Order>) => void;
    addOrder: (order: Order) => void;
    deleteOrder: (orderId: string) => void;
    setUser: (user: UserProfile | null) => void;
    setActiveTab: (tab: DashboardTab) => void;
    setPosterConfig: (config: Partial<PosterConfig>) => void;
    fetchTrends: (filters?: { occasion?: string, location?: string, timeframe?: string }) => Promise<void>;
    logout: () => void;
}

const INITIAL_TRENDS: Trend[] = [
    { id: '1', keyword: "Lotus Biscoff Shake", anchorVelocity: 87, localVelocity: 32, state: 'rising' },
    { id: '2', keyword: "Oversized Linen", anchorVelocity: 92, localVelocity: 88, state: 'saturated' },
    { id: '3', keyword: "Vintage Film Cam", anchorVelocity: 45, localVelocity: 72, state: 'fading' },
];

const INITIAL_ORDERS: Order[] = [
    { id: '1', customer: "Rahul", item: "Al-Fahm Mandhi", quantity: 2, phone: "9876543210", amount: 450, status: 'in_progress' },
    { id: '2', customer: "Anjali", item: "Korean Buns", quantity: null, phone: null, amount: null, status: 'pending' },
    { id: '3', customer: "Kevin", item: "Cold Brew", quantity: 5, phone: "9000012345", amount: 750, status: 'in_progress' },
];

export const useDashboardStore = create<DashboardState>()(
    persist(
        (set, get) => ({
            trends: INITIAL_TRENDS,
            orders: [],
            selectedTrend: null,
            selectedOrder: null,
            isDrawerOpen: false,
            isInvoiceOpen: false,
            user: null,
            activeTab: 'overview',
            posterConfig: {
                template: 1,
                bgColor: '#000000',
                textColor: '#FFFFFF'
            },
            isSyncingTrends: false,
            lastOccasion: null,
            notifications: [],
            setTrends: (trends) => set({ trends }),
            setOrders: (orders) => set({ orders }),
            setSelectedTrend: (trend) => set({ selectedTrend: trend, isDrawerOpen: !!trend }),
            setSelectedOrder: (order) => set({ selectedOrder: order, isInvoiceOpen: !!order }),
            setDrawerOpen: (isOpen) => set({ isDrawerOpen: isOpen }),
            setInvoiceOpen: (isOpen) => set({ isInvoiceOpen: isOpen }),
            addNotification: (n) => set((state) => ({
                notifications: [
                    {
                        ...n,
                        id: Math.random().toString(36).substr(2, 9),
                        time: 'Just now',
                        read: false
                    },
                    ...state.notifications
                ].slice(0, 10) // Keep last 10
            })),
            clearNotifications: () => set({ notifications: [] }),
            updateOrder: (orderId, updates) => set((state) => ({
                orders: state.orders.map((o) => o.id === orderId ? { ...o, ...updates } : o)
            })),
            addOrder: (order) => set((state) => {
                const exists = state.orders.some(o => o.id === order.id);
                if (exists) return state;
                return { orders: [order, ...state.orders] };
            }),
            deleteOrder: (orderId: string) => {
                console.log('Deleting order:', orderId);
                set((state) => ({
                    orders: state.orders.filter((o) => String(o.id) !== String(orderId)),
                    selectedOrder: state.selectedOrder?.id === orderId ? null : state.selectedOrder
                }));
            },
            setUser: (user) => set({ user }),
            setActiveTab: (tab) => set({ activeTab: tab }),
            setPosterConfig: (config) => set((state) => ({
                posterConfig: { ...state.posterConfig, ...config }
            })),
            fetchTrends: async (filters) => {
                const state = get() as DashboardState;
                const derivedOccasion = filters?.occasion ||
                    (state.user ? `I produce goods and services for ${state.user.businessName} in ${state.user.location}` : "I produce goods and services for small scale bakery / pastery shops in thrissur");

                const derivedLocation = filters?.location || 'IN-KL';
                const derivedTimeframe = filters?.timeframe || 'now 7-d';

                const cacheKey = `${derivedOccasion}-${derivedLocation}-${derivedTimeframe}`;

                // Caching: Skip if same filters and trends already exist
                if (state.lastOccasion === cacheKey && state.trends.length > 0) {
                    console.log("Using cached trends for:", cacheKey);
                    return;
                }

                set({ isSyncingTrends: true });
                try {
                    const response = await fetch('/api/trends', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            occasion: derivedOccasion,
                            location: derivedLocation,
                            timeframe: derivedTimeframe
                        })
                    });
                    const data = await response.json();

                    if (data.results) {
                        const newTrends: Trend[] = Object.entries(data.results).map(([keyword, score], index) => {
                            const val = Number(score);
                            let trendState: 'rising' | 'saturated' | 'fading' = 'saturated';
                            if (val > 50) trendState = 'rising';
                            else if (val < 10) trendState = 'fading';

                            return {
                                id: `api-${index}-${Date.now()}`,
                                keyword,
                                anchorVelocity: val,
                                localVelocity: val,
                                state: trendState
                            };
                        });
                        set({ trends: newTrends, lastOccasion: cacheKey });
                    } else if (data.error) {
                        throw new Error(data.error);
                    }
                } catch (error: any) {
                    console.error('Failed to fetch trends:', error);
                } finally {
                    set({ isSyncingTrends: false });
                }
            },
            logout: () => set({ user: null, activeTab: 'overview' }),
        }),
        {
            name: 'trndo-dashboard-storage',
            storage: createJSONStorage(() => localStorage),
            partialize: (state) => ({
                user: state.user,
                trends: state.trends,
                orders: state.orders,
                activeTab: state.activeTab,
                posterConfig: state.posterConfig,
                lastOccasion: state.lastOccasion,
                notifications: state.notifications,
            }),
        }
    )
);
