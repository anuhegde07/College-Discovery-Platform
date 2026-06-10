import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 10;

    const search = searchParams.get("search");
    const city = searchParams.get("city");
    const state = searchParams.get("state");
    const minFees = searchParams.get("minFees");
    const maxFees = searchParams.get("maxFees");
    const minRating = searchParams.get("minRating");

    const skip = (page - 1) * limit;

    const where: any = {};

    // Search by college name, city or state
    if (search) {
      where.OR = [
        {
          name: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          city: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          state: {
            contains: search,
            mode: "insensitive",
          },
        },
      ];
    }

    // City filter
    if (city) {
      where.city = {
        contains: city,
        mode: "insensitive",
      };
    }

    // State filter
    if (state) {
      where.state = {
        contains: state,
        mode: "insensitive",
      };
    }

    // Fees filter
    if (minFees || maxFees) {
      where.fees = {};

      if (minFees) {
        where.fees.gte = Number(minFees);
      }

      if (maxFees) {
        where.fees.lte = Number(maxFees);
      }
    }

    // Rating filter
    if (minRating) {
      where.rating = {
        gte: Number(minRating),
      };
    }

    const [colleges, total] = await Promise.all([
      prisma.college.findMany({
        where,
        skip,
        take: limit,
        orderBy: {
          ranking: "asc",
        },
      }),
      prisma.college.count({
        where,
      }),
    ]);

    return NextResponse.json({
      success: true,
      data: {
        colleges,
        total,
        totalPages: Math.ceil(total / limit),
        currentPage: page,
      },
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch colleges",
      },
      { status: 500 }
    );
  }
}