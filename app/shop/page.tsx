import { motion } from "framer-motion";
export const dynamic = "force-dynamic";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Newsletter from "../components/Newsletter";
import { getProducts } from "../../lib/db/queries";
import ShopClient from "./ShopClient";

export default async function ShopPage() {
    const products = await getProducts();

    return (
        <div className="min-h-screen bg-bg-primary">
            <Navbar />

            {/* Header / Hero Section for Shop */}
            <section className="relative pt-32 pb-16 overflow-hidden">
                <div className="absolute inset-0 bg-bg-secondary/50" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(201,168,76,0.05)_0%,transparent_50%)]" />

                <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center max-w-3xl mx-auto">
                        <span className="text-gold text-xs font-bold tracking-[0.4em] uppercase mb-4 block">
                            The Collection
                        </span>
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-[family-name:var(--font-heading)] mb-6">
                            Exquisite <span className="gold-gradient-text">Timepieces</span>
                        </h1>
                        <p className="text-text-secondary text-sm sm:text-base leading-relaxed">
                            Browse our curated collection of luxury, sports, and classic watches. From hand-crafted mechanical movements to cutting-edge digital precision.
                        </p>
                    </div>
                </div>
            </section>

            <ShopClient initialProducts={products} />

            <Newsletter />
            <Footer />
        </div>
    );
}
