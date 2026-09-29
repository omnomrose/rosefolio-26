import Image from "next/image";
import type { CaseStudyMeta } from "@/content/work/types";

/*
 * Hero thumbnail (973:1972) + case study header (973:1880).
 * Shader background is a flat export; Rose's animated WebP sits on top at the exact Figma
 * box (573.568 × 394.59 at 213, 18 inside 999 × 413), cropped the same way (122.3% wide, −11.15%).
 */
export default function CaseStudyHeader({ meta }: { meta: CaseStudyMeta }) {
  return (
    <header className="flex w-full flex-col gap-space-11">
      <div className="relative aspect-[999/413] w-full overflow-hidden">
        <Image src={meta.hero.background} alt="" fill priority sizes="(min-width: 1512px) 999px, 66vw" className="object-cover" />
        <div className="absolute bottom-0 left-[21.32%] aspect-[573.568/394.59] h-[95.54%] overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={meta.hero.overlay}
            alt={meta.hero.alt}
            className="absolute top-0 left-[-11.15%] h-full w-[122.3%] max-w-none"
          />
        </div>
      </div>

      <div className="flex w-full flex-col gap-space-11">
        <div className="flex w-full items-start justify-between gap-space-8">
          <h1 className="type-heading-lg w-[172px] shrink-0 text-surface-200">{meta.title}</h1>
          <dl className="flex w-[668px] items-start justify-between">
            {meta.details.map((group) => (
              <div
                key={group.label}
                className={`flex flex-col gap-space-4 ${group.label === "Timeline" ? "w-[168px]" : ""}`}
              >
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
        </div>
        {/* Figma "Line 1" is #d9d9d9 (not a variable) — using surface-10 until Rose confirms. */}
        <hr className="h-px w-full border-0 bg-surface-10" />
      </div>
    </header>
  );
}
