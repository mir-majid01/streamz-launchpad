import { useEffect, useRef, type HTMLAttributes, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { DownloadButton } from "./download-button";
import { faqs } from "@/config/faq";
import { features } from "@/config/features";
import { site } from "@/config/site";
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
            {all && <span className="capability-label">{feature.tag}</span>}
          </div>
        </Reveal>
      ))}
    </div>
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
          <span className="release-note">v{site.release.version} · {site.release.size} · Android APK</span>
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
