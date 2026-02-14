'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Mail, Phone, MapPin, Twitter, Instagram, Linkedin, Github, ChevronDown, Facebook } from 'lucide-react';
import { IconBrandWhatsapp, IconBrandDiscord } from '@tabler/icons-react';
import { TextHoverEffect } from '@/components/ui/hover-footer';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const footerLinks = [
    {
        title: "Development",
        links: [
            { label: "Website Development", href: "/services/web-development" },
            { label: "Backend Development", href: "/services/backend-development" },
            { label: "Mobile App Development", href: "/services/mobile-app-development" },
            { label: "AI Automations", href: "/services/ai-automations" },
        ],
    },
    {
        title: "Growth & Legal",
        links: [
            { label: "Graphic Design", href: "/services/graphic-design" },
            { label: "Digital Marketing & Ads", href: "/services/digital-marketing" },
            { label: "Legal Services", href: "/services/legal-services" },
            { label: "Funding Solutions", href: "/services/funding-solutions", pulse: true },
        ],
    },
];


const contactInfo = [
    {
        icon: <Mail size={18} className="text-purple-400" />,
        text: "henuosr@gmail.com",
        href: "mailto:henuosr@gmail.com",
    },
    {
        icon: <Phone size={18} className="text-purple-400" />,
        text: "+91 8094100513",
        href: "tel:+918094100513",
    },
    {
        icon: <MapPin size={18} className="text-purple-400" />,
        text: "India",
    },
];

const socialLinks = [
    { icon: <Instagram size={20} />, label: "Instagram", href: "https://instagram.com/henuos" },
    { icon: <Twitter size={20} />, label: "Twitter", href: "https://twitter.com/henuos" },
    { icon: <Linkedin size={20} />, label: "LinkedIn", href: "https://linkedin.com/company/henuos" },
    { icon: <Github size={20} />, label: "GitHub", href: "https://github.com/henuos" },
    { icon: <Facebook size={20} />, label: "Facebook", href: "https://facebook.com/henuos" },
    { icon: <IconBrandWhatsapp size={20} />, label: "WhatsApp", href: "https://wa.me/918094100513" },
    { icon: <IconBrandDiscord size={20} />, label: "Discord", href: "https://discord.gg/henuos" },
];

const policyLinks = [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms of Use", href: "/terms-of-use" },
    { label: "Copyright", href: "/copyright" },
    { label: "Feedback", href: "/feedback" },
    { label: "Site Map", href: "/site-map" },
    { label: "Website Policies", href: "/website-policies" },
];

