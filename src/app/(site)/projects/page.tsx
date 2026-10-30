import React from "react";
import { getProjects } from "@/lib/supabase/db";
import { ProjectGrid } from "@/components/projects/ProjectGrid";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title: "Projects — Hanslay",
  description:
    "Selected work spanning autonomous AI systems, full-stack architecture, and editorial design. Each project is an exercise in disciplined engineering and aesthetic judgment.",
};

export default async function ProjectsPage() {
  const projects = await getProjects({ publishedOnly: true });

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-6xl mx-auto px-6 py-16 md:py-24">
        {/* Header */}
        <ScrollReveal direction="up">
          <div className="max-w-2xl mb-16 space-y-4">
            <span className="text-xs font-mono uppercase tracking-wider text-[#7d6657]">
              Portfolio / Work
            </span>
            <h1 className="font-serif text-5xl md:text-6xl font-medium tracking-tight text-[#201a16] leading-tight">
              Selected Architecture &amp; Systems
            </h1>
            <p className="text-base text-[#634f43] leading-relaxed">
              A curated selection of work spanning autonomous AI systems, high-throughput full-stack applications, and editorial typographic identities. Each project reflects a commitment to disciplined engineering and deliberate aesthetic judgment.
            </p>
          </div>
        </ScrollReveal>

        <ProjectGrid projects={projects} />
      </div>
    </div>
  );
}
