import {
  Bookmark,
  Compass,
  Download,
  Play,
  SlidersHorizontal,
  Wifi,
  BatteryFull,
} from "lucide-react";
import { catalog } from "@/config/catalog";
import { PosterImage } from "./catalog";

export function Phone({ flat = false }: { flat?: boolean }) {
  const featured = catalog[0]!;
  const supporting = catalog.slice(1, 4);

  return (
    <div
      className={`phone-scene ${flat ? "phone-flat" : ""}`}
      role="img"
      aria-label="Illustrative StreamZ Android home screen concept featuring a movie poster, not a working app"
    >
      <div className="phone-side" />
      <div className="phone-shell">
        <div className="phone-camera" />
        <div className="phone-screen">
          <div className="phone-status">
            <span>9:41</span>
            <span>
              <Wifi size={12} />
              <BatteryFull size={16} />
            </span>
          </div>
          <div className="phone-brand">
            Stream<span>Z</span>
            <span className="phone-avatar">S</span>
          </div>
          <div className="phone-greeting">YOUR NEXT WATCH</div>
          <div className="phone-headline">
            Stories worth
            <br />
            staying for.
          </div>
          <div className="phone-featured">
            <PosterImage item={featured} className="phone-featured-poster" eager />
            <div className="phone-featured-scrim" />
            <div className="phone-featured-copy">
              <span className="phone-featured-tag">FEATURED · EDITORIAL</span>
              <strong>{featured.title}</strong>
              <span className="phone-featured-meta">{featured.year} · SCIENCE FICTION</span>
              <div className="phone-featured-actions">
                <span className="phone-action phone-action-primary">
                  <Play size={9} fill="currentColor" /> Play
                </span>
                <span className="phone-action">
                  <Bookmark size={9} /> Save
                </span>
              </div>
            </div>
          </div>
          <div className="phone-section-title">
            Keep exploring <span>SEE ALL</span>
          </div>
          <div className="phone-poster-rail" aria-hidden="true">
            {supporting.map((item) => (
              <PosterImage key={item.id} item={item} className="phone-poster-thumb" />
            ))}
          </div>
          <div className="phone-tools">
            <div>
              <Bookmark size={17} />
              <span>Your space</span>
            </div>
            <div>
              <Download size={17} />
              <span>On the go</span>
            </div>
            <div>
              <SlidersHorizontal size={17} />
              <span>Your way</span>
            </div>
          </div>
          <div className="phone-bottom">
            <span className="selected">
              <Compass size={18} />
              Discover
            </span>
            <span>
              <Bookmark size={18} />
              Saved
            </span>
            <span>
              <SlidersHorizontal size={18} />
              Settings
            </span>
          </div>
          <div className="phone-gesture" />
        </div>
      </div>
      <span className="phone-caption">ILLUSTRATIVE APP CONCEPT</span>
    </div>
  );
}
