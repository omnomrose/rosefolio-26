"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { caseStudies } from "@/content/caseStudies";

const tabs = [
  { key: "work", label: "[WORK]", href: "/", match: (p: string) => p === "/" || p.startsWith("/work") },
  { key: "about", label: "[ABOUT]", href: "/about", match: (p: string) => p.startsWith("/about") },
  { key: "fridge", label: "[FRIDGE]", href: "/fridge", match: (p: string) => p.startsWith("/fridge") },
];

/*
 * Nav — Figma variants "work-active" (1016:23139) and "work-expanded" (1016:23343).
 * Per the prototype, hovering the active [WORK] tab expands the case study list;
 * hovering a case study row highlights it (surface-110 fill, surface-200 text).
 */
export default function Nav() {
  const pathname = usePathname();
  const workActive = tabs[0].match(pathname);
  // Expansion is tied to the page it happened on, so it resets on navigation.
  const [expandedOn, setExpandedOn] = useState<string | null>(null);
  const expanded = expandedOn === pathname;
  const setExpanded = (open: boolean) => setExpandedOn(open ? pathname : null);
  const listRef = useRef<HTMLDivElement | null>(null);

  // Smoothly open/close the list.
  useEffect(() => {
    const el = listRef.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const open = expanded && workActive;
    gsap.to(el, {
      height: open ? "auto" : 0,
      marginTop: open ? 12 : 0,
      autoAlpha: open ? 1 : 0,
      duration: reduced ? 0 : 0.35,
      ease: "power2.out",
      overwrite: true,
    });
  }, [expanded, workActive]);

  return (
    <nav aria-label="Main" className="w-full">
      <ul className="flex w-full flex-col gap-space-2">
        {tabs.map((tab) => {
          const active = tab.match(pathname);
          const isWork = tab.key === "work";
          const hoverProps =
            isWork && workActive
              ? {
                  onPointerEnter: () => setExpanded(true),
                  onPointerLeave: () => setExpanded(false),
                  onFocus: () => setExpanded(true),
                  onBlur: (e: React.FocusEvent<HTMLLIElement>) => {
                    if (!e.currentTarget.contains(e.relatedTarget as Node)) setExpanded(false);
                  },
                }
              : {};

          return (
            <li key={tab.key} {...hoverProps}>
              <Link
                href={tab.href}
                aria-current={active ? "page" : undefined}
                aria-expanded={isWork && workActive ? expanded : undefined}
                className={`flex w-full flex-col ${active ? "h-[31px] justify-center gap-space-1" : "gap-[14px]"}`}
              >
                <span className="flex items-center gap-space-1">
                  {active && <span aria-hidden="true" className="size-[10px] bg-primary-300" />}
                  <span className={`type-caption text-surface-200 uppercase ${active ? "font-bold" : ""}`}>
                    {tab.label}
                  </span>
                </span>
                <span aria-hidden="true" className="block h-px w-full bg-surface-200" />
              </Link>

              {isWork && workActive && (
                <div ref={listRef} className="invisible h-0 overflow-hidden opacity-0">
                  <ul aria-label="Case studies" className="flex flex-col gap-space-2">
                    {caseStudies.map((study) => {
                      const rowClass =
                        "type-body-md block w-full rounded-1 py-space-0 pl-space-6 text-surface-150 transition-colors hover:bg-surface-110 hover:text-surface-200";
                      return (
                        <li key={study.slug}>
                          {study.href?.startsWith("http") ? (
                            <a href={study.href} target="_blank" rel="noopener noreferrer" className={rowClass}>
                              {study.title}
                            </a>
                          ) : study.href ? (
                            <Link href={study.href} className={rowClass}>
                              {study.title}
                            </Link>
                          ) : (
                            <span className={rowClass} aria-disabled="true">
                              {study.title}
                            </span>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
