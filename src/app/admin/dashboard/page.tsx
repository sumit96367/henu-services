"use client";

export default function AdminDashboardPage() {
    const cards = [
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
                    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                    gap: "24px",
                    marginBottom: "64px",
                }}
            >
                {cards.map((card, index) => (
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
