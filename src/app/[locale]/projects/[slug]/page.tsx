import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { featuredProjects } from "@/content/projects";
import { routing } from "@/i18n/routing";
import Tag from "@/components/ui/Tag";
import Reveal from "@/components/ui/Reveal";

interface Params {
  locale: string;
  slug: string;
}

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    featuredProjects.map((p) => ({ locale, slug: p.slug }))
  );
}

export async function generateMetadata({
  params
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const project = featuredProjects.find((p) => p.slug === slug);
  if (!project) return {};
  const t = await getTranslations({ locale, namespace: "projects" });

  return {
    title: t(`${slug}.title`),
    description: t(`${slug}.overview`),
    openGraph: {
      title: t(`${slug}.title`),
      description: t(`${slug}.tagline`),
      images: [{ url: project.image }]
    }
  };
}

export default async function ProjectPage({
  params
}: {
  params: Promise<Params>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const index = featuredProjects.findIndex((p) => p.slug === slug);
  if (index === -1) notFound();
  const project = featuredProjects[index];

  const visibleProjects = featuredProjects.filter((p) => !p.hidden);
  const visibleIndex = visibleProjects.findIndex((p) => p.slug === slug);
  const next =
    visibleIndex === -1
      ? undefined
      : visibleProjects[(visibleIndex + 1) % visibleProjects.length];

  const t = await getTranslations("projects");
  const tf = await getTranslations("featured");
  const tp = await getTranslations("projectPage");

  const challenges = t.raw(`${slug}.challenges`) as {
    challenge: string;
    solution: string;
    links?: { label: string; href: string }[];
  }[];
  const contributions = t.raw(`${slug}.contributions`) as string[];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    name: t(`${slug}.title`),
    description: t(`${slug}.overview`),
    gamePlatform: project.platforms,
    author: { "@type": "Person", name: "Key" }
  };

  return (
    <main id="main" className="pt-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero art */}
      <div className="relative aspect-[21/9] w-full overflow-hidden">
        <Image
          src={project.image}
          alt={t(`${slug}.title`)}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-bg via-transparent to-bg/40"
        />
      </div>

      <div className="mx-auto max-w-4xl px-6 pb-28">
        <Reveal className="-mt-16 relative">
          <p className="meta-label mb-4">
            <Link href="/#projects" className="transition-colors hover:text-fg">
              ← {tp("backToProjects")}
            </Link>
          </p>
          <h1 className="font-[family-name:var(--font-display)] text-3xl leading-tight text-fg md:text-5xl">
            {t(`${slug}.title`)}
          </h1>
          <p className="mt-3 text-lg text-muted">{t(`${slug}.tagline`)}</p>
        </Reveal>

        {/* Meta strip */}
        <Reveal className="mt-10">
          <dl className="grid grid-cols-2 gap-6 rounded-lg border border-border bg-surface p-6 text-sm md:grid-cols-5">
            <div>
              <dt className="meta-label !text-[10px]">{tf("labels.company")}</dt>
              <dd className="mt-1.5 text-fg">{project.company}</dd>
            </div>
            <div>
              <dt className="meta-label !text-[10px]">{tf("labels.role")}</dt>
              <dd className="mt-1.5 text-fg">{t(`${slug}.role`)}</dd>
            </div>
            <div>
              <dt className="meta-label !text-[10px]">{tf("labels.genre")}</dt>
              <dd className="mt-1.5 text-fg">{t(`${slug}.genre`)}</dd>
            </div>
            <div>
              <dt className="meta-label !text-[10px]">{tf("labels.engine")}</dt>
              <dd className="mt-1.5 text-fg">{project.engine}</dd>
            </div>
            <div>
              <dt className="meta-label !text-[10px]">{tf("labels.period")}</dt>
              <dd className="mt-1.5 text-fg">{t(`${slug}.period`)}</dd>
            </div>
            <div className="col-span-2">
              <dt className="meta-label !text-[10px]">{tf("labels.platforms")}</dt>
              <dd className="mt-1.5 text-muted">{project.platforms.join(" · ")}</dd>
            </div>
            <div className="col-span-2">
              <dt className="meta-label !text-[10px]">{tf("labels.technologies")}</dt>
              <dd className="mt-2 flex flex-wrap gap-1.5">
                {project.technologies.map((tech) => (
                  <Tag key={tech}>{tech}</Tag>
                ))}
              </dd>
            </div>
          </dl>
        </Reveal>

        {project.confidential && (
          <Reveal className="mt-6">
            <p className="rounded-lg border border-accent/30 bg-accent/5 p-4 text-sm leading-relaxed text-muted">
              {t(`${slug}.confidentialNote`)}
            </p>
          </Reveal>
        )}

        {/* Overview */}
        <Reveal className="mt-16">
          <h2 className="meta-label mb-5">{tp("overview")}</h2>
          <p className="max-w-3xl text-base leading-relaxed text-muted md:text-lg">
            {t(`${slug}.overview`)}
          </p>
        </Reveal>

        {/* Contributions */}
        <Reveal className="mt-16">
          <h2 className="meta-label mb-6">{tp("contributions")}</h2>
          <ul className="max-w-3xl space-y-3">
            {contributions.map((c) => (
              <li key={c} className="flex gap-4 leading-relaxed text-muted">
                <span aria-hidden="true" className="mt-[11px] h-px w-4 shrink-0 bg-accent/70" />
                <span>{c}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        {/* Challenges & solutions */}
        <Reveal className="mt-16">
          <h2 className="meta-label mb-6">{tp("challenges")}</h2>
          <div className="space-y-6">
            {challenges.map((item) => (
              <div
                key={item.challenge}
                className="rounded-lg border border-border bg-surface p-6"
              >
                <p className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-widest text-accent-soft">
                  {tp("challenge")}
                </p>
                <p className="mt-2 leading-relaxed text-fg">{item.challenge}</p>
                <p className="mt-5 font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-widest text-faint">
                  {tp("solution")}
                </p>
                <p className="mt-2 leading-relaxed text-muted">{item.solution}</p>
                {item.links && item.links.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-3">
                    {item.links.map((link) => (
                      <a
                        key={link.href}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-accent-soft transition-colors hover:text-fg"
                      >
                        {link.label} ↗
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </Reveal>

        {/* Gallery */}
        {project.gallery.length > 0 && (
          <Reveal className="mt-16">
            <h2 className="meta-label mb-6">{tp("gallery")}</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {project.gallery.map((src) => (
                <div key={src} className="relative aspect-video overflow-hidden rounded-lg border border-border">
                  <Image
                    src={src}
                    alt=""
                    fill
                    sizes="(max-width: 640px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </Reveal>
        )}

        {/* Gameplay video */}
        {project.youtubeId && (
          <Reveal className="mt-16">
            <h2 className="meta-label mb-6">{tp("video")}</h2>
            <div className="aspect-video overflow-hidden rounded-lg border border-border">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${project.youtubeId}`}
                title={tp("video")}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
                className="h-full w-full"
              />
            </div>
          </Reveal>
        )}

        {/* External links */}
        {project.links.length > 0 && (
          <Reveal className="mt-12 flex flex-wrap gap-4">
            {project.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded border border-border px-5 py-2.5 text-sm text-fg transition-colors hover:border-faint"
              >
                {tp(`links.${link.type}`)} ↗
              </a>
            ))}
          </Reveal>
        )}

        {/* Next project */}
        {next && (
          <Reveal className="mt-24 border-t border-border pt-10">
            <p className="meta-label mb-3">{tp("nextProject")}</p>
            <Link
              href={`/projects/${next.slug}`}
              className="font-[family-name:var(--font-display)] text-2xl text-fg transition-colors hover:text-accent-soft md:text-3xl"
            >
              {t(`${next.slug}.title`)} →
            </Link>
          </Reveal>
        )}
      </div>
    </main>
  );
}
