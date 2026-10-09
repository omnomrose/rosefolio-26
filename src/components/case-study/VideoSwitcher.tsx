"use client";

import { useId, useState } from "react";

export type SwitcherVideo = { id: string; label: string; src: string; poster?: string; alt: string };

/*
 * Solution media (AR Glasses 1158:2591): a 999 × 562 video box (radius-1) with toggle buttons
 * 24px below (space-5). Buttons (973:2578 / 973:2580): 273 wide, surface-200 stroke,
 * label-lg uppercase surface-200. Hover + selected = primary-100 fill (Rose).
 * Videos always play, muted and looping, including for reduced-motion users (Rose).
 */
export default function VideoSwitcher({ videos, label }: { videos: SwitcherVideo[]; label: string }) {
  const [active, setActive] = useState(0);
  const uid = useId();
  const video = videos[active];

  return (
    <div className="flex w-full flex-col items-center gap-space-5">
      <div id={`${uid}-media`} className="relative aspect-[999/562] w-full overflow-hidden rounded-1 bg-surface-110">
        <video
          key={video.id}
          src={video.src}
          poster={video.poster}
          aria-label={video.alt}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="absolute inset-0 size-full object-cover"
        />
      </div>

      <div role="group" aria-label={label} className="flex items-center">
        {videos.map((v, i) => {
          const selected = i === active;
          return (
            <button
              key={v.id}
              type="button"
              aria-pressed={selected}
              aria-controls={`${uid}-media`}
              onClick={() => setActive(i)}
              className={`type-label-lg w-[273px] border border-surface-200 px-space-2 py-space-2 text-center whitespace-nowrap text-surface-200 uppercase transition-colors hover:bg-primary-100 ${
                selected ? "bg-primary-100" : ""
              }`}
            >
              {v.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
