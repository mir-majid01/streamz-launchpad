import { describe, it, expect, vi } from "vitest";
import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { render, screen } from "@testing-library/react";
import { site, STREAMZ_APK_URL } from "@/config/site";
import { isReady, verifyApk } from "@/lib/download";
import { faqs, searchFaq } from "@/config/faq";
import { features } from "@/config/features";
import { catalog, catalogById, posterSources } from "@/config/catalog";
import { liveCategories, liveSurfaces } from "@/config/live-tv";
import { DownloadButton } from "@/components/streamz/download-button";

const APK_ASSET = "https://github.com/mir-majid01/StreamZ/releases/latest/download/app-release.apk";

describe("StreamZ release rules", () => {
  it("defaults to the signed GitHub release asset", () => {
    expect(STREAMZ_APK_URL).toBe(APK_ASSET);
    expect(site.apkUrl).toBe(STREAMZ_APK_URL);
  });
  it("keeps the verified contact channels in site config", () => {
    expect(site.supportEmail).toBe("streamzz.official@gmail.com");
    expect(site.telegram).toEqual({
      label: "Telegram",
      handle: "@Mirmajid01",
      url: "https://t.me/Mirmajid01",
    });
    expect(site.socials).toContainEqual(site.telegram);
  });
  it("publishes only release metadata read from the release asset", () => {
    expect(site.release.version).toBe("0.1.4");
    expect(site.release.build).toBe("5");
    expect(site.release.size).toBe("78 MB");
    expect(site.release.checksum).toBe(
      "6ce342981e1b01b48346c8cef0eae6af0f7470523e9985394b2d1f2e6d970dc3",
    );
    expect(site.release.checksum).toMatch(/^[0-9a-f]{64}$/);
    expect(site.release.minimumAndroid).toBe("");
  });
  it("renders the download CTA as a direct anchor, not a navigation or dialog", () => {
    render(<DownloadButton label="Download APK" />);
    const anchor = screen.getByRole("link", { name: /Download APK/i });
    expect(anchor.getAttribute("href")).toBe(site.apkUrl);
    expect(anchor.hasAttribute("download")).toBe(true);
    expect(anchor.getAttribute("target")).toBeNull();
  });
  it("reports an unconfigured URL as missing", async () => {
    const fetcher = vi.fn();
    expect(await verifyApk("", fetcher)).toBe("missing");
    expect(fetcher).not.toHaveBeenCalled();
  });
  it("reports a missing local APK as missing", async () => {
    expect(
      await verifyApk(
        "/downloads/StreamZ.apk",
        vi.fn().mockResolvedValue(new Response(null, { status: 404 })),
      ),
    ).toBe("missing");
  });
  it("rejects a successful HTML fallback rather than pretending a file exists", async () => {
    expect(
      await verifyApk(
        "/downloads/StreamZ.apk",
        vi.fn().mockResolvedValue(new Response(null, { headers: { "content-type": "text/html" } })),
      ),
    ).toBe("missing");
  });
  it("accepts an available APK file", async () => {
    const status = await verifyApk(
      "/downloads/StreamZ.apk",
      vi.fn().mockResolvedValue(
        new Response(null, {
          headers: { "content-type": "application/vnd.android.package-archive" },
        }),
      ),
    );
    expect(status).toBe("available");
    expect(isReady(status)).toBe(true);
  });
  it("keeps a CORS-blocked release host as unverifiable instead of blocking the download", async () => {
    const status = await verifyApk(
      APK_ASSET,
      vi.fn().mockRejectedValue(new Error("Network error")),
    );
    expect(status).toBe("unverifiable");
    expect(isReady(status)).toBe(true);
  });
  it("treats a failed probe of a same-origin path as missing", async () => {
    expect(
      await verifyApk("/downloads/StreamZ.apk", vi.fn().mockRejectedValue(new Error("boom"))),
    ).toBe("missing");
  });
});

