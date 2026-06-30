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
  const { customerName, customerEmail, items } = body;

  if (!customerName || !customerEmail) {
    return NextResponse.json({ error: "Missing customer info" }, { status: 400 });
  }

  const settings = await readSettings();

  const subtotal = (items || []).reduce((s: number, it: any) => s + it.price * it.quantity, 0);

  const productDiscount = (items || []).reduce((s: number, it: any) => {
    const pd = settings.productDiscounts?.[String(it.id)] ?? 0;
    return s + it.price * it.quantity * (pd / 100);
  }, 0);

  const afterProduct = subtotal - productDiscount;
  const cartDiscountPercent = settings.cartDiscount ?? 0;
  const cartDiscount = afterProduct * (cartDiscountPercent / 100);

  const finalAmount = Math.max(0, afterProduct - cartDiscount);

  const order = {
    id: Date.now(),
    customerName,
    customerEmail,
    items,
    subtotal,
    productDiscount,
    cartDiscount,
    finalAmount,
    createdAt: new Date().toISOString(),
  };

  orders.push(order);

  return NextResponse.json({ message: "Order confirmed", order: { subtotal, productDiscount, cartDiscount, finalAmount, id: order.id } }, { status: 201 });
}

export async function GET() {
  return NextResponse.json({ orders });
}
