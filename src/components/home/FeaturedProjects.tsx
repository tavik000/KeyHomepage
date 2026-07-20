import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { featuredProjects } from "@/content/projects";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import Tag from "@/components/ui/Tag";

export default function FeaturedProjects() {
  const t = useTranslations("featured");
  const tp = useTranslations("projects");
  const visibleProjects = featuredProjects.filter((project) => !project.hidden);

  return (
    <Section id="projects">
      <SectionHeading kicker={t("kicker")} title={t("title")} />
      <div className="space-y-32 md:space-y-44">
        {visibleProjects.map((project, i) => (
          <Reveal key={project.slug}>
            <article>
              {/* Full-bleed cinematic key art — breaks out of the section's max-width container */}
              <Link
                href={`/projects/${project.slug}`}
                className="group relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] block w-screen"
                aria-label={tp(`${project.slug}.title`)}
              >
                <div className="relative aspect-[4/3] overflow-hidden sm:aspect-[16/9] lg:aspect-[21/9]">
                  <Image
                    src={project.image}
                    alt={tp(`${project.slug}.title`)}
                    fill
                    sizes="100vw"
                    priority={i === 0}
                    className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-bg via-bg/5 to-transparent"
                  />
                  <div className="absolute inset-x-0 bottom-0 mx-auto w-full max-w-6xl px-6 pb-8 md:pb-12">
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                      <span className="font-[family-name:var(--font-mono)] text-xs tracking-[0.18em] text-accent-soft">
                        {tp(`${project.slug}.period`)}
                      </span>
                      {project.confidential && (
                        <span className="rounded border border-accent/40 px-2 py-0.5 font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-widest text-accent-soft">
                          {t("confidential")}
                        </span>
                      )}
                    </div>
                    <h3 className="mt-3 max-w-3xl font-[family-name:var(--font-display)] text-3xl leading-[1.1] text-fg sm:text-5xl lg:text-6xl">
                      {tp(`${project.slug}.title`)}
                    </h3>
                  </div>
                </div>
              </Link>

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
        ))}
      </div>
    </Section>
  );
}
