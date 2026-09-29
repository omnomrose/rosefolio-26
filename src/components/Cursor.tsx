"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { EyeIcon } from "./Icons";

type CursorContextValue = { setLabel: (label: string | null) => void };

const CursorContext = createContext<CursorContextValue>({ setLabel: () => {} });

export const useCursorLabel = () => useContext(CursorContext);

/*
 * Site-wide custom cursor (Figma node 1040:2267): a 15×15 primary-200 square (Rose: smaller than Figma's 26×26)
 * that trails the pointer smoothly. Over a case study card it morphs into the
 * label frame (nodes 1036:2253 / 1038:2261 / 1038:2264).
 */
export default function CursorProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  // A label belongs to the route it was set on. A card that navigates on click unmounts
  // before it gets pointerleave, so without this the label would stick on the next page.
  const [labelState, setLabelState] = useState<{ text: string; path: string } | null>(null);
  const label = labelState && labelState.path === pathname ? labelState.text : null;
  const [enabled, setEnabled] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const squareRef = useRef<HTMLDivElement | null>(null);
  const labelRef = useRef<HTMLDivElement | null>(null);

  // Keep the last label text so it doesn't blank out while fading away.
  const [labelText, setLabelText] = useState("");
  const setLabel = useCallback(
    (next: string | null) => {
      setLabelState(next ? { text: next, path: pathname } : null);
      if (next) setLabelText(next);
    },
    [pathname],
  );

  // Only take over the cursor on mouse/trackpad devices.
  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => setEnabled(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!enabled || !rootRef.current) return;
    document.documentElement.classList.add("has-custom-cursor");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const el = rootRef.current;
    // Reduced motion: snap to the pointer (quickTo with a 0 duration stops updating after the first call).
    const xTo = reduced ? (x: number) => gsap.set(el, { x }) : gsap.quickTo(el, "x", { duration: 0.35, ease: "power3.out" });
    const yTo = reduced ? (y: number) => gsap.set(el, { y }) : gsap.quickTo(el, "y", { duration: 0.35, ease: "power3.out" });
    let shown = false;

    const moveTo = (x: number, y: number) => {
      if (!shown) {
        gsap.set(el, { x, y });
        gsap.to(el, { autoAlpha: 1, duration: 0.2 });
        shown = true;
      }
      xTo(x);
      yTo(y);
    };
    const onMove = (e: PointerEvent) => moveTo(e.clientX, e.clientY);

    // Embedded demos (e.g. the Whether prototype, ?embed=1) hide their own cursor and
    // post pointer positions here, so the square keeps following over the iframe.
    const onMessage = (e: MessageEvent) => {
      const data = e.data as { type?: string; x?: number; y?: number } | null;
      if (!data || typeof data.type !== "string" || !data.type.endsWith(":pointer")) return;
      if (typeof data.x !== "number" || typeof data.y !== "number") return;
      const frame = Array.from(document.querySelectorAll("iframe")).find((f) => f.contentWindow === e.source);
      if (!frame) return;
      const rect = frame.getBoundingClientRect();
      moveTo(rect.left + data.x, rect.top + data.y);
    };
    const onLeave = () => {
      gsap.to(el, { autoAlpha: 0, duration: 0.2 });
      shown = false;
    };

    window.addEventListener("pointermove", onMove);
    window.addEventListener("message", onMessage);
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("message", onMessage);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, [enabled]);

  // Morph between the square and the label frame.
  useEffect(() => {
    if (!squareRef.current || !labelRef.current) return;
    const showLabel = label !== null;
    gsap.to(squareRef.current, { scale: showLabel ? 0 : 1, autoAlpha: showLabel ? 0 : 1, duration: 0.25, ease: "power2.out" });
    gsap.to(labelRef.current, {
      scale: showLabel ? 1 : 0.6,
      autoAlpha: showLabel ? 1 : 0,
      duration: 0.25,
      ease: "power2.out",
    });
  }, [label]);

  return (
    <CursorContext.Provider value={{ setLabel }}>
      {children}
      {enabled && (
        <div
          ref={rootRef}
          aria-hidden="true"
          className="pointer-events-none invisible fixed top-0 left-0 z-50 opacity-0"
        >
          <div ref={squareRef} className="absolute size-[15px] -translate-x-1/2 -translate-y-1/2 bg-primary-200" />
          <div
            ref={labelRef}
            className="invisible absolute flex -translate-x-1/2 -translate-y-1/2 items-center justify-center gap-[10px] rounded-2 border border-surface-200 bg-primary-200 p-[10px] whitespace-nowrap opacity-0"
          >
            <EyeIcon className="h-[10.004px] w-[15.006px] text-surface-200" />
            <span className="type-caption text-surface-200 uppercase">{labelText}</span>
          </div>
        </div>
      )}
    </CursorContext.Provider>
  );
}
