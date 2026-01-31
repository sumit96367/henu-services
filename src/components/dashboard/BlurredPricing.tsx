'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import {
    DollarSign,
    Lock,
    MessageCircle,
    Phone,
    Mail,
    ArrowRight,
    X,
    Sparkles,
    CheckCircle2
} from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';

export const BlurredPricing = () => {
    const { userType } = useAuth();
    const [showContactModal, setShowContactModal] = useState(false);

    const pricingPlans = [
        {
            name: 'Starter',
            price: '₹15,000',
            period: '/month',
            description: 'Perfect for startups and small businesses',
            features: [
                'Basic Legal Documentation',
                'Monthly Compliance Check',
                'Email Support',
                '1 Legal Consultation/month',
                'Document Templates'
            ],
            popular: false
        },
        {
            name: 'Professional',
            price: '₹45,000',
            period: '/month',
            description: 'Ideal for growing companies',
            features: [
                'Full Legal Documentation',
                'Weekly Compliance Monitoring',
                'Priority Support',
                '4 Legal Consultations/month',
                'Grant Application Support',
                'Custom Contract Drafting'
            ],
            popular: true
        },
        {
            name: 'Enterprise',
            price: '₹99,000',
            period: '/month',
            description: 'For large organizations',
            features: [
                'Complete Legal Suite',
                'Real-time Compliance',
                '24/7 Dedicated Support',
                'Unlimited Consultations',
                'Full Grant Management',
                'On-site Legal Advisor',
                'Custom Integrations'
            ],
            popular: false
        }
    ];

    const isCompanyUser = userType === 'company';

    return (
        <>
            <div className="relative">
                {/* Section Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                            <DollarSign size={28} className="text-amber-400" />
                            Pricing Plans
                        </h2>
                        <p className="text-gray-400 mt-1">Choose the perfect plan for your business</p>
                    </div>
                    {isCompanyUser && (
                        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20">
                            <Lock size={16} className="text-amber-400" />
                            <span className="text-sm text-amber-400 font-medium">Premium Content</span>
                        </div>
                    )}
                </div>

                {/* Pricing Cards Container */}
                <div className="relative">
                    {/* Actual Pricing Cards - Blurred for company users */}
                    <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 ${isCompanyUser ? 'blur-md pointer-events-none select-none' : ''}`}>
                        {pricingPlans.map((plan, index) => (
                            <motion.div
                                key={plan.name}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className={`relative overflow-hidden rounded-3xl p-6 ${plan.popular
                                    ? 'bg-gradient-to-br from-cyan-500/10 to-cyan-500/5 border-2 border-cyan-500/30'
                                    : 'bg-white/[0.02] border border-white/5'
                                    }`}
                            >
                                {plan.popular && (
                                    <div className="absolute top-4 right-4">
                                        <span className="px-3 py-1 rounded-full bg-cyan-500 text-black text-xs font-bold">
                                            POPULAR
                                        </span>
                                    </div>
                                )}

                                <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                                <p className="text-gray-400 text-sm mb-4">{plan.description}</p>

                                <div className="mb-6">
                                    <span className="text-4xl font-bold text-white">{plan.price}</span>
                                    <span className="text-gray-400">{plan.period}</span>
                                </div>

                                <ul className="space-y-3 mb-6">
                                    {plan.features.map((feature) => (
                                        <li key={feature} className="flex items-center gap-2 text-sm text-gray-300">
                                            <CheckCircle2 size={16} className="text-cyan-400 flex-shrink-0" />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>

                                <button className={`w-full py-3 rounded-xl font-semibold transition-all ${plan.popular
                                    ? 'bg-gradient-to-r from-cyan-500 to-cyan-600 text-black hover:from-cyan-400 hover:to-cyan-500'
                                    : 'bg-white/5 text-white border border-white/10 hover:bg-white/10'
                                    }`}>
                                    Get Started
                                </button>
                            </motion.div>
                        ))}
                    </div>

                    {/* Overlay for Company Users */}
                    {isCompanyUser && (
                        <div className="absolute inset-0 flex items-center justify-center">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="text-center p-8 rounded-3xl bg-gradient-to-br from-[#0a0a0a]/95 to-[#151515]/95 border border-white/10 shadow-2xl max-w-md"
                            >
                                <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-amber-500/20 to-amber-600/10 border border-amber-500/20 flex items-center justify-center">
                                    <Lock size={32} className="text-amber-400" />
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-3">
                                    Unlock Pricing Details
                                </h3>
                                <p className="text-gray-400 mb-6">
                                    Connect with us to get personalized pricing for your organization's specific needs.
                                </p>
                                <button
                                    onClick={() => setShowContactModal(true)}
                                    className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-black font-semibold rounded-xl hover:from-amber-400 hover:to-amber-500 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-amber-500/25"
                                >
                                    <Sparkles size={20} />
                                    Contact Sales Team
                                </button>
                            </motion.div>
                        </div>
                    )}
                </div>
            </div>

            {/* Contact Modal */}
            <AnimatePresence>
                {showContactModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 flex items-center justify-center p-4"
                        style={{ zIndex: 9999 }}
                        onClick={() => setShowContactModal(false)}
                    >
                        <div className="absolute inset-0" style={{ backgroundColor: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(12px)' }} />

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                            className="relative w-full max-w-md"
                        >
                            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-white/[0.08] to-white/[0.02] border border-white/10 backdrop-blur-xl shadow-2xl">
                                {/* Decorative elements */}
                                <div className="absolute -top-20 -right-20 w-40 h-40 bg-amber-500/20 rounded-full blur-3xl" />
                                <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-cyan-500/20 rounded-full blur-3xl" />

                                <button
                                    onClick={() => setShowContactModal(false)}
                                    className="absolute top-4 right-4 p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-full transition-colors z-10"
                                >
                                    <X size={20} />
                                </button>

                                <div className="relative" style={{ padding: '48px' }}>
                                    <div className="text-center mb-8" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                        <div style={{ width: '64px', height: '64px', borderRadius: '16px', background: 'linear-gradient(to bottom right, rgba(0, 212, 255, 0.2), rgba(255, 149, 0, 0.2))', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                                            <MessageCircle size={32} className="text-white" />
                                        </div>
                                        <h3 className="text-2xl font-bold text-white mb-2">
                                            Choose Your Preferred Channel
                                        </h3>
                                        <p className="text-gray-400 text-sm">
                                            Our sales team will get back to you shortly
                                        </p>
                                    </div>

                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                        {/* WhatsApp */}
                                        <a
                                            href="https://wa.me/918094100513?text=Hi, I'm interested in your pricing plans for my company."
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-4 p-4 rounded-2xl bg-green-500/10 border border-green-500/20 hover:border-green-500/40 hover:bg-green-500/15 transition-all group"
                                        >
                                            <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center">
                                                <FaWhatsapp size={24} className="text-green-400" />
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="font-semibold text-white group-hover:text-green-400 transition-colors">WhatsApp</h4>
                                                <p className="text-sm text-gray-400">Quick chat with our team</p>
                                            </div>
                                            <ArrowRight size={20} className="text-gray-400 group-hover:text-green-400 group-hover:translate-x-1 transition-all" />
                                        </a>

                                        {/* Phone Call */}
                                        <a
                                            href="tel:+918094100513"
                                            className="flex items-center gap-4 p-4 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 hover:border-cyan-500/40 hover:bg-cyan-500/15 transition-all group"
                                        >
                                            <div className="w-12 h-12 rounded-xl bg-cyan-500/20 flex items-center justify-center">
                                                <Phone size={24} className="text-cyan-400" />
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="font-semibold text-white group-hover:text-cyan-400 transition-colors">Phone Call</h4>
                                                <p className="text-sm text-gray-400">Speak directly with sales</p>
                                            </div>
                                            <ArrowRight size={20} className="text-gray-400 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
                                        </a>

                                        {/* Email */}
                                        <a
                                            href="mailto:sales@henuos.com?subject=Pricing Inquiry&body=Hi, I'm interested in learning more about your pricing plans."
                                            className="flex items-center gap-4 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 hover:border-amber-500/40 hover:bg-amber-500/15 transition-all group"
                                        >
                                            <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center">
                                                <Mail size={24} className="text-amber-400" />
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="font-semibold text-white group-hover:text-amber-400 transition-colors">Email</h4>
                                                <p className="text-sm text-gray-400">Detailed proposal via email</p>
                                            </div>
                                            <ArrowRight size={20} className="text-gray-400 group-hover:text-amber-400 group-hover:translate-x-1 transition-all" />
                                        </a>
                                    </div>

                                    <p className="mt-6 text-center text-xs text-gray-500">
                                        Average response time: Under 2 hours
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};
