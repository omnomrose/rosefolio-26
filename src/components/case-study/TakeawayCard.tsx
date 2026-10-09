import type { ReactNode } from "react";

/*
 * Takeaway card.
 * - "soft" (Whether 973:1946 / 973:1949): surface-10 stroke, 16 padding, body/16 copy.
 * - "outlined" (AR Glasses 973:2595, Oct 8): surface-200 stroke, radius-1, 20 padding (space-4),
 *   12 gap (space-2), body-md copy.
 */
export default function TakeawayCard({
  title,
  children,
  className = "",
  variant = "soft",
}: {
  title: string;
  children: ReactNode;
  className?: string;
  variant?: "soft" | "outlined";
}) {
  const outlined = variant === "outlined";
  return (
    <div
      className={`flex flex-col bg-surface-100 ${
        outlined
          ? "gap-space-2 rounded-1 border border-surface-200 p-space-4"
          : "gap-space-3 rounded-1 border border-surface-10 p-space-3"
      } ${className}`}
    >
      <h3 className="type-title-lg text-surface-200">{title}</h3>
      <p className={`${outlined ? "type-body-md" : "type-body-16"} text-surface-150`}>{children}</p>
    </div>
  );
}
