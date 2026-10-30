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
  ArrowUpRight,
  Image as ImageIcon,
  Check,
  RotateCw,
} from "lucide-react";
import { initialBlogPosts } from "@/lib/mock-data";
import { BlogPost } from "@/types/database";
import { formatDate, hasValidImage } from "@/lib/utils";
import { ImageUploader } from "@/components/admin/ImageUploader";

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>(initialBlogPosts);
  const [expandedCoverId, setExpandedCoverId] = useState<string | null>(null);
  const [savingId, setSavingId] = useState<string | null>(null);
  const [savedId, setSavedId] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/blog")
      .then((res) => res.json())
      .then((data) => {
        if (data?.posts) setPosts(data.posts);
      })
      .catch(() => {});
  }, []);

  const updatePostField = async (id: string, patch: Partial<BlogPost>) => {
    setSavingId(id);
    setPosts((prev) => prev.map((p) => (p.id === id ? { ...p, ...patch } : p)));
    try {
      await fetch(`/api/blog/${id}`, {
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

  const togglePublish = (post: BlogPost) => {
    updatePostField(post.id, { published: !post.published });
  };

  const deletePost = async (id: string) => {
    if (confirm("Delete this post permanently?")) {
      setPosts((prev) => prev.filter((p) => p.id !== id));
      await fetch(`/api/blog/${id}`, { method: "DELETE" });
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
            Writing &amp; Technical Essays
          </h1>
          <p className="text-xs text-[#634f43] mt-1">
            Draft, edit, and upload cover images for technical articles, systems research, and design essays.
          </p>
        </div>
        <Link
          href="/admin/blog/new"
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#201a16] text-white text-xs font-mono font-medium hover:bg-[#362b25] transition-colors shrink-0 shadow-sm"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>New Technical Essay</span>
        </Link>
      </div>

      <div className="space-y-3">
        {posts.map((post) => {
          const isCoverOpen = expandedCoverId === post.id;
          const hasCover = hasValidImage(post.cover_image);

          return (
            <div
              key={post.id}
              className="bg-white border border-[#e8e2d9] rounded-2xl p-4 sm:p-5 space-y-4 hover:border-[#ded2c0] transition-colors group shadow-xs"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-start gap-3.5 flex-1 min-w-0">
                  {/* Cover Thumbnail / Quick Trigger */}
                  <button
                    type="button"
                    onClick={() =>
                      setExpandedCoverId(isCoverOpen ? null : post.id)
                    }
                    title="Click to upload or change cover image"
                    className="w-16 h-12 sm:w-20 sm:h-14 rounded-xl bg-[#faf8f5] border border-[#e8e2d9] overflow-hidden flex flex-col items-center justify-center shrink-0 hover:border-[#201a16] transition-colors relative group/thumb"
                  >
                    {hasCover ? (
                      <img
                        src={post.cover_image}
                        alt={post.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center text-[#7d6657] gap-0.5">
                        <ImageIcon className="w-4 h-4" />
                        <span className="text-[8px] font-mono uppercase">Cover</span>
                      </div>
                    )}
                  </button>

                  <div className="flex-1 min-w-0 space-y-1.5">
                    <div className="flex items-center gap-2 flex-wrap">
                      <Link
                        href={`/admin/blog/${post.id}/edit`}
                        className="font-medium text-sm text-[#201a16] hover:underline line-clamp-1"
                      >
                        {post.title}
                      </Link>
                      <span
                        className={`text-[10px] font-mono font-medium px-2 py-0.5 rounded-full border ${
                          post.published
                            ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                            : "bg-[#faf8f5] text-[#7d6657] border-[#e8e2d9]"
                        }`}
                      >
                        {post.published ? "Published" : "Draft"}
                      </span>
                      {savingId === post.id && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-mono text-[#7d6657]">
                          <RotateCw className="w-3 h-3 animate-spin" /> Saving…
                        </span>
                      )}
                      {savedId === post.id && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-mono text-emerald-700">
                          <Check className="w-3 h-3" /> Synced to Frontend
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-[#634f43] line-clamp-2 leading-relaxed">
                      {post.excerpt}
                    </p>

                    <div className="flex flex-wrap items-center gap-2 pt-1">
                      <span className="text-[10px] font-mono text-[#7d6657]">
                        {post.reading_time}
                      </span>
                      {post.published_at && (
                        <>
                          <span className="text-[#ded2c0] text-[10px]">·</span>
                          <span className="text-[10px] font-mono text-[#7d6657]">
                            {formatDate(post.published_at)}
                          </span>
                        </>
                      )}
                      <div className="flex flex-wrap gap-1">
                        {post.tags.slice(0, 3).map((tag) => (
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
                </div>

                {/* Actions Bar */}
                <div className="flex items-center justify-between md:justify-end gap-2 pt-3 md:pt-0 border-t md:border-t-0 border-[#f0ece4] shrink-0">
                  <button
                    type="button"
                    onClick={() =>
                      setExpandedCoverId(isCoverOpen ? null : post.id)
                    }
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-[11px] font-mono transition-colors ${
                      isCoverOpen
                        ? "bg-[#201a16] text-white border-[#201a16]"
                        : "bg-[#faf8f5] text-[#634f43] border-[#e8e2d9] hover:border-[#201a16] hover:text-[#201a16]"
                    }`}
                  >
                    <ImageIcon className="w-3.5 h-3.5" />
                    <span>{hasCover ? "Change Cover" : "Upload Cover"}</span>
                  </button>

                  <div className="flex items-center gap-1">
                    <Link
                      href={`/admin/blog/${post.id}/edit`}
                      title="Edit Essay"
                      className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[#faf8f5] border border-[#e8e2d9] text-xs font-mono text-[#201a16] hover:bg-[#f4f0e8] transition-colors"
                    >
                      <Pencil className="w-3.5 h-3.5" />
                      <span>Edit</span>
                    </Link>
                    <button
                      onClick={() => togglePublish(post)}
                      title="Toggle Published Status"
                      className="p-1.5 rounded-lg text-[#7d6657] hover:bg-[#faf8f5] transition-colors"
                    >
                      {post.published ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                    <Link
                      href={`/blog/${post.slug}`}
                      target="_blank"
                      title="View Public Article"
                      className="p-1.5 rounded-lg text-[#7d6657] hover:bg-[#faf8f5] transition-colors"
                    >
                      <ArrowUpRight className="w-4 h-4" />
                    </Link>
                    <button
                      onClick={() => deletePost(post.id)}
                      title="Delete Essay"
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
                    label={`Cover Image for "${post.title}"`}
                    value={post.cover_image || ""}
                    onChange={(url) =>
                      updatePostField(post.id, { cover_image: url })
                    }
                    folder="blog"
                    aspectRatio="cover"
                    recommendedSize="1600 × 900 px (16:9 WebP or PNG)"
                    helperText="Uploading or replacing this image immediately saves and updates the public Blog page."
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
