"use client";

import Image from "next/image";
import Link from "next/link";
import type { CaseStudy } from "@/content/caseStudies";
import { useCursorLabel } from "./Cursor";

// Cover aspect ratios from Figma: large 548×389, small 424×389.
const coverAspect = { large: "aspect-[548/389]", small: "aspect-[424/389]" } as const;
const span = { large: "col-span-5", small: "col-span-4" } as const;
const videoPosition = { left: "object-left", center: "object-center", right: "object-right" } as const;

export default function CaseStudyCard({ study }: { study: CaseStudy }) {
  const { setLabel } = useCursorLabel();
  const { cover } = study;

  const body = (
    <>
      <div className={`relative w-full overflow-hidden ${coverAspect[study.size]}`}>
        {cover.kind === "photo" ? (
          <Image
            src={cover.src}
            alt={cover.alt}
            fill
            sizes="(min-width: 1512px) 40vw, 45vw"
            className={`object-cover ${cover.rounded ? "rounded-1" : ""}`}
          />
        ) : cover.kind === "video" ? (
          <video
            src={cover.src}
            poster={cover.poster}
            aria-label={cover.alt}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className={`absolute inset-0 size-full object-cover ${videoPosition[cover.position ?? "center"]}`}
          />
        ) : (
          <>
            <Image src={cover.background} alt="" fill sizes="(min-width: 1512px) 40vw, 45vw" className="object-cover" />
            {/* Rose's GIF, centred at the exact size used in Figma. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={cover.gif}
              alt={cover.alt}
              className="absolute top-1/2 left-1/2 max-w-none -translate-x-1/2 -translate-y-1/2 object-cover"
              style={{ width: cover.width, height: cover.height }}
            />
          </>
        )}
      </div>

      <div className="flex min-h-[99px] w-full flex-col justify-between gap-space-5">
        <div className="flex w-full items-center justify-between gap-space-2">
          <h2 className="type-heading-md text-surface-200">{study.title}</h2>
          <ul className="flex items-center gap-space-2">
            {study.tags.map((tag) => (
              <li
                key={tag}
                className="type-caption-sm flex items-center justify-center rounded-1 border border-surface-50 bg-surface-100 p-space-1 whitespace-nowrap text-surface-150 uppercase"
              >
                {tag}
              </li>
            ))}
          </ul>
        </div>
        <p className={`type-body-xl text-surface-150 ${study.size === "large" ? "max-w-[432px]" : ""}`}>
          {study.description}
        </p>
      </div>
    </>
  );

  const cardClass = `${span[study.size]} flex flex-col gap-space-5 bg-surface-110 px-space-3 pt-space-3 pb-space-7 shadow-sticker`;
  const hoverProps = {
    onPointerEnter: () => setLabel(study.cursor),
    onPointerLeave: () => setLabel(null),
  };

  if (study.href?.startsWith("http")) {
    return (
      <a href={study.href} target="_blank" rel="noopener noreferrer" className={cardClass} {...hoverProps}>
        {body}
      </a>
    );
  }

  if (study.href) {
    return (
      <Link href={study.href} className={cardClass} {...hoverProps}>
        {body}
      </Link>
    );
  }

  return (
    <article className={cardClass} {...hoverProps} aria-label={`${study.title} — ${study.cursor.toLowerCase()}`}>
      {body}
    </article>
  );
}
