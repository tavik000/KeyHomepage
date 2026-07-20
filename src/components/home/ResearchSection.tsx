import { useTranslations } from "next-intl";
import { site } from "@/content/site";
import Reveal from "@/components/ui/Reveal";
import Tag from "@/components/ui/Tag";

/**
 * Low-priority "long-term passion" section: the personal game design research
 * database. Intentionally quiet — small heading, no imagery — so it never
 * competes with commercial work.
 */
export default function ResearchSection() {
  const t = useTranslations("research");
  const dimensions = t.raw("dimensions") as string[];

  return (
    <section id="research" className="scroll-mt-20 border-t border-border py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <h2 className="meta-label mb-6">{t("kicker")}</h2>
          <div className="grid gap-10 lg:grid-cols-[3fr_2fr]">
            <div>
              <h3 className="font-[family-name:var(--font-display)] text-xl text-fg md:text-2xl">
                {t("title")}
              </h3>
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted">
                {t("lead")}
              </p>
              <div className="mt-6 flex flex-wrap gap-1.5">
                {dimensions.map((d) => (
                  <Tag key={d}>{d}</Tag>
                ))}
              </div>
            </div>
            <div className="flex flex-col items-start justify-center gap-4 border-border lg:border-l lg:pl-10">
              <p className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.18em] text-accent-soft">
                {t("stat")}
              </p>
              <a
                href={site.gameDesignDb}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded border border-border px-5 py-2.5 text-sm text-fg transition-colors hover:border-faint"
              >
                {t("cta")} ↗
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
