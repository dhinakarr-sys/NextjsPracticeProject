import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    // Fetch from FakeStore
    const response = await fetch("https://fakestoreapi.com/products");
    const fakeStoreProducts = await response.json();

    // Upsert into DB and retrieve
    // Using Promise.all to update all at once. For production with thousands of products, 
    // a batch upsert or transaction would be better, but Promise.all is fine for ~20 items.
    const products = await Promise.all(
      fakeStoreProducts.map(async (p: any) => {
        return prisma.product.upsert({
          where: { id: p.id },
          update: {
            title: p.title,
            price: p.price,
            category: p.category,
            image: p.image,
            description: p.description,
          },
          create: {
            id: p.id,
            title: p.title,
            price: p.price,
            category: p.category,
            image: p.image,
            description: p.description,
            discountPercent: 0,
          },
        });
      })
    );

    return NextResponse.json(products);
  } catch (error) {
    console.error("Failed to fetch/upsert products", error);
    // Fallback: If FakeStore fails, try returning from our DB directly
    try {
      const fallbackProducts = await prisma.product.findMany();
      return NextResponse.json(fallbackProducts);
    } catch (dbError) {
      return NextResponse.json({ error: "Failed to load products" }, { status: 500 });
    }
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const newId = body.id || Math.floor(Math.random() * 100000) + 1000;
    
    const product = await prisma.product.create({
      data: {
        id: newId,
        title: body.title,
        price: Number(body.price),
        category: body.category,
        image: body.image,
        description: body.description || "",
        discountPercent: Number(body.discountPercent || body.discount || 0),
      },
    });

    return NextResponse.json(
      { message: "Product Added Successfully", product },
      { status: 201 }
    );
  } catch (error) {
    console.error("Failed to add product", error);
    return NextResponse.json({ error: "Failed to add product" }, { status: 500 });
  }
}