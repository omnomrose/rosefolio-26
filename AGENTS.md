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

### Typography (desktop/*)
| Token | Family / style | Size | Line height | Letter spacing |
|---|---|---|---|---|
| heading-lg | That That New Pixel Test, Italic Square | 36 | 100% | -2% |
| heading-md | That That New Pixel Test, Italic Square | 24 | 100% | -5% |
| body-xl | Geist Regular | 16 | 100% | 0 |
| caption | Geist Mono Regular | 14 | 100% | 0 |
| caption-sm | Geist Mono Regular | 12 | 100% | 0 |

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

## 6. Interactions and motion (GSAP)

| Feature | Behavior | Where |
|---|---|---|
| Smooth scroll | Slowed, smoothed scrolling on every page | Global |
| Vinyl record | Spins like a real record (constant ~33 RPM, eases up on play and winds down on pause — do NOT copy the Figma keyframes). Spins while music plays and stops or pauses when music pauses. Previous, play/pause, and next controls. Thumbnails switch tracks. A status line shows the state (for example "PAUSED: [song] — [artist]"). | Sidebar (all pages) |
| Letter/card tilt | On hover, the card tilts toward the cursor position | About |
| Card flip | On click, the card flips to its back | About |
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
- **primary-300 (#f30086)** is for hover states (and the active-nav marker) only. Don't use it for resting text.
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
- Repo: github.com/omnomrose/rosefolio-26 (Rose pushes; Claude's GitHub app isn't installed on it).

## 10. Open questions

1. Resume: Google Drive link, coming later.
2. ~~Still card link~~ Decided: https://devpost.com/software/still-s1u0qt (opens in a new tab).
3. Frame node IDs for About, Whether, and Mitchie Matcha pages.
4. Fridge canvas behavior (later).
<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
- AR Glasses video always plays, including for reduced-motion users (Rose).
