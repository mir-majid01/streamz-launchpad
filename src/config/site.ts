export const STREAMZ_APK_URL = import.meta.env.VITE_STREAMZ_APK_URL || "/downloads/StreamZ.apk";

// Replace these placeholders only with verified release information.
export const site = {
  name: "StreamZ",
  supportEmail: "streamzz.official@gmail.com",
  telegramUrl: "https://t.me/Mirmajid01",
  apkUrl: STREAMZ_APK_URL,
  release: {
    version: "",
    size: "",
    checksum: "",
    releaseDate: "",
    minimumAndroid: "",
  },
  nav: [
    { label: "Home", to: "/" },
    { label: "Features", to: "/features" },
    { label: "Download", to: "/download" },
    { label: "About", to: "/about" },
    { label: "Support", to: "/support" },
  ] as const,
  socials: [{ label: "Telegram · @Mirmajid01", url: "https://t.me/Mirmajid01" }],
};
