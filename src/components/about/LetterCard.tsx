"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import ContactLinks from "@/components/ContactLinks";
import { backLogo, instagram, letter, portrait } from "@/content/about";

gsap.registerPlugin(useGSAP);

/** Maximum tilt in degrees (Rose: subtle). */
const MAX_TILT = 4;

/*
 * The letter: front 973:1292, back 1100:2442 (691 × 444).
 * - Tilts toward the cursor (GSAP quickTo), and slightly on keyboard focus.
 * - Click, Enter or Space flips it (3D rotateY). Each face has a full-size button under its content
 *   for keyboard and screen readers; clicks on the back's links don't flip. The hidden face is inert.
 * - Reduced motion: no tilt, instant flip.
 */
export default function LetterCard() {
  const [flipped, setFlipped] = useState(false);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const tiltRef = useRef<HTMLDivElement | null>(null);
  const flipRef = useRef<HTMLDivElement | null>(null);
  const tiltTo = useRef<((px: number, py: number) => void) | null>(null);
  const reducedRef = useRef(false);
  const frontButton = useRef<HTMLButtonElement | null>(null);
  const backButton = useRef<HTMLButtonElement | null>(null);

  useGSAP(() => {
    reducedRef.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedRef.current) return;
    const rx = gsap.quickTo(tiltRef.current, "rotationX", { duration: 0.6, ease: "power3.out" });
    const ry = gsap.quickTo(tiltRef.current, "rotationY", { duration: 0.6, ease: "power3.out" });
    // px, py: pointer position across the card, −0.5 … 0.5.
    tiltTo.current = (px, py) => {
      ry(px * 2 * MAX_TILT);
      rx(-py * 2 * MAX_TILT);
    };
  });

  const onPointerMove = (e: React.PointerEvent) => {
    const rect = stageRef.current?.getBoundingClientRect();
    if (!rect || !tiltTo.current) return;
    tiltTo.current((e.clientX - rect.left) / rect.width - 0.5, (e.clientY - rect.top) / rect.height - 0.5);
  };
  const rest = () => tiltTo.current?.(0, 0);

  const flip = () => {
    const next = !flipped;
    setFlipped(next);
    gsap.to(flipRef.current, {
      rotationY: next ? 180 : 0,
      duration: reducedRef.current ? 0 : 0.8,
      ease: "power3.inOut",
      overwrite: true,
      // Keep keyboard focus on the flip control of the face now showing.
      onStart: () => (next ? backButton : frontButton).current?.focus({ preventScroll: true }),
    });
  };

  const face = "absolute inset-0 overflow-hidden shadow-sticker [backface-visibility:hidden]";
  const flipButton = "absolute inset-0 size-full";

  return (
    <div
      ref={stageRef}
      className="absolute [perspective:1500px]"
      style={{ left: `calc(50% + ${letter.x}px)`, top: letter.y, width: letter.w, height: letter.h }}
      onPointerMove={onPointerMove}
      onPointerLeave={rest}
    >
      <div ref={tiltRef} className="size-full [transform-style:preserve-3d]">
        {/* The click handler sits on the card, not the buttons: once tilted, 3D hit-testing can land on
            the face instead of its button. Keyboard activation of a button bubbles up here too. */}
        <div
          ref={flipRef}
          className="relative size-full [transform-style:preserve-3d]"
          onClick={(e) => {
            if ((e.target as Element).closest("a")) return;
            flip();
          }}
        >
          {/* Front: 973:1292 */}
          <section aria-label="Letter" inert={flipped} className={`${face} bg-surface-100`}>
            <button
              ref={frontButton}
              type="button"
              aria-label="Flip the letter over"
              className={flipButton}
              onFocus={() => tiltTo.current?.(0.25, -0.25)}
              onBlur={rest}
            />
            <div className="pointer-events-none relative flex size-full items-center justify-between pt-space-8 pr-space-5 pb-space-5 pl-space-8">
              {/* Slot is the layer's size; the export (shadow baked in) overhangs it like Figma's render. */}
              <div className="relative h-[269.331px] w-[212.765px] shrink-0">
                <Image
                  src={portrait.src}
                  alt="Portrait of Rose in a black shirt against a light grey backdrop"
                  width={672}
                  height={842}
                  sizes="224px"
                  priority
                  className="absolute max-w-none"
                  style={{ left: portrait.x, top: portrait.y, width: portrait.w, height: portrait.h }}
                />
              </div>
              <div className="flex w-[372.083px] shrink-0 flex-col gap-space-3">
                <h2 className="type-heading-md text-surface-200">Hi, welcome to my little digital corner!</h2>
                <div className="type-body-md text-surface-150 [&>p+p]:mt-[1lh]">
                  <p className="text-surface-200">
                    The first time I fell in love with design was during my childhood, playing on Kid Pix on the
                    shared family computer.
                  </p>
                  <p>
                    Being exposed to design at a young age has allowed me to always{" "}
                    <span className="text-surface-200">approach problems from curiosity-driven perspective.</span> If
                    you think about it, design is all around us and shapes the way we interact with each other.
                  </p>
                  <p>
                    I’m a huge advocate for{" "}
                    <span className="text-surface-200">
                      designing for lived experiences and working with people for people.
                    </span>{" "}
                    There’s just something about empathy and storytelling that automation can’t replace.
                  </p>
                  <p>
                    I consider myself a{" "}
                    <span className="text-surface-200">learner for life and I love creating alongside people.</span> If
                    this sounds like your kind of jam, send me a message on LinkedIn or email me!
                  </p>
                  <p className="text-surface-200">— cheers, rose :~)</p>
                </div>
              </div>
            </div>
          </section>

          {/* Back: 1100:2442 */}
          <section aria-label="Letter, back" inert={!flipped} className={`${face} bg-surface-100 [transform:rotateY(180deg)]`}>
            <button
              ref={backButton}
              type="button"
              aria-label="Flip the letter back"
              className={flipButton}
              onFocus={() => tiltTo.current?.(0.25, -0.25)}
              onBlur={rest}
            />
            <div className="pointer-events-none relative flex size-full flex-col items-center justify-center gap-space-8">
              {/* Slot is the logo's size (973:950); the image includes sticker-shadow and overhangs it. */}
              <div className="relative h-[218.274px] w-[225px] shrink-0">
                <Image
                  src={backLogo.src}
                  alt=""
                  width={473}
                  height={459}
                  sizes="237px"
                  className="absolute max-w-none"
                  style={{ left: backLogo.x, top: backLogo.y, width: backLogo.w, height: backLogo.h }}
                />
              </div>
              <div className="flex w-[345px] flex-col items-center gap-space-2 text-center">
                <p className="type-caption text-surface-200 uppercase">Find me on these corners of the internet:</p>
                <p className="type-caption text-surface-150 uppercase">
                  {instagram.map((ig, i) => (
                    <span key={ig.href}>
                      {i > 0 && ", "}
                      <a
                        href={ig.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="pointer-events-auto transition-colors hover:text-primary-300"
                      >
                        {ig.handle}
                      </a>
                    </span>
                  ))}
                </p>
                <div className="pointer-events-auto">
                  <ContactLinks />
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
