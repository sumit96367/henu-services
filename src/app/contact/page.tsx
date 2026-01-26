'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import Link from 'next/link';
import {
    Mail,
    Phone,
    MapPin,
    Clock,
    Send,
    MessageSquare,
    CheckCircle,
    Twitter,
    Linkedin,
    Github,
    Instagram,
    ArrowRight,
    ChevronRight,
    Search
} from 'lucide-react';
import { PremiumTextReveal } from '@/components/ui/premium-text-reveal';
import { GlowingCard } from '@/components/ui/glowing-card';
import { ShaderBackground } from '@/components/ui/shader-background';

// Contact Info
const contactInfo = [
    {
        icon: Mail,
        title: 'Email Us',
        value: 'henuosr@gmail.com',
        link: 'mailto:henuosr@gmail.com',
        color: 'cyan'
    },
    {
        icon: Phone,
        title: 'Call Us',
        value: '+91 8094100513',
        link: 'tel:+918094100513',
        color: 'cyan'
    },
    {
        icon: MapPin,
        title: 'Visit Us',
        value: 'Pali, Rajasthan, India',
        link: 'https://maps.app.goo.gl/BkdhNgWXiS1KSYNk8',
        color: 'amber'
    },
    {
        icon: Clock,
        title: 'Working Hours',
        value: 'Mon - Sat: 9AM - 7PM',
        link: null,
        color: 'amber'
    }
];

// Service Options
const serviceOptions = [
    'Web Development',
    'Mobile App Development',
    'Backend Development',
    'AI Agent Development',
    'Digital Marketing',
    'Advertisement',
    'Legal Documentation',
    'Company Registration',
    'Government Grants',
    'Other'
];

// Budget Options
const budgetOptions = [
    'Less than ₹1 Lakh',
    '₹1 Lakh - ₹5 Lakhs',
    '₹5 Lakhs - ₹20 Lakhs',
    '₹20 Lakhs - ₹50 Lakhs',
    'More than ₹50 Lakhs',
    'Not Sure'
];

