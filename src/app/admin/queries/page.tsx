export default function QueriesPage() {
    return (
        <div>
            {/* Page Header */}
            <div style={{ marginBottom: "48px" }}>
                <h1
                    style={{
                        fontSize: "2.5rem",
                        fontWeight: "bold",
                        marginBottom: "8px",
                        background: "linear-gradient(to right, #f97316, #ef4444)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                    }}
                >
                    Queries & Support
                </h1>
                <p style={{ fontSize: "1.125rem", color: "#888" }}>
                    Manage user queries and contact messages
                </p>
            </div>

            {/* Empty State */}
            <div
                style={{
                    backgroundColor: "rgba(255, 255, 255, 0.03)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    borderRadius: "20px",
                    padding: "64px 32px",
                    textAlign: "center",
                }}
            >
                <div
                    style={{
                        fontSize: "64px",
                        marginBottom: "24px",
                        opacity: 0.5,
                    }}
                >
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
                    User queries and support messages will be displayed here. Business logic and
                    data fetching have not been implemented yet.
                </p>
            </div>
        </div>
    );
}
