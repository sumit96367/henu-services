"use client";

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu as MenuIcon, X as CloseIcon } from "lucide-react";

interface NavItem {
    name: string;
    path: string;
    icon: string;
}

const navItems: NavItem[] = [
    { name: "Dashboard", path: "/admin/dashboard", icon: "📊" },
    { name: "Service Requests", path: "/admin/service-requests", icon: "🛠️" },
    { name: "Internship Enrollments", path: "/admin/enrollments", icon: "👥" },
    { name: "Payments", path: "/admin/payments", icon: "💳" },
    { name: "Invoices", path: "/admin/invoices", icon: "📄" },
    { name: "Queries & Support", path: "/admin/queries", icon: "💬" },
    { name: "Add Software", path: "/admin/software", icon: "📦" },
    { name: "Manage Software", path: "/admin/manage-software", icon: "📋" },
];

export function AdminLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const router = useRouter();
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Lock scroll when mobile menu is open
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isMobileMenuOpen]);

    const handleLogout = async () => {
        setIsLoggingOut(true);

        try {
            await fetch("/api/admin/auth/logout", {
                method: "POST",
            });

            // Redirect to login page
            window.location.href = "/admin/login";
        } catch (error) {
            console.error("Logout failed:", error);
            // Still redirect even if API call fails
            window.location.href = "/admin/login";
        }
    };

    const isActive = (path: string) => pathname === path;

    return (
        <div
            style={{
                minHeight: "100vh",
                backgroundColor: "#000",
                color: "#fff",
                fontFamily: "var(--font-lora), serif",
                position: "relative",
                display: "flex",
            }}
        >
            {/* Mobile Menu Toggle */}
            <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                style={{
                    position: isMobileMenuOpen ? "fixed" : "absolute",
                    top: "22px",
                    left: isMobileMenuOpen ? "216px" : "16px",
                    zIndex: isMobileMenuOpen ? 1001 : 50,
                    display: "none",
                    padding: "8px",
                    backgroundColor: isMobileMenuOpen ? "transparent" : "rgba(255, 255, 255, 0.08)",
                    backdropFilter: isMobileMenuOpen ? "none" : "blur(12px)",
                    border: isMobileMenuOpen ? "none" : "1px solid rgba(255, 255, 255, 0.1)",
                    borderRadius: "12px",
                    color: "#fff",
                    cursor: "pointer",
                    boxShadow: isMobileMenuOpen ? "none" : "0 8px 32px rgba(0, 0, 0, 0.4)",
                    transition: "all 0.3s ease",
                }}
                className="mobile-menu-toggle hover:bg-white/10 active:scale-95"
            >
                <div className="flex items-center justify-center">
                    {isMobileMenuOpen ? <CloseIcon size={28} /> : <MenuIcon size={22} />}
                </div>
            </button>

            {/* Sidebar */}
            <aside
                data-lenis-prevent
                style={{
                    position: "absolute",
                    left: 0,
                    top: 0,
                    bottom: 0,
                    width: "280px",
                    backgroundColor: "rgba(10, 10, 10, 1)",
                    borderRight: "1px solid rgba(255, 255, 255, 0.08)",
                    display: "flex",
                    flexDirection: "column",
                    zIndex: 999,
                    transform: isMobileMenuOpen ? "translateX(0)" : undefined,
                    overflowX: "hidden",
                }}
                className="admin-sidebar"
            >
                {/* Logo/Header */}
                <div
                    style={{
                        padding: "32px 24px",
                        borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
                    }}
                >
                    <h1
                        style={{
                            fontSize: "1.5rem",
                            fontWeight: "bold",
                            background: "linear-gradient(to right, #06b6d4, #3b82f6)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            backgroundClip: "text",
                            marginBottom: "4px",
                        }}
                    >
                        Henu OS
                    </h1>
                    <p style={{ fontSize: "0.875rem", color: "#888" }}>Admin Portal</p>
                </div>

                {/* Navigation */}
                <nav
                    style={{
                        flex: 1,
                        padding: "24px 0",
                        overflowY: "auto",
                    }}
                >
                    {navItems.map((item) => {
                        const active = isActive(item.path);
                        return (
                            <Link
                                key={item.path}
                                href={item.path}
                                onClick={() => setIsMobileMenuOpen(false)}
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "12px",
                                    padding: "14px 24px",
                                    margin: "4px 12px",
                                    borderRadius: "12px",
                                    textDecoration: "none",
                                    color: active ? "#fff" : "#888",
                                    backgroundColor: active
                                        ? "rgba(6, 182, 212, 0.1)"
                                        : "transparent",
                                    borderLeft: active ? "3px solid #06b6d4" : "3px solid transparent",
                                    transition: "all 0.2s ease",
                                    fontWeight: active ? "600" : "500",
                                    fontSize: "0.95rem",
                                }}
                                onMouseEnter={(e) => {
                                    if (!active) {
                                        e.currentTarget.style.backgroundColor =
                                            "rgba(255, 255, 255, 0.03)";
                                        e.currentTarget.style.color = "#fff";
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    if (!active) {
                                        e.currentTarget.style.backgroundColor = "transparent";
                                        e.currentTarget.style.color = "#888";
                                    }
                                }}
                            >
                                <span style={{ fontSize: "20px" }}>{item.icon}</span>
                                <span>{item.name}</span>
                            </Link>
                        );
                    })}
                </nav>

                {/* Logout Button */}
                <div
                    style={{
                        padding: "24px",
                        borderTop: "1px solid rgba(255, 255, 255, 0.08)",
                    }}
                >
                    <button
                        onClick={handleLogout}
                        disabled={isLoggingOut}
                        style={{
                            width: "100%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "8px",
                            padding: "12px",
                            backgroundColor: "rgba(239, 68, 68, 0.1)",
                            border: "1px solid rgba(239, 68, 68, 0.3)",
                            borderRadius: "12px",
                            color: "#ef4444",
                            fontSize: "0.95rem",
                            fontWeight: "600",
                            cursor: isLoggingOut ? "not-allowed" : "pointer",
                            opacity: isLoggingOut ? 0.6 : 1,
                            transition: "all 0.2s ease",
                        }}
                        onMouseEnter={(e) => {
                            if (!isLoggingOut) {
                                e.currentTarget.style.backgroundColor = "rgba(239, 68, 68, 0.2)";
                                e.currentTarget.style.borderColor = "rgba(239, 68, 68, 0.5)";
                            }
                        }}
                        onMouseLeave={(e) => {
                            if (!isLoggingOut) {
                                e.currentTarget.style.backgroundColor = "rgba(239, 68, 68, 0.1)";
                                e.currentTarget.style.borderColor = "rgba(239, 68, 68, 0.3)";
                            }
                        }}
                    >
                        <span style={{ fontSize: "18px" }}>🚪</span>
                        <span>{isLoggingOut ? "Logging out..." : "Logout"}</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main
                style={{
                    marginLeft: "280px",
                    minHeight: "100vh",
                    padding: "40px 48px",
                    flex: 1,
                }}
                className="admin-main-content"
            >
                {children}
            </main>

            {/* Mobile Overlay */}
            {isMobileMenuOpen && (
                <div
                    onClick={() => setIsMobileMenuOpen(false)}
                    style={{
                        position: "fixed",
                        inset: 0,
                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                        zIndex: 998,
                        display: "none",
                    }}
                    className="mobile-overlay"
                />
            )}

            <style jsx>{`
                @media (max-width: 768px) {
                  .mobile-menu-toggle {
                    display: block !important;
                  }

                  .admin-sidebar {
                    transform: translateX(${isMobileMenuOpen ? "0" : "-100%"});
                    transition: transform 0.3s ease;
                  }

                  .admin-main-content {
                    margin-left: 0 !important;
                    padding: 140px 20px 40px 20px !important;
                  }

                  .mobile-overlay {
                    display: block !important;
                  }
                }
              `}</style>
        </div>
    );
}
