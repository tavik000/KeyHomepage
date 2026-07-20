import { useTranslations } from "next-intl";
import { skillCategories, spokenLanguages } from "@/content/skills";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import Tag from "@/components/ui/Tag";

export default function SkillsSection() {
  const t = useTranslations("skills");

  return (
    <Section id="skills" className="border-t border-border">
      <SectionHeading kicker={t("kicker")} title={t("title")} />
      <div className="grid gap-x-12 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
        {skillCategories.map((cat, i) => (
          <Reveal key={cat.id} delay={(i % 4) * 0.05}>
            <h3 className="meta-label mb-4">{t(`categories.${cat.id}`)}</h3>
            <ul className="flex flex-wrap gap-2">
              {cat.items.map((item) => (
                <li key={item}>
                  <Tag>{item}</Tag>
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
