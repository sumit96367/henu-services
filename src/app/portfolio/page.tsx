'use client';

import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import {
    ExternalLink,
    ArrowRight,
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

import Casestudies from '@/components/ui/case-studies';
import GalleryHoverCarousel from '@/components/ui/gallery-hover-carousel';
import { Spotlight } from '@/components/ui/spotlight';
import { GradientTracing } from '@/components/ui/gradient-tracing';
import { GravitationalMeshBackground } from '@/components/ui/gravitational-mesh';
import { CategoryScroller } from '@/components/ui/category-scroller';



// Projects Data - 11 Software Products
const projects = [
    {
        id: 1,
        title: 'Hospital Management System',
        category: 'Healthcare Retail',
        description: 'Comprehensive healthcare management solution with patient records, appointment scheduling, billing, inventory management, and analytics. Streamline your hospital operations with our advanced digital platform.',
        image: '/projects/hospital.jpg',
        tags: ['Healthcare', 'Management', 'Digital'],
        color: 'from-purple-600 to-indigo-600',
        formLink: '',
        buyLink: 'https://pages.razorpay.com/henuos-hospital-management',
        stats: { metric: 'HMS', label: 'Solution' }
    },
    {
        id: 2,
        title: 'Accounting Software',
        category: 'Business & Finance',
        description: 'Complete accounting solution for businesses with GST compliance, invoicing, expense tracking, financial reports, and tax management. Simplify your financial operations with automated workflows.',
        image: '/projects/accounting.jpg',
        tags: ['Finance', 'GST', 'Invoicing'],
        color: 'from-indigo-600 to-violet-600',
        formLink: '',
        buyLink: '',
        stats: { metric: 'Accounting', label: 'Software' }
    },
    {
        id: 3,
        title: 'Hotel Management System',
        category: 'Hospitality & Services',
        description: 'All-in-one hotel management platform featuring room booking, guest management, POS integration, housekeeping, and revenue analytics. Enhance guest experiences and operational efficiency.',
        image: '/projects/hotel.jpg',
        tags: ['Hospitality', 'Booking', 'POS'],
        color: 'from-violet-600 to-purple-600',
        formLink: '',
        buyLink: '',
        stats: { metric: 'Hotel', label: 'System' }
    },
    {
        id: 4,
        title: 'School / College Fees Management System',
        category: 'Enterprise & Institutional',
        description: 'Comprehensive educational institution management with student enrollment, fee collection, attendance tracking, grade management, and parent portal. Digitize your campus operations.',
        image: '/projects/school.jpg',
        tags: ['Education', 'Fees', 'Management'],
        color: 'from-purple-600 to-pink-600',
        formLink: '',
        buyLink: '',
        stats: { metric: 'Education', label: 'Platform' }
    },
    {
        id: 5,
        title: 'Restaurant Management System',
        category: 'Hospitality & Services',
        description: 'Complete restaurant solution with table management, order processing, kitchen display, inventory tracking, and billing. Optimize your restaurant workflow and customer service.',
        image: '/projects/restaurant.jpg',
        tags: ['Restaurant', 'POS', 'Kitchen'],
        color: 'from-pink-600 to-indigo-600',
        formLink: '',
        buyLink: '',
        stats: { metric: 'Restaurant', label: 'Solution' }
    },
    {
        id: 6,
        title: 'Travel Agency Management System',
        category: 'Hospitality & Services',
        description: 'End-to-end travel agency platform with booking management, itinerary creation, payment processing, customer management, and vendor coordination. Grow your travel business digitally.',
        image: '/projects/travel.jpg',
        tags: ['Travel', 'Booking', 'CRM'],
        color: 'from-indigo-600 to-purple-600',
        formLink: '',
        buyLink: '',
        stats: { metric: 'Travel', label: 'Platform' }
    },
    {
        id: 7,
        title: 'Pharmacy Management System',
        category: 'Healthcare Retail',
        description: 'Advanced pharmacy software with inventory management, prescription tracking, billing, expiry alerts, and sales analytics. Ensure compliance and efficient pharmacy operations.',
        image: '/projects/pharmacy.jpg',
        tags: ['Pharmacy', 'Inventory', 'Billing'],
        color: 'from-purple-600 to-violet-600',
        formLink: '',
        buyLink: '',
        stats: { metric: 'Pharmacy', label: 'Software' }
    },
    {
        id: 8,
        title: 'E-commerce Solutions',
        category: 'Digital Commerce',
        description: 'Full-featured e-commerce platform with product catalog, shopping cart, payment gateway integration, order management, and customer analytics. Launch your online store with confidence.',
        image: '/projects/ecommerce.jpg',
        tags: ['E-commerce', 'Online Store', 'Payment'],
        color: 'from-violet-600 to-pink-600',
        formLink: '',
        buyLink: '',
        stats: { metric: 'E-commerce', label: 'Platform' }
    },
    {
        id: 9,
        title: 'Employee Management System',
        category: 'Enterprise & Institutional',
        description: 'Complete HR and employee management solution with attendance, payroll, leave management, performance tracking, and employee portal. Streamline your workforce management.',
        image: '/projects/employee.jpg',
        tags: ['HR', 'Payroll', 'Attendance'],
        color: 'from-pink-600 to-purple-600',
        formLink: '',
        buyLink: '',
        stats: { metric: 'HRMS', label: 'Solution' }
    },
    {
        id: 10,
        title: 'Invoicing System',
        category: 'Business & Finance',
        description: 'Professional invoicing and billing software with customizable templates, automatic payment reminders, expense tracking, and financial reports. Get paid faster and stay organized.',
        image: '/projects/invoicing.jpg',
        tags: ['Invoicing', 'Billing', 'Finance'],
        color: 'from-purple-600 to-indigo-600',
        formLink: '',
        buyLink: '',
        stats: { metric: 'Invoicing', label: 'System' }
    },
    {
        id: 11,
        title: 'Inventory Management System',
        category: 'Business & Finance',
        description: 'Robust inventory management solution with stock tracking, purchase orders, warehouse management, supplier management, and real-time reports. Optimize your inventory control.',
        image: '/projects/inventory.jpg',
        tags: ['Inventory', 'Warehouse', 'Stock'],
        color: 'from-indigo-600 to-pink-600',
        formLink: '',
        buyLink: '',
        stats: { metric: 'Inventory', label: 'System' }
    },
];




// The ProjectCard is now imported from @/components/ui/project-card



export default function PortfolioPage() {
    const [selectedProduct, setSelectedProduct] = useState<typeof projects[0] | null>(null);
    // State for merged projects (hardcoded + custom from API)
    const [allProjects, setAllProjects] = useState(projects);
    // Dynamic categories extracted from all projects
    const [categories, setCategories] = useState<string[]>([]);

    // Category filter state
    const [selectedCategory, setSelectedCategory] = useState<string>('All');

    // Define filter categories
    const filterCategories = [
        'All',
        'Healthcare & Services',
        'Management Services',
        'Enterprise & Institutional',
        'Digital Commerce & Retail',
        'Business & Finance',
        'Others'
    ];

    // Map project categories to filter categories
    const getCategoryGroup = (projectCategory: string): string => {
        const categoryMap: Record<string, string> = {
            'Healthcare Retail': 'Healthcare & Services',
            'Hospitality & Services': 'Management Services',
            'Enterprise & Institutional': 'Enterprise & Institutional',
            'Digital Commerce': 'Digital Commerce & Retail',
            'Business & Finance': 'Business & Finance',
            'Custom': 'Others',
        };
        return categoryMap[projectCategory] || 'Others';
    };

    // Filter projects based on selected category
    const filteredProjects = selectedCategory === 'All'
        ? allProjects
        : allProjects.filter(project => getCategoryGroup(project.category) === selectedCategory);

    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end start']
    });

    // Fetch custom software on component mount
    useEffect(() => {
        fetch('/api/admin/software')
            .then(res => res.json())
            .then(data => {
                const customSoftware = data.software || [];
                // Merge hardcoded projects with custom software
                const merged = [...projects, ...customSoftware];
                setAllProjects(merged);

                // Extract unique categories from all projects
                const uniqueCategories = Array.from(
                    new Set(merged.map(project => project.category).filter(cat => cat && cat !== 'all'))
                );
                setCategories(uniqueCategories);
            })
            .catch(error => {
                console.error('Error fetching custom software:', error);
                // Keep hardcoded projects on error
                setAllProjects(projects);
                // Extract categories from hardcoded projects only
                const uniqueCategories = Array.from(
                    new Set(projects.map(project => project.category).filter(cat => cat && cat !== 'all'))
                );
                setCategories(uniqueCategories);
            });
    }, []);

    const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    // Handle body overflow when modal is open
    useEffect(() => {
        if (selectedProduct) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [selectedProduct]);

    const openModal = (product: typeof projects[0]) => {
        setSelectedProduct(product);
    };

    const closeModal = () => {
        setSelectedProduct(null);
    };

    const handleGetItNow = () => {
        if (selectedProduct?.formLink) {
            // Open the Google Form link in a new tab
            window.open(selectedProduct.formLink, '_blank');
        } else {
            // Fallback to default URL if no form link is set
            window.location.href = 'https://henuos.netlify.app/';
        }
    };

    const handleBuyNow = () => {
        if (selectedProduct?.buyLink) {
            window.open(selectedProduct.buyLink, '_blank');
        } else {
            // Fallback to default platform if no specific buy link
            window.location.href = 'https://henuos.netlify.app/';
        }
    };

    return (
        <main className="relative z-10">

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
                </div >

                <div className="container relative z-10 flex flex-col items-center justify-center">
                    <motion.div
                        style={{ y, opacity }}
                        className="max-w-5xl w-full flex flex-col items-center text-center"
                    >
                        <div className="flex flex-col items-center mb-[6px]">
                            <PremiumTextReveal text="The Henu" className="text-gray-300 text-xl md:text-3xl font-semibold" delay={0.2} />
                            <AnimatedLetterText
                                text="Ecosystem"
                                letterToReplace="o"
                                className="text-5xl sm:text-7xl md:text-9xl text-white mt-1 sm:mt-[-20px]"
                            />
                        </div>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8 }}
                            className="text-lg md:text-2xl text-gray-400 max-w-2xl mb-8 md:mb-12 leading-relaxed text-center"
                            style={{ paddingTop: '15px', paddingBottom: '20px' }}
                        >
                            Explore our complete suite of products, systems, and solutions designed to transform your business.
                        </motion.p>

                        {/* Categories Scroller - Inside Hero Section */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.9, duration: 0.8 }}
                            className="w-full max-w-4xl mb-16"
                        >
                            <div className="flex items-center gap-4 bg-white/5 border border-purple-500/20 rounded-xl px-6 py-4">
                                {/* Label for desktop */}
                                <div className="hidden md:block text-purple-400 font-bold text-sm uppercase tracking-[0.15em] whitespace-nowrap">
                                    Categories
                                </div>

                                {/* Separator for desktop */}
                                <div className="hidden md:block h-5 w-px bg-purple-500/30" />

                                {/* Category Scroller */}
                                <div className="flex-1 overflow-hidden">
                                    <CategoryScroller categories={categories} />
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </section >

            {/* Projects Grid with Category Sidebar */}
            <section
                className="bg-transparent relative z-20 px-4 md:px-8"
                style={{ paddingTop: '150px', paddingBottom: '150px' }}
            >
                <div style={{ width: '100%', maxWidth: '1280px', margin: '0 auto' }}>

                    {/* Mobile Category Filter - Horizontal Scroll */}
                    <div className="lg:hidden mb-8 -mx-4 px-4">
                        <div className="flex gap-4 overflow-x-auto pb-6 snap-x snap-mandatory scrollbar-hide">
                            {filterCategories.map((category) => (
                                <button
                                    key={category}
                                    onClick={() => setSelectedCategory(category)}
                                    style={{ padding: '12px 24px' }}
                                    className={`
                                        rounded-xl text-base font-bold whitespace-nowrap snap-start
                                        transition-all duration-300 border-2
                                        ${selectedCategory === category
                                            ? 'text-purple-400 border-purple-400 bg-white/5 shadow-[0_0_15px_rgba(168,85,247,0.2)]'
                                            : 'text-gray-400 border-white/5 bg-white/2 hover:text-white hover:border-white/10'
                                        }
                                    `}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Desktop Layout: Sidebar + Grid */}
                    <div className="flex gap-8 items-start">

                        {/* Sticky Category Sidebar - Desktop Only */}
                        <aside className="hidden lg:block w-72 shrink-0">
                            <div className="sticky top-24">
                                <h3 className="text-white font-black text-2xl mb-8 px-2 tracking-tight">Category</h3>
                                <nav className="space-y-3">
                                    {filterCategories.map((category) => (
                                        <button
                                            key={category}
                                            onClick={() => setSelectedCategory(category)}
                                            className={`
                                                w-full text-left px-6 py-4 rounded-xl text-lg font-medium
                                                transition-all duration-300 border-l-4
                                                ${selectedCategory === category
                                                    ? 'border-purple-400 text-purple-400 pl-8 bg-white/[0.05] shadow-[0_0_20px_rgba(168,85,247,0.15)]'
                                                    : 'border-transparent text-gray-400 hover:text-white hover:bg-white/5'
                                                }
                                            `}
                                        >
                                            {category}
                                        </button>
                                    ))}
                                </nav>
                            </div>
                        </aside>

                        {/* Projects Grid */}
                        <div className="flex-1">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={selectedCategory}
                                    initial={{ opacity: 0, y: 12 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -12 }}
                                    transition={{ duration: 0.3, ease: 'easeOut' }}
                                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6"
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
                                                className="relative bg-[#0A0A0A] border border-white/10 rounded-2xl transition-all duration-300 hover:bg-white/[0.05] hover:border-purple-500/20 overflow-hidden h-full flex flex-col items-center justify-center"
                                                style={{ padding: '50px' }}
                                            >
                                                {/* Gradient Tracing Animation */}
                                                <motion.div
                                                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full px-8"
                                                    initial={{ opacity: 0 }}
                                                    animate={{
                                                        opacity: [0, 1, 1, 0]
                                                    }}
                                                    transition={{
                                                        delay: index * 2,
                                                        duration: 2,
                                                        repeat: Infinity,
                                                        repeatDelay: (filteredProjects.length - 1) * 2,
                                                        times: [0, 0.1, 0.9, 1]
                                                    }}
                                                >
                                                    <GradientTracing
                                                        width={1500}
                                                        height={80}
                                                        path="M0,40 Q375,10 750,40 T1500,40"
                                                        gradientColors={["#A855F7", "#EC4899", "#A855F7"]}
                                                        animationDuration={2}
                                                        strokeWidth={4}
                                                    />
                                                </motion.div>

                                                {/* Software Title - CENTER ALIGNED */}
                                                <h3 className="text-3xl font-black text-white mb-3 group-hover:text-purple-400 transition-colors tracking-tight leading-tight uppercase text-center">
                                                    {project.title}
                                                </h3>

                                                {/* Accent Underline - PRESERVED */}
                                                <div className="w-12 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mx-auto" />
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
                    </div>
                </div>
            </section >

            {/* Stats Section */}
            <section
                className="relative z-20 flex flex-col items-center px-4 md:px-8 bg-gradient-to-b from-transparent via-purple-500/5 to-transparent"
                style={{ paddingTop: '150px', paddingBottom: '150px' }}
            >
                <div style={{ width: '100%', maxWidth: '1280px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center w-full">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                        >
                            <div className="text-3xl md:text-5xl font-bold gradient-text mb-2">200+</div>
                            <div className="text-xs md:text-gray-400">Projects Completed</div>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.1 }}
                        >
                            <div className="text-3xl md:text-5xl font-bold gradient-text mb-2">150+</div>
                            <div className="text-xs md:text-gray-400">Happy Clients</div>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2 }}
                        >
                            <div className="text-3xl md:text-5xl font-bold gradient-text mb-2">98%</div>
                            <div className="text-xs md:text-gray-400">Success Rate</div>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.3 }}
                        >
                            <div className="text-3xl md:text-5xl font-bold gradient-text mb-2">5.0</div>
                            <div className="text-xs md:text-gray-400">Client Rating</div>
                        </motion.div>
                    </div>

                </div>
            </section >

            {/* Featured Projects Carousel Section */}
            <section
                className="relative z-20 flex flex-col items-center px-4 md:px-8"
                style={{ paddingTop: '150px', paddingBottom: '150px' }}
            >
                <div className="w-full max-w-[1280px]">
                    <GalleryHoverCarousel heading="Featured Innovation" />
                </div>
            </section >

            {/* Case Studies Section */}
            <section
                className="relative z-20 flex flex-col items-center px-4 md:px-8"
                style={{ paddingTop: '150px', paddingBottom: '150px' }}
            >
                <div className="w-full max-w-[1280px]">
                    <Casestudies />
                </div>
            </section >

            {/* CTA Section */}
            <section
                className="w-full flex flex-col items-center bg-transparent relative overflow-hidden px-6 md:px-12"
                style={{ paddingTop: '150px', paddingBottom: '150px' }}
            >
                {/* Background Glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />

                <div style={{ width: '100%', maxWidth: '1280px', margin: '0 auto', position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="max-w-3xl mx-auto"
                    >
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                            Ready to <span className="gradient-text">Start Your Project</span>?
                        </h2>
                        <p className="text-xl text-gray-400 mb-10">
                            Let&apos;s architect the next generation of your digital presence together.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <Link href="/contact" className="btn-primary group">
                                Start a Conversation
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <Link href="https://henuos.netlify.app/" target="_blank" className="btn-secondary group">
                                Explore Henu OS
                                <ExternalLink className="w-4 h-4" />
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Product Details Modal - HERO STYLE */}
            <AnimatePresence>
                {
                    selectedProduct && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl"
                            onClick={closeModal}
                        >
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.3, ease: [0.22, 0.61, 0.36, 1] }}
                                onClick={(e) => e.stopPropagation()}
                                className="relative w-full max-w-[95vw] md:max-w-[1100px] bg-gradient-to-br from-gray-900/95 via-black/95 to-gray-900/95 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/10 overflow-hidden p-6 md:p-12"
                                style={{ minHeight: '70vh' }}
                            >
                                {/* Gravitational Mesh Background */}
                                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                                    <GravitationalMeshBackground />
                                </div>

                                {/* Close Button */}
                                <button
                                    onClick={closeModal}
                                    className="absolute top-6 right-6 z-20 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 hover:rotate-90"
                                >
                                    <X className="w-5 h-5 text-white" />
                                </button>

                                {/* Content Container */}
                                <div className="relative z-10 flex flex-col items-center justify-center px-12 py-16 h-full min-h-[70vh]">

                                    {/* 1. Hero Title Section */}
                                    <div className="text-center mb-8 max-w-[90%] mx-auto">
                                        <motion.h1
                                            initial={{ opacity: 0, y: -20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.1 }}
                                            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white mb-4 tracking-tight leading-tight px-4"
                                            style={{
                                                wordBreak: 'normal',
                                                overflowWrap: 'break-word',
                                                hyphens: 'manual',
                                                textShadow: '0 0 40px rgba(168, 85, 247, 0.3)'
                                            }}
                                        >
                                            {selectedProduct.title}
                                        </motion.h1>

                                        {/* Royal Lavender Accent Underline */}
                                        <motion.div
                                            initial={{ scaleX: 0 }}
                                            animate={{ scaleX: 1 }}
                                            transition={{ delay: 0.2, duration: 0.5 }}
                                            className="w-32 h-1.5 mx-auto bg-gradient-to-r from-purple-500 via-purple-400 to-purple-500 rounded-full"
                                            style={{
                                                boxShadow: '0 0 20px rgba(168, 85, 247, 0.6)'
                                            }}
                                        />
                                    </div>

                                    {/* 2. Description Section */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.3 }}
                                        className="max-w-[650px] mx-auto mb-12"
                                    >
                                        <p className="text-gray-300 text-lg md:text-xl text-center leading-relaxed font-medium">
                                            {selectedProduct.description}
                                        </p>
                                    </motion.div>

                                    {/* 3. CTA Buttons Section */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.4 }}
                                        className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6 w-full mt-6 md:mt-8"
                                    >
                                        {/* Primary: View Details */}
                                        <button
                                            onClick={handleGetItNow}
                                            className="group relative bg-gradient-to-r from-[#6D28D9] via-[#4F46E5] to-[#6D28D9] bg-[length:200%_auto] hover:bg-right text-white font-black text-base md:text-lg rounded-full transition-all duration-500 shadow-[0_0_30px_rgba(109,40,217,0.4)] hover:shadow-[0_0_60px_rgba(109,40,217,0.7)] flex items-center justify-center flex-shrink-0 hover:scale-[1.05] active:scale-95 whitespace-nowrap overflow-hidden"
                                            style={{
                                                padding: '20px 50px',
                                                minWidth: 'max-content'
                                            }}
                                        >
                                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite] pointer-events-none" />
                                            <span className="relative tracking-widest uppercase">View Details</span>
                                        </button>

                                        {/* Secondary: Buy Now */}
                                        <button
                                            onClick={handleBuyNow}
                                            className="group relative bg-white/5 hover:bg-white/10 text-white font-black text-base md:text-lg rounded-full border-2 md:border-4 border-[#6D28D9]/50 hover:border-[#6D28D9] transition-all duration-300 shadow-[0_0_20px_rgba(109,40,217,0.1)] hover:shadow-[0_0_40px_rgba(109,40,217,0.3)] flex items-center justify-center gap-6 flex-shrink-0 backdrop-blur-md hover:scale-[1.02] active:scale-95 whitespace-nowrap overflow-hidden"
                                            style={{
                                                padding: '20px 50px',
                                                minWidth: 'max-content'
                                            }}
                                        >
                                            <span className="relative flex items-center justify-center gap-4">
                                                <ShoppingCart className="w-6 h-6 md:w-8 md:h-8 text-purple-400 group-hover:text-white transition-colors" />
                                                <span className="tracking-widest uppercase">Buy Now</span>
                                            </span>
                                        </button>
                                    </motion.div>
                                </div>
                            </motion.div>
                        </motion.div>
                    )
                }
            </AnimatePresence >

        </main >
    );
}
