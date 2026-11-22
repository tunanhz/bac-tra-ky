import { describe, expect, it } from "vitest";
import nextConfig from "../../next.config";

describe("CSS processing", () => {
  it("keeps native CSS Module exports by applying the Tailwind loader only to globals.css", () => {
    const rules = nextConfig.turbopack?.rules;
    expect(rules).not.toHaveProperty("*.css");
    expect(rules?.["globals.css"]).toMatchObject({
      loaders: ["@tailwindcss/turbopack"],
      as: "*.css",
    });
  });
});
