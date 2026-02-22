"use client";

import { motion } from "framer-motion";
import { Filter, X, ChevronDown, Check } from "lucide-react";
import { useState } from "react";

interface FilterSidebarProps {
    activeFilters: {
        categories: string[];
        types: string[];
        priceRange: [number, number];
        gender: string[];
    };
    onFilterChange: (filters: any) => void;
    onReset: () => void;
}

const categories = ["Luxury", "Sport", "Classic", "Kids"];
const types = ["Analogue", "Digital", "Quartz", "Automatic"];
const genders = ["Men", "Women", "Kids", "Unisex"];

export default function FilterSidebar({ activeFilters, onFilterChange, onReset }: FilterSidebarProps) {
    const [priceRange, setPriceRange] = useState(activeFilters.priceRange);

    const toggleFilter = (key: string, value: string) => {
        const current = (activeFilters as any)[key];
        const updated = current.includes(value)
            ? current.filter((v: string) => v !== value)
            : [...current, value];
        onFilterChange({ ...activeFilters, [key]: updated });
    };

    const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value);
        setPriceRange([0, value]);
        onFilterChange({ ...activeFilters, priceRange: [0, value] });
    };

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Filter className="w-4 h-4 text-gold" />
                    <h2 className="text-lg font-bold font-[family-name:var(--font-heading)] uppercase tracking-wider">Filters</h2>
                </div>
                <button
                    onClick={onReset}
                    className="text-xs text-text-muted hover:text-gold transition-colors font-medium border-b border-transparent hover:border-gold"
                >
                    Reset All
                </button>
            </div>

            {/* Category */}
            <div className="space-y-4">
                <h3 className="text-xs font-bold text-text-muted uppercase tracking-[0.2em]">Category</h3>
                <div className="space-y-2">
                    {categories.map((cat) => (
                        <FilterItem
                            key={cat}
                            label={cat}
                            isActive={activeFilters.categories.includes(cat)}
                            onClick={() => toggleFilter("categories", cat)}
                        />
                    ))}
                </div>
            </div>

            {/* Type */}
            <div className="space-y-4">
                <h3 className="text-xs font-bold text-text-muted uppercase tracking-[0.2em]">Watch Type</h3>
                <div className="space-y-2">
                    {types.map((type) => (
                        <FilterItem
                            key={type}
                            label={type}
                            isActive={activeFilters.types.includes(type)}
                            onClick={() => toggleFilter("types", type)}
                        />
                    ))}
                </div>
            </div>

            {/* Gender */}
            <div className="space-y-4">
                <h3 className="text-xs font-bold text-text-muted uppercase tracking-[0.2em]">Collection</h3>
                <div className="space-y-2">
                    {genders.map((gender) => (
                        <FilterItem
                            key={gender}
                            label={gender}
                            isActive={activeFilters.gender.includes(gender)}
                            onClick={() => toggleFilter("gender", gender)}
                        />
                    ))}
                </div>
            </div>

            {/* Price Range */}
            <div className="space-y-4">
                <div className="flex justify-between items-center">
                    <h3 className="text-xs font-bold text-text-muted uppercase tracking-[0.2em]">Price Range</h3>
                    <span className="text-xs font-bold text-gold">Up to ${priceRange[1]}</span>
                </div>
                <div className="relative pt-1">
                    <input
                        type="range"
                        min="0"
                        max="1000"
                        step="5"
                        value={priceRange[1]}
                        onChange={handlePriceChange}
                        className="w-full h-1.5 bg-bg-elevated rounded-lg appearance-none cursor-pointer accent-gold"
                    />
                    <div className="flex justify-between mt-2 text-[10px] text-text-muted">
                        <span>$0</span>
                        <span>$500</span>
                        <span>$1000+</span>
                    </div>
                </div>
            </div>

            {/* Availability */}
            <div className="pt-4 border-t border-border-subtle">
                <label className="flex items-center gap-3 cursor-pointer group">
                    <div className="relative w-10 h-5 bg-bg-elevated rounded-full transition-colors group-hover:bg-bg-card border border-border-subtle">
                        <div className="absolute left-1 top-1 w-3 h-3 bg-text-muted rounded-full transition-transform" />
                    </div>
                    <span className="text-sm font-medium text-text-secondary group-hover:text-gold transition-colors">In Stock Only</span>
                </label>
            </div>
        </div>
    );
}

function FilterItem({ label, isActive, onClick }: { label: string; isActive: boolean; onClick: () => void }) {
    return (
        <button
            onClick={onClick}
            className="flex items-center gap-3 w-full group text-left transition-all"
        >
            <div className={`w-4 h-4 rounded border flex items-center justify-center transition-all ${isActive ? "bg-gold border-gold" : "bg-bg-elevated border-border-subtle group-hover:border-gold/50"
                }`}>
                {isActive && <Check className="w-3 h-3 text-bg-primary stroke-[4px]" />}
            </div>
            <span className={`text-sm font-medium transition-colors ${isActive ? "text-text-primary" : "text-text-secondary hover:text-gold"
                }`}>
                {label}
            </span>
        </button>
    );
}
