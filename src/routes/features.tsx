import { createFileRoute } from "@tanstack/react-router";
import { Info } from "lucide-react";
import { PageIntro, FeatureGrid, DownloadBand, Eyebrow, Reveal } from "@/components/streamz/shared";
import { pageMeta } from "@/lib/page-meta";
export const Route = createFileRoute("/features")({
  head: () => pageMeta("The possibilities", "Explore six intended StreamZ capabilities: discovery, Live TV, offline downloads, audio and subtitles, watchlists and app updates.", "/features"),
  component: Features,
});
function Features() {
  return <div className="page-content"><PageIntro eyebrow="THOUGHTFULLY ENVISIONED" title="A little more possibility." description="Six ideas. One considered experience. Explore the capabilities we envision for StreamZ, shaped around the way you want to unwind." /><section className="wrap features-page" aria-label="Intended app capabilities"><FeatureGrid all /><p className="intention-note"><Info size={14} /> This is a design prototype. All capabilities are intended, not verified working features. Availability and limitations will be confirmed with the actual release.</p><Reveal className="feature-philosophy"><div><Eyebrow>THE DESIGN PHILOSOPHY</Eyebrow><h2>Every detail.<br />A little more intentional.</h2></div><p>Great experiences don’t ask for more of your attention. They make the time you choose to spend feel worthwhile. Our vision is a quieter interface, clearer choices, and room for the things that matter to you.</p></Reveal></section><DownloadBand /><div className="section" /></div>;
}
