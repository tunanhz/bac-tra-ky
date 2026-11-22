import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import sharp from "sharp";
import { describe, expect, it } from "vitest";

describe("Canva page 3 original product images", () => {
  for (const name of ["traditional", "savory"]) {
    it(`${name}: original supplied PNG retains real transparent pixels`, async () => {
      const path = resolve(`public/images/revisions/products-six-${name}.png`);
      const image = sharp(await readFile(path));
      const metadata = await image.metadata();
      const { channels, isOpaque } = await image.stats();
      expect(metadata.format).toBe("png");
      expect(metadata.width).toBe(1230);
      expect(metadata.height).toBe(693);
      expect(metadata.hasAlpha).toBe(true);
      expect(isOpaque).toBe(false);
      expect(channels[3].min).toBe(0);
      expect(channels[3].max).toBe(255);
    });
  }
});
