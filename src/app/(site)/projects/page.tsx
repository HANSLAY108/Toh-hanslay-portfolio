import React from "react";
import type { Metadata } from "next";
import { getProjects } from "@/lib/supabase/db";
import { ProjectsArchiveView } from "@/components/site/ProjectsArchiveView";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title: "Projects & Case Studies — Hanslay",
  description: "Detailed engineering case studies, AI systems, and editorial design works by Hanslay.",
  alternates: {
    canonical: "/en/projects",
    languages: {
      en: "/en/projects",
      fr: "/fr/projects",
      "x-default": "/en/projects",
    },
  },
};

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <ProjectsArchiveView
      projects={projects}
      locale="en"
      basePath="/en"
    />
  );
}
