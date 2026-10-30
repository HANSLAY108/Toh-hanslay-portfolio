import React from "react";
import type { Metadata } from "next";
import { getBlogPosts } from "@/lib/supabase/db";
import { BlogArchiveView } from "@/components/site/BlogArchiveView";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title: "Writing & Essays — Hanslay",
  description: "Technical writing on distributed systems, LLM orchestration, and editorial typography by Hanslay.",
  alternates: {
    canonical: "/en/blog",
    languages: {
      en: "/en/blog",
      fr: "/fr/blog",
      "x-default": "/en/blog",
    },
  },
};

export default async function BlogPage() {
  const posts = await getBlogPosts({ publishedOnly: true });

  return (
    <BlogArchiveView
      posts={posts}
      locale="en"
      basePath="/en"
    />
  );
}
