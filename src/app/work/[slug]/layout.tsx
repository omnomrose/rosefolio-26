import { notFound } from "next/navigation";
import SmoothScroll from "@/components/SmoothScroll";
import CaseStudySidebar from "@/components/case-study/CaseStudySidebar";
import { caseStudyPages } from "@/content/work";

// Case studies swap the main sidebar for their own (Figma 973:1975).
export default async function CaseStudyLayout({ children, params }: LayoutProps<"/work/[slug]">) {
  const { slug } = await params;
  const study = caseStudyPages[slug];
  if (!study) notFound();

  return (
    <>
      <CaseStudySidebar meta={study.meta} />
      <SmoothScroll>
        <main className="min-h-screen pt-space-8 pr-space-8 pb-space-8 pl-[calc(var(--sidebar-width)+var(--grid-gutter))]">
          {children}
        </main>
      </SmoothScroll>
    </>
  );
}
