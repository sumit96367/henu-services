"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { Monitor, LayoutDashboard, Users } from "lucide-react";
import Image from "next/image";

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
        <div className="flex flex-col gap-2 text-left p-6">
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

export default function Casestudies() {
    const caseStudies = [
        {
            id: 1,
            quote:
                "HENU OS transformed our digital infrastructure. Their components are reusable, consistent, and we ship new features 40% faster.",
            name: "Aarav Mehta",
            role: "Frontend Engineer",
            image:
                "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop",
            icon: Monitor,
            metrics: [
                { value: "40%", label: "Faster Delivery", sub: "Feature shipping speed" },
                { value: "95%", label: "Developer Satisfaction", sub: "Based on internal survey" },
            ],
        },
        {
            id: 2,
            quote:
                "The unified dashboard experience from HENU OS reduced our time spent on context switching and improved clarity across all projects.",
            name: "Sophia Patel",
            role: "Operations Manager",
            image:
                "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop",
            icon: LayoutDashboard,
            metrics: [
                { value: "3.5x", label: "Efficiency Gain", sub: "Across workflows" },
                { value: "70%", label: "Reduced Errors", sub: "In daily reporting" },
            ],
        },
        {
            id: 3,
            quote:
                "The collaborative features changed the way our team communicates. Everything is more transparent, and onboarding is seamless.",
            name: "David Liu",
            role: "Team Lead",
            image:
                "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop",
            icon: Users,
            metrics: [
                { value: "2x", label: "Faster Onboarding", sub: "For new hires" },
                { value: "88%", label: "Collaboration Boost", sub: "Teamwide adoption" },
            ],
        },
    ];

    return (
        <section
            className="py-16 md:py-24 bg-transparent"
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
                                className="grid gap-16 lg:grid-cols-3 xl:gap-24 items-center border-b border-white/5 pb-20"
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
                                    <div className="relative shrink-0">
                                        <div className="absolute inset-0 bg-cyan-500/20 blur-2xl rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                                        <Image
                                            src={study.image}
                                            alt={`${study.name} portrait`}
                                            width={300}
                                            height={400}
                                            className="aspect-[29/35] h-auto w-full max-w-60 rounded-2xl object-cover ring-1 ring-white/10 hover:scale-[1.05] transition-all duration-500 shadow-2xl relative z-10"
                                            loading="lazy"
                                        />
                                    </div>

                                    <figure className="flex flex-col justify-between gap-10 text-left py-4">
                                        <blockquote className="text-left">
                                            <h3 className="text-2xl sm:text-3xl font-bold text-white leading-[1.3] text-left">
                                                <span className="text-cyan-400 italic font-serif text-5xl block mb-4">"</span>
                                                {study.quote}
                                                <span className="text-cyan-400 italic font-serif text-5xl block mt-2 text-right">"</span>
                                            </h3>
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
