'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Menu, MenuItem, ProductItem, HoveredLink } from '@/components/ui/navbar-menu';
import { usePathname } from 'next/navigation';
import { cn } from "@/lib/utils";

export const Navbar = () => {
    const [active, setActive] = useState<string | null>(null);
    const [scrolled, setScrolled] = useState(false);
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
    }, [pathname]);

    return (
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

                {/* Core Links/Dropdowns - Center (True Absolute Center) */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:block">
                    <Menu setActive={setActive}>
                        <MenuItem setActive={setActive} active={active} item="Services">
                            <div className="w-[700px] lg:w-[800px] p-6">
                                <div className="grid grid-cols-2 gap-x-6 gap-y-2">
                                    <ProductItem
                                        title="Digital Marketing & Ads"
                                        href="/services/digital-marketing"
                                        src="https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&fit=crop&q=80&w=400"
                                        description="Data-driven marketing and performance advertising strategies to scale your digital presence."
                                    />
                                    <ProductItem
                                        title="AI Agent Development"
                                        href="/services/ai-agent-development"
                                        src="https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=400"
                                        description="Intelligent AI agents and custom LLM implementations to automate your core business."
                                    />
                                    <ProductItem
                                        title="Backend Development"
                                        href="/services/backend-development"
                                        src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=400"
                                        description="Scalable server-side architecture and API development for robust applications."
                                    />
                                    <ProductItem
                                        title="Government Grants"
                                        href="/services/government-grants"
                                        src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=400"
                                        description="Strategic non-dilutive funding and venture capital advisory for high-growth startups."
                                    />
                                    <ProductItem
                                        title="Legal Documentation"
                                        href="/services/legal-documentation"
                                        src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=400"
                                        description="Comprehensive legal document drafting and contract management services."
                                    />
                                    <ProductItem
                                        title="Mobile App Development"
                                        href="/services/mobile-app-development"
                                        src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=400"
                                        description="Native and cross-platform mobile applications with stunning UI/UX design."
                                    />
                                    <ProductItem
                                        title="Registration & Compliance"
                                        href="/services/registration-compliance"
                                        src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=400"
                                        description="End-to-end entity registration, global tax compliance, and legal infrastructure."
                                    />
                                    <ProductItem
                                        title="Web Development"
                                        href="/services/web-development"
                                        src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=400"
                                        description="Bespoke web solutions engineered for extreme performance and scalability."
                                    />
                                </div>
                            </div>
                        </MenuItem>

                        <Link href="/portfolio" className="text-white hover:text-cyan-400 transition-colors font-bold text-[15px] uppercase tracking-wider whitespace-nowrap">Portfolio</Link>
                        <Link href="/about" className="text-white hover:text-cyan-400 transition-colors font-bold text-[15px] uppercase tracking-wider whitespace-nowrap">About</Link>
                    </Menu>
                </div>

                {/* CTA Button - Right */}
                <div className="flex-shrink-0 z-10">
                    <Link
                        href="/contact"
                        className="btn-primary group"
                        style={{ padding: '14px 36px', fontSize: '0.95rem' }}
                    >
                        <span>Estimate project</span>
                        <svg
                            className="transition-transform group-hover:translate-x-1 ml-2"
                            width="16"
                            height="16"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                    </Link>
                </div>
            </div>
        </motion.nav>
    );
};
