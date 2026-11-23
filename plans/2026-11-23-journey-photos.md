# Journey photos and scroll tracking — 2026-11-23

## Design brief
Register: Brand. Scene: Vietnamese visitors reading the brand story on phone or desktop.
Direction: Preserve the existing warm traditional red/beige visual identity.
Color: Committed; existing paper/be, ink and gac tokens. No new palette.
Type: CDA Mê Ly Display headings and Caudex body, unchanged.
Signature: Five image-led milestones with a red active marker and completed connecting line.
Dials: variance 3, motion 2, density 3.

## Acceptance and implementation
- Kept customer-approved title, introduction and all five milestone descriptions verbatim.
- Replaced text-only horizontal desktop list with responsive vertical timeline, alternating image/text on tablet and desktop.
- One relevant local image per milestone: Giang Xá gate, sliced Bánh Bác, actual cake-rolling photo, branded two-cake box, branded cake/tea gift set.
- Actual cake-rolling photo reused from the imported customer news, credited and linked to Dân trí; no generated substitute or claim that the pictured person is brand staff.
- Natural forward/backward scrolling selects the milestone nearest viewport center. No scroll locking, autoplay or mandatory touch gestures.
- All cards remain readable without JavaScript; reduced-motion users receive effectively instant state changes.
- Scroll/resize handlers are requestAnimationFrame-throttled and cleaned up on unmount.

## Verification
- Browser checks at 375/768/1440: all five images decode; all five milestones and reverse scrolling activate correctly; exactly one aria-current=step; no horizontal overflow or runtime errors.
- No-JavaScript browser: all five milestones and images server-rendered.
- Full suite: 208/208 passed across 29 files.
- Narrow tests: 8 passed across journey and about section; includes image selection and forward/reverse scroll regression.
- Production build: passed, 22 routes.
- Changed-file ESLint and git diff --check: passed.
- Design render checker: zero errors. Fifteen warnings are five existing intentionally clipped sr-only captions repeated at three viewports; unrelated to journey.
- Visual critique: warm, traditional, calm; mobile cards and desktop image/text grid inspected. Scores: fidelity 2, hierarchy 2, spacing 2, alignment 2, typography 2, color 2, shape 2, feedback 2, responsiveness 2, specificity 2, content 2, craft 1 (inherited fixed contact controls can overlap content). 23/24; no item below 1.

## Scope
No changes to news content, product catalog, header or unrelated local AGENTS edits. No commit, push or deploy requested for this new change.
