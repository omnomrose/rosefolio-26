import Sidebar from "@/components/Sidebar";

// Fridge: main sidebar over a full-screen canvas. No smooth scroll — the canvas pans instead.
export default function FridgeLayout({ children }: LayoutProps<"/fridge">) {
  return (
    <>
      <Sidebar />
      <main>{children}</main>
    </>
  );
}
