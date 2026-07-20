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

  return (
    <Section id="projects">
      <SectionHeading kicker={t("kicker")} title={t("title")} />
      <div className="space-y-28 md:space-y-36">
        {featuredProjects.map((project, i) => (
          <Reveal key={project.slug}>
            <article className="group">
              <Link
                href={`/projects/${project.slug}`}
                className="block overflow-hidden rounded-lg border border-border bg-surface"
                aria-label={tp(`${project.slug}.title`)}
              >
                <div className="relative aspect-[21/10] overflow-hidden">
                  <Image
                    src={project.image}
                    alt={tp(`${project.slug}.title`)}
                    fill
                    sizes="(max-width: 1152px) 100vw, 1152px"
                    priority={i === 0}
                    className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.02]"
                  />
                </div>
              </Link>

              <div className="mt-8 grid gap-8 md:grid-cols-[1fr_320px]">
                <div>
                  <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                    <h3 className="font-[family-name:var(--font-display)] text-2xl text-fg md:text-3xl">
                      {tp(`${project.slug}.title`)}
                    </h3>
                    <span className="font-[family-name:var(--font-mono)] text-xs tracking-wider text-faint">
                      {project.period}
                    </span>
                    {project.confidential && (
                      <span className="rounded border border-accent/40 px-2 py-0.5 font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-widest text-accent-soft">
                        {t("confidential")}
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-sm text-muted">
                    {tp(`${project.slug}.tagline`)}
                  </p>
                  <p className="mt-5 max-w-xl leading-relaxed text-muted">
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

                <dl className="grid h-fit grid-cols-2 gap-x-6 gap-y-4 border-l border-border pl-6 text-sm md:grid-cols-1">
                  <div>
                    <dt className="meta-label !text-[10px]">{t("labels.role")}</dt>
                    <dd className="mt-1 text-fg">{tp(`${project.slug}.role`)}</dd>
                  </div>
                  <div>
                    <dt className="meta-label !text-[10px]">{t("labels.engine")}</dt>
                    <dd className="mt-1 text-fg">{project.engine}</dd>
                  </div>
                  <div className="col-span-2 md:col-span-1">
                    <dt className="meta-label !text-[10px]">{t("labels.platforms")}</dt>
                    <dd className="mt-1 text-muted">{project.platforms.join(" · ")}</dd>
                  </div>
                  <div className="col-span-2 md:col-span-1">
                    <dt className="meta-label !text-[10px]">{t("labels.technologies")}</dt>
                    <dd className="mt-2 flex flex-wrap gap-1.5">
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
