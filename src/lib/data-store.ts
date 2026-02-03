import fs from 'fs';
import path from 'path';
import { EnrollmentRecord, PaymentRecord, EnrollmentFilters, PaymentFilters } from '@/types/admin';

const DATA_DIR = path.join(process.cwd(), 'data');
const ENROLLMENTS_FILE = path.join(DATA_DIR, 'enrollments.json');
const PAYMENTS_FILE = path.join(DATA_DIR, 'payments.json');

// Ensure data directory exists
function ensureDataDir() {
    if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
    }
}

// Read JSON file
function readJSONFile<T>(filePath: string): T[] {
    ensureDataDir();
    if (!fs.existsSync(filePath)) {
        return [];
    }
    try {
        const data = fs.readFileSync(filePath, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.error(`Error reading ${filePath}:`, error);
        return [];
    }
}

// Write JSON file
function writeJSONFile<T>(filePath: string, data: T[]) {
    ensureDataDir();
    try {
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
    } catch (error) {
        console.error(`Error writing ${filePath}:`, error);
        throw error;
    }
}

/**
 * Save an enrollment record
 */
export function saveEnrollment(enrollment: EnrollmentRecord): void {
    const enrollments = readJSONFile<EnrollmentRecord>(ENROLLMENTS_FILE);
    enrollments.push(enrollment);
    writeJSONFile(ENROLLMENTS_FILE, enrollments);
}

/**
 * Save a payment record
 */
export function savePayment(payment: PaymentRecord): void {
    const payments = readJSONFile<PaymentRecord>(PAYMENTS_FILE);
    payments.push(payment);
    writeJSONFile(PAYMENTS_FILE, payments);
}

/**
 * Get all enrollments with optional filters
 */
export function getEnrollments(filters?: EnrollmentFilters): EnrollmentRecord[] {
    let enrollments = readJSONFile<EnrollmentRecord>(ENROLLMENTS_FILE);

    if (!filters) return enrollments;

    // Apply filters
    if (filters.domain) {
        enrollments = enrollments.filter(e => e.domainCategory === filters.domain);
    }

    if (filters.subDomain) {
        enrollments = enrollments.filter(e => e.subDomain === filters.subDomain);
    }

    if (filters.status) {
        enrollments = enrollments.filter(e => e.status === filters.status);
    }

    if (filters.startDate) {
        enrollments = enrollments.filter(e => new Date(e.timestamp) >= new Date(filters.startDate!));
    }

    if (filters.endDate) {
        enrollments = enrollments.filter(e => new Date(e.timestamp) <= new Date(filters.endDate!));
    }

    if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        enrollments = enrollments.filter(e =>
            e.fullName.toLowerCase().includes(searchLower) ||
            e.email.toLowerCase().includes(searchLower)
        );
    }

    return enrollments;
}

/**
 * Get all payments with optional filters
 */
export function getPayments(filters?: PaymentFilters): PaymentRecord[] {
    let payments = readJSONFile<PaymentRecord>(PAYMENTS_FILE);

    if (!filters) return payments;

    // Apply filters
    if (filters.status) {
        payments = payments.filter(p => p.status === filters.status);
    }

    if (filters.startDate) {
        payments = payments.filter(p => new Date(p.timestamp) >= new Date(filters.startDate!));
    }

    if (filters.endDate) {
        payments = payments.filter(p => new Date(p.timestamp) <= new Date(filters.endDate!));
    }

    if (filters.minAmount !== undefined) {
        payments = payments.filter(p => p.amount >= filters.minAmount!);
    }

    if (filters.maxAmount !== undefined) {
        payments = payments.filter(p => p.amount <= filters.maxAmount!);
    }

    return payments;
}

/**
 * Update enrollment status
 */
export function updateEnrollmentStatus(enrollmentId: string, status: EnrollmentRecord['status']): void {
    const enrollments = readJSONFile<EnrollmentRecord>(ENROLLMENTS_FILE);
    const index = enrollments.findIndex(e => e.id === enrollmentId);

    if (index !== -1) {
        enrollments[index].status = status;
        writeJSONFile(ENROLLMENTS_FILE, enrollments);
    }
}

/**
 * Update payment status
 */
export function updatePaymentStatus(paymentId: string, status: PaymentRecord['status']): void {
    const payments = readJSONFile<PaymentRecord>(PAYMENTS_FILE);
    const index = payments.findIndex(p => p.id === paymentId);

    if (index !== -1) {
        payments[index].status = status;
        writeJSONFile(PAYMENTS_FILE, payments);
    }
}

/**
 * Export data to CSV format
 */
export function exportToCSV(data: EnrollmentRecord[] | PaymentRecord[], type: 'enrollments' | 'payments'): string {
    if (data.length === 0) return '';

    if (type === 'enrollments') {
        const enrollments = data as EnrollmentRecord[];
        const headers = ['ID', 'Timestamp', 'Full Name', 'Email', 'Domain', 'Sub-Domain', 'Plan', 'Amount', 'Status', 'Order ID'];
        const rows = enrollments.map(e => [
            e.id,
            e.timestamp,
            e.fullName,
            e.email,
            e.domain,
            e.subDomain,
            e.plan,
            e.amount.toString(),
            e.status,
            e.orderId
        ]);

        return [headers, ...rows].map(row => row.join(',')).join('\n');
    } else {
        const payments = data as PaymentRecord[];
        const headers = ['ID', 'Timestamp', 'Invoice Number', 'Full Name', 'Email', 'Amount', 'Status', 'Payment Method', 'Order ID'];
        const rows = payments.map(p => [
            p.id,
            p.timestamp,
            p.invoiceNumber,
            p.fullName,
            p.email,
            p.amount.toString(),
            p.status,
            p.paymentMethod,
            p.orderId
        ]);

        return [headers, ...rows].map(row => row.join(',')).join('\n');
    }
}
