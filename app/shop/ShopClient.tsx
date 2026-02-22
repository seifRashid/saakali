"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, SlidersHorizontal, LayoutGrid, List, X } from "lucide-react";
import ProductCard from "../components/Shop/ProductCard";
import FilterSidebar from "../components/Shop/FilterSidebar";
import QuickView from "../components/Shop/QuickView";

interface Product {
    id: string;
    name: string;
    price: number;
    originalPrice?: number;
    category: string;
    type: string;
    material: string;
    gender: string;
    badge?: string;
    badgeColor?: string;
    rating: number;
    reviewsCount?: number;
    inStock: boolean;
    description: string;
}

interface ShopClientProps {
    initialProducts: any[];
}

export default function ShopClient({ initialProducts }: ShopClientProps) {
    const [searchQuery, setSearchQuery] = useState("");
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
    const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
    const [showMobileFilters, setShowMobileFilters] = useState(false);
    const [activeFilters, setActiveFilters] = useState({
        categories: [] as string[],
        types: [] as string[],
        priceRange: [0, 1000] as [number, number],
        gender: [] as string[],
    });

    const filteredProducts = useMemo(() => {
        return initialProducts.filter((product) => {
            const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                product.category.toLowerCase().includes(searchQuery.toLowerCase());

            const matchesCategory = activeFilters.categories.length === 0 ||
                activeFilters.categories.includes(product.category);

            const matchesType = activeFilters.types.length === 0 ||
                activeFilters.types.includes(product.type);

            const matchesGender = activeFilters.gender.length === 0 ||
                activeFilters.gender.includes(product.gender);

            const matchesPrice = product.price >= activeFilters.priceRange[0] &&
                product.price <= activeFilters.priceRange[1];

            return matchesSearch && matchesCategory && matchesType && matchesGender && matchesPrice;
        });
    }, [searchQuery, activeFilters, initialProducts]);

    const resetFilters = () => {
        setActiveFilters({
            categories: [],
            types: [],
            priceRange: [0, 1000],
            gender: [],
        });
        setSearchQuery("");
    };

    return (
        <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pb-24">
            <div className="flex flex-col lg:flex-row gap-12">
                {/* Sidebar - Desktop */}
                <aside className="hidden lg:block w-64 flex-shrink-0">
                    <div className="sticky top-32">
                        <FilterSidebar
                            activeFilters={activeFilters}
                            onFilterChange={setActiveFilters}
                            onReset={resetFilters}
                        />
                    </div>
                </aside>

                {/* Product Listing Area */}
                <div className="flex-1">
                    {/* Toolbar */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-between items-center mb-10 bg-bg-card/50 p-4 rounded-2xl border border-border-subtle backdrop-blur-sm">
                        {/* Search */}
                        <div className="relative w-full sm:max-w-xs">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                            <input
                                type="text"
                                placeholder="Search watches..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-bg-primary border border-border-subtle rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:border-gold/50 transition-colors"
                            />
                        </div>

                        <div className="flex items-center gap-4 w-full sm:w-auto justify-between">
                            {/* Mobile Filter Toggle */}
                            <button
                                onClick={() => setShowMobileFilters(true)}
                                className="lg:hidden flex items-center gap-2 px-4 py-2 bg-bg-primary border border-border-subtle rounded-xl text-xs font-bold uppercase tracking-wider hover:border-gold transition-colors"
                            >
                                <SlidersHorizontal className="w-4 h-4 text-gold" />
                                Filters
                            </button>

                            <div className="flex items-center gap-4">
                                <p className="text-xs font-medium text-text-muted">
                                    Showing <span className="text-text-primary">{filteredProducts.length}</span> results
                                </p>
                                <div className="h-4 w-px bg-border-subtle mx-2" />
                                <div className="flex bg-bg-primary rounded-lg p-1 border border-border-subtle">
                                    <button
                                        onClick={() => setViewMode("grid")}
                                        className={`p-1.5 rounded-md transition-all ${viewMode === "grid" ? "bg-gold text-bg-primary shadow-lg" : "text-text-muted hover:text-text-primary"}`}
                                    >
                                        <LayoutGrid className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={() => setViewMode("list")}
                                        className={`p-1.5 rounded-md transition-all ${viewMode === "list" ? "bg-gold text-bg-primary shadow-lg" : "text-text-muted hover:text-text-primary"}`}
                                    >
                                        <List className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Product Grid */}
                    {filteredProducts.length > 0 ? (
                        <div className={`grid gap-8 ${viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3" : "grid-cols-1"}`}>
                            {filteredProducts.map((product, i) => (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                    index={i}
                                    onQuickView={setSelectedProduct}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="py-24 text-center">
                            <div className="w-20 h-20 bg-bg-card rounded-full flex items-center justify-center mx-auto mb-6 border border-border-subtle">
                                <Search className="w-10 h-10 text-text-muted" />
                            </div>
                            <h3 className="text-2xl font-bold mb-2">No watches found</h3>
                            <p className="text-text-secondary mb-8">Try adjusting your filters or search query.</p>
                            <button
                                onClick={resetFilters}
                                className="btn-secondary"
                            >
                                Clear all filters
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Quick View Modal */}
            <QuickView
                product={selectedProduct}
                onClose={() => setSelectedProduct(null)}
            />

            {/* Mobile Filters Drawer */}
            <AnimatePresence>
                {showMobileFilters && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setShowMobileFilters(false)}
                            className="fixed inset-0 bg-black/80 z-[80] lg:hidden backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ x: "-100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "-100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="fixed left-0 top-0 h-full w-full max-w-sm bg-bg-secondary z-[90] shadow-2xl lg:hidden p-8 overflow-y-auto"
                        >
                            <div className="flex justify-between items-center mb-8 pb-4 border-b border-border-subtle">
                                <h2 className="text-xl font-bold font-[family-name:var(--font-heading)] uppercase tracking-widest">Filter By</h2>
                                <button onClick={() => setShowMobileFilters(false)}>
                                    <X className="w-6 h-6" />
                                </button>
                            </div>
                            <FilterSidebar
                                activeFilters={activeFilters}
                                onFilterChange={setActiveFilters}
                                onReset={resetFilters}
                            />
                            <button
                                onClick={() => setShowMobileFilters(false)}
                                className="btn-primary w-full justify-center mt-12"
                            >
                                Apply Filters
                            </button>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </main>
    );
}
