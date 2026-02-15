"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Mail, ArrowRight, Check } from "lucide-react";

export default function Newsletter() {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-80px" });
    const [email, setEmail] = useState("");
    const [subscribed, setSubscribed] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (email) {
            setSubscribed(true);
            setEmail("");
        }
    };

    return (
        <section className="section-padding relative overflow-hidden">
            {/* Background glow */}
            <div
                className="absolute inset-0"
                style={{
                    background:
                        "radial-gradient(ellipse at 50% 50%, rgba(201,168,76,0.06) 0%, transparent 60%)",
                }}
            />

            <div ref={ref} className="relative z-10 mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7 }}
                >
                    {/* Icon */}
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gold-muted border border-gold/20 mb-6">
                        <Mail className="w-6 h-6 text-gold" />
                    </div>

                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-[family-name:var(--font-heading)] text-text-primary mb-6">
                        Stay Ahead of <span className="gold-gradient-text">Time</span>
                    </h2>
                    <p className="text-text-secondary text-sm sm:text-base mb-12 max-w-md mx-auto">
                        Get exclusive offers, early access to new collections, and
                        member-only discounts.
                    </p>

                    {/* Form */}
                    {subscribed ? (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="inline-flex items-center gap-2 px-6 py-4 bg-gold-muted border border-gold/30 rounded-full text-gold font-medium"
                        >
                            <Check className="w-5 h-5" />
                            You&apos;re in! Check your inbox for 10% off.
                        </motion.div>
                    ) : (
                        <form
                            onSubmit={handleSubmit}
                            className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto"
                        >
                            <div className="relative flex-1">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email"
                                    required
                                    className="w-full pl-12 pr-4 py-4 bg-bg-card border border-border-subtle rounded-full text-text-primary placeholder:text-text-muted text-sm focus:outline-none focus:border-gold/40 focus:ring-1 focus:ring-gold/20 transition-all duration-300"
                                />
                            </div>
                            <button
                                type="submit"
                                className="btn-primary whitespace-nowrap justify-center"
                            >
                                Subscribe & Save 10%
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        </form>
                    )}

                    <p className="text-xs text-text-muted mt-4">
                        No spam. Unsubscribe anytime.
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
