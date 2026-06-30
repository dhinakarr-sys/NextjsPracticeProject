import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    let settings = await prisma.settings.findUnique({ where: { id: 1 } });
    if (!settings) {
      settings = await prisma.settings.create({ data: { id: 1, cartDiscount: 0 } });
    }
    
    // Construct the legacy response format so AdminSettings doesn't break immediately
    const products = await prisma.product.findMany();
    const productDiscounts: Record<string, number> = {};
    products.forEach((p) => {
      if (p.discountPercent > 0) {
        productDiscounts[String(p.id)] = p.discountPercent;
      }
    });

    return NextResponse.json({
      cartDiscount: settings.cartDiscount,
      productDiscounts
    });
  } catch (error) {
    console.error("Settings GET error:", error);
    return NextResponse.json({ error: "Failed to fetch settings" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const cartDiscount = typeof body.cartDiscount === 'number' ? body.cartDiscount : 0;
    
    const settings = await prisma.settings.upsert({
      where: { id: 1 },
      update: { cartDiscount },
      create: { id: 1, cartDiscount },
    });
    
    if (body.productDiscounts) {
      const updates = Object.entries(body.productDiscounts).map(async ([id, discount]) => {
        const productId = parseInt(id, 10);
        if (!isNaN(productId)) {
          return prisma.product.update({
            where: { id: productId },
            data: { discountPercent: Number(discount) }
          }).catch(() => null); 
        }
      });
      await Promise.all(updates);
    }
    
    return NextResponse.json({ message: "Settings updated", settings });
  } catch (error) {
    console.error("Settings PUT error:", error);
    return NextResponse.json({ error: "Failed to update settings" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  return PUT(request); // Support legacy POST replace calls
}
