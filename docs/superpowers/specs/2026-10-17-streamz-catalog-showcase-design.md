# StreamZ Catalog Showcase — Second-Iteration Design

## Status

Design approved in chat. This document is the implementation contract for the
second visual iteration. It is intentionally uncommitted because the user
explicitly asked not to commit or push changes.

## Context

StreamZ Launchpad is an existing TanStack Start/React marketing site for an
Android app concept. Its current strengths are the cinematic near-black and
signal-red visual system, Space Grotesk/DM Sans typography, animated hero,
responsive navigation, centralized site configuration, honest APK handling,
FAQ search, legal templates, and a clearly labeled illustrative phone mockup.

The current Home page follows the hero with abstract CSS brand frames. The
Features page uses six abstract visual studies. The site therefore reads more
like a brand identity study than a streaming-product launch page.

Repository evidence gathered before this design:

- The current branch is `main` at `1f42cbe`; the working tree already contains
  eight uncommitted files from the previous polish iteration. Those changes
  must remain intact.
- The website contains only one raster image asset, `public/brand/streamz-cover.png`.
- No authentic StreamZ Android screenshots or catalog assets are present.
- The local workspace does not contain the StreamZ Android repository.
- `https://github.com/mir-majid01/StreamZ` returned 404, so authentic Android
  screenshots must not be fabricated or implied.
- The existing tests and TypeScript check pass before this iteration.

## Goals

1. Make the Home page visibly read as a streaming-product website by adding a
   prominent, real portrait poster showcase below the hero.
2. Make the Features page demonstrate discovery and product direction through
   poster-led visual compositions rather than primarily abstract landscapes.
3. Preserve the existing cinematic brand system, hero, phone composition,
   navigation, download behavior, support contacts, legal templates, and
   prototype honesty.
4. Use locally stored, verified public-domain or Creative Commons artwork with
   source and license attribution.
5. Ensure missing images have a graceful visual fallback and never create
   broken-image UI.
6. Keep posters non-interactive as playback content. No play buttons, player
   controls, watch progress, or operational account state may be implied.
7. Keep the implementation dependency-free beyond the existing stack.

## Non-goals

- Do not build a streaming player, media backend, catalog API, authentication,
  watchlist persistence, download manager, or live TV system.
- Do not add authentic Android screenshots unless the Android repository or
  user-supplied screenshots become available and their provenance is verified.
- Do not use unverified local images from unrelated workspace folders.
- Do not hotlink poster assets from an external CDN at runtime.
- Do not invent current titles, release claims, ratings, popularity metrics,
  availability, or product statistics.
- Do not rebuild the routing or replace the existing design system.

## Asset and licensing contract

The implementation will use a curated local catalog assembled from Wikimedia
Commons files whose individual file pages provide explicit public-domain or
Creative Commons reuse terms.

Each committed poster asset must have a matching record in
`public/catalog/ATTRIBUTIONS.md` containing:

- Display title and media type.
- Wikimedia Commons file-page URL.
- Downloaded source URL.
- Author, restorer, or rights holder when listed.
- License or public-domain basis.
- Any attribution, share-alike, or modification notice.

The first candidate set may include public-domain classic film posters and
verified Creative Commons television poster artwork. The exact final set is
selected only after each source page and direct asset URL has been checked.
If a candidate lacks clear reuse evidence, it is excluded rather than used as
a placeholder.

The project will not claim that the poster set represents an operational
StreamZ catalog. The UI will use a visible editorial/concept note such as
“Editorial showcase · not playable in this prototype.”

## Information architecture and data model

Add `src/config/catalog.ts` with a typed catalog model:

```ts
type CatalogItem = {
  id: string;
  title: string;
  kind: "movie" | "series";
  year: string;
  genre: string;
  poster: string;
  alt: string;
  attributionKey: string;
};
```

The catalog is presentation data only. It does not expose playback URLs or
claim app availability. IDs are stable and used by Home and Features visual
configurations.

Extend the feature data model with a visual reference, for example:

```ts
type FeatureVisual =
  | { kind: "poster-mosaic"; catalogIds: string[] }
  | { kind: "series-rail"; catalogIds: string[] }
  | { kind: "download-concept"; catalogIds: string[] }
  | { kind: "language-concept"; catalogIds: string[] }
  | { kind: "saved-concept"; catalogIds: string[] }
  | { kind: "updates-concept"; catalogIds: string[] };
```

Every referenced catalog ID must resolve to an existing catalog item. Feature
visuals must use distinct poster subsets where practical so the six cards do
not become a repeated image grid.

## Component design

Add `src/components/streamz/catalog.tsx` containing focused composable pieces:

### `PosterImage`

- Renders a local poster path with `loading="lazy"` and
  `decoding="async"` where the image is not above the fold.
- Uses a fixed portrait container and `object-fit: cover` without stretching.
- Tracks an image failure with local state and swaps to a branded fallback
  containing the title and a clear “Artwork unavailable” state.
