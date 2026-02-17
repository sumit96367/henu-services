"use client";

import { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import { collection, query, where, orderBy, getDocs, updateDoc, doc } from "firebase/firestore";
import {
    ChevronLeft,
    Search,
    Filter,
    Package,
    User,
    Mail,
    Calendar,
    CheckCircle2,
    Clock,
    AlertCircle,
    Loader2,
    Briefcase,
    Building2,
    IndianRupee,
    MessageSquare
} from "lucide-react";
import Link from "next/link";

interface ServiceRequest {
    id: string;
    orderNumber?: string;
    fullName: string;
    email: string;
    domain: string;
    subDomain: string; // This holds the selected services
    plan: string; // This holds the budget
    status: string;
    statusColor: string;
    createdAt: any;
    message?: string;
    userType?: string;
    companyName?: string;
    type?: string;
}

export default function ServiceRequestsPage() {
    const [requests, setRequests] = useState<ServiceRequest[]>([]);
    const [filteredRequests, setFilteredRequests] = useState<ServiceRequest[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("");
    const [selectedRequest, setSelectedRequest] = useState<ServiceRequest | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [updatingId, setUpdatingId] = useState<string | null>(null);

    useEffect(() => {
        fetchRequests();
    }, []);

    const fetchRequests = async () => {
        setIsLoading(true);
        try {
            const response = await fetch("/api/admin/service-requests");
            if (!response.ok) throw new Error("Failed to fetch");
            const data = await response.json();

            const fetched = data.requests.map((req: any) => ({
                ...req,
                createdAt: new Date(req.createdAt)
            }));

            setRequests(fetched);
            setFilteredRequests(fetched);
        } catch (error) {
            console.error("Error fetching service requests:", error);
        } finally {
            setIsLoading(false);
        }
    };

    // Apply filters
    useEffect(() => {
        let filtered = [...requests];

        if (selectedStatus) {
            filtered = filtered.filter(r => r.status === selectedStatus);
        }

        if (searchTerm) {
            const query = searchTerm.toLowerCase();
            filtered = filtered.filter(
                r =>
                    r.fullName.toLowerCase().includes(query) ||
                    r.email.toLowerCase().includes(query) ||
                    r.orderNumber?.toLowerCase().includes(query) ||
                    r.id.toLowerCase().includes(query)
            );
        }

        setFilteredRequests(filtered);
    }, [searchTerm, selectedStatus, requests]);

    const handleUpdateStatus = async (requestId: string, newStatus: string) => {
        setUpdatingId(requestId);

        let statusColor = "amber";
        if (newStatus === "Completed" || newStatus === "Resolved") statusColor = "green";
        if (newStatus === "Processing") statusColor = "cyan";
        if (newStatus === "Failed" || newStatus === "Cancelled") statusColor = "rose";

        try {
            const response = await fetch("/api/admin/orders/update", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ orderId: requestId, status: newStatus, statusColor })
            });

            if (response.ok) {
                setRequests(prev => prev.map(r => r.id === requestId ? { ...r, status: newStatus, statusColor } : r));
                if (selectedRequest?.id === requestId) {
                    setSelectedRequest(prev => prev ? { ...prev, status: newStatus, statusColor } : null);
                }
            } else {
                alert("Failed to update status");
            }
        } catch (error) {
            console.error("Error updating status:", error);
        } finally {
            setUpdatingId(null);
        }
    };

    const formatDate = (date: any) => {
        if (!date) return "N/A";
        const d = date instanceof Date ? date : date.toDate ? date.toDate() : new Date(date);
        return d.toLocaleDateString("en-IN", {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit"
        });
    };

    const openModal = (request: ServiceRequest) => {
        setSelectedRequest(request);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setTimeout(() => setSelectedRequest(null), 300);
    };

    const getStatusColor = (status: string, statusColor: string) => {
        switch (statusColor) {
            case "green":
            case "emerald":
                return { bg: "rgba(16, 185, 129, 0.1)", text: "#10b981", border: "rgba(16, 185, 129, 0.3)" };
            case "cyan":
            case "blue":
                return { bg: "rgba(6, 182, 212, 0.1)", text: "#06b6d4", border: "rgba(6, 182, 212, 0.3)" };
            case "rose":
            case "red":
                return { bg: "rgba(244, 63, 94, 0.1)", text: "#f43f5e", border: "rgba(244, 63, 94, 0.3)" };
            default:
                return { bg: "rgba(245, 158, 11, 0.1)", text: "#f59e0b", border: "rgba(245, 158, 11, 0.3)" };
        }
    };

    return (
        <div className="admin-page-container">
            {/* Header */}
            <div className="page-header" style={{ marginBottom: "32px" }}>
                <div className="header-content" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "8px" }}>
                    <div className="header-left">
                        <Link href="/admin/dashboard" className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors mb-4 text-sm font-bold uppercase tracking-wider">
                            <ChevronLeft size={16} /> Dashboard
                        </Link>
                        <h1
                            style={{
                                fontWeight: "900",
                                background: "linear-gradient(to right, #06b6d4, #3b82f6)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                                backgroundClip: "text",
                                letterSpacing: "-0.02em"
                            }}
                            className="page-title"
                        >
                            Service Requests
                        </h1>
                    </div>
                    <div className="header-right" style={{ textAlign: "right", display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "10px" }}>
                        {requests.filter(r => r.status === "New Inquiry").length > 0 && (
                            <div className="new-badge" style={{
                                backgroundColor: "rgba(6, 182, 212, 0.1)",
                                border: "1px solid rgba(6, 182, 212, 0.3)",
                                padding: "6px 14px",
                                borderRadius: "10px",
                                display: "flex",
                                alignItems: "center",
                                gap: "8px"
                            }}>
                                <span style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "#06b6d4", boxShadow: "0 0 12px #06b6d4" }}></span>
                                <span style={{ color: "#06b6d4", fontSize: "0.85rem", fontWeight: "800", textTransform: "uppercase" }}>
                                    {requests.filter(r => r.status === "New Inquiry").length} New
                                </span>
                            </div>
                        )}
                        <p className="request-count" style={{ color: "#888", margin: 0, fontWeight: "500" }}>
                            {isLoading ? "Loading requests..." : `${filteredRequests.length} total inquiries`}
                        </p>
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div
                className="filters-grid"
                style={{
                    backgroundColor: "rgba(255, 255, 255, 0.03)",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                    borderRadius: "24px",
                    padding: "24px",
                    marginBottom: "32px",
                    display: "grid",
                    gap: "20px",
                    backdropFilter: "blur(20px)"
                }}
            >
                <div className="filter-item">
                    <label style={{ display: "block", fontSize: "0.75rem", fontWeight: "800", color: "#555", marginBottom: "10px", textTransform: "uppercase", letterSpacing: "0.05em" }}>Search</label>
                    <div style={{ position: "relative" }}>
                        <Search style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: "#444" }} size={18} />
                        <input
                            type="text"
                            placeholder="Name, Email or ID..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={{
                                width: "100%",
                                padding: "14px 16px 14px 44px",
                                backgroundColor: "rgba(255, 255, 255, 0.04)",
                                border: "1px solid rgba(255, 255, 255, 0.1)",
                                borderRadius: "14px",
                                color: "#fff",
                                fontSize: "1rem",
                                outline: "none",
                                transition: "all 0.3s ease"
                            }}
                            className="focus:border-cyan-500/50 focus:bg-white/[0.06]"
                        />
                    </div>
                </div>

                <div className="filter-item">
                    <label style={{ display: "block", fontSize: "0.75rem", fontWeight: "800", color: "#555", marginBottom: "10px", textTransform: "uppercase", letterSpacing: "0.05em" }}>Status Filter</label>
                    <select
                        value={selectedStatus}
                        onChange={(e) => setSelectedStatus(e.target.value)}
                        style={{
                            width: "100%",
                            padding: "14px 16px",
                            backgroundColor: "rgba(255, 255, 255, 0.04)",
                            border: "1px solid rgba(255, 255, 255, 0.1)",
                            borderRadius: "14px",
                            color: "#fff",
                            fontSize: "1rem",
                            outline: "none",
                            cursor: "pointer",
                            appearance: "none",
                            backgroundImage: "url(\"data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e\")",
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "right 16px center",
                            backgroundSize: "16px"
                        }}
                    >
                        <option value="" style={{ backgroundColor: "#0a0a0a" }}>All Statuses</option>
                        <option value="New Inquiry" style={{ backgroundColor: "#0a0a0a" }}>New Inquiry</option>
                        <option value="Processing" style={{ backgroundColor: "#0a0a0a" }}>Processing</option>
                        <option value="Completed" style={{ backgroundColor: "#0a0a0a" }}>Completed</option>
                        <option value="Cancelled" style={{ backgroundColor: "#0a0a0a" }}>Cancelled</option>
                    </select>
                </div>

                <div className="filter-item" style={{ display: "flex", alignItems: "flex-end" }}>
                    <button
                        onClick={() => { setSearchTerm(""); setSelectedStatus(""); }}
                        style={{
                            width: "100%",
                            padding: "14px 16px",
                            backgroundColor: "rgba(6, 182, 212, 0.08)",
                            border: "1px solid rgba(6, 182, 212, 0.2)",
                            borderRadius: "14px",
                            color: "#06b6d4",
                            fontSize: "1rem",
                            fontWeight: "800",
                            cursor: "pointer",
                            transition: "all 0.3s ease",
                            textTransform: "uppercase",
                            letterSpacing: "0.05em"
                        }}
                        className="hover:bg-cyan-500/20 active:scale-95"
                    >
                        Reset All
                    </button>
                </div>
            </div>

            {/* Table */}
            <div
                style={{
                    backgroundColor: "rgba(255, 255, 255, 0.02)",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                    borderRadius: "24px",
                    overflow: "hidden",
                    backdropFilter: "blur(20px)"
                }}
            >
                <div style={{ overflowX: "auto" }} className="scrollbar-hide">
                    <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "800px" }}>
                        <thead>
                            <tr style={{ backgroundColor: "rgba(255, 255, 255, 0.04)" }}>
                                <th style={thStyle}>Inquiry Date</th>
                                <th style={thStyle}>Lead Details</th>
                                <th style={thStyle}>Client Type</th>
                                <th style={thStyle}>Requested Services</th>
                                <th style={thStyle}>Budget</th>
                                <th style={thStyle}>Process Status</th>
                                <th style={thStyle}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {isLoading ? (
                                Array.from({ length: 5 }).map((_, i) => (
                                    <tr key={i}><td colSpan={7} style={{ padding: "40px", textAlign: "center" }}><Loader2 className="animate-spin inline mr-3 text-cyan-500" /> <span style={{ color: "#444", fontWeight: "700" }}>Fetching data...</span></td></tr>
                                ))
                            ) : filteredRequests.length === 0 ? (
                                <tr><td colSpan={7} style={{ padding: "60px", textAlign: "center", color: "#555", fontWeight: "600" }}>No service requests found matching your filters.</td></tr>
                            ) : (
                                filteredRequests.map((request, idx) => {
                                    const status = getStatusColor(request.status, request.statusColor);
                                    return (
                                        <tr
                                            key={request.id}
                                            onClick={() => openModal(request)}
                                            style={{
                                                cursor: "pointer",
                                                borderBottom: "1px solid rgba(255, 255, 255, 0.04)",
                                                transition: "all 0.2s ease"
                                            }}
                                            className="hover:bg-white/[0.04]"
                                        >
                                            <td style={tdStyle}>{formatDate(request.createdAt).split(",")[0]}</td>
                                            <td style={tdStyle}>
                                                <div style={{ fontWeight: "800", color: "#fff", fontSize: "1rem" }}>{request.fullName}</div>
                                                <div style={{ fontSize: "0.8rem", color: "#555", fontWeight: "600" }}>{request.email}</div>
                                            </td>
                                            <td style={tdStyle}>
                                                <span style={{
                                                    fontSize: "10px",
                                                    fontWeight: "900",
                                                    textTransform: "uppercase",
                                                    padding: "4px 8px",
                                                    borderRadius: "6px",
                                                    backgroundColor: request.userType === 'company' ? 'rgba(168, 85, 247, 0.1)' : 'rgba(59, 130, 246, 0.1)',
                                                    color: request.userType === 'company' ? '#a855f7' : '#3b82f6',
                                                    border: `1px solid ${request.userType === 'company' ? 'rgba(168, 85, 247, 0.2)' : 'rgba(59, 130, 246, 0.2)'}`,
                                                    letterSpacing: "0.05em"
                                                }}>
                                                    {request.userType || 'Personal'}
                                                </span>
                                            </td>
                                            <td style={tdStyle}>
                                                <div style={{ fontSize: "0.9rem", maxWidth: "220px", color: "#888", fontWeight: "500" }} className="truncate" title={request.subDomain}>
                                                    {request.subDomain}
                                                </div>
                                            </td>
                                            <td style={tdStyle}><span style={{ fontWeight: "700", color: "#ccc" }}>{request.plan}</span></td>
                                            <td style={tdStyle}>
                                                <span style={{
                                                    padding: "6px 14px",
                                                    borderRadius: "12px",
                                                    fontSize: "0.75rem",
                                                    fontWeight: "800",
                                                    backgroundColor: status.bg,
                                                    color: status.text,
                                                    border: `1px solid ${status.border}`,
                                                    textTransform: "uppercase",
                                                    letterSpacing: "0.05em"
                                                }}>
                                                    {request.status}
                                                </span>
                                            </td>
                                            <td style={tdStyle}>
                                                <button
                                                    onClick={(e) => { e.stopPropagation(); openModal(request); }}
                                                    style={{ color: "#06b6d4", fontSize: "0.85rem", fontWeight: "900", textTransform: "uppercase", letterSpacing: "0.05em" }}
                                                    className="hover:underline"
                                                >
                                                    View Details
                                                </button>
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
            {isModalOpen && selectedRequest && (
                <div
                    onClick={closeModal}
                    className="modal-overlay"
                    style={{
                        position: "fixed",
                        inset: 0,
                        backgroundColor: "rgba(0, 0, 0, 0.9)",
                        backdropFilter: "blur(15px)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        zIndex: 2000,
                        padding: "20px",
                    }}
                >
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className="modal-container"
                        style={{
                            backgroundColor: "#050505",
                            border: "1px solid rgba(255, 255, 255, 0.1)",
                            borderRadius: "32px",
                            padding: "40px",
                            maxWidth: "900px",
                            width: "100%",
                            maxHeight: "90vh",
                            overflowY: "auto",
                            boxShadow: "0 40px 100px rgba(0, 0, 0, 0.8)",
                            position: "relative"
                        }}
                    >
                        <div className="modal-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "40px" }}>
                            <div>
                                <h2 style={{ fontWeight: "900", color: "#fff", marginBottom: "8px", letterSpacing: "-0.03em" }} className="modal-title">Request Intelligence</h2>
                                <p style={{ color: "#444", fontSize: "0.8rem", fontWeight: "800", textTransform: "uppercase", letterSpacing: "0.1em" }}>Tracking ID: {selectedRequest.id}</p>
                            </div>
                            <button onClick={closeModal} style={{ width: "44px", height: "44px", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "14px", backgroundColor: "rgba(255, 255, 255, 0.05)", color: "#fff", fontSize: "20px" }} className="hover:bg-red-500/20 hover:text-red-500 transition-all">✕</button>
                        </div>

                        <div className="modal-grid" style={{ display: "grid", gap: "20px", marginBottom: "40px" }}>
                            <Card label="Full Name" value={selectedRequest.fullName} icon={<User size={20} />} />
                            <Card label="Email Point" value={selectedRequest.email} icon={<Mail size={20} />} />
                            <Card label="Entity Name" value={selectedRequest.companyName || "N/A"} icon={<Building2 size={20} />} />
                            <Card label="Budget Scale" value={selectedRequest.plan} icon={<IndianRupee size={20} />} />
                            <Card label="Engagement Date" value={formatDate(selectedRequest.createdAt)} icon={<Calendar size={20} />} />
                            <Card label="Lifecycle Status" value={
                                <select
                                    disabled={updatingId === selectedRequest.id}
                                    value={selectedRequest.status}
                                    onChange={(e) => handleUpdateStatus(selectedRequest.id, e.target.value)}
                                    style={{
                                        backgroundColor: "rgba(6, 182, 212, 0.1)",
                                        border: "1px solid rgba(6, 182, 212, 0.2)",
                                        borderRadius: "10px",
                                        padding: "6px 12px",
                                        color: "#06b6d4",
                                        fontWeight: "800",
                                        outline: "none",
                                        cursor: "pointer",
                                        fontSize: "0.95rem",
                                        appearance: "none",
                                        textAlign: "center"
                                    }}
                                >
                                    <option value="New Inquiry">New Inquiry</option>
                                    <option value="Processing">Processing</option>
                                    <option value="Completed">Completed</option>
                                    <option value="Cancelled">Cancelled</option>
                                </select>
                            } icon={<Clock size={20} />} />
                        </div>

                        <div style={{ marginBottom: "40px" }}>
                            <label style={{ display: "block", color: "#444", fontWeight: "900", fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: "16px" }}>
                                Identified Solutions
                            </label>
                            <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
                                {selectedRequest.subDomain.split(",").map((s, i) => (
                                    <span key={i} style={{ padding: "10px 20px", borderRadius: "14px", backgroundColor: "rgba(6, 182, 212, 0.05)", border: "1px solid rgba(6, 182, 212, 0.15)", color: "#06b6d4", fontSize: "0.9rem", fontWeight: "700" }}>
                                        {s.trim()}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label style={{ display: "block", color: "#444", fontWeight: "900", fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: "16px" }}>
                                Strategic Intent
                            </label>
                            <div style={{
                                padding: "28px",
                                backgroundColor: "rgba(255, 255, 255, 0.02)",
                                border: "1px solid rgba(255, 255, 255, 0.06)",
                                borderRadius: "20px",
                                color: "#999",
                                fontSize: "1.05rem",
                                lineHeight: "1.7",
                                whiteSpace: "pre-wrap",
                                fontWeight: "500"
                            }}>
                                {selectedRequest.message || "No project brief provided."}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <style jsx>{`
                .admin-page-container {
                    padding: 0;
                    max-width: 100%;
                }
                .page-title {
                    font-size: 3.5rem;
                }
                .filters-grid {
                    grid-template-columns: repeat(3, 1fr);
                }
                .modal-grid {
                    grid-template-columns: repeat(2, 1fr);
                }
                .modal-title {
                    font-size: 2.5rem;
                }

                @media (max-width: 1280px) {
                    .page-title { font-size: 2.75rem; }
                    .filters-grid { grid-template-columns: 1fr 1fr; }
                }

                @media (max-width: 1024px) {
                    .header-content {
                        flex-direction: column;
                        align-items: flex-start !important;
                        gap: 20px;
                    }
                    .header-right {
                        align-items: flex-start !important;
                        text-align: left !important;
                    }
                }

                @media (max-width: 768px) {
                    .page-title { font-size: 2.25rem; }
                    .filters-grid { grid-template-columns: 1fr; }
                    .modal-grid { grid-template-columns: 1fr; }
                    .modal-title { font-size: 1.75rem; }
                    .modal-container { padding: 30px !important; }
                }

                @media (max-width: 480px) {
                    .page-title { font-size: 1.75rem; }
                    .modal-container { padding: 20px !important; borderRadius: 24px !important; }
                    .modal-title { font-size: 1.5rem; }
                }

                .scrollbar-hide::-webkit-scrollbar { display: none; }
                .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
            `}</style>
        </div>
    );
}

function Card({ label, value, icon }: { label: string, value: any, icon: any }) {
    return (
        <div style={{
            padding: "24px",
            backgroundColor: "rgba(255, 255, 255, 0.03)",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            borderRadius: "20px",
            display: "flex",
            gap: "20px",
            alignItems: "center"
        }}>
            <div style={{
                width: "48px",
                height: "48px",
                borderRadius: "14px",
                backgroundColor: "rgba(255, 255, 255, 0.04)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#444"
            }}>{icon}</div>
            <div>
                <div style={{ fontSize: "0.7rem", fontWeight: "900", color: "#444", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "6px" }}>{label}</div>
                <div style={{ fontWeight: "700", color: "#fff", fontSize: "1.05rem" }}>{value}</div>
            </div>
        </div>
    );
}

const thStyle: React.CSSProperties = {
    padding: "20px 24px",
    fontSize: "0.7rem",
    fontWeight: "900",
    textTransform: "uppercase",
    letterSpacing: "0.15em",
    color: "#444",
    textAlign: "left",
    whiteSpace: "nowrap"
};

const tdStyle: React.CSSProperties = {
    padding: "24px",
    fontSize: "0.95rem",
    color: "#ccc",
    verticalAlign: "middle"
};

