import { NextRequest, NextResponse } from 'next/server';
import { getQueries, updateQueryStatus } from '@/lib/data-store';

export async function GET() {
    try {
        const queries = await getQueries();
        return NextResponse.json({ queries });
    } catch (error) {
        console.error('Error fetching queries:', error);
        return NextResponse.json(
            { error: 'Failed to fetch queries' },
            { status: 500 }
        );
    }
}

export async function PATCH(request: NextRequest) {
    try {
        const body = await request.json();
        const { queryId, status, adminNotes } = body;

        if (!queryId || !status) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        await updateQueryStatus(queryId, status, adminNotes);

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error updating query:', error);
        return NextResponse.json(
            { error: 'Failed to update query' },
            { status: 500 }
        );
    }
}
