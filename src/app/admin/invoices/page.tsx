"use client";

import { useState, useEffect } from "react";
import type { InvoiceRecord } from "@/types/invoice";

export default function InvoicesPage() {
    const [invoices, setInvoices] = useState<InvoiceRecord[]>([]);
    const [filteredInvoices, setFilteredInvoices] = useState<InvoiceRecord[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Filter states
    const [selectedStatus, setSelectedStatus] = useState("");
    const [searchQuery, setSearchQuery] = useState("");

    // Modal states
    const [selectedInvoice, setSelectedInvoice] = useState<InvoiceRecord | null>(null);
    const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
    const [pdfUrl, setPdfUrl] = useState<string>("");
    const [isResending, setIsResending] = useState<string | null>(null);

    // Fetch invoices
    useEffect(() => {
        fetchInvoices();
    }, []);

    const fetchInvoices = async () => {
        try {
            setLoading(true);
            const response = await fetch("/api/admin/invoices");

            if (!response.ok) {
                throw new Error("Failed to fetch invoices");
            }

            const data = await response.json();
            setInvoices(data.invoices || []);
            setFilteredInvoices(data.invoices || []);
        } catch (err) {
            setError("Failed to load invoices. Please try again.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    // Apply filters
    useEffect(() => {
        let filtered = [...invoices];

        // Status filter
        if (selectedStatus) {
            filtered = filtered.filter((inv) => inv.status === selectedStatus);
        }

        // Search filter (invoice ID or email)
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter(
                (inv) =>
                    inv.invoiceNumber.toLowerCase().includes(query) ||
                    inv.email.toLowerCase().includes(query)
            );
        }

        setFilteredInvoices(filtered);
    }, [selectedStatus, searchQuery, invoices]);

    const clearFilters = () => {
        setSelectedStatus("");
        setSearchQuery("");
    };

    const handleViewPDF = async (invoice: InvoiceRecord) => {
        setSelectedInvoice(invoice);
        setPdfUrl(`/api/admin/invoices/${invoice.id}`);
        setIsPreviewModalOpen(true);
    };

    const handleResend = async (invoice: InvoiceRecord) => {
        setIsResending(invoice.id);
        try {
            const response = await fetch(`/api/admin/invoices/${invoice.id}/resend`, {
                method: "POST",
            });

            if (!response.ok) {
                throw new Error("Failed to resend invoice");
            }

            const data = await response.json();
            alert(data.message || "Invoice resent successfully!");

            // Refresh invoices list
            fetchInvoices();
        } catch (err) {
            console.error(err);
            alert("Failed to resend invoice. Please try again.");
        } finally {
            setIsResending(null);
        }
    };

    const closePDFModal = () => {
        setIsPreviewModalOpen(false);
        setPdfUrl("");
        setTimeout(() => setSelectedInvoice(null), 300);
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("en-IN", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case "sent":
                return { bg: "rgba(16, 185, 129, 0.1)", text: "#10b981", border: "rgba(16, 185, 129, 0.3)" };
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
                        background: "linear-gradient(to right, #8b5cf6, #a78bfa)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                    }}
                >
                    Invoice Management
                </h1>
                <p style={{ fontSize: "1.125rem", color: "#888" }}>
                    {loading
                        ? "Loading invoices..."
                        : `${filteredInvoices.length} of ${invoices.length} invoices`}
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
                        Invoice Status
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
                        <option value="sent">Sent</option>
                        <option value="failed">Failed</option>
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
                        placeholder="Invoice ID or email..."
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
                            color: "#8b5cf6",
                            fontSize: "0.95rem",
                            fontWeight: "600",
                            cursor: "pointer",
                            transition: "all 0.2s",
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = "rgba(139, 92, 246, 0.1)";
                            e.currentTarget.style.borderColor = "rgba(139, 92, 246, 0.3)";
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
                                <th style={tableHeaderStyle}>Invoice ID</th>
                                <th style={tableHeaderStyle}>User Name</th>
                                <th style={tableHeaderStyle}>Email</th>
                                <th style={tableHeaderStyle}>Domain</th>
                                <th style={tableHeaderStyle}>Amount</th>
                                <th style={tableHeaderStyle}>Method</th>
                                <th style={tableHeaderStyle}>Status</th>
                                <th style={tableHeaderStyle}>Date</th>
                                <th style={tableHeaderStyle}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                // Loading Skeleton
                                Array.from({ length: 5 }).map((_, i) => (
                                    <tr key={i}>
                                        {Array.from({ length: 9 }).map((_, j) => (
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
                            ) : filteredInvoices.length === 0 ? (
                                // Empty State
                                <tr>
                                    <td colSpan={9} style={{ ...tableCellStyle, textAlign: "center", padding: "48px" }}>
                                        <div style={{ fontSize: "48px", marginBottom: "16px", opacity: 0.5 }}>
                                            📄
                                        </div>
                                        <p style={{ color: "#888", fontSize: "1.125rem" }}>
                                            No invoices found
                                        </p>
                                    </td>
                                </tr>
                            ) : (
                                // Data Rows
                                filteredInvoices.map((invoice, index) => {
                                    const statusColors = getStatusColor(invoice.status);
                                    return (
                                        <tr
                                            key={invoice.id}
                                            style={{
                                                backgroundColor: index % 2 === 0 ? "transparent" : "rgba(255, 255, 255, 0.02)",
                                            }}
                                        >
                                            <td style={tableCellStyle}>
                                                <code style={{ fontSize: "0.85rem", color: "#8b5cf6" }}>
                                                    {invoice.invoiceNumber}
                                                </code>
                                            </td>
                                            <td style={tableCellStyle}>{invoice.fullName}</td>
                                            <td style={tableCellStyle}>{invoice.email}</td>
                                            <td style={tableCellStyle}>{invoice.domainCategory}</td>
                                            <td style={tableCellStyle}>
                                                <span style={{ fontWeight: "600", color: "#8b5cf6" }}>
                                                    ₹{invoice.amount.toLocaleString()}
                                                </span>
                                            </td>
                                            <td style={tableCellStyle}>
                                                <span style={{ textTransform: "uppercase", fontSize: "0.875rem" }}>
                                                    {invoice.paymentMethod}
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
                                                        textTransform: "capitalize",
                                                    }}
                                                >
                                                    {invoice.status}
                                                </span>
                                            </td>
                                            <td style={tableCellStyle}>{formatDate(invoice.timestamp)}</td>
                                            <td style={tableCellStyle}>
                                                <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                                                    {/* View PDF Button */}
                                                    <button
                                                        onClick={() => handleViewPDF(invoice)}
                                                        style={{
                                                            padding: "6px 10px",
                                                            backgroundColor: "rgba(139, 92, 246, 0.1)",
                                                            border: "1px solid rgba(139, 92, 246, 0.3)",
                                                            borderRadius: "8px",
                                                            color: "#8b5cf6",
                                                            fontSize: "1rem",
                                                            cursor: "pointer",
                                                            transition: "all 0.2s",
                                                            display: "flex",
                                                            alignItems: "center",
                                                            justifyContent: "center",
                                                        }}
                                                        title="View PDF"
                                                        onMouseEnter={(e) => {
                                                            e.currentTarget.style.backgroundColor = "rgba(139, 92, 246, 0.2)";
                                                        }}
                                                        onMouseLeave={(e) => {
                                                            e.currentTarget.style.backgroundColor = "rgba(139, 92, 246, 0.1)";
                                                        }}
                                                    >
                                                        👁️
                                                    </button>

                                                    {/* Resend Button */}
                                                    <button
                                                        onClick={() => handleResend(invoice)}
                                                        disabled={isResending === invoice.id}
                                                        style={{
                                                            padding: "6px 10px",
                                                            backgroundColor: "rgba(16, 185, 129, 0.1)",
                                                            border: "1px solid rgba(16, 185, 129, 0.3)",
                                                            borderRadius: "8px",
                                                            color: "#10b981",
                                                            fontSize: "1rem",
                                                            cursor: isResending === invoice.id ? "not-allowed" : "pointer",
                                                            transition: "all 0.2s",
                                                            display: "flex",
                                                            alignItems: "center",
                                                            justifyContent: "center",
                                                            opacity: isResending === invoice.id ? 0.5 : 1,
                                                        }}
                                                        title="Resend Invoice"
                                                        onMouseEnter={(e) => {
                                                            if (isResending !== invoice.id) {
                                                                e.currentTarget.style.backgroundColor = "rgba(16, 185, 129, 0.2)";
                                                            }
                                                        }}
                                                        onMouseLeave={(e) => {
                                                            if (isResending !== invoice.id) {
                                                                e.currentTarget.style.backgroundColor = "rgba(16, 185, 129, 0.1)";
                                                            }
                                                        }}
                                                    >
                                                        {isResending === invoice.id ? "⏳" : "📧"}
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* PDF Preview Modal */}
            {isPreviewModalOpen && selectedInvoice && (
                <div
                    onClick={closePDFModal}
                    style={{
                        position: "fixed",
                        inset: 0,
                        backgroundColor: "rgba(0, 0, 0, 0.8)",
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
                            padding: "24px",
                            maxWidth: "900px",
                            width: "100%",
                            maxHeight: "90vh",
                            display: "flex",
                            flexDirection: "column",
                            animation: "slideUp 0.3s ease-out",
                        }}
                    >
                        {/* Modal Header */}
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                            <h2
                                style={{
                                    fontSize: "1.5rem",
                                    fontWeight: "bold",
                                    background: "linear-gradient(to right, #8b5cf6, #a78bfa)",
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent",
                                    backgroundClip: "text",
                                }}
                            >
                                Invoice Preview - {selectedInvoice.invoiceNumber}
                            </h2>
                            <button
                                onClick={closePDFModal}
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

                        {/* PDF Viewer */}
                        <div
                            style={{
                                flex: 1,
                                backgroundColor: "#fff",
                                borderRadius: "12px",
                                overflow: "hidden",
                            }}
                        >
                            <iframe
                                src={pdfUrl}
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    minHeight: "600px",
                                    border: "none",
                                }}
                                title="Invoice PDF Preview"
                            />
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
