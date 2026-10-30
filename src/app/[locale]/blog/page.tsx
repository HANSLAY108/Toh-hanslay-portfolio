import React from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getBlogPosts } from "@/lib/supabase/db";
import { BlogArchiveView } from "@/components/site/BlogArchiveView";
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
  const title = `${dict.blog.title} — Hanslay`;
  const description = dict.blog.description;

  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}/blog`,
      languages: {
        en: "/en/blog",
        fr: "/fr/blog",
        "x-default": "/en/blog",
      },
    },
    openGraph: {
      title,
      description,
      locale: locale === "fr" ? "fr_FR" : "en_US",
    },
  };
}

export default async function LocaleBlogPage({
  params,
}: {
  params: { locale: string };
}) {
  if (!isValidLocale(params.locale)) {
    notFound();
  }

  const locale: Locale = params.locale;
  const posts = await getBlogPosts({ publishedOnly: true });

  return (
    <BlogArchiveView
      posts={posts}
      locale={locale}
      basePath={`/${locale}`}
    />
  );
}
