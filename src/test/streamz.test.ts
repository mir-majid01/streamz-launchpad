import { describe, it, expect, vi } from "vitest";
import { site, STREAMZ_APK_URL } from "@/config/site";
import { verifyApk } from "@/lib/download";
import { searchFaq } from "@/config/faq";

describe("StreamZ release rules", () => {
  it("defaults to the requested local APK URL", () => { expect(STREAMZ_APK_URL).toBe("/downloads/StreamZ.apk"); expect(site.apkUrl).toBe(STREAMZ_APK_URL); });
  it("keeps the prototype support address", () => { expect(site.supportEmail).toBe("support@example.com"); });
  it("does not invent release metadata", () => { expect(Object.values(site.release)).toEqual(["", "", "", "", ""]); });
  it("rejects an unconfigured URL", async () => { const fetcher = vi.fn(); expect(await verifyApk("", fetcher)).toBe(false); expect(fetcher).not.toHaveBeenCalled(); });
  it("rejects a missing local APK", async () => { expect(await verifyApk("/downloads/StreamZ.apk", vi.fn().mockResolvedValue(new Response(null, { status: 404 })))).toBe(false); });
  it("rejects a successful HTML fallback rather than pretending a file exists", async () => { expect(await verifyApk("/downloads/StreamZ.apk", vi.fn().mockResolvedValue(new Response(null, { headers: { "content-type": "text/html" } })))).toBe(false); });
  it("accepts an available APK file", async () => { expect(await verifyApk("/downloads/StreamZ.apk", vi.fn().mockResolvedValue(new Response(null, { headers: { "content-type": "application/vnd.android.package-archive" } })))).toBe(true); });
  it("rejects inaccessible release hosts", async () => { expect(await verifyApk("https://release.example/StreamZ.apk", vi.fn().mockRejectedValue(new Error("Network error")))).toBe(false); });
});
describe("FAQ search", () => {
  it("finds Android installation guidance with case-insensitive multi-term input", () => { expect(searchFaq("ANDROID authorize").some((faq) => faq.category === "Installation")).toBe(true); });
  it("returns no irrelevant matches", () => { expect(searchFaq("a-nonexistent-feature")).toEqual([]); });
});
