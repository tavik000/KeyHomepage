import type { Metadata } from "next";
import type { ReactNode } from "react";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { independentProjects } from "@/content/projects";
import { site } from "@/content/site";
import Reveal from "@/components/ui/Reveal";

/** Tighter vertical rhythm than the shared `Section` primitive — this page is deliberately compact. */
function Chapter({
  children,
  wide,
  border = true
}: {
  children: ReactNode;
  wide?: boolean;
  border?: boolean;
}) {
  return (
    <section className={`py-10 md:py-14 ${border ? "border-t border-border" : ""}`}>
      <div className={`mx-auto px-6 ${wide ? "max-w-7xl" : "max-w-6xl"}`}>{children}</div>
    </section>
  );
}

/** Bespoke flagship case study for Hero Race — deliberately not the commercial project template. */
const BILIBILI_WATCH_URL = "https://www.bilibili.com/video/BV1NuB4B1Eeb/";
const GALLERY_IMAGES = [
  "/images/projects/hero-race/gallery-1.jpg",
  "/images/projects/hero-race/gallery-2.jpg",
  "/images/projects/hero-race/gallery-3.jpg",
  "/images/projects/hero-race/gallery-4.jpg"
];

interface Params {
  locale: string;
}

interface QuickFacts {
  kicker: string;
  role: { label: string; lines: string[] };
  engine: { label: string; value: string };
  language: { label: string; value: string };
  development: { label: string; value: string };
  focus: { label: string; tags: string[] };
}

interface Principle {
  title: string;
  desc: string;
}

interface TechGroup {
  title: string;
  desc: string;
}

export async function generateMetadata({
  params
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "heroRace" });
  const project = independentProjects.find((p) => p.id === "hero-race");

  return {
    title: t("meta.title"),
    description: t("meta.description"),
    openGraph: {
      title: t("meta.title"),
      description: t("meta.description"),
      images: project?.image ? [{ url: project.image }] : undefined
    }
  };
}