export default function ContactPage() {
    const [formState, setFormState] = useState({
        name: '',
        email: '',
        phone: '',
        company: '',
        service: '',
        budget: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate form submission
        await new Promise(resolve => setTimeout(resolve, 2000));

        setIsSubmitting(false);
        setIsSubmitted(true);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormState(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    return (
        <main className="relative z-10">

            {/* Hero Section */}
            <section
                className="relative pb-24 overflow-hidden flex items-start"
                style={{ background: '#050505', paddingTop: '140px' }}
            >
                <div className="absolute inset-0">
                    <div className="grid-background" />
                    <motion.div
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full"
                        style={{
                            background: 'radial-gradient(circle, rgba(0, 212, 255, 0.08) 0%, transparent 70%)',
                            filter: 'blur(100px)'
                        }}
                        animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
                        transition={{ duration: 10, repeat: Infinity }}
                    />
                </div>
                <div className="container relative z-10 flex justify-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-5xl w-full flex flex-col items-center text-center"
                    >

                        <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold text-white mb-2 leading-[1.0] tracking-tighter text-center">
                            <PremiumTextReveal text="Ready to" className="justify-center" />
                            <br />
                            <span className="gradient-text block">
                                <PremiumTextReveal text="Build Something" delay={0.2} className="justify-center" />
                            </span>
                            <PremiumTextReveal text="Extraordinary?" delay={0.4} className="justify-center" />
                        </h1>

                        <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed text-center">
                            Have a vision? We have the expertise. Let's discuss how Henu OS can accelerate your growth.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Contact Grid Section */}
            <section className="py-12 bg-transparent">
                <div className="container">
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {contactInfo.map((info, index) => (
                            <motion.div
                                key={info.title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                {info.link ? (
                                    <a href={info.link} className="group block h-full">
                                        <GlowingCard className="h-full" innerClassName="text-left" style={{ paddingTop: '16px', paddingBottom: '16px', paddingLeft: '16px', paddingRight: '16px' }}>
                                            <div className="flex" style={{ gap: '20px' }}>
                                                <div
                                                    className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 shadow-lg shrink-0"
                                                    style={{ background: info.color === 'cyan' ? 'rgba(0, 212, 255, 0.1)' : 'rgba(255, 149, 0, 0.1)', border: `1px solid ${info.color === 'cyan' ? 'rgba(0, 212, 255, 0.2)' : 'rgba(255, 149, 0, 0.2)'}` }}
                                                >
                                                    <info.icon size={20} className={info.color === 'cyan' ? 'text-cyan-400' : 'text-amber-400'} />
                                                </div>
                                                <div className="flex flex-col" style={{ gap: '2px' }}>
                                                    <div className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors" style={{ lineHeight: '1.2', margin: 0 }}>{info.title}</div>
                                                    <div className="text-gray-400 font-medium text-base" style={{ lineHeight: '1.4', margin: 0 }}>{info.value}</div>
                                                </div>
                                            </div>
                                        </GlowingCard>
                                    </a>
                                ) : (
                                    <div className="h-full group">
                                        <GlowingCard className="h-full" innerClassName="text-left" style={{ paddingTop: '16px', paddingBottom: '16px', paddingLeft: '16px', paddingRight: '16px' }}>
                                            <div className="flex" style={{ gap: '20px' }}>
                                                <div
                                                    className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 shadow-lg shrink-0"
                                                    style={{ background: info.color === 'cyan' ? 'rgba(0, 212, 255, 0.1)' : 'rgba(255, 149, 0, 0.1)', border: `1px solid ${info.color === 'cyan' ? 'rgba(0, 212, 255, 0.2)' : 'rgba(255, 149, 0, 0.2)'}` }}
                                                >
                                                    <info.icon size={20} className={info.color === 'cyan' ? 'text-cyan-400' : 'text-amber-400'} />
                                                </div>
                                                <div className="flex flex-col" style={{ gap: '2px' }}>
                                                    <div className="text-xl font-bold text-white" style={{ lineHeight: '1.2', margin: 0 }}>{info.title}</div>
                                                    <div className="text-gray-400 font-medium text-base" style={{ lineHeight: '1.4', margin: 0 }}>{info.value}</div>
                                                </div>
                                            </div>
                                        </GlowingCard>
                                    </div>
                                )}
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Form Section */}
            <section className="section bg-transparent" id="inquiry">
                <div className="container">
                    <div className="grid lg:grid-cols-2 gap-20 items-stretch">

                        {/* Left - Why Contact Us */}
                        <motion.div
                            initial={{ opacity: 0, x: -40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="flex flex-col justify-center"
                        >
                            <h2 className="text-5xl md:text-6xl font-bold text-white mb-8 leading-tight">
                                Let's Map Out Your <span className="gradient-text">Success Story</span>
                            </h2>
                            <p className="text-xl text-gray-400 mb-12 leading-relaxed">
                                Our consultants are ready to dive deep into your requirements and provide a strategic roadmap tailored for your business.
                            </p>

                            <div className="grid sm:grid-cols-2 gap-8">
                                <div className="space-y-4">
                                    <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20">
                                        <CheckCircle className="w-6 h-6 text-cyan-400" />
                                    </div>
                                    <h4 className="text-white font-bold text-xl">Quick Turnaround</h4>
                                    <p className="text-gray-500">Expect a detailed response within 24 business hours.</p>
                                </div>
                                <div className="space-y-4">
                                    <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center border border-amber-500/20">
                                        <Search className="w-6 h-6 text-amber-400" />
                                    </div>
                                    <h4 className="text-white font-bold text-xl">Expert Analysis</h4>
                                    <p className="text-gray-500">Your inquiry is reviewed by senior sector leads, not bots.</p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Right - Interactive Form */}
                        <motion.div
                            initial={{ opacity: 0, x: 40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="h-full"
                        >
                            <AnimatePresence mode="wait">
                                {isSubmitted ? (
                                    <motion.div
                                        key="success"
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        className="h-full"
                                    >
                                        <GlowingCard className="h-full" innerClassName="p-16 text-center flex flex-col items-center justify-center">
                                            <motion.div
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                transition={{ type: 'spring', duration: 0.5, delay: 0.2 }}
                                                className="w-32 h-32 mx-auto mb-10 rounded-full bg-green-500/20 flex items-center justify-center border-4 border-green-500/20 shadow-3xl shadow-green-500/10"
                                            >
                                                <CheckCircle className="w-16 h-16 text-green-400" />
                                            </motion.div>
                                            <h3 className="text-5xl font-bold text-white mb-6">Inquiry Sent!</h3>
                                            <p className="text-2xl text-gray-400 mb-12 max-w-sm leading-relaxed">
                                                We've received your request. One of our experts will contact you shortly.
                                            </p>
                                            <button
                                                onClick={() => setIsSubmitted(false)}
                                                className="btn-secondary px-10 py-5 text-xl font-bold"
                                            >
                                                Send Another Message
                                            </button>
                                        </GlowingCard>
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="form"
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        className="h-full"
                                    >
                                        <GlowingCard className="h-full" innerClassName="p-12 md:p-16">
                                            <form onSubmit={handleSubmit} className="space-y-8">
                                                <div className="grid md:grid-cols-2 gap-8">
                                                    <div className="space-y-3">
                                                        <label className="block text-white text-sm font-extrabold uppercase tracking-widest opacity-60">Full Name *</label>
                                                        <input
                                                            type="text"
                                                            name="name"
                                                            value={formState.name}
                                                            onChange={handleChange}
                                                            required
                                                            className="w-full px-6 py-5 bg-white/5 border border-white/10 rounded-3xl text-white placeholder-gray-600 focus:outline-none focus:border-cyan-500/50 focus:bg-white/10 transition-all font-semibold"
                                                            placeholder="John Doe"
                                                        />
                                                    </div>
                                                    <div className="space-y-3">
                                                        <label className="block text-white text-sm font-extrabold uppercase tracking-widest opacity-60">Email Address *</label>
                                                        <input
                                                            type="email"
                                                            name="email"
                                                            value={formState.email}
                                                            onChange={handleChange}
                                                            required
                                                            className="w-full px-6 py-5 bg-white/5 border border-white/10 rounded-3xl text-white placeholder-gray-600 focus:outline-none focus:border-cyan-500/50 focus:bg-white/10 transition-all font-semibold"
                                                            placeholder="john@company.com"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="grid md:grid-cols-2 gap-8">
                                                    <div className="space-y-3">
                                                        <label className="block text-white text-sm font-extrabold uppercase tracking-widest opacity-60">Service Aspect *</label>
                                                        <div className="relative">
                                                            <select
                                                                name="service"
                                                                value={formState.service}
                                                                onChange={handleChange}
                                                                required
                                                                className="w-full px-6 py-5 bg-white/5 border border-white/10 rounded-3xl text-white focus:outline-none focus:border-cyan-500/50 focus:bg-white/10 transition-all font-semibold appearance-none cursor-pointer"
                                                            >
                                                                <option value="" className="bg-gray-900">Choose Service</option>
                                                                {serviceOptions.map(option => (
                                                                    <option key={option} value={option} className="bg-gray-900">{option}</option>
                                                                ))}
                                                            </select>
                                                            <ChevronRight size={20} className="absolute right-6 top-1/2 -translate-y-1/2 rotate-90 text-gray-400 pointer-events-none" />
                                                        </div>
                                                    </div>
                                                    <div className="space-y-3">
                                                        <label className="block text-white text-sm font-extrabold uppercase tracking-widest opacity-60">Budget Range</label>
                                                        <div className="relative">
                                                            <select
                                                                name="budget"
                                                                value={formState.budget}
                                                                onChange={handleChange}
                                                                className="w-full px-6 py-5 bg-white/5 border border-white/10 rounded-3xl text-white focus:outline-none focus:border-cyan-500/50 focus:bg-white/10 transition-all font-semibold appearance-none cursor-pointer"
                                                            >
                                                                <option value="" className="bg-gray-900">Choose Range</option>
                                                                {budgetOptions.map(option => (
                                                                    <option key={option} value={option} className="bg-gray-900">{option}</option>
                                                                ))}
                                                            </select>
                                                            <ChevronRight size={20} className="absolute right-6 top-1/2 -translate-y-1/2 rotate-90 text-gray-400 pointer-events-none" />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="space-y-3">
                                                    <label className="block text-white text-sm font-extrabold uppercase tracking-widest opacity-60">Project Brief *</label>
                                                    <textarea
                                                        name="message"
                                                        value={formState.message}
                                                        onChange={handleChange}
                                                        required
                                                        rows={6}
                                                        className="w-full px-8 py-6 bg-white/5 border border-white/10 rounded-[2.5rem] text-white placeholder-gray-600 focus:outline-none focus:border-cyan-500/50 focus:bg-white/10 transition-all font-semibold resize-none leading-relaxed"
                                                        placeholder="Walk us through your vision, challenges, and timeline..."
                                                    />
                                                </div>

                                                <button
                                                    type="submit"
                                                    disabled={isSubmitting}
                                                    className="w-full btn-primary py-6 text-xl font-black uppercase tracking-[0.2em] rounded-full disabled:opacity-50 group hover:shadow-[0_0_50px_rgba(0,212,255,0.3)]"
                                                >
                                                    {isSubmitting ? (
                                                        <span className="flex items-center justify-center gap-4">
                                                            <motion.div
                                                                animate={{ rotate: 360 }}
                                                                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                                                                className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full"
                                                            />
                                                            Dispatching...
                                                        </span>
                                                    ) : (
                                                        <span className="flex items-center justify-center gap-4">
                                                            Send Message
                                                            <Send size={24} className="group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform duration-500" />
                                                        </span>
                                                    )}
                                                </button>
                                            </form>
                                        </GlowingCard>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Location Section */}
            <section className="py-24 bg-transparent">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-5xl font-bold text-white mb-6"> Our <span className="gradient-text">Global Headquarters</span></h2>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="relative overflow-hidden group"
                    >
                        <GlowingCard className="w-full aspect-[21/9]" innerClassName="p-0 overflow-hidden">
                            <div className="w-full h-full relative flex items-center justify-center">
                                {/* Animated Shader Background */}
                                <ShaderBackground className="opacity-60" />

                                {/* Content Overlay */}
                                <div className="text-center z-10 p-12 relative">
                                    <div className="w-24 h-24 mx-auto mb-8 rounded-[2rem] bg-gradient-to-br from-cyan-500 to-amber-500 flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-700">
                                        <MapPin className="w-12 h-12 text-white" />
                                    </div>
                                    <h3 className="text-4xl font-bold text-white mb-4 italic tracking-tight">Henu OS Private Limited</h3>
                                    <p className="text-gray-400 text-xl font-medium">Jodhpur, Rajasthan, India</p>
                                    <Link
                                        href="https://maps.google.com"
                                        target="_blank"
                                        className="inline-flex items-center gap-3 mt-10 text-cyan-400 font-bold uppercase tracking-widest text-sm hover:text-white transition-colors group/link"
                                    >
                                        Navigate via Google Maps
                                        <ArrowRight size={20} className="group-hover/link:translate-x-2 transition-transform" />
                                    </Link>
                                </div>
                            </div>
                        </GlowingCard>
                    </motion.div>
                </div>
            </section>

        </main>
    );
}
