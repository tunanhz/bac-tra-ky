import type { Metadata } from "next";
import Image from "next/image";
import { NewsCard } from "@/components/sections/news/news-card";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { sectionHref } from "@/config/site";
import { getVillageNewsPosts } from "@/lib/news";

export const metadata: Metadata = {
  title: "Khám phá làng nghề Giang Xá",
  description:
    "5 bài viết tư liệu và câu chuyện về làng nghề Giang Xá, dấu ấn Vua Lý Nam Đế và hương vị Bánh Bác truyền thống Hoài Đức.",
};

export default async function VillageDiscoveryPage() {
  const posts = await getVillageNewsPosts();

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#fbf5e6] pt-[88px] pb-24 sm:pt-[108px] sm:pb-20">
      <div className="pointer-events-none absolute inset-0 z-0">
        <Image
          src="/images/brand/nen-gia-tri-cot-loi.webp"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-bottom opacity-75"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-b from-[#fbf5e6]/65 via-[#fbf5e6]/40 to-[#fbf5e6]/75"
        />
      </div>

      <div className="wrap relative z-10">
        <SectionHeading
          id="village-discovery-title"
          as="h1"
          eyebrow="Câu chuyện văn hoá"
          title="Khám phá làng nghề Giang Xá"
          description="Tuyển chọn 5 bài viết về lịch sử, di tích, ký ức làng cổ Giang Xá và hương vị Bánh Bác truyền thống Hoài Đức."
        />

        <ul className="m-0 grid list-none gap-5 p-0 sm:gap-7 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <li key={post.slug}>
              <NewsCard post={post} />
            </li>
          ))}
        </ul>

        <div className="mt-10 flex justify-center sm:mt-12">
          <Button href={sectionHref("cau-chuyen")} variant="outline" className="w-full sm:w-auto">
            ← Quay lại Câu chuyện văn hoá
          </Button>
        </div>
      </div>
    </div>
  );
}
