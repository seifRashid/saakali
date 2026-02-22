import * as dotenv from "dotenv";
dotenv.config();

import { db } from "./lib/db/index";
import { users } from "./lib/db/schema";

async function listAllUsers() {
  console.log("--- LISTING ALL USERS ---");
  try {
    const allUsers = await db.query.users.findMany();
    console.log(`Summary: Found ${allUsers.length} users.`);
    allUsers.forEach(u => {
      console.log(`- ID: ${u.id} | Email: "${u.email}" | Role: ${u.role} | Password: ${u.password ? "YES" : "NO"}`);
    });
  } catch (err: any) {
    console.error("Error:", err.message);
  }
}

listAllUsers();
