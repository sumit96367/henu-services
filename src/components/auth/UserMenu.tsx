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
            <div className={cn("flex items-center gap-2 mr-2", className)}>
                <button
                    onClick={handleSignup}
                    className="px-4 py-2.5 bg-gradient-to-r from-purple-400 to-violet-300 text-white font-semibold rounded-full hover:from-purple-300 hover:to-violet-200 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-400/25"
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
                "flex items-center gap-3 px-3 py-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300",
                className
            )}
        >
            {/* Avatar */}
            <div className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center overflow-hidden shrink-0",
                !user?.profilePicture ? (user?.userType === 'company'
                    ? 'bg-gradient-to-br from-purple-500 to-purple-600'
                    : 'bg-gradient-to-br from-indigo-500 to-indigo-600') : ''
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
            <span className="hidden md:block text-white font-medium text-sm max-w-[120px] truncate">
                {user?.name}
            </span>
        </Link>
    );
};
