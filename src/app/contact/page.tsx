'use client';

import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { useState, useRef } from 'react';
import Link from 'next/link';
import { cn } from "@/lib/utils";
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
import { useAuth } from '@/context/AuthContext';

// Contact Info
const contactInfo = [
    {
        icon: Mail,
        title: 'Email Us',
        value: 'henuosr@gmail.com',
        link: 'mailto:henuosr@gmail.com',
        color: 'purple'
    },
    {
        icon: Phone,
        title: 'Call Us',
        value: '+91 8094100513',
        link: 'tel:+918094100513',
        color: 'purple'
    },
    {
        icon: MapPin,
        title: 'Visit Us',
        value: 'Pali, Rajasthan, India',
        link: 'https://maps.app.goo.gl/BkdhNgWXiS1KSYNk8',
        color: 'indigo'
    },
    {
        icon: Clock,
        title: 'Working Hours',
        value: 'Mon - Sat: 9AM - 7PM',
        link: null,
        color: 'indigo'
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
    const { user } = useAuth();
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

        try {
            const response = await fetch('/api/contact/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formState,
                    userId: user?.id || null,
                    userType: user?.userType || 'company',
                    companyName: user?.companyName || null
                })
            });

            if (response.ok) {
                setIsSubmitted(true);
                setCurrentStep(1); // Reset to step 1 for future use
            } else {
                const data = await response.json();
                alert(data.error || 'Failed to send inquiry');
            }
        } catch (error) {
            console.error('Submission error:', error);
            alert('An error occurred. Please try again later.');
        } finally {
            setIsSubmitting(false);
        }
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
                            background: 'radial-gradient(circle, rgba(109, 40, 217, 0.15) 0%, transparent 70%)',
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
                            background: 'radial-gradient(circle, rgba(79, 70, 229, 0.12) 0%, transparent 70%)',
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
                        <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-white mb-8 leading-[1.0] tracking-tighter text-center flex flex-col items-center w-full uppercase">
                            <PremiumTextReveal text="Ready to" className="w-full justify-center" />
                            <span className="gradient-text block w-full text-center">
                                <PremiumTextReveal text="Build Something" delay={0.2} className="w-full justify-center" />
                            </span>
                            <PremiumTextReveal text="Extraordinary?" delay={0.4} className="w-full justify-center" />
                        </h1>

                        <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed text-center mt-6">
                            Have a vision? We have the expertise. Let&apos;s discuss how Henu OS can accelerate your growth.
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
                        <div className="w-[1px] h-12 bg-gradient-to-b from-purple-500/50 to-transparent relative overflow-hidden">
                            <motion.div
                                animate={{ y: ["-100%", "100%"] }}
                                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                className="absolute inset-0 bg-white w-full h-1/2"
                            />
                        </div>
                    </div>
                </motion.div>
            </section>

            {/* Contact Info Section - Refined 4-Column Grid */}
            <section className="section relative overflow-hidden bg-[#050505] py-20 md:py-32">
                <div style={{ width: '100%', maxWidth: '1400px', margin: '0 auto' }}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 w-full">
                        {contactInfo.map((info, index) => (
                            <motion.div
                                key={info.title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1, duration: 0.6 }}
                            >
                                {info.link ? (
                                    <a href={info.link} className="group block h-full">
                                        <div className="relative group/card h-full transition-all duration-500">
                                            {/* Accent Background Glow */}
                                            <div className={cn(
                                                "absolute inset-0 rounded-[1.5rem] opacity-0 group-hover/card:opacity-10 transition-opacity duration-700 blur-[60px]",
                                                info.color === 'purple' ? 'bg-purple-500' : 'bg-indigo-500'
                                            )} />

                                            <div className="relative h-full flex flex-col items-center justify-center bg-[#050505] border border-white/5 rounded-[1.5rem] overflow-hidden group-hover/card:border-white/20 transition-all duration-500" style={{ padding: '48px 24px' }}>
                                                {/* Background Decorative Icon */}
                                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.02] group-hover/card:opacity-[0.05] transition-opacity duration-700">
                                                    <info.icon size={160} />
                                                </div>

                                                <div className={cn(
                                                    "w-14 h-14 rounded-full flex items-center justify-center mb-6 transition-all duration-700 group-hover/card:scale-110",
                                                    info.color === 'purple' ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20 shadow-[0_0_30px_rgba(109,40,217,0.1)]' : 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 shadow-[0_0_30px_rgba(79,70,229,0.1)]'
                                                )}>
                                                    <info.icon size={24} />
                                                </div>

                                                <div className="text-center relative z-10 w-full px-2">
                                                    <h3 className="text-[10px] font-bold text-gray-500 tracking-[0.4em] uppercase mb-3">{info.title}</h3>
                                                    <p className="text-base md:text-lg font-bold text-white group-hover/card:text-white transition-colors tracking-tight leading-tight break-all">
                                                        {info.value}
                                                    </p>
                                                </div>

                                                {/* Bottom Accent Bar */}
                                                <div className={cn(
                                                    "absolute bottom-0 left-6 right-6 h-[2px] transition-all duration-700 opacity-0 group-hover/card:opacity-100",
                                                    info.color === 'purple' ? 'bg-purple-500' : 'bg-indigo-500'
                                                )} />
                                            </div>
                                        </div>
                                    </a>
                                ) : (
                                    <div className="h-full group/card relative transition-all duration-500">
                                        <div className={cn(
                                            "absolute inset-0 rounded-[1.5rem] opacity-0 group-hover/card:opacity-10 transition-opacity duration-700 blur-[60px]",
                                            info.color === 'purple' ? 'bg-purple-500' : 'bg-indigo-500'
                                        )} />

                                        <div className="relative h-full flex flex-col items-center justify-center bg-[#050505] border border-white/5 rounded-[1.5rem] overflow-hidden group-hover/card:border-white/20 transition-all duration-500" style={{ padding: '48px 24px' }}>
                                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.02] group-hover/card:opacity-[0.05] transition-opacity duration-700">
                                                <info.icon size={160} />
                                            </div>

                                            <div className={cn(
                                                "w-14 h-14 rounded-full flex items-center justify-center mb-6 transition-all duration-700 group-hover/card:scale-110",
                                                info.color === 'purple' ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20 shadow-[0_0_30px_rgba(109,40,217,0.1)]' : 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 shadow-[0_0_30px_rgba(79,70,229,0.1)]'
                                            )}>
                                                <info.icon size={24} />
                                            </div>

                                            <div className="text-center relative z-10 w-full px-2">
                                                <h3 className="text-[10px] font-bold text-gray-500 tracking-[0.4em] uppercase mb-3">{info.title}</h3>
                                                <p className="text-base md:text-lg font-bold text-white tracking-tighter leading-tight">
                                                    {info.value}
                                                </p>
                                            </div>

                                            <div className={cn(
                                                "absolute bottom-0 left-6 right-6 h-[2px] transition-all duration-700 opacity-0 group-hover/card:opacity-100",
                                                info.color === 'purple' ? 'bg-purple-500' : 'bg-indigo-500'
                                            )} />
                                        </div>
                                    </div>
                                )}
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Form Section */}
            <section className="w-full flex flex-col items-center bg-transparent relative py-24 px-6 md:px-12" id="inquiry">
                <div style={{ width: '100%', maxWidth: '1024px', margin: '0 auto', position: 'relative', zIndex: 10 }}>
                    <div className="flex flex-col gap-12">

                        {/* Left - Why Contact Us */}
                        <motion.div
                            initial={{ opacity: 0, x: -40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="flex flex-col justify-center"
                        >
                            <h2 className="text-5xl md:text-7xl font-black text-white mb-8 leading-none tracking-tighter uppercase">
                                Let&apos;s Map Out Your <span className="gradient-text">Success Story</span>
                            </h2>
                            <p className="text-xl md:text-2xl text-gray-400 mb-12 leading-relaxed">
                                Our consultants are ready to dive deep into your requirements and provide a strategic roadmap tailored for your business.
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
                                <div className="space-y-4">
                                    <div className="w-12 h-12 rounded-2xl bg-purple-500/10 flex items-center justify-center border border-purple-500/20">
                                        <CheckCircle className="w-6 h-6 text-purple-400" />
                                    </div>
                                    <h4 className="text-white font-bold text-xl">Quick Turnaround</h4>
                                    <p className="text-gray-500">Expect a detailed response within 24 business hours.</p>
                                </div>
                                <div className="space-y-4">
                                    <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20">
                                        <Search className="w-6 h-6 text-indigo-400" />
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
                                        <GlowingCard className="h-full" innerClassName="text-center flex flex-col items-center justify-center !bg-black border border-white/5 p-12 md:p-20">
                                            <motion.div
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                transition={{ type: 'spring', duration: 0.5, delay: 0.2 }}
                                                className="w-32 h-32 mx-auto mb-10 rounded-full bg-purple-500/20 flex items-center justify-center border-4 border-purple-500/20 shadow-3xl shadow-purple-500/10"
                                            >
                                                <CheckCircle className="w-16 h-16 text-purple-400" />
                                            </motion.div>
                                            <h3 className="text-5xl font-bold text-white mb-6">Inquiry Sent!</h3>
                                            <p className="text-2xl text-gray-400 mb-12 max-w-sm leading-relaxed">
                                                We&apos;ve received your request. One of our experts will contact you shortly.
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
                                        <GlowingCard className="h-full" innerClassName="!bg-black border border-white/5 !p-10 md:!p-16">
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
                                                        <div className="space-y-16">
                                                            <div>
                                                                <h3 className="text-3xl font-bold text-white mb-2 tracking-tight">
                                                                    Let&apos;s Start with <span className="gradient-text">Your Details</span>
                                                                </h3>
                                                                <p className="text-lg text-gray-400">Tell us who you are</p>
                                                            </div>

                                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 !mt-16">
                                                                <div className="space-y-5">
                                                                    <label className="text-lg font-bold text-gray-300 block px-1 tracking-wider uppercase text-[13px]">Full Name</label>
                                                                    <div className="relative group flex items-center">
                                                                        <User className="absolute left-5 w-5 h-5 text-gray-400 group-focus-within:text-purple-400 transition-colors z-10" />
                                                                        <input
                                                                            required
                                                                            name="name"
                                                                            type="text"
                                                                            value={formState.name}
                                                                            onChange={(e) => setFormState(prev => ({ ...prev, name: e.target.value }))}
                                                                            placeholder="John Doe"
                                                                            className="w-full bg-white/5 border border-white/10 rounded-xl !py-4 !pl-14 !pr-4 text-white placeholder:text-gray-500 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/20 transition-all font-medium text-sm"
                                                                        />
                                                                    </div>
                                                                </div>

                                                                <div className="space-y-5">
                                                                    <label className="text-lg font-bold text-gray-300 block px-1 tracking-wider uppercase text-[13px]">Email Address</label>
                                                                    <div className="relative group flex items-center">
                                                                        <Mail className="absolute left-5 w-5 h-5 text-gray-400 group-focus-within:text-purple-400 transition-colors z-10" />
                                                                        <input
                                                                            required
                                                                            name="email"
                                                                            type="email"
                                                                            value={formState.email}
                                                                            onChange={(e) => setFormState(prev => ({ ...prev, email: e.target.value }))}
                                                                            placeholder="john@company.com"
                                                                            className="w-full bg-white/5 border border-white/10 rounded-xl !py-4 !pl-14 !pr-4 text-white placeholder:text-gray-500 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/20 transition-all font-medium text-sm"
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className="flex justify-end pt-12 md:pt-16">
                                                                <motion.button
                                                                    whileHover={{ scale: 1.05 }}
                                                                    whileTap={{ scale: 0.95 }}
                                                                    type="button"
                                                                    onClick={handleContinue}
                                                                    disabled={!formState.name || !formState.email}
                                                                    className="btn-primary !py-3.5 !px-8 text-sm !rounded-xl font-bold uppercase tracking-widest text-[12px]"
                                                                >
                                                                    Continue
                                                                    <ArrowRight size={14} />
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
                                                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                                                                {serviceOptions.map((service) => (
                                                                    <SelectableCard
                                                                        key={service.id}
                                                                        icon={service.icon}
                                                                        title={service.title}
                                                                        description={service.description}
                                                                        isSelected={selectedServiceIds.includes(service.id)}
                                                                        onClick={() => handleServiceSelect(service.id)}
                                                                        className="p-8 md:p-10"
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
                                                                <IndianRupee className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-purple-400 transition-colors z-10" />
                                                                <select
                                                                    value={selectedBudgetId}
                                                                    onChange={(e) => handleBudgetSelect(e.target.value)}
                                                                    className="w-full bg-white/5 border border-white/10 rounded-xl !py-4 !pl-14 !pr-4 text-white focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/20 transition-all font-medium appearance-none cursor-pointer text-sm"
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
                                                        <div className="space-y-6 !mt-20">
                                                            <label className="text-xl font-bold text-gray-300 block px-1 tracking-wider uppercase text-[14px]">Project Brief</label>
                                                            <div className="relative group">
                                                                <MessageSquare className="absolute left-6 top-7 w-5 h-5 text-gray-400 group-focus-within:text-purple-400 transition-colors z-10" />
                                                                <textarea
                                                                    required
                                                                    name="message"
                                                                    rows={5}
                                                                    value={formState.message}
                                                                    onChange={(e) => setFormState(prev => ({ ...prev, message: e.target.value }))}
                                                                    placeholder="Walk us through your vision, challenges, and timeline..."
                                                                    className="w-full bg-white/5 border border-white/10 rounded-xl !pt-5 !pl-14 !pr-4 !pb-4 text-white placeholder:text-gray-500 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/20 transition-all font-medium resize-none text-sm leading-relaxed"
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
                                                                className="btn-primary !py-3.5 !px-8 text-sm !rounded-xl font-bold uppercase tracking-widest text-[12px] disabled:opacity-50 disabled:cursor-not-allowed"
                                                            >
                                                                {isSubmitting ? (
                                                                    <span className="flex items-center gap-2">
                                                                        <div className="w-3 h-3 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                                                                        Sending...
                                                                    </span>
                                                                ) : (
                                                                    <>
                                                                        Send Message
                                                                        <Send className="w-3.5 h-3.5" />
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
