import Image from "next/image";
import type { ReactNode } from "react";

/*
 * Pain point illustration + caption (AR Glasses 1158:2597 / 2598 / 2599). The illustration is a
 * flattened 2x export at its Figma size; captions are body/16 surface-200, centred.
 * Figma's image → caption gaps (58 / 30 / 40) are unified to space-5, like ProblemCard.
 */
export default function PainPoint({
  image,
  alt,
  width,
  height,
  children,
}: {
  image: string;
  alt: string;
  /** Figma layer size in px (the export is 2x). */
  width: number;
  height: number;
  children: ReactNode;
}) {
  return (
    <figure className="flex min-w-0 flex-1 flex-col items-center gap-space-5">
      <div className="relative max-w-full" style={{ width, aspectRatio: `${width} / ${height}` }}>
        <Image src={image} alt={alt} fill sizes={`${width}px`} className="object-contain" />
      </div>
      <figcaption className="type-body-16 w-[300px] max-w-full text-center text-surface-200">{children}</figcaption>
    </figure>
  );
}
