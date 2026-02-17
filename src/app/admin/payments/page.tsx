"use client";

import { useState, useEffect, Suspense } from "react";
import type { PaymentRecord } from "@/types/admin";
import {
    ChevronLeft,
    Search,
    Filter,
    CreditCard,
    User,
    Mail,
    Calendar,
    CheckCircle2,
    Clock,
    AlertCircle,
    Loader2,
    IndianRupee,
    ArrowRight,
    ExternalLink
} from "lucide-react";
import Link from "next/link";

export default function PaymentsPage() {
    const [payments, setPayments] = useState<PaymentRecord[]>([]);
    const [filteredPayments, setFilteredPayments] = useState<PaymentRecord[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Filter states
    const [selectedStatus, setSelectedStatus] = useState("");
    const [selectedMethod, setSelectedMethod] = useState("");
    const [searchQuery, setSearchQuery] = useState("");

    // Modal state
    const [selectedPayment, setSelectedPayment] = useState<PaymentRecord | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Fetch payments
    useEffect(() => {
        fetchPayments();
    }, []);

    const fetchPayments = async () => {
        try {
            setLoading(true);
            const response = await fetch("/api/admin/payments");

            if (!response.ok) {
                throw new Error("Failed to fetch payments");
            }

            const data = await response.json();
            setPayments(data.payments || []);
            setFilteredPayments(data.payments || []);
        } catch (err) {
            setError("Failed to load payments. Please try again.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    // Apply filters
    useEffect(() => {
        let filtered = [...payments];

        // Status filter
        if (selectedStatus) {
            filtered = filtered.filter((p) => p.status === selectedStatus);
        }

        // Payment method filter
        if (selectedMethod) {
            filtered = filtered.filter((p) => p.paymentMethod === selectedMethod);
        }

        // Search filter (transaction ID or email)
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter(
                (p) =>
                    p.razorpayPaymentId?.toLowerCase().includes(query) ||
                    p.orderId.toLowerCase().includes(query) ||
                    p.email.toLowerCase().includes(query) ||
                    p.fullName.toLowerCase().includes(query)
            );
        }

        setFilteredPayments(filtered);
    }, [selectedStatus, selectedMethod, searchQuery, payments]);

    const clearFilters = () => {
        setSelectedStatus("");
        setSelectedMethod("");
        setSearchQuery("");
    };

    const openModal = (payment: PaymentRecord) => {
        setSelectedPayment(payment);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setTimeout(() => setSelectedPayment(null), 300);
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("en-IN", {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    const formatStatus = (status: string) => {
        return status.charAt(0).toUpperCase() + status.slice(1);
    };

    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case "paid":
                return { bg: "rgba(16, 185, 129, 0.1)", text: "#10b981", border: "rgba(16, 185, 129, 0.3)" };
            case "pending":
                return { bg: "rgba(245, 158, 11, 0.1)", text: "#f59e0b", border: "rgba(245, 158, 11, 0.3)" };
            case "failed":
                return { bg: "rgba(239, 68, 68, 0.1)", text: "#ef4444", border: "rgba(239, 68, 68, 0.3)" };
            default:
                return { bg: "rgba(156, 163, 175, 0.1)", text: "#9ca3af", border: "rgba(156, 163, 175, 0.3)" };
        }
    };

    return (
        <div className="admin-page-container">
            {/* Header */}
            <div className="page-header" style={{ marginBottom: "40px" }}>
                <div className="header-top" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "8px" }}>
                    <div className="header-left">
                        <Link href="/admin/dashboard" className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors mb-4 text-sm font-bold uppercase tracking-wider">
                            <ChevronLeft size={16} /> Dashboard
                        </Link>
                        <h1
                            style={{
                                fontWeight: "900",
                                background: "linear-gradient(to right, #10b981, #34d399)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                                backgroundClip: "text",
                                letterSpacing: "-0.02em"
                            }}
                            className="page-title"
                        >
                            Payment Ledger
                        </h1>
                    </div>
                    <div className="header-right" style={{ textAlign: "right", display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "10px" }}>
                        <div className="metric-badge" style={{
                            backgroundColor: "rgba(16, 185, 129, 0.1)",
                            border: "1px solid rgba(16, 185, 129, 0.3)",
                            padding: "8px 16px",
                            borderRadius: "14px",
                            display: "flex",
                            alignItems: "center",
                            gap: "8px"
                        }}>
                            <IndianRupee size={16} className="text-emerald-500" />
                            <span style={{ color: "#10b981", fontSize: "0.9rem", fontWeight: "800" }}>
                                {loading ? "..." : `₹${payments.filter(p => p.status === 'paid').reduce((acc, curr) => acc + curr.amount, 0).toLocaleString()}`}
                            </span>
                            <span style={{ color: "rgba(16, 185, 129, 0.6)", fontSize: "0.7rem", fontWeight: "700", textTransform: "uppercase" }}>Total Collected</span>
                        </div>
                        <p style={{ color: "#555", margin: 0, fontWeight: "700", fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                            {loading ? "Syncing..." : `${filteredPayments.length} Transactions Found`}
                        </p>
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div
                className="filters-card"
                style={{
                    backgroundColor: "rgba(255, 255, 255, 0.02)",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                    borderRadius: "24px",
                    padding: "24px",
                    marginBottom: "32px",
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                    gap: "20px",
                    backdropFilter: "blur(20px)"
                }}
            >
                <div className="filter-group">
                    <label className="filter-label">Search Transaction</label>
                    <div style={{ position: "relative" }}>
                        <Search style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: "#444" }} size={18} />
                        <input
                            type="text"
                            placeholder="ID, Name or Email..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="filter-input"
                            style={{ paddingLeft: "44px" }}
                        />
                    </div>
                </div>

                <div className="filter-group">
                    <label className="filter-label">Status</label>
                    <select
                        value={selectedStatus}
                        onChange={(e) => setSelectedStatus(e.target.value)}
                        className="filter-select"
                    >
                        <option value="">All Status</option>
                        <option value="paid">Paid</option>
                        <option value="pending">Pending</option>
                        <option value="failed">Failed</option>
                    </select>
                </div>

                <div className="filter-group">
                    <label className="filter-label">Method</label>
                    <select
                        value={selectedMethod}
                        onChange={(e) => setSelectedMethod(e.target.value)}
                        className="filter-select"
                    >
                        <option value="">All Methods</option>
                        <option value="card">Card</option>
                        <option value="upi">UPI</option>
                        <option value="netbanking">Net Banking</option>
                    </select>
                </div>

                <div className="filter-group" style={{ display: "flex", alignItems: "flex-end" }}>
                    <button
                        onClick={clearFilters}
                        className="reset-btn"
                    >
                        Reset Filters
                    </button>
                </div>
            </div>

            {/* Error */}
            {error && (
                <div style={{ padding: "20px", backgroundColor: "rgba(239, 68, 68, 0.1)", border: "1px solid rgba(239, 68, 68, 0.2)", borderRadius: "16px", color: "#ef4444", marginBottom: "32px", display: "flex", alignItems: "center", gap: "12px" }}>
                    <AlertCircle size={20} />
                    <span style={{ fontWeight: "600" }}>{error}</span>
                </div>
            )}

            {/* Table */}
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
                <div style={{ overflowX: "auto" }} className="scrollbar-hide">
                    <table style={{ width: "100%", borderCollapse: "separate", borderSpacing: "0" }}>
                        <thead>
                            <tr style={{ backgroundColor: "rgba(16, 185, 129, 0.03)" }}>
                                <th style={thStyle}>Transaction</th>
                                <th style={thStyle}>Client</th>
                                <th style={thStyle}>Amount</th>
                                <th style={thStyle}>Method</th>
                                <th style={thStyle}>Status</th>
                                <th style={thStyle}>Timeline</th>
                                <th style={thStyle}></th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                Array.from({ length: 6 }).map((_, i) => (
                                    <tr key={i}>
                                        <td colSpan={7} style={{ padding: "32px", textAlign: "center" }}>
                                            <div className="loading-shimmer" style={{ height: "40px", backgroundColor: "rgba(255, 255, 255, 0.02)", borderRadius: "12px" }}></div>
                                        </td>
                                    </tr>
                                ))
                            ) : filteredPayments.length === 0 ? (
                                <tr>
                                    <td colSpan={7} style={{ padding: "80px", textAlign: "center" }}>
                                        <CreditCard size={48} style={{ margin: "0 auto 16px", color: "#222" }} />
                                        <p style={{ color: "#555", fontWeight: "700", fontSize: "1.1rem" }}>No transactions found matching your criteria</p>
                                    </td>
                                </tr>
                            ) : (
                                filteredPayments.map((payment, idx) => {
                                    const statusStyle = getStatusColor(payment.status);
                                    return (
                                        <tr
                                            key={payment.id}
                                            onClick={() => openModal(payment)}
                                            className="table-row"
                                            style={{ cursor: "pointer", transition: "all 0.2s" }}
                                        >
                                            <td style={tdStyle}>
                                                <code style={{ color: "#10b981", fontSize: "0.75rem", fontWeight: "900", letterSpacing: "0.05em" }}>
                                                    {payment.razorpayPaymentId || payment.orderId.substring(0, 12)}
                                                </code>
                                            </td>
                                            <td style={tdStyle}>
                                                <div style={{ fontWeight: "800", color: "#fff" }}>{payment.fullName}</div>
                                                <div style={{ fontSize: "0.75rem", color: "#555", fontWeight: "600" }}>{payment.email}</div>
                                            </td>
                                            <td style={tdStyle}>
                                                <span style={{ fontWeight: "900", color: "#10b981", fontSize: "1.1rem" }}>
                                                    ₹{payment.amount.toLocaleString()}
                                                </span>
                                            </td>
                                            <td style={tdStyle}>
                                                <span style={{
                                                    fontSize: "0.7rem",
                                                    fontWeight: "900",
                                                    textTransform: "uppercase",
                                                    color: "#888",
                                                    backgroundColor: "rgba(255, 255, 255, 0.04)",
                                                    padding: "4px 10px",
                                                    borderRadius: "8px",
                                                    border: "1px solid rgba(255, 255, 255, 0.05)"
                                                }}>
                                                    {payment.paymentMethod}
                                                </span>
                                            </td>
                                            <td style={tdStyle}>
                                                <span style={{
                                                    padding: "6px 14px",
                                                    borderRadius: "12px",
                                                    fontSize: "0.7rem",
                                                    fontWeight: "900",
                                                    textTransform: "uppercase",
                                                    letterSpacing: "0.05em",
                                                    backgroundColor: statusStyle.bg,
                                                    color: statusStyle.text,
                                                    border: `1px solid ${statusStyle.border}`
                                                }}>
                                                    {payment.status}
                                                </span>
                                            </td>
                                            <td style={tdStyle}>
                                                <div style={{ fontSize: "0.85rem", color: "#ccc", fontWeight: "600" }}>{formatDate(payment.timestamp)}</div>
                                            </td>
                                            <td style={tdStyle}>
                                                <ArrowRight size={18} className="text-gray-800" />
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal */}
            {isModalOpen && selectedPayment && (
                <div
                    onClick={closeModal}
                    className="modal-overlay"
                    style={{
                        position: "fixed",
                        inset: 0,
                        backgroundColor: "rgba(0, 0, 0, 0.9)",
                        backdropFilter: "blur(20px)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        zIndex: 2000,
                        padding: "20px"
                    }}
                >
                    <div
                        onClick={e => e.stopPropagation()}
                        className="modal-card"
                        style={{
                            backgroundColor: "#050505",
                            border: "1px solid rgba(255, 255, 255, 0.1)",
                            borderRadius: "40px",
                            padding: "48px",
                            maxWidth: "700px",
                            width: "100%",
                            maxHeight: "90vh",
                            overflowY: "auto",
                            boxShadow: "0 40px 100px rgba(0, 0, 0, 0.8)"
                        }}
                    >
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "40px" }}>
                            <div>
                                <h2 style={{ fontSize: "2.5rem", fontWeight: "900", color: "#fff", marginBottom: "8px", letterSpacing: "-0.03em" }}>Detail Analysis</h2>
                                <p style={{ color: "#555", fontSize: "0.75rem", fontWeight: "900", textTransform: "uppercase", letterSpacing: "0.15em" }}>REF: {selectedPayment.id}</p>
                            </div>
                            <button onClick={closeModal} style={{ width: "48px", height: "48px", borderRadius: "16px", backgroundColor: "rgba(255, 255, 255, 0.05)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center" }} className="hover:bg-red-500/20 hover:text-red-500 transition-all">✕</button>
                        </div>

                        <div style={{ display: "grid", gap: "16px" }}>
                            <DetailRow label="Client Name" value={selectedPayment.fullName} />
                            <DetailRow label="Email Identity" value={selectedPayment.email} />
                            <DetailRow label="Invoice Hash" value={selectedPayment.invoiceNumber} />
                            <DetailRow label="Settlement Amount" value={<span style={{ color: "#10b981", fontWeight: "900" }}>₹{selectedPayment.amount.toLocaleString()}</span>} />
                            <DetailRow label="Payment Gateway" value={selectedPayment.paymentMethod.toUpperCase()} />
                            <DetailRow label="Provider Record" value={<code style={{ color: "#10b981" }}>{selectedPayment.razorpayPaymentId || "DIRECT_BANK"}</code>} />
                            <DetailRow label="Transaction Cluster" value={selectedPayment.orderId} />
                            <DetailRow label="Linked Enrollment" value={selectedPayment.enrollmentId} />
                            <DetailRow label="Current Lifecycle" value={
                                <span style={{
                                    padding: "6px 16px",
                                    borderRadius: "10px",
                                    fontSize: "0.75rem",
                                    fontWeight: "900",
                                    textTransform: "uppercase",
                                    backgroundColor: getStatusColor(selectedPayment.status).bg,
                                    color: getStatusColor(selectedPayment.status).text,
                                    border: `1px solid ${getStatusColor(selectedPayment.status).border}`
                                }}>
                                    {selectedPayment.status}
                                </span>
                            } />
                            <DetailRow label="Confirmation Timestamp" value={formatDate(selectedPayment.timestamp)} />
                        </div>

                        <div style={{ marginTop: "40px", paddingTop: "40px", borderTop: "1px solid rgba(255, 255, 255, 0.05)" }}>
                            <button
                                onClick={closeModal}
                                style={{
                                    width: "100%",
                                    padding: "20px",
                                    backgroundColor: "#10b981",
                                    color: "#000",
                                    borderRadius: "20px",
                                    fontWeight: "900",
                                    fontSize: "1rem",
                                    textTransform: "uppercase",
                                    letterSpacing: "0.1em",
                                    transition: "all 0.3s ease",
                                    boxShadow: "0 15px 40px rgba(16, 185, 129, 0.3)"
                                }}
                                className="hover:scale-[1.02] active:scale-95"
                            >
                                Close Analysis
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <style jsx>{`
                .admin-page-container {
                    padding: 0;
                    animation: fadeIn 0.8s ease-out;
                }

                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }

                .page-title {
                    font-size: 3.5rem;
                }

                .filter-label {
                    display: block;
                    font-size: 0.75rem;
                    fontWeight: 900;
                    color: #444;
                    marginBottom: 10px;
                    textTransform: uppercase;
                    letterSpacing: 0.1em;
                }

                .filter-input, .filter-select {
                    width: 100%;
                    padding: 14px 16px;
                    background-color: rgba(255, 255, 255, 0.04);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    border-radius: 14px;
                    color: #fff;
                    font-size: 0.95rem;
                    outline: none;
                    transition: all 0.3s ease;
                }

                .filter-input:focus, .filter-select:focus {
                    border-color: rgba(16, 185, 129, 0.4);
                    background-color: rgba(255, 255, 255, 0.06);
                }

                .reset-btn {
                    width: 100%;
                    padding: 14px 16px;
                    background-color: rgba(16, 185, 129, 0.08);
                    border: 1px solid rgba(16, 185, 129, 0.2);
                    border-radius: 14px;
                    color: #10b981;
                    font-weight: 800;
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }

                .reset-btn:hover {
                    background-color: rgba(16, 185, 129, 0.15);
                }

                .table-row:hover {
                    background-color: rgba(16, 185, 129, 0.03) !important;
                }

                .scrollbar-hide::-webkit-scrollbar { display: none; }
                .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }

                @media (max-width: 1024px) {
                    .page-title { font-size: 2.75rem; }
                    .header-top { flex-direction: column !important; align-items: flex-start !important; gap: 20px; }
                    .header-right { align-items: flex-start !important; text-align: left !important; }
                }

                @media (max-width: 768px) {
                    .page-title { font-size: 2.25rem; }
                    .filters-card { grid-template-columns: 1fr !important; }
                    .modal-card { padding: 32px 24px !important; border-radius: 32px !important; }
                    .modal-card h2 { font-size: 2rem !important; }
                }

                @media (max-width: 480px) {
                    .page-title { font-size: 1.75rem; }
                }
            `}</style>
        </div>
    );
}

function DetailRow({ label, value }: { label: string; value: React.ReactNode }) {
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                padding: "16px 24px",
                backgroundColor: "rgba(255, 255, 255, 0.02)",
                borderRadius: "16px",
                border: "1px solid rgba(255, 255, 255, 0.05)",
            }}
        >
            <span style={{ color: "#555", fontSize: "0.75rem", fontWeight: "900", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                {label}
            </span>
            <span style={{ color: "#fff", fontSize: "0.9rem", textAlign: "right", maxWidth: "60%", fontWeight: "700" }}>
                {value}
            </span>
        </div>
    );
}

const thStyle: React.CSSProperties = {
    padding: "20px 24px",
    fontSize: "0.7rem",
    fontWeight: "900",
    textTransform: "uppercase",
    letterSpacing: "0.15em",
    color: "#555",
    textAlign: "left",
    whiteSpace: "nowrap"
};

const tdStyle: React.CSSProperties = {
    padding: "24px",
    fontSize: "0.95rem",
    color: "#ccc",
    verticalAlign: "middle"
};
