import { db } from "./index";
import { categories } from "./schema";

async function main() {
  console.log("Starting simplified seed...");
  const categoryData = [
    { name: "Luxury", description: "Premium watches" },
  ];
  try {
    const result = await db.insert(categories).values(categoryData).returning();
    console.log("Success:", result);
  } catch (err) {
    console.error("Error in insert:", err);
  }
}

main();
