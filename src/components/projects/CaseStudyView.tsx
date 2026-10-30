/* eslint-disable @next/next/no-img-element */
import React from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  Github,
  ExternalLink,
  Trophy,
  Cpu,
  AlertTriangle,
  Workflow,
  CheckCircle2,
} from "lucide-react";
import { Locale, Project } from "@/types/database";
import { hasValidImage } from "@/lib/utils";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SkillLogo } from "@/components/ui/SkillLogo";
import { getDictionary, localizeField } from "@/lib/i18n/dictionaries";

function renderMarkdown(content: string): string {
  return content
    .replace(
      /^### (.+)$/gm,
      '<h3 class="font-serif text-xl font-medium text-[#201a16] mt-8 mb-3">$1</h3>'
    )
    .replace(
      /^## (.+)$/gm,
      '<h2 class="font-serif text-2xl md:text-3xl font-medium text-[#201a16] mt-12 mb-4 leading-snug">$1</h2>'
    )
    .replace(
      /^# (.+)$/gm,
      '<h1 class="font-serif text-3xl font-medium text-[#201a16] mb-4">$1</h1>'
    )
    .replace(
      /\*\*(.+?)\*\*/g,
      '<strong class="font-semibold text-[#201a16]">$1</strong>'
    )
    .replace(
      /`([^`\n]+)`/g,
      '<code class="font-mono text-sm bg-[#f4f0e8] text-[#4e3e35] px-1.5 py-0.5 rounded">$1</code>'
    )
    .replace(
      /```(\w*)\n([\s\S]*?)```/g,
      (_, _lang, code) =>
        `<pre class="my-6 p-5 rounded-xl bg-[#201a16] overflow-x-auto"><code class="font-mono text-sm text-[#dbd0c4] leading-relaxed">${code
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;")}</code></pre>`
    )
    .replace(
      /^- (.+)$/gm,
      '<li class="ml-4 text-[#634f43] leading-relaxed list-disc">$1</li>'
    )
    .replace(
      /^\d+\. (.+)$/gm,
      '<li class="ml-4 text-[#634f43] leading-relaxed list-decimal">$1</li>'
    )
    .replace(
      /\n\n/g,
      '</p><p class="text-base text-[#634f43] leading-relaxed mb-4">'
    )
    .replace(/^/, '<p class="text-base text-[#634f43] leading-relaxed mb-4">')
    .replace(/$/, "</p>");
}

interface CaseStudyViewProps {
  project: Project;
  nextProject?: Project;
  locale?: Locale;
  basePath?: string;
}

