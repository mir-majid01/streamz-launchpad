import {
  Bookmark,
  Compass,
  Download,
  Languages,
  Radio,
  RefreshCw,
  type LucideIcon,
} from "lucide-react";
import type { CatalogId } from "@/config/catalog";

export type FeatureVisualKind =
  | "poster-mosaic"
  | "live-wall"
  | "download-concept"
  | "language-concept"
  | "saved-concept"
  | "updates-concept";

export type FeatureVisual = {
  kind: FeatureVisualKind;
  catalogIds: CatalogId[];
};

export type Feature = {
  icon: LucideIcon;
  title: string;
  short: string;
  description: string;
  tag: string;
  visual: FeatureVisual;
};

// Shipped surfaces in the StreamZ Android app (github.com/mir-majid01/StreamZ).
export const features: Feature[] = [
  {
    icon: Compass,
    title: "Discovery, reimagined.",
    short: "Less searching. More finding.",
    description:
      "Rows that read like a shelf, not a spreadsheet. Browse films and series by genre, region and language, with a search that gets out of the way and a top ten that actually updates.",
    tag: "BUILT FOR BROWSING",
    visual: {
      kind: "poster-mosaic",
      catalogIds: ["spider-man-brand-new-day", "sinners", "avatar-fire-and-ash"],
    },
  },
  {
    icon: Radio,
    title: "Live, the moment it happens.",
    short: "Sports, news and movie channels.",
    description:
      "Live TV sits on the same screen as everything else. Filter by category, star the channels you keep returning to, and see what is on now and what comes next before you commit.",
    tag: "LIVE TV",
    visual: {
      kind: "live-wall",
      catalogIds: ["below", "his-and-hers", "nobody-wants-this"],
    },
  },
  {
    icon: Download,
    title: "Take it with you.",
    short: "Downloads that keep playing offline.",
    description:
      "Pick a quality, save the title, and leave. Downloads play back with no connection, and a notifier tells you when one is ready instead of leaving you guessing.",
    tag: "OFFLINE DOWNLOADS",
    visual: { kind: "download-concept", catalogIds: ["toy-story-5", "super-mario-galaxy"] },
  },
  {
    icon: Languages,
    title: "Make it your own.",
    short: "Subtitles, audio and picture, your way.",
    description:
      "Subtitle settings live outside the player, so you can fix the size and style once. Quality and aspect controls are per device, tuned for the phone in your hand or the TV on your wall.",
    tag: "SUBTITLES & PLAYBACK",
    visual: {
      kind: "language-concept",
      catalogIds: ["kpop-demon-hunters", "michael"],
    },
  },
  {
    icon: Bookmark,
    title: "Keep the good ones.",
    short: "Your list, your place, your encore.",
    description:
      "A watchlist that holds what you want to return to, continue-watching that remembers the exact second you left, and an up-next suggestion when a series has more to give.",
    tag: "MY LIST & RESUME",
    visual: {
      kind: "saved-concept",
      catalogIds: ["superman", "tron-ares", "project-hail-mary"],
    },
  },
  {
    icon: RefreshCw,
    title: "Always moving forward.",
    short: "Updates that say what changed.",
    description:
      "The app checks for a new build, shows the changelog before you commit, and installs over the same signed release, so an update never costs you your library.",
    tag: "APP UPDATES",
    visual: { kind: "updates-concept", catalogIds: ["evil-dead-burn", "the-odyssey"] },
  },
];
