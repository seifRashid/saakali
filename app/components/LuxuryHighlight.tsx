"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";

export default function LuxuryHighlight() {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-80px" });

    return (
        <section id="luxury" className="relative py-32 sm:py-40 lg:py-64 overflow-hidden">
            {/* Background layers */}
            <div className="absolute inset-0 bg-bg-primary" />
            <div
                className="absolute inset-0"
                style={{
                    background:
                        "radial-gradient(ellipse at 50% 30%, rgba(201,168,76,0.08) 0%, transparent 60%)",
                }}
            />
            {/* Animated border lines */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

            {/* Decorative large text watermark */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[12rem] sm:text-[18rem] font-bold font-[family-name:var(--font-heading)] text-gold/[0.02] tracking-widest select-none pointer-events-none whitespace-nowrap">
                LUXURY
            </div>

            {/* Floating diamond shapes */}
            <motion.div
                animate={{ y: [-15, 15, -15], rotate: [45, 50, 45] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1/4 left-[10%] w-16 h-16 border border-gold/10 hidden lg:block"
                style={{ transform: "rotate(45deg)" }}
            />
            <motion.div
                animate={{ y: [10, -10, 10], rotate: [45, 40, 45] }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-1/4 right-[15%] w-10 h-10 border border-gold/10 hidden lg:block"
                style={{ transform: "rotate(45deg)" }}
            />

            <div ref={ref} className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
                {/* Eyebrow */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="mb-6"
                >
                    <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold/20 bg-gold-muted text-gold text-xs font-medium tracking-widest uppercase">
                        ✨ Luxury Collection
                    </span>
                </motion.div>

                {/* Headline */}
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.15 }}
                    className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-[family-name:var(--font-heading)] leading-tight mb-8"
                >
                    <span className="text-text-primary">Luxury That </span>
                    <span className="gold-gradient-text">Speaks</span>
                    <br />
                    <span className="text-text-primary">Before You Do</span>
                </motion.h2>

                {/* Copy */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="max-w-xl mx-auto mb-6"
                >
                    <p className="text-base sm:text-lg text-text-secondary leading-relaxed mb-6">
                        A Saakali luxury watch doesn&apos;t whisper status —
                        <br className="hidden sm:block" />
                        <span className="text-gold font-medium">it expresses identity.</span>
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-sm text-text-muted">
                        <span className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                            Hand-selected materials
                        </span>
                        <span className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                            Polished perfection
                        </span>
                        <span className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                            Uncompromising detail
                        </span>
                    </div>
                </motion.div>

                {/* Own the moment tagline */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.5, duration: 0.7 }}
                    className="text-xl sm:text-2xl font-bold font-[family-name:var(--font-heading)] gold-gradient-text mb-10"
                >
                    Own the moment.
                </motion.p>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.6, duration: 0.6 }}
                >
                    <a href="#" className="btn-primary text-base px-8 py-4">
                        Discover Luxury Collection
                        <ArrowRight className="w-5 h-5" />
                    </a>
                </motion.div>
            </div>
        </section>
    );
}
