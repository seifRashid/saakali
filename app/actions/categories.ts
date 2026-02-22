"use server";

import { db } from "../../lib/db";
import { categories } from "../../lib/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function createCategoryAction(data: any) {
  try {
    await db.insert(categories).values(data);
    revalidatePath("/admin/categories");
    revalidatePath("/shop");
    return { success: true };
  } catch (error) {
    console.error("Create Category Error:", error);
    return { error: "Failed to create category" };
  }
}

export async function updateCategoryAction(id: string, data: any) {
  try {
    await db.update(categories).set(data).where(eq(categories.id, id));
    revalidatePath("/admin/categories");
    revalidatePath("/shop");
    return { success: true };
  } catch (error) {
    console.error("Update Category Error:", error);
    return { error: "Failed to update category" };
  }
}

export async function deleteCategoryAction(id: string) {
  try {
    await db.delete(categories).where(eq(categories.id, id));
    revalidatePath("/admin/categories");
    revalidatePath("/shop");
    return { success: true };
  } catch (error) {
    console.error("Delete Category Error:", error);
    return { error: "Failed to delete category (ensure no products are linked)" };
  }
}
