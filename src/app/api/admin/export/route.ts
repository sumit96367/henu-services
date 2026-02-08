import { NextRequest, NextResponse } from 'next/server';
import { getEnrollments, getPayments, exportToCSV } from '@/lib/data-store';

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const type = searchParams.get('type') as 'enrollments' | 'payments';

        if (!type || (type !== 'enrollments' && type !== 'payments')) {
            return NextResponse.json(
                { error: 'Invalid export type. Must be "enrollments" or "payments"' },
                { status: 400 }
            );
        }

        let data;
        let filename;

        if (type === 'enrollments') {
            // Get filters if provided
            const filters = {
                domain: searchParams.get('domain') || undefined,
                subDomain: searchParams.get('subDomain') || undefined,
                status: searchParams.get('status') || undefined,
                startDate: searchParams.get('startDate') || undefined,
                endDate: searchParams.get('endDate') || undefined,
                search: searchParams.get('search') || undefined,
            };
            data = await getEnrollments(filters);
            filename = `enrollments_${new Date().toISOString().split('T')[0]}.csv`;
        } else {
            // Get filters if provided
            const filters = {
                status: searchParams.get('status') || undefined,
                startDate: searchParams.get('startDate') || undefined,
                endDate: searchParams.get('endDate') || undefined,
            };
            data = await getPayments(filters);
            filename = `payments_${new Date().toISOString().split('T')[0]}.csv`;
        }

        const csv = exportToCSV(data, type);

        return new NextResponse(csv, {
            status: 200,
            headers: {
                'Content-Type': 'text/csv',
                'Content-Disposition': `attachment; filename="${filename}"`,
            },
        });
    } catch (error) {
        console.error('Error exporting data:', error);
        return NextResponse.json(
            { error: 'Failed to export data' },
            { status: 500 }
        );
    }
}
