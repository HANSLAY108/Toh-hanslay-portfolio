/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Save, ArrowLeft, Plus, X, RotateCw, CheckCircle, AlertCircle } from "lucide-react";
import Link from "next/link";
import { ImageUploader } from "@/components/admin/ImageUploader";
import { BlogPost } from "@/types/database";

type SaveStatus = "idle" | "saving" | "success" | "error";

export default function EditBlogPostPage({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saveStatus, setSaveStatus] = useState<SaveStatus>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const [form, setForm] = useState({
    slug: "",
    title: "",
    title_fr: "",
    excerpt: "",
    excerpt_fr: "",
    content: "",
    content_fr: "",
    cover_image: "",
    reading_time: "5 min read",
    reading_time_fr: "5 min de lecture",
    published: true,
    published_at: new Date().toISOString().split("T")[0],
  });
  const [contentLang, setContentLang] = useState<"en" | "fr">("en");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");

  // ── Load existing post ─────────────────────────────────────────────────────
  useEffect(() => {
    async function loadPost() {
      try {
        const res = await fetch(`/api/blog/${params.id}`);
        if (!res.ok) throw new Error("Post not found");
        const data: { post: BlogPost } = await res.json();
        const p = data.post;
        setForm({
          slug: p.slug,
          title: p.title,
          title_fr: p.title_fr || "",
          excerpt: p.excerpt,
          excerpt_fr: p.excerpt_fr || "",
          content: p.content,
          content_fr: p.content_fr || "",
          cover_image: p.cover_image || "",
          reading_time: p.reading_time,
          reading_time_fr: p.reading_time_fr || "",
          published: p.published,
          published_at: p.published_at
            ? p.published_at.split("T")[0].split(" ")[0]
            : new Date().toISOString().split("T")[0],
        });
        setTags(p.tags || []);
      } catch (err) {
        setErrorMsg(err instanceof Error ? err.message : "Failed to load post");
      } finally {
        setLoading(false);
      }
    }
    loadPost();
  }, [params.id]);

  // ── Helpers ────────────────────────────────────────────────────────────────
  const generateSlug = (title: string) =>
    title.toLowerCase().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-");

  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  // ── Save ───────────────────────────────────────────────────────────────────
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaveStatus("saving");
    setErrorMsg("");

    try {
      const payload = { ...form, tags };
      const res = await fetch(`/api/blog/${params.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Save failed");
      }

      setSaveStatus("success");
      setTimeout(() => {
        setSaveStatus("idle");
        router.push("/admin/blog");
        router.refresh();
      }, 900);
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Save failed");
      setSaveStatus("error");
    }
  };

  // ── Loading state ──────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-[40vh]">
        <div className="space-y-3 text-center">
          <RotateCw className="w-5 h-5 animate-spin text-[#7d6657] mx-auto" />
          <p className="text-xs font-mono text-[#7d6657]">Loading document…</p>
        </div>
      </div>
    );
  }

  const saving = saveStatus === "saving";

  return (
    <div className="flex-1 p-4 sm:p-6 md:p-8 overflow-y-auto w-full max-w-4xl mx-auto space-y-6">
      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/blog"
            className="p-2 rounded-lg border border-[#e8e2d9] text-[#7d6657] hover:bg-white hover:text-[#201a16] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#7d6657]">
              Admin / Writing / Edit Essay
            </span>
            <h1 className="font-serif text-2xl sm:text-3xl font-medium text-[#201a16] leading-tight">
              {form.title || "Edit Essay"}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <div className="inline-flex items-center rounded-xl border border-[#e8e2d9] bg-white p-1">
            <button
              type="button"
              onClick={() => setContentLang("en")}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                contentLang === "en"
                  ? "bg-[#201a16] text-white"
                  : "text-[#7d6657] hover:text-[#201a16]"
              }`}
            >
              EN
            </button>
            <button
              type="button"
              onClick={() => setContentLang("fr")}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                contentLang === "fr"
                  ? "bg-[#201a16] text-white"
                  : "text-[#7d6657] hover:text-[#201a16]"
              }`}
            >
              FR
            </button>
          </div>

          <button
            onClick={handleSave}
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
              {saving ? "Saving…" : saveStatus === "success" ? "Saved & Synced!" : "Save Changes"}
            </span>
          </button>
        </div>
      </div>

      {/* ── Error banner ── */}
      {saveStatus === "error" && (
        <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-xs font-mono text-red-700">
          <AlertCircle className="w-4 h-4 shrink-0" />
          {errorMsg || "An error occurred. Please try again."}
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        {/* ── Dedicated Cover Image Card ── */}
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
            helperText="Article hero — appears on the blog listing cards and at the top of the full article page."
          />
        </div>

        {/* ── Post metadata ── */}
        <div className="bg-white border border-[#e8e2d9] rounded-2xl p-5 sm:p-6 space-y-5 shadow-xs">
          <h2 className="text-xs font-mono uppercase tracking-wider font-semibold text-[#201a16]">
            Essay Metadata
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Title */}
            <div className="sm:col-span-2 space-y-1.5">
              <label className="block text-[11px] font-mono uppercase tracking-wider text-[#7d6657]">
                Essay Title ({contentLang.toUpperCase()})
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
                      slug: generateSlug(e.target.value),
                    }))
                  }
                  className="w-full px-3.5 py-2 rounded-xl border border-[#e8e2d9] bg-[#faf8f5] text-xs font-medium text-[#201a16] focus:outline-none focus:border-[#201a16] transition-colors"
                  placeholder="Building Low-Latency Multimodal Agents…"
                />
              ) : (
                <input
                  type="text"
                  value={form.title_fr}
                  onChange={(e) => setForm((f) => ({ ...f, title_fr: e.target.value }))}
                  className="w-full px-3.5 py-2 rounded-xl border border-[#e8e2d9] bg-[#faf8f5] text-xs font-medium text-[#201a16] focus:outline-none focus:border-[#201a16] transition-colors"
                  placeholder={form.title || "Titre de l'essai en français…"}
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
                className="w-full px-3.5 py-2 rounded-xl border border-[#e8e2d9] bg-[#faf8f5] text-xs font-mono text-[#201a16] focus:outline-none focus:border-[#201a16] transition-colors"
                placeholder="building-low-latency-agents"
              />
            </div>

            {/* Reading time */}
            <div className="space-y-1.5">
              <label className="block text-[11px] font-mono uppercase tracking-wider text-[#7d6657]">
                Reading Time
              </label>
              <input
                type="text"
                value={form.reading_time}
                onChange={(e) => setForm((f) => ({ ...f, reading_time: e.target.value }))}
                className="w-full px-3.5 py-2 rounded-xl border border-[#e8e2d9] bg-[#faf8f5] text-xs text-[#201a16] focus:outline-none focus:border-[#201a16]"
                placeholder="6 min read"
              />
            </div>

            {/* Published date */}
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

            {/* Excerpt */}
            <div className="sm:col-span-2 space-y-1.5">
              <label className="block text-[11px] font-mono uppercase tracking-wider text-[#7d6657]">
                Excerpt / Standfirst ({contentLang.toUpperCase()})
              </label>
              <textarea
                rows={2}
                value={contentLang === "en" ? form.excerpt : form.excerpt_fr}
                onChange={(e) =>
                  setForm((f) =>
                    contentLang === "en"
                      ? { ...f, excerpt: e.target.value }
                      : { ...f, excerpt_fr: e.target.value }
                  )
                }
                className="w-full px-3.5 py-2 rounded-xl border border-[#e8e2d9] bg-[#faf8f5] text-xs text-[#201a16] focus:outline-none focus:border-[#201a16] resize-none"
                placeholder="A one-paragraph hook that appears on listing cards and social previews…"
              />
            </div>
          </div>

          {/* Tags */}
          <div className="space-y-1.5">
            <label className="block text-[11px] font-mono uppercase tracking-wider text-[#7d6657]">
              Topic Tags
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
                onKeyDown={(e) =>
                  e.key === "Enter" && (e.preventDefault(), addTag())
                }
                placeholder="Add topic (e.g. AI Systems, Typography, Next.js)…"
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

          {/* Published toggle */}
          <div className="flex flex-wrap gap-6 pt-2 border-t border-[#f0ece4]">
            <label className="flex items-center gap-2.5 cursor-pointer">
              <div
                onClick={() => setForm((f) => ({ ...f, published: !f.published }))}
                className={`w-10 h-5 rounded-full transition-colors cursor-pointer ${
                  form.published ? "bg-[#201a16]" : "bg-[#e8e2d9]"
                }`}
              >
                <div
                  className={`w-4 h-4 bg-white rounded-full m-0.5 transition-transform ${
                    form.published ? "translate-x-5" : ""
                  }`}
                />
              </div>
              <span className="text-xs font-mono uppercase tracking-wider text-[#201a16]">
                Published on Blog
              </span>
            </label>
          </div>
        </div>

        {/* ── Full content ── */}
        <div className="bg-white border border-[#e8e2d9] rounded-2xl p-5 sm:p-6 space-y-3 shadow-xs">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-mono uppercase tracking-wider font-semibold text-[#201a16]">
              Full Article Content (Markdown — {contentLang.toUpperCase()})
            </h2>
            <span className="text-[10px] font-mono text-[#a9937c]">
              Supports Markdown, Code Blocks &amp; Quotes
            </span>
          </div>
          <textarea
            rows={18}
            value={contentLang === "en" ? form.content : form.content_fr}
            onChange={(e) =>
              setForm((f) =>
                contentLang === "en"
                  ? { ...f, content: e.target.value }
                  : { ...f, content_fr: e.target.value }
              )
            }
            className="w-full px-4 py-3 rounded-xl border border-[#e8e2d9] bg-[#faf8f5] text-xs font-mono text-[#201a16] focus:outline-none focus:border-[#201a16] leading-relaxed resize-y"
            placeholder="## The Quest for Imperceptible Latency&#10;&#10;Write your full article content here in Markdown…"
          />
        </div>

        {/* ── Footer actions ── */}
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
            {saving ? (
              <RotateCw className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Save className="w-3.5 h-3.5" />
            )}
            <span>{saving ? "Saving Changes…" : "Save Changes"}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
