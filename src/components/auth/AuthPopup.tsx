'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import { X, LogIn, UserPlus } from 'lucide-react';

export const AuthPopup = () => {
    const { isAuthenticated, setShowAuthModal, setAuthModalMode } = useAuth();
    const [showPopup, setShowPopup] = useState(false);
    const [hasInteracted, setHasInteracted] = useState(false);

    useEffect(() => {
        // Don't show popup if user is authenticated or has interacted
        if (isAuthenticated || hasInteracted) {
            setShowPopup(false);
            return;
        }

        // Show popup every 10 seconds for non-authenticated users
        const interval = setInterval(() => {
            if (!isAuthenticated && !hasInteracted) {
                setShowPopup(true);
            }
        }, 10000);

        // Show first popup after 10 seconds
        const initialTimeout = setTimeout(() => {
            if (!isAuthenticated && !hasInteracted) {
                setShowPopup(true);
            }
        }, 10000);

        return () => {
            clearInterval(interval);
            clearTimeout(initialTimeout);
        };
    }, [isAuthenticated, hasInteracted]);

    const handleClose = () => {
        setShowPopup(false);
        // Don't set hasInteracted on close, allow popup to show again
    };

    const handleSignIn = () => {
        setShowPopup(false);
        setHasInteracted(true);
        setAuthModalMode('login');
        setShowAuthModal(true);
    };

    const handleSignUp = () => {
        setShowPopup(false);
        setHasInteracted(true);
        setAuthModalMode('signup');
        setShowAuthModal(true);
    };

    if (isAuthenticated) return null;

    return (
        <AnimatePresence>
            {showPopup && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[400] flex items-center justify-center p-4"
                >
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
                        onClick={handleClose}
                    />

                    {/* Popup Card */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 50 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 50 }}
                        transition={{ type: 'spring', damping: 20, stiffness: 300 }}
                        className="relative w-[85%] sm:w-full max-w-[320px] sm:max-w-sm"
                    >
                        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0a0a0a] to-[#151515] border border-white/10 shadow-2xl">
                            {/* Animated gradient background */}
                            <div className="absolute inset-0 opacity-40">
                                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-500/20 via-transparent to-indigo-500/20 animate-pulse" />
                            </div>



                            {/* Close button */}
                            <button
                                onClick={handleClose}
                                className="absolute top-4 right-4 p-2 text-white/40 hover:text-white hover:bg-white/10 rounded-full transition-colors z-10"
                            >
                                <X size={18} />
                            </button>

                            <div className="relative flex flex-col items-center text-center p-6 sm:p-8">
                                {/* Logo */}
                                <div className="w-40 h-32 sm:w-56 sm:h-40 -mb-4 relative flex items-center justify-center group">
                                    {/* Logo Glow */}
                                    <div className="absolute inset-0 bg-purple-500/10 blur-[80px] rounded-full" />

                                    <motion.div
                                        animate={{
                                            scale: [1, 1.05, 1],
                                        }}
                                        transition={{
                                            duration: 6,
                                            repeat: Infinity,
                                            ease: "easeInOut"
                                        }}
                                        className="relative w-32 h-32 sm:w-48 sm:h-48 z-10 transition-all duration-500 group-hover:drop-shadow-[0_0_30px_rgba(109, 40, 217, 0.7)]"
                                    >
                                        <Image
                                            src="/logo.png"
                                            alt="Henu OS Logo"
                                            fill
                                            className="object-contain"
                                            priority
                                        />
                                    </motion.div>
                                </div>

                                {/* Content */}
                                <h3 className="text-2xl font-bold text-white mb-2">
                                    Unlock Premium Features
                                </h3>
                                <p className="text-gray-400 mb-6 text-sm leading-relaxed">
                                    Sign in to access exclusive dashboards, pricing details, and personalized services.
                                </p>

                                {/* Buttons */}
                                <div className="flex flex-col gap-3 w-full items-center">
                                    <button
                                        onClick={handleSignIn}
                                        className="!w-[180px] md:!w-64 py-3 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold text-base flex items-center justify-center gap-2.5 hover:from-purple-500 hover:to-indigo-500 transition-all duration-300 hover:scale-[1.02] shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40"
                                    >
                                        <LogIn size={18} />
                                        Sign In
                                    </button>

                                    <button
                                        onClick={handleSignUp}
                                        className="!w-[180px] md:!w-64 py-3 rounded-full bg-white/[0.04] border border-purple-500/20 text-white/90 font-bold text-base flex items-center justify-center gap-2.5 hover:bg-purple-500/10 hover:border-purple-500/40 hover:text-white transition-all duration-300"
                                    >
                                        <UserPlus size={18} />
                                        Create Account
                                    </button>
                                </div>

                                {/* Footer text */}
                                <p className="mt-6 text-xs text-gray-500">
                                    Free sign up • No credit card required
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
