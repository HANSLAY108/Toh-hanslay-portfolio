/* eslint-disable @next/next/no-img-element */
import React from "react";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { BlogPost, Locale, Profile } from "@/types/database";
import { formatDate, hasValidImage } from "@/lib/utils";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { getDictionary, localizeField } from "@/lib/i18n/dictionaries";

function renderMarkdown(content: string): string {
  return content
    .replace(
      /^### (.+)$/gm,
      '<h3 class="font-serif text-xl font-medium text-[#201a16] mt-10 mb-4 leading-snug">$1</h3>'
    )
    .replace(
      /^## (.+)$/gm,
      '<h2 class="font-serif text-2xl md:text-3xl font-medium text-[#201a16] mt-14 mb-5 leading-snug">$1</h2>'
    )
    .replace(
      /^# (.+)$/gm,
      '<h1 class="font-serif text-3xl font-medium text-[#201a16] mb-5">$1</h1>'
    )
    .replace(
      /\*\*(.+?)\*\*/g,
      '<strong class="font-semibold text-[#201a16]">$1</strong>'
    )
    .replace(/\*(.+?)\*/g, '<em class="italic text-[#4e3e35]">$1</em>')
    .replace(
      /`([^`\n]+)`/g,
      '<code class="font-mono text-[13px] bg-[#f4f0e8] text-[#4e3e35] px-1.5 py-0.5 rounded">$1</code>'
    )
    .replace(
      /```(\w*)\n([\s\S]*?)```/g,
      (_, _lang, code) =>
        `<pre class="my-8 p-6 rounded-2xl bg-[#201a16] overflow-x-auto shadow-card"><code class="font-mono text-[13px] text-[#dbd0c4] leading-loose">${code
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;")}</code></pre>`
    )
    .replace(
      /^> (.+)$/gm,
      '<blockquote class="pl-5 border-l-2 border-[#c7b49e] my-6 italic text-[#634f43] leading-relaxed">$1</blockquote>'
    )
    .replace(
      /^- (.+)$/gm,
      '<li class="ml-5 text-[#634f43] leading-relaxed list-disc list-outside my-1">$1</li>'
    )
    .replace(
      /^\d+\. (.+)$/gm,
      '<li class="ml-5 text-[#634f43] leading-relaxed list-decimal list-outside my-1">$1</li>'
    )
    .replace(
      /\n\n/g,
      '</p><p class="text-[17px] text-[#4e3e35] leading-[1.85] mb-5">'
    )
    .replace(
      /^/,
      '<p class="text-[17px] text-[#4e3e35] leading-[1.85] mb-5">'
    )
    .replace(/$/, "</p>");
}

interface BlogArticleViewProps {
  post: BlogPost;
  profile: Profile;
  locale: Locale;
  basePath: string;
}

export function BlogArticleView({
  post,
  profile,
  locale,
  basePath,
}: BlogArticleViewProps) {
  const dict = getDictionary(locale);
  const title = localizeField(post, "title", locale);
  const excerpt = localizeField(post, "excerpt", locale);
  const content = localizeField(post, "content", locale);
  const readingTime = localizeField(post, "reading_time", locale);
  const tagline = localizeField(profile, "tagline", locale);

  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <div className="bg-[#faf8f5] border-b border-[#e8e2d9]">
        <div className="max-w-3xl mx-auto px-6 pt-14 pb-12">
          <ScrollReveal direction="up">
            <Link
              href={`${basePath}/blog`}
              className="inline-flex items-center gap-2 mb-8 text-sm text-[#634f43] hover:text-[#201a16] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              {dict.blog.backToJournal}
            </Link>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-5">
              {post.tags.map((tag) => (
                <span key={tag} className="editorial-tag">
                  {tag}
                </span>
              ))}
            </div>

            <h1 className="font-serif text-4xl md:text-5xl font-medium tracking-tight text-[#201a16] leading-tight mb-5">
              {title}
            </h1>

            <p className="text-lg text-[#634f43] leading-relaxed mb-8">
              {excerpt}
            </p>

            <div className="flex items-center gap-4 text-xs font-mono text-[#7d6657] border-t border-[#e8e2d9] pt-6">
              {post.published_at && (
                <time dateTime={post.published_at}>
                  {formatDate(post.published_at)}
                </time>
              )}
              <span>·</span>
              <span>{readingTime}</span>
              <span>·</span>
              <span>{profile.full_name}</span>
            </div>
          </ScrollReveal>
        </div>
      </div>

      {/* Cover Image Banner */}
      {hasValidImage(post.cover_image) && (
        <div className="max-w-4xl mx-auto px-6 pt-12">
          <ScrollReveal direction="scale" delay={120}>
            <div className="rounded-2xl overflow-hidden border border-[#e8e2d9] bg-[#faf8f5] shadow-sm">
              <img
                src={post.cover_image}
                alt={title}
                className="w-full max-h-[480px] object-cover"
              />
            </div>
          </ScrollReveal>
        </div>
      )}

      {/* Article Body */}
      <div className="max-w-3xl mx-auto px-6 py-14 md:py-20">
        <ScrollReveal direction="up" delay={160}>
          <article
            dangerouslySetInnerHTML={{ __html: renderMarkdown(content) }}
          />
        </ScrollReveal>
      </div>

      {/* Author Footer */}
      <div className="border-t border-[#e8e2d9] bg-[#faf8f5]">
        <div className="max-w-3xl mx-auto px-6 py-10">
          <ScrollReveal direction="up">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#201a16] text-white flex items-center justify-center font-serif">
                  {profile.full_name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-medium text-[#201a16]">
                    {profile.full_name}
                  </p>
                  <p className="text-xs text-[#7d6657]">{tagline}</p>
                </div>
              </div>
              <Link
                href={`${basePath}/blog`}
                className="inline-flex items-center gap-1.5 text-sm text-[#634f43] hover:text-[#201a16] transition-colors"
              >
                {dict.home.readAllArticles}
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
}

