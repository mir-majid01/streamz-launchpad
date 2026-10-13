import { useEffect, useRef, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight, ArrowRight, Compass, Radio, Download, Languages, Bookmark, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { DownloadButton } from "./download-button";
import { faqs } from "@/config/faq";

export function Reveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = ref.current;
    if (!element || !window.IntersectionObserver) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { element.classList.add("is-visible"); observer.disconnect(); }
    }, { threshold: 0.08 });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  return <div ref={ref} className={`reveal ${className}`}>{children}</div>;
}
export function Eyebrow({ children }: { children: ReactNode }) { return <div className="eyebrow"><span className="signal-line" />{children}</div>; }
export function PageIntro({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return <section className="page-intro wrap entrance"><Eyebrow>{eyebrow}</Eyebrow><h1>{title}</h1><p>{description}</p></section>;
}
export const features = [
  { icon: Compass, title: "Discovery, reimagined.", short: "Less searching. More finding.", description: "A more thoughtful way to explore. Intended discovery tools will help you find what fits your mood, without the endless scroll.", art: "discovery", tag: "FIND YOUR NEXT" },
  { icon: Radio, title: "In the moment.", short: "A place for live experiences.", description: "Live TV is part of the vision: an intuitive place for real-time experiences, with availability to be confirmed at release.", art: "live", tag: "LIVE TV" },
  { icon: Download, title: "Take it with you.", short: "Your moments, on the move.", description: "Planned offline downloads will make room for entertainment away from a connection. Supported content and limits are to be confirmed.", art: "offline", tag: "OFFLINE DOWNLOADS" },
  { icon: Languages, title: "Make it your own.", short: "Your language. Your preference.", description: "Intended audio and subtitle controls will let you shape the experience around you. Language availability will depend on the actual release.", art: "language", tag: "AUDIO & SUBTITLES" },
  { icon: Bookmark, title: "Keep the good ones.", short: "A space for what’s next.", description: "A planned personal watchlist will bring the things you want to return to into one considered space, without losing your place.", art: "saved", tag: "YOUR WATCHLIST" },
  { icon: RefreshCw, title: "Always moving forward.", short: "A better experience, over time.", description: "Clear release notes and a straightforward update path are part of the plan. Update frequency and functionality are not yet confirmed.", art: "updates", tag: "APP UPDATES" },
];
export function FeatureArt({ type }: { type: string }) {
  return <div className={`feature-art art-${type}`} aria-hidden="true">
    {type === "discovery" ? <><div className="orbit orbit-one" /><div className="orbit orbit-two" /><div className="orbit orbit-three" /><Compass className="art-icon" size={36} /></> : type === "live" ? <><div className="wave-bars">{Array.from({length: 19}, (_, i) => <i key={i} />)}</div><span className="live-pill"><i />IN THE MOMENT</span></> : type === "offline" ? <><div className="art-file file-back" /><div className="art-file"><Download size={32} /><div className="download-progress" /></div><span className="art-small-label">READY WHEN YOU ARE</span></> : type === "language" ? <><span className="language-word">Hello.</span><span className="language-other">Hola. Bonjour. こんにちは.</span></> : type === "saved" ? <><div className="saved-stack" /><Bookmark size={45} className="art-icon" /></> : <><RefreshCw size={48} className="update-icon" /><span className="art-small-label">THE NEXT CHAPTER</span></>}
  </div>;
}
export function FeatureGrid({ all = false }: { all?: boolean }) {
  return <div className="feature-grid">{features.slice(0, all ? 6 : 3).map((feature, index) => <Reveal key={feature.title} className="feature-card"><FeatureArt type={feature.art} /><div className="feature-card-content"><div className="feature-card-top"><span className="feature-number">0{index + 1}</span><feature.icon size={18} /></div><h3>{feature.title}</h3><p>{all ? feature.description : feature.short}</p>{!all && <Link to="/features" className="feature-link" aria-label={`Explore ${feature.title}`}><ArrowUpRight size={19} /></Link>}{all && <span className="capability-label">{feature.tag} · INTENDED CAPABILITY</span>}</div></Reveal>)}</div>;
}
export function DownloadBand() {
  return <Reveal><section className="download-band wrap"><div className="download-band-art" aria-hidden="true">Z</div><div><Eyebrow>YOUR NEXT CHAPTER</Eyebrow><h2>More possibility.<br />Right in your pocket.</h2><p>A new perspective on entertainment. Built for Android.</p><DownloadButton /><span className="release-note">Verified release details coming soon.</span></div><span className="band-corner">MADE FOR ANDROID <ArrowUpRight size={16} /></span></section></Reveal>;
}
export function FaqList({ items = faqs, limit }: { items?: typeof faqs; limit?: number }) {
  return <Accordion type="single" collapsible className="faq-list">{items.slice(0, limit).map((faq) => <AccordionItem value={faq.question} key={faq.question}><AccordionTrigger>{faq.question}</AccordionTrigger><AccordionContent><p>{faq.answer}</p></AccordionContent></AccordionItem>)}</Accordion>;
}
export function TextLink({ to, children }: { to: "/features" | "/support" | "/download" | "/about"; children: ReactNode }) {
  return <Button variant="link" asChild className="text-link"><Link to={to}>{children}<ArrowRight size={16} /></Link></Button>;
}
