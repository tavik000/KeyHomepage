import { useTranslations } from "next-intl";
import { awards, certifications } from "@/content/awards";
import Reveal from "@/components/ui/Reveal";

/**
 * Compact recognition block — deliberately lighter than the major sections:
 * small heading, dense two-column list, no large serif title.
 */
export default function AwardsSection() {
  const t = useTranslations("awards");
  const tc = useTranslations("certifications");

  return (
    <section id="awards" className="scroll-mt-20 border-t border-border py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <h2 className="meta-label mb-8">{t("title")}</h2>
        </Reveal>
        <div className="grid gap-x-16 gap-y-10 lg:grid-cols-[3fr_2fr]">
          <Reveal>
            <ul className="space-y-5">
              {awards.map((award) => (
                <li key={award.id} className="text-sm leading-relaxed">
                  <span className="mr-3 font-[family-name:var(--font-mono)] text-xs text-faint">
                    {award.year}
                  </span>
                  {award.eventLink ? (
                    <a
                      href={award.eventLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-fg underline decoration-border decoration-1 underline-offset-4 transition-colors hover:text-accent-soft hover:decoration-accent-soft"
                    >
                      {t(`items.${award.id}.award`)}
                    </a>
                  ) : (
                    <span className="text-fg">{t(`items.${award.id}.award`)}</span>
                  )}
                  <span className="text-muted"> — {t(`items.${award.id}.game`)}</span>
                  <span className="block pl-0 text-xs text-faint sm:inline sm:pl-2">
                    {t(`items.${award.id}.event`)}
                    {award.gameLink && (
                      <>
                        {" · "}
                        <a
                          href={award.gameLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-accent-soft transition-colors hover:text-fg"
                        >
                          {t("viewGame")} ↗
                        </a>
                      </>
                    )}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.08}>
            <ul className="space-y-5 border-border lg:border-l lg:pl-10">
              {certifications.map((cert) => (
                <li key={cert.id} className="text-sm leading-relaxed">
                  <span className="mr-3 font-[family-name:var(--font-mono)] text-xs text-faint">
                    {cert.year}
                  </span>
                  <span className="text-fg">{tc(`items.${cert.id}.name`)}</span>
                  <span className="block text-xs text-faint sm:inline sm:pl-2">
                    {tc(`items.${cert.id}.issuer`)}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
