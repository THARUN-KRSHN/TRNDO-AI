import { create } from 'zustand';

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
}

interface DashboardState {
    trends: Trend[];
    orders: Order[];
    selectedTrend: Trend | null;
    selectedOrder: Order | null;
    isDrawerOpen: boolean;
    isInvoiceOpen: boolean;
    setTrends: (trends: Trend[]) => void;
    setOrders: (orders: Order[]) => void;
    setSelectedTrend: (trend: Trend | null) => void;
    setSelectedOrder: (order: Order | null) => void;
    setDrawerOpen: (isOpen: boolean) => void;
    setInvoiceOpen: (isOpen: boolean) => void;
    updateOrder: (orderId: string, updates: Partial<Order>) => void;
}

export const useDashboardStore = create<DashboardState>()((set) => ({
    trends: [
        { id: '1', keyword: "Lotus Biscoff Shake", anchorVelocity: 87, localVelocity: 32, state: 'rising' },
        { id: '2', keyword: "Oversized Linen", anchorVelocity: 92, localVelocity: 88, state: 'saturated' },
        { id: '3', keyword: "Vintage Film Cam", anchorVelocity: 45, localVelocity: 72, state: 'fading' },
    ],
    orders: [
        { id: '1', customer: "Rahul", item: "Al-Fahm Mandhi", quantity: 2, phone: "9876543210", amount: 450, status: 'in_progress' },
        { id: '2', customer: "Anjali", item: "Korean Buns", quantity: null, phone: null, amount: null, status: 'pending' },
        { id: '3', customer: "Kevin", item: "Cold Brew", quantity: 5, phone: "9000012345", amount: 750, status: 'in_progress' },
    ],
    selectedTrend: null,
    selectedOrder: null,
    isDrawerOpen: false,
    isInvoiceOpen: false,
    setTrends: (trends: Trend[]) => set({ trends }),
    setOrders: (orders: Order[]) => set({ orders }),
    setSelectedTrend: (trend: Trend | null) => set({ selectedTrend: trend, isDrawerOpen: !!trend }),
    setSelectedOrder: (order: Order | null) => set({ selectedOrder: order, isInvoiceOpen: !!order }),
    setDrawerOpen: (isOpen: boolean) => set({ isDrawerOpen: isOpen }),
    setInvoiceOpen: (isOpen: boolean) => set({ isInvoiceOpen: isOpen }),
    updateOrder: (orderId: string, updates: Partial<Order>) => set((state: DashboardState) => ({
        orders: state.orders.map((o: Order) => o.id === orderId ? { ...o, ...updates } : o)
    })),
}));
