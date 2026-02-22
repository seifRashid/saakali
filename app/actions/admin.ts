"use server";

import { getUserByEmail } from "../../lib/db/queries";
import { login, logout } from "../../lib/auth";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";

export async function adminLoginAction(formData: FormData) {
  const email = (formData.get("email") as string)?.trim().toLowerCase();
  const password = (formData.get("password") as string)?.trim();

  if (!email || !password) {
    return { error: "Email and password are required" };
  }

  const user = await getUserByEmail(email);

  if (!user || user.role !== "ADMIN") {
    return { error: "Invalid credentials or unauthorized" };
  }

  // Double check if password exists in DB
  if (!user.password) {
     return { error: "Invalid credentials" };
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);

  if (!isPasswordCorrect) {
    return { error: "Invalid credentials" };
  }

  await login({ id: user.id, email: user.email, role: user.role });
  redirect("/admin/dashboard");
}

export async function logoutAction() {
  await logout();
  redirect("/admin/login");
}
