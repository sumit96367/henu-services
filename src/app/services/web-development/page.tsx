'use client';

import { ServicePage } from '@/components/service-page';
import {
    Globe,
    Zap,
    Shield,
    Smartphone,
    Search,
    Palette
} from 'lucide-react';

const features = [
    {
        title: 'Responsive Web Design',
        description: 'Seamless experiences across all devices with premium aesthetic and high-performance layouts.',
        icon: <Smartphone size={28} />
    },
    {
        title: 'Custom CMS Development',
        description: 'Tailored content management solutions including WordPress and custom-built engines for ultimate control.',
        icon: <Globe size={28} />
    },
    {
        title: 'E-Commerce Platforms',
        description: 'High-converting Shopify and WooCommerce stores optimized for sales and customer loyalty.',
        icon: <Zap size={28} />
    },
    {
        title: 'SEO-Optimized Builds',
        description: 'Enhanced visibility with clean code, fast loading times, and search engine friendly architecture.',
        icon: <Search size={28} />
    },
    {
        title: 'API Integrations',
        description: 'Seamlessly connect your website with third-party services and internal business systems.',
        icon: <Shield size={28} />
    },
    {
        title: 'Progressive Web Apps (PWAs)',
        description: 'Mobile-first web applications that offer app-like experiences directly in the browser.',
        icon: <Palette size={28} />
    }
];

const process = [
    {
        step: 1,
        title: 'Discovery & Planning',
        description: 'We analyze your requirements, target audience, and business goals to create a comprehensive roadmap.',
        image: 'https://images.unsplash.com/photo-1542621334-a254cf47733d?q=80&w=2070&auto=format&fit=crop'
    },
    {
        step: 2,
        title: 'Wireframing & Design',
        description: 'Visualizing the structure and aesthetic of your site to ensure a premium user experience.',
        image: 'https://images.unsplash.com/photo-1586717791821-3f44a563dc4c?q=80&w=2070&auto=format&fit=crop'
    },
    {
        step: 3,
        title: 'Front-End Development',
        description: 'Crafting the user interface with modern frameworks like React and Next.js for extreme speed.',
        image: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=2031&auto=format&fit=crop'
    },
    {
        step: 4,
        title: 'Back-End Integration',
        description: 'Building robust server-side logic and database structures to power your applications features.',
        image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop'
    },
    {
        step: 5,
        title: 'Testing & Optimization',
        description: 'Rigorous performance checks and bug fixing across all platforms before going live.',
        image: 'https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?q=80&w=2076&auto=format&fit=crop'
    },
    {
        step: 6,
        title: 'Launch & Maintenance',
        description: 'Seamless deployment and ongoing support to keep your digital presence at its peak.',
        image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=2069&auto=format&fit=crop'
    }
];

const technologies = [
    { name: 'React' },
    { name: 'Vue.js' },
    { name: 'Next.js' },
    { name: 'Node.js' },
    { name: 'Python/Django' },
    { name: 'Tailwind CSS' },
    { name: 'HENU OS AI' },
    { name: 'Google Cloud' },
    { name: 'AWS' }
];

export default function WebDevelopmentPage() {
    return (
        <ServicePage
            heroTitle="Innovative"
            heroHighlight="Website Development"
            heroDescription="Transform your vision into high-converting websites. We craft digital experiences that drive traffic, sales, and loyalty."
            heroAccentColor="cyan"
            features={features}
            process={process}
            technologies={technologies}
            ctaTitle="Build Your Site"
            ctaDescription="Let's create a website that grows your business. Get started today!"
        />
    );
}

