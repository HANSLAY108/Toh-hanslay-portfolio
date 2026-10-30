/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Locale, Project, ProjectRole } from "@/types/database";
import { hasValidImage } from "@/lib/utils";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { getDictionary, localizeField } from "@/lib/i18n/dictionaries";

const ROLE_FILTERS: Array<"All" | ProjectRole> = ["All", "Software", "AI", "Design"];

interface FeaturedProjectsSectionProps {
  projects: Project[];
  locale?: Locale;
  basePath?: string;
}

export function FeaturedProjectsSection({
  projects,
  locale = "en",
  basePath = "",
}: FeaturedProjectsSectionProps) {
  const dict = getDictionary(locale);
  const [activeRole, setActiveRole] = useState<"All" | ProjectRole>("All");
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleSelectRole = (role: "All" | ProjectRole) => {
    if (role === activeRole) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveRole(role);
      setIsTransitioning(false);
    }, 160);
  };

  const filtered = (
    activeRole === "All"
      ? projects
      : projects.filter((p) => {
          const projectRoles = p.roles || [];
          if (projectRoles.includes(activeRole)) return true;
          const cat = (p.category || "").toLowerCase();
          if (activeRole === "AI" && cat.includes("ai")) return true;
          if (activeRole === "Design" && (cat.includes("design") || cat.includes("ui")))
            return true;
          if (
            activeRole === "Software" &&
            (cat.includes("full stack") ||
              cat.includes("architecture") ||
              cat.includes("software"))
          )
            return true;
          return false;
        })
  ).slice(0, 4);

  return (
    <section className="bg-[#faf8f5] border-y border-[#e8e2d9]">
      <div className="max-w-6xl mx-auto px-6 py-20 md:py-24">
        <ScrollReveal direction="up">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div className="space-y-2">
              <span className="text-xs font-mono uppercase tracking-wider text-[#7d6657]">
                {dict.home.featuredWorkEyebrow}
              </span>
              <h2 className="font-serif text-4xl md:text-5xl font-medium tracking-tight text-[#201a16]">
                {dict.home.selectedProjectsTitle}
              </h2>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {ROLE_FILTERS.map((roleKey) => {
                const isActive = activeRole === roleKey;
                const label =
                  roleKey === "All" ? dict.roles.all : dict.roles[roleKey];
                return (
                  <button
                    key={roleKey}
                    type="button"
                    onClick={() => handleSelectRole(roleKey)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all duration-300 ${
                      isActive
                        ? "bg-[#201a16] text-white shadow-xs scale-[1.03]"
                        : "bg-white border border-[#e8e2d9] text-[#634f43] hover:border-[#201a16] hover:text-[#201a16]"
                    }`}
                  >
                    {label}
                  </button>
                );
              })}

              <Link
                href={`${basePath}/projects`}
                className="hidden sm:inline-flex items-center gap-1.5 ml-3 text-sm font-medium text-[#634f43] hover:text-[#201a16] transition-colors group"
              >
                <span>{dict.home.viewAllProjects}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </ScrollReveal>

        <div
          className={`grid grid-cols-1 md:grid-cols-2 gap-5 transition-all duration-300 ease-out ${
            isTransitioning
              ? "opacity-0 translate-y-2"
              : "opacity-100 translate-y-0"
          }`}
        >
          {filtered.map((project, index) => {
            const title = localizeField(project, "title", locale);
            const summary = localizeField(project, "summary", locale);
            const topResult = project.results && project.results[0];

            return (
              <ScrollReveal
                key={`${activeRole}-${project.id}`}
                direction="up"
                delay={index * 90}
              >
                <Link
                  href={`${basePath}/projects/${project.slug}`}
                  className="block h-full group relative bg-white border border-[#e8e2d9] rounded-2xl overflow-hidden hover:border-[#d5cbbe] hover:shadow-hover editorial-card-hover"
                >
                  {/* Cover Image / Colored Block */}
                  <div
                    className={`h-52 relative flex items-center justify-center overflow-hidden ${
                      index % 4 === 0
                        ? "bg-[#201a16]"
                        : index % 4 === 1
                        ? "bg-[#f4f0e8]"
                        : index % 4 === 2
                        ? "bg-[#eae2d5]"
                        : "bg-[#faf8f5]"
                    }`}
                  >
                    {hasValidImage(project.cover_image) ? (
                      <>
                        <img
                          src={project.cover_image}
                          alt={title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                        <div className="absolute bottom-3 left-4 flex flex-wrap gap-1.5">
                          <span className="px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-sm text-[10px] font-mono uppercase tracking-wider text-[#201a16]">
                            {project.category}
                          </span>
                          {(project.roles || []).map((r) => (
                            <span
                              key={r}
                              className="px-2 py-1 rounded-full bg-[#201a16]/80 backdrop-blur-sm text-[10px] font-mono text-[#faf8f5]"
                            >
                              {dict.roles[r] || r}
                            </span>
                          ))}
                        </div>
                      </>
                    ) : (
                      <div className="text-center space-y-2 px-6">
                        <span
                          className="text-4xl font-serif font-medium tracking-tight"
                          style={{
                            color: index % 4 === 0 ? "#7d6657" : "#201a16",
                          }}
                        >
                          {String(project.order_index).padStart(2, "0")}
                        </span>
                        <p
                          className="text-xs font-mono tracking-wider uppercase"
                          style={{
                            color: index % 4 === 0 ? "#a9937c" : "#7d6657",
                          }}
                        >
                          {project.category}
                        </p>
                        <div className="flex flex-wrap justify-center gap-1 pt-1">
                          {(project.roles || []).map((r) => (
                            <span
                              key={r}
                              className="px-2 py-0.5 rounded-full text-[10px] font-mono border"
                              style={{
                                borderColor:
                                  index % 4 === 0 ? "#362b25" : "#e8e2d9",
                                color:
                                  index % 4 === 0 ? "#dbd0c4" : "#634f43",
                              }}
                            >
                              {dict.roles[r] || r}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {topResult && (
                      <span className="absolute top-3 left-4 px-2.5 py-1 rounded-full bg-[#faf8f5]/95 border border-[#e8e2d9] text-[10px] font-mono font-semibold text-[#201a16] shadow-xs">
                        {topResult.value}{" "}
                        {locale === "fr" && topResult.label_fr
                          ? topResult.label_fr
                          : topResult.label}
                      </span>
                    )}

                    <div className="absolute top-4 right-4">
                      <ArrowUpRight
                        className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-all -translate-y-1 translate-x-1 group-hover:translate-y-0 group-hover:translate-x-0"
                        style={{
                          color: index % 4 === 0 ? "#a9937c" : "#7d6657",
                        }}
                      />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5 space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="font-serif text-lg font-medium text-[#201a16] leading-tight line-clamp-2">
                        {title}
                      </h3>
                      {project.year && (
                        <span className="text-xs font-mono text-[#7d6657] shrink-0 mt-0.5">
                          {project.year}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-[#634f43] leading-relaxed line-clamp-2">
                      {summary}
                    </p>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {(project.tech_stack && project.tech_stack.length > 0
                        ? project.tech_stack
                        : project.tags
                      )
                        .slice(0, 4)
                        .map((tag) => (
                          <span key={tag} className="editorial-tag">
                            {tag}
                          </span>
                        ))}
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="py-16 text-center text-[#7d6657]">
            <p className="font-serif text-lg">{dict.projects.noProjects}</p>
          </div>
        )}

        <div className="sm:hidden mt-8 text-center">
          <Link
            href={`${basePath}/projects`}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#e8e2d9] text-sm text-[#201a16] hover:bg-white transition-colors"
          >
            <span>{dict.home.viewAllProjects}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

