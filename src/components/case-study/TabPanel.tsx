"use client";

import type { ReactNode } from "react";
import { useActiveTab } from "./activeTab";

/*
 * Content for one tab of a tabbed case study. Hidden (display: none) unless its tab is active.
 * `focusable` panels receive focus after a tab switch (see CaseStudySidebar).
 */
export default function TabPanel({
  id,
  tabIds,
  focusable = false,
  className,
  children,
}: {
  id: string;
  tabIds: string[];
  focusable?: boolean;
  className?: string;
  children: ReactNode;
}) {
  const active = useActiveTab(tabIds) === id;
  return (
    <div
      id={focusable ? `panel-${id}` : undefined}
      tabIndex={focusable ? -1 : undefined}
      hidden={!active}
      className={`outline-none ${className ?? ""}`}
    >
      {children}
    </div>
  );
}
