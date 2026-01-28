'use client';

import { ServicePage } from '@/components/service-page';
import {
    Bot,
    Cpu,
    Workflow,
    MessageSquare,
    Zap,
    LineChart
} from 'lucide-react';

const features = [
    {
        title: 'Operations & Workflow Automation',
        description: 'Eliminate repetitive tasks with custom AI workflows that streamline your core business logic.',
        icon: <Workflow size={28} />
    },
    {
        title: 'Customer Experience & Sales Bots',
        description: 'Engage customers 24/7 with intelligent agents that handle inquiries, bookings, and sales.',
        icon: <MessageSquare size={28} />
    },
    {
        title: 'Marketing & Content Generation',
        description: 'Scale your content production with AI tools tailored to your brands voice and audience.',
        icon: <Bot size={28} />
    },
    {
        title: 'Financial Analytics',
        description: 'Utilize predictive AI models to track financial health and forecast future growth opportunities.',
        icon: <LineChart size={28} />
    },
    {
        title: 'Internal Productivity Tools',
        description: 'Empower your team with custom AI tools for document analysis, meeting summaries, and more.',
        icon: <Cpu size={28} />
    },
    {
        title: 'Voice Integration',
        description: 'Implement crystal-clear AI voice agents for professional customer support and outreach.',
        icon: <Zap size={28} />
    }
];

const process = [
    {
        step: 1,
        title: 'Automation Audit',
        description: 'Identifying bottlenecks in your current processes that can be optimized with AI.',
        image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop'
    },
    {
        step: 2,
        title: 'Agent Design & Training',
        description: 'Architecting custom AI agents and training them on your specific business data.',
        image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2070&auto=format&fit=crop'
    },
    {
        step: 3,
        title: 'Integration Setup',
        description: 'Seamlessly connecting AI agents with your existing CRM, ERP, and communication tools.',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop'
    },
    {
        step: 4,
        title: 'Testing & Refinement',
        description: 'Rigorous testing to ensure accuracy, reliability, and human-like interaction.',
        image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop'
    },
    {
        step: 5,
        title: 'Go-Live & Monitoring',
        description: 'Deploying your AI workforce and monitoring performance in real-world scenarios.',
        image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2070&auto=format&fit=crop'
    },
    {
        step: 6,
        title: 'Continuous Optimization',
        description: 'Ongoing updates and learning cycles to keep your AI agents at the cutting edge.',
        image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=2070&auto=format&fit=crop'
    }
];

const technologies = [
    { name: 'HENU OS AI' },
    { name: 'Python' },
    { name: 'LangChain' },
    { name: 'OpenAI APIs' },
    { name: 'Zapier' },
    { name: 'Google Cloud AI' },
    { name: 'Voice Integration' }
];

const faqs = [
    {
        question: "Do you build AI Agents for non-tech businesses?",
        answer: "Absolutely! We specialize in making AI accessible to all industries. Whether you're in retail, healthcare, manufacturing, or professional services, we design custom AI agents that integrate seamlessly with your existing workflows without requiring technical expertise."
    },
    {
        question: "What types of tasks can AI agents automate?",
        answer: "AI agents can automate customer support, email responses, appointment scheduling, data entry, report generation, social media management, lead qualification, document analysis, content creation, and much more. We customize based on your specific needs."
    },
    {
        question: "How long does it take to develop a custom AI agent?",
        answer: "Simple chatbots can be ready in 1-2 weeks, while complex multi-functional AI agents typically take 4-8 weeks. This includes business analysis, agent design, training, integration, testing, and deployment with full documentation."
    },
    {
        question: "Can AI agents integrate with our existing systems?",
        answer: "Yes! Our AI agents can integrate with CRM systems (Salesforce, HubSpot), communication platforms (Slack, Teams), email services, databases, ERPs, and virtually any system with an API or webhook capability."
    }
];

export default function AIAutomationsPage() {
    return (
        <ServicePage
            heroTitle="Powerful"
            heroHighlight="AI Automations"
            heroDescription="Automate your workflows with custom HENU AI agents. Save time, cut costs, boost efficiency."
            heroAccentColor="cyan"
            features={features}
            process={process}
            technologies={technologies}
            ctaTitle="Automate Now"
            ctaDescription="Work smarter with AI. Transform today!"
            faqs={faqs}
        />
    );
}
