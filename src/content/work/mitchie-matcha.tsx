import type { CaseStudyMeta } from "./types";
import Photo from "@/components/case-study/Photo";
import TabPanel from "@/components/case-study/TabPanel";

/*
 * Figma: one page, three tabs — each tab swaps the header details and the image grid.
 *   Instagram posts   973:19999 (details 415:3331)
 *   Packaging design  973:20089 (details 754:1048)
 *   Merchandise       973:20168 (details 767:1460)
 */
export const meta: CaseStudyMeta = {
  slug: "mitchie-matcha",
  title: "Mitchie Matcha",
  summary:
    "A neighbourhood cafe based in Vancouver where people can explore unique matcha drinks while supporting local artists.",
  navigation: "tabs",
  sections: [
    {
      // Figma label is "Instagram posts/metrics"; "/metrics" dropped until metrics are added (Rose).
      id: "instagram",
      label: "Instagram posts",
      details: [
        { label: "Role", values: ["Graphic Designer", "Social Media Strategist"] },
        { label: "Timeline", values: ["June – Aug 2026"] },
        { label: "Skills", values: ["Copywriting", "Creative Direction", "Social Media Marketing"] },
        { label: "Tools", values: ["Figma", "Illustrator", "Photoshop"] },
      ],
    },
    {
      id: "packaging",
      label: "Packaging design",
      details: [
        { label: "Role", values: ["Packaging Designer"] },
        { label: "Timeline", values: ["Dec – Aug 2025"] },
        { label: "Skills", values: ["Packaging Design"] },
        { label: "Tools", values: ["Illustrator", "Photoshop"] },
      ],
    },
    {
      id: "merchandise",
      label: "Merchandise",
      details: [
        { label: "Role", values: ["Design Engineer"] },
        { label: "Timeline", values: ["June – Aug 2026"] },
        { label: "Skills", values: ["Agentic Coding", "Interaction Design"] },
        { label: "Tools", values: ["Illustrator", "Photoshop", "Figma"] },
      ],
    },
  ],
  previous: { label: "Previous", href: "/work/whether" },
  next: { label: "Read Next", href: "/work/ar-glasses-retail" },
  hero: {
    kind: "photo",
    src: "/images/work/mitchie-matcha/hero.webp",
    alt: "Two hands raising Mitchie Matcha iced matcha lattes in a toast against green trees",
  },
};

const tabIds = meta.sections.map((s) => s.id);
const img = (name: string) => `/images/work/mitchie-matcha/${name}.webp`;

