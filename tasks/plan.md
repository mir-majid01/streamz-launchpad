# Implementation Plan: StreamZ Catalog Showcase

## Overview

Implement the approved second visual iteration for the StreamZ Launchpad. The
Home page will gain a local, attribution-backed editorial poster showcase, and
the Features page will use the same poster data in clearly labeled concept
visuals. The current cinematic brand system, routes, release honesty, contact
details, and existing behavior remain intact.

This plan is intentionally incremental. Each implementation task must leave the
project testable, and no task may normalize or overwrite unrelated working-tree
changes.

## Current-state guardrails

- The branch is `main` at `1f42cbe` with existing uncommitted content changes in
  the previous polish iteration. Those changes are part of the working state
  and must be preserved.
- Git reports many additional files as modified because the working copy has
  LF/CRLF conversion warnings. The substantive diff currently resolves to the
  existing eight-file polish change set. Before editing, inspect and preserve
  both the substantive diff and line-ending state; do not run a repository-wide
  formatter or checkout/reset.
- The implementation must not depend on an authentic StreamZ Android app or
  screenshots. Those are unavailable and must not be fabricated.
- The user requested no commit, push, deploy, or destructive cleanup during
  this work.

## Architecture decisions

1. **Local verified artwork only.** Poster files are stored under
   `public/catalog/` and loaded with local paths. Runtime hotlinks and external
   image dependencies are prohibited.
2. **Presentation-only catalog data.** `src/config/catalog.ts` owns stable IDs,
   display metadata, local poster paths, alt text, and attribution keys. It has
   no playback URLs, account state, availability flags, or operational claims.
3. **Reusable catalog primitives.** `src/components/streamz/catalog.tsx` owns
   fallback-safe poster rendering, cards, rails, and the Home showcase. Routes
   compose these pieces rather than duplicating poster metadata.
4. **Feature visuals remain honest.** Existing intended capabilities stay in
   `src/config/features.ts`; each feature gets a poster-backed visual reference
   while overlays are explicitly marked concept, intended, or planned.
5. **Existing CSS system remains authoritative.** New catalog styles and
   responsive states are added to `src/styles.css` using existing semantic
   tokens. No new UI dependency is added.
6. **Asset failures are first-class.** `PosterImage` keeps the poster geometry
   and swaps to a branded “Artwork unavailable” fallback when an image fails.
7. **Reproducible project commands.** Because this is an OmniRush Buildathon
   project, add a pinned runtime, a project-local Docker build/run path, and a
   single offline-capable `make test` entry point without changing the existing
   application stack.

## Task list

### Phase 0: Baseline and source verification

#### Task 1: Freeze the working-tree baseline

**Description:** Record the current status and substantive diff boundaries
before adding catalog files. Treat the eight-file polish diff and any user
changes as protected input. Do not reset, stash, checkout, or normalize files.

**Acceptance criteria:**
- [ ] The implementation starts from the current working tree, not from a
      clean checkout.
- [ ] Existing substantive changes in `README.md`, shared components, config,
      support, styles, and tests remain intact.
- [ ] No unrelated file is rewritten merely to resolve line-ending warnings.

**Verification:** Re-run `git status --short --branch`, `git diff --stat`, and
`git diff --ignore-space-at-eol --stat` before the first code edit.

**Dependencies:** None.

**Files likely touched:** None; inspection only.

**Estimated scope:** XS.

#### Task 2: Select and document reusable poster assets

**Description:** Choose a small curated set of Wikimedia Commons film/TV
artwork with explicit public-domain or Creative Commons evidence. Download the
files into `public/catalog/`, verify they are actual image files, and write the
matching source/license records in `public/catalog/ATTRIBUTIONS.md`.

**Acceptance criteria:**
- [ ] Each poster has a checked Commons file-page URL and direct source URL.
- [ ] Each record names the author/restorer/rights basis when available and
      includes attribution or share-alike requirements.
- [ ] All runtime poster paths are local; no remote URL is committed as the
      rendered image source.
- [ ] The set is large enough for the Home rail and distinct enough for the six
      feature compositions without pretending to be a live catalog.

**Verification:** Inspect image MIME/type and dimensions locally; manually
re-open every Commons source page; ensure each asset has one attribution entry.

**Dependencies:** Task 1.

**Files likely touched:** `public/catalog/*`,
`public/catalog/ATTRIBUTIONS.md`.

**Estimated scope:** M.

### Checkpoint: Assets

