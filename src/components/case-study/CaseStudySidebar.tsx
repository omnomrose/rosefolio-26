"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import ContactLinks from "@/components/ContactLinks";
import { ArrowLeftIcon, ArrowRightIcon } from "@/components/Icons";
import type { CaseStudyMeta, Wayfinder } from "@/content/work/types";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

// Geist Mono 16 / -2% / uppercase — used by "back home" and the section nav in Figma (not a text style).
const monoNav = "font-mono text-[16px] leading-[21px] tracking-[-0.02em] uppercase";

/*
 * Case study sidebar (973:1975): back home, title + summary, section nav that follows the scroll
 * position, previous / read next, contact links.
 */
export default function CaseStudySidebar({ meta }: { meta: CaseStudyMeta }) {
  const [active, setActive] = useState(meta.sections[0]?.id);

  // Scroll spy: the active section is the last one whose top has passed 40% of the viewport;
  // at the very bottom of the page the last section wins.
  useEffect(() => {
    const ids = meta.sections.map((s) => s.id);
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
  }, [meta.sections]);

  const goTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    e.preventDefault();
    setActive(id);
    // The first section also covers the hero, so it scrolls back to the top of the page.
    const isFirst = id === meta.sections[0]?.id;
    const smoother = ScrollSmoother.get();
    if (smoother) smoother.scrollTo(isFirst ? 0 : el, true, "top 36px");
    else if (isFirst) window.scrollTo({ top: 0 });
    else el.scrollIntoView({ block: "start" });
    el.focus({ preventScroll: true });
  };

  return (
    // Never scrolls: on short screens the space between the section nav and the footer
    // shrinks instead, so the wayfinder + contact links always stay visible (36px bottom padding).
    <aside className="fixed top-0 left-0 z-20 flex max-h-dvh w-[var(--sidebar-width)] flex-col gap-space-17 overflow-hidden bg-surface-100 p-space-8 shadow-sticker">
      <header className="flex w-full shrink-0 flex-col items-start gap-space-10">
        <Link href="/" className={`flex items-center gap-space-3 text-surface-200 transition-colors hover:text-primary-300 ${monoNav}`}>
          <ArrowLeftIcon className="h-[10.004px] w-[10.755px]" />
          Back home
        </Link>
        <div className="flex w-full flex-col gap-space-4">
          {/* Figma overrides heading-lg here: 141% line height, -5% tracking. */}
          <p className="type-heading-lg leading-[1.41] tracking-[-0.05em] text-surface-200">{meta.title}</p>
          <p className="type-body-xl text-surface-200">{meta.summary}</p>
        </div>
      </header>

      <div className="flex h-[530px] min-h-0 w-full flex-col justify-between">
        <nav aria-label="On this page">
          <ul className="flex flex-col gap-space-4 p-[14px]">
            {meta.sections.map((section) => {
              const isActive = section.id === active;
              return (
                <li key={section.id} className={isActive ? "" : "h-[17px]"}>
                  <a
                    href={`#${section.id}`}
                    onClick={(e) => goTo(e, section.id)}
                    aria-current={isActive ? "location" : undefined}
                    className={`flex items-center transition-colors ${monoNav} ${
                      isActive ? "text-surface-200" : "text-surface-150 hover:text-primary-300"
                    }`}
                  >
                    <span
                      aria-hidden="true"
                      className={`size-[9px] shrink-0 bg-primary-200 transition-[max-width,margin] duration-300 ease-out ${
                        isActive ? "mr-space-1 max-w-[9px]" : "mr-0 max-w-0"
                      }`}
                    />
                    {section.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex flex-col gap-space-5">
          <nav aria-label="Case studies" className="flex w-full items-center justify-between">
            <WayfinderLink link={meta.previous} direction="previous" />
            <WayfinderLink link={meta.next} direction="next" />
          </nav>
          <ContactLinks />
        </div>
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
