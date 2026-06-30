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

async function writeSettings(data: any) {
  await fs.writeFile(SETTINGS_PATH, JSON.stringify(data, null, 2), "utf8");
}

export async function GET() {
  const settings = await readSettings();
  return NextResponse.json(settings);
}

export async function PUT(request: Request) {
  const body = await request.json();
  const settings = await readSettings();
  const updated = { ...settings, ...body };
  await writeSettings(updated);
  return NextResponse.json({ message: "Settings updated", settings: updated });
}

export async function POST(request: Request) {
  // allow full replace
  const body = await request.json();
  await writeSettings(body);
  return NextResponse.json({ message: "Settings saved", settings: body }, { status: 201 });
}
