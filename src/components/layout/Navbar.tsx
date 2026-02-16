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
                            <UserMenu />
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
                                    <div className="relative w-12 h-12 group-hover:scale-110 transition-all duration-500 group-hover:drop-shadow-[0_0_15px_rgba(109, 40, 217, 0.7)]" style={{ transform: 'scale(1.5)' }}>
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

                        <nav className="flex flex-col p-8 space-y-4">

                            {/* Services Mobile Accordion */}
                            <div className="flex flex-col">
                                <button
                                    onClick={() => setActive(active === 'Services' ? null : 'Services')}
                                    className="flex items-center justify-between w-full text-2xl font-black text-white uppercase tracking-widest py-4 border-b border-white/5"
                                >
                                    Services
                                    <ChevronDown
                                        className={cn(
                                            "transition-transform duration-300 text-purple-400",
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
                                            className="overflow-hidden bg-white/[0.02] rounded-2xl mt-2"
                                        >
                                            <div className="grid grid-cols-1 gap-2 p-4">
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
                                                        className="text-lg text-gray-400 hover:text-purple-400 py-3 px-4 rounded-xl hover:bg-white/5 transition-colors font-bold"
                                                    >
                                                        {subService.title}
                                                    </Link>
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            {navLinks.filter(l => l.name !== 'Services' && l.name !== 'Dashboard').map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="text-2xl font-black text-white uppercase tracking-widest py-4 border-b border-white/5 hover:text-purple-400 transition-colors"
                                >
                                    {link.name}
                                </Link>
                            ))}

                            {/* Dashboard Card (if authenticated) - After Contact with gap */}
                            {isAuthenticated && (
                                <div className="pt-8">
                                    <Link
                                        href="/dashboard"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="relative group overflow-hidden rounded-2xl bg-gradient-to-r from-purple-600/20 to-indigo-600/20 border-2 border-purple-500/30 hover:border-purple-400/50 transition-all p-6 block"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="w-14 h-14 rounded-xl bg-purple-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                                                <svg className="w-7 h-7 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                </svg>
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="text-xl font-black text-white uppercase tracking-wide">My Dashboard</h3>
                                                <p className="text-sm text-purple-300 font-medium">View your account & orders</p>
                                            </div>
                                            <svg className="w-6 h-6 text-purple-400 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </div>
                                        {/* Subtle glow effect */}
                                        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </Link>
                                </div>
                            )}

                            {/* Mobile Auth Buttons */}
                            {!isAuthenticated && (
                                <div className="pt-8 mt-4 border-t border-white/10">
                                    <UserMenu className="w-full py-4 px-6 bg-white/[0.03] hover:bg-white/[0.08]" />
                                </div>
                            )}
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};
