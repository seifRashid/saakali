"use client";

import { motion } from "framer-motion";
import { ShoppingCart, Eye, Star } from "lucide-react";
import { Product } from "../../data/products";
import { useCart } from "../../context/CartContext";

interface ProductCardProps {
    product: Product;
    index: number;
    onQuickView: (product: Product) => void;
}

export default function ProductCard({ product, index, onQuickView }: ProductCardProps) {
    const { addToCart } = useCart();

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05, duration: 0.6 }}
            className="group relative bg-bg-card border border-border-subtle rounded-2xl overflow-hidden hover:border-gold/30 transition-all duration-500 shadow-xl"
        >
            {/* Badge */}
            {product.badge && (
                <div
                    className="absolute top-4 left-4 z-20 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-bg-primary"
                    style={{ background: product.badgeColor || "var(--gold)" }}
                >
                    {product.badge}
                </div>
            )}

            {/* Image Area */}
            <div className="relative h-64 bg-gradient-to-b from-bg-elevated to-bg-card flex items-center justify-center p-8 overflow-hidden">
                <div className="w-full h-full transform group-hover:scale-110 transition-transform duration-700 ease-out">
                    <WatchIllustration index={product.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)} />
                </div>

                {/* Overlays */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-3">
                    <button
                        onClick={() => addToCart(product)}
                        className="btn-primary !py-2.5 !px-6 text-sm transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
                    >
                        <ShoppingCart className="w-4 h-4" />
                        Add to Cart
                    </button>
                    <button
                        onClick={() => onQuickView(product)}
                        className="bg-white/10 backdrop-blur-md text-white hover:bg-white/20 px-6 py-2.5 rounded-full text-sm font-semibold border border-white/20 transition-all transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75"
                    >
                        Quick View
                    </button>
                </div>
            </div>

            {/* Info Area */}
            <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                    <div>
                        <p className="text-[10px] text-gold font-bold uppercase tracking-[0.2em] mb-1">
                            {product.category}
                        </p>
                        <h3 className="text-lg font-bold text-text-primary group-hover:text-gold transition-colors font-[family-name:var(--font-heading)]">
                            {product.name}
                        </h3>
                    </div>
                </div>

                <div className="flex items-center gap-2 mb-4">
                    <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                            <Star
                                key={i}
                                className={`w-3 h-3 ${i < Math.floor(product.rating) ? "text-gold fill-gold" : "text-text-muted"}`}
                            />
                        ))}
                    </div>
                    <span className="text-[11px] text-text-muted">({product.reviewsCount})</span>
                    <span className="w-1 h-1 rounded-full bg-text-muted/30 mx-1" />
                    <span className="text-[11px] text-text-muted uppercase tracking-tighter">{product.type}</span>
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex items-baseline gap-2">
                        <span className="text-xl font-bold gold-gradient-text">${product.price}</span>
                        {product.originalPrice && (
                            <span className="text-sm text-text-muted line-through">${product.originalPrice}</span>
                        )}
                    </div>
                    {!product.inStock && (
                        <span className="text-[10px] text-red-400 font-bold uppercase border border-red-400/30 px-2 py-0.5 rounded bg-red-400/10">
                            Out of Stock
                        </span>
                    )}
                </div>
            </div>
        </motion.div>
    );
}

function WatchIllustration({ index }: { index: number }) {
    // Variations based on index
    const colors = [
        { main: "#c9a84c", bg: "#1a1a1a", strap: "#2a2a2a" },
        { main: "#e0c76f", bg: "#111", strap: "#3a1a2e" },
        { main: "#a68a3e", bg: "#161616", strap: "#1a2a3e" },
    ];
    const c = colors[index % colors.length];

    return (
        <svg viewBox="0 0 200 240" fill="none" className="w-full h-full drop-shadow-2xl">
            <rect x="75" y="0" width="50" height="60" rx="4" fill={c.strap} />
            <rect x="75" y="180" width="50" height="60" rx="4" fill={c.strap} />
            <circle cx="100" cy="120" r="75" fill={c.bg} stroke={c.main} strokeWidth="3" />
            <circle cx="100" cy="120" r="65" fill="#0c0c0c" stroke={`${c.main}22`} strokeWidth="1" />
            {[...Array(12)].map((_, i) => {
                const angle = (i * 30 - 90) * (Math.PI / 180);
                const x1 = 100 + 55 * Math.cos(angle);
                const y1 = 120 + 55 * Math.sin(angle);
                const x2 = 100 + (i % 3 === 0 ? 45 : 50) * Math.cos(angle);
                const y2 = 120 + (i % 3 === 0 ? 45 : 50) * Math.sin(angle);
                return (
                    <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={c.main} strokeWidth={i % 3 === 0 ? 3 : 1} strokeLinecap="round" />
                );
            })}
            <line x1="100" y1="120" x2="100" y2="85" stroke={c.main} strokeWidth="4" strokeLinecap="round" />
            <line x1="100" y1="120" x2="135" y2="120" stroke={c.main} strokeWidth="2.5" strokeLinecap="round" opacity="0.8" />
            <circle cx="100" cy="120" r="5" fill={c.main} />
            <circle cx="100" cy="120" r="2.5" fill="#111" />
        </svg>
    );
}
