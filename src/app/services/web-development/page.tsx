'use client';

import {
    Globe,
    Zap,
    Shield,
    Smartphone,
    Search,
    Palette
} from 'lucide-react';
import {
    ServiceFeatures,
    ServiceProcess,
    ServiceTechnologies,
    ServiceCTA,
    ServiceFAQSection
} from '@/components/service-page';
import StackFeatureSection from '@/components/ui/stack-feature-section';

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

const faqs = [
    {
        question: "What technologies do you use for web development?",
        answer: "We use modern frameworks like React, Next.js, and Vue.js for front-end development, paired with Node.js, Python/Django for backend. We also leverage cloud platforms like Google Cloud and AWS for hosting and scalability."
    },
    {
        question: "Do you provide hosting and domain services?",
        answer: "Yes! We offer comprehensive hosting solutions on AWS and Google Cloud, along with domain registration and SSL certificate management. We handle all technical aspects so you can focus on your business."
    },
    {
        question: "How long does it take to build a website?",
        answer: "A basic website typically takes 2-4 weeks, while complex e-commerce or custom platforms can take 8-12 weeks. We follow agile methodology with regular deliverables to keep you updated throughout the process."
    },
    {
        question: "Do you offer website maintenance after launch?",
        answer: "Absolutely! We provide 24/7 support and maintenance packages including security updates, performance optimization, content updates, and feature enhancements to keep your website running smoothly."
    }
];



export default function WebDevelopmentPage() {
    const heroTitle = "Innovative";
    const heroHighlight = "Website Development";
    const heroDescription = "Transform your vision into high-converting websites. We craft digital experiences that drive traffic, sales, and loyalty.";
    const heroAccentColor = "cyan";

    return (
        <main>
            <StackFeatureSection
                title={heroTitle}
                highlight={heroHighlight}
                description={heroDescription}
            />

            <ServiceFeatures features={features} accentColor={heroAccentColor} />
            <ServiceProcess process={process} accentColor={heroAccentColor} />

            {technologies && technologies.length > 0 && (
                <ServiceTechnologies technologies={technologies} />
            )}

            <ServiceFAQSection faqs={faqs} />

            <ServiceCTA
                title="Build Your Site"
                description="Let's create a website that grows your business. Get started today!"
                accentColor={heroAccentColor}
            />
        </main>
    );
}
