import * as dotenv from "dotenv";
dotenv.config();

import { getUserByEmail } from "./lib/db/queries";
import bcrypt from "bcryptjs";

async function testLogin(emailInput: string, passwordInput: string) {
  console.log("Testing Login for:", emailInput);
  
  const user = await getUserByEmail(emailInput);
  
  if (!user) {
    console.log("FAIL: User not found");
    return;
  }
  
  console.log("User found:", user.email);
  console.log("User role:", user.role);
  
  if (user.role !== "ADMIN") {
    console.log("FAIL: User is not ADMIN. Role is:", user.role);
    return;
  }
  
  if (!user.password) {
    console.log("FAIL: User has no password");
    return;
  }
  
  const isMatch = await bcrypt.compare(passwordInput, user.password);
  if (isMatch) {
    console.log("SUCCESS: Password matches!");
  } else {
    console.log("FAIL: Password mismatch");
  }
}

// Test with exactly what the user should use
testLogin("admin@saakali.com", "admin123");
// Test with common variations
testLogin("admin@saakali.com ", "admin123");
testLogin("Admin@saakali.com", "admin123");
