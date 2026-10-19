import { ArrowUpRight, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { site } from "@/config/site";

// A plain anchor keeps the click in this page: GitHub serves the release asset with
// Content-Disposition: attachment, so the browser starts the file download instead of
// navigating. Anything routed through a page or dialog here reads as a redirect.
export function DownloadButton({
  label = "Download for Android",
  compact = false,
}: {
  label?: string;
  compact?: boolean;
}) {
  return (
    <Button variant="cinematic" size={compact ? "default" : "lg"} asChild>
      <a href={site.apkUrl} download="StreamZ.apk" rel="noopener noreferrer">
        <Download />
        {label}
        {!compact && <ArrowUpRight className="cta-arrow" />}
      </a>
    </Button>
  );
}
