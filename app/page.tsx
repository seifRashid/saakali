export const dynamic = "force-dynamic";

import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import BrandStory from "./components/BrandStory";
import ShopByCollection from "./components/ShopByCollection";
import FeaturedCategories from "./components/FeaturedCategories";
import WhySaakali from "./components/WhySaakali";
import BestSellers from "./components/BestSellers";
import LuxuryHighlight from "./components/LuxuryHighlight";
import Testimonials from "./components/Testimonials";
import Newsletter from "./components/Newsletter";
import Footer from "./components/Footer";
import { getProducts, getCategories } from "../lib/db/queries";

export default async function Home() {
  const [products, categories] = await Promise.all([
    getProducts(),
    getCategories()
  ]);

  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <BrandStory />
        <ShopByCollection />
        <FeaturedCategories categories={categories} />
        <WhySaakali />
        <BestSellers products={products.slice(0, 6) as any} />
        <LuxuryHighlight />
        <Testimonials />
        <Newsletter />
      </main>
      <Footer />
    </>
  );
}
