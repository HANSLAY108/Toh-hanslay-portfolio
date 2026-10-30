"use client";

import React, { useState } from "react";
import {
  Save,
  ArrowLeft,
  Plus,
  X,
  RotateCw,
  CheckCircle,
  AlertCircle,
  Trophy,
  Globe,
  Layers,
  Code2,
} from "lucide-react";
import Link from "next/link";
import { ImageUploader } from "@/components/admin/ImageUploader";
import { SkillLogo } from "@/components/ui/SkillLogo";
import { Project, ProjectMetricResult, ProjectRole } from "@/types/database";

const AVAILABLE_ROLES: ProjectRole[] = ["Software", "AI", "Design"];

interface ProjectEditorFormProps {
  mode: "create" | "edit";
  initialData?: Partial<Project>;
  onSave: (payload: Partial<Project>) => Promise<void>;
  saving: boolean;
  saveStatus?: "idle" | "saving" | "success" | "error";
  errorMsg?: string;
}

export function ProjectEditorForm({
  mode,
  initialData,
  onSave,
  saving,
  saveStatus = "idle",
  errorMsg = "",
}: ProjectEditorFormProps) {
  const [contentLang, setContentLang] = useState<"en" | "fr">("en");

  const [form, setForm] = useState({
    slug: initialData?.slug || "",
    title: initialData?.title || "",
    title_fr: initialData?.title_fr || "",
    summary: initialData?.summary || "",
    summary_fr: initialData?.summary_fr || "",
    category: initialData?.category || "AI Systems",
    client: initialData?.client || "",
    role: initialData?.role || "",
    role_fr: initialData?.role_fr || "",
    timeline: initialData?.timeline || "",
    timeline_fr: initialData?.timeline_fr || "",
    year: initialData?.year || new Date().getFullYear().toString(),
    live_url: initialData?.live_url || "",
    github_url: initialData?.github_url || "",
    cover_image: initialData?.cover_image || "",
    problem: initialData?.problem || "",
    problem_fr: initialData?.problem_fr || "",
    process: initialData?.process || "",
    process_fr: initialData?.process_fr || "",
    solution: initialData?.solution || "",
    solution_fr: initialData?.solution_fr || "",
    case_study_content: initialData?.case_study_content || "",
    case_study_content_fr: initialData?.case_study_content_fr || "",
    featured: initialData?.featured ?? true,
    published: initialData?.published ?? true,
    order_index: initialData?.order_index ?? 1,
  });

  const [roles, setRoles] = useState<ProjectRole[]>(
    initialData?.roles && initialData.roles.length > 0
      ? initialData.roles
      : ["Software", "AI"]
  );

  const [tags, setTags] = useState<string[]>(
    initialData?.tags || ["Next.js", "TypeScript"]
  );
  const [tagInput, setTagInput] = useState("");

  const [techStack, setTechStack] = useState<string[]>(
    initialData?.tech_stack && initialData.tech_stack.length > 0
      ? initialData.tech_stack
      : initialData?.tags || ["Next.js", "TypeScript", "PostgreSQL"]
  );
  const [techInput, setTechInput] = useState("");

  const [results, setResults] = useState<ProjectMetricResult[]>(
    initialData?.results && initialData.results.length > 0
      ? initialData.results
      : [{ value: "-65%", label: "System Latency Reduction", label_fr: "Réduction de latence système" }]
  );

  const generateSlug = (title: string) =>
    title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-");

  const toggleRole = (r: ProjectRole) => {
    setRoles((prev) =>
      prev.includes(r)
        ? prev.length > 1
          ? prev.filter((item) => item !== r)
          : prev
        : [...prev, r]
    );
  };

  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const addTech = () => {
    if (techInput.trim() && !techStack.includes(techInput.trim())) {
      setTechStack([...techStack, techInput.trim()]);
      setTechInput("");
    }
  };

  const addResultMetric = () => {
    setResults((prev) => [...prev, { value: "", label: "", label_fr: "" }]);
  };

  const updateResultMetric = (
    idx: number,
    field: keyof ProjectMetricResult,
    val: string
  ) => {
    setResults((prev) =>
      prev.map((item, i) => (i === idx ? { ...item, [field]: val } : item))
    );
  };

  const removeResultMetric = (idx: number) => {
    setResults((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanedResults = results.filter(
      (r) => r.value.trim() !== "" || r.label.trim() !== ""
    );
    await onSave({
      ...form,
      roles,
      tags,
      tech_stack: techStack,
      results: cleanedResults,
    });
  };

  return (
    <div className="flex-1 p-4 sm:p-6 md:p-8 overflow-y-auto w-full max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/projects"
            className="p-2 rounded-lg border border-[#e8e2d9] text-[#7d6657] hover:bg-white hover:text-[#201a16] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#7d6657]">
              Admin / Projects / {mode === "create" ? "New Case Study" : "Edit Case Study"}
            </span>
            <h1 className="font-serif text-2xl sm:text-3xl font-medium text-[#201a16] leading-tight">
              {form.title || (mode === "create" ? "New Project Case Study" : "Edit Project")}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          {/* Language Switcher for Editor */}
          <div className="inline-flex items-center rounded-xl border border-[#e8e2d9] bg-white p-1">
            <button
              type="button"
              onClick={() => setContentLang("en")}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                contentLang === "en"
                  ? "bg-[#201a16] text-white"
                  : "text-[#7d6657] hover:text-[#201a16]"
              }`}
            >
              <Globe className="w-3 h-3" />
              EN
            </button>
            <button
              type="button"
              onClick={() => setContentLang("fr")}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                contentLang === "fr"
                  ? "bg-[#201a16] text-white"
                  : "text-[#7d6657] hover:text-[#201a16]"
              }`}
            >
              FR
            </button>
          </div>

          <button
            onClick={handleSubmit}
            disabled={saving}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#201a16] text-white text-xs font-mono font-medium hover:bg-[#362b25] transition-all disabled:opacity-50 shadow-sm shrink-0"
          >
            {saving ? (
              <RotateCw className="w-3.5 h-3.5 animate-spin" />
            ) : saveStatus === "success" ? (
              <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
            ) : (
              <Save className="w-3.5 h-3.5" />
            )}
            <span>
              {saving
                ? "Saving…"
                : saveStatus === "success"
                ? "Saved!"
                : mode === "create"
                ? "Publish Project"
                : "Save Changes"}
            </span>
          </button>
        </div>
      </div>

      {errorMsg && (
        <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-xs font-mono text-red-700">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* 1. Core Metadata & Role Classification */}
        <div className="bg-white border border-[#e8e2d9] rounded-2xl p-5 sm:p-6 space-y-5 shadow-xs">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-mono uppercase tracking-wider font-semibold text-[#201a16] flex items-center gap-2">
              <Layers className="w-3.5 h-3.5 text-[#7d6657]" />
              Project Metadata ({contentLang === "en" ? "English" : "Français"})
            </h2>
            {contentLang === "fr" && (
              <span className="text-[11px] font-mono text-[#7d6657]">
                Empty French fields automatically fall back to English
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Title */}
            <div className="sm:col-span-2 space-y-1.5">
              <label className="block text-[11px] font-mono uppercase tracking-wider text-[#7d6657]">
                {contentLang === "en" ? "Project Title (EN)" : "Titre du Projet (FR)"}
              </label>
              {contentLang === "en" ? (
                <input
                  type="text"
                  required
                  value={form.title}
                  onChange={(e) =>
                    setForm((f) => ({
                      ...f,
                      title: e.target.value,
                      slug: mode === "create" ? generateSlug(e.target.value) : f.slug,
                    }))
                  }
                  className="w-full px-3.5 py-2 rounded-xl border border-[#e8e2d9] bg-[#faf8f5] text-xs font-medium text-[#201a16] focus:outline-none focus:border-[#201a16]"
                  placeholder="Autonomous AI Workflow Engine"
                />
              ) : (
                <input
                  type="text"
                  value={form.title_fr}
                  onChange={(e) => setForm((f) => ({ ...f, title_fr: e.target.value }))}
                  className="w-full px-3.5 py-2 rounded-xl border border-[#e8e2d9] bg-[#faf8f5] text-xs font-medium text-[#201a16] focus:outline-none focus:border-[#201a16]"
                  placeholder={form.title || "Moteur de Workflows d'Agents IA Autonomes"}
                />
              )}
            </div>

            {/* Slug */}
            <div className="space-y-1.5">
              <label className="block text-[11px] font-mono uppercase tracking-wider text-[#7d6657]">
                URL Slug
              </label>
              <input
                type="text"
                required
                value={form.slug}
                onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))}
                className="w-full px-3.5 py-2 rounded-xl border border-[#e8e2d9] bg-[#faf8f5] text-xs font-mono text-[#201a16] focus:outline-none focus:border-[#201a16]"
                placeholder="autonomous-ai-workflow-engine"
              />
            </div>

            {/* Category */}
            <div className="space-y-1.5">
              <label className="block text-[11px] font-mono uppercase tracking-wider text-[#7d6657]">
                Primary Category
              </label>
              <select
                value={form.category}
                onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
                className="w-full px-3.5 py-2 rounded-xl border border-[#e8e2d9] bg-[#faf8f5] text-xs text-[#201a16] focus:outline-none focus:border-[#201a16]"
              >
                <option value="AI Systems">AI Systems</option>
                <option value="Full Stack">Full Stack</option>
                <option value="UI/UX Design">UI/UX Design</option>
                <option value="Architecture">Architecture</option>
              </select>
            </div>

            {/* Multi-select Role Filter */}
            <div className="sm:col-span-2 space-y-1.5">
              <label className="block text-[11px] font-mono uppercase tracking-wider text-[#7d6657]">
                Filter Roles (Multi-select for Projects &amp; Home Filter Tabs)
              </label>
              <div className="flex flex-wrap gap-2">
                {AVAILABLE_ROLES.map((r) => {
                  const selected = roles.includes(r);
                  return (
                    <button
                      key={r}
                      type="button"
                      onClick={() => toggleRole(r)}
                      className={`px-4 py-2 rounded-xl text-xs font-mono font-medium border transition-all ${
                        selected
                          ? "bg-[#201a16] text-white border-[#201a16]"
                          : "bg-[#faf8f5] text-[#634f43] border-[#e8e2d9] hover:border-[#201a16]"
                      }`}
                    >
                      {selected ? "✓ " : "+ "}
                      {r}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Summary */}
            <div className="sm:col-span-2 space-y-1.5">
              <label className="block text-[11px] font-mono uppercase tracking-wider text-[#7d6657]">
                {contentLang === "en" ? "Executive Summary (EN)" : "Résumé Exécutif (FR)"}
              </label>
              {contentLang === "en" ? (
                <textarea
                  rows={2}
                  value={form.summary}
                  onChange={(e) => setForm((f) => ({ ...f, summary: e.target.value }))}
                  className="w-full px-3.5 py-2 rounded-xl border border-[#e8e2d9] bg-[#faf8f5] text-xs text-[#201a16] focus:outline-none focus:border-[#201a16] resize-none"
                  placeholder="Brief editorial synopsis for cards and previews…"
                />
              ) : (
                <textarea
                  rows={2}
                  value={form.summary_fr}
                  onChange={(e) => setForm((f) => ({ ...f, summary_fr: e.target.value }))}
                  className="w-full px-3.5 py-2 rounded-xl border border-[#e8e2d9] bg-[#faf8f5] text-xs text-[#201a16] focus:outline-none focus:border-[#201a16] resize-none"
                  placeholder={form.summary || "Synopsis éditorial en français…"}
                />
              )}
            </div>

            {/* Client */}
            <div className="space-y-1.5">
              <label className="block text-[11px] font-mono uppercase tracking-wider text-[#7d6657]">
                Client / Organization
              </label>
              <input
                type="text"
                value={form.client}
                onChange={(e) => setForm((f) => ({ ...f, client: e.target.value }))}
                className="w-full px-3.5 py-2 rounded-xl border border-[#e8e2d9] bg-[#faf8f5] text-xs text-[#201a16] focus:outline-none focus:border-[#201a16]"
                placeholder="Atelier AI Labs"
              />
            </div>

            {/* Specific Role Title */}
            <div className="space-y-1.5">
              <label className="block text-[11px] font-mono uppercase tracking-wider text-[#7d6657]">
                {contentLang === "en" ? "Your Role Title (EN)" : "Intitulé du Rôle (FR)"}
              </label>
              {contentLang === "en" ? (
                <input
                  type="text"
                  value={form.role}
                  onChange={(e) => setForm((f) => ({ ...f, role: e.target.value }))}
                  className="w-full px-3.5 py-2 rounded-xl border border-[#e8e2d9] bg-[#faf8f5] text-xs text-[#201a16] focus:outline-none focus:border-[#201a16]"
                  placeholder="Lead Architect & UI Designer"
                />
              ) : (
                <input
                  type="text"
                  value={form.role_fr}
                  onChange={(e) => setForm((f) => ({ ...f, role_fr: e.target.value }))}
                  className="w-full px-3.5 py-2 rounded-xl border border-[#e8e2d9] bg-[#faf8f5] text-xs text-[#201a16] focus:outline-none focus:border-[#201a16]"
                  placeholder={form.role || "Architecte Principal & Designer UI"}
                />
              )}
            </div>

            {/* Timeline */}
            <div className="space-y-1.5">
              <label className="block text-[11px] font-mono uppercase tracking-wider text-[#7d6657]">
                {contentLang === "en" ? "Timeline / Duration (EN)" : "Calendrier / Durée (FR)"}
              </label>
              {contentLang === "en" ? (
                <input
                  type="text"
                  value={form.timeline}
                  onChange={(e) => setForm((f) => ({ ...f, timeline: e.target.value }))}
                  className="w-full px-3.5 py-2 rounded-xl border border-[#e8e2d9] bg-[#faf8f5] text-xs text-[#201a16] focus:outline-none focus:border-[#201a16]"
                  placeholder="14 Weeks · Q1–Q2 2024"
                />
              ) : (
                <input
                  type="text"
                  value={form.timeline_fr}
                  onChange={(e) => setForm((f) => ({ ...f, timeline_fr: e.target.value }))}
                  className="w-full px-3.5 py-2 rounded-xl border border-[#e8e2d9] bg-[#faf8f5] text-xs text-[#201a16] focus:outline-none focus:border-[#201a16]"
                  placeholder={form.timeline || "14 Semaines · T1–T2 2024"}
                />
              )}
            </div>

            {/* Year & Order */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="block text-[11px] font-mono uppercase tracking-wider text-[#7d6657]">
                  Year
                </label>
                <input
                  type="text"
                  value={form.year}
                  onChange={(e) => setForm((f) => ({ ...f, year: e.target.value }))}
                  className="w-full px-3.5 py-2 rounded-xl border border-[#e8e2d9] bg-[#faf8f5] text-xs text-[#201a16] focus:outline-none focus:border-[#201a16]"
                  placeholder="2024"
                />
              </div>
              <div className="space-y-1.5">
                <label className="block text-[11px] font-mono uppercase tracking-wider text-[#7d6657]">
                  Order
                </label>
                <input
                  type="number"
                  min={1}
                  value={form.order_index}
                  onChange={(e) =>
                    setForm((f) => ({
                      ...f,
                      order_index: parseInt(e.target.value) || 1,
                    }))
                  }
                  className="w-full px-3.5 py-2 rounded-xl border border-[#e8e2d9] bg-[#faf8f5] text-xs text-[#201a16] focus:outline-none focus:border-[#201a16]"
                />
              </div>
            </div>

            {/* Live Demo & GitHub URLs */}
            <div className="space-y-1.5">
              <label className="block text-[11px] font-mono uppercase tracking-wider text-[#7d6657]">
                Live Demo URL
              </label>
              <input
                type="url"
                value={form.live_url}
                onChange={(e) => setForm((f) => ({ ...f, live_url: e.target.value }))}
                className="w-full px-3.5 py-2 rounded-xl border border-[#e8e2d9] bg-[#faf8f5] text-xs text-[#201a16] focus:outline-none focus:border-[#201a16]"
                placeholder="https://example.com/demo"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-[11px] font-mono uppercase tracking-wider text-[#7d6657]">
                GitHub Repository URL
              </label>
              <input
                type="url"
                value={form.github_url}
                onChange={(e) => setForm((f) => ({ ...f, github_url: e.target.value }))}
                className="w-full px-3.5 py-2 rounded-xl border border-[#e8e2d9] bg-[#faf8f5] text-xs text-[#201a16] focus:outline-none focus:border-[#201a16]"
                placeholder="https://github.com/HANSLAY108/..."
              />
            </div>
          </div>

          {/* Cover Image */}
          <div className="pt-2 border-t border-[#f0ece4]">
            <ImageUploader
              label="Project Cover Image"
              value={form.cover_image}
              onChange={(url) => setForm((f) => ({ ...f, cover_image: url }))}
              folder="projects"
              aspectRatio="cover"
              recommendedSize="1920 × 1080 px (16:9 WebP or PNG)"
              helperText="Upload high-fidelity screenshots, renders, or branding collateral for this project."
            />
          </div>

          {/* Featured & Published Toggles */}
          <div className="flex flex-wrap gap-6 pt-2 border-t border-[#f0ece4]">
            {(["featured", "published"] as const).map((key) => (
              <label key={key} className="flex items-center gap-2.5 cursor-pointer">
                <div
                  onClick={() => setForm((f) => ({ ...f, [key]: !f[key] }))}
                  className={`w-10 h-5 rounded-full transition-colors cursor-pointer ${
                    form[key] ? "bg-[#201a16]" : "bg-[#e8e2d9]"
                  }`}
                >
                  <div
                    className={`w-4 h-4 bg-white rounded-full m-0.5 transition-transform ${
                      form[key] ? "translate-x-5" : ""
                    }`}
                  />
                </div>
                <span className="text-xs font-mono uppercase tracking-wider text-[#201a16]">
                  {key} on Portfolio
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* 2. Structured Case Study Narrative: Problem, Process, Solution */}
        <div className="bg-white border border-[#e8e2d9] rounded-2xl p-5 sm:p-6 space-y-5 shadow-xs">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-mono uppercase tracking-wider font-semibold text-[#201a16]">
              Structured Case Study Story ({contentLang === "en" ? "English" : "Français"})
            </h2>
            <span className="text-[10px] font-mono text-[#a9937c]">
              Problem → Process → Solution
            </span>
          </div>

          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="block text-[11px] font-mono uppercase tracking-wider text-[#7d6657]">
                {contentLang === "en" ? "01 / The Problem (EN)" : "01 / Le Problème (FR)"}
              </label>
              <textarea
                rows={3}
                value={contentLang === "en" ? form.problem : form.problem_fr}
                onChange={(e) =>
                  setForm((f) =>
                    contentLang === "en"
                      ? { ...f, problem: e.target.value }
                      : { ...f, problem_fr: e.target.value }
                  )
                }
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#e8e2d9] bg-[#faf8f5] text-xs text-[#201a16] focus:outline-none focus:border-[#201a16] leading-relaxed"
                placeholder="Describe the core bottleneck, user pain point, or engineering constraint…"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-[11px] font-mono uppercase tracking-wider text-[#7d6657]">
                {contentLang === "en"
                  ? "02 / Architecture & Process (EN)"
                  : "02 / Architecture & Processus (FR)"}
              </label>
              <textarea
                rows={3}
                value={contentLang === "en" ? form.process : form.process_fr}
                onChange={(e) =>
                  setForm((f) =>
                    contentLang === "en"
                      ? { ...f, process: e.target.value }
                      : { ...f, process_fr: e.target.value }
                  )
                }
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#e8e2d9] bg-[#faf8f5] text-xs text-[#201a16] focus:outline-none focus:border-[#201a16] leading-relaxed"
                placeholder="Explain your methodology, system design decisions, and iterative exploration…"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-[11px] font-mono uppercase tracking-wider text-[#7d6657]">
                {contentLang === "en" ? "03 / The Solution (EN)" : "03 / La Solution (FR)"}
              </label>
              <textarea
                rows={3}
                value={contentLang === "en" ? form.solution : form.solution_fr}
                onChange={(e) =>
                  setForm((f) =>
                    contentLang === "en"
                      ? { ...f, solution: e.target.value }
                      : { ...f, solution_fr: e.target.value }
                  )
                }
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#e8e2d9] bg-[#faf8f5] text-xs text-[#201a16] focus:outline-none focus:border-[#201a16] leading-relaxed"
                placeholder="Detail the shipped architecture, product experience, and technical breakthroughs…"
              />
            </div>
          </div>
        </div>

        {/* 3. Results & Outcomes Metrics */}
        <div className="bg-white border border-[#e8e2d9] rounded-2xl p-5 sm:p-6 space-y-4 shadow-xs">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xs font-mono uppercase tracking-wider font-semibold text-[#201a16] flex items-center gap-2">
                <Trophy className="w-3.5 h-3.5 text-[#7d6657]" />
                Quantified Results &amp; Outcomes
              </h2>
              <p className="text-[11px] text-[#7d6657] mt-0.5">
                Prominent impact metrics displayed at the top of the case study page.
              </p>
            </div>
            <button
              type="button"
              onClick={addResultMetric}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#faf8f5] border border-[#e8e2d9] text-[#201a16] hover:bg-[#f4f0e8] text-xs font-mono font-medium"
            >
              <Plus className="w-3.5 h-3.5" />
              Add Metric
            </button>
          </div>

          <div className="space-y-3">
            {results.map((item, idx) => (
              <div
                key={idx}
                className="grid grid-cols-1 sm:grid-cols-12 gap-2.5 items-center p-3 rounded-xl bg-[#faf8f5] border border-[#e8e2d9]"
              >
                <div className="sm:col-span-3">
                  <input
                    type="text"
                    value={item.value}
                    onChange={(e) => updateResultMetric(idx, "value", e.target.value)}
                    placeholder="e.g. -94% or 3.4×"
                    className="w-full px-3 py-2 rounded-lg border border-[#e8e2d9] bg-white text-xs font-serif font-semibold text-[#201a16]"
                  />
                </div>
                <div className="sm:col-span-4">
                  <input
                    type="text"
                    value={item.label}
                    onChange={(e) => updateResultMetric(idx, "label", e.target.value)}
                    placeholder="Metric label (EN) — e.g. Latency Reduction"
                    className="w-full px-3 py-2 rounded-lg border border-[#e8e2d9] bg-white text-xs text-[#201a16]"
                  />
                </div>
                <div className="sm:col-span-4">
                  <input
                    type="text"
                    value={item.label_fr || ""}
                    onChange={(e) => updateResultMetric(idx, "label_fr", e.target.value)}
                    placeholder="Label (FR) — e.g. Réduction de latence"
                    className="w-full px-3 py-2 rounded-lg border border-[#e8e2d9] bg-white text-xs text-[#634f43]"
                  />
                </div>
                <div className="sm:col-span-1 flex justify-end">
                  <button
                    type="button"
                    onClick={() => removeResultMetric(idx)}
                    className="p-2 rounded-lg text-[#7d6657] hover:text-red-600 hover:bg-red-50 transition-colors"
                    title="Remove metric"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 4. Tech Stack & Tags */}
        <div className="bg-white border border-[#e8e2d9] rounded-2xl p-5 sm:p-6 space-y-5 shadow-xs">
          <h2 className="text-xs font-mono uppercase tracking-wider font-semibold text-[#201a16] flex items-center gap-2">
            <Code2 className="w-3.5 h-3.5 text-[#7d6657]" />
            Tech Stack &amp; Card Tags
          </h2>

          {/* Tech Stack with Logos */}
          <div className="space-y-2">
            <label className="block text-[11px] font-mono uppercase tracking-wider text-[#7d6657]">
              Case Study Tech Stack (Displays with language/framework logos)
            </label>
            <div className="flex flex-wrap gap-2 mb-2">
              {techStack.map((tech) => (
                <span
                  key={tech}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#faf8f5] border border-[#e8e2d9] text-xs font-medium text-[#201a16]"
                >
                  <SkillLogo name={tech} className="w-4 h-4 border-0 bg-transparent" />
                  {tech}
                  <button
                    type="button"
                    onClick={() => setTechStack(techStack.filter((t) => t !== tech))}
                    className="hover:text-red-600 ml-1"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={techInput}
                onChange={(e) => setTechInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTech())}
                placeholder="Add technology to stack (e.g. Rust, PyTorch, Next.js, PostgreSQL)…"
                className="flex-1 px-3.5 py-2 rounded-xl border border-[#e8e2d9] bg-[#faf8f5] text-xs text-[#201a16] focus:outline-none focus:border-[#201a16]"
              />
              <button
                type="button"
                onClick={addTech}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#faf8f5] border border-[#e8e2d9] text-[#7d6657] hover:bg-[#f4f0e8] text-xs font-medium"
              >
                <Plus className="w-3.5 h-3.5" />
                Add Stack
              </button>
            </div>
          </div>

          {/* Card Tags */}
          <div className="space-y-2 pt-3 border-t border-[#f0ece4]">
            <label className="block text-[11px] font-mono uppercase tracking-wider text-[#7d6657]">
              Card Preview Tags
            </label>
            <div className="flex flex-wrap gap-1.5 mb-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#f4f0e8] border border-[#e8e2d9] text-xs text-[#201a16]"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => setTags(tags.filter((t) => t !== tag))}
                    className="hover:text-red-600"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                placeholder="Add card tag…"
                className="flex-1 px-3.5 py-2 rounded-xl border border-[#e8e2d9] bg-[#faf8f5] text-xs text-[#201a16] focus:outline-none focus:border-[#201a16]"
              />
              <button
                type="button"
                onClick={addTag}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#faf8f5] border border-[#e8e2d9] text-[#7d6657] hover:bg-[#f4f0e8] text-xs font-medium"
              >
                <Plus className="w-3.5 h-3.5" />
                Add Tag
              </button>
            </div>
          </div>
        </div>

        {/* 5. Deep-Dive Technical Markdown */}
        <div className="bg-white border border-[#e8e2d9] rounded-2xl p-5 sm:p-6 space-y-3 shadow-xs">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-mono uppercase tracking-wider font-semibold text-[#201a16]">
              Deep-Dive Architecture &amp; Code Notes (Markdown —{" "}
              {contentLang === "en" ? "EN" : "FR"})
            </h2>
            <span className="text-[10px] font-mono text-[#a9937c]">
              Supports Markdown, Code Blocks &amp; Lists
            </span>
          </div>
          <textarea
            rows={12}
            value={
              contentLang === "en" ? form.case_study_content : form.case_study_content_fr
            }
            onChange={(e) =>
              setForm((f) =>
                contentLang === "en"
                  ? { ...f, case_study_content: e.target.value }
                  : { ...f, case_study_content_fr: e.target.value }
              )
            }
            className="w-full px-4 py-3 rounded-xl border border-[#e8e2d9] bg-[#faf8f5] text-xs font-mono text-[#201a16] focus:outline-none focus:border-[#201a16] leading-relaxed resize-y"
            placeholder="## System Architecture & Motivation&#10;&#10;Include code snippets, architectural diagrams, or deep technical notes…"
          />
        </div>

        {/* Footer actions */}
        <div className="flex justify-end gap-3 pb-8">
          <Link
            href="/admin/projects"
            className="px-4 py-2.5 rounded-xl border border-[#e8e2d9] hover:bg-white text-xs font-mono text-[#634f43]"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#201a16] text-white text-xs font-mono font-medium hover:bg-[#362b25] transition-all disabled:opacity-50"
          >
            <Save className="w-3.5 h-3.5" />
            <span>
              {saving
                ? "Saving…"
                : mode === "create"
                ? "Publish Project"
                : "Save Changes"}
            </span>
          </button>
        </div>
      </form>
    </div>
  );
}
