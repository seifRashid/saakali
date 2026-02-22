"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    Package,
    Layers,
    ShoppingCart,
    Users,
    Settings,
    LogOut,
    Menu,
    X,
    Bell,
    Search
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { logoutAction } from "../actions/admin";

const navItems = [
    { name: "Dashboard", icon: LayoutDashboard, href: "/admin/dashboard" },
    { name: "Products", icon: Package, href: "/admin/products" },
    { name: "Categories", icon: Layers, href: "/admin/categories" },
    { name: "Orders", icon: ShoppingCart, href: "/admin/orders" },
    { name: "Users", icon: Users, href: "/admin/users" },
    { name: "Content", icon: Settings, href: "/admin/content" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const pathname = usePathname();

    // Don't show layout on login page
    if (pathname === "/admin/login") {
        return <>{children}</>;
    }

    return (
        <div className="min-h-screen bg-bg-primary text-text-primary flex">
            {/* Sidebar - Desktop */}
            <aside
                className={`hidden lg:flex flex-col bg-bg-secondary border-r border-border-subtle transition-all duration-300 ${isSidebarOpen ? "w-64" : "w-20"}`}
            >
                <div className="p-6 flex items-center gap-3">
                    <div className="w-8 h-8 bg-gold rounded-lg flex-shrink-0" />
                    {isSidebarOpen && (
                        <span className="font-bold text-lg tracking-tight">Saakali <span className="text-gold">Admin</span></span>
                    )}
                </div>

                <nav className="flex-1 px-3 py-4 space-y-1">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all group ${isActive
                                    ? "bg-gold text-bg-primary font-bold shadow-lg shadow-gold/20"
                                    : "text-text-muted hover:bg-bg-card hover:text-text-primary"
                                    }`}
                            >
                                <item.icon className={`w-5 h-5 flex-shrink-0 ${isActive ? "" : "group-hover:text-gold"}`} />
                                {isSidebarOpen && <span>{item.name}</span>}
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-border-subtle">
                    <button
                        onClick={() => logoutAction()}
                        className="flex items-center gap-3 px-3 py-3 w-full rounded-xl text-text-muted hover:bg-red-500/10 hover:text-red-500 transition-all group"
                    >
                        <LogOut className="w-5 h-5 flex-shrink-0" />
                        {isSidebarOpen && <span>Logout</span>}
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                {/* Header */}
                <header className="h-20 bg-bg-secondary/50 backdrop-blur-md border-bottom border-border-subtle flex items-center justify-between px-4 sm:px-8 sticky top-0 z-30">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setIsMobileMenuOpen(true)}
                            className="lg:hidden p-2 hover:bg-bg-card rounded-lg"
                        >
                            <Menu className="w-6 h-6" />
                        </button>
                        <div className="hidden sm:flex items-center gap-2 bg-bg-primary border border-border-subtle px-4 py-2 rounded-xl text-sm max-w-xs focus-within:border-gold/50 transition-all">
                            <Search className="w-4 h-4 text-text-muted" />
                            <input
                                type="text"
                                placeholder="Search..."
                                className="bg-transparent border-none outline-none w-full"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <button className="p-2.5 bg-bg-card hover:bg-bg-elevated rounded-xl border border-border-subtle relative transition-all">
                            <Bell className="w-5 h-5" />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-gold rounded-full border-2 border-bg-card" />
                        </button>
                        <div className="h-8 w-px bg-border-subtle mx-2" />
                        <div className="flex items-center gap-3 cursor-pointer group">
                            <div className="text-right hidden sm:block">
                                <p className="text-sm font-bold leading-none mb-1">Admin User</p>
                                <p className="text-[10px] text-text-muted uppercase tracking-widest">Super Admin</p>
                            </div>
                            <div className="w-10 h-10 bg-bg-elevated border border-border-subtle rounded-xl flex items-center justify-center text-gold font-bold group-hover:border-gold transition-all">
                                AU
                            </div>
                        </div>
                    </div>
                </header>

                {/* Dynamic Content */}
                <main className="flex-1 overflow-y-auto p-4 sm:p-8">
                    {children}
                </main>
            </div>

            {/* Mobile Sidebar Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] lg:hidden"
                        />
                        <motion.div
                            initial={{ x: "-100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "-100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="fixed left-0 top-0 h-full w-full max-w-xs bg-bg-secondary z-[110] shadow-2xl lg:hidden flex flex-col"
                        >
                            <div className="p-8 flex items-center justify-between">
                                <span className="font-bold text-xl tracking-tight">Saakali <span className="text-gold">Admin</span></span>
                                <button onClick={() => setIsMobileMenuOpen(false)}>
                                    <X className="w-6 h-6 border border-border-subtle rounded-lg" />
                                </button>
                            </div>

                            <nav className="flex-1 px-4 space-y-2">
                                {navItems.map((item) => {
                                    const isActive = pathname === item.href;
                                    return (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className={`flex items-center gap-4 px-4 py-4 rounded-2xl transition-all ${isActive
                                                ? "bg-gold text-bg-primary font-bold"
                                                : "text-text-muted hover:bg-bg-card hover:text-text-primary"
                                                }`}
                                        >
                                            <item.icon className="w-6 h-6" />
                                            <span className="text-lg">{item.name}</span>
                                        </Link>
                                    );
                                })}
                            </nav>

                            <div className="p-8 border-t border-border-subtle">
                                <button
                                    onClick={() => logoutAction()}
                                    className="flex items-center gap-4 px-4 py-4 w-full rounded-2xl text-text-muted hover:bg-red-500/10 hover:text-red-500 transition-all font-medium"
                                >
                                    <LogOut className="w-6 h-6" />
                                    <span className="text-lg">Logout</span>
                                </button>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}
