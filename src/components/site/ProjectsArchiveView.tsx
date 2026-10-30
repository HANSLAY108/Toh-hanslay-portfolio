import React from "react";
import { Locale, Project } from "@/types/database";
import { ProjectGrid } from "@/components/projects/ProjectGrid";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { getDictionary } from "@/lib/i18n/dictionaries";

interface ProjectsArchiveViewProps {
  projects: Project[];
  locale: Locale;
  basePath: string;
}

export function ProjectsArchiveView({
  projects,
  locale,
  basePath,
}: ProjectsArchiveViewProps) {
  const dict = getDictionary(locale);

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-6xl mx-auto px-6 py-16 md:py-24">
        <ScrollReveal direction="up">
          <div className="max-w-2xl mb-16 space-y-4">
            <span className="text-xs font-mono uppercase tracking-wider text-[#7d6657]">
              {dict.projects.eyebrow}
            </span>
            <h1 className="font-serif text-5xl md:text-6xl font-medium tracking-tight text-[#201a16] leading-tight">
              {dict.projects.title}
            </h1>
            <p className="text-base text-[#634f43] leading-relaxed">
              {dict.projects.description}
            </p>
          </div>
        </ScrollReveal>

        <ProjectGrid
          projects={projects}
          locale={locale}
          basePath={basePath}
        />
      </div>
    </div>
  );
}