export function Body() {
  return (
    <>
      {/* CONTEXT (973:20030) — same copy on every tab */}
      <section aria-labelledby="context-heading" className="mt-space-11 flex flex-col gap-space-3">
        <h2 id="context-heading" className="type-label-lg text-surface-150 uppercase">
          Context
        </h2>
        <p className="type-body-16 text-surface-200">
          Overseeing the brand direction, copywriting, and design for Mitchie Matcha’s social media @mitchiematcha and
          merchandise!
        </p>
      </section>

      {/* INSTAGRAM POSTS (973:20034) */}
      <TabPanel id="instagram" tabIds={tabIds} focusable className="mt-space-17">
        <h2 className="sr-only">Instagram posts</h2>
        <div className="flex flex-col gap-space-1">
          {/* 973:20035 — 461.39 | 529.61 at 999; right image sets the row height (577:901). */}
          <div className="grid grid-cols-[461.3895fr_529.6105fr] gap-space-1">
            <div className="grid grid-rows-[439fr_380fr] gap-space-1">
              <Photo
                src={img("ig-salted-maple-sign")}
                alt="“Salted Maple Matcha” hand-lettered in syrup on a white surface"
              />
              <Photo src={img("ig-salted-maple-lettering")} alt="Sketched bubble lettering that reads “Salted Maple”" />
            </div>
            <Photo
              src={img("ig-salted-maple-post")}
              alt="Instagram post announcing the Salted Maple matcha’s return on July 1st, shown in a Mitchie Matcha cup on a sunny table"
              className="aspect-[529.6105/827]"
              sizes="(min-width: 1512px) 530px, 36vw"
            />
          </div>

          {/* 973:20040 */}
          <div className="grid grid-cols-3 gap-space-1">
            <Photo
              src={img("ig-dessert-1")}
              alt="Instagram post asking “Should we bring our matcha Nanaimo bar back?” over a photo of the bar on a plate"
              className="aspect-[327.667/458]"
              sizes="(min-width: 1512px) 328px, 22vw"
            />
            <Photo
              src={img("ig-dessert-2")}
              alt="Instagram post showing the matcha Nanaimo bar from the side, with callout labels for each layer"
              className="aspect-[327.667/458]"
              sizes="(min-width: 1512px) 328px, 22vw"
            />
            <Photo
              src={img("ig-july-menu")}
              alt="Instagram post of the Mitchie Matcha July menu card next to an iced matcha"
              className="aspect-[327.667/458]"
              sizes="(min-width: 1512px) 328px, 22vw"
            />
          </div>

          {/* 973:20044 */}
          <div className="grid grid-cols-2 gap-space-1">
            <Photo
              src={img("ig-meet-the-artists")}
              alt="“Meet the Artists” Instagram post: three smiling artists in a scalloped frame on a green textured background"
              className="aspect-[495.5/660.667]"
            />
            <Photo
              src={img("ig-artist-2")}
              alt="Artist spotlight post for Clara: a polaroid portrait, her embroidery work, and a card listing why she loves embroidery, how long she’s embroidered, and her favourite drink order"
              className="aspect-[495.5/660.667]"
            />
            <Photo
              src={img("ig-artist-3")}
              alt="Artist spotlight post for Christa: a polaroid portrait, embroidered patches, and a card listing why she loves embroidery, how long she’s embroidered, and her favourite drink order"
              className="aspect-[495.5/660.667]"
            />
            <Photo
              src={img("ig-artist-4")}
              alt="Artist spotlight post for Sara: a polaroid portrait, an embroidery hoop, and a card listing why she loves embroidery, how long she’s embroidered, and her favourite drink order"
              className="aspect-[495.5/660.667]"
            />
          </div>
        </div>
      </TabPanel>

      {/* PACKAGING DESIGN (973:20121) */}
      <TabPanel id="packaging" tabIds={tabIds} focusable className="mt-space-17">
        <h2 className="sr-only">Packaging design</h2>
        <div className="grid grid-cols-2 gap-space-1">
          <Photo
            src={img("pkg-tin-front")}
            alt="Mitchie Matcha tin with a green label and checkered lid, reflected on a glossy surface"
            className="aspect-[495.5/706.161]"
          />
          <Photo
            src={img("pkg-tin-back")}
            alt="Back of the Mitchie Matcha tin, with a house-shaped label showing brewing instructions"
            className="aspect-[495.5/706.161]"
          />
          <Photo
            src={img("pkg-shelf")}
            alt="Mitchie Matcha tins on a dark retail shelf with a price tag"
            className="aspect-[495.5/706.161]"
          />
          <Photo
            src={img("pkg-tins-display")}
            alt="Three Mitchie Matcha tins on a counter in front of a green tea character sign"
            className="aspect-[495.5/706.161]"
          />
          <Photo
            src={img("pkg-pour-milk")}
            alt="Milk poured from a Mitchie Matcha carton into a cup of ice on a scale"
            className="aspect-[495.5/706.161]"
          />
          <Photo
            src={img("pkg-pour-matcha")}
            alt="Matcha poured into a branded cup of milk on a wooden tray"
            className="aspect-[495.5/706.161]"
          />
        </div>
      </TabPanel>

      {/* MERCHANDISE (973:20202) */}
      <TabPanel id="merchandise" tabIds={tabIds} focusable className="mt-space-17">
        <h2 className="sr-only">Merchandise</h2>
        <div className="grid grid-cols-2 gap-space-1">
          <Photo
            src={img("merch-cups")}
            alt="Two stacked white mugs printed with a green illustration and the words “I 100% deserve this matcha!”"
            className="aspect-[495.5/467.221]"
          />
          <Photo
            src={img("merch-cups-2")}
            alt="White mugs printed with “You mean so matcha to me!” and a green illustration"
            className="aspect-[495.5/467.221]"
          />
          <Photo
            src={img("merch-stickers")}
            alt="Clear bag of Mitchie Matcha stickers: green bubble-letter logos and a matcha whisk"
            className="col-span-2 aspect-[999/656.486]"
            sizes="(min-width: 1512px) 927px, 62vw"
          />
        </div>
      </TabPanel>
    </>
  );
}
