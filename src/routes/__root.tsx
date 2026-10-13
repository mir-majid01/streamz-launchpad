import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Header, Footer } from "@/components/streamz/layout";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, RefreshCw } from "lucide-react";

function NotFoundComponent() {
  return (
    <section className="wrap not-found"><span>404</span><h1>A little off the beaten path.</h1><p>This page isn’t part of the picture.<br />Let’s find your way back to StreamZ.</p><Button asChild variant="cinematic" size="lg"><Link to="/">Back to StreamZ <ArrowUpRight /></Link></Button></section>
  );
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <section className="wrap not-found" role="alert">
      <span>!</span>
      <h1>This page didn’t load.</h1>
      <p>Something went wrong on our end.<br />You can try again or head back to StreamZ.</p>
      <div className="not-found-actions">
        <Button
          variant="cinematic"
          size="lg"
          onClick={() => {
            router.invalidate();
            reset();
          }}
        >
          Try again <RefreshCw />
        </Button>
        <Button asChild variant="outline" size="lg">
          <Link to="/">Back to StreamZ <ArrowUpRight /></Link>
        </Button>
      </div>
    </section>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "StreamZ — A new perspective" },
      { name: "description", content: "StreamZ Android app design prototype." },
      { property: "og:site_name", content: "StreamZ" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <Header />
      <main id="main"><Outlet /></main>
      <Footer />
    </QueryClientProvider>
  );
}
