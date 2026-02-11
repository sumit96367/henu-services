"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { Monitor, LayoutDashboard, Users } from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

// Avoid SSR hydration issues by loading react-countup on the client.
const CountUp = dynamic(() => import("react-countup"), { ssr: false });

/** Hook: respects user's motion preferences */
function usePrefersReducedMotion() {
    const [reduced, setReduced] = useState(false);
    useEffect(() => {
        if (typeof window === "undefined" || !("matchMedia" in window)) return;
        const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
        const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
        setReduced(mq.matches);
        mq.addEventListener?.("change", onChange);
        return () => mq.removeEventListener?.("change", onChange);
    }, []);
    return reduced;
}

/** Utility: parse a metric like "98%", "3.8x", "$1,200+", "1.5M", "€23.4k" */
function parseMetricValue(raw: string) {
    const value = (raw ?? "").toString().trim();
    const m = value.match(
        /^([^\d\-+]*?)\s*([\-+]?\d{1,3}(?:,\d{3})*(?:\.\d+)?)\s*([^\d\s]*)$/
    );
    if (!m) {
        return { prefix: "", end: 0, suffix: value, decimals: 0 };
    }
    const [, prefix, num, suffix] = m;
    const normalized = num.replace(/,/g, "");
    const end = parseFloat(normalized);
    const decimals = (normalized.split(".")[1]?.length ?? 0);
    return {
        prefix: prefix ?? "",
        end: isNaN(end) ? 0 : end,
        suffix: suffix ?? "",
        decimals,
    };
}

/** Small component: one animated metric */
function MetricStat({
    value,
    label,
    sub,
    duration = 1.6,
}: {
    value: string;
    label: string;
    sub?: string;
    duration?: number;
}) {
    const reduceMotion = usePrefersReducedMotion();
    const { prefix, end, suffix, decimals } = parseMetricValue(value);

    return (
        <div className="flex flex-col gap-2 text-left p-10 md:p-14">
            <p
                className="text-2xl font-bold text-white sm:text-5xl tracking-tighter"
                aria-label={`${label} ${value}`}
            >
                <span className="text-cyan-400">{prefix}</span>
                {reduceMotion ? (
                    <span>
                        {end.toLocaleString(undefined, {
                            minimumFractionDigits: decimals,
                            maximumFractionDigits: decimals,
                        })}
                    </span>
                ) : (
                    <CountUp
                        end={end}
                        decimals={decimals}
                        duration={duration}
                        separator=","
                        enableScrollSpy
                        scrollSpyOnce
                    />
                )}
                <span className="text-cyan-400">{suffix}</span>
            </p>
            <p className="text-lg font-bold text-white text-left uppercase tracking-widest">
                {label}
            </p>
            {sub ? (
                <p className="text-gray-500 text-left text-sm font-medium">{sub}</p>
            ) : null}
        </div>
    );
}

/** Image Carousel Component for Animated Images */
function ImageCarousel({ images, name }: { images: string[]; name: string }) {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 3000); // Change image every 3 seconds

        return () => clearInterval(interval);
    }, [images.length]);

    return (
        <div className="relative shrink-0 w-full max-w-60 aspect-[29/35]">
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.05 }}
                    transition={{ duration: 0.7, ease: "easeInOut" }}
                    className="absolute inset-0"
                >
                    <div className="absolute inset-0 bg-cyan-500/20 blur-2xl rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                    <Image
                        src={images[currentIndex]}
                        alt={`${name} portrait ${currentIndex + 1}`}
                        width={300}
                        height={400}
                        className="aspect-[29/35] h-full w-full rounded-2xl object-cover ring-1 ring-white/10 hover:scale-[1.05] transition-all duration-500 shadow-2xl relative z-10"
                        loading="lazy"
                        unoptimized
                    />
                </motion.div>
            </AnimatePresence>
        </div>
    );
}

export default function Casestudies() {
    const caseStudies = [
        {
            id: 1,
            quote:
                "At Henu OS, we build with clarity, not noise. Every system we create is designed to scale before it is designed to sell, because real technology earns trust through performance. Our decisions are driven by data, engineered with intent, and tested in real-world conditions. We believe long-term partnerships matter more than short-term speed, and that disciplined execution is what turns vision into reliable systems.",
            name: "Siddharth Singh",
            role: "Founder & CEO",
            images: [
                "/Siddharth1.jpeg",
                "/Siddharth2.jpeg",
                "/Siddharth3.jpeg",
            ],
            icon: Monitor,
            metrics: [
                { value: "200+", label: "Production Systems Live", sub: "Active deployments" },
                { value: "98%", label: "Client Retention Rate", sub: "Year-over-year" },
            ],
        },
    ];

    return (
        <section
            className="py-24 md:py-[120px] bg-transparent"
            style={{ marginTop: '1cm' }}
            aria-labelledby="case-studies-heading"
        >
            <div className="container mx-auto px-6">
                {/* Cases */}
                <div className="flex flex-col gap-32">
                    {caseStudies.map((study, idx) => {
                        const reversed = idx % 2 === 1;
                        return (
                            <div
                                key={study.id}
                                className="grid gap-16 lg:grid-cols-3 xl:gap-24 items-center border-b border-white/5 pb-[120px]"
                            >
                                {/* Left: Image + Quote */}
                                <div
                                    className={[
                                        "flex flex-col sm:flex-row gap-12 lg:col-span-2 text-left",
                                        reversed
                                            ? "lg:order-2 lg:border-l border-white/5 lg:pl-16 lg:pr-0"
                                            : "lg:border-r border-white/5 lg:pr-16 lg:pl-0",
                                    ].join(" ")}
                                >
                                    <ImageCarousel images={study.images} name={study.name} />

                                    <figure className="flex flex-col justify-between gap-10 text-left py-4">
                                        <blockquote className="text-left">
                                            <p className="text-xl sm:text-2xl font-medium text-gray-200 leading-relaxed text-left relative">
                                                <span className="text-gray-400 mr-1">"</span>
                                                {study.quote.replace(/^"|"$/g, '')}
                                                <span className="text-gray-400 ml-1">"</span>
                                            </p>
                                        </blockquote>
                                        <figcaption className="flex items-center gap-6 mt-4 text-left border-l-2 border-cyan-500/50 pl-6">
                                            <div className="flex flex-col gap-1">
                                                <span className="text-xl font-bold text-white tracking-tight">
                                                    {study.name}
                                                </span>
                                                <span className="text-sm font-black uppercase tracking-[0.2em] text-gray-500">
                                                    {study.role}
                                                </span>
                                            </div>
                                        </figcaption>
                                    </figure>
                                </div>

                                {/* Right: Metrics */}
                                <div
                                    className={[
                                        "grid grid-cols-1 gap-12 self-center text-left",
                                        reversed ? "lg:order-1" : "",
                                    ].join(" ")}
                                >
                                    {study.metrics.map((metric, i) => (
                                        <MetricStat
                                            key={`${study.id}-${i}`}
                                            value={metric.value}
                                            label={metric.label}
                                            sub={metric.sub}
                                        />
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
