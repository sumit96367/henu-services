'use client';

import {
    Palette,
    Layers,
    Image as ImageIcon,
    Layout,
    Type,
    Video
} from 'lucide-react';
import {
    ServiceFeatures,
    ServiceProcess,
    ServiceTechnologies,
    ServiceCTA,
    ServiceFAQSection
} from '@/components/service-page';
import GraphicDesignHero from '@/components/ui/graphic-design-hero';

const features = [
    {
        title: 'Logo & Brand Identity',
        description: 'Crafting unique and memorable logos that define your brands personality and values.',
        icon: <Palette size={28} />
    },
    {
        title: 'UI/UX Graphics',
        description: 'Designing intuitive and high-fidelity interface elements for web and mobile applications.',
        icon: <Layout size={28} />
    },
    {
        title: 'Marketing Collateral',
        description: 'Professional brochures, business cards, and presentation decks that leave a lasting impression.',
        icon: <Layers size={28} />
    },
    {
        title: 'Social Media Assets',
        description: 'Eye-catching graphics tailored for Instagram, LinkedIn, and other social platforms to boost engagement.',
        icon: <ImageIcon size={28} />
    },
    {
        title: 'Print & Digital Banners',
        description: 'High-impact banners for both physical events and digital advertising campaigns.',
        icon: <Type size={28} />
    },
    {
        title: 'Motion Graphics',
        description: 'Bringing your brand to life with dynamic animations and video content.',
        icon: <Video size={28} />
    }
];

const process = [
    {
        step: 1,
        title: 'Concept Brainstorming',
        description: 'Defining the creative direction and core visual concepts for your project.',
        image: 'https://images.unsplash.com/photo-1516259762381-22954d7d3ad2?q=80&w=2066&auto=format&fit=crop'
    },
    {
        step: 2,
        title: 'Mood Boards & Sketches',
        description: 'Visualizing ideas through mood boards and initial hand-drawn or digital sketches.',
        image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=2071&auto=format&fit=crop'
    },
    {
        step: 3,
        title: 'Design Iterations',
        description: 'Developing multiple design options and refining them based on creative excellence.',
        image: 'https://images.unsplash.com/photo-1542744094-24638eff58bb?q=80&w=2071&auto=format&fit=crop'
    },
    {
        step: 4,
        title: 'Client Feedback Rounds',
        description: 'Collaborating closely with you to perfect every detail of the visual assets.',
        image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop'
    },
    {
        step: 5,
        title: 'Final Polish & Delivery',
        description: 'Adding the final touches and delivering high-resolution assets in all required formats.',
        image: 'https://images.unsplash.com/photo-1542744095-2ad4870f79fc?q=80&w=2070&auto=format&fit=crop'
    },
    {
        step: 6,
        title: 'Brand Guidelines',
        description: 'Creating comprehensive documentation to ensure consistent brand usage across all channels.',
        image: 'https://images.unsplash.com/photo-1586717791821-3f44a563dc4c?q=80&w=2070&auto=format&fit=crop'
    }
];

const technologies = [
    { name: 'Adobe Photoshop' },
    { name: 'Illustrator' },
    { name: 'Figma' },
    { name: 'Canva Pro' },
    { name: 'Blender' },
    { name: 'HENU AI Image Gen' },
    { name: 'After Effects' }
];

const faqs = [
    {
        question: "What design deliverables do you provide?",
        answer: "We deliver high-resolution files in multiple formats (PNG, JPG, SVG, PDF, AI, PSD) suitable for both print and digital use. You'll also receive brand guidelines documenting colors, fonts, and usage rules for consistent brand application."
    },
    {
        question: "Do you offer unlimited revisions?",
        answer: "We include up to 3 revision rounds in our standard packages to ensure you're completely satisfied. Each round allows comprehensive feedback. Additional revisions can be accommodated at a nominal fee if needed."
    },
    {
        question: "How long does a typical design project take?",
        answer: "Logo design takes 1-2 weeks, full brand identity 3-4 weeks, and marketing collateral 5-7 business days. Motion graphics projects vary from 2-4 weeks depending on complexity. Rush delivery options are available."
    },
    {
        question: "Can you create designs for both print and digital?",
        answer: "Absolutely! We create designs optimized for both mediums - print-ready files with proper bleed, CMYK colors, and high resolution, plus web-optimized files with RGB colors and appropriate file sizes for fast loading."
    }
];



export default function GraphicDesignPage() {
    return (
        <main className="relative">
            <GraphicDesignHero />

            <ServiceFeatures features={features} accentColor="cyan" />
            <ServiceProcess process={process} accentColor="cyan" />

            {technologies && technologies.length > 0 && (
                <ServiceTechnologies technologies={technologies} />
            )}

            <ServiceFAQSection faqs={faqs} />

            <ServiceCTA
                title="Standout Designs"
                description="Make your brand unforgettable. Let's design!"
                accentColor="cyan"
            />
        </main>
    );
}
