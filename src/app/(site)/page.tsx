import CaseStudyCard from "@/components/CaseStudyCard";
import { caseStudies } from "@/content/caseStudies";

export default function Home() {
  return (
    <>
      <h1 className="sr-only">Rose Nguyen — selected work</h1>
      {/* Columns 4–12 of the 12-column grid: 9 columns, 36px gutters. */}
      <div className="grid grid-cols-9 gap-space-8">
        {caseStudies.map((study) => (
          <CaseStudyCard key={study.slug} study={study} />
        ))}
      </div>
    </>
  );
}
