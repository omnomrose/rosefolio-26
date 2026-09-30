# AGENTS.md — rosefolio

Reference for any AI agent working on this repo. Read this before starting any task.

## 1. Project

Rose Nguyen's product design portfolio. It's a fresh Next.js build from a finished Figma design.

- Figma file: https://www.figma.com/design/SZidvgU2PaeWnnXGZQ5ejt/rosefolio-26-27
  - Pages: `lofi/midfi` (151:3174), `components` (2:3)
  - Home / Landing Page frame: node `973:649` (1512 × 1226)
- Local dev folder: ~/Desktop/rosefolio-26
- Repo: GitHub `omnomrose/rosefolio-26` (to be created by Rose)
- Hosting: Vercel, on Rose's own custom domain
- Owner: Rose (designer-developer). She reviews and refines everything.

## 2. Rules (non-negotiable)

1. **Never invent tokens.** Every color, font, spacing value, and effect comes from the Figma variables in section 5. If a value in the design isn't a variable, stop and ask. Don't hardcode it and don't round it.
2. **The Figma file is the source of truth.** Match it exactly. Don't "improve" the layout, copy, or spacing without asking.
3. **Always read annotations** on the Figma frame before implementing it (use `get_design_context` on the specific node). Annotations override assumptions.
4. **Ask before implementing.** Before building any page or component, list what you're about to build, which nodes you're reading, and any questions. Wait for Rose's go-ahead.
5. **No new dependencies without asking.** The approved list is in section 4.
6. Flag accessibility issues, but don't change the design to fix them. Raise them with Rose instead.

## 3. Scope

### Pages
| Route | Page | Launch (Day 1) |
|---|---|---|
| `/` | Home: case study overview (sidebar + 2×2 card grid) | ✅ |
| `/about` | About me | ✅ |
| `/work/whether` | Case study: Whether | ✅ |
| `/work/mitchie-matcha` | Case study: Mitchie Matcha | ✅ |
| `/work/ar-glasses-retail` | Case study: AR Glasses for Retail | later |
| `/work/still` | Case study: Still | later |
| `/fridge` | Playground: open canvas of other works and interests | later |

Route slugs are placeholders. Confirm them with Rose.

### Out of scope for now
- Mobile and tablet layouts. The site is desktop-only until Rose designs mobile. Keep layout code breakpoint-ready, but don't guess mobile styles.
- Dark mode. The site is light mode only.
- CMS. Content lives in the repo.

### Priority order (Day 1 = Sep 29, 2026)
1. Project setup: Next.js, Tailwind tokens, fonts, GSAP smooth scroll
2. Shared layout: sidebar (identity, nav, vinyl player, links) and grid background
3. Home
4. Whether case study
5. Mitchie Matcha case study
6. About
7. Deploy to Vercel and connect the domain

## 4. Stack

- **Next.js** (App Router) with **TypeScript** (strict)
- **Tailwind CSS**, with tokens defined in the theme from the Figma variables only
- **GSAP** for all motion: ScrollSmoother or an equivalent smooth scroll, plus tweens. No other animation libraries.
- **Fonts:** Geist and Geist Mono (via the `geist` package or `next/font`); That That New Pixel Test (local font files, supplied by Rose)
- **Content:** case studies live in the repo. Build them from a shared case study template so new ones can be added by hand.
- Approved dependencies: `next`, `react`, `typescript`, `tailwindcss`, `gsap`, `@gsap/react`, `geist`. Ask before adding anything else.

## 5. Design tokens (from Figma variables)

Use these names exactly. Map them into the Tailwind theme with names that mirror the Figma paths.

### Colours
| Figma variable | Value |
|---|---|
| colours/surface/surface-50 | #2f2b29 at 50% (#2f2b2980) |
| colours/surface/surface-100 | #f8f4f6 |
| colours/surface/surface-110 | #f6f1ee |
| colours/surface/surface-150 | #746e6e |
| colours/surface/surface-200 | #1e1e1e (the "black" — use for all dark text, incl. titles) |
| colours/primary/primary-200 | #ff8aca (cursor + cursor labels) |
| colours/primary/primary-300 | #f30086 |

### Spacing (padding/*)
| Token | px |
|---|---|
| space-0 | 4 |
| space-1 | 8 |
| space-2 | 12 |
| space-3 | 16 |
| space-4 | 20 |
| space-5 | 24 |
| space-6 | 28 |
| space-7 | 32 |
| space-8 | 36 |
| space-10 | 44 |
| space-11 | 48 |
| space-13 | 60 |
| space-15 | 68 |
| space-17 | 76 |

### Typography (desktop/*)
| Token | Family / style | Size | Line height | Letter spacing |
|---|---|---|---|---|
| heading-lg | That That New Pixel Test, Italic Square | 36 | 100% | -2% |
| heading-md | That That New Pixel Test, Italic Square | 24 | 100% | -5% |
| body-xl | Geist Regular | 16 | 100% | 0 |
| body-md | Geist Regular | 14 | 100% | -2% |
| caption | Geist Mono Regular | 14 | 100% | 0 |
| caption-sm | Geist Mono Regular | 12 | 100% | 0 |
| title-xl | Geist Regular | 24 | 100% | 0 |
| title-lg | Geist Medium | 18 | 100% | 0 |
| label-lg | Geist Regular | 16 | 100% | 0 |
| body/16 (`type-body-16`) | Geist Regular | 16 | 141% | 0 |

