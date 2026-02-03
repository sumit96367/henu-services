"use client";

import { useState } from "react";

// Mock query data interface
interface Query {
    id: string;
    name: string;
    email: string;
    source: "Contact" | "Internship" | "Payment" | "Other";
    subject: string;
    message: string;
    status: "new" | "in-progress" | "resolved";
    timestamp: string;
}

// Sample mock data
const mockQueries: Query[] = [
    {
        id: "Q001",
        name: "Rahul Sharma",
        email: "rahul.sharma@example.com",
        source: "Internship",
        subject: "Query about AI/ML internship duration",
        message: "Hi, I wanted to know if the AI/ML internship can be extended beyond 3 months? I'm very interested in machine learning and would like more time to work on projects.",
        status: "new",
        timestamp: "2026-02-03T10:30:00Z",
    },
    {
        id: "Q002",
        name: "Priya Patel",
        email: "priya.patel@example.com",
        source: "Payment",
        subject: "Payment confirmation not received",
        message: "I made a payment for the Web Development internship yesterday but haven't received any confirmation email yet. My transaction ID is TXN1234567890. Please help.",
        status: "in-progress",
        timestamp: "2026-02-02T14:20:00Z",
    },
    {
        id: "Q003",
        name: "Arjun Kumar",
        email: "arjun.kumar@example.com",
        source: "Contact",
        subject: "General inquiry about services",
        message: "Hello, I'm interested in learning more about your internship programs. Can you provide more details about the curriculum and mentorship structure?",
        status: "new",
        timestamp: "2026-02-03T08:15:00Z",
    },
    {
        id: "Q004",
        name: "Sneha Reddy",
        email: "sneha.reddy@example.com",
        source: "Other",
        subject: "Certificate issuance timeline",
        message: "I completed my internship last week. When can I expect to receive my completion certificate?",
        status: "resolved",
        timestamp: "2026-02-01T16:45:00Z",
    },
    {
        id: "Q005",
        name: "Vikram Singh",
        email: "vikram.singh@example.com",
        source: "Internship",
        subject: "Switching internship domain",
        message: "Is it possible to switch from Finance & Trading to Software Development (SDE) domain? I realized my interests align more with SDE.",
        status: "new",
        timestamp: "2026-02-03T11:00:00Z",
    },
];