export function CaseStudyView({
  project,
  nextProject,
  locale = "en",
  basePath = "",
}: CaseStudyViewProps) {
  const dict = getDictionary(locale);
  const isDarkHero = project.order_index % 2 === 1;

  const title = localizeField(project, "title", locale);
  const summary = localizeField(project, "summary", locale);
  const roleText = localizeField(project, "role", locale);
  const timelineText = localizeField(project, "timeline", locale);
  const problemText = localizeField(project, "problem", locale);
  const processText = localizeField(project, "process", locale);
  const solutionText = localizeField(project, "solution", locale);
  const markdownBody = localizeField(project, "case_study_content", locale);

  const techStack =
    project.tech_stack && project.tech_stack.length > 0
      ? project.tech_stack
      : project.tags || [];

  const results = project.results || [];
  const hasStoryChapters = Boolean(problemText || processText || solutionText);

  return (
    <div className="bg-white min-h-screen">
      {/* 1. Hero Section */}
      <div
        className={`border-b border-[#e8e2d9] ${
          isDarkHero ? "bg-[#201a16]" : "bg-[#faf8f5]"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 py-16 md:py-20">
          <ScrollReveal direction="up">
            <Link
              href={`${basePath}/projects`}
              className="inline-flex items-center gap-2 mb-8 text-sm font-medium transition-colors"
              style={{ color: isDarkHero ? "#a9937c" : "#634f43" }}
            >
              <ArrowLeft className="w-4 h-4" />
              {dict.projects.allProjects}
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
              <div className="lg:col-span-8 space-y-5">
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className="editorial-tag"
                    style={{
                      background: isDarkHero ? "#362b25" : "#f4f0e8",
                      color: isDarkHero ? "#dbd0c4" : "#4e3e35",
                      borderColor: isDarkHero ? "#4e3e35" : "#e8e2d9",
                    }}
                  >
                    {project.category}
                  </span>
                  {(project.roles || []).map((r) => (
                    <span
                      key={r}
                      className="px-2.5 py-1 rounded-full text-[11px] font-mono uppercase tracking-wider border"
                      style={{
                        background: isDarkHero ? "rgba(255,255,255,0.06)" : "#ffffff",
                        color: isDarkHero ? "#a9937c" : "#7d6657",
                        borderColor: isDarkHero ? "#362b25" : "#e8e2d9",
                      }}
                    >
                      {dict.roles[r] || r}
                    </span>
                  ))}
                </div>

                <h1
                  className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight leading-tight"
                  style={{ color: isDarkHero ? "#faf8f5" : "#201a16" }}
                >
                  {title}
                </h1>
                <p
                  className="text-lg leading-relaxed max-w-2xl"
                  style={{ color: isDarkHero ? "#c7b49e" : "#634f43" }}
                >
                  {summary}
                </p>
              </div>

              {/* Meta Sidebar */}
              <div
                className="lg:col-span-4 rounded-2xl p-6 border space-y-4"
                style={{
                  background: isDarkHero ? "#2a221d" : "#ffffff",
                  borderColor: isDarkHero ? "#362b25" : "#e8e2d9",
                }}
              >
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: dict.projects.client, value: project.client },
                    { label: dict.projects.role, value: roleText },
                    { label: dict.projects.timeline, value: timelineText },
                    { label: dict.projects.year, value: project.year },
                  ].map(
                    (item) =>
                      item.value && (
                        <div key={item.label} className="col-span-2 sm:col-span-1">
                          <p
                            className="text-[10px] font-mono uppercase tracking-wider mb-1"
                            style={{ color: "#9e8677" }}
                          >
                            {item.label}
                          </p>
                          <p
                            className="text-xs font-medium leading-snug"
                            style={{
                              color: isDarkHero ? "#faf8f5" : "#201a16",
                            }}
                          >
                            {item.value}
                          </p>
                        </div>
                      )
                  )}
                </div>

                {(project.live_url || project.github_url) && (
                  <div
                    className="flex flex-wrap gap-2.5 pt-4 border-t"
                    style={{
                      borderColor: isDarkHero ? "#362b25" : "#f0ece4",
                    }}
                  >
                    {project.live_url && (
                      <a
                        href={project.live_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-analytics-event="project_live_demo_click"
                        data-analytics-project={project.slug}
                        className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#7d6657] text-white text-xs font-medium hover:bg-[#634f43] transition-colors"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        {dict.projects.liveDemo}
                      </a>
                    )}
                    {project.github_url && (
                      <a
                        href={project.github_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-analytics-event="project_github_click"
                        data-analytics-project={project.slug}
                        className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl border text-xs font-medium transition-colors"
                        style={{
                          borderColor: isDarkHero ? "#4e3e35" : "#e8e2d9",
                          color: isDarkHero ? "#dbd0c4" : "#201a16",
                        }}
                      >
                        <Github className="w-3.5 h-3.5" />
                        {dict.projects.sourceCode}
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>

      {/* 2. Prominent Outcomes & Results Section */}
      {results.length > 0 && (
        <section className="border-b border-[#e8e2d9] bg-[#faf8f5]">
          <div className="max-w-6xl mx-auto px-6 py-12 md:py-16">
            <ScrollReveal direction="up" delay={80}>
              <div className="flex items-center gap-2 mb-6">
                <Trophy className="w-4 h-4 text-[#7d6657]" />
                <span className="text-xs font-mono uppercase tracking-wider text-[#7d6657]">
                  {dict.projects.outcomesEyebrow} — {dict.projects.outcomesTitle}
                </span>
              </div>

              <div
                className={`grid grid-cols-1 sm:grid-cols-2 ${
                  results.length >= 4
                    ? "lg:grid-cols-4"
                    : results.length === 3
                    ? "lg:grid-cols-3"
                    : "lg:grid-cols-2"
                } gap-4`}
              >
                {results.map((item, idx) => {
                  const metricLabel =
                    locale === "fr" && item.label_fr
                      ? item.label_fr
                      : item.label;
                  return (
                    <div
                      key={idx}
                      className="p-6 rounded-2xl bg-white border border-[#e8e2d9] shadow-subtle flex flex-col justify-between space-y-2 editorial-card-hover"
                    >
                      <span className="font-serif text-3xl md:text-4xl font-semibold text-[#201a16] tracking-tight">
                        {item.value}
                      </span>
                      <span className="text-xs font-mono uppercase tracking-wider text-[#634f43] leading-relaxed">
                        {metricLabel}
                      </span>
                    </div>
                  );
                })}
              </div>
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* 3. Cover Image Showcase */}
      {hasValidImage(project.cover_image) && (
        <div className="max-w-5xl mx-auto px-6 pt-12">
          <ScrollReveal direction="scale" delay={100}>
            <div className="rounded-2xl overflow-hidden border border-[#e8e2d9] bg-[#faf8f5] shadow-sm">
              <img
                src={project.cover_image}
                alt={title}
                className="w-full max-h-[540px] object-cover"
              />
            </div>
          </ScrollReveal>
        </div>
      )}

      {/* 4. Structured Story Chapters: Problem -> Process -> Solution */}
      {hasStoryChapters && (
        <section className="max-w-5xl mx-auto px-6 py-16 md:py-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {problemText && (
              <ScrollReveal direction="up" delay={60}>
                <div className="h-full p-6 md:p-7 rounded-2xl bg-[#faf8f5] border border-[#e8e2d9] space-y-3">
                  <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#7d6657]">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>{dict.projects.chapterProblem}</span>
                  </div>
                  <p className="text-sm text-[#4e3e35] leading-relaxed">
                    {problemText}
                  </p>
                </div>
              </ScrollReveal>
            )}

            {processText && (
              <ScrollReveal direction="up" delay={140}>
                <div className="h-full p-6 md:p-7 rounded-2xl bg-[#faf8f5] border border-[#e8e2d9] space-y-3">
                  <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#7d6657]">
                    <Workflow className="w-3.5 h-3.5" />
                    <span>{dict.projects.chapterProcess}</span>
                  </div>
                  <p className="text-sm text-[#4e3e35] leading-relaxed">
                    {processText}
                  </p>
                </div>
              </ScrollReveal>
            )}

            {solutionText && (
              <ScrollReveal direction="up" delay={220}>
                <div className="h-full p-6 md:p-7 rounded-2xl bg-[#201a16] text-[#faf8f5] border border-[#201a16] space-y-3">
                  <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#c7b49e]">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{dict.projects.chapterSolution}</span>
                  </div>
                  <p className="text-sm text-[#dbd0c4] leading-relaxed">
                    {solutionText}
                  </p>
                </div>
              </ScrollReveal>
            )}
          </div>
        </section>
      )}

      {/* 5. Tech Stack Grid with Logos */}
      {techStack.length > 0 && (
        <section className="border-y border-[#e8e2d9] bg-[#faf8f5]/60">
          <div className="max-w-5xl mx-auto px-6 py-12">
            <ScrollReveal direction="up" delay={100}>
              <div className="flex items-center gap-2 mb-5">
                <Cpu className="w-4 h-4 text-[#7d6657]" />
                <span className="text-xs font-mono uppercase tracking-wider text-[#7d6657]">
                  {dict.projects.techStackEyebrow} — {dict.projects.techStackTitle}
                </span>
              </div>
              <div className="flex flex-wrap gap-3">
                {techStack.map((tech) => (
                  <div
                    key={tech}
                    className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-white border border-[#e8e2d9] shadow-xs"
                  >
                    <SkillLogo name={tech} className="w-5 h-5" />
                    <span className="text-xs font-medium text-[#201a16]">
                      {tech}
                    </span>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* 6. Deep-Dive Markdown Content */}
      {markdownBody && (
        <div className="max-w-3xl mx-auto px-6 py-16 md:py-20">
          <ScrollReveal direction="up" delay={140}>
            <span className="block text-xs font-mono uppercase tracking-wider text-[#7d6657] mb-3">
              {dict.projects.deepDiveEyebrow}
            </span>
            <article
              className="prose-editorial"
              dangerouslySetInnerHTML={{
                __html: renderMarkdown(markdownBody),
              }}
            />
          </ScrollReveal>
        </div>
      )}

      {/* 7. Next Project Footer */}
      {nextProject && nextProject.slug !== project.slug && (
        <div className="border-t border-[#e8e2d9] bg-[#faf8f5]">
          <div className="max-w-6xl mx-auto px-6 py-12">
            <ScrollReveal direction="up">
              <p className="text-xs font-mono uppercase tracking-wider text-[#7d6657] mb-4">
                {dict.projects.nextProject}
              </p>
              <Link
                href={`${basePath}/projects/${nextProject.slug}`}
                className="group flex items-center justify-between gap-4 hover:opacity-80 transition-opacity"
              >
                <div>
                  <h3 className="font-serif text-2xl md:text-3xl font-medium text-[#201a16]">
                    {localizeField(nextProject, "title", locale)}
                  </h3>
                  <p className="text-sm text-[#634f43] mt-1">
                    {nextProject.category} · {nextProject.year}
                  </p>
                </div>
                <ArrowUpRight className="w-8 h-8 text-[#c7b49e] group-hover:text-[#7d6657] transition-colors shrink-0" />
              </Link>
            </ScrollReveal>
          </div>
        </div>
      )}
    </div>
  );
}
