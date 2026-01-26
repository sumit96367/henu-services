import { AnimatedLetterText } from "@/components/ui/potfolio-text"

export default function Home() {
    return (
        <main className="min-h-screen flex flex-col items-center justify-center gap-16 p-8 w-full bg-[#050505]">
            <div className="flex flex-col items-center gap-8">
                <AnimatedLetterText text="Portfolio" letterToReplace="o" className="text-7xl md:text-9xl text-white" />

                <p className="text-gray-400 text-lg max-w-md text-center">
                    An elegant text component where letters transform into animated visuals
                </p>
            </div>
        </main>
    )
}
