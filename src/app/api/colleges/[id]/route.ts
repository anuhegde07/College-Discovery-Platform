import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(
  { params }: { params: { id: string } }
) {
  try {
    const college = await prisma.college.findUnique({
      where: {
        id: params.id,
      },
      include: {
        courses: true,
        placements: true,
        reviews: {
          include: {
            user: true,
          },
        },
      },
    });

    if (!college) {
      return NextResponse.json(
        { success: false, message: "College not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: college,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch college details",
      },
      { status: 500 }
    );
  }
}