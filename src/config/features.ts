import {
  Bookmark,
  Compass,
  Download,
  Languages,
  Radio,
  RefreshCw,
  type LucideIcon,
} from "lucide-react";

export type Feature = {
  icon: LucideIcon;
  title: string;
  short: string;
  description: string;
  art: FeatureArtKind;
  tag: string;
};

export type FeatureArtKind = "discovery" | "live" | "offline" | "language" | "saved" | "updates";

// Every entry describes an intended capability, not a verified release feature. The
// `tag` is rendered with an INTENDED CAPABILITY suffix so the prototype cannot read as a spec.
export const features: Feature[] = [
  {
    icon: Compass,
    title: "Discovery, reimagined.",
    short: "Less searching. More finding.",
    description:
      "A more thoughtful way to explore. Intended discovery tools will help you find what fits your mood, without the endless scroll.",
    art: "discovery",
    tag: "FIND YOUR NEXT",
  },
  {
    icon: Radio,
    title: "In the moment.",
    short: "A place for live experiences.",
    description:
      "Live TV is part of the vision: an intuitive place for real-time experiences, with availability to be confirmed at release.",
    art: "live",
    tag: "LIVE TV",
  },
  {
    icon: Download,
    title: "Take it with you.",
    short: "Your moments, on the move.",
    description:
      "Planned offline downloads will make room for entertainment away from a connection. Supported content and limits are to be confirmed.",
    art: "offline",
    tag: "OFFLINE DOWNLOADS",
  },
  {
    icon: Languages,
    title: "Make it your own.",
    short: "Your language. Your preference.",
    description:
      "Intended audio and subtitle controls will let you shape the experience around you. Language availability will depend on the actual release.",
    art: "language",
    tag: "AUDIO & SUBTITLES",
  },
  {
    icon: Bookmark,
    title: "Keep the good ones.",
    short: "A space for what’s next.",
    description:
      "A planned personal watchlist will bring the things you want to return to into one considered space, without losing your place.",
    art: "saved",
    tag: "YOUR WATCHLIST",
  },
  {
    icon: RefreshCw,
    title: "Always moving forward.",
    short: "A better experience, over time.",
    description:
      "Clear release notes and a straightforward update path are part of the plan. Update frequency and functionality are not yet confirmed.",
    art: "updates",
    tag: "APP UPDATES",
  },
];

export type BrandFrame = { art: string; label: string; credit: string };

// Abstract brand artwork generated for this prototype. These are visual-identity
// frames, never catalogue titles, and must not be presented as streamable content.
export const brandFrames: BrandFrame[] = [
  { art: "poster-a", label: "FRAME 01", credit: "BEAM" },
  { art: "poster-b", label: "FRAME 02", credit: "HORIZON" },
  { art: "poster-c", label: "FRAME 03", credit: "APERTURE" },
  { art: "poster-d", label: "FRAME 04", credit: "STRATA" },
  { art: "poster-e", label: "FRAME 05", credit: "DUSK" },
];
