"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingBag, Star, Shield, Truck, Award } from "lucide-react";
import { Product } from "../../data/products";
import { useCart } from "../../context/CartContext";

interface QuickViewProps {
    product: Product | null;
    onClose: () => void;
}

export default function QuickView({ product, onClose }: QuickViewProps) {
    const { addToCart } = useCart();

    if (!product) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                {/* Backdrop */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-black/80 backdrop-blur-md"
                />

                {/* Modal Container */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    transition={{ type: "spring", damping: 30, stiffness: 300 }}
                    className="relative w-full max-w-4xl bg-bg-secondary rounded-3xl overflow-hidden shadow-2xl border border-border-subtle flex flex-col md:flex-row h-full max-h-[800px]"
                >
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 z-10 p-2 bg-bg-primary/50 backdrop-blur-md rounded-full border border-border-subtle hover:text-gold transition-colors"
                    >
                        <X className="w-6 h-6" />
                    </button>

                    {/* Image Section */}
                    <div className="md:w-1/2 bg-gradient-to-br from-bg-elevated to-bg-card flex items-center justify-center p-12 relative overflow-hidden group">
                        <div className="w-full h-full transform group-hover:scale-105 transition-transform duration-1000">
                            <WatchIllustration index={product.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)} />
                        </div>
                        <div className="absolute top-6 left-6 flex flex-col gap-2">
                            {product.badge && (
                                <span
                                    className="px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest text-bg-primary shadow-lg"
                                    style={{ background: product.badgeColor || "var(--gold)" }}
                                >
                                    {product.badge}
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Info Section */}
                    <div className="md:w-1/2 p-8 md:p-12 overflow-y-auto flex flex-col">
                        <div className="mb-6">
                            <span className="text-gold text-xs font-bold tracking-[0.3em] uppercase mb-2 block">
                                {product.category} — {product.type}
                            </span>
                            <h2 className="text-3xl lg:text-4xl font-bold font-[family-name:var(--font-heading)] text-text-primary mb-4 leading-tight">
                                {product.name}
                            </h2>
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-1.5">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            className={`w-4 h-4 ${i < Math.floor(product.rating) ? "text-gold fill-gold" : "text-text-muted"}`}
                                        />
                                    ))}
                                    <span className="text-sm text-text-muted ml-1 font-medium">
                                        {product.rating} ({product.reviewsCount} Verification Reviews)
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-baseline gap-4 mb-8">
                            <span className="text-4xl font-bold gold-gradient-text">${product.price}</span>
                            {product.originalPrice && (
                                <span className="text-xl text-text-muted line-through">${product.originalPrice}</span>
                            )}
                            <span className="ml-auto text-xs font-bold text-green-400 bg-green-400/10 px-3 py-1 rounded-full uppercase tracking-wider">
                                {product.inStock ? "Currently In Stock" : "Temporarily Out of Stock"}
                            </span>
                        </div>

                        <div className="space-y-6 mb-10 flex-1">
                            <p className="text-text-secondary leading-relaxed text-sm lg:text-base">
                                {product.description}
                            </p>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-4 bg-bg-card rounded-2xl border border-border-subtle">
                                    <span className="text-[10px] text-text-muted uppercase tracking-widest mb-1 block">Material</span>
                                    <span className="text-sm font-semibold">{product.material}</span>
                                </div>
                                <div className="p-4 bg-bg-card rounded-2xl border border-border-subtle">
                                    <span className="text-[10px] text-text-muted uppercase tracking-widest mb-1 block">Strap</span>
                                    <span className="text-sm font-semibold">{product.strap || "Premium Rubber"}</span>
                                </div>
                            </div>
                        </div>

                        {/* Features */}
                        <div className="flex flex-wrap gap-6 mb-10 border-y border-border-subtle py-6">
                            {[
                                { icon: Truck, label: "Free Shipping" },
                                { icon: Shield, label: "Secure Payment" },
                                { icon: Award, label: "2-Year Warranty" }
                            ].map((f, i) => (
                                <div key={i} className="flex items-center gap-2 text-text-muted">
                                    <f.icon className="w-4 h-4 text-gold/60" />
                                    <span className="text-xs font-medium">{f.label}</span>
                                </div>
                            ))}
                        </div>

                        <div className="flex gap-4">
                            <button
                                onClick={() => {
                                    addToCart(product);
                                    onClose();
                                }}
                                disabled={!product.inStock}
                                className="flex-1 btn-primary justify-center py-4 text-base shadow-[0_10px_30px_-10px_var(--gold)] disabled:opacity-50 disabled:cursor-not-allowed group"
                            >
                                <ShoppingBag className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                {product.inStock ? "Add to Cart" : "Out of Stock"}
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}

function WatchIllustration({ index }: { index: number }) {
    const colors = [
        { main: "#c9a84c", bg: "#1a1a1a", strap: "#2a2a2a" },
        { main: "#e0c76f", bg: "#111", strap: "#3a1a2e" },
        { main: "#a68a3e", bg: "#161616", strap: "#1a2a3e" },
    ];
    const c = colors[index % colors.length];

    return (
        <svg viewBox="0 0 200 240" fill="none" className="w-full h-full drop-shadow-2xl">
            <rect x="70" y="0" width="60" height="65" rx="4" fill={c.strap} />
            <rect x="70" y="175" width="60" height="65" rx="4" fill={c.strap} />
            <circle cx="100" cy="120" r="80" fill={c.bg} stroke={c.main} strokeWidth="3" />
            <circle cx="100" cy="120" r="70" fill="#0c0c0c" stroke={`${c.main}22`} strokeWidth="1" />
            {[...Array(12)].map((_, i) => {
                const angle = (i * 30 - 90) * (Math.PI / 180);
                const x1 = 100 + 60 * Math.cos(angle);
                const y1 = 120 + 60 * Math.sin(angle);
                const x2 = 100 + (i % 3 === 0 ? 50 : 55) * Math.cos(angle);
                const y2 = 120 + (i % 3 === 0 ? 50 : 55) * Math.sin(angle);
                return (
                    <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={c.main} strokeWidth={i % 3 === 0 ? 4 : 1.5} strokeLinecap="round" />
                );
            })}
            <line x1="100" y1="120" x2="100" y2="80" stroke={c.main} strokeWidth="6" strokeLinecap="round" />
            <line x1="100" y1="120" x2="140" y2="120" stroke={c.main} strokeWidth="4" strokeLinecap="round" opacity="0.8" />
            <circle cx="100" cy="120" r="6" fill={c.main} />
            <circle cx="100" cy="120" r="3" fill="#111" />
        </svg>
    );
}
