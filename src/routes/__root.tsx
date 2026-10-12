import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useRouterState,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { Toaster } from "sonner";
import { SEO_CONFIG, GEO_META_TAGS, generateGlobalSchema } from "@/data/seo";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: unknown; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1, maximum-scale=5" },
      { title: "Tech Fusion Club (TFC) SRMU | Premier Tech Club, Hackathons & Viveka Fest Lucknow" },
      {
        name: "description",
        content:
          "Official premier student-led technical club of Shri Ramswaroop Memorial University (SRMU), Lucknow. Organizers of national tech fest Viveka, engineering hackathons, coding workshops, and AI/Web development events.",
      },
      {
        name: "keywords",
        content: SEO_CONFIG.masterKeywords.join(", "),
      },
      { name: "author", content: "Tech Fusion Club (TFC) SRMU" },
      { name: "publisher", content: "Tech Fusion Club (TFC) SRMU" },
      {
        name: "robots",
        content: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
      },
      {
        name: "googlebot",
        content: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
      },
      {
        name: "bingbot",
        content: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
      },
      // Geo-Local SEO & Location Tags (GEO)
      ...GEO_META_TAGS,
      // Open Graph (Facebook, WhatsApp, LinkedIn, Discord)
      { property: "og:site_name", content: "Tech Fusion Club (TFC) SRMU" },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "en_IN" },
      { property: "og:title", content: "Tech Fusion Club (TFC) SRMU | Viveka Fest & Engineering Club" },
      {
        property: "og:description",
        content:
          "Official premier student-led technical club at Shri Ramswaroop Memorial University (SRMU), Lucknow. Organizers of Viveka fest, national hackathons, and developer workshops.",
      },
      {
        property: "og:image",
        content: SEO_CONFIG.ogImage,
      },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: "Tech Fusion Club (TFC) - Shri Ramswaroop Memorial University" },
      { property: "og:image:type", content: "image/jpeg" },
      // Twitter Card
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@techfusionclub" },
      { name: "twitter:creator", content: "@techfusionclub" },
      { name: "twitter:title", content: "Tech Fusion Club (TFC) SRMU | Technical Club & Hackathons" },
      {
        name: "twitter:description",
        content:
          "Official student technical club of Shri Ramswaroop Memorial University (SRMU), Lucknow. Viveka fest, engineering hackathons & workshops.",
      },
      {
        name: "twitter:image",
        content: SEO_CONFIG.ogImage,
      },
      // Application and Mobile Meta
      { name: "theme-color", content: "#09090b" },
      { name: "color-scheme", content: "dark light" },
      { name: "application-name", content: "Tech Fusion Club SRMU" },
      { name: "apple-mobile-web-app-title", content: "TFC SRMU" },
      { name: "format-detection", content: "telephone=no" },
      { name: "revisit-after", content: "3 days" },
      { name: "rating", content: "general" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "dns-prefetch", href: "https://fonts.googleapis.com" },
      { rel: "dns-prefetch", href: "https://fonts.gstatic.com" },
      { rel: "dns-prefetch", href: "https://firestore.googleapis.com" },
      { rel: "dns-prefetch", href: "https://identitytoolkit.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
      { rel: "icon", href: "/images/branding/techfusionlogolight-sm.webp", type: "image/webp" },
      { rel: "apple-touch-icon", href: "/images/branding/techfusionlogolight-sm.webp" },
      { rel: "manifest", href: "/site.webmanifest" },
      { rel: "canonical", href: SEO_CONFIG.siteUrl },
      { rel: "alternate", hrefLang: "en-IN", href: SEO_CONFIG.siteUrl },
      { rel: "alternate", hrefLang: "x-default", href: SEO_CONFIG.siteUrl },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(generateGlobalSchema()),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />

        {/* Preload and defer Google Fonts to prevent render blocking */}
        <link
          rel="preload"
          as="style"
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600&family=JetBrains+Mono:wght@400;500&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600&family=JetBrains+Mono:wght@400;500&display=swap"
          media="print"
          // @ts-expect-error - onLoad type issue in React
          onLoad="this.media='all'"
        />
        <noscript>
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600&family=JetBrains+Mono:wght@400;500&display=swap"
          />
        </noscript>
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
  const routerState = useRouterState();
  const isAdministration = routerState.location.pathname.startsWith("/administration");
  const isHome = routerState.location.pathname === "/";

  return (
    <QueryClientProvider client={queryClient}>
      {!isAdministration && <Nav />}
      <main id="main" className={!isAdministration && !isHome ? "pt-24 sm:pt-28" : ""}>
        {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
        <Outlet />
      </main>
      {!isAdministration && <Footer />}
      <Toaster theme="dark" position="bottom-right" richColors />
    </QueryClientProvider>
  );
}
