'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Menu, MenuItem, ProductItem, HoveredLink, ServiceSubItem } from '@/components/ui/navbar-menu';
import { usePathname } from 'next/navigation';
import { cn } from "@/lib/utils";
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

    const navLinks = [
        { name: 'Services', href: '/services' },
        { name: 'Portfolio', href: '/portfolio' },
        { name: 'About', href: '/about' },
        { name: 'Contact', href: '/contact' },
    ];

    return (
        <>
            <motion.nav
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className={cn(
                    "fixed inset-x-0 z-[100] transition-all duration-300 w-full bg-black/50 backdrop-blur-md border-b border-white/10",
                    scrolled ? "py-4" : "py-6"
                )}
            >
                <div className="w-full px-6 md:px-12 flex items-center justify-between relative h-full">
                    {/* Branding - Left */}
                    <div className="flex-shrink-0 z-10">
                        <Link href="/" className="flex items-center gap-3 group transition-all">
                            <div className="relative w-10 h-10 group-hover:scale-105 transition-transform">
                                <Image
                                    src="/logo.png"
                                    alt="Henu OS Logo"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                            <span className="text-xl font-bold text-white tracking-tight whitespace-nowrap">Henu OS</span>
                        </Link>
                    </div>

                    {/* Desktop Menu - Center */}
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:block">
                        <Menu setActive={setActive}>
                            <div className="relative">
                                <Link
                                    href="/services"
                                    onMouseEnter={() => setActive("Services")}
                                    className={cn(
                                        "transition-colors font-bold text-[15px] uppercase tracking-wider whitespace-nowrap",
                                        pathname.startsWith("/services") ? "text-cyan-400" : "text-white hover:text-cyan-400"
                                    )}
                                >
                                    <MenuItem setActive={setActive} active={active} item="Services">
                                        <div className="w-[600px] text-left">
                                            <div className="grid grid-cols-2 gap-x-4 gap-y-2 p-6">
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
                                                    className="flex items-center justify-center gap-2 text-sm font-medium text-gray-400 group-hover/footer:text-cyan-400 transition-colors"
                                                >
                                                    Interested? <span className="font-bold text-white group-hover/footer:text-cyan-400 transition-colors">Start your project</span>
                                                    <ArrowRight size={14} className="group-hover/footer:translate-x-1 transition-transform" />
                                                </Link>
                                            </div>
                                        </div>
                                    </MenuItem>
                                </Link>
                            </div>

                            <Link
                                href="/portfolio"
                                onMouseEnter={() => setActive(null)}
                                className={cn(
                                    "transition-colors font-bold text-[15px] uppercase tracking-wider whitespace-nowrap",
                                    pathname === "/portfolio" ? "text-cyan-400" : "text-white hover:text-cyan-400"
                                )}
                            >
                                Portfolio
                            </Link>
                            <Link
                                href="/about"
                                onMouseEnter={() => setActive(null)}
                                className={cn(
                                    "transition-colors font-bold text-[15px] uppercase tracking-wider whitespace-nowrap",
                                    pathname === "/about" ? "text-cyan-400" : "text-white hover:text-cyan-400"
                                )}
                            >
                                About
                            </Link>
                            <Link
                                href="/contact"
                                onMouseEnter={() => setActive(null)}
                                className={cn(
                                    "transition-colors font-bold text-[15px] uppercase tracking-wider whitespace-nowrap",
                                    pathname === "/contact" ? "text-cyan-400" : "text-white hover:text-cyan-400"
                                )}
                            >
                                Contact
                            </Link>
                        </Menu>
                    </div>

                    {/* Mobile Toggle - Right */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="p-2 text-white md:hidden hover:bg-white/10 rounded-lg transition-colors z-20"
                    >
                        {isMobileMenuOpen ? <X size={28} /> : <MenuIcon size={28} />}
                    </button>
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
                        {/* Mobile Header inside Overlay */}
                        <div className="flex items-center justify-between p-6 border-b border-white/5 sticky top-0 bg-black/50 backdrop-blur-xl z-20">
                            <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3">
                                <div className="relative w-8 h-8">
                                    <Image src="/logo.png" alt="Logo" fill className="object-contain" />
                                </div>
                                <span className="text-lg font-bold text-white tracking-tight">Henu OS</span>
                            </Link>
                            <button
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
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
                                            "transition-transform duration-300 text-cyan-400",
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
                                                        className="text-lg text-gray-400 hover:text-cyan-400 py-3 px-4 rounded-xl hover:bg-white/5 transition-colors font-bold"
                                                    >
                                                        {subService.title}
                                                    </Link>
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            {navLinks.filter(l => l.name !== 'Services').map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="text-2xl font-black text-white uppercase tracking-widest py-4 border-b border-white/5 hover:text-cyan-400 transition-colors"
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};
