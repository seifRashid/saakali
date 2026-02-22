import * as dotenv from "dotenv";
dotenv.config();

import { db } from "./lib/db/index";
import { users } from "./lib/db/schema";
import { eq } from "drizzle-orm";

async function main() {
  console.log("--- DB CHECK ---");
  try {
    const admin = await db.query.users.findFirst({
      where: eq(users.email, "admin@saakali.com"),
    });

    if (!admin) {
      console.log("RESULT: ADMIN_NOT_FOUND");
    } else {
      console.log("RESULT: SUCCESS");
      console.log("USER_DATA:", JSON.stringify({
        email: admin.email,
        role: admin.role,
        hasPassword: !!admin.password,
        id: admin.id
      }));
    }
  } catch (err: any) {
    console.log("RESULT: ERROR");
    console.log("ERROR_MSG:", err.message);
  }
}

main();
