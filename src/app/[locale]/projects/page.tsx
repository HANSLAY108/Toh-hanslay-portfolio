import React from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProjects } from "@/lib/supabase/db";
import { ProjectsArchiveView } from "@/components/site/ProjectsArchiveView";
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
  const title = `${dict.projects.title} — Hanslay`;
  const description = dict.projects.description;

  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}/projects`,
      languages: {
        en: "/en/projects",
        fr: "/fr/projects",
        "x-default": "/en/projects",
      },
    },
    openGraph: {
      title,
      description,
      locale: locale === "fr" ? "fr_FR" : "en_US",
    },
  };
}

export default async function LocaleProjectsPage({
  params,
}: {
  params: { locale: string };
}) {
  if (!isValidLocale(params.locale)) {
    notFound();
  }

  const locale: Locale = params.locale;
  const projects = await getProjects({ publishedOnly: true });

  return (
    <ProjectsArchiveView
      projects={projects}
      locale={locale}
      basePath={`/${locale}`}
    />
  );
}
