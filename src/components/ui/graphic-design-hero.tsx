"use client";

import {
    ContainerAnimated,
    ContainerScroll,
    ContainerStagger,
    ContainerSticky,
    GalleryCol,
    GalleryContainer
} from "@/components/ui/animated-gallery";
import { Button } from "@/components/ui/button";
import { ArrowRight, Palette } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const IMAGES_1 = [
    "https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=2071&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=1964&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=2000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1572044162444-ad60f128bde2?q=80&w=2070&auto=format&fit=crop",
];
const IMAGES_2 = [
    "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1542744095-291d1f67b221?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=2071&auto=format&fit=crop",
];
const IMAGES_3 = [
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1558655146-9f40138edfeb?q=80&w=1964&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=2000&auto=format&fit=crop",
];

export default function GraphicDesignHero() {
    return (
        <div className="relative w-full bg-black">
            {/* Desktop Spacer managed by parent container usually, but we need high clearance */}
            <div className="h-[100px] md:h-[140px] w-full" />

            <ContainerStagger className="relative z-20 px-6 pt-12 md:pt-12 text-center flex flex-col items-center">
                <ContainerAnimated>
                    <h1 className="text-4xl md:text-8xl font-black text-white mb-4 leading-[1.1] tracking-tight">
                        Your <span className="gradient-text-tech">Vision</span> <br />
                        Brought to Life
                    </h1>
                </ContainerAnimated>

                <ContainerAnimated className="my-4 md:my-6">
                    <p className="text-gray-300 text-base md:text-xl max-w-2xl mx-auto leading-relaxed">
                        Stunning, high-impact designs that define your brand. We combine
                        artistic mastery with strategic thinking to create visuals that convert.
                    </p>
                </ContainerAnimated>

                <ContainerAnimated className="flex flex-wrap justify-center gap-4 md:gap-6 mt-2 md:mt-4">
                    <Button asChild className="btn-primary !h-12 md:!h-14 !px-8 md:!px-10 text-sm md:text-base">
                        <Link href="/contact" className="flex items-center gap-2">
                            Start Your Project <ArrowRight size={18} />
                        </Link>
                    </Button>
                    <Button asChild variant="outline" className="btn-secondary !h-12 md:!h-14 !px-8 md:!px-10 text-sm md:text-base border-white/10 text-white">
                        <Link href="#portfolio">View Portfolio</Link>
                    </Button>
                </ContainerAnimated>
            </ContainerStagger>

            {/* Background Glow */}
            <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center overflow-hidden">
                <div
                    className="h-[50vh] md:h-[70vh] w-full opacity-30"
                    style={{
                        background: "radial-gradient(circle at center, rgba(6, 182, 212, 0.15), rgba(168, 85, 247, 0.15), transparent 70%)",
                        filter: "blur(84px)",
                    }}
                />
            </div>

            <ContainerScroll className="relative h-[250vh] md:h-[300vh] mt-[-5vh] w-full">
                <ContainerSticky className="h-screen flex items-center w-full">
                    <GalleryContainer className="w-full px-4 md:px-10 lg:px-20 gap-4 md:gap-8 grid-cols-1 md:grid-cols-3">
                        <GalleryCol yRange={["-10%", "5%"]} className="-mt-12 hidden md:flex">
                            {IMAGES_1.map((imageUrl, index) => (
                                <div key={index} className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                                    <img
                                        className="h-full w-full object-cover"
                                        src={imageUrl}
                                        alt={`Design piece ${index + 1}`}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
                                </div>
                            ))}
                        </GalleryCol>
                        <GalleryCol className="mt-0 md:mt-[-40%]" yRange={["10%", "0%"]}>
                            {IMAGES_2.map((imageUrl, index) => (
                                <div key={index} className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                                    <img
                                        className="h-full w-full object-cover"
                                        src={imageUrl}
                                        alt={`Design piece ${index + 5}`}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
                                </div>
                            ))}
                        </GalleryCol>
                        <GalleryCol yRange={["-15%", "10%"]} className="-mt-12 hidden md:flex">
                            {IMAGES_3.map((imageUrl, index) => (
                                <div key={index} className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                                    <img
                                        className="h-full w-full object-cover"
                                        src={imageUrl}
                                        alt={`Design piece ${index + 9}`}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
                                </div>
                            ))}
                        </GalleryCol>
                    </GalleryContainer>
                </ContainerSticky>
            </ContainerScroll>
        </div>
    );
}