All type tokens are weight 400. Letter spacing values are percentages (confirmed).

Approved exceptions (Rose):
- Sidebar captions (role line + tagline) keep -2% letter spacing even though the caption token is 0.
- Active nav item uses Geist Mono Bold.

### Effects
| Token | Value |
|---|---|
| sticker-shadow | drop shadow, #00000026, offset 0 2, blur 5.6, spread 0 |

This list comes from the Home frame only. Other frames may use more variables. Pull `get_variable_defs` for every new frame and add new tokens here. Never approximate them.

## 5b. Layout grid

- 12 columns, 36px outer margin, 36px gutter. At the 1512 design width, a column is 87px.
- The sidebar is 369px (margin + 3 columns). Large cards span 5 columns (579), small cards span 4 (456). This matches the Figma file exactly.
- Row gap between cards is 36px (same as the gutter).
- Card area starts 38px from the top (Rose: keep Figma's 38px).
- Fluid: columns stretch with the viewport; margins and gutters stay 36px.
- The sidebar is always fixed; only the card area scrolls.
- Build layout on this grid (CSS grid), not with absolute positioning.

## 5c. Case study pages (all case studies)

Every case study uses the same shell. Reference: Whether (Figma 973:1879, sidebar 973:1975).

**Side nav (required on every case study, same component: `CaseStudySidebar`)**
- Replaces the main sidebar (no vinyl player, no [WORK]/[ABOUT] nav).
- Top to bottom: `← BACK HOME` → 44px (space-10) → title (heading-lg, 141% line height, -5% tracking) → 20px (space-4) → summary (body-xl) → 76px (space-17) → section nav → footer.
- Section nav: 14px padding, 20px gap, Geist Mono 16 / -2% / uppercase, 21px line box; inactive rows are 17px tall (surface-150, hover primary-300); the active row shows a 9px primary-200 square (surface-200 text). Active item follows the scroll position; clicking smooth-scrolls to the section (first item scrolls to the top).
- Footer: `← PREVIOUS` / `READ NEXT →` (caption, surface-150), then contact links (24px gap).
- The side nav never scrolls. The block holding the section nav + footer is 530px tall and shrinks on short screens so the footer always stays visible with 36px bottom padding.

**Adding a case study**
1. Create `src/content/work/<slug>.tsx` exporting `meta` (title, summary, sections, previous/next, hero, details) and `Body`.
2. Register it in `src/content/work/index.ts`. It renders at `/work/<slug>`.
3. Section ids in `meta.sections` must match the `id`s in `Body` (each section: `tabIndex={-1}`, `outline-none`).
4. Build `Body` from `src/components/case-study/*` blocks; add new blocks there rather than one-off markup.
5. Content panel: surface-100, sticker-shadow, 36px padding, columns 4–12. Hero + header (`CaseStudyHeader`) come from `meta`.
6. Images go in `public/images/work/<slug>/` as WebP at 2x the Figma size.

## 6. Interactions and motion (GSAP)

| Feature | Behavior | Where |
|---|---|---|
| Smooth scroll | Slowed, smoothed scrolling on every page | Global |
| Vinyl record | Spins like a real record (constant ~33 RPM, eases up on play and winds down on pause — do NOT copy the Figma keyframes). Spins while music plays and stops or pauses when music pauses. Previous, play/pause, and next controls. Thumbnails switch tracks. A status line shows the state (for example "PAUSED: [song] — [artist]"). | Sidebar (all pages) |
| Letter/card tilt | On hover, the card tilts toward the cursor position | About |
| Card flip | On click, the card flips to its back | About |
| Nav (CONTENTS block) | Figma 1129:2538: "CONTENTS" label, then 01 [WORK] / 02 [ABOUT] / 03 [FRIDGE], all Geist Mono 14 (caption). Active = primary-200 square + surface-200 text; inactive = surface-150; dividers surface-10. Hovering the active [WORK] tab expands the case study list (Geist Mono, uppercase); rows highlight on hover (surface-110 fill, surface-200 text). Identity→nav gap 16, nav→player gap 44 (1110:2459). | Sidebar (home, about, fridge) |
| Fridge canvas | Open canvas of works and interests (spec TBD) | Fridge |
| Custom cursor | Site-wide 15×15 primary-200 square (Rose resized from Figma node 1040:2267) that follows the mouse smoothly (GSAP lerp) at all times. | Global |
| Case study cursor | On card hover, the cursor becomes a label frame. Whether and Mitchie Matcha: "VIEW CASE STUDY". AR Glasses: "COMING SOON". Still: "VIEW DESIGNATHON". Label frames: nodes 1036:2253, 1038:2261, 1038:2264. | Home |

Motion rules:
- Respect `prefers-reduced-motion`: turn off smooth scroll, tilt, and spinning, and make the flip instant.
- Card flip and tilt must also work from the keyboard (focusable; Enter or Space flips).
- Audio never autoplays.

## 7. Accessibility

Target: WCAG 2.2 AA.

Decisions from Rose:
- **primary-300 (#f30086)** is for hover states only. The active-nav marker uses primary-200 (matches the cursor). Don't use it for resting text.
- **surface-50 (50% alpha)** is for strokes and borders only.
- Text colours are intentional. Don't change them.
- Also required: semantic landmarks (nav, main), visible focus states, alt text on all case study images, and labelled player controls.

## 8. Working agreement

- Rose is hands-on. Keep changes small and reviewable, one page or component at a time.
- Before each task, list the Figma nodes you'll read, any annotations you found, the new tokens needed, and your open questions. Wait for approval.
- After each task, give a short summary of what changed and anything that differs from the Figma file.
- Use plain, direct language. No filler.
- Commits should be small and descriptive.

## 9. Decisions log

- Audio: self-hosted files in `/public/audio` (Rose's files).
- Email: m.rosengyn@gmail.com (overrides the Figma annotation).
- Shader covers (Whether, Still): export the shader background flat, then overlay Rose's GIF centered at the exact Figma size. No WebGPU shaders in the browser.
- Heavy media is converted for the web: GIFs → animated WebP (keeps transparency), videos → 1280px H.264 MP4 (muted, looping) with a poster frame.
- AR Glasses card uses Rose's inventory POV video as its cover.
- Case studies: all use the shared case study side nav and template (see §5c).
- All dark text uses surface-200 (#1e1e1e), even where a Figma frame shows #2f2b29 / text-black-light.
- Case study meta labels (ROLE, TIMELINE…) stay primary-300 as designed (Rose), despite ~3.7:1 contrast.
- Whether: previous → Still (disabled until its page exists), next → Mitchie Matcha. Feature buttons switch the embedded demo (whether-demo.vercel.app#home/#digitize/#personalize/#closet); up/down buttons step through features. The demo is loaded with `?embed=1` (source: ~/Desktop/clothing-demo/web, deployed to Vercel as whether-demo): phone only, transparent page, no reset pill; it posts `whether-demo:pointer` {x, y} to the parent so the pink square keeps following over the phone.
- Problem collages are flattened images; quote bubbles are live text laid over them.
- Repo: github.com/omnomrose/rosefolio-26 (Rose pushes; Claude's GitHub app isn't installed on it).
- Mitchie Matcha (973:19999 / 973:20089 / 973:20168): one page, three tabs (`meta.navigation: "tabs"`). The side nav switches tabs (URL hash = tab id); header details (415:3331 / 754:1048 / 767:1460) and image grid swap per tab; CONTEXT is shared. "/METRICS" dropped from the first tab label until metrics exist. Previous → Whether, next → AR Glasses.
- One header size for every case study (Whether's): hero 999 × 413, 172px title column, 668px details row.
- Case study images are Figma's own 2x PNG renders of each image layer (crops + image adjustments baked in), converted to WebP. The 20 Mitchie layers carry 2x PNG export settings; `public/images/work/mitchie-matcha/_figma-export/convert.py` maps layer names → WebP files.
- AR Glasses for Retail: placeholder page in the case study shell (nav "Coming soon", empty panel).
- About (973:1160; letter back 1100:2442): collage pinned to the content-area centre (positions in `src/content/about.ts`). Stickers and box items are draggable (GSAP Draggable): they follow the pointer 1:1 — no bounds, lift or easing — and stay where dropped. Letter tilts subtly (max 4°) and flips on click/Enter/Space; no flip hint (Rose). Back links (Instagram handles, contact links) are clickable once flipped. Design-system values only: letter shadow = sticker-shadow, card fill (both faces) = surface-100 (Rose; no paper texture), box heading = heading-lg, letter padding 40 → space-8, message gap 14.973 → space-3, back gap 38 → space-8. Images: Figma's 2x exports of the hifi layers with rotation + sticker-shadow baked in, placed at the layer's bounding box minus the shadow spread (5.6 left, 3.6 top); portrait is a 3x export; back logo is Rose's 2x PNG (shadow included) as WebP. `public/images/about/_figma-export/convert.py` makes the WebPs.

- Sidebar fit (Rose): below 908px viewport height the main sidebar compacts (smaller gaps, vinyl/covers scale via `--player-row`, min 160px) so contact links show without scrolling. Figma sizes apply at ≥908px.

## 10. Open questions

1. Resume: Google Drive link, coming later.
2. ~~Still card link~~ Decided: https://devpost.com/software/still-s1u0qt (opens in a new tab).
3. ~~Frame node IDs~~ About: 973:1160. Mitchie Matcha: 973:19999. Whether: 973:1879.
4. Fridge canvas behavior (later).
<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
- AR Glasses video always plays, including for reduced-motion users (Rose).
