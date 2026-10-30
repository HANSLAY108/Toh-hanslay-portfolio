/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { BlogPost, Locale } from "@/types/database";
import { formatDate, hasValidImage } from "@/lib/utils";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { getDictionary, localizeField } from "@/lib/i18n/dictionaries";

const ALL_TAGS = "All";

interface BlogListProps {
  posts: BlogPost[];
  locale?: Locale;
  basePath?: string;
}

export function BlogList({
  posts,
  locale = "en",
  basePath = "",
}: BlogListProps) {
  const dict = getDictionary(locale);
  const allTags = Array.from(new Set(posts.flatMap((p) => p.tags)));
  const [activeTag, setActiveTag] = useState(ALL_TAGS);

  const filtered =
    activeTag === ALL_TAGS
      ? posts
      : posts.filter((p) => p.tags.includes(activeTag));

  return (
    <div>
      {/* Tag Filter */}
      <ScrollReveal direction="up" delay={100}>
        <div className="flex flex-wrap gap-2 mb-12">
          <button
            onClick={() => setActiveTag(ALL_TAGS)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              activeTag === ALL_TAGS
                ? "bg-[#201a16] text-white"
                : "bg-[#faf8f5] border border-[#e8e2d9] text-[#634f43] hover:border-[#d5cbbe] hover:text-[#201a16]"
            }`}
          >
            {dict.blog.allTopics}
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeTag === tag
                  ? "bg-[#201a16] text-white"
                  : "bg-[#faf8f5] border border-[#e8e2d9] text-[#634f43] hover:border-[#d5cbbe] hover:text-[#201a16]"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </ScrollReveal>

      {/* Post List */}
      <div className="space-y-0 divide-y divide-[#e8e2d9]">
        {filtered.map((post, i) => {
          const title = localizeField(post, "title", locale);
          const excerpt = localizeField(post, "excerpt", locale);
          const readingTime = localizeField(post, "reading_time", locale);

          return (
            <ScrollReveal
              key={`${activeTag}-${post.id}`}
              direction="up"
              delay={i * 100}
            >
              <Link
                href={`${basePath}/blog/${post.slug}`}
                className="group flex flex-col sm:flex-row items-start justify-between gap-6 py-8 hover:opacity-95 transition-opacity"
              >
                {hasValidImage(post.cover_image) && (
                  <div className="w-full sm:w-52 h-40 sm:h-32 rounded-2xl overflow-hidden border border-[#e8e2d9] bg-[#faf8f5] shrink-0">
                    <img
                      src={post.cover_image}
                      alt={title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                )}
                <div className="flex-1 min-w-0 space-y-2">
                  <div className="flex flex-wrap gap-1.5">
                    {post.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="editorial-tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h2 className="font-serif text-xl md:text-2xl font-medium text-[#201a16] leading-tight group-hover:text-[#4e3e35] transition-colors">
                    {title}
                  </h2>
                  <p className="text-sm text-[#634f43] leading-relaxed line-clamp-2">
                    {excerpt}
                  </p>
                  <div className="flex items-center gap-3 text-xs font-mono text-[#7d6657]">
                    {post.published_at && (
                      <span>{formatDate(post.published_at)}</span>
                    )}
                    <span>·</span>
                    <span>{readingTime}</span>
                  </div>
                </div>
                <ArrowUpRight className="hidden sm:block w-5 h-5 text-[#c7b49e] group-hover:text-[#7d6657] shrink-0 mt-2 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </Link>
            </ScrollReveal>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="py-24 text-center text-[#7d6657]">
          <p className="font-serif text-xl">{dict.blog.noArticles}</p>
        </div>
      )}
    </div>
  );
}
