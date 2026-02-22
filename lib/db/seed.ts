import { db } from "./index";
import { categories, products, productImages, users } from "./schema";
import * as dotenv from "dotenv";

dotenv.config();

async function main() {
  console.log("Seeding database script started...");
  console.log("DATABASE_URL present:", !!process.env.DATABASE_URL);
  
  if (!process.env.DATABASE_URL) {
    console.error("Error: DATABASE_URL is missing!");
    return;
  }

  console.log("Attempting to connect and insert categories...");
  const categoryData = [
    { name: "Luxury", description: "Premium timepieces for sophisticated tastes", image: "/categories/luxury.jpg" },
    { name: "Sport", description: "Durable and performance-oriented watches", image: "/categories/sport.jpg" },
    { name: "Kids", description: "Fun and rugged watches for young explorers", image: "/categories/kids.jpg" },
    { name: "Vintage", description: "Timeless classics with a story", image: "/categories/vintage.jpg" },
    { name: "Diving", description: "Professional grade water-resistant watches", image: "/categories/diving.jpg" },
  ];

  const createdCategories = await db.insert(categories).values(categoryData).returning();
  console.log(`Created ${createdCategories.length} categories.`);

  // 2. Create Products
  const productData = [
    {
      name: "Sovereign Chrono",
      price: "349.00",
      originalPrice: "429.00",
      categoryId: createdCategories.find(c => c.name === "Luxury")?.id!,
      type: "Quartz" as const,
      material: "Stainless Steel" as const,
      strap: "Steel Link",
      gender: "Men" as const,
      badge: "Best Seller",
      badgeColor: "#c9a84c",
      rating: "4.9",
      reviewsCount: 234,
      inStock: true,
      description: "A statement of power and precision. The Sovereign Chrono features a brushed stainless steel case and a high-precision quartz movement.",
    },
    {
      name: "Eclipse Rose",
      price: "289.00",
      originalPrice: "359.00",
      categoryId: createdCategories.find(c => c.name === "Luxury")?.id!,
      type: "Analogue" as const,
      material: "Leather" as const,
      strap: "Genuine Leather",
      gender: "Women" as const,
      badge: "New Arrival",
      badgeColor: "#e0c76f",
      rating: "4.8",
      reviewsCount: 156,
      inStock: true,
      description: "Elegant rose gold accents paired with a deep midnight dial. The Eclipse Rose is the perfect companion for sophisticated evenings.",
    },
    {
      name: "Titanium Pro X",
      price: "399.00",
      originalPrice: "499.00",
      categoryId: createdCategories.find(c => c.name === "Sport")?.id!,
      type: "Digital" as const,
      material: "Titanium" as const,
      strap: "Sport Silicon",
      gender: "Men" as const,
      badge: "Limited Edition",
      badgeColor: "#ef4444",
      rating: "5.0",
      reviewsCount: 89,
      inStock: true,
      description: "Built for the extremes. The Titanium Pro X features a lightweight yet indestructible titanium shell and advanced digital tracking.",
    },
    {
      name: "Heritage Gold",
      price: "449.00",
      categoryId: createdCategories.find(c => c.name === "Luxury")?.id!,
      type: "Automatic" as const,
      material: "Stainless Steel" as const,
      strap: "Gold Plated",
      gender: "Men" as const,
      badge: "Best Seller",
      badgeColor: "#c9a84c",
      rating: "4.9",
      reviewsCount: 312,
      inStock: true,
      description: "A tribute to classic watchmaking. The Heritage Gold features a self-winding automatic movement visible through the exhibition case back.",
    },
    {
      name: "Aria Diamond",
      price: "329.00",
      originalPrice: "399.00",
      categoryId: createdCategories.find(c => c.name === "Luxury")?.id!,
      type: "Analogue" as const,
      material: "Stainless Steel" as const,
      strap: "Mesh Band",
      gender: "Women" as const,
      badge: "Trending",
      badgeColor: "#a78bfa",
      rating: "4.7",
      reviewsCount: 198,
      inStock: true,
      description: "Minimalist design elevated with a single genuine diamond at the 12 o'clock position. Airy, lightweight, and undeniably premium.",
    },
    {
      name: "Explorer Scout",
      price: "179.00",
      originalPrice: "229.00",
      categoryId: createdCategories.find(c => c.name === "Kids")?.id!,
      type: "Digital" as const,
      material: "Silicone" as const,
      strap: "Soft Silicone",
      gender: "Kids" as const,
      badge: "Popular",
      badgeColor: "#4ade80",
      rating: "4.6",
      reviewsCount: 267,
      inStock: true,
      description: "Durable, waterproof, and fun. The Explorer Scout is designed to withstand the adventures of the youngest timekeepers.",
    },
    {
      name: "Stealth Ops",
      price: "259.00",
      categoryId: createdCategories.find(c => c.name === "Sport")?.id!,
      type: "Digital" as const,
      material: "Silicone" as const,
      strap: "Tactical Rubber",
      gender: "Men" as const,
      rating: "4.5",
      reviewsCount: 112,
      inStock: true,
      description: "Matte black finish for a low-profile look. Features world time, stopwatch, and a high-intensity backlight.",
    },
    {
      name: "Marina Deep-Sea",
      price: "599.00",
      categoryId: createdCategories.find(c => c.name === "Sport")?.id!,
      type: "Automatic" as const,
      material: "Stainless Steel" as const,
      strap: "Diver Extension",
      gender: "Men" as const,
      badge: "Pro",
      badgeColor: "#3b82f6",
      rating: "4.9",
      reviewsCount: 45,
      inStock: false,
      description: "Water resistant up to 300 meters. A professional diving watch with a unidirectional rotating bezel and sapphire crystal.",
    },
  ];

  const createdProducts = await db.insert(products).values(productData).returning();
  console.log(`Created ${createdProducts.length} products.`);

  // 3. Create Test User
  const testUser = await db.insert(users).values({
    email: "test@saakali.com",
    name: "Test User",
    password: "hashedpassword123", // In a real app, use bcrypt
  }).returning();
  console.log(`Created test user: ${testUser[0].email}`);

  console.log("Seeding completed successfully.");
}

main().catch((err) => {
  console.error("Seeding failed:");
  console.error(err);
  process.exit(1);
});
