"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import type { FridgeItem } from "@/content/fridge";

/** Clear space around the centred piece: space-16 (72) on every side, plus the controls row. */
const EDGE = 72;
const CONTROLS = 46 + 24; // button height + space-5 gap

/*
 * Fridge lightbox: the clicked piece flies from its spot on the canvas to the centre (FLIP),
 * shown at up to 2x its Figma size. Videos pick up where the ring copy was and start muted;
 * SOUND toggles audio (videos with sound only). Pieces with `sides` (the T-shirt) open as panels
 * side by side: the side shown in the ring flies in, the others fade in next to it.
 * Close with CLOSE, Esc, or a click outside.
 */
export default function FridgeLightbox({
  item,
  source,
  onClosed,
}: {
  item: FridgeItem;
  source: HTMLElement | null;
  onClosed: () => void;
}) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const backdropRef = useRef<HTMLDivElement | null>(null);
  const figureRef = useRef<HTMLDivElement | null>(null);
  const controlsRef = useRef<HTMLDivElement | null>(null);
  const firstButtonRef = useRef<HTMLButtonElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const closingRef = useRef(false);
  const [soundOn, setSoundOn] = useState(false);
  const isVideo = item.kind === "video";
  const hasSound = item.kind === "video" && item.audio !== false;
  const sides = item.kind === "image" ? item.sides : undefined;
  const coverSide = item.kind === "image" ? (item.coverSide ?? 0) : 0;
  const sideRefs = useRef<(HTMLDivElement | null)[]>([]);
  /** The element that flies to/from the ring: the whole figure, or the cover side's panel. */
  const flyer = () => (sides ? sideRefs.current[coverSide] : figureRef.current);
  /** Side panels that fade in/out beside the flyer. */
  const others = () => (sides ? sideRefs.current.filter((el, i) => el && i !== coverSide) : []);

  const duration = () => (window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 1);
  const sourceVideo = () => source?.querySelector("video") ?? null;

  // Open: fly in from the canvas position.
  useLayoutEffect(() => {
    const figure = flyer();
    if (!figure) return;
    const d = duration();

    const canvasVideo = sourceVideo();
    if (videoRef.current && canvasVideo) {
      videoRef.current.currentTime = canvasVideo.currentTime;
      videoRef.current.play().catch(() => {});
    }

    const tl = gsap.timeline();
    tl.fromTo(backdropRef.current, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.4 * d, ease: "power2.out" }, 0);
    if (source) {
      const from = source.getBoundingClientRect();
      const to = figure.getBoundingClientRect();
      tl.fromTo(
        figure,
        { x: from.left - to.left, y: from.top - to.top, scale: from.width / to.width },
        { x: 0, y: 0, scale: 1, duration: 0.55 * d, ease: "power3.inOut" },
        0,
      );
    }
    others().forEach((el) => {
      const dir = sideRefs.current.indexOf(el) < coverSide ? -1 : 1;
      tl.fromTo(el, { opacity: 0, x: 24 * dir }, { opacity: 1, x: 0, duration: 0.4 * d, ease: "power2.out" }, 0.3 * d);
    });
    // Opacity only (not visibility), so the first button can take focus straight away.
    tl.fromTo(controlsRef.current, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.3 * d, ease: "power2.out" }, 0.35 * d);
    firstButtonRef.current?.focus({ preventScroll: true });
    return () => {
      tl.kill();
    };
    // Runs once per opened piece (the lightbox is keyed by item id).
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // React only sets `muted` on first render, so keep it in sync by hand.
  useEffect(() => {
    if (videoRef.current) videoRef.current.muted = !soundOn;
  }, [soundOn]);

  // Close: fly back to the canvas spot, then hand focus back.
  const close = useCallback(() => {
    if (closingRef.current) return;
    closingRef.current = true;
    const figure = flyer();
    const d = duration();

    const canvasVideo = sourceVideo();
    if (videoRef.current) {
      videoRef.current.muted = true;
      if (canvasVideo) canvasVideo.currentTime = videoRef.current.currentTime;
    }

    const tl = gsap.timeline({ onComplete: onClosed });
    tl.to(controlsRef.current, { opacity: 0, duration: 0.15 * d }, 0);
    tl.to(others(), { opacity: 0, duration: 0.2 * d }, 0);
    if (source && figure) {
      const to = figure.getBoundingClientRect();
      const from = source.getBoundingClientRect();
      tl.to(
        figure,
        { x: from.left - to.left, y: from.top - to.top, scale: from.width / to.width, duration: 0.45 * d, ease: "power3.inOut" },
        0,
      );
    }
    tl.to(backdropRef.current, { autoAlpha: 0, duration: 0.4 * d, ease: "power2.in" }, 0.05 * d);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onClosed, source]);

  // Esc closes from anywhere (focus may still be on the page behind).
  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onEsc);
    return () => document.removeEventListener("keydown", onEsc);
  }, [close]);

  // Tab stays inside the dialog.
  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== "Tab") return;
    const buttons = Array.from(rootRef.current?.querySelectorAll<HTMLButtonElement>("button") ?? []);
    if (buttons.length === 0) return;
    const first = buttons[0];
    const last = buttons[buttons.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };

  const ratio = item.w / item.h;
  const width = `min(${item.w * 2}px, calc(100vw - ${EDGE * 2}px), calc((100dvh - ${EDGE * 2 + CONTROLS}px) * ${ratio}))`;
  const n = sides?.length ?? 1;
  const sidesHeight = `min(${item.h * 2}px, calc(100dvh - ${EDGE * 2 + CONTROLS}px), calc((100vw - ${EDGE * 2 + 24 * (n - 1)}px) / ${n * ratio}))`;
  const buttonClass =
    "type-label-lg border border-surface-200 bg-surface-100 px-space-4 py-space-2 whitespace-nowrap text-surface-200 uppercase transition-colors hover:bg-primary-100";

  return (
    <div
      ref={rootRef}
      role="dialog"
      aria-modal="true"
      aria-label={item.alt}
      onKeyDown={onKeyDown}
      className="fixed inset-0 z-30 flex flex-col items-center justify-center gap-space-5"
    >
      {/* Backdrop: surface-100 veil over the canvas and sidebar. Click to close. */}
      <div ref={backdropRef} aria-hidden="true" onClick={close} className="invisible absolute inset-0 bg-surface-100/90" />

      {sides ? (
        // Side by side, space-5 apart. Height fits the viewport for the combined width.
        <div ref={figureRef} role="group" aria-label={item.alt} className="relative flex items-center gap-space-5">
          {sides.map((side, i) => (
            <div
              key={side.src}
              ref={(el) => {
                sideRefs.current[i] = el;
              }}
              className={`relative origin-top-left overflow-hidden shadow-sticker ${item.rounded ?? ""}`}
              style={{ height: sidesHeight, aspectRatio: `${item.w} / ${item.h}` }}
            >
              <Image src={side.src} alt={side.alt} fill sizes={`${item.w * 2}px`} className="object-cover" />
            </div>
          ))}
        </div>
      ) : (
        <div
          ref={figureRef}
          className={`relative origin-top-left overflow-hidden shadow-sticker ${item.rounded ?? ""}`}
          style={{ width, aspectRatio: `${item.w} / ${item.h}` }}
        >
          {isVideo ? (
            <video
              ref={videoRef}
              src={item.src}
              poster={item.poster}
              aria-label={item.alt}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              className="absolute inset-0 size-full object-cover"
            />
          ) : (
            <Image src={item.src} alt={item.alt} fill sizes={`${item.w * 2}px`} className="object-cover" />
          )}
        </div>
      )}

      <div ref={controlsRef} role="group" aria-label="Viewer controls" className="relative flex items-center opacity-0">
        {hasSound && (
          <button
            ref={firstButtonRef}
            type="button"
            aria-label="Sound"
            aria-pressed={soundOn}
            onClick={() => setSoundOn((on) => !on)}
            className={`${buttonClass} ${soundOn ? "bg-primary-100" : ""}`}
          >
            Sound: {soundOn ? "on" : "off"}
          </button>
        )}
        <button
          ref={hasSound ? undefined : firstButtonRef}
          type="button"
          onClick={close}
          className={`${buttonClass} ${hasSound ? "border-l-0" : ""}`}
        >
          Close
        </button>
      </div>
    </div>
  );
}
