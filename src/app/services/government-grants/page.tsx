'use client';

import { ServicePage } from '@/components/service-page';
import {
    Coins,
    FileSearch,
    TrendingUp,
    FileCheck,
    Target,
    Award
} from 'lucide-react';

const features = [
    {
        title: 'Grant Identification',
        description: 'Discover government grants and schemes that match your business profile.',
        icon: <FileSearch size={28} />
    },
    {
        title: 'Application Preparation',
        description: 'Comprehensive application preparation with all required documentation.',
        icon: <FileCheck size={28} />
    },
    {
        title: 'Startup India Benefits',
        description: 'Navigate Startup India registration and unlock exclusive benefits.',
        icon: <Award size={28} />
    },
    {
        title: 'State Scheme Benefits',
        description: 'Access state-specific incentives, subsidies, and promotional schemes.',
        icon: <Target size={28} />
    },
    {
        title: 'Seed Funding Support',
        description: 'Government seed funding programs and incubation opportunities.',
        icon: <Coins size={28} />
    },
    {
        title: 'Success Optimization',
        description: 'strategic positioning to maximize approval chances.',
        icon: <TrendingUp size={28} />
    }
];

const process = [
    {
        step: 1,
        title: 'Business Assessment',
        description: 'Evaluate your business profile and eligible grant opportunities.'
    },
    {
        step: 2,
        title: 'Scheme Mapping',
        description: 'Identify best-fit government schemes at central and state levels.'
    },
    {
        step: 3,
        title: 'Document Preparation',
        description: 'Prepare compelling proposals and gather required documentation.'
    },
    {
        step: 4,
        title: 'Application Submission',
        description: 'Submit applications through proper channels with all requirements.'
    },
    {
        step: 5,
        title: 'Active Follow-up',
        description: 'Regular follow-up with authorities and responding to queries.'
    },
    {
        step: 6,
        title: 'Disbursement Support',
        description: 'Assistance in fund disbursement and utilization documentation.'
    }
];

export default function GovernmentGrantsPage() {
    return (
        <ServicePage
            heroTitle="Access"
            heroHighlight="Government Grants & Funding"
            heroDescription="Unlock non-dilutive funding through government grants and schemes. We've helped secure over $50M in funding for our clients."
            heroAccentColor="amber"
            features={features}
            process={process}
            ctaTitle="Secure Funding"
            ctaDescription="Don't leave money on the table. Let us help you access government funding."
        />
    );
}
