"use client";

import { ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

interface GalleryHoverGridItem {
    id: string;
    title: string;
    summary: string;
    url: string;
    image: string;
}

export default function GalleryHoverGrid({
    heading = "Our Expertise",
    items = [],
    description = "Explore our collection of innovative solutions and cutting-edge technologies designed to transform your business."
}: {
    heading?: string;
    items?: GalleryHoverGridItem[];
    description?: string;
}) {
    return (
        <section className="py-24 bg-transparent">
            <div className="container mx-auto px-6">
                <div className="mb-12 flex flex-col justify-between md:mb-16 md:flex-row md:items-end lg:mb-20">
                    <div className="max-w-2xl text-left">
                        <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight tracking-tight mb-4">
                            {heading}
                        </h3>
                        <p className="text-gray-400 text-lg sm:text-xl max-w-xl">
                            {description}
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {items.map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            viewport={{ once: true }}
                        >
                            <Link href={item.url} className="group block relative w-full h-[500px] md:h-[450px]">
                                <Card className="overflow-hidden h-full w-full rounded-3xl border-white/10 bg-black/40 backdrop-blur-xl transition-all duration-500 hover:border-cyan-500/50 hover:shadow-[0_0_40px_rgba(0,212,255,0.1)]">
                                    {/* Image */}
                                    <div className="relative w-full h-1/2 md:h-full transition-all duration-700 ease-in-out md:group-hover:h-3/5">
                                        <Image
                                            width={600}
                                            height={450}
                                            src={item.image}
                                            alt={item.title}
                                            className="h-full w-full object-cover object-center grayscale group-hover:grayscale-0 transition-all duration-700"
                                        />
                                        {/* Overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

                                        {/* Static Title (pre-hover) - Hidden on mobile if content is visible */}
                                        <div className="absolute bottom-8 left-8 opacity-0 md:opacity-100 md:group-hover:opacity-0 transition-opacity duration-300">
                                            <h4 className="text-2xl font-bold text-white tracking-tight">{item.title}</h4>
                                        </div>
                                    </div>

                                    {/* Content Section - Visible by default on mobile, Hover on desktop */}
                                    <div className="absolute inset-x-0 bottom-0 h-1/2 md:h-0 flex flex-col justify-center px-8 md:px-10 bg-black/80 backdrop-blur-md opacity-100 md:opacity-0 transition-all duration-500 ease-out md:group-hover:h-2/5 md:group-hover:opacity-100 border-t border-white/5 md:border-t-0">
                                        <h4 className="text-2xl font-bold text-white mb-3">{item.title}</h4>
                                        <p className="text-gray-400 text-sm md:text-base leading-relaxed line-clamp-3 mb-6">
                                            {item.summary}
                                        </p>
                                        <div className="flex items-center text-cyan-400 font-bold text-xs md:text-sm uppercase tracking-widest gap-2">
                                            Learn More <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                        </div>
                                    </div>
                                </Card>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
