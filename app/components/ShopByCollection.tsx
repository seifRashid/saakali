"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";

const collections = [
    {
        id: "men",
        image: "https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?q=80&w=1000&auto=format&fit=crop",
        title: "For Men",
        tagline: "Bold. Refined. Powerful.",
        description: "Explore designs that command presence.",
        gradient: "from-black/80 via-black/20 to-transparent",
        accent: "#c9a84c",
        size: "lg:col-span-2 lg:row-span-2",
    },
    {
        id: "women",
        image: "https://images.unsplash.com/photo-1590736969955-71cc94801759?q=80&w=1000&auto=format&fit=crop",
        title: "For Women",
        tagline: "Elegant. Minimal. Timeless.",
        description: "Crafted for effortless sophistication.",
        gradient: "from-black/80 via-black/20 to-transparent",
        accent: "#e0c76f",
        size: "lg:col-span-1",
    },
    {
        id: "kids",
        image: "https://images.unsplash.com/photo-1549488889-13e00511871a?q=80&w=1000&auto=format&fit=crop",
        title: "For Kids",
        tagline: "Fun. Durable. Reliable.",
        description: "Built for every adventure.",
        gradient: "from-black/80 via-black/20 to-transparent",
        accent: "#87CEEB",
        size: "lg:col-span-1",
    },
    {
        id: "sports",
        image: "https://images.unsplash.com/photo-1517466787929-bc90951d0974?q=80&w=1000&auto=format&fit=crop",
        title: "Sports",
        tagline: "Engineered for performance.",
        description: "Precision meets endurance.",
        gradient: "from-black/80 via-black/20 to-transparent",
        accent: "#4ade80",
        size: "lg:col-span-2",
    },
];

export default function ShopByCollection() {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-80px" });

    return (
        <section id="collections" className="section-padding relative">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7 }}
                    className="text-center mb-14"
                >
                    <span className="text-gold text-xs font-semibold tracking-[0.25em] uppercase mb-3 block">
                        Collections
                    </span>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-[family-name:var(--font-heading)] text-text-primary">
                        Find Your <span className="gold-gradient-text">Timepiece</span>
                    </h2>
                </motion.div>

                {/* Bento Grid */}
                <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-[300px] lg:auto-rows-[260px]">
                    {collections.map((col, i) => (
                        <motion.a
                            key={col.id}
                            href={`#${col.id}`}
                            initial={{ opacity: 0, y: 40, scale: 0.95 }}
                            animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
                            transition={{ delay: i * 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                            className={`group relative rounded-2xl overflow-hidden border border-border-subtle bg-bg-card hover:border-gold/30 transition-all duration-500 cursor-pointer ${col.size}`}
                        >
                            {/* Background Image */}
                            <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-105">
                                <img
                                    src={col.image}
                                    alt={col.title}
                                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                                />
                            </div>

                            {/* Gradient Overlay */}
                            <div className={`absolute inset-0 bg-gradient-to-t ${col.gradient}`} />

                            {/* Content */}
                            <div className="relative z-10 h-full flex flex-col justify-end p-6 sm:p-8">
                                <h3 className="text-xl sm:text-2xl font-bold font-[family-name:var(--font-heading)] text-text-primary mb-1 drop-shadow-md">
                                    {col.title}
                                </h3>
                                <p className="text-sm font-semibold mb-2 drop-shadow-md" style={{ color: col.accent }}>
                                    {col.tagline}
                                </p>
                                <div className="overflow-hidden h-0 group-hover:h-auto transition-all duration-300">
                                    <p className="text-sm text-gray-200 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                                        {col.description}
                                    </p>
                                </div>
                                <span className="inline-flex items-center gap-2 text-sm font-medium text-white group-hover:gap-3 transition-all duration-300">
                                    View Collection
                                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                                </span>
                            </div>
                        </motion.a>
                    ))}
                </div>
            </div>
        </section>
    );
}
