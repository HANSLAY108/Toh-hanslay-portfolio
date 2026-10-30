"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Save, ArrowLeft, Plus, X, RotateCw, AlertCircle } from "lucide-react";
import Link from "next/link";
import { ImageUploader } from "@/components/admin/ImageUploader";

export default function NewProjectPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    title: "",
    slug: "",
    summary: "",
    category: "AI Systems",
    client: "",
    role: "",
    year: new Date().getFullYear().toString(),
    live_url: "",
    github_url: "",
    cover_image: "",
    case_study_content: "",
    featured: true,
    published: true,
  });
  const [tags, setTags] = useState<string[]>(["Next.js", "TypeScript"]);
  const [tagInput, setTagInput] = useState("");
  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, tags }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to save project");
      }

      router.push("/admin/projects");
      router.refresh();
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Failed to save project");
      setSaving(false);
    }
  };

  const generateSlug = (title: string) =>
    title.toLowerCase().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-");

  return (
    <div className="flex-1 p-4 sm:p-6 md:p-8 overflow-y-auto w-full max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/projects"
            className="p-2 rounded-lg border border-[#e8e2d9] text-[#7d6657] hover:bg-white hover:text-[#201a16] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#7d6657]">
              Admin / Projects / New Document
            </span>
            <h1 className="font-serif text-2xl sm:text-3xl font-medium text-[#201a16]">
              New Project Case Study
            </h1>
          </div>
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#201a16] text-white text-xs font-mono font-medium hover:bg-[#362b25] transition-all disabled:opacity-50 shadow-sm"
        >
          <RotateCw className={saving ? "w-3.5 h-3.5 animate-spin" : "hidden"} />
          <Save className={saving ? "hidden" : "w-3.5 h-3.5"} />
          <span>{saving ? "Saving..." : "Save Project"}</span>
        </button>
      </div>

      {errorMsg && (
        <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-xs font-mono text-red-700">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        {/* Core Details */}
        <div className="bg-white border border-[#e8e2d9] rounded-2xl p-5 sm:p-6 space-y-5 shadow-xs">
          <h2 className="text-xs font-mono uppercase tracking-wider font-semibold text-[#201a16]">
            Project Metadata
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2 space-y-1.5">
              <label className="block text-[11px] font-mono uppercase tracking-wider text-[#7d6657]">
                Project Title
              </label>
              <input
                type="text"
                required
                value={form.title}
                onChange={(e) => {
                  setForm((f) => ({
                    ...f,
                    title: e.target.value,
                    slug: generateSlug(e.target.value),
                  }));
                }}
                className="w-full px-3.5 py-2 rounded-xl border border-[#e8e2d9] bg-[#faf8f5] text-xs font-medium text-[#201a16] focus:outline-none focus:border-[#201a16] transition-colors"
                placeholder="Autonomous AI Workflow Engine"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-[11px] font-mono uppercase tracking-wider text-[#7d6657]">
                URL Slug
              </label>
              <input
                type="text"
                required
                value={form.slug}
                onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))}
                className="w-full px-3.5 py-2 rounded-xl border border-[#e8e2d9] bg-[#faf8f5] text-xs font-mono text-[#201a16] focus:outline-none focus:border-[#201a16] transition-colors"
                placeholder="autonomous-ai-workflow-engine"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-[11px] font-mono uppercase tracking-wider text-[#7d6657]">
                Discipline / Category
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

            <div className="sm:col-span-2 space-y-1.5">
              <label className="block text-[11px] font-mono uppercase tracking-wider text-[#7d6657]">
                Executive Summary
              </label>
              <textarea
                rows={2}
                value={form.summary}
                onChange={(e) => setForm((f) => ({ ...f, summary: e.target.value }))}
                className="w-full px-3.5 py-2 rounded-xl border border-[#e8e2d9] bg-[#faf8f5] text-xs text-[#201a16] focus:outline-none focus:border-[#201a16] resize-none"
                placeholder="Brief editorial synopsis for cards and previews..."
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-[11px] font-mono uppercase tracking-wider text-[#7d6657]">
                Client / Studio
              </label>
              <input
                type="text"
                value={form.client}
                onChange={(e) => setForm((f) => ({ ...f, client: e.target.value }))}
                className="w-full px-3.5 py-2 rounded-xl border border-[#e8e2d9] bg-[#faf8f5] text-xs text-[#201a16] focus:outline-none focus:border-[#201a16]"
                placeholder="Atelier AI Labs"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-[11px] font-mono uppercase tracking-wider text-[#7d6657]">
                Your Role
              </label>
              <input
                type="text"
                value={form.role}
                onChange={(e) => setForm((f) => ({ ...f, role: e.target.value }))}
                className="w-full px-3.5 py-2 rounded-xl border border-[#e8e2d9] bg-[#faf8f5] text-xs text-[#201a16] focus:outline-none focus:border-[#201a16]"
                placeholder="Lead Architect & UI Designer"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-[11px] font-mono uppercase tracking-wider text-[#7d6657]">
                Live URL (Optional)
              </label>
              <input
                type="url"
                value={form.live_url}
                onChange={(e) => setForm((f) => ({ ...f, live_url: e.target.value }))}
                className="w-full px-3.5 py-2 rounded-xl border border-[#e8e2d9] bg-[#faf8f5] text-xs text-[#201a16] focus:outline-none focus:border-[#201a16]"
                placeholder="https://..."
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-[11px] font-mono uppercase tracking-wider text-[#7d6657]">
                GitHub URL (Optional)
              </label>
              <input
                type="url"
                value={form.github_url}
                onChange={(e) => setForm((f) => ({ ...f, github_url: e.target.value }))}
                className="w-full px-3.5 py-2 rounded-xl border border-[#e8e2d9] bg-[#faf8f5] text-xs text-[#201a16] focus:outline-none focus:border-[#201a16]"
                placeholder="https://github.com/..."
              />
            </div>
          </div>

          {/* Project Cover Image Upload */}
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

          {/* Tags */}
          <div className="space-y-1.5">
            <label className="block text-[11px] font-mono uppercase tracking-wider text-[#7d6657]">
              Technologies &amp; Tags
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
                placeholder="Add technology (e.g. PyTorch, Rust, Next.js)..."
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

          {/* Featured & Published Toggles */}
          <div className="flex flex-wrap gap-6 pt-2 border-t border-[#f0ece4]">
            {(["featured", "published"] as const).map((key) => (
              <label key={key} className="flex items-center gap-2.5 cursor-pointer">
                <div
                  onClick={() => setForm((f) => ({ ...f, [key]: !f[key] }))}
                  className={`w-10 h-5 rounded-full transition-colors cursor-pointer ${form[key] ? "bg-[#201a16]" : "bg-[#e8e2d9]"}`}
                >
                  <div
                    className={`w-4 h-4 bg-white rounded-full m-0.5 transition-transform ${form[key] ? "translate-x-5" : ""}`}
                  />
                </div>
                <span className="text-xs font-mono uppercase tracking-wider text-[#201a16]">
                  {key} on Portfolio
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Case Study Full Content */}
        <div className="bg-white border border-[#e8e2d9] rounded-2xl p-5 sm:p-6 space-y-3 shadow-xs">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-mono uppercase tracking-wider font-semibold text-[#201a16]">
              Case Study Content (Markdown)
            </h2>
            <span className="text-[10px] font-mono text-[#a9937c]">
              Supports Markdown, Code Blocks &amp; Quotes
            </span>
          </div>
          <textarea
            rows={12}
            value={form.case_study_content}
            onChange={(e) => setForm((f) => ({ ...f, case_study_content: e.target.value }))}
            className="w-full px-4 py-3 rounded-xl border border-[#e8e2d9] bg-[#faf8f5] text-xs font-mono text-[#201a16] focus:outline-none focus:border-[#201a16] leading-relaxed resize-y"
            placeholder="## System Architecture &amp; Motivation&#10;&#10;Explain the problem space, architectural trade-offs, benchmarks, and outcomes..."
          />
        </div>

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
            <span>{saving ? "Publishing..." : "Publish Project"}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
