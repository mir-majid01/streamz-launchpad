import { createFileRoute } from "@tanstack/react-router";
import { Info } from "lucide-react";
import { PageIntro, FeatureGrid, DownloadBand, Eyebrow, Reveal } from "@/components/streamz/shared";
import { pageMeta } from "@/lib/page-meta";
export const Route = createFileRoute("/features")({
  head: () =>
    pageMeta(
      "Features",
      "What StreamZ does on your Android: TMDB-driven discovery, live TV with a guide, offline downloads, subtitles and per-device playback, a watchlist that resumes, and updates that show their changelog.",
      "/features",
    ),
  component: Features,
});
function Features() {
  return (
    <div className="page-content">
      <PageIntro
        eyebrow="ANDROID-FIRST ENTERTAINMENT"
        title="A little more possibility."
        description="Six things StreamZ does, shaped around the way you actually unwind. Browse films and series, drop into live TV, and take a title with you when the signal will not follow."
      />
      <section className="wrap features-page" aria-label="App features">
        <FeatureGrid all />
        <p className="intention-note">
          <Info size={14} /> Poster artwork is distributor promotional key art, shown as discovery
          examples. The live guide surface renders the categories and schedule the app loads.
        </p>
        <Reveal className="feature-philosophy">
          <div>
            <Eyebrow>THE DESIGN PHILOSOPHY</Eyebrow>
            <h2>
              Every detail.
              <br />A little more intentional.
            </h2>
          </div>
          <p>
            A good entertainment app doesn’t ask for more of your attention. It gets out of the
            way: clearer rows, faster choices, live channels that behave like the rest of the app,
            and room for the things you actually want to finish.
          </p>
        </Reveal>
      </section>
      <DownloadBand />
      <div className="section" />
    </div>
  );
}
