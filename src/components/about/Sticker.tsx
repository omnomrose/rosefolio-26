"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";
import { InertiaPlugin } from "gsap/InertiaPlugin";
import { useGSAP } from "@gsap/react";
import { useCursor } from "@/components/Cursor";
import type { CollageItem } from "@/content/about";

gsap.registerPlugin(Draggable, InertiaPlugin, useGSAP);

/*
 * A draggable collage sticker: Figma's export of the layer (rotation + sticker-shadow baked in),
 * placed where Figma renders it.
 *
 * Drag feel follows Fancy Components' Drag Elements (rebuilt in GSAP, no motion dependency):
 * - Held: follows the pointer 1:1, and the custom cursor is pinned to the pointer so the two move together.
 * - Picked sticker comes to the front (zIndexBoost).
 * - Collage edges are soft: half resistance past them (Fancy's dragElastic 0.5).
 * - Released: keeps its momentum, glides to a stop, and settles back inside the collage if thrown out.
 * Reduced motion: no momentum; it stays where it's dropped.
 */
export default function Sticker({ item }: { item: CollageItem }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const { setPinned } = useCursor();

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      Draggable.create(el, {
        type: "x,y",
        bounds: el.closest("[data-collage]") ?? undefined,
        edgeResistance: 0.5,
        inertia: !reduced,
        // A firm, low-bounce settle (Fancy: bounceStiffness 200, bounceDamping 300).
        overshootTolerance: 0.25,
        zIndexBoost: true,
        minimumMovement: 0,
        onPress: () => setPinned(true),
        onRelease: () => setPinned(false),
      });
      return () => setPinned(false);
    },
    { dependencies: [setPinned] },
  );

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
