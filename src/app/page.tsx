import { AboutSection } from "@/components/sections/about/about-section";
import { WhyChooseSection } from "@/components/sections/about/why-choose-section";
import { ContactSection } from "@/components/sections/contact/contact-section";
import { CustomerPanels } from "@/components/sections/home/customer-panels";
import { FeaturedProducts } from "@/components/sections/home/featured-products";
import { FinalCta } from "@/components/sections/home/final-cta";
import { Hero } from "@/components/sections/home/hero";
import { NewsSection } from "@/components/sections/news/news-section";
import { ProductsSection } from "@/components/sections/products/products-section";
import { StorySection } from "@/components/sections/story/story-section";
import { getNewsPosts } from "@/lib/news";
import { getFeaturedProducts, getProducts } from "@/lib/products";

export default async function HomePage() {
  const [products, featuredProducts, posts] = await Promise.all([getProducts(), getFeaturedProducts(), getNewsPosts()]);

  return (
    <>
      <Hero />
      <FeaturedProducts products={featuredProducts} />
      <StorySection />
      <ProductsSection products={products} />
      <AboutSection />
      <WhyChooseSection />
      <NewsSection posts={posts} />
      <CustomerPanels />
      <FinalCta />
      <ContactSection />
    </>
  );
}
