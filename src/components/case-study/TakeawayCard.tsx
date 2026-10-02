import type { ReactNode } from "react";

// Takeaway card (973:1946 / 973:1949): surface-100 fill, surface-10 stroke, body/16 copy.
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
      className={`flex flex-col gap-space-3 rounded-1 border border-surface-10 bg-surface-100 p-space-3 ${className}`}
    >
      <h3 className="type-title-lg text-surface-200">{title}</h3>
      <p className="type-body-16 text-surface-150">{children}</p>
    </div>
  );
}
