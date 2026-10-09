import type { ReactNode } from "react";

/*
 * "How might…" box (AR Glasses 1207:291, Oct 8 restyle; shared with Whether):
 * surface-100 fill, surface-30 stroke, 12 × 20 padding (space-2 / space-4),
 * centred sentence-case copy in surface-150. Figma sets 24px at 141%; title-xl (24, normal
 * line height) is the closest text style, so it's used as-is.
 */
export default function HowMightCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={`flex w-full items-center justify-center border border-surface-30 bg-surface-100 px-space-2 py-space-4 ${className}`}
    >
      <p className="type-title-xl max-w-[792px] text-center text-surface-150">{children}</p>
    </div>
  );
}
