import { NextRequest, NextResponse } from 'next/server';
import { getEnrollments } from '@/lib/data-store';

export async function GET(request: NextRequest) {
    try {
        // Get query parameters for filtering
        const searchParams = request.nextUrl.searchParams;

        const filters = {
            domain: searchParams.get('domain') || undefined,
            subDomain: searchParams.get('subDomain') || undefined,
            status: searchParams.get('status') || undefined,
            startDate: searchParams.get('startDate') || undefined,
            endDate: searchParams.get('endDate') || undefined,
            search: searchParams.get('search') || undefined,
        };

        const enrollments = getEnrollments(filters);

        // Sort by timestamp (newest first)
        enrollments.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

        return NextResponse.json({
            success: true,
            enrollments,
            total: enrollments.length
        });
    } catch (error) {
        console.error('Error fetching enrollments:', error);
        return NextResponse.json(
            { error: 'Failed to fetch enrollments' },
            { status: 500 }
        );
    }
}
