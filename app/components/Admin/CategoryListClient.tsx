"use client";

import { useState } from "react";
import {
    Plus,
    Search,
    Edit2,
    Trash2,
    X,
    Loader2,
    AlertCircle,
    Layers
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { createCategoryAction, updateCategoryAction, deleteCategoryAction } from "../../actions/categories";

export default function CategoryListClient({ categories }: { categories: any[] }) {
    const [searchQuery, setSearchQuery] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingCategory, setEditingCategory] = useState<any | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const filteredCategories = categories.filter(c =>
        c.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const formData = new FormData(e.currentTarget);
        const data = {
            name: formData.get("name") as string,
            description: formData.get("description") as string,
            image: formData.get("image") as string,
            status: formData.get("status") as any,
        };

        const result = editingCategory
            ? await updateCategoryAction(editingCategory.id, data)
            : await createCategoryAction(data);

        if (result.error) {
            setError(result.error);
            setLoading(false);
        } else {
            setIsModalOpen(false);
            setEditingCategory(null);
            setLoading(false);
        }
    }

    async function handleDelete(id: string) {
        if (confirm("Are you sure you want to delete this category? This will fail if products are linked to it.")) {
            const result = await deleteCategoryAction(id);
            if (result.error) alert(result.error);
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold font-[family-name:var(--font-heading)]">Categories</h1>
                    <p className="text-text-muted text-sm">Organize your timepieces into segments.</p>
                </div>
                <button
                    onClick={() => {
                        setEditingCategory(null);
                        setIsModalOpen(true);
                    }}
                    className="btn-primary !py-3 flex items-center gap-2"
                >
                    <Plus className="w-4 h-4" />
                    Create Segment
                </button>
            </div>

            {/* Toolbar */}
            <div className="bg-bg-card border border-border-subtle p-4 rounded-2xl flex flex-col sm:flex-row gap-4 items-center">
                <div className="relative flex-1 w-full">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                    <input
                        type="text"
                        placeholder="Search categories..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-bg-primary border border-border-subtle rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:border-gold/50 transition-all"
                    />
                </div>
            </div>

            {/* Grid View for Categories */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCategories.map((category) => (
                    <div key={category.id} className="bg-bg-card border border-border-subtle p-6 rounded-[2rem] hover:border-gold/30 transition-all group relative overflow-hidden">
                        <div className="flex justify-between items-start mb-6">
                            <div className="p-4 bg-bg-primary border border-border-subtle rounded-2xl group-hover:border-gold/50 transition-all">
                                <Layers className="w-8 h-8 text-gold" />
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => {
                                        setEditingCategory(category);
                                        setIsModalOpen(true);
                                    }}
                                    className="p-2.5 bg-bg-primary border border-border-subtle rounded-xl hover:text-gold transition-all"
                                >
                                    <Edit2 className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => handleDelete(category.id)}
                                    className="p-2.5 bg-bg-primary border border-border-subtle rounded-xl hover:text-red-500 transition-all"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <div className="flex items-center gap-3">
                                <h3 className="text-xl font-bold">{category.name}</h3>
                                <span className={`px-2 py-0.5 rounded-full text-[8px] font-bold uppercase tracking-widest border ${category.status === 'ACTIVE' ? 'bg-green-500/10 text-green-500 border-green-500/20' : 'bg-red-500/10 text-red-500 border-red-500/20'
                                    }`}>
                                    {category.status}
                                </span>
                            </div>
                            <p className="text-text-muted text-sm leading-relaxed line-clamp-2">
                                {category.description || "No description provided for this collection."}
                            </p>
                        </div>

                        {/* Background Texture Decor */}
                        <div className="absolute top-[-20%] right-[-20%] w-[50%] h-[50%] bg-gold/5 rounded-full blur-3xl pointer-events-none group-hover:bg-gold/10 transition-colors" />
                    </div>
                ))}
            </div>

            {/* Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
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
                            className="relative w-full max-w-lg bg-bg-secondary border border-border-subtle rounded-[2.5rem] shadow-2xl overflow-hidden"
                        >
                            <div className="p-8 border-b border-border-subtle flex justify-between items-center bg-bg-card/50">
                                <div>
                                    <h2 className="text-2xl font-bold font-[family-name:var(--font-heading)]">
                                        {editingCategory ? "Edit Segment" : "New Category"}
                                    </h2>
                                </div>
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="p-2 hover:bg-bg-card rounded-xl border border-border-subtle transition-all"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            <div className="p-8">
                                <form id="category-form" onSubmit={handleSubmit} className="space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-text-muted uppercase tracking-[0.2em] px-1">Segment Name</label>
                                        <input
                                            name="name"
                                            defaultValue={editingCategory?.name}
                                            required
                                            className="w-full bg-bg-primary border border-border-subtle rounded-2xl py-3.5 px-4 text-sm focus:border-gold/50 outline-none transition-all"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-text-muted uppercase tracking-[0.2em] px-1">Visibility Status</label>
                                        <select
                                            name="status"
                                            defaultValue={editingCategory?.status || "ACTIVE"}
                                            className="w-full bg-bg-primary border border-border-subtle rounded-2xl py-3.5 px-4 text-sm focus:border-gold/50 outline-none transition-all cursor-pointer"
                                        >
                                            <option value="ACTIVE">Active (Public)</option>
                                            <option value="INACTIVE">Inactive (Hidden)</option>
                                        </select>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-text-muted uppercase tracking-[0.2em] px-1">Description</label>
                                        <textarea
                                            name="description"
                                            defaultValue={editingCategory?.description}
                                            rows={3}
                                            className="w-full bg-bg-primary border border-border-subtle rounded-2xl py-4 px-4 text-sm focus:border-gold/50 outline-none transition-all resize-none"
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
                                    form="category-form"
                                    disabled={loading}
                                    className="btn-primary !px-10 flex items-center gap-2 disabled:opacity-50"
                                >
                                    {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : editingCategory ? "Save Changes" : "Create Segment"}
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
