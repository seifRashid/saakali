import * as dotenv from "dotenv";
dotenv.config();

import { db } from "./lib/db/index";
import { users } from "./lib/db/schema";
import { eq } from "drizzle-orm";

async function checkAdmins() {
  console.log("--- CHECKING FOR ADMINS ---");
  try {
    const admins = await db.query.users.findMany({
      where: eq(users.role, "ADMIN"),
    });

    if (admins.length === 0) {
      console.log("CRITICAL: No users with role ADMIN found!");
    } else {
      console.log(`Found ${admins.length} admin(s):`);
      admins.forEach(u => {
        console.log(`- Email: "${u.email}" | ID: ${u.id} | Has Password: ${!!u.password}`);
      });
    }

    // Also check for the specific email regardless of role
    const specificUser = await db.query.users.findFirst({
        where: eq(users.email, "admin@saakali.com")
    });
    if (specificUser) {
        console.log(`Specific user "admin@saakali.com" info: Role=${specificUser.role}, HasPassword=${!!specificUser.password}`);
    } else {
        console.log(`Specific user "admin@saakali.com" NOT FOUND anywhere.`);
    }

  } catch (err: any) {
    console.error("Error:", err.message);
  }
}

checkAdmins();
