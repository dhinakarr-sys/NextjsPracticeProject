import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { name: 'asc' },
    });
    return NextResponse.json(categories);
  } catch (error) {
    console.error("Failed to fetch categories", error);
    return NextResponse.json({ error: "Failed to fetch categories" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    
    if (typeof body.id !== 'number' || typeof body.discountPercent !== 'number') {
      return NextResponse.json({ error: "Invalid data provided" }, { status: 400 });
    }

    const updated = await prisma.category.update({
      where: { id: body.id },
      data: { discountPercent: body.discountPercent },
    });

    return NextResponse.json({ message: "Category updated", category: updated });
  } catch (error) {
    console.error("Failed to update category", error);
    return NextResponse.json({ error: "Failed to update category" }, { status: 500 });
  }
}
