import { createFileRoute } from "@tanstack/react-router";
import { Radio } from "lucide-react";
import { ChannelWall, LiveSurfaceGrid } from "@/components/streamz/live-tv";
import { Phone } from "@/components/streamz/phone";
import { DownloadBand, Eyebrow, FaqList, PageIntro, Reveal } from "@/components/streamz/shared";
import { faqs } from "@/config/faq";
import { pageMeta } from "@/lib/page-meta";

export const Route = createFileRoute("/live-tv")({
  head: () =>
    pageMeta(
      "Live TV",
      "StreamZ puts live channels on the same screen as films and series, with a category-filtered wall, a now-and-next guide, and starred channels that stay one tap away.",
      "/live-tv",
    ),
  component: LiveTv,
});

function LiveTv() {
  return (
    <div className="page-content">
      <PageIntro
        eyebrow="LIVE TV"
        title="On air, the moment it happens."
        description="Sports, news, films and kids channels in the same browse as everything else. Filter the wall by category, see what is playing now and what comes next, and keep the channels you actually watch one tap away."
      />
      <section className="live-tv-stage-page wrap" aria-label="Live TV guide surface">
        <Reveal reveal="left" className="live-tv-stage-phone">
          <Phone screen="live" />
        </Reveal>
        <Reveal reveal="right" className="live-tv-stage-wall">
          <Eyebrow>THE WALL</Eyebrow>
          <ChannelWall />
          <p className="live-caption">
            <span className="tiny-signal" /> CATEGORIES AND SCHEDULE LOAD INSIDE THE APP · THE WALL
            SHOWS THE GUIDE SURFACE
          </p>
        </Reveal>
      </section>
      <section className="section wrap" aria-labelledby="live-surfaces-title">
        <Reveal reveal="mask" className="section-top">
          <div>
            <Eyebrow>WHAT YOU CAN DO</Eyebrow>
            <h2 id="live-surfaces-title">
              Built around
              <br />
              what is on right now.
            </h2>
          </div>
          <span className="live-section-icon">
            <Radio size={20} />
          </span>
        </Reveal>
        <LiveSurfaceGrid />
      </section>
      <section className="section wrap" aria-labelledby="live-faq-title">
        <Reveal>
          <Eyebrow>LIVE TV QUESTIONS</Eyebrow>
          <h2 id="live-faq-title">The short version.</h2>
        </Reveal>
        <Reveal>
          <FaqList items={faqs.filter((faq) => faq.category === "Live TV")} />
        </Reveal>
      </section>
      <DownloadBand />
      <div className="section" />
    </div>
  );
}
