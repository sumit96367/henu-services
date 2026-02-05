'use client';

import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { useState, useRef, useMemo } from 'react';
import Link from 'next/link';
import {
    ExternalLink,
    ArrowRight,
    Globe,
    Smartphone,
    Bot,
    Megaphone,
    Scale,
    Coins,
    Filter,
    X,
    Twitter,
    Linkedin,
    Github,
    Instagram,
    ShoppingCart
} from 'lucide-react';
import { PremiumTextReveal } from '@/components/ui/premium-text-reveal';
import { ProjectCard } from '@/components/ui/project-card';
import { AnimatedLetterText } from '@/components/ui/potfolio-text';
import { MouseTrailComponent } from '@/components/ui/mouse-trail';
import Casestudies from '@/components/ui/case-studies';
import GalleryHoverCarousel from '@/components/ui/gallery-hover-carousel';
import { Spotlight } from '@/components/ui/spotlight';

// Project Categories
const categories = [
    { id: 'all', name: 'All Projects', icon: Filter },
    { id: 'web', name: 'Web Development', icon: Globe },
    { id: 'mobile', name: 'Mobile Apps', icon: Smartphone },
    { id: 'ai', name: 'AI & Automation', icon: Bot },
    { id: 'marketing', name: 'Digital Marketing', icon: Megaphone },
    { id: 'legal', name: 'Legal & Compliance', icon: Scale },
    { id: 'funding', name: 'Grants & Funding', icon: Coins },
];

// Projects Data - 11 Software Products
const projects = [
    {
        id: 1,
        title: 'Hospital Management System',
        category: 'all',
        description: 'Comprehensive healthcare management solution with patient records, appointment scheduling, billing, inventory management, and analytics. Streamline your hospital operations with our advanced digital platform.',
        image: '/projects/hospital.jpg',
        tags: ['Healthcare', 'Management', 'Digital'],
        color: 'from-purple-500 to-pink-500',
        stats: { metric: 'HMS', label: 'Solution' }
    },
    {
        id: 2,
        title: 'Accounting Software',
        category: 'all',
        description: 'Complete accounting solution for businesses with GST compliance, invoicing, expense tracking, financial reports, and tax management. Simplify your financial operations with automated workflows.',
        image: '/projects/accounting.jpg',
        tags: ['Finance', 'GST', 'Invoicing'],
        color: 'from-green-500 to-emerald-500',
        stats: { metric: 'Accounting', label: 'Software' }
    },
    {
        id: 3,
        title: 'Hotel Management System',
        category: 'all',
        description: 'All-in-one hotel management platform featuring room booking, guest management, POS integration, housekeeping, and revenue analytics. Enhance guest experiences and operational efficiency.',
        image: '/projects/hotel.jpg',
        tags: ['Hospitality', 'Booking', 'POS'],
        color: 'from-amber-500 to-orange-500',
        stats: { metric: 'Hotel', label: 'System' }
    },
    {
        id: 4,
        title: 'School / College Fees Management System',
        category: 'all',
        description: 'Comprehensive educational institution management with student enrollment, fee collection, attendance tracking, grade management, and parent portal. Digitize your campus operations.',
        image: '/projects/school.jpg',
        tags: ['Education', 'Fees', 'Management'],
        color: 'from-blue-500 to-indigo-500',
        stats: { metric: 'Education', label: 'Platform' }
    },
    {
        id: 5,
        title: 'Restaurant Management System',
        category: 'all',
        description: 'Complete restaurant solution with table management, order processing, kitchen display, inventory tracking, and billing. Optimize your restaurant workflow and customer service.',
        image: '/projects/restaurant.jpg',
        tags: ['Restaurant', 'POS', 'Kitchen'],
        color: 'from-red-500 to-pink-500',
        stats: { metric: 'Restaurant', label: 'Solution' }
    },
    {
        id: 6,
        title: 'Travel Agency Management System',
        category: 'all',
        description: 'End-to-end travel agency platform with booking management, itinerary creation, payment processing, customer management, and vendor coordination. Grow your travel business digitally.',
        image: '/projects/travel.jpg',
        tags: ['Travel', 'Booking', 'CRM'],
        color: 'from-teal-500 to-green-500',
        stats: { metric: 'Travel', label: 'Platform' }
    },
    {
        id: 7,
        title: 'Pharmacy Management System',
        category: 'all',
        description: 'Advanced pharmacy software with inventory management, prescription tracking, billing, expiry alerts, and sales analytics. Ensure compliance and efficient pharmacy operations.',
        image: '/projects/pharmacy.jpg',
        tags: ['Pharmacy', 'Inventory', 'Billing'],
        color: 'from-green-500 to-teal-500',
        stats: { metric: 'Pharmacy', label: 'Software' }
    },
    {
        id: 8,
        title: 'E-commerce Solutions',
        category: 'all',
        description: 'Full-featured e-commerce platform with product catalog, shopping cart, payment gateway integration, order management, and customer analytics. Launch your online store with confidence.',
        image: '/projects/ecommerce.jpg',
        tags: ['E-commerce', 'Online Store', 'Payment'],
        color: 'from-orange-500 to-red-500',
        stats: { metric: 'E-commerce', label: 'Platform' }
    },
    {
        id: 9,
        title: 'Employee Management System',
        category: 'all',
        description: 'Complete HR and employee management solution with attendance, payroll, leave management, performance tracking, and employee portal. Streamline your workforce management.',
        image: '/projects/employee.jpg',
        tags: ['HR', 'Payroll', 'Attendance'],
        color: 'from-indigo-500 to-purple-500',
        stats: { metric: 'HRMS', label: 'Solution' }
    },
    {
        id: 10,
        title: 'Invoicing System',
        category: 'all',
        description: 'Professional invoicing and billing software with customizable templates, automatic payment reminders, expense tracking, and financial reports. Get paid faster and stay organized.',
        image: '/projects/invoicing.jpg',
        tags: ['Invoicing', 'Billing', 'Finance'],
        color: 'from-yellow-500 to-amber-500',
        stats: { metric: 'Invoicing', label: 'System' }
    },
    {
        id: 11,
        title: 'Inventory Management System',
        category: 'all',
        description: 'Robust inventory management solution with stock tracking, purchase orders, warehouse management, supplier management, and real-time reports. Optimize your inventory control.',
        image: '/projects/inventory.jpg',
        tags: ['Inventory', 'Warehouse', 'Stock'],
        color: 'from-pink-500 to-rose-500',
        stats: { metric: 'Inventory', label: 'System' }
    },
];



