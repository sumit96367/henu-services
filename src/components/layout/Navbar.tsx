'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Menu, MenuItem, ProductItem } from '@/components/ui/navbar-menu';
import { usePathname } from 'next/navigation';
import { cn } from "@/lib/utils";
import { Menu as MenuIcon, X } from 'lucide-react';

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
                                        <div className="w-[700px] lg:w-[800px] p-6 text-left">
                                            <div className="grid grid-cols-2 gap-x-6 gap-y-2">
                                                <ProductItem
                                                    title="Website Development"
                                                    href="/services/web-development"
                                                    src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=400"
                                                    description="Innovative web solutions powered by HENU OS AI for smarter performance."
                                                />
                                                <ProductItem
                                                    title="Backend Development"
                                                    href="/services/backend-development"
                                                    src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=400"
                                                    description="Scalable backend infrastructure with real-time AI and seamless reliability."
                                                />
                                                <ProductItem
                                                    title="Mobile App Development"
                                                    href="/services/mobile-app-development"
                                                    src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=400"
                                                    description="Powerful native and cross-platform mobile experiences for high-growth businesses."
                                                />
                                                <ProductItem
                                                    title="AI Automations"
                                                    href="/services/ai-automations"
                                                    src="https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=400"
                                                    description="Automate your workflows with custom HENU AI agents and boost efficiency."
                                                />
                                                <ProductItem
                                                    title="Graphic Design"
                                                    href="/services/graphic-design"
                                                    src="https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&q=80&w=400"
                                                    description="Stunning visuals and brand identities infused with modern AI tools."
                                                />
                                                <ProductItem
                                                    title="Digital Marketing & Ads"
                                                    href="/services/digital-marketing"
                                                    src="https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&fit=crop&q=80&w=400"
                                                    description="Data-backed campaigns to skyrocket your visibility and sales across all channels."
                                                />
                                                <ProductItem
                                                    title="Legal Services"
                                                    href="/services/legal-services"
                                                    src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=400"
                                                    description="Full-spectrum legal support and business compliance for startups and SMEs."
                                                />
                                                <ProductItem
                                                    title="Funding Solutions"
                                                    href="/services/funding-solutions"
                                                    src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=400"
                                                    description="Strategic funding paths from government grants to investor pitches."
                                                />
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
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed inset-0 z-[90] md:hidden pt-24 bg-black/95 backdrop-blur-xl"
                    >
                        <nav className="flex flex-col items-center gap-8 p-12">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="text-2xl font-bold text-white uppercase tracking-widest hover:text-cyan-400 transition-colors"
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
