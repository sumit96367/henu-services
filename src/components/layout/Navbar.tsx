'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Menu, MenuItem, ProductItem, HoveredLink, ServiceSubItem } from '@/components/ui/navbar-menu';
import { usePathname } from 'next/navigation';
import { cn } from "@/lib/utils";
import { UserMenu } from '@/components/auth';
import { useAuth } from '@/context/AuthContext';
import {
    Menu as MenuIcon,
    X,
    Globe,
    Server,
    Smartphone,
    Bot,
    Palette,
    Megaphone,
    Scale,
    Coins,
    ArrowRight,
    ChevronDown
} from 'lucide-react';

export const Navbar = () => {
    const [active, setActive] = useState<string | null>(null);
    const [scrolled, setScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        setActive(null);
        setIsMobileMenuOpen(false);
    }, [pathname]);

    const { userType, isAuthenticated } = useAuth();

    const navLinks = [
        ...(isAuthenticated ? [{ name: 'Dashboard', href: '/dashboard' }] : []),
        { name: 'Services', href: '/services' },
        { name: 'Ecosystem', href: '/portfolio' },
        { name: 'About', href: '/about' },
        ...(userType !== 'personal' ? [{ name: 'Realm', href: '/pricing' }] : []),
        ...(userType !== 'company' ? [{ name: 'Careers', href: '/careers' }] : []),
        { name: 'Contact', href: '/contact' },
    ];

    const isDashboard = pathname.startsWith('/dashboard') || pathname.startsWith('/admin');

    return (
        <>
            <motion.nav
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className={cn(
                    "fixed z-[100] transition-all duration-300 bg-black/60 backdrop-blur-sm md:backdrop-blur-md border-b border-white/10",
                    isDashboard ? "md:left-[300px] md:w-[calc(100%-300px)] left-0 w-full" : "inset-x-0 w-full",
                    scrolled ? "py-4" : "py-6"
                )}
            >
                <div className={cn(
                    "w-full flex items-center justify-between relative h-full",
                    isDashboard ? "px-6 md:pl-24 md:pr-12" : "px-6 md:px-12"
                )}>
                    {/* Branding - Left on mobile (closed), Center on mobile (menu open) */}
                    <div className={cn(
                        "flex-shrink-0 z-10 transition-all duration-300",
                        "md:static md:translate-x-0",
                        isMobileMenuOpen ? "md:hidden absolute left-1/2 -translate-x-1/2" : ""
                    )}>
                        <Link href="/" className="flex items-center gap-3 group transition-all">
                            <div className="relative w-12 h-12 flex items-center justify-center overflow-visible">
                                <div className="relative w-12 h-12 group-hover:scale-110 transition-all duration-500 group-hover:drop-shadow-[0_0_20px_rgba(109, 40, 217, 0.7)]" style={{ transform: 'scale(1.8)' }}>
                                    <Image
                                        src="/logo.png"
                                        alt="Henu OS Logo"
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                            </div>
                            <span className="text-xl font-bold text-white tracking-tight whitespace-nowrap">Henu OS</span>
                        </Link>
                    </div>

                    {/* Desktop Menu - Center */}
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:block">
                        <Menu setActive={setActive}>
                            <div className="relative">
                                <MenuItem setActive={setActive} active={active} item="Services">
                                    <div className="w-[600px] text-left">
                                        <div className="grid grid-cols-2 gap-x-4 gap-y-2" style={{ padding: '0.2cm' }}>
                                            <ServiceSubItem
                                                title="Website Development"
                                                href="/services/web-development"
                                                icon={Globe}
                                            />
                                            <ServiceSubItem
                                                title="Backend Development"
                                                href="/services/backend-development"
                                                icon={Server}
                                            />
                                            <ServiceSubItem
                                                title="Mobile App Development"
                                                href="/services/mobile-app-development"
                                                icon={Smartphone}
                                            />
                                            <ServiceSubItem
                                                title="AI Automations"
                                                href="/services/ai-automations"
                                                icon={Bot}
                                            />
                                            <ServiceSubItem
                                                title="Graphic Design"
                                                href="/services/graphic-design"
                                                icon={Palette}
                                            />
                                            <ServiceSubItem
                                                title="Digital & Ads"
                                                href="/services/digital-marketing"
                                                icon={Megaphone}
                                            />
                                            <ServiceSubItem
                                                title="Legal Services"
                                                href="/services/legal-services"
                                                icon={Scale}
                                            />
                                            <ServiceSubItem
                                                title="Funding Solutions"
                                                href="/services/funding-solutions"
                                                icon={Coins}
                                            />
                                        </div>

                                        {/* Submenu Footer */}
                                        <div className="p-4 bg-white/[0.03] border-t border-white/10 group/footer">
                                            <Link
                                                href="/contact"
                                                className="flex items-center justify-center gap-2 text-sm font-medium text-gray-400 group-hover/footer:text-purple-400 transition-colors"
                                            >
                                                Interested&quest; <span className="font-bold text-white group-hover/footer:text-purple-400 transition-colors">Start your project</span>
                                                <ArrowRight size={14} className="group-hover/footer:translate-x-1 transition-transform" />
                                            </Link>
                                        </div>
                                    </div>
                                </MenuItem>
                            </div>

                            <Link
                                href="/portfolio"
                                onMouseEnter={() => setActive(null)}
                                className={cn(
                                    "transition-colors font-bold text-[15px] uppercase tracking-wider whitespace-nowrap",
                                    pathname === "/portfolio" ? "text-purple-400" : "text-white hover:text-purple-400"
                                )}
                            >
                                ECOSYSTEM
                            </Link>
                            <Link
                                href="/about"
                                onMouseEnter={() => setActive(null)}
                                className={cn(
                                    "transition-colors font-bold text-[15px] uppercase tracking-wider whitespace-nowrap",
                                    pathname === "/about" ? "text-purple-400" : "text-white hover:text-purple-400"
                                )}
                            >
                                About
                            </Link>
                            {userType !== 'personal' && (
                                <Link
                                    href="/pricing"
                                    onMouseEnter={() => setActive(null)}
                                    className={cn(
                                        "transition-colors font-bold text-[15px] uppercase tracking-wider whitespace-nowrap",
                                        pathname === "/pricing" ? "text-purple-400" : "text-white hover:text-purple-400"
                                    )}
                                >
                                    Realm
                                </Link>
                            )}
                            {userType !== 'company' && (
                                <Link
                                    href="/careers"
                                    onMouseEnter={() => setActive(null)}
                                    className={cn(
                                        "transition-colors font-bold text-[15px] uppercase tracking-wider whitespace-nowrap",
                                        pathname === "/careers" ? "text-purple-400" : "text-white hover:text-purple-400"
                                    )}
                                >
                                    Careers
                                </Link>
                            )}
                            <Link
                                href="/contact"
                                onMouseEnter={() => setActive(null)}
                                className={cn(
                                    "transition-colors font-bold text-[15px] uppercase tracking-wider whitespace-nowrap",
                                    pathname === "/contact" ? "text-purple-400" : "text-white hover:text-purple-400"
                                )}
                            >
                                Contact
                            </Link>
                        </Menu>
                    </div>

                    {/* Search, User Menu & Mobile Toggle - Right */}
                    <div className="flex items-center gap-3">

                        {/* User Menu (Desktop) */}
                        <div className="hidden md:block">
                            <UserMenu className="-mr-8" />
                        </div>

                        {/* Mobile Toggle */}
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="p-2 text-white md:hidden hover:bg-white/10 rounded-lg transition-colors z-20"
                        >
                            {isMobileMenuOpen ? <X size={28} /> : <MenuIcon size={28} />}
                        </button>
                    </div>
                </div>
            </motion.nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: "100%" }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed inset-0 z-[200] md:hidden bg-black/98 backdrop-blur-3xl flex flex-col overflow-y-auto"
                    >
                        {/* Mobile Header inside Overlay - Centered HENUOS */}
                        <div className="flex items-center justify-center p-6 border-b border-white/5 sticky top-0 bg-black/50 backdrop-blur-xl z-20 relative">
                            <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 group">
                                <div className="relative w-12 h-12 flex items-center justify-center overflow-visible">
                                    <div className="relative w-12 h-12 group-hover:scale-110 transition-all duration-500 group-hover:drop-shadow-[0_0_15px_rgba(109, 40, 217, 0.7)]" style={{ transform: 'scale(2.5)' }}>
                                        <Image src="/logo.png" alt="Logo" fill className="object-contain" />
                                    </div>
                                </div>
                                <span className="text-xl font-bold text-white tracking-tight">Henu OS</span>
                            </Link>
                            <button
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="p-2 text-white hover:bg-white/10 rounded-lg transition-colors absolute right-6"
                            >
                                <X size={28} />
                            </button>
                        </div>

                        <nav className="flex flex-col flex-1 overflow-y-auto">
                            {/* Navigation Links */}
                            <div className="flex flex-col w-full px-8 py-4">
                                {/* Services Accordion */}
                                <div className="flex flex-col border-b border-white/10">
                                    <button
                                        onClick={() => setActive(active === 'Services' ? null : 'Services')}
                                        className="flex items-center justify-between w-full text-lg font-medium text-gray-300 py-6 pl-4 hover:text-white transition-colors"
                                    >
                                        Services
                                        <ChevronDown
                                            className={cn(
                                                "transition-transform duration-300 text-gray-500",
                                                active === 'Services' ? "rotate-180" : ""
                                            )}
                                        />
                                    </button>

                                    <AnimatePresence>
                                        {active === 'Services' && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                className="overflow-hidden bg-white/[0.02]"
                                            >
                                                <div className="flex flex-col pl-4 pb-2">
                                                    {[
                                                        { title: "Website Development", href: "/services/web-development" },
                                                        { title: "Backend Development", href: "/services/backend-development" },
                                                        { title: "Mobile App Development", href: "/services/mobile-app-development" },
                                                        { title: "AI Automations", href: "/services/ai-automations" },
                                                        { title: "Graphic Design", href: "/services/graphic-design" },
                                                        { title: "Digital & Ads", href: "/services/digital-marketing" },
                                                        { title: "Legal Services", href: "/services/legal-services" },
                                                        { title: "Funding Solutions", href: "/services/funding-solutions" },
                                                    ].map((subService) => (
                                                        <Link
                                                            key={subService.href}
                                                            href={subService.href}
                                                            onClick={() => setIsMobileMenuOpen(false)}
                                                            className="text-base text-gray-400 hover:text-white py-4 px-4 border-l border-white/10 hover:border-purple-500 transition-all font-medium"
                                                        >
                                                            {subService.title}
                                                        </Link>
                                                    ))}
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>

                                <Link
                                    href="/portfolio"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="text-lg font-medium text-gray-300 py-6 pl-4 border-b border-white/10 hover:text-white transition-colors"
                                >
                                    Ecosystem
                                </Link>

                                <Link
                                    href="/about"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="text-lg font-medium text-gray-300 py-6 pl-4 border-b border-white/10 hover:text-white transition-colors"
                                >
                                    About
                                </Link>

                                {userType !== 'personal' && (
                                    <Link
                                        href="/pricing"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="text-lg font-medium text-gray-300 py-6 pl-4 border-b border-white/10 hover:text-white transition-colors"
                                    >
                                        Realm
                                    </Link>
                                )}

                                {userType !== 'company' && (
                                    <Link
                                        href="/careers"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="text-lg font-medium text-gray-300 py-6 pl-4 border-b border-white/10 hover:text-white transition-colors"
                                    >
                                        Careers
                                    </Link>
                                )}

                                <Link
                                    href="/contact"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="text-lg font-medium text-gray-300 py-6 pl-4 border-b border-white/10 hover:text-white transition-colors"
                                >
                                    Contact
                                </Link>
                            </div>

                            {/* Contact Info */}
                            <div className="flex flex-col px-8 py-6 gap-3">
                                <a href="tel:+918094100513" className="text-gray-400 text-base font-medium hover:text-white transition-colors">
                                    +91 8094100513
                                </a>
                                <a href="mailto:henuosr@gmail.com" className="text-gray-400 text-base font-medium hover:text-white transition-colors">
                                    henuosr@gmail.com
                                </a>

                                {/* Get Started Button - approx 1cm (40px) below email */}
                                <div className="mt-10 flex justify-center w-full">
                                    <Link
                                        href="/dashboard"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="px-8 py-3 rounded-lg bg-gradient-to-r from-purple-400 to-violet-300 text-white font-semibold hover:from-purple-300 hover:to-violet-200 transition-all shadow-lg shadow-purple-400/20"
                                    >
                                        GET STARTED
                                    </Link>
                                </div>
                            </div>

                            {/* Footer Tagline */}
                            <div className="mt-10 pb-8 text-center flex flex-col gap-0.5 leading-tight">
                                <p className="text-[10px] text-gray-600 font-bold tracking-widest uppercase">
                                    POWERED BY
                                </p>
                                <p className="text-[10px] text-violet-500 font-bold tracking-widest uppercase">
                                    HENU OS PVT. LTD.
                                </p>
                            </div>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};
