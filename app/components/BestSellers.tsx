"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Star, ShoppingCart } from "lucide-react";
import { useCart } from "../context/CartContext";

import { Product } from "../../lib/types";

interface BestSellersProps {
    products: Product[];
}

// SVG watch face illustrations for each product
function WatchIllustration({ index }: { index: number }) {
    const colors = [
        { dial: "#1a1a1a", accent: "#c9a84c", band: "#2a2a2a" },
        { dial: "#1a1a1a", accent: "#e0c76f", band: "#3d1a2e" },
        { dial: "#111", accent: "#60a5fa", band: "#1a1a2e" },
        { dial: "#1a1a1a", accent: "#c9a84c", band: "#2e2a1a" },
        { dial: "#1a1a1a", accent: "#e0c76f", band: "#2e1a2a" },
        { dial: "#1a2a1a", accent: "#4ade80", band: "#1a2a1e" },
    ];
    const c = colors[index % colors.length];

    return (
        <svg viewBox="0 0 200 260" fill="none" className="w-full h-full">
            <rect x="72" y="10" width="56" height="60" rx="6" fill={c.band} />
            <rect x="72" y="190" width="56" height="60" rx="6" fill={c.band} />
            <circle cx="100" cy="130" r="72" fill={c.dial} stroke={c.accent} strokeWidth="3" />
            <circle cx="100" cy="130" r="62" fill="#0f0f0f" stroke={`${c.accent}33`} strokeWidth="1" />
            {[...Array(12)].map((_, i) => {
                const angle = (i * 30 - 90) * (Math.PI / 180);
                const x1 = 100 + 52 * Math.cos(angle);
                const y1 = 130 + 52 * Math.sin(angle);
                const x2 = 100 + (i % 3 === 0 ? 42 : 47) * Math.cos(angle);
                const y2 = 130 + (i % 3 === 0 ? 42 : 47) * Math.sin(angle);
                return (
                    <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={c.accent} strokeWidth={i % 3 === 0 ? 2.5 : 1} strokeLinecap="round" />
                );
            })}
            <line x1="100" y1="130" x2="100" y2="90" stroke={c.accent} strokeWidth="3" strokeLinecap="round" />
            <line x1="100" y1="130" x2="135" y2="130" stroke={c.accent} strokeWidth="2" strokeLinecap="round" opacity="0.8" />
            <circle cx="100" cy="130" r="4" fill={c.accent} />
            <circle cx="100" cy="130" r="2" fill="#111" />
        </svg>
    );
}

export default function BestSellers({ products }: BestSellersProps) {
    const { addToCart } = useCart();
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-80px" });

    return (
        <section id="bestsellers" className="section-padding relative bg-bg-secondary">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

            <div ref={ref} className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7 }}
                    className="text-center mb-8"
                >
                    <span className="text-gold text-xs font-semibold tracking-[0.25em] uppercase mb-4 block">
                        Shop
                    </span>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-[family-name:var(--font-heading)] text-text-primary mb-4">
                        Best <span className="gold-gradient-text">Sellers</span>
                    </h2>
                    <p className="text-text-muted text-sm sm:text-base max-w-2xl mx-auto">
                        These timepieces have earned their place on wrists around the world.
                    </p>
                </motion.div>

                {/* Product grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
                    {products.map((product, i) => (
                        <motion.div
                            key={product.id || product.name}
                            initial={{ opacity: 0, y: 40 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: i * 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                            className="group relative bg-bg-card border border-border-subtle rounded-2xl overflow-hidden hover:border-gold/25 transition-all duration-500"
                        >
                            {/* Badge */}
                            <div
                                className="absolute top-4 left-4 z-20 px-3 py-1 rounded-full text-xs font-semibold text-bg-primary"
                                style={{ background: product.badgeColor }}
                            >
                                {product.badge}
                            </div>

                            {/* Product image area */}
                            <div className="relative h-52 sm:h-56 bg-gradient-to-b from-bg-elevated to-bg-card flex items-center justify-center overflow-hidden">
                                <div className="w-32 h-44 sm:w-36 sm:h-48 group-hover:scale-105 transition-transform duration-700">
                                    <WatchIllustration index={product.id.split('').reduce((acc: number, char: string) => acc + char.charCodeAt(0), 0)} />
                                </div>

                                {/* Quick add overlay */}
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                    <button
                                        onClick={() => addToCart(product)}
                                        className="btn-primary !py-2.5 !px-5 text-sm transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
                                    >
                                        <ShoppingCart className="w-4 h-4" />
                                        Quick Add
                                    </button>
                                </div>
                            </div>

                            {/* Info */}
                            <div className="p-5">
                                <p className="text-xs text-text-muted uppercase tracking-wider mb-1">
                                    {product.category}
                                </p>
                                <h3 className="text-base font-semibold text-text-primary mb-2 group-hover:text-gold transition-colors">
                                    {product.name}
                                </h3>
                                <div className="flex items-center gap-1.5 mb-3">
                                    {[...Array(5)].map((_, j) => (
                                        <Star
                                            key={j}
                                            className="w-3.5 h-3.5"
                                            fill={j < Math.floor(product.rating) ? "#c9a84c" : "transparent"}
                                            stroke="#c9a84c"
                                            strokeWidth={1.5}
                                        />
                                    ))}
                                    <span className="text-xs text-text-muted ml-1">
                                        ({product.reviewsCount})
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-lg font-bold gold-gradient-text">
                                        ${product.price}
                                    </span>
                                    {product.originalPrice && (
                                        <span className="text-sm text-text-muted line-through">
                                            ${product.originalPrice}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* View all CTA */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.8, duration: 0.6 }}
                    className="text-center mt-12"
                >
                    <a href="/shop" className="btn-secondary">
                        View All Watches
                        <ArrowRight className="w-4 h-4" />
                    </a>
                </motion.div>
            </div>
        </section>
    );
}
