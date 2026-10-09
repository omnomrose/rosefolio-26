import Image from "next/image";
import type { CaseStudyMeta } from "./types";
import { SectionHeading } from "@/components/case-study/SectionHeading";
import HowMightCard from "@/components/case-study/HowMightCard";
import PainPoint from "@/components/case-study/PainPoint";
import TakeawayCard from "@/components/case-study/TakeawayCard";
import VideoSwitcher from "@/components/case-study/VideoSwitcher";

// Figma: "AR/VR for Retail | Case Study #3" (973:2419). Title is "AR Glasses for Retail" (Rose).
export const meta: CaseStudyMeta = {
  slug: "ar-glasses-retail",
  title: "AR Glasses for Retail",
  summary: "What if Meta Glasses were commercialized for retail workers?",
  sections: [
    { id: "context", label: "Context" },
    { id: "problem", label: "Problem" },
    { id: "solution", label: "Solution" },
    { id: "takeaways", label: "Takeaways" },
  ],
  previous: { label: "Previous", href: "/work/mitchie-matcha" },
  // Still has no case study page yet.
  next: { label: "Read Next" },
  hero: {
    kind: "photo",
    src: "/images/work/ar-glasses-retail/hero.webp",
    alt: "AR glasses view inside a Uniqlo store: a translucent manager dashboard with a floor map, a customer assistance alert and teammates to call",
  },
  details: [
    { label: "Role", values: ["Designer"] },
    { label: "Timeline", values: ["Feb 6 – 23, 2026", "(2.5 week sprint)"] },
    { label: "Skills", values: ["Spatial Design", "Conceptual Design", "Interaction Design"] },
    { label: "Tools", values: ["Figma"] },
  ],
};

const img = (name: string) => `/images/work/ar-glasses-retail/${name}.webp`;

// Logo row (1158:2589): Figma sizes, 60px apart (space-13).
const logos = [
  { name: "Vessi", src: img("logo-vessi"), width: 142.537, height: 50.366 },
  { name: "Artbox", src: img("logo-artbox"), width: 146.062, height: 25.687 },
  { name: "Fujiya", src: img("logo-fujiya"), width: 138.004, height: 47.344 },
];

// Solution media (973:2576).
// TODO(Rose): restock clip pending; cross-check uses the home card's inventory POV until confirmed.
const videos = [
  {
    id: "restock",
    label: "Restock inventory",
    src: "/images/work/ar-glasses-retail/restock.mp4",
    alt: "Point-of-view video of AR glasses guiding a retail worker through restocking a shelf",
  },
  {
    id: "cross-check",
    label: "Cross-check inventory",
    src: "/images/work/ar-glasses.mp4",
    poster: "/images/work/ar-glasses-poster.jpg",
    alt: "Point-of-view video of AR glasses showing product and stock info over a retail shelf",
  },
];