- Never leaves a broken-image icon or empty layout box.

### `PosterCard`

- Presents the poster, title, type, year, and genre.
- Uses no play affordance and is not an anchor unless a real in-app route is
  introduced later.
- Uses accessible text and a stable aspect-ratio wrapper.

### `PosterRail`

- Uses a semantic region with a descriptive label.
- Supports horizontal touch scrolling and scroll snapping on small screens.
- Uses a centered grid/rail on larger screens rather than forcing a carousel
  interaction where it is unnecessary.
- Keeps poster cards reachable with keyboard focus when they are focusable.
- Avoids page-level horizontal overflow.

### `CatalogShowcase`

- Provides the Home page section heading, explanation, poster rail, and
  editorial/non-playable disclosure.
- Reuses the same catalog records without duplicating title metadata in JSX.

### `FeatureVisual`

- Renders visual compositions for the six existing feature cards.
- Uses real catalog posters as visual material but labels UI-only overlays as
  “concept” or “intended capability.”
- Does not represent an authentic Android screenshot.
- Keeps abstract CSS artwork available for subtle atmospheric treatment, not as
  the primary visual for every feature.

## Home page composition

Preserve the current hero, phone mockup, CTA behavior, and cinematic lighting.
Replace the current full abstract poster stage immediately after the hero with
`CatalogShowcase`:

- Eyebrow: discovery-oriented, not a claim of operational availability.
- Heading: communicates finding or exploring films and series.
- Supporting copy: explicitly says this is a visual product showcase and the
  prototype has no connected playback.
- Poster rail: several distinct portrait posters with title/type metadata.
- Mobile: horizontal touch scroll with visible card affordance and no clipped
  text.
- Desktop: balanced multi-card arrangement with a controlled max width.

The current abstract brand frame data may remain in the repository for brand
identity use, but it must not remain the primary Home catalog signal.

## Features page composition

Keep the six existing intended-capability records and their disclaimers, but
replace the primary visual treatment with `FeatureVisual` compositions:

1. Discovery: poster mosaic and editorial labels.
2. Live TV: series/poster lineup concept with no claim that live playback is
   available.
3. Offline: poster card plus illustrative progress treatment labeled intended.
4. Audio/subtitles: poster detail with illustrative language controls labeled
   intended.
5. Watchlist: saved-poster stack labeled planned/intended.
6. Updates: release-note concept with poster thumbnail, not a claim of update
   delivery.

The page introduction should explain that StreamZ is an Android-first
entertainment concept centered on discovering films and series, while keeping
the actual release state explicit. Repeated legal/release caveats should not
be copied into every card; the feature card tag and one section-level note are
enough outside the Download page.

## Product messaging

Use concrete language where the current copy is abstract:

- Describe StreamZ as an Android-first entertainment concept for exploring
  films and series.
- Say “intended,” “planned,” or “concept” for unverified capabilities.
- Use “editorial showcase” or “visual sample” for the poster section.
- Never say users can watch, stream, download, save, subtitle, or receive live
  content unless the wording is explicitly framed as a future/intended
  capability.
- Keep verified contact details and existing release-status disclosures.

## Responsive and accessibility behavior

The CSS must explicitly cover approximately 360px, 390px, 430px, tablet, and
desktop widths:

- No body-level horizontal overflow.
- Poster rails scroll inside their own region on small screens.
- Poster touch targets and any controls are at least comfortably tappable.
- Poster titles remain readable without relying on hover.
- Images have meaningful alt text; decorative treatment is `aria-hidden`.
- Focus rings remain visible against black/red surfaces.
- Reduced-motion users do not receive continuous rail or poster animation.
- Image fallback retains the poster geometry so loading failures do not cause
  layout shift.

## Testing and verification

Extend `src/test/streamz.test.ts` to verify:

- Catalog IDs and titles are unique.
- Every poster path is local to the project and has attribution metadata.
- Every feature visual references valid catalog IDs.
- The feature list still marks unverified capabilities as intended/planned.

Run after implementation:

```text
npm run test
npx tsc --noEmit
npm run lint
npm run build
```

Also run a local browser smoke pass covering Home, Features, the mobile menu,
poster scrolling, poster fallback behavior, support navigation, and the
existing Download unavailable state. Record any environment limitation if a
true 360/390/430/desktop visual viewport cannot be driven by the available
browser tooling.

## Acceptance criteria

- Home visibly contains several real, locally stored portrait film/TV posters.
- The poster rail is touch-scrollable on mobile and balanced on desktop.
- Features visually demonstrate the product direction rather than six
  abstract landscape studies.
- No feature visual claims to be an authentic Android screenshot.
- Every image has a verified source/license record and a working fallback.
- Navigation, contact links, download handling, FAQ search, legal pages, and
  custom 404 remain intact.
- No new runtime dependency is added.
- Tests, type-check, and production build pass.
- Full lint is reported honestly if the existing repository-wide formatting
  baseline remains red.