export default async function HeroRacePage({ params }: { params: Promise<Params> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const project = independentProjects.find((p) => p.id === "hero-race")!;
  const t = await getTranslations("heroRace");

  const lede = t.raw("lede") as string[];
  const quickFacts = t.raw("quickFacts") as QuickFacts;
  const philosophyPrinciples = t.raw("philosophy.principles") as Principle[];
  const technicalGroups = t.raw("technical.groups") as TechGroup[];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    name: t("title"),
    description: t("meta.description"),
    genre: t("type"),
    author: { "@type": "Person", name: "Key" }
  };

  return (
    <main id="main">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ================= Hero ================= */}
      <section className="relative flex min-h-[52vh] w-full flex-col overflow-hidden">
        {project.image && (
          <Image
            src={project.image}
            alt={t("title")}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        )}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-bg via-bg/85 via-45% to-bg/25"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 90% 60% at 50% 100%, rgba(206,74,59,0.18), transparent 65%)"
          }}
        />

        <div className="relative z-10 mt-auto w-full">
          <div className="mx-auto max-w-6xl px-6 pb-10 pt-24">
            <Reveal>
              <p className="meta-label mb-3 !text-fg/75 [text-shadow:0_2px_10px_rgba(0,0,0,0.8)]">
                <Link href="/#independent-projects" className="transition-colors hover:text-fg">
                  ← {t("back")}
                </Link>
              </p>
              <p className="meta-label mb-5 text-accent-soft">{t("kicker")}</p>
              <h1 className="font-[family-name:var(--font-display)] text-5xl leading-[1.05] text-fg sm:text-6xl md:text-8xl">
                {t("title")}
              </h1>
              <p
                className="mt-5 text-lg text-fg/80 [text-shadow:0_2px_10px_rgba(0,0,0,0.8)] md:text-xl"
              >
                {t("type")} <span className="text-fg/50">·</span> {t("period")}
              </p>
            </Reveal>

            <Reveal delay={0.12} className="mt-8 max-w-2xl space-y-4">
              {lede.map((p) => (
                <p
                  key={p}
                  className="text-base leading-relaxed text-fg/85 [text-shadow:0_2px_10px_rgba(0,0,0,0.8)] md:text-lg"
                >
                  {p}
                </p>
              ))}
            </Reveal>

            <Reveal delay={0.2} className="mt-10 flex flex-wrap gap-4">
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded bg-fg px-6 py-3 text-sm font-medium text-bg transition-colors hover:bg-white"
                >
                  {t("ctaSource")} ↗
                </a>
              )}
              <a
                href={BILIBILI_WATCH_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded border border-fg/40 bg-bg/30 px-6 py-3 text-sm text-fg backdrop-blur transition-colors hover:border-fg"
              >
                {t("ctaVideo")} ↗
              </a>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ================= Quick Facts ================= */}
      <Chapter border={false}>
        <Reveal className="mb-8">
          <p className="meta-label">{quickFacts.kicker}</p>
        </Reveal>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          <Reveal delay={0.02} className="h-full">
            <div className="flex h-full flex-col rounded-lg border border-border bg-surface p-6">
              <p className="meta-label !text-[10px]">{quickFacts.role.label}</p>
              <div className="mt-3 space-y-1">
                {quickFacts.role.lines.map((line) => (
                  <p key={line} className="text-fg">
                    {line}
                  </p>
                ))}
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.06} className="h-full">
            <div className="flex h-full flex-col rounded-lg border border-border bg-surface p-6">
              <p className="meta-label !text-[10px]">{quickFacts.engine.label}</p>
              <p className="mt-3 text-fg">{quickFacts.engine.value}</p>
            </div>
          </Reveal>
          <Reveal delay={0.1} className="h-full">
            <div className="flex h-full flex-col rounded-lg border border-border bg-surface p-6">
              <p className="meta-label !text-[10px]">{quickFacts.language.label}</p>
              <p className="mt-3 font-[family-name:var(--font-mono)] text-fg">
                {quickFacts.language.value}
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.14} className="h-full">
            <div className="flex h-full flex-col rounded-lg border border-border bg-surface p-6">
              <p className="meta-label !text-[10px]">{quickFacts.development.label}</p>
              <p className="mt-3 text-fg">{quickFacts.development.value}</p>
            </div>
          </Reveal>
          <Reveal delay={0.18} className="h-full">
            <div className="flex h-full flex-col rounded-lg border border-border bg-surface p-6">
              <p className="meta-label !text-[10px]">{quickFacts.focus.label}</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {quickFacts.focus.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-block rounded border border-border bg-bg px-2.5 py-1 font-[family-name:var(--font-mono)] text-[11px] tracking-wider text-muted"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </Chapter>

      {/* ================= Project Overview ================= */}
      <Chapter>
        <Reveal className="max-w-3xl">
          <p className="meta-label mb-5">{t("overview.kicker")}</p>
          <p className="font-[family-name:var(--font-display)] text-2xl leading-snug text-fg md:text-3xl">
            {t("overview.text")}
          </p>
        </Reveal>
      </Chapter>

      {/* ================= Design Philosophy ================= */}
      <Chapter>
        <Reveal className="mb-8">
          <p className="meta-label">{t("philosophy.kicker")}</p>
        </Reveal>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {philosophyPrinciples.map((p, i) => (
            <Reveal key={p.title} delay={(i % 3) * 0.06} className="h-full">
              <div className="flex h-full flex-col rounded-lg border border-border bg-surface p-6 transition-colors hover:border-faint">
                <h3 className="font-[family-name:var(--font-display)] text-lg text-fg">
                  {p.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{p.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Chapter>

      {/* ================= Technical Highlights ================= */}
      <Chapter>
        <Reveal className="mb-8">
          <p className="meta-label">{t("technical.kicker")}</p>
        </Reveal>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {technicalGroups.map((group, i) => (
            <Reveal key={group.title} delay={i * 0.06} className="h-full">
              <div className="flex h-full flex-col rounded-lg border border-border bg-surface p-6">
                <h3 className="font-[family-name:var(--font-display)] text-lg text-fg">
                  {group.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{group.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Chapter>

      {/* ================= Community-Driven Iteration ================= */}
      <Chapter>
        <div className="grid gap-10 lg:grid-cols-2">
          <Reveal>
            <p className="meta-label mb-5">{t("community.kicker")}</p>
            <p className="text-base leading-relaxed text-muted md:text-lg">
              {t("community.text")}
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <blockquote className="border-l-2 border-accent py-1 pl-6">
              <p className="font-[family-name:var(--font-display)] text-xl leading-snug text-fg md:text-2xl">
                “{t("community.question")}”
              </p>
            </blockquote>
          </Reveal>
        </div>
      </Chapter>

      {/* ================= Gallery ================= */}
      <Chapter wide>
        <Reveal className="mb-8">
          <p className="meta-label">{t("gallery.kicker")}</p>
        </Reveal>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {GALLERY_IMAGES.map((src, i) => (
            <Reveal key={src} delay={i * 0.05} className="h-full">
              <div className="group relative aspect-video overflow-hidden rounded-lg border border-border">
                <Image
                  src={src}
                  alt={t("title")}
                  fill
                  sizes="(max-width: 640px) 100vw, 50vw"
                  className="object-cover transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                />
              </div>
            </Reveal>
          ))}
        </div>
      </Chapter>

      {/* ================= Source Code ================= */}
      <Chapter>
        <Reveal>
          <div className="rounded-2xl border border-accent/25 bg-gradient-to-br from-surface to-surface-2 p-10 md:p-16">
            <p className="meta-label mb-5 text-accent-soft">{t("sourceCode.kicker")}</p>
            <p className="max-w-2xl text-base leading-relaxed text-muted md:text-lg">
              {t("sourceCode.text")}
            </p>
            {(project.link ?? site.github) && (
              <a
                href={project.link ?? site.github}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-block rounded bg-fg px-8 py-4 text-base font-medium text-bg transition-colors hover:bg-white"
              >
                {t("sourceCode.cta")} ↗
              </a>
            )}
          </div>
        </Reveal>
      </Chapter>
    </main>
  );
}
