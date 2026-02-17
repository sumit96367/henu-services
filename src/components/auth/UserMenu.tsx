'use client';

import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import {
    User,
    Building2
} from 'lucide-react';

export const UserMenu = ({ className }: { className?: string }) => {
    const { user, isAuthenticated, setShowAuthModal, setAuthModalMode } = useAuth();


    const handleSignup = () => {
        setAuthModalMode('signup');
        setShowAuthModal(true);
    };

    if (!isAuthenticated) {
        return (
            <div className={cn("flex items-center gap-2", className)}>
                <button
                    onClick={handleSignup}
                    className="bg-white text-black font-semibold rounded-lg hover:scale-105 transition-all duration-300 shadow-[0_0_15px_rgba(255,255,255,0.3)] hover:shadow-[0_0_25px_rgba(255,255,255,0.5)]"
                    style={{ padding: '0.2cm' }}
                >
                    Get Started
                </button>
            </div>
        );
    }

    return (
        <Link
            href="/dashboard"
            className={cn(
                "flex items-center rounded-full transition-all duration-300 hover:shadow-[0_0_15px_rgba(168,85,247,0.2)] hover:scale-[1.02]",
                className
            )}
            style={{
                padding: '6px 22px 6px 6px',
                gap: '12px',
                background: '#ffffff',
                border: 'none',
                boxShadow: '0 0 20px rgba(255, 255, 255, 0.4)'
            }}
        >
            {/* Avatar */}
            <div className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center overflow-hidden shrink-0",
                !user?.profilePicture ? (user?.userType === 'company'
                    ? 'bg-gradient-to-br from-purple-600 to-indigo-600'
                    : 'bg-gradient-to-br from-purple-600 to-indigo-600') : ''
            )}>
                {user?.profilePicture ? (
                    <img src={user.profilePicture} alt={user.name} className="w-full h-full object-cover" />
                ) : user?.userType === 'company' ? (
                    <Building2 size={16} className="text-white" />
                ) : (
                    <User size={16} className="text-white" />
                )}
            </div>

            {/* Name */}
            <span className="hidden md:block text-black font-bold text-sm max-w-[200px] truncate">
                {user?.name}
            </span>
        </Link>
    );
};
