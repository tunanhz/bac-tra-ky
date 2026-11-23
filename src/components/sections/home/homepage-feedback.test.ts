import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { NAV_ITEMS, sectionHref } from "@/config/site";

const read = (path: string) => readFileSync(resolve(process.cwd(), path), "utf8");

describe("Homepage feedback 149 contracts", () => {
  it("keeps homepage news and navigation without deleting article routes", () => {
    const page = read("src/app/page.tsx");
    expect(page).toContain("<NewsSection posts={posts} />");
    expect(page).toContain("getHomepageNewsPosts()");
    expect(NAV_ITEMS.some(({ id }) => String(id) === "tin-tuc")).toBe(true);
    expect(sectionHref("tin-tuc")).toBe("/#tin-tuc");
    expect(existsSync(resolve(process.cwd(), "src/app/tin-tuc/[slug]/page.tsx"))).toBe(true);
  });

  it("uses only existing clean original layers, never the annotated offer slide", () => {
    const campaign = read("src/components/sections/home/offer-campaign.tsx");
    const feedback = read("src/components/sections/home/customer-panels.tsx");
    const scenes = read("src/components/sections/home/customer-scenes.module.css");
    expect(campaign).not.toMatch(/uu-dai-dac-biet|mask-image|nen-uu-dai-clean/);
    const assets = [...(campaign + feedback + scenes).matchAll(/\/images\/revisions\/feedback-home-[\w-]+\.png/g)];
    expect(assets.length).toBeGreaterThanOrEqual(6);
    for (const [asset] of assets) expect(existsSync(resolve(process.cwd(), "public" + asset)), asset).toBe(true);
    expect(scenes).toContain("#76010d");
    expect(scenes).toContain("#450208");
    expect(scenes).toContain("#fce8d3");
  });

  it("keeps section title tokens without overriding utilities with unlayered heading rules", () => {
    const css = read("src/app/globals.css");
    expect(css).toMatch(/@layer base \{\r?\n  main :where\(h1\)/);
    expect(read("src/components/sections/about/about-section.tsx")).toMatch(/id="core-values-title" className="[^"]*text-h2/);
    expect(read("src/components/sections/about/brand-journey.tsx")).toContain("text-h2");
  });

  it("keeps motion opt-outs for discount and all contact icons", () => {
    const contact = read("src/components/layout/quick-contact.module.css");
    const scenes = read("src/components/sections/home/customer-scenes.module.css");
    expect(contact).toMatch(/prefers-reduced-motion: reduce/);
    expect(contact).toMatch(/\.phone, \.facebook, \.tiktok \{ animation: none/);
    expect(scenes).toMatch(/prefers-reduced-motion: reduce/);
    expect(scenes).toMatch(/\.discount \{ animation: none/);
  });
});
