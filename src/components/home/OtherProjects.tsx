import { useTranslations } from "next-intl";
import { otherProjects, type OtherCategory } from "@/content/projects";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import Tag from "@/components/ui/Tag";

const CATEGORY_ORDER: OtherCategory[] = ["game", "web", "mobile", "ai"];

export default function OtherProjects() {
  const t = useTranslations("other");

  return (
    <Section id="other-projects" className="border-t border-border">
      <SectionHeading
        kicker={t("kicker")}
        title={t("title")}
        description={t("description")}
      />
      <div className="space-y-12">
        {CATEGORY_ORDER.map((category) => {
          const items = otherProjects.filter((p) => p.category === category);
          if (items.length === 0) return null;
          return (
            <Reveal key={category}>
              <h3 className="meta-label mb-4">{t(`categories.${category}`)}</h3>
              <ul className="divide-y divide-border border-y border-border">
                {items.map((project) => {
                  const inner = (
                    <div className="grid gap-2 py-4 sm:grid-cols-[1fr_auto] sm:items-center">
                      <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                        <span className="text-fg transition-colors group-hover:text-accent-soft">
                          {t(`items.${project.id}.title`)}
                        </span>
                        {project.year && (
                          <span className="font-[family-name:var(--font-mono)] text-xs text-faint">
                            {project.year}
                          </span>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {project.tags.map((tag) => (
                          <Tag key={tag}>{tag}</Tag>
                        ))}
                      </div>
                    </div>
                  );
                  return (
                    <li key={project.id}>
                      {project.link ? (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group block"
                        >
                          {inner}
                        </a>
                      ) : (
                        inner
                      )}
                    </li>
                  );
                })}
              </ul>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
