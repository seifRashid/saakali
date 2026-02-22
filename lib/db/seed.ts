import * as dotenv from "dotenv";
dotenv.config();

import { db } from "./index";
import { categories, products, productImages, users, carts, cartItems, orders, orderItems, reviews } from "./schema";
import bcrypt from "bcryptjs";
import { faker } from "@faker-js/faker";
import { eq } from "drizzle-orm";

async function main() {
  console.log("🚀 Starting Watch-Domain High-Fidelity Seeding...");
  
  try {
    console.log("🧹 Clearing existing data...");
    await db.delete(orderItems);
    await db.delete(orders);
    await db.delete(reviews);
    await db.delete(productImages);
    await db.delete(cartItems);
    await db.delete(carts);
    await db.delete(products);
    await db.delete(categories);
    await db.delete(users);

    console.log("📦 Creating watch categories...");
    const categoryNames = ["Luxury", "Sport", "Classic", "Kids"];
    const createdCategories = await db.insert(categories).values(
      categoryNames.map(name => ({ name }))
    ).returning();

    const getCatId = (name: string) => createdCategories.find(c => c.name === name)!.id;

    console.log("⌚ Creating 60 high-fidelity watch products...");
    const watchBrands = ["Rolex", "Omega", "Seiko", "Casio", "Tag Heuer", "Patek Philippe", "Audemars Piguet", "Tissot", "Citizen", "Fossil"];
    const watchModels = ["Chronograph", "Diver", "Master", "Classic", "Pro", "Heritage", "Precision", "Navigator", "Explorer", "Skyline"];
    
    const types = ["Analogue", "Digital", "Quartz", "Automatic"] as const;
    const genders = ["Men", "Women", "Unisex", "Kids"] as const;
    const materials = ["Leather", "Stainless Steel", "Silicone", "Titanium"] as const;

    const productValues: any[] = [];

    for (let i = 0; i < 60; i++) {
        const brand = faker.helpers.arrayElement(watchBrands);
        const model = faker.helpers.arrayElement(watchModels);
        const name = `${brand} ${model} ${faker.string.alphanumeric(4).toUpperCase()}`;
        
        let category = faker.helpers.arrayElement(categoryNames);
        let gender = faker.helpers.arrayElement(genders);
        let type = faker.helpers.arrayElement(types);
        
        // Logical overrides for consistency
        if (category === "Kids") {
            gender = "Kids";
            type = faker.helpers.arrayElement(["Digital", "Quartz"]);
        }

        const price = category === "Luxury" 
            ? faker.number.int({ min: 1200, max: 15000 }) 
            : category === "Sport" 
                ? faker.number.int({ min: 100, max: 800 })
                : faker.number.int({ min: 50, max: 500 });

        productValues.push({
            name,
            price: price.toString(),
            originalPrice: (price * 1.2).toString(),
            categoryId: getCatId(category),
            type,
            material: faker.helpers.arrayElement(materials),
            strap: faker.helpers.arrayElement(["Leather Strap", "Oyster Braclet", "Rubber Strap", "NATO Strap", "Mesh Band"]),
            gender,
            badge: i % 5 === 0 ? "New Arrival" : i % 8 === 0 ? "Best Seller" : i % 12 === 0 ? "Limited Edition" : null,
            badgeColor: i % 5 === 0 ? "bg-blue-500" : i % 8 === 0 ? "bg-gold" : i % 12 === 0 ? "bg-red-500" : null,
            stockQuantity: faker.number.int({ min: 0, max: 100 }),
            rating: faker.number.float({ min: 3.5, max: 5, fractionDigits: 1 }).toString(),
            reviewsCount: faker.number.int({ min: 0, max: 500 }),
            description: `Experience the pinnacle of timekeeping with the ${name}. This exquisite piece combines ${faker.helpers.arrayElement(["traditional craftsmanship", "cutting-edge technology", "timeless design"])} with rugged durability. Features ${faker.helpers.arrayElement(["water resistance up to 100m", "sapphire crystal glass", "luminous hands", "perpetual calendar"])}.`,
            inStock: true,
        });
    }

    const createdProducts = await db.insert(products).values(productValues).returning();

    console.log("👤 Creating admin and customers...");
    const adminPassword = await bcrypt.hash("admin123", 10);
    const adminUser = await db.insert(users).values({
      email: "admin@saakali.com",
      name: "Admin User",
      password: adminPassword,
      role: "ADMIN",
    }).returning();

    const customers = await db.insert(users).values(
      Array.from({ length: 15 }).map(() => ({
        email: faker.internet.email().toLowerCase(),
        name: faker.person.fullName(),
        role: "CUSTOMER" as const,
      }))
    ).returning();

    console.log("🛒 Generating 100 historical orders...");
    for (let i = 0; i < 100; i++) {
        const customer = faker.helpers.arrayElement(customers);
        const orderProducts = faker.helpers.arrayElements(createdProducts, { min: 1, max: 3 });
        
        const total = orderProducts.reduce((sum, p) => sum + Number(p.price), 0);
        const [order] = await db.insert(orders).values({
            userId: customer.id,
            total: total.toString(),
            status: faker.helpers.arrayElement(["DELIVERED", "SHIPPED", "PROCESSING", "PENDING"]),
            createdAt: faker.date.recent({ days: 30 }),
        }).returning();

        for (const p of orderProducts) {
            await db.insert(orderItems).values({
                orderId: order.id,
                productId: p.id,
                quantity: 1,
                price: p.price,
            });
        }
        
        if (i % 20 === 0) console.log(`   Processed ${i} orders...`);
    }

    console.log("✅ Watch-Domain Seeding Complete!");
  } catch (error) {
    console.error("❌ Fatal Seeding Error:", error);
  }
}

main();
