import type { ComponentType } from "react";

/*
 * Shared case study template. Each case study supplies:
 * - `meta`: data for the sidebar, hero and header (rendered by the template)
 * - `Body`: the sections below the header, built from components/case-study blocks
 * Section ids in `meta.sections` must match the `id`s used in `Body`.
 */
export type CaseStudySection = { id: string; label: string };

export type Wayfinder = { label: string; href?: string };

export type CaseStudyMeta = {
  slug: string;
  title: string;
  /** Sidebar blurb under the title. */
  summary: string;
  sections: CaseStudySection[];
  previous: Wayfinder;
  next: Wayfinder;
  hero: {
    background: string;
    /** Animated WebP overlay, cropped/placed exactly as in Figma. */
    overlay: string;
    alt: string;
  };
  details: { label: string; values: string[] }[];
};

export type CaseStudyPage = { meta: CaseStudyMeta; Body: ComponentType };
