import { NextResponse } from 'next/server';
import { predictionSchema } from '@/lib/validators';
import prisma from '@/lib/db';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedData = predictionSchema.parse(body);

    // Query prediction dataset for colleges matching rank
    const predictions = await prisma.predictionDataset.findMany({
      where: {
        exam: validatedData.exam,
        rank: {
          gte: Math.max(1, validatedData.rank - 1000),
          lte: validatedData.rank + 1000,
        },
      },
      select: { collegeId: true },
      take: 20,
    });

    const collegeIds = [...new Set(predictions.map((p) => p.collegeId))];

    if (collegeIds.length === 0) {
      return NextResponse.json(
        {
          success: true,
          data: {
            colleges: [],
            message: 'No colleges found for this rank',
          },
        },
        { status: 200 }
      );
    }

    // Fetch college details
    const colleges = await prisma.college.findMany({
      where: {
        id: { in: collegeIds },
      },
      orderBy: { ranking: 'asc' },
    });

    return NextResponse.json(
      {
        success: true,
        data: {
          exam: validatedData.exam,
          rank: validatedData.rank,
          colleges,
          totalColleges: colleges.length,
        },
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Prediction error:', error);
    if (error.name === 'ZodError') {
      return NextResponse.json(
        { error: 'Validation failed' },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
