import Image from "next/image";
import type { ReactNode } from "react";

/*
 * Pain point illustration + caption (AR Glasses 1158:2597 / 2598 / 2599, row 1158:2600).
 * Column width = caption width (267 / 300 / 300); the illustration (flattened 2x export at its
 * Figma size) is centred over a left-aligned desktop/body-xl caption in surface-200.
 * Figma's image → caption gaps (58 / 30 / 40) are unified to space-5, like ProblemCard.
 */
export default function PainPoint({
  image,
  alt,
  width,
  height,
  captionWidth,
  children,
}: {
  image: string;
  alt: string;
  /** Figma layer size in px (the export is 2x). */
  width: number;
  height: number;
  /** Figma caption/column width in px. */
  captionWidth: number;
  children: ReactNode;
}) {
  return (
    <figure className="flex min-w-0 shrink flex-col items-center gap-space-5" style={{ width: captionWidth }}>
      <div className="relative max-w-full" style={{ width, aspectRatio: `${width} / ${height}` }}>
        <Image src={image} alt={alt} fill sizes={`${Math.ceil(width)}px`} className="object-contain" />
      </div>
      <figcaption className="type-body-xl w-full text-left text-surface-200">{children}</figcaption>
    </figure>
  );
}
