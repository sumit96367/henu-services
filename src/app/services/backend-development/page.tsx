'use client';

import { ServicePage } from '@/components/service-page';
import {
    Server,
    Database,
    Shield,
    Zap,
    Cloud,
    GitBranch
} from 'lucide-react';

const features = [
    {
        title: 'REST/GraphQL APIs',
        description: 'Robust and flexible API architectures built for seamless performance and integration.',
        icon: <Server size={28} />
    },
    {
        title: 'Microservices Architecture',
        description: 'Deconstruct complex applications into scalable, independent services for ultimate flexibility.',
        icon: <GitBranch size={28} />
    },
    {
        title: 'Serverless Deployments',
        description: 'Optimize costs and scalability with modern serverless computing architectures.',
        icon: <Cloud size={28} />
    },
    {
        title: 'AI/ML Integration',
        description: 'Bake intelligence into your core systems with custom AI and machine learning features.',
        icon: <Zap size={28} />
    },
    {
        title: 'Real-Time Data Sync',
        description: 'Ensure data consistency across all platforms with high-speed real-time synchronization.',
        icon: <Database size={28} />
    },
    {
        title: 'Database Optimization',
        description: 'Extreme performance tuning for SQL and NoSQL databases to handle enterprise-level loads.',
        icon: <Shield size={28} />
    }
];

const process = [
    {
        step: 1,
        title: 'Architecture Design',
        description: 'Planning rock-solid backend structures with AI intelligence and scalability at the core.'
    },
    {
        step: 2,
        title: 'API Development',
        description: 'Building high-performance APIs that power your web and mobile experiences seamlessly.'
    },
    {
        step: 3,
        title: 'Database Setup',
        description: 'Configuring optimized data storage solutions for reliability and lightning-fast access.'
    },
    {
        step: 4,
        title: 'Security Implementation',
        description: 'Hardening your infrastructure with enterprise-grade security protocols and encryption.'
    },
    {
        step: 5,
        title: 'Performance Tuning',
        description: 'Continuous optimization to ensure your backend handles growth without breaking a sweat.'
    },
    {
        step: 6,
        title: 'Deployment & Monitoring',
        description: 'Deploying on HENU OS with real-time monitoring to ensure 99.9% uptime and reliability.'
    }
];

const technologies = [
    { name: 'Node.js' },
    { name: 'Python/FastAPI' },
    { name: 'Docker' },
    { name: 'Kubernetes' },
    { name: 'MongoDB' },
    { name: 'PostgreSQL' },
    { name: 'Redis' },
    { name: 'HENU AI Agents' },
    { name: 'Serverless (AWS Lambda)' }
];

export default function BackendDevelopmentPage() {
    return (
        <ServicePage
            heroTitle="Scalable"
            heroHighlight="Backend Development"
            heroDescription="Power your app with rock-solid servers, AI intelligence, and seamless scalability. Built on HENU OS for ultimate reliability."
            heroAccentColor="cyan"
            features={features}
            process={process}
            technologies={technologies}
            ctaTitle="Scale Your Backend"
            ctaDescription="Unlock speed and reliability. Contact us now!"
        />
    );
}

