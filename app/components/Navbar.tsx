"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Watch, ShoppingBag } from "lucide-react";

const navLinks = [
    { label: "Collections", href: "#collections" },
    { label: "Categories", href: "#categories" },
    { label: "Best Sellers", href: "#bestsellers" },
    { label: "Luxury", href: "#luxury" },
    { label: "About", href: "#about" },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
                    ? "glass shadow-lg shadow-black/20"
                    : "bg-transparent"
                    }`}
            >
                <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-20 items-center justify-between">
                        {/* Logo */}
                        <a href="#" className="flex items-center gap-2 group">
                            <Watch className="w-7 h-7 text-gold transition-transform duration-500 group-hover:rotate-12" />
                            <span className="text-2xl font-bold tracking-widest font-[family-name:var(--font-heading)]">
                                <span className="gold-gradient-text">SAAKALI</span>
                            </span>
                        </a>

                        {/* Desktop Nav */}
                        <div className="hidden md:flex items-center gap-8">
                            {navLinks.map((link) => (
                                <a
                                    key={link.label}
                                    href={link.href}
                                    className="text-sm font-medium text-text-secondary hover:text-gold transition-colors duration-300 relative group"
                                >
                                    {link.label}
                                    <span className="absolute -bottom-1 left-0 w-0 h-px bg-gold transition-all duration-300 group-hover:w-full" />
                                </a>
                            ))}
                        </div>

                        {/* CTA + Mobile Toggle */}
                        <div className="flex items-center gap-4">
                            <a
                                href="#bestsellers"
                                className="hidden sm:inline-flex btn-primary !py-2.5 !px-6 text-sm"
                            >
                                <ShoppingBag className="w-4 h-4" />
                                Shop Now
                            </a>
                            <button
                                onClick={() => setMobileOpen(!mobileOpen)}
                                className="md:hidden text-text-primary p-2 hover:text-gold transition-colors"
                                aria-label="Toggle menu"
                            >
                                {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                            </button>
                        </div>
                    </div>
                </div>
            </motion.nav>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-40 pt-24 glass"
                    >
                        <div className="flex flex-col items-center gap-6 py-8">
                            {navLinks.map((link, i) => (
                                <motion.a
                                    key={link.label}
                                    href={link.href}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    onClick={() => setMobileOpen(false)}
                                    className="text-xl font-medium text-text-primary hover:text-gold transition-colors"
                                >
                                    {link.label}
                                </motion.a>
                            ))}
                            <a
                                href="#bestsellers"
                                onClick={() => setMobileOpen(false)}
                                className="btn-primary mt-4"
                            >
                                <ShoppingBag className="w-5 h-5" />
                                Shop Now
                            </a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
