import Image from "next/image";
import type { ReactNode } from "react";

/*
 * Problem collage (Figma "Group 9" 973:1952 / "Group 11" 973:1962): photo + stickers are one
 * flattened 2x image, quote bubble included (so it scales with the card at any width).
 * The quote is repeated as screen-reader text. Figma card: 420 × 266.18.
 */
export default function ProblemCard({
  image,
  alt,
  caption,
  quote,
}: {
  image: string;
  alt: string;
  caption: string;
  quote: ReactNode;
}) {
  return (
    <figure className="flex w-full max-w-[420px] flex-col items-center gap-space-5">
      <div className="relative aspect-[456/289] w-full">
        <Image src={image} alt={alt} fill sizes="420px" className="object-cover" />
        <p className="sr-only">{quote}</p>
      </div>
      <figcaption className="type-body-16 w-full text-center text-surface-200">{caption}</figcaption>
    </figure>
  );
}
