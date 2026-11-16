import { Button } from "@/components/ui/button";
import { sectionHref, siteConfig } from "@/config/site";

export function CustomerPanels() {
  const feedbackHref = siteConfig.email
    ? `mailto:${siteConfig.email}?subject=${encodeURIComponent("Góp ý cho Bác Trà Ký")}`
    : siteConfig.facebookUrl ?? sectionHref("lien-he");

  return (
    <div className="wrap section-y grid gap-5 lg:grid-cols-2 lg:gap-6">
      <section id="goc-feedback" aria-labelledby="feedback-title" className="frame-paper scroll-mt-24 p-6 shadow-paper sm:p-9">
        <p className="eyebrow m-0">Lời nhắn từ bạn</p>
        <h2 id="feedback-title" className="mt-3 mb-3 text-h2 font-bold text-gac">Góc Feedback</h2>
        <p className="mt-0 mb-6 max-w-[44ch] text-ink-soft">
          Bạn đã thử Bánh Bác hay Trà Sen của chúng mình? Hãy kể cho Bác Trà Ký điều bạn thích hoặc góp ý để chúng mình làm tốt hơn.
        </p>
        <Button href={feedbackHref} variant="outline">Gửi góp ý <span aria-hidden="true">→</span></Button>
      </section>
      <section id="uu-dai" aria-labelledby="offers-title" className="on-dark frame-gilt scroll-mt-24 bg-son p-6 text-be sm:p-9">
        <p className="eyebrow m-0 text-nhu">Tin từ Bác Trà Ký</p>
        <h2 id="offers-title" className="mt-3 mb-3 text-h2 font-bold text-be">Ưu đãi</h2>
        <p className="mt-0 mb-6 max-w-[44ch] text-cream-muted">
          Hiện chưa có chương trình ưu đãi được công bố. Bạn có thể liên hệ để được tư vấn chọn hộp bánh hoặc bộ quà phù hợp.
        </p>
        <Button href={siteConfig.orderChannelUrl} variant="outline-light">Liên hệ tư vấn <span aria-hidden="true">→</span></Button>
      </section>
    </div>
  );
}
