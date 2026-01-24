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
        title: 'Custom Web Applications',
        description: 'Tailored web solutions built from scratch to meet your specific business requirements and user needs.',
        icon: <Globe size={28} />
    },
    {
        title: 'High Performance',
        description: 'Optimized code and architecture ensuring lightning-fast load times and smooth user experiences.',
        icon: <Zap size={28} />
    },
    {
        title: 'Security First',
        description: 'Enterprise-grade security implementations protecting your data and users from threats.',
        icon: <Shield size={28} />
    },
    {
        title: 'Responsive Design',
        description: 'Seamless experiences across all devices - desktop, tablet, and mobile.',
        icon: <Smartphone size={28} />
    },
    {
        title: 'SEO Optimized',
        description: 'Built-in search engine optimization to improve your visibility and organic traffic.',
        icon: <Search size={28} />
    },
    {
        title: 'Modern UI/UX',
        description: 'Beautiful, intuitive interfaces that engage users and drive conversions.',
        icon: <Palette size={28} />
    }
];

const process = [
    {
        step: 1,
        title: 'Discovery & Planning',
        description: 'We analyze your requirements, target audience, and business goals to create a comprehensive project roadmap.'
    },
    {
        step: 2,
        title: 'Design & Prototyping',
        description: 'Our designers create wireframes and interactive prototypes for your approval before development begins.'
    },
    {
        step: 3,
        title: 'Development',
        description: 'Our developers build your application using cutting-edge technologies with clean, maintainable code.'
    },
    {
        step: 4,
        title: 'Testing & QA',
        description: 'Rigorous testing across browsers and devices ensures your application is bug-free and performant.'
    },
    {
        step: 5,
        title: 'Deployment',
        description: 'We deploy your application to production with proper CI/CD pipelines and monitoring.'
    },
    {
        step: 6,
        title: 'Support & Maintenance',
        description: 'Ongoing support, updates, and optimization to keep your application running smoothly.'
    }
];

const technologies = [
    { name: 'React' },
    { name: 'Next.js' },
    { name: 'Vue.js' },
    { name: 'Angular' },
    { name: 'TypeScript' },
    { name: 'Node.js' },
    { name: 'Python' },
    { name: 'PostgreSQL' },
    { name: 'MongoDB' },
    { name: 'AWS' },
    { name: 'Vercel' },
    { name: 'Docker' },
    { name: 'Tailwind CSS' },
    { name: 'GraphQL' },
    { name: 'Redis' }
];

export default function WebDevelopmentPage() {
    return (
        <ServicePage
            heroTitle="Professional"
            heroHighlight="Web Development"
            heroDescription="We build stunning, high-performance websites and web applications that drive business growth. From simple landing pages to complex enterprise solutions."
            heroAccentColor="cyan"
            features={features}
            process={process}
            technologies={technologies}
            ctaTitle="Build Your Web Presence"
            ctaDescription="Let's create a web experience that sets you apart from the competition."
        />
    );
}
