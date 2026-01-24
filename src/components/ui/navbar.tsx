"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Rocket } from "lucide-react"
import Link from "next/link"

export function Navbar() {
    const [scrolled, setScrolled] = useState(false)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20)
        }
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    const navLinks = [
        { name: "Services", href: "#services" },
        { name: "Portfolio", href: "#portfolio" },
        { name: "About", href: "#about" },
        { name: "Team", href: "#team" },
        { name: "Contact", href: "#contact" },
    ]

    return (
        <nav
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${scrolled ? "py-4" : "py-6"
                }`}
        >
            <div className="container mx-auto px-6">
                <div
                    className={`relative flex items-center justify-between px-6 py-3 rounded-2xl transition-all duration-500 ${scrolled
                            ? "bg-black/40 backdrop-blur-xl border border-white/10 shadow-2xl"
                            : "bg-transparent"
                        }`}
                >
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="relative">
                            <div className="absolute inset-0 bg-primary/40 blur-lg rounded-full group-hover:bg-primary/60 transition-colors" />
                            <Rocket className="relative w-8 h-8 text-primary" />
                        </div>
                        <span className="text-xl font-bold tracking-tighter text-white">
                            HENU<span className="text-primary">OS</span>
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="text-sm font-medium text-white/70 hover:text-white transition-colors relative group"
                            >
                                {link.name}
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
                            </Link>
                        ))}
                        <Link
                            href="#contact"
                            className="px-5 py-2 rounded-full bg-white text-black text-sm font-bold hover:bg-primary hover:text-white transition-all duration-300 transform hover:scale-105 active:scale-95"
                        >
                            Get Started
                        </Link>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button
                        className="md:hidden text-white"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? <X /> : <Menu />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="absolute top-full left-0 w-full px-6 py-4 md:hidden"
                    >
                        <div className="bg-black/90 backdrop-blur-2xl border border-white/10 rounded-2xl p-6 shadow-2xl overflow-hidden">
                            <div className="flex flex-col gap-4">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.name}
                                        href={link.href}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="text-lg font-medium text-white/80 hover:text-white transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                ))}
                                <Link
                                    href="#contact"
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="mt-2 w-full py-3 rounded-xl bg-primary text-white text-center font-bold"
                                >
                                    Get Started
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    )
}
