'use client';

import { TextReveal } from "@/components/ui/text-reveal-animation";

export default function DemoOne() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-[#050505]">
            <div className="max-w-md w-full p-8 border border-white/10 rounded-3xl bg-white/[0.02] backdrop-blur-xl">
                <TextReveal word="Innovate" />
            </div>
        </div>
    );
}
