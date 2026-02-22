"use server";

import { revalidatePath } from "next/cache";
import { addToCartDb, removeFromCartDb, updateCartItemQuantityDb, getCart } from "../../lib/db/queries";
import { cookies } from "next/headers";

// For now, using a fixed test user ID for demonstration.
// In a real app, this would come from an auth session.
const TEST_USER_ID = "972c71ea-2ad7-49f3-80e2-e1e5b8e90656";

export async function fetchCart() {
  const cart = await getCart(TEST_USER_ID);
  return cart.items.map((item: any) => ({
    ...item.product,
    price: Number(item.product.price),
    originalPrice: item.product.originalPrice ? Number(item.product.originalPrice) : undefined,
    category: item.product.categoryId, // Ideally map to name if needed
    quantity: item.quantity,
  }));
}

export async function addToCartAction(productId: string, quantity: number = 1) {
  await addToCartDb(TEST_USER_ID, productId, quantity);
  revalidatePath("/");
  revalidatePath("/shop");
}

export async function removeFromCartAction(productId: string) {
  await removeFromCartDb(TEST_USER_ID, productId);
  revalidatePath("/");
  revalidatePath("/shop");
}

export async function updateQuantityAction(productId: string, quantity: number) {
  await updateCartItemQuantityDb(TEST_USER_ID, productId, quantity);
  revalidatePath("/");
  revalidatePath("/shop");
}
