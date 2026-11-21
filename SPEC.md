# SPEC: nikku.tech quality pass (2026-11-21, Opus architect + Gemini review)

**Goal / done:** The site looks finished and intentional. Quick-win defects are fixed, English and German are a real Starlight i18n setup, and the homepage is a portfolio-first landing page. Everything is built and verified, and pushed to `main`, which auto-deploys.

**Constraints / no-gos**
- AGENTS.md asset rules: never touch user copy or backup files. Back up before modifying any image. Never replace user pixel art.
- Old URLs must keep working through redirects. No content is lost.
- A Google Drive reorg is running in another thread. Don't write into `~/GoogleDrive` except to `University/Website_Project_Backups`, which that reorg pins.
- Push to `main` only after: a local build passes, the internal-link check passes, a visual check is done, and a Gemini diff review is resolved. Backups are made first.

**Assumptions (defaults chosen)**
- English is the root locale and German is `/de/`. Pages without a German version use Starlight's fallback, which shows the English page with a notice.
- The Chinese page's root URL now serves English. German moves to `/de/…`.
- The LinkedIn handle is `nikkuisryu`, taken from the CV text.
- The homepage hero shows Nick only. The Heidelberg teaser reuses the existing uni-friends campfire art, which already appears on the site.

## Plan
0. **Safety**
   - `git tag pre-opus-overhaul` and push the tag.
   - Run `backup.sh` to make a zip in Drive `Website_Project_Backups`.
   - Copy the 2 hero/OG source images into `backups/assets/`. Nothing is modified; the copies are for reference only.
1. **Quick wins**
   - **Header strip:** Starlight has both `header.header` and an inner `div.header`, so the translucent rule stacks. Target only `header.header`.
   - **Site title:** change to "Nikku · Nick Blassmann" and stop it truncating on mobile.
   - **Duplicate H1s:** remove the in-body `# …` H1s on 8 pages (keep the badges). Drop the "Argon UX" wording from titles and badges.
   - **Seminar:** `seminar-agentic-ai/index.mdx` → `seminar-agentic-ai.mdx`. The URL stays the same, and the raw folder name disappears from the sidebar.
   - **CV:** fix the real LinkedIn URL, and Astro 5 → 7.
   - **og:image / twitter:image:** generate a new `public/og-image.png` (1200×630) from the sakura scene with sharp. This is a new file; the original is not modified.
   - **`custom.css`:** refactor about 300 lines of per-page background selectors into one rule driven by CSS custom properties. Visual output stays the same.
2. **i18n**
   - Starlight `locales: { root: en, de }`.
   - Move the 4 German pages to `src/content/docs/de/…` with the same slug minus `de/`, and the English Chinese page to the root slug. Rename `numerik-prototype` → `numerik`.
   - Remove `sidebar.hidden`. Add `translations.de` for the sidebar labels.
   - `LanguageSwitch` derives its counterpart URL automatically, from `Astro.currentLocale` and the path.
   - Add redirects for every old URL and update internal links.
3. **Homepage, EN + DE**
   - Splash template with a custom hero: sprite, name, one-line pitch, CTAs.
   - A "Now" strip with the semester focus.
   - 3 flagship project cards: Voice ML, RMI visualiser, Deutsch üben app.
   - A grid of interactive study tools, and a Heidelberg teaser.
   - Theme-aware in light and dark, and responsive down to 360px.
4. **Verify and ship**
   - `astro build` must pass with no new warnings.
   - A script checks that every internal `href` in `dist/` resolves, and that every old URL redirects.
   - Screenshots of home, a lecture page and a `/de/` page, at desktop and mobile, in light and dark.
   - `cross-model review --diff`. Verify each finding before acting on it.
   - Commit per phase, then push.

## Decisions log
- Course names stay German in the English sidebar, for example "Theoretische Informatik". They are proper course names.
- German translations of the CV, Heidelberg and the core-cs notes are left for later. The fallback notice covers them for now.
- Heavy-page performance work (vocab rendered on demand, WebP backgrounds) is deferred to the next session, per the agreed scope.
- Gemini plan review (gemini-4-neon-high) gave 10 findings. All were verified against the code:
  - **Already handled by the build:**
    - The `/deutsch/` sidebar link is now an absolute URL.
    - Redirects are single-hop.
    - The `hero:` frontmatter is kept.
    - The CSS mobile fallback is `var(--pbg-m, var(--pbg))`.
    - The OG image is an absolute 92 KB JPEG.
  - **Fixed because of it:**
    - The compliance registry was out of date. CI had been failing daily since the `/deutsch/` commits, before this work started. Registry bumped to v1.4.0, and the move of the German Chinese page keeps its WIP gating.
    - Fallback `/de/` pages now set a canonical URL pointing at the English page, and drop hreflang when no real translation exists. This is done in `src/routeData.ts`.
    - Added German hub pages for the course overview and the Japanese overview.
    - The site title now scales on mobile.
    - The link checker now also flags links to redirect stubs and checks CSS `url()`s.
  - **Accepted as-is:**
    - Starlight's header language select drops `#hash` when switching. The in-page switch keeps it.
    - Old German Chinese bookmarks at the root URL now show English. A language picker is one click away.
- Shipped as one commit instead of one per phase, because the phases share `custom.css` and `astro.config.mjs`.
- On splash pages Starlight has no mobile menu, so the language and theme pickers only show on desktop for the homepage. This is a Starlight default and was left alone.
- The "Argon UX" design-story prose inside the lecture pages is the user's own content. It was kept; only titles and badges were changed.
- Gemini diff review gave 8 findings. All were verified and fixed:
  - The homepage hreflang was stripped because of an `index` vs `''` route-id mismatch.
  - The sitemap listed fallback `/de/` pages, and `og:url` / `og:locale` were wrong on those pages. Now uses an explicit `@astrojs/sitemap` with a filter.
  - The homepage `<title>` repeated the site title.
  - `.home-teaser` was missing `not-content`.
  - Light-mode accent `#3b82f6` failed WCAG AA. Light mode now uses darker blues; dark mode is unchanged.
  - The Tier 3 compliance scan skipped `de/` core-cs pages.
  - The ProjectCard aria-label was English on German pages.
  - The Chinese lesson-table anchors were broken. This predates the overhaul; the emoji was removed from the lesson headings.
- The background CSS refactor was checked against the `pre-opus-overhaul` build: 4 pages × desktop/mobile, pixel diff 0.
