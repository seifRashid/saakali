"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
    Gem,
    Target,
    Shield,
    Truck,
    RotateCcw,
    Headphones,
    Check,
} from "lucide-react";

const trustItems = [
    { icon: Gem, title: "Premium Materials", desc: "Crafted with precision-grade components" },
    { icon: Target, title: "Precision Movement", desc: "Swiss-inspired accuracy in every tick" },
    { icon: Shield, title: "2-Year Warranty", desc: "Full coverage for peace of mind" },
    { icon: Truck, title: "Fast & Secure Delivery", desc: "Global shipping, always tracked" },
    { icon: RotateCcw, title: "Easy Returns", desc: "Hassle-free 30-day return policy" },
    { icon: Headphones, title: "Dedicated Support", desc: "Expert help when you need it" },
];

export default function WhySaakali() {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-80px" });

    return (
        <section className="section-padding relative">
            <div ref={ref} className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7 }}
                    className="text-center mb-14"
                >
                    <span className="text-gold text-xs font-semibold tracking-[0.25em] uppercase mb-3 block">
                        Why Us
                    </span>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-[family-name:var(--font-heading)] text-text-primary mb-4">
                        Why Thousands Choose{" "}
                        <span className="gold-gradient-text">Saakali</span>
                    </h2>
                    <p className="text-text-muted text-base max-w-md mx-auto">
                        We obsess over quality so you don&apos;t have to.
                    </p>
                </motion.div>

                {/* Trust Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    {trustItems.map((item, i) => (
                        <motion.div
                            key={item.title}
                            initial={{ opacity: 0, y: 30, scale: 0.95 }}
                            animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
                            transition={{ delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                            className="group relative bg-bg-card border border-border-subtle rounded-2xl p-8 hover:border-gold/20 transition-all duration-500 overflow-hidden"
                        >
                            {/* Subtle corner accent */}
                            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-gold/[0.03] to-transparent rounded-bl-3xl" />

                            <div className="relative z-10 flex items-start gap-4">
                                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gold-muted border border-gold/15 flex items-center justify-center group-hover:border-gold/30 transition-colors duration-500">
                                    <item.icon className="w-5 h-5 text-gold" />
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <Check className="w-4 h-4 text-gold" />
                                        <h3 className="text-sm font-semibold text-text-primary">
                                            {item.title}
                                        </h3>
                                    </div>
                                    <p className="text-xs text-text-muted leading-relaxed">
                                        {item.desc}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
