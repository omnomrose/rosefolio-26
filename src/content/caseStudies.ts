export type CursorLabel = "VIEW CASE STUDY" | "COMING SOON" | "VIEW DESIGNATHON";

type Cover =
  | { kind: "photo"; src: string; alt: string; rounded?: boolean }
  | {
      kind: "gif";
      background: string;
      gif: string;
      alt: string;
      // GIF box relative to the cover, copied from Figma (centered).
      width: string;
      height: string;
    };

export type CaseStudy = {
  slug: string;
  title: string;
  tags: string[];
  description: string;
  size: "large" | "small"; // large = 5 columns, small = 4 columns
  href?: string;
  cursor: CursorLabel;
  cover: Cover;
};

// Order = reading order on the home grid (row 1 left → right, then row 2).
export const caseStudies: CaseStudy[] = [
  {
    slug: "whether",
    title: "Whether",
    tags: ["Agentic development", "UX/UI design"],
    description:
      "A digital closet that recommends outfits curated to the weather and your personal wardrobe.",
    size: "large",
    href: "/work/whether",
    cursor: "VIEW CASE STUDY",
    cover: {
      kind: "gif",
      background: "/images/work/cover-bg-whether.png",
      gif: "/images/work/whether.gif",
      alt: "Whether app screen suggesting an outfit for the day's weather",
      width: "122.3%",
      height: "100%",
    },
  },
  {
    slug: "mitchie-matcha",
    title: "Mitchie Matcha",
    tags: ["Packaging design", "Brand direction"],
    description:
      "A cafe in Vancouver where people can explore unique matcha drinks while supporting local artists.",
    size: "small",
    href: "/work/mitchie-matcha",
    cursor: "VIEW CASE STUDY",
    cover: {
      kind: "photo",
      src: "/images/work/cover-mitchie-matcha.jpg",
      alt: "A Mitchie Matcha iced matcha latte cup sitting in the grass",
      rounded: true,
    },
  },
  {
    slug: "ar-glasses-retail",
    title: "AR Glasses for Retail",
    tags: ["Conceptual design"],
    description:
      "An AR glasses concept that helps retail workers with product knowledge, inventory, and restock cycles.",
    size: "small",
    cursor: "COMING SOON",
    cover: {
      kind: "photo",
      src: "/images/work/cover-ar-glasses.jpg",
      alt: "Folded sweaters stacked on a retail shelf",
    },
  },
  {
    slug: "still",
    title: "Still",
    tags: ["Figbuild ‘26", "Figma make"],
    description:
      "An Apple Watch and iPhone concept built around a water metaphor that reflects a person’s real-time stress levels.",
    size: "large",
    // TODO(Rose): link for "VIEW DESIGNATHON"
    cursor: "VIEW DESIGNATHON",
    cover: {
      kind: "gif",
      background: "/images/work/cover-bg-still.png",
      gif: "/images/work/still.gif",
      alt: "Still app screens on three iPhones",
      width: "144.04%",
      height: "114.14%",
    },
  },
];
