import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';
import { getInvoicesData } from '@/lib/data-store';
import type { InvoiceRecord } from '@/types/invoice';

export async function GET(request: NextRequest) {
    try {
        // Check admin authentication
        const token = request.cookies.get('admin_token')?.value;

        if (!token) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        // Verify token
        const payload = await verifyToken(token);
        if (!payload) {
            return NextResponse.json(
                { error: 'Invalid token' },
                { status: 401 }
            );
        }

        // Get query parameters for filtering
        const searchParams = request.nextUrl.searchParams;
        const status = searchParams.get('status');
        const search = searchParams.get('search')?.toLowerCase();

        let invoices = await getInvoicesData() as InvoiceRecord[];

        // Apply filters
        if (status) {
            invoices = invoices.filter(inv => inv.status === status);
        }

        if (search) {
            invoices = invoices.filter(inv =>
                inv.invoiceNumber.toLowerCase().includes(search) ||
                inv.email.toLowerCase().includes(search)
            );
        }

        return NextResponse.json({
            success: true,
            invoices,
            total: invoices.length
        });
    } catch (error) {
        console.error('Error fetching invoices:', error);
        return NextResponse.json(
            { error: 'Failed to fetch invoices' },
            { status: 500 }
        );
    }
}
