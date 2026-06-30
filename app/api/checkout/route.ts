import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const { 
      name, email, phone, 
      addressLine1, addressLine2, city, state, pincode, country, 
      paymentMethod, cartItems 
    } = body;

    if (!name || !email || !phone || !addressLine1 || !city || !state || !pincode || !country || !paymentMethod || !cartItems || cartItems.length === 0) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const settings = await prisma.settings.findUnique({ where: { id: 1 } });
    const cartDiscountPercent = settings?.cartDiscount ?? 0;

    const productIds = cartItems.map((it: any) => it.id);
    const dbProducts = await prisma.product.findMany({
      where: { id: { in: productIds } },
    });
    const categories = await prisma.category.findMany();
    const categoryDiscountMap = new Map(categories.map(c => [c.name, c.discountPercent]));
    const dbProductMap = new Map(dbProducts.map(p => [p.id, p]));

    let subtotal = 0;
    let productDiscountTotal = 0;
    let categoryDiscountTotal = 0;
    
    const itemsData = cartItems.map((it: any) => {
      const dbProduct = dbProductMap.get(it.id);
      const prodDiscount = dbProduct?.discountPercent ?? 0;
      const catName = dbProduct?.category ?? "";
      const catDiscount = categoryDiscountMap.get(catName) ?? 0;
      
      const bestDiscountPercent = Math.max(prodDiscount, catDiscount);
      
      const unitPrice = dbProduct?.price ?? it.price;
      const original = unitPrice * it.quantity; 
      subtotal += original;
      
      const discountAmount = original * (bestDiscountPercent / 100);
      
      if (bestDiscountPercent === catDiscount && catDiscount > prodDiscount) {
        categoryDiscountTotal += discountAmount;
      } else {
        productDiscountTotal += discountAmount;
      }
      
      const final = original - discountAmount;
      
      return {
        productId: it.id,
        title: dbProduct?.title ?? it.title,
        image: dbProduct?.image ?? it.image ?? "",
        quantity: it.quantity,
        unitPrice,
        lineTotal: final
      };
    });

    const totalItemDiscount = productDiscountTotal + categoryDiscountTotal;
    const baseAfterProductDiscount = subtotal - totalItemDiscount;
    const cartDiscountAmount = baseAfterProductDiscount * (cartDiscountPercent / 100);
    const finalAmount = Math.max(0, baseAfterProductDiscount - cartDiscountAmount);
    
    const paymentStatus = paymentMethod === "COD" ? "PENDING" : "PAID";

    const newOrder = await prisma.$transaction(async (tx) => {
      return tx.order.create({
        data: {
          customerName: name,
          customerEmail: email,
          customerPhone: phone,
          addressLine1,
          addressLine2: addressLine2 || null,
          city,
          state,
          pincode,
          country,
          paymentMethod,
          paymentStatus,
          status: "Confirmed",
          subtotal: Math.round(subtotal * 100) / 100,
          productDiscount: Math.round(productDiscountTotal * 100) / 100,
          categoryDiscount: Math.round(categoryDiscountTotal * 100) / 100,
          cartDiscount: Math.round(cartDiscountAmount * 100) / 100,
          finalAmount: Math.round(finalAmount * 100) / 100,
          items: {
            create: itemsData
          }
        },
        include: {
          items: true
        }
      });
    });

    return NextResponse.json({ message: "Order confirmed", order: newOrder }, { status: 201 });

  } catch (error) {
    console.error("Checkout POST error:", error);
    return NextResponse.json({ error: "Failed to place order" }, { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email");

    if (email) {
      // Customer history lookup
      const orders = await prisma.order.findMany({
        where: { customerEmail: email },
        orderBy: { createdAt: "desc" },
        include: { items: true }
      });
      return NextResponse.json({ orders });
    }

    // Admin lookup
    const cookieStore = await cookies();
    const adminToken = cookieStore.get("admin_logged_in");
    
    if (!adminToken) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const orders = await prisma.order.findMany({
      orderBy: { createdAt: "desc" },
      include: { items: true }
    });
    return NextResponse.json({ orders });

  } catch (error) {
    console.error("Checkout GET error:", error);
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 });
  }
}
