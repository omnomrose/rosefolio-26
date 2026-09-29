"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  { label: "[WORK]", href: "/", match: (p: string) => p === "/" || p.startsWith("/work") },
  { label: "[ABOUT]", href: "/about", match: (p: string) => p.startsWith("/about") },
  { label: "[FRIDGE]", href: "/fridge", match: (p: string) => p.startsWith("/fridge") },
];

export default function Nav() {
  const pathname = usePathname();

  return (
    <nav aria-label="Main" className="w-full">
      <ul className="flex w-full flex-col gap-space-2">
        {items.map((item) => {
          const active = item.match(pathname);
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={active ? "page" : undefined}
                className="flex w-full flex-col gap-[14px]"
              >
                <span className="flex items-center gap-space-1">
                  {active && <span aria-hidden="true" className="size-[10px] bg-primary-300" />}
                  <span className={`type-caption text-surface-200 uppercase ${active ? "font-bold" : ""}`}>
                    {item.label}
                  </span>
                </span>
                <span aria-hidden="true" className="block h-px w-full bg-surface-200" />
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
