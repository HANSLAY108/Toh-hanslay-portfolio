import React from "react";
import { BlogPost, Locale } from "@/types/database";
import { BlogList } from "@/components/blog/BlogList";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { getDictionary } from "@/lib/i18n/dictionaries";

interface BlogArchiveViewProps {
  posts: BlogPost[];
  locale: Locale;
  basePath: string;
}

export function BlogArchiveView({
  posts,
  locale,
  basePath,
}: BlogArchiveViewProps) {
  const dict = getDictionary(locale);

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-4xl mx-auto px-6 py-16 md:py-24">
        <ScrollReveal direction="up">
          <div className="mb-14 space-y-4">
            <span className="text-xs font-mono uppercase tracking-wider text-[#7d6657]">
              {dict.blog.eyebrow}
            </span>
            <h1 className="font-serif text-5xl md:text-6xl font-medium tracking-tight text-[#201a16] leading-tight">
              {dict.blog.title}
            </h1>
            <p className="text-base text-[#634f43] leading-relaxed max-w-lg">
              {dict.blog.description}
            </p>
          </div>
        </ScrollReveal>

        <BlogList posts={posts} locale={locale} basePath={basePath} />
      </div>
    </div>
  );
}

