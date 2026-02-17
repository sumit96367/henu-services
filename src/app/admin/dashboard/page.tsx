"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    LayoutDashboard,
    Briefcase,
    Users,
    CreditCard,
    FileText,
    MessageSquare,
    Package,
    Search,
    TrendingUp,
    IndianRupee,
    Clock,
    Calendar,
    CheckCircle2,
    ArrowRight,
    ArrowUpRight,
    Plus,
    BarChart3
} from "lucide-react";
import Link from "next/link";
import { AdminStats } from "@/types/admin";

export default function AdminDashboardPage() {
    const [stats, setStats] = useState<AdminStats | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await fetch("/api/admin/stats");
                const data = await response.json();
                if (data.success) {
                    setStats(data.stats);
                }
            } catch (error) {
                console.error("Error fetching dashboard stats:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    const navCards = [
        {
            title: "Service Requests",
            description: "View and manage client inquiries",
            icon: <Briefcase className="w-6 h-6" />,
            href: "/admin/service-requests",
            color: "from-cyan-500 to-blue-500",
            shadow: "shadow-cyan-500/20"
        },
        {
            title: "Enrollments",
            description: "Career development applications",
            icon: <Users className="w-6 h-6" />,
            href: "/admin/enrollments",
            color: "from-purple-500 to-indigo-500",
            shadow: "shadow-purple-500/20"
        },
        {
            title: "Payments",
            description: "Financial ledger and revenue",
            icon: <CreditCard className="w-6 h-6" />,
            href: "/admin/payments",
            color: "from-emerald-500 to-teal-500",
            shadow: "shadow-emerald-500/20"
        },
        {
            title: "Invoices",
            description: "Digital document archives",
            icon: <FileText className="w-6 h-6" />,
            href: "/admin/invoices",
            color: "from-amber-500 to-orange-500",
            shadow: "shadow-amber-500/20"
        },
        {
            title: "Support Queries",
            description: "Messages and contact tickets",
            icon: <MessageSquare className="w-6 h-6" />,
            href: "/admin/queries",
            color: "from-rose-500 to-pink-500",
            shadow: "shadow-rose-500/20"
        },
        {
            title: "Asset Catalog",
            description: "Manage portfolio and software",
            icon: <Package className="w-6 h-6" />,
            href: "/admin/manage-software",
            color: "from-blue-500 to-indigo-600",
            shadow: "shadow-blue-500/20"
        },
    ];

    return (
        <div className="admin-page-container">
            {/* Page Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="page-header"
                style={{ marginBottom: "48px" }}
            >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "20px" }}>
                    <div>
                        <h1
                            style={{
                                fontWeight: "900",
                                marginBottom: "8px",
                                background: "linear-gradient(to right, #06b6d4, #10b981)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                                backgroundClip: "text",
                                letterSpacing: "-0.04em",
                                fontSize: "clamp(2.5rem, 5vw, 4rem)"
                            }}
                        >
                            Executive Intelligence
                        </h1>
                        <p style={{ color: "#555", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.2em", fontSize: "0.85rem" }}>
                            Admin Oversight & Platform Surveillance
                        </p>
                    </div>

                    <div className="current-date-badge" style={{
                        backgroundColor: "rgba(255, 255, 255, 0.03)",
                        border: "1px solid rgba(255, 255, 255, 0.08)",
                        padding: "12px 24px",
                        borderRadius: "16px",
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                        backdropFilter: "blur(10px)"
                    }}>
                        <Calendar className="w-5 h-5 text-cyan-500" />
                        <span style={{ color: "#fff", fontWeight: "800", fontSize: "0.95rem" }}>
                            {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                        </span>
                    </div>
                </div>
            </motion.div>

            {/* Quick Metrics Grid */}
            <div className="metrics-grid" style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: "24px",
                marginBottom: "48px"
            }}>
                <MetricCard
                    label="Aggregate Revenue"
                    value={`₹${stats?.totalRevenue?.toLocaleString() || "0"}`}
                    icon={<IndianRupee className="w-6 h-6" />}
                    color="#10b981"
                    loading={loading}
                />
                <MetricCard
                    label="Platform Enrollments"
                    value={stats?.totalEnrollments?.toString() || "0"}
                    icon={<Users className="w-6 h-6" />}
                    color="#06b6d4"
                    loading={loading}
                />
                <MetricCard
                    label="Pending Actions"
                    value={stats?.pendingPayments?.toString() || "0"}
                    icon={<Clock className="w-6 h-6" />}
                    color="#f59e0b"
                    loading={loading}
                />
                <MetricCard
                    label="Network Velocity"
                    value="+12.4%"
                    icon={<TrendingUp className="w-6 h-6" />}
                    color="#8b5cf6"
                    loading={loading}
                    isTrend
                />
            </div>

            {/* Navigation Grid */}
            <div style={{ marginBottom: "48px" }}>
                <h2 style={{ color: "#444", fontSize: "0.85rem", fontWeight: "900", textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: "24px" }}>
                    Operational Nodes
                </h2>
                <div className="nav-grid" style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
                    gap: "24px"
                }}>
                    {navCards.map((card, idx) => (
                        <motion.div
                            key={card.title}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                        >
                            <Link href={card.href} style={{ textDecoration: "none" }}>
                                <div
                                    className={`nav-card ${card.shadow}`}
                                    style={{
                                        position: "relative",
                                        padding: "40px",
                                        backgroundColor: "rgba(255, 255, 255, 0.02)",
                                        border: "1px solid rgba(255, 255, 255, 0.08)",
                                        borderRadius: "32px",
                                        height: "100%",
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "space-between",
                                        transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                                        backdropFilter: "blur(20px)",
                                        overflow: "hidden"
                                    }}
                                >
                                    {/* Icon with gradient background */}
                                    <div style={{
                                        width: "60px",
                                        height: "60px",
                                        borderRadius: "20px",
                                        background: `linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.02))`,
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        marginBottom: "32px",
                                        border: "1px solid rgba(255, 255, 255, 0.1)",
                                        color: "#fff"
                                    }}>
                                        {card.icon}
                                    </div>

                                    <div>
                                        <h3 style={{ fontSize: "1.75rem", fontWeight: "900", color: "#fff", marginBottom: "12px", letterSpacing: "-0.02em" }}>
                                            {card.title}
                                        </h3>
                                        <p style={{ color: "#777", fontSize: "1rem", fontWeight: "500", lineHeight: "1.6", marginBottom: "24px" }}>
                                            {card.description}
                                        </p>
                                    </div>

                                    <div style={{ display: "flex", alignItems: "center", gap: "10px", color: "#666", fontWeight: "800", textTransform: "uppercase", fontSize: "0.75rem", letterSpacing: "0.1em" }}>
                                        Establish Connection <ArrowRight className="w-4 h-4" />
                                    </div>

                                    {/* Hover Decorator */}
                                    <div className="hover-glow" style={{
                                        position: "absolute",
                                        top: 0,
                                        right: 0,
                                        width: "150px",
                                        height: "150px",
                                        background: `radial-gradient(circle at top right, rgba(6, 182, 212, 0.15), transparent 70%)`,
                                        opacity: 0,
                                        transition: "opacity 0.4s ease"
                                    }} />
                                </div>
                            </Link>
                        </motion.div>
                    ))}

                    {/* Add Software Placeholder */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                    >
                        <Link href="/admin/software" style={{ textDecoration: "none" }}>
                            <div
                                className="nav-card create-card"
                                style={{
                                    border: "2px dashed rgba(255, 255, 255, 0.1)",
                                    borderRadius: "32px",
                                    padding: "40px",
                                    height: "100%",
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    transition: "all 0.4s ease",
                                    backgroundColor: "rgba(255, 255, 255, 0.01)"
                                }}
                            >
                                <div style={{
                                    width: "60px",
                                    height: "60px",
                                    borderRadius: "50%",
                                    backgroundColor: "rgba(255, 255, 255, 0.05)",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    marginBottom: "20px",
                                    color: "#555"
                                }}>
                                    <Plus className="w-8 h-8" />
                                </div>
                                <h3 style={{ fontSize: "1.25rem", fontWeight: "900", color: "#555", textTransform: "uppercase", letterSpacing: "0.1em" }}>Deploy New Asset</h3>
                            </div>
                        </Link>
                    </motion.div>
                </div>
            </div>

            {/* Footer Section */}
            <div style={{
                marginTop: "80px",
                paddingTop: "40px",
                borderTop: "1px solid rgba(255, 255, 255, 0.05)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "20px"
            }}>
                <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                    <div style={{ width: "12px", height: "12px", borderRadius: "50%", backgroundColor: "#10b981", boxShadow: "0 0 12px #10b981" }} />
                    <span style={{ color: "#555", fontSize: "0.85rem", fontWeight: "800", textTransform: "uppercase", letterSpacing: "0.1em" }}>System Operations Nominal</span>
                </div>
                <div style={{ color: "#333", fontSize: "0.85rem", fontWeight: "700" }}>
                    Secure Access Endpoint: {typeof window !== 'undefined' ? window.location.hostname : 'henuos.com'}
                </div>
            </div>

            <style jsx>{`
                .nav-card:hover {
                    background-color: rgba(255, 255, 255, 0.05) !important;
                    border-color: rgba(255, 255, 255, 0.2) !important;
                    transform: translateY(-8px);
                }
                .nav-card:hover .hover-glow {
                    opacity: 1 !important;
                }
                .nav-card:hover h3 {
                    color: #06b6d4 !important;
                }
                .create-card:hover {
                    border-color: #06b6d4 !important;
                    background-color: rgba(6, 182, 212, 0.02) !important;
                }
                .create-card:hover h3 {
                    color: #06b6d4 !important;
                }
                @media (max-width: 768px) {
                    .nav-grid {
                        grid-template-columns: 1fr !important;
                    }
                }
            `}</style>
        </div>
    );
}

