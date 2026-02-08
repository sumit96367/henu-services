"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { db } from "@/lib/firebase";
import { collection, query, orderBy, getDocs, doc, updateDoc, serverTimestamp } from "firebase/firestore";
import {
    ChevronLeft,
    Search,
    Filter,
    Package,
    User,
    Mail,
    Calendar,
    CreditCard,
    CheckCircle2,
    Clock,
    AlertCircle,
    Loader2,
    Save
} from "lucide-react";
import Link from "next/link";

interface Order {
    id: string;
    orderNumber?: string;
    fullName: string;
    email: string;
    domain: string;
    subDomain: string;
    plan: string;
    amount: number;
    status: string;
    statusColor: string;
    createdAt: Date;
    paymentMethod: string;
    message?: string;
    userType?: string;
    companyName?: string;
    type?: string;
}

export default function AdminOrdersPage() {
    const searchParams = useSearchParams();
    const filterType = searchParams.get("type"); // 'internship_enrollment' or 'service_inquiry'

    const [orders, setOrders] = useState<Order[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [updatingId, setUpdatingId] = useState<string | null>(null);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        setIsLoading(true);
        try {
            const ordersRef = collection(db, "orders");
            const q = query(ordersRef, orderBy("createdAt", "desc"));
            const querySnapshot = await getDocs(q);

            const fetchedOrders: Order[] = [];
            querySnapshot.forEach((doc) => {
                const data = doc.data();
                fetchedOrders.push({
                    id: doc.id,
                    ...data,
                    createdAt: data.createdAt?.toDate() || new Date()
                } as Order);
            });
            setOrders(fetchedOrders);
        } catch (error) {
            console.error("Error fetching orders:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleUpdateStatus = async (orderId: string, newStatus: string) => {
        setUpdatingId(orderId);

        let statusColor = "amber";
        if (newStatus === "Completed" || newStatus === "Delivered") statusColor = "green";
        if (newStatus === "Shipped") statusColor = "emerald";
        if (newStatus === "Processing") statusColor = "cyan";
        if (newStatus === "Failed" || newStatus === "Cancelled") statusColor = "rose";

        try {
            const response = await fetch("/api/admin/orders/update", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ orderId, status: newStatus, statusColor })
            });

            if (response.ok) {
                // Update local state
                setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus, statusColor } : o));
            } else {
                alert("Failed to update status");
            }
        } catch (error) {
            console.error("Error updating status:", error);
        } finally {
            setUpdatingId(null);
        }
    };

    const filteredOrders = orders.filter(order => {
        const matchesSearch =
            order.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.orderNumber?.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesFilter = !filterType || order.type === filterType;

        return matchesSearch && matchesFilter;
    });

    return (
        <div className="min-h-screen bg-[#050505] text-white p-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                    <div>
                        <Link href="/admin/dashboard" className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors mb-4 text-sm font-bold uppercase tracking-wider">
                            <ChevronLeft size={16} /> Dashboard
                        </Link>
                        <h1 className="text-4xl font-black text-white italic tracking-tight uppercase">
                            {filterType === 'internship_enrollment' ? 'Internship ' : filterType === 'service_inquiry' ? 'Service ' : 'Order '}
                            <span className="text-cyan-500">{filterType ? 'Enrollments' : 'Management'}</span>
                        </h1>
                        <p className="text-gray-500 mt-1 uppercase text-xs font-bold tracking-[0.2em]">
                            {filterType === 'internship_enrollment' ? 'Manage career development applications' : 'Track and manage all user orders and inquiries'}
                        </p>
                    </div>

                    <div className="flex gap-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                            <input
                                type="text"
                                placeholder="Search orders..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-cyan-500/50 transition-all w-full md:w-80"
                            />
                        </div>
                    </div>
                </div>

                {/* Orders List */}
                <div className="bg-white/[0.02] border border-white/5 rounded-3xl overflow-hidden shadow-2xl">
                    {isLoading ? (
                        <div className="p-20 flex flex-col items-center justify-center gap-4">
                            <Loader2 className="w-10 h-10 text-cyan-500 animate-spin" />
                            <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">Loading Orders...</p>
                        </div>
                    ) : filteredOrders.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="bg-white/[0.02] border-b border-white/5">
                                        <th className="px-6 py-5 text-xs font-black uppercase tracking-widest text-gray-500">Order/User</th>
                                        <th className="px-6 py-5 text-xs font-black uppercase tracking-widest text-gray-500">Details</th>
                                        <th className="px-6 py-5 text-xs font-black uppercase tracking-widest text-gray-500">Amount/Date</th>
                                        <th className="px-6 py-5 text-xs font-black uppercase tracking-widest text-gray-500 text-center">Status</th>
                                        <th className="px-6 py-5 text-xs font-black uppercase tracking-widest text-gray-500 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {filteredOrders.map((order) => (
                                        <tr key={order.id} className="hover:bg-white/[0.01] transition-colors group">
                                            <td className="px-6 py-6">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-10 h-10 rounded-full bg-cyan-500/10 flex items-center justify-center text-cyan-400 font-bold shrink-0">
                                                        {order.fullName?.charAt(0)}
                                                    </div>
                                                    <div>
                                                        <div className="flex items-center gap-2">
                                                            <div className="text-sm font-bold text-white group-hover:text-cyan-400 transition-colors uppercase">{order.fullName}</div>
                                                            <span className={`px-1.5 py-0.5 rounded text-[8px] font-black uppercase tracking-widest border ${order.userType === 'company'
                                                                ? 'bg-purple-500/10 text-purple-400 border-purple-500/20'
                                                                : 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                                                                }`}>
                                                                {order.userType || 'Personal'}
                                                            </span>
                                                        </div>
                                                        <div className="text-xs text-gray-500 mt-1 font-mono tracking-tighter">
                                                            {order.orderNumber || order.id}
                                                        </div>
                                                        {order.companyName && (
                                                            <div className="text-[10px] text-cyan-500/80 font-bold uppercase mt-1">
                                                                🏛️ {order.companyName}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-6 max-w-xs">
                                                <div className="text-xs font-bold text-gray-300 uppercase">{order.domain}</div>
                                                <div className="text-[10px] text-gray-500 mt-1 uppercase tracking-wider truncate mb-1">{order.subDomain} • {order.plan}</div>
                                                {order.message && (
                                                    <div className="text-[10px] text-cyan-400/60 italic truncate max-w-[200px]" title={order.message}>
                                                        &quot;{order.message}&quot;
                                                    </div>
                                                )}
                                            </td>
                                            <td className="px-6 py-6 font-mono">
                                                <div className="text-sm font-bold text-white">₹{order.amount}</div>
                                                <div className="text-[10px] text-gray-500 mt-1 uppercase">{order.createdAt.toLocaleDateString()}</div>
                                            </td>
                                            <td className="px-6 py-6 text-center">
                                                <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border transition-all
                                                    ${order.statusColor === 'green' ? 'bg-green-500/10 text-green-400 border-green-500/20' :
                                                        order.statusColor === 'emerald' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                                                            order.statusColor === 'cyan' ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20' :
                                                                order.statusColor === 'rose' ? 'bg-rose-500/10 text-rose-400 border-rose-500/20' :
                                                                    'bg-amber-500/10 text-amber-400 border-amber-500/20'}
                                                `}>
                                                    {order.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-6 text-right">
                                                <select
                                                    disabled={updatingId === order.id}
                                                    onChange={(e) => handleUpdateStatus(order.id, e.target.value)}
                                                    value={order.status}
                                                    className="bg-black/50 border border-white/10 rounded-lg px-2 py-2 text-[10px] font-bold uppercase tracking-wider text-gray-400 focus:border-cyan-500 outline-none transition-all cursor-pointer hover:bg-black/80"
                                                >
                                                    <option value="New Inquiry">New Inquiry</option>
                                                    <option value="Processing">Processing</option>
                                                    <option value="Shipped">Shipped</option>
                                                    <option value="Completed">Completed</option>
                                                    <option value="Cancelled">Cancelled</option>
                                                    <option value="Failed">Failed</option>
                                                </select>
                                                {updatingId === order.id && <Loader2 className="inline-block ml-2 w-3 h-3 text-cyan-500 animate-spin" />}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="p-20 text-center">
                            <Package className="w-12 h-12 text-gray-700 mx-auto mb-4 opacity-30" />
                            <h3 className="text-lg font-bold text-white mb-1">No orders found</h3>
                            <p className="text-gray-500 text-sm italic">No matching results for &quot;{searchTerm}&quot;</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
