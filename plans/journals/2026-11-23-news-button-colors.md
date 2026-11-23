# 2026-11-23 — Red news read-more buttons

Design brief: Brand register, existing warm red/beige palette, CDA headings and Caudex copy. Preserve card layout and pill shape. Signature: red read-more actions invert to beige on hover, keyboard focus and active touch. Dials: variance 1, motion 2, density unchanged.

Changed only news-card and featured-news action styling through a shared scoped CSS Module, not the global primary button or other sections. Default red/beige text; hover, focus-visible and active beige/red text with a red border. Visible keyboard outline and existing 48px touch target preserved. Links still navigate directly to articles; no persistent toggle or double-tap handler added.

Validation: news component tests 8/8; scoped ESLint clean. Playwright at 375/768/1440 verified computed default/hover/focus colors, round corners, minimum target height and no horizontal page overflow; an actual mobile tap with navigation suppressed solely in the test verified beige feedback. Touch-start-only CDP injection did not produce the browser's click/hover feedback; replaced that artificial test sequence with the actual user tap. Desktop screenshot reviewed. Existing unrelated journey edits and local AGENTS changes preserved. No commit/push/deploy.

Review: scoped CSS avoids changing shared button behavior; uses fixed brand tokens and no user-injected styles or extra dependencies. Preference/CLI journal unavailable; local Markdown receipt used.
