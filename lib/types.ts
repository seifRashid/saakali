export interface Product {
    id: string;
    name: string;
    price: number;
    originalPrice?: number;
    category: string;
    type: "Analogue" | "Digital" | "Quartz" | "Automatic";
    material: "Leather" | "Stainless Steel" | "Silicone" | "Titanium";
    strap?: string;
    gender: "Men" | "Women" | "Unisex" | "Kids";
    badge?: string;
    badgeColor?: string;
    rating: number;
    reviewsCount: number;
    inStock: boolean;
    description: string;
}
