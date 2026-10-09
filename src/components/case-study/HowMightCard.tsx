import type { ReactNode } from "react";

// "How might I…" box (Whether 1020:1443): surface-50 stroke, label-lg uppercase, surface-150, centred.
export default function HowMightCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={`flex w-full items-center justify-center rounded-1 border border-surface-50 px-space-2 py-space-4 ${className}`}
    >
      <p className="type-label-lg w-[555px] max-w-full text-center text-surface-150 uppercase">{children}</p>
    </div>
  );
}
