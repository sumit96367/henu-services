'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, CreditCard, Smartphone, CheckCircle2, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';

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

        if (!formData.paymentMethod) {
            newErrors.paymentMethod = 'Please select a payment method';
        }

        // Validate payment-specific fields
        if (formData.paymentMethod === 'card') {
            if (!formData.cardNumber.trim()) {
                newErrors.cardNumber = 'Card number is required';
            } else if (!/^\d{16}$/.test(formData.cardNumber.replace(/\s/g, ''))) {
                newErrors.cardNumber = 'Invalid card number';
            }

            if (!formData.cardholderName.trim()) {
                newErrors.cardholderName = 'Cardholder name is required';
            }

            if (!formData.expiryDate.trim()) {
                newErrors.expiryDate = 'Expiry date is required';
            } else if (!/^\d{2}\/\d{2}$/.test(formData.expiryDate)) {
                newErrors.expiryDate = 'Format: MM/YY';
            }

            if (!formData.cvv.trim()) {
                newErrors.cvv = 'CVV is required';
            } else if (!/^\d{3,4}$/.test(formData.cvv)) {
                newErrors.cvv = 'Invalid CVV';
            }
        } else if (formData.paymentMethod === 'upi') {
            if (!formData.upiId.trim()) {
                newErrors.upiId = 'UPI ID is required';
            } else if (!/^[\w.-]+@[\w.-]+$/.test(formData.upiId)) {
                newErrors.upiId = 'Invalid UPI ID format';
            }
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
            // TODO: Replace with actual Razorpay/Stripe payment API call
            const amount = formData.plan === 'basic' ? 1499 : 2999;

            // Simulate API call to create payment order
            const response = await fetch('/api/payment/create-order', {
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
                    userId: user?.id,
                    userType: user?.userType,
                    companyName: user?.companyName
                })
            });

            if (!response.ok) {
                throw new Error('Payment initiation failed');
            }

            const data = await response.json();

            // For now, simulate successful payment
            // In production, this would trigger Razorpay/Stripe modal
            setTimeout(() => {
                setIsProcessing(false);
                setShowSuccess(true);

                setTimeout(() => {
                    setShowSuccess(false);
                    onClose();
                    // Reset form
                    setFormData({
                        fullName: '',
                        email: '',
                        subDomain: '',
                        plan: '',
                        billingAddress: '',
                        paymentMethod: '',
                        cardNumber: '',
                        cardholderName: '',
                        expiryDate: '',
                        cvv: '',
                        upiId: ''
                    });
                }, 2500);
            }, 2000);

        } catch (error) {
            setIsProcessing(false);
            alert('Payment failed. Please try again.');
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
                            className="pointer-events-auto relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-black/40 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl"
                            style={{
                                background: 'rgba(0, 0, 0, 0.6)',
                                boxShadow: '0 0 60px rgba(0, 212, 255, 0.15)',
                                padding: '38px' // EXACTLY 1cm padding
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
                                className="absolute top-6 right-6 p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all group"
                            >
                                <X className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                            </button>

                            {/* Header */}
                            <div className="mb-6 pb-6 border-b border-white/10">
                                <h2 className="text-3xl font-black text-white mb-2">
                                    Internship Enrollment
                                </h2>
                                <p className="text-cyan-400 text-lg font-semibold">
                                    {domainTitle}
                                </p>
                            </div>

                            {/* Form */}
                            <form onSubmit={handleSubmit} className="space-y-8">
                                {/* 1. USER DETAILS */}
                                <div>
                                    <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                                        <span className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-400/30 flex items-center justify-center text-cyan-400 text-sm">1</span>
                                        User Details
                                    </h3>
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
                                </div>

                                {/* 2. INTERNSHIP SELECTION */}
                                <div>
                                    <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                                        <span className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-400/30 flex items-center justify-center text-cyan-400 text-sm">2</span>
                                        Internship Selection
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-300 mb-2">
                                                Domain
                                            </label>
                                            <input
                                                type="text"
                                                value={domainTitle}
                                                readOnly
                                                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-gray-400 cursor-not-allowed"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-300 mb-2">
                                                Sub-Domain / Role <span className="text-red-400">*</span>
                                            </label>
                                            <select
                                                value={formData.subDomain}
                                                onChange={(e) => handleChange('subDomain', e.target.value)}
                                                className={`w-full px-4 py-3 bg-white/5 border ${errors.subDomain ? 'border-red-400/50' : 'border-white/10'
                                                    } rounded-xl text-white focus:outline-none focus:border-cyan-400/50 transition-colors appearance-none cursor-pointer max-h-48 overflow-y-auto`}
                                                style={{ minHeight: '48px' }}
                                            >
                                                <option value="" className="bg-gray-900">Select a role</option>
                                                {subDomains.map((role) => (
                                                    <option key={role} value={role} className="bg-gray-900 py-2">
                                                        {role}
                                                    </option>
                                                ))}
                                            </select>
                                            {errors.subDomain && (
                                                <p className="text-red-400 text-xs mt-1">{errors.subDomain}</p>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* 3. PRICING */}
                                <div>
                                    <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                                        <span className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-400/30 flex items-center justify-center text-cyan-400 text-sm">3</span>
                                        Pricing
                                    </h3>
                                    <div className="space-y-3">
                                        <label className={`block p-4 rounded-xl border ${formData.plan === 'basic' ? 'border-cyan-400 bg-cyan-500/10' : 'border-white/10 bg-white/5'
                                            } cursor-pointer transition-all hover:border-cyan-400/50`}>
                                            <div className="flex items-center gap-3">
                                                <input
                                                    type="radio"
                                                    name="plan"
                                                    value="basic"
                                                    checked={formData.plan === 'basic'}
                                                    onChange={(e) => handleChange('plan', e.target.value)}
                                                    className="w-4 h-4 text-cyan-500 focus:ring-cyan-400"
                                                />
                                                <div className="flex-1">
                                                    <div className="flex items-center justify-between">
                                                        <span className="font-bold text-white">BASIC</span>
                                                        <span className="text-xl font-black text-cyan-400">₹1,499</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </label>
                                        <label className={`block p-4 rounded-xl border ${formData.plan === 'premium' ? 'border-cyan-400 bg-cyan-500/10' : 'border-white/10 bg-white/5'
                                            } cursor-pointer transition-all hover:border-cyan-400/50`}>
                                            <div className="flex items-center gap-3">
                                                <input
                                                    type="radio"
                                                    name="plan"
                                                    value="premium"
                                                    checked={formData.plan === 'premium'}
                                                    onChange={(e) => handleChange('plan', e.target.value)}
                                                    className="w-4 h-4 text-cyan-500 focus:ring-cyan-400"
                                                />
                                                <div className="flex-1">
                                                    <div className="flex items-center justify-between">
                                                        <span className="font-bold text-white">PREMIUM</span>
                                                        <span className="text-xl font-black text-cyan-400">₹2,999</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </label>
                                        {errors.plan && (
                                            <p className="text-red-400 text-xs mt-1">{errors.plan}</p>
                                        )}
                                        <p className="text-xs text-gray-400 mt-2">
                                            Includes curated sources, mentorship access, structured roadmap, and certification.
                                        </p>
                                    </div>
                                </div>

                                {/* 4. BILLING ADDRESS */}
                                <div>
                                    <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                                        <span className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-400/30 flex items-center justify-center text-cyan-400 text-sm">4</span>
                                        Billing Address
                                    </h3>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-300 mb-2">
                                            Billing Address <span className="text-red-400">*</span>
                                        </label>
                                        <textarea
                                            value={formData.billingAddress}
                                            onChange={(e) => handleChange('billingAddress', e.target.value)}
                                            rows={3}
                                            className={`w-full px-4 py-3 bg-white/5 border ${errors.billingAddress ? 'border-red-400/50' : 'border-white/10'
                                                } rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400/50 transition-colors resize-none`}
                                            placeholder="Enter your complete billing address"
                                        />
                                        {errors.billingAddress && (
                                            <p className="text-red-400 text-xs mt-1">{errors.billingAddress}</p>
                                        )}
                                    </div>
                                </div>

                                {/* 5. PAYMENT METHOD */}
                                <div>
                                    <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                                        <span className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-400/30 flex items-center justify-center text-cyan-400 text-sm">5</span>
                                        Payment Method
                                    </h3>
                                    <div className="space-y-3">
                                        <label className={`block p-4 rounded-xl border ${formData.paymentMethod === 'card' ? 'border-cyan-400 bg-cyan-500/10' : 'border-white/10 bg-white/5'
                                            } cursor-pointer transition-all hover:border-cyan-400/50`}>
                                            <div className="flex items-center gap-3">
                                                <input
                                                    type="radio"
                                                    name="paymentMethod"
                                                    value="card"
                                                    checked={formData.paymentMethod === 'card'}
                                                    onChange={(e) => handleChange('paymentMethod', e.target.value)}
                                                    className="w-4 h-4 text-cyan-500 focus:ring-cyan-400"
                                                />
                                                <CreditCard className="w-5 h-5 text-cyan-400" />
                                                <span className="font-semibold text-white">Credit / Debit Card</span>
                                            </div>
                                        </label>

                                        {/* Card Payment Fields */}
                                        <AnimatePresence>
                                            {formData.paymentMethod === 'card' && (
                                                <motion.div
                                                    initial={{ opacity: 0, height: 0 }}
                                                    animate={{ opacity: 1, height: 'auto' }}
                                                    exit={{ opacity: 0, height: 0 }}
                                                    className="mt-4 space-y-3 overflow-hidden"
                                                >
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                                        <div className="md:col-span-2">
                                                            <label className="block text-sm font-semibold text-gray-300 mb-2">
                                                                Card Number <span className="text-red-400">*</span>
                                                            </label>
                                                            <input
                                                                type="text"
                                                                value={formData.cardNumber}
                                                                onChange={(e) => handleChange('cardNumber', e.target.value)}
                                                                maxLength={19}
                                                                className={`w-full px-4 py-3 bg-white/5 border ${errors.cardNumber ? 'border-red-400/50' : 'border-white/10'
                                                                    } rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400/50 transition-colors`}
                                                                placeholder="1234 5678 9012 3456"
                                                            />
                                                            {errors.cardNumber && (
                                                                <p className="text-red-400 text-xs mt-1">{errors.cardNumber}</p>
                                                            )}
                                                        </div>
                                                        <div className="md:col-span-2">
                                                            <label className="block text-sm font-semibold text-gray-300 mb-2">
                                                                Cardholder Name <span className="text-red-400">*</span>
                                                            </label>
                                                            <input
                                                                type="text"
                                                                value={formData.cardholderName}
                                                                onChange={(e) => handleChange('cardholderName', e.target.value)}
                                                                className={`w-full px-4 py-3 bg-white/5 border ${errors.cardholderName ? 'border-red-400/50' : 'border-white/10'
                                                                    } rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400/50 transition-colors`}
                                                                placeholder="JOHN DOE"
                                                            />
                                                            {errors.cardholderName && (
                                                                <p className="text-red-400 text-xs mt-1">{errors.cardholderName}</p>
                                                            )}
                                                        </div>
                                                        <div>
                                                            <label className="block text-sm font-semibold text-gray-300 mb-2">
                                                                Expiry Date <span className="text-red-400">*</span>
                                                            </label>
                                                            <input
                                                                type="text"
                                                                value={formData.expiryDate}
                                                                onChange={(e) => handleChange('expiryDate', e.target.value)}
                                                                className={`w-full px-4 py-3 bg-white/5 border ${errors.expiryDate ? 'border-red-400/50' : 'border-white/10'
                                                                    } rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400/50 transition-colors`}
                                                                placeholder="MM/YY"
                                                            />
                                                            {errors.expiryDate && (
                                                                <p className="text-red-400 text-xs mt-1">{errors.expiryDate}</p>
                                                            )}
                                                        </div>
                                                        <div>
                                                            <label className="block text-sm font-semibold text-gray-300 mb-2">
                                                                CVV <span className="text-red-400">*</span>
                                                            </label>
                                                            <input
                                                                type="password"
                                                                value={formData.cvv}
                                                                onChange={(e) => handleChange('cvv', e.target.value)}
                                                                maxLength={4}
                                                                className={`w-full px-4 py-3 bg-white/5 border ${errors.cvv ? 'border-red-400/50' : 'border-white/10'
                                                                    } rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400/50 transition-colors`}
                                                                placeholder="123"
                                                            />
                                                            {errors.cvv && (
                                                                <p className="text-red-400 text-xs mt-1">{errors.cvv}</p>
                                                            )}
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>

                                        <label className={`block p-4 rounded-xl border ${formData.paymentMethod === 'upi' ? 'border-cyan-400 bg-cyan-500/10' : 'border-white/10 bg-white/5'
                                            } cursor-pointer transition-all hover:border-cyan-400/50`}>
                                            <div className="flex items-center gap-3">
                                                <input
                                                    type="radio"
                                                    name="paymentMethod"
                                                    value="upi"
                                                    checked={formData.paymentMethod === 'upi'}
                                                    onChange={(e) => handleChange('paymentMethod', e.target.value)}
                                                    className="w-4 h-4 text-cyan-500 focus:ring-cyan-400"
                                                />
                                                <Smartphone className="w-5 h-5 text-cyan-400" />
                                                <span className="font-semibold text-white">UPI</span>
                                            </div>
                                        </label>

                                        {/* UPI Payment Field */}
                                        <AnimatePresence>
                                            {formData.paymentMethod === 'upi' && (
                                                <motion.div
                                                    initial={{ opacity: 0, height: 0 }}
                                                    animate={{ opacity: 1, height: 'auto' }}
                                                    exit={{ opacity: 0, height: 0 }}
                                                    className="mt-4 overflow-hidden"
                                                >
                                                    <label className="block text-sm font-semibold text-gray-300 mb-2">
                                                        UPI ID <span className="text-red-400">*</span>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={formData.upiId}
                                                        onChange={(e) => handleChange('upiId', e.target.value)}
                                                        className={`w-full px-4 py-3 bg-white/5 border ${errors.upiId ? 'border-red-400/50' : 'border-white/10'
                                                            } rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400/50 transition-colors`}
                                                        placeholder="yourname@upi"
                                                    />
                                                    {errors.upiId && (
                                                        <p className="text-red-400 text-xs mt-1">{errors.upiId}</p>
                                                    )}
                                                </motion.div>
                                            )}
                                        </AnimatePresence>

                                        {errors.paymentMethod && (
                                            <p className="text-red-400 text-xs mt-1">{errors.paymentMethod}</p>
                                        )}
                                    </div>
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
                                                Processing...
                                            </>
                                        ) : (
                                            'Pay & Enroll'
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
