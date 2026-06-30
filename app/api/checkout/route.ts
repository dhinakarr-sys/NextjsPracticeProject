import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const SETTINGS_PATH = path.join(process.cwd(), "data", "settings.json");

async function readSettings() {
  try {
    const content = await fs.readFile(SETTINGS_PATH, "utf8");
    return JSON.parse(content);
  } catch (e) {
    return { cartDiscount: 0, productDiscounts: {} };
  }
}

let orders: any[] = [];

export async function POST(request: Request) {
  const body = await request.json();
  const name = body.name ?? body.customerName;
  const email = body.email ?? body.customerEmail;
  const items: any[] = body.cartItems ?? body.items ?? [];

  if (!name || !email) {
    return NextResponse.json({ error: "Missing customer info" }, { status: 400 });
  }

  const settings = await readSettings();

  const subtotal = items.reduce((s: number, it: any) => s + it.price * it.quantity, 0);

  const itemDetails = items.map((it: any) => {
    const pd = settings.productDiscounts?.[String(it.id)] ?? 0;
    const original = it.price * it.quantity;
    const discountAmount = original * (pd / 100);
    const final = original - discountAmount;
    return { id: it.id, title: it.title, quantity: it.quantity, original, discountAmount, final, productDiscountPercent: pd };
  });

  const productDiscount = itemDetails.reduce((s, d) => s + d.discountAmount, 0);
  const afterProduct = subtotal - productDiscount;
  const cartDiscountPercent = settings.cartDiscount ?? 0;
  const cartDiscount = afterProduct * (cartDiscountPercent / 100);
  const finalAmount = Math.max(0, afterProduct - cartDiscount);

  const order = {
    id: Date.now(),
    name,
    email,
    items: itemDetails,
    subtotal,
    productDiscount,
    cartDiscount,
    cartDiscountPercent,
    finalAmount,
    createdAt: new Date().toISOString(),
  };

  orders.push(order);

  return NextResponse.json({ message: "Order confirmed", order }, { status: 201 });
}

export async function GET() {
  return NextResponse.json({ orders });
}
