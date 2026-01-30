'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

// Category data with roles and pricing
const categoryData: Record<string, {
    title: string;
    description: string;
    roles: { value: string; label: string; price: string; includes: string[] }[];
}> = {
    'big-tech': {
        title: 'Big Tech / Product Tech',
        description: 'Select your specialization to view curated internship sources and pricing for top product companies.',
        roles: [
            { value: 'frontend', label: 'Frontend Developer', price: '₹2,999', includes: ['100+ verified sources', 'Application templates', 'Interview prep guide'] },
            { value: 'backend', label: 'Backend Developer', price: '₹2,999', includes: ['100+ verified sources', 'System design resources', 'Technical interview prep'] },
            { value: 'fullstack', label: 'Full Stack Developer', price: '₹3,499', includes: ['150+ verified sources', 'Complete tech stack guides', 'Project templates'] },
            { value: 'sde', label: 'Software Development Engineer (SDE)', price: '₹3,499', includes: ['200+ top company sources', 'DSA preparation kit', 'Mock interviews'] },
            { value: 'android', label: 'Android Developer', price: '₹2,499', includes: ['80+ mobile dev sources', 'App development guides', 'Portfolio projects'] },
            { value: 'ios', label: 'iOS Developer', price: '₹2,499', includes: ['80+ mobile dev sources', 'Swift resources', 'App Store deployment guide'] },
            { value: 'cloud', label: 'Cloud Engineer', price: '₹2,999', includes: ['100+ cloud sources', 'AWS/Azure/GCP guides', 'Certification prep'] },
            { value: 'data-eng', label: 'Data Engineer', price: '₹3,299', includes: ['120+ data pipeline sources', 'ETL frameworks', 'Real-world projects'] },
            { value: 'aiml-eng', label: 'AI/ML Engineer', price: '₹3,499', includes: ['150+ AI/ML sources', 'Model deployment guides', 'Research papers'] },
        ]
    },
    'ai-ml': {
        title: 'AI / ML / Data Science',
        description: 'Access specialized AI/ML internship opportunities and resources tailored to your expertise.',
        roles: [
            { value: 'data-analyst', label: 'Data Analyst', price: '₹2,499', includes: ['100+ analytics sources', 'SQL & Python guides', 'Dashboard projects'] },
            { value: 'data-science', label: 'Data Science Intern', price: '₹2,999', includes: ['120+ DS sources', 'ML algorithms guide', 'Kaggle competition prep'] },
            { value: 'ml-intern', label: 'Machine Learning Intern', price: '₹3,299', includes: ['150+ ML sources', 'Model training resources', 'Research paper access'] },
            { value: 'ai-automation', label: 'AI Automation Intern', price: '₹2,999', includes: ['100+ automation sources', 'LLM integration guides', 'AI tools mastery'] },
            { value: 'nlp', label: 'NLP Intern', price: '₹3,299', includes: ['120+ NLP sources', 'Transformer models guide', 'Text processing projects'] },
            { value: 'cv', label: 'Computer Vision Intern', price: '₹3,299', includes: ['120+ CV sources', 'Image processing guides', 'Object detection projects'] },
            { value: 'genai', label: 'GenAI / LLM Intern', price: '₹3,999', includes: ['200+ GenAI sources', 'LLM fine-tuning guide', 'Prompt engineering'] },
            { value: 'data-eng-ai', label: 'Data Engineer', price: '₹3,299', includes: ['120+ data sources', 'Big data frameworks', 'Pipeline optimization'] },
        ]
    },
    'cybersecurity': {
        title: 'Cyber Security & Networking',
        description: 'Discover cybersecurity and networking internship sources with industry-standard preparation.',
        roles: [
            { value: 'cyber-security', label: 'Cyber Security Intern', price: '₹2,999', includes: ['100+ security sources', 'Tools & frameworks', 'Security certifications'] },
            { value: 'ethical-hacking', label: 'Ethical Hacking Intern', price: '₹3,299', includes: ['120+ hacking sources', 'Penetration testing guides', 'Bug bounty prep'] },
            { value: 'soc-analyst', label: 'SOC Analyst Intern', price: '₹2,999', includes: ['100+ SOC sources', 'SIEM tools training', 'Incident response guide'] },
            { value: 'network-eng', label: 'Network Engineer Intern', price: '₹2,499', includes: ['80+ networking sources', 'Cisco/Juniper guides', 'Network design projects'] },
            { value: 'cloud-security', label: 'Cloud Security Intern', price: '₹3,299', includes: ['120+ cloud sec sources', 'IAM & compliance guides', 'Security automation'] },
            { value: 'devsecops', label: 'DevSecOps Intern', price: '₹3,499', includes: ['150+ DevSecOps sources', 'CI/CD security', 'Container security'] },
        ]
    },
    'software-dev': {
        title: 'Software Development (SDE)',
        description: 'Core software development internships covering frontend, backend, mobile, and system design.',
        roles: [
            { value: 'frontend-sde', label: 'Frontend Developer', price: '₹2,999', includes: ['100+ frontend sources', 'React/Vue/Angular guides', 'UI/UX projects'] },
            { value: 'backend-sde', label: 'Backend Developer', price: '₹2,999', includes: ['100+ backend sources', 'API development', 'Database optimization'] },
            { value: 'fullstack-sde', label: 'Full Stack Developer', price: '₹3,499', includes: ['150+ fullstack sources', 'End-to-end projects', 'Deployment guides'] },
            { value: 'android-sde', label: 'Android Developer', price: '₹2,499', includes: ['80+ Android sources', 'Kotlin/Java mastery', 'Play Store publishing'] },
            { value: 'ios-sde', label: 'iOS Developer', price: '₹2,499', includes: ['80+ iOS sources', 'SwiftUI guides', 'App architecture patterns'] },
            { value: 'system-design', label: 'System Design Intern', price: '₹3,999', includes: ['200+ system design sources', 'Scalability patterns', 'Architecture guides'] },
            { value: 'api-dev', label: 'API Development Intern', price: '₹2,699', includes: ['90+ API sources', 'REST/GraphQL guides', 'API security'] },
        ]
    },
    'finance': {
        title: 'Finance & Trading',
        description: 'Specialized fintech and trading internship sources for markets and financial systems.',
        roles: [
            { value: 'stock-market', label: 'Stock Market Intern', price: '₹2,999', includes: ['100+ market sources', 'Trading strategies', 'Market analysis tools'] },
            { value: 'trading', label: 'Trading Intern', price: '₹3,299', includes: ['120+ trading sources', 'Algorithmic trading', 'Risk management'] },
            { value: 'quant', label: 'Quantitative Analyst Intern', price: '₹3,999', includes: ['150+ quant sources', 'Mathematical modeling', 'Statistical analysis'] },
            { value: 'fintech-dev', label: 'FinTech Developer Intern', price: '₹3,299', includes: ['120+ fintech sources', 'Payment systems', 'Blockchain basics'] },
            { value: 'fin-analyst', label: 'Financial Data Analyst', price: '₹2,999', includes: ['100+ analytics sources', 'Financial modeling', 'Data visualization'] },
        ]
    },
    'startup': {
        title: 'Startup & Growth',
        description: 'Work directly with startups in product, strategy, growth, and founder-led initiatives.',
        roles: [
            { value: 'startup-intern', label: 'Startup Intern', price: '₹1,999', includes: ['80+ startup sources', 'Pitch deck templates', 'Startup ecosystem guide'] },
            { value: 'pm', label: 'Product Management Intern', price: '₹3,299', includes: ['120+ PM sources', 'Product roadmaps', 'User research methods'] },
            { value: 'growth', label: 'Growth & Strategy Intern', price: '₹2,999', includes: ['100+ growth sources', 'Growth hacking techniques', 'Analytics frameworks'] },
            { value: 'business-analyst', label: 'Business Analyst Intern', price: '₹2,699', includes: ['90+ BA sources', 'Market research guides', 'Business modeling'] },
            { value: 'founders-office', label: "Founder's Office Intern", price: '₹2,499', includes: ['80+ exclusive sources', 'Executive mentorship', 'Strategic planning'] },
            { value: 'campus-ambassador', label: 'Campus Ambassador', price: '₹1,499', includes: ['60+ ambassador sources', 'Marketing toolkit', 'Community building'] },
        ]
    },
    'research': {
        title: 'Research & Innovation',
        description: 'Research-oriented internships in AI, data science, and academic innovation.',
        roles: [
            { value: 'research', label: 'Research Intern', price: '₹2,999', includes: ['100+ research sources', 'Paper writing guides', 'Research methodology'] },
            { value: 'ai-research', label: 'AI Research Intern', price: '₹3,999', includes: ['150+ AI research sources', 'Top lab connections', 'Publication support'] },
            { value: 'ds-research', label: 'Data Science Research Intern', price: '₹3,499', includes: ['130+ DS research sources', 'Statistical methods', 'Research datasets'] },
            { value: 'academic', label: 'Academic / Lab Research Intern', price: '₹2,999', includes: ['100+ academic sources', 'Lab protocols', 'Grant writing tips'] },
            { value: 'product-research', label: 'Product Research Intern', price: '₹2,699', includes: ['90+ product research sources', 'User studies', 'Prototyping guides'] },
        ]
    },
    'cloud-devops': {
        title: 'Cloud, DevOps & AdTech',
        description: 'Cloud infrastructure, DevOps, SRE, and advertising technology internships.',
        roles: [
            { value: 'cloud-intern', label: 'Cloud Engineer Intern', price: '₹2,999', includes: ['100+ cloud sources', 'Multi-cloud deployment', 'Infrastructure as code'] },
            { value: 'devops', label: 'DevOps Intern', price: '₹3,299', includes: ['120+ DevOps sources', 'CI/CD pipelines', 'Containerization'] },
            { value: 'sre', label: 'Site Reliability Engineer (SRE) Intern', price: '₹3,499', includes: ['140+ SRE sources', 'Monitoring & alerting', 'Incident management'] },
            { value: 'adtech', label: 'AdTech Intern', price: '₹2,699', includes: ['90+ AdTech sources', 'Programmatic advertising', 'Ad platforms'] },
            { value: 'cloud-automation', label: 'Cloud Automation Intern', price: '₹3,099', includes: ['110+ automation sources', 'Terraform/Ansible', 'Scripting mastery'] },
        ]
    },
    'global-remote': {
        title: 'Global Tech & Remote',
        description: 'Remote and international internships including open-source and global software roles.',
        roles: [
            { value: 'global-software', label: 'Global Software Intern', price: '₹3,499', includes: ['150+ global sources', 'Timezone management', 'Remote work best practices'] },
            { value: 'remote-ai', label: 'Remote AI Intern', price: '₹3,999', includes: ['160+ remote AI sources', 'Async collaboration', 'International projects'] },
            { value: 'intl-research', label: 'International Research Intern', price: '₹3,999', includes: ['140+ research sources', 'Global lab connections', 'Cross-border collaboration'] },
            { value: 'opensource', label: 'Open Source Intern', price: '₹2,499', includes: ['100+ OSS sources', 'Contribution guides', 'Community engagement'] },
        ]
    },
    'languages': {
        title: 'Languages',
        description: 'Language-specific internships across web, AI, backend, system, and research domains.',
        roles: [
            { value: 'python', label: 'Python', price: '₹2,999', includes: ['120+ Python sources', 'Framework mastery', 'Real-world projects'] },
            { value: 'java', label: 'Java', price: '₹2,999', includes: ['120+ Java sources', 'Spring Boot guides', 'Enterprise applications'] },
            { value: 'cpp', label: 'C / C++', price: '₹2,699', includes: ['100+ C/C++ sources', 'System programming', 'Competitive coding'] },
            { value: 'javascript', label: 'JavaScript', price: '₹2,999', includes: ['120+ JS sources', 'Modern frameworks', 'Full-stack projects'] },
            { value: 'typescript', label: 'TypeScript', price: '₹2,999', includes: ['110+ TS sources', 'Type-safe development', 'Enterprise patterns'] },
            { value: 'go', label: 'Go', price: '₹2,799', includes: ['90+ Go sources', 'Microservices', 'Concurrency patterns'] },
            { value: 'rust', label: 'Rust', price: '₹2,999', includes: ['80+ Rust sources', 'Systems programming', 'WebAssembly'] },
            { value: 'kotlin', label: 'Kotlin', price: '₹2,499', includes: ['80+ Kotlin sources', 'Android development', 'Backend with Ktor'] },
            { value: 'swift', label: 'Swift', price: '₹2,499', includes: ['80+ Swift sources', 'iOS development', 'SwiftUI mastery'] },
            { value: 'r', label: 'R', price: '₹2,299', includes: ['70+ R sources', 'Statistical analysis', 'Data visualization'] },
            { value: 'sql', label: 'SQL', price: '₹2,299', includes: ['80+ SQL sources', 'Database optimization', 'Query performance'] },
            { value: 'matlab', label: 'MATLAB', price: '₹2,499', includes: ['70+ MATLAB sources', 'Scientific computing', 'Simulation projects'] },
        ]
    },
    'design': {
        title: 'Design & Creative',
        description: 'UI/UX, product design, motion graphics, 3D, AR/VR, and creative technology roles.',
        roles: [
            { value: 'ui-design', label: 'UI Design Intern', price: '₹2,499', includes: ['90+ UI sources', 'Design systems', 'Portfolio building'] },
            { value: 'ux-design', label: 'UX Design Intern', price: '₹2,699', includes: ['100+ UX sources', 'User research', 'Wireframing tools'] },
            { value: 'product-design', label: 'Product Design Intern', price: '₹2,999', includes: ['110+ product design sources', 'End-to-end flows', 'Prototyping'] },
            { value: 'graphic-design', label: 'Graphic Design Intern', price: '₹2,299', includes: ['80+ graphic sources', 'Adobe mastery', 'Brand design'] },
            { value: 'motion-graphics', label: 'Motion Graphics Intern', price: '₹2,699', includes: ['90+ motion sources', 'After Effects', 'Animation principles'] },
            { value: 'visual-design', label: 'Visual Design Intern', price: '₹2,499', includes: ['85+ visual sources', 'Color theory', 'Typography'] },
            { value: '3d-design', label: '3D Design Intern', price: '₹2,999', includes: ['100+ 3D sources', 'Blender/Maya', 'Modeling & rendering'] },
            { value: 'game-design', label: 'Game Design Intern', price: '₹3,299', includes: ['120+ game design sources', 'Unity/Unreal', 'Level design'] },
            { value: 'ar-vr', label: 'AR / VR Design Intern', price: '₹3,499', includes: ['130+ AR/VR sources', 'Spatial design', 'XR development'] },
            { value: 'brand-creative', label: 'Brand & Creative Design Intern', price: '₹2,699', includes: ['95+ brand sources', 'Identity systems', 'Creative strategy'] },
        ]
    },
};

