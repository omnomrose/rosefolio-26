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
  return study ? { title: `${study.meta.title} — Rose Nguyen`, description: study.meta.summary } : {};
}

/*
 * Shared case study template: a sticker-shadow panel spanning columns 4–12 (1071px at 1512),
 * 36px padding, hero + header, then the study's own sections.
 */
export default async function CaseStudyPage({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const study = caseStudyPages[slug];
  if (!study) notFound();
  const { meta, Body } = study;

  return (
    <article className="flex w-full flex-col bg-surface-100 p-space-8 shadow-sticker">
      <CaseStudyHeader meta={meta} />
      <Body />
    </article>
  );
}