// The ProjectCard is now imported from @/components/ui/project-card



export default function PortfolioPage() {
    const [activeCategory, setActiveCategory] = useState('all');
    const [selectedProduct, setSelectedProduct] = useState<typeof projects[0] | null>(null);
    const [showPaymentDialog, setShowPaymentDialog] = useState(false);
    const [paymentForm, setPaymentForm] = useState({
        productName: '',
        name: '',
        email: '',
        contact: '',
        paymentMethod: '',
        requirements: ''
    });

    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end start']
    });

    const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    const filteredProjects = useMemo(() => {
        if (activeCategory === 'all') return projects;
        return projects.filter(project => project.category === activeCategory);
    }, [activeCategory]);

    const openModal = (product: typeof projects[0]) => {
        setSelectedProduct(product);
        setPaymentForm(prev => ({ ...prev, productName: product.title }));
        document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
        setSelectedProduct(null);
        setShowPaymentDialog(false);
        document.body.style.overflow = 'auto';
    };

    const handleGetItNow = () => {
        window.location.href = 'https://henuos.netlify.app/';
    };

    const handleBuyNow = () => {
        setShowPaymentDialog(true);
    };

    const handlePaymentSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert(`Payment request submitted for ${paymentForm.productName}!\n\nCustomer Details:\nName: ${paymentForm.name}\nEmail: ${paymentForm.email}\nContact: ${paymentForm.contact}\nPayment Method: ${paymentForm.paymentMethod}\n\nAdditional Requirements:\n${paymentForm.requirements || 'None'}`);
        setShowPaymentDialog(false);
        closeModal();
    };

    return (
        <main className="relative z-10">
            {/* Mouse Trail Effect */}
            <MouseTrailComponent />


            {/* Hero Section */}
            <section
                ref={containerRef}
                className="relative z-10 min-h-screen flex flex-col items-center justify-center overflow-hidden"
                style={{ background: 'transparent' }}
            >
                {/* Spotlight Effect */}
                <Spotlight
                    className="-top-40 left-0 md:left-60 md:-top-20"
                    fill="white"
                />

                {/* Animated Grid Background */}
                <div className="absolute inset-0">
                    <div className="horizon-grid" />
                    <div className="grid-background" />

                    {/* Ambient Glows from Landing Page */}
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

                <div className="container relative z-10 flex flex-col items-center justify-center">
                    <motion.div
                        style={{ y, opacity }}
                        className="max-w-5xl w-full flex flex-col items-center text-center"
                    >
                        <div className="flex flex-col items-center mb-6">
                            <PremiumTextReveal text="Our Digital" className="text-gray-400" delay={0.2} />
                            <AnimatedLetterText
                                text="Portfolio"
                                letterToReplace="o"
                                className="text-7xl md:text-9xl text-white mt-[-20px]"
                            />
                        </div>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8 }}
                            className="text-xl md:text-2xl text-gray-400 max-w-2xl mb-16 leading-relaxed text-center"
                        >
                            A curated selection of our most impactful work across technology, marketing, and strategy.
                        </motion.p>

                        {/* Category Filters */}
                        <div className="flex flex-wrap justify-center gap-4">
                            {categories.map((category) => (
                                <button
                                    key={category.id}
                                    onClick={() => setActiveCategory(category.id)}
                                    className={`px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-500 flex items-center justify-center gap-2 border whitespace-nowrap ${activeCategory === category.id
                                        ? 'bg-white/10 text-white border-cyan-500/50 shadow-[0_0_30px_rgba(0,212,255,0.1)] scale-105'
                                        : 'bg-white/[0.02] text-gray-500 hover:text-gray-300 border-white/5 hover:border-white/20 hover:bg-white/5'
                                        }`}
                                >
                                    <category.icon size={14} className={activeCategory === category.id ? 'text-cyan-400' : 'text-gray-600'} />
                                    {category.name}
                                </button>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Projects Grid */}
            <section className="section bg-transparent pt-0 relative z-20" style={{ paddingTop: '120px', paddingBottom: '120px' }}>
                {/* Single Column Container */}
                <div className="container max-w-3xl mx-auto">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeCategory}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.4 }}
                            className="space-y-6"
                        >
                            {filteredProjects.map((project, index) => (
                                <motion.div
                                    key={project.id}
                                    // Premium scroll animations with blur + scale
                                    initial={{
                                        opacity: 0,
                                        x: index % 2 === 0 ? -60 : 60,  // Alternating left/right
                                        scale: 0.8,  // Start smaller
                                        filter: "blur(10px)"  // Start blurred
                                    }}
                                    whileInView={{
                                        opacity: 1,
                                        x: 0,
                                        scale: 1,  // Scale to normal
                                        filter: "blur(0px)"  // Clear blur
                                    }}
                                    viewport={{
                                        once: true,
                                        margin: "-50px"
                                    }}
                                    transition={{
                                        duration: 0.7,
                                        ease: [0.22, 0.61, 0.36, 1],
                                        delay: index * 0.1
                                    }}
                                    onClick={() => openModal(project)}
                                    className="relative group cursor-pointer"
                                >
                                    {/* Card Box - PRESERVED */}
                                    <div
                                        className="relative bg-white/[0.03] backdrop-blur-sm border border-white/10 rounded-2xl transition-all duration-300 hover:bg-white/[0.05] hover:border-purple-500/20"
                                        style={{ padding: '1cm' }}
                                    >
                                        {/* Software Title */}
                                        <h3 className="text-3xl font-black text-white mb-3 group-hover:text-purple-400 transition-colors tracking-tight leading-tight font-['Space_Grotesk'] uppercase">
                                            {project.title}
                                        </h3>

                                        {/* Accent Underline - PRESERVED */}
                                        <div className="w-12 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" />
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </AnimatePresence>

                    {filteredProjects.length === 0 && (
                        <div className="text-center py-40">
                            <p className="text-2xl text-gray-500 font-medium">No projects found in this category.</p>
                        </div>
                    )}
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-20 relative z-20" style={{ background: 'linear-gradient(135deg, rgba(0, 212, 255, 0.05) 0%, rgba(255, 149, 0, 0.05) 100%)', paddingTop: '120px', paddingBottom: '120px' }}>
                <div className="container">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                        >
                            <div className="text-5xl font-bold gradient-text mb-2">200+</div>
                            <div className="text-gray-400">Projects Completed</div>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.1 }}
                        >
                            <div className="text-5xl font-bold gradient-text mb-2">150+</div>
                            <div className="text-gray-400">Happy Clients</div>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2 }}
                        >
                            <div className="text-5xl font-bold gradient-text mb-2">98%</div>
                            <div className="text-gray-400">Success Rate</div>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.3 }}
                        >
                            <div className="text-5xl font-bold gradient-text mb-2">5.0</div>
                            <div className="text-gray-400">Client Rating</div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Featured Projects Carousel */}
            <GalleryHoverCarousel heading="Featured Innovation" />

            {/* Case Studies Section */}
            <Casestudies />

            {/* CTA Section */}
            <section className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden px-6" style={{ background: '#050505' }}>
                {/* Background Glow */}
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        background: 'radial-gradient(circle at center, rgba(0, 212, 255, 0.15) 0%, transparent 70%)',
                        filter: 'blur(100px)'
                    }}
                />

                <div className="relative z-10 w-full max-w-5xl flex flex-col items-center text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-6xl md:text-8xl font-black text-white mb-10 tracking-tighter leading-[0.9]">
                            Ready to <br />
                            <span className="gradient-text">Start Your Project</span>?
                        </h2>

                        <p className="text-xl md:text-3xl text-gray-400 mb-16 max-w-3xl mx-auto leading-relaxed font-medium">
                            Let&apos;s architect the next generation of your digital presence together.
                        </p>

                        <div className="flex flex-col items-center justify-center">
                            <Link href="/contact" className="btn-primary !h-20 !px-12 text-xl group flex items-center gap-4 hover:scale-105 transition-transform duration-500">
                                Get a Free Quote
                                <ArrowRight size={28} className="group-hover:translate-x-2 transition-transform" />
                            </Link>
                        </div>
                    </motion.div>
                </div>

                {/* Decorative Elements for centering feel */}
                <div className="absolute top-1/2 left-10 -translate-y-1/2 w-px h-64 bg-gradient-to-b from-transparent via-cyan-500/20 to-transparent hidden xl:block" />
                <div className="absolute top-1/2 right-10 -translate-y-1/2 w-px h-64 bg-gradient-to-b from-transparent via-cyan-500/20 to-transparent hidden xl:block" />
            </section>

            {/* Product Details Modal */}
            <AnimatePresence>
                {selectedProduct && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
                        onClick={closeModal}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            onClick={(e) => e.stopPropagation()}
                            className="relative flex items-center justify-center gap-6 w-full max-w-6xl px-4"
                        >
                            {/* Close Button */}
                            <button
                                onClick={closeModal}
                                className="absolute -top-14 right-4 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                            >
                                <X className="w-6 h-6 text-white" />
                            </button>

                            {/* Left: Product Name Card */}
                            <div
                                className="bg-gradient-to-br from-[#B88CFF] to-[#9B6FE8] shadow-2xl"
                                style={{
                                    minWidth: '280px',
                                    maxWidth: '360px',
                                    height: 'auto',
                                    padding: '28px',
                                    borderRadius: '40px'
                                }}
                            >
                                <h2
                                    className="text-white font-['Space_Grotesk']"
                                    style={{
                                        fontSize: 'clamp(26px, 2.6vw, 38px)',
                                        fontWeight: '700',
                                        textAlign: 'center',
                                        wordBreak: 'keep-all',
                                        overflowWrap: 'normal',
                                        whiteSpace: 'normal',
                                        hyphens: 'none',
                                        lineHeight: '1.25',
                                        width: '100%'
                                    }}
                                >
                                    {selectedProduct.title}
                                </h2>
                            </div>

                            {/* Center: Description Card */}
                            <div
                                className="relative bg-gradient-to-br from-[#F2D5E6] to-[#E8C4D8] shadow-2xl flex flex-col"
                                style={{
                                    width: '450px',
                                    minHeight: '280px',
                                    padding: '32px',
                                    borderRadius: '32px'
                                }}
                            >
                                {/* Window Controls */}
                                <div className="absolute top-5 right-5 flex gap-2">
                                    <div className="w-4 h-4 rounded-full bg-[#D98BBE]"></div>
                                    <div className="w-4 h-4 rounded-full bg-[#E89DC6]"></div>
                                    <div className="w-4 h-4 rounded-full bg-[#F2A6C9]"></div>
                                </div>

                                {/* Description Text */}
                                <div className="flex items-center justify-center flex-1">
                                    <p
                                        className="text-[#4A2A3E] font-semibold text-center"
                                        style={{
                                            fontSize: '18px',
                                            lineHeight: '1.6',
                                            wordBreak: 'normal',
                                            overflowWrap: 'break-word'
                                        }}
                                    >
                                        {selectedProduct.description}
                                    </p>
                                </div>
                            </div>

                            {/* Right: Action Buttons */}
                            <div className="flex flex-col items-center justify-center gap-4" style={{ minWidth: '200px' }}>
                                <button
                                    onClick={handleGetItNow}
                                    className="w-full px-8 py-4 bg-gradient-to-r from-[#F6F1EB] to-[#EEE5D9] hover:from-[#FFFBF5] hover:to-[#F6F1EB] text-[#4A2A3E] font-bold rounded-full transition-all duration-300 flex items-center justify-center gap-2 shadow-xl hover:shadow-2xl hover:scale-105 border-2 border-[#D98BBE]"
                                    style={{ fontSize: '16px' }}
                                >
                                    <span className="text-xl">⭐</span>
                                    Get-it-Now
                                </button>

                                <button
                                    onClick={handleBuyNow}
                                    className="w-full px-8 py-4 bg-gradient-to-r from-[#D98BBE] to-[#C76FA0] hover:from-[#E89DC6] hover:to-[#D77FAA] text-white font-bold rounded-full transition-all duration-300 flex items-center justify-center gap-2 shadow-xl hover:shadow-2xl hover:scale-105"
                                    style={{ fontSize: '16px' }}
                                >
                                    <ShoppingCart className="w-5 h-5" />
                                    BUY NOW
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Payment Requirements Dialog */}
            <AnimatePresence>
                {showPaymentDialog && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
                        onClick={() => setShowPaymentDialog(false)}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            onClick={(e) => e.stopPropagation()}
                            className="relative w-full max-w-lg bg-gradient-to-br from-gray-900/95 to-black/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/10 max-h-[90vh] overflow-y-auto"
                            style={{ padding: '1cm' }}
                        >
                            <button
                                onClick={() => setShowPaymentDialog(false)}
                                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                            >
                                <X className="w-4 h-4 text-white" />
                            </button>

                            <h3 className="text-2xl font-bold text-white mb-6">Payment Requirements</h3>

                            <form onSubmit={handlePaymentSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-purple-300 mb-2">Product</label>
                                    <input
                                        type="text"
                                        value={paymentForm.productName}
                                        readOnly
                                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-500/50"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-purple-300 mb-2">Full Name</label>
                                    <input
                                        type="text"
                                        required
                                        value={paymentForm.name}
                                        onChange={(e) => setPaymentForm({ ...paymentForm, name: e.target.value })}
                                        placeholder="John Doe"
                                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-purple-300 mb-2">Email Address</label>
                                    <input
                                        type="email"
                                        required
                                        value={paymentForm.email}
                                        onChange={(e) => setPaymentForm({ ...paymentForm, email: e.target.value })}
                                        placeholder="your@email.com"
                                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-purple-300 mb-2">Contact Number</label>
                                    <input
                                        type="tel"
                                        required
                                        value={paymentForm.contact}
                                        onChange={(e) => setPaymentForm({ ...paymentForm, contact: e.target.value })}
                                        placeholder="+1 234 567 8900"
                                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-purple-300 mb-2">Payment Method</label>
                                    <select
                                        required
                                        value={paymentForm.paymentMethod}
                                        onChange={(e) => setPaymentForm({ ...paymentForm, paymentMethod: e.target.value })}
                                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-500/50"
                                    >
                                        <option value="" className="bg-gray-900">Select payment method</option>
                                        <option value="credit-card" className="bg-gray-900">Credit Card</option>
                                        <option value="debit-card" className="bg-gray-900">Debit Card</option>
                                        <option value="upi" className="bg-gray-900">UPI</option>
                                        <option value="net-banking" className="bg-gray-900">Net Banking</option>
                                        <option value="wallet" className="bg-gray-900">Digital Wallet</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-purple-300 mb-2">Additional Requirements</label>
                                    <textarea
                                        value={paymentForm.requirements}
                                        onChange={(e) => setPaymentForm({ ...paymentForm, requirements: e.target.value })}
                                        placeholder="Any specific requirements or notes..."
                                        rows={3}
                                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 resize-none"
                                    />
                                </div>

                                <div className="flex gap-3 pt-4">
                                    <button
                                        type="button"
                                        onClick={() => setShowPaymentDialog(false)}
                                        className="flex-1 px-6 py-3 bg-white/5 hover:bg-white/10 text-white rounded-lg transition-colors border border-white/10"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 text-white font-bold rounded-lg transition-all duration-300 shadow-lg hover:shadow-purple-500/50"
                                    >
                                        Proceed
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

        </main>
    );
}