function MetricCard({ label, value, icon, color, loading, isTrend }: { label: string, value: string, icon: any, color: string, loading: boolean, isTrend?: boolean }) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            style={{
                backgroundColor: "rgba(255, 255, 255, 0.02)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                borderRadius: "24px",
                padding: "32px",
                position: "relative",
                overflow: "hidden",
                backdropFilter: "blur(20px)"
            }}
        >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "20px" }}>
                <div style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "14px",
                    backgroundColor: `${color}15`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: color,
                    border: `1px solid ${color}30`
                }}>
                    {icon}
                </div>
                {isTrend && (
                    <div style={{
                        padding: "4px 12px",
                        backgroundColor: "rgba(16, 185, 129, 0.1)",
                        borderRadius: "20px",
                        color: "#10b981",
                        fontSize: "0.75rem",
                        fontWeight: "900",
                        display: "flex",
                        alignItems: "center",
                        gap: "4px"
                    }}>
                        <TrendingUp className="w-3 h-3" /> Growth
                    </div>
                )}
            </div>

            <div>
                <p style={{ color: "#555", fontSize: "0.7rem", fontWeight: "900", textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: "8px" }}>
                    {label}
                </p>
                {loading ? (
                    <div style={{ height: "40px", backgroundColor: "rgba(255, 255, 255, 0.05)", borderRadius: "8px", width: "120px", animation: "pulse 1.5s infinite" }} />
                ) : (
                    <h3 style={{ fontSize: "2.25rem", fontWeight: "900", color: "#fff", letterSpacing: "-0.03em" }}>{value}</h3>
                )}
            </div>

            {/* Background Decorator */}
            <div style={{
                position: "absolute",
                bottom: "-20px",
                right: "-20px",
                fontSize: "100px",
                opacity: 0.02,
                transform: "rotate(-15deg)",
                pointerEvents: "none"
            }}>
                {icon}
            </div>

            <style jsx>{`
                @keyframes pulse {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.5; }
                }
            `}</style>
        </motion.div>
    );
}

