'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import {
    User,
    ShoppingBag,
    FileText,
    MapPin,
    UserCircle,
    Lock,
    UserX,
    LogOut,
    Menu as MenuIcon,
    X as CloseIcon,
    Settings
} from 'lucide-react';

const sidebarItems = [
    { icon: User, label: 'My Account', id: 'account', path: '/dashboard' },
    { icon: ShoppingBag, label: 'Orders', id: 'orders', path: '/dashboard' },
    { icon: FileText, label: 'Quotes', id: 'quotes', path: '/dashboard/quotes' },
    { icon: MapPin, label: 'Addresses', id: 'addresses', path: '/dashboard' },
    { icon: Settings, label: 'Settings', id: 'settings', path: '/dashboard' },
    { icon: UserCircle, label: 'Profile', id: 'profile', path: '/dashboard' },
    { icon: Lock, label: 'Change Password', id: 'password', path: '/dashboard' },
    { icon: UserX, label: 'Deactivate Account', id: 'deactivate', path: '/dashboard' },
    { icon: LogOut, label: 'Logout', id: 'logout', path: null },
];

interface DashboardLayoutWrapperProps {
    children: React.ReactNode;
}

export default function DashboardLayoutWrapper({ children }: DashboardLayoutWrapperProps) {
    const router = useRouter();
    const pathname = usePathname();
    const { user, logout } = useAuth();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [profilePicture, setProfilePicture] = useState<string>('');

    useEffect(() => {
        if (user?.profilePicture) {
            setProfilePicture(user.profilePicture);
        }
    }, [user]);

    const handleSidebarClick = (id: string, path: string | null) => {
        if (id === 'logout') {
            logout();
            router.push('/');
        } else if (path) {
            router.push(path);
        }
        setIsMobileMenuOpen(false);
    };

    const getActiveId = () => {
        if (pathname?.startsWith('/dashboard/quotes')) return 'quotes';
        if (pathname === '/dashboard') return 'account';
        return '';
    };

    const activeId = getActiveId();

    return (
        <div className="min-h-screen bg-background flex flex-col md:flex-row dashboard-layout relative">
            {/* Mobile Menu Toggle */}
            <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                style={{
                    position: isMobileMenuOpen ? 'fixed' : 'absolute',
                    top: isMobileMenuOpen ? '22px' : '85px',
                    left: isMobileMenuOpen ? '216px' : '16px',
                    zIndex: isMobileMenuOpen ? 1001 : 50,
                    display: 'none',
                    padding: '8px',
                    backgroundColor: isMobileMenuOpen ? 'transparent' : 'rgba(255, 255, 255, 0.08)',
                    backdropFilter: isMobileMenuOpen ? 'none' : 'blur(12px)',
                    border: isMobileMenuOpen ? 'none' : '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '12px',
                    color: '#fff',
                    cursor: 'pointer',
                    boxShadow: isMobileMenuOpen ? 'none' : '0 8px 32px rgba(0, 0, 0, 0.4)',
                    transition: 'all 0.3s ease',
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
                    position: 'fixed',
                    left: 0,
                    top: 0,
                    bottom: 0,
                    width: '300px',
                    backgroundColor: 'rgba(2, 2, 5, 0.95)',
                    backdropFilter: 'blur(20px)',
                    borderRight: '1px solid rgba(255, 255, 255, 0.05)',
                    display: 'flex',
                    flexDirection: 'column',
                    zIndex: 999,
                    transform: isMobileMenuOpen ? 'translateX(0)' : undefined,
                    overflowX: 'hidden',
                }}
                className="dashboard-sidebar shadow-2xl"
            >
                {/* User Profile Header */}
                <div
                    style={{
                        padding: '40px 28px',
                        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                    }}
                >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                        <div
                            style={{
                                width: '48px',
                                height: '48px',
                                borderRadius: '50%',
                                background: (profilePicture || user?.profilePicture) ? 'transparent' : 'linear-gradient(to bottom right, #06b6d4, #3b82f6)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '20px',
                                fontWeight: 'bold',
                                color: '#fff',
                                overflow: 'hidden',
                            }}
                        >
                            {(profilePicture || user?.profilePicture) ? (
                                <img
                                    src={profilePicture || user?.profilePicture}
                                    alt="Profile"
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                />
                            ) : (
                                user?.name?.charAt(0).toUpperCase()
                            )}
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                            <h3
                                style={{
                                    fontSize: '1rem',
                                    fontWeight: '600',
                                    color: '#fff',
                                    margin: 0,
                                    marginBottom: '2px',
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                }}
                            >
                                {user?.name}
                            </h3>
                            <p
                                style={{
                                    fontSize: '0.75rem',
                                    color: '#888',
                                    margin: 0,
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                }}
                            >
                                {user?.email}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Navigation */}
                <nav
                    style={{
                        flex: 1,
                        padding: '24px 0',
                        overflowY: 'auto',
                    }}
                    className="custom-scrollbar"
                >
                    {sidebarItems.map((item) => {
                        const active = activeId === item.id;
                        return (
                            <button
                                key={item.id}
                                onClick={() => handleSidebarClick(item.id, item.path)}
                                style={{
                                    width: 'calc(100% - 32px)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '18px',
                                    padding: '22px 32px',
                                    margin: '8px 16px',
                                    borderRadius: '20px',
                                    textDecoration: 'none',
                                    color: active ? '#fff' : '#888',
                                    backgroundColor: active
                                        ? 'rgba(109, 40, 217, 0.15)'
                                        : 'transparent',
                                    borderLeft: active ? '4px solid #6D28D9' : '4px solid transparent',
                                    borderTop: 'none',
                                    borderRight: 'none',
                                    borderBottom: 'none',
                                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                    fontWeight: active ? '700' : '500',
                                    fontSize: '0.95rem',
                                    cursor: 'pointer',
                                    fontFamily: 'inherit',
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    boxShadow: active ? '0 4px 12px rgba(109, 40, 217, 0.15)' : 'none'
                                }}
                                onMouseEnter={(e) => {
                                    if (!active) {
                                        e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.03)';
                                        e.currentTarget.style.color = '#fff';
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    if (!active) {
                                        e.currentTarget.style.backgroundColor = 'transparent';
                                        e.currentTarget.style.color = '#888';
                                    }
                                }}
                            >
                                <item.icon size={20} />
                                <span>{item.label}</span>
                            </button>
                        );
                    })}
                </nav>
            </aside>

            {/* Main Content Area with sidebar margin */}
            <main
                style={{
                    marginLeft: '300px',
                    minHeight: '100vh',
                    flex: 1,
                    width: '100%',
                }}
                className="dashboard-main-content"
            >
                {children}
            </main>

            {/* Mobile Overlay */}
            {
                isMobileMenuOpen && (
                    <div
                        onClick={() => setIsMobileMenuOpen(false)}
                        style={{
                            position: 'fixed',
                            inset: 0,
                            backgroundColor: 'rgba(0, 0, 0, 0.5)',
                            zIndex: 998,
                            display: 'none',
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

                    .dashboard-sidebar {
                        transform: ${isMobileMenuOpen ? 'translateX(0)' : 'translateX(-100%)'};
                        transition: transform 0.3s ease;
                    }

                    .dashboard-main-content {
                        margin-left: 0 !important;
                    }

                    .mobile-overlay {
                        display: block !important;
                    }
                }
            `}</style>
        </div>
    );
}
