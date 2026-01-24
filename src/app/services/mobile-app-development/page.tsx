'use client';

import { ServicePage } from '@/components/service-page';
import {
    Smartphone,
    Zap,
    Bell,
    Wifi,
    ShoppingCart,
    MapPin
} from 'lucide-react';

const features = [
    {
        title: 'Native iOS & Android',
        description: 'High-performance native apps for both platforms with platform-specific optimizations.',
        icon: <Smartphone size={28} />
    },
    {
        title: 'Cross-Platform Development',
        description: 'Cost-effective solutions using React Native and Flutter for simultaneous iOS and Android deployment.',
        icon: <Zap size={28} />
    },
    {
        title: 'Push Notifications',
        description: 'Engage users with targeted push notifications and in-app messaging systems.',
        icon: <Bell size={28} />
    },
    {
        title: 'Offline Functionality',
        description: 'Apps that work seamlessly even without internet connectivity.',
        icon: <Wifi size={28} />
    },
    {
        title: 'In-App Purchases',
        description: 'Monetization features including subscriptions, one-time purchases, and digital goods.',
        icon: <ShoppingCart size={28} />
    },
    {
        title: 'Location Services',
        description: 'GPS tracking, geofencing, and location-based features for enhanced user experiences.',
        icon: <MapPin size={28} />
    }
];

const process = [
    {
        step: 1,
        title: 'Requirement Analysis',
        description: 'Deep dive into your app idea, target users, and business objectives to define the perfect scope.'
    },
    {
        step: 2,
        title: 'UI/UX Design',
        description: 'Creating intuitive, beautiful interfaces following Apple and Google design guidelines.'
    },
    {
        step: 3,
        title: 'Development Sprints',
        description: 'Agile development with bi-weekly deliverables so you can track progress constantly.'
    },
    {
        step: 4,
        title: 'Integration & Testing',
        description: 'API integrations, third-party services, and comprehensive testing on real devices.'
    },
    {
        step: 5,
        title: 'App Store Submission',
        description: 'We handle the entire submission process to Apple App Store and Google Play Store.'
    },
    {
        step: 6,
        title: 'Post-Launch Support',
        description: 'Bug fixes, updates, and feature enhancements to keep your app competitive.'
    }
];

const technologies = [
    { name: 'React Native' },
    { name: 'Flutter' },
    { name: 'Swift' },
    { name: 'Kotlin' },
    { name: 'iOS SDK' },
    { name: 'Android SDK' },
    { name: 'Firebase' },
    { name: 'Expo' },
    { name: 'Redux' },
    { name: 'SQLite' },
    { name: 'Realm' },
    { name: 'Push Notifications' },
    { name: 'In-App Payments' },
    { name: 'Analytics' }
];

export default function MobileAppDevelopmentPage() {
    return (
        <ServicePage
            heroTitle="Innovative"
            heroHighlight="Mobile App Development"
            heroDescription="Transform your ideas into powerful mobile experiences. We build apps that users love and businesses rely on."
            heroAccentColor="cyan"
            features={features}
            process={process}
            technologies={technologies}
            ctaTitle="Launch Your App"
            ctaDescription="Ready to take your business mobile? Let's build something amazing together."
        />
    );
}
