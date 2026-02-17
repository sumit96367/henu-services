"use client";

import { useState, useEffect, Suspense } from "react";
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
    Save,
    ArrowRight,
    ExternalLink
} from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

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

function AdminOrdersContent() {
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

    const getStatusStyle = (statusColor: string) => {
        switch (statusColor) {
            case "green":
            case "emerald":
                return { bg: "rgba(16, 185, 129, 0.1)", text: "#10b981", border: "rgba(16, 185, 129, 0.3)" };
            case "cyan":
                return { bg: "rgba(6, 182, 212, 0.1)", text: "#06b6d4", border: "rgba(6, 182, 212, 0.3)" };
            case "rose":
                return { bg: "rgba(244, 63, 94, 0.1)", text: "#f43f5e", border: "rgba(244, 63, 94, 0.3)" };
            default:
                return { bg: "rgba(245, 158, 11, 0.1)", text: "#f59e0b", border: "rgba(245, 158, 11, 0.3)" };
        }
    };

    return (
        <div className="admin-page-container">
            <div className="max-w-full mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="page-header"
                    style={{ marginBottom: "40px" }}
                >
                    <div className="header-top" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "8px" }}>
                        <div>
                            <Link href="/admin/dashboard" className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors mb-4 text-sm font-bold uppercase tracking-wider">
                                <ChevronLeft size={16} /> Dashboard
                            </Link>
                            <h1 className="page-title" style={{ fontWeight: "900", background: "linear-gradient(to right, #06b6d4, #3b82f6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", letterSpacing: "-0.03em", textTransform: "uppercase", fontSize: "clamp(2rem, 4vw, 3.5rem)" }}>
                                {filterType === 'internship_enrollment' ? 'Internship ' : filterType === 'service_inquiry' ? 'Service ' : 'Order '}
                                <span className="text-white">Management</span>
                            </h1>
                            <p className="page-subtitle" style={{ color: "#555", fontWeight: "700", textTransform: "uppercase", fontSize: "0.75rem", letterSpacing: "0.2em", marginTop: "8px" }}>
                                {filterType === 'internship_enrollment' ? 'Career Development Applications' : 'Full Transaction Lifecycle Control'}
                            </p>
                        </div>

                        <div className="search-container" style={{ position: "relative", marginBottom: "8px" }}>
                            <Search className="search-icon" style={{ position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)", color: "#444" }} size={18} />
                            <input
                                type="text"
                                placeholder="Universal Search..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="search-input"
                                style={{
                                    backgroundColor: "rgba(255, 255, 255, 0.03)",
                                    border: "1px solid rgba(255, 255, 255, 0.1)",
                                    borderRadius: "16px",
                                    padding: "14px 20px 14px 48px",
                                    color: "#fff",
                                    fontSize: "0.9rem",
                                    fontWeight: "600",
                                    outline: "none",
                                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                                    width: "320px"
                                }}
                            />
                        </div>
                    </div>
                </motion.div>

                {/* Orders List */}
                <div
                    className="table-card"
                    style={{
                        backgroundColor: "rgba(255, 255, 255, 0.01)",
                        border: "1px solid rgba(255, 255, 255, 0.05)",
                        borderRadius: "32px",
                        overflow: "hidden",
                        backdropFilter: "blur(20px)"
                    }}
                >
                    {isLoading ? (
                        <div className="loading-state" style={{ padding: "100px 24px", textAlign: "center" }}>
                            <Loader2 className="w-12 h-12 text-cyan-500 animate-spin mx-auto mb-6" />
                            <p className="text-gray-500 font-black uppercase tracking-widest text-xs">Accessing Orders...</p>
                        </div>
                    ) : filteredOrders.length > 0 ? (
                        <div className="table-wrapper" style={{ overflowX: "auto", WebkitOverflowScrolling: "touch" }}>
                            <table className="w-full text-left" style={{ borderCollapse: "separate", borderSpacing: "0" }}>
                                <thead>
                                    <tr style={{ backgroundColor: "rgba(255, 255, 255, 0.03)" }}>
                                        <th style={tableHeaderStyle}>Reference / Client</th>
                                        <th style={tableHeaderStyle}>Transaction Logic</th>
                                        <th style={tableHeaderStyle}>Capital / Timeline</th>
                                        <th style={tableHeaderStyle} className="text-center">Lifecycle</th>
                                        <th style={tableHeaderStyle} className="text-right">Control</th>
                                    </tr>
                                </thead>
                                <tbody style={{ borderTop: "1px solid rgba(255, 255, 255, 0.03)" }}>
                                    {filteredOrders.map((order) => {
                                        const statusStyle = getStatusStyle(order.statusColor);
                                        return (
                                            <tr key={order.id} className="table-row" style={{ transition: "all 0.3s ease", borderBottom: "1px solid rgba(255, 255, 255, 0.03)" }}>
                                                <td style={tableCellStyle}>
                                                    <div className="flex items-center gap-4">
                                                        <div className="avatar" style={{ width: "48px", height: "48px", borderRadius: "14px", backgroundColor: "rgba(6, 182, 212, 0.1)", display: "flex", alignItems: "center", justifyContent: "center", color: "#06b6d4", fontWeight: "900", fontSize: "1.2rem", border: "1px solid rgba(6, 182, 212, 0.2)" }}>
                                                            {order.fullName?.charAt(0)}
                                                        </div>
                                                        <div>
                                                            <div className="flex items-center gap-2 mb-1">
                                                                <div className="client-name" style={{ fontWeight: "900", color: "#fff", textTransform: "uppercase", fontSize: "0.9rem", letterSpacing: "0.02em" }}>{order.fullName}</div>
                                                                <span className="user-type-badge" style={{ padding: "2px 6px", borderRadius: "6px", fontSize: "10px", fontWeight: "900", textTransform: "uppercase", border: "1px solid", ...(order.userType === 'company' ? { backgroundColor: 'rgba(168, 85, 247, 0.1)', color: '#a855f7', borderColor: 'rgba(168, 85, 247, 0.2)' } : { backgroundColor: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6', borderColor: 'rgba(59, 130, 246, 0.2)' }) }}>
                                                                    {order.userType || 'Personal'}
                                                                </span>
                                                            </div>
                                                            <div className="order-id" style={{ fontSize: "10px", color: "#555", fontWeight: "700", fontFamily: "monospace" }}>
                                                                {order.orderNumber || order.id}
                                                            </div>
                                                            {order.companyName && (
                                                                <div className="company-tag" style={{ fontSize: "9px", color: "#06b6d4", fontWeight: "800", textTransform: "uppercase", marginTop: "4px", backgroundColor: "rgba(6, 182, 212, 0.05)", padding: "2px 6px", borderRadius: "4px", width: "fit-content" }}>
                                                                    CORPORATE: {order.companyName}
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </td>
                                                <td style={tableCellStyle}>
                                                    <div className="domain-text" style={{ fontWeight: "800", color: "#ccc", textTransform: "uppercase", fontSize: "0.8rem", marginBottom: "4px" }}>{order.domain}</div>
                                                    <div className="sub-details" style={{ fontSize: "10px", color: "#555", fontWeight: "600", textTransform: "uppercase" }}>{order.subDomain} • {order.plan}</div>
                                                    {order.message && (
                                                        <div className="order-message" style={{ fontSize: "10px", color: "#06b6d4", fontStyle: "italic", opacity: 0.6, marginTop: "6px", maxWidth: "200px" }} title={order.message}>
                                                            &quot;{order.message}&quot;
                                                        </div>
                                                    )}
                                                </td>
                                                <td style={tableCellStyle}>
                                                    <div className="amount-text" style={{ fontWeight: "900", color: "#fff", fontSize: "1rem" }}>₹{order.amount.toLocaleString()}</div>
                                                    <div className="date-text" style={{ fontSize: "10px", color: "#555", fontWeight: "700", textTransform: "uppercase", marginTop: "4px" }}>{order.createdAt.toLocaleDateString('en-GB')}</div>
                                                </td>
                                                <td style={tableCellStyle} className="text-center">
                                                    <span className="status-badge" style={{
                                                        padding: "6px 14px",
                                                        borderRadius: "10px",
                                                        fontSize: "9px",
                                                        fontWeight: "900",
                                                        textTransform: "uppercase",
                                                        letterSpacing: "0.1em",
                                                        border: "1px solid",
                                                        backgroundColor: statusStyle.bg,
                                                        color: statusStyle.text,
                                                        borderColor: statusStyle.border
                                                    }}>
                                                        {order.status}
                                                    </span>
                                                </td>
                                                <td style={tableCellStyle} className="text-right">
                                                    <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: "10px" }}>
                                                        <select
                                                            disabled={updatingId === order.id}
                                                            onChange={(e) => handleUpdateStatus(order.id, e.target.value)}
                                                            value={order.status}
                                                            className="status-select"
                                                            style={{
                                                                backgroundColor: "rgba(0, 0, 0, 0.3)",
                                                                border: "1px solid rgba(255, 255, 255, 0.1)",
                                                                borderRadius: "10px",
                                                                padding: "8px 12px",
                                                                fontSize: "10px",
                                                                fontWeight: "800",
                                                                textTransform: "uppercase",
                                                                color: "#888",
                                                                outline: "none",
                                                                cursor: "pointer",
                                                                transition: "all 0.3s ease"
                                                            }}
                                                        >
                                                            <option value="New Inquiry">New Inquiry</option>
                                                            <option value="Processing">Processing</option>
                                                            <option value="Shipped">Shipped</option>
                                                            <option value="Completed">Completed</option>
                                                            <option value="Cancelled">Cancelled</option>
                                                            <option value="Failed">Failed</option>
                                                        </select>
                                                        {updatingId === order.id && <Loader2 className="w-4 h-4 text-cyan-500 animate-spin" />}
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="empty-state" style={{ padding: "120px 24px", textAlign: "center" }}>
                            <Package className="w-16 h-16 text-gray-800 mx-auto mb-6 opacity-20" />
                            <h3 className="text-2xl font-black text-white mb-2 uppercase tracking-tight">Zero Records Found</h3>
                            <p className="text-gray-600 text-sm font-bold uppercase tracking-widest italic">No matches for &quot;{searchTerm}&quot;</p>
                        </div>
                    )}
                </div>
            </div>

            <style jsx>{`
                .admin-page-container {
                    padding: 0;
                    animation: fadeIn 0.8s ease-out;
                }

                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }

                .status-select:hover {
                    background-color: rgba(255, 255, 255, 0.05) !important;
                    border-color: rgba(6, 182, 212, 0.3) !important;
                    color: #fff !important;
                }

                .table-row:hover {
                    background-color: rgba(6, 182, 212, 0.02) !important;
                }

                @media (max-width: 1024px) {
                    .search-input { width: 280px !important; }
                }

                @media (max-width: 768px) {
                    .header-top { flex-direction: column !important; align-items: stretch !important; }
                    .search-container { margin-top: 32px; width: 100%; }
                    .search-input { width: 100% !important; }
                    .table-card { borderRadius: 24px !important; }
                }
            `}</style>
        </div>
    );
}

const tableHeaderStyle: React.CSSProperties = {
    padding: "24px 32px",
    fontSize: "10px",
    fontWeight: "900",
    textTransform: "uppercase",
    color: "#444",
    letterSpacing: "0.15em",
    borderBottom: "1px solid rgba(255, 255, 255, 0.05)"
};

const tableCellStyle: React.CSSProperties = {
    padding: "32px",
    whiteSpace: "nowrap",
    verticalAlign: "middle"
};

export default function AdminOrdersPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-[#050505] flex items-center justify-center">
                <Loader2 className="w-10 h-10 text-cyan-500 animate-spin" />
            </div>
        }>
            <AdminOrdersContent />
        </Suspense>
    );
}

