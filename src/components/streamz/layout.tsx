import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { site } from "@/config/site";
import { DownloadButton } from "./download-button";

export function Wordmark({ footer = false }: { footer?: boolean }) {
  return <Link to="/" className={`wordmark ${footer ? "footer-wordmark" : ""}`} aria-label={`${site.name} home`}>Stream<span>Z</span></Link>;
}
export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  useEffect(() => { setOpen(false); }, [pathname]);
  useEffect(() => {
    if (!open) return;
    const close = (event: KeyboardEvent) => { if (event.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [open]);
  return <>
    <a className="skip-link" href="#main">Skip to content</a>
    <header className="site-header"><div className="header-inner wrap"><Wordmark /><nav aria-label="Main navigation" className="desktop-nav">{site.nav.map((link) => <Link key={link.to} to={link.to} className={`nav-link ${pathname === link.to ? "active" : ""}`} aria-current={pathname === link.to ? "page" : undefined}>{link.label}</Link>)}</nav><div className="header-actions"><div className="header-download"><DownloadButton compact label="Get the app" /></div><Button variant="ghost" size="icon" className="menu-toggle" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="mobile-navigation" aria-label={open ? "Close menu" : "Open menu"}>{open ? <X /> : <Menu />}</Button></div></div>
    {open && <nav id="mobile-navigation" className="mobile-nav wrap" aria-label="Mobile navigation">{site.nav.map((link) => <Link key={link.to} to={link.to} className={`nav-link ${pathname === link.to ? "active" : ""}`} aria-current={pathname === link.to ? "page" : undefined}>{link.label}<ArrowUpRight size={18} /></Link>)}<DownloadButton compact /></nav>}</header>
  </>;
}
export function Footer() {
  return <footer className="site-footer"><div className="wrap footer-top"><div><Wordmark footer /><p>A new perspective on entertainment.<br />Made for your Android.</p><span className="footer-prototype">AN INDEPENDENT DESIGN PROTOTYPE</span></div><div className="footer-column"><h3>EXPLORE</h3><Link to="/features">Features</Link><Link to="/download">Download</Link><Link to="/about">About StreamZ</Link></div><div className="footer-column"><h3>THE DETAILS</h3><Link to="/support">Help & support</Link><Link to="/privacy">Privacy template</Link><Link to="/terms">Terms template</Link></div><div className="footer-column footer-contact"><h3>LET’S CONNECT</h3><a href={`mailto:${site.supportEmail}`}>{site.supportEmail}<ArrowUpRight size={14} /></a><span>Placeholder contact address</span>{site.socials.map((social) => <a key={social.label} href={social.url} target="_blank" rel="noreferrer">{social.label}<ArrowUpRight size={14} /></a>)}</div></div><div className="wrap footer-bottom"><span>© {new Date().getFullYear()} {site.name}. Design prototype.</span><span><span className="tiny-signal" /> A LITTLE DIFFERENT. BY DESIGN.</span><a href="#main">Back to top ↑</a></div></footer>;
}
