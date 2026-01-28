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
    Wallet
} from 'lucide-react';
import { PremiumTextReveal } from '@/components/ui/premium-text-reveal';
import { GlowingCard } from '@/components/ui/glowing-card';
import { ShaderBackground } from '@/components/ui/shader-background';
import { FloatingInput } from '@/components/ui/floating-input';
import { SelectableCard } from '@/components/ui/selectable-card';
import { StepIndicator } from '@/components/ui/step-indicator';
import { FloatingPillButton } from '@/components/ui/floating-pill-button';
import { ExpandableTextarea } from '@/components/ui/expandable-textarea';

import NeuralBackground from '@/components/ui/flow-field-background';

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
    const [selectedServiceId, setSelectedServiceId] = useState<string>('');
    const [selectedBudgetId, setSelectedBudgetId] = useState<string>('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

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
        setSelectedServiceId(serviceId);
        const service = serviceOptions.find(s => s.id === serviceId);
        setFormState(prev => ({ ...prev, service: service?.title || '' }));
    };

    const handleBudgetSelect = (budgetId: string) => {
        setSelectedBudgetId(budgetId);
        const budget = budgetOptions.find(b => b.id === budgetId);
        setFormState(prev => ({ ...prev, budget: budget?.value || '' }));
    };

    return (
        <main className="relative z-10">
            {/* Neural Background - Covers main content only */}
            <div className="absolute inset-0 z-0">
                <NeuralBackground
                    color="#00d4ff"
                    trailOpacity={0.12}
                    particleCount={500}
                    speed={0.6}
                />
            </div>


            {/* Hero Section */}
            <section
                className="relative pb-24 overflow-hidden flex items-start"
                style={{ paddingTop: '140px' }}
            >
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
            <section className="section relative" id="inquiry">
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
                                        <GlowingCard className="h-full" innerClassName="p-10 md:p-14">
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
                                                        <div>
                                                            <h3 className="text-2xl font-bold text-white mb-2">
                                                                Let's Start with <span className="text-cyan-400">Your Details</span>
                                                            </h3>
                                                            <p className="text-gray-400">Tell us who you are</p>
                                                        </div>

                                                        <div className="grid md:grid-cols-2 gap-8">
                                                            <FloatingInput
                                                                label="Full Name"
                                                                value={formState.name}
                                                                onChange={(e) => setFormState(prev => ({ ...prev, name: e.target.value }))}
                                                                required
                                                                placeholder="John Doe"
                                                            />
                                                            <FloatingInput
                                                                label="Email Address"
                                                                value={formState.email}
                                                                onChange={(e) => setFormState(prev => ({ ...prev, email: e.target.value }))}
                                                                type="email"
                                                                required
                                                                placeholder="john@company.com"
                                                            />
                                                        </div>

                                                        <div className="flex justify-end">
                                                            <FloatingPillButton
                                                                type="button"
                                                                onClick={handleContinue}
                                                                variant="continue"
                                                                disabled={!formState.name || !formState.email}
                                                            >
                                                                Continue
                                                            </FloatingPillButton>
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
                                                        className="space-y-12"
                                                    >
                                                        <div>
                                                            <h3 className="text-2xl font-bold text-white mb-2">
                                                                Now, <span className="text-cyan-400">Your Project</span>
                                                            </h3>
                                                            <p className="text-gray-400">What can we build for you?</p>
                                                        </div>

                                                        {/* Service Selection */}
                                                        <div className="space-y-4">
                                                            <label className="block text-sm font-semibold text-gray-400 uppercase tracking-wide">
                                                                Service Aspect *
                                                            </label>
                                                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                                                                {serviceOptions.map((service) => (
                                                                    <SelectableCard
                                                                        key={service.id}
                                                                        icon={service.icon}
                                                                        title={service.title}
                                                                        description={service.description}
                                                                        isSelected={selectedServiceId === service.id}
                                                                        onClick={() => handleServiceSelect(service.id)}
                                                                    />
                                                                ))}
                                                            </div>
                                                        </div>

                                                        {/* Budget Selection */}
                                                        <div className="space-y-4">
                                                            <label className="block text-sm font-semibold text-gray-400 uppercase tracking-wide">
                                                                Budget Range
                                                            </label>
                                                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                                                {budgetOptions.map((budget) => (
                                                                    <SelectableCard
                                                                        key={budget.id}
                                                                        icon={budget.icon}
                                                                        title={budget.title}
                                                                        isSelected={selectedBudgetId === budget.id}
                                                                        onClick={() => handleBudgetSelect(budget.id)}
                                                                    />
                                                                ))}
                                                            </div>
                                                        </div>

                                                        {/* Project Brief */}
                                                        <ExpandableTextarea
                                                            label="Project Brief"
                                                            value={formState.message}
                                                            onChange={(e) => setFormState(prev => ({ ...prev, message: e.target.value }))}
                                                            required
                                                            placeholder="Walk us through your vision, challenges, and timeline..."
                                                        />

                                                        {/* Action Buttons */}
                                                        <div className="flex items-center justify-between gap-4">
                                                            <button
                                                                type="button"
                                                                onClick={handleBack}
                                                                className="px-6 py-3 text-gray-400 hover:text-cyan-400 font-semibold transition-colors flex items-center gap-2"
                                                            >
                                                                <ArrowRight className="w-4 h-4 rotate-180" />
                                                                Back
                                                            </button>
                                                            <FloatingPillButton
                                                                type="submit"
                                                                variant="submit"
                                                                isLoading={isSubmitting}
                                                                disabled={!formState.service || !formState.message}
                                                            >
                                                                {isSubmitting ? 'Sending' : 'Send Message'}
                                                            </FloatingPillButton>
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
