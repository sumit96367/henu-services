// Invoice-specific types
export interface InvoiceRecord {
    id: string;
    invoiceNumber: string;
    timestamp: string;
    enrollmentId: string;
    paymentId: string;
    fullName: string;
    email: string;
    domain: string;
    domainCategory: string;
    subDomain: string;
    plan: 'basic' | 'premium';
    amount: number;
    billingAddress: string;
    paymentMethod: 'card' | 'upi';
    status: 'sent' | 'failed';
    pdfGenerated: boolean;
}

export interface InvoiceFilters {
    status?: string;
    startDate?: string;
    endDate?: string;
    search?: string;
}
