import {
  Bookmark,
  Compass,
  Download,
  Play,
  Radio,
  SlidersHorizontal,
  Star,
  Wifi,
  BatteryFull,
} from "lucide-react";
import { catalog } from "@/config/catalog";
import { liveCategories } from "@/config/live-tv";
import { PosterImage } from "./catalog";

export type PhoneScreen = "home" | "live";

export function Phone({
  flat = false,
  screen = "home",
}: {
  flat?: boolean;
  screen?: PhoneScreen;
}) {
  const featured = catalog[0]!;
  const supporting = catalog.slice(1, 4);

  return (
    <div
      className={`phone-scene ${flat ? "phone-flat" : ""}`}
      role="img"
      aria-label={
        screen === "live"
          ? "Illustrative StreamZ Android live TV guide screen showing channel categories"
          : "Illustrative StreamZ Android home screen concept featuring a movie poster, not a working app"
      }
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
          {screen === "live" ? (
            <>
              <div className="phone-greeting">LIVE ON AIR</div>
              <div className="phone-headline">
                Catch it
                <br />
                as it happens.
              </div>
              <div className="phone-live-chips" aria-hidden="true">
                {liveCategories.slice(0, 4).map((item) => (
                  <span key={item.id}>{item.name}</span>
                ))}
              </div>
              <div className="phone-live-wall">
                {liveCategories.slice(0, 6).map((item, index) => (
                  <div
                    className="phone-live-tile"
                    key={item.id}
                    style={{ "--accent": item.accent } as React.CSSProperties}
                  >
                    <span className="phone-live-dot" />
                    <strong>{item.name}</strong>
                    <span className="phone-live-now">
                      <em>NOW</em>
                      <i style={{ width: `${44 + ((index * 11) % 40)}%` }} />
                    </span>
                    <span className="phone-live-next">
                      <em>NEXT</em>
                      <i />
                    </span>
                  </div>
                ))}
              </div>
              <div className="phone-tools">
                <div>
                  <Radio size={17} />
                  <span>On air</span>
                </div>
                <div>
                  <Star size={17} />
                  <span>Starred</span>
                </div>
                <div>
                  <SlidersHorizontal size={17} />
                  <span>Filter</span>
                </div>
              </div>
              <div className="phone-bottom">
                <span>
                  <Compass size={18} />
                  Discover
                </span>
                <span className="selected">
                  <Radio size={18} />
                  Live
                </span>
                <span>
                  <Bookmark size={18} />
                  Saved
                </span>
              </div>
            </>
          ) : (
            <>
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
                  <span className="phone-featured-tag">TRENDING IN THE APP</span>
                  <strong>{featured.title}</strong>
                  <span className="phone-featured-meta">
                    {featured.year} · {featured.genre.toUpperCase()}
                  </span>
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
            </>
          )}
          <div className="phone-gesture" />
        </div>
      </div>
      <span className="phone-caption">ILLUSTRATIVE APP CONCEPT</span>
    </div>
  );
}
