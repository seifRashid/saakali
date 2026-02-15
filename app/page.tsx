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

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <BrandStory />
        <ShopByCollection />
        <FeaturedCategories />
        <WhySaakali />
        <BestSellers />
        <LuxuryHighlight />
        <Testimonials />
        <Newsletter />
      </main>
      <Footer />
    </>
  );
}
