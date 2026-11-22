import { existsSync, readFileSync } from "node:fs";
import { createHash } from "node:crypto";
import sharp from "sharp";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { customerNewsPosts } from "./customer-news";
import { getNewsPostBySlug } from "@/lib/news";

const titles = [
  "DẤU ẤN VUA LÝ NAM ĐẾ TRONG LỊCH SỬ VÀ VĂN HÓA LÀNG GIANG XÁ",
  "Đặc sản Hà Nội có gì ngoài những món ăn quen thuộc?",
  "Đánh thức thị trường quà tặng làng nghề: Cơ hội phát triển sản phẩm truyền thống Hà Nội",
  "Những món bánh truyền thống trong văn hóa người Việt",
  "Chuẩn hóa sản xuất – Hướng đi mới cho đặc sản địa phương",
  "Hà Nội đưa di sản ẩm thực vào đời sống sáng tạo",
  "Giữ hồn làng nghề giữa nhịp sống hiện đại: Khi giá trị truyền thống cần được tiếp nối",
  "Một thức quà, nhiều thế hệ: Vì sao những món bánh quê vẫn mang giá trị đặc biệt?",
  "Làm mới diện mạo đặc sản Việt: Bài toán cân bằng giữa truyền thống và thị hiếu hiện đại",
];

