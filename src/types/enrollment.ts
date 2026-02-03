export interface Enrollment {
    id: string;
    fullName: string;
    email: string;
    phone: string;
    domain: string;
    subDomain: string;
    pricingPlan: "Basic" | "Premium";
    paymentStatus: "Paid" | "Pending" | "Failed";
    amountPaid: number;
    enrollmentDate: string; // ISO date string
    university: string;
}

export type PaymentStatus = "Paid" | "Pending" | "Failed";
export type PricingPlan = "Basic" | "Premium";
