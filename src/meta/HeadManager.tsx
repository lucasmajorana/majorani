import { useEffect } from "react";

export function HeadManager() {
  useEffect(() => {
    document.title = "Majorani — Trucks y hardware para quad skate";

    const upsertMeta = (id: string, attrs: Record<string, string>) => {
      let el = document.getElementById(id) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement("meta");
        el.id = id;
        document.head.appendChild(el);
      }
      Object.entries(attrs).forEach(([k, v]) => el!.setAttribute(k, v));
    };

    const upsertLink = (id: string, attrs: Record<string, string>) => {
      let el = document.getElementById(id) as HTMLLinkElement | null;
      if (!el) {
        el = document.createElement("link");
        el.id = id;
        document.head.appendChild(el);
      }
      Object.entries(attrs).forEach(([k, v]) => el!.setAttribute(k, v));
    };

    // SEO basics
    upsertMeta("meta-desc", {
      name: "description",
      content:
        "Trucks y hardware para quad skate. Producción local certificada, diseño para park y street.",
    });
    upsertMeta("og-title", { property: "og:title", content: "Majorani — Trucks & hardware quad skate" });
    upsertMeta("og-desc", {
      property: "og:description",
      content: "Trucks y hardware para quad skate. Producción local certificada.",
    });
    upsertMeta("og-type", { property: "og:type", content: "website" });
    upsertMeta("og-url", { property: "og:url", content: "https://majorani.com/" });
    upsertMeta("og-image", { property: "og:image", content: "/images/og.jpg" });
    upsertMeta("twitter-card", { name: "twitter:card", content: "summary_large_image" });
    upsertMeta("twitter-title", { name: "twitter:title", content: "Majorani — Trucks & hardware quad skate" });
    upsertMeta("twitter-desc", {
      name: "twitter:description",
      content: "Trucks y hardware para quad skate. Producción local certificada.",
    });
    upsertMeta("theme-color", { name: "theme-color", content: "#0f0f10" });

    // Links
    upsertLink("link-canonical", { rel: "canonical", href: "https://majorani.com/" });
    upsertLink("link-icon", { rel: "icon", href: "/favicon.ico" });
    upsertLink("link-icon-svg", { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" });
    upsertLink("apple-touch-icon", { rel: "apple-touch-icon", href: "/icons/icon-192.png" });
    upsertLink("manifest", { rel: "manifest", href: "/manifest.webmanifest" });

    // Opcional: preloads si existen
    upsertLink("preload-hero", { rel: "preload", href: "/images/hero.mp4", as: "video", crossOrigin: "anonymous" });
    upsertLink("preload-trucks", { rel: "preload", href: "/images/trucks.jpg", as: "image", fetchpriority: "high" });
  }, []);

  return null;
}
