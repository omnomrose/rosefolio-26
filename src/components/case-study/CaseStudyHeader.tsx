import Image from "next/image";
import type { CaseStudyHero, CaseStudyMeta, DetailGroup } from "@/content/work/types";
import TabPanel from "./TabPanel";

/*
 * Hero thumbnail (973:1972) + case study header (973:1880). One size for every case study
 * (Rose): hero box 413 tall across the content width, title column + 668px details row.
 */
export default function CaseStudyHeader({ meta }: { meta: CaseStudyMeta }) {
  const tabs = meta.navigation === "tabs";
  const tabIds = meta.sections.map((s) => s.id);

  return (
    <header className="flex w-full flex-col gap-space-11">
      {meta.hero && <Hero hero={meta.hero} wide={meta.inset === "wide"} />}

      <div className="flex w-full flex-col gap-space-11">
        <div className="flex w-full items-start justify-between gap-space-8">
          <h1 className="type-heading-lg min-w-[172px] shrink-0 whitespace-nowrap text-surface-200">{meta.title}</h1>
          {tabs ? (
            meta.sections.map((section) => (
              <TabPanel key={section.id} id={section.id} tabIds={tabIds}>
                <Details details={section.details ?? []} />
              </TabPanel>
            ))
          ) : (
            <Details details={meta.details ?? []} />
          )}
        </div>
        {/* Figma "Line 1" is #d9d9d9 (not a variable) — design system colours only (Rose): surface-10. */}
        <hr className="h-px w-full border-0 bg-surface-10" />
      </div>
    </header>
  );
}

function Hero({ hero, wide }: { hero: CaseStudyHero; wide: boolean }) {
  // 413px tall in Figma at either content width: 999 (standard) or 927 (wide inset).
  const box = wide ? "aspect-[927/413]" : "aspect-[999/413]";
  if (hero.kind === "photo") {
    return (
      <div className={`relative w-full overflow-hidden ${box}`}>
        <Image src={hero.src} alt={hero.alt} fill priority sizes="(min-width: 1512px) 999px, 66vw" className="object-cover" />
      </div>
    );
  }
  // Shader background is a flat export; Rose's animated WebP sits on top at the exact Figma
  // box (573.568 × 394.59 at 213, 18 inside 999 × 413), cropped the same way (122.3% wide, −11.15%).
  return (
    <div className={`relative w-full overflow-hidden ${box}`}>
      <Image src={hero.background} alt="" fill priority sizes="(min-width: 1512px) 999px, 66vw" className="object-cover" />
      <div className="absolute bottom-0 left-[21.32%] aspect-[573.568/394.59] h-[95.54%] overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={hero.overlay} alt={hero.alt} className="absolute top-0 left-[-11.15%] h-full w-[122.3%] max-w-none" />
      </div>
    </div>
  );
}

function Details({ details }: { details: DetailGroup[] }) {
  return (
    <dl className="flex w-[668px] items-start justify-between">
      {details.map((group) => (
        <div key={group.label} className={`flex flex-col gap-space-4 ${group.label === "Timeline" ? "w-[168px]" : ""}`}>
          <dt className="type-caption text-primary-300 uppercase">{group.label}</dt>
          <dd className="flex flex-col gap-space-2">
            {group.values.map((value) => (
              <span key={value} className="type-body-16 whitespace-nowrap text-surface-150">
                {value}
              </span>
            ))}
          </dd>
        </div>
      ))}
    </dl>
  );
}
