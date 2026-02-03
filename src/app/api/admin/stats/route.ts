import { NextResponse } from 'next/server';
import { getEnrollments, getPayments } from '@/lib/data-store';
import { AdminStats } from '@/types/admin';

export async function GET() {
    try {
        const enrollments = getEnrollments();
        const payments = getPayments();

        // Calculate statistics
        const totalEnrollments = enrollments.length;
        const completedPayments = payments.filter(p => p.status === 'paid').length;
        const pendingPayments = payments.filter(p => p.status === 'pending').length;

        const totalRevenue = payments
            .filter(p => p.status === 'paid')
            .reduce((sum, p) => sum + p.amount, 0);

        // Get recent enrollments (last 5)
        const recentEnrollments = enrollments
            .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
            .slice(0, 5);

        // Calculate domain distribution
        const domainDistribution: Record<string, number> = {};
        enrollments.forEach(e => {
            domainDistribution[e.domain] = (domainDistribution[e.domain] || 0) + 1;
        });

        const stats: AdminStats = {
            totalEnrollments,
            totalRevenue,
            pendingPayments,
            completedPayments,
            recentEnrollments,
            domainDistribution
        };

        return NextResponse.json({
            success: true,
            stats
        });
    } catch (error) {
        console.error('Error fetching stats:', error);
        return NextResponse.json(
            { error: 'Failed to fetch statistics' },
            { status: 500 }
        );
    }
}
