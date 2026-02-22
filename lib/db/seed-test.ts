import * as dotenv from "dotenv";
dotenv.config();

import { db } from "./index";
import { users } from "./schema";

async function main() {
  console.log("🚀 Testing Connection...");
  try {
    const allUsers = await db.select().from(users);
    console.log("   Connection Success! User count:", allUsers.length);
  } catch (error) {
    console.error("❌ Connection Failed:", error);
  }
}

main();
