/*
 * About page collage (Figma "About Page" 973:1160, 1512 × 1589).
 *
 * Images are Figma's own 2x exports of each hifi layer, with rotation and sticker-shadow baked in
 * (converted to WebP). Each image is placed where Figma renders it:
 * - The export covers the layer's rotated bounding box plus the shadow's spread: 5.6px blur on every
 *   side, moved 2px down, so it starts 5.6px left and 3.6px above the bounding box.
 * - `x` is the image's left edge relative to the centre of the content area (at 1512 the content
 *   area runs 405 → 1476, so its centre is x = 940.5 in the frame). Everything is pinned to that
 *   centre, so the collage keeps its spacing as columns stretch.
 * - `y` is the image's top relative to the content area top (frame y − 38).
 * - `w`/`h` are the export's pixel size ÷ 2.
 */

export type CollageItem = {
  src: string;
  /** Empty for decorative stickers. */
  alt: string;
  x: number;
  y: number;
  w: number;
  h: number;
};

const img = (name: string) => `/images/about/${name}.webp`;
const CX = 940.5;
const TOP = 38;
const at = (fx: number, fy: number) => ({ x: fx - CX, y: fy - TOP });

/** Shadow spread around the bounding box (sticker-shadow: offset 0 2, blur 5.6). */
const SHADOW = { left: 5.6, top: 3.6 };

/**
 * A baked export. `bx`/`by`: the layer's rotated bounding box in the frame.
 * `px`: export size in pixels (2x). `shadow`: whether the layer has sticker-shadow.
 */
const item = (name: string, alt: string, bx: number, by: number, px: [number, number], shadow = true): CollageItem => ({
  src: img(name),
  alt,
  ...at(bx - (shadow ? SHADOW.left : 0), by - (shadow ? SHADOW.top : 0)),
  w: px[0] / 2,
  h: px[1] / 2,
});

/** The letter card: 691 × 444 at frame (581, 183.91). */
export const letter = { ...at(581, 183.91), w: 691, h: 444 };

/** Stickers under the letter (Figma layer order, bottom first). */
export const stickersBelow: CollageItem[] = [
  item("sticker-astronaut", "", 533, 598.91, [348, 361]),
  item("sticker-creature", "", 1176, 586.91, [373, 371]),
  item("sticker-ping-pong", "", 866, 27, [240, 240]),
  item("sticker-config", "", 439, 227.91, [314, 354]),
  item("sticker-sun", "", 1071, 66.91, [346, 303]),
  item("sticker-sonny-angel", "", 651, 66.91, [191, 346]),
];

/** Stickers above the letter. */
export const stickersAbove: CollageItem[] = [
  item("sticker-mitchie-wordmark", "", 406, 459, [352, 292], false),
  item("sticker-kitsilano", "", 406, 90, [263, 178]),
  item("sticker-every-second-counts", "", 1306, 489.91, [344, 186]),
  item("sticker-a24", "", 1284, 280.91, [358, 221]),
  item("sticker-cabbage-keychain", "", 1324, 63, [269, 348]),
  item("sticker-deer", "", 871, 651, [296, 209]),
];

/** "When I'm not hunched over my laptop I am:" — heading (973:1298) and box (973:1299). */
export const boxHeading = { ...at(645, 824), w: 540, h: 51 };
export const box = { src: img("box"), ...at(554, 909), w: 726, h: 533 };

// TODO(Rose): confirm alt text for the box items.
export const boxItems: CollageItem[] = [
  item("box-sticker-book", "A sticker book", 686, 976, [335, 412]),
  item("box-beanie", "A knit beanie", 610, 1132, [574, 574]),
  item("box-green-onion", "A green onion", 983, 1026, [499, 359]),
  item("box-ticket", "A Steve Lacy concert ticket", 896, 1204, [595, 339]),
  item("box-photo-booth", "A photo booth", 871, 973, [321, 419]),
];

/** Letter portrait (973:1293): 3x export with sticker-shadow baked in, 672 × 842 px. */
export const portrait = { src: img("letter-portrait"), x: -SHADOW.left, y: -SHADOW.top, w: 672 / 3, h: 842 / 3 };

/** Back-of-letter logo (973:950): Rose's 2x PNG, 473 × 459 px, sticker-shadow included. */
export const backLogo = { src: "/images/about/back-logo.webp", x: -SHADOW.left, y: -SHADOW.top, w: 473 / 2, h: 459 / 2 };

/** Content-area height: frame height 1589 − 38 top − 36 bottom padding. */
export const stageHeight = 1589 - TOP - 36;

export const instagram = [
  { handle: "@rosedotsvg", href: "https://www.instagram.com/rosedotsvg/" },
  { handle: "@thecreativeroom.damd", href: "https://www.instagram.com/thecreativeroom.damd/" },
];
