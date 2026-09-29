import Image from "next/image";
import LetterCard from "@/components/about/LetterCard";
import Sticker from "@/components/about/Sticker";
import { box, boxHeading, boxItems, stageHeight, stickersAbove, stickersBelow } from "@/content/about";

/*
 * About (Figma 973:1160). A collage stage over the content area (columns 4–12): the letter card
 * in the middle, draggable stickers around it, and the box of things below.
 * Stacking follows the Figma layer order.
 */
export default function About() {
  return (
    <>
      <h1 className="sr-only">About Rose Nguyen</h1>
      <div data-collage className="relative overflow-x-clip" style={{ height: stageHeight }}>
        {stickersBelow.map((item) => (
          <Sticker key={item.src} item={item} />
        ))}

        <LetterCard />

        <h2
          className="type-heading-lg absolute flex items-center justify-center whitespace-nowrap text-surface-200"
          style={{ left: `calc(50% + ${boxHeading.x}px)`, top: boxHeading.y, width: boxHeading.w, height: boxHeading.h }}
        >
          When I’m not hunched over my laptop I am:
        </h2>
        <div
          className="absolute"
          style={{ left: `calc(50% + ${box.x}px)`, top: box.y, width: box.w, height: box.h }}
        >
          <Image src={box.src} alt="" fill sizes="726px" className="pointer-events-none object-cover" />
        </div>

        {/* Top stickers and box items never overlap, so one layer each is enough. */}
        {[...stickersAbove, ...boxItems].map((item) => (
          <Sticker key={item.src} item={item} />
        ))}
      </div>
    </>
  );
}
