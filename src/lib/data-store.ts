import {
    collection,
    addDoc,
    getDocs,
    query,
    where,
    orderBy,
    updateDoc,
    doc,
    deleteDoc,
    Timestamp
} from 'firebase/firestore';
import { db } from './firebase';
import { EnrollmentRecord, PaymentRecord, EnrollmentFilters, PaymentFilters } from '@/types/admin';
import { saveToSheet, getFromSheet } from './google-sheets';

/**
 * Save an enrollment record to Firestore
 */
export async function saveEnrollment(enrollment: EnrollmentRecord): Promise<void> {
    try {
        await addDoc(collection(db, 'enrollments'), {
            ...enrollment,
            timestamp: enrollment.timestamp || new Date().toISOString()
        });
    } catch (error) {
        console.error('Error saving enrollment:', error);
        throw error;
    }
}

/**
 * Save a payment record to Firestore
 */
export async function savePayment(payment: PaymentRecord): Promise<void> {
    try {
        await addDoc(collection(db, 'payments'), {
            ...payment,
            timestamp: payment.timestamp || new Date().toISOString()
        });
    } catch (error) {
        console.error('Error saving payment:', error);
        throw error;
    }
}

/**
 * Save a query to Google Sheets
 */
export async function saveQuery(query: {
    enrollmentId: string;
    fullName: string;
    email: string;
    domain: string;
    subDomain: string;
    queries: string;
    timestamp: string;
}): Promise<void> {
    try {
        // Only save if queries is not empty
        if (query.queries && query.queries.trim()) {
            await saveToSheet('query', {
                id: query.enrollmentId,
                fullName: query.fullName,
                email: query.email,
                domain: query.domain,
                subDomain: query.subDomain,
                queries: query.queries,
                status: 'pending',
                adminNotes: '',
                timestamp: query.timestamp || new Date().toISOString()
            });
        }
    } catch (error) {
        console.error('Error saving query to Google Sheets:', error);
        throw error;
    }
}


/**
 * Get all queries from Google Sheets
 */
export async function getQueries(): Promise<any[]> {
    try {
        const data = await getFromSheet('queries');

        // Map spreadsheet headers:
        // ID, Full Name, Email, Subject, Category, Query, Status, Admin Notes, Timestamp
        return data.map((item: any) => ({
            id: item['ID'],
            fullName: item['Full Name'],
            email: item['Email'],
            domain: item['Subject'], // In sheet we called it Subject
            subDomain: item['Category'], // In sheet we called it Category
            queries: item['Query'],
            status: item['Status'] || 'pending',
            adminNotes: item['Admin Notes'] || '',
            timestamp: item['Timestamp']
        }));
    } catch (error) {
        console.error('Error getting queries from Google Sheets:', error);
        return [];
    }
}


/**
 * Update query status and admin notes in Google Sheets
 */
export async function updateQueryStatus(
    queryId: string,
    status: 'pending' | 'in-progress' | 'resolved',
    adminNotes?: string
): Promise<void> {
    try {
        await saveToSheet('update_query', {
            id: queryId,
            status,
            adminNotes
        });
    } catch (error) {
        console.error('Error updating query status in Google Sheets:', error);
        throw error;
    }
}


/**
 * Get all service requests from Google Sheets
 */
export async function getServiceRequests(): Promise<any[]> {
    try {
        const data = await getFromSheet('inquiries');

        // Map spreadsheet headers:
        // ID, Order Number, Full Name, Email, Company, User Type, Services, Budget, Message, Status, Timestamp
        return data.map((item: any) => ({
            id: item['ID'],
            orderNumber: item['Order Number'],
            fullName: item['Full Name'],
            email: item['Email'],
            companyName: item['Company'],
            userType: item['User Type'],
            subDomain: item['Services'], // Used as subDomain in admin panel
            plan: item['Budget'],
            message: item['Message'],
            status: item['Status'] || 'New Inquiry',
            statusColor: item['Status'] === 'Completed' ? 'green' : (item['Status'] === 'Processing' ? 'cyan' : 'amber'),
            createdAt: item['Timestamp']
        }));
    } catch (error) {
        console.error('Error getting service requests from Google Sheets:', error);
        return [];
    }
}


