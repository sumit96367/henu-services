"use client";

export default function AdminDashboardPage() {
    const cards = [
        {
            title: "Service Requests",
            description: "Manage client service inquiries and project briefs",
            icon: "🛠️",
            href: "/admin/service-requests",
            gradient: "from-cyan-500 to-blue-500",
        },
        {
            title: "Internship Enrollments",
            description: "View all enrolled users and selected domains",
            icon: "👥",
            href: "/admin/enrollments",
            gradient: "from-blue-500 to-cyan-500",
        },
        {
            title: "Payments & Orders",
            description: "Track transactions and update order statuses",
            icon: "💳",
            href: "/admin/payments",
            gradient: "from-green-500 to-emerald-500",
        },
        {
            title: "Invoices",
            description: "Generated invoices sent to users",
            icon: "📄",
            href: "/admin/invoices",
            gradient: "from-purple-500 to-pink-500",
        },
        {
            title: "Queries & Support",
            description: "User queries and contact messages",
            icon: "💬",
            href: "/admin/queries",
            gradient: "from-orange-500 to-red-500",
        },
        {
            title: "Add Software",
            description: "Add new software entries to your portfolio",
            icon: "📦",
            href: "/admin/software",
            gradient: "from-indigo-500 to-purple-500",
        },
        {
            title: "Manage Software",
            description: "View and delete custom software entries",
            icon: "📋",
            href: "/admin/manage-software",
            gradient: "from-purple-500 to-pink-500",
        },
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
                    gridTemplateColumns: "repeat(2, 1fr)",
                    gap: "40px",
                    marginBottom: "80px",
                }}
            >
                {cards.map((card, index) => (
                    <a
                        key={index}
                        href={card.href}
                        style={{
                            backgroundColor: "rgba(255, 255, 255, 0.04)",
                            border: "1px solid rgba(255, 255, 255, 0.12)",
                            borderRadius: "32px",
                            padding: "40px",
                            cursor: "pointer",
                            transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
                            backdropFilter: "blur(40px)",
                            textDecoration: "none",
                            color: "inherit",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            minHeight: "280px",
                            boxShadow: "0 30px 60px -12px rgba(0, 0, 0, 0.5)"
                        }}
                        onMouseOver={(e) => {
                            e.currentTarget.style.transform = "translateY(-8px) scale(1.02)";
                            e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.07)";
                            e.currentTarget.style.borderColor = "rgba(6, 182, 212, 0.5)";
                            e.currentTarget.style.boxShadow = "0 30px 80px rgba(6, 182, 212, 0.15)";
                        }}
                        onMouseOut={(e) => {
                            e.currentTarget.style.transform = "translateY(0) scale(1)";
                            e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.04)";
                            e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.12)";
                            e.currentTarget.style.boxShadow = "0 30px 60px -12px rgba(0, 0, 0, 0.5)";
                        }}
                    >
                        {/* Icon */}
                        <div
                            style={{
                                width: "56px",
                                height: "56px",
                                borderRadius: "16px",
                                background: "linear-gradient(135deg, #06b6d4, #3b82f6)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: "28px",
                                marginBottom: "24px",
                                boxShadow: "0 10px 25px rgba(6, 182, 212, 0.3)",
                            }}
                        >
                            {card.icon}
                        </div>

                        {/* Title */}
                        <h3
                            style={{
                                fontSize: "1.5rem",
                                fontWeight: "900",
                                marginBottom: "12px",
                                color: "#fff",
                                letterSpacing: "-0.02em",
                                textTransform: "uppercase"
                            }}
                        >
                            {card.title}
                        </h3>

                        {/* Description */}
                        <p
                            style={{
                                fontSize: "0.95rem",
                                color: "rgba(255, 255, 255, 0.6)",
                                lineHeight: "1.5",
                                fontWeight: "500"
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
