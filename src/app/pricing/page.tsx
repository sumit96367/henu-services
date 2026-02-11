'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    CheckCircle2,
    ArrowRight,
    Zap,
    Shield,
    Clock,
    Users,
    Sparkles,
    Lock,
    X,
    MessageCircle,
    Phone,
    Mail
} from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import Link from 'next/link';

const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

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
        popular: false,
        color: 'cyan'
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
        popular: true,
        color: 'amber'
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
        popular: false,
        color: 'purple'
    }
];

const benefits = [
    { icon: Zap, title: 'Fast Setup', description: 'Get started in minutes with our streamlined onboarding process' },
    { icon: Shield, title: 'Secure & Compliant', description: 'Enterprise-grade security with full regulatory compliance' },
    { icon: Clock, title: '24/7 Support', description: 'Round-the-clock assistance from our expert team' },
    { icon: Users, title: 'Dedicated Team', description: 'Personal account manager for your business needs' },
];

export default function PricingPage() {
    const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
    const [showContactModal, setShowContactModal] = useState(false);

    return (
        <>
            <div className="min-h-screen bg-[#050505] flex flex-col items-center w-full" style={{ paddingTop: '160px' }}>
                {/* Hero Section */}
                <section className="relative overflow-hidden" style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    {/* Background Effects */}
                    <div className="absolute -top-40 -right-40 w-80 h-80 bg-cyan-500/10 rounded-full blur-[120px]" />
                    <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-amber-500/10 rounded-full blur-[120px]" />

                    <div className="w-full max-w-7xl mx-auto relative flex flex-col items-center" style={{ paddingTop: '40px', paddingBottom: '60px', paddingLeft: '40px', paddingRight: '40px' }}>
                        <motion.div
                            initial="hidden"
                            animate="visible"
                            variants={fadeInUp}
                            className="text-center"
                            style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: '20px' }}
                        >

                            <h1 className="text-4xl md:text-6xl font-bold text-white" style={{ textAlign: 'center', width: '100%', marginBottom: '24px' }}>
                                Choose the Perfect Plan
                                <span className="block gradient-text">for Your Business</span>
                            </h1>
                            <p className="text-lg md:text-xl text-gray-400" style={{ textAlign: 'center', maxWidth: '672px', width: '100%' }}>
                                Flexible pricing options designed to scale with your business. No hidden fees, cancel anytime.
                            </p>
                        </motion.div>

                        {/* Billing Toggle */}
                        <motion.div
                            initial="hidden"
                            animate="visible"
                            variants={fadeInUp}
                            className="flex items-center justify-center gap-6"
                            style={{ padding: '20px 40px', borderRadius: '9999px', backgroundColor: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', marginBottom: '48px', marginTop: '50px' }}
                        >
                            <span className={`text-base font-medium ${billingCycle === 'monthly' ? 'text-white' : 'text-gray-500'}`}>
                                Monthly
                            </span>
                            <button
                                onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
                                className="relative w-16 h-8 rounded-full bg-white/10 border border-white/20 transition-colors"
                            >
                                <div
                                    className={`absolute top-1 w-6 h-6 rounded-full bg-gradient-to-r from-cyan-400 to-amber-400 transition-all duration-300 ${billingCycle === 'yearly' ? 'left-9' : 'left-1'
                                        }`}
                                />
                            </button>
                            <span className={`text-base font-medium ${billingCycle === 'yearly' ? 'text-white' : 'text-gray-500'}`}>
                                Yearly <span className="text-green-400">(Save 20%)</span>
                            </span>
                        </motion.div>

                        {/* Pricing Cards with Blur */}
                        <div style={{ position: 'relative', width: '100%', maxWidth: '1152px', margin: '0 auto' }}>
                            {/* Pricing Cards with Selective Blur */}
                            <motion.div
                                variants={staggerContainer}
                                initial="hidden"
                                animate="visible"
                                className="grid grid-cols-1 md:grid-cols-3 w-full"
                                style={{ gap: '32px' }}
                            >
                                {pricingPlans.map((plan, index) => (
                                    <motion.div
                                        key={plan.name}
                                        variants={fadeInUp}
                                        className={`relative overflow-hidden rounded-3xl transition-all duration-300 text-center ${plan.popular
                                            ? 'bg-gradient-to-br from-amber-500/10 to-amber-500/5 border-2 border-amber-500/30 shadow-2xl shadow-amber-500/10'
                                            : 'bg-white/[0.02] border border-white/10'
                                            }`}
                                        style={{ padding: '40px' }}
                                    >


                                        <h3 className="text-2xl font-bold text-white" style={{ textAlign: 'center', marginBottom: '8px' }}>{plan.name}</h3>
                                        <p className="text-gray-400 text-sm" style={{ textAlign: 'center', marginBottom: '28px' }}>{plan.description}</p>

                                        <div
                                            className="mb-8 cursor-pointer hover:scale-105 transition-transform duration-300"
                                            style={{ textAlign: 'center', filter: 'blur(8px)', userSelect: 'none' }}
                                            onClick={() => setShowContactModal(true)}
                                            title="Click to unlock pricing"
                                        >
                                            <span className="text-5xl font-bold text-white">
                                                {billingCycle === 'yearly'
                                                    ? `₹${Math.round(parseInt(plan.price.replace(/[₹,]/g, '')) * 0.8).toLocaleString('en-IN')}`
                                                    : plan.price}
                                            </span>
                                            <span className="text-gray-400">{plan.period}</span>
                                        </div>

                                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                                            <ul style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '32px' }}>
                                                {plan.features.map((feature) => (
                                                    <li key={feature} className="flex items-start gap-3 text-gray-300">
                                                        <CheckCircle2 size={20} className={`flex-shrink-0 mt-0.5 ${plan.popular ? 'text-amber-400' : 'text-cyan-400'
                                                            }`} />
                                                        {feature}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        <button
                                            onClick={() => setShowContactModal(true)}
                                            className={`w-full rounded-xl font-semibold flex items-center justify-center gap-2 transition-all duration-300 hover:scale-[1.02] ${plan.popular
                                                ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-black shadow-lg shadow-amber-500/20'
                                                : 'bg-white/5 text-white border border-white/10 hover:bg-white/10'
                                                }`}
                                            style={{ padding: '16px 24px', fontSize: '16px' }}
                                        >
                                            Get Started
                                            <ArrowRight size={18} />
                                        </button>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* Benefits Section */}
                <section className="relative w-full flex flex-col items-center" style={{ marginTop: '100px', paddingTop: '80px', paddingBottom: '80px' }}>
                    <div style={{ width: '100%', maxWidth: '1280px', margin: '0 auto', paddingLeft: '40px', paddingRight: '40px' }}>
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={fadeInUp}
                            className="text-center"
                            style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: '60px' }}
                        >
                            <h2 className="text-3xl md:text-4xl font-bold text-white" style={{ textAlign: 'center', width: '100%', marginBottom: '16px' }}>
                                Everything You Need to <span className="gradient-text">Succeed</span>
                            </h2>
                            <p className="text-gray-400" style={{ textAlign: 'center', maxWidth: '672px', width: '100%' }}>
                                All plans include these essential features to help your business thrive
                            </p>
                        </motion.div>

                        <motion.div
                            variants={staggerContainer}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 w-full"
                            style={{ gap: '24px' }}
                        >
                            {benefits.map((benefit) => (
                                <motion.div
                                    key={benefit.title}
                                    variants={fadeInUp}
                                    className="rounded-2xl bg-white/[0.02] border border-white/5 hover:border-cyan-500/20 transition-all duration-300 group"
                                    style={{ padding: '32px' }}
                                >
                                    <div className="rounded-xl bg-cyan-500/10 flex items-center justify-center group-hover:scale-110 transition-transform" style={{ width: '56px', height: '56px', marginBottom: '20px' }}>
                                        <benefit.icon size={24} className="text-cyan-400" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-white" style={{ marginBottom: '10px' }}>{benefit.title}</h3>
                                    <p className="text-sm text-gray-400" style={{ lineHeight: '1.6' }}>{benefit.description}</p>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="relative overflow-hidden" style={{ background: '#050505', paddingTop: '120px', paddingBottom: '120px', marginTop: '100px', width: '100%' }}>
                    <div
                        className="absolute inset-0"
                        style={{
                            background: 'radial-gradient(ellipse at center, rgba(0, 212, 255, 0.1) 0%, transparent 60%)'
                        }}
                    />
                    <div style={{ position: 'relative', zIndex: 10, width: '100%', maxWidth: '768px', margin: '0 auto', textAlign: 'center', padding: '0 24px' }}>
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                        >
                            <h2 className="text-4xl md:text-5xl font-bold text-white" style={{ marginBottom: '24px', textAlign: 'center' }}>
                                Not Sure What You Need?
                            </h2>
                            <p className="text-xl text-gray-400" style={{ marginBottom: '40px', textAlign: 'center', maxWidth: '600px' }}>
                                Let&apos;s have a conversation. We&apos;ll help you identify the right plan for your business goals.
                            </p>
                            <button onClick={() => setShowContactModal(true)} className="btn-primary text-lg px-8 py-4">
                                Schedule a Free Consultation
                                <ArrowRight size={20} />
                            </button>
                        </motion.div>
                    </div>
                </section>

                {/* Bottom Spacing */}
                <div style={{ height: '60px' }} />
            </div>

            {/* Contact Modal */}
            <AnimatePresence>
                {showContactModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 flex items-center justify-center"
                        style={{ zIndex: 9999, padding: '16px' }}
                        onClick={() => setShowContactModal(false)}
                    >
                        <div className="absolute inset-0" style={{ backgroundColor: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(12px)' }} />

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                            className="relative w-full"
                            style={{ maxWidth: '440px', maxHeight: '90vh', overflowY: 'auto' }}
                        >
                            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-white/[0.08] to-white/[0.02] border border-white/10 backdrop-blur-xl shadow-2xl">
                                {/* Decorative elements */}
                                <div className="absolute -top-20 -right-20 w-40 h-40 bg-amber-500/20 rounded-full blur-3xl" />
                                <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-cyan-500/20 rounded-full blur-3xl" />

                                <button
                                    onClick={() => setShowContactModal(false)}
                                    className="absolute top-4 right-4 p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-full transition-colors z-10"
                                >
                                    <X size={20} />
                                </button>

                                <div className="relative" style={{ padding: '36px 32px' }}>
                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: '24px' }}>
                                        <div style={{ width: '56px', height: '56px', borderRadius: '16px', background: 'linear-gradient(to bottom right, rgba(0, 212, 255, 0.2), rgba(255, 149, 0, 0.2))', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                                            <MessageCircle size={28} className="text-white" />
                                        </div>
                                        <h3 className="text-xl font-bold text-white" style={{ marginBottom: '8px' }}>
                                            Choose Your Preferred Channel
                                        </h3>
                                        <p className="text-gray-400" style={{ fontSize: '14px' }}>
                                            Our sales team will get back to you shortly
                                        </p>
                                    </div>

                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                        {/* WhatsApp */}
                                        <a
                                            href="https://wa.me/918094100513?text=Hi, I%27m interested in your pricing plans for my company."
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center rounded-xl bg-green-500/10 border border-green-500/20 hover:border-green-500/40 hover:bg-green-500/15 transition-all group"
                                            style={{ padding: '14px', gap: '14px' }}
                                        >
                                            <div className="rounded-lg bg-green-500/20 flex items-center justify-center" style={{ width: '44px', height: '44px', flexShrink: 0 }}>
                                                <FaWhatsapp size={22} className="text-green-400" />
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="font-semibold text-white group-hover:text-green-400 transition-colors" style={{ fontSize: '15px', marginBottom: '2px' }}>WhatsApp</h4>
                                                <p className="text-gray-400" style={{ fontSize: '13px' }}>Quick chat with our team</p>
                                            </div>
                                            <ArrowRight size={18} className="text-gray-400 group-hover:text-green-400 group-hover:translate-x-1 transition-all" />
                                        </a>

                                        {/* Phone Call */}
                                        <a
                                            href="tel:+918094100513"
                                            className="flex items-center rounded-xl bg-cyan-500/10 border border-cyan-500/20 hover:border-cyan-500/40 hover:bg-cyan-500/15 transition-all group"
                                            style={{ padding: '14px', gap: '14px' }}
                                        >
                                            <div className="rounded-lg bg-cyan-500/20 flex items-center justify-center" style={{ width: '44px', height: '44px', flexShrink: 0 }}>
                                                <Phone size={22} className="text-cyan-400" />
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="font-semibold text-white group-hover:text-cyan-400 transition-colors" style={{ fontSize: '15px', marginBottom: '2px' }}>Phone Call</h4>
                                                <p className="text-gray-400" style={{ fontSize: '13px' }}>Speak directly with sales</p>
                                            </div>
                                            <ArrowRight size={18} className="text-gray-400 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
                                        </a>

                                        {/* Email */}
                                        <a
                                            href="mailto:sales@henuos.com?subject=Pricing Inquiry&body=Hi, I%27m interested in learning more about your pricing plans."
                                            className="flex items-center rounded-xl bg-amber-500/10 border border-amber-500/20 hover:border-amber-500/40 hover:bg-amber-500/15 transition-all group"
                                            style={{ padding: '14px', gap: '14px' }}
                                        >
                                            <div className="rounded-lg bg-amber-500/20 flex items-center justify-center" style={{ width: '44px', height: '44px', flexShrink: 0 }}>
                                                <Mail size={22} className="text-amber-400" />
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="font-semibold text-white group-hover:text-amber-400 transition-colors" style={{ fontSize: '15px', marginBottom: '2px' }}>Email</h4>
                                                <p className="text-gray-400" style={{ fontSize: '13px' }}>Detailed proposal via email</p>
                                            </div>
                                            <ArrowRight size={18} className="text-gray-400 group-hover:text-amber-400 group-hover:translate-x-1 transition-all" />
                                        </a>
                                    </div>

                                    <p style={{ marginTop: '20px', textAlign: 'center', fontSize: '12px', color: '#6b7280' }}>
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
}