/**
 * Get all enrollments with optional filters
 */
export async function getEnrollments(filters?: EnrollmentFilters): Promise<EnrollmentRecord[]> {
    try {
        const enrollmentsRef = collection(db, 'enrollments');
        let q = query(enrollmentsRef);

        // Apply Firestore filters where possible
        if (filters?.domain) {
            q = query(q, where('domainCategory', '==', filters.domain));
        }

        if (filters?.subDomain) {
            q = query(q, where('subDomain', '==', filters.subDomain));
        }

        if (filters?.status) {
            q = query(q, where('status', '==', filters.status));
        }

        const querySnapshot = await getDocs(q);
        let enrollments: EnrollmentRecord[] = querySnapshot.docs.map(doc => ({
            ...doc.data(),
            id: doc.id
        } as EnrollmentRecord));

        // Apply client-side filters for date ranges and search
        if (filters?.startDate) {
            enrollments = enrollments.filter(e =>
                new Date(e.timestamp) >= new Date(filters.startDate!)
            );
        }

        if (filters?.endDate) {
            enrollments = enrollments.filter(e =>
                new Date(e.timestamp) <= new Date(filters.endDate!)
            );
        }

        if (filters?.search) {
            const searchLower = filters.search.toLowerCase();
            enrollments = enrollments.filter(e =>
                e.fullName.toLowerCase().includes(searchLower) ||
                e.email.toLowerCase().includes(searchLower)
            );
        }

        return enrollments;
    } catch (error) {
        console.error('Error fetching enrollments:', error);
        return [];
    }
}

/**
 * Get all payments with optional filters
 */
export async function getPayments(filters?: PaymentFilters): Promise<PaymentRecord[]> {
    try {
        const paymentsRef = collection(db, 'payments');
        let q = query(paymentsRef);

        // Apply Firestore filters where possible
        if (filters?.status) {
            q = query(q, where('status', '==', filters.status));
        }

        const querySnapshot = await getDocs(q);
        let payments: PaymentRecord[] = querySnapshot.docs.map(doc => ({
            ...doc.data(),
            id: doc.id
        } as PaymentRecord));

        // Apply client-side filters for date and amount ranges
        if (filters?.startDate) {
            payments = payments.filter(p =>
                new Date(p.timestamp) >= new Date(filters.startDate!)
            );
        }

        if (filters?.endDate) {
            payments = payments.filter(p =>
                new Date(p.timestamp) <= new Date(filters.endDate!)
            );
        }

        if (filters?.minAmount !== undefined) {
            payments = payments.filter(p => p.amount >= filters.minAmount!);
        }

        if (filters?.maxAmount !== undefined) {
            payments = payments.filter(p => p.amount <= filters.maxAmount!);
        }

        return payments;
    } catch (error) {
        console.error('Error fetching payments:', error);
        return [];
    }
}

/**
 * Update enrollment status in Firestore
 */
export async function updateEnrollmentStatus(
    enrollmentId: string,
    status: EnrollmentRecord['status']
): Promise<void> {
    try {
        const enrollmentRef = doc(db, 'enrollments', enrollmentId);
        await updateDoc(enrollmentRef, { status });
    } catch (error) {
        console.error('Error updating enrollment status:', error);
        throw error;
    }
}

/**
 * Update payment status in Firestore
 */
export async function updatePaymentStatus(
    paymentId: string,
    status: PaymentRecord['status']
): Promise<void> {
    try {
        const paymentRef = doc(db, 'payments', paymentId);
        await updateDoc(paymentRef, { status });
    } catch (error) {
        console.error('Error updating payment status:', error);
        throw error;
    }
}

/**
 * Export data to CSV format
 */
export function exportToCSV(
    data: EnrollmentRecord[] | PaymentRecord[],
    type: 'enrollments' | 'payments'
): string {
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

/**
 * Update enrollment status by its internal enrollmentId
 */
export async function updateEnrollmentStatusByInternalId(
    enrollmentId: string,
    status: EnrollmentRecord['status']
): Promise<void> {
    try {
        const enrollmentsRef = collection(db, 'enrollments');
        const q = query(enrollmentsRef, where('id', '==', enrollmentId));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            const docRef = doc(db, 'enrollments', querySnapshot.docs[0].id);
            await updateDoc(docRef, { status });
        }
    } catch (error) {
        console.error('Error updating enrollment status by internal ID:', error);
        throw error;
    }
}

