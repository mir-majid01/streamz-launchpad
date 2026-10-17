import { useEffect, useRef, type HTMLAttributes, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import {
  ArrowUpRight,
  ArrowRight,
  Compass,
  Download,
  RefreshCw,
  Bookmark,
  Languages,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { DownloadButton } from "./download-button";
import { faqs } from "@/config/faq";
import { brandFrames, features, type FeatureArtKind } from "@/config/features";
import { FeatureVisual } from "./catalog";

type RevealStyle = "rise" | "mask" | "scale" | "left" | "right";
type RevealProps = Omit<HTMLAttributes<HTMLDivElement>, "children"> & {
  children: ReactNode;
  reveal?: RevealStyle;
};

export function Reveal({ children, className = "", reveal = "rise", ...props }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    // Without an observer there is no second chance to reveal, so show the content now.
    if (!window.IntersectionObserver) {
      element.classList.add("is-visible");
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          element.classList.add("is-visible");
          observer.disconnect();
        }
      },
      { threshold: 0 },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  // The clip must not sit on the observed element: a fully-clipped box reports zero
  // intersection area, so the observer would never fire and the content would stay hidden.
  return (
    <div ref={ref} className={`reveal ${className}`} data-reveal={reveal} {...props}>
      {reveal === "mask" ? <div className="mask-clip">{children}</div> : children}
    </div>
  );
}
export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <div className="eyebrow">
      <span className="signal-line" />
      {children}
    </div>
  );
}
export function PageIntro({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <section className="page-intro wrap entrance">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h1>{title}</h1>
      <p>{description}</p>
    </section>
  );
}
export function FeatureArt({ type }: { type: FeatureArtKind }) {
  return (
    <div className={`feature-art art-${type}`} aria-hidden="true">
      {type === "discovery" ? (
        <>
          <div className="orbit orbit-one" />
          <div className="orbit orbit-two" />
          <div className="orbit orbit-three" />
          <Compass className="art-icon" size={36} />
        </>
      ) : type === "live" ? (
        <>
          <div className="wave-bars">
            {Array.from({ length: 19 }, (_, i) => (
              <i key={i} />
            ))}
          </div>
          <span className="live-pill">
            <i />
            IN THE MOMENT
          </span>
        </>
      ) : type === "offline" ? (
        <>
          <div className="art-file file-back" />
          <div className="art-file">
            <Download size={32} />
            <div className="download-progress" />
          </div>
          <span className="art-small-label">READY WHEN YOU ARE</span>
        </>
      ) : type === "language" ? (
        <>
          <span className="language-word">Hello.</span>
          <span className="language-other">Hola. Bonjour. こんにちは.</span>
        </>
      ) : type === "saved" ? (
        <>
          <div className="saved-stack" />
          <Bookmark size={45} className="art-icon" />
        </>
      ) : (
        <>
          <RefreshCw size={48} className="update-icon" />
          <span className="art-small-label">THE NEXT CHAPTER</span>
        </>
      )}
    </div>
  );
}
export function FeatureGrid({ all = false }: { all?: boolean }) {
  return (
    <div className="feature-grid">
      {features.slice(0, all ? 6 : 3).map((feature, index) => (
        <Reveal key={feature.title} className="feature-card" reveal={index === 0 ? "mask" : "rise"}>
          <FeatureVisual feature={feature} />
          <div className="feature-card-content">
            <div className="feature-card-top">
              <span className="feature-number">0{index + 1}</span>
              <feature.icon size={18} aria-hidden="true" />
            </div>
            <h3>{feature.title}</h3>
            <p>{all ? feature.description : feature.short}</p>
            {!all && (
              <Link to="/features" className="feature-link" aria-label={`Explore ${feature.title}`}>
                <ArrowUpRight size={19} aria-hidden="true" />
              </Link>
            )}
            {all && <span className="capability-label">{feature.tag} · INTENDED CAPABILITY</span>}
          </div>
        </Reveal>
      ))}
    </div>
  );
}
export function PosterStage() {
  return (
    <section className="poster-stage" aria-labelledby="poster-stage-title">
      <div className="wrap">
        <Reveal reveal="mask" className="section-head-center">
          <Eyebrow>THE HOUSE STYLE</Eyebrow>
          <h2 id="poster-stage-title">
            Light, grain
            <br />
            and negative space.
          </h2>
          <p>
            Abstract frames from the StreamZ visual identity. They show the mood the app is designed
            around — they are not titles in a catalogue.
          </p>
        </Reveal>
      </div>
      <Reveal
        reveal="scale"
        className="poster-rail-wrap"
        role="region"
        aria-label="StreamZ brand artwork frames"
      >
        <ul className="poster-rail">
          {brandFrames.map((frame) => (
            <li
              key={frame.label}
              className={`poster ${frame.art}`}
              tabIndex={0}
              aria-label={`${frame.label}, abstract StreamZ brand artwork credited to ${frame.credit}`}
            >
              <span className="poster-art" aria-hidden="true" />
              <span className="poster-sweep" aria-hidden="true" />
              <span className="poster-tick">
                <span>{frame.label}</span>
                <span>{frame.credit}</span>
              </span>
            </li>
          ))}
        </ul>
      </Reveal>
      <p className="poster-caption">
        <span className="tiny-signal" /> ORIGINAL ABSTRACT ARTWORK · NOT CATALOGUE CONTENT
      </p>
    </section>
  );
}
export function DownloadBand() {
  return (
    <Reveal reveal="left">
      <section className="download-band wrap">
        <div className="download-band-art" aria-hidden="true">
          Z
        </div>
        <div>
          <Eyebrow>YOUR NEXT CHAPTER</Eyebrow>
          <h2>
            More possibility.
            <br />
            Right in your pocket.
          </h2>
          <p>A new perspective on entertainment. Built for Android.</p>
          <DownloadButton />
          <span className="release-note">Verified release details coming soon.</span>
        </div>
        <span className="band-corner">
          MADE FOR ANDROID <ArrowUpRight size={16} />
        </span>
      </section>
    </Reveal>
  );
}
export function FaqList({ items = faqs, limit }: { items?: typeof faqs; limit?: number }) {
  return (
    <Accordion type="single" collapsible className="faq-list">
      {items.slice(0, limit).map((faq) => (
        <AccordionItem value={faq.question} key={faq.question}>
          <AccordionTrigger>{faq.question}</AccordionTrigger>
          <AccordionContent>
            <p>{faq.answer}</p>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
export function TextLink({
  to,
  children,
}: {
  to: "/features" | "/support" | "/download" | "/about";
  children: ReactNode;
}) {
  return (
    <Button variant="link" asChild className="text-link">
      <Link to={to}>
        {children}
        <ArrowRight size={16} />
      </Link>
    </Button>
  );
}
