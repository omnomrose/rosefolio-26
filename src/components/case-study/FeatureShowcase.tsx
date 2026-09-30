"use client";

import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { gsap } from "gsap";
import { ChevronUpIcon, MinusIcon, PlusIcon } from "@/components/Icons";

type Feature = { id: string; title: string; description: string; hash: string };

const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/*
 * Solution block (1029:1720): feature accordion ("features" 1029:1678, variants 1020:1484,
 * 1020:1497, 1028:1509, 1028:1525) driving a live prototype iframe (973:1940).
 * Annotation: clicking a feature changes the prototype to <demoUrl>#<hash>.
 * The up/down buttons step through features for people who'd rather not click each one.
 */
export default function FeatureShowcase({
  intro,
  features,
  demoUrl,
  prototypeTitle,
}: {
  intro: ReactNode;
  features: Feature[];
  demoUrl: string;
  prototypeTitle: string;
}) {
  const [active, setActive] = useState(0);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const animateAccordion = useRef(false);
  const shownHash = useRef(features[0].hash);
  const uid = useId();

  // Expand the active description, collapse the rest.
  useEffect(() => {
    const duration = animateAccordion.current && !prefersReducedMotion() ? 0.35 : 0;
    animateAccordion.current = true;
    panelRefs.current.forEach((el, i) => {
      if (!el) return;
      gsap.to(el, {
        height: i === active ? "auto" : 0,
        autoAlpha: i === active ? 1 : 0,
        duration,
        ease: "power2.out",
        overwrite: true,
      });
    });
  }, [active]);

  // Swap the prototype screen. Only the URL fragment changes, so the demo isn't reloaded;
  // a short fade smooths the cut between screens.
  useEffect(() => {
    const iframe = iframeRef.current;
    const hash = features[active].hash;
    if (!iframe || hash === shownHash.current) return;
    shownHash.current = hash;
    const src = `${demoUrl}?embed=1#${hash}`;
    if (prefersReducedMotion()) {
      iframe.src = src;
      return;
    }
    gsap
      .timeline()
      .to(iframe, { autoAlpha: 0, duration: 0.18, ease: "power1.in", overwrite: true })
      .call(() => {
        iframe.src = src;
      })
      .to(iframe, { autoAlpha: 1, duration: 0.3, ease: "power1.out", delay: 0.12 });
  }, [active, demoUrl, features]);

  const step = (dir: 1 | -1) => setActive((i) => (i + dir + features.length) % features.length);

  const roundBtn =
    "flex size-[40px] items-center justify-center rounded-8 border border-surface-150 bg-surface-100 p-[10px] text-surface-150 transition-colors hover:border-primary-300 hover:text-primary-300";

  return (
    <div className="flex w-full items-start justify-between gap-space-8">
      <div className="flex w-[420px] min-w-0 flex-col gap-[91px]">
        {intro}

        <div className="flex items-start gap-[47px]">
          <div className="mt-[70px] flex shrink-0 flex-col gap-space-7">
            <button type="button" className={roundBtn} aria-label="Previous feature" aria-controls={`${uid}-list`} onClick={() => step(-1)}>
              <ChevronUpIcon className="h-[10px] w-[20px]" />
            </button>
            <button type="button" className={roundBtn} aria-label="Next feature" aria-controls={`${uid}-list`} onClick={() => step(1)}>
              <ChevronUpIcon className="h-[10px] w-[20px] rotate-180" />
            </button>
          </div>

          <ul id={`${uid}-list`} className="flex w-[333px] min-w-0 flex-col gap-space-3">
            {features.map((feature, i) => {
              const isActive = i === active;
              return (
                <li
                  key={feature.id}
                  className={`rounded-1 border bg-surface-100 p-[14px] transition-colors ${
                    isActive ? "border-surface-30" : "border-surface-10 hover:border-surface-30"
                  }`}
                >
                  <h3>
                    <button
                      type="button"
                      aria-expanded={isActive}
                      aria-controls={`${uid}-${feature.id}`}
                      onClick={() => setActive(i)}
                      className={`group flex w-full items-center gap-[14px] text-left transition-colors ${
                        isActive ? "text-surface-200" : "text-surface-150 hover:text-surface-200"
                      }`}
                    >
                      <span className="relative flex size-[14px] shrink-0 items-center justify-center">
                        {isActive ? <MinusIcon className="h-px w-[13px]" /> : <PlusIcon className="size-[14px]" />}
                      </span>
                      <span className="type-title-lg min-w-0 flex-1">{feature.title}</span>
                    </button>
                  </h3>
                  <div
                    id={`${uid}-${feature.id}`}
                    ref={(el) => {
                      panelRefs.current[i] = el;
                    }}
                    role="region"
                    aria-label={feature.title}
                    className="invisible h-0 overflow-hidden opacity-0"
                  >
                    <p className="type-body-xl pt-[14px] text-surface-200">{feature.description}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      {/* Prototype slot (973:1940, 383 × 634). The demo's ?embed=1 mode renders just the
          phone (393:852) on a transparent page, so the iframe is sized to that ratio and centred. */}
      <div className="relative flex h-[634px] w-[383px] shrink-0 justify-center">
        <iframe
          ref={iframeRef}
          src={`${demoUrl}?embed=1#${features[0].hash}`}
          title={prototypeTitle}
          loading="lazy"
          className="aspect-[393/852] h-full border-0 bg-transparent"
        />
        <p className="sr-only" aria-live="polite">
          Prototype showing: {features[active].title}
        </p>
      </div>
    </div>
  );
}
