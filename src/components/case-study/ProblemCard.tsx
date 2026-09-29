import Image from "next/image";
import type { ReactNode } from "react";

/*
 * Problem collage (Figma "Group 9" 973:1952 / "Group 11" 973:1962): photo + stickers are one
 * flattened image; the quote bubble is live text laid exactly over the baked-in bubble so it stays
 * crisp and is read by screen readers. Width caps at the Figma 456px so the bubbles stay aligned.
 */
export default function ProblemCard({
  image,
  alt,
  caption,
  quote,
  quotePosition,
}: {
  image: string;
  alt: string;
  caption: string;
  quote: ReactNode;
  quotePosition: { left: string; top: string };
}) {
  return (
    <figure className="flex w-full max-w-[456px] flex-col items-center gap-space-5">
      <div className="relative aspect-[456/289] w-full">
        <Image src={image} alt={alt} fill sizes="456px" className="object-cover" />
        <p
          className="type-caption absolute block border border-surface-200 bg-surface-100 p-[10px] text-center whitespace-nowrap text-surface-200 uppercase"
          style={quotePosition}
        >
          {quote}
        </p>
      </div>
      <figcaption className="type-body-16 w-full text-center text-surface-200">{caption}</figcaption>
    </figure>
  );
}
