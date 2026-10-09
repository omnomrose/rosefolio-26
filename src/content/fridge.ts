/*
 * Fridge / playground. Rose (Oct 9): the open canvas from Figma "Fridge" (973:1594) is replaced by a
 * ring of pieces circling the middle of the content area (after fancycomponents.dev "Circling Elements"),
 * built with GSAP.
 *
 * `w`/`h` are the piece's Figma size; only the aspect ratio is used (the ring sizes pieces to fit).
 * Order = order around the ring, clockwise from the top.
 *
 * Media:
 * - Rose's source files (Oct 8), resized to 1400px WebP / 1280px H.264 + AAC: bea-poster, beep-boop,
 *   spring-market, soft-opening-story, cover, slide, creative-room-*, ig-post (from uxui_infographic_rose.pdf),
 *   tshirt.mp4, day-in-a-life.mp4 (posters = first frame / 0.5s).
 * - Oct 9: ig-tomatoes, tshirt-front/back (the T-shirt opens with both sides), nexa-demo.mp4
 *   (from Rose's 122MB nexa-demo.gif → 1280px H.264, no audio; replaces the clinic-site screenshot).
 * - Still from Figma via public/images/fridge/_figma-export/convert.py: poster-mockup.
 * - Background: Rose's paper texture (Oct 9), multiplied onto surface-100 at full strength (Rose: "more
 *   apparent" than Figma's 30%), 1x + 2x (texture.webp / texture@2x.webp).
 */

export type FridgeItem = {
  id: string;
  /** Figma node, or "added" for pieces Rose added after the frame. */
  node: string;
  alt: string;
  /** Figma size — used for the aspect ratio. */
  w: number;
  h: number;
  /** Corner radius token class, when the layer has one. */
  rounded?: string;
} & (
  | {
      kind: "image";
      /** Shown in the ring. */
      src: string;
      /** Opens as these panels side by side (e.g. front + back); `coverSide` is the one shown in the ring. */
      sides?: { src: string; alt: string }[];
      coverSide?: number;
    }
  | {
      kind: "video";
      src: string;
      poster: string;
      /** false for silent videos (no SOUND toggle). */
      audio?: boolean;
    }
);

const img = (name: string) => `/images/fridge/${name}.webp`;
const vid = (name: string) => `/images/fridge/${name}.mp4`;

export const fridgeItems: FridgeItem[] = [
  { id: "ig-tomatoes", node: "973:1597", kind: "image", src: img("ig-tomatoes"), alt: "Instagram post: a tin and fresh tomatoes on grass, captioned “i <3 tomatoes”, for Nami Matcha", w: 212, h: 265 },
  { id: "clinic-site", node: "973:1607", kind: "video", src: vid("nexa-demo"), poster: img("nexa-demo-poster"), audio: false, alt: "Video: Nexa website demo — “Talk to a clinician in Ontario, without the wait.”", w: 593, h: 334, rounded: "rounded-2" },
  { id: "cover", node: "973:1599", kind: "image", src: img("cover"), alt: "Creative Room carousel cover: “nobody tells you it’s okay not to know yet.”", w: 260, h: 325 },
  { id: "soft-opening-story", node: "973:1601", kind: "image", src: img("soft-opening-story"), alt: "Instagram story: a Finder window titled creative-room-soft-opening, with files for the date, time, location and free food", w: 228, h: 405 },
  { id: "tshirt", node: "973:1603", kind: "video", src: vid("tshirt"), poster: img("tshirt-poster"), alt: "Video: a green T-shirt design spinning in the clouds", w: 215, h: 382 },
  { id: "day-in-a-life", node: "973:1604", kind: "video", src: vid("day-in-a-life"), poster: img("day-in-a-life-poster"), alt: "Video: Day in a Life as a BCI Student", w: 491, h: 276 },
  { id: "spring-market", node: "973:1602", kind: "image", src: img("spring-market"), alt: "Mitchie Matcha Spring Market poster: Heritage Hall, Sunday 4.13, 11:00 AM to 4:00 PM", w: 265, h: 331 },
  { id: "bea-poster", node: "added", kind: "image", src: img("bea-poster"), alt: "Beabadoobee Beatopia poster in blue duotone", w: 280, h: 360 },
  { id: "poster-mockup", node: "973:1606", kind: "image", src: img("poster-mockup"), alt: "Beabadoobee posters pasted on a weathered wall", w: 533, h: 355 },
  { id: "slide", node: "973:1605", kind: "image", src: img("slide"), alt: "Creative Room carousel: “you’re learning the skills. but what you actually want to do with them?”", w: 334, h: 418 },
  { id: "ig-post", node: "973:1600", kind: "image", src: img("ig-post"), alt: "UX/UI infographic: User Experience and Interface Design", w: 230, h: 355 },
  { id: "beep-boop", node: "added", kind: "image", src: img("beep-boop"), alt: "Poster: a pink Tamagotchi-style toy on a swirl, “Beep boop, ur cute”", w: 250, h: 350 },
  {
    id: "tshirt-mockup",
    node: "973:1598",
    kind: "image",
    src: img("tshirt-back"),
    sides: [
      { src: img("tshirt-front"), alt: "Front: a small “Pax et Bonum” chest print with a dove, on a brown T-shirt against clouds" },
      { src: img("tshirt-back"), alt: "Back: a large “Pax et Bonum” T made of vines and animals, Tin Yêu XI, Camp Kanaka, July 17–19 2026, Matthew 5:9" },
    ],
    coverSide: 1,
    alt: "Tin Yêu XI T-shirt design, front and back",
    w: 285,
    h: 369,
  },
  { id: "creative-room-started", node: "added", kind: "image", src: img("creative-room-started"), alt: "Creative Room carousel: “the creative room started because we kept meeting people who were talented, driven, and completely unsure of where they fit.”", w: 260, h: 325 },
  { id: "creative-room-together", node: "added", kind: "image", src: img("creative-room-together"), alt: "Creative Room carousel: “the creative room is where you figure it out together.”", w: 260, h: 325 },
];

/** Seconds per full turn of the ring. */
export const RING_DURATION = 48;

/** Paper texture at Figma's size (973:1595 is 2706 wide), pre-multiplied onto surface-100. */
export const fridgeTexture = {
  src: "/images/fridge/texture.webp",
  src2x: "/images/fridge/texture@2x.webp",
  w: 2706,
  h: 1503,
};
