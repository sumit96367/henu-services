import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from './lib/auth';

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Get the admin_token cookie
    const token = request.cookies.get('admin_token')?.value;

    // Allow access to login page
    if (pathname === '/admin/login') {
        // If already authenticated as ADMIN, redirect to dashboard
        if (token) {
            const payload = await verifyToken(token);
            if (payload && payload.role === 'admin') {
                return NextResponse.redirect(new URL('/admin/dashboard', request.url));
            }
        }
        return NextResponse.next();
    }

    // Protect all other /admin routes
    if (pathname.startsWith('/admin')) {
        if (!token) {
            // No token at all, redirect to admin login
            return NextResponse.redirect(new URL('/admin/login', request.url));
        }

        // Verify token and role
        const payload = await verifyToken(token);

        if (!payload) {
            // Invalid token, redirect to login and clear cookie
            const response = NextResponse.redirect(new URL('/admin/login', request.url));
            response.cookies.delete('admin_token');
            return response;
        }

        if (payload.role !== 'admin') {
            // VALID token but NOT an admin -> Redirect to homepage
            const response = NextResponse.redirect(new URL('/', request.url));
            // We keep the cookie if it's a valid user token, but since this is specifically 
            // an 'admin_token' that failed the role check, we should probably clear it 
            // to prevent repeated failed attempts.
            response.cookies.delete('admin_token');
            return response;
        }

        // Token is valid and user is admin, allow access
        return NextResponse.next();
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/admin/:path*'],
};
