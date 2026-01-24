"use client"

import * as React from "react"
import { useState, useRef } from "react"
import { cn } from "@/lib/utils"
import { ExternalLink, Github, ArrowUpRight } from "lucide-react"

interface Project {
    id: number
    title: string
    description: string
    image: string
    tags: string[]
    liveUrl?: string
    githubUrl?: string
    color: string
}

interface ProjectCardProps {
    project: Project
    className?: string
}

export function ProjectCard({ project, className }: ProjectCardProps) {
    const [isHovered, setIsHovered] = useState(false)
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
    const cardRef = useRef<HTMLDivElement>(null)

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return
        const rect = cardRef.current.getBoundingClientRect()
        setMousePosition({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        })
    }

    return (
        <div
            ref={cardRef}
            className={cn(
                "group relative rounded-2xl overflow-hidden cursor-pointer",
                className
            )}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onMouseMove={handleMouseMove}
        >
            {/* Background gradient */}
            <div
                className="absolute inset-0 opacity-60"
                style={{
                    background: `linear-gradient(135deg, ${project.color}20 0%, transparent 50%)`,
                }}
            />

            {/* Spotlight effect */}
            {isHovered && (
                <div
                    className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-300"
                    style={{
                        background: `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.1), transparent 60%)`,
                    }}
                />
            )}

            {/* Card content */}
            <div className="relative z-20 p-6 md:p-8 h-full flex flex-col border border-white/10 rounded-2xl bg-gradient-to-br from-white/5 to-transparent backdrop-blur-sm">
                {/* Image placeholder */}
                <div
                    className="aspect-video rounded-xl mb-6 md:mb-8 overflow-hidden relative group-hover:scale-[1.02] transition-transform duration-500"
                    style={{
                        background: `linear-gradient(135deg, ${project.color}30 0%, ${project.color}10 100%)`,
                    }}
                >
                    {/* Decorative mesh pattern */}
                    <div className="absolute inset-0 opacity-40">
                        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.05),transparent_70%)]" />
                        <div className="absolute top-4 left-4 w-20 h-20 border-t border-l border-white/20 rounded-tl-2xl" />
                        <div className="absolute bottom-4 right-4 w-20 h-20 border-b border-r border-white/20 rounded-br-2xl" />
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-gradient-to-tr from-primary/5 via-white/5 to-transparent blur-3xl" />
                    </div>

                    <div className="absolute inset-0 flex items-center justify-center p-8">
                        <div className="relative w-full h-full flex items-center justify-center">
                            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent blur-xl rounded-full scale-75 opacity-50" />
                            <div className="w-16 h-16 border border-white/20 rounded-full animate-float-slow" />
                            <div className="absolute w-12 h-12 border border-white/10 rounded-xl -rotate-12 animate-pulse" />
                        </div>
                    </div>

                    {/* Hover overlay */}
                    <div
                        className={cn(
                            "absolute inset-0 bg-black/50 flex items-center justify-center gap-4 transition-opacity duration-300",
                            isHovered ? "opacity-100" : "opacity-0"
                        )}
                    >
                        {project.liveUrl && (
                            <a
                                href={project.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
                            >
                                <ExternalLink className="w-5 h-5 text-white" />
                            </a>
                        )}
                        {project.githubUrl && (
                            <a
                                href={project.githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
                            >
                                <Github className="w-5 h-5 text-white" />
                            </a>
                        )}
                    </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 md:gap-3 mb-5 md:mb-6">
                    {project.tags.map((tag, index) => (
                        <span
                            key={index}
                            className="px-3 md:px-4 py-1.5 md:py-2 text-xs md:text-sm font-medium rounded-full bg-white/5 text-white/70 border border-white/10"
                        >
                            {tag}
                        </span>
                    ))}
                </div>

                {/* Title and description */}
                <h3 className="text-xl md:text-2xl font-bold text-white mb-3 md:mb-4 group-hover:text-primary transition-colors">
                    {project.title}
                </h3>
                <p className="text-white/60 text-sm md:text-base flex-grow line-clamp-3 leading-relaxed mb-4">
                    {project.description}
                </p>

                {/* View project link */}
                <div className="mt-auto pt-2 flex items-center gap-2 md:gap-3 text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-sm md:text-base font-medium">View Project</span>
                    <ArrowUpRight className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" />
                </div>
            </div>
        </div>
    )
}

