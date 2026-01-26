"use client";

import * as React from "react";

import { useMeasure } from "@uidotdev/usehooks";
import { VariantProps, cva } from "class-variance-authority";
import {
    HTMLMotionProps,
    MotionValue,
    motion,
    useScroll,
    useTransform,
} from "motion/react";

import { cn } from "@/lib/utils";

const processCardVariants = cva("flex border backdrop-blur-lg rounded-2xl", {
    variants: {
        variant: {
            cyan:
                "text-white border-cyan-500/20 backdrop-blur-lg bg-gradient-to-br from-[rgba(10,10,10,0.7)_40%] to-[rgba(0,212,255,0.15)_120%]",
            amber:
                "text-white border-amber-500/20 backdrop-blur-lg bg-gradient-to-br from-[rgba(10,10,10,0.7)_40%] to-[rgba(255,149,0,0.15)_120%]",
        },
        size: {
            sm: "min-w-[25%] max-w-[25%]",
            md: "min-w-[50%] max-w-[50%]",
            lg: "min-w-[75%] max-w-[75%]",
            xl: "min-w-full max-w-full",
        },
    },
    defaultVariants: {
        variant: "cyan",
        size: "md",
    },
});

interface ContainerScrollContextValue {
    scrollYProgress: MotionValue<number>;
}

interface ProcessCardProps
    extends HTMLMotionProps<"div">,
    VariantProps<typeof processCardVariants> {
    itemsLength: number;
    index: number;
}

const ContainerScrollContext = React.createContext<
    ContainerScrollContextValue | undefined
>(undefined);

function useContainerScrollContext() {
    const context = React.useContext(ContainerScrollContext);
    if (!context) {
        throw new Error(
            "useContainerScrollContext must be used within a ContainerScroll Component"
        );
    }
    return context;
}

export const ContainerScroll = ({
    children,
    className,
    ...props
}: React.HtmlHTMLAttributes<HTMLDivElement>) => {
    const scrollRef = React.useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: scrollRef,
        offset: ["start end", "end start"], // Trigger when entering viewport
    });
    return (
        <ContainerScrollContext.Provider value={{ scrollYProgress }}>
            <div
                ref={scrollRef}
                className={cn("relative min-h-[150vh]", className)}
                {...props}
            >
                {children}
            </div>
        </ContainerScrollContext.Provider>
    );
};

export const ContainerSticky = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn("sticky left-0 top-0 w-full overflow-hidden", className)}
        {...props}
    />
));
ContainerSticky.displayName = "ContainerSticky";

export const ProcessCardTitle = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div ref={ref} className={cn("p-6", className)} {...props} />
));
ProcessCardTitle.displayName = "ProcessCardTitle";

export const ProcessCardBody = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn("flex flex-col gap-8 p-6", className)}
        {...props}
    />
));
ProcessCardBody.displayName = "ProcessCardBody";

export const ProcessCard: React.FC<ProcessCardProps> = ({
    className,
    style,
    variant,
    size,
    itemsLength,
    index,
    ...props
}) => {
    const { scrollYProgress } = useContainerScrollContext();
    const start = index / itemsLength;
    const end = start + 1 / itemsLength;

    const [ref, { width }] = useMeasure();
    const [innerWidth, setInnerWidth] = React.useState(0);

    React.useEffect(() => {
        setInnerWidth(window.innerWidth);
    }, []);

    const x = useTransform(
        scrollYProgress,
        [start, end],
        [innerWidth, -((width ?? 0) * index) + 64 * index]
    );

    return (
        <motion.div
            ref={ref}
            style={{
                x: index > 0 ? x : 0,
                ...style,
            }}
            className={cn(processCardVariants({ variant, size }), className)}
            {...props}
        />
    );
};
ProcessCard.displayName = "ProcessCard";
