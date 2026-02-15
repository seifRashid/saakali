"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Gem, Settings, Watch, Smartphone } from "lucide-react";

const categories = [
    {
        icon: Gem,
        label: "Luxury Watches",
        emoji: "✨",
        color: "#c9a84c",
    },
    {
        icon: Settings,
        label: "Quartz Precision",
        emoji: "⚙",
        color: "#a0a0a0",
    },
    {
        icon: Watch,
        label: "Analogue Classics",
        emoji: "⌚",
        color: "#e0c76f",
    },
    {
        icon: Smartphone,
        label: "Digital Innovation",
        emoji: "📱",
        color: "#60a5fa",
    },
];

export default function FeaturedCategories() {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-80px" });

    return (
        <section id="categories" className="section-padding relative bg-bg-secondary">
            {/* Top/bottom border lines */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

            <div ref={ref} className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7 }}
                    className="text-center mb-14"
                >
                    <span className="text-gold text-xs font-semibold tracking-[0.25em] uppercase mb-3 block">
                        Categories
                    </span>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-[family-name:var(--font-heading)] text-text-primary">
                        Designed For <span className="gold-gradient-text">Every Style</span>
                    </h2>
                </motion.div>

                {/* Category cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-10 mb-12">
                    {categories.map((cat, i) => (
                        <motion.div
                            key={cat.label}
                            initial={{ opacity: 0, y: 30 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: i * 0.12, duration: 0.6 }}
                            className="group relative bg-bg-card border border-border-subtle rounded-2xl p-8 sm:p-10 text-center hover:border-gold/25 transition-all duration-500 cursor-pointer overflow-hidden"
                        >
                            {/* Hover glow */}
                            <div
                                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
                                style={{
                                    background: `radial-gradient(circle at 50% 50%, ${cat.color}08 0%, transparent 70%)`,
                                }}
                            />

                            <div className="relative z-10">
                                <motion.div
                                    whileHover={{ scale: 1.1, rotate: 5 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                    className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-4"
                                    style={{
                                        background: `${cat.color}12`,
                                        border: `1px solid ${cat.color}25`,
                                    }}
                                >
                                    <cat.icon className="w-7 h-7" style={{ color: cat.color }} />
                                </motion.div>
                                <h3 className="text-sm sm:text-base font-semibold text-text-primary">
                                    {cat.label}
                                </h3>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Description */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.6, duration: 0.7 }}
                    className="text-center text-sm sm:text-base text-text-muted max-w-2xl mx-auto"
                >
                    Whether you prefer heritage craftsmanship or modern digital
                    functionality — Saakali delivers exceptional design without compromise.
                </motion.p>
            </div>
        </section>
    );
}
