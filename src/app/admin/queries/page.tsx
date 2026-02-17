"use client";

import { useState, useEffect } from "react";

// Query data interface
interface Query {
    id: string;
    fullName: string;
    email: string;
    domain: string;
    subDomain: string;
    queries: string;
    status: "pending" | "in-progress" | "resolved";
    timestamp: string;
    adminNotes: string;
    enrollmentId: string;
}

export default function QueriesPage() {
    const [queries, setQueries] = useState<Query[]>([]);
    const [selectedQuery, setSelectedQuery] = useState<Query | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [adminNotes, setAdminNotes] = useState("");

    // Fetch queries from API
    useEffect(() => {
        fetchQueries();
    }, []);

    const fetchQueries = async () => {
        try {
            setIsLoading(true);
            const response = await fetch('/api/admin/queries');
            const data = await response.json();
            setQueries(data.queries || []);
        } catch (error) {
            console.error('Error fetching queries:', error);
        } finally {
            setIsLoading(false);
        }
    };

    // Count new queries
    const newQueriesCount = queries.filter((q) => q.status === "pending").length;

    const openModal = (query: Query) => {
        setSelectedQuery(query);
        setAdminNotes(query.adminNotes || "");
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setTimeout(() => {
            setSelectedQuery(null);
            setAdminNotes("");
        }, 300);
    };

    const handleMarkInProgress = async () => {
        if (selectedQuery) {
            try {
                await fetch('/api/admin/queries', {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        queryId: selectedQuery.id,
                        status: 'in-progress',
                        adminNotes
                    })
                });
                await fetchQueries();
                closeModal();
            } catch (error) {
                console.error('Error updating query:', error);
                alert('Failed to update query status');
            }
        }
    };

    const handleMarkResolved = async () => {
        if (selectedQuery) {
            try {
                await fetch('/api/admin/queries', {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        queryId: selectedQuery.id,
                        status: 'resolved',
                        adminNotes
                    })
                });
                await fetchQueries();
                closeModal();
            } catch (error) {
                console.error('Error updating query:', error);
                alert('Failed to update query status');
            }
        }
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

    const truncateText = (text: string, maxLength: number) => {
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength) + "...";
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case "pending":
            case "new":
                return { bg: "rgba(59, 130, 246, 0.1)", text: "#3b82f6", border: "rgba(59, 130, 246, 0.3)" };
            case "in-progress":
                return { bg: "rgba(245, 158, 11, 0.1)", text: "#f59e0b", border: "rgba(245, 158, 11, 0.3)" };
            case "resolved":
                return { bg: "rgba(16, 185, 129, 0.1)", text: "#10b981", border: "rgba(16, 185, 129, 0.3)" };
            default:
                return { bg: "rgba(156, 163, 175, 0.1)", text: "#9ca3af", border: "rgba(156, 163, 175, 0.3)" };
        }
    };

    const getSourceColor = (source: string) => {
        switch (source) {
            case "Contact":
                return "#06b6d4";
            case "Internship":
                return "#8b5cf6";
            case "Payment":
                return "#10b981";
            case "Other":
                return "#f59e0b";
            default:
                return "#9ca3af";
        }
    };

    return (
        <div className="queries-page-container">
            {/* Page Header with Counter */}
            <div className="page-header" style={{ marginBottom: "48px" }}>
                <div className="header-top" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px" }}>
                    <h1
                        className="page-title"
                        style={{
                            fontWeight: "900",
                            background: "linear-gradient(to right, #f97316, #ef4444)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            backgroundClip: "text",
                            letterSpacing: "-0.03em",
                            textTransform: "uppercase"
                        }}
                    >
                        Queries & Support
                    </h1>

                    {/* New Queries Counter */}
                    {newQueriesCount > 0 && (
                        <div
                            className="counter-badge"
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "10px",
                                padding: "8px 20px",
                                backgroundColor: "rgba(249, 115, 22, 0.1)",
                                border: "1px solid rgba(249, 115, 22, 0.2)",
                                borderRadius: "14px",
                                backdropFilter: "blur(10px)"
                            }}
                        >
                            <span className="dot" style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "#f97316", boxShadow: "0 0 10px rgba(249, 115, 22, 0.5)" }} />
                            <span style={{ color: "#f97316", fontWeight: "900", fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                                New Queries: {newQueriesCount}
                            </span>
                        </div>
                    )}
                </div>
                <p className="page-subtitle" style={{ color: "#555", fontWeight: "600", textTransform: "uppercase", fontSize: "0.75rem", letterSpacing: "0.2em" }}>
                    Lifecycle Management of Global Support Channels
                </p>
            </div>

            {/* Queries Table or Empty State */}
            {queries.length === 0 ? (
                // Empty State
                <div
                    className="empty-state"
                    style={{
                        backgroundColor: "rgba(255, 255, 255, 0.01)",
                        border: "1px solid rgba(255, 255, 255, 0.05)",
                        borderRadius: "32px",
                        padding: "120px 24px",
                        textAlign: "center",
                        backdropFilter: "blur(20px)"
                    }}
                >
                    <div style={{ fontSize: "80px", marginBottom: "32px", opacity: 0.2 }}>
                        💬
                    </div>
                    <h3
                        style={{
                            fontSize: "2rem",
                            fontWeight: "900",
                            color: "#fff",
                            marginBottom: "16px",
                            textTransform: "uppercase",
                            letterSpacing: "-0.02em"
                        }}
                    >
                        Zero Transmissions
                    </h3>
                    <p style={{ color: "#555", fontSize: "0.9rem", maxWidth: "500px", margin: "0 auto", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                        Waiting for global inquiries to sync with the central database.
                    </p>
                </div>
            ) : (
                // Queries Table
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
                    <div style={{ overflowX: "auto", WebkitOverflowScrolling: "touch" }}>
                        <table
                            style={{
                                width: "100%",
                                borderCollapse: "separate",
                                borderSpacing: "0",
                                fontSize: "0.95rem",
                            }}
                        >
                            <thead>
                                <tr
                                    style={{
                                        backgroundColor: "rgba(255, 255, 255, 0.03)",
                                        backdropFilter: "blur(10px)",
                                    }}
                                >
                                    <th style={tableHeaderStyle}>Reference</th>
                                    <th style={tableHeaderStyle}>Entity</th>
                                    <th style={tableHeaderStyle}>Communication</th>
                                    <th style={tableHeaderStyle}>Channel</th>
                                    <th style={tableHeaderStyle}>Vector</th>
                                    <th style={tableHeaderStyle}>Status</th>
                                    <th style={tableHeaderStyle}>Timeline</th>
                                    <th style={{ ...tableHeaderStyle, textAlign: "right" }}>Control</th>
                                </tr>
                            </thead>
                            <tbody>
                                {queries.map((query, index) => {
                                    const statusColors = getStatusColor(query.status);
                                    const isNew = query.status === "pending";

                                    return (
                                        <tr
                                            key={query.id}
                                            className="table-row"
                                            style={{
                                                backgroundColor: "transparent",
                                                borderBottom: "1px solid rgba(255, 255, 255, 0.03)",
                                                transition: "all 0.3s ease"
                                            }}
                                        >
                                            <td style={tableCellStyle}>
                                                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                                                    {isNew && (
                                                        <div
                                                            className="pulse-dot"
                                                            style={{
                                                                width: "8px",
                                                                height: "8px",
                                                                borderRadius: "50%",
                                                                backgroundColor: "#3b82f6",
                                                                boxShadow: "0 0 10px rgba(59, 130, 246, 0.5)",
                                                            }}
                                                        />
                                                    )}
                                                    <code style={{ fontSize: "0.75rem", color: "#f97316", fontWeight: "900", fontFamily: "monospace" }}>
                                                        {query.id}
                                                    </code>
                                                </div>
                                            </td>
                                            <td style={tableCellStyle}>
                                                <div style={{ fontWeight: "900", color: "#fff", textTransform: "uppercase", fontSize: "0.85rem", letterSpacing: "0.02em" }}>{query.fullName}</div>
                                            </td>
                                            <td style={tableCellStyle}>
                                                <div style={{ color: "#888", fontWeight: "700", fontSize: "0.8rem" }}>{query.email}</div>
                                            </td>
                                            <td style={tableCellStyle}>
                                                <span
                                                    className="channel-badge"
                                                    style={{
                                                        display: "inline-block",
                                                        padding: "4px 10px",
                                                        borderRadius: "8px",
                                                        fontSize: "0.75rem",
                                                        fontWeight: "900",
                                                        textTransform: "uppercase",
                                                        backgroundColor: `${getSourceColor(query.subDomain)}15`,
                                                        color: getSourceColor(query.subDomain),
                                                        border: `1px solid ${getSourceColor(query.subDomain)}30`,
                                                    }}
                                                >
                                                    {query.subDomain}
                                                </span>
                                            </td>
                                            <td style={tableCellStyle}>
                                                <div style={{ color: "#ccc", fontWeight: "700", textTransform: "uppercase", fontSize: "0.8rem", maxWidth: "200px" }}>{truncateText(query.domain, 40)}</div>
                                            </td>
                                            <td style={tableCellStyle}>
                                                <span
                                                    className="status-badge"
                                                    style={{
                                                        display: "inline-block",
                                                        padding: "6px 14px",
                                                        borderRadius: "10px",
                                                        fontSize: "0.75rem",
                                                        fontWeight: "900",
                                                        textTransform: "uppercase",
                                                        letterSpacing: "0.05em",
                                                        backgroundColor: statusColors.bg,
                                                        color: statusColors.text,
                                                        border: `1px solid ${statusColors.border}`,
                                                    }}
                                                >
                                                    {query.status === "in-progress" ? "Active" : query.status}
                                                </span>
                                            </td>
                                            <td style={tableCellStyle}>
                                                <div style={{ color: "#555", fontWeight: "800", textTransform: "uppercase", fontSize: "0.75rem" }}>{formatDate(query.timestamp)}</div>
                                            </td>
                                            <td style={tableCellStyle}>
                                                <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end", alignItems: "center" }}>
                                                    {/* View Button */}
                                                    <button
                                                        onClick={() => openModal(query)}
                                                        className="action-btn"
                                                        style={{
                                                            padding: "10px",
                                                            backgroundColor: "rgba(249, 115, 22, 0.1)",
                                                            border: "1px solid rgba(249, 115, 22, 0.2)",
                                                            borderRadius: "12px",
                                                            color: "#f97316",
                                                            fontSize: "1rem",
                                                            cursor: "pointer",
                                                            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                                                        }}
                                                        title="Execute Inspection"
                                                    >
                                                        👁️
                                                    </button>

                                                    {/* Resolve Button (only for non-resolved queries) */}
                                                    {query.status !== "resolved" && (
                                                        <button
                                                            onClick={async () => {
                                                                setSelectedQuery(query);
                                                                handleMarkResolved();
                                                            }}
                                                            className="action-btn resolve"
                                                            style={{
                                                                padding: "10px",
                                                                backgroundColor: "rgba(16, 185, 129, 0.1)",
                                                                border: "1px solid rgba(16, 185, 129, 0.2)",
                                                                borderRadius: "12px",
                                                                color: "#10b981",
                                                                fontSize: "1rem",
                                                                cursor: "pointer",
                                                                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                                                            }}
                                                            title="Channel Resolution"
                                                        >
                                                            ✓
                                                        </button>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Detail Modal */}
            {isModalOpen && selectedQuery && (
                <div
                    onClick={closeModal}
                    className="modal-overlay"
                    style={{
                        position: "fixed",
                        inset: 0,
                        backgroundColor: "rgba(0, 0, 0, 0.95)",
                        backdropFilter: "blur(20px)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        zIndex: 1000,
                        padding: "24px",
                    }}
                >
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className="modal-card"
                        style={{
                            backgroundColor: "rgba(10, 10, 10, 0.95)",
                            border: "1px solid rgba(255, 255, 255, 0.1)",
                            borderRadius: "40px",
                            padding: "64px",
                            maxWidth: "800px",
                            width: "100%",
                            maxHeight: "90vh",
                            overflowY: "auto",
                            boxShadow: "0 40px 100px rgba(0,0,0,0.8)"
                        }}
                    >
                        {/* Modal Header */}
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "48px" }}>
                            <div>
                                <h2
                                    style={{
                                        fontSize: "2.5rem",
                                        fontWeight: "900",
                                        background: "linear-gradient(to right, #f97316, #ef4444)",
                                        WebkitBackgroundClip: "text",
                                        WebkitTextFillColor: "transparent",
                                        backgroundClip: "text",
                                        marginBottom: "12px",
                                        textTransform: "uppercase",
                                        letterSpacing: "-0.03em"
                                    }}
                                >
                                    Inspection Details
                                </h2>
                                <code style={{ fontSize: "0.85rem", color: "#555", fontWeight: "900", textTransform: "uppercase", opacity: 0.6 }}>{selectedQuery.id}</code>
                            </div>
                            <button
                                onClick={closeModal}
                                style={{
                                    backgroundColor: "rgba(255, 255, 255, 0.05)",
                                    border: "1px solid rgba(255, 255, 255, 0.1)",
                                    borderRadius: "14px",
                                    width: "48px",
                                    height: "48px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    color: "#fff",
                                    fontSize: "1.25rem",
                                    cursor: "pointer",
                                    transition: "all 0.3s",
                                }}
                            >
                                ✕
                            </button>
                        </div>

                        {/* Modal Content */}
                        <div style={{ display: "grid", gap: "24px", marginBottom: "48px" }}>
                            <DetailRow label="Entity Identifier" value={selectedQuery.fullName} />
                            <DetailRow label="Secure Communication" value={selectedQuery.email} />
                            <DetailRow
                                label="Channel Classification"
                                value={
                                    <span
                                        style={{
                                            display: "inline-block",
                                            padding: "6px 14px",
                                            borderRadius: "10px",
                                            fontSize: "0.8rem",
                                            fontWeight: "900",
                                            textTransform: "uppercase",
                                            backgroundColor: `${getSourceColor(selectedQuery.subDomain)}15`,
                                            color: getSourceColor(selectedQuery.subDomain),
                                            border: `1px solid ${getSourceColor(selectedQuery.subDomain)}30`,
                                        }}
                                    >
                                        {selectedQuery.subDomain}
                                    </span>
                                }
                            />
                            <DetailRow
                                label="Tactical Status"
                                value={
                                    <span
                                        style={{
                                            display: "inline-block",
                                            padding: "8px 18px",
                                            borderRadius: "12px",
                                            fontSize: "0.8rem",
                                            fontWeight: "900",
                                            textTransform: "uppercase",
                                            letterSpacing: "0.05em",
                                            backgroundColor: getStatusColor(selectedQuery.status).bg,
                                            color: getStatusColor(selectedQuery.status).text,
                                            border: `1px solid ${getStatusColor(selectedQuery.status).border}`,
                                        }}
                                    >
                                        {selectedQuery.status === "in-progress" ? "Active" : selectedQuery.status}
                                    </span>
                                }
                            />
                            <DetailRow label="Mission Subject" value={selectedQuery.domain} />
                            <DetailRow label="Synchronization Timeline" value={formatDate(selectedQuery.timestamp)} />

                            {/* Full Message */}
                            <div
                                style={{
                                    padding: "32px",
                                    backgroundColor: "rgba(255, 255, 255, 0.02)",
                                    borderRadius: "24px",
                                    border: "1px solid rgba(255, 255, 255, 0.05)",
                                }}
                            >
                                <div style={{ color: "#555", fontSize: "0.75rem", fontWeight: "900", textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: "16px" }}>
                                    Crypted Transmission
                                </div>
                                <p style={{ color: "#fff", fontSize: "1rem", lineHeight: "1.8", margin: 0, fontWeight: "500" }}>
                                    {selectedQuery.queries}
                                </p>
                            </div>

                            {/* Admin Notes */}
                            <div>
                                <label style={{ color: "#555", fontSize: "0.75rem", fontWeight: "900", textTransform: "uppercase", letterSpacing: "0.15em", display: "block", marginBottom: "12px" }}>
                                    Administrative Protocols
                                </label>
                                <textarea
                                    value={adminNotes}
                                    onChange={(e) => setAdminNotes(e.target.value)}
                                    placeholder="Enter encrypted protocol notes..."
                                    rows={4}
                                    style={{
                                        width: "100%",
                                        padding: "24px",
                                        backgroundColor: "rgba(255, 255, 255, 0.03)",
                                        border: "1px solid rgba(255, 255, 255, 0.1)",
                                        borderRadius: "20px",
                                        color: "#fff",
                                        fontSize: "0.95rem",
                                        fontWeight: "600",
                                        resize: "vertical",
                                        fontFamily: "inherit",
                                        outline: "none",
                                        transition: "border-color 0.3s"
                                    }}
                                />
                            </div>
                        </div>

                        {/* Modal Actions */}
                        <div style={{ display: "flex", flexWrap: "wrap", gap: "16px", justifyContent: "flex-end" }}>
                            {selectedQuery.status !== "in-progress" && selectedQuery.status !== "resolved" && (
                                <button
                                    onClick={handleMarkInProgress}
                                    className="modal-btn"
                                    style={{
                                        padding: "16px 32px",
                                        backgroundColor: "rgba(245, 158, 11, 0.1)",
                                        border: "1px solid rgba(245, 158, 11, 0.2)",
                                        borderRadius: "16px",
                                        color: "#f59e0b",
                                        fontSize: "0.9rem",
                                        fontWeight: "900",
                                        textTransform: "uppercase",
                                        letterSpacing: "0.1em",
                                        cursor: "pointer",
                                        transition: "all 0.3s",
                                    }}
                                >
                                    Initiate Process
                                </button>
                            )}

                            {selectedQuery.status !== "resolved" && (
                                <button
                                    onClick={handleMarkResolved}
                                    className="modal-btn resolve"
                                    style={{
                                        padding: "16px 48px",
                                        backgroundColor: "#10b981",
                                        border: "none",
                                        borderRadius: "16px",
                                        color: "#fff",
                                        fontSize: "0.9rem",
                                        fontWeight: "900",
                                        textTransform: "uppercase",
                                        letterSpacing: "0.1em",
                                        cursor: "pointer",
                                        transition: "all 0.3s",
                                        boxShadow: "0 10px 30px rgba(16, 185, 129, 0.3)"
                                    }}
                                >
                                    ✓ Resolution
                                </button>
                            )}

                            <button
                                onClick={closeModal}
                                className="modal-btn dark"
                                style={{
                                    padding: "16px 32px",
                                    backgroundColor: "rgba(255, 255, 255, 0.05)",
                                    border: "1px solid rgba(255, 255, 255, 0.1)",
                                    borderRadius: "16px",
                                    color: "#fff",
                                    fontSize: "0.9rem",
                                    fontWeight: "900",
                                    textTransform: "uppercase",
                                    letterSpacing: "0.1em",
                                    cursor: "pointer",
                                    transition: "all 0.3s",
                                }}
                            >
                                Terminate
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <style jsx>{`
                .queries-page-container {
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

                .table-row:hover {
                    background-color: rgba(249, 115, 22, 0.02) !important;
                }

                .action-btn:hover {
                    background-color: rgba(249, 115, 22, 0.2) !important;
                    transform: scale(1.05);
                }

                .action-btn.resolve:hover {
                    background-color: rgba(16, 185, 129, 0.2) !important;
                }

                .modal-btn:hover {
                    transform: translateY(-2px);
                }

                .modal-btn.resolve:hover {
                    background-color: #059669 !important;
                    boxShadow: 0 15px 40px rgba(16, 185, 129, 0.4) !important;
                }

                .pulse-dot {
                    animation: pulse 2s ease-in-out infinite;
                }

                @keyframes pulse {
                    0%, 100% { opacity: 1; transform: scale(1); }
                    50% { opacity: 0.5; transform: scale(1.2); }
                }

                @media (max-width: 1024px) {
                    .page-title { font-size: 2.75rem; }
                    .modal-card { padding: 48px !important; }
                }

                @media (max-width: 768px) {
                    .header-top { flex-direction: column !important; align-items: flex-start !important; gap: 20px; }
                    .page-title { font-size: 2.25rem; }
                    .table-card { borderRadius: 24px !important; }
                    .modal-card { padding: 32px 24px !important; borderRadius: 32px !important; }
                    .modal-card h2 { font-size: 2rem !important; }
                }

                @media (max-width: 480px) {
                    .page-title { font-size: 1.75rem; }
                    .modal-card { padding: 24px 16px !important; }
                    .modal-btn { width: 100%; text-align: center; }
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
