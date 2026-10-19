export type LiveCategory = {
  id: string;
  name: string;
  accent: string;
  glow: string;
};

// StreamZ loads its live line-up, categories and schedule at runtime, so this is the
// guide surface rather than a fixed channel list. Tiles name the kinds of category the
// browser exposes, and the app renders whatever the signed-in device is entitled to.
export const liveCategories: LiveCategory[] = [
  { id: "news", name: "News", accent: "#2f6df6", glow: "rgba(47,109,246,.28)" },
  { id: "sports", name: "Sports", accent: "#12b76a", glow: "rgba(18,183,106,.28)" },
  { id: "movies", name: "Movies", accent: "#e01b33", glow: "rgba(224,27,51,.3)" },
  { id: "kids", name: "Kids", accent: "#f79009", glow: "rgba(247,144,9,.26)" },
  { id: "music", name: "Music", accent: "#9b51e0", glow: "rgba(155,81,224,.28)" },
  { id: "entertainment", name: "Entertainment", accent: "#06b6d4", glow: "rgba(6,182,212,.26)" },
  { id: "documentary", name: "Documentary", accent: "#84cc16", glow: "rgba(132,204,22,.24)" },
  { id: "lifestyle", name: "Lifestyle", accent: "#ec4899", glow: "rgba(236,72,153,.26)" },
];

export type LiveSurface = {
  icon: "guide" | "filter" | "star" | "clock";
  title: string;
  body: string;
};

export const liveSurfaces: LiveSurface[] = [
  {
    icon: "guide",
    title: "A schedule you can scan.",
    body: "The guide lays out what is airing now, then lets you scroll forward into the rest of the day instead of guessing what a channel is about.",
  },
  {
    icon: "filter",
    title: "Category chips, not endless lists.",
    body: "Everything is grouped. Tap a category to narrow the wall down to the lanes you actually watch, and jump back out with one press.",
  },
  {
    icon: "star",
    title: "Starred and recently watched.",
    body: "Channels you keep going back to get pinned, and the last ones you opened stay one tap away, remembered on the device.",
  },
  {
    icon: "clock",
    title: "Now and next, on every tile.",
    body: "Each channel shows the programme it is in the middle of and the one coming after it, so you can leave a stream before it ends.",
  },
];
