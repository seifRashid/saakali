"use server";

import { db } from "../../lib/db";
import { orders } from "../../lib/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function updateOrderStatusAction(id: string, status: any) {
  try {
    await db.update(orders).set({ status }).where(eq(orders.id, id));
    
    revalidatePath("/admin/orders");
    revalidatePath("/admin/dashboard");
    return { success: true };
  } catch (error) {
    console.error("Update Order Error:", error);
    return { error: "Failed to update order status" };
  }
}