// Mobile Accordion Component
const MobileAccordion = ({ title, children, isOpen, onToggle }: { title: string; children: React.ReactNode; isOpen: boolean; onToggle: () => void }) => {
    return (
        <div className="border-b border-white/5">
            <button
                onClick={onToggle}
                className="w-full flex items-center justify-between py-5 text-left min-h-[44px]"
            >
                <h4 className="text-white text-base font-semibold">{title}</h4>
                <ChevronDown
                    className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                />
            </button>
            <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 pb-6' : 'max-h-0'
                    }`}
            >
                {children}
            </div>
        </div>
    );
};

export const Footer = () => {
    const [openSection, setOpenSection] = useState<string | null>(null);
    const pathname = usePathname();
    const isDashboard = pathname.startsWith('/dashboard') || pathname.startsWith('/admin');

    const toggleSection = (section: string) => {
        setOpenSection(openSection === section ? null : section);
    };

    if (isDashboard) return null;

    return (
        <footer className={cn(
            "bg-[#0a0a0c] relative overflow-hidden rounded-3xl transition-all duration-300 mb-10 mt-64",
            isDashboard
                ? "z-[1001] md:ml-[310px] md:mr-8 mx-6"
                : "z-20 mx-6 sm:mx-16 lg:mx-24"
        )} style={{ marginTop: '0px' }}>
            {/* Background glow effect - reduced on mobile */}
            <div
                className="absolute inset-0 z-0 opacity-40 lg:opacity-100"
                style={{
                    background: "radial-gradient(ellipse 80% 50% at 50% 100%, rgba(109, 40, 217, 0.08) 0%, transparent 60%)",
                }}
            />

            {/* Main content */}
            <div className={cn(
                "px-6 sm:px-12 lg:px-16 pt-32 lg:pt-60 pb-12 pb-[env(safe-area-inset-bottom,1rem)] relative z-10",
                isDashboard ? "w-full" : "container mx-auto"
            )} style={{ paddingTop: '50px' }}>

                {/* MOBILE LAYOUT (<lg) */}
                <div className="lg:hidden space-y-8">
                    {/* Brand section - centered on mobile */}
                    <div className="flex flex-col items-center text-center space-y-4">
                        <div className="flex items-center gap-3 group">
                            <div className="relative w-16 h-16 flex items-center justify-center overflow-visible">
                                <div className="relative w-16 h-16 group-hover:scale-110 transition-all duration-500 group-hover:drop-shadow-[0_0_20px_rgba(109, 40, 217, 0.7)]" style={{ transform: 'scale(1.5)' }}>
                                    <Image
                                        src="/logo.png"
                                        alt="Henu OS Logo"
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                            </div>
                            <span className="text-white text-2xl sm:text-3xl font-bold tracking-tight whitespace-nowrap" style={{ lineHeight: '1' }}>Henu OS</span>
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed max-w-md">
                            Building the backbone of modern business. AI-driven development, grants & legal compliance.
                        </p>
                    </div>

                    {/* Accordion Sections */}
                    <div className="space-y-0">
                        {/* Development */}
                        <MobileAccordion
                            title="Development"
                            isOpen={openSection === 'development'}
                            onToggle={() => toggleSection('development')}
                        >
                            <ul className="space-y-3">
                                {footerLinks[0].links.map((link) => (
                                    <li key={link.label}>
                                        <Link href={link.href} className="text-gray-400 hover:text-white transition-colors text-sm block py-1">
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </MobileAccordion>

                        {/* Growth & Legal */}
                        <MobileAccordion
                            title="Growth & Legal"
                            isOpen={openSection === 'growth'}
                            onToggle={() => toggleSection('growth')}
                        >
                            <ul className="space-y-3">
                                {footerLinks[1].links.map((link) => (
                                    <li key={link.label} className="flex items-center gap-2">
                                        <Link href={link.href} className="text-gray-400 hover:text-white transition-colors text-sm block py-1">
                                            {link.label}
                                        </Link>
                                        {link.pulse && (
                                            <span className="flex h-2 w-2 relative">
                                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                                                <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
                                            </span>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </MobileAccordion>

                        {/* Legal & Policies */}
                        <MobileAccordion
                            title="Legal & Policies"
                            isOpen={openSection === 'policies'}
                            onToggle={() => toggleSection('policies')}
                        >
                            <ul className="space-y-3">
                                {policyLinks.map((link) => (
                                    <li key={link.label}>
                                        <Link href={link.href} className="text-gray-400 hover:text-white transition-colors text-sm block py-1">
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </MobileAccordion>

                        {/* Contact Us */}
                        <MobileAccordion
                            title="Contact Us"
                            isOpen={openSection === 'contact'}
                            onToggle={() => toggleSection('contact')}
                        >
                            <ul className="space-y-4">
                                {contactInfo.map((info, idx) => (
                                    <li key={idx}>
                                        {info.href ? (
                                            <a href={info.href} className="flex items-center gap-3 text-gray-400 hover:text-purple-400 transition-all">
                                                <div className="p-2 rounded-lg bg-white/5">
                                                    {info.icon}
                                                </div>
                                                <span className="text-sm">{info.text}</span>
                                            </a>
                                        ) : (
                                            <div className="flex items-center gap-3 text-gray-400">
                                                <div className="p-2 rounded-lg bg-white/5">
                                                    {info.icon}
                                                </div>
                                                <span className="text-sm">{info.text}</span>
                                            </div>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </MobileAccordion>
                    </div>

                    {/* Social Links - centered */}
                    <div className="flex items-center justify-center gap-4 pt-4">
                        {socialLinks.map((social) => (
                            <a
                                key={social.label}
                                href={social.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-purple-500 hover:text-white transition-all duration-300"
                                aria-label={social.label}
                            >
                                {social.icon}
                            </a>
                        ))}
                    </div>

                    {/* Copyright - centered */}
                    <p className="text-gray-500 text-xs text-center pt-4 border-t border-white/5">
                        © {new Date().getFullYear()} Henu OS Private Limited. All rights reserved.
                    </p>
                </div>

                {/* DESKTOP LAYOUT (≥lg) - UNCHANGED */}
                <div className="hidden lg:block">
                    {/* Balanced Columns - Spread out to fill full width */}
                    <div className="flex flex-wrap justify-between items-start gap-y-12 gap-x-8 xl:gap-x-16 mb-16 md:mb-24">

                        {/* Brand section */}
                        <div className="flex-1 flex flex-col space-y-6 md:space-y-8 w-full min-w-[320px]">
                            <div className="flex items-center gap-4 group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                                <div className="relative w-24 h-24 flex items-center justify-center overflow-visible">
                                    <div className="relative w-24 h-24 group-hover:scale-110 transition-all duration-500 group-hover:drop-shadow-[0_0_30px_rgba(109, 40, 217, 0.7)]" style={{ transform: 'scale(2.15)' }}>
                                        <Image
                                            src="/logo.png"
                                            alt="Henu OS Logo"
                                            fill
                                            className="object-contain"
                                        />
                                    </div>
                                </div>
                                <span className="text-white text-3xl xl:text-4xl font-bold tracking-tight whitespace-nowrap" style={{ lineHeight: '1' }}>Henu OS</span>
                            </div>
                            <p className="text-gray-400 text-base md:text-lg leading-relaxed max-w-sm">
                                Building the backbone of modern business. From AI-driven development to government grants and legal compliance.
                            </p>
                        </div>

                        {/* Development Links */}
                        <div className="flex-1 flex flex-col w-full min-w-[150px]">
                            <h4 className="text-white text-lg md:text-xl font-semibold mb-6 md:mb-10">Development</h4>
                            <ul className="space-y-4 md:space-y-6">
                                {footerLinks[0].links.map((link) => (
                                    <li key={link.label}>
                                        <Link href={link.href} className="text-gray-400 hover:text-white transition-colors text-lg font-medium">
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Growth & Legal Links */}
                        <div className="flex-1 flex flex-col w-full min-w-[150px]">
                            <h4 className="text-white text-xl font-semibold mb-10">Growth & Legal</h4>
                            <ul className="space-y-6">
                                {footerLinks[1].links.map((link) => (
                                    <li key={link.label} className="flex items-center gap-3">
                                        <Link href={link.href} className="text-gray-400 hover:text-white transition-colors text-lg font-medium">
                                            {link.label}
                                        </Link>
                                        {link.pulse && (
                                            <span className="flex h-2 w-2 relative">
                                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                                                <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
                                            </span>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Disclaimer & Policies Column */}
                        <div className="flex-1 flex flex-col w-full min-w-[150px]">
                            <h4 className="text-white text-xl font-semibold mb-10">Disclaimer & Policies</h4>
                            <ul className="space-y-6">
                                <li>
                                    <Link href="/privacy-policy" className="text-gray-400 hover:text-white transition-colors text-lg font-medium">
                                        Privacy Policy
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/terms-of-use" className="text-gray-400 hover:text-white transition-colors text-lg font-medium">
                                        Terms of Use
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/copyright" className="text-gray-400 hover:text-white transition-colors text-lg font-medium">
                                        Copyright
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/feedback" className="text-gray-400 hover:text-white transition-colors text-lg font-medium">
                                        Feedback
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/site-map" className="text-gray-400 hover:text-white transition-colors text-lg font-medium">
                                        Site Map
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/website-policies" className="text-gray-400 hover:text-white transition-colors text-lg font-medium">
                                        Website Policies
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {/* Contact Us Section */}
                        <div className="flex-1 flex flex-col w-full min-w-[240px] lg:pl-8 lg:border-l border-white/5">
                            <h4 className="text-white text-xl font-semibold mb-10">Contact Us</h4>
                            <ul className="space-y-8">
                                {contactInfo.map((info, idx) => (
                                    <li key={idx}>
                                        {info.href ? (
                                            <a href={info.href} className="flex items-center gap-5 text-gray-400 hover:text-purple-400 transition-all group">
                                                <div className="p-3.5 rounded-xl bg-white/5 group-hover:bg-purple-500/10 transition-colors">
                                                    {info.icon}
                                                </div>
                                                <span className="text-sm xl:text-lg font-medium tracking-wide break-all">{info.text}</span>
                                            </a>
                                        ) : (
                                            <div className="flex items-center gap-5 text-gray-400">
                                                <div className="p-3.5 rounded-xl bg-white/5">
                                                    {info.icon}
                                                </div>
                                                <span className="text-sm xl:text-lg font-medium tracking-wide break-all">{info.text}</span>
                                            </div>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Footer Bottom Bar */}
                    <div className="pt-6 md:pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 md:gap-10">
                        {/* Social Links */}
                        <div className="flex items-center gap-4 md:gap-6">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.label}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-purple-500 hover:text-white transition-all duration-300"
                                    aria-label={social.label}
                                >
                                    {social.icon}
                                </a>
                            ))}
                        </div>

                        {/* Copyright */}
                        <p className="text-gray-500 text-base font-medium">
                            © {new Date().getFullYear()} Henu OS Private Limited. All rights reserved.
                        </p>
                    </div>
                </div>
            </div>

            {/* Large decorative text at bottom */}
            <div className="relative h-[280px] -mt-16 flex items-end justify-center overflow-hidden pointer-events-none">
                <TextHoverEffect text="HENU OS" className="pointer-events-auto" />
            </div>
        </footer>
    );
};
