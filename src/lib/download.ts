export const APK_NOT_CONFIGURED = "APK download is not configured yet";

export async function verifyApk(url: string, fetcher: typeof fetch = fetch): Promise<boolean> {
  if (!url.trim()) return false;
  try {
    const parsed = new URL(url, "https://streamz.example");
    if (!["http:", "https:"].includes(parsed.protocol)) return false;
    const response = await fetcher(url, { method: "HEAD", cache: "no-store" });
    if (!response.ok) return false;
    const type = response.headers.get("content-type")?.toLowerCase() || "";
    // A missing file can return a successful HTML SPA fallback; reject it.
    return !type.includes("text/html") && !type.includes("application/json");
  } catch {
    // A release host must allow the availability check; never report false success.
    return false;
  }
}
