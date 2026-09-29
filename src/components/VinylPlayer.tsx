"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { tracks } from "@/content/tracks";
import { NextIcon, PauseIcon, PlayIcon, PrevIcon } from "./Icons";

// A real record at 33⅓ RPM turns once every 1.8s.
const DEGREES_PER_SECOND = 360 / 1.8;
const SPIN_UP_SECONDS = 0.9; // platter gets up to speed
const WIND_DOWN_SECONDS = 1.6; // coasts to a stop after pause

export default function VinylPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const discRef = useRef<HTMLDivElement | null>(null);
  const spin = useRef({ speed: 0, angle: 0 });
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const track = tracks[index];

  // Spin loop: angle advances by the current speed every frame.
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    const tick = (_time: number, deltaMs: number) => {
      const s = spin.current;
      if (s.speed === 0) return;
      s.angle = (s.angle + s.speed * (deltaMs / 1000)) % 360;
      if (discRef.current) discRef.current.style.transform = `rotate(${s.angle}deg)`;
    };
    gsap.ticker.add(tick);
    return () => gsap.ticker.remove(tick);
  }, []);

  // Ease the platter speed up or down whenever play state changes.
  useEffect(() => {
    gsap.to(spin.current, {
      speed: playing ? DEGREES_PER_SECOND : 0,
      duration: playing ? SPIN_UP_SECONDS : WIND_DOWN_SECONDS,
      ease: playing ? "power1.in" : "power2.out",
      overwrite: true,
    });
  }, [playing]);

  // Load the first record on mount (never autoplays).
  useEffect(() => {
    if (audioRef.current) audioRef.current.src = tracks[0].src;
  }, []);

  const play = useCallback(() => {
    audioRef.current?.play().catch(() => setPlaying(false));
  }, []);

  const toggle = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) play();
    else audio.pause();
  }, [play]);

  // Switch records. `autoplay` = start playing even if we were paused
  // (picking a cover); prev/next keep the current play state.
  const select = useCallback(
    (next: number, autoplay: boolean) => {
      const audio = audioRef.current;
      if (!audio) return;
      const wrapped = (next + tracks.length) % tracks.length;
      if (wrapped === index) {
        if (autoplay) toggle();
        return;
      }
      const shouldPlay = autoplay || !audio.paused;
      setIndex(wrapped);
      audio.src = tracks[wrapped].src;
      if (shouldPlay) play();
      else setPlaying(false);
    },
    [index, play, toggle],
  );

  const status = `${playing ? "Playing" : "Paused"}: ${track.title} — ${track.artist}`;

  return (
    <div className="flex w-full flex-col gap-space-8">
      <audio
        ref={audioRef}
        preload="none"
        onEnded={() => select(index + 1, true)}
        onPause={() => setPlaying(false)}
        onPlay={() => setPlaying(true)}
      />

      <div className="flex h-[240px] w-full items-center justify-between">
        <div className="flex h-full flex-col items-center gap-space-2">
          <button
            type="button"
            onClick={toggle}
            aria-label={playing ? `Pause ${track.title}` : `Play ${track.title}`}
            className="relative size-[210px] shrink-0 rounded-full"
          >
            <div ref={discRef} className="absolute inset-0 rounded-full shadow-sticker will-change-transform">
              <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-full">
                <Image
                  src={track.vinyl}
                  alt=""
                  width={420}
                  height={420}
                  priority
                  className="absolute inset-0 size-full"
                />
              </div>
            </div>
          </button>

          <div className="flex items-center justify-center gap-space-6">
            <button
              type="button"
              onClick={() => select(index - 1, false)}
              aria-label="Previous track"
              className="text-surface-50 transition-colors hover:text-surface-150"
            >
              <PrevIcon className="h-[18.051px] w-[16.009px]" />
            </button>
            <button
              type="button"
              onClick={toggle}
              aria-label={playing ? "Pause" : "Play"}
              aria-pressed={playing}
              className="text-surface-50 transition-colors hover:text-surface-150"
            >
              {playing ? <PauseIcon className="h-[18px] w-[15px]" /> : <PlayIcon className="h-[18px] w-[15px]" />}
            </button>
            <button
              type="button"
              onClick={() => select(index + 1, false)}
              aria-label="Next track"
              className="text-surface-50 transition-colors hover:text-surface-150"
            >
              <NextIcon className="h-[18.051px] w-[16.009px]" />
            </button>
          </div>
        </div>

        <ul className="flex h-[240px] flex-col justify-between" aria-label="Music selection">
          {tracks.map((t, i) => (
            <li key={t.slug}>
              <button
                type="button"
                onClick={() => select(i, true)}
                aria-label={`${t.title} by ${t.artist}`}
                aria-current={i === index ? "true" : undefined}
                className={`relative block size-[40px] border ${
                  i === index ? "border-primary-300" : "border-transparent"
                }`}
              >
                <Image src={t.cover} alt="" fill sizes="40px" className="object-cover" />
              </button>
            </li>
          ))}
        </ul>
      </div>

      <p className="type-caption-sm w-full text-center text-surface-150 uppercase" aria-live="polite">
        {status}
      </p>
    </div>
  );
}
