import React, { useEffect, useRef, useState } from 'react';
import { cn } from "@/lib/utils";
import { isWebGLAvailable } from "@/lib/webgl";

// Helper for random colors
const randomColors = (count: number) => {
    return new Array(count)
        .fill(0)
        .map(() => "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0'));
};

interface TubesBackgroundProps {
    children?: React.ReactNode;
    className?: string;
    enableClickInteraction?: boolean;
}

export function TubesBackground({
    children,
    className,
    enableClickInteraction = true
}: TubesBackgroundProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const tubesRef = useRef<any>(null);

    useEffect(() => {
        let mounted = true;
        let cleanup: (() => void) | undefined;

        const initTubes = async () => {
            if (!isWebGLAvailable()) return;
            if (!canvasRef.current) return;

            try {
                // Import the TubesCursor from locally installed package
                // @ts-ignore - Package doesn't have types
                const module = await import('threejs-components/build/cursors/tubes1.min.js');
                const TubesCursor = module.default || module.TubesCursor || module;

                if (!mounted) return;

                const app = TubesCursor(canvasRef.current, {
                    tubes: {
                        colors: ["#f967fb", "#53bc28", "#6958d5"],
                        lights: {
                            intensity: 200,
                            colors: ["#83f36e", "#fe8a2e", "#ff008a", "#60aed5"]
                        }
                    }
                });

                tubesRef.current = app;
                setIsLoaded(true);

                // Handle resize
                const handleResize = () => {
                    // The library handles resize internally
                };

                window.addEventListener('resize', handleResize);

                cleanup = () => {
                    window.removeEventListener('resize', handleResize);
                };

            } catch (error) {
                console.error("Failed to load TubesCursor:", error);
            }
        };

        initTubes();

        return () => {
            mounted = false;
            if (cleanup) cleanup();
        };
    }, []);

    const handleClick = () => {
        if (!enableClickInteraction || !tubesRef.current) return;

        const colors = randomColors(3);
        const lightsColors = randomColors(4);

        tubesRef.current?.tubes?.setColors?.(colors);
        tubesRef.current?.tubes?.setLightsColors?.(lightsColors);
    };

    return (
        <div
            className={cn("relative w-full h-full min-h-[400px] overflow-hidden bg-background", className)}
            onClick={handleClick}
        >
            <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full block"
                style={{ touchAction: 'none' }}
            />

            {/* Content Overlay */}
            <div className="relative z-10 w-full h-full pointer-events-none">
                {children}
            </div>
        </div>
    );
}

// Default export
export default TubesBackground;
