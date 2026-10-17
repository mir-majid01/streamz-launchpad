import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, ArrowDown, Smartphone, Sparkles, Compass, SlidersHorizontal, Info, MoveUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DownloadButton } from "@/components/streamz/download-button";
import { Phone } from "@/components/streamz/phone";
import { Reveal, Eyebrow, FeatureGrid, DownloadBand, FaqList, TextLink } from "@/components/streamz/shared";
import { CatalogShowcase } from "@/components/streamz/catalog";
import { pageMeta } from "@/lib/page-meta";

export const Route = createFileRoute("/")({
  head: () => pageMeta("StreamZ · A new perspective on entertainment", "Meet StreamZ, an Android app concept for a more considered entertainment experience. Explore intended features and Android release information.", "/"),
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
      <div className="wrap hero-inner"><div className="hero-copy"><Eyebrow>A NEW PERSPECTIVE ON ENTERTAINMENT</Eyebrow><h1 className="hero-wordmark" id="hero-title"><span className="mask-line"><span>Stream<span className="accent">Z</span></span></span></h1><h2 className="hero-headline"><span className="mask-line i-1"><span>Your world.</span></span><span className="mask-line i-2"><span>Beyond the ordinary.</span></span></h2><p className="hero-lede">Less noise. More possibility. A thoughtfully designed entertainment experience, made for your Android.</p><div className="hero-ctas"><DownloadButton /><Button variant="outline" size="lg" asChild><Link to="/features">Explore features <ArrowUpRight /></Link></Button></div><div className="hero-footnote"><Smartphone size={13} /> Made for Android <span>·</span> Release information coming soon</div></div><div className="hero-phone"><Phone /><div className="phone-note"><Sparkles size={20} /><div><strong>A little different. By design.</strong><span>A considered Android app concept</span></div></div></div></div>
      <div className="hero-bottom wrap"><span><span className="tiny-signal" /> ENTERTAINMENT, WITH A NEW POINT OF VIEW.</span><span>DESIGNED AROUND YOU <MoveUpRight size={13} /></span><a href="#possibilities">SCROLL TO EXPLORE <ArrowDown size={13} /></a></div>
    </section>
     <CatalogShowcase />
    <div className="wrap benefit-strip"><Reveal className="benefit"><Compass size={20} /><div><h3>Find your next favorite</h3><p>A vision for discovery that feels personal.</p></div></Reveal><Reveal className="benefit"><Smartphone size={20} /><div><h3>Made for life on the move</h3><p>An Android-first experience, wherever life goes.</p></div></Reveal><Reveal className="benefit"><SlidersHorizontal size={20} /><div><h3>More you. Less friction.</h3><p>Thoughtful details. A simpler point of view.</p></div></Reveal></div>
    <section className="section wrap" id="possibilities"><Reveal className="section-top" reveal="mask"><div><Eyebrow>THE POSSIBILITIES</Eyebrow><h2>Not just more.<br />More of what matters.</h2></div><TextLink to="/features">Explore all features</TextLink></Reveal><FeatureGrid /><p className="intention-note"><Info size={13} /> A glimpse of what we’re building toward. Features shown are intended capabilities, subject to the actual app release.</p></section>
    <section className="section how-section"><div className="wrap"><Reveal className="section-top"><div><Eyebrow>A SIMPLE START</Eyebrow><h2>Your next chapter.<br />Three small steps.</h2></div><p>When the verified release arrives, getting started should feel as considered as everything else.</p></Reveal><div className="steps"><Reveal className="step"><div className="step-number">01</div><h3>Get the Android app</h3><p>Find the verified APK and confirmed release details on the download page.</p></Reveal><Reveal className="step"><div className="step-number">02</div><h3>Make yourself at home</h3><p>Open the APK and follow Android’s installation prompts, including source authorization if requested.</p></Reveal><Reveal className="step"><div className="step-number">03</div><h3>Discover your perspective</h3><p>Explore the capabilities available in the actual release, and make the experience your own.</p></Reveal></div></div></section>
    <DownloadBand />
    <section className="section wrap home-faq"><Reveal><Eyebrow>A FEW GOOD QUESTIONS</Eyebrow><h2>A little clarity.<br />Before you begin.</h2><p>The essentials, without the guesswork.</p><TextLink to="/support">Visit help & support</TextLink></Reveal><Reveal><FaqList limit={3} /></Reveal></section>
  </div>;
}
