"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { IconCloud } from "@/components/ui/interactive-icon-cloud";

interface BackendHeroSectionProps {
    title?: string;
    highlight?: string;
    description?: string;
}

const slugs = [
    "typescript",
    "javascript",
    "nodedotjs",
    "python",
    "postgresql",
    "mongodb",
    "redis",
    "docker",
    "kubernetes",
    "amazonaws",
    "googlecloud",
    "azure",
    "go",
    "rust",
    "graphql",
    "prisma",
    "firebase",
    "nginx",
    "git",
    "github",
    "gitlab",
    "fastapi",
    "django",
    "flask",
    "express",
    "nestjs",
    "jenkins",
    "sonarcloud",
    "prometheus",
    "grafana"
];

export default function BackendHeroSection({
    title = "Power Your App",
    highlight = "Scalable Backend",
    description = "Build rock-solid servers with AI intelligence and seamless scalability. Built on HENU OS for ultimate reliability."
}: BackendHeroSectionProps) {

    return (
        <section className="relative w-full min-h-screen flex flex-col md:flex-row items-center overflow-hidden bg-transparent pt-24 md:pt-48 pb-20 md:pb-32">
            {/* Background Effects */}
            <div className="absolute inset-0 -z-10">
                <div
                    className="grid-background opacity-20"
                    style={{
                        maskImage: 'linear-gradient(to bottom, transparent, black 15%, black 100%)',
                        WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 15%, black 100%)'
                    }}
                />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none" />
            </div>

            <div className="container relative z-10 px-4 mx-auto">
                {/* Navbar Spacer for all views to match marketing/mobile fixes */}
                <div className="h-[100px] md:h-[140px] w-full" />

                <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-0">
                    {/* Left side: Heading and Text */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="w-full lg:w-3/5"
                    >
                        <h1 className="text-5xl md:text-8xl font-black text-white mb-8 leading-[1.1] tracking-tight">
                            {title} <br />
                            {highlight && <span className="gradient-text-tech">{highlight}</span>}
                        </h1>
                        <p className="text-gray-400 text-lg md:text-xl mb-10 max-w-2xl leading-relaxed">
                            {description}
                        </p>
                        <div className="flex flex-wrap items-center gap-6">
                            <Button variant="default" className="btn-primary !h-14 !px-10 text-base">
                                <Link href="/contact">Start Your Project</Link>
                            </Button>
                            <Button variant="outline" className="btn-secondary !h-14 !px-10 text-base border-white/10 text-white">
                                <Link href="#process">View Our Process</Link>
                            </Button>
                        </div>
                    </motion.div>

                    {/* Right side: Icon Cloud animation */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="relative w-full lg:w-2/5 flex items-center justify-center"
                    >
                        <div className="relative w-full max-w-[500px] aspect-square flex items-center justify-center">
                            <IconCloud iconSlugs={slugs} />
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
