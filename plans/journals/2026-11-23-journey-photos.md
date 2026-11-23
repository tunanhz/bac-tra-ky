# 2026-11-23 — Journey imagery and active scroll milestone

Implemented the customer's requested appropriate photos and scroll-responsive journey section. Preserved their exact five-stage copy and brand typography. Inspected a contact sheet before selection; replaced the interim supplied craft illustration with an actual Bánh Bác rolling photo already in customer news, attributed to Dân trí. Used existing brand product photos for discovery, outreach and gift-set stages.

Verification: three responsive browser widths, forward/reverse milestone selection, image decoding, no-JS visibility, reduced motion, narrow 8 tests, build, scoped ESLint and whitespace checks. UI checker has no errors; warnings concern pre-existing sr-only captions. Corrected the QA reduced-motion assertion to accept the global accessibility stylesheet's 0.01ms override, not require exactly zero. No test weakening: all durations must be less than 1ms. Initial preview was offline; restarted localhost:3026 and reran browser checks against the actual app.

No new paid services, generated images, source scraping, commits or publication. Existing unrelated work remains untouched. CLI journal service not available in this environment; this Markdown file is the local journal receipt.
