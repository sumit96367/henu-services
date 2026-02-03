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
        <div>
            {/* Page Header */}
            <div style={{ marginBottom: "32px" }}>
                <h1
                    style={{
                        fontSize: "2.5rem",
                        fontWeight: "bold",
                        marginBottom: "8px",
                        background: "linear-gradient(to right, #06b6d4, #3b82f6)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                    }}
                >
                    Internship Enrollments
                </h1>
                <p style={{ fontSize: "1.125rem", color: "#888" }}>
                    {loading
                        ? "Loading enrollments..."
                        : `${filteredEnrollments.length} of ${enrollments.length} enrollments`}
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
                {/* Domain Filter */}
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
                        Domain
                    </label>
                    <select
                        value={selectedDomain}
                        onChange={(e) => setSelectedDomain(e.target.value)}
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
                        <option value="">All Domains</option>
                        {allDomains.map((domain) => (
                            <option key={domain} value={domain}>
                                {domain}
                            </option>
                        ))}
                    </select>
                </div>

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
                        <option value="completed">Completed</option>
                        <option value="pending">Pending</option>
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
                        placeholder="Search by name or email..."
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
                            color: "#06b6d4",
                            fontSize: "0.95rem",
                            fontWeight: "600",
                            cursor: "pointer",
                            transition: "all 0.2s",
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = "rgba(6, 182, 212, 0.1)";
                            e.currentTarget.style.borderColor = "rgba(6, 182, 212, 0.3)";
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
                            ) : filteredEnrollments.length === 0 ? (
                                // Empty State
                                <tr>
                                    <td colSpan={7} style={{ ...tableCellStyle, textAlign: "center", padding: "48px" }}>
                                        <div style={{ fontSize: "48px", marginBottom: "16px", opacity: 0.5 }}>
                                            📋
                                        </div>
                                        <p style={{ color: "#888", fontSize: "1.125rem" }}>
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
                                                backgroundColor: index % 2 === 0 ? "transparent" : "rgba(255, 255, 255, 0.02)",
                                                transition: "all 0.2s",
                                            }}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.backgroundColor = "rgba(6, 182, 212, 0.05)";
                                                e.currentTarget.style.transform = "scale(1.01)";
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.backgroundColor = index % 2 === 0 ? "transparent" : "rgba(255, 255, 255, 0.02)";
                                                e.currentTarget.style.transform = "scale(1)";
                                            }}
                                        >
                                            <td style={tableCellStyle}>{enrollment.fullName}</td>
                                            <td style={tableCellStyle}>{enrollment.email}</td>
                                            <td style={tableCellStyle}>{enrollment.domainCategory}</td>
                                            <td style={tableCellStyle}>{enrollment.subDomain}</td>
                                            <td style={tableCellStyle}>{formatPlan(enrollment.plan)}</td>
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
                                                    {formatPlan(enrollment.status)}
                                                </span>
                                            </td>
                                            <td style={tableCellStyle}>{formatDate(enrollment.timestamp)}</td>
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
                                    background: "linear-gradient(to right, #06b6d4, #3b82f6)",
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent",
                                    backgroundClip: "text",
                                }}
                            >
                                Enrollment Details
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
                            <DetailRow label="ID" value={selectedEnrollment.id} />
                            <DetailRow label="Full Name" value={selectedEnrollment.fullName} />
                            <DetailRow label="Email" value={selectedEnrollment.email} />
                            <DetailRow label="Domain" value={selectedEnrollment.domain} />
                            <DetailRow label="Domain Category" value={selectedEnrollment.domainCategory} />
                            <DetailRow label="Sub-Domain" value={selectedEnrollment.subDomain} />
                            <DetailRow label="Pricing Plan" value={formatPlan(selectedEnrollment.plan)} />
                            <DetailRow label="Amount" value={`₹${selectedEnrollment.amount.toLocaleString()}`} />
                            <DetailRow label="Billing Address" value={selectedEnrollment.billingAddress} />
                            <DetailRow label="Payment Method" value={selectedEnrollment.paymentMethod.toUpperCase()} />
                            <DetailRow label="Order ID" value={selectedEnrollment.orderId} />
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
                                            backgroundColor: getStatusColor(selectedEnrollment.status).bg,
                                            color: getStatusColor(selectedEnrollment.status).text,
                                            border: `1px solid ${getStatusColor(selectedEnrollment.status).border}`,
                                        }}
                                    >
                                        {formatPlan(selectedEnrollment.status)}
                                    </span>
                                }
                            />
                            <DetailRow label="Enrollment Date" value={formatDate(selectedEnrollment.timestamp)} />
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
