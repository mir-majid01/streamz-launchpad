import { describe, it, expect, vi } from "vitest";
import { site, STREAMZ_APK_URL } from "@/config/site";
import { verifyApk } from "@/lib/download";
import { searchFaq } from "@/config/faq";
import { brandFrames, features } from "@/config/features";

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
describe("Intended capability list", () => {
  const renderedArt = ["discovery", "live", "offline", "language", "saved", "updates"] as const;
  it("keeps every feature scoped as an intention rather than a shipped claim", () => {
    for (const feature of features) {
      expect(feature.tag).toBe(feature.tag.toUpperCase());
      expect(feature.description).toMatch(/confirm|intended|planned|depend/i);
    }
  });
  it("only uses artwork variants the FeatureArt component renders", () => {
    for (const feature of features) expect(renderedArt).toContain(feature.art);
  });
});
describe("Brand artwork frames", () => {
  it("labels every frame as a numbered brand frame, never a title", () => {
    expect(brandFrames.length).toBeGreaterThan(0);
    for (const frame of brandFrames) expect(frame.label).toMatch(/^FRAME \d{2}$/);
  });
  it("keeps frame captions abstract so they cannot read as catalogue content", () => {
    const catalogueWords = /stream|watch|episode|season|title|new release|premium|hd|4k/i;
    for (const frame of brandFrames) expect(frame.credit).not.toMatch(catalogueWords);
  });
});
describe("Site navigation", () => {
  it("points every nav entry at a distinct in-app path", () => {
    const paths = site.nav.map((link) => link.to);
    expect(new Set(paths).size).toBe(paths.length);
    for (const path of paths) expect(path.startsWith("/")).toBe(true);
  });
});
