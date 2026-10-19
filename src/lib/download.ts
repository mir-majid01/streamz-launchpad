export type ApkStatus = "available" | "missing" | "unverifiable";

export const APK_NOT_CONFIGURED = "APK download is not configured yet";

function isRelative(url: string): boolean {
  return !/^https?:\/\//i.test(url);
}

export async function verifyApk(url: string, fetcher: typeof fetch = fetch): Promise<ApkStatus> {
  if (!url.trim()) return "missing";
  let parsed: URL;
  try {
    parsed = new URL(url, "https://streamz.example");
  } catch {
    return "missing";
  }
  if (!["http:", "https:"].includes(parsed.protocol)) return "missing";
  // A relative path is served by this app, so a missing file can come back as a
  // successful HTML SPA fallback. An absolute release URL lives on someone else's
  // host, where CORS usually refuses the probe without saying anything about the file.
  try {
    const response = await fetcher(url, { method: "HEAD", cache: "no-store" });
    if (!response.ok) return "missing";
    const type = response.headers.get("content-type")?.toLowerCase() || "";
    if (type.includes("text/html") || type.includes("application/json")) return "missing";
    return "available";
  } catch {
    return isRelative(url) ? "missing" : "unverifiable";
  }
}

export function isReady(status: ApkStatus): boolean {
  return status === "available" || status === "unverifiable";
}
