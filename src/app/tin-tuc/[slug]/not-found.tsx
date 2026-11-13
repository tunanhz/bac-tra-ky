import { NotFoundPanel } from "@/components/layout/not-found-panel";
import { sectionHref } from "@/config/site";

/** 404 của trang tin: slug không ứng với bài viết nào. */
export default function NewsNotFound() {
  return (
    <NotFoundPanel
      title="Không tìm thấy bài viết"
      description="Bài viết này không tồn tại hoặc đã được gỡ. Mời bạn xem các bài khác trong mục Tin tức."
      actionHref={sectionHref("tin-tuc")}
      actionLabel="Quay lại Tin tức"
    />
  );
}
