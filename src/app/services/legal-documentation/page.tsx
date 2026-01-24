'use client';

import { ServicePage } from '@/components/service-page';
import {
    FileText,
    Shield,
    Handshake,
    Scale,
    FileCheck,
    Lock
} from 'lucide-react';

const features = [
    {
        title: 'Contract Drafting',
        description: 'Professional contracts tailored to your business needs - from service agreements to partnerships.',
        icon: <FileText size={28} />
    },
    {
        title: 'NDA & Confidentiality',
        description: 'Protect your business secrets with comprehensive non-disclosure agreements.',
        icon: <Lock size={28} />
    },
    {
        title: 'Terms & Policies',
        description: 'Website terms of service, privacy policies, and refund policies compliant with regulations.',
        icon: <Shield size={28} />
    },
    {
        title: 'Partnership Agreements',
        description: 'Clear, fair partnership agreements that protect all parties involved.',
        icon: <Handshake size={28} />
    },
    {
        title: 'Employment Contracts',
        description: 'Comprehensive employment agreements, offer letters, and HR documentation.',
        icon: <FileCheck size={28} />
    },
    {
        title: 'Legal Review',
        description: 'Expert review of existing documents to identify risks and suggest improvements.',
        icon: <Scale size={28} />
    }
];

const process = [
    {
        step: 1,
        title: 'Requirement Gathering',
        description: 'Understand your specific legal documentation needs and business context.'
    },
    {
        step: 2,
        title: 'Document Drafting',
        description: 'Our legal experts draft customized documents based on your requirements.'
    },
    {
        step: 3,
        title: 'Review & Revision',
        description: 'Collaborative review process with unlimited revisions until you\'re satisfied.'
    },
    {
        step: 4,
        title: 'Final Delivery',
        description: 'Receive finalized documents in editable and PDF formats.'
    },
    {
        step: 5,
        title: 'Implementation Support',
        description: 'Guidance on how to properly implement and use your legal documents.'
    },
    {
        step: 6,
        title: 'Ongoing Updates',
        description: 'Regular updates as laws change to keep your documents compliant.'
    }
];

export default function LegalDocumentationPage() {
    return (
        <ServicePage
            heroTitle="Professional"
            heroHighlight="Legal Documentation"
            heroDescription="Comprehensive legal documents that protect your business. From contracts to compliance, we've got you covered."
            heroAccentColor="amber"
            features={features}
            process={process}
            ctaTitle="Protect Your Business"
            ctaDescription="Don't leave your business vulnerable. Get proper legal documentation today."
        />
    );
}
