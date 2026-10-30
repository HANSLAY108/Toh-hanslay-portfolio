/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Project } from "@/types/database";
import { hasValidImage } from "@/lib/utils";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

const CATEGORIES = ["All", "AI Systems", "Full Stack", "UI/UX Design", "Architecture"];

interface ProjectGridProps {
  projects: Project[];
}

export function ProjectGrid({ projects }: ProjectGridProps) {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <div>
      {/* Filter Tabs */}
      <ScrollReveal direction="up" delay={100}>
        <div className="flex flex-wrap gap-2 mb-10">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === cat
                  ? "bg-[#201a16] text-white"
                  : "bg-[#faf8f5] border border-[#e8e2d9] text-[#634f43] hover:border-[#d5cbbe] hover:text-[#201a16]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </ScrollReveal>

      {/* Project Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filtered.map((project, index) => (
          <ScrollReveal key={`${activeCategory}-${project.id}`} direction="up" delay={index * 100}>
            <Link
              href={`/projects/${project.slug}`}
              className="block h-full group bg-white border border-[#e8e2d9] rounded-2xl overflow-hidden hover:border-[#d5cbbe] hover:shadow-hover editorial-card-hover"
            >
              {/* Cover */}
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
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                    <span className="absolute bottom-3 left-4 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-sm text-[10px] font-mono uppercase tracking-wider text-[#201a16]">
                      {project.category}
                    </span>
                  </>
                ) : (
                  <div className="text-center space-y-2">
                    <span
                      className="text-4xl font-serif font-medium"
                      style={{ color: index % 4 === 0 ? "#7d6657" : "#201a16" }}
                    >
                      {String(project.order_index).padStart(2, "0")}
                    </span>
                    <p
                      className="text-xs font-mono tracking-wider uppercase"
                      style={{ color: index % 4 === 0 ? "#a9937c" : "#7d6657" }}
                    >
                      {project.category}
                    </p>
                  </div>
                )}
                <ArrowUpRight
                  className="absolute top-4 right-4 w-5 h-5 opacity-0 group-hover:opacity-100 transition-all"
                  style={{ color: index % 4 === 0 ? "#a9937c" : "#7d6657" }}
                />
              </div>
              {/* Text */}
              <div className="p-5 space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-serif text-lg font-medium text-[#201a16] leading-tight">
                    {project.title}
                  </h3>
                  {project.year && (
                    <span className="text-xs font-mono text-[#7d6657] shrink-0">
                      {project.year}
                    </span>
                  )}
                </div>
                <p className="text-sm text-[#634f43] leading-relaxed line-clamp-2">
                  {project.summary}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.slice(0, 4).map((tag) => (
                    <span key={tag} className="editorial-tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          </ScrollReveal>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="py-24 text-center text-[#7d6657]">
          <p className="font-serif text-xl">No projects in this category yet.</p>
        </div>
      )}
    </div>
  );
}
