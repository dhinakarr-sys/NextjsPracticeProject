import { prisma } from "../lib/prisma";
import fs from "fs/promises";
import path from "path";

async function main() {
  console.log("Seeding database...");

  // Seed Categories
  const categories = [
    "electronics",
    "jewelery",
    "men's clothing",
    "women's clothing",
  ];

  for (const catName of categories) {
    await prisma.category.upsert({
      where: { name: catName },
      update: {},
      create: {
        name: catName,
        discountPercent: 0,
      },
    });
  }
  console.log("Categories seeded.");

  // Read existing settings.json if present
  const settingsPath = path.join(process.cwd(), "data", "settings.json");
  let cartDiscount = 0;
  try {
    const content = await fs.readFile(settingsPath, "utf8");
    const json = JSON.parse(content);
    cartDiscount = json.cartDiscount ?? 0;
    console.log(`Found existing settings.json with cartDiscount = ${cartDiscount}%`);
  } catch (e) {
    console.log("No existing settings.json found, defaulting cartDiscount to 0.");
  }

  // Seed Settings singleton
  await prisma.settings.upsert({
    where: { id: 1 },
    update: { cartDiscount },
    create: {
      id: 1,
      cartDiscount,
    },
  });
  console.log("Settings seeded successfully.");
}

main()
  .catch((e) => {
    console.error("Seeding error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
