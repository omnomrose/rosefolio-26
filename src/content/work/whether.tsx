import type { CaseStudyMeta } from "./types";
import { SectionHeading } from "@/components/case-study/SectionHeading";
import ProblemCard from "@/components/case-study/ProblemCard";
import FeatureShowcase from "@/components/case-study/FeatureShowcase";
import TakeawayCard from "@/components/case-study/TakeawayCard";

// Figma: "Whether | Case Study #1" (973:1879).
export const meta: CaseStudyMeta = {
  slug: "whether",
  title: "Whether",
  summary: "A digital closet that recommends outfits curated to the weather and your personal wardrobe.",
  sections: [
    { id: "context", label: "Context" },
    { id: "problem", label: "Problem" },
    { id: "solution", label: "Solution" },
    { id: "takeaways", label: "Takeaways" },
  ],
  // Still has no case study page yet (Rose: N/A for now).
  previous: { label: "Previous" },
  next: { label: "Read Next", href: "/work/mitchie-matcha" },
  hero: {
    // TODO(Rose): swap for the 2x export of node 973:1973 → /images/work/whether/hero-bg.webp
    background: "/images/work/cover-bg-whether.jpg",
    overlay: "/images/work/whether.webp",
    alt: "Whether app screen suggesting an outfit for the day's weather, over a cloudy sky",
  },
  details: [
    { label: "Role", values: ["Design Engineer"] },
    { label: "Timeline", values: ["May – Aug 2026", "(2.5 months)"] },
    { label: "Skills", values: ["Agentic Coding", "Interaction Design"] },
    { label: "Tools", values: ["Expo", "Figma", "Claude Code"] },
  ],
};

const features = [
  {
    id: "shuffle",
    title: "Shuffle through potential outfits",
    description:
      "Visually experience the current weather forecast for the city you’re in. Explore what to wear without the pain of rummaging through your closet.",
    hash: "home",
  },
  {
    id: "digitize",
    title: "Digitize your clothes",
    description: "Snap/upload picture(s) of your clothes to add them to your closet.",
    hash: "digitize",
  },
  {
    id: "personalize",
    title: "Outfit Personalization",
    description: "Frame your outfits around an activity/vibe or specific clothing item(s).",
    hash: "personalize",
  },
  {
    id: "closet",
    title: "Closet",
    description:
      "View all your scanned clothes, which are automatically categorized based on type, style, and colour. Add your own tags to help organize and find garments more easily.",
    hash: "closet",
  },
];

export function Body() {
  return (
    <>
      {/* CONTEXT (973:1904) */}
      <section id="context" tabIndex={-1} aria-labelledby="context-heading" className="mt-space-11 w-[666px] max-w-full outline-none">
        <SectionHeading id="context-heading" label="Context" title="What do I even wear?" gap="gap-space-1" />
        <p className="type-body-xl mt-space-3 text-surface-200">
          I find myself running behind schedule because I can’t figure out what to wear. Looking outside the window
          just isn’t enough to determine whether the outfit I have on will last me throughout the day.
        </p>
      </section>

      {/* PROBLEM (1020:1425) + How might I (1020:1443) */}
      <section id="problem" tabIndex={-1} aria-labelledby="problem-heading" className="mt-space-13 outline-none">
        <SectionHeading
          id="problem-heading"
          label="Problem"
          title="People who struggle with coming up with an outfit run into:"
          gap="gap-space-0"
        />
        <div className="mt-space-11 flex w-full items-start justify-between gap-space-8">
          <ProblemCard
            image="/images/work/whether/problem-weather.webp"
            alt="Collage of a grey hoodie and a blazing sun against a blue sky"
            caption="Not knowing if the outfit matches the weather"
            quote={
              <>
                “It’s <strong className="font-bold">too hot</strong> for this....”
              </>
            }
            quotePosition={{ left: "37.5%", top: "10.73%" }}
          />
          <ProblemCard
            image="/images/work/whether/problem-repeat.webp"
            alt="Collage of two women pulling unimpressed faces in a bright room"
            caption="Feeling embarrassed about wearing the same clothes again"
            quote={
              <>
                “you had that <strong className="font-bold">exact</strong> <strong className="font-bold">fit</strong> on
                yesterday...”
              </>
            }
            quotePosition={{ left: "5.26%", top: "10.73%" }}
          />
        </div>

        <div className="mt-space-15 flex w-full items-center justify-center rounded-1 border border-surface-50 px-space-2 py-space-4">
          <p className="type-label-lg w-[555px] max-w-full text-center text-surface-150 uppercase">
            How might I guide the process of coming up with potential outfits for people on a time crunch?
          </p>
        </div>
      </section>

      {/* SOLUTION (1029:1720) */}
      <section id="solution" tabIndex={-1} aria-labelledby="solution-heading" className="mt-space-15 outline-none">
        <FeatureShowcase
          demoUrl="https://whether-demo.vercel.app/"
          prototypeTitle="Whether interactive prototype"
          features={features}
          intro={
            <div className="flex flex-col gap-space-3">
              <h2 id="solution-heading" className="type-label-lg text-surface-150 uppercase">
                Solution
              </h2>
              <p className="type-body-16 text-surface-200">
                To have an all in one platform where users are able to have outfits pulled from their closet
                recommended to them based on their city’s forecast.
              </p>
            </div>
          }
        />
      </section>

      {/* TAKEAWAYS (973:1941) */}
      <section id="takeaways" tabIndex={-1} aria-labelledby="takeaways-heading" className="mt-space-13 outline-none">
        <div className="flex w-[419px] max-w-full flex-col gap-space-2">
          <h2 id="takeaways-heading" className="type-body-16 text-surface-150 uppercase">
            Takeaways
          </h2>
          <p className="type-title-xl text-surface-200">What did I takeaway from all of this?</p>
        </div>
        <div className="mt-[40px] flex w-full items-stretch gap-space-8">
          <TakeawayCard title="What tools stuck?" className="min-w-0 flex-1">
            This app was definitely more on the experimental side! The development process acted a canvas to see what
            tools could be integrated into my workflow. The best framework to go about it is to define the Task →
            Context → Elements → Behaviour → Constraints. (Thank you Figma MCP...)
          </TakeawayCard>
          <TakeawayCard title="Fashion is subjective!" className="w-[455px] shrink-0">
            The point of this app is to not take away the creative process of coming up with an outfit, but to use it
            as a guide for those on a time crunch! This can help you come up with an outfit but you ultimately define
            your own style and taste.
          </TakeawayCard>
        </div>
      </section>
    </>
  );
}
