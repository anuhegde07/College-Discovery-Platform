import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

const JWT_SECRET =
  process.env.JWT_SECRET || 'secret';

export const auth = {
  generateToken(payload: object) {
    return jwt.sign(
      payload,
      JWT_SECRET,
      { expiresIn: '7d' }
    );
  },

  verifyToken(token: string) {
    try {
      return jwt.verify(
        token,
        JWT_SECRET
      ) as {
        userId: string;
        email: string;
      };
    } catch {
      return null;
    }
  },

  async getTokenFromCookies() {
    const cookieStore =
      await cookies();

    return cookieStore
      .get('token')
      ?.value;
  }
};