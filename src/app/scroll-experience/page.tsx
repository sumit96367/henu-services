'use client';

import { ScrollStory, StorySection } from '@/components/scroll-story';
import { ScrollText, ScrollTextWords, ScrollTextLines } from '@/components/ui/scroll-text';

export default function ScrollExperiencePage() {
    return (
        <ScrollStory background="grain">
            {/* Hero Section */}
            <StorySection>
                <div className="text-center space-y-8">
                    <ScrollText variant="fade-scale">
                        <h1 className="text-7xl md:text-8xl lg:text-9xl font-bold text-white leading-none tracking-tight">
                            Scroll to
                            <br />
                            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                                Experience
                            </span>
                        </h1>
                    </ScrollText>

                    <ScrollText variant="blur-focus" delay={0.2}>
                        <p className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto">
                            A modern, refined approach to storytelling through scroll
                        </p>
                    </ScrollText>
                </div>
            </StorySection>

            {/* Philosophy Section */}
            <StorySection>
                <div className="space-y-12">
                    <ScrollText variant="rise">
                        <h2 className="text-5xl md:text-6xl font-bold text-white">
                            Intentional.
                            <br />
                            Not flashy.
                        </h2>
                    </ScrollText>

                    <ScrollTextLines
                        lines={[
                            "Every element responds to your scroll position.",
                            "No distractions. No unnecessary movement.",
                            "Just pure, refined storytelling."
                        ]}
                        lineClassName="text-2xl md:text-3xl text-gray-300 leading-relaxed"
                    />
                </div>
            </StorySection>

            {/* Feature 1: Fade & Scale */}
            <StorySection>
                <ScrollText variant="fade-scale">
                    <div className="text-center">
                        <h3 className="text-4xl md:text-5xl font-bold text-white mb-6">
                            Fade & Scale
                        </h3>
                        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                            Text emerges gracefully as you scroll, growing from 95% to 100% scale
                            with a synchronized fade-in effect.
                        </p>
                    </div>
                </ScrollText>
            </StorySection>

            {/* Feature 2: Blur to Focus */}
            <StorySection>
                <ScrollText variant="blur-focus">
                    <div className="text-center">
                        <h3 className="text-4xl md:text-5xl font-bold text-white mb-6">
                            Blur to Focus
                        </h3>
                        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                            Content materializes from an artistic blur, sharpening into clarity
                            as it enters the viewport.
                        </p>
                    </div>
                </ScrollText>
            </StorySection>

            {/* Feature 3: Rise */}
            <StorySection>
                <ScrollText variant="rise">
                    <div className="text-center">
                        <h3 className="text-4xl md:text-5xl font-bold text-white mb-6">
                            Rise
                        </h3>
                        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                            Elements ascend smoothly into position, creating a sense of elevation
                            and importance.
                        </p>
                    </div>
                </ScrollText>
            </StorySection>

            {/* Feature 4: Expand */}
            <StorySection>
                <ScrollText variant="expand">
                    <div className="text-center">
                        <h3 className="text-4xl md:text-5xl font-bold text-white mb-6">
                            Letter Spacing
                        </h3>
                        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                            Typography breathes as letter spacing contracts from wide to tight,
                            drawing focus to the message.
                        </p>
                    </div>
                </ScrollText>
            </StorySection>

            {/* Feature 5: Staggered Words */}
            <StorySection>
                <div className="text-center max-w-3xl mx-auto">
                    <ScrollText variant="fade-scale">
                        <h3 className="text-4xl md:text-5xl font-bold text-white mb-8">
                            Word by Word
                        </h3>
                    </ScrollText>

                    <ScrollTextWords className="text-3xl md:text-4xl font-light text-gray-300 leading-relaxed">
                        Each word reveals itself individually creating a rhythmic reading experience
                    </ScrollTextWords>
                </div>
            </StorySection>

            {/* Multiple Lines Stagger */}
            <StorySection>
                <div className="max-w-4xl mx-auto">
                    <ScrollText variant="fade-scale">
                        <h3 className="text-4xl md:text-5xl font-bold text-white mb-12 text-center">
                            Line by Line
                        </h3>
                    </ScrollText>

                    <ScrollTextLines
                        lines={[
                            "First line appears",
                            "Then the second follows",
                            "Building momentum",
                            "Creating narrative flow",
                            "Until the story completes"
                        ]}
                        lineClassName="text-2xl md:text-3xl text-gray-300 mb-6 leading-relaxed"
                    />
                </div>
            </StorySection>

            {/* Static Background Section */}
            <StorySection>
                <div className="text-center space-y-8">
                    <ScrollText variant="blur-focus">
                        <h2 className="text-5xl md:text-6xl font-bold text-white">
                            The Background
                            <br />
                            Stays Still
                        </h2>
                    </ScrollText>

                    <ScrollText variant="rise" delay={0.2}>
                        <p className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto">
                            No parallax. No camera movement. No distraction.
                            <br />
                            <span className="text-gray-500">Just a calm, minimal foundation for your content.</span>
                        </p>
                    </ScrollText>
                </div>
            </StorySection>

            {/* Philosophy Recap */}
            <StorySection>
                <div className="max-w-4xl mx-auto space-y-16">
                    <ScrollText variant="fade-scale">
                        <h2 className="text-6xl md:text-7xl font-bold text-white text-center mb-16">
                            Refined,
                            <br />
                            Not Flashy
                        </h2>
                    </ScrollText>

                    <div className="grid md:grid-cols-3 gap-12">
                        <ScrollText variant="rise" delay={0}>
                            <div className="space-y-4">
                                <div className="text-5xl font-bold text-cyan-400">01</div>
                                <h4 className="text-2xl font-bold text-white">Scroll-Driven</h4>
                                <p className="text-gray-400">
                                    All animations respond to your scroll position, not arbitrary timers.
                                </p>
                            </div>
                        </ScrollText>

                        <ScrollText variant="rise" delay={0.1}>
                            <div className="space-y-4">
                                <div className="text-5xl font-bold text-cyan-400">02</div>
                                <h4 className="text-2xl font-bold text-white">Static Background</h4>
                                <p className="text-gray-400">
                                    Background remains perfectly still, keeping focus on content.
                                </p>
                            </div>
                        </ScrollText>

                        <ScrollText variant="rise" delay={0.2}>
                            <div className="space-y-4">
                                <div className="text-5xl font-bold text-cyan-400">03</div>
                                <h4 className="text-2xl font-bold text-white">Intentional</h4>
                                <p className="text-gray-400">
                                    Every animation serves the story. Nothing superfluous.
                                </p>
                            </div>
                        </ScrollText>
                    </div>
                </div>
            </StorySection>

            {/* Closing Section */}
            <StorySection>
                <div className="text-center space-y-8">
                    <ScrollText variant="blur-focus">
                        <h2 className="text-6xl md:text-7xl lg:text-8xl font-bold text-white">
                            Premium
                            <br />
                            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
                                Simplicity
                            </span>
                        </h2>
                    </ScrollText>

                    <ScrollText variant="fade-scale" delay={0.2}>
                        <p className="text-2xl text-gray-500 italic">
                            Less noise. More impact.
                        </p>
                    </ScrollText>
                </div>
            </StorySection>

            {/* Footer spacer */}
            <div className="h-screen" />
        </ScrollStory>
    );
}
