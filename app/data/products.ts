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

export const products: Product[] = [
    {
        id: "1",
        name: "Sovereign Chrono",
        price: 349,
        originalPrice: 429,
        badge: "Best Seller",
        badgeColor: "#c9a84c",
        rating: 4.9,
        reviewsCount: 234,
        category: "Luxury",
        type: "Quartz",
        material: "Stainless Steel",
        strap: "Steel Link",
        gender: "Men",
        inStock: true,
        description: "A statement of power and precision. The Sovereign Chrono features a brushed stainless steel case and a high-precision quartz movement."
    },
    {
        id: "2",
        name: "Eclipse Rose",
        price: 289,
        originalPrice: 359,
        badge: "New Arrival",
        badgeColor: "#e0c76f",
        rating: 4.8,
        reviewsCount: 156,
        category: "Luxury",
        type: "Analogue",
        material: "Leather",
        strap: "Genuine Leather",
        gender: "Women",
        inStock: true,
        description: "Elegant rose gold accents paired with a deep midnight dial. The Eclipse Rose is the perfect companion for sophisticated evenings."
    },
    {
        id: "3",
        name: "Titanium Pro X",
        price: 399,
        originalPrice: 499,
        badge: "Limited Edition",
        badgeColor: "#ef4444",
        rating: 5.0,
        reviewsCount: 89,
        category: "Sport",
        type: "Digital",
        material: "Titanium",
        strap: "Sport Silicon",
        gender: "Men",
        inStock: true,
        description: "Built for the extremes. The Titanium Pro X features a lightweight yet indestructible titanium shell and advanced digital tracking."
    },
    {
        id: "4",
        name: "Heritage Gold",
        price: 449,
        badge: "Best Seller",
        badgeColor: "#c9a84c",
        rating: 4.9,
        reviewsCount: 312,
        category: "Luxury",
        type: "Automatic",
        material: "Stainless Steel",
        strap: "Gold Plated",
        gender: "Men",
        inStock: true,
        description: "A tribute to classic watchmaking. The Heritage Gold features a self-winding automatic movement visible through the exhibition case back."
    },
    {
        id: "5",
        name: "Aria Diamond",
        price: 329,
        originalPrice: 399,
        badge: "Trending",
        badgeColor: "#a78bfa",
        rating: 4.7,
        reviewsCount: 198,
        category: "Luxury",
        type: "Analogue",
        material: "Stainless Steel",
        strap: "Mesh Band",
        gender: "Women",
        inStock: true,
        description: "Minimalist design elevated with a single genuine diamond at the 12 o'clock position. Airy, lightweight, and undeniably premium."
    },
    {
        id: "6",
        name: "Explorer Scout",
        price: 179,
        originalPrice: 229,
        badge: "Popular",
        badgeColor: "#4ade80",
        rating: 4.6,
        reviewsCount: 267,
        category: "Kids",
        type: "Digital",
        material: "Silicone",
        strap: "Soft Silicone",
        gender: "Kids",
        inStock: true,
        description: "Durable, waterproof, and fun. The Explorer Scout is designed to withstand the adventures of the youngest timekeepers."
    },
    {
        id: "7",
        name: "Stealth Ops",
        price: 259,
        rating: 4.5,
        reviewsCount: 112,
        category: "Sport",
        type: "Digital",
        material: "Silicone",
        strap: "Tactical Rubber",
        gender: "Men",
        inStock: true,
        description: "Matte black finish for a low-profile look. Features world time, stopwatch, and a high-intensity backlight."
    },
    {
        id: "8",
        name: "Marina Deep-Sea",
        price: 599,
        badge: "Pro",
        badgeColor: "#3b82f6",
        rating: 4.9,
        reviewsCount: 45,
        category: "Sport",
        type: "Automatic",
        material: "Stainless Steel",
        strap: "Diver Extension",
        gender: "Men",
        inStock: false,
        description: "Water resistant up to 300 meters. A professional diving watch with a unidirectional rotating bezel and sapphire crystal."
    }
];
