'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, CheckCircle2, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { saveQuery } from '@/lib/data-store';

interface QueriesModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function QueriesModal({ isOpen, onClose }: QueriesModalProps) {
    const { user } = useAuth();
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        subject: '',
        queries: ''
    });

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [showSuccess, setShowSuccess] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        if (!formData.fullName.trim()) {
            newErrors.fullName = 'Full name is required';
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!emailRegex.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        if (!formData.subject.trim()) {
            newErrors.subject = 'Subject is required';
        }

        if (!formData.queries.trim()) {
            newErrors.queries = 'Please enter your query';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsProcessing(true);

        try {
            const timestamp = new Date().toISOString();
            const enrollmentId = `QRY_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

            await saveQuery({
                enrollmentId,
                fullName: formData.fullName,
                email: formData.email,
                domain: formData.subject,
                subDomain: 'General Query',
                queries: formData.queries,
                timestamp
            });

            setIsProcessing(false);
            setShowSuccess(true);

            setTimeout(() => {
                setShowSuccess(false);
                onClose();
                setFormData({
                    fullName: '',
                    email: '',
                    subject: '',
                    queries: ''
                });
            }, 2500);

        } catch (error) {
            setIsProcessing(false);
            alert('Failed to submit query. Please try again.');
        }
    };

    const handleChange = (field: string, value: string) => {
        setFormData({ ...formData, [field]: value });
        if (errors[field]) {
            setErrors({ ...errors, [field]: '' });
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
                    />

                    {/* Modal */}
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            transition={{ type: 'spring', duration: 0.5 }}
                            onClick={(e) => e.stopPropagation()}
                            className="pointer-events-auto relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-black/40 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl"
                            style={{
                                background: 'rgba(0, 0, 0, 0.6)',
                                boxShadow: '0 0 60px rgba(0, 212, 255, 0.15)',
                                padding: '38px'
                            }}
                        >
                            {/* Success Message Overlay */}
                            <AnimatePresence>
                                {showSuccess && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="absolute inset-0 bg-black/95 backdrop-blur-xl z-10 flex items-center justify-center rounded-3xl"
                                    >
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ delay: 0.2, type: 'spring' }}
                                            className="text-center"
                                        >
                                            <CheckCircle2
                                                className="w-20 h-20 text-green-400 mx-auto mb-4"
                                                strokeWidth={1.5}
                                            />
                                            <h3 className="text-2xl font-bold text-white mb-2">
                                                Query Submitted!
                                            </h3>
                                            <p className="text-gray-400">
                                                We'll get back to you soon.
                                            </p>
                                        </motion.div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Close Button */}
                            <button
                                onClick={onClose}
                                className="absolute top-6 right-6 p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all group"
                            >
                                <X className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                            </button>

                            {/* Header */}
                            <div className="mb-6 pb-6 border-b border-white/10">
                                <h2 className="text-3xl font-black text-white mb-2">
                                    Queries & Support
                                </h2>
                                <p className="text-cyan-400 text-lg font-semibold">
                                    We're here to help!
                                </p>
                            </div>

                            {/* Form */}
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-300 mb-2">
                                            Full Name <span className="text-red-400">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.fullName}
                                            onChange={(e) => handleChange('fullName', e.target.value)}
                                            className={`w-full px-4 py-3 bg-white/5 border ${errors.fullName ? 'border-red-400/50' : 'border-white/10'
                                                } rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400/50 transition-colors`}
                                            placeholder="John Doe"
                                        />
                                        {errors.fullName && (
                                            <p className="text-red-400 text-xs mt-1">{errors.fullName}</p>
                                        )}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-300 mb-2">
                                            Email Address <span className="text-red-400">*</span>
                                        </label>
                                        <input
                                            type="email"
                                            value={formData.email}
                                            onChange={(e) => handleChange('email', e.target.value)}
                                            className={`w-full px-4 py-3 bg-white/5 border ${errors.email ? 'border-red-400/50' : 'border-white/10'
                                                } rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400/50 transition-colors`}
                                            placeholder="john@example.com"
                                        />
                                        {errors.email && (
                                            <p className="text-red-400 text-xs mt-1">{errors.email}</p>
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-300 mb-2">
                                        Subject <span className="text-red-400">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.subject}
                                        onChange={(e) => handleChange('subject', e.target.value)}
                                        className={`w-full px-4 py-3 bg-white/5 border ${errors.subject ? 'border-red-400/50' : 'border-white/10'
                                            } rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400/50 transition-colors`}
                                        placeholder="What's your question about?"
                                    />
                                    {errors.subject && (
                                        <p className="text-red-400 text-xs mt-1">{errors.subject}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-300 mb-2">
                                        Your Query <span className="text-red-400">*</span>
                                    </label>
                                    <textarea
                                        value={formData.queries}
                                        onChange={(e) => handleChange('queries', e.target.value)}
                                        rows={6}
                                        className={`w-full px-4 py-3 bg-white/5 border ${errors.queries ? 'border-red-400/50' : 'border-white/10'
                                            } rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400/50 transition-colors resize-none`}
                                        placeholder="Please describe your question or concern in detail..."
                                    />
                                    {errors.queries && (
                                        <p className="text-red-400 text-xs mt-1">{errors.queries}</p>
                                    )}
                                </div>

                                {/* Action Buttons */}
                                <div className="flex gap-4 pt-4">
                                    <button
                                        type="button"
                                        onClick={onClose}
                                        disabled={isProcessing}
                                        className="flex-1 py-3 px-6 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-xl font-bold text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={isProcessing}
                                        className="flex-1 py-3 px-6 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 rounded-xl font-bold text-white shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                    >
                                        {isProcessing ? (
                                            <>
                                                <Loader2 className="w-5 h-5 animate-spin" />
                                                Submitting...
                                            </>
                                        ) : (
                                            <>
                                                <Send className="w-5 h-5" />
                                                Submit Query
                                            </>
                                        )}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
}
