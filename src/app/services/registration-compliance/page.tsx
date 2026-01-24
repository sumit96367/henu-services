'use client';

import { ServicePage } from '@/components/service-page';
import {
    Building,
    BadgeCheck,
    FileText,
    Shield,
    Stamp,
    BookOpen
} from 'lucide-react';

const features = [
    {
        title: 'Company Registration',
        description: 'Complete private limited, LLP, OPC, and partnership firm registration services.',
        icon: <Building size={28} />
    },
    {
        title: 'Trademark Registration',
        description: 'Protect your brand with comprehensive trademark search and registration.',
        icon: <Stamp size={28} />
    },
    {
        title: 'GST Registration',
        description: 'Quick and hassle-free GST registration and ongoing compliance.',
        icon: <FileText size={28} />
    },
    {
        title: 'MSME Registration',
        description: 'Udyam registration and MSME certification for government benefits.',
        icon: <BadgeCheck size={28} />
    },
    {
        title: 'Compliance Management',
        description: 'Annual filings, ROC compliance, and statutory requirements handled.',
        icon: <Shield size={28} />
    },
    {
        title: 'IP Protection',
        description: 'Patent filing, copyright registration, and design protection services.',
        icon: <BookOpen size={28} />
    }
];

const process = [
    {
        step: 1,
        title: 'Consultation',
        description: 'Free consultation to understand your business structure needs.'
    },
    {
        step: 2,
        title: 'Documentation',
        description: 'We prepare and collect all necessary documents for registration.'
    },
    {
        step: 3,
        title: 'Application Filing',
        description: 'Submit applications to relevant government authorities.'
    },
    {
        step: 4,
        title: 'Follow-up',
        description: 'Closely track applications and respond to any queries.'
    },
    {
        step: 5,
        title: 'Certificate Delivery',
        description: 'Receive your registration certificates and documentation.'
    },
    {
        step: 6,
        title: 'Ongoing Compliance',
        description: 'Continuous support for annual filings and compliance requirements.'
    }
];

export default function RegistrationCompliancePage() {
    return (
        <ServicePage
            heroTitle="Complete"
            heroHighlight="Registration & Compliance"
            heroDescription="End-to-end business registration and compliance services. From incorporation to ongoing filings, we handle it all."
            heroAccentColor="amber"
            features={features}
            process={process}
            ctaTitle="Register Your Business"
            ctaDescription="Start your business journey with proper legal foundation. We make registration simple."
        />
    );
}
