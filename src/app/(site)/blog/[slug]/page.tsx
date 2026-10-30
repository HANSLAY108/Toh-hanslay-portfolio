import React from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getBlogPostBySlug, getProfile } from "@/lib/supabase/db";
import { BlogArticleView } from "@/components/site/BlogArticleView";

export const dynamic = "force-dynamic";
export const revalidate = 0;

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = await getBlogPostBySlug(params.slug);
  if (!post) {
    return { title: "Post Not Found — Hanslay" };
  }

  return {
    title: `${post.title} — Writing by Hanslay`,
    description: post.excerpt,
    alternates: {
      canonical: `/en/blog/${post.slug}`,
      languages: {
        en: `/en/blog/${post.slug}`,
        fr: `/fr/blog/${post.slug}`,
        "x-default": `/en/blog/${post.slug}`,
      },
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      images: post.cover_image ? [{ url: post.cover_image }] : undefined,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
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
      locale="en"
      basePath="/en"
    />
  );
}