// Bento-style project grid
interface ProjectGridProps {
    projects: Project[]
    className?: string
}

export function ProjectGrid({ projects, className }: ProjectGridProps) {
    return (
        <div className={cn("grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10", className)}>
            {projects.map((project, index) => (
                <ProjectCard
                    key={project.id}
                    project={project}
                    className={cn(
                        // Make first item span 2 columns on larger screens
                        index === 0 && "md:col-span-2 lg:col-span-2"
                    )}
                />
            ))}
        </div>
    )
}

// Featured project with larger display
interface FeaturedProjectProps {
    project: Project
    className?: string
    reverse?: boolean
}

export function FeaturedProject({ project, className, reverse = false }: FeaturedProjectProps) {
    return (
        <div
            className={cn(
                "grid md:grid-cols-2 gap-8 md:gap-10 lg:gap-12 items-center",
                reverse && "md:grid-flow-dense",
                className
            )}
        >
            {/* Image */}
            <div
                className={cn(
                    "aspect-video rounded-2xl overflow-hidden relative group",
                    reverse && "md:col-start-2"
                )}
                style={{
                    background: `linear-gradient(135deg, ${project.color}30 0%, ${project.color}10 100%)`,
                }}
            >
                {/* Decorative mesh pattern */}
                <div className="absolute inset-0 opacity-30">
                    <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_20%,rgba(255,255,255,0.1),transparent_70%)]" />
                    <div className="absolute top-8 left-8 w-32 h-32 border-t-2 border-l-2 border-white/20 rounded-tl-3xl" />
                    <div className="absolute bottom-8 right-8 w-32 h-32 border-b-2 border-r-2 border-white/20 rounded-br-3xl" />
                </div>

                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative w-full h-full flex items-center justify-center">
                        <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full scale-150" />
                        <div className="w-32 h-32 border-2 border-white/20 rounded-full animate-float-slow" />
                        <div className="absolute w-24 h-24 border border-white/10 rounded-3xl rotate-12 animate-pulse" />
                        <div className="absolute w-16 h-16 bg-white/5 backdrop-blur-3xl rounded-full" />
                    </div>
                </div>

                {/* Hover links */}
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {project.liveUrl && (
                        <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-6 py-3 bg-white text-black rounded-full font-medium hover:bg-white/90 transition-colors flex items-center gap-2"
                        >
                            <ExternalLink className="w-4 h-4" />
                            Live Demo
                        </a>
                    )}
                    {project.githubUrl && (
                        <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-6 py-3 bg-white/10 text-white rounded-full font-medium hover:bg-white/20 transition-colors flex items-center gap-2"
                        >
                            <Github className="w-4 h-4" />
                            Source
                        </a>
                    )}
                </div>
            </div>

            {/* Content */}
            <div className={cn(reverse && "md:col-start-1 md:row-start-1", "space-y-6")}>
                <div className="flex flex-wrap gap-2 md:gap-3">
                    {project.tags.map((tag, index) => (
                        <span
                            key={index}
                            className="px-3 md:px-4 py-1.5 md:py-2 text-xs md:text-sm font-medium rounded-full bg-primary/10 text-primary border border-primary/20"
                        >
                            {tag}
                        </span>
                    ))}
                </div>

                <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">{project.title}</h3>
                <p className="text-white/60 text-base md:text-lg lg:text-xl leading-relaxed">
                    {project.description}
                </p>

                <a
                    href={project.liveUrl || "#"}
                    className="inline-flex items-center gap-2 md:gap-3 text-primary hover:text-primary/80 transition-colors group"
                >
                    <span className="font-medium text-base md:text-lg">Explore Project</span>
                    <ArrowUpRight className="w-5 h-5 md:w-6 md:h-6 flex-shrink-0 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </a>
            </div>
        </div>
    )
}
