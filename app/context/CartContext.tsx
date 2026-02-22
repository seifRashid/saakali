"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { Product } from "../../lib/types";
import { addToCartAction, removeFromCartAction, updateQuantityAction, fetchCart } from "../actions/cart";

interface CartItem extends Product {
    quantity: number;
}

interface Toast {
    id: string;
    message: string;
    type: "success" | "info";
}

interface CartContextType {
    cart: CartItem[];
    addToCart: (product: Product) => void;
    removeFromCart: (productId: string) => void;
    updateQuantity: (productId: string, quantity: number) => void;
    clearCart: () => void;
    cartCount: number;
    cartTotal: number;
    isCartOpen: boolean;
    setIsCartOpen: (isOpen: boolean) => void;
    toasts: Toast[];
    removeToast: (id: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [toasts, setToasts] = useState<Toast[]>([]);

    // Toast functions
    const addToast = (message: string, type: "success" | "info" = "success") => {
        const id = Math.random().toString(36).substring(2, 9);
        setToasts((prev) => [...prev, { id, message, type }]);
        setTimeout(() => removeToast(id), 3000);
    };

    const removeToast = (id: string) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    };

    // Load cart from DB on mount
    useEffect(() => {
        const loadCart = async () => {
            try {
                const dbCart = await fetchCart();
                setCart(dbCart as any); // Cast as any for now to handle minor interface differences
            } catch (e) {
                console.error("Failed to load cart from DB", e);
                // Fallback to localStorage if DB fails (optional)
            }
        };
        loadCart();
    }, []);

    const addToCart = async (product: Product) => {
        // Optimistic update
        setCart((prevCart) => {
            const existingItem = prevCart.find((item) => item.id === product.id);
            if (existingItem) {
                return prevCart.map((item) =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prevCart, { ...product, quantity: 1 }];
        });
        addToast(`${product.name} added to cart`);

        // Sync with DB
        try {
            await addToCartAction(product.id, 1);
        } catch (e) {
            console.error("Failed to sync addToCart with DB", e);
            // Revert or show error
        }
    };

    const removeFromCart = async (productId: string) => {
        const itemToRemove = cart.find(i => i.id === productId);
        setCart((prevCart) => prevCart.filter((item) => item.id !== productId));

        try {
            await removeFromCartAction(productId);
        } catch (e) {
            console.error("Failed to sync removeFromCart with DB", e);
        }
    };

    const updateQuantity = async (productId: string, quantity: number) => {
        if (quantity <= 0) {
            removeFromCart(productId);
            return;
        }

        setCart((prevCart) =>
            prevCart.map((item) =>
                item.id === productId ? { ...item, quantity } : item
            )
        );

        try {
            await updateQuantityAction(productId, quantity);
        } catch (e) {
            console.error("Failed to sync updateQuantity with DB", e);
        }
    };

    const clearCart = () => {
        setCart([]);
        // Add clearCartAction if needed
    };

    const cartCount = cart.reduce((count, item) => count + item.quantity, 0);
    const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

    return (
        <CartContext.Provider
            value={{
                cart,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
                cartCount,
                cartTotal,
                isCartOpen,
                setIsCartOpen,
                toasts,
                removeToast,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
};
