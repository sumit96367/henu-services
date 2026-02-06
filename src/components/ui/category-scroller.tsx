"use client";

export const CategoryScroller = ({ categories }: { categories: string[] }) => {
    return (
        <div className="group flex overflow-hidden py-2 [--gap:3rem] [gap:var(--gap)] flex-row max-w-full [--duration:40s] [mask-image:linear-gradient(to_right,_rgba(0,_0,_0,_0),rgba(0,_0,_0,_1)_10%,rgba(0,_0,_0,_1)_90%,rgba(0,_0,_0,_0))]">
            {Array(4)
                .fill(0)
                .map((_, i) => (
                    <div
                        className="flex shrink-0 justify-around [gap:var(--gap)] animate-marquee flex-row"
                        key={i}
                    >
                        {categories.map((category, index) => (
                            <div key={`${i}-${index}`} className="flex items-center">
                                <p className="text-[20px] font-medium text-white/60 whitespace-nowrap tracking-wide">
                                    {category}
                                </p>
                            </div>
                        ))}
                    </div>
                ))}
        </div>
    );
};
