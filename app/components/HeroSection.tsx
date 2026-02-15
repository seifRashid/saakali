"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ShoppingBag, Gem, Shield, Truck, Award } from "lucide-react";

export default function HeroSection() {
    const [time, setTime] = useState<Date | null>(null);

    useEffect(() => {
        setTime(new Date());
        const interval = setInterval(() => {
            setTime(new Date());
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    // Default static time (10:10:30) for server/initial render
    const displayTime = time || new Date("2024-01-01T10:10:30");

    const seconds = displayTime.getSeconds();
    const minutes = displayTime.getMinutes();
    const hours = displayTime.getHours();

    const secondAngle = seconds * 6;
    const minuteAngle = minutes * 6 + seconds * 0.1;
    const hourAngle = (hours % 12) * 30 + minutes * 0.5;

    const getHandCoords = (angle: number, length: number) => {
        const rad = (angle - 90) * (Math.PI / 180);
        return {
            x2: 200 + length * Math.cos(rad),
            y2: 200 + length * Math.sin(rad),
        };
    };

    const hourCoords = getHandCoords(hourAngle, 60);
    const minuteCoords = getHandCoords(minuteAngle, 85); // Increased length slightly for elegance
    const secondCoords = getHandCoords(secondAngle, 90); // Long sweep

    return (
        <section
            id="hero"
            className="relative h-[100dvh] max-h-[100dvh] flex items-center justify-center overflow-hidden pt-20"
        >
            {/* Background layers */}
            <div className="absolute inset-0 bg-bg-primary" />
            <div
                className="absolute inset-0 opacity-30"
                style={{
                    backgroundImage:
                        "radial-gradient(circle at 50% 50%, rgba(201,168,76,0.08) 0%, transparent 60%)",
                }}
            />
            <div
                className="absolute inset-0 opacity-20"
                style={{
                    backgroundImage:
                        "radial-gradient(ellipse at 80% 20%, rgba(201,168,76,0.15) 0%, transparent 50%), radial-gradient(ellipse at 20% 80%, rgba(201,168,76,0.1) 0%, transparent 50%)",
                }}
            />
            {/* Animated grid pattern */}
            <div
                className="absolute inset-0 opacity-[0.08]"
                style={{
                    backgroundImage:
                        "linear-gradient(var(--gold) 1px, transparent 1px), linear-gradient(90deg, var(--gold) 1px, transparent 1px)",
                    backgroundSize: "80px 80px",
                    maskImage: "radial-gradient(ellipse at center, black 30%, transparent 70%)",
                    WebkitMaskImage: "radial-gradient(ellipse at center, black 30%, transparent 70%)",
                }}
            />

            {/* Floating decorative circles */}
            <motion.div
                animate={{ y: [-20, 20, -20], rotate: [0, 5, 0] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-[15%] right-[5%] w-56 h-56 rounded-full border border-gold/10 hidden lg:block"
            />
            <motion.div
                animate={{ y: [15, -15, 15], rotate: [0, -3, 0] }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-[20%] left-[5%] w-40 h-40 rounded-full border border-gold/5 hidden lg:block"
            />

            {/* Content Container - Reduced to max-w-6xl for better balance */}
            <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 w-full flex flex-col justify-center h-full">

                {/* Watch SVG illustration - Now relative to container */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8, x: 50 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    transition={{ duration: 1.2, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute right-0 top-1/2 -translate-y-1/2 w-[280px] h-[280px] md:w-[380px] md:h-[380px] lg:w-[480px] lg:h-[480px] hidden md:block pointer-events-none"
                    style={{ right: '0%' }}
                >
                    <motion.div
                        animate={{ y: [-10, 10, -10] }}
                        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    >
                        <svg viewBox="0 0 400 400" fill="none" className="w-full h-full drop-shadow-2xl">
                            {/* Watch band top */}
                            <rect x="155" y="30" width="90" height="100" rx="8" fill="url(#bandGrad)" opacity="0.9" />
                            {/* Watch band bottom */}
                            <rect x="155" y="270" width="90" height="100" rx="8" fill="url(#bandGrad)" opacity="0.9" />
                            {/* Watch body */}
                            <circle cx="200" cy="200" r="115" fill="#1a1a1a" stroke="url(#goldGrad)" strokeWidth="4" />
                            <circle cx="200" cy="200" r="105" fill="#111" stroke="rgba(201,168,76,0.2)" strokeWidth="1" />
                            {/* Dial markers */}
                            {[...Array(12)].map((_, i) => {
                                const angle = (i * 30 - 90) * (Math.PI / 180);
                                const x1 = 200 + 85 * Math.cos(angle);
                                const y1 = 200 + 85 * Math.sin(angle);
                                const x2 = 200 + (i % 3 === 0 ? 70 : 78) * Math.cos(angle);
                                const y2 = 200 + (i % 3 === 0 ? 70 : 78) * Math.sin(angle);
                                return (
                                    <line
                                        key={i}
                                        x1={x1}
                                        y1={y1}
                                        x2={x2}
                                        y2={y2}
                                        stroke="#c9a84c"
                                        strokeWidth={i % 3 === 0 ? 3 : 1.5}
                                        strokeLinecap="round"
                                    />
                                );
                            })}

                            {/* Hour hand */}
                            <motion.line
                                x1="200" y1="200"
                                animate={{ x2: hourCoords.x2, y2: hourCoords.y2 }}
                                stroke="#c9a84c" strokeWidth="4" strokeLinecap="round"
                            />
                            {/* Minute hand */}
                            <motion.line
                                x1="200" y1="200"
                                animate={{ x2: minuteCoords.x2, y2: minuteCoords.y2 }}
                                stroke="#e0c76f" strokeWidth="2.5" strokeLinecap="round"
                            />
                            {/* Second hand */}
                            <motion.line
                                x1="200" y1="200"
                                animate={{ x2: secondCoords.x2, y2: secondCoords.y2 }}
                                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                                stroke="#c9a84c" strokeWidth="1" strokeLinecap="round" opacity="0.8"
                            />

                            {/* Center dot */}
                            <circle cx="200" cy="200" r="6" fill="#c9a84c" />
                            <circle cx="200" cy="200" r="3" fill="#111" />
                            {/* Brand text */}
                            <text x="200" y="165" textAnchor="middle" fill="#c9a84c" fontSize="10" fontFamily="serif" letterSpacing="3">
                                SAAKALI
                            </text>
                            {/* Crown */}
                            <rect x="313" y="192" width="18" height="16" rx="3" fill="url(#goldGrad)" />
                            {/* Glow */}
                            <circle cx="200" cy="200" r="120" fill="none" stroke="rgba(201,168,76,0.08)" strokeWidth="40" />
                            <defs>
                                <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#e0c76f" />
                                    <stop offset="50%" stopColor="#c9a84c" />
                                    <stop offset="100%" stopColor="#a68a3e" />
                                </linearGradient>
                                <linearGradient id="bandGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                                    <stop offset="0%" stopColor="#2a2a2a" />
                                    <stop offset="50%" stopColor="#1a1a1a" />
                                    <stop offset="100%" stopColor="#222" />
                                </linearGradient>
                            </defs>
                        </svg>
                    </motion.div>
                </motion.div>

                <div className="max-w-xl md:max-w-2xl relative z-20">
                    {/* Eyebrow */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="mb-4"
                    >
                        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold/20 bg-gold-muted text-gold text-xs font-medium tracking-widest uppercase shadow-[0_0_20px_-10px_var(--gold)]">
                            <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
                            Premium Timepieces
                        </span>
                    </motion.div>

                    {/* Headline */}
                    <motion.h1
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[0.95] font-[family-name:var(--font-heading)] mb-4"
                    >
                        <span className="text-text-primary">Time,</span>
                        <br />
                        <span className="gold-gradient-text drop-shadow-lg">Perfected.</span>
                    </motion.h1>

                    {/* Subheadline */}
                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-base sm:text-lg text-text-secondary leading-relaxed mb-6 max-w-lg"
                    >
                        Discover watches crafted for every moment — from bold sports precision to timeless luxury elegance.
                    </motion.p>

                    {/* Supporting copy - Reduced visibility/size for improved fold fit */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.55 }}
                        className="mb-8 hidden sm:block"
                    >
                        <p className="text-sm text-text-muted leading-relaxed max-w-md">
                            At Saakali, we don&apos;t just sell watches. We curate statements.
                            Whether you&apos;re leading the boardroom or training at sunrise — your time deserves distinction.
                        </p>
                    </motion.div>

                    {/* CTAs */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.7 }}
                        className="flex flex-col sm:flex-row gap-4 mb-10"
                    >
                        <a href="#bestsellers" className="btn-primary text-center justify-center px-8 py-3 text-sm shadow-lg shadow-gold/10">
                            <ShoppingBag className="w-4 h-4" />
                            Shop Collection
                        </a>
                        <a href="#luxury" className="btn-secondary text-center justify-center px-8 py-3 text-sm">
                            <Gem className="w-4 h-4" />
                            Explore Luxury
                        </a>
                    </motion.div>

                    {/* Trust strip */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 1 }}
                        className="flex flex-wrap gap-6 sm:gap-10"
                    >
                        {[
                            { icon: Truck, label: "Free Shipping" },
                            { icon: Shield, label: "Secure Payments" },
                            { icon: Award, label: "2-Year Warranty" },
                        ].map((item) => (
                            <div key={item.label} className="flex items-center gap-2 text-text-muted">
                                <item.icon className="w-4 h-4 text-gold/70" />
                                <span className="text-xs sm:text-sm font-medium tracking-wide">{item.label}</span>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>

            {/* Bottom gradient */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-bg-primary via-bg-primary/80 to-transparent pointer-events-none" />
        </section>
    );
}
