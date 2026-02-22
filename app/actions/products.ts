"use server";

import { db } from "../../lib/db";
import { products, productImages } from "../../lib/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function createProductAction(data: any) {
  try {
    const { images, ...productData } = data;
    
    const [newProduct] = await db.insert(products).values(productData).returning();
    
    if (images && images.length > 0) {
      await db.insert(productImages).values(
        images.map((url: string) => ({ url, productId: newProduct.id }))
      );
    }
    
    revalidatePath("/admin/products");
    revalidatePath("/shop");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Create Product Error:", error);
    return { error: "Failed to create product" };
  }
}

export async function updateProductAction(id: string, data: any) {
  try {
    const { images, ...productData } = data;
    
    await db.update(products).set(productData).where(eq(products.id, id));
    
    if (images) {
      // For simplicity, we'll replace images
      await db.delete(productImages).where(eq(productImages.productId, id));
      if (images.length > 0) {
        await db.insert(productImages).values(
          images.map((url: string) => ({ url, productId: id }))
        );
      }
    }
    
    revalidatePath("/admin/products");
    revalidatePath(`/shop`);
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Update Product Error:", error);
    return { error: "Failed to update product" };
  }
}

export async function deleteProductAction(id: string) {
  try {
    // Delete dependent images first
    await db.delete(productImages).where(eq(productImages.productId, id));
    await db.delete(products).where(eq(products.id, id));
    
    revalidatePath("/admin/products");
    revalidatePath("/shop");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Delete Product Error:", error);
    return { error: "Failed to delete product" };
  }
}