- [ ] No unverified or unrelated image is included.
- [ ] Existing tests and type-check still run after asset/config additions.

### Phase 1: Data contract and reusable poster UI

#### Task 3: Add typed catalog and feature visual references

**Description:** Add the typed catalog records and extend feature configuration
with poster-backed visual references. Keep the existing feature copy and
intended-capability tags truthful.

**Acceptance criteria:**
- [ ] Catalog IDs and titles are unique and all poster paths point into the
      project-local catalog directory.
- [ ] Every catalog record has a matching attribution key.
- [ ] Every feature visual references valid catalog IDs and uses distinct
      subsets where practical.
- [ ] No catalog record implies playback, availability, ratings, or release
      statistics.

**Verification:** Add focused assertions to `src/test/streamz.test.ts`, then
run `npm run test` and `npx tsc --noEmit`.

**Dependencies:** Task 2.

**Files likely touched:** `src/config/catalog.ts`,
`src/config/features.ts`, `src/test/streamz.test.ts`.

**Estimated scope:** M.

#### Task 4: Build fallback-safe catalog primitives

**Description:** Implement `PosterImage`, `PosterCard`, `PosterRail`,
`CatalogShowcase`, and `FeatureVisual` in a focused StreamZ component module.
Keep poster cards non-playable and accessible, and ensure image errors do not
leave broken-image UI or cause layout collapse.

**Acceptance criteria:**
- [ ] Non-hero images use lazy loading and async decoding.
- [ ] Failed images render a branded fallback with title and “Artwork
      unavailable” text while retaining portrait geometry.
- [ ] Poster rail has a semantic label, touch scrolling/snap behavior on small
      screens, and no page-level horizontal overflow.
- [ ] Cards expose readable metadata without play controls or fake navigation.
- [ ] Feature visuals label any UI-only overlays as concept/intended/planned.

**Verification:** Add or extend focused component tests where practical; run
`npm run test` and `npx tsc --noEmit`.

**Dependencies:** Task 3.

**Files likely touched:** `src/components/streamz/catalog.tsx`,
`src/test/streamz.test.ts`.

**Estimated scope:** M.

#### Task 5: Add responsive catalog styling

**Description:** Add the catalog and feature-visual styles to the existing CSS
system. Cover narrow mobile widths, tablet, and desktop without replacing the
current visual language.

**Acceptance criteria:**
- [ ] Poster cards preserve portrait aspect ratio and readable captions.
- [ ] Rails scroll within their own region at approximately 360px, 390px, and
      430px widths; desktop uses a balanced max-width layout.
- [ ] Focus rings, alt text, reduced-motion behavior, and contrast remain
      usable on black/red surfaces.
- [ ] No body-level horizontal overflow is introduced.

**Verification:** Run tests, type-check, and a browser smoke pass at the target
viewport widths after route integration.

**Dependencies:** Task 4.

**Files likely touched:** `src/styles.css`.

**Estimated scope:** M.

### Checkpoint: Shared catalog layer

- [ ] Catalog data, fallback behavior, and feature references are covered by
      focused tests.
- [ ] `npm run test` and `npx tsc --noEmit` pass.

### Phase 2: Route integration and messaging

#### Task 6: Replace the Home abstract stage with the editorial showcase

**Description:** Preserve the current hero, phone composition, benefits, CTA,
FAQ, and abstract brand framing where appropriate, but make the local poster
showcase the primary post-hero catalog signal.

**Acceptance criteria:**
- [ ] Home contains several real local portrait posters below the hero.
- [ ] The section explains that it is an editorial/visual showcase and not
      connected playback in this prototype.
- [ ] Existing hero links, download behavior, navigation, and FAQ remain
      functional.

**Verification:** Run focused tests, type-check, build, and smoke-test Home on
mobile and desktop.

**Dependencies:** Tasks 4-5.

**Files likely touched:** `src/routes/index.tsx`,
`src/components/streamz/catalog.tsx`, `src/styles.css`.

**Estimated scope:** M.

#### Task 7: Replace Features abstract cards with poster-led concept visuals

**Description:** Keep all six intended capabilities and their disclaimers, but
use `FeatureVisual` compositions for discovery, Live TV, offline, language,
watchlist, and updates.

**Acceptance criteria:**
- [ ] The Features page communicates an Android-first entertainment concept.
- [ ] All six visuals use verified local posters without implying authentic
      Android screenshots.
