import { db } from "./index";
import { products, categories, productImages, carts, cartItems } from "./schema";
import { eq, and, gte, lte, ilike, or } from "drizzle-orm";

export async function getProducts() {
  const allProducts = await db.query.products.findMany({
    with: {
      category: true,
      images: true,
    }
  });

  return allProducts.map(p => ({
    ...p,
    price: Number(p.price),
    originalPrice: p.originalPrice ? Number(p.originalPrice) : undefined,
    category: p.category?.name || "Uncategorized",
    rating: Number(p.rating),
    badge: p.badge ?? undefined,
    badgeColor: p.badgeColor ?? undefined,
  }));
}

export async function getCategories() {
  return await db.query.categories.findMany();
}

export async function getProductById(id: string) {
  const product = await db.query.products.findFirst({
    where: eq(products.id, id),
    with: {
      category: true,
      images: true,
    },
  });

  if (!product) return null;

  return {
    ...product,
    price: Number(product.price),
    originalPrice: product.originalPrice ? Number(product.originalPrice) : undefined,
    category: product.category.name,
    rating: Number(product.rating),
    badge: product.badge ?? undefined,
    badgeColor: product.badgeColor ?? undefined,
  };
}

export async function getCart(userId: string) {
  let cartCenter = await db.query.carts.findFirst({
    where: eq(carts.userId, userId),
    with: {
      items: {
        with: {
          product: {
            with: {
              category: true,
              images: true,
            }
          }
        }
      }
    }
  });

  if (!cartCenter) {
    // Create cart if not exists
    const newCart = await db.insert(carts).values({ userId }).returning();
    return { ...newCart[0], items: [] };
  }

  return cartCenter;
}

export async function addToCartDb(userId: string, productId: string, quantity: number = 1) {
  const cartCenter = await getCart(userId);
  
  const existingItem = await db.query.cartItems.findFirst({
    where: and(eq(cartItems.cartId, cartCenter.id), eq(cartItems.productId, productId)),
  });

  if (existingItem) {
    return await db.update(cartItems)
      .set({ quantity: existingItem.quantity + quantity })
      .where(eq(cartItems.id, existingItem.id))
      .returning();
  } else {
    return await db.insert(cartItems).values({
      cartId: cartCenter.id,
      productId,
      quantity,
    }).returning();
  }
}

export async function removeFromCartDb(userId: string, productId: string) {
  const cartCenter = await getCart(userId);
  return await db.delete(cartItems)
    .where(and(eq(cartItems.cartId, cartCenter.id), eq(cartItems.productId, productId)))
    .returning();
}

export async function updateCartItemQuantityDb(userId: string, productId: string, quantity: number) {
  const cartCenter = await getCart(userId);
  if (quantity <= 0) {
    return await removeFromCartDb(userId, productId);
  }
  return await db.update(cartItems)
    .set({ quantity })
    .where(and(eq(cartItems.cartId, cartCenter.id), eq(cartItems.productId, productId)))
    .returning();
}
