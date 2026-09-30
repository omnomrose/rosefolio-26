import type { ComponentType } from "react";

/*
 * Shared case study template. Each case study supplies:
 * - `meta`: data for the sidebar, hero and header (rendered by the template)
 * - `Body`: the content below the header, built from components/case-study blocks
 * Section ids in `meta.sections` must match the `id`s used in `Body`.
 */
export type DetailGroup = { label: string; values: string[] };

export type CaseStudySection = {
  id: string;
  label: string;
  /** Tabs mode only: header details shown while this tab is active. */
  details?: DetailGroup[];
};

export type Wayfinder = { label: string; href?: string };

export type CaseStudyHero =
  /** Flat background with an animated WebP laid over it (Whether). */
  | { kind: "overlay"; background: string; overlay: string; alt: string }
  /** A single photo, cropped to the shared hero box. */
  | { kind: "photo"; src: string; alt: string };

export type CaseStudyMeta = {
  slug: string;
  title: string;
  /** Sidebar blurb under the title. */
  summary: string;
  /**
   * "scroll" (default): the side nav scroll-spies one long page.
   * "tabs": the side nav switches between sections; one shows at a time (URL hash = tab id).
   */
  navigation?: "scroll" | "tabs";
  sections: CaseStudySection[];
  previous: Wayfinder;
  next: Wayfinder;
  /**
   * Content panel side padding. "standard" (default): 36px (space-8), content 999 wide.
   * "wide": 72px (space-16), content 927 wide — Whether (Figma 1029:1722).
   */
  inset?: "standard" | "wide";
  /** Omit for placeholder pages (no hero or header). */
  hero?: CaseStudyHero;
  /** Scroll mode header details. Tabs mode uses each section's `details`. */
  details?: DetailGroup[];
};

export type CaseStudyPage = { meta: CaseStudyMeta; Body: ComponentType };
