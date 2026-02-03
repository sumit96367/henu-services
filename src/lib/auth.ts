import * as bcrypt from 'bcrypt';
import { SignJWT, jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(
    process.env.JWT_SECRET || 'default-secret-key-change-in-production'
);

const JWT_EXPIRY = process.env.JWT_EXPIRY || '24h';

export interface JWTPayload {
    adminId: string;
    iat?: number;
    exp?: number;
}

/**
 * Hash a password using bcrypt
 */
export async function hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
}

/**
 * Verify a password against a hash
 */
export async function verifyPassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
}

/**
 * Generate a JWT token
 */
export async function generateToken(adminId: string): Promise<string> {
    const token = await new SignJWT({ adminId })
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime(JWT_EXPIRY)
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
 * Verify admin credentials against environment variables
 */
export async function verifyAdminCredentials(
    adminId: string,
    password: string
): Promise<boolean> {
    const envAdminId = process.env.ADMIN_ID;
    const envAdminPassword = process.env.ADMIN_PASSWORD;

    if (!envAdminId || !envAdminPassword) {
        console.error('Admin credentials not configured in environment variables');
        return false;
    }

    // Check if admin ID matches
    if (adminId !== envAdminId) {
        return false;
    }

    // For simplicity, we're using plain text password comparison
    // In production, you should hash the password in .env
    // For now, comparing directly
    return password === envAdminPassword;
}
