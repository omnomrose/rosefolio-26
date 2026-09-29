import Image from "next/image";
import Link from "next/link";
import Nav from "./Nav";
import VinylPlayer from "./VinylPlayer";
import ContactLinks from "./ContactLinks";

export default function Sidebar() {
  return (
    <aside className="fixed top-0 left-0 z-20 flex max-h-dvh overflow-y-auto w-[var(--sidebar-width)] flex-col gap-space-8 bg-surface-100 p-space-8 shadow-sticker">
      <header className="flex w-full flex-col gap-space-2">
        <Link href="/" aria-label="Rose Nguyen — home" className="block h-[94px] w-[100px]">
          <Image src="/images/logo.svg" alt="" width={100} height={94} priority />
        </Link>
        <p className="type-heading-lg text-surface-200">Rose Nguyen</p>
        {/* Approved exception: sidebar captions keep -2% tracking. */}
        <p className="type-caption tracking-[-0.02em] text-surface-150 uppercase">Product designer | @rosedotsvg</p>
        <p className="type-caption tracking-[-0.02em] text-surface-150 uppercase">
          Designing digital &amp; tangible products for people, with people.
        </p>
      </header>

      <Nav />

      <div className="flex w-full flex-col gap-space-5">
        <VinylPlayer />
        <ContactLinks />
      </div>
    </aside>
  );
}
