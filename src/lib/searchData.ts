// Search data structure and utilities for global search

export interface SearchItem {
    type: 'page' | 'service' | 'software' | 'category' | 'policy' | 'section';
    title: string;
    description: string;
    href: string;
    category?: string;
    tags?: string[];
    keywords?: string[];
    priority?: number; // Higher number = higher priority in search results
}

export interface GroupedResults {
    sections: SearchItem[];  // High-priority product/feature sections
    pages: SearchItem[];
    services: SearchItem[];
    software: SearchItem[];
    categories: SearchItem[];
    policies: SearchItem[];
}

// Static pages data
const pages: SearchItem[] = [
    {
        type: 'page',
        title: 'Home',
        description: 'Henu OS - Technology, Legal & Finance Solutions',
        href: '/',
        keywords: ['home', 'landing', 'start', 'main', 'index'],
        priority: 8
    },
    {
        type: 'page',
        title: 'Services',
        description: 'Comprehensive solutions spanning technology, legal, and finance',
        href: '/services',
        keywords: ['services', 'solutions', 'offerings', 'development', 'legal', 'finance', 'what we do'],
        priority: 7
    },
    {
        type: 'page',
        title: 'Portfolio',
        description: 'Explore our complete suite of products, systems, and solutions',
        href: '/portfolio',
        keywords: ['portfolio', 'work', 'projects', 'case studies', 'examples', 'ecosystem', 'products', 'software'],
        priority: 7
    },
    {
        type: 'page',
        title: 'About Us',
        description: 'Learn about Henu OS and our mission',
        href: '/about',
        keywords: ['about', 'company', 'who we are', 'team', 'story', 'henu', 'henu ide', 'ide', 'code editor', 'henu pa++', 'pa++', 'ai assistant', 'products'],
        priority: 7
    },
    {
        type: 'page',
        title: 'Careers',
        description: 'Join our team and build the future',
        href: '/careers',
        keywords: ['careers', 'jobs', 'hiring', 'openings', 'internship', 'work with us'],
        priority: 6
    },
    {
        type: 'page',
        title: 'Contact',
        description: 'Get in touch with us',
        href: '/contact',
        keywords: ['contact', 'call', 'email', 'reach', 'support', 'help'],
        priority: 6
    },
    {
        type: 'page',
        title: 'Pricing',
        description: 'Pricing and subscription plans',
        href: '/pricing',
        keywords: ['pricing', 'cost', 'price', 'plans', 'charges', 'fees', 'quote'],
        priority: 7
    }
];

// Section-specific entries (products, features within pages)
const sections: SearchItem[] = [
    {
        type: 'section',
        title: 'HENU IDE',
        description: 'AI-powered development environment showcased on our About page',
        href: '/about#henu-ide',
        keywords: ['henu ide', 'ide', 'code editor', 'development environment', 'coding', 'programming'],
        priority: 10
    },
    {
        type: 'section',
        title: 'HENU PA++',
        description: 'Advanced AI assistant featured on our About page',
        href: '/about#henu-pa',
        keywords: ['henu pa++', 'pa++', 'ai assistant', 'personal assistant', 'virtual assistant'],
        priority: 10
    }
];

