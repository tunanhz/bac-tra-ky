# News scope correction — 2026-11-23

## User clarification
The slide 9 instruction does NOT mean remove every article or the entire Tin tức section. Remove the highlighted featured/legacy group and preserve the customer-supplied articles.

## Changes
- Restored homepage NewsSection, Tin tức navigation/footer link, and /#tin-tuc backlinks from article and 404 pages.
- Homepage feed uses getHomepageNewsPosts(): the 9 articles from src/data/customer-news.ts only.
- Removed featured hero rendering from NewsBoard and stopped implicitly dropping the first item from the remaining list.
- The 6 legacy article records, images and detail URLs are preserved; only excluded from the homepage feed. The archive still has 15 records.
- No changes to other approved backgrounds, animations, story layouts or customer article content.
- Brief/final handoff corrected so future work does not repeat the rejected whole-section interpretation.

## Verification
- TDD regression initially failed for missing homepage feed, section and navigation, then passed after repair.
- Full Vitest: 30 files, 217/217 tests PASS.
- next typegen + tsc --noEmit: PASS.
- Production build: PASS, 22 static pages including existing article URLs.
- ESLint: 0 errors, 5 existing unused-variable warnings in why-choose-section and gift-collections.
- Browser: refreshed production preview at 127.0.0.1:3032; Tin tức contains exactly 9 article cards, no oversized featured article.
- Desktop 1440x900: restored navigation works, scroll-right moves list to scrollLeft 384, document does not overflow.
- Mobile 375x812: menu contains Tin tức; selecting it closes menu; 9 cards remain; first images loaded; document does not overflow. Temporary viewport reset.
- Screenshots: news-scope-desktop.jpg and news-scope-mobile.jpg in this report directory.
- Data/detail route preservation covered by tests and production generation; no real external forms/social actions invoked.

## Preservation / Git
Fetched origin; HEAD equals origin/main (ba49e2b); no dev branch exists. Kept the dirty tree and all other edits without stash/reset. Before-edit files saved under .artifacts/news-scope-correction-20261123/before with .before extensions. No commit, push or deployment. Local production preview restarted on port 3032 (owned process session 55834).
