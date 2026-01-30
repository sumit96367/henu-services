'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import {
    User,
    LogOut,
    LayoutDashboard,
    Settings,
    ChevronDown,
    Building2,
    Sparkles
} from 'lucide-react';

export const UserMenu = () => {
    const { user, isAuthenticated, logout, setShowAuthModal, setAuthModalMode } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleLogin = () => {
        setAuthModalMode('login');
        setShowAuthModal(true);
    };

    const handleSignup = () => {
        setAuthModalMode('signup');
        setShowAuthModal(true);
    };

    const handleLogout = () => {
        logout();
        setIsOpen(false);
    };

    if (!isAuthenticated) {
        return (
            <div className="flex items-center gap-3">
                <button
                    onClick={handleLogin}
                    className="px-4 py-2 text-white/80 hover:text-white font-medium transition-colors"
                >
                    Sign In
                </button>
                <button
                    onClick={handleSignup}
                    className="px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-cyan-600 text-black font-semibold rounded-full hover:from-cyan-400 hover:to-cyan-500 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/25"
                >
                    Get Started
                </button>
            </div>
        );
    }

    return (
        <div ref={menuRef} className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-3 px-3 py-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
            >
                {/* Avatar */}
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${user?.userType === 'company'
                        ? 'bg-gradient-to-br from-cyan-500 to-cyan-600'
                        : 'bg-gradient-to-br from-amber-500 to-amber-600'
                    }`}>
                    {user?.userType === 'company' ? (
                        <Building2 size={16} className="text-black" />
                    ) : (
                        <User size={16} className="text-black" />
                    )}
                </div>

                {/* Name (hidden on mobile) */}
                <span className="hidden md:block text-white font-medium text-sm max-w-[120px] truncate">
                    {user?.name}
                </span>

                <ChevronDown
                    size={16}
                    className={`text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 mt-2 w-64 rounded-2xl bg-[#0a0a0a] border border-white/10 shadow-2xl overflow-hidden z-50"
                    >
                        {/* User info header */}
                        <div className="p-4 border-b border-white/5">
                            <div className="flex items-center gap-3">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${user?.userType === 'company'
                                        ? 'bg-gradient-to-br from-cyan-500 to-cyan-600'
                                        : 'bg-gradient-to-br from-amber-500 to-amber-600'
                                    }`}>
                                    {user?.userType === 'company' ? (
                                        <Building2 size={20} className="text-black" />
                                    ) : (
                                        <User size={20} className="text-black" />
                                    )}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-white font-medium truncate">{user?.name}</p>
                                    <p className="text-xs text-gray-400 truncate">{user?.email}</p>
                                </div>
                            </div>
                            <div className="mt-3">
                                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${user?.userType === 'company'
                                        ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20'
                                        : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                                    }`}>
                                    <Sparkles size={12} />
                                    {user?.userType === 'company' ? 'Company Account' : 'Personal Account'}
                                </span>
                            </div>
                        </div>

                        {/* Menu items */}
                        <div className="p-2">
                            <Link
                                href="/dashboard"
                                onClick={() => setIsOpen(false)}
                                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
                            >
                                <LayoutDashboard size={18} />
                                <span>Dashboard</span>
                            </Link>
                            <Link
                                href="/settings"
                                onClick={() => setIsOpen(false)}
                                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
                            >
                                <Settings size={18} />
                                <span>Settings</span>
                            </Link>
                        </div>

                        {/* Logout */}
                        <div className="p-2 border-t border-white/5">
                            <button
                                onClick={handleLogout}
                                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors"
                            >
                                <LogOut size={18} />
                                <span>Sign Out</span>
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
