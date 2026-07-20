import Image from "next/image";
import { useTranslations } from "next-intl";
import { site } from "@/content/site";
import Reveal from "@/components/ui/Reveal";

/**
 * Low-priority signal that I write technical UE5/game-dev content — links out
 * to the real blog rather than duplicating posts here. Quiet, editorial,
 * matches GameJournalSection's visual weight; the cover thumbnail is a
 * contained card (not the cinematic full-bleed treatment reserved for
 * commercial projects).
 */
export default function BlogTeaserSection() {
  const t = useTranslations("blogTeaser");

  return (
    <section id="blog" className="scroll-mt-20 border-t border-border py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <h2 className="meta-label mb-6">{t("kicker")}</h2>
          <a
            href={site.blogExternal}
            target="_blank"
            rel="noopener noreferrer"
            className="group grid gap-8 lg:grid-cols-[280px_1fr] lg:items-center"
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-border bg-surface">
              <Image
                src="/images/blog-cover.png"
                alt=""
                fill
                sizes="(max-width: 1024px) 100vw, 280px"
                className="object-cover transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
              />
            </div>
            <div>
              <h3 className="font-[family-name:var(--font-display)] text-xl text-fg transition-colors group-hover:text-accent-soft md:text-2xl">
                {t("title")}
              </h3>
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted">
                {t("lead")}
              </p>
              <span className="mt-6 inline-flex items-center gap-2 text-sm text-accent-soft transition-colors group-hover:text-fg">
                {t("cta")}
                <span aria-hidden="true">↗</span>
              </span>
            </div>
          </a>
        </Reveal>
      </div>
    </section>
  );
}
