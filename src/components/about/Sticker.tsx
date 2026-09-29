"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";
import { useGSAP } from "@gsap/react";
import type { CollageItem } from "@/content/about";

gsap.registerPlugin(Draggable, useGSAP);

/*
 * A draggable collage sticker: Figma's export of the layer (rotation + sticker-shadow baked in),
 * placed where Figma renders it. While dragged it follows the pointer exactly and sits above everything.
 */
export default function Sticker({ item }: { item: CollageItem }) {
  const ref = useRef<HTMLDivElement | null>(null);

  useGSAP(() => {
    const el = ref.current;
    if (!el) return;
    // 1:1 with the pointer: no bounds, no inertia, no easing, no lift. It stays where it's dropped.
    Draggable.create(el, { type: "x,y", zIndexBoost: true, minimumMovement: 0 });
  });

  return (
    <div
      ref={ref}
      className="absolute touch-none select-none"
      style={{ left: `calc(50% + ${item.x}px)`, top: item.y, width: item.w, height: item.h }}
    >
      <div className="relative size-full">
        <Image
          src={item.src}
          alt={item.alt}
          fill
          draggable={false}
          sizes={`${Math.ceil(item.w)}px`}
          className="pointer-events-none"
        />
      </div>
    </div>
  );
}
