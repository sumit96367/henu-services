'use client';

import { ServicePage } from '@/components/service-page';
import {
    Megaphone,
    TrendingUp,
    Users,
    Target,
    BarChart3,
    Zap,
    Globe,
    Search,
    ArrowRight
} from 'lucide-react';

const features = [
    {
        title: 'Performance Advertising',
        description: 'Expert management of Google Ads, Meta Ads, and other high-ROI channels to drive targeted traffic.',
        icon: <Target size={28} />
    },
    {
        title: 'Social Media Strategy',
        description: 'Comprehensive brand positioning and engagement strategies across all major social platforms.',
        icon: <Megaphone size={28} />
    },
    {
        title: 'SEO & Organic Growth',
        description: 'Long-term visibility and search dominance through content optimization and technical SEO.',
        icon: <Search size={28} />
    },
    {
        title: 'Email Automation',
        description: 'Nurture leads and drive repeat sales with automated, high-conversion email lifecycles.',
        icon: <Zap size={28} />
    },
    {
        title: 'Video Content Creation',
        description: 'Engaging video assets designed specifically for social media ads and brand storytelling.',
        icon: <Globe size={28} />
    },
    {
        title: 'Influencer Partnerships',
        description: 'Strategic collaborations with creators to amplify your reach and build authentic trust.',
        icon: <Users size={28} />
    }
];

const process = [
    {
        step: 1,
        title: 'Audience Research',
        description: 'Identifying your ideal customers and their pain points to craft targeted messaging.',
        image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2070&auto=format&fit=crop'
    },
    {
        step: 2,
        title: 'Campaign Strategy',
        description: 'Developing a comprehensive roadmap across paid and organic channels for maximum impact.',
        image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop'
    },
    {
        step: 3,
        title: 'Creative Production',
        description: 'Designing eye-catching ads and content that resonate with your target audience.',
        image: 'https://images.unsplash.com/photo-1542744094-24638eff58bb?q=80&w=2071&auto=format&fit=crop'
    },
    {
        step: 4,
        title: 'Launch & A/B Testing',
        description: 'Deploying campaigns and testing variations to find the most efficient growth path.',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop'
    },
    {
        step: 5,
        title: 'Analytics & Reporting',
        description: 'Transparent tracking of results with detailed insights and actionable data.',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop'
    },
    {
        step: 6,
        title: 'Scale & Refine',
        description: 'Scaling winning campaigns and continuously refining strategies for long-term dominance.',
        image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070&auto=format&fit=crop'
    }
];

const technologies = [
    { name: 'Google Ads' },
    { name: 'Meta Business' },
    { name: 'Ahrefs' },
    { name: 'SEMrush' },
    { name: 'HubSpot' },
    { name: 'HENU Content AI' },
    { name: 'YouTube Analytics' }
];

const faqs = [
    {
        question: "Which platforms do you run ad campaigns on?",
        answer: "We specialize in Google Ads (Search, Display, YouTube), Meta platforms (Facebook, Instagram), LinkedIn Ads, Twitter Ads, and emerging platforms like TikTok. We recommend channels based on your target audience and business goals."
    },
    {
        question: "What is your approach to ROI tracking?",
        answer: "We implement comprehensive tracking using Google Analytics 4, UTM parameters, conversion pixels, and custom dashboards. You'll receive detailed weekly/monthly reports showing ROAS, cost per acquisition, customer lifetime value, and campaign performance metrics."
    },
    {
        question: "Do you handle content creation for social media?",
        answer: "Yes! Our team creates engaging posts, graphics, video content, and copy tailored to each platform. We also use HENU Content AI to scale content production while maintaining your brand voice and quality standards."
    },
    {
        question: "How do you measure campaign success?",
        answer: "Success metrics vary by goal - ROAS for e-commerce, CPL for lead generation, engagement rates for brand awareness. We set clear KPIs upfront and optimize campaigns weekly based on data to maximize your marketing investment."
    }
];

export default function DigitalMarketingPage() {
    return (
        <ServicePage
            heroTitle="Results-Driven"
            heroHighlight="Digital Marketing & Ads"
            heroDescription="Skyrocket your visibility and sales with data-backed campaigns across all channels."
            heroAccentColor="cyan"
            features={features}
            process={process}
            technologies={technologies}
            ctaTitle="Dominate Digital"
            ctaDescription="Grow your audience today. Let's campaign!"
            faqs={faqs}
        />
    );
}

