import { AboutSection } from "@/components/sections/about/about-section";
import { ContactSection } from "@/components/sections/contact/contact-section";
import { BrandValues } from "@/components/sections/home/brand-values";
import { FeaturedProducts } from "@/components/sections/home/featured-products";
import { FinalCta } from "@/components/sections/home/final-cta";
import { Hero } from "@/components/sections/home/hero";
import { Intro } from "@/components/sections/home/intro";
import { NewsSection } from "@/components/sections/news/news-section";
import { ProductsSection } from "@/components/sections/products/products-section";
import { StorySection } from "@/components/sections/story/story-section";
import { getNewsPosts } from "@/lib/news";
import { getFeaturedProducts, getProducts } from "@/lib/products";

/**
 * Trang chủ — landing page dài. Thứ tự section:
 * Hero (#trang-chu) → Giới thiệu ngắn → Sản phẩm nổi bật → Giá trị thương hiệu → Về chúng tôi (#ve-chung-toi)
 * → Câu chuyện văn hoá (#cau-chuyen) → Sản phẩm (#san-pham) → Tin tức (#tin-tuc) → CTA cuối → Liên hệ (#lien-he).
 *
 * Dữ liệu hiện là tĩnh (`src/data`), trang được prerender khi build. Phase 05 đổi lớp `src/lib/*` sang MongoDB.
 */
export default async function HomePage() {
  const [products, featuredProducts, posts] = await Promise.all([getProducts(), getFeaturedProducts(), getNewsPosts()]);

  return (
    <>
      <Hero />
      <Intro />
      <FeaturedProducts products={featuredProducts} />
      <BrandValues />
      <AboutSection />
      <StorySection />
      <ProductsSection products={products} />
      <NewsSection posts={posts} />
      <FinalCta />
      <ContactSection />
    </>
  );
}
