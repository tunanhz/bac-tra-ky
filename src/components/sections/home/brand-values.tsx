import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

type BrandValue = { numeral: string; title: string; text: string };

/**
 * 3 giá trị thương hiệu theo spec mục III.1. Spec chỉ có tên giá trị; câu mô tả rút từ phần Sứ mệnh và Giá trị cốt
 * lõi của chính spec, không thêm ý mới.
 */
export const BRAND_VALUES: readonly BrandValue[] = [
  {
    numeral: "I",
    title: "Gìn giữ hương vị truyền thống",
    text: "Trân trọng hương vị nguyên bản, nguồn gốc làng nghề và những giá trị văn hoá đã làm nên nét riêng của Bánh Bác.",
  },
  {
    numeral: "II",
    title: "Kết nối văn hoá qua từng thức quà",
    text: "Mỗi sản phẩm là cầu nối giữa người thưởng thức với câu chuyện về vùng đất Giang Xá, về con người và những giá trị được trao truyền qua nhiều thế hệ.",
  },
  {
    numeral: "III",
    title: "Làm mới trải nghiệm thưởng thức",
    text: "Kết hợp cùng Trà Sen, đa dạng hoá lựa chọn hương vị và thiết kế những sản phẩm quà tặng phù hợp với cuộc sống hiện đại.",
  },
];

/**
 * Giá trị thương hiệu (design-direction hướng B mục 4.2): 3 ô giấy viền đôi trên nền be-2, số La Mã đỏ gấc thay
 * cho icon (luật "Ảnh là chính, SVG/icon tối thiểu").
 */
export function BrandValues() {
  return (
    <section aria-labelledby="values-title" className="section-y bg-be-2">
      <div className="wrap">
        <SectionHeading id="values-title" eyebrow="Bác Trà Ký" title="Giá trị thương hiệu" />
        <ol role="list" className="m-0 grid list-none gap-6 p-0 md:grid-cols-3 lg:gap-7">
          {BRAND_VALUES.map((value, index) => (
            <Reveal
              as="li"
              key={value.numeral}
              delay={index * 120}
              className="frame-paper grid grid-cols-[3rem_minmax(0,1fr)] gap-x-3 px-5 py-6 shadow-paper md:block md:px-7 md:pt-10 md:pb-9 md:text-center lg:px-8"
            >
              <p aria-hidden="true" className="col-start-1 row-span-2 m-0 font-heading text-h2 font-bold text-gac md:text-chapter">
                {value.numeral}
              </p>
              <span aria-hidden="true" className="mx-auto mt-4 mb-5 hidden h-px w-12 bg-dong/60 md:block" />
              <h3 className="col-start-2 mt-0 mb-2 text-h3 font-semibold text-son md:mb-3">{value.title}</h3>
              <p className="col-start-2 m-0 text-[0.95rem] text-ink-soft">{value.text}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
