"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Save, ArrowLeft, Plus, X, RotateCw, AlertCircle } from "lucide-react";
import Link from "next/link";
import { ImageUploader } from "@/components/admin/ImageUploader";

export default function NewBlogPostPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    title: "",
    slug: "",
    excerpt: "",
    category: "AI & Distributed Systems",
    cover_image: "",
    reading_time: "5 min read",
    content: "",
    published: true,
    published_at: new Date().toISOString().split("T")[0],
  });
  const [tags, setTags] = useState<string[]>(["Autonomous AI", "Distributed Systems"]);
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
      const res = await fetch("/api/blog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, tags }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to publish essay");
      }

      router.push("/admin/blog");
      router.refresh();
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Failed to save essay");
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
            href="/admin/blog"
            className="p-2 rounded-lg border border-[#e8e2d9] text-[#7d6657] hover:bg-white hover:text-[#201a16] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#7d6657]">
              Admin / Writing / New Article
            </span>
            <h1 className="font-serif text-2xl sm:text-3xl font-medium text-[#201a16]">
              New Technical Essay
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
          <span>{saving ? "Publishing..." : "Publish Essay"}</span>
        </button>
      </div>

      {errorMsg && (
        <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-xs font-mono text-red-700">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        {/* Dedicated Cover Image Upload Card */}
        <div className="bg-white border border-[#e8e2d9] rounded-2xl p-5 sm:p-6 space-y-4 shadow-xs">
          <h2 className="text-xs font-mono uppercase tracking-wider font-semibold text-[#201a16]">
            Blog Post Cover Image
          </h2>
          <ImageUploader
            label="Article Hero / Cover Image"
            value={form.cover_image}
            onChange={(url) => setForm((f) => ({ ...f, cover_image: url }))}
            folder="blog"
            aspectRatio="cover"
            recommendedSize="1600 × 900 px (16:9 WebP or PNG)"
            helperText="Upload editorial header art or technical diagrams for this blog post. Appears on the Writing archive and article header."
          />
        </div>

        {/* Article Metadata */}
        <div className="bg-white border border-[#e8e2d9] rounded-2xl p-5 sm:p-6 space-y-5 shadow-xs">
          <h2 className="text-xs font-mono uppercase tracking-wider font-semibold text-[#201a16]">
            Essay Metadata
          </h2>

          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="block text-[11px] font-mono uppercase tracking-wider text-[#7d6657]">
                Title
              </label>
              <input
                type="text"
                required
                value={form.title}
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    title: e.target.value,
                    slug: generateSlug(e.target.value),
                  }))
                }
                placeholder="Architecting Autonomous Agents: Deterministic State in Probabilistic Systems"
                className="w-full px-3.5 py-2 rounded-xl border border-[#e8e2d9] bg-[#faf8f5] text-xs font-medium text-[#201a16] focus:outline-none focus:border-[#201a16]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-[11px] font-mono uppercase tracking-wider text-[#7d6657]">
                  Estimated Reading Time
                </label>
                <input
                  type="text"
                  value={form.reading_time}
                  onChange={(e) => setForm((f) => ({ ...f, reading_time: e.target.value }))}
                  placeholder="8 min read"
                  className="w-full px-3.5 py-2 rounded-xl border border-[#e8e2d9] bg-[#faf8f5] text-xs text-[#201a16] focus:outline-none focus:border-[#201a16]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-[11px] font-mono uppercase tracking-wider text-[#7d6657]">
                  Publish Date
                </label>
                <input
                  type="date"
                  value={form.published_at}
                  onChange={(e) => setForm((f) => ({ ...f, published_at: e.target.value }))}
                  className="w-full px-3.5 py-2 rounded-xl border border-[#e8e2d9] bg-[#faf8f5] text-xs text-[#201a16] focus:outline-none focus:border-[#201a16]"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-[11px] font-mono uppercase tracking-wider text-[#7d6657]">
                Excerpt / Subtitle
              </label>
              <textarea
                rows={2}
                value={form.excerpt}
                onChange={(e) => setForm((f) => ({ ...f, excerpt: e.target.value }))}
                className="w-full px-3.5 py-2 rounded-xl border border-[#e8e2d9] bg-[#faf8f5] text-xs text-[#201a16] focus:outline-none focus:border-[#201a16] resize-none"
                placeholder="A rigorous exploration of bounded state transitions when coordinating multi-agent LLM teams..."
              />
            </div>

            {/* Tags */}
            <div className="space-y-1.5">
              <label className="block text-[11px] font-mono uppercase tracking-wider text-[#7d6657]">
                Tags
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
                  placeholder="Add topic tag..."
                  className="flex-1 px-3.5 py-2 rounded-xl border border-[#e8e2d9] bg-[#faf8f5] text-xs text-[#201a16] focus:outline-none focus:border-[#201a16]"
                />
                <button
                  type="button"
                  onClick={addTag}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#faf8f5] border border-[#e8e2d9] text-[#7d6657] hover:bg-[#f4f0e8] text-xs font-medium"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Add
                </button>
              </div>
            </div>

            <label className="flex items-center gap-2.5 cursor-pointer pt-2 border-t border-[#f0ece4]">
              <div
                onClick={() => setForm((f) => ({ ...f, published: !f.published }))}
                className={`w-10 h-5 rounded-full transition-colors cursor-pointer ${form.published ? "bg-[#201a16]" : "bg-[#e8e2d9]"}`}
              >
                <div
                  className={`w-4 h-4 bg-white rounded-full m-0.5 transition-transform ${form.published ? "translate-x-5" : ""}`}
                />
              </div>
              <span className="text-xs font-mono uppercase tracking-wider text-[#201a16]">
                Publish immediately to Writing Archive
              </span>
            </label>
          </div>
        </div>

        {/* Markdown Content */}
        <div className="bg-white border border-[#e8e2d9] rounded-2xl p-5 sm:p-6 space-y-3 shadow-xs">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-mono uppercase tracking-wider font-semibold text-[#201a16]">
              Article Content (Markdown)
            </h2>
            <span className="text-[10px] font-mono text-[#a9937c]">
              Rich Markdown Supported
            </span>
          </div>
          <textarea
            rows={16}
            value={form.content}
            onChange={(e) => setForm((f) => ({ ...f, content: e.target.value }))}
            className="w-full px-4 py-3 rounded-xl border border-[#e8e2d9] bg-[#faf8f5] text-xs font-mono text-[#201a16] focus:outline-none focus:border-[#201a16] leading-relaxed resize-y"
            placeholder="## Introduction&#10;&#10;Start writing your thesis, architecture decisions, and code blocks..."
          />
        </div>

        <div className="flex justify-end gap-3 pb-8">
          <Link
            href="/admin/blog"
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
            <span>{saving ? "Publishing..." : "Publish Essay"}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
