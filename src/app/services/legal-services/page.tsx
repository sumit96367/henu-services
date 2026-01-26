'use client';

import { ServicePage } from '@/components/service-page';
import {
    Scale,
    FileCheck,
    Briefcase,
    ShieldAlert,
    FileText,
    Gavel
} from 'lucide-react';

const features = [
    {
        title: 'Company Registration & Compliance',
        description: 'End-to-end support for PVT LTD, LLP, and other business entities registration and maintenance.',
        icon: <Briefcase size={28} />
    },
    {
        title: 'GST & Tax Filings',
        description: 'Stay ahead of tax deadlines with expert GST registration, filing, and regular compliance checks.',
        icon: <FileText size={28} />
    },
    {
        title: 'Licenses & Certifications',
        description: 'Assisting in obtaining FSSAI, MSME, Startup India, and other industry-specific licenses.',
        icon: <FileCheck size={28} />
    },
    {
        title: 'Annual Compliance',
        description: 'Hassle-free management of annual returns, ROC filings, and board meeting documentations.',
        icon: <Gavel size={28} />
    },
    {
        title: 'Contracts & Agreements',
        description: 'Drafting specialized NDAs, employment contracts, vendor agreements, and service level agreements.',
        icon: <Scale size={28} />
    },
    {
        title: 'Trademark/IP Protection',
        description: 'Securing your brand identity with trademark registration and intellectual property advisory.',
        icon: <ShieldAlert size={28} />
    }
];

const process = [
    {
        step: 1,
        title: 'Free Consultation',
        description: 'Initial discussion to understand your business structure and identify legal requirements.'
    },
    {
        step: 2,
        title: 'Document Preparation',
        description: 'Gathering and drafting all necessary documents to ensure legal accuracy and compliance.'
    },
    {
        step: 3,
        title: 'Government Filing',
        description: 'Submitting applications to the respective government portals with precision and speed.'
    },
    {
        step: 4,
        title: 'Approval Tracking',
        description: 'Proactively monitoring the status of filings and responding to any government queries.'
    },
    {
        step: 5,
        title: 'Compliance Handover',
        description: 'Securing final approvals and handing over documented proof of successful compliance.'
    },
    {
        step: 6,
        title: 'Ongoing Advisory',
        description: 'Providing monthly or quarterly legal health checks to maintain your business foundation.'
    }
];

const technologies = [
    { name: 'MCA Portal' },
    { name: 'GST Portal' },
    { name: 'LegalTech AI' },
    { name: 'e-Sign' },
    { name: 'Contract Automation' },
    { name: 'HENU Compliance Bots' }
];

export default function LegalServicesPage() {
    return (
        <ServicePage
            heroTitle="Comprehensive"
            heroHighlight="Legal Services"
            heroDescription="Navigate business compliance effortlessly. From registration to annual filings—India-focused expertise."
            heroAccentColor="amber"
            features={features}
            process={process}
            technologies={technologies}
            ctaTitle="Legal Peace of Mind"
            ctaDescription="Secure your business foundation today!"
        />
    );
}