export function Body() {
  return (
    <>
      {/* CONTEXT (973:2568) */}
      <section id="context" tabIndex={-1} aria-labelledby="context-heading" className="mt-space-11 w-[787px] max-w-full outline-none">
        <SectionHeading
          id="context-heading"
          label="Context"
          title="“Technology is advancing, but how is it being used to adapt in specific areas in our society?”"
          gap="gap-space-1"
        />
        <p className="type-body-16 mt-space-3 text-surface-200">
          This question was a topic frequently discussed within my Frontiers of Technology in Innovation class. The
          challenge was figuring out what existing technology could be applied to improve society.
        </p>
      </section>

      {/* PROBLEM: common pain points (973:2573), logos (1158:2589), pain points (1158:2600), how might (973:2577) */}
      <section id="problem" tabIndex={-1} aria-labelledby="problem-heading" className="mt-space-17 outline-none">
        <div className="flex w-[787px] max-w-full flex-col gap-space-3">
          <h2 id="problem-heading" className="type-label-lg text-surface-150 uppercase">
            Common pain points
          </h2>
          <p className="type-body-16 text-surface-200">
            I have some friends who currently work in retail/food service positions (Ex. Artbox, Fujiya, Vessi). These
            are some of the main tasks they run into during their shifts:
          </p>
        </div>

        <ul aria-label="Stores my friends work at" className="mt-space-11 flex items-center gap-space-13">
          {logos.map((logo) => (
            <li key={logo.name} className="relative shrink-0" style={{ width: logo.width, height: logo.height }}>
              <Image src={logo.src} alt={logo.name} fill sizes={`${Math.ceil(logo.width)}px`} className="object-contain" />
            </li>
          ))}
        </ul>

        <div className="mt-space-11 flex w-full items-end justify-between gap-space-7">
          <PainPoint image={img("pain-restock")} alt="Halftone illustration of an open cardboard box" width={213} height={172}>
            Incoming Shipments/Restock:
            <br />
            Knowing when the next box of shipments are coming in
          </PainPoint>
          <PainPoint
            image={img("pain-product-knowledge")}
            alt="Halftone illustration of a roll of receipt paper"
            width={194.62}
            height={226.437}
          >
            Product Knowledge:
            <br />
            Having to know specific promotions/products off the top of their heads
          </PainPoint>
          <PainPoint
            image={img("pain-inventory")}
            alt="Halftone illustration of a hand holding a yellow phone"
            width={162.883}
            height={206.516}
          >
            Inventory:
            <br />
            Checking availability in a different variation/stock at another store
          </PainPoint>
        </div>

        <HowMightCard className="mt-space-11">
          Wearable tech was expanding faster than ever, and it made me wonder: How might AR help Retail Workers in
          High-Traffic Malls with their Shifts?
        </HowMightCard>
      </section>

      {/* SOLUTION (1158:2591) */}
      <section id="solution" tabIndex={-1} aria-label="Solution" className="mt-space-17 outline-none">
        <VideoSwitcher videos={videos} label="Choose a task to watch" />
      </section>

      {/* TAKEAWAYS (973:2583, cards 973:2594 — 23px gap → space-5 so titles stay on one line, closing 973:2582) */}
      <section id="takeaways" tabIndex={-1} aria-labelledby="takeaways-heading" className="mt-space-17 outline-none">
        <div className="w-[805px] max-w-full">
          <SectionHeading
            id="takeaways-heading"
            label="Takeaways"
            title="Establishing moral grounds is a must with evolving technology."
            gap="gap-space-1"
          />
          <p className="type-body-16 mt-space-3 text-surface-150">
            As someone who’s worked in fast-paced environments (retail/food services), I could see how these glasses
            could be beneficial if used without ill intentions. However, I could also see how it could be used to
            micromanage and possibly displace employees.
          </p>
        </div>

        <div className="mt-space-11 flex w-full items-stretch gap-space-5">
          <TakeawayCard title="Normalizes Invasion of Privacy" className="min-w-0 flex-1">
            Customers did not consent to being observed through a worker&apos;s VR/AR glasses. Even without bad intent,
            features such as product scanning could accidentally capture customer faces or behaviour.
          </TakeawayCard>
          <TakeawayCard title="Accessibility at the Forefront" className="min-w-0 flex-1">
            Workers who have visual impairments or sensory sensitivities might not be able to wear the glasses for a
            full shift, which can negatively impact their job performance
          </TakeawayCard>
          <TakeawayCard title="Risks of Cognitive Offloading" className="min-w-0 flex-1">
            With how all knowledge is condensed into one dashboard, it made me wonder: if anyone could put on these
            glasses as a way to rely on product knowledge, then what makes a “good employee”?
          </TakeawayCard>
        </div>

        <p className="type-body-16 mt-space-11 text-surface-200">
          While I believe technology can be a tool that can help us in our daily lives, I also think we have to be
          intentional with the way we interact with it – what results we expect from using it and, in turn, how it
          affects the people around us.
        </p>
      </section>
    </>
  );
}
