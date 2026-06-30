import { NextResponse } from "next/server";

type Product = {
  id?: number;
  title: string;
  price: number;
  category: string;
  image: string;
  description: string;
  discount?: number;
};

const products: Product[] = [];

export async function GET() {
  return NextResponse.json(products);
}

export async function POST(request: Request) {
  const body = await request.json();

  const productWithId = {
    ...body,
    id: Date.now(),
    discount: body.discount ?? 0,
  };

  products.push(productWithId);

  return NextResponse.json(
    {
      message: "Product Added Successfully",
      product: productWithId,
    },
    {
      status: 201,
    }
  );
}