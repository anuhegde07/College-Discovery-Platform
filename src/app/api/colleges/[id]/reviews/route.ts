import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: collegeId } = await params;

    const token = req.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        { error: "Please login first" },
        { status: 401 }
      );
    }

    const decoded = jwt.verify(
  token,
  process.env.JWT_SECRET!
) as {
  userId: string;
};

const userId = decoded.userId;

    const { rating, comment } = await req.json();

    const existingReview = await prisma.review.findFirst({
  where: {
    userId,
    collegeId,
  },
});

if (existingReview) {
  return NextResponse.json(
    {
      error: "You have already reviewed this college",
    },
    { status: 400 }
  );
}
    const review = await prisma.review.create({
      data: {
        userId,
        collegeId,
        rating,
        comment,
      },
    });

    return NextResponse.json({
      success: true,
      review,
    });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to create review" },
      { status: 500 }
    );
  }
}