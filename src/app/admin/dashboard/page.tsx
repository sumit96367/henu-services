"use client";

import { useState } from "react";
import Link from "next/link";

export default function AdminDashboardPage() {
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    const handleLogout = async () => {
        setIsLoggingOut(true);

        try {
            await fetch('/api/admin/auth/logout', {
                method: 'POST',
            });

            // Redirect to login page
            window.location.href = "/admin/login";
        } catch (error) {
            console.error('Logout failed:', error);
            // Still redirect even if API call fails
            window.location.href = "/admin/login";
        }
    };

    const cards = [
        {
            title: "Internship Enrollments",
            description: "View all enrolled users and selected domains",
            icon: "👥",
            gradient: "from-blue-500 to-cyan-500",
            href: "/admin/orders?type=internship_enrollment"
        },
        {
            title: "Payments & Orders",
            description: "Track transactions and update order statuses",
            icon: "💳",
            gradient: "from-green-500 to-emerald-500",
            href: "/admin/orders?type=service_inquiry"
        },
        {
            title: "Invoices",
            description: "Generated invoices sent to users",
            icon: "📄",
            gradient: "from-purple-500 to-pink-500",
            href: "#"
        },
        {
            title: "Queries & Support",
            description: "User queries and contact messages",
            icon: "💬",
            gradient: "from-orange-500 to-red-500",
            href: "/admin/orders"
        }
    ];

    return (
        <div style={{
            minHeight: '100vh',
            backgroundColor: '#000',
            color: '#fff',
            fontFamily: 'system-ui, -apple-system, sans-serif',
            padding: '32px 24px'
        }}>
            {/* Header */}
            <div style={{
                maxWidth: '1200px',
                margin: '0 auto',
                marginBottom: '48px'
            }}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: '16px'
                }}>
                    <div>
                        <h1 style={{
                            fontSize: '2.5rem',
                            fontWeight: 'bold',
                            marginBottom: '8px',
                            background: 'linear-gradient(to right, #06b6d4, #3b82f6)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text'
                        }}>
                            Henu OS – Admin Dashboard
                        </h1>
                        <p style={{
                            fontSize: '1.125rem',
                            color: '#888'
                        }}>
                            Manage internships, payments, and users
                        </p>
                    </div>

                    {/* Logout Button */}
                    <button
                        onClick={handleLogout}
                        disabled={isLoggingOut}
                        style={{
                            padding: '10px 20px',
                            backgroundColor: 'rgba(239, 68, 68, 0.2)',
                            border: '1px solid rgba(239, 68, 68, 0.3)',
                            borderRadius: '12px',
                            color: '#ef4444',
                            fontSize: '14px',
                            fontWeight: '600',
                            cursor: isLoggingOut ? 'not-allowed' : 'pointer',
                            opacity: isLoggingOut ? 0.6 : 1,
                            transition: 'all 0.2s'
                        }}
                        onMouseOver={(e) => {
                            if (!isLoggingOut) {
                                e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.3)';
                                e.currentTarget.style.borderColor = 'rgba(239, 68, 68, 0.5)';
                            }
                        }}
                        onMouseOut={(e) => {
                            if (!isLoggingOut) {
                                e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.2)';
                                e.currentTarget.style.borderColor = 'rgba(239, 68, 68, 0.3)';
                            }
                        }}>
                        {isLoggingOut ? "Logging out..." : "Logout →"}
                    </button>
                </div>
            </div>

            {/* Dashboard Grid */}
            <div style={{
                maxWidth: '1200px',
                margin: '0 auto',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '24px',
                marginBottom: '64px'
            }}>
                {cards.map((card, index) => (
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
                ))}
            </div>

            {/* Footer */}
            <div style={{
                maxWidth: '1200px',
                margin: '0 auto',
                paddingTop: '32px',
                borderTop: '1px solid rgba(255, 255, 255, 0.05)',
                textAlign: 'center'
            }}>
                <p style={{
                    fontSize: '0.875rem',
                    color: '#666'
                }}>
                    Admin access restricted to authorized personnel only
                </p>
            </div>
        </div>
    );
}
