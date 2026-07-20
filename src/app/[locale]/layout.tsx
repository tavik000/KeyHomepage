import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Inter, Zen_Old_Mincho, IBM_Plex_Mono } from "next/font/google";
import { routing } from "@/i18n/routing";
import { site } from "@/content/site";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import "../globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap"
});

const zenOldMincho = Zen_Old_Mincho({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-zen-mincho",
  display: "swap"
});

const plexMono = IBM_Plex_Mono({
  weight: ["400", "500"],
  subsets: ["latin"],
  variable: "--font-plex-mono",
  display: "swap"
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });

  return {
    metadataBase: new URL(site.url),
    title: {
      default: t("title"),
      template: `%s · Key Zhao`
    },
    description: t("description"),
    alternates: {
      canonical: locale === "en" ? "/" : `/${locale}`,
      languages: {
        en: "/",
        ja: "/ja",
        "zh-Hant": "/zh-Hant",
        "x-default": "/"
      }
    },
    openGraph: {
      type: "website",
      siteName: "Key Zhao — Gameplay Programmer",
      title: t("title"),
      description: t("description"),
      locale: locale.replace("-", "_"),
      images: [{ url: site.ogImage, width: 1200, height: 675 }]
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description")
    },
    robots: { index: true, follow: true }
  };
}

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Key Zhao",
  alternateName: "Haiqi Zhao",
  jobTitle: "Gameplay Programmer",
  email: `mailto:${site.email}`,
  url: site.url,
  sameAs: [site.github, site.linktree],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Tokyo",
    addressCountry: "JP"
  },
  knowsAbout: ["Unreal Engine 5", "C++", "Unity", "C#", "Gameplay Programming"],
  knowsLanguage: ["en", "ja", "zh", "yue"]
};

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);

  return (
    <html
      lang={locale === "zh-Hant" ? "zh-Hant" : locale}
      className={`${inter.variable} ${zenOldMincho.variable} ${plexMono.variable}`}
    >
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <NextIntlClientProvider>
          <Header />
          {children}
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
