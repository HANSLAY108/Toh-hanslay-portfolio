import React from "react";
import { notFound } from "next/navigation";
import { getProjectBySlug, getProjects } from "@/lib/supabase/db";
import { CaseStudyView } from "@/components/projects/CaseStudyView";
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

export default async function ProjectCaseStudyPage({ params }: Props) {
  const [project, allProjects] = await Promise.all([
    getProjectBySlug(params.slug),
    getProjects({ publishedOnly: true }),
  ]);

  if (!project) notFound();

  const currentIndex = allProjects.findIndex((p) => p.slug === params.slug);
  const nextProject = allProjects[currentIndex + 1] || allProjects[0];

  return (
    <CaseStudyView
      project={project}
      nextProject={nextProject}
      locale="en"
      basePath=""
    />
  );
}
