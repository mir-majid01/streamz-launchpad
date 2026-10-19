<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## StreamZ frontend architecture
- Keep this site frontend-only with reusable brand, layout, phone illustration, motion and legal components under src/components/streamz; this isolates presentation from route metadata.
- Keep brand, navigation, support, social destinations, APK URL and release metadata in src/config/site.ts, with Live TV categories in src/config/live-tv.ts and poster provenance in src/config/catalog.ts; one configuration source prevents inconsistent release details.
- Route all APK actions through DownloadButton, which renders a plain anchor to site.apkUrl so a click downloads the file without navigating; verifyApk reports available/missing/unverifiable and only drives the status chip, because a CORS-blocked probe must never block a configured release link.
- Keep FAQs and their pure search helper in src/config/faq.ts, and verify release, catalogue, live TV and search rules in src/test/streamz.test.tsx; this keeps shipped behavior independently testable.
- Define all visual styling, CSS artwork and motion in src/styles.css using semantic theme tokens; routes compose the design system without inline visual values.
- Each content route owns its title, description and social metadata while __root owns the shared header/footer and document fonts; this preserves distinct page identity.
