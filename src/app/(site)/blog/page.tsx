import React from "react";
import { getBlogPosts } from "@/lib/supabase/db";
import { BlogList } from "@/components/blog/BlogList";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title: "Writing — Hanslay",
  description:
    "Technical articles, engineering philosophy, and research notes on AI systems, distributed architecture, and editorial design.",
};

export default async function BlogPage() {
  const posts = await getBlogPosts({ publishedOnly: true });

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-4xl mx-auto px-6 py-16 md:py-24">
        <ScrollReveal direction="up">
          <div className="mb-14 space-y-4">
            <span className="text-xs font-mono uppercase tracking-wider text-[#7d6657]">
              Technical Writing &amp; Research
            </span>
            <h1 className="font-serif text-5xl md:text-6xl font-medium tracking-tight text-[#201a16] leading-tight">
              Writing
            </h1>
            <p className="text-base text-[#634f43] leading-relaxed max-w-lg">
              Explorations at the intersection of autonomous AI, distributed systems, and editorial design. Technical depth, linguistic precision.
            </p>
          </div>
        </ScrollReveal>

        <BlogList posts={posts} />
      </div>
    </div>
  );
}
