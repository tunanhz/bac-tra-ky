import type { Metadata } from "next";
import { NotFoundPanel } from "@/components/layout/not-found-panel";

export const metadata: Metadata = {
  title: "Không tìm thấy trang",
  robots: { index: false },
};

/** Trang 404 chung của site (đường dẫn không tồn tại). */
export default function NotFound() {
  return (
    <NotFoundPanel
      title="Không tìm thấy trang"
      description="Đường dẫn bạn mở không tồn tại hoặc đã được đổi. Mời bạn quay về Trang chủ để tiếp tục khám phá Bác Trà Ký."
      actionHref="/"
      actionLabel="Về Trang chủ"
    />
  );
}
