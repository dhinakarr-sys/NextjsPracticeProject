import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const items: Array<{ id: number; title: string; price: number; quantity: number }> = body.items || [];
    
    if (items.length === 0) {
      return NextResponse.json({ subtotal: 0, productDiscount: 0, cartDiscount: 0, finalAmount: 0, cartDiscountPercent: 0, items: [] });
    }

    // Fetch Global Settings
    const settings = await prisma.settings.findUnique({ where: { id: 1 } });
    const cartDiscountPercent = settings?.cartDiscount ?? 0;

    // We query the DB for the products to get their true categories and product-level discounts.
    const productIds = items.map(it => it.id);
    const dbProducts = await prisma.product.findMany({
      where: { id: { in: productIds } },
    });
    
    // Fetch all categories to match category names to their respective discounts
    const categories = await prisma.category.findMany();
    const categoryDiscountMap = new Map(categories.map(c => [c.name, c.discountPercent]));
    const dbProductMap = new Map(dbProducts.map(p => [p.id, p]));

    let subtotal = 0;
    let productDiscountTotal = 0;
    let categoryDiscountTotal = 0;

    const itemDetails = items.map((it) => {
      const dbProduct = dbProductMap.get(it.id);
      
      const productDiscountPercent = dbProduct?.discountPercent ?? 0;
      const catName = dbProduct?.category ?? "";
      const categoryDiscountPercent = categoryDiscountMap.get(catName) ?? 0;

      // Realistic E-commerce Behavior: "Best discount applies"
      const bestDiscountPercent = Math.max(productDiscountPercent, categoryDiscountPercent);

      const original = it.price * it.quantity;
      subtotal += original;
      const discountAmount = original * (bestDiscountPercent / 100);
      
      if (bestDiscountPercent === categoryDiscountPercent && categoryDiscountPercent > productDiscountPercent) {
        categoryDiscountTotal += discountAmount;
      } else {
        productDiscountTotal += discountAmount;
      }

      const final = original - discountAmount;
      
      return { 
        id: it.id, 
        title: it.title, 
        quantity: it.quantity, 
        original, 
        discountAmount, 
        final, 
        productDiscountPercent: bestDiscountPercent 
      };
    });

    const totalItemDiscount = productDiscountTotal + categoryDiscountTotal;
    const baseAfterProductDiscount = subtotal - totalItemDiscount;
    const cartDiscount = baseAfterProductDiscount * (cartDiscountPercent / 100);

    const finalAmount = Math.max(0, baseAfterProductDiscount - cartDiscount);

    // Round all money properties to 2 decimals
    return NextResponse.json({ 
      subtotal: Math.round(subtotal * 100) / 100, 
      productDiscount: Math.round(productDiscountTotal * 100) / 100, 
      categoryDiscount: Math.round(categoryDiscountTotal * 100) / 100,
      cartDiscount: Math.round(cartDiscount * 100) / 100, 
      finalAmount: Math.round(finalAmount * 100) / 100, 
      cartDiscountPercent, 
      items: itemDetails 
    });
  } catch (error) {
    console.error("Cart summary error:", error);
    return NextResponse.json({ error: "Failed to compute summary" }, { status: 500 });
  }
}
