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
        title: 'API Development',
        description: 'RESTful and GraphQL APIs built for scalability, security, and ease of integration.',
        icon: <Server size={28} />
    },
    {
        title: 'Database Architecture',
        description: 'Optimized database design and management for high-performance data operations.',
        icon: <Database size={28} />
    },
    {
        title: 'Security Implementation',
        description: 'Authentication, authorization, encryption, and security best practices baked in.',
        icon: <Shield size={28} />
    },
    {
        title: 'High Availability',
        description: 'Scalable infrastructure with 99.9% uptime guarantees and auto-scaling capabilities.',
        icon: <Zap size={28} />
    },
    {
        title: 'Cloud Infrastructure',
        description: 'Deployment on AWS, GCP, or Azure with containerization and orchestration.',
        icon: <Cloud size={28} />
    },
    {
        title: 'CI/CD Pipelines',
        description: 'Automated testing and deployment pipelines for rapid, reliable releases.',
        icon: <GitBranch size={28} />
    }
];

const process = [
    {
        step: 1,
        title: 'Architecture Design',
        description: 'Design scalable, maintainable backend architecture tailored to your needs.'
    },
    {
        step: 2,
        title: 'Database Modeling',
        description: 'Create efficient database schemas and data models for optimal performance.'
    },
    {
        step: 3,
        title: 'API Development',
        description: 'Build robust APIs with comprehensive documentation and versioning.'
    },
    {
        step: 4,
        title: 'Security Hardening',
        description: 'Implement authentication, authorization, and security protocols.'
    },
    {
        step: 5,
        title: 'Performance Optimization',
        description: 'Optimize queries, caching, and infrastructure for maximum speed.'
    },
    {
        step: 6,
        title: 'Deployment & Monitoring',
        description: 'Deploy with proper monitoring, logging, and alerting systems.'
    }
];

const technologies = [
    { name: 'Node.js' },
    { name: 'Python' },
    { name: 'Go' },
    { name: 'Java' },
    { name: 'PostgreSQL' },
    { name: 'MongoDB' },
    { name: 'Redis' },
    { name: 'Elasticsearch' },
    { name: 'Docker' },
    { name: 'Kubernetes' },
    { name: 'AWS' },
    { name: 'GCP' },
    { name: 'GraphQL' },
    { name: 'RabbitMQ' },
    { name: 'Kafka' }
];

export default function BackendDevelopmentPage() {
    return (
        <ServicePage
            heroTitle="Scalable"
            heroHighlight="Backend Development"
            heroDescription="Powerful, secure, and scalable backend systems that form the foundation of your digital products."
            heroAccentColor="cyan"
            features={features}
            process={process}
            technologies={technologies}
            ctaTitle="Build Your Backend"
            ctaDescription="Let's architect a backend that scales with your business growth."
        />
    );
}
