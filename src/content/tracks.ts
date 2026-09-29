export type Track = {
  slug: string;
  title: string;
  artist: string;
  src: string;
  cover: string;
  vinyl: string;
};

// Order matches the music selection bar in Figma (top → bottom).
export const tracks: Track[] = [
  {
    slug: "girl-like-me",
    title: "Girl Like Me",
    artist: "PinkPantheress",
    src: "/audio/girl-like-me.mp3",
    cover: "/images/player/cover-girl-like-me.png",
    vinyl: "/images/player/vinyl-girl-like-me.webp",
  },
  {
    slug: "les-fleurs",
    title: "Les Fleurs",
    artist: "Minnie Riperton",
    src: "/audio/les-fleurs.mp3",
    cover: "/images/player/cover-les-fleurs.png",
    vinyl: "/images/player/vinyl-les-fleurs.webp",
  },
  {
    slug: "huit-octobre",
    title: "Huit Octobre 1971",
    artist: "Cortex",
    src: "/audio/huit-octobre-1971.mp3",
    cover: "/images/player/cover-huit-octobre.png",
    vinyl: "/images/player/vinyl-huit-octobre.webp",
  },
  {
    slug: "everything-is-embarrassing",
    title: "Everything Is Embarrassing",
    artist: "Sky Ferreira",
    src: "/audio/everything-is-embarrassing.mp3",
    cover: "/images/player/cover-everything-is-embarrassing.png",
    vinyl: "/images/player/vinyl-everything-is-embarrassing.webp",
  },
  {
    slug: "best-to-you",
    title: "Best to You",
    artist: "Blood Orange",
    src: "/audio/best-to-you.mp3",
    cover: "/images/player/cover-best-to-you.png",
    vinyl: "/images/player/vinyl-best-to-you.webp",
  },
];
