import Hero from "@/components/ui/Hero";
import FeaturedProducts from "@/components/ui/FeaturedProducts";
// import CategoriesGrid from "@/components/ui/CategoriesGrid";
import PromoBanner from "@/components/ui/PromoBanner";
import TrustBadges from "@/components/ui/TrustBadges";
import Testimonials from "@/components/ui/Testimonials";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBadges />
      <FeaturedProducts />
      {/* <CategoriesGrid /> */}
      <PromoBanner />
      <Testimonials />
    </>
  );
}