- [ ] Live, offline, subtitles, watchlist, and update UI are visibly labeled as
      intended/planned/concept where represented.
- [ ] The section-level disclosure remains concise and is not duplicated into
      every paragraph unnecessarily.

**Verification:** Run tests, type-check, build, and smoke-test the Features
route, including keyboard focus and narrow viewport behavior.

**Dependencies:** Tasks 4-5.

**Files likely touched:** `src/routes/features.tsx`,
`src/components/streamz/shared.tsx`, `src/components/streamz/catalog.tsx`,
`src/styles.css`.

**Estimated scope:** M.

#### Task 8: Refresh project-facing documentation

**Description:** Update stale README language that says the site has no content
catalog, while documenting the editorial/local-artwork boundary and exact
commands for running and testing the project.

**Acceptance criteria:**
- [ ] Documentation does not claim operational playback or a connected catalog.
- [ ] Poster attribution location and prototype disclosure are discoverable.
- [ ] Setup/run/test instructions match the actual repository scripts.

**Verification:** Read the final README against `package.json` and the rendered
site messaging.

**Dependencies:** Tasks 6-7.

**Files likely touched:** `README.md`.

**Estimated scope:** S.

### Phase 3: Buildathon reproducibility and final verification

#### Task 9: Add project-local reproducibility entry points

**Description:** Add the minimum repository-local buildathon infrastructure:
pin the JavaScript runtime, provide a Dockerfile that installs dependencies and
builds/runs the app, and provide a single offline-capable `make test` command.
Use the existing lockfile and do not install anything globally.

**Acceptance criteria:**
- [ ] A runtime version is pinned in a repository file.
- [ ] Docker build/run instructions use only project files and documented
      environment variables.
- [ ] `make test` runs the project test command without network access after
      dependencies are installed.
- [ ] No secrets or machine-specific absolute paths are added.

**Verification:** Run `make test`; build the Docker image and run the container
with the documented command if Docker is available. Report any unavailable
local Docker capability honestly.

**Dependencies:** Task 8.

**Files likely touched:** `.nvmrc` or equivalent runtime pin, `Dockerfile`,
`Makefile`, `.env.example` if required, `README.md`.

**Estimated scope:** M.

#### Task 10: Run full checks and browser smoke pass

**Description:** Verify the complete user-visible flow and report existing
repository-wide lint limitations without weakening lint rules.

**Acceptance criteria:**
- [ ] `npm run test` passes.
- [ ] `npx tsc --noEmit` passes.
- [ ] `npm run build` passes.
- [ ] `npm run lint` is run and reported honestly; no broad suppressions are
      added to hide pre-existing failures.
- [ ] Home, Features, mobile menu, poster scroll, fallback behavior, support,
      Download unavailable state, FAQ, legal routes, and custom 404 are checked.

**Verification:** Record exact command outcomes and any environment limitation
in the final response; do not claim a check passed unless it was run.

**Dependencies:** Tasks 6-9.

**Files likely touched:** None unless verification reveals a focused defect.

**Estimated scope:** M.

### Checkpoint: Complete

- [ ] Acceptance criteria from the approved specification are met.
- [ ] Existing behavior is preserved.
- [ ] No commit, push, deploy, or destructive cleanup was performed.
- [ ] Final working-tree diff is reviewed and limited to intended work plus
      preserved user changes.

## Risks and mitigations

| Risk | Impact | Mitigation |
| --- | --- | --- |
| Commons asset license ambiguity | High | Require a file-page record and explicit rights basis for every asset; exclude uncertain candidates. |
| Poster artwork is mistaken for real StreamZ catalog content | High | Use editorial/non-playable disclosures, avoid playback affordances, and keep metadata generic. |
| Existing uncommitted polish is overwritten | High | Audit before editing, use narrow patches, and never reset or normalize unrelated files. |
| Image failure creates broken layout | Medium | Local error state in `PosterImage` preserves geometry and renders branded fallback text. |
| Mobile rail causes page overflow | Medium | Constrain overflow to the rail and verify at 360/390/430px widths. |
| Existing full lint baseline remains red | Medium | Run and report lint honestly; do not weaken rules or add broad suppressions. |
| Docker/runtime command mismatches the existing Bun lockfile | Medium | Keep the lockfile authoritative and validate the selected runtime path before documenting it. |

## Open questions

- None for the catalog design. If a chosen poster source lacks clear reuse
  evidence, replace that asset rather than asking the UI to conceal the gap.