describe("9 bài từ tab NỘI DUNG BÁO", () => {
  it("đủ đúng 9 tiêu đề theo thứ tự tài liệu, bài chính thức có trang đọc đầy đủ", () => {
    expect(customerNewsPosts.map((post) => post.title)).toEqual(titles);
    for (const post of customerNewsPosts) {
      expect(post.isDraft).toBe(false);
      expect(post.featured).toBe(false);
      expect(post.lead).toContain(post.excerpt);
      expect(post.body!.length).toBeGreaterThan(3);
      expect(post.body!.filter((block) => block.type !== "image").map((block) => block.runs.map((run) => run.text).join("").trim())).toEqual(post.content);
    }
  });

  it("đủ 32 vị trí ảnh, giữ ảnh Docs trừ minh họa đã thay, tất cả file WebP cục bộ", () => {
    const images = customerNewsPosts.flatMap((post) => post.body!.filter((block) => block.type === "image"));
    expect(images).toHaveLength(32);
    expect(images.filter((image) => image.src.includes("noi-dung-bao-"))).toHaveLength(22);
    expect(images.some((image) => image.src.endsWith("noi-dung-bao-19.webp"))).toBe(false);
    expect(new Set(images.map((image) => image.src)).size).toBe(30);
    for (const image of images) {
      expect(image.src).toMatch(/^\/images\/(news|products)\/[a-z0-9-]+\.webp$/);
      expect(existsSync(join("public", image.src.slice(1)))).toBe(true);
      expect(image.width).toBeGreaterThan(0);
      expect(image.height).toBeGreaterThan(0);
      expect(image.alt.length).toBeGreaterThan(15);
    }
  });

  it("mỗi bài có thêm ảnh, ảnh báo có link nguồn đúng và ảnh thương hiệu không giả nguồn Facebook", () => {
    const expected = [4, 5, 3, 5, 2, 2, 4, 4, 3];
    const receipt = JSON.parse(readFileSync("docs/news-image-sources-2026-11-23.json", "utf8"));
    expect(receipt.externalImageCount).toBe(9);
    expect(receipt.images).toHaveLength(10);
    customerNewsPosts.forEach((post, index) => {
      const images = post.body!.filter((block) => block.type === "image");
      expect(images).toHaveLength(expected[index]);
      expect(new Set(images.map((image) => image.src)).size).toBe(images.length);
      const sources = receipt.images.filter((item: { articleSlug: string }) => item.articleSlug === post.slug);
      expect(sources.length).toBeGreaterThan(0);
      for (const source of sources) {
        const image = images.find((block) => block.src === source.path)!;
        expect(image).toBeDefined();
        if (source.sourceUrl) {
          expect(source.imageUrl).toMatch(/^https:\/\//);
          expect(image.caption?.some((run) => run.href === source.sourceUrl)).toBe(true);
        } else {
          expect(image.caption?.map((run) => run.text).join("")).toContain("do Bác Trà Ký cung cấp");
          expect(image.caption?.some((run) => run.href?.includes("facebook.com"))).toBe(false);
        }
      }
    });
    expect(customerNewsPosts[7].coverImage).toBe("/images/news/nguon-sum-vay-goi-banh-tet.webp");
  });

  it("kích thước khai báo khớp ảnh thật, không làm phóng đại ảnh hoặc sai tỷ lệ", async () => {
    for (const post of customerNewsPosts) {
      for (const block of post.body!) {
        if (block.type !== "image") continue;
        const metadata = await sharp(join("public", block.src.slice(1))).metadata();
        expect([block.width, block.height]).toEqual([metadata.width, metadata.height]);
      }
    }
  });

  it("bổ sung ảnh không cắt hay viết lại lời dẫn và nội dung 9 bài", () => {
    const hashes = [
      "f81a3aab368c4e433fddcddb5da28dd2b20e60ecdb065ef8685b4c3609e32087",
      "3e1f81b6b2ded23a956ae3059547fd86248b679da38a5ccf6610286a75573362",
      "fedceb1eccfb7cbe8f1061d82d5c424d8c58b9fbfd7434bd12f54d384c7bf391",
      "9bb0823a2bde95d51c84fceeb545214d3bbd2797ee5c5bd7fe8ce73385714150",
      "409687b119695e11a531eb414f43b570490aa98e9faf705977c815011447e2ff",
      "a4e70d062ea72e5d61d8d3ccf8d6b08be4d29a9a0db893bc10bfb9d6014b5dfd",
      "d8e94ead22ad218c3a8457ae2313b6346d102dc16aad60d51ef71165df7981e8",
      "8538da00e690ecb856c54d59e28277275de0a9053daadc0d75f8c509534e8772",
      "698c58e15ef2200646b17440b03125a9992dbfa15e08d0bf5e742410abb9424d",
    ];
    customerNewsPosts.forEach((post, index) => {
      expect(createHash("sha256").update(JSON.stringify([post.lead, post.content])).digest("hex")).toBe(hashes[index]);
    });
  });

  it("giữ nguồn báo và link video thật, loại tracking, không nhầm tài liệu thành chỉ thị", () => {
    const runs = customerNewsPosts.flatMap((post) => post.body!.flatMap((block) => block.type === "image" ? block.caption ?? [] : block.runs));
    const urls = runs.flatMap((run) => run.href ? [run.href] : []);
    expect(urls).toContain("https://www.facebook.com/reel/1112875721624364");
    expect(urls).toContain("https://happyvietnam.vnanet.vn/chuan-hoa-san-xuat-mo-co-hoi-tiep-can-thi-truong-cho-dac-san-dia-phuong/64256.html");
    expect(urls).toContain("https://daibieunhandan.vn/ha-noi-dua-di-san-am-thuc-vao-doi-song-sang-tao-10443607.html");
    expect(urls.every((url) => url.startsWith("https://") && !url.includes("utm_source"))).toBe(true);
  });

  it("chỉ sửa lỗi biên tập: mốc 1480 năm, đoạn trùng và dòng nguồn lỗi; không biến dự kiến thành đã diễn ra", () => {
    const history = customerNewsPosts[0].content.join(" ");
    expect(history).toContain("1.480 năm (544–2024)");
    expect(history).not.toContain("1.523");
    const cakes = customerNewsPosts[3].content;
    expect(cakes.filter((paragraph) => paragraph.startsWith("Trong khi đó, bánh phu thê"))).toHaveLength(1);
    const all = customerNewsPosts.flatMap((post) => post.content).join(" ");
    expect(all).not.toContain("điện tử+1");
    expect(all).not.toContain("hương tết bàn thờ xứ Quảng");
    expect(customerNewsPosts[5].content.join(" ")).toContain("dự kiến diễn ra từ ngày 27–29/11/2026");
  });

  it("trả bản sao sâu của body, định dạng và caption, không làm thay đổi nội dung gốc", async () => {
    const original = customerNewsPosts[0];
    const post = (await getNewsPostBySlug(original.slug))!;
    const paragraph = post.body!.find((block) => block.type === "paragraph")!;
    const image = post.body!.find((block) => block.type === "image" && block.caption?.length)!;
    if (paragraph.type === "image" || image.type !== "image") throw new Error("Unexpected block type");
    paragraph.runs[0].text = "nội dung thay đổi";
    image.caption![0].text = "nguồn thay đổi";
    post.body!.pop();
    expect((await getNewsPostBySlug(original.slug))!.body).toEqual(original.body);
  });
});
