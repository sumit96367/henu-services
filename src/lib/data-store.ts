import {
    collection,
    addDoc,
    getDocs,
    query,
    where,
    orderBy,
    updateDoc,
    doc,
    Timestamp
} from 'firebase/firestore';
import { db } from './firebase';
import { EnrollmentRecord, PaymentRecord, EnrollmentFilters, PaymentFilters } from '@/types/admin';

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
 * Save a query to Firestore
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
            await addDoc(collection(db, 'queries'), {
                ...query,
                timestamp: query.timestamp || new Date().toISOString(),
                status: 'pending', // pending, replied, resolved
                adminNotes: ''
            });
        }
    } catch (error) {
        console.error('Error saving query:', error);
        throw error;
    }
}

/**
 * Get all queries from Firestore
 */
export async function getQueries(): Promise<any[]> {
    try {
        const queriesRef = collection(db, 'queries');
        const q = query(queriesRef, orderBy('timestamp', 'desc'));
        const querySnapshot = await getDocs(q);

        return querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
    } catch (error) {
        console.error('Error getting queries:', error);
        throw error;
    }
}

/**
 * Update query status and admin notes
 */
export async function updateQueryStatus(
    queryId: string,
    status: 'pending' | 'in-progress' | 'resolved',
    adminNotes?: string
): Promise<void> {
    try {
        const queryRef = doc(db, 'queries', queryId);
        const updateData: any = { status };

        if (adminNotes !== undefined) {
            updateData.adminNotes = adminNotes;
        }

        await updateDoc(queryRef, updateData);
    } catch (error) {
        console.error('Error updating query status:', error);
        throw error;
    }
}

/**
 * Get all service requests from Firestore
 */
export async function getServiceRequests(): Promise<any[]> {
    try {
        const ordersRef = collection(db, 'orders');
        // Fetch all and filter locally
        const q = query(ordersRef, orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);

        const requests: any[] = [];
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            // Show everything that is NOT an internship enrollment as a service request
            // This is safer in case some requests are missing the specific 'service_inquiry' type
            if (data.type !== 'internship_enrollment') {
                requests.push({
                    id: doc.id,
                    ...data,
                    createdAt: data.createdAt?.toDate ? data.createdAt.toDate().toISOString() : data.createdAt
                });
            }
        });
        return requests;
    } catch (error) {
        console.error('Error getting service requests:', error);
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
