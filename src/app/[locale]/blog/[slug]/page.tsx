import React from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getBlogPostBySlug, getProfile } from "@/lib/supabase/db";
import { BlogArticleView } from "@/components/site/BlogArticleView";
import { isValidLocale, localizeField, type Locale } from "@/lib/i18n/dictionaries";

export const dynamic = "force-dynamic";
export const revalidate = 0;

interface LocaleBlogPostPageProps {
  params: {
    locale: string;
    slug: string;
  };
}

export async function generateMetadata({
  params,
}: LocaleBlogPostPageProps): Promise<Metadata> {
  const locale: Locale = isValidLocale(params.locale) ? params.locale : "en";
  const post = await getBlogPostBySlug(params.slug);
  if (!post) {
    return { title: locale === "fr" ? "Article introuvable — Hanslay" : "Post Not Found — Hanslay" };
  }

  const title = `${localizeField(post, "title", locale)} — ${
    locale === "fr" ? "Écrits par Hanslay" : "Writing by Hanslay"
  }`;
  const description = localizeField(post, "excerpt", locale);

  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}/blog/${post.slug}`,
      languages: {
        en: `/en/blog/${post.slug}`,
        fr: `/fr/blog/${post.slug}`,
        "x-default": `/en/blog/${post.slug}`,
      },
    },
    openGraph: {
      title,
      description,
      type: "article",
      locale: locale === "fr" ? "fr_FR" : "en_US",
      images: post.cover_image ? [{ url: post.cover_image }] : undefined,
    },
  };
}

export default async function LocaleBlogPostPage({
  params,
}: LocaleBlogPostPageProps) {
  if (!isValidLocale(params.locale)) {
    notFound();
  }

  const locale: Locale = params.locale;
  const [post, profile] = await Promise.all([
    getBlogPostBySlug(params.slug),
    getProfile(),
  ]);

  if (!post) {
    notFound();
  }

  return (
    <BlogArticleView
      post={post}
      profile={profile}
      locale={locale}
      basePath={`/${locale}`}
    />
  );
}
