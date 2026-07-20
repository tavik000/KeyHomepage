import { useTranslations } from "next-intl";
import { jamProjects } from "@/content/projects";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import JamCard from "./JamCard";

export default function JamGallery() {
  const t = useTranslations("jams");

  return (
    <Section id="game-jams" wide className="border-t border-border">
      <SectionHeading
        kicker={t("kicker")}
        title={t("title")}
        description={t("description")}
      />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {jamProjects.map((project, i) => (
          <Reveal key={project.id} delay={(i % 3) * 0.06}>
            <JamCard
              project={project}
              title={t(`items.${project.id}.title`)}
              desc={t(`items.${project.id}.desc`)}
              awardLabel={t("awardBadge")}
            />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
