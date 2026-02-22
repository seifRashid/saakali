const dotenv = require("dotenv");
dotenv.config();

console.log("DATABASE_URL present:", !!process.env.DATABASE_URL);

const { db } = require("./index");
const { users } = require("./schema");

async function main() {
  console.log("🚀 Testing Connection (CJS)...");
  try {
    const allUsers = await db.select().from(users);
    console.log("   Connection Success! User count:", allUsers.length);
  } catch (error) {
    console.error("❌ Connection Failed:", error);
  }
}

main();
