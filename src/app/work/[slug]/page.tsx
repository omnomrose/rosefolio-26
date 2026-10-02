import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CaseStudyHeader from "@/components/case-study/CaseStudyHeader";
import { caseStudyPages } from "@/content/work";

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(caseStudyPages).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const study = caseStudyPages[slug];
  // Tab title stays the site title on every page (Rose); only the description is per study.
  return study ? { description: study.meta.summary } : {};
}

/*
 * Shared case study template: a sticker-shadow panel spanning columns 4–12 (1071px at 1512),
 * 36px top/bottom + 72px side padding (space-8 / space-16; Figma 1029:1722), content 927 wide,
 * then hero + header and the study's own sections.
 */
export default async function CaseStudyPage({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const study = caseStudyPages[slug];
  if (!study) notFound();
  const { meta, Body } = study;

  return (
    // Fills at least the viewport so placeholder pages (no hero) still read as a panel.
    <article className="flex min-h-[calc(100dvh-2*var(--spacing-space-8))] w-full flex-col bg-surface-100 px-space-16 py-space-8 shadow-sticker">
      {meta.hero && <CaseStudyHeader meta={meta} />}
      <Body />
    </article>
  );
}
