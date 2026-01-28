"use client";

import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel";
import Image from "next/image";
import Link from "next/link";

interface GalleryHoverCarouselItem {
    id: string;
    title: string;
    summary: string;
    url: string;
    image: string;
}

export default function GalleryHoverCarousel({
    heading = "Featured Projects",
    items = [
        {
            id: "item-1",
            title: "Build Modern UIs",
            summary:
                "Create stunning user interfaces with our comprehensive design system.",
            url: "#",
            image:
                "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop",
        },
        {
            id: "item-2",
            title: "Computer Vision Technology",
            summary:
                "Powerful image recognition and processing capabilities that allow AI systems to analyze, understand, and interpret visual information from the world.",
            url: "#",
            image:
                "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop",
        },
        {
            id: "item-3",
            title: "Machine Learning Automation",
            summary:
                "Self-improving algorithms that learn from data patterns to automate complex tasks and make intelligent decisions with minimal human intervention.",
            url: "#",
            image:
                "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1932&auto=format&fit=crop",
        },
        {
            id: "item-4",
            title: "Predictive Analytics",
            summary:
                "Advanced forecasting capabilities that analyze historical data to predict future trends and outcomes, helping businesses make data-driven decisions.",
            url: "#",
            image:
                "https://images.unsplash.com/photo-1551288049-bbdac8a28a1e?q=80&w=2070&auto=format&fit=crop",
        },
        {
            id: "item-5",
            title: "Neural Network Architecture",
            summary:
                "Sophisticated AI models inspired by human brain structure, capable of solving complex problems through deep learning and pattern recognition.",
            url: "#",
            image:
                "https://images.unsplash.com/photo-1509228468518-180dd4864904?q=80&w=2070&auto=format&fit=crop",
        }
    ],
}: {
    heading?: string;
    demoUrl?: string;
    items?: GalleryHoverCarouselItem[];
}) {
    const [currentIndex, setCurrentIndex] = useState(0);

    const scrollPrev = () => {
        setCurrentIndex((prev) => Math.max(0, prev - 1));
    };

    const scrollNext = () => {
        setCurrentIndex((prev) => Math.min(items.length - 1, prev + 1));
    };

    return (
        <section className="py-32 md:py-48 bg-transparent">
            <div className="container mx-auto px-6">
                <div className="mb-12 flex flex-col justify-between md:mb-16 md:flex-row md:items-end lg:mb-20">
                    <div className="max-w-2xl">
                        <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight tracking-tight mb-4">
                            {heading}
                        </h3>
                        <p className="text-gray-400 text-lg sm:text-xl max-w-xl">
                            Explore our collection of innovative solutions and cutting-edge technologies designed to transform your business.
                        </p>
                    </div>
                    <div className="flex gap-3 mt-8 md:mt-0">
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={scrollPrev}
                            disabled={currentIndex === 0}
                            className="h-12 w-12 rounded-full border-white/10 bg-white/5 hover:bg-white/10 text-white transition-all disabled:opacity-20"
                        >
                            <ChevronLeft className="h-5 w-5" />
                        </Button>
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={scrollNext}
                            disabled={currentIndex === items.length - 1}
                            className="h-12 w-12 rounded-full border-white/10 bg-white/5 hover:bg-white/10 text-white transition-all disabled:opacity-20"
                        >
                            <ChevronRight className="h-5 w-5" />
                        </Button>
                    </div>
                </div>

                <div className="w-full">
                    <Carousel
                        index={currentIndex}
                        onIndexChange={setCurrentIndex}
                        className="w-full"
                    >
                        <CarouselContent className="gap-6">
                            {items.map((item) => (
                                <CarouselItem key={item.id} className="basis-full md:basis-[400px]">
                                    <Link href={item.url} className="group block relative w-full h-[450px] md:h-[400px]">
                                        <Card className="overflow-hidden h-full w-full rounded-3xl border-white/10 bg-black/40 backdrop-blur-xl transition-all duration-500 hover:border-cyan-500/50 hover:shadow-[0_0_40px_rgba(0,212,255,0.1)]">
                                            {/* Image */}
                                            <div className="relative w-full h-1/2 md:h-full transition-all duration-700 ease-in-out md:group-hover:h-3/5">
                                                <Image
                                                    width={500}
                                                    height={400}
                                                    src={item.image}
                                                    alt={item.title}
                                                    className="h-full w-full object-cover object-center grayscale group-hover:grayscale-0 transition-all duration-700"
                                                />
                                                {/* Overlay */}
                                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

                                                {/* Static Title (pre-hover) */}
                                                <div className="absolute bottom-6 left-6 opacity-0 md:opacity-100 md:group-hover:opacity-0 transition-opacity duration-300">
                                                    <h4 className="text-xl font-bold text-white tracking-tight">{item.title}</h4>
                                                </div>
                                            </div>

                                            {/* Content Section - Visible by default on mobile, Hover on desktop */}
                                            <div className="absolute inset-x-0 bottom-0 h-1/2 md:h-0 flex flex-col justify-center px-8 bg-black/80 backdrop-blur-md opacity-100 md:opacity-0 transition-all duration-500 ease-out md:group-hover:h-2/5 md:group-hover:opacity-100 border-t border-white/5 md:border-t-0">
                                                <h4 className="text-xl font-bold text-white mb-2">{item.title}</h4>
                                                <p className="text-gray-400 text-xs md:text-sm leading-relaxed line-clamp-3 mb-4">
                                                    {item.summary}
                                                </p>
                                                <div className="flex items-center text-cyan-400 font-bold text-[10px] md:text-xs uppercase tracking-widest gap-2">
                                                    View Project <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                                                </div>
                                            </div>
                                        </Card>
                                    </Link>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                    </Carousel>
                </div>
            </div>
        </section>
    );
}