export default function InternshipSourcesPage() {
    const params = useParams();
    const router = useRouter();
    const category = params.category as string;
    const data = categoryData[category];

    const [formData, setFormData] = useState({
        email: '',
        fullName: '',
        contact: '',
        subDomain: '',
        query: ''
    });

    const [selectedRole, setSelectedRole] = useState<typeof data.roles[0] | null>(null);

    if (!data) {
        return (
            <div className="min-h-screen bg-black text-white flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-bold mb-4">Category Not Found</h1>
                    <button
                        onClick={() => router.push('/careers')}
                        className="text-cyan-400 hover:underline"
                    >
                        Return to Careers
                    </button>
                </div>
            </div>
        );
    }

    const handleSubDomainChange = (value: string) => {
        setFormData({ ...formData, subDomain: value });
        const role = data.roles.find(r => r.value === value);
        setSelectedRole(role || null);
    };

    return (
        <main className="min-h-screen bg-black text-white">
            {/* Hero Section - Full Height */}
            <section className="relative min-h-screen flex flex-col items-center justify-center px-6 md:px-12">
                {/* Back Button - Absolute positioned at top */}
                <div className="absolute top-8 left-1/2 -translate-x-1/2">
                    <button
                        onClick={() => router.push('/careers')}
                        className="flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-cyan-500/10 border border-white/10 hover:border-cyan-400/50 rounded-xl text-white hover:text-cyan-400 transition-all duration-300 group"
                    >
                        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                        Back to Careers
                    </button>
                </div>

                <div className="max-w-4xl mx-auto text-center">
                    {/* Title */}
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-7xl font-black mb-6 leading-tight"
                    >
                        <span className="text-white">Ready to access</span>
                        <br />
                        <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                            {data.title}
                        </span>
                        <br />
                        <span className="text-white">Internship Sources?</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-lg text-gray-400 leading-relaxed max-w-2xl mx-auto"
                    >
                        {data.description}
                    </motion.p>
                </div>
            </section>

            {/* Form Block Section */}
            <section className="relative -mt-64 pb-24 px-6 md:px-12 z-10 flex justify-center">
                <div className="w-full max-w-4xl">
                    {/* Info Block */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="backdrop-blur-xl shadow-2xl"
                        style={{
                            marginTop: '-40px',
                            padding: 'clamp(28px, 3vw, 38px)',
                            borderRadius: '18px',
                            background: 'rgba(255, 255, 255, 0.04)',
                            border: '1px solid rgba(255, 255, 255, 0.08)'
                        }}
                    >
                        {/* Section Title */}
                        <div className="text-center mb-8">
                            <h2 className="text-2xl md:text-3xl font-bold mb-2">
                                Let's Start with <span className="text-cyan-400">Your Details</span>
                            </h2>
                            <p className="text-gray-400 text-sm">
                                Select your specialization to view curated sources and pricing
                            </p>
                        </div>

                        <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                {/* Email */}
                                <div>
                                    <label className="block text-sm font-bold text-gray-300 mb-2">
                                        Email *
                                    </label>
                                    <input
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400/50 transition-colors"
                                        placeholder="your.email@example.com"
                                    />
                                </div>

                                {/* Full Name */}
                                <div>
                                    <label className="block text-sm font-bold text-gray-300 mb-2">
                                        Full Name *
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.fullName}
                                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400/50 transition-colors"
                                        placeholder="John Doe"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                {/* Contact */}
                                <div>
                                    <label className="block text-sm font-bold text-gray-300 mb-2">
                                        Contact *
                                    </label>
                                    <input
                                        type="tel"
                                        value={formData.contact}
                                        onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400/50 transition-colors"
                                        placeholder="+91 98765 43210"
                                    />
                                </div>

                                {/* Sub-Domain Dropdown */}
                                <div>
                                    <label className="block text-sm font-bold text-gray-300 mb-2">
                                        Sub-Domain / Role *
                                    </label>
                                    <select
                                        value={formData.subDomain}
                                        onChange={(e) => handleSubDomainChange(e.target.value)}
                                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-cyan-400/50 transition-colors appearance-none cursor-pointer"
                                    >
                                        <option value="" className="bg-gray-900">Select a specialization</option>
                                        {data.roles.map((role) => (
                                            <option key={role.value} value={role.value} className="bg-gray-900">
                                                {role.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {/* Query Textarea - Full Width */}
                            <div>
                                <label className="block text-sm font-bold text-gray-300 mb-2">
                                    Any Query (Optional)
                                </label>
                                <textarea
                                    value={formData.query}
                                    onChange={(e) => setFormData({ ...formData, query: e.target.value })}
                                    rows={4}
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400/50 transition-colors resize-none"
                                    placeholder="Any specific questions or requirements..."
                                />
                            </div>
                        </form>
                    </motion.div>

                    {/* Pricing Section - Appears when sub-domain is selected */}
                    <AnimatePresence>
                        {selectedRole && (
                            <motion.div
                                initial={{ opacity: 0, height: 0, marginTop: 0 }}
                                animate={{ opacity: 1, height: 'auto', marginTop: 32 }}
                                exit={{ opacity: 0, height: 0, marginTop: 0 }}
                                transition={{ duration: 0.3 }}
                                className="overflow-hidden"
                            >
                                <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 backdrop-blur-xl border border-cyan-400/30 rounded-2xl p-8">
                                    <h3 className="text-2xl font-bold text-white mb-2">
                                        {selectedRole.label}
                                    </h3>
                                    <div className="text-4xl font-black text-cyan-400 mb-6">
                                        {selectedRole.price}
                                    </div>

                                    <div className="mb-8">
                                        <h4 className="text-sm font-bold text-gray-300 mb-3 uppercase tracking-wider">
                                            What's Included:
                                        </h4>
                                        <ul className="space-y-2">
                                            {selectedRole.includes.map((item, index) => (
                                                <li key={index} className="flex items-start gap-2 text-gray-300">
                                                    <span className="text-cyan-400 mt-1">✓</span>
                                                    <span>{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* CTA Button */}
                                    <button
                                        disabled
                                        className="w-full py-4 px-6 bg-white/10 border border-white/20 rounded-xl text-white font-bold opacity-50 cursor-not-allowed"
                                    >
                                        Coming Soon - Backend Integration Pending
                                    </button>
                                    <p className="text-xs text-gray-500 text-center mt-3">
                                        This is a UI preview. Payment and data submission will be enabled soon.
                                    </p>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </section>
        </main>
    );
}
