"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function BrandStory() {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section id="about" className="section-padding relative overflow-hidden">
            {/* Decorative elements */}
            <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage:
                        "radial-gradient(circle at 20% 50%, var(--gold) 1px, transparent 1px)",
                    backgroundSize: "60px 60px",
                }}
            />

            <div ref={ref} className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-16 lg:gap-32 items-center">
                    {/* Text */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <span className="text-gold text-xs font-semibold tracking-[0.25em] uppercase mb-6 block">
                            Our Story
                        </span>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-[family-name:var(--font-heading)] text-text-primary leading-tight mb-8">
                            More Than a Watch.{" "}
                            <span className="gold-gradient-text">A Signature.</span>
                        </h2>
                        <div className="w-24 h-px bg-gradient-to-r from-gold to-transparent mb-10" />

                        <div className="space-y-5 text-text-secondary leading-relaxed">
                            <p className="text-base sm:text-lg">
                                Saakali was founded on one belief:{" "}
                                <span className="text-gold font-medium">
                                    Time is the only luxury you truly own.
                                </span>
                            </p>
                            <p className="text-sm sm:text-base text-text-muted">
                                Our collections blend craftsmanship, innovation, and enduring
                                style — designed for men, women, and children who value
                                precision, elegance, and individuality.
                            </p>
                            <p className="text-sm sm:text-base text-text-muted">
                                From quartz precision to analogue heritage — every tick carries
                                intention.
                            </p>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-6 mt-10 pt-8 border-t border-border-subtle">
                            {[
                                { value: "10K+", label: "Happy Customers" },
                                { value: "500+", label: "Designs" },
                                { value: "50+", label: "Countries" },
                            ].map((stat, i) => (
                                <motion.div
                                    key={stat.label}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={inView ? { opacity: 1, y: 0 } : {}}
                                    transition={{ delay: 0.5 + i * 0.15, duration: 0.6 }}
                                >
                                    <div className="text-2xl sm:text-3xl font-bold gold-gradient-text font-[family-name:var(--font-heading)]">
                                        {stat.value}
                                    </div>
                                    <div className="text-xs text-text-muted mt-1">{stat.label}</div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Visual — SVG watch mechanism illustration */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="relative flex items-center justify-center"
                    >
                        <div className="relative w-full max-w-md mx-auto">
                            {/* Glow */}
                            <div className="absolute inset-0 bg-gold/5 rounded-3xl blur-3xl" />
                            <div className="relative bg-bg-card border border-border-subtle rounded-3xl p-8 sm:p-12 overflow-hidden">
                                {/* Animated gears SVG */}
                                <svg viewBox="0 0 300 300" fill="none" className="w-full h-auto">
                                    {/* Outer gear */}
                                    <motion.g
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                                        style={{ transformOrigin: "150px 150px" }}
                                    >
                                        <circle cx="150" cy="150" r="110" stroke="rgba(201,168,76,0.15)" strokeWidth="2" strokeDasharray="8 4" />
                                        {[...Array(24)].map((_, i) => {
                                            const angle = (i * 15) * (Math.PI / 180);
                                            const x = 150 + 110 * Math.cos(angle);
                                            const y = 150 + 110 * Math.sin(angle);
                                            return (
                                                <circle key={`outer-${i}`} cx={x} cy={y} r="2" fill="rgba(201,168,76,0.3)" />
                                            );
                                        })}
                                    </motion.g>
                                    {/* Middle gear */}
                                    <motion.g
                                        animate={{ rotate: -360 }}
                                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                        style={{ transformOrigin: "150px 150px" }}
                                    >
                                        <circle cx="150" cy="150" r="75" stroke="rgba(201,168,76,0.2)" strokeWidth="1.5" />
                                        {[...Array(16)].map((_, i) => {
                                            const angle = (i * 22.5) * (Math.PI / 180);
                                            const x1 = 150 + 68 * Math.cos(angle);
                                            const y1 = 150 + 68 * Math.sin(angle);
                                            const x2 = 150 + 82 * Math.cos(angle);
                                            const y2 = 150 + 82 * Math.sin(angle);
                                            return (
                                                <line key={`mid-${i}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(201,168,76,0.25)" strokeWidth="2" />
                                            );
                                        })}
                                    </motion.g>
                                    {/* Inner wheel */}
                                    <motion.g
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                                        style={{ transformOrigin: "150px 150px" }}
                                    >
                                        <circle cx="150" cy="150" r="40" stroke="rgba(201,168,76,0.3)" strokeWidth="2" />
                                        {[...Array(8)].map((_, i) => {
                                            const angle = (i * 45) * (Math.PI / 180);
                                            const x1 = 150 + 30 * Math.cos(angle);
                                            const y1 = 150 + 30 * Math.sin(angle);
                                            const x2 = 150 + 48 * Math.cos(angle);
                                            const y2 = 150 + 48 * Math.sin(angle);
                                            return (
                                                <line key={`inner-${i}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(201,168,76,0.35)" strokeWidth="2.5" strokeLinecap="round" />
                                            );
                                        })}
                                    </motion.g>
                                    {/* Center */}
                                    <circle cx="150" cy="150" r="12" fill="rgba(201,168,76,0.15)" stroke="rgba(201,168,76,0.4)" strokeWidth="2" />
                                    <circle cx="150" cy="150" r="4" fill="#c9a84c" />
                                    {/* Text */}
                                    <text x="150" y="245" textAnchor="middle" fill="rgba(201,168,76,0.5)" fontSize="9" fontFamily="serif" letterSpacing="4">
                                        PRECISION ENGINEERED
                                    </text>
                                </svg>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