export default function QueriesPage() {
    const [queries] = useState<Query[]>(mockQueries);
    const [selectedQuery, setSelectedQuery] = useState<Query | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Count new queries
    const newQueriesCount = queries.filter((q) => q.status === "new").length;

    const openModal = (query: Query) => {
        setSelectedQuery(query);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setTimeout(() => setSelectedQuery(null), 300);
    };

    const handleMarkInProgress = () => {
        if (selectedQuery) {
            // UI only - would update in backend
            console.log(`Marking query ${selectedQuery.id} as in-progress`);
            alert("Query marked as In Progress (UI only)");
        }
    };

    const handleMarkResolved = () => {
        if (selectedQuery) {
            // UI only - would update in backend
            console.log(`Marking query ${selectedQuery.id} as resolved`);
            alert("Query marked as Resolved (UI only)");
            closeModal();
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
        <div>
            {/* Page Header with Counter */}
            <div style={{ marginBottom: "32px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                    <h1
                        style={{
                            fontSize: "2.5rem",
                            fontWeight: "bold",
                            background: "linear-gradient(to right, #f97316, #ef4444)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            backgroundClip: "text",
                        }}
                    >
                        Queries & Support
                    </h1>

                    {/* New Queries Counter */}
                    {newQueriesCount > 0 && (
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "8px",
                                padding: "8px 16px",
                                backgroundColor: "rgba(59, 130, 246, 0.1)",
                                border: "1px solid rgba(59, 130, 246, 0.3)",
                                borderRadius: "12px",
                            }}
                        >
                            <span style={{ fontSize: "1.25rem" }}>🔔</span>
                            <span style={{ color: "#3b82f6", fontWeight: "600", fontSize: "0.95rem" }}>
                                New Queries: {newQueriesCount}
                            </span>
                        </div>
                    )}
                </div>
                <p style={{ fontSize: "1.125rem", color: "#888" }}>
                    Manage user queries and support messages
                </p>
            </div>

            {/* Queries Table or Empty State */}
            {queries.length === 0 ? (
                // Empty State
                <div
                    style={{
                        backgroundColor: "rgba(255, 255, 255, 0.03)",
                        border: "1px solid rgba(255, 255, 255, 0.1)",
                        borderRadius: "20px",
                        padding: "64px 32px",
                        textAlign: "center",
                    }}
                >
                    <div style={{ fontSize: "64px", marginBottom: "24px", opacity: 0.5 }}>
                        💬
                    </div>
                    <h3
                        style={{
                            fontSize: "1.5rem",
                            fontWeight: "600",
                            color: "#fff",
                            marginBottom: "12px",
                        }}
                    >
                        No Queries Yet
                    </h3>
                    <p style={{ color: "#888", fontSize: "1rem", maxWidth: "500px", margin: "0 auto" }}>
                        User messages will appear here. Support queries from contact forms, internship inquiries, and payment issues will be displayed in this dashboard.
                    </p>
                </div>
            ) : (
                // Queries Table
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
                                    <th style={tableHeaderStyle}>ID</th>
                                    <th style={tableHeaderStyle}>Name</th>
                                    <th style={tableHeaderStyle}>Email</th>
                                    <th style={tableHeaderStyle}>Source</th>
                                    <th style={tableHeaderStyle}>Subject</th>
                                    <th style={tableHeaderStyle}>Status</th>
                                    <th style={tableHeaderStyle}>Date</th>
                                    <th style={tableHeaderStyle}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {queries.map((query, index) => {
                                    const statusColors = getStatusColor(query.status);
                                    const isNew = query.status === "new";

                                    return (
                                        <tr
                                            key={query.id}
                                            style={{
                                                backgroundColor: index % 2 === 0 ? "transparent" : "rgba(255, 255, 255, 0.02)",
                                                borderLeft: isNew ? "3px solid #3b82f6" : "3px solid transparent",
                                                position: "relative",
                                            }}
                                        >
                                            {/* New Query Indicator Dot */}
                                            <td style={{ ...tableCellStyle, position: "relative" }}>
                                                {isNew && (
                                                    <div
                                                        style={{
                                                            position: "absolute",
                                                            left: "8px",
                                                            top: "50%",
                                                            transform: "translateY(-50%)",
                                                            width: "8px",
                                                            height: "8px",
                                                            borderRadius: "50%",
                                                            backgroundColor: "#3b82f6",
                                                            boxShadow: "0 0 8px rgba(59, 130, 246, 0.6)",
                                                            animation: "pulse 2s ease-in-out infinite",
                                                        }}
                                                    />
                                                )}
                                                <code style={{ fontSize: "0.85rem", color: "#f97316", marginLeft: isNew ? "16px" : "0" }}>
                                                    {query.id}
                                                </code>
                                            </td>
                                            <td style={tableCellStyle}>{query.name}</td>
                                            <td style={tableCellStyle}>{query.email}</td>
                                            <td style={tableCellStyle}>
                                                <span
                                                    style={{
                                                        display: "inline-block",
                                                        padding: "4px 10px",
                                                        borderRadius: "8px",
                                                        fontSize: "0.8rem",
                                                        fontWeight: "600",
                                                        backgroundColor: `${getSourceColor(query.source)}20`,
                                                        color: getSourceColor(query.source),
                                                        border: `1px solid ${getSourceColor(query.source)}40`,
                                                    }}
                                                >
                                                    {query.source}
                                                </span>
                                            </td>
                                            <td style={tableCellStyle}>
                                                <span style={{ color: "#ccc" }}>{truncateText(query.subject, 40)}</span>
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
                                                    {query.status === "in-progress" ? "In Progress" : query.status}
                                                </span>
                                            </td>
                                            <td style={tableCellStyle}>{formatDate(query.timestamp)}</td>
                                            <td style={tableCellStyle}>
                                                <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                                                    {/* View Button */}
                                                    <button
                                                        onClick={() => openModal(query)}
                                                        style={{
                                                            padding: "6px 10px",
                                                            backgroundColor: "rgba(249, 115, 22, 0.1)",
                                                            border: "1px solid rgba(249, 115, 22, 0.3)",
                                                            borderRadius: "8px",
                                                            color: "#f97316",
                                                            fontSize: "1rem",
                                                            cursor: "pointer",
                                                            transition: "all 0.2s",
                                                            display: "flex",
                                                            alignItems: "center",
                                                            justifyContent: "center",
                                                        }}
                                                        title="View Details"
                                                        onMouseEnter={(e) => {
                                                            e.currentTarget.style.backgroundColor = "rgba(249, 115, 22, 0.2)";
                                                        }}
                                                        onMouseLeave={(e) => {
                                                            e.currentTarget.style.backgroundColor = "rgba(249, 115, 22, 0.1)";
                                                        }}
                                                    >
                                                        👁️
                                                    </button>

                                                    {/* Resolve Button (only for non-resolved queries) */}
                                                    {query.status !== "resolved" && (
                                                        <button
                                                            onClick={() => {
                                                                console.log(`Resolving query ${query.id}`);
                                                                alert("Query marked as Resolved (UI only)");
                                                            }}
                                                            style={{
                                                                padding: "6px 10px",
                                                                backgroundColor: "rgba(16, 185, 129, 0.1)",
                                                                border: "1px solid rgba(16, 185, 129, 0.3)",
                                                                borderRadius: "8px",
                                                                color: "#10b981",
                                                                fontSize: "1rem",
                                                                cursor: "pointer",
                                                                transition: "all 0.2s",
                                                                display: "flex",
                                                                alignItems: "center",
                                                                justifyContent: "center",
                                                            }}
                                                            title="Mark as Resolved"
                                                            onMouseEnter={(e) => {
                                                                e.currentTarget.style.backgroundColor = "rgba(16, 185, 129, 0.2)";
                                                            }}
                                                            onMouseLeave={(e) => {
                                                                e.currentTarget.style.backgroundColor = "rgba(16, 185, 129, 0.1)";
                                                            }}
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
                            padding: "32px",
                            maxWidth: "700px",
                            width: "100%",
                            maxHeight: "80vh",
                            overflowY: "auto",
                            animation: "slideUp 0.3s ease-out",
                        }}
                    >
                        {/* Modal Header */}
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "24px" }}>
                            <div>
                                <h2
                                    style={{
                                        fontSize: "1.75rem",
                                        fontWeight: "bold",
                                        background: "linear-gradient(to right, #f97316, #ef4444)",
                                        WebkitBackgroundClip: "text",
                                        WebkitTextFillColor: "transparent",
                                        backgroundClip: "text",
                                        marginBottom: "8px",
                                    }}
                                >
                                    Query Details
                                </h2>
                                <code style={{ fontSize: "0.85rem", color: "#888" }}>{selectedQuery.id}</code>
                            </div>
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
                        <div style={{ display: "grid", gap: "20px", marginBottom: "24px" }}>
                            <DetailRow label="User Name" value={selectedQuery.name} />
                            <DetailRow label="Email" value={selectedQuery.email} />
                            <DetailRow
                                label="Source"
                                value={
                                    <span
                                        style={{
                                            display: "inline-block",
                                            padding: "4px 12px",
                                            borderRadius: "8px",
                                            fontSize: "0.85rem",
                                            fontWeight: "600",
                                            backgroundColor: `${getSourceColor(selectedQuery.source)}20`,
                                            color: getSourceColor(selectedQuery.source),
                                            border: `1px solid ${getSourceColor(selectedQuery.source)}40`,
                                        }}
                                    >
                                        {selectedQuery.source}
                                    </span>
                                }
                            />
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
                                            backgroundColor: getStatusColor(selectedQuery.status).bg,
                                            color: getStatusColor(selectedQuery.status).text,
                                            border: `1px solid ${getStatusColor(selectedQuery.status).border}`,
                                            textTransform: "capitalize",
                                        }}
                                    >
                                        {selectedQuery.status === "in-progress" ? "In Progress" : selectedQuery.status}
                                    </span>
                                }
                            />
                            <DetailRow label="Subject" value={selectedQuery.subject} />
                            <DetailRow label="Date & Time" value={formatDate(selectedQuery.timestamp)} />

                            {/* Full Message */}
                            <div
                                style={{
                                    padding: "16px",
                                    backgroundColor: "rgba(255, 255, 255, 0.03)",
                                    borderRadius: "12px",
                                    border: "1px solid rgba(255, 255, 255, 0.05)",
                                }}
                            >
                                <div style={{ color: "#888", fontSize: "0.875rem", fontWeight: "600", marginBottom: "12px" }}>
                                    Message
                                </div>
                                <p style={{ color: "#fff", fontSize: "0.95rem", lineHeight: "1.6", margin: 0 }}>
                                    {selectedQuery.message}
                                </p>
                            </div>
                        </div>

                        {/* Modal Actions */}
                        <div style={{ display: "flex", gap: "12px", justifyContent: "flex-end" }}>
                            {selectedQuery.status !== "in-progress" && selectedQuery.status !== "resolved" && (
                                <button
                                    onClick={handleMarkInProgress}
                                    style={{
                                        padding: "10px 20px",
                                        backgroundColor: "rgba(245, 158, 11, 0.1)",
                                        border: "1px solid rgba(245, 158, 11, 0.3)",
                                        borderRadius: "8px",
                                        color: "#f59e0b",
                                        fontSize: "0.95rem",
                                        fontWeight: "600",
                                        cursor: "pointer",
                                        transition: "all 0.2s",
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.backgroundColor = "rgba(245, 158, 11, 0.2)";
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.backgroundColor = "rgba(245, 158, 11, 0.1)";
                                    }}
                                >
                                    Mark as In Progress
                                </button>
                            )}

                            {selectedQuery.status !== "resolved" && (
                                <button
                                    onClick={handleMarkResolved}
                                    style={{
                                        padding: "10px 20px",
                                        backgroundColor: "rgba(16, 185, 129, 0.1)",
                                        border: "1px solid rgba(16, 185, 129, 0.3)",
                                        borderRadius: "8px",
                                        color: "#10b981",
                                        fontSize: "0.95rem",
                                        fontWeight: "600",
                                        cursor: "pointer",
                                        transition: "all 0.2s",
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.backgroundColor = "rgba(16, 185, 129, 0.2)";
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.backgroundColor = "rgba(16, 185, 129, 0.1)";
                                    }}
                                >
                                    ✓ Mark as Resolved
                                </button>
                            )}

                            <button
                                onClick={closeModal}
                                style={{
                                    padding: "10px 20px",
                                    backgroundColor: "rgba(255, 255, 255, 0.05)",
                                    border: "1px solid rgba(255, 255, 255, 0.1)",
                                    borderRadius: "8px",
                                    color: "#fff",
                                    fontSize: "0.95rem",
                                    fontWeight: "600",
                                    cursor: "pointer",
                                    transition: "all 0.2s",
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.1)";
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.05)";
                                }}
                            >
                                Close
                            </button>
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
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
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
