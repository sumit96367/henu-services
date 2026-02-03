// Admin Dashboard Type Definitions

export interface EnrollmentRecord {
    id: string;
    timestamp: string;
    fullName: string;
    email: string;
    domain: string;
    domainCategory: string;
    subDomain: string;
    plan: 'basic' | 'premium';
    amount: number;
    billingAddress: string;
    paymentMethod: 'card' | 'upi';
    orderId: string;
    status: 'pending' | 'completed' | 'failed';
}

export interface PaymentRecord {
    id: string;
    timestamp: string;
    enrollmentId: string;
    invoiceNumber: string;
    fullName: string;
    email: string;
    amount: number;
    status: 'paid' | 'pending' | 'failed';
    paymentMethod: 'card' | 'upi';
    orderId: string;
    razorpayPaymentId?: string;
    razorpaySignature?: string;
}

export interface AdminStats {
    totalEnrollments: number;
    totalRevenue: number;
    pendingPayments: number;
    completedPayments: number;
    recentEnrollments: EnrollmentRecord[];
    domainDistribution: Record<string, number>;
}

export interface EnrollmentFilters {
    domain?: string;
    subDomain?: string;
    status?: string;
    startDate?: string;
    endDate?: string;
    search?: string;
}

export interface PaymentFilters {
    status?: string;
    startDate?: string;
    endDate?: string;
    minAmount?: number;
    maxAmount?: number;
}
