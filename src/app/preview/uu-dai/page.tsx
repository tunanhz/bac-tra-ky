import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { io } from "next/cache";
import { Suspense } from "react";
import { OfferCampaign } from "@/components/sections/home/offer-campaign";
import { getActiveOffer, type CustomerOffer } from "@/data/customer-content";
import { OfferPreviewForm } from "./offer-preview-form";

export const metadata: Metadata = {
  title: "Xem thử giao diện Ưu đãi",
  robots: { index: false, follow: false },
};

// Fixture chỉ dùng trong chế độ phát triển, không đi vào dữ liệu chương trình thật.
const sample: CustomerOffer = {
  status: "published",
  title: "Khi mua combo Bánh Bác",
  description: "Thưởng thức trọn vị bánh quê bên chén trà sen. Nội dung dưới đây chỉ dùng để xem thử giao diện.",
  terms: ["Chương trình mẫu, không áp dụng để đặt hàng."],
  startsOn: "2026-11-16",
  endsOn: "2026-11-30",
};

async function readPreviewClock() {
  await io();
  return Date.now();
}

async function PreviewContent() {
  const now = await readPreviewClock();
  // Hết ngày mẫu (giờ Việt Nam), cả tải lại trang lẫn tab đang mở đều không khởi động lại đồng hồ.
  const active = getActiveOffer(sample, now);
  const inactive = <p role="status" className="mt-5 mb-0 text-cream-muted">Đã ngoài thời gian của chương trình mẫu. Không nhận đơn.</p>;
  return (
    <OfferCampaign offer={sample} serverNow={active ? now : null} preview discount="10%" expired={inactive}>
      {active && <OfferPreviewForm />}
    </OfferCampaign>
  );
}

export default function OfferPreviewPage() {
  if (process.env.NODE_ENV !== "development") notFound();
  return (
    <div data-offer-preview className="wrap pt-24 pb-12 sm:pt-28">
      <h1 className="mt-0 mb-4 text-center text-h2 text-gac">Xem thử giao diện Ưu đãi</h1>
      <Suspense fallback={<p className="text-center">Đang mở bản xem thử…</p>}>
        <PreviewContent />
      </Suspense>
    </div>
  );
}
