import { AboutSection } from "@/components/sections/about/about-section";
import { WhyChooseSection } from "@/components/sections/about/why-choose-section";
import { CustomerPanels } from "@/components/sections/home/customer-panels";
import { Hero } from "@/components/sections/home/hero";
import { NewsSection } from "@/components/sections/news/news-section";
import { ProductsSection } from "@/components/sections/products/products-section";
import { StorySection } from "@/components/sections/story/story-section";
import { getHomepageNewsPosts } from "@/lib/news";
import { getProducts } from "@/lib/products";

export default async function HomePage() {
  const [products, posts] = await Promise.all([getProducts(), getHomepageNewsPosts()]);

  return (
    <>
      <Hero />
      <StorySection />
      <ProductsSection products={products} />
      <AboutSection />
      <WhyChooseSection />
      <NewsSection posts={posts} />
      <CustomerPanels />
    </>
  );
}
