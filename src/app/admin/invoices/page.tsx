"use client";

import { useState, useEffect } from "react";
import type { InvoiceRecord } from "@/types/invoice";
import {
    ChevronLeft,
    Search,
    Filter,
    FileText,
    User,
    Mail,
    Calendar,
    CheckCircle2,
    Clock,
    AlertCircle,
    Loader2,
    IndianRupee,
    Eye,
    Send,
    ArrowRight
} from "lucide-react";
import Link from "next/link";

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
                    inv.email.toLowerCase().includes(query) ||
                    inv.fullName.toLowerCase().includes(query)
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
        switch (status.toLowerCase()) {
            case "sent":
                return { bg: "rgba(139, 92, 246, 0.1)", text: "#8b5cf6", border: "rgba(139, 92, 246, 0.3)" };
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
                        <Link href="/admin/dashboard" className="flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors mb-4 text-sm font-bold uppercase tracking-wider">
                            <ChevronLeft size={16} /> Dashboard
                        </Link>
                        <h1
                            style={{
                                fontWeight: "900",
                                background: "linear-gradient(to right, #8b5cf6, #a78bfa)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                                backgroundClip: "text",
                                letterSpacing: "-0.02em"
                            }}
                            className="page-title"
                        >
                            Invoice Repository
                        </h1>
                    </div>
                    <div className="header-right" style={{ textAlign: "right", display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "10px" }}>
                        <div className="metric-badge" style={{
                            backgroundColor: "rgba(139, 92, 246, 0.1)",
                            border: "1px solid rgba(139, 92, 246, 0.3)",
                            padding: "8px 16px",
                            borderRadius: "14px",
                            display: "flex",
                            alignItems: "center",
                            gap: "8px"
                        }}>
                            <FileText size={16} className="text-purple-500" />
                            <span style={{ color: "#8b5cf6", fontSize: "0.9rem", fontWeight: "800" }}>
                                {loading ? "..." : invoices.length}
                            </span>
                            <span style={{ color: "rgba(139, 92, 246, 0.6)", fontSize: "0.7rem", fontWeight: "700", textTransform: "uppercase" }}>Total Documents</span>
                        </div>
                        <p style={{ color: "#555", margin: 0, fontWeight: "700", fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                            {loading ? "Syncing..." : `${filteredInvoices.length} Documents Found`}
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
                    <label className="filter-label">Search Repository</label>
                    <div style={{ position: "relative" }}>
                        <Search style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: "#444" }} size={18} />
                        <input
                            type="text"
                            placeholder="Invoice #, Name or Email..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="filter-input"
                            style={{ paddingLeft: "44px" }}
                        />
                    </div>
                </div>

                <div className="filter-group">
                    <label className="filter-label">Status Flow</label>
                    <select
                        value={selectedStatus}
                        onChange={(e) => setSelectedStatus(e.target.value)}
                        className="filter-select"
                    >
                        <option value="">All Statuses</option>
                        <option value="sent">Sent Successfully</option>
                        <option value="failed">Delivery Failed</option>
                    </select>
                </div>

                <div className="filter-group" style={{ display: "flex", alignItems: "flex-end" }}>
                    <button
                        onClick={clearFilters}
                        className="reset-btn"
                    >
                        Reset Archive
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
                            <tr style={{ backgroundColor: "rgba(139, 92, 246, 0.03)" }}>
                                <th style={thStyle}>Document #</th>
                                <th style={thStyle}>Recipient</th>
                                <th style={thStyle}>Domain</th>
                                <th style={thStyle}>Value</th>
                                <th style={thStyle}>Status</th>
                                <th style={thStyle}>Generated</th>
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
                            ) : filteredInvoices.length === 0 ? (
                                <tr>
                                    <td colSpan={7} style={{ padding: "80px", textAlign: "center" }}>
                                        <FileText size={48} style={{ margin: "0 auto 16px", color: "#222" }} />
                                        <p style={{ color: "#555", fontWeight: "700", fontSize: "1.1rem" }}>No invoices found in archive</p>
                                    </td>
                                </tr>
                            ) : (
                                filteredInvoices.map((invoice, idx) => {
                                    const statusStyle = getStatusColor(invoice.status);
                                    return (
                                        <tr
                                            key={invoice.id}
                                            className="table-row"
                                            style={{ transition: "all 0.2s" }}
                                        >
                                            <td style={tdStyle}>
                                                <code style={{ color: "#8b5cf6", fontSize: "0.75rem", fontWeight: "900", letterSpacing: "0.05em" }}>
                                                    {invoice.invoiceNumber}
                                                </code>
                                            </td>
                                            <td style={tdStyle}>
                                                <div style={{ fontWeight: "800", color: "#fff" }}>{invoice.fullName}</div>
                                                <div style={{ fontSize: "0.75rem", color: "#555", fontWeight: "600" }}>{invoice.email}</div>
                                            </td>
                                            <td style={tdStyle}>
                                                <span style={{ color: "#ccc", fontWeight: "600", fontSize: "0.85rem" }}>{invoice.domainCategory}</span>
                                            </td>
                                            <td style={tdStyle}>
                                                <span style={{ fontWeight: "900", color: "#8b5cf6", fontSize: "1.05rem" }}>
                                                    ₹{invoice.amount.toLocaleString()}
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
                                                    {invoice.status}
                                                </span>
                                            </td>
                                            <td style={tdStyle}>
                                                <div style={{ fontSize: "0.85rem", color: "#ccc", fontWeight: "600" }}>{formatDate(invoice.timestamp)}</div>
                                            </td>
                                            <td style={tdStyle}>
                                                <div style={{ display: "flex", gap: "10px" }}>
                                                    <button
                                                        onClick={() => handleViewPDF(invoice)}
                                                        className="action-btn"
                                                        title="Preview PDF"
                                                        style={{ color: "#8b5cf6" }}
                                                    >
                                                        <Eye size={18} />
                                                    </button>
                                                    <button
                                                        onClick={() => handleResend(invoice)}
                                                        className="action-btn"
                                                        title="Resend Archive"
                                                        style={{ color: "#10b981" }}
                                                        disabled={isResending === invoice.id}
                                                    >
                                                        {isResending === invoice.id ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
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
                        onClick={(e) => e.stopPropagation()}
                        className="modal-card"
                        style={{
                            backgroundColor: "#050505",
                            border: "1px solid rgba(255, 255, 255, 0.1)",
                            borderRadius: "40px",
                            padding: "32px",
                            maxWidth: "1000px",
                            width: "100%",
                            maxHeight: "95vh",
                            display: "flex",
                            flexDirection: "column",
                            boxShadow: "0 40px 100px rgba(0, 0, 0, 0.8)"
                        }}
                    >
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
                            <div>
                                <h2 style={{ fontSize: "2rem", fontWeight: "900", color: "#fff", marginBottom: "4px", letterSpacing: "-0.02em" }}>Document Intelligence</h2>
                                <p style={{ color: "#555", fontSize: "0.75rem", fontWeight: "900", textTransform: "uppercase", letterSpacing: "0.15em" }}>Archive: {selectedInvoice.invoiceNumber}</p>
                            </div>
                            <button onClick={closePDFModal} style={{ width: "48px", height: "48px", borderRadius: "16px", backgroundColor: "rgba(255, 255, 255, 0.05)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center" }} className="hover:bg-red-500/20 hover:text-red-500 transition-all">✕</button>
                        </div>

                        <div style={{ flex: 1, backgroundColor: "#fff", borderRadius: "24px", overflow: "hidden", minHeight: "500px" }}>
                            <iframe
                                src={pdfUrl}
                                style={{ width: "100%", height: "100%", border: "none" }}
                                title="Invoice PDF Archive"
                            />
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
                    border-color: rgba(139, 92, 246, 0.4);
                    background-color: rgba(255, 255, 255, 0.06);
                }

                .reset-btn {
                    width: 100%;
                    padding: 14px 16px;
                    background-color: rgba(139, 92, 246, 0.08);
                    border: 1px solid rgba(139, 92, 246, 0.2);
                    border-radius: 14px;
                    color: #8b5cf6;
                    font-weight: 800;
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }

                .reset-btn:hover {
                    background-color: rgba(139, 92, 246, 0.15);
                }

                .table-row:hover {
                    background-color: rgba(139, 92, 246, 0.02) !important;
                }

                .action-btn {
                    width: 40px;
                    height: 40px;
                    border-radius: 12px;
                    background-color: rgba(255, 255, 255, 0.03);
                    border: 1px solid rgba(255, 255, 255, 0.06);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: all 0.3s ease;
                }

                .action-btn:hover {
                    background-color: rgba(255, 255, 255, 0.08);
                    transform: translateY(-2px);
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
                }

                @media (max-width: 480px) {
                    .page-title { font-size: 1.75rem; }
                }
            `}</style>
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
