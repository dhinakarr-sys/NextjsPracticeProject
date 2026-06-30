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

export async function POST(request: Request) {
  const body = await request.json();
  const items: Array<{ id: number; title: string; price: number; quantity: number }> = body.items || [];
  const settings = await readSettings();

  const subtotal = items.reduce((s, it) => s + it.price * it.quantity, 0);

  // per-item discounts
  const itemDetails = items.map((it) => {
    const pd = settings.productDiscounts?.[String(it.id)] ?? 0;
    const original = it.price * it.quantity;
    const discountAmount = original * (pd / 100);
    const final = original - discountAmount;
    return { id: it.id, title: it.title, quantity: it.quantity, original, discountAmount, final, productDiscountPercent: pd };
  });

  const productDiscount = itemDetails.reduce((s, d) => s + d.discountAmount, 0);

  const baseAfterProductDiscount = subtotal - productDiscount;
  const cartDiscountPercent = settings.cartDiscount ?? 0;
  const cartDiscount = baseAfterProductDiscount * (cartDiscountPercent / 100);

  const finalAmount = Math.max(0, baseAfterProductDiscount - cartDiscount);

  return NextResponse.json({ subtotal, productDiscount, cartDiscount, finalAmount, cartDiscountPercent, items: itemDetails });
}
