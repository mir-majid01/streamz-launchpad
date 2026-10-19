import { useEffect, useState } from "react";
import { Bookmark, Check, Download, Languages, Radio, RefreshCw } from "lucide-react";
import { catalog, catalogById, type CatalogItem } from "@/config/catalog";
import { liveCategories } from "@/config/live-tv";
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
          <Eyebrow>TRENDING THIS WEEK</Eyebrow>
          <h2 id="catalog-showcase-title">
            What everyone
            <br />
            is watching.
          </h2>
          <p>
            The week’s biggest films and series, lined up in one browse. StreamZ sorts them by
            genre, language and region so the thing you want is the thing you find.
          </p>
        </Reveal>
      </div>
      <Reveal reveal="scale" className="catalog-showcase-rail">
        <PosterRail items={catalog} label="Trending film and series posters" />
      </Reveal>
      <p className="catalog-disclosure">
        <span className="tiny-signal" /> DISTRIBUTOR PROMOTIONAL KEY ART · SHOWN AS DISCOVERY
        EXAMPLES
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
          <span className="visual-stamp">TRENDING NOW</span>
        </div>
      )}

      {feature.visual.kind === "live-wall" && (
        <div className="feature-visual-live">
          <ul className="live-wall live-wall-mini" aria-label="Live TV categories">
            {liveCategories.slice(0, 4).map((item, index) => (
              <li
                className="live-tile"
                key={item.id}
                style={{ "--accent": item.accent, "--glow": item.glow } as React.CSSProperties}
              >
                <span className="live-tile-live">
                  <i />
                  LIVE
                </span>
                <strong>{item.name}</strong>
                <span className="live-tile-progress" aria-hidden="true">
                  <b style={{ width: `${46 + index * 12}%` }} />
                </span>
              </li>
            ))}
          </ul>
          <span className="visual-stamp">
            <Radio size={12} /> LIVE TV GUIDE
          </span>
        </div>
      )}

      {feature.visual.kind === "download-concept" && first && (
        <div className="feature-visual-single">
          <VisualPoster item={first} />
          <div className="visual-panel">
            <Download size={17} />
            <span>OFFLINE DOWNLOAD QUEUE</span>
            <i />
          </div>
        </div>
      )}

      {feature.visual.kind === "language-concept" && first && second && (
        <div className="feature-visual-single feature-visual-language">
          <VisualPoster item={first} />
          <div className="visual-panel">
            <Languages size={17} />
            <span>SUBTITLES &amp; AUDIO</span>
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
            <Bookmark size={12} /> MY LIST
          </span>
        </div>
      )}

      {feature.visual.kind === "updates-concept" && first && (
        <div className="feature-visual-update">
          <VisualPoster item={first} />
          <div className="visual-panel">
            <RefreshCw size={17} />
            <span>UPDATE AVAILABLE</span>
            <strong>What changed</strong>
            <small>Changelog shown before you install</small>
            <Check size={14} />
          </div>
          {third && <VisualPoster item={third} className="update-secondary" />}
        </div>
      )}
    </div>
  );
}
