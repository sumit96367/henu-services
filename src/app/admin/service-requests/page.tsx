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
        <div className="admin-page">
            {/* Header */}
            <div style={{ marginBottom: "32px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "8px" }}>
                    <div>
                        <Link href="/admin/dashboard" className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors mb-4 text-sm font-bold uppercase tracking-wider">
                            <ChevronLeft size={16} /> Dashboard
                        </Link>
                        <h1
                            style={{
                                fontSize: "2.5rem",
                                fontWeight: "bold",
                                background: "linear-gradient(to right, #06b6d4, #3b82f6)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                                backgroundClip: "text",
                            }}
                        >
                            Service Requests
                        </h1>
                    </div>
                    <div style={{ textAlign: "right", display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "8px" }}>
                        {requests.filter(r => r.status === "New Inquiry").length > 0 && (
                            <div style={{
                                backgroundColor: "rgba(6, 182, 212, 0.1)",
                                border: "1px solid rgba(6, 182, 212, 0.3)",
                                padding: "4px 12px",
                                borderRadius: "8px",
                                display: "flex",
                                alignItems: "center",
                                gap: "8px"
                            }}>
                                <span style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "#06b6d4", boxShadow: "0 0 10px #06b6d4" }}></span>
                                <span style={{ color: "#06b6d4", fontSize: "0.875rem", fontWeight: "700" }}>
                                    {requests.filter(r => r.status === "New Inquiry").length} New
                                </span>
                            </div>
                        )}
                        <p style={{ fontSize: "1.125rem", color: "#888", margin: 0 }}>
                            {isLoading ? "Loading requests..." : `${filteredRequests.length} total inquiries`}
                        </p>
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div
                style={{
                    backgroundColor: "rgba(255, 255, 255, 0.03)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    borderRadius: "16px",
                    padding: "24px",
                    marginBottom: "24px",
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                    gap: "16px",
                }}
            >
                <div className="relative">
                    <label style={{ display: "block", fontSize: "0.875rem", fontWeight: "600", color: "#ccc", marginBottom: "8px" }}>Search</label>
                    <div style={{ position: "relative" }}>
                        <Search style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#666" }} size={18} />
                        <input
                            type="text"
                            placeholder="Name, Email or ID..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={{
                                width: "100%",
                                padding: "10px 12px 10px 40px",
                                backgroundColor: "rgba(255, 255, 255, 0.05)",
                                border: "1px solid rgba(255, 255, 255, 0.1)",
                                borderRadius: "8px",
                                color: "#fff",
                                fontSize: "0.95rem",
                                outline: "none",
                            }}
                        />
                    </div>
                </div>

                <div>
                    <label style={{ display: "block", fontSize: "0.875rem", fontWeight: "600", color: "#ccc", marginBottom: "8px" }}>Status</label>
                    <select
                        value={selectedStatus}
                        onChange={(e) => setSelectedStatus(e.target.value)}
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
                        <option value="" style={{ backgroundColor: "#1a1a1a" }}>All Statuses</option>
                        <option value="New Inquiry" style={{ backgroundColor: "#1a1a1a" }}>New Inquiry</option>
                        <option value="Processing" style={{ backgroundColor: "#1a1a1a" }}>Processing</option>
                        <option value="Completed" style={{ backgroundColor: "#1a1a1a" }}>Completed</option>
                        <option value="Cancelled" style={{ backgroundColor: "#1a1a1a" }}>Cancelled</option>
                    </select>
                </div>

                <div style={{ display: "flex", alignItems: "flex-end" }}>
                    <button
                        onClick={() => { setSearchTerm(""); setSelectedStatus(""); }}
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
                        }}
                    >
                        Reset Filters
                    </button>
                </div>
            </div>

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
                    <table style={{ width: "100%", borderCollapse: "collapse" }}>
                        <thead>
                            <tr style={{ backgroundColor: "rgba(255, 255, 255, 0.05)" }}>
                                <th style={thStyle}>Date</th>
                                <th style={thStyle}>User</th>
                                <th style={thStyle}>Type</th>
                                <th style={thStyle}>Services</th>
                                <th style={thStyle}>Budget</th>
                                <th style={thStyle}>Status</th>
                                <th style={thStyle}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {isLoading ? (
                                Array.from({ length: 5 }).map((_, i) => (
                                    <tr key={i}><td colSpan={7} style={{ padding: "20px", textAlign: "center" }}><Loader2 className="animate-spin inline mr-2" /> Loading...</td></tr>
                                ))
                            ) : filteredRequests.length === 0 ? (
                                <tr><td colSpan={7} style={{ padding: "40px", textAlign: "center", color: "#666" }}>No service requests found.</td></tr>
                            ) : (
                                filteredRequests.map((request, idx) => {
                                    const status = getStatusColor(request.status, request.statusColor);
                                    return (
                                        <tr
                                            key={request.id}
                                            onClick={() => openModal(request)}
                                            style={{
                                                cursor: "pointer",
                                                borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
                                                backgroundColor: idx % 2 === 0 ? "transparent" : "rgba(255, 255, 255, 0.01)"
                                            }}
                                            className="hover:bg-white/[0.03] transition-colors"
                                        >
                                            <td style={tdStyle}>{formatDate(request.createdAt).split(",")[0]}</td>
                                            <td style={tdStyle}>
                                                <div style={{ fontWeight: "700" }}>{request.fullName}</div>
                                                <div style={{ fontSize: "0.75rem", color: "#666" }}>{request.email}</div>
                                            </td>
                                            <td style={tdStyle}>
                                                <span style={{
                                                    fontSize: "10px",
                                                    fontWeight: "900",
                                                    textTransform: "uppercase",
                                                    padding: "2px 6px",
                                                    borderRadius: "4px",
                                                    backgroundColor: request.userType === 'company' ? 'rgba(168, 85, 247, 0.1)' : 'rgba(59, 130, 246, 0.1)',
                                                    color: request.userType === 'company' ? '#a855f7' : '#3b82f6',
                                                    border: `1px solid ${request.userType === 'company' ? 'rgba(168, 85, 247, 0.2)' : 'rgba(59, 130, 246, 0.2)'}`
                                                }}>
                                                    {request.userType || 'Personal'}
                                                </span>
                                            </td>
                                            <td style={tdStyle}>
                                                <div style={{ fontSize: "0.875rem", maxWidth: "200px" }} className="truncate" title={request.subDomain}>
                                                    {request.subDomain}
                                                </div>
                                            </td>
                                            <td style={tdStyle}>{request.plan}</td>
                                            <td style={tdStyle}>
                                                <span style={{
                                                    padding: "4px 10px",
                                                    borderRadius: "20px",
                                                    fontSize: "0.75rem",
                                                    fontWeight: "bold",
                                                    backgroundColor: status.bg,
                                                    color: status.text,
                                                    border: `1px solid ${status.border}`
                                                }}>
                                                    {request.status}
                                                </span>
                                            </td>
                                            <td style={tdStyle}>
                                                <button
                                                    onClick={(e) => { e.stopPropagation(); openModal(request); }}
                                                    style={{ color: "#06b6d4", fontSize: "0.875rem", fontWeight: "700" }}
                                                >
                                                    View
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
                    style={{
                        position: "fixed",
                        inset: 0,
                        backgroundColor: "rgba(0, 0, 0, 0.85)",
                        backdropFilter: "blur(10px)",
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
                            backgroundColor: "#0a0a0a",
                            border: "1px solid rgba(255, 255, 255, 0.1)",
                            borderRadius: "24px",
                            padding: "40px",
                            maxWidth: "800px",
                            width: "100%",
                            maxHeight: "90vh",
                            overflowY: "auto",
                            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
                            animation: "slideUp 0.3s ease-out",
                        }}
                    >
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "32px" }}>
                            <div>
                                <h2 style={{ fontSize: "2rem", fontWeight: "900", color: "#fff", marginBottom: "4px" }}>Request Details</h2>
                                <p style={{ color: "#666", fontSize: "0.875rem", fontFamily: "monospace" }}>ID: {selectedRequest.id}</p>
                            </div>
                            <button onClick={closeModal} style={{ fontSize: "24px", color: "#444" }}>✕</button>
                        </div>

                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px", marginBottom: "32px" }}>
                            <Card label="Full Name" value={selectedRequest.fullName} icon={<User size={18} />} />
                            <Card label="Email Address" value={selectedRequest.email} icon={<Mail size={18} />} />
                            <Card label="Organization" value={selectedRequest.companyName || "N/A"} icon={<Building2 size={18} />} />
                            <Card label="Budget Range" value={selectedRequest.plan} icon={<IndianRupee size={18} />} />
                            <Card label="Inquiry Date" value={formatDate(selectedRequest.createdAt)} icon={<Calendar size={18} />} />
                            <Card label="Status" value={
                                <select
                                    disabled={updatingId === selectedRequest.id}
                                    value={selectedRequest.status}
                                    onChange={(e) => handleUpdateStatus(selectedRequest.id, e.target.value)}
                                    style={{
                                        backgroundColor: "transparent",
                                        border: "none",
                                        color: "#06b6d4",
                                        fontWeight: "700",
                                        outline: "none",
                                        cursor: "pointer",
                                        fontSize: "1rem"
                                    }}
                                >
                                    <option value="New Inquiry">New Inquiry</option>
                                    <option value="Processing">Processing</option>
                                    <option value="Completed">Completed</option>
                                    <option value="Cancelled">Cancelled</option>
                                </select>
                            } icon={<Clock size={18} />} />
                        </div>

                        <div style={{ marginBottom: "32px" }}>
                            <label style={{ display: "block", color: "#888", fontWeight: "700", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "12px" }}>
                                Selected Services
                            </label>
                            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                                {selectedRequest.subDomain.split(",").map((s, i) => (
                                    <span key={i} style={{ padding: "6px 12px", borderRadius: "8px", backgroundColor: "rgba(255, 255, 255, 0.05)", border: "1px solid rgba(255, 255, 255, 0.1)", color: "#fff", fontSize: "0.875rem" }}>
                                        {s.trim()}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label style={{ display: "block", color: "#888", fontWeight: "700", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "12px" }}>
                                Project Brief
                            </label>
                            <div style={{
                                padding: "24px",
                                backgroundColor: "rgba(255, 255, 255, 0.02)",
                                border: "1px solid rgba(255, 255, 255, 0.05)",
                                borderRadius: "16px",
                                color: "#ccc",
                                lineHeight: "1.6",
                                whiteSpace: "pre-wrap"
                            }}>
                                {selectedRequest.message || "No project brief provided."}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <style jsx>{`
                @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
                @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
            `}</style>
        </div>
    );
}

function Card({ label, value, icon }: { label: string, value: any, icon: any }) {
    return (
        <div style={{
            padding: "20px",
            backgroundColor: "rgba(255, 255, 255, 0.03)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            borderRadius: "16px",
            display: "flex",
            gap: "16px"
        }}>
            <div style={{ color: "#555" }}>{icon}</div>
            <div>
                <div style={{ fontSize: "0.7rem", fontWeight: "800", color: "#555", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "4px" }}>{label}</div>
                <div style={{ fontWeight: "600", color: "#fff" }}>{value}</div>
            </div>
        </div>
    );
}

const thStyle: React.CSSProperties = {
    padding: "16px 20px",
    fontSize: "0.7rem",
    fontWeight: "900",
    textTransform: "uppercase",
    letterSpacing: "0.1em",
    color: "#555",
    textAlign: "left"
};

const tdStyle: React.CSSProperties = {
    padding: "20px",
    fontSize: "0.9rem",
    color: "#ccc"
};
