import React from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProjectBySlug, getProjects } from "@/lib/supabase/db";
import { CaseStudyView } from "@/components/projects/CaseStudyView";
import { isValidLocale, localizeField, type Locale } from "@/lib/i18n/dictionaries";

export const dynamic = "force-dynamic";
export const revalidate = 0;

interface LocaleCaseStudyPageProps {
  params: {
    locale: string;
    slug: string;
  };
}

export async function generateMetadata({
  params,
}: LocaleCaseStudyPageProps): Promise<Metadata> {
  const locale: Locale = isValidLocale(params.locale) ? params.locale : "en";
  const project = await getProjectBySlug(params.slug);
  if (!project) {
    return { title: locale === "fr" ? "Projet introuvable — Hanslay" : "Project Not Found — Hanslay" };
  }

  const title = `${localizeField(project, "title", locale)} — ${
    locale === "fr" ? "Étude de cas par Hanslay" : "Case Study by Hanslay"
  }`;
  const description = localizeField(project, "summary", locale);

  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}/projects/${project.slug}`,
      languages: {
        en: `/en/projects/${project.slug}`,
        fr: `/fr/projects/${project.slug}`,
        "x-default": `/en/projects/${project.slug}`,
      },
    },
    openGraph: {
      title,
      description,
      locale: locale === "fr" ? "fr_FR" : "en_US",
      images: project.cover_image ? [{ url: project.cover_image }] : undefined,
    },
  };
}

export default async function LocaleCaseStudyPage({
  params,
}: LocaleCaseStudyPageProps) {
  if (!isValidLocale(params.locale)) {
    notFound();
  }

  const locale: Locale = params.locale;
  const [project, allProjects] = await Promise.all([
    getProjectBySlug(params.slug),
    getProjects({ publishedOnly: true }),
  ]);

  if (!project) {
    notFound();
  }

  const currentIndex = allProjects.findIndex((p) => p.slug === project.slug);
  const nextProject =
    currentIndex >= 0 && allProjects.length > 1
      ? allProjects[(currentIndex + 1) % allProjects.length]
      : undefined;

  return (
    <CaseStudyView
      project={project}
      nextProject={nextProject}
      locale={locale}
      basePath={`/${locale}`}
    />
  );
}
