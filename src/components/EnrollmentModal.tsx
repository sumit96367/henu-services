'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, CreditCard, Smartphone, CheckCircle2, Loader2, MapPin, Zap, User, Mail, Briefcase, Globe, ShieldCheck, Lock } from 'lucide-react';
import { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { useAuth } from '@/context/AuthContext';
import { loadRazorpayScript } from '@/lib/razorpay';

// COMPLETE Domain to sub-domain mapping (as per requirements)
const domainSubDomainMap: Record<string, string[]> = {
    'ai-ml': [
        'Machine Learning Intern',
        'Data Science Intern',
        'Deep Learning Intern',
        'Computer Vision Intern',
        'NLP Intern',
        'AI Research Intern'
    ],
    'cybersecurity': [
        'SOC Analyst Intern',
        'Ethical Hacking Intern',
        'Penetration Testing Intern',
        'Network Security Intern',
        'Cloud Security Intern',
        'Blue Team Intern',
        'Digital Forensics Intern'
    ],
    'software-dev': [
        'Frontend Developer Intern',
        'Backend Developer Intern',
        'Full Stack Developer Intern',
        'Mobile App Developer Intern',
        'API Developer Intern',
        'System Design Intern'
    ],
    'big-tech': [
        'Software Engineer Intern',
        'Product Engineering Intern',
        'Platform Engineer Intern',
        'Cloud Engineer Intern',
        'Infrastructure Intern'
    ],
    'finance': [
        'Quantitative Analyst Intern',
        'Trading Intern',
        'Financial Analyst Intern',
        'FinTech Intern',
        'Risk Analysis Intern'
    ],
    'startup': [
        'Product Intern',
        'Growth Intern',
        'Business Analyst Intern',
        'Operations Intern',
        'Strategy Intern'
    ],
    'research': [
        'Research Intern',
        'AI Research Intern',
        'Data Research Intern',
        'Academic Research Intern'
    ],
    'cloud-devops': [
        'DevOps Intern',
        'Cloud Engineer Intern',
        'SRE Intern',
        'AdTech Intern',
        'Automation Intern'
    ],
    'global-remote': [
        'Remote Software Intern',
        'Open Source Intern',
        'Global Research Intern',
        'Distributed Systems Intern'
    ],
    'design': [
        'UI/UX Design Intern',
        'Product Design Intern',
        'Graphic Design Intern',
        'Motion Design Intern'
    ],
    'languages': [
        'Python Developer Intern',
        'Java Developer Intern',
        'JavaScript Developer Intern',
        'C++ Developer Intern'
    ]
};

interface EnrollmentModalProps {
    isOpen: boolean;
    onClose: () => void;
    domainCategory: string;
    domainTitle: string;
}

export default function EnrollmentModal({
    isOpen,
    onClose,
    domainCategory,
    domainTitle
}: EnrollmentModalProps) {
    const { user } = useAuth();
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        subDomain: '',
        plan: '',
        billingAddress: '',
        paymentMethod: '',
        // Card payment fields
        cardNumber: '',
        cardholderName: '',
        expiryDate: '',
        cvv: '',
        // UPI payment field
        upiId: ''
    });

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [showSuccess, setShowSuccess] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            document.body.style.paddingRight = 'var(--scrollbar-width, 0px)';
        } else {
            document.body.style.overflow = '';
            document.body.style.paddingRight = '';
        }
        return () => {
            document.body.style.overflow = '';
            document.body.style.paddingRight = '';
        };
    }, [isOpen]);

    const subDomains = domainSubDomainMap[domainCategory] || [];

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

        if (!formData.subDomain) {
            newErrors.subDomain = 'Please select a sub-domain';
        }

        if (!formData.plan) {
            newErrors.plan = 'Please select a plan';
        }

        if (!formData.billingAddress.trim()) {
            newErrors.billingAddress = 'Billing address is required';
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
        setErrors({});

        try {
            // 1. Determine Amount
            const amount = formData.plan === 'premium' ? 2999 : 1499;

            // 3. Create Order via Backend API
            const orderResponse = await fetch('/api/payment/create-order', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    fullName: formData.fullName,
                    email: formData.email,
                    domain: domainTitle,
                    subDomain: formData.subDomain,
                    plan: formData.plan,
                    amount,
                    paymentMethod: formData.paymentMethod,
                    billingAddress: formData.billingAddress,
                    domainCategory,
                    userId: user?.id, // Using id from Auth Context
                    userType: 'personal'
                }),
            });

            const orderData = await orderResponse.json();
            if (!orderResponse.ok) throw new Error(orderData.error || 'Failed to initialize order');

            // 4. Redirect to Razorpay Store Page
            // Passing pre-fill data as query parameters (supported by some Razorpay pages)
            const razorpayStoreUrl = `https://pages.razorpay.com/stores/henuos?name=${encodeURIComponent(formData.fullName)}&email=${encodeURIComponent(formData.email)}&enrollment_id=${orderData.enrollmentId}`;

            // Record initiation in local state then redirect
            setShowSuccess(true);
            setTimeout(() => {
                window.location.href = razorpayStoreUrl;
            }, 2000);

        } catch (error: any) {
            console.error('Submission error:', error);
            setErrors({ submit: error.message || 'An unexpected error occurred. Please try again.' });
            setIsProcessing(false);
        }
    };

    const handleChange = (field: string, value: string) => {
        // Format card number with spaces
        if (field === 'cardNumber') {
            value = value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
        }
        // Format expiry date
        if (field === 'expiryDate') {
            value = value.replace(/\D/g, '').replace(/(\d{2})(\d{0,2})/, '$1/$2').substring(0, 5);
        }
        // CVV only numbers
        if (field === 'cvv') {
            value = value.replace(/\D/g, '').substring(0, 4);
        }

        setFormData({ ...formData, [field]: value });

        // Clear error when user starts typing
        if (errors[field]) {
            setErrors({ ...errors, [field]: '' });
        }
    };

    if (!mounted) return null;

    return createPortal(
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[9999] overflow-y-auto overscroll-contain bg-[#020205]/98 backdrop-blur-2xl p-4 md:p-8 flex justify-center items-start scroll-smooth"
                    data-lenis-prevent
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.95, opacity: 0, y: 20 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        onClick={(e) => e.stopPropagation()}
                        className="relative my-auto w-full max-w-4xl border border-white/10 rounded-[2rem] shadow-[0_0_100px_rgba(0,0,0,0.9)] overflow-hidden"
                        style={{
                            background: '#0a0a0f',
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
                                            Payment Successful!
                                        </h3>
                                        <p className="text-gray-400">
                                            Invoice has been sent to your email.
                                        </p>
                                    </motion.div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="absolute top-8 right-8 p-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all group z-20"
                        >
                            <X className="w-6 h-6 text-gray-400 group-hover:text-white transition-colors" />
                        </button>

                        {/* Header */}
                        <div className="pt-24 pb-10 md:pt-32 md:pb-12 px-10 md:px-12 border-b border-white/5 bg-white/[0.01]">
                            <h2 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
                                Internship <span className="gradient-text">Enrollment</span>
                            </h2>
                            <p className="text-gray-400 text-lg font-medium opacity-80">
                                {domainTitle}
                            </p>
                        </div>

                        <div className="p-10 md:p-12">

                            {/* Form */}
                            <form onSubmit={handleSubmit} className="space-y-12">
                                {/* 1. USER DETAILS */}
                                <div className="space-y-10">
                                    <h3 className="text-2xl font-bold text-white flex items-center gap-4">
                                        <span className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-400/20 flex items-center justify-center text-cyan-400 text-xl font-black">01</span>
                                        User Details
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                        <div className="space-y-4">
                                            <label className="block text-xs font-black text-gray-400 uppercase tracking-[0.2em] ml-2">Full Name</label>
                                            <div className="relative group flex items-center">
                                                <User className="absolute left-6 w-5 h-5 text-gray-400 group-focus-within:text-cyan-400 transition-colors z-10" />
                                                <input
                                                    type="text"
                                                    value={formData.fullName}
                                                    onChange={(e) => handleChange('fullName', e.target.value)}
                                                    className={`w-full bg-white/5 border ${errors.fullName ? 'border-red-500/50' : 'border-white/10'} rounded-2xl text-white placeholder:text-gray-600 focus:outline-none focus:border-cyan-500/50 transition-all font-medium`}
                                                    style={{ padding: '24px 28px 24px 64px', fontSize: '16px' }}
                                                    placeholder="John Doe"
                                                />
                                            </div>
                                            {errors.fullName && (
                                                <p className="text-red-400 text-sm font-medium mt-3 ml-2">{errors.fullName}</p>
                                            )}
                                        </div>
                                        <div className="space-y-4">
                                            <label className="block text-xs font-black text-gray-400 uppercase tracking-[0.2em] ml-2">Email Address</label>
                                            <div className="relative group flex items-center">
                                                <Mail className="absolute left-6 w-5 h-5 text-gray-400 group-focus-within:text-cyan-400 transition-colors z-10" />
                                                <input
                                                    type="email"
                                                    value={formData.email}
                                                    onChange={(e) => handleChange('email', e.target.value)}
                                                    className={`w-full bg-white/5 border ${errors.email ? 'border-red-500/50' : 'border-white/10'} rounded-2xl text-white placeholder:text-gray-600 focus:outline-none focus:border-cyan-500/50 transition-all font-medium`}
                                                    style={{ padding: '24px 28px 24px 64px', fontSize: '16px' }}
                                                    placeholder="john@example.com"
                                                />
                                            </div>
                                            {errors.email && (
                                                <p className="text-red-400 text-sm font-medium mt-3 ml-2">{errors.email}</p>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* 2. INTERNSHIP SELECTION */}
                                <div className="space-y-10">
                                    <h3 className="text-2xl font-bold text-white flex items-center gap-4 mt-20">
                                        <span className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-400/20 flex items-center justify-center text-purple-400 text-xl font-black">02</span>
                                        Internship Selection
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                        <div className="space-y-4">
                                            <label className="block text-xs font-black text-gray-400 uppercase tracking-[0.2em] ml-2">Domain</label>
                                            <div className="relative group flex items-center">
                                                <Globe className="absolute left-6 w-5 h-5 text-gray-400 transition-colors z-10" />
                                                <input
                                                    type="text"
                                                    value={domainTitle}
                                                    readOnly
                                                    className="w-full bg-white/5 border border-white/10 rounded-2xl text-gray-500 cursor-not-allowed font-medium"
                                                    style={{ padding: '24px 28px 24px 64px', fontSize: '16px' }}
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-4">
                                            <label className="block text-xs font-black text-gray-400 uppercase tracking-[0.2em] ml-2">Sub-Domain / Role</label>
                                            <div className="relative group flex items-center">
                                                <Briefcase className="absolute left-6 w-5 h-5 text-gray-400 group-focus-within:text-purple-400 transition-colors z-10" />
                                                <select
                                                    value={formData.subDomain}
                                                    onChange={(e) => handleChange('subDomain', e.target.value)}
                                                    className={`w-full bg-white/5 border ${errors.subDomain ? 'border-red-500/50' : 'border-white/10'} rounded-2xl text-white focus:outline-none focus:border-purple-500/50 transition-all appearance-none cursor-pointer font-medium`}
                                                    style={{ padding: '24px 28px 24px 64px', fontSize: '16px' }}
                                                >
                                                    <option value="" className="bg-[#0a0a0f]">Select a role</option>
                                                    {subDomains.map((role) => (
                                                        <option key={role} value={role} className="bg-[#0a0a0f] py-4">
                                                            {role}
                                                        </option>
                                                    ))}
                                                </select>
                                                <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                    </svg>
                                                </div>
                                            </div>
                                            {errors.subDomain && (
                                                <p className="text-red-400 text-sm font-medium mt-3 ml-2">{errors.subDomain}</p>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* 3. PRICING */}
                                <div className="space-y-10">
                                    <h3 className="text-2xl font-bold text-white flex items-center gap-4 mt-20">
                                        <span className="w-12 h-12 rounded-2xl bg-orange-500/10 border border-orange-400/20 flex items-center justify-center text-orange-400 text-xl font-black">03</span>
                                        Pricing Plan
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <label className={`group relative p-8 rounded-2xl border-2 transition-all cursor-pointer flex flex-col gap-4 ${formData.plan === 'basic' ? 'border-orange-500 bg-orange-500/[0.05]' : 'border-white/5 bg-white/[0.02] hover:border-white/20'
                                            }`}>
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-3">
                                                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${formData.plan === 'basic' ? 'border-orange-500 bg-orange-500' : 'border-white/20'}`}>
                                                        {formData.plan === 'basic' && <div className="w-2 h-2 rounded-full bg-white" />}
                                                    </div>
                                                    <span className="font-bold text-white uppercase tracking-wider text-sm">Basic</span>
                                                </div>
                                                <span className="text-2xl font-black text-white italic">₹1,499</span>
                                            </div>
                                            <p className="text-gray-400 text-sm leading-relaxed">
                                                Curated resources and initial guidance for your career journey.
                                            </p>
                                            <input type="radio" name="plan" value="basic" checked={formData.plan === 'basic'} onChange={(e) => handleChange('plan', e.target.value)} className="hidden" />
                                        </label>

                                        <label className={`group relative p-8 rounded-2xl border-2 transition-all cursor-pointer flex flex-col gap-4 ${formData.plan === 'premium' ? 'border-orange-500 bg-orange-500/[0.05]' : 'border-white/5 bg-white/[0.02] hover:border-white/20'
                                            }`}>
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-3">
                                                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${formData.plan === 'premium' ? 'border-orange-500 bg-orange-500' : 'border-white/20'}`}>
                                                        {formData.plan === 'premium' && <div className="w-2 h-2 rounded-full bg-white" />}
                                                    </div>
                                                    <span className="font-bold text-white uppercase tracking-wider text-sm">Premium</span>
                                                </div>
                                                <span className="text-2xl font-black text-white italic">₹2,999</span>
                                            </div>
                                            <p className="text-gray-400 text-sm leading-relaxed">
                                                Mentorship, live projects, and priority certification for maximum impact.
                                            </p>
                                            <input type="radio" name="plan" value="premium" checked={formData.plan === 'premium'} onChange={(e) => handleChange('plan', e.target.value)} className="hidden" />
                                        </label>
                                    </div>
                                    {errors.plan && (
                                        <p className="text-red-400 text-sm font-medium mt-4 px-1">{errors.plan}</p>
                                    )}
                                </div>

                                {/* 4. BILLING ADDRESS */}
                                <div className="space-y-10">
                                    <h3 className="text-2xl font-bold text-white flex items-center gap-4 mt-20">
                                        <span className="w-12 h-12 rounded-2xl bg-green-500/10 border border-green-400/20 flex items-center justify-center text-green-400 text-xl font-black">04</span>
                                        Billing Address
                                    </h3>
                                    <div className="space-y-4">
                                        <label className="block text-xs font-black text-gray-400 uppercase tracking-[0.2em] ml-2">Complete Address</label>
                                        <div className="relative group">
                                            <MapPin className="absolute left-6 top-7 w-5 h-5 text-gray-400 group-focus-within:text-green-400 transition-colors z-10" />
                                            <textarea
                                                value={formData.billingAddress}
                                                onChange={(e) => handleChange('billingAddress', e.target.value)}
                                                rows={4}
                                                className={`w-full bg-white/5 border ${errors.billingAddress ? 'border-red-500/50' : 'border-white/10'} rounded-2xl text-white placeholder:text-gray-600 focus:outline-none focus:border-green-500/50 transition-all font-medium resize-none leading-relaxed`}
                                                style={{ padding: '24px 28px 24px 64px', fontSize: '16px' }}
                                                placeholder="Flat/House No., Building, Street, Area/Locality, City, State, Pincode"
                                            ></textarea>
                                        </div>
                                        {errors.billingAddress && (
                                            <p className="text-red-400 text-sm font-medium mt-3 ml-2">{errors.billingAddress}</p>
                                        )}
                                    </div>
                                </div>

                                {/* 5. SECURE CHECKOUT */}
                                <div className="space-y-10">
                                    <h3 className="text-2xl font-bold text-white flex items-center gap-4 mt-20">
                                        <span className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-400/20 flex items-center justify-center text-blue-400 text-xl font-black tracking-tighter">05</span>
                                        Secure Checkout
                                    </h3>

                                    <div className="p-10 rounded-[3rem] bg-blue-500/[0.03] border border-blue-500/10 flex flex-col md:flex-row items-center gap-10">
                                        <div className="w-24 h-24 rounded-[2rem] bg-blue-500/10 flex items-center justify-center">
                                            <ShieldCheck className="w-12 h-12 text-blue-400" />
                                        </div>
                                        <div className="flex-1 space-y-4 text-center md:text-left">
                                            <h4 className="text-xl font-bold text-white uppercase tracking-wider">Henu OS Secure Payments</h4>
                                            <p className="text-gray-400 leading-relaxed max-w-lg">
                                                You are being redirected to our official Razorpay Store for a safe and encrypted transaction.
                                                All major credit/debit cards, UPI, and net banking are supported.
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-4 px-6 py-3 rounded-2xl bg-white/5 border border-white/10">
                                            <Lock className="w-4 h-4 text-green-400" />
                                            <span className="text-xs font-black text-gray-300 uppercase tracking-widest">PCI-DSS Compliant</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Error Message */}
                                {errors.submit && (
                                    <div className="p-6 rounded-[2rem] bg-red-500/10 border border-red-500/20 text-red-400 text-base font-bold flex items-center gap-4 mt-12">
                                        <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse shadow-[0_0_15px_rgba(239,68,68,0.5)]" />
                                        {errors.submit}
                                    </div>
                                )}

                                {/* Action Buttons */}
                                <div className="flex flex-col sm:flex-row gap-8 pt-16">
                                    <button
                                        type="button"
                                        onClick={onClose}
                                        disabled={isProcessing}
                                        className="flex-1 bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 hover:border-white/20 rounded-3xl font-black text-lg text-gray-400 hover:text-white transition-all disabled:opacity-50 py-8 uppercase tracking-[0.25em] flex items-center justify-center"
                                    >
                                        Cancel Request
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={isProcessing}
                                        className="flex-[2] bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:brightness-110 rounded-3xl font-black text-xl text-white shadow-[0_30px_60px_rgba(6,182,212,0.3)] hover:shadow-[0_40px_80px_rgba(6,182,212,0.5)] transition-all disabled:opacity-50 flex items-center justify-center gap-6 py-8 uppercase tracking-[0.3em] relative overflow-hidden group"
                                    >
                                        <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                                        <span className="relative z-10">
                                            {isProcessing ? 'Initializing Secure Flow...' : 'Complete Enrollment'}
                                        </span>
                                        {!isProcessing && (
                                            <Zap className="w-8 h-8 relative z-10 group-hover:animate-bounce" />
                                        )}
                                        {isProcessing && <Loader2 className="w-8 h-8 animate-spin relative z-10" />}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </motion.div>
                </motion.div>

            )
            }
        </AnimatePresence >,
        document.body
    );
}

