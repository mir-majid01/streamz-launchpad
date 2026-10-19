# StreamZ Launchpad

Build a polished, high-detail, multi-page marketing website template for my Android app StreamZ. This is a design test/prototype; do NOT build any streaming player, connected content catalogue, authentication, database, or backend.

DESIGN DIRECTION

- Premium cinematic dark interface, visually distinctive and art-directed rather than generic AI/SaaS.
- Background near-black (#070506 / #08090D), restrained signal-red accent (#FF3048 / #E50914), cool silver text, occasional atmospheric red gradients and soft glows.
- Bold editorial typography (Space Grotesk headings, DM Sans body), deliberate type scale, strong whitespace, fine hairline borders, rounded but not over-rounded cards.
- Hero: oversized StreamZ wordmark with red Z, concise headline, primary Download for Android CTA and secondary Explore Features CTA. Build the background from layered gradients, subtle grain, glows, CSS shapes and motion. Include a CSS/illustrative Android phone mockup with home and live-guide screens.
- Motion quality matters: staggered page entrance, scroll-reveal sections, subtle parallax/ambient background drift, polished hover/focus states, button micro-interactions, animated underline/nav state, accordions with smooth open/close, and tasteful route transitions. Use CSS/Framer Motion only where appropriate; respect prefers-reduced-motion and avoid heavy effects that hurt mobile performance.
- Responsive and accessible on mobile, tablet, desktop; proper keyboard focus, semantic landmarks, contrast, reduced-motion support, no layout overflow.
- No fake ratings, download counts, testimonials, legal claims, fake store badges, or invented product stats. Label any illustrative UI clearly if needed.

MULTI-PAGE ROUTES

1. Home (/): cinematic hero, concise value proposition, app benefit highlights, feature overview, How it works 3 steps, download CTA, FAQ teaser, footer.
2. Features (/features): six polished feature cards for discovery, Live TV, offline downloads, subtitles and playback, my list, app updates. Poster artwork is distributor promotional key art used as discovery examples, not an authentic Android screenshot. See “Catalogue artwork” below.
3. Download (/download): dedicated Android download page with phone mockup, verified release panel, requirements section, installation steps and prominent Download APK button.
3b. Live TV (/live-tv): channel wall, guide surfaces and Live TV FAQs.
4. About (/about): brand story, mission and values; do not invent company history or user numbers.
5. Support (/support): working client-side searchable FAQ, functional accordions, troubleshooting tips, and configurable prototype contacts at streamzz.official@gmail.com and Telegram @Mirmajid01.
6. Privacy (/privacy): well-designed privacy policy TEMPLATE with clear editable placeholder sections and a visible notice saying this is a template and must be replaced with actual practices before publishing. Do not assert unverified data practices.
7. Terms (/terms): terms template with same editable/legal-draft notice, no claims of legal advice.
   Use a shared responsive header/footer, real route navigation, active-page indication, working mobile menu, functional internal links on every page. Add a custom 404 page.

DOWNLOAD BUTTON BEHAVIOR

- Centralize the APK URL in one obvious config file, such as src/config/site.ts.
- Use a configurable STREAMZ_APK_URL with a sensible local default /downloads/StreamZ.apk. All download CTAs across the site must use that same URL and trigger a direct file download/open; do not send users to a random homepage or external redirect.
- If the local APK does not exist or the URL is not configured, show a clear, polished “APK download is not configured yet” message instead of pretending a download succeeded. Make it easy to replace with the real verified release URL later.
- Do not fabricate version number, APK size, checksum, release date, minimum Android version, Play Store availability or security certification. Display editable “Release information will be published here” placeholders until configured.
- Installation instructions must mention Android may ask the user to authorize installing apps from that source.

FUNCTIONALITY / ENGINEERING

- Build a real frontend app with working page routing and responsive interactions, not a single static screenshot.
- Use a maintainable shared component structure and central config for brand name, support email, download URL, version info, nav links and social URLs.
- No dead buttons. For unavailable external/social destinations, omit them or clearly mark them as configurable rather than linking to #.
- Do not add database, auth, paid API, or unnecessary integrations. No streaming or media playback.
- Include page titles/meta descriptions, sensible favicon/wordmark, and graceful loading/error states where needed.
- Run build/lint checks available in the environment, fix errors, and report actual verification performed.
- Prioritize exceptionally polished visual design and motion details, but keep the website fast and maintainable.
- This is a standalone prototype and must not modify any existing StreamZ Android repo.

## Catalogue artwork

The Home and Features pages use current film and series posters stored under
`public/catalog/trending/`. This is distributor-owned promotional key art, not
public-domain material: `public/catalog/ATTRIBUTIONS.md` records the source page and
rights holder for every title, and a public commercial launch needs publisher
permission or a licensed artwork feed (for example a TMDB-keyed build step that
writes the same local files).

## Live TV

`/live-tv` and the Home Live TV band visualise the app's live guide surface: a
category-filtered channel wall with now/next state. The category tiles are the guide
layout, not a published channel line-up; the app loads whatever categories and schedule
a signed-in device is entitled to.

## Release and download

All download CTAs are plain anchors to `site.apkUrl`, which defaults to the newest
signed GitHub release asset, so a click starts the file download without navigating away.
Release metadata in `src/config/site.ts` mirrors the published release asset
(version, size, SHA-256 digest, date, package id). `verifyApk` reports
`available | missing | unverifiable` and is used only for the status chip on the
download page — a CORS-blocked probe must never block a real release link.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/02813d35-e51e-4948-a9d9-a49d4ed0a2ac).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? Use Node.js `24.18.0` from `.nvmrc` and npm. The
repository also pins Bun `1.2.26` for the Docker build and retains `bun.lock`.
Install Node with [nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```

Run the offline-capable project test entry point with:

```sh
make test
```

Build and run the reproducible container with:

```sh
docker build -t streamz-launchpad .
docker run --rm -p 8080:8080 streamz-launchpad
```

Then open <http://localhost:8080>. The container runs the Vite development
server after validating the production build during image creation.
