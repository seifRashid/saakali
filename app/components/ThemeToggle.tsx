"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    // Prevent hydration mismatch
    useEffect(() => setMounted(true), []);

    if (!mounted) {
        return (
            <div className="w-9 h-9 rounded-full bg-bg-card border border-border-subtle" />
        );
    }

    const isDark = theme === "dark";

    return (
        <motion.button
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className="relative w-9 h-9 rounded-full bg-bg-card border border-border-subtle flex items-center justify-center hover:border-gold/50 hover:bg-bg-elevated transition-all duration-300 overflow-hidden"
            aria-label="Toggle theme"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
        >
            <AnimatePresence mode="wait" initial={false}>
                {isDark ? (
                    <motion.span
                        key="moon"
                        initial={{ y: 12, opacity: 0, rotate: -30 }}
                        animate={{ y: 0, opacity: 1, rotate: 0 }}
                        exit={{ y: -12, opacity: 0, rotate: 30 }}
                        transition={{ duration: 0.2 }}
                        className="absolute"
                    >
                        <Moon className="w-4 h-4 text-gold" />
                    </motion.span>
                ) : (
                    <motion.span
                        key="sun"
                        initial={{ y: 12, opacity: 0, rotate: 30 }}
                        animate={{ y: 0, opacity: 1, rotate: 0 }}
                        exit={{ y: -12, opacity: 0, rotate: -30 }}
                        transition={{ duration: 0.2 }}
                        className="absolute"
                    >
                        <Sun className="w-4 h-4 text-gold" />
                    </motion.span>
                )}
            </AnimatePresence>
        </motion.button>
    );
}
