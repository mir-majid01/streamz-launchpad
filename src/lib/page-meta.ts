const ogImage = "/brand/streamz-cover.png";
const ogImageAlt = "StreamZ brand artwork: a crimson beam of light crossing a dark stage toward a thin luminous horizon.";

export function pageMeta(title: string, description: string, path: string) {
  return {
    meta: [
      { title: `${title} — StreamZ` },
      { name: "description", content: description },
      { property: "og:title", content: `${title} — StreamZ` },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: path },
      { property: "og:image", content: ogImage },
      { property: "og:image:alt", content: ogImageAlt },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: ogImage },
      { name: "twitter:image:alt", content: ogImageAlt },
    ],
    links: [{ rel: "canonical", href: path }],
  };
}
