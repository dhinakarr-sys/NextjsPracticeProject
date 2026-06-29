import { NextResponse } from "next/server";

const products: any[] = [];

export async function GET() {
  return NextResponse.json(products);
}

export async function POST(request: Request) {
  const body = await request.json();

  products.push(body);

  return NextResponse.json(
    {
      message: "Product Added Successfully",
      product: body,
    },
    {
      status: 201,
    }
  );
}