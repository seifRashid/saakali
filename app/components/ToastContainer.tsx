"use client";

import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, Info, X } from "lucide-react";
import { useCart } from "../context/CartContext";

export default function ToastContainer() {
    const { toasts, removeToast } = useCart();

    return (
        <div className="fixed bottom-8 right-8 z-[120] flex flex-col gap-3 pointer-events-none">
            <AnimatePresence>
                {toasts.map((toast) => (
                    <motion.div
                        key={toast.id}
                        initial={{ opacity: 0, x: 50, scale: 0.9 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                        className="pointer-events-auto"
                    >
                        <div className="glass border-gold/30 bg-bg-card/90 px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-4 min-w-[300px] border">
                            {toast.type === "success" ? (
                                <CheckCircle className="w-5 h-5 text-green-400" />
                            ) : (
                                <Info className="w-5 h-5 text-blue-400" />
                            )}
                            <div className="flex-1">
                                <p className="text-sm font-semibold text-text-primary">{toast.message}</p>
                            </div>
                            <button
                                onClick={() => removeToast(toast.id)}
                                className="text-text-muted hover:text-text-primary transition-colors"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
}
