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
        description: 'Deep dive into your app idea, target users, and business objectives to define the perfect scope.',
        image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070&auto=format&fit=crop'
    },
    {
        step: 2,
        title: 'UI/UX Design',
        description: 'Creating intuitive, beautiful interfaces following Apple and Google design guidelines.',
        image: 'https://images.unsplash.com/photo-1581291518062-c9a79e7e9f33?q=80&w=2070&auto=format&fit=crop'
    },
    {
        step: 3,
        title: 'Development Sprints',
        description: 'Agile development with bi-weekly deliverables so you can track progress constantly.',
        image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop'
    },
    {
        step: 4,
        title: 'Integration & Testing',
        description: 'API integrations, third-party services, and comprehensive testing on real devices.',
        image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop'
    },
    {
        step: 5,
        title: 'App Store Submission',
        description: 'We handle the entire submission process to Apple App Store and Google Play Store.',
        image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=1974&auto=format&fit=crop'
    },
    {
        step: 6,
        title: 'Post-Launch Support',
        description: 'Bug fixes, updates, and feature enhancements to keep your app competitive.',
        image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2070&auto=format&fit=crop'
    }
];

const technologies = [
    { name: 'React Native' },
    { name: 'Flutter' },
    { name: 'Swift' },
    { name: 'Kotlin' },
    { name: 'Firebase' },
    { name: 'HENU OS Voice AI' },
    { name: 'Expo' },
    { name: 'Redux' }
];

const faqs = [
    {
        question: "Do you develop for both iOS and Android?",
        answer: "Yes! We specialize in both native development (Swift for iOS, Kotlin for Android) and cross-platform solutions using React Native and Flutter. This gives you maximum flexibility based on your budget and timeline."
    },
    {
        question: "What is the timeline for a full-stack mobile app?",
        answer: "Typically, a full-featured mobile app takes 3-6 months from concept to launch. This includes design, development, testing, and app store submission. We follow an agile methodology with bi-weekly deliverables to keep you updated throughout the process."
    },
    {
        question: "Do you handle app store submissions?",
        answer: "Absolutely! We manage the entire submission process for both Apple App Store and Google Play Store, including developer account setup, app store optimization, compliance requirements, and addressing any reviewer feedback."
    },
    {
        question: "Can you integrate my existing web platform with a mobile app?",
        answer: "Yes! We can seamlessly integrate your mobile app with existing web platforms, databases, and APIs. We'll ensure user data, authentication, and features sync perfectly across all platforms."
    }
];
import {
    ServiceFeatures,
    ServiceProcess,
    ServiceTechnologies,
    ServiceCTA,
    ServiceFAQSection
} from '@/components/service-page';
import { FloatingIconsHero } from '@/components/ui/floating-icons-hero-section';
import {
    FaAndroid,
    FaApple,
    FaGooglePlay,
    FaAppStoreIos
} from 'react-icons/fa';
import {
    SiFlutter,
    SiReact,
    SiFirebase,
    SiKotlin,
    SiSwift,
    SiDart,
    SiExpo,
    SiRedux,
    SiTypescript,
    SiJavascript,
    SiVite,
    SiFramer
} from 'react-icons/si';

const mobileIcons = [
    { id: 1, icon: FaAndroid, color: "#3DDC84", className: 'top-[10%] left-[10%]' },
    { id: 2, icon: FaApple, color: "#FFFFFF", className: 'top-[20%] right-[8%]' },
    { id: 3, icon: SiFlutter, color: "#02569B", className: 'top-[80%] left-[12%]' },
    { id: 4, icon: SiReact, color: "#61DAFB", className: 'bottom-[12%] right-[10%]' },
    { id: 5, icon: SiFirebase, color: "#FFCA28", className: 'top-[5%] left-[30%]' },
    { id: 6, icon: SiKotlin, color: "#7F52FF", className: 'top-[7%] right-[32%]' },
    { id: 7, icon: SiSwift, color: "#F05138", className: 'bottom-[10%] left-[28%]' },
    { id: 8, icon: SiDart, color: "#0175C2", className: 'top-[42%] left-[12%]' },
    { id: 9, icon: SiExpo, color: "#FFFFFF", className: 'top-[78%] right-[22%]' },
    { id: 10, icon: FaGooglePlay, color: "#34A853", className: 'top-[88%] left-[65%]' },
    { id: 11, icon: FaAppStoreIos, color: "#007AFF", className: 'top-[48%] right-[6%]' },
    { id: 12, icon: SiRedux, color: "#764ABC", className: 'top-[52%] left-[6%]' },
    { id: 13, icon: SiTypescript, color: "#3178C6", className: 'top-[6%] left-[54%]' },
    { id: 14, icon: SiJavascript, color: "#F7DF1E", className: 'bottom-[6%] right-[48%]' },
    { id: 15, icon: SiVite, color: "#646CFF", className: 'top-[28%] right-[22%]' },
    { id: 16, icon: SiFramer, color: "#0055FF", className: 'top-[62%] left-[32%]' },
];

export default function MobileAppDevelopmentPage() {
    const heroTitle = "Innovative";
    const heroHighlight = "Mobile App Development";
    const heroDescription = "Transform your ideas into powerful mobile experiences. We build apps that users love and businesses rely on.";
    const heroAccentColor = "cyan";

    return (
        <main>
            {/* Navbar Spacer for all views */}
            <div className="h-[100px] md:h-[140px] w-full" />

            <FloatingIconsHero
                title={heroTitle}
                highlight={heroHighlight}
                subtitle={heroDescription}
                ctaText="Start Your Project"
                ctaHref="/contact"
                icons={mobileIcons}
            />

            <ServiceFeatures features={features} accentColor={heroAccentColor} />
            <ServiceProcess process={process} accentColor={heroAccentColor} />

            {technologies && technologies.length > 0 && (
                <ServiceTechnologies technologies={technologies} />
            )}

            <ServiceFAQSection faqs={faqs} />

            <ServiceCTA
                title="Launch Your App"
                description="Ready to take your business mobile? Let's build something amazing together."
                accentColor={heroAccentColor}
            />
        </main>
    );
}

