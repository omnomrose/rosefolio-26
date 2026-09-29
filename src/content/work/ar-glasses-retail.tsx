import type { CaseStudyMeta } from "./types";

// Placeholder until the AR Glasses case study is designed (Rose): same shell, empty panel.
export const meta: CaseStudyMeta = {
  slug: "ar-glasses-retail",
  title: "AR Glasses for Retail",
  summary:
    "An AR glasses concept that helps retail workers with product knowledge, inventory, and restock cycles.",
  sections: [{ id: "coming-soon", label: "Coming soon" }],
  previous: { label: "Previous", href: "/work/mitchie-matcha" },
  // Still has no case study page yet.
  next: { label: "Read Next" },
};

export function Body() {
  return <section id="coming-soon" tabIndex={-1} aria-label="Coming soon" className="outline-none" />;
}
