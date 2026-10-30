/* eslint-disable @next/next/no-img-element */
import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Github, ExternalLink } from "lucide-react";
import { getProjectBySlug, getProjects } from "@/lib/supabase/db";
import { hasValidImage } from "@/lib/utils";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";
export const revalidate = 0;

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = await getProjectBySlug(params.slug);
  if (!project) return { title: "Project Not Found" };
  return {
    title: `${project.title} — Hanslay`,
    description: project.summary,
  };
}

function renderMarkdown(content: string): string {
  return content
    .replace(/^### (.+)$/gm, '<h3 class="font-serif text-xl font-medium text-[#201a16] mt-8 mb-3">$1</h3>')
    .replace(/^## (.+)$/gm, '<h2 class="font-serif text-2xl md:text-3xl font-medium text-[#201a16] mt-12 mb-4 leading-snug">$1</h2>')
    .replace(/^# (.+)$/gm, '<h1 class="font-serif text-3xl font-medium text-[#201a16] mb-4">$1</h1>')
    .replace(/\*\*(.+?)\*\*/g, '<strong class="font-semibold text-[#201a16]">$1</strong>')
    .replace(/`([^`\n]+)`/g, '<code class="font-mono text-sm bg-[#f4f0e8] text-[#4e3e35] px-1.5 py-0.5 rounded">$1</code>')
    .replace(/```(\w*)\n([\s\S]*?)```/g, (_, _lang, code) =>
      `<pre class="my-6 p-5 rounded-xl bg-[#201a16] overflow-x-auto"><code class="font-mono text-sm text-[#dbd0c4] leading-relaxed">${code.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>`)
    .replace(/^- (.+)$/gm, '<li class="ml-4 text-[#634f43] leading-relaxed list-disc">$1</li>')
    .replace(/^\d+\. (.+)$/gm, '<li class="ml-4 text-[#634f43] leading-relaxed list-decimal">$1</li>')
    .replace(/\n\n/g, '</p><p class="text-base text-[#634f43] leading-relaxed mb-4">')
    .replace(/^/, '<p class="text-base text-[#634f43] leading-relaxed mb-4">')
    .replace(/$/, '</p>');
}

export default async function ProjectCaseStudyPage({ params }: Props) {
  const [project, allProjects] = await Promise.all([
    getProjectBySlug(params.slug),
    getProjects({ publishedOnly: true }),
  ]);

  if (!project) notFound();

  const currentIndex = allProjects.findIndex((p) => p.slug === params.slug);
  const nextProject = allProjects[currentIndex + 1] || allProjects[0];

  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <div
        className={`border-b border-[#e8e2d9] ${
          project.order_index % 2 === 1 ? "bg-[#201a16]" : "bg-[#faf8f5]"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 py-16 md:py-20">
          <ScrollReveal direction="up">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 mb-8 text-sm font-medium transition-colors"
              style={{ color: project.order_index % 2 === 1 ? "#7d6657" : "#634f43" }}
            >
              <ArrowLeft className="w-4 h-4" />
              All Projects
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-end">
              <div className="lg:col-span-2 space-y-4">
                <span
                  className="editorial-tag"
                  style={{
                    background: project.order_index % 2 === 1 ? "#362b25" : "#f4f0e8",
                    color: project.order_index % 2 === 1 ? "#a9937c" : "#4e3e35",
                    borderColor: project.order_index % 2 === 1 ? "#4e3e35" : "#e8e2d9",
                  }}
                >
                  {project.category}
                </span>
                <h1
                  className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight leading-tight"
                  style={{ color: project.order_index % 2 === 1 ? "#faf8f5" : "#201a16" }}
                >
                  {project.title}
                </h1>
                <p
                  className="text-lg leading-relaxed max-w-xl"
                  style={{ color: project.order_index % 2 === 1 ? "#a9937c" : "#634f43" }}
                >
                  {project.summary}
                </p>
              </div>

              {/* Meta sidebar */}
              <div className="space-y-4">
                {[
                  { label: "Client", value: project.client },
                  { label: "Role", value: project.role },
                  { label: "Year", value: project.year },
                ].map(
                  (item) =>
                    item.value && (
                      <div key={item.label}>
                        <p
                          className="text-xs font-mono uppercase tracking-wider mb-1"
                          style={{ color: "#7d6657" }}
                        >
                          {item.label}
                        </p>
                        <p
                          className="text-sm font-medium"
                          style={{ color: project.order_index % 2 === 1 ? "#dbd0c4" : "#201a16" }}
                        >
                          {item.value}
                        </p>
                      </div>
                    )
                )}
                <div className="flex gap-3 pt-2">
                  {project.live_url && (
                    <a
                      href={project.live_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white text-[#201a16] text-xs font-medium hover:bg-[#faf8f5] transition-colors"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      Live
                    </a>
                  )}
                  {project.github_url && (
                    <a
                      href={project.github_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border text-xs font-medium transition-colors"
                      style={{
                        borderColor: project.order_index % 2 === 1 ? "#4e3e35" : "#e8e2d9",
                        color: project.order_index % 2 === 1 ? "#a9937c" : "#634f43",
                      }}
                    >
                      <Github className="w-3.5 h-3.5" />
                      Source
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Tags */}
            <div
              className="flex flex-wrap gap-2 mt-8 pt-8 border-t"
              style={{ borderColor: project.order_index % 2 === 1 ? "#362b25" : "#e8e2d9" }}
            >
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full text-xs font-medium border"
                  style={{
                    background: project.order_index % 2 === 1 ? "#362b25" : "#f4f0e8",
                    color: project.order_index % 2 === 1 ? "#a9937c" : "#4e3e35",
                    borderColor: project.order_index % 2 === 1 ? "#4e3e35" : "#e8e2d9",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>

      {/* Cover Image Banner */}
      {hasValidImage(project.cover_image) && (
        <div className="max-w-5xl mx-auto px-6 pt-12">
          <ScrollReveal direction="scale" delay={120}>
            <div className="rounded-2xl overflow-hidden border border-[#e8e2d9] bg-[#faf8f5] shadow-sm">
              <img
                src={project.cover_image}
                alt={project.title}
                className="w-full max-h-[520px] object-cover"
              />
            </div>
          </ScrollReveal>
        </div>
      )}

      {/* Case Study Content */}
      {project.case_study_content && (
        <div className="max-w-3xl mx-auto px-6 py-16 md:py-20">
          <ScrollReveal direction="up" delay={160}>
            <article
              className="prose-editorial"
              dangerouslySetInnerHTML={{ __html: renderMarkdown(project.case_study_content) }}
            />
          </ScrollReveal>
        </div>
      )}

      {/* Next Project */}
      {nextProject && nextProject.slug !== project.slug && (
        <div className="border-t border-[#e8e2d9] bg-[#faf8f5]">
          <div className="max-w-6xl mx-auto px-6 py-12">
            <ScrollReveal direction="up">
              <p className="text-xs font-mono uppercase tracking-wider text-[#7d6657] mb-4">
                Next Project
              </p>
              <Link
                href={`/projects/${nextProject.slug}`}
                className="group flex items-center justify-between gap-4 hover:opacity-80 transition-opacity"
              >
                <div>
                  <h3 className="font-serif text-2xl md:text-3xl font-medium text-[#201a16]">
                    {nextProject.title}
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
