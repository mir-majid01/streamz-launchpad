import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Download, ArrowUpRight, LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { site } from "@/config/site";
import { APK_NOT_CONFIGURED, verifyApk } from "@/lib/download";

export function DownloadButton({ label = "Download for Android", compact = false }: { label?: string; compact?: boolean }) {
  const [checking, setChecking] = useState(false);
  const [unavailable, setUnavailable] = useState(false);
  async function download() {
    setChecking(true);
    const available = await verifyApk(site.apkUrl);
    setChecking(false);
    if (!available) {
      setUnavailable(true);
      return;
    }
    const link = document.createElement("a");
    link.href = site.apkUrl;
    link.download = "StreamZ.apk";
    link.rel = "noopener";
    document.body.appendChild(link);
    link.click();
    link.remove();
  }
  return <>
    <Button variant="cinematic" size={compact ? "default" : "lg"} onClick={download} disabled={checking} aria-busy={checking}>
      {checking ? <LoaderCircle className="animate-spin" /> : <Download />}{checking ? "Checking release…" : label}{!compact && !checking && <ArrowUpRight className="cta-arrow" />}
    </Button>
    <Dialog open={unavailable} onOpenChange={setUnavailable}>
      <DialogContent className="download-dialog">
        <div className="dialog-symbol"><Download size={26} /></div>
        <span className="eyebrow">RELEASE PENDING</span>
        <DialogTitle>{APK_NOT_CONFIGURED}</DialogTitle>
        <DialogDescription>A verified Android release hasn’t been connected to this prototype. Release information will be published here once it’s available.</DialogDescription>
        <Button asChild variant="outline"><Link to="/download" onClick={() => setUnavailable(false)}>View download details <ArrowUpRight /></Link></Button>
      </DialogContent>
    </Dialog>
  </>;
}
