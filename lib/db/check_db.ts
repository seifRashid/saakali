import { db } from "./index";
import { sql } from "drizzle-orm";

async function main() {
  try {
    const result = await db.execute(sql`SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'`);
    console.log("Tables in DB:", result);
  } catch (err) {
    console.error("Query failed:", err);
  }
}

main();
