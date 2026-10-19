import { Clock, Radio, Star, SlidersHorizontal } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { liveCategories, liveSurfaces, type LiveCategory } from "@/config/live-tv";
import { Eyebrow, Reveal } from "./shared";

const surfaceIcons = { guide: Radio, filter: SlidersHorizontal, star: Star, clock: Clock };

function CategoryTile({ item, index }: { item: LiveCategory; index: number }) {
  return (
    <li className="live-tile" style={{ "--accent": item.accent, "--glow": item.glow } as React.CSSProperties}>
      <span className="live-tile-bar" aria-hidden="true" style={{ animationDelay: `${index * 90}ms` }}>
        <i />
        <i />
        <i />
        <i />
      </span>
      <span className="live-tile-live">
        <i />
        LIVE
      </span>
      <strong>{item.name}</strong>
      <span className="live-tile-progress" aria-hidden="true">
        <b style={{ width: `${52 + ((index * 9) % 38)}%` }} />
      </span>
      <span className="live-tile-meta">
        <em>NOW</em>
        <em>NEXT</em>
      </span>
    </li>
  );
}

export function ChannelWall({ limit }: { limit?: number }) {
  const items = liveCategories.slice(0, limit ?? liveCategories.length);
  return (
    <ul className="live-wall" aria-label="Live TV categories">
      {items.map((item, index) => (
        <CategoryTile key={item.id} item={item} index={index} />
      ))}
    </ul>
  );
}

export function LiveTvShowcase() {
  return (
    <section className="live-tv-section" aria-labelledby="live-tv-title">
      <div className="live-tv-glow" aria-hidden="true" />
      <div className="wrap live-tv-inner">
        <Reveal className="live-tv-copy" reveal="left">
          <Eyebrow>LIVE TV</Eyebrow>
          <h2 id="live-tv-title">
            On air,
            <br />
            the moment it happens.
          </h2>
          <p>
            Live channels are not a separate app bolted onto the side. They open inside the same
            wall you browse films in, with a schedule underneath so you always know what is playing
            and what comes next.
          </p>
          <ul className="live-chips" aria-label="Live TV category filters">
            {liveCategories.slice(0, 6).map((item) => (
              <li key={item.id} style={{ "--accent": item.accent } as React.CSSProperties}>
                {item.name}
              </li>
            ))}
          </ul>
          <Button variant="outline" size="lg" asChild className="live-tv-cta">
            <Link to="/live-tv">See the live guide</Link>
          </Button>
        </Reveal>
        <Reveal className="live-tv-stage" reveal="right">
          <ChannelWall limit={8} />
          <p className="live-caption">
            <span className="tiny-signal" /> GUIDE SURFACE · CATEGORIES AND SCHEDULE LOAD INSIDE THE
            APP
          </p>
        </Reveal>
      </div>
    </section>
  );
}

export function LiveSurfaceGrid() {
  return (
    <div className="live-surface-grid">
      {liveSurfaces.map((surface, index) => {
        const Icon = surfaceIcons[surface.icon];
        return (
          <Reveal key={surface.title} className="live-surface">
            <span className="live-surface-icon">
              <Icon size={17} />
            </span>
            <h3>{surface.title}</h3>
            <p>{surface.body}</p>
            <span className="live-surface-index">0{index + 1}</span>
          </Reveal>
        );
      })}
    </div>
  );
}
