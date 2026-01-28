'use client';

import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { useState, useRef } from 'react';
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
    Search,
    Code,
    Smartphone,
    Server,
    Brain,
    Megaphone,
    FileText,
    Building2,
    Landmark,
    DollarSign,
    IndianRupee,
    Wallet,
    User,
    Briefcase
} from 'lucide-react';
import { PremiumTextReveal } from '@/components/ui/premium-text-reveal';
import { GlowingCard } from '@/components/ui/glowing-card';
import { ShaderBackground } from '@/components/ui/shader-background';
import { FloatingInput } from '@/components/ui/floating-input';
import { SelectableCard } from '@/components/ui/selectable-card';
import { StepIndicator } from '@/components/ui/step-indicator';
import { FloatingPillButton } from '@/components/ui/floating-pill-button';
import { ExpandableTextarea } from '@/components/ui/expandable-textarea';
import { Spotlight } from '@/components/ui/spotlight';

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

// Service Options with Icons
const serviceOptions = [
    { id: 'web', icon: Code, title: 'Web Development', description: 'Modern web applications' },
    { id: 'mobile', icon: Smartphone, title: 'Mobile App Development', description: 'iOS & Android apps' },
    { id: 'backend', icon: Server, title: 'Backend Development', description: 'Scalable server solutions' },
    { id: 'ai', icon: Brain, title: 'AI Agent Development', description: 'Intelligent automation' },
    { id: 'marketing', icon: Megaphone, title: 'Digital Marketing', description: 'Growth strategies' },
    { id: 'legal', icon: FileText, title: 'Legal Documentation', description: 'Compliance support' },
    { id: 'company', icon: Building2, title: 'Company Registration', description: 'Business setup' },
    { id: 'grants', icon: Landmark, title: 'Government Grants', description: 'Funding assistance' },
];

// Budget Options with Icons
const budgetOptions = [
    { id: 'budget1', icon: Wallet, title: 'Less than ₹1 Lakh', value: 'Less than ₹1 Lakh' },
    { id: 'budget2', icon: IndianRupee, title: '₹1L - ₹5L', value: '₹1 Lakh - ₹5 Lakhs' },
    { id: 'budget3', icon: DollarSign, title: '₹5L - ₹20L', value: '₹5 Lakhs - ₹20 Lakhs' },
    { id: 'budget4', icon: DollarSign, title: '₹20L - ₹50L', value: '₹20 Lakhs - ₹50 Lakhs' },
    { id: 'budget5', icon: DollarSign, title: 'More than ₹50L', value: 'More than ₹50 Lakhs' },
    { id: 'budget6', icon: Search, title: 'Not Sure', value: 'Not Sure' },
];