describe("FAQ search", () => {
  it("finds Android installation guidance with case-insensitive multi-term input", () => {
    expect(searchFaq("ANDROID authorize").some((faq) => faq.category === "Installation")).toBe(
      true,
    );
  });
  it("finds the contact FAQ with configured email and Telegram details", () => {
    const contactFaq = faqs.find((faq) => faq.question === "How can I contact support?");
    expect(contactFaq?.answer).toContain(site.supportEmail);
    expect(contactFaq?.answer).toContain(site.telegram.handle);
    expect(contactFaq?.answer).toContain(site.telegram.url);
    expect(searchFaq("STREAMZZ.OFFICIAL@GMAIL.COM MIRMAJID01")).toEqual([contactFaq]);
  });
  it("answers live TV, download and checksum questions", () => {
    expect(searchFaq("live categories").some((faq) => faq.category === "Live TV")).toBe(true);
    expect(searchFaq("app-release.apk").length).toBeGreaterThan(0);
    const checksum = searchFaq("SHA-256 digest");
    expect(checksum.some((faq) => faq.answer.includes(site.release.checksum))).toBe(true);
  });
  it("returns no irrelevant matches", () => {
    expect(searchFaq("a-nonexistent-feature")).toEqual([]);
  });
  it("no longer presents the app as a prototype", () => {
    for (const faq of faqs) {
      expect(`${faq.question} ${faq.answer}`).not.toMatch(/prototype|not been confirmed|concept/i);
    }
  });
});

describe("App capabilities", () => {
  const renderedVisuals = [
    "poster-mosaic",
    "live-wall",
    "download-concept",
    "language-concept",
    "saved-concept",
    "updates-concept",
  ] as const;
  it("tags every feature as an uppercase capability label", () => {
    for (const feature of features) expect(feature.tag).toBe(feature.tag.toUpperCase());
  });
  it("only uses visual compositions FeatureVisual renders", () => {
    for (const feature of features) {
      expect(renderedVisuals).toContain(feature.visual.kind);
    }
  });
  it("describes shipped behaviour without prototype hedges", () => {
    for (const feature of features) {
      expect(feature.description).not.toMatch(/intended|planned|to be confirmed|vision/i);
    }
  });
});

describe("Catalogue artwork", () => {
  it("keeps catalog IDs and titles unique", () => {
    expect(new Set(catalog.map((item) => item.id)).size).toBe(catalog.length);
    expect(new Set(catalog.map((item) => item.title)).size).toBe(catalog.length);
  });
  it("stores every poster locally and records its provenance", () => {
    for (const item of catalog) {
      expect(item.poster).toMatch(/^\/catalog\/trending\//);
      expect(existsSync(resolve(process.cwd(), "public", item.poster.slice(1)))).toBe(true);
      const source = posterSources[item.sourceKey];
      expect(source).toBeDefined();
      expect(source.articleUrl).toContain("en.wikipedia.org/wiki/");
      expect(source.fileUrl).toContain("upload.wikimedia.org");
      expect(source.rights).toMatch(/copyright held by the distributor/i);
      expect(source.credit.length).toBeGreaterThan(2);
    }
  });
  it("shows current titles rather than the retired public-domain set", () => {
    const years = catalog.map((item) => Number(item.year));
    expect(Math.min(...years)).toBeGreaterThanOrEqual(2024);
    expect(catalog.filter((item) => item.kind === "series").length).toBeGreaterThan(0);
    expect(catalog.some((item) => item.id === "metropolis")).toBe(false);
  });
  it("keeps every feature visual connected to a catalog item", () => {
    const catalogIds = new Set(catalog.map((item) => item.id));
    for (const feature of features) {
      expect(feature.visual.catalogIds.length).toBeGreaterThan(0);
      for (const id of feature.visual.catalogIds) expect(catalogIds).toContain(id);
    }
  });
  it("falls back to the first item for an unknown id", () => {
    expect(catalogById("sinners")).toBe(catalog.find((item) => item.id === "sinners"));
  });
});

describe("Live TV", () => {
  it("keeps category tiles unique with usable accent colours", () => {
    expect(new Set(liveCategories.map((item) => item.id)).size).toBe(liveCategories.length);
    expect(new Set(liveCategories.map((item) => item.name)).size).toBe(liveCategories.length);
    for (const item of liveCategories) {
      expect(item.accent).toMatch(/^#[0-9a-f]{6}$/i);
      expect(item.glow).toMatch(/^rgba\(/);
    }
    expect(liveCategories.length).toBeGreaterThanOrEqual(6);
  });
  it("only describes surfaces LiveSurfaceGrid renders", () => {
    const renderedIcons = ["guide", "filter", "star", "clock"] as const;
    for (const surface of liveSurfaces) expect(renderedIcons).toContain(surface.icon);
    expect(liveSurfaces.length).toBe(4);
  });
});

describe("Site navigation", () => {
  it("points every nav entry at a distinct in-app path", () => {
    const paths = site.nav.map((link) => link.to);
    expect(new Set(paths).size).toBe(paths.length);
    for (const path of paths) expect(path.startsWith("/")).toBe(true);
  });
  it("links the live TV route from the header", () => {
    expect(site.nav.map((link) => link.to)).toContain("/live-tv");
  });
});
