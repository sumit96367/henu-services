"use client";

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu as MenuIcon, X as CloseIcon, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { Spotlight } from "@/components/ui/spotlight";

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
                backgroundColor: "transparent",
                color: "#fff",
                fontFamily: "var(--font-lora), serif",
                position: "relative",
                display: "flex",
                overflow: "hidden"
            }}
        >
            {/* Background elements to match home page */}
            <div className="absolute inset-0 pointer-events-none -z-10">
                <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="white" />
                <div className="horizon-grid opacity-30" />
                <div className="grid-background opacity-20" />
            </div>
            {/* Mobile Menu Toggle */}
            <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                style={{
                    position: "absolute",
                    top: "140px",
                    left: "20px",
                    zIndex: 50,
                    display: isMobileMenuOpen ? "none" : "flex",
                    padding: "10px",
                    backgroundColor: "rgba(255, 255, 255, 0.08)",
                    backdropFilter: "blur(12px)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    borderRadius: "12px",
                    color: "#fff",
                    cursor: "pointer",
                    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4)",
                    transition: "all 0.3s ease",
                    alignItems: "center",
                    justifyContent: "center"
                }}
                className={cn(
                    "mobile-menu-toggle hover:bg-white/10 active:scale-95",
                    isMobileMenuOpen ? "hidden" : "flex md:hidden"
                )}
            >
                <MenuIcon size={24} />
            </button>

            {/* Sidebar */}
            <aside
                data-lenis-prevent
                style={{
                    position: "fixed",
                    left: 0,
                    top: 0,
                    bottom: 0,
                    width: "min(300px, 80vw)",
                    backgroundColor: "rgba(2, 2, 5, 0.95)",
                    backdropFilter: "blur(20px)",
                    borderRight: "1px solid rgba(255, 255, 255, 0.05)",
                    display: "flex",
                    flexDirection: "column",
                    zIndex: 999,
                    transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    overflowX: "hidden",
                }}
                className="admin-sidebar"
            >
                {/* Logo/Header */}
                <div
                    style={{
                        padding: "40px 28px",
                        borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
                        position: "relative",
                    }}
                    className="group cursor-default"
                >
                    {/* Mobile Close Button inside Sidebar */}
                    <button
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="md:hidden absolute top-6 right-6 p-2 text-white/50 hover:text-white hover:bg-white/10 rounded-xl transition-all"
                    >
                        <CloseIcon size={24} />
                    </button>
                    <h1
                        style={{
                            fontSize: "1.5rem",
                            fontWeight: "bold",
                            background: "linear-gradient(to right, #06b6d4, #3b82f6)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            backgroundClip: "text",
                            marginBottom: "4px",
                            transition: "all 0.3s ease",
                        }}
                        className="group-hover:[text-shadow:0_0_12px_rgba(109,40,217,0.8)]"
                    >
                        Henu OS
                    </h1>
                    <p style={{ fontSize: "0.875rem", color: "#888" }} className="group-hover:text-gray-300 transition-colors">Admin Portal</p>
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
                                    width: "calc(100% - 32px)",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "18px",
                                    padding: "22px 32px",
                                    margin: "8px 16px",
                                    borderRadius: "20px",
                                    cursor: "pointer",
                                    backgroundColor: active
                                        ? "rgba(109, 40, 217, 0.15)"
                                        : "transparent",
                                    color: active ? "#fff" : "#888",
                                    borderLeft: active ? "4px solid #6D28D9" : "4px solid transparent",
                                    borderTop: "none",
                                    borderRight: "none",
                                    borderBottom: "none",
                                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                                    fontWeight: active ? "700" : "500",
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

                    {/* Logout Button moved inside nav area to be closer */}
                    <div className="mt-4 pt-4 border-t border-white/5">
                        <button
                            onClick={handleLogout}
                            disabled={isLoggingOut}
                            style={{
                                width: "calc(100% - 32px)",
                                display: "flex",
                                alignItems: "center",
                                gap: "18px",
                                padding: "20px 32px",
                                margin: "4px 16px",
                                borderRadius: "20px",
                                cursor: isLoggingOut ? "not-allowed" : "pointer",
                                backgroundColor: "rgba(239, 68, 68, 0.05)",
                                color: "#ef4444",
                                border: "1px solid rgba(239, 68, 68, 0.1)",
                                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                                fontWeight: "600",
                                fontSize: "0.95rem",
                                opacity: isLoggingOut ? 0.6 : 1,
                            }}
                            onMouseEnter={(e) => {
                                if (!isLoggingOut) {
                                    e.currentTarget.style.backgroundColor = "rgba(239, 68, 68, 0.15)";
                                    e.currentTarget.style.color = "#ff5f5f";
                                }
                            }}
                            onMouseLeave={(e) => {
                                if (!isLoggingOut) {
                                    e.currentTarget.style.backgroundColor = "rgba(239, 68, 68, 0.05)";
                                    e.currentTarget.style.color = "#ef4444";
                                }
                            }}
                        >
                            <LogOut size={20} />
                            <span>{isLoggingOut ? "Logging out..." : "Logout"}</span>
                        </button>
                    </div>
                </nav>
            </aside>

            {/* Main Content */}
            <main
                style={{
                    marginLeft: "300px",
                    minHeight: "100vh",
                    padding: "240px max(24px, 5%) 40px max(24px, 5%)",
                    flex: 1,
                    maxWidth: "1400px",
                    marginRight: "auto",
                }}
                className="admin-main-content"
            >
                {children}
            </main>

            {/* Mobile Overlay */}
            {
                isMobileMenuOpen && (
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
                )
            }

            <style jsx>{`
                @media (max-width: 768px) {
                  .mobile-menu-toggle {
                    display: block !important;
                  }

                  .admin-sidebar {
                    transform: ${isMobileMenuOpen ? "translateX(0)" : "translateX(-100%)"} !important;
                    transition: transform 0.3s ease;
                  }

                  .admin-main-content {
                    margin-left: 0 !important;
                    padding: 300px 20px 40px 20px !important;
                  }

                  .mobile-overlay {
                    display: block !important;
                  }
                }
              `}</style>
        </div >
    );
}
