"use client";

import { useState } from "react";
import {
    Plus,
    Search,
    Filter,
    MoreVertical,
    Edit2,
    Trash2,
    Eye,
    X,
    Loader2,
    Check,
    AlertCircle,
    Package
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { createProductAction, updateProductAction, deleteProductAction } from "../../actions/products";

export default function ProductListClient({ products, categories }: { products: any[], categories: any[] }) {
    const [searchQuery, setSearchQuery] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState<any | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const filteredProducts = products.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const formData = new FormData(e.currentTarget);
        const data = {
            name: formData.get("name") as string,
            price: formData.get("price") as string,
            originalPrice: formData.get("originalPrice") as string,
            categoryId: formData.get("categoryId") as string,
            type: formData.get("type") as any,
            material: formData.get("material") as any,
            strap: formData.get("strap") as string,
            gender: formData.get("gender") as any,
            badge: formData.get("badge") as string,
            badgeColor: formData.get("badgeColor") as string,
            description: formData.get("description") as string,
            inStock: formData.get("inStock") === "on",
            rating: "0",
            reviewsCount: 0,
        };

        const result = editingProduct
            ? await updateProductAction(editingProduct.id, data)
            : await createProductAction(data);

        if (result.error) {
            setError(result.error);
            setLoading(false);
        } else {
            setIsModalOpen(false);
            setEditingProduct(null);
            setLoading(false);
        }
    }

    async function handleDelete(id: string) {
        if (confirm("Are you sure you want to delete this product?")) {
            await deleteProductAction(id);
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold font-[family-name:var(--font-heading)]">Products</h1>
                    <p className="text-text-muted text-sm">Manage your watch collection and inventory.</p>
                </div>
                <button
                    onClick={() => {
                        setEditingProduct(null);
                        setIsModalOpen(true);
                    }}
                    className="btn-primary !py-3 flex items-center gap-2"
                >
                    <Plus className="w-4 h-4" />
                    Add New Watch
                </button>
            </div>

            {/* Toolbar */}
            <div className="bg-bg-card border border-border-subtle p-4 rounded-2xl flex flex-col sm:flex-row gap-4 items-center">
                <div className="relative flex-1 w-full">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                    <input
                        type="text"
                        placeholder="Search products by name or category..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-bg-primary border border-border-subtle rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:border-gold/50 transition-all"
                    />
                </div>
                <div className="flex items-center gap-2 w-full sm:w-auto">
                    <button className="flex items-center gap-2 px-4 py-2.5 bg-bg-primary border border-border-subtle rounded-xl text-xs font-bold uppercase tracking-widest hover:border-gold transition-all">
                        <Filter className="w-4 h-4 text-gold" />
                        Filters
                    </button>
                    <p className="text-xs font-medium text-text-muted ml-2 whitespace-nowrap">
                        <span className="text-text-primary">{filteredProducts.length}</span> Products
                    </p>
                </div>
            </div>

            {/* Product Table */}
            <div className="bg-bg-card border border-border-subtle rounded-3xl overflow-hidden shadow-xl">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-bg-primary/50 text-[10px] text-text-muted uppercase tracking-[0.2em]">
                                <th className="px-8 py-4 font-bold">Product</th>
                                <th className="px-8 py-4 font-bold">Category</th>
                                <th className="px-8 py-4 font-bold">Price</th>
                                <th className="px-8 py-4 font-bold">Stock</th>
                                <th className="px-8 py-4 font-bold">Type</th>
                                <th className="px-8 py-4 font-bold text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border-subtle">
                            {filteredProducts.map((product) => (
                                <tr key={product.id} className="text-sm hover:bg-bg-elevated transition-colors group">
                                    <td className="px-8 py-5">
                                        <div className="flex items-center gap-3">
                                            <div className="w-12 h-12 rounded-xl bg-bg-primary border border-border-subtle flex items-center justify-center p-2 group-hover:border-gold/30 transition-all">
                                                <Package className="w-6 h-6 text-text-muted" />
                                            </div>
                                            <div>
                                                <p className="font-bold text-text-primary">{product.name}</p>
                                                <p className="text-[10px] text-text-muted font-medium uppercase tracking-widest">{product.material}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-5">
                                        <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-bg-primary border border-border-subtle">
                                            {product.category}
                                        </span>
                                    </td>
                                    <td className="px-8 py-5">
                                        <p className="font-bold">${product.price}</p>
                                        {product.originalPrice && (
                                            <p className="text-[10px] text-text-muted line-through">${product.originalPrice}</p>
                                        )}
                                    </td>
                                    <td className="px-8 py-5">
                                        <div className="flex items-center gap-2">
                                            <div className={`w-2 h-2 rounded-full ${product.inStock ? "bg-green-500" : "bg-red-500"}`} />
                                            <span className={`text-xs font-bold uppercase tracking-widest ${product.inStock ? "text-green-500" : "text-red-500"}`}>
                                                {product.inStock ? "In Stock" : "Out of Stock"}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-5">
                                        <p className="text-xs font-medium text-text-muted">{product.type}</p>
                                    </td>
                                    <td className="px-8 py-5 text-right">
                                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button
                                                onClick={() => {
                                                    setEditingProduct(product);
                                                    setIsModalOpen(true);
                                                }}
                                                className="p-2 hover:bg-gold/10 hover:text-gold rounded-lg transition-all"
                                            >
                                                <Edit2 className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(product.id)}
                                                className="p-2 hover:bg-red-500/10 hover:text-red-500 rounded-lg transition-all"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Create/Edit Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsModalOpen(false)}
                            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="relative w-full max-w-2xl bg-bg-secondary border border-border-subtle rounded-[2rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
                        >
                            <div className="p-8 border-b border-border-subtle flex justify-between items-center bg-bg-card/50">
                                <div>
                                    <h2 className="text-2xl font-bold font-[family-name:var(--font-heading)]">
                                        {editingProduct ? "Edit Watch" : "New Collection Piece"}
                                    </h2>
                                    <p className="text-text-muted text-xs uppercase tracking-widest mt-1">
                                        {editingProduct ? "Update master specifications" : "Define new premium timepiece"}
                                    </p>
                                </div>
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="p-2 hover:bg-bg-card rounded-xl border border-border-subtle transition-all"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            <div className="flex-1 overflow-y-auto p-8">
                                <form id="product-form" onSubmit={handleSubmit} className="space-y-8">
                                    {/* Basic Info */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold text-text-muted uppercase tracking-[0.2em] px-1">Watch Name</label>
                                            <input
                                                name="name"
                                                defaultValue={editingProduct?.name}
                                                required
                                                className="w-full bg-bg-primary border border-border-subtle rounded-2xl py-3 px-4 text-sm focus:border-gold/50 outline-none transition-all"
                                                placeholder="e.g. Sovereign Chrono"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold text-text-muted uppercase tracking-[0.2em] px-1">Category</label>
                                            <select
                                                name="categoryId"
                                                defaultValue={categories.find(c => c.name === editingProduct?.category)?.id}
                                                required
                                                className="w-full bg-bg-primary border border-border-subtle rounded-2xl py-3 px-4 text-sm focus:border-gold/50 outline-none transition-all cursor-pointer"
                                            >
                                                {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                                            </select>
                                        </div>
                                    </div>

                                    {/* Pricing & Stock */}
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold text-text-muted uppercase tracking-[0.2em] px-1">Price ($)</label>
                                            <input
                                                name="price"
                                                type="number"
                                                step="0.01"
                                                defaultValue={editingProduct?.price}
                                                required
                                                className="w-full bg-bg-primary border border-border-subtle rounded-2xl py-3 px-4 text-sm focus:border-gold/50 outline-none transition-all"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold text-text-muted uppercase tracking-[0.2em] px-1">Original Price</label>
                                            <input
                                                name="originalPrice"
                                                type="number"
                                                step="0.01"
                                                defaultValue={editingProduct?.originalPrice}
                                                className="w-full bg-bg-primary border border-border-subtle rounded-2xl py-3 px-4 text-sm focus:border-gold/50 outline-none transition-all"
                                            />
                                        </div>
                                        <div className="flex items-center justify-center pt-6">
                                            <label className="flex items-center gap-3 cursor-pointer group">
                                                <div className="relative">
                                                    <input
                                                        name="inStock"
                                                        type="checkbox"
                                                        defaultChecked={editingProduct ? editingProduct.inStock : true}
                                                        className="sr-only"
                                                    />
                                                    <div className="w-12 h-6 bg-bg-primary border border-border-subtle rounded-full transition-all peer-checked:bg-gold/20 peer-checked:border-gold/50" />
                                                    <div className="absolute left-1 top-1 w-4 h-4 bg-text-muted rounded-full transition-all peer-checked:left-7 peer-checked:bg-gold" />
                                                </div>
                                                <span className="text-xs font-bold uppercase tracking-widest text-text-muted group-hover:text-text-primary transition-colors">In Stock</span>
                                            </label>
                                        </div>
                                    </div>

                                    {/* Specs */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold text-text-muted uppercase tracking-[0.2em] px-1">Movement</label>
                                            <select name="type" defaultValue={editingProduct?.type || "Quartz"} className="w-full bg-bg-primary border border-border-subtle rounded-xl py-2.5 px-4 text-xs focus:border-gold/50 outline-none">
                                                <option value="Analogue">Analogue</option>
                                                <option value="Digital">Digital</option>
                                                <option value="Quartz">Quartz</option>
                                                <option value="Automatic">Automatic</option>
                                            </select>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold text-text-muted uppercase tracking-[0.2em] px-1">Material</label>
                                            <select name="material" defaultValue={editingProduct?.material || "Stainless Steel"} className="w-full bg-bg-primary border border-border-subtle rounded-xl py-2.5 px-4 text-xs focus:border-gold/50 outline-none">
                                                <option value="Leather">Leather</option>
                                                <option value="Stainless Steel">Stainless Steel</option>
                                                <option value="Silicone">Silicone</option>
                                                <option value="Titanium">Titanium</option>
                                            </select>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold text-text-muted uppercase tracking-[0.2em] px-1">Gender</label>
                                            <select name="gender" defaultValue={editingProduct?.gender || "Unisex"} className="w-full bg-bg-primary border border-border-subtle rounded-xl py-2.5 px-4 text-xs focus:border-gold/50 outline-none">
                                                <option value="Men">Men</option>
                                                <option value="Women">Women</option>
                                                <option value="Unisex">Unisex</option>
                                                <option value="Kids">Kids</option>
                                            </select>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold text-text-muted uppercase tracking-[0.2em] px-1">Strap Type</label>
                                            <input
                                                name="strap"
                                                defaultValue={editingProduct?.strap}
                                                required
                                                className="w-full bg-bg-primary border border-border-subtle rounded-xl py-2.5 px-4 text-xs focus:border-gold/50 outline-none"
                                                placeholder="e.g. Italian Leather"
                                            />
                                        </div>
                                    </div>

                                    {/* Badge */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold text-text-muted uppercase tracking-[0.2em] px-1">Badge Text</label>
                                            <input
                                                name="badge"
                                                defaultValue={editingProduct?.badge}
                                                className="w-full bg-bg-primary border border-border-subtle rounded-2xl py-3 px-4 text-sm focus:border-gold/50 outline-none transition-all"
                                                placeholder="e.g. New Arrival"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold text-text-muted uppercase tracking-[0.2em] px-1">Badge Color (Hex)</label>
                                            <div className="flex gap-3">
                                                <input
                                                    name="badgeColor"
                                                    type="color"
                                                    defaultValue={editingProduct?.badgeColor || "#c9a84c"}
                                                    className="h-12 w-12 bg-bg-primary border border-border-subtle rounded-xl p-1 cursor-pointer"
                                                />
                                                <input
                                                    type="text"
                                                    value={editingProduct?.badgeColor || "#c9a84c"}
                                                    readOnly
                                                    className="flex-1 bg-bg-primary border border-border-subtle rounded-xl py-3 px-4 text-sm font-mono text-text-muted"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Description */}
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-text-muted uppercase tracking-[0.2em] px-1">Brand Narrative / Description</label>
                                        <textarea
                                            name="description"
                                            defaultValue={editingProduct?.description}
                                            required
                                            rows={4}
                                            className="w-full bg-bg-primary border border-border-subtle rounded-2xl py-4 px-4 text-sm focus:border-gold/50 outline-none transition-all resize-none"
                                            placeholder="Craft a compelling story for this timepiece..."
                                        />
                                    </div>

                                    {error && (
                                        <div className="bg-red-500/10 border border-red-500/20 text-red-500 text-xs py-4 px-6 rounded-2xl flex items-center gap-3">
                                            <AlertCircle className="w-5 h-5 flex-shrink-0" />
                                            <p className="font-medium">{error}</p>
                                        </div>
                                    )}
                                </form>
                            </div>

                            <div className="p-8 border-t border-border-subtle bg-bg-card/50 flex justify-end gap-4">
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-6 py-3 border border-border-subtle rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-bg-elevated transition-colors"
                                >
                                    Discard
                                </button>
                                <button
                                    type="submit"
                                    form="product-form"
                                    disabled={loading}
                                    className="btn-primary !px-10 flex items-center gap-2 disabled:opacity-50"
                                >
                                    {loading ? (
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                    ) : editingProduct ? (
                                        "Update Masterpiece"
                                    ) : (
                                        "Finalize Collection"
                                    )}
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
