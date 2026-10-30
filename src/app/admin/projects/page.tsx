/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Plus,
  Pencil,
  Trash2,
  Eye,
  EyeOff,
  Star,
  ArrowUpRight,
  Image as ImageIcon,
  Check,
  RotateCw,
} from "lucide-react";
import { initialProjects } from "@/lib/mock-data";
import { Project } from "@/types/database";
import { hasValidImage } from "@/lib/utils";
import { ImageUploader } from "@/components/admin/ImageUploader";

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [expandedCoverId, setExpandedCoverId] = useState<string | null>(null);
  const [savingId, setSavingId] = useState<string | null>(null);
  const [savedId, setSavedId] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/projects")
      .then((res) => res.json())
      .then((data) => {
        if (data?.projects) setProjects(data.projects);
      })
      .catch(() => {});
  }, []);

  const updateProjectField = async (id: string, patch: Partial<Project>) => {
    setSavingId(id);
    setProjects((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...patch } : p))
    );
    try {
      await fetch(`/api/projects/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(patch),
      });
      setSavedId(id);
      setTimeout(() => setSavedId((curr) => (curr === id ? null : curr)), 2000);
    } finally {
      setSavingId(null);
    }
  };

  const togglePublish = (project: Project) => {
    updateProjectField(project.id, { published: !project.published });
  };

  const toggleFeatured = (project: Project) => {
    updateProjectField(project.id, { featured: !project.featured });
  };

  const deleteProject = async (id: string) => {
    if (confirm("Delete this project?")) {
      setProjects((prev) => prev.filter((p) => p.id !== id));
      await fetch(`/api/projects/${id}`, { method: "DELETE" });
    }
  };

  return (
    <div className="flex-1 p-4 sm:p-6 md:p-8 overflow-y-auto w-full max-w-5xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-mono uppercase tracking-wider text-[#7d6657]">
            Admin / Content Collections
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-medium text-[#201a16] mt-1">
            Projects &amp; Case Studies
          </h1>
          <p className="text-xs text-[#634f43] mt-1">
            Manage featured projects, cover images, technical stacks, and full case study write-ups.
          </p>
        </div>
        <Link
          href="/admin/projects/new"
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#201a16] text-white text-xs font-mono font-medium hover:bg-[#362b25] transition-colors shrink-0 shadow-sm"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>New Project Document</span>
        </Link>
      </div>

      <div className="space-y-3">
        {projects.map((project) => {
          const isCoverOpen = expandedCoverId === project.id;
          const hasCover = hasValidImage(project.cover_image);

          return (
            <div
              key={project.id}
              className="bg-white border border-[#e8e2d9] rounded-2xl p-4 sm:p-5 space-y-4 hover:border-[#ded2c0] transition-colors group shadow-xs"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-start gap-3.5 flex-1 min-w-0">
                  {/* Cover Thumbnail / Order Badge */}
                  <button
                    type="button"
                    onClick={() =>
                      setExpandedCoverId(isCoverOpen ? null : project.id)
                    }
                    title="Click to upload or change cover image"
                    className="w-14 h-12 rounded-xl bg-[#faf8f5] border border-[#e8e2d9] overflow-hidden flex items-center justify-center shrink-0 mt-0.5 hover:border-[#201a16] transition-colors"
                  >
                    {hasCover ? (
                      <img
                        src={project.cover_image}
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-[11px] font-mono text-[#7d6657]">
                        {String(project.order_index).padStart(2, "0")}
                      </span>
                    )}
                  </button>

                  {/* Title & Info */}
                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <Link
                        href={`/admin/projects/${project.id}/edit`}
                        className="font-medium text-sm text-[#201a16] hover:underline truncate"
                      >
                        {project.title}
                      </Link>
                      <span className="editorial-tag text-[10px] shrink-0">
                        {project.category}
                      </span>
                      {(project.roles || []).map((r) => (
                        <span
                          key={r}
                          className="px-2 py-0.5 rounded-full bg-[#201a16]/5 border border-[#e8e2d9] text-[10px] font-mono text-[#4e3e35]"
                        >
                          {r}
                        </span>
                      ))}
                      {project.results && project.results.length > 0 && (
                        <span className="px-2 py-0.5 rounded-full bg-[#f4f0e8] border border-[#e8e2d9] text-[10px] font-mono text-[#7d6657]">
                          {project.results.length} Metrics
                        </span>
                      )}
                      {project.featured && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-50 border border-amber-200 text-[10px] font-mono text-amber-800">
                          <Star className="w-2.5 h-2.5" /> Featured
                        </span>
                      )}
                      {savingId === project.id && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-mono text-[#7d6657]">
                          <RotateCw className="w-3 h-3 animate-spin" /> Saving…
                        </span>
                      )}
                      {savedId === project.id && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-mono text-emerald-700">
                          <Check className="w-3 h-3" /> Synced
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-[#634f43] line-clamp-2 md:truncate">
                      {project.summary}
                    </p>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {project.tags.slice(0, 4).map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#faf8f5] border border-[#e8e2d9] text-[#634f43]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Status & Actions Bar */}
                <div className="flex items-center justify-between md:justify-end gap-2 pt-3 md:pt-0 border-t md:border-t-0 border-[#f0ece4] shrink-0">
                  <span
                    className={`text-[11px] font-mono font-medium px-2.5 py-1 rounded-full ${
                      project.published
                        ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                        : "bg-[#faf8f5] text-[#7d6657] border border-[#e8e2d9]"
                    }`}
                  >
                    {project.published ? "Published" : "Draft"}
                  </span>

                  <button
                    type="button"
                    onClick={() =>
                      setExpandedCoverId(isCoverOpen ? null : project.id)
                    }
                    className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border text-[11px] font-mono transition-colors ${
                      isCoverOpen
                        ? "bg-[#201a16] text-white border-[#201a16]"
                        : "bg-[#faf8f5] text-[#634f43] border-[#e8e2d9] hover:border-[#201a16] hover:text-[#201a16]"
                    }`}
                  >
                    <ImageIcon className="w-3.5 h-3.5" />
                    <span>Cover</span>
                  </button>

                  <Link
                    href={`/admin/projects/${project.id}/edit`}
                    title="Edit Project"
                    className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[#faf8f5] border border-[#e8e2d9] text-xs font-mono text-[#201a16] hover:bg-[#f4f0e8] transition-colors"
                  >
                    <Pencil className="w-3.5 h-3.5" />
                    <span>Edit</span>
                  </Link>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => toggleFeatured(project)}
                      title="Toggle Featured"
                      className={`p-1.5 rounded-lg transition-colors ${
                        project.featured
                          ? "text-amber-600 bg-amber-50"
                          : "text-[#7d6657] hover:bg-[#faf8f5]"
                      }`}
                    >
                      <Star className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => togglePublish(project)}
                      title="Toggle Published"
                      className="p-1.5 rounded-lg text-[#7d6657] hover:bg-[#faf8f5] transition-colors"
                    >
                      {project.published ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                    <Link
                      href={`/projects/${project.slug}`}
                      target="_blank"
                      title="View Public Case Study"
                      className="p-1.5 rounded-lg text-[#7d6657] hover:bg-[#faf8f5] transition-colors"
                    >
                      <ArrowUpRight className="w-4 h-4" />
                    </Link>
                    <button
                      onClick={() => deleteProject(project.id)}
                      title="Delete Project"
                      className="p-1.5 rounded-lg text-red-400 hover:bg-red-50 hover:text-red-600 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Inline Cover Image Uploader Drawer */}
              {isCoverOpen && (
                <div className="pt-4 border-t border-[#f0ece4] bg-[#faf8f5]/60 rounded-xl p-4">
                  <ImageUploader
                    label={`Cover Image for "${project.title}"`}
                    value={project.cover_image || ""}
                    onChange={(url) =>
                      updateProjectField(project.id, { cover_image: url })
                    }
                    folder="projects"
                    aspectRatio="cover"
                    recommendedSize="1920 × 1080 px (16:9 WebP or PNG)"
                    helperText="Uploading or replacing this image immediately saves and updates the public Projects & Home pages."
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
