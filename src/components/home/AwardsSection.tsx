import { useTranslations } from "next-intl";
import { awards, certifications } from "@/content/awards";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";

export default function AwardsSection() {
  const t = useTranslations("awards");
  const tc = useTranslations("certifications");

  return (
    <Section id="awards" className="border-t border-border">
      <SectionHeading kicker={t("kicker")} title={t("title")} />
      <ol className="divide-y divide-border border-y border-border">
        {awards.map((award, i) => (
          <li key={award.id}>
            <Reveal delay={i * 0.04}>
              <div className="grid gap-2 py-6 md:grid-cols-[80px_1fr_auto] md:items-baseline md:gap-6">
                <span className="font-[family-name:var(--font-mono)] text-sm text-faint">
                  {award.year}
                </span>
                <div>
                  <p className="text-fg">
                    {t(`items.${award.id}.award`)}
                    <span className="text-muted"> — {t(`items.${award.id}.game`)}</span>
                  </p>
                  <p className="mt-1 text-sm text-faint">{t(`items.${award.id}.event`)}</p>
                </div>
                <div className="flex gap-4 text-sm">
                  {award.gameLink && (
                    <a
                      href={award.gameLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent-soft transition-colors hover:text-fg"
                    >
                      {t("viewGame")} ↗
                    </a>
                  )}
                  {award.eventLink && (
                    <a
                      href={award.eventLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-faint transition-colors hover:text-fg"
                    >
                      {t("viewEvent")} ↗
                    </a>
                  )}
                </div>
              </div>
            </Reveal>
          </li>
        ))}
      </ol>

      <Reveal className="mt-20">
        <h3 className="meta-label mb-6">{tc("title")}</h3>
        <ul className="grid gap-4 md:grid-cols-3">
          {certifications.map((cert) => (
            <li key={cert.id} className="rounded-lg border border-border bg-surface p-5">
              <p className="font-[family-name:var(--font-mono)] text-xs text-faint">
                {cert.year}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-fg">
                {tc(`items.${cert.id}.name`)}
              </p>
              <p className="mt-1 text-xs text-faint">{tc(`items.${cert.id}.issuer`)}</p>
            </li>
          ))}
        </ul>
      </Reveal>
    </Section>
  );
}
