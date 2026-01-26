'use client';

import { ServicePage } from '@/components/service-page';
import {
    Coins,
    TrendingUp,
    Presentation,
    Users,
    Lightbulb,
    BarChart
} from 'lucide-react';

const features = [
    {
        title: 'Government Grants & Schemes',
        description: 'Access non-dilutive funding through Startup India, MSME, and other government-backed initiatives.',
        icon: <Coins size={28} />
    },
    {
        title: 'Private Lending Networks',
        description: 'Connect with strategic debt and equity partners through our extensive network of private lenders.',
        icon: <Users size={28} />
    },
    {
        title: 'Pitch Deck Creation',
        description: 'Developing investor-ready pitch decks that tell a compelling story and highlight key metrics.',
        icon: <Presentation size={28} />
    },
    {
        title: 'Investor Matchmaking',
        description: 'Strategic introductions to angel investors and VC firms that align with your industry and stage.',
        icon: <TrendingUp size={28} />
    },
    {
        title: 'Business Consulting',
        description: 'Strategic roadmap planning to optimize your business model for maximum fundability.',
        icon: <Lightbulb size={28} />
    },
    {
        title: 'Digital Product Monetization',
        description: 'Advisory on building revenue-generating digital assets and optimizing unit economics.',
        icon: <BarChart size={28} />
    }
];

const process = [
    {
        step: 1,
        title: 'Funding Assessment',
        description: 'Analyzing your current financial state and identifying the most suitable funding paths.'
    },
    {
        step: 2,
        title: 'Strategy & Pitch Building',
        description: 'Developing a bulletproof funding strategy and creating compelling investment materials.'
    },
    {
        step: 3,
        title: 'Application Preparation',
        description: 'Gathering data and drafting applications for grants or preparing DD for investors.'
    },
    {
        step: 4,
        title: 'Network Introductions',
        description: 'Actively introducing your business to relevant grant bodies and investor networks.'
    },
    {
        step: 5,
        title: 'Negotiation Support',
        description: 'Assisting in term sheet negotiations and deal structuring to protect your interests.'
    },
    {
        step: 6,
        title: 'Fund Utilization Planning',
        description: 'Creating strategic spending plans to ensure capital is deployed for maximum growth.'
    }
];

const technologies = [
    { name: 'Startup India Portal' },
    { name: 'PitchBob AI' },
    { name: 'Google Workspace' },
    { name: 'HENU Financial AI' },
    { name: 'CRM Tools' }
];

export default function FundingSolutionsPage() {
    return (
        <ServicePage
            heroTitle="Strategic"
            heroHighlight="Funding Solutions"
            heroDescription="Fuel your growth with tailored funding strategies. Government grants to investor pitches."
            heroAccentColor="amber"
            features={features}
            process={process}
            technologies={technologies}
            ctaTitle="Secure Funding"
            ctaDescription="Turn potential into profit. Apply now!"
        />
    );
}
