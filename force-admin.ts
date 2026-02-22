import * as dotenv from "dotenv";
dotenv.config();

import { db } from "./lib/db/index";
import { users } from "./lib/db/schema";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";

async function forceAdmin() {
  console.log("🚀 Force-creating Admin User...");
  try {
    const email = "admin@saakali.com";
    const password = "admin123";
    const hashedPassword = await bcrypt.hash(password, 10);

    // Delete if exists to ensure fresh state
    await db.delete(users).where(eq(users.email, email));
    
    await db.insert(users).values({
      email,
      name: "Saakali Admin",
      password: hashedPassword,
      role: "ADMIN",
    });

    console.log("✅ Admin user created/reset successfully!");
    console.log("Email: admin@saakali.com");
    console.log("Password: admin123");
  } catch (err: any) {
    console.error("❌ Error:", err.message);
  }
}

forceAdmin();
