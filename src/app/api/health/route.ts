import { NextResponse } from 'next/server';
import prisma from '@/lib/db';

export async function GET() {
  try {
    await prisma.$queryRaw`SELECT 1`;
    
    return NextResponse.json(
      { 
        status: 'ok',
        message: 'Server is running',
        timestamp: new Date().toISOString(),
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Health check error:', error);
    return NextResponse.json(
      { 
        status: 'error',
        message: 'Database connection failed',
      },
      { status: 500 }
    );
  }
}
