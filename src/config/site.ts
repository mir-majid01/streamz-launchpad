export const STREAMZ_APK_URL =
  import.meta.env.VITE_STREAMZ_APK_URL ||
  "https://github.com/mir-majid01/StreamZ/releases/latest/download/app-release.apk";

const verifiedTelegram = {
  label: "Telegram",
  handle: "@Mirmajid01",
  url: "https://t.me/Mirmajid01",
} as const;

export const site = {
  name: "StreamZ",
  supportEmail: "streamzz.official@gmail.com",
  telegram: verifiedTelegram,
  telegramUrl: verifiedTelegram.url,
  apkUrl: STREAMZ_APK_URL,
  // Mirrors the v0.1.3 release asset on the StreamZ repo (GitHub API, 2026-10-19).
  // Size is MiB, the same unit Android's installer reports: 81,786,242 bytes.
  release: {
    version: "0.1.3",
    build: "4",
    size: "78 MB",
    checksum: "71ed2e9875af8531baf1e42888816dfa251d7154ad2b817c328148f273b601a9",
    releaseDate: "19 October 2026",
    packageName: "stream.z",
    repositoryUrl: "https://github.com/mir-majid01/StreamZ",
    changelogUrl: "https://github.com/mir-majid01/StreamZ/releases/latest",
    minimumAndroid: "",
  },
  nav: [
    { label: "Home", to: "/" },
    { label: "Features", to: "/features" },
    { label: "Live TV", to: "/live-tv" },
    { label: "Download", to: "/download" },
    { label: "About", to: "/about" },
    { label: "Support", to: "/support" },
  ] as const,
  socials: [verifiedTelegram],
};
