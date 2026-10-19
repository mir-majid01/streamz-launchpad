import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, FileDown, Info, ShieldCheck } from "lucide-react";
import { DownloadButton } from "@/components/streamz/download-button";
import { Phone } from "@/components/streamz/phone";
import { Eyebrow, Reveal } from "@/components/streamz/shared";
import { site } from "@/config/site";
import { verifyApk, type ApkStatus } from "@/lib/download";
import { pageMeta } from "@/lib/page-meta";

export const Route = createFileRoute("/download")({
  head: () =>
    pageMeta(
      "Download for Android",
      `Download the StreamZ Android APK, current release v${site.release.version}. Signed release, published checksum, device requirements and step-by-step installation guidance.`,
      "/download",
    ),
  component: DownloadPage,
});

function ReleaseStatus({ status }: { status: ApkStatus | "checking" }) {
  const copy =
    status === "checking"
      ? ["Checking release…", "muted"]
      : status === "available"
        ? ["Release reachable", "ok"]
        : status === "unverifiable"
          ? ["Hosted on the release server", "ok"]
          : ["Release not reachable", "bad"];
  const [label, tone] = copy;
  return (
    <span className={`release-status release-status-${tone}`}>
      {status === "available" ? <Check size={12} /> : <span className="status-dot" />}
      {label}
    </span>
  );
}

function DownloadPage() {
  const [status, setStatus] = useState<ApkStatus | "checking">("checking");
  const { release } = site;
  useEffect(() => {
    let active = true;
    verifyApk(site.apkUrl).then((next) => {
      if (active) setStatus(next);
    });
    return () => {
      active = false;
    };
  }, []);

  const releaseEntries: [string, string][] = [
    ["Version", `v${release.version} · build ${release.build}`],
    ["APK size", release.size],
    ["Release date", release.releaseDate],
    ["Package", release.packageName],
    ["SHA-256", `${release.checksum.slice(0, 16)}…`],
  ];

  return (
    <div className="page-content">
      <section className="wrap download-page-hero">
        <div className="entrance">
          <Eyebrow>MADE FOR YOUR ANDROID</Eyebrow>
          <h1>
            StreamZ v{release.version}.
            <br />
            In your pocket.
          </h1>
          <p>
            The signed APK, straight from the release page. {release.size}, updated{" "}
            {release.releaseDate.toLowerCase()}. One tap starts the download — the file begins
            without leaving this page.
          </p>
          <div className="download-main-cta">
            <DownloadButton label="Download APK" />
            <ReleaseStatus status={status} />
          </div>
          <p className="intention-note">
            <Info size={14} /> The file is named <b>app-release.apk</b>. Rename it before installing
            if you keep more than one version on the device.
          </p>
          <div className="release-panel">
            <span>RELEASE INFORMATION</span>
            <dl className="release-details">
              {releaseEntries.map(([label, value]) => (
                <div key={label}>
                  <dt>{label}</dt>
                  <dd title={label === "SHA-256" ? release.checksum : undefined}>{value}</dd>
                </div>
              ))}
            </dl>
            <a className="release-source" href={release.changelogUrl} rel="noopener noreferrer">
              <FileDown size={13} /> Read the changelog on the release page
            </a>
          </div>
        </div>
        <Phone flat />
      </section>

      <section className="wrap download-details">
        <Reveal>
          <Eyebrow>BEFORE YOU BEGIN</Eyebrow>
          <h2>The essentials.</h2>
          <div className="requirement-row">
            <strong>Platform</strong>
            <span>Android phones and tablets, plus a remote-driven layout for Android TV.</span>
          </div>
          <div className="requirement-row">
            <strong>Storage</strong>
            <span>
              Allow {release.size} for the app, then room for whatever you download for offline
              viewing.
            </span>
          </div>
          <div className="requirement-row">
            <strong>Connection</strong>
            <span>
              Needed to download the APK and to sign in. Titles saved for offline play without it.
            </span>
          </div>
          <div className="requirement-row">
            <strong>Account</strong>
            <span>Google sign-in, with access running on a subscription tied to your account.</span>
          </div>
          <div className="requirement-row">
            <strong>Release source</strong>
            <span>
              Only use the APK linked from this page.{" "}
              <a href={release.repositoryUrl} rel="noopener noreferrer">
                StreamZ release page
              </a>
              .
            </span>
          </div>
          <p className="small-notice">
            <ShieldCheck size={13} /> Every release publishes a SHA-256 digest. Compare it against
            your downloaded file before installing.
          </p>
          <p className="small-notice">
            Having trouble? <Link to="/support">Visit help &amp; support.</Link>
          </p>
        </Reveal>

        <Reveal>
          <Eyebrow>INSTALLING THE APK</Eyebrow>
          <h2>Three prompts, then you are in.</h2>
          <ol className="install-steps">
            <li>
              <span>01</span>
              <div>
                <h3>Download on your device</h3>
                <p>
                  Tap Download APK. Android starts the file download and keeps you on this page; the
                  progress shows in your notification shade.
                </p>
              </div>
            </li>
            <li>
              <span>02</span>
              <div>
                <h3>Open the file and allow the source</h3>
                <p>
                  Open <b>app-release.apk</b> from the notification or your Downloads folder. Android
                  will ask you to authorise installing apps from that browser or file manager. Only
                  approve the source you used here.
                </p>
              </div>
            </li>
            <li>
              <span>03</span>
              <div>
                <h3>Install, sign in, switch the permission off</h3>
                <p>
                  Finish the install, sign in with Google, then turn the unknown-sources permission
                  back off. Later releases update in place over the same signing key.
                </p>
              </div>
            </li>
          </ol>
          <p className="small-notice">
            Exact prompts vary by device and Android version. Installing over a previous StreamZ
            release keeps your downloads; uninstalling clears the saved activation key, so note it
            from Settings first.
          </p>
        </Reveal>
      </section>
    </div>
  );
}
