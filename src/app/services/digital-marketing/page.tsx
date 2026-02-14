'use client';

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
import {
    ServiceFeatures,
    ServiceProcess,
    ServiceTechnologies,
    ServiceCTA,
    ServiceFAQSection
} from '@/components/service-page';
import HeroSection from '@/components/ui/hero-section-9';

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
        image: '/images/services/digital-marketing/step-1.png'
    },
    {
        step: 2,
        title: 'Campaign Strategy',
        description: 'Developing a comprehensive roadmap across paid and organic channels for maximum impact.',
        image: '/images/services/digital-marketing/step-2.png'
    },
    {
        step: 3,
        title: 'Creative Production',
        description: 'Designing eye-catching ads and content that resonate with your target audience.',
        image: '/images/services/digital-marketing/step-3.png'
    },
    {
        step: 4,
        title: 'Launch & A/B Testing',
        description: 'Deploying campaigns and testing variations to find the most efficient growth path.',
        image: '/images/services/digital-marketing/step-4.png'
    },
    {
        step: 5,
        title: 'Analytics & Reporting',
        description: 'Transparent tracking of results with detailed insights and actionable data.',
        image: '/images/services/digital-marketing/step-5.png'
    },
    {
        step: 6,
        title: 'Scale & Refine',
        description: 'Scaling winning campaigns and continuously refining strategies for long-term dominance.',
        image: '/images/services/digital-marketing/step-6.png'
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
    const heroData = {
        title: (
            <>
                Results-Driven <br /> <span className="gradient-text">Digital Marketing & Ads</span>
            </>
        ),
        subtitle: 'Skyrocket your visibility and sales with data-backed campaigns across all channels.',
        actions: [
            {
                text: 'Launch Your Campaign',
                onClick: () => window.location.href = '/contact',
                className: 'btn-primary',
                icon: <ArrowRight size={18} />
            },
            {
                text: 'Our Process',
                onClick: () => {
                    const element = document.getElementById('process');
                    element?.scrollIntoView({ behavior: 'smooth' });
                },
                className: 'btn-secondary'
            },
        ],

        stats: [
            {
                value: '500%',
                label: 'Average ROAS',
                icon: <Target className="h-5 w-5 text-purple-400" />,
            },
            {
                value: '₹1Cr+',
                label: 'Monthly Managed Spend',
                icon: <Zap className="h-5 w-5 text-indigo-400" />,
            },
            {
                value: '98%',
                label: 'Client Retention',
                icon: <Users className="h-5 w-5 text-purple-400" />,
            },
        ],
        images: [
            'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop',
        ],
    };

    return (
        <main className="relative">
            {/* Hard spacer to force content down in all views */}
            <div className="h-[100px] md:h-[140px] w-full" />

            <div className="relative z-10">
                <HeroSection
                    className="border-b border-white/5"
                    title={heroData.title}
                    subtitle={heroData.subtitle}
                    actions={heroData.actions}
                    stats={heroData.stats}
                    images={heroData.images}
                />
            </div>

            <ServiceFeatures features={features} accentColor="purple" />
            <ServiceProcess process={process} accentColor="purple" />

            {technologies && technologies.length > 0 && (
                <ServiceTechnologies technologies={technologies} />
            )}

            <ServiceFAQSection faqs={faqs} />

            <ServiceCTA
                title="Dominate Digital"
                description="Grow your audience today. Let's campaign!"
                accentColor="purple"
            />
        </main>
    );
}

