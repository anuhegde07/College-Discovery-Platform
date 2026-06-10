import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";

export async function GET() {
  try {
    const token = (await cookies()).get("token")?.value;
    if (!token) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

 const decoded = verifyToken(token);
    if (!decoded) {
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      );
    }

    const savedColleges = await prisma.savedCollege.findMany({
      where: { userId: decoded.userId },
      include: { college: true },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(
      {
        success: true,
        data: savedColleges,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Saved colleges fetch error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const token = (await cookies()).get("token")?.value;
    if (!token) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      );
    }

    const { collegeId } = await request.json();

    if (!collegeId) {
      return NextResponse.json(
        { error: 'College ID is required' },
        { status: 400 }
      );
    }

    const college = await prisma.college.findUnique({
      where: { id: collegeId },
    });

    if (!college) {
      return NextResponse.json(
        { error: 'College not found' },
        { status: 404 }
      );
    }

    const savedCollege = await prisma.savedCollege.create({
      data: {
        userId: decoded.userId,
        collegeId,
      },
      include: { college: true },
    });

    return NextResponse.json(
      {
        success: true,
        data: savedCollege,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Save college error:', error);
    if (error.code === 'P2002') {
      return NextResponse.json(
        { error: 'College already saved' },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
