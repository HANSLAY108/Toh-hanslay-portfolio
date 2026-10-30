import React from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  getProfile,
  getProjects,
  getSkills,
  getBlogPosts,
  getSiteSettings,
} from "@/lib/supabase/db";
import { HomeView } from "@/components/site/HomeView";
import { isValidLocale, localizeField, type Locale } from "@/lib/i18n/dictionaries";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const locale: Locale = isValidLocale(params.locale) ? params.locale : "en";
  const settings = await getSiteSettings();
  const title = localizeField(settings, "site_title", locale);
  const description = localizeField(settings, "meta_description", locale);

  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}`,
      languages: {
        en: "/en",
        fr: "/fr",
        "x-default": "/en",
      },
    },
    openGraph: {
      title,
      description,
      type: "website",
      locale: locale === "fr" ? "fr_FR" : "en_US",
    },
  };
}

export default async function LocaleHomePage({
  params,
}: {
  params: { locale: string };
}) {
  if (!isValidLocale(params.locale)) {
    notFound();
  }

  const locale: Locale = params.locale;
  const [profile, featuredProjects, skills, latestPosts, settings] = await Promise.all([
    getProfile(),
    getProjects({ featuredOnly: true, publishedOnly: true }),
    getSkills(),
    getBlogPosts({ publishedOnly: true }),
    getSiteSettings(),
  ]);

  return (
    <HomeView
      profile={profile}
      featuredProjects={featuredProjects}
      latestPosts={latestPosts}
      skills={skills}
      settings={settings}
      locale={locale}
      basePath={`/${locale}`}
    />
  );
}
