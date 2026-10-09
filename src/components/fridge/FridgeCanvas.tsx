"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { RING_DURATION, fridgeItems, fridgeTexture } from "@/content/fridge";
import FridgeLightbox from "./FridgeLightbox";

gsap.registerPlugin(useGSAP);

const N = fridgeItems.length;
/** Share of each piece's slot on the ring that the piece fills (the rest is breathing room). */
const FILL = 0.78;
/** Clear space between the ring and the content area's edges: space-8 (36). */
const EDGE = 36;
const HOVER_SCALE = 1.08;

const reducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/*
 * Fridge: the pieces circle the middle of the content area, upright, one slow turn every
 * RING_DURATION seconds (after fancycomponents.dev "Circling Elements", built with GSAP).
 * Hovering or focusing a piece eases the ring to a stop and lifts the piece; click/Enter opens
 * it centred in the lightbox. Videos play muted in the ring. The ring sizes itself to the
 * viewport: radius and piece size are solved together so pieces never crowd each other.
 * Reduced motion: the ring stays still.
 */
export default function FridgeCanvas() {
  const ringRef = useRef<HTMLDivElement | null>(null);
  const sidebarProbeRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);
  const spinRef = useRef<gsap.core.Tween | null>(null);
  // The open piece and the button it came from (the lightbox flies to/from it).
  const [open, setOpen] = useState<{ id: string; source: HTMLElement } | null>(null);
  const openItem = fridgeItems.find((it) => it.id === open?.id) ?? null;

  useGSAP(() => {
    const ring = ringRef.current;
    if (!ring) return;
    const items = itemRefs.current.filter((el): el is HTMLLIElement => el !== null);
    gsap.set(items, { xPercent: -50, yPercent: -50 });
    const setX = items.map((el) => gsap.quickSetter(el, "x", "px"));
    const setY = items.map((el) => gsap.quickSetter(el, "y", "px"));
    const state = { angle: 0, radius: 0 };

    const place = () => {
      items.forEach((_, i) => {
        const theta = (i / N) * Math.PI * 2 - Math.PI / 2 + state.angle;
        setX[i](Math.cos(theta) * state.radius);
        setY[i](Math.sin(theta) * state.radius);
      });
    };

    // Ring centre = content area centre. Each piece gets an equal slot of the circumference
    // (2πr / N) and fills FILL of it, so: r = (min(w, h) / 2 − EDGE) / (1 + FILL·π / N).
    const layout = () => {
      const left = sidebarProbeRef.current?.offsetWidth ?? 0;
      const w = window.innerWidth - left;
      const h = window.innerHeight;
      gsap.set(ring, { left: left + w / 2, top: h / 2 });
      const radius = (Math.min(w, h) / 2 - EDGE) / (1 + (FILL * Math.PI) / N);
      state.radius = radius;
      ring.style.setProperty("--piece", `${(FILL * 2 * Math.PI * radius) / N}px`);
      place();
    };
    layout();

    spinRef.current = gsap.to(state, {
      angle: Math.PI * 2,
      duration: RING_DURATION,
      ease: "none",
      repeat: -1,
      onUpdate: place,
      paused: reducedMotion(),
    });

    window.addEventListener("resize", layout);
    return () => window.removeEventListener("resize", layout);
  });

  // Ease the ring to a stop / back up to speed.
  const setSpinning = (on: boolean) => {
    const spin = spinRef.current;
    if (!spin || reducedMotion()) return;
    gsap.to(spin, { timeScale: on ? 1 : 0, duration: on ? 0.8 : 0.5, ease: on ? "power2.in" : "power2.out", overwrite: true });
  };

  const lift = (el: HTMLElement, on: boolean) => {
    gsap.to(el, { scale: on ? HOVER_SCALE : 1, duration: reducedMotion() ? 0 : 0.3, ease: "power2.out" });
    // Lifted piece sits above its neighbours.
    const li = el.parentElement;
    if (li) li.style.zIndex = on ? "1" : "";
  };

  // The ring stays stopped while the lightbox is open so the piece flies back to the right spot.
  useEffect(() => {
    const spin = spinRef.current;
    if (!spin || reducedMotion()) return;
    if (open) {
      gsap.killTweensOf(spin);
      spin.timeScale(0);
    } else {
      gsap.to(spin, { timeScale: 1, duration: 0.8, ease: "power2.in", overwrite: true });
    }
  }, [open]);

  // After closing, focus goes back to the piece (once the ring is no longer inert).
  const returnFocusRef = useRef<HTMLElement | null>(null);
  const closeLightbox = () => {
    if (open) {
      returnFocusRef.current = open.source;
      lift(open.source, false);
    }
    setOpen(null);
  };
  useEffect(() => {
    if (open || !returnFocusRef.current) return;
    returnFocusRef.current.focus({ preventScroll: true });
    returnFocusRef.current = null;
  }, [open]);

  return (
    <>
      {/* Measures --sidebar-width so the ring centres on the content area. */}
      <div ref={sidebarProbeRef} aria-hidden="true" className="pointer-events-none invisible fixed top-0 left-0 h-0 w-[var(--sidebar-width)]" />

      <div
        inert={open !== null}
        className="fixed inset-0 overflow-hidden bg-surface-100 bg-center bg-repeat"
        style={{
          backgroundImage: `image-set(url(${fridgeTexture.src}) 1x, url(${fridgeTexture.src2x}) 2x)`,
          backgroundSize: `${fridgeTexture.w}px ${fridgeTexture.h}px`,
        }}
      >
        <p id="fridge-hint" className="sr-only">
          Select a piece to see it larger.
        </p>

        <div ref={ringRef} className="absolute size-0">
          {/* Centre of the ring (Figma 1226:289): heading-xl → space-2 → label-lg, centred. */}
          <div className="absolute top-0 left-0 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-space-2 text-center whitespace-nowrap text-surface-200">
            <h1 className="type-heading-xl">Hungry for more?</h1>
            <p className="type-label-lg uppercase">These are some things I’ve made as of late</p>
          </div>

          <ul aria-label="Playground" aria-describedby="fridge-hint" className="absolute top-0 left-0 size-0">
            {fridgeItems.map((item, i) => {
              const longest = Math.max(item.w, item.h);
              return (
                <li
                  key={item.id}
                  ref={(el) => {
                    itemRefs.current[i] = el;
                  }}
                  className="absolute top-0 left-0"
                  style={{
                    width: `calc(var(--piece) * ${item.w / longest})`,
                    height: `calc(var(--piece) * ${item.h / longest})`,
                  }}
                >
                  <button
                    type="button"
                    aria-label={`View: ${item.alt}`}
                    aria-haspopup="dialog"
                    onClick={(e) => setOpen({ id: item.id, source: e.currentTarget })}
                    onPointerEnter={(e) => {
                      setSpinning(false);
                      lift(e.currentTarget, true);
                    }}
                    onPointerLeave={(e) => {
                      if (open) return;
                      setSpinning(true);
                      lift(e.currentTarget, false);
                    }}
                    onFocus={(e) => {
                      if (!e.currentTarget.matches(":focus-visible")) return;
                      setSpinning(false);
                      lift(e.currentTarget, true);
                    }}
                    onBlur={(e) => {
                      if (open) return;
                      setSpinning(true);
                      lift(e.currentTarget, false);
                    }}
                    className={`relative block size-full overflow-hidden ${item.rounded ?? ""}`}
                    style={{ visibility: open?.id === item.id ? "hidden" : undefined }}
                  >
                    {item.kind === "image" ? (
                      <Image src={item.src} alt="" fill draggable={false} sizes="200px" className="pointer-events-none object-cover" />
                    ) : (
                      <video
                        src={item.src}
                        poster={item.poster}
                        aria-hidden="true"
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="metadata"
                        className="pointer-events-none absolute inset-0 size-full object-cover"
                      />
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      {openItem && open && (
        <FridgeLightbox key={openItem.id} item={openItem} source={open.source} onClosed={closeLightbox} />
      )}
    </>
  );
}
