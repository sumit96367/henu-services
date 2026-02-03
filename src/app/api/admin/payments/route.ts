import { NextRequest, NextResponse } from 'next/server';
import { getPayments } from '@/lib/data-store';

export async function GET(request: NextRequest) {
    try {
        // Get query parameters for filtering
        const searchParams = request.nextUrl.searchParams;

        const filters = {
            status: searchParams.get('status') || undefined,
            startDate: searchParams.get('startDate') || undefined,
            endDate: searchParams.get('endDate') || undefined,
            minAmount: searchParams.get('minAmount') ? parseFloat(searchParams.get('minAmount')!) : undefined,
            maxAmount: searchParams.get('maxAmount') ? parseFloat(searchParams.get('maxAmount')!) : undefined,
        };

        const payments = getPayments(filters);

        // Sort by timestamp (newest first)
        payments.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

        return NextResponse.json({
            success: true,
            payments,
            total: payments.length
        });
    } catch (error) {
        console.error('Error fetching payments:', error);
        return NextResponse.json(
            { error: 'Failed to fetch payments' },
            { status: 500 }
        );
    }
}
