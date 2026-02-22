import * as dotenv from "dotenv";
dotenv.config();

import { db } from "./lib/db/index";
import { users } from "./lib/db/schema";
import { eq } from "drizzle-orm";

async function check() {
  const admin = await db.query.users.findFirst({
    where: eq(users.email, "admin@saakali.com"),
  });

  if (admin) {
    console.log("Admin User Found:");
    console.log("Email:", admin.email);
    console.log("Role:", admin.role);
    console.log("Password (hashed):", admin.password ? "YES" : "NO");
  } else {
    console.log("Admin User NOT found!");
  }
}

check();
