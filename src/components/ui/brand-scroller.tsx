"use client";

/**
 * Brand Scroller Component
 * 
 * Displays technology names in an infinite scrolling marquee animation.
 * Two variants: standard (left scroll) and reverse (right scroll)
 */

interface BrandScrollerProps {
    technologies: string[];
}

export const BrandScroller = ({ technologies }: BrandScrollerProps) => {
    return (
        <div className="group flex overflow-hidden py-2 [--gap:4rem] [gap:var(--gap)] flex-row max-w-full [--duration:40s] [mask-image:linear-gradient(to_right,_rgba(0,_0,_0,_0),rgba(0,_0,_0,_1)_10%,rgba(0,_0,_0,_1)_90%,rgba(0,_0,_0,_0))]">
            {Array(4)
                .fill(0)
                .map((_, i) => (
                    <div
                        className="flex shrink-0 justify-around [gap:var(--gap)] animate-marquee flex-row"
                        key={i}
                    >
                        {technologies.map((tech, index) => (
                            <div className="flex items-center gap-3 whitespace-nowrap min-w-fit" key={`${tech}-${index}`}>
                                <p className="text-xl font-bold opacity-80 text-white">
                                    {tech}
                                </p>
                            </div>
                        ))}
                    </div>
                ))}
        </div>
    );
};

export const BrandScrollerReverse = ({ technologies }: BrandScrollerProps) => {
    return (
        <div className="group flex overflow-hidden py-2 [--gap:4rem] [gap:var(--gap)] flex-row max-w-full [--duration:40s] [mask-image:linear-gradient(to_right,_rgba(0,_0,_0,_0),rgba(0,_0,_0,_1)_10%,rgba(0,_0,_0,_1)_90%,rgba(0,_0,_0,_0))]">
            {Array(4)
                .fill(0)
                .map((_, i) => (
                    <div
                        className="flex shrink-0 justify-around [gap:var(--gap)] animate-marquee-reverse flex-row"
                        key={i}
                    >
                        {technologies.map((tech, index) => (
                            <div className="flex items-center gap-3 whitespace-nowrap min-w-fit" key={`${tech}-${index}`}>
                                <p className="text-xl font-bold opacity-80 text-white">
                                    {tech}
                                </p>
                            </div>
                        ))}
                    </div>
                ))}
        </div>
    );
};
