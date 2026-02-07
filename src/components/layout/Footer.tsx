'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Mail, Phone, MapPin, Twitter, Instagram, Linkedin, Github } from 'lucide-react';
import { TextHoverEffect } from '@/components/ui/hover-footer';

const footerLinks = [
    {
        title: "Technology",
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
        icon: <Mail size={18} className="text-cyan-400" />,
        text: "hello@henuos.com",
        href: "mailto:hello@henuos.com",
    },
    {
        icon: <Phone size={18} className="text-cyan-400" />,
        text: "+91 86373 73116",
        href: "tel:+918637373116",
    },
    {
        icon: <MapPin size={18} className="text-cyan-400" />,
        text: "India",
    },
];

const socialLinks = [
    { icon: <Instagram size={20} />, label: "Instagram", href: "https://instagram.com/henuos" },
    { icon: <Twitter size={20} />, label: "Twitter", href: "https://twitter.com/henuos" },
    { icon: <Linkedin size={20} />, label: "LinkedIn", href: "https://linkedin.com/company/henuos" },
    { icon: <Github size={20} />, label: "GitHub", href: "https://github.com/henuos" },
];

const policyLinks = [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms of Use", href: "/terms-of-use" },
    { label: "Copyright", href: "/copyright" },
    { label: "Feedback", href: "/feedback" },
    { label: "Site Map", href: "/site-map" },
    { label: "Website Policies", href: "/website-policies" },
];

export const Footer = () => {
    return (
        <footer className="bg-[#0a0a0c] relative overflow-hidden rounded-3xl mx-6 sm:mx-16 lg:mx-24 mb-10 mt-32 z-20">
            {/* Background glow effect */}
            <div
                className="absolute inset-0 z-0"
                style={{
                    background: "radial-gradient(ellipse 80% 50% at 50% 100%, rgba(0, 212, 255, 0.08) 0%, transparent 60%)",
                }}
            />

            {/* Main content */}
            <div className="container mx-auto px-6 sm:px-12 lg:px-16 pt-40 pb-12 relative z-10">
                {/* Balanced Columns - Spread out to fill full width */}
                <div className="flex flex-col md:flex-row justify-between items-start gap-12 lg:gap-20 mb-24">

                    {/* Brand section */}
                    <div className="flex-1 flex flex-col space-y-8 min-w-[300px]">
                        <div className="flex items-center gap-4">
                            <div className="relative w-24 h-24 flex items-center justify-center overflow-visible">
                                <div className="relative w-24 h-24" style={{ transform: 'scale(2.15)' }}>
                                    <Image
                                        src="/logo.png"
                                        alt="Henu OS Logo"
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                            </div>
                            <span className="text-white text-4xl font-bold tracking-tight" style={{ lineHeight: '1' }}>Henu OS</span>
                        </div>
                        <p className="text-gray-400 text-lg leading-relaxed max-w-sm">
                            Building the backbone of modern business. From AI-driven development to government grants and legal compliance.
                        </p>
                    </div>

                    {/* Development Links */}
                    <div className="flex-1 flex flex-col min-w-[200px]">
                        <h4 className="text-white text-xl font-semibold mb-10">Development</h4>
                        <ul className="space-y-6">
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
                    <div className="flex-1 flex flex-col min-w-[200px]">
                        <h4 className="text-white text-xl font-semibold mb-10">Growth & Legal</h4>
                        <ul className="space-y-6">
                            {footerLinks[1].links.map((link) => (
                                <li key={link.label} className="flex items-center gap-3">
                                    <Link href={link.href} className="text-gray-400 hover:text-white transition-colors text-lg font-medium">
                                        {link.label}
                                    </Link>
                                    {link.pulse && (
                                        <span className="flex h-2 w-2 relative">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                                        </span>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Disclaimer & Policies Column */}
                    <div className="flex-1 flex flex-col min-w-[200px]">
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
                    <div className="flex-1 flex flex-col min-w-[280px] lg:pl-8 lg:border-l border-white/5">
                        <h4 className="text-white text-xl font-semibold mb-10">Contact Us</h4>
                        <ul className="space-y-8">
                            {contactInfo.map((info, idx) => (
                                <li key={idx}>
                                    {info.href ? (
                                        <a href={info.href} className="flex items-center gap-5 text-gray-400 hover:text-cyan-400 transition-all group">
                                            <div className="p-3.5 rounded-xl bg-white/5 group-hover:bg-cyan-500/10 transition-colors">
                                                {info.icon}
                                            </div>
                                            <span className="text-lg font-medium tracking-wide">{info.text}</span>
                                        </a>
                                    ) : (
                                        <div className="flex items-center gap-5 text-gray-400">
                                            <div className="p-3.5 rounded-xl bg-white/5">
                                                {info.icon}
                                            </div>
                                            <span className="text-lg font-medium tracking-wide">{info.text}</span>
                                        </div>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Footer Bottom Bar */}
                <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-10">
                    {/* Social Links */}
                    <div className="flex items-center gap-6">
                        {socialLinks.map((social) => (
                            <a
                                key={social.label}
                                href={social.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-cyan-500 hover:text-white transition-all duration-300"
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

            {/* Large decorative text at bottom */}
            <div className="relative h-[280px] -mt-16 flex items-end justify-center overflow-hidden pointer-events-none">
                <TextHoverEffect text="HENU OS" className="pointer-events-auto" />
            </div>
        </footer>
    );
};
