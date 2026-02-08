"use client";

import { useState, useEffect } from "react";
import type { PaymentRecord } from "@/types/admin";

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
                    p.email.toLowerCase().includes(query)
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
        switch (status) {
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
        <div>
            {/* Page Header */}
            <div style={{ marginBottom: "32px" }}>
                <h1
                    style={{
                        fontSize: "2.5rem",
                        fontWeight: "bold",
                        marginBottom: "8px",
                        background: "linear-gradient(to right, #10b981, #34d399)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                    }}
                >
                    Payment Transactions
                </h1>
                <p style={{ fontSize: "1.125rem", color: "#888" }}>
                    {loading
                        ? "Loading payments..."
                        : `${filteredPayments.length} of ${payments.length} transactions`}
                </p>
            </div>

            {/* Filters Section */}
            <div
                style={{
                    backgroundColor: "rgba(255, 255, 255, 0.03)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    borderRadius: "16px",
                    padding: "24px",
                    marginBottom: "24px",
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                    gap: "16px",
                }}
            >
                {/* Status Filter */}
                <div>
                    <label
                        style={{
                            display: "block",
                            fontSize: "0.875rem",
                            fontWeight: "600",
                            color: "#ccc",
                            marginBottom: "8px",
                        }}
                    >
                        Payment Status
                    </label>
                    <select
                        value={selectedStatus}
                        onChange={(e) => setSelectedStatus(e.target.value)}
                        className="admin-select"
                        style={{
                            width: "100%",
                            padding: "10px 12px",
                            backgroundColor: "rgba(255, 255, 255, 0.05)",
                            border: "1px solid rgba(255, 255, 255, 0.1)",
                            borderRadius: "8px",
                            color: "#fff",
                            fontSize: "0.95rem",
                            outline: "none",
                            cursor: "pointer",
                        }}
                    >
                        <option value="">All Status</option>
                        <option value="paid">Paid</option>
                        <option value="pending">Pending</option>
                        <option value="failed">Failed</option>
                    </select>
                </div>

                {/* Payment Method Filter */}
                <div>
                    <label
                        style={{
                            display: "block",
                            fontSize: "0.875rem",
                            fontWeight: "600",
                            color: "#ccc",
                            marginBottom: "8px",
                        }}
                    >
                        Payment Method
                    </label>
                    <select
                        value={selectedMethod}
                        onChange={(e) => setSelectedMethod(e.target.value)}
                        className="admin-select"
                        style={{
                            width: "100%",
                            padding: "10px 12px",
                            backgroundColor: "rgba(255, 255, 255, 0.05)",
                            border: "1px solid rgba(255, 255, 255, 0.1)",
                            borderRadius: "8px",
                            color: "#fff",
                            fontSize: "0.95rem",
                            outline: "none",
                            cursor: "pointer",
                        }}
                    >
                        <option value="">All Methods</option>
                        <option value="card">Card</option>
                        <option value="upi">UPI</option>
                    </select>
                </div>

                {/* Search */}
                <div>
                    <label
                        style={{
                            display: "block",
                            fontSize: "0.875rem",
                            fontWeight: "600",
                            color: "#ccc",
                            marginBottom: "8px",
                        }}
                    >
                        Search
                    </label>
                    <input
                        type="text"
                        placeholder="Transaction ID or email..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        style={{
                            width: "100%",
                            padding: "10px 12px",
                            backgroundColor: "rgba(255, 255, 255, 0.05)",
                            border: "1px solid rgba(255, 255, 255, 0.1)",
                            borderRadius: "8px",
                            color: "#fff",
                            fontSize: "0.95rem",
                            outline: "none",
                        }}
                    />
                </div>

                {/* Clear Filters */}
                <div style={{ display: "flex", alignItems: "flex-end" }}>
                    <button
                        onClick={clearFilters}
                        style={{
                            width: "100%",
                            padding: "10px 16px",
                            backgroundColor: "rgba(255, 255, 255, 0.05)",
                            border: "1px solid rgba(255, 255, 255, 0.1)",
                            borderRadius: "8px",
                            color: "#10b981",
                            fontSize: "0.95rem",
                            fontWeight: "600",
                            cursor: "pointer",
                            transition: "all 0.2s",
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = "rgba(16, 185, 129, 0.1)";
                            e.currentTarget.style.borderColor = "rgba(16, 185, 129, 0.3)";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.05)";
                            e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.1)";
                        }}
                    >
                        Clear Filters
                    </button>
                </div>
            </div>

            {/* Error State */}
            {error && (
                <div
                    style={{
                        backgroundColor: "rgba(239, 68, 68, 0.1)",
                        border: "1px solid rgba(239, 68, 68, 0.3)",
                        borderRadius: "12px",
                        padding: "16px",
                        marginBottom: "24px",
                        color: "#ef4444",
                    }}
                >
                    {error}
                </div>
            )}

            {/* Table */}
            <div
                style={{
                    backgroundColor: "rgba(255, 255, 255, 0.03)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    borderRadius: "16px",
                    overflow: "hidden",
                }}
            >
                <div style={{ overflowX: "auto" }}>
                    <table
                        style={{
                            width: "100%",
                            borderCollapse: "collapse",
                            fontSize: "0.95rem",
                        }}
                    >
                        <thead>
                            <tr
                                style={{
                                    backgroundColor: "rgba(255, 255, 255, 0.05)",
                                    position: "sticky",
                                    top: 0,
                                    backdropFilter: "blur(10px)",
                                    zIndex: 10,
                                }}
                            >
                                <th style={tableHeaderStyle}>Transaction ID</th>
                                <th style={tableHeaderStyle}>User Name</th>
                                <th style={tableHeaderStyle}>Email</th>
                                <th style={tableHeaderStyle}>Amount</th>
                                <th style={tableHeaderStyle}>Method</th>
                                <th style={tableHeaderStyle}>Status</th>
                                <th style={tableHeaderStyle}>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                // Loading Skeleton
                                Array.from({ length: 5 }).map((_, i) => (
                                    <tr key={i}>
                                        {Array.from({ length: 7 }).map((_, j) => (
                                            <td key={j} style={tableCellStyle}>
                                                <div
                                                    style={{
                                                        height: "20px",
                                                        backgroundColor: "rgba(255, 255, 255, 0.05)",
                                                        borderRadius: "4px",
                                                        animation: "pulse 1.5s ease-in-out infinite",
                                                    }}
                                                />
                                            </td>
                                        ))}
                                    </tr>
                                ))
                            ) : filteredPayments.length === 0 ? (
                                // Empty State
                                <tr>
                                    <td colSpan={7} style={{ ...tableCellStyle, textAlign: "center", padding: "48px" }}>
                                        <div style={{ fontSize: "48px", marginBottom: "16px", opacity: 0.5 }}>
                                            💳
                                        </div>
                                        <p style={{ color: "#888", fontSize: "1.125rem" }}>
                                            No payment transactions found
                                        </p>
                                    </td>
                                </tr>
                            ) : (
                                // Data Rows
                                filteredPayments.map((payment, index) => {
                                    const statusColors = getStatusColor(payment.status);
                                    return (
                                        <tr
                                            key={payment.id}
                                            onClick={() => openModal(payment)}
                                            style={{
                                                cursor: "pointer",
                                                backgroundColor: index % 2 === 0 ? "transparent" : "rgba(255, 255, 255, 0.02)",
                                                transition: "all 0.2s",
                                            }}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.backgroundColor = "rgba(16, 185, 129, 0.05)";
                                                e.currentTarget.style.transform = "scale(1.01)";
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.backgroundColor = index % 2 === 0 ? "transparent" : "rgba(255, 255, 255, 0.02)";
                                                e.currentTarget.style.transform = "scale(1)";
                                            }}
                                        >
                                            <td style={tableCellStyle}>
                                                <code style={{ fontSize: "0.85rem", color: "#06b6d4" }}>
                                                    {payment.razorpayPaymentId || payment.orderId}
                                                </code>
                                            </td>
                                            <td style={tableCellStyle}>{payment.fullName}</td>
                                            <td style={tableCellStyle}>{payment.email}</td>
                                            <td style={tableCellStyle}>
                                                <span style={{ fontWeight: "600", color: "#10b981" }}>
                                                    ₹{payment.amount.toLocaleString()}
                                                </span>
                                            </td>
                                            <td style={tableCellStyle}>
                                                <span style={{ textTransform: "uppercase", fontSize: "0.875rem" }}>
                                                    {payment.paymentMethod}
                                                </span>
                                            </td>
                                            <td style={tableCellStyle}>
                                                <span
                                                    style={{
                                                        display: "inline-block",
                                                        padding: "4px 12px",
                                                        borderRadius: "12px",
                                                        fontSize: "0.875rem",
                                                        fontWeight: "600",
                                                        backgroundColor: statusColors.bg,
                                                        color: statusColors.text,
                                                        border: `1px solid ${statusColors.border}`,
                                                    }}
                                                >
                                                    {formatStatus(payment.status)}
                                                </span>
                                            </td>
                                            <td style={tableCellStyle}>{formatDate(payment.timestamp)}</td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Details Modal */}
            {isModalOpen && selectedPayment && (
                <div
                    onClick={closeModal}
                    style={{
                        position: "fixed",
                        inset: 0,
                        backgroundColor: "rgba(0, 0, 0, 0.7)",
                        backdropFilter: "blur(8px)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        zIndex: 1000,
                        padding: "20px",
                        animation: "fadeIn 0.2s ease-out",
                    }}
                >
                    <div
                        onClick={(e) => e.stopPropagation()}
                        style={{
                            backgroundColor: "rgba(10, 10, 10, 0.95)",
                            border: "1px solid rgba(255, 255, 255, 0.1)",
                            borderRadius: "20px",
                            padding: "32px",
                            maxWidth: "600px",
                            width: "100%",
                            maxHeight: "80vh",
                            overflowY: "auto",
                            animation: "slideUp 0.3s ease-out",
                        }}
                    >
                        {/* Modal Header */}
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "24px" }}>
                            <h2
                                style={{
                                    fontSize: "1.75rem",
                                    fontWeight: "bold",
                                    background: "linear-gradient(to right, #10b981, #34d399)",
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent",
                                    backgroundClip: "text",
                                }}
                            >
                                Payment Details
                            </h2>
                            <button
                                onClick={closeModal}
                                style={{
                                    backgroundColor: "rgba(255, 255, 255, 0.05)",
                                    border: "1px solid rgba(255, 255, 255, 0.1)",
                                    borderRadius: "8px",
                                    padding: "8px 12px",
                                    color: "#fff",
                                    fontSize: "1.25rem",
                                    cursor: "pointer",
                                    transition: "all 0.2s",
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.backgroundColor = "rgba(239, 68, 68, 0.1)";
                                    e.currentTarget.style.borderColor = "rgba(239, 68, 68, 0.3)";
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.05)";
                                    e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.1)";
                                }}
                            >
                                ✕
                            </button>
                        </div>

                        {/* Modal Content */}
                        <div style={{ display: "grid", gap: "20px" }}>
                            <DetailRow label="Payment ID" value={selectedPayment.id} />
                            <DetailRow label="Invoice Number" value={selectedPayment.invoiceNumber} />
                            <DetailRow label="Full Name" value={selectedPayment.fullName} />
                            <DetailRow label="Email" value={selectedPayment.email} />
                            <DetailRow label="Amount" value={`₹${selectedPayment.amount.toLocaleString()}`} />
                            <DetailRow label="Payment Method" value={selectedPayment.paymentMethod.toUpperCase()} />
                            <DetailRow label="Order ID" value={selectedPayment.orderId} />
                            {selectedPayment.razorpayPaymentId && (
                                <DetailRow
                                    label="Razorpay Payment ID"
                                    value={<code style={{ fontSize: "0.85rem", color: "#06b6d4" }}>{selectedPayment.razorpayPaymentId}</code>}
                                />
                            )}
                            {selectedPayment.razorpaySignature && (
                                <DetailRow
                                    label="Razorpay Signature"
                                    value={<code style={{ fontSize: "0.75rem", color: "#888", wordBreak: "break-all" }}>{selectedPayment.razorpaySignature}</code>}
                                />
                            )}
                            <DetailRow label="Enrollment ID" value={selectedPayment.enrollmentId} />
                            <DetailRow
                                label="Status"
                                value={
                                    <span
                                        style={{
                                            display: "inline-block",
                                            padding: "6px 16px",
                                            borderRadius: "12px",
                                            fontSize: "0.875rem",
                                            fontWeight: "600",
                                            backgroundColor: getStatusColor(selectedPayment.status).bg,
                                            color: getStatusColor(selectedPayment.status).text,
                                            border: `1px solid ${getStatusColor(selectedPayment.status).border}`,
                                        }}
                                    >
                                        {formatStatus(selectedPayment.status)}
                                    </span>
                                }
                            />
                            <DetailRow label="Payment Date" value={formatDate(selectedPayment.timestamp)} />
                        </div>
                    </div>
                </div>
            )}

            <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 0.5;
          }
          50% {
            opacity: 1;
          }
        }

        /* Dark background for select dropdown options */
        :global(.admin-select option) {
          background-color: #1a1a1a;
          color: #fff;
          padding: 8px;
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
                padding: "12px 16px",
                backgroundColor: "rgba(255, 255, 255, 0.03)",
                borderRadius: "8px",
                border: "1px solid rgba(255, 255, 255, 0.05)",
            }}
        >
            <span style={{ color: "#888", fontSize: "0.95rem", fontWeight: "600" }}>
                {label}
            </span>
            <span style={{ color: "#fff", fontSize: "0.95rem", textAlign: "right", maxWidth: "60%" }}>
                {value}
            </span>
        </div>
    );
}

const tableHeaderStyle: React.CSSProperties = {
    padding: "16px",
    textAlign: "left",
    color: "#ccc",
    fontWeight: "600",
    fontSize: "0.875rem",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
};

const tableCellStyle: React.CSSProperties = {
    padding: "16px",
    color: "#fff",
    borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
};
