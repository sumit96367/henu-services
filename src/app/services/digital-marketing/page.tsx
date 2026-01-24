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
    Search
} from 'lucide-react';

const features = [
    {
        title: 'Performance Advertising',
        description: 'Expert management of Google Ads, Meta Ads, and LinkedIn Ads focused on ROI and conversions.',
        icon: <Target size={28} />
    },
    {
        title: 'Social Media Strategy',
        description: 'Building brand authority and community across major platforms through strategic organic content.',
        icon: <Megaphone size={28} />
    },
    {
        title: 'SEO & Organic Growth',
        description: 'Comprehensive SEO strategies to dominate search results and drive high-quality organic traffic.',
        icon: <TrendingUp size={28} />
    },
    {
        title: 'Conversion Optimization',
        description: 'Advanced A/B testing and landing page optimization to maximize the value of every visitor.',
        icon: <Zap size={28} />
    },
    {
        title: 'Analytics & Attribution',
        description: 'Advanced tracking and reporting that connects marketing efforts to real business revenue.',
        icon: <BarChart3 size={28} />
    },
    {
        title: 'Community Building',
        description: 'Nurturing engaged audiences and brand advocates through consistent, high-value interaction.',
        icon: <Users size={28} />
    }
];

const process = [
    {
        step: 1,
        title: 'Audit & Analysis',
        description: 'We analyze your current performance, competitors, and audience to find growth opportunities.'
    },
    {
        step: 2,
        title: 'Strategic Roadmap',
        description: 'We develop a multi-channel strategy aligned with your specific business objectives.'
    },
    {
        step: 3,
        title: 'Content & Creative',
        description: 'Designing high-converting ad creatives and compelling organic content for your brand.'
    },
    {
        step: 4,
        title: 'Campaign Launch',
        description: 'Precision set-up of ad accounts, tracking, and content calendars across all channels.'
    },
    {
        step: 5,
        title: 'Optimization',
        description: 'Daily monitoring and data-driven adjustments to improve performance and efficiency.'
    },
    {
        step: 6,
        title: 'Review & Scaling',
        description: 'Regular performance reviews and scaling successful strategies for maximum impact.'
    }
];

const technologies = [
    { name: 'Google Ads' },
    { name: 'Meta Ads Manager' },
    { name: 'LinkedIn Ads' },
    { name: 'SEMrush' },
    { name: 'Ahrefs' },
    { name: 'Google Analytics 4' },
    { name: 'TikTok Ads' },
    { name: 'Mailchimp' },
    { name: 'HubSpot' },
    { name: 'Hotjar' }
];

export default function DigitalMarketingPage() {
    return (
        <ServicePage
            heroTitle="Growth Focused"
            heroHighlight="Digital Marketing & Ads"
            heroDescription="A comprehensive approach to digital growth, combining high-performance advertising with strategic marketing to scale your brand."
            heroAccentColor="cyan"
            features={features}
            process={process}
            technologies={technologies}
            ctaTitle="Accelerate Your Growth"
            ctaDescription="Ready to scale your business with a data-driven marketing strategy? Let's talk."
        />
    );
}