/**
 * Update payment status by its internal orderId
 */
export async function updatePaymentStatusByInternalId(
    orderId: string,
    status: PaymentRecord['status']
): Promise<void> {
    try {
        const paymentsRef = collection(db, 'payments');
        const q = query(paymentsRef, where('orderId', '==', orderId));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            const docRef = doc(db, 'payments', querySnapshot.docs[0].id);
            await updateDoc(docRef, { status });
        }
    } catch (error) {
        console.error('Error updating payment status by internal ID:', error);
        throw error;
    }
}

/**
 * Get all projects from Firestore
 */
export async function getSoftwareData(): Promise<any[]> {
    try {
        const softwareRef = collection(db, 'software');
        const q = query(softwareRef, orderBy('id', 'asc'));
        const querySnapshot = await getDocs(q);

        return querySnapshot.docs.map(doc => ({
            firestoreId: doc.id,
            ...doc.data()
        }));
    } catch (error) {
        console.error('Error getting software:', error);
        throw error;
    }
}

/**
 * Add a new software entry to Firestore
 */
export async function addSoftwareData(software: any): Promise<any> {
    try {
        const docRef = await addDoc(collection(db, 'software'), {
            ...software,
            createdAt: new Date().toISOString()
        });
        return { firestoreId: docRef.id, ...software };
    } catch (error) {
        console.error('Error adding software:', error);
        throw error;
    }
}

/**
 * Update an existing software entry in Firestore
 */
export async function updateSoftwareData(id: number, softwareUpdate: any): Promise<void> {
    try {
        // Find the doc by our internal 'id' field
        const softwareRef = collection(db, 'software');
        const q = query(softwareRef, where('id', '==', id));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            const docRef = doc(db, 'software', querySnapshot.docs[0].id);
            await updateDoc(docRef, softwareUpdate);
        } else {
            throw new Error(`Software with id ${id} not found`);
        }
    } catch (error) {
        console.error('Error updating software:', error);
        throw error;
    }
}

/**
 * Delete a software entry from Firestore
 */
export async function deleteSoftwareData(id: number): Promise<void> {
    try {
        const softwareRef = collection(db, 'software');
        const q = query(softwareRef, where('id', '==', id));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            const docRef = doc(db, 'software', querySnapshot.docs[0].id);
            await deleteDoc(docRef);
        } else {
            throw new Error(`Software with id ${id} not found`);
        }
    } catch (error) {
        console.error('Error deleting software:', error);
        throw error;
    }
}

/**
 * Get all invoices from Firestore
 */
export async function getInvoicesData(): Promise<any[]> {
    try {
        const invoicesRef = collection(db, 'invoices');
        const q = query(invoicesRef, orderBy('timestamp', 'desc'));
        const querySnapshot = await getDocs(q);

        return querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
    } catch (error) {
        console.error('Error getting invoices:', error);
        throw error;
    }
}

/**
 * Add a new invoice to Firestore
 */
export async function addInvoiceData(invoice: any): Promise<void> {
    try {
        await addDoc(collection(db, 'invoices'), {
            ...invoice,
            timestamp: invoice.timestamp || new Date().toISOString()
        });
    } catch (error) {
        console.error('Error adding invoice:', error);
        throw error;
    }
}

/**
 * Update invoice status in Firestore
 */
export async function updateInvoiceStatus(invoiceId: string, status: string, pdfGenerated: boolean = true): Promise<void> {
    try {
        // Find doc by custom id field or firestore id
        const invoicesRef = collection(db, 'invoices');
        // First try to find by 'id' field if it exists
        const q = query(invoicesRef, where('id', '==', invoiceId));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            const docRef = doc(db, 'invoices', querySnapshot.docs[0].id);
            await updateDoc(docRef, { status, pdfGenerated });
        } else {
            // Try by Firestore doc ID directly
            const docRef = doc(db, 'invoices', invoiceId);
            await updateDoc(docRef, { status, pdfGenerated });
        }
    } catch (error) {
        console.error('Error updating invoice status:', error);
        throw error;
    }
}
