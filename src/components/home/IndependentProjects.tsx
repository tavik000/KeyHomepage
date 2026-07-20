import { useTranslations } from "next-intl";
import { independentProjects } from "@/content/projects";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import IndependentProjectCard from "./IndependentProjectCard";

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
        {independentProjects.map((project, i) => (
          <Reveal key={project.id} delay={(i % 2) * 0.08}>
            <IndependentProjectCard
              project={project}
              title={t(`items.${project.id}.title`)}
              desc={t(`items.${project.id}.desc`)}
              gradient={PLACEHOLDER_GRADIENTS[i % PLACEHOLDER_GRADIENTS.length]}
            />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