export default function ContactPage() {
    const [currentStep, setCurrentStep] = useState(1);
    const [formState, setFormState] = useState({
        name: '',
        email: '',
        service: '',
        budget: '',
        message: ''
    });
    const [selectedServiceIds, setSelectedServiceIds] = useState<string[]>([]);
    const [selectedBudgetId, setSelectedBudgetId] = useState<string>('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"],
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    const handleContinue = () => {
        // Validate Step 1
        if (formState.name && formState.email) {
            setCurrentStep(2);
        }
    };

    const handleBack = () => {
        setCurrentStep(1);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate form submission
        await new Promise(resolve => setTimeout(resolve, 2000));

        setIsSubmitting(false);
        setIsSubmitted(true);
        setCurrentStep(1); // Reset to step 1
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormState(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleServiceSelect = (serviceId: string) => {
        setSelectedServiceIds(prev => {
            const next = prev.includes(serviceId)
                ? prev.filter(id => id !== serviceId)
                : [...prev, serviceId];

            // Update formState.service with a comma-separated list for submission
            const titles = next.map(id => serviceOptions.find(s => s.id === id)?.title).filter(Boolean);
            setFormState(formPrev => ({ ...formPrev, service: titles.join(', ') }));

            return next;
        });
    };

    const handleBudgetSelect = (budgetId: string) => {
        setSelectedBudgetId(budgetId);
        const budget = budgetOptions.find(b => b.id === budgetId);
        setFormState(prev => ({ ...prev, budget: budget?.value || '' }));
    };

    return (
        <main className="relative z-10">
            {/* Hero Section */}
            <section
                ref={containerRef}
                className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden"
                style={{ background: '#050505' }}
            >
                <Spotlight
                    className="-top-40 left-0 md:left-60 md:-top-20"
                    fill="white"
                />

                {/* Aesthetic Background Elements */}
                <div className="absolute inset-0 z-0">
                    <div className="horizon-grid" />
                    <div className="grid-background opacity-20" />

                    {/* Ambient Glow */}
                    <motion.div
                        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full"
                        style={{
                            background: 'radial-gradient(circle, rgba(0, 212, 255, 0.15) 0%, transparent 70%)',
                            filter: 'blur(60px)'
                        }}
                        animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.3, 0.6, 0.3]
                        }}
                        transition={{ duration: 8, repeat: Infinity }}
                    />
                    <motion.div
                        className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full"
                        style={{
                            background: 'radial-gradient(circle, rgba(255, 149, 0, 0.12) 0%, transparent 70%)',
                            filter: 'blur(60px)'
                        }}
                        animate={{
                            scale: [1.2, 1, 1.2],
                            opacity: [0.3, 0.5, 0.3]
                        }}
                        transition={{ duration: 10, repeat: Infinity }}
                    />
                </div>

                <motion.div
                    style={{ y, opacity }}
                    className="relative z-10 w-full flex flex-col items-center justify-center px-6"
                >
                    <div className="max-w-5xl w-full mx-auto flex flex-col items-center text-center">
                        <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-white mb-8 leading-[1.0] tracking-tighter text-center flex flex-col items-center w-full">
                            <PremiumTextReveal text="Ready to" className="w-full justify-center" />
                            <span className="gradient-text block w-full text-center">
                                <PremiumTextReveal text="Build Something" delay={0.2} className="w-full justify-center" />
                            </span>
                            <PremiumTextReveal text="Extraordinary?" delay={0.4} className="w-full justify-center" />
                        </h1>

                        <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed text-center mt-6">
                            Have a vision? We have the expertise. Let's discuss how Henu OS can accelerate your growth.
                        </p>
                    </div>
                </motion.div>

                {/* Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 hidden md:block"
                >
                    <div className="flex flex-col items-center gap-2">
                        <span className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold">Scroll to Explore</span>
                        <div className="w-[1px] h-12 bg-gradient-to-b from-cyan-500/50 to-transparent relative overflow-hidden">
                            <motion.div
                                animate={{ y: ["-100%", "100%"] }}
                                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                className="absolute inset-0 bg-white w-full h-1/2"
                            />
                        </div>
                    </div>
                </motion.div>
            </section>

            {/* Contact Grid Section */}
            <section className="py-12 bg-transparent px-6">
                <div className="container mx-auto">
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
            <section className="section relative px-6" id="inquiry">
                <div className="container max-w-5xl mx-auto relative z-10">
                    <div className="flex flex-col gap-12">

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
                                        <GlowingCard className="h-full" innerClassName="p-16 text-center flex flex-col items-center justify-center !bg-black">
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
                                            <motion.button
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                onClick={() => setIsSubmitted(false)}
                                                className="btn-primary"
                                            >
                                                Send Another Message
                                            </motion.button>
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
                                        <GlowingCard className="h-full" innerClassName="!p-10 !bg-black">
                                            {/* Step Indicator */}
                                            <StepIndicator currentStep={currentStep} totalSteps={2} className="mb-10" />

                                            <AnimatePresence mode="wait">
                                                {currentStep === 1 ? (
                                                    <motion.div
                                                        key="step1"
                                                        initial={{ opacity: 0, x: -20 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        exit={{ opacity: 0, x: 20 }}
                                                        transition={{ duration: 0.3 }}
                                                        className="space-y-12"
                                                    >
                                                        <div className="space-y-12">
                                                            <div>
                                                                <h3 className="text-3xl font-bold text-white mb-2 tracking-tight">
                                                                    Let's Start with <span className="gradient-text">Your Details</span>
                                                                </h3>
                                                                <p className="text-lg text-gray-400">Tell us who you are</p>
                                                            </div>

                                                            <div className="grid md:grid-cols-2 gap-8">
                                                                <div className="space-y-5">
                                                                    <label className="text-lg font-bold text-gray-300 block px-1 tracking-wider uppercase text-[13px]">Full Name</label>
                                                                    <div className="relative group flex items-center">
                                                                        <User className="absolute left-4 w-5 h-5 text-gray-400 group-focus-within:text-cyan-400 transition-colors z-10" />
                                                                        <input
                                                                            required
                                                                            name="name"
                                                                            type="text"
                                                                            value={formState.name}
                                                                            onChange={(e) => setFormState(prev => ({ ...prev, name: e.target.value }))}
                                                                            placeholder="John Doe"
                                                                            className="w-full bg-black border border-white/10 rounded-xl !py-4 !pl-14 !pr-4 text-white placeholder:text-gray-500 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-all font-medium text-sm"
                                                                        />
                                                                    </div>
                                                                </div>

                                                                <div className="space-y-5">
                                                                    <label className="text-lg font-bold text-gray-300 block px-1 tracking-wider uppercase text-[13px]">Email Address</label>
                                                                    <div className="relative group flex items-center">
                                                                        <Mail className="absolute left-4 w-5 h-5 text-gray-400 group-focus-within:text-cyan-400 transition-colors z-10" />
                                                                        <input
                                                                            required
                                                                            name="email"
                                                                            type="email"
                                                                            value={formState.email}
                                                                            onChange={(e) => setFormState(prev => ({ ...prev, email: e.target.value }))}
                                                                            placeholder="john@company.com"
                                                                            className="w-full bg-black border border-white/10 rounded-xl !py-4 !pl-14 !pr-4 text-white placeholder:text-gray-500 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-all font-medium text-sm"
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className="flex justify-end pt-4">
                                                                <motion.button
                                                                    whileHover={{ scale: 1.05 }}
                                                                    whileTap={{ scale: 0.95 }}
                                                                    type="button"
                                                                    onClick={handleContinue}
                                                                    disabled={!formState.name || !formState.email}
                                                                    className="btn-primary"
                                                                >
                                                                    Continue
                                                                    <ArrowRight size={18} />
                                                                </motion.button>
                                                            </div>
                                                        </div>
                                                    </motion.div>
                                                ) : (
                                                    <motion.form
                                                        key="step2"
                                                        initial={{ opacity: 0, x: 20 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        exit={{ opacity: 0, x: -20 }}
                                                        transition={{ duration: 0.3 }}
                                                        onSubmit={handleSubmit}
                                                        className="space-y-16"
                                                    >
                                                        <div>
                                                            <h3 className="text-4xl font-bold text-white mb-3 tracking-tighter">
                                                                Now, <span className="gradient-text">Your Project</span>
                                                            </h3>
                                                            <p className="text-xl text-gray-400">What can we build for you?</p>
                                                        </div>

                                                        {/* Service Selection */}
                                                        <div className="space-y-6 !mt-20">
                                                            <label className="text-xl font-bold text-gray-300 block px-1 tracking-wider uppercase text-[14px]">
                                                                Service Aspect *
                                                            </label>
                                                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                                                                {serviceOptions.map((service) => (
                                                                    <SelectableCard
                                                                        key={service.id}
                                                                        icon={service.icon}
                                                                        title={service.title}
                                                                        description={service.description}
                                                                        isSelected={selectedServiceIds.includes(service.id)}
                                                                        onClick={() => handleServiceSelect(service.id)}
                                                                    />
                                                                ))}
                                                            </div>
                                                        </div>

                                                        {/* Budget Selection */}
                                                        <div className="space-y-6 !mt-16">
                                                            <label className="text-xl font-bold text-gray-300 block px-1 tracking-wider uppercase text-[14px]">
                                                                Budget Range
                                                            </label>
                                                            <div className="relative group">
                                                                <IndianRupee className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-cyan-400 transition-colors z-10" />
                                                                <select
                                                                    value={selectedBudgetId}
                                                                    onChange={(e) => handleBudgetSelect(e.target.value)}
                                                                    className="w-full bg-black border border-white/10 rounded-2xl py-5 !pl-16 !pr-10 text-white focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-all font-medium appearance-none cursor-pointer text-base"
                                                                >
                                                                    <option value="" disabled className="bg-[#050505]">Select your budget range...</option>
                                                                    {budgetOptions.map((budget) => (
                                                                        <option key={budget.id} value={budget.id} className="bg-[#050505] py-4">
                                                                            {budget.title}
                                                                        </option>
                                                                    ))}
                                                                </select>
                                                                <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none">
                                                                    <ChevronRight className="w-5 h-5 text-gray-400 rotate-90" />
                                                                </div>
                                                            </div>
                                                        </div>

                                                        {/* Project Brief */}
                                                        <div className="space-y-6 !mt-16">
                                                            <label className="text-xl font-bold text-gray-300 block px-1 tracking-wider uppercase text-[14px]">Project Brief</label>
                                                            <div className="relative group">
                                                                <MessageSquare className="absolute left-6 top-6 w-5 h-5 text-gray-400 group-focus-within:text-cyan-400 transition-colors z-10" />
                                                                <textarea
                                                                    required
                                                                    name="message"
                                                                    rows={5}
                                                                    value={formState.message}
                                                                    onChange={(e) => setFormState(prev => ({ ...prev, message: e.target.value }))}
                                                                    placeholder="Walk us through your vision, challenges, and timeline..."
                                                                    className="w-full bg-black border border-white/10 rounded-2xl !pt-6 !pl-16 !pr-6 !pb-6 text-white placeholder:text-gray-500 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-all font-medium resize-none text-base leading-relaxed"
                                                                ></textarea>
                                                            </div>
                                                        </div>

                                                        {/* Action Buttons */}
                                                        <div className="flex items-center justify-between gap-4 pt-8 border-t border-white/5">
                                                            <motion.button
                                                                whileHover={{ scale: 1.05 }}
                                                                whileTap={{ scale: 0.95 }}
                                                                type="button"
                                                                onClick={handleBack}
                                                                className="btn-secondary"
                                                            >
                                                                <ArrowRight className="w-4 h-4 rotate-180" />
                                                                Back
                                                            </motion.button>
                                                            <motion.button
                                                                whileHover={{ scale: 1.05 }}
                                                                whileTap={{ scale: 0.95 }}
                                                                type="submit"
                                                                disabled={isSubmitting || selectedServiceIds.length === 0 || !formState.message}
                                                                className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                                                            >
                                                                {isSubmitting ? (
                                                                    <span className="flex items-center gap-2">
                                                                        <div className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                                                                        Sending...
                                                                    </span>
                                                                ) : (
                                                                    <>
                                                                        Send Message
                                                                        <Send className="w-4 h-4" />
                                                                    </>
                                                                )}
                                                            </motion.button>
                                                        </div>
                                                    </motion.form>
                                                )}
                                            </AnimatePresence>
                                        </GlowingCard>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    </div>
                </div>
            </section >


        </main >
    );
}
