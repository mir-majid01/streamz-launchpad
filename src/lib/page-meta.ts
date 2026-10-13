export function pageMeta(title: string, description: string, path: string) {
  return {
    meta: [
      { title: `${title} — StreamZ` },
      { name: "description", content: description },
      { property: "og:title", content: `${title} — StreamZ` },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: path },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: path }],
  };
}
