'use client';

import { cn } from "@/lib/utils";
import { ReactNode } from "react";

// Feature type for external use
export interface FeatureItem {
    title: string;
    description: string;
    icon: ReactNode;
}

interface FeaturesSectionProps {
    features: FeatureItem[];
    accentColor?: 'cyan' | 'amber';
    className?: string;
}

export function FeaturesSectionWithHoverEffects({
    features,
    accentColor = 'cyan',
    className
}: FeaturesSectionProps) {
    return (
        <div className={cn(
            "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 relative z-10 py-10 max-w-7xl mx-auto",
            className
        )}>
            {features.map((feature, index) => (
                <Feature
                    key={feature.title}
                    {...feature}
                    index={index}
                    accentColor={accentColor}
                />
            ))}
        </div>
    );
}

const Feature = ({
    title,
    description,
    icon,
    index,
    accentColor,
}: {
    title: string;
    description: string;
    icon: ReactNode;
    index: number;
    accentColor: 'cyan' | 'amber';
}) => {
    // Determine the hover accent color based on accentColor prop
    const hoverColorClass = accentColor === 'cyan'
        ? 'group-hover/feature:bg-cyan-500'
        : 'group-hover/feature:bg-amber-500';

    return (
        <div
            className={cn(
                "flex flex-col lg:border-r py-10 relative group/feature dark:border-neutral-800",
                (index === 0 || index === 4) && "lg:border-l dark:border-neutral-800",
                index < 4 && "lg:border-b dark:border-neutral-800"
            )}
        >
            {index < 4 && (
                <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
            )}
            {index >= 4 && (
                <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
            )}
            <div className="mb-4 relative z-10 px-10 text-neutral-600 dark:text-neutral-400">
                {icon}
            </div>
            <div className="text-lg font-bold mb-2 relative z-10 px-10">
                <div className={cn(
                    "absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-neutral-300 dark:bg-neutral-700 transition-all duration-200 origin-center",
                    hoverColorClass
                )} />
                <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-neutral-800 dark:text-neutral-100">
                    {title}
                </span>
            </div>
            <p className="text-sm text-neutral-600 dark:text-neutral-300 max-w-xs relative z-10 px-10">
                {description}
            </p>
        </div>
    );
};

export default FeaturesSectionWithHoverEffects;
