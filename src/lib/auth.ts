import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-here';
const SALT_ROUNDS = 10;

export const auth = {
  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, SALT_ROUNDS);
  },

  async comparePassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  },

  generateToken(userId: string, email: string): string {
    return jwt.sign(
      { userId, email },
      JWT_SECRET,
      { expiresIn: '7d' }
    );
  },

  verifyToken(token: string): { userId: string; email: string } | null {
    try {
      return jwt.verify(token, JWT_SECRET) as { userId: string; email: string };
    } catch {
      return null;
    }
  },

  getTokenFromCookies(): string | null {
    const cookieStore = cookies();
    return cookieStore.get('token')?.value || null;
  },

  setTokenInCookies(token: string): void {
    const cookieStore = cookies();
    cookieStore.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60,
    });
  },

  clearTokenFromCookies(): void {
    const cookieStore = cookies();
    cookieStore.delete('token');
  },
};
