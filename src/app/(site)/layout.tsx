import Sidebar from "@/components/Sidebar";
import SmoothScroll from "@/components/SmoothScroll";

// Home, About, Fridge: main sidebar (identity, nav, vinyl player, links).
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Sidebar />
      <SmoothScroll>
        <main className="min-h-screen pt-[38px] pr-space-8 pb-space-8 pl-[calc(var(--sidebar-width)+var(--grid-gutter))]">
          {children}
        </main>
      </SmoothScroll>
    </>
  );
}
