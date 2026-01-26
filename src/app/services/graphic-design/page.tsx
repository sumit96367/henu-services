'use client';

import { ServicePage } from '@/components/service-page';
import {
    Palette,
    Layers,
    Image as ImageIcon,
    Layout,
    Type,
    Video
} from 'lucide-react';

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
        description: 'Defining the creative direction and core visual concepts for your project.'
    },
    {
        step: 2,
        title: 'Mood Boards & Sketches',
        description: 'Visualizing ideas through mood boards and initial hand-drawn or digital sketches.'
    },
    {
        step: 3,
        title: 'Design Iterations',
        description: 'Developing multiple design options and refining them based on creative excellence.'
    },
    {
        step: 4,
        title: 'Client Feedback Rounds',
        description: 'Collaborating closely with you to perfect every detail of the visual assets.'
    },
    {
        step: 5,
        title: 'Final Polish & Delivery',
        description: 'Adding the final touches and delivering high-resolution assets in all required formats.'
    },
    {
        step: 6,
        title: 'Brand Guidelines',
        description: 'Creating comprehensive documentation to ensure consistent brand usage across all channels.'
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

export default function GraphicDesignPage() {
    return (
        <ServicePage
            heroTitle="Stunning"
            heroHighlight="Graphic Design"
            heroDescription="Elevate your brand with visuals that captivate and convert. From logos to full branding suites."
            heroAccentColor="cyan"
            features={features}
            process={process}
            technologies={technologies}
            ctaTitle="Standout Designs"
            ctaDescription="Make your brand unforgettable. Let's design!"
        />
    );
}
