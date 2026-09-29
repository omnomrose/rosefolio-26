import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import localFont from "next/font/local";
import Sidebar from "@/components/Sidebar";
import SmoothScroll from "@/components/SmoothScroll";
import CursorProvider from "@/components/Cursor";
import "./globals.css";


// That That New Pixel Test — Italic Square (desktop/heading-* styles).
const pixel = localFont({
  src: "../fonts/pixel-italic-square.woff2",
  variable: "--font-pixel-italic-square",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Rose Nguyen — Product Designer",
  description: "Designing digital & tangible products for people, with people.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable} ${pixel.variable}`}>
      <body className="min-h-screen bg-surface-100 bg-grid">
        <CursorProvider>
          <Sidebar />
          <SmoothScroll>
            <main className="min-h-screen pt-[38px] pr-space-8 pb-space-8 pl-[calc(var(--sidebar-width)+var(--grid-gutter))]">
              {children}
            </main>
          </SmoothScroll>
        </CursorProvider>
      </body>
    </html>
  );
}
