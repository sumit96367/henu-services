'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import { X, LogIn, UserPlus, Sparkles } from 'lucide-react';

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
                        className="relative w-full max-w-sm"
                    >
                        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0a0a0a] to-[#151515] border border-white/10 shadow-2xl">
                            {/* Animated gradient background */}
                            <div className="absolute inset-0 opacity-40">
                                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-cyan-500/20 via-transparent to-amber-500/20 animate-pulse" />
                            </div>

                            {/* Sparkle decorations */}
                            <div className="absolute text-cyan-400 animate-bounce-subtle" style={{ top: '24px', left: '32px' }}>
                                <Sparkles size={20} />
                            </div>
                            <div className="absolute text-amber-400 animate-bounce-subtle delay-200" style={{ top: '48px', right: '48px' }}>
                                <Sparkles size={16} />
                            </div>

                            {/* Close button */}
                            <button
                                onClick={handleClose}
                                className="absolute top-4 right-4 p-2 text-white/40 hover:text-white hover:bg-white/10 rounded-full transition-colors z-10"
                            >
                                <X size={18} />
                            </button>

                            <div className="relative text-center" style={{ padding: '48px 32px 32px 32px' }}>
                                {/* Icon */}
                                <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-amber-500/20 border border-white/10 flex items-center justify-center">
                                    <motion.div
                                        animate={{ rotate: [0, 10, -10, 0] }}
                                        transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                                    >
                                        <Sparkles size={32} className="text-white" />
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
                                <div className="flex flex-col">
                                    <button
                                        onClick={handleSignIn}
                                        className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-cyan-600 text-black font-semibold flex items-center justify-center gap-2 hover:from-cyan-400 hover:to-cyan-500 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-cyan-500/20"
                                    >
                                        <LogIn size={18} />
                                        Sign In
                                    </button>

                                    {/* Spacer */}
                                    <div style={{ height: '24px' }}></div>

                                    <button
                                        onClick={handleSignUp}
                                        className="w-full py-3.5 rounded-xl bg-white/5 border border-white/10 text-white font-semibold flex items-center justify-center gap-2 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
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
