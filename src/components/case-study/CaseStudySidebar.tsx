"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import ContactLinks from "@/components/ContactLinks";
import { ArrowLeftIcon, ArrowRightIcon } from "@/components/Icons";
import type { CaseStudyMeta, Wayfinder } from "@/content/work/types";
import { setActiveTab, useActiveTab } from "./activeTab";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

// Geist Mono 16 / -2% / uppercase — "back home" in Figma (not a text style).
const monoNav = "font-mono text-[16px] leading-[21px] tracking-[-0.02em] uppercase";

/*
 * Case study sidebar (973:1975): back home, title + summary, section nav, previous / read next,
 * contact links. The section nav either follows the scroll position ("scroll") or switches
 * between tabs ("tabs", e.g. Mitchie Matcha).
 */
export default function CaseStudySidebar({ meta }: { meta: CaseStudyMeta }) {
  const tabs = meta.navigation === "tabs";
  const tabIds = meta.sections.map((s) => s.id);
  const activeTab = useActiveTab(tabIds);
  const [spyActive, setSpyActive] = useState(meta.sections[0]?.id);
  const active = tabs ? activeTab : spyActive;

  // Tab switched: the page height changed, so re-measure the smooth scroller.
  useEffect(() => {
    if (tabs) ScrollTrigger.refresh();
  }, [tabs, activeTab]);

  // Scroll spy: the active section is the last one whose top has passed 40% of the viewport;
  // at the very bottom of the page the last section wins.
  useEffect(() => {
    if (tabs) return;
    const ids = meta.sections.map((s) => s.id);
    const setActive = setSpyActive;
    const update = (progress?: number) => {
      if (progress !== undefined && progress > 0.995) {
        setActive(ids[ids.length - 1]);
        return;
      }
      const line = window.innerHeight * 0.4;
      let current = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) current = id;
      }
      setActive(current);
    };
    const trigger = ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => update(self.progress),
    });
    update();
    return () => trigger.kill();
  }, [tabs, meta.sections]);

  const goTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    if (tabs) {
      e.preventDefault();
      // Back to the top, then swap the content and move focus to the new panel.
      const smoother = ScrollSmoother.get();
      if (smoother) smoother.scrollTo(0, false);
      else window.scrollTo({ top: 0 });
      setActiveTab(id);
      requestAnimationFrame(() => document.getElementById(`panel-${id}`)?.focus({ preventScroll: true }));
      return;
    }
    const el = document.getElementById(id);
    if (!el) return;
    e.preventDefault();
    setSpyActive(id);
    // The first section also covers the hero, so it scrolls back to the top of the page.
    const isFirst = id === meta.sections[0]?.id;
    const smoother = ScrollSmoother.get();
    if (smoother) smoother.scrollTo(isFirst ? 0 : el, true, "top 36px");
    else if (isFirst) window.scrollTo({ top: 0 });
    else el.scrollIntoView({ block: "start" });
    el.focus({ preventScroll: true });
  };

  return (
    // Figma 973:1975 (858 tall): top group (header → 40px → CONTENTS) and footer, space between.
    // Never scrolls: on short screens the space between them shrinks (and the gaps compact
    // below 908px tall), so the wayfinder + contact links stay visible with 36px bottom padding.
    <aside className="fixed top-0 left-0 z-20 flex h-[858px] max-h-dvh w-[var(--sidebar-width)] flex-col justify-between gap-space-5 overflow-hidden bg-surface-100 p-space-8 shadow-sticker">
      <div className="flex w-full shrink-0 flex-col gap-space-9 short:gap-space-5">
        <header className="flex w-full flex-col items-start gap-space-10 short:gap-space-5">
          <Link href="/" className={`flex items-center gap-space-3 text-surface-200 transition-colors hover:text-primary-300 ${monoNav}`}>
            <ArrowLeftIcon className="h-[10.004px] w-[10.755px]" />
            Back home
          </Link>
          <div className="flex w-full flex-col gap-space-4">
            {/* Figma overrides heading-lg here: 141% line height, -5% tracking. */}
            <p className="type-heading-lg leading-[1.41] tracking-[-0.05em] text-surface-200">{meta.title}</p>
            <p className="type-body-xl text-surface-150">{meta.summary}</p>
          </div>
        </header>

        {/* CONTENTS block (1129:2537) — same language as the main nav (1129:2538): Geist Mono 14,
            numbered rows, surface-10 dividers, primary-200 square on the active row. Rows use Figma's
            18px line box (the browser's "normal" for Geist Mono 14 is ~19px). */}
        <nav aria-labelledby="case-study-contents" className="flex w-full flex-col gap-space-5">
          <p id="case-study-contents" className="type-caption text-surface-200 uppercase">
            Contents
          </p>
          <ul className="flex w-full flex-col gap-space-4 pl-space-4">
            {meta.sections.map((section, i) => {
              const isActive = section.id === active;
              return (
                <li key={section.id} className="flex w-full flex-col gap-space-4">
                  <a
                    href={`#${section.id}`}
                    onClick={(e) => goTo(e, section.id)}
                    aria-controls={tabs ? `panel-${section.id}` : undefined}
                    aria-current={isActive ? (tabs ? "page" : "location") : undefined}
                    className={`type-caption flex items-center leading-[18px] uppercase transition-colors ${
                      isActive ? "text-surface-200" : "text-surface-150 hover:text-primary-300"
                    }`}
                  >
                    <span
                      aria-hidden="true"
                      className={`size-[10px] shrink-0 bg-primary-200 transition-[max-width,margin] duration-300 ease-out ${
                        isActive ? "mr-space-1 max-w-[10px]" : "mr-0 max-w-0"
                      }`}
                    />
                    {String(i + 1).padStart(2, "0")} [{section.label}]
                  </a>
                  <span aria-hidden="true" className="block h-px w-full bg-surface-10" />
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      <div className="flex shrink-0 flex-col gap-space-5">
        <nav aria-label="Case studies" className="flex w-full items-center justify-between">
          <WayfinderLink link={meta.previous} direction="previous" />
          <WayfinderLink link={meta.next} direction="next" />
        </nav>
        <ContactLinks />
      </div>
    </aside>
  );
}

function WayfinderLink({ link, direction }: { link: Wayfinder; direction: "previous" | "next" }) {
  const content =
    direction === "previous" ? (
      <>
        <ArrowLeftIcon className="h-[10.004px] w-[10.755px]" />
        <span className="type-caption uppercase">{link.label}</span>
      </>
    ) : (
      <>
        <span className="type-caption uppercase">{link.label}</span>
        <ArrowRightIcon className="h-[10.004px] w-[10.755px]" />
      </>
    );
  const cls = "flex items-center gap-space-3 text-surface-150";
  if (!link.href) {
    return (
      <span aria-disabled="true" className={cls}>
        {content}
      </span>
    );
  }
  return (
    <Link href={link.href} className={`${cls} transition-colors hover:text-primary-300`}>
      {content}
    </Link>
  );
}
