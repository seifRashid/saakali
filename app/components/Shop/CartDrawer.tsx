"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingBag, Trash2, Plus, Minus, ArrowRight } from "lucide-react";
import { useCart } from "../../context/CartContext";

export default function CartDrawer() {
    const {
        cart,
        removeFromCart,
        updateQuantity,
        isCartOpen,
        setIsCartOpen,
        cartTotal,
    } = useCart();

    return (
        <AnimatePresence>
            {isCartOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsCartOpen(false)}
                        className="fixed inset-0 bg-black/60 z-[60] backdrop-blur-sm"
                    />

                    {/* Drawer */}
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed right-0 top-0 h-full w-full max-w-md bg-bg-secondary z-[70] shadow-2xl border-l border-border-subtle flex flex-col"
                    >
                        {/* Header */}
                        <div className="p-6 border-b border-border-subtle flex items-center justify-between bg-bg-card">
                            <div className="flex items-center gap-3">
                                <ShoppingBag className="w-5 h-5 text-gold" />
                                <h2 className="text-xl font-bold font-[family-name:var(--font-heading)]">Your Cart</h2>
                                <span className="bg-gold/10 text-gold text-xs px-2 py-0.5 rounded-full border border-gold/20">
                                    {cart.length} items
                                </span>
                            </div>
                            <button
                                onClick={() => setIsCartOpen(false)}
                                className="p-2 hover:bg-bg-elevated rounded-full transition-colors"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Items */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-6">
                            {cart.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-center">
                                    <div className="w-16 h-16 rounded-full bg-bg-elevated flex items-center justify-center mb-4">
                                        <ShoppingBag className="w-8 h-8 text-text-muted" />
                                    </div>
                                    <p className="text-text-secondary font-medium">Your cart is empty</p>
                                    <button
                                        onClick={() => setIsCartOpen(false)}
                                        className="mt-4 text-gold hover:underline text-sm font-medium"
                                    >
                                        Continue Shopping
                                    </button>
                                </div>
                            ) : (
                                cart.map((item) => (
                                    <div key={item.id} className="flex gap-4 group">
                                        <div className="w-20 h-24 bg-bg-elevated rounded-lg flex items-center justify-center p-2 border border-border-subtle">
                                            {/* Placeholder for watch SVG or image */}
                                            <WatchIcon index={parseInt(item.id)} />
                                        </div>
                                        <div className="flex-1 flex flex-col">
                                            <div className="flex justify-between mb-1">
                                                <h3 className="text-sm font-semibold text-text-primary group-hover:text-gold transition-colors">
                                                    {item.name}
                                                </h3>
                                                <button
                                                    onClick={() => removeFromCart(item.id)}
                                                    className="text-text-muted hover:text-red-400 transition-colors"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                            <p className="text-xs text-text-muted mb-3">{item.category}</p>
                                            <div className="mt-auto flex items-center justify-between">
                                                <div className="flex items-center border border-border-subtle rounded-lg bg-bg-primary overflow-hidden">
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                        className="p-1 px-2 hover:bg-bg-elevated transition-colors"
                                                    >
                                                        <Minus className="w-3 h-3" />
                                                    </button>
                                                    <span className="text-xs font-bold px-3 min-w-[32px] text-center">
                                                        {item.quantity}
                                                    </span>
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                        className="p-1 px-2 hover:bg-bg-elevated transition-colors"
                                                    >
                                                        <Plus className="w-3 h-3" />
                                                    </button>
                                                </div>
                                                <span className="font-bold text-gold">${item.price * item.quantity}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        {/* Footer */}
                        {cart.length > 0 && (
                            <div className="p-6 bg-bg-card border-t border-border-subtle space-y-4">
                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-text-muted">Subtotal</span>
                                        <span className="text-text-primary font-medium">${cartTotal}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-text-muted">Shipping</span>
                                        <span className="text-green-400 font-medium">Free</span>
                                    </div>
                                    <div className="flex justify-between text-lg font-bold border-t border-border-subtle pt-2 mt-2">
                                        <span>Total</span>
                                        <span className="gold-gradient-text">${cartTotal}</span>
                                    </div>
                                </div>
                                <button className="btn-primary w-full justify-center py-4 text-base mt-2 group">
                                    Checkout
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </button>
                                <p className="text-[10px] text-center text-text-muted uppercase tracking-widest">
                                    Secure checkout powered by Saakali
                                </p>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}

function WatchIcon({ index }: { index: number }) {
    return (
        <svg viewBox="0 0 100 130" fill="none" className="w-full h-full opacity-80">
            <rect x="36" y="5" width="28" height="30" rx="3" fill="#333" />
            <rect x="36" y="95" width="28" height="30" rx="3" fill="#333" />
            <circle cx="50" cy="65" r="35" fill="#1a1a1a" stroke="#c9a84c" strokeWidth="2" />
            <line x1="50" y1="65" x2="50" y2="45" stroke="#c9a84c" strokeWidth="2" strokeLinecap="round" />
            <line x1="50" y1="65" x2="65" y2="65" stroke="#c9a84c" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
    );
}
