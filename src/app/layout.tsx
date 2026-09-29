import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import localFont from "next/font/local";
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
        {/* Each route group supplies its own sidebar + smooth-scroll shell. */}
        <CursorProvider>{children}</CursorProvider>
      </body>
    </html>
  );
}
