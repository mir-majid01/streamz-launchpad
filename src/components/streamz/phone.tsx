import { ArrowUpRight, Bookmark, Compass, Download, SlidersHorizontal, Sparkles, Wifi, BatteryFull } from "lucide-react";
export function Phone({ flat = false }: { flat?: boolean }) {
  return <div className={`phone-scene ${flat ? "phone-flat" : ""}`} role="img" aria-label="Illustrative StreamZ Android phone concept, not a working app">
    <div className="phone-side" />
    <div className="phone-shell">
      <div className="phone-camera" />
      <div className="phone-screen">
        <div className="phone-status"><span>9:41</span><span><Wifi size={12} /><BatteryFull size={16} /></span></div>
        <div className="phone-brand">Stream<span>Z</span><span className="phone-avatar">S</span></div>
        <div className="phone-greeting">A LITTLE MORE YOU.</div>
        <div className="phone-headline">Your next<br />great escape.</div>
        <div className="phone-art"><div className="phone-art-line" /><span className="phone-art-tag"><Sparkles size={10} /> A NEW PERSPECTIVE</span><div className="phone-art-title">Beyond<br />the ordinary<span><ArrowUpRight size={20} /></span></div></div>
        <div className="phone-section-title">Made for your moments <span><ArrowUpRight size={12} /></span></div>
        <div className="phone-tools"><div><Bookmark size={17} /><span>Your space</span></div><div><Download size={17} /><span>On the go</span></div><div><SlidersHorizontal size={17} /><span>Your way</span></div></div>
        <div className="phone-bottom"><span className="selected"><Compass size={18} />Discover</span><span><Bookmark size={18} />Saved</span><span><SlidersHorizontal size={18} />Settings</span></div>
        <div className="phone-gesture" />
      </div>
    </div>
    <span className="phone-caption">ILLUSTRATIVE APP CONCEPT</span>
  </div>;
}