// Services data
const services: SearchItem[] = [
    {
        type: 'service',
        title: 'Website Development',
        description: 'Innovative web solutions powered by HENU OS AI for smarter performance and extreme scalability',
        href: '/services/web-development',
        category: 'Core Technology',
        tags: ['web', 'development', 'ai', 'scalability'],
        keywords: ['website', 'web', 'frontend', 'ui', 'ux', 'react', 'nextjs', 'web development', 'web design', 'responsive', 'landing page'],
        priority: 9
    },
    {
        type: 'service',
        title: 'Backend Development',
        description: 'Scalable backend infrastructure with real-time AI and seamless reliability built on HENU OS',
        href: '/services/backend-development',
        category: 'Core Technology',
        tags: ['backend', 'api', 'infrastructure', 'ai'],
        keywords: ['backend', 'server', 'api', 'database', 'node', 'auth', 'backend development', 'rest api', 'graphql', 'microservices'],
        priority: 9
    },
    {
        type: 'service',
        title: 'Mobile App Development',
        description: 'Powerful native and cross-platform mobile experiences that users love and businesses rely on',
        href: '/services/mobile-app-development',
        category: 'Core Technology',
        tags: ['mobile', 'app', 'ios', 'android'],
        keywords: ['mobile', 'app', 'android', 'ios', 'flutter', 'react native', 'mobile app', 'mobile development', 'native app', 'cross platform'],
        priority: 9
    },
    {
        type: 'service',
        title: 'AI Automations',
        description: 'Automate your workflows with custom HENU AI agents to save time, cut costs, and boost efficiency',
        href: '/services/ai-automations',
        category: 'Core Technology',
        tags: ['ai', 'automation', 'agents', 'workflow'],
        keywords: ['ai', 'automation', 'machine learning', 'bot', 'workflow', 'artificial intelligence', 'chatbot', 'ai agent', 'intelligent automation'],
        priority: 9
    },
    {
        type: 'service',
        title: 'Graphic Design',
        description: 'Stunning visuals and brand identities infused with modern AI tools for precision and impact',
        href: '/services/graphic-design',
        category: 'Growth & Design',
        tags: ['design', 'graphics', 'branding', 'visual'],
        keywords: ['design', 'graphics', 'logo', 'branding', 'ui design', 'graphic design', 'visual design', 'brand identity', 'creative'],
        priority: 8
    },
    {
        type: 'service',
        title: 'Digital Marketing & Ads',
        description: 'Data-backed campaigns across all channels to skyrocket your visibility and sales',
        href: '/services/digital-marketing',
        category: 'Growth & Design',
        tags: ['marketing', 'advertising', 'digital', 'campaigns'],
        keywords: ['marketing', 'ads', 'seo', 'google ads', 'social media', 'growth', 'digital marketing', 'advertising', 'ppc', 'facebook ads'],
        priority: 8
    },
    {
        type: 'service',
        title: 'Legal Services',
        description: 'Full-spectrum legal support and business compliance for startups and SMEs—India-focused expertise',
        href: '/services/legal-services',
        category: 'Institutional & Financial',
        tags: ['legal', 'compliance', 'documentation', 'registration'],
        keywords: ['legal', 'law', 'compliance', 'registration', 'startup legal', 'legal services', 'business registration', 'contracts'],
        priority: 8
    },
    {
        type: 'service',
        title: 'Funding Solutions',
        description: 'Strategic funding paths from government grants to investor pitches to fuel your growth',
        href: '/services/funding-solutions',
        category: 'Institutional & Financial',
        tags: ['funding', 'grants', 'investment', 'finance'],
        keywords: ['funding', 'investment', 'grants', 'startup funding', 'capital', 'investors', 'seed funding', 'angel investors'],
        priority: 8
    }
];

