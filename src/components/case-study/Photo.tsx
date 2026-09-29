import Image from "next/image";

/*
 * A case study image in a fixed-ratio box. Files are Figma's own 2x renders of each image layer
 * (crop + image adjustments baked in), so object-cover is a no-op at the design ratio.
 * Size and ratio come from the parent layout via `className`.
 */
export default function Photo({
  src,
  alt,
  className = "",
  sizes = "(min-width: 1512px) 496px, 33vw",
}: {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
}) {
  return (
    <div className={`relative min-h-0 overflow-hidden ${className}`}>
      <Image src={src} alt={alt} fill sizes={sizes} className="object-cover" />
    </div>
  );
}
