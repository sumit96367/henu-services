'use client';

import {
    Server,
    Database,
    Shield,
    Zap,
    Cloud,
    GitBranch
} from 'lucide-react';
import {
    ServiceFeatures,
    ServiceProcess,
    ServiceTechnologies,
    ServiceCTA,
    ServiceFAQSection
} from '@/components/service-page';
import BackendHeroSection from '@/components/ui/backend-hero-section';

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
        description: 'Planning rock-solid backend structures with AI intelligence and scalability at the core.',
        image: '/images/services/backend-development/step-1.png'
    },
    {
        step: 2,
        title: 'API Development',
        description: 'Building high-performance APIs that power your web and mobile experiences seamlessly.',
        image: '/images/services/backend-development/step-2.png'
    },
    {
        step: 3,
        title: 'Database Setup',
        description: 'Configuring optimized data storage solutions for reliability and lightning-fast access.',
        image: '/images/services/backend-development/step-3.png'
    },
    {
        step: 4,
        title: 'Security Implementation',
        description: 'Hardening your infrastructure with enterprise-grade security protocols and encryption.',
        image: '/images/services/backend-development/step-4.png'
    },
    {
        step: 5,
        title: 'Performance Tuning',
        description: 'Continuous optimization to ensure your backend handles growth without breaking a sweat.',
        image: '/images/services/backend-development/step-5.png'
    },
    {
        step: 6,
        title: 'Deployment & Monitoring',
        description: 'Deploying on HENU OS with real-time monitoring to ensure 99.9% uptime and reliability.',
        image: '/images/services/backend-development/step-6.png'
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

const faqs = [
    {
        question: "What backend frameworks do you specialize in?",
        answer: "We specialize in Node.js with Express/Nest.js, Python with Django/FastAPI, and modern serverless architectures. Our team selects the best framework based on your specific requirements for performance, scalability, and maintainability."
    },
    {
        question: "Do you provide API documentation?",
        answer: "Yes! We provide comprehensive API documentation using tools like Swagger/OpenAPI, Postman collections, and detailed README files. This ensures your team or third-party developers can easily integrate with your backend."
    },
    {
        question: "How do you ensure backend scalability?",
        answer: "We use microservices architecture, containerization with Docker/Kubernetes, cloud-native solutions, database sharding, caching layers (Redis), and load balancing to ensure your backend can scale seamlessly with growing user demands."
    },
    {
        question: "Can you migrate my existing backend infrastructure?",
        answer: "Absolutely! We specialize in backend migrations from legacy systems to modern cloud-native architectures. We ensure zero downtime, data integrity, and a smooth transition with comprehensive testing at every stage."
    }
];



export default function BackendDevelopmentPage() {
    return (
        <main className="relative">
            <BackendHeroSection
                title="Scalable"
                highlight="Backend Development"
                description="Power your app with rock-solid servers, AI intelligence, and seamless scalability. Built on HENU OS for ultimate reliability."
            />

            <ServiceFeatures features={features} accentColor="purple" />
            <ServiceProcess process={process} accentColor="purple" />

            {technologies && technologies.length > 0 && (
                <ServiceTechnologies technologies={technologies} />
            )}

            <ServiceFAQSection faqs={faqs} />

            <ServiceCTA
                title="Scale Your Backend"
                description="Unlock speed and reliability. Contact us now!"
                accentColor="purple"
            />
        </main>
    );
}

