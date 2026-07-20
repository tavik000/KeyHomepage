import Image from "next/image";
import { useTranslations } from "next-intl";
import { independentProjects } from "@/content/projects";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import Tag from "@/components/ui/Tag";

/** Card-style gradients, keyed by index — a stand-in for key art until real screenshots exist. */
const PLACEHOLDER_GRADIENTS = [
  "radial-gradient(ellipse 120% 100% at 20% 0%, rgba(206,74,59,0.35), transparent 60%), var(--color-surface-2)",
  "radial-gradient(ellipse 120% 100% at 80% 100%, rgba(206,74,59,0.28), transparent 60%), var(--color-surface-2)",
  "radial-gradient(ellipse 120% 100% at 50% 50%, rgba(206,74,59,0.3), transparent 65%), var(--color-surface-2)"
];

export default function IndependentProjects() {
  const t = useTranslations("independent");

  return (
    <Section id="independent-projects" className="border-t border-border">
      <SectionHeading
        kicker={t("kicker")}
        title={t("title")}
        description={t("description")}
      />
      <div className="grid gap-8 sm:grid-cols-2">
        {independentProjects.map((project, i) => {
          const title = t(`items.${project.id}.title`);
          const inner = (
            <div className="group block overflow-hidden rounded-lg border border-border bg-surface transition-all duration-300 hover:-translate-y-1 hover:border-faint">
              <div
                className="relative flex aspect-[3/2] items-center justify-center overflow-hidden"
                style={project.image ? undefined : { background: PLACEHOLDER_GRADIENTS[i % PLACEHOLDER_GRADIENTS.length] }}
              >
                {project.image ? (
                  <Image
                    src={project.image}
                    alt={title}
                    fill
                    sizes="(max-width: 640px) 100vw, 50vw"
                    className="object-cover transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                  />
                ) : (
                  <span className="font-[family-name:var(--font-display)] text-6xl text-fg/25 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105 md:text-7xl">
                    {title.trim().charAt(0)}
                  </span>
                )}
                {project.year && (
                  <span className="absolute right-3 top-3 rounded bg-bg/80 px-2 py-1 font-[family-name:var(--font-mono)] text-[10px] tracking-widest text-faint backdrop-blur-sm">
                    {project.year}
                  </span>
                )}
              </div>
              <div className="p-6">
                <h3 className="font-[family-name:var(--font-display)] text-xl text-fg transition-colors group-hover:text-accent-soft">
                  {title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {t(`items.${project.id}.desc`)}
                </p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <Tag key={tag}>{tag}</Tag>
                  ))}
                </div>
              </div>
            </div>
          );
          return (
            <Reveal key={project.id} delay={(i % 2) * 0.08}>
              {project.link ? (
                <a href={project.link} target="_blank" rel="noopener noreferrer" className="block">
                  {inner}
                </a>
              ) : (
                inner
              )}
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
