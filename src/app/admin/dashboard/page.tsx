"use client";

<<<<<<< HEAD
=======
import { useState } from "react";
import Link from "next/link";

>>>>>>> 57bbeb0238bb65f3c5e16e5a3c3bc28e16dc3d02
export default function AdminDashboardPage() {
    const cards = [
        {
            title: "Internship Enrollments",
            description: "View all enrolled users and selected domains",
            icon: "👥",
<<<<<<< HEAD
            href: "/admin/enrollments",
            gradient: "from-blue-500 to-cyan-500",
=======
            gradient: "from-blue-500 to-cyan-500",
            href: "/admin/orders?type=internship_enrollment"
>>>>>>> 57bbeb0238bb65f3c5e16e5a3c3bc28e16dc3d02
        },
        {
            title: "Payments & Orders",
            description: "Track transactions and update order statuses",
            icon: "💳",
<<<<<<< HEAD
            href: "/admin/payments",
            gradient: "from-green-500 to-emerald-500",
=======
            gradient: "from-green-500 to-emerald-500",
            href: "/admin/orders?type=service_inquiry"
>>>>>>> 57bbeb0238bb65f3c5e16e5a3c3bc28e16dc3d02
        },
        {
            title: "Invoices",
            description: "Generated invoices sent to users",
            icon: "📄",
<<<<<<< HEAD
            href: "/admin/invoices",
            gradient: "from-purple-500 to-pink-500",
=======
            gradient: "from-purple-500 to-pink-500",
            href: "#"
>>>>>>> 57bbeb0238bb65f3c5e16e5a3c3bc28e16dc3d02
        },
        {
            title: "Queries & Support",
            description: "User queries and contact messages",
            icon: "💬",
<<<<<<< HEAD
            href: "/admin/queries",
            gradient: "from-orange-500 to-red-500",
        },
=======
            gradient: "from-orange-500 to-red-500",
            href: "/admin/orders"
        }
>>>>>>> 57bbeb0238bb65f3c5e16e5a3c3bc28e16dc3d02
    ];

    return (
        <div>
            {/* Page Header */}
            <div style={{ marginBottom: "48px" }}>
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
                    Dashboard
                </h1>
                <p style={{ fontSize: "1.125rem", color: "#888" }}>
                    Manage internships, payments, and users
                </p>
            </div>

            {/* Dashboard Grid */}
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                    gap: "24px",
                    marginBottom: "64px",
                }}
            >
                {cards.map((card, index) => (
<<<<<<< HEAD
                    <a
                        key={index}
                        href={card.href}
                        style={{
                            backgroundColor: "rgba(255, 255, 255, 0.03)",
                            border: "1px solid rgba(255, 255, 255, 0.1)",
                            borderRadius: "20px",
                            padding: "32px",
                            cursor: "pointer",
                            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                            backdropFilter: "blur(10px)",
                            textDecoration: "none",
                            color: "inherit",
                            display: "block",
                        }}
                        onMouseOver={(e) => {
                            e.currentTarget.style.transform = "translateY(-4px) scale(1.02)";
                            e.currentTarget.style.backgroundColor =
                                "rgba(255, 255, 255, 0.05)";
                            e.currentTarget.style.borderColor = "rgba(6, 182, 212, 0.4)";
                            e.currentTarget.style.boxShadow =
                                "0 20px 60px rgba(6, 182, 212, 0.2)";
                        }}
                        onMouseOut={(e) => {
                            e.currentTarget.style.transform = "translateY(0) scale(1)";
                            e.currentTarget.style.backgroundColor =
                                "rgba(255, 255, 255, 0.03)";
                            e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.1)";
                            e.currentTarget.style.boxShadow = "none";
                        }}
                    >
                        {/* Icon */}
                        <div
                            style={{
                                width: "64px",
                                height: "64px",
                                borderRadius: "16px",
                                background: "linear-gradient(135deg, #06b6d4, #3b82f6)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: "32px",
                                marginBottom: "20px",
                                boxShadow: "0 8px 24px rgba(6, 182, 212, 0.2)",
                            }}
                        >
                            {card.icon}
                        </div>

                        {/* Title */}
                        <h3
                            style={{
                                fontSize: "1.375rem",
                                fontWeight: "bold",
                                marginBottom: "8px",
                                color: "#fff",
                            }}
                        >
                            {card.title}
                        </h3>

                        {/* Description */}
                        <p
                            style={{
                                fontSize: "0.95rem",
                                color: "#888",
                                lineHeight: "1.6",
                            }}
                        >
                            {card.description}
                        </p>

                        {/* Arrow indicator */}
                        <div
                            style={{
                                marginTop: "16px",
                                color: "#06b6d4",
                                fontSize: "1.25rem",
                                fontWeight: "bold",
                            }}
                        >
                            →
                        </div>
                    </a>
=======
                    <Link key={index} href={card.href} style={{ textDecoration: 'none' }}>
                        <div
                            style={{
                                backgroundColor: 'rgba(255, 255, 255, 0.03)',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                borderRadius: '20px',
                                padding: '32px',
                                cursor: 'pointer',
                                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                backdropFilter: 'blur(10px)',
                                position: 'relative',
                                overflow: 'hidden',
                                height: '100%'
                            }}
                            onMouseOver={(e) => {
                                e.currentTarget.style.transform = 'translateY(-4px) scale(1.02)';
                                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                                e.currentTarget.style.borderColor = 'rgba(6, 182, 212, 0.4)';
                                e.currentTarget.style.boxShadow = '0 20px 60px rgba(6, 182, 212, 0.2)';
                            }}
                            onMouseOut={(e) => {
                                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.03)';
                                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                                e.currentTarget.style.boxShadow = 'none';
                            }}
                        >
                            {/* Icon */}
                            <div style={{
                                width: '64px',
                                height: '64px',
                                borderRadius: '16px',
                                background: `linear-gradient(135deg, ${card.gradient.replace('from-', 'var(--tw-gradient-from, ').replace(' to-', '), var(--tw-gradient-to, ')}))`,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '32px',
                                marginBottom: '20px',
                                boxShadow: '0 8px 24px rgba(6, 182, 212, 0.2)'
                            }}>
                                {card.icon}
                            </div>

                            {/* Title */}
                            <h3 style={{
                                fontSize: '1.375rem',
                                fontWeight: 'bold',
                                marginBottom: '8px',
                                color: '#fff'
                            }}>
                                {card.title}
                            </h3>

                            {/* Description */}
                            <p style={{
                                fontSize: '0.95rem',
                                color: '#888',
                                lineHeight: '1.6'
                            }}>
                                {card.description}
                            </p>

                            {/* Arrow indicator */}
                            <div style={{
                                marginTop: '16px',
                                color: '#06b6d4',
                                fontSize: '1.25rem',
                                fontWeight: 'bold'
                            }}>
                                →
                            </div>
                        </div>
                    </Link>
>>>>>>> 57bbeb0238bb65f3c5e16e5a3c3bc28e16dc3d02
                ))}
            </div>

            {/* Footer Note */}
            <div
                style={{
                    paddingTop: "32px",
                    borderTop: "1px solid rgba(255, 255, 255, 0.05)",
                    textAlign: "center",
                }}
            >
                <p style={{ fontSize: "0.875rem", color: "#666" }}>
                    Admin access restricted to authorized personnel only
                </p>
            </div>
        </div>
    );
}
