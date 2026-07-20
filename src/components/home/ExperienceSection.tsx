import Image from "next/image";
import { useTranslations } from "next-intl";
import { experience, education } from "@/content/experience";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";

export default function ExperienceSection() {
  const t = useTranslations("experience");
  const te = useTranslations("education");

  return (
    <Section id="experience" className="border-t border-border">
      <SectionHeading kicker={t("kicker")} title={t("title")} />
      <ol className="relative ml-2 space-y-14 border-l border-border pl-8 md:ml-4 md:pl-12">
        {experience.map((item, i) => {
          const bullets = t.raw(`items.${item.id}.bullets`) as string[];
          return (
            <li key={item.id} className="relative">
              <span
                aria-hidden="true"
                className={`absolute -left-[41px] top-1.5 h-2.5 w-2.5 rounded-full border-2 md:-left-[57px] ${
                  item.current
                    ? "border-accent bg-accent/40"
                    : "border-faint bg-bg"
                }`}
              />
              <Reveal delay={i * 0.05}>
                <p className="font-[family-name:var(--font-mono)] text-xs tracking-wider text-faint">
                  {item.period}
                  {item.current && (
                    <span className="ml-2 text-accent-soft">· {t("present")}</span>
                  )}
                </p>
                <div className="mt-2 flex items-center gap-4">
                  {item.logo && (
                    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-lg bg-white p-1 sm:h-20 sm:w-20">
                      <Image
                        src={item.logo}
                        alt=""
                        width={80}
                        height={80}
                        className="h-auto w-full object-contain"
                      />
                    </div>
                  )}
                  <div>
                    <h3 className="text-lg text-fg md:text-xl">
                      {t(`items.${item.id}.position`)}
                    </h3>
                    <p className="mt-0.5 text-sm text-muted">
                      {item.company} — {item.location}
                    </p>
                  </div>
                </div>
                <ul className="mt-4 max-w-2xl space-y-2 text-sm leading-relaxed text-muted">
                  {bullets.map((b) => (
                    <li key={b} className="flex gap-3">
                      <span aria-hidden="true" className="mt-[9px] h-px w-3 shrink-0 bg-faint" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </li>
          );
        })}
      </ol>

      <Reveal className="mt-24">
        <h3 className="meta-label mb-8">{te("title")}</h3>
        <div className="grid gap-6 md:grid-cols-2">
          {education.map((item) => (
            <div
              key={item.id}
              className="rounded-lg border border-border bg-surface p-6"
            >
              <p className="font-[family-name:var(--font-mono)] text-xs tracking-wider text-faint">
                {item.period}
              </p>
              <p className="mt-2 text-fg">{te(`items.${item.id}.degree`)}</p>
              <p className="mt-0.5 text-sm text-muted">{item.school}</p>
              <p className="mt-3 text-sm leading-relaxed text-faint">
                {te(`items.${item.id}.detail`)}
              </p>
            </div>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}
