import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getPosts } from "@/lib/blog";
import { site } from "@/content/site";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import Tag from "@/components/ui/Tag";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "blog" });
  return { title: t("title"), description: t("description") };
}

export default async function BlogIndexPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("blog");
  const posts = getPosts(locale);

  return (
    <main id="main" className="pt-16">
      <Section>
        <SectionHeading
          kicker={t("kicker")}
          title={t("title")}
          description={t("description")}
        />
        {posts.length === 0 ? (
          <p className="text-muted">{t("empty")}</p>
        ) : (
          <ul className="divide-y divide-border border-y border-border">
            {posts.map((post, i) => (
              <li key={post.slug}>
                <Reveal delay={i * 0.04}>
                  <Link href={`/blog/${post.slug}`} className="group block py-8">
                    <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
                      <time
                        dateTime={post.date}
                        className="font-[family-name:var(--font-mono)] text-xs text-faint"
                      >
                        {post.date}
                      </time>
                      <div className="flex gap-1.5">
                        {post.tags.map((tag) => (
                          <Tag key={tag}>{tag}</Tag>
                        ))}
                      </div>
                    </div>
                    <h2 className="mt-3 font-[family-name:var(--font-display)] text-xl text-fg transition-colors group-hover:text-accent-soft md:text-2xl">
                      {post.title}
                    </h2>
                    <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
                      {post.description}
                    </p>
                  </Link>
                </Reveal>
              </li>
            ))}
          </ul>
        )}
        <p className="mt-12 text-sm text-faint">
          {t("externalNote")}{" "}
          <a
            href={site.blogExternal}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent-soft transition-colors hover:text-fg"
          >
            reactkeyblog.com ↗
          </a>
        </p>
      </Section>
    </main>
  );
}
