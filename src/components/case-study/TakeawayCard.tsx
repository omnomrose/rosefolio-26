import type { ReactNode } from "react";

// Takeaway card (973:1946 / 973:1949).
export default function TakeawayCard({
  title,
  children,
  className = "",
}: {
  title: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`flex flex-col gap-space-3 rounded-1 border border-surface-10 bg-surface-110 p-space-3 ${className}`}
    >
      <h3 className="type-title-lg text-surface-200">{title}</h3>
      <p className="type-body-xl text-surface-150">{children}</p>
    </div>
  );
}
