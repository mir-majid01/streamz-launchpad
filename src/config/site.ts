export const STREAMZ_APK_URL = import.meta.env.VITE_STREAMZ_APK_URL || "/downloads/StreamZ.apk";

// Replace these placeholders only with verified release information.
export const site = {
  name: "StreamZ",
  supportEmail: "support@example.com",
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
  // Add verified social destinations here. Empty entries are not rendered.
  socials: [] as { label: string; url: string }[],
};
