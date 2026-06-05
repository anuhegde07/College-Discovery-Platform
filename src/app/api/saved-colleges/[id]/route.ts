import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import prisma from '@/lib/db';

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const token = auth.getTokenFromCookies();
    if (!token) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const decoded = auth.verifyToken(token);
    if (!decoded) {
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      );
    }

    const savedCollege = await prisma.savedCollege.findUnique({
      where: { id: params.id },
    });

    if (!savedCollege) {
      return NextResponse.json(
        { error: 'Saved college not found' },
        { status: 404 }
      );
    }

    if (savedCollege.userId !== decoded.userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 403 }
      );
    }

    await prisma.savedCollege.delete({
      where: { id: params.id },
    });

    return NextResponse.json(
      {
        success: true,
        message: 'College unsaved successfully',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Delete saved college error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
