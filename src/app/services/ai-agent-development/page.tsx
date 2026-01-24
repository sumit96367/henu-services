'use client';

import { ServicePage } from '@/components/service-page';
import {
    Bot,
    Brain,
    MessageSquare,
    Workflow,
    Sparkles,
    Cpu
} from 'lucide-react';

const features = [
    {
        title: 'Custom AI Agents',
        description: 'Purpose-built AI agents that automate complex workflows and decision-making processes.',
        icon: <Bot size={28} />
    },
    {
        title: 'LLM Integration',
        description: 'Seamless integration with GPT-4, Claude, Gemini, and open-source models.',
        icon: <Brain size={28} />
    },
    {
        title: 'Conversational AI',
        description: 'Intelligent chatbots and virtual assistants that understand context and intent.',
        icon: <MessageSquare size={28} />
    },
    {
        title: 'Process Automation',
        description: 'AI-powered automation of repetitive tasks, data processing, and business operations.',
        icon: <Workflow size={28} />
    },
    {
        title: 'Generative AI',
        description: 'Content generation, image creation, and creative AI solutions for your business.',
        icon: <Sparkles size={28} />
    },
    {
        title: 'Edge AI Deployment',
        description: 'Deploy AI models on edge devices for real-time, low-latency processing.',
        icon: <Cpu size={28} />
    }
];

const process = [
    {
        step: 1,
        title: 'Use Case Discovery',
        description: 'Identify high-impact AI opportunities in your business processes.'
    },
    {
        step: 2,
        title: 'Data Assessment',
        description: 'Evaluate your data landscape and prepare training datasets.'
    },
    {
        step: 3,
        title: 'Agent Design',
        description: 'Architect the AI agent with appropriate model selection and tool integrations.'
    },
    {
        step: 4,
        title: 'Development & Training',
        description: 'Build and fine-tune your AI agent with custom prompts and behaviors.'
    },
    {
        step: 5,
        title: 'Testing & Validation',
        description: 'Rigorous testing for accuracy, safety, and edge case handling.'
    },
    {
        step: 6,
        title: 'Deployment & Monitoring',
        description: 'Production deployment with continuous monitoring and improvement.'
    }
];

const technologies = [
    { name: 'OpenAI GPT-4' },
    { name: 'Claude' },
    { name: 'Gemini' },
    { name: 'LangChain' },
    { name: 'LlamaIndex' },
    { name: 'Hugging Face' },
    { name: 'PyTorch' },
    { name: 'TensorFlow' },
    { name: 'Vector DBs' },
    { name: 'Pinecone' },
    { name: 'RAG Systems' },
    { name: 'CrewAI' },
    { name: 'AutoGen' }
];

export default function AIAgentDevelopmentPage() {
    return (
        <ServicePage
            heroTitle="Intelligent"
            heroHighlight="AI Agent Development"
            heroDescription="Deploy autonomous AI agents that think, learn, and act. Prepare your business for the age of intelligent automation."
            heroAccentColor="cyan"
            features={features}
            process={process}
            technologies={technologies}
            ctaTitle="Deploy AI Agents"
            ctaDescription="Ready to harness the power of AI? Let's build intelligent systems together."
        />
    );
}
