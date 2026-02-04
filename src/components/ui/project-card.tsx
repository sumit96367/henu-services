import * as React from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils"; // Assuming you have a cn utility for merging class names

// Define the props interface for type safety and clarity
export interface ProjectCardProps extends React.HTMLAttributes<HTMLDivElement> {
    imgSrc: string;
    title: string;
    description: string;
    link: string;
    linkText?: string;
}

const ProjectCard = React.forwardRef<HTMLDivElement, ProjectCardProps>(
    ({ className, imgSrc, title, description, link, linkText = "View Project", ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={cn(
                    "group relative flex cursor-pointer flex-col overflow-hidden rounded-3xl bg-white/[0.02] text-card-foreground transition-all duration-500 ease-in-out hover:-translate-y-2 hover:bg-white/[0.04] hover:shadow-2xl hover:shadow-cyan-500/10",
                    className
                )}
                {...props}
            >
                {/* Card Image Section */}
                <div className="aspect-video overflow-hidden">
                    <img
                        src={imgSrc}
                        alt={title}
                        className="h-full w-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
                        loading="lazy"
                    />
                </div>

                {/* Card Content Section */}
                <div className="flex flex-1 flex-col p-8 md:p-10">
                    <h3 className="text-xl font-semibold text-white transition-colors duration-300 group-hover:text-cyan-400">
                        {title}
                    </h3>
                    <p className="mt-3 flex-1 text-gray-400 leading-relaxed">{description}</p>

                    {/* Card Link/CTA */}
                    <a
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/button mt-4 inline-flex items-center gap-2 text-sm font-medium text-cyan-400 transition-all duration-300 hover:text-cyan-300"
                        onClick={(e) => e.stopPropagation()} // Prevent card's onClick if it has one
                    >
                        {linkText}
                        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/button:translate-x-1" />
                    </a>
                </div>
            </div>
        );
    }
);
ProjectCard.displayName = "ProjectCard";

export { ProjectCard };
