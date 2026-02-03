import { NextResponse } from 'next/server';

export async function POST() {
    try {
        // Clear the authentication cookie
        const response = NextResponse.json({
            success: true,
            message: 'Logged out successfully'
        });

        response.cookies.delete('admin_token');

        return response;
    } catch (error) {
        console.error('Logout error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
