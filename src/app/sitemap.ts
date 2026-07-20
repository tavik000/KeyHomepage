import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { featuredProjects } from "@/content/projects";
import { getAllSlugs } from "@/lib/blog";
import { site } from "@/content/site";

function localePath(locale: string, path: string): string {
  const prefix = locale === routing.defaultLocale ? "" : `/${locale}`;
  return `${site.url}${prefix}${path}`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "",
    "/blog",
    ...featuredProjects.map((p) => `/projects/${p.slug}`),
    ...getAllSlugs().map((slug) => `/blog/${slug}`)
  ];

  return paths.flatMap((path) =>
    routing.locales.map((locale) => ({
      url: localePath(locale, path === "" ? "" : path),
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : 0.7
    }))
  );
}
