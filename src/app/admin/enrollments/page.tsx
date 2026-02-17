"use client";

import { useState, useEffect } from "react";
import type { EnrollmentRecord } from "@/types/admin";

export default function EnrollmentsPage() {
    const [enrollments, setEnrollments] = useState<EnrollmentRecord[]>([]);
    const [filteredEnrollments, setFilteredEnrollments] = useState<EnrollmentRecord[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Filter states
    const [selectedDomain, setSelectedDomain] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("");
    const [searchQuery, setSearchQuery] = useState("");

    // Modal state
    const [selectedEnrollment, setSelectedEnrollment] = useState<EnrollmentRecord | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Fetch enrollments
    useEffect(() => {
        fetchEnrollments();
    }, []);

    const fetchEnrollments = async () => {
        try {
            setLoading(true);
            const response = await fetch("/api/admin/enrollments");

            if (!response.ok) {
                throw new Error("Failed to fetch enrollments");
            }

            const data = await response.json();
            setEnrollments(data.enrollments || []);
            setFilteredEnrollments(data.enrollments || []);
        } catch (err) {
            setError("Failed to load enrollments. Please try again.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    // Apply filters
    useEffect(() => {
        let filtered = [...enrollments];

        // Domain filter
        if (selectedDomain) {
            filtered = filtered.filter((e) => e.domainCategory === selectedDomain);
        }

        // Status filter
        if (selectedStatus) {
            filtered = filtered.filter((e) => e.status === selectedStatus);
        }

        // Search filter
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter(
                (e) =>
                    e.fullName.toLowerCase().includes(query) ||
                    e.email.toLowerCase().includes(query)
            );
        }

        setFilteredEnrollments(filtered);
    }, [selectedDomain, selectedStatus, searchQuery, enrollments]);

    const clearFilters = () => {
        setSelectedDomain("");
        setSelectedStatus("");
        setSearchQuery("");
    };

    const openModal = (enrollment: EnrollmentRecord) => {
        setSelectedEnrollment(enrollment);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setTimeout(() => setSelectedEnrollment(null), 300);
    };

    // All available domains (static list - matches careers page exactly)
    const allDomains = [
        "Big Tech / Product Tech",
        "AI / ML / Data Science",
        "Cyber Security & Networking",
        "Software Development (SDE)",
        "Finance & Trading",
        "Startup & Growth",
        "Research & Innovation",
        "Cloud, DevOps & AdTech",
        "Global Tech & Remote",
        "Design & Creative",
        "Languages"
    ];

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("en-IN", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    };

    const formatPlan = (plan: string) => {
        return plan.charAt(0).toUpperCase() + plan.slice(1);
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case "completed":
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
            {/* Page Header */}
            <div className="page-header" style={{ marginBottom: "32px" }}>
                <h1
                    style={{
                        fontWeight: "900",
                        marginBottom: "12px",
                        background: "linear-gradient(to right, #06b6d4, #3b82f6)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                        letterSpacing: "-0.03em"
                    }}
                    className="page-title"
                >
                    Internship Enrollments
                </h1>
                <p className="page-subtitle" style={{ color: "#888", fontWeight: "500" }}>
                    {loading
                        ? "Loading enrollments..."
                        : `${filteredEnrollments.length} of ${enrollments.length} enrollments`}
                </p>
            </div>

            {/* Filters Section */}
            <div
                className="filters-grid"
                style={{
                    backgroundColor: "rgba(255, 255, 255, 0.03)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    borderRadius: "24px",
                    padding: "32px",
                    marginBottom: "32px",
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                    gap: "24px",
                    backdropFilter: "blur(20px)"
                }}
            >
                {/* Domain Filter */}
                <div className="filter-item">
                    <label
                        style={{
                            display: "block",
                            fontSize: "0.75rem",
                            fontWeight: "800",
                            color: "#555",
                            marginBottom: "10px",
                            textTransform: "uppercase",
                            letterSpacing: "0.1em"
                        }}
                    >
                        Domain
                    </label>
                    <select
                        value={selectedDomain}
                        onChange={(e) => setSelectedDomain(e.target.value)}
                        className="admin-select"
                        style={{
                            width: "100%",
                            padding: "14px 16px",
                            backgroundColor: "rgba(255, 255, 255, 0.04)",
                            border: "1px solid rgba(255, 255, 255, 0.1)",
                            borderRadius: "12px",
                            color: "#fff",
                            fontSize: "1rem",
                            outline: "none",
                            cursor: "pointer",
                            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                        }}
                    >
                        <option value="">All Domains</option>
                        {allDomains.map((domain) => (
                            <option key={domain} value={domain}>
                                {domain}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Status Filter */}
                <div className="filter-item">
                    <label
                        style={{
                            display: "block",
                            fontSize: "0.75rem",
                            fontWeight: "800",
                            color: "#555",
                            marginBottom: "10px",
                            textTransform: "uppercase",
                            letterSpacing: "0.1em"
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
                            padding: "14px 16px",
                            backgroundColor: "rgba(255, 255, 255, 0.04)",
                            border: "1px solid rgba(255, 255, 255, 0.1)",
                            borderRadius: "12px",
                            color: "#fff",
                            fontSize: "1rem",
                            outline: "none",
                            cursor: "pointer",
                            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                        }}
                    >
                        <option value="">All Status</option>
                        <option value="completed">Completed</option>
                        <option value="pending">Pending</option>
                        <option value="failed">Failed</option>
                    </select>
                </div>

                {/* Search */}
                <div className="filter-item">
                    <label
                        style={{
                            display: "block",
                            fontSize: "0.75rem",
                            fontWeight: "800",
                            color: "#555",
                            marginBottom: "10px",
                            textTransform: "uppercase",
                            letterSpacing: "0.1em"
                        }}
                    >
                        Search
                    </label>
                    <input
                        type="text"
                        placeholder="Name or email..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        style={{
                            width: "100%",
                            padding: "14px 16px",
                            backgroundColor: "rgba(255, 255, 255, 0.04)",
                            border: "1px solid rgba(255, 255, 255, 0.1)",
                            borderRadius: "12px",
                            color: "#fff",
                            fontSize: "1rem",
                            outline: "none",
                            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                        }}
                    />
                </div>

                {/* Clear Filters */}
                <div className="filter-item clear-btn-row" style={{ display: "flex", alignItems: "flex-end" }}>
                    <button
                        onClick={clearFilters}
                        style={{
                            width: "100%",
                            padding: "14px 20px",
                            backgroundColor: "rgba(255, 255, 255, 0.04)",
                            border: "1px solid rgba(255, 255, 255, 0.1)",
                            borderRadius: "12px",
                            color: "#06b6d4",
                            fontSize: "0.85rem",
                            fontWeight: "900",
                            cursor: "pointer",
                            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                            textTransform: "uppercase",
                            letterSpacing: "0.1em"
                        }}
                        className="hover:bg-cyan-500/10 hover:border-cyan-500/30 active:scale-95"
                    >
                        Clear Filters
                    </button>
                </div>
            </div>

            {/* Error State */}
            {error && (
                <div
                    style={{
                        backgroundColor: "rgba(239, 68, 68, 0.05)",
                        border: "1px solid rgba(239, 68, 68, 0.2)",
                        borderRadius: "16px",
                        padding: "20px 24px",
                        marginBottom: "32px",
                        color: "#ef4444",
                        fontSize: "0.95rem",
                        fontWeight: "600",
                        backdropFilter: "blur(10px)"
                    }}
                >
                    ✕ {error}
                </div>
            )}

            {/* Table wrapper for scrolling */}
            <div
                className="table-container"
                style={{
                    backgroundColor: "rgba(255, 255, 255, 0.02)",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                    borderRadius: "24px",
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
                                    backgroundColor: "rgba(255, 255, 255, 0.04)",
                                    position: "sticky",
                                    top: 0,
                                    zIndex: 10,
                                }}
                            >
                                <th style={tableHeaderStyle}>Full Name</th>
                                <th style={tableHeaderStyle}>Email</th>
                                <th style={tableHeaderStyle}>Domain</th>
                                <th style={tableHeaderStyle}>Sub-Domain</th>
                                <th style={tableHeaderStyle}>Plan</th>
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
                                                        height: "18px",
                                                        backgroundColor: "rgba(255, 255, 255, 0.05)",
                                                        borderRadius: "4px",
                                                        animation: "pulse 1.5s ease-in-out infinite",
                                                        width: i % 2 === 0 ? "80%" : "60%"
                                                    }}
                                                />
                                            </td>
                                        ))}
                                    </tr>
                                ))
                            ) : filteredEnrollments.length === 0 ? (
                                // Empty State
                                <tr>
                                    <td colSpan={7} style={{ ...tableCellStyle, textAlign: "center", padding: "80px 24px" }}>
                                        <div style={{ fontSize: "64px", marginBottom: "20px", opacity: 0.3 }}>
                                            📋
                                        </div>
                                        <p style={{ color: "#555", fontSize: "1.25rem", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                                            No enrollments found
                                        </p>
                                    </td>
                                </tr>
                            ) : (
                                // Data Rows
                                filteredEnrollments.map((enrollment, index) => {
                                    const statusColors = getStatusColor(enrollment.status);
                                    return (
                                        <tr
                                            key={enrollment.id}
                                            onClick={() => openModal(enrollment)}
                                            style={{
                                                cursor: "pointer",
                                                backgroundColor: index % 2 === 0 ? "transparent" : "rgba(255, 255, 255, 0.01)",
                                                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                                            }}
                                            className="hover:bg-cyan-500/5 active:scale-[0.995]"
                                        >
                                            <td style={{ ...tableCellStyle, fontWeight: "700" }}>{enrollment.fullName}</td>
                                            <td style={tableCellStyle}>{enrollment.email}</td>
                                            <td style={tableCellStyle}>
                                                <span style={{ fontSize: "0.8rem", color: "#888", fontWeight: "600", textTransform: "uppercase" }}>
                                                    {enrollment.domainCategory}
                                                </span>
                                            </td>
                                            <td style={tableCellStyle}>{enrollment.subDomain}</td>
                                            <td style={tableCellStyle}>
                                                <span style={{ fontWeight: "700", color: "#06b6d4" }}>
                                                    {formatPlan(enrollment.plan)}
                                                </span>
                                            </td>
                                            <td style={tableCellStyle}>
                                                <span
                                                    style={{
                                                        display: "inline-block",
                                                        padding: "6px 14px",
                                                        borderRadius: "10px",
                                                        fontSize: "0.75rem",
                                                        fontWeight: "800",
                                                        backgroundColor: statusColors.bg,
                                                        color: statusColors.text,
                                                        border: `1px solid ${statusColors.border}`,
                                                        textTransform: "uppercase",
                                                        letterSpacing: "0.05em"
                                                    }}
                                                >
                                                    {formatPlan(enrollment.status)}
                                                </span>
                                            </td>
                                            <td style={{ ...tableCellStyle, color: "#888", fontSize: "0.85rem" }}>
                                                {formatDate(enrollment.timestamp)}
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Details Modal */}
            {isModalOpen && selectedEnrollment && (
                <div
                    className="modal-overlay"
                    onClick={closeModal}
                    style={{
                        position: "fixed",
                        inset: 0,
                        backgroundColor: "rgba(0, 0, 0, 0.8)",
                        backdropFilter: "blur(12px)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        zIndex: 1000,
                        padding: "20px",
                    }}
                >
                    <div
                        className="modal-card"
                        onClick={(e) => e.stopPropagation()}
                        style={{
                            backgroundColor: "rgba(10, 10, 20, 0.95)",
                            border: "1px solid rgba(255, 255, 255, 0.1)",
                            borderRadius: "32px",
                            padding: "48px",
                            maxWidth: "700px",
                            width: "100%",
                            maxHeight: "85vh",
                            overflowY: "auto",
                            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)"
                        }}
                    >
                        {/* Modal Header */}
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "40px" }}>
                            <div>
                                <h2
                                    style={{
                                        fontSize: "2rem",
                                        fontWeight: "900",
                                        background: "linear-gradient(to right, #06b6d4, #3b82f6)",
                                        WebkitBackgroundClip: "text",
                                        WebkitTextFillColor: "transparent",
                                        backgroundClip: "text",
                                        letterSpacing: "-0.02em",
                                        marginBottom: "8px"
                                    }}
                                >
                                    Enrollment Logic
                                </h2>
                                <p style={{ color: "#555", fontSize: "0.9rem", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                                    Full Transaction Details
                                </p>
                            </div>
                            <button
                                onClick={closeModal}
                                style={{
                                    backgroundColor: "rgba(255, 255, 255, 0.05)",
                                    border: "1px solid rgba(255, 255, 255, 0.1)",
                                    borderRadius: "16px",
                                    width: "48px",
                                    height: "48px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    color: "#fff",
                                    fontSize: "1.25rem",
                                    cursor: "pointer",
                                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                                }}
                                className="hover:bg-red-500/10 hover:border-red-500/30 hover:text-red-400"
                            >
                                ✕
                            </button>
                        </div>

                        {/* Modal Content */}
                        <div style={{ display: "grid", gap: "16px" }}>
                            <DetailRow label="ID" value={selectedEnrollment.id} />
                            <DetailRow label="Full Name" value={selectedEnrollment.fullName} />
                            <DetailRow label="Email" value={selectedEnrollment.email} />
                            <DetailRow label="Domain" value={selectedEnrollment.domain} />
                            <DetailRow label="Category" value={selectedEnrollment.domainCategory} />
                            <DetailRow label="Sub-Domain" value={selectedEnrollment.subDomain} />
                            <DetailRow label="Pricing Plan" value={<span style={{ fontWeight: "800", color: "#06b6d4" }}>{formatPlan(selectedEnrollment.plan)}</span>} />
                            <DetailRow label="Amount" value={<span style={{ fontWeight: "800", color: "#10b981" }}>₹{selectedEnrollment.amount.toLocaleString()}</span>} />
                            <DetailRow label="Billing Address" value={selectedEnrollment.billingAddress} />
                            <DetailRow label="Payment Method" value={<span style={{ textTransform: "uppercase", fontWeight: "700" }}>{selectedEnrollment.paymentMethod}</span>} />
                            <DetailRow label="Order ID" value={selectedEnrollment.orderId} />
                            <DetailRow
                                label="Status"
                                value={
                                    <span
                                        style={{
                                            display: "inline-block",
                                            padding: "6px 20px",
                                            borderRadius: "10px",
                                            fontSize: "0.8rem",
                                            fontWeight: "800",
                                            backgroundColor: getStatusColor(selectedEnrollment.status).bg,
                                            color: getStatusColor(selectedEnrollment.status).text,
                                            border: `1px solid ${getStatusColor(selectedEnrollment.status).border}`,
                                            textTransform: "uppercase"
                                        }}
                                    >
                                        {formatPlan(selectedEnrollment.status)}
                                    </span>
                                }
                            />
                            <DetailRow label="Enrolled On" value={formatDate(selectedEnrollment.timestamp)} />
                        </div>

                        <div style={{ marginTop: "40px" }}>
                            <button
                                onClick={closeModal}
                                style={{
                                    width: "100%",
                                    padding: "20px",
                                    background: "linear-gradient(135deg, #06b6d4, #3b82f6)",
                                    border: "none",
                                    borderRadius: "16px",
                                    color: "#fff",
                                    fontSize: "1rem",
                                    fontWeight: "900",
                                    textTransform: "uppercase",
                                    letterSpacing: "0.1em",
                                    cursor: "pointer",
                                    boxShadow: "0 10px 30px rgba(6, 182, 212, 0.3)",
                                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                                }}
                                className="hover:scale-[1.02] active:scale-95"
                            >
                                Close Details
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
                .page-subtitle {
                    font-size: 1.25rem;
                }

                .modal-overlay {
                    animation: fadeInModal 0.3s ease-out;
                }
                .modal-card {
                    animation: slideUpModal 0.4s cubic-bezier(0.16, 1, 0.3, 1);
                }

                @keyframes fadeInModal {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes slideUpModal {
                    from { opacity: 0; transform: translateY(30px) scale(0.95); }
                    to { opacity: 1; transform: translateY(0) scale(1); }
                }

                @keyframes pulse {
                    0%, 100% { opacity: 0.4; }
                    50% { opacity: 0.8; }
                }

                /* Dark background for select dropdown options */
                :global(.admin-select option) {
                    background-color: #0a0a0a;
                    color: #fff;
                    padding: 12px;
                }

                @media (max-width: 1024px) {
                    .page-title { font-size: 2.75rem; }
                    .filters-grid { padding: 24px !important; }
                }

                @media (max-width: 768px) {
                    .page-title { font-size: 2.25rem; }
                    .filters-grid { grid-template-columns: 1fr !important; gap: 16px !important; }
                    .clear-btn-row { margin-top: 8px; }
                    .modal-card { padding: 32px 24px !important; borderRadius: 24px !important; }
                }

                @media (max-width: 480px) {
                    .page-title { font-size: 2rem; }
                    .page-subtitle { font-size: 1rem; }
                    .filters-grid { padding: 20px !important; }
                    .modal-card { padding: 24px 16px !important; }
                }
            `}</style>
        </div>
    );
}

function DetailRow({ label, value }: { label: string; value: React.ReactNode }) {
    return (
        <div
            className="detail-row"
            style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                padding: "16px 20px",
                backgroundColor: "rgba(255, 255, 255, 0.02)",
                borderRadius: "14px",
                border: "1px solid rgba(255, 255, 255, 0.04)",
                transition: "all 0.3s ease"
            }}
        >
            <span style={{ color: "#555", fontSize: "0.7rem", fontWeight: "800", textTransform: "uppercase", letterSpacing: "0.05em", marginTop: "2px" }}>
                {label}
            </span>
            <span style={{ color: "#fff", fontSize: "0.95rem", textAlign: "right", maxWidth: "65%", fontWeight: "500", lineHeight: "1.4" }}>
                {value}
            </span>
        </div>
    );
}

const tableHeaderStyle: React.CSSProperties = {
    padding: "20px 24px",
    textAlign: "left",
    color: "#555",
    fontWeight: "800",
    fontSize: "0.75rem",
    textTransform: "uppercase",
    letterSpacing: "0.1em",
    borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
};

const tableCellStyle: React.CSSProperties = {
    padding: "20px 24px",
    color: "#fff",
    borderBottom: "1px solid rgba(255, 255, 255, 0.04)",
    whiteSpace: "nowrap"
};
