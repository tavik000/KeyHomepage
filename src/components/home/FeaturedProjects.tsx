import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { featuredProjects } from "@/content/projects";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import Tag from "@/components/ui/Tag";
import FeaturedHeroMedia from "./FeaturedHeroMedia";

export default function FeaturedProjects() {
  const t = useTranslations("featured");
  const tp = useTranslations("projects");
  const visibleProjects = featuredProjects.filter((project) => !project.hidden);

  return (
    <Section id="projects">
      <SectionHeading kicker={t("kicker")} title={t("title")} />
      <div className="space-y-32 md:space-y-44">
        {visibleProjects.map((project, i) => {
          const storeHref = project.links[0]?.href;

          return (
          <Reveal key={project.slug}>
            <article>
              {/* Full-bleed cinematic key art — breaks out of the section's max-width container.
                  Links to the store/release page when one exists, otherwise the project detail page. */}
              <FeaturedHeroMedia
                href={storeHref ?? `/projects/${project.slug}`}
                external={Boolean(storeHref)}
                ariaLabel={tp(`${project.slug}.title`)}
                image={project.image}
                appIcon={project.appIcon}
                previewVideo={project.previewVideo}
                priority={i === 0}
                period={tp(`${project.slug}.period`)}
                title={tp(`${project.slug}.title`)}
                confidential={project.confidential}
                confidentialLabel={t("confidential")}
              />

              <div className="mt-10 grid gap-10 md:grid-cols-[1fr_auto] md:items-start">
                <div>
                  <p className="text-sm text-muted">{tp(`${project.slug}.tagline`)}</p>
                  <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">
                    {tp(`${project.slug}.overview`)}
                  </p>
                  <Link
                    href={`/projects/${project.slug}`}
                    className="mt-6 inline-flex items-center gap-2 text-sm text-accent-soft transition-colors hover:text-fg"
                  >
                    {t("readMore")}
                    <span aria-hidden="true">→</span>
                  </Link>
                </div>

                <dl className="flex flex-wrap gap-x-10 gap-y-6 md:flex-col md:gap-x-0">
                  <div>
                    <dt className="meta-label !text-[10px]">{t("labels.company")}</dt>
                    <dd className="mt-1.5 text-fg">{project.company}</dd>
                  </div>
                  <div>
                    <dt className="meta-label !text-[10px]">{t("labels.role")}</dt>
                    <dd className="mt-1.5 text-fg">{tp(`${project.slug}.role`)}</dd>
                  </div>
                  <div>
                    <dt className="meta-label !text-[10px]">{t("labels.engine")}</dt>
                    <dd className="mt-1.5 text-fg">{project.engine}</dd>
                  </div>
                  <div>
                    <dt className="meta-label !text-[10px]">{t("labels.platforms")}</dt>
                    <dd className="mt-1.5 max-w-[16rem] text-muted">{project.platforms.join(" · ")}</dd>
                  </div>
                  <div>
                    <dt className="meta-label !text-[10px]">{t("labels.technologies")}</dt>
                    <dd className="mt-2 flex max-w-[16rem] flex-wrap gap-1.5">
                      {project.technologies.map((tech) => (
                        <Tag key={tech}>{tech}</Tag>
                      ))}
                    </dd>
                  </div>
                </dl>
              </div>
            </article>
          </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
