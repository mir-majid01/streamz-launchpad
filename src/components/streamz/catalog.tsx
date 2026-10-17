import { useEffect, useState } from "react";
import { Bookmark, Check, Download, Languages, Radio, RefreshCw } from "lucide-react";
import { catalog, catalogById, type CatalogItem } from "@/config/catalog";
import type { Feature } from "@/config/features";
import { Eyebrow, Reveal } from "./shared";

type PosterImageProps = {
  item: CatalogItem;
  className?: string;
  eager?: boolean;
};

export function PosterImage({ item, className = "", eager = false }: PosterImageProps) {
  const [failed, setFailed] = useState(false);

  useEffect(() => setFailed(false), [item.poster]);

  if (failed) {
    return (
      <div
        className={`poster-image poster-image-fallback ${className}`}
        role="img"
        aria-label={`${item.title} artwork unavailable`}
      >
        <span>ARTWORK UNAVAILABLE</span>
        <strong>{item.title}</strong>
      </div>
    );
  }

  return (
    <img
      className={`poster-image ${className}`}
      src={item.poster}
      alt={item.alt}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      onError={() => setFailed(true)}
    />
  );
}

export function PosterCard({
  item,
  index = 0,
  eager = false,
}: {
  item: CatalogItem;
  index?: number;
  eager?: boolean;
}) {
  return (
    <article className="catalog-card" aria-label={`${item.title}, ${item.kind}, ${item.year}`}>
      <div className="catalog-card-poster">
        <PosterImage item={item} eager={eager} />
        <span className="catalog-card-index">0{index + 1}</span>
      </div>
      <div className="catalog-card-meta">
        <div>
          <h3>{item.title}</h3>
          <span>{item.kind === "movie" ? "Film" : "Series"}</span>
        </div>
        <p>
          {item.year} <span>·</span> {item.genre}
        </p>
      </div>
    </article>
  );
}

export function PosterRail({
  items,
  label,
  className = "",
}: {
  items: CatalogItem[];
  label: string;
  className?: string;
}) {
  return (
    <div className={`catalog-rail-region ${className}`} role="region" aria-label={label}>
      <ul className="catalog-rail">
        {items.map((item, index) => (
          <li key={item.id}>
            <PosterCard item={item} index={index} eager={index < 2} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export function CatalogShowcase() {
  return (
    <section className="catalog-showcase" aria-labelledby="catalog-showcase-title">
      <div className="wrap">
        <Reveal className="catalog-showcase-heading" reveal="mask">
          <Eyebrow>EDITORIAL SHOWCASE</Eyebrow>
          <h2 id="catalog-showcase-title">
            Find a new
            <br />
            point of view.
          </h2>
          <p>
            A visual sample of the films and stories StreamZ is designed to help you discover. The
            prototype has no connected playback or live catalog.
          </p>
        </Reveal>
      </div>
      <Reveal reveal="scale" className="catalog-showcase-rail">
        <PosterRail items={catalog} label="Editorial film poster showcase" />
      </Reveal>
      <p className="catalog-disclosure">
        <span className="tiny-signal" /> PUBLIC-DOMAIN EDITORIAL ARTWORK · NOT PLAYABLE IN THIS
        PROTOTYPE
      </p>
    </section>
  );
}

function VisualPoster({ item, className = "" }: { item: CatalogItem; className?: string }) {
  return (
    <div className={`feature-visual-poster ${className}`}>
      <PosterImage item={item} />
    </div>
  );
}

export function FeatureVisual({ feature }: { feature: Feature }) {
  const items = feature.visual.catalogIds.map(catalogById);
  const [first, second, third] = items;

  return (
    <div
      className={`feature-visual feature-visual-${feature.visual.kind}`}
      aria-label={`${feature.title} concept visual`}
    >
      {feature.visual.kind === "poster-mosaic" && (
        <div className="feature-visual-mosaic">
          {items.map((item, index) => (
            <VisualPoster
              key={item.id}
              item={item}
              className={`mosaic-poster mosaic-poster-${index + 1}`}
            />
          ))}
          <span className="visual-stamp">EDITORIAL MIX</span>
        </div>
      )}

      {feature.visual.kind === "series-rail" && (
        <div className="feature-visual-lineup">
          {items.map((item) => (
            <VisualPoster key={item.id} item={item} />
          ))}
          <span className="visual-stamp">
            <Radio size={12} /> FUTURE CHANNEL CONCEPT
          </span>
        </div>
      )}

      {feature.visual.kind === "download-concept" && first && (
        <div className="feature-visual-single">
          <VisualPoster item={first} />
          <div className="visual-panel">
            <Download size={17} />
            <span>INTENDED OFFLINE FLOW</span>
            <i />
          </div>
        </div>
      )}

      {feature.visual.kind === "language-concept" && first && second && (
        <div className="feature-visual-single feature-visual-language">
          <VisualPoster item={first} />
          <div className="visual-panel">
            <Languages size={17} />
            <span>LANGUAGE UI CONCEPT</span>
            <div className="visual-pills">
              <b>Audio</b>
              <b>Subs</b>
            </div>
          </div>
          <VisualPoster item={second} className="language-secondary" />
        </div>
      )}

      {feature.visual.kind === "saved-concept" && (
        <div className="feature-visual-saved">
          {items.map((item, index) => (
            <VisualPoster
              key={item.id}
              item={item}
              className={`saved-poster saved-poster-${index + 1}`}
            />
          ))}
          <span className="visual-stamp">
            <Bookmark size={12} /> PLANNED SAVE STATE
          </span>
        </div>
      )}

      {feature.visual.kind === "updates-concept" && first && (
        <div className="feature-visual-update">
          <VisualPoster item={first} />
          <div className="visual-panel">
            <RefreshCw size={17} />
            <span>RELEASE NOTE CONCEPT</span>
            <strong>What changed</strong>
            <small>Illustrative update surface · not delivery status</small>
            <Check size={14} />
          </div>
          {third && <VisualPoster item={third} className="update-secondary" />}
        </div>
      )}
    </div>
  );
}
