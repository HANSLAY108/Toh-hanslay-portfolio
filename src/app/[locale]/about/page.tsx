import React from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProfile, getSkills, getServices } from "@/lib/supabase/db";
import { AboutView } from "@/components/site/AboutView";
import { getDictionary, isValidLocale, type Locale } from "@/lib/i18n/dictionaries";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const locale: Locale = isValidLocale(params.locale) ? params.locale : "en";
  const dict = getDictionary(locale);
  const title = `${dict.nav.about} — Hanslay`;
  const description = dict.about.eyebrow;

  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}/about`,
      languages: {
        en: "/en/about",
        fr: "/fr/about",
        "x-default": "/en/about",
      },
    },
    openGraph: {
      title,
      description,
      locale: locale === "fr" ? "fr_FR" : "en_US",
    },
  };
}

export default async function LocaleAboutPage({
  params,
}: {
  params: { locale: string };
}) {
  if (!isValidLocale(params.locale)) {
    notFound();
  }

  const locale: Locale = params.locale;
  const [profile, skills, services] = await Promise.all([
    getProfile(),
    getSkills(),
    getServices(),
  ]);

  return (
    <AboutView
      profile={profile}
      skills={skills}
      services={services}
      locale={locale}
      basePath={`/${locale}`}
    />
  );
}