// Static software products
const staticSoftware: SearchItem[] = [
    {
        type: 'software',
        title: 'Hospital Management System',
        description: 'Comprehensive healthcare management solution with patient records, appointment scheduling, billing, inventory management, and analytics',
        href: '/portfolio',
        category: 'Healthcare Retail',
        tags: ['Healthcare', 'Management', 'Digital'],
        keywords: ['hospital', 'healthcare', 'patient', 'medical', 'clinic', 'doctor']
    },
    {
        type: 'software',
        title: 'Accounting Software',
        description: 'Complete accounting solution for businesses with GST compliance, invoicing, expense tracking, financial reports, and tax management',
        href: '/portfolio',
        category: 'Business & Finance',
        tags: ['Finance', 'GST', 'Invoicing'],
        keywords: ['accounting', 'gst', 'finance', 'invoice', 'tax', 'bookkeeping']
    },
    {
        type: 'software',
        title: 'Hotel Management System',
        description: 'All-in-one hotel management platform featuring room booking, guest management, POS integration, housekeeping, and revenue analytics',
        href: '/portfolio',
        category: 'Hospitality & Services',
        tags: ['Hospitality', 'Booking', 'POS'],
        keywords: ['hotel', 'hospitality', 'booking', 'reservation', 'guest', 'rooms']
    },
    {
        type: 'software',
        title: 'School / College Fees Management System',
        description: 'Comprehensive educational institution management with student enrollment, fee collection, attendance tracking, grade management, and parent portal',
        href: '/portfolio',
        category: 'Enterprise & Institutional',
        tags: ['Education', 'Fees', 'Management'],
        keywords: ['school', 'college', 'education', 'student', 'fees', 'academic']
    },
    {
        type: 'software',
        title: 'Restaurant Management System',
        description: 'Complete restaurant solution with table management, order processing, kitchen display, inventory tracking, and billing',
        href: '/portfolio',
        category: 'Hospitality & Services',
        tags: ['Restaurant', 'POS', 'Kitchen'],
        keywords: ['restaurant', 'food', 'menu', 'order', 'kitchen', 'billing']
    },
    {
        type: 'software',
        title: 'Travel Agency Management System',
        description: 'End-to-end travel agency platform with booking management, itinerary creation, payment processing, customer management, and vendor coordination',
        href: '/portfolio',
        category: 'Hospitality & Services',
        tags: ['Travel', 'Booking', 'CRM'],
        keywords: ['travel', 'agency', 'tourism', 'booking', 'tour', 'itinerary']
    },
    {
        type: 'software',
        title: 'Pharmacy Management System',
        description: 'Advanced pharmacy software with inventory management, prescription tracking, billing, expiry alerts, and sales analytics',
        href: '/portfolio',
        category: 'Healthcare Retail',
        tags: ['Pharmacy', 'Inventory', 'Billing'],
        keywords: ['pharmacy', 'medicine', 'prescription', 'drugs', 'medical store']
    },
    {
        type: 'software',
        title: 'E-commerce Solutions',
        description: 'Full-featured e-commerce platform with product catalog, shopping cart, payment gateway integration, order management, and customer analytics',
        href: '/portfolio',
        category: 'Digital Commerce',
        tags: ['E-commerce', 'Online Store', 'Payment'],
        keywords: ['ecommerce', 'online store', 'shop', 'cart', 'payment', 'retail']
    },
    {
        type: 'software',
        title: 'Employee Management System',
        description: 'Complete HR and employee management solution with attendance, payroll, leave management, performance tracking, and employee portal',
        href: '/portfolio',
        category: 'Enterprise & Institutional',
        tags: ['HR', 'Payroll', 'Attendance'],
        keywords: ['employee', 'hr', 'payroll', 'attendance', 'staff', 'hrms']
    },
    {
        type: 'software',
        title: 'Invoicing System',
        description: 'Professional invoicing and billing software with customizable templates, automatic payment reminders, expense tracking, and financial reports',
        href: '/portfolio',
        category: 'Business & Finance',
        tags: ['Invoicing', 'Billing', 'Finance'],
        keywords: ['invoice', 'billing', 'payment', 'receipt', 'finance']
    },
    {
        type: 'software',
        title: 'Inventory Management System',
        description: 'Robust inventory management solution with stock tracking, purchase orders, warehouse management, supplier management, and real-time reports',
        href: '/portfolio',
        category: 'Business & Finance',
        tags: ['Inventory', 'Warehouse', 'Stock'],
        keywords: ['inventory', 'stock', 'warehouse', 'supplier', 'purchase']
    }
];

// Policy pages
const policies: SearchItem[] = [
    {
        type: 'policy',
        title: 'Privacy Policy',
        description: 'How we collect, use, and protect your personal information',
        href: '/privacy-policy',
        keywords: ['privacy', 'data', 'policy', 'gdpr']
    },
    {
        type: 'policy',
        title: 'Terms of Use',
        description: 'Terms and conditions for using our services',
        href: '/terms-of-use',
        keywords: ['terms', 'conditions', 'usage', 'agreement']
    },
    {
        type: 'policy',
        title: 'Copyright',
        description: 'Copyright information and intellectual property rights',
        href: '/copyright',
        keywords: ['copyright', 'ip', 'intellectual property']
    },
    {
        type: 'policy',
        title: 'Feedback',
        description: 'Share your feedback and suggestions with us',
        href: '/feedback',
        keywords: ['feedback', 'review', 'suggestion', 'complaint']
    },
    {
        type: 'policy',
        title: 'Site Map',
        description: 'Navigate through our website structure',
        href: '/site-map',
        keywords: ['sitemap', 'pages', 'navigation', 'structure']
    },
    {
        type: 'policy',
        title: 'Website Policies',
        description: 'All policies governing the use of our website',
        href: '/website-policies',
        keywords: ['policies', 'rules', 'legal info']
    }
];

