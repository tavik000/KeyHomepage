import { useTranslations } from "next-intl";
import { skillCategories, spokenLanguages } from "@/content/skills";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";

export default function SkillsSection() {
  const t = useTranslations("skills");

  return (
    <Section id="skills" className="border-t border-border">
      <SectionHeading kicker={t("kicker")} title={t("title")} />
      <div className="grid gap-x-14 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {skillCategories.map((cat, i) => (
          <Reveal key={cat.id} delay={(i % 3) * 0.05}>
            <h3 className="meta-label mb-4 border-b border-border pb-3">
              {t(`categories.${cat.id}`)}
            </h3>
            <ul className="space-y-2.5">
              {cat.items.map((skill) => (
                <li
                  key={skill.name}
                  className="flex items-baseline justify-between gap-3 text-sm"
                >
                  <span className="text-fg">{skill.name}</span>
                  {skill.years !== undefined && (
                    <>
                      <span
                        aria-hidden="true"
                        className="grow border-b border-dotted border-border"
                      />
                      <span className="shrink-0 font-[family-name:var(--font-mono)] text-xs tracking-wider text-accent-soft">
                        {t("years", { years: skill.years })}
                      </span>
                    </>
                  )}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-20">
        <h3 className="meta-label mb-6">{t("spokenTitle")}</h3>
        <dl className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {spokenLanguages.map(({ id }) => (
            <div key={id} className="rounded-lg border border-border bg-surface p-5">
              <dt className="text-fg">{t(`spoken.${id}.name`)}</dt>
              <dd className="mt-1 font-[family-name:var(--font-mono)] text-xs tracking-wider text-accent-soft">
                {t(`spoken.${id}.level`)}
              </dd>
            </div>
          ))}
        </dl>
      </Reveal>
    </Section>
  );
}
