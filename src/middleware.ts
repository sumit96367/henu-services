import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from './lib/auth';

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Get the admin_token cookie
    const token = request.cookies.get('admin_token')?.value;

    // Allow access to login page
    if (pathname === '/admin/login') {
        // If already authenticated, redirect to dashboard
        if (token) {
            const payload = await verifyToken(token);
            if (payload) {
                return NextResponse.redirect(new URL('/admin/dashboard', request.url));
            }
        }
        return NextResponse.next();
    }

    // Protect all other /admin routes
    if (pathname.startsWith('/admin')) {
        if (!token) {
            // No token, redirect to login
            return NextResponse.redirect(new URL('/admin/login', request.url));
        }

        // Verify token
        const payload = await verifyToken(token);
        if (!payload) {
            // Invalid token, redirect to login and clear cookie
            const response = NextResponse.redirect(new URL('/admin/login', request.url));
            response.cookies.delete('admin_token');
            return response;
        }

        // Token is valid, allow access
        return NextResponse.next();
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/admin/:path*'],
};