// Generate categories from software and services
function getCategories(): SearchItem[] {
    const categoryMap = new Map<string, SearchItem>();

    // Extract from static software
    staticSoftware.forEach(item => {
        if (item.category && !categoryMap.has(item.category)) {
            categoryMap.set(item.category, {
                type: 'category',
                title: item.category,
                description: `Browse all ${item.category.toLowerCase()} solutions`,
                href: '/portfolio',
                category: item.category,
                keywords: [item.category.toLowerCase(), 'category']
            });
        }
    });

    // Extract from services
    services.forEach(item => {
        if (item.category && !categoryMap.has(item.category)) {
            categoryMap.set(item.category, {
                type: 'category',
                title: item.category,
                description: `Explore our ${item.category.toLowerCase()} services`,
                href: '/services',
                category: item.category,
                keywords: [item.category.toLowerCase(), 'category']
            });
        }
    });

    return Array.from(categoryMap.values());
}

// Fetch dynamic software from API
export async function fetchDynamicSoftware(): Promise<SearchItem[]> {
    try {
        const response = await fetch('/api/admin/software');
        const data = await response.json();

        if (data.software && Array.isArray(data.software)) {
            return data.software.map((item: any) => ({
                type: 'software' as const,
                title: item.title || item.name,
                description: item.description || '',
                href: '/portfolio',
                category: item.category || 'Custom',
                tags: item.tags || [],
                keywords: [
                    item.title?.toLowerCase() || '',
                    item.name?.toLowerCase() || '',
                    item.category?.toLowerCase() || '',
                    ...(item.tags || []).map((t: string) => t.toLowerCase())
                ].filter(Boolean)
            }));
        }
    } catch (error) {
        console.error('Error fetching dynamic software:', error);
    }

    return [];
}

// Highlight matching text
export function highlightMatch(text: string, query: string): string {
    if (!query || !text) return text;

    const regex = new RegExp(`(${query})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
}

// Main search function with priority-based ranking
export async function searchContent(query: string): Promise<GroupedResults> {
    const normalizedQuery = query.toLowerCase().trim();

    if (!normalizedQuery) {
        return {
            sections: [],
            pages: [],
            services: [],
            software: [],
            categories: [],
            policies: []
        };
    }

    // Fetch dynamic software
    const dynamicSoftware = await fetchDynamicSoftware();
    const allSoftware = [...staticSoftware, ...dynamicSoftware];
    const categories = getCategories();

    // Search function for a single item
    const matches = (item: SearchItem): boolean => {
        const searchableText = [
            item.title,
            item.description,
            item.category,
            ...(item.tags || []),
            ...(item.keywords || [])
        ]
            .filter(Boolean)
            .join(' ')
            .toLowerCase();

        return searchableText.includes(normalizedQuery);
    };

    // Sort by priority (higher first), then alphabetically
    const sortByPriority = (a: SearchItem, b: SearchItem): number => {
        const priorityA = a.priority || 0;
        const priorityB = b.priority || 0;

        if (priorityA !== priorityB) {
            return priorityB - priorityA; // Higher priority first
        }

        return a.title.localeCompare(b.title); // Alphabetical fallback
    };

    return {
        sections: sections.filter(matches).sort(sortByPriority),
        pages: pages.filter(matches).sort(sortByPriority),
        services: services.filter(matches).sort(sortByPriority),
        software: allSoftware.filter(matches).sort(sortByPriority),
        categories: categories.filter(matches).sort(sortByPriority),
        policies: policies.filter(matches).sort(sortByPriority)
    };
}

// Get all search data (useful for initialization)
export function getAllSearchData(): SearchItem[] {
    return [...pages, ...services, ...staticSoftware, ...policies, ...getCategories()];
}
