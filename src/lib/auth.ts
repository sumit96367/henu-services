import { SignJWT, jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(
    process.env.JWT_SECRET || 'default-secret-key-change-in-production-min-32-chars'
);

export interface JWTPayload {
    adminId: string;
    iat?: number;
    exp?: number;
}

/**
 * Generate a JWT token for admin authentication
 */
export async function generateToken(adminId: string): Promise<string> {
    const token = await new SignJWT({ adminId })
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('24h')
        .sign(JWT_SECRET);

    return token;
}

/**
 * Verify and decode a JWT token
 */
export async function verifyToken(token: string): Promise<JWTPayload | null> {
    try {
        const { payload } = await jwtVerify(token, JWT_SECRET);

        // Validate that payload contains required adminId field
        if (payload && typeof payload.adminId === 'string') {
            return {
                adminId: payload.adminId,
                iat: payload.iat,
                exp: payload.exp
            };
        }

        return null;
    } catch (error) {
        console.error('Token verification failed:', error);
        return null;
    }
}

/**
 * Validate admin credentials
 */
export function validateCredentials(adminId: string, password: string): boolean {
    const validAdminId = process.env.ADMIN_ID || 'admin@henuservices.com';
    const validPassword = process.env.ADMIN_PASSWORD || 'henu@2025';

    return adminId === validAdminId && password === validPassword;
}
