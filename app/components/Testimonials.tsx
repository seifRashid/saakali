"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Star, Quote } from "lucide-react";

const testimonials = [
    {
        text: "Exceeded my expectations. The quality feels premium and the design is stunning.",
        author: "Daniel M.",
        role: "Watch Collector",
        rating: 5,
    },
    {
        text: "Bought one for my husband and ended up getting one for myself too.",
        author: "Sarah K.",
        role: "Loyal Customer",
        rating: 5,
    },
    {
        text: "Fast delivery, beautiful packaging, flawless watch.",
        author: "Ibrahim T.",
        role: "First-Time Buyer",
        rating: 5,
    },
];

export default function Testimonials() {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-80px" });

    return (
        <section className="section-padding relative bg-bg-secondary">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

            <div ref={ref} className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7 }}
                    className="text-center mb-14"
                >
                    <span className="text-gold text-xs font-semibold tracking-[0.25em] uppercase mb-3 block">
                        Reviews
                    </span>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-[family-name:var(--font-heading)] text-text-primary">
                        Trusted by <span className="gold-gradient-text">Watch Enthusiasts</span>
                    </h2>
                </motion.div>

                {/* Testimonial cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
                    {testimonials.map((t, i) => (
                        <motion.div
                            key={t.author}
                            initial={{ opacity: 0, y: 30, scale: 0.95 }}
                            animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
                            transition={{ delay: i * 0.15, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                            className="group relative bg-bg-card border border-border-subtle rounded-2xl p-8 sm:p-10 hover:border-gold/20 transition-all duration-500 overflow-hidden"
                        >
                            {/* Glass/glow accent */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-gold/[0.04] to-transparent rounded-bl-full" />

                            <div className="relative z-10">
                                {/* Quote icon */}
                                <Quote className="w-8 h-8 text-gold/20 mb-4" />

                                {/* Stars */}
                                <div className="flex items-center gap-1 mb-4">
                                    {[...Array(t.rating)].map((_, j) => (
                                        <Star
                                            key={j}
                                            className="w-4 h-4"
                                            fill="#c9a84c"
                                            stroke="#c9a84c"
                                        />
                                    ))}
                                </div>

                                {/* Quote */}
                                <p className="text-text-secondary text-sm sm:text-base leading-relaxed mb-6 italic">
                                    &ldquo;{t.text}&rdquo;
                                </p>

                                {/* Author */}
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-gold-muted border border-gold/20 flex items-center justify-center text-sm font-bold text-gold">
                                        {t.author.charAt(0)}
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-text-primary">
                                            {t.author}
                                        </p>
                                        <p className="text-xs text-text-muted">{t.role}</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
