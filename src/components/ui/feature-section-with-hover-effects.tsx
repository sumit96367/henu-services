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
    // Determine grid columns based on feature count
    const gridCols = features.length <= 4
        ? 'lg:grid-cols-2'
        : features.length <= 6
            ? 'lg:grid-cols-3'
            : 'lg:grid-cols-4';

    const cols = features.length <= 4 ? 2 : features.length <= 6 ? 3 : 4;

    return (
        <div className={cn(
            "grid grid-cols-1 md:grid-cols-2 relative z-10 py-10 w-full px-4 md:px-8",
            gridCols,
            className
        )}>
            {features.map((feature, index) => (
                <Feature
                    key={feature.title}
                    {...feature}
                    index={index}
                    accentColor={accentColor}
                    totalFeatures={features.length}
                    cols={cols}
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
    totalFeatures,
    cols,
}: {
    title: string;
    description: string;
    icon: ReactNode;
    index: number;
    accentColor: 'cyan' | 'amber';
    totalFeatures: number;
    cols: number;
}) => {
    // Calculate rows for border logic
    const isFirstCol = index % cols === 0;
    const isLastCol = index % cols === cols - 1;
    const isTopRow = index < cols;
    const isBottomRow = index >= totalFeatures - (totalFeatures % cols || cols);


    const accentColorClass = accentColor === 'cyan'
        ? 'group-hover/feature:bg-cyan-500'
        : 'group-hover/feature:bg-amber-500';

    const gradientFrom = accentColor === 'cyan'
        ? 'from-cyan-500/10'
        : 'from-amber-500/10';

    return (
        <div
            className={cn(
                "flex flex-col lg:border-r py-10 relative group/feature border-white/10",
                isFirstCol && "lg:border-l border-white/10",
                !isBottomRow && "lg:border-b border-white/10"
            )}
        >
            {/* Hover gradient - top rows get bottom-to-top, bottom rows get top-to-bottom */}
            {isTopRow && (
                <div className={cn(
                    "opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t to-transparent pointer-events-none",
                    gradientFrom
                )} />
            )}
            {!isTopRow && (
                <div className={cn(
                    "opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b to-transparent pointer-events-none",
                    gradientFrom
                )} />
            )}

            {/* Icon */}
            <div
                className={cn(
                    "mb-4 relative z-10",
                    accentColor === 'cyan' ? 'text-cyan-400' : 'text-amber-400'
                )}
                style={{ paddingLeft: '32px', paddingRight: '16px' }}
            >
                {icon}
            </div>

            {/* Title with animated accent bar */}
            <div className="text-lg font-bold mb-2 relative z-10" style={{ paddingLeft: '32px', paddingRight: '16px' }}>
                <div className={cn(
                    "absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-white/20 transition-all duration-200 origin-center",
                    accentColorClass
                )} />
                <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-white">
                    {title}
                </span>
            </div>

            {/* Description */}
            <p className="text-sm text-gray-400 max-w-xs relative z-10" style={{ paddingLeft: '32px', paddingRight: '16px' }}>
                {description}
            </p>
        </div>
    );
};

export default FeaturesSectionWithHoverEffects;
