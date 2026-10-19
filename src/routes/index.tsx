import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, ArrowDown, Smartphone, Sparkles, Compass, SlidersHorizontal, MoveUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DownloadButton } from "@/components/streamz/download-button";
import { Phone } from "@/components/streamz/phone";
import { Reveal, Eyebrow, FeatureGrid, DownloadBand, FaqList, TextLink } from "@/components/streamz/shared";
import { CatalogShowcase } from "@/components/streamz/catalog";
import { LiveTvShowcase } from "@/components/streamz/live-tv";
import { site } from "@/config/site";
import { pageMeta } from "@/lib/page-meta";

export const Route = createFileRoute("/")({
  head: () => pageMeta("StreamZ · Films, series and live TV on Android", "StreamZ is an Android entertainment app: browse films and series, drop into live TV with a full guide, download for offline, and invite friends into a watch party. Current release v0.1.2.", "/"),
  component: Home,
});
function Home() {
  return <div className="page-content">
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-beam" aria-hidden="true" />
      <div className="hero-beam hero-beam-thin" aria-hidden="true" />
      <div className="hero-vignette" aria-hidden="true" />
      <div className="hero-grain" aria-hidden="true" />
      <div className="hero-horizon" aria-hidden="true" />
      <div className="wrap hero-inner"><div className="hero-copy"><Eyebrow>A NEW PERSPECTIVE ON ENTERTAINMENT</Eyebrow><h1 className="hero-wordmark" id="hero-title"><span className="mask-line"><span>Stream<span className="accent">Z</span></span></span></h1><h2 className="hero-headline"><span className="mask-line i-1"><span>Your world.</span></span><span className="mask-line i-2"><span>Beyond the ordinary.</span></span></h2><p className="hero-lede">Less noise. More possibility. A thoughtfully designed entertainment experience, made for your Android.</p><div className="hero-ctas"><DownloadButton /><Button variant="outline" size="lg" asChild><Link to="/features">Explore features <ArrowUpRight /></Link></Button></div><div className="hero-footnote"><Smartphone size={13} /> Made for Android <span>·</span> v{site.release.version} out now</div></div><div className="hero-phone"><Phone /><div className="phone-note"><Sparkles size={20} /><div><strong>Built for the way you watch.</strong><span>Films, series and live TV in one app</span></div></div></div></div>
      <div className="hero-bottom wrap"><span><span className="tiny-signal" /> ENTERTAINMENT, WITH A NEW POINT OF VIEW.</span><span>DESIGNED AROUND YOU <MoveUpRight size={13} /></span><a href="#possibilities">SCROLL TO EXPLORE <ArrowDown size={13} /></a></div>
    </section>
     <CatalogShowcase />
    <LiveTvShowcase />
    <div className="wrap benefit-strip"><Reveal className="benefit"><Compass size={20} /><div><h3>Find your next favourite</h3><p>Rows that read like a shelf, sorted by genre, language and region.</p></div></Reveal><Reveal className="benefit"><Smartphone size={20} /><div><h3>Made for life on the move</h3><p>Downloads for the flight, and a layout for the TV when you get in.</p></div></Reveal><Reveal className="benefit"><SlidersHorizontal size={20} /><div><h3>More you. Less friction.</h3><p>Subtitles set once, resume that remembers, updates that explain themselves.</p></div></Reveal></div>
    <section className="section wrap" id="possibilities"><Reveal className="section-top" reveal="mask"><div><Eyebrow>THE POSSIBILITIES</Eyebrow><h2>Not just more.<br />More of what matters.</h2></div><TextLink to="/features">Explore all features</TextLink></Reveal><FeatureGrid /></section>
    <section className="section how-section"><div className="wrap"><Reveal className="section-top"><div><Eyebrow>A SIMPLE START</Eyebrow><h2>Your next chapter.<br />Three small steps.</h2></div><p>Three taps and the app is on your phone. No store account needed to start.</p></Reveal><div className="steps"><Reveal className="step"><div className="step-number">01</div><h3>Download the APK</h3><p>Take the current signed release from the button on this page or the download page.</p></Reveal><Reveal className="step"><div className="step-number">02</div><h3>Allow the install once</h3><p>Open the file and let Android install from that source. Switch the permission back off afterwards.</p></Reveal><Reveal className="step"><div className="step-number">03</div><h3>Sign in and start watching</h3><p>Sign in with Google, then browse films, series and live channels on the same screen.</p></Reveal></div></div></section>
    <DownloadBand />
    <section className="section wrap home-faq"><Reveal><Eyebrow>A FEW GOOD QUESTIONS</Eyebrow><h2>A little clarity.<br />Before you begin.</h2><p>The essentials, without the guesswork.</p><TextLink to="/support">Visit help & support</TextLink></Reveal><Reveal><FaqList limit={3} /></Reveal></section>
  </div>;
}
