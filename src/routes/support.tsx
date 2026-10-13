import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Search, X, ArrowUpRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PageIntro, FaqList } from "@/components/streamz/shared";
import { searchFaq } from "@/config/faq";
import { site } from "@/config/site";
import { pageMeta } from "@/lib/page-meta";
export const Route = createFileRoute("/support")({ head: () => pageMeta("Help & support", "Search StreamZ’s FAQs, find Android installation guidance and troubleshooting tips, and view the prototype support contact.", "/support"), component: Support });
function Support() {
  const [query, setQuery] = useState("");
  const results = searchFaq(query);
  return <div className="page-content"><PageIntro eyebrow="A LITTLE CLARITY" title="Good questions. Clear answers." description="Find the essentials about the StreamZ concept, Android downloads and getting started. No guesswork needed." /><section className="wrap support-layout"><div><div className="faq-search"><Search size={19} /><label className="sr-only" htmlFor="faq-search">Search frequently asked questions</label><Input id="faq-search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search questions, downloads, installation…" />{query && <Button variant="ghost" size="icon" aria-label="Clear search" onClick={() => setQuery("")}><X /></Button>}</div><div className="search-count"><span>FREQUENTLY ASKED QUESTIONS</span><span aria-live="polite">{results.length} {results.length === 1 ? "ANSWER" : "ANSWERS"}</span></div>{results.length ? <FaqList items={results} /> : <div className="no-results"><h2>No matching questions.</h2><p>Try a different search, or clear it to see all answers.</p><Button variant="outline" onClick={() => setQuery("")}>Clear search <X /></Button></div>}</div><aside className="support-aside"><h2>Still have a question?</h2><p>The real support contact will be available before launch. For now, this address is an editable placeholder.</p><a className="contact-link" href={`mailto:${site.supportEmail}`}>{site.supportEmail}<ArrowUpRight size={17} /></a><span className="contact-placeholder">Placeholder only. Please don’t send personal or sensitive information.</span><div className="troubleshooting"><h3>A few things to check.</h3><ul><li>No release connected? Wait for the verified APK rather than using an unknown source.</li><li>Check your internet connection and available device storage before downloading.</li><li>Review Android’s installation-source prompt and your browser’s download permissions.</li><li>Compare your device with the confirmed requirements once published.</li></ul></div></aside></section></div>;
}
