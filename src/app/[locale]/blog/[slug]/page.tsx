import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Link } from "@/i18n/navigation";
import { getAllSlugs, getPost } from "@/lib/blog";
import { routing } from "@/i18n/routing";
import Tag from "@/components/ui/Tag";

interface Params {
  locale: string;
  slug: string;
}

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    getAllSlugs().map((slug) => ({ locale, slug }))
  );
}

export async function generateMetadata({
  params
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = getPost(slug, locale);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    openGraph: { title: post.title, description: post.description, type: "article" }
  };
}

export default async function BlogPostPage({
  params
}: {
  params: Promise<Params>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const post = getPost(slug, locale);
  if (!post) notFound();
  const t = await getTranslations("blog");

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: { "@type": "Person", name: "Key Zhao" },
    inLanguage: post.locale
  };

  return (
    <main id="main" className="pt-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article className="mx-auto max-w-3xl px-6 py-20">
        <p className="meta-label mb-6">
          <Link href="/blog" className="transition-colors hover:text-fg">
            ← {t("back")}
          </Link>
        </p>
        <header>
          <time
            dateTime={post.date}
            className="font-[family-name:var(--font-mono)] text-xs text-faint"
          >
            {post.date}
          </time>
          <h1 className="mt-3 font-[family-name:var(--font-display)] text-3xl leading-tight text-fg md:text-4xl">
            {post.title}
          </h1>
          <div className="mt-4 flex gap-1.5">
            {post.tags.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </div>
        </header>
        <div className="prose-dark mt-10 text-muted">
          <MDXRemote source={post.content} />
        </div>
      </article>
    </main>
  );
}
