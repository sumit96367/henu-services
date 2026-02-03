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
            <div className="min-h-screen bg-[#050505]" style={{ paddingTop: '120px', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
                {/* Hero Section */}
                <section className="relative overflow-hidden" style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    {/* Background Effects */}
                    <div className="absolute -top-40 -right-40 w-80 h-80 bg-cyan-500/10 rounded-full blur-[120px]" />
                    <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-amber-500/10 rounded-full blur-[120px]" />

                    <div style={{ width: '100%', maxWidth: '1280px', margin: '0 auto', padding: '120px 24px', position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '120px' }}>
                        <motion.div
                            initial="hidden"
                            animate="visible"
                            variants={fadeInUp}
                            className="text-center mb-16"
                            style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}
                        >

                            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6" style={{ textAlign: 'center', width: '100%' }}>
                                Choose the Perfect Plan
                                <span className="block gradient-text">for Your Business</span>
                            </h1>
                            <p className="text-xl text-gray-400" style={{ textAlign: 'center', maxWidth: '672px', width: '100%' }}>
                                Flexible pricing options designed to scale with your business. No hidden fees, cancel anytime.
                            </p>
                        </motion.div>

                        {/* Billing Toggle */}
                        <motion.div
                            initial="hidden"
                            animate="visible"
                            variants={fadeInUp}
                            className="flex items-center justify-center gap-4 mb-16"
                        >
                            <span className={`text-sm font-medium ${billingCycle === 'monthly' ? 'text-white' : 'text-gray-500'}`}>
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
                            <span className={`text-sm font-medium ${billingCycle === 'yearly' ? 'text-white' : 'text-gray-500'}`}>
                                Yearly <span className="text-green-400">(Save 20%)</span>
                            </span>
                        </motion.div>

                        {/* Pricing Cards with Blur */}
                        <div style={{ position: 'relative', width: '100%', maxWidth: '1152px', margin: '0 auto' }}>
                            {/* Blurred Pricing Cards */}
                            <motion.div
                                variants={staggerContainer}
                                initial="hidden"
                                animate="visible"
                                style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '32px', filter: 'blur(8px)', pointerEvents: 'none', userSelect: 'none', width: '100%' }}
                            >
                                {pricingPlans.map((plan, index) => (
                                    <motion.div
                                        key={plan.name}
                                        variants={fadeInUp}
                                        className={`relative overflow-hidden rounded-3xl p-10 md:p-14 transition-all duration-300 text-center ${plan.popular
                                            ? 'bg-gradient-to-br from-amber-500/10 to-amber-500/5 border-2 border-amber-500/30 shadow-2xl shadow-amber-500/10'
                                            : 'bg-white/[0.02] border border-white/10'
                                            }`}
                                    >


                                        <h3 className="text-2xl font-bold text-white mb-2" style={{ textAlign: 'center' }}>{plan.name}</h3>
                                        <p className="text-gray-400 text-sm mb-6" style={{ textAlign: 'center' }}>{plan.description}</p>

                                        <div className="mb-8" style={{ textAlign: 'center' }}>
                                            <span className="text-5xl font-bold text-white">
                                                {billingCycle === 'yearly'
                                                    ? `₹${Math.round(parseInt(plan.price.replace(/[₹,]/g, '')) * 0.8).toLocaleString('en-IN')}`
                                                    : plan.price}
                                            </span>
                                            <span className="text-gray-400">{plan.period}</span>
                                        </div>

                                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                                            <ul className="space-y-4 mb-8" style={{ textAlign: 'left' }}>
                                                {plan.features.map((feature) => (
                                                    <li key={feature} className="flex items-start gap-3 text-gray-300">
                                                        <CheckCircle2 size={20} className={`flex-shrink-0 mt-0.5 ${plan.popular ? 'text-amber-400' : 'text-cyan-400'
                                                            }`} />
                                                        {feature}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        <div
                                            className={`w-full py-4 rounded-xl font-semibold flex items-center justify-center gap-2 ${plan.popular
                                                ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-black'
                                                : 'bg-white/5 text-white border border-white/10'
                                                }`}
                                        >
                                            Get Started
                                            <ArrowRight size={18} />
                                        </div>
                                    </motion.div>
                                ))}
                            </motion.div>

                            {/* Unlock Overlay */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="text-center p-14 md:p-20 rounded-3xl bg-gradient-to-br from-[#0a0a0a]/95 to-[#151515]/95 border border-white/10 shadow-2xl max-w-md cursor-pointer hover:border-amber-500/30 transition-all duration-300"
                                    onClick={() => setShowContactModal(true)}
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
                                        className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-black font-semibold rounded-xl hover:from-amber-400 hover:to-amber-500 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-amber-500/25"
                                    >
                                        <Sparkles size={20} />
                                        Contact Sales Team
                                    </button>
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Benefits Section */}
                <section style={{ paddingTop: '120px', paddingBottom: '120px', position: 'relative', width: '100%', marginTop: '60px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{ width: '100%', maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={fadeInUp}
                            className="text-center mb-16"
                            style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}
                        >
                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4" style={{ textAlign: 'center', width: '100%' }}>
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
                            style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px', width: '100%' }}
                        >
                            {benefits.map((benefit) => (
                                <motion.div
                                    key={benefit.title}
                                    variants={fadeInUp}
                                    className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-cyan-500/20 transition-all duration-300 group"
                                >
                                    <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                        <benefit.icon size={24} className="text-cyan-400" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-white mb-2">{benefit.title}</h3>
                                    <p className="text-sm text-gray-400">{benefit.description}</p>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </section>

                {/* CTA Section */}
                <section style={{ paddingTop: '120px', paddingBottom: '120px', position: 'relative', width: '100%', marginTop: '60px', display: 'flex', flexDirection: 'column', alignItems: 'center', overflow: 'hidden' }}>
                    {/* Background Glow Effect */}
                    <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '600px', height: '300px', background: 'radial-gradient(ellipse at center, rgba(0, 180, 216, 0.15) 0%, transparent 70%)', pointerEvents: 'none' }} />

                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                        style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', zIndex: 1 }}
                    >
                        <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'white', marginBottom: '16px', textAlign: 'center' }}>
                            Ready to <span className="gradient-text">Get Started</span>?
                        </h2>
                        <p style={{ color: '#9ca3af', marginBottom: '40px', textAlign: 'center', maxWidth: '500px', fontSize: '1.1rem' }}>
                            Contact our sales team for custom enterprise pricing tailored to your specific requirements
                        </p>
                        <div style={{ display: 'flex', flexDirection: 'row', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
                            <button
                                onClick={() => setShowContactModal(true)}
                                style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '8px',
                                    padding: '16px 32px',
                                    backgroundColor: 'white',
                                    color: 'black',
                                    fontWeight: '600',
                                    borderRadius: '9999px',
                                    border: 'none',
                                    cursor: 'pointer',
                                    fontSize: '1rem',
                                    transition: 'all 0.3s ease'
                                }}
                                className="hover:scale-105"
                            >
                                Start Your Project
                                <ArrowRight size={18} />
                            </button>
                            <Link
                                href="/portfolio"
                                style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '8px',
                                    padding: '16px 32px',
                                    backgroundColor: 'transparent',
                                    color: 'white',
                                    fontWeight: '600',
                                    borderRadius: '9999px',
                                    border: '1px solid rgba(255,255,255,0.2)',
                                    fontSize: '1rem',
                                    transition: 'all 0.3s ease'
                                }}
                                className="hover:bg-white/10"
                            >
                                View Our Work
                            </Link>
                        </div>
                    </motion.div>
                </section>

                {/* Bottom Spacing */}
                <div style={{ height: '100px' }} />
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
}
