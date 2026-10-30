"use client";
/* eslint-disable @next/next/no-img-element */

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  RotateCw,
  Code,
  Info,
  Heading1,
  Heading2,
  Bold,
  Italic,
  Link2,
  Quote,
  List,
  Check,
  Smartphone,
  Monitor,
  Sparkles,
  Sliders,
  FileCode,
  X,
  Target,
  Upload,
  Eye,
  Edit3,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ImageUploader } from "@/components/admin/ImageUploader";

export default function StudioAdminOverviewPage() {
  // Document State
  const [moniker, setMoniker] = useState("Hanslay");
  const [tagline, setTagline] = useState(
    "Software Engineer, AI Engineer & Graphic Designer"
  );
  const [bio, setBio] = useState(
    `Operating at the confluence of deterministic software systems, emergent artificial intelligence, and tactile graphic design. I construct resilient software architectures and expressive brand experiences for forward-looking studios.\n\nCrafting with intentional pacing, mathematical structural restraint, and typographic permanence.`
  );
  const [heroImage, setHeroImage] = useState<string>("/hanslay-portrait.png");
  const [hotspot, setHotspot] = useState({ cx: 0.52, cy: 0.38 });
  const [viewMode, setViewMode] = useState<"desktop" | "mobile" | "payload">(
    "desktop"
  );
  
  // Responsive pane tab on small screens (< xl): 'editor' | 'preview'
  const [mobileTab, setMobileTab] = useState<"editor" | "preview">("editor");

  const [isDraft, setIsDraft] = useState(true);
  const [publishing, setPublishing] = useState(false);
  const [publishedToast, setPublishedToast] = useState(false);
  const [showPayloadModal, setShowPayloadModal] = useState(false);

  // Load current saved profile from database
  useEffect(() => {
    fetch("/api/profile")
      .then((res) => res.json())
      .then((data) => {
        if (data && data.profile) {
          if (data.profile.full_name) setMoniker(data.profile.full_name);
          if (data.profile.tagline) setTagline(data.profile.tagline);
          if (data.profile.bio) setBio(data.profile.bio);
          if (data.profile.hero_photo_url) setHeroImage(data.profile.hero_photo_url);
          setIsDraft(false);
        }
      })
      .catch((err) => console.warn("Failed to fetch profile:", err));
  }, []);

  // Word count calculator
  const wordCount = bio.trim().split(/\s+/).filter(Boolean).length;

  const handlePublish = async () => {
    setPublishing(true);
    try {
      const res = await fetch("/api/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          full_name: moniker,
          tagline: tagline,
          bio: bio,
          hero_photo_url: heroImage,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setIsDraft(false);
        setPublishedToast(true);
        setTimeout(() => setPublishedToast(false), 3500);
      }
    } catch (err) {
      console.error("Publish error:", err);
    } finally {
      setPublishing(false);
    }
  };

  const handleDiscard = () => {
    setMoniker("Hanslay");
    setTagline("Software Engineer, AI Engineer & Graphic Designer");
    setBio(
      `Operating at the confluence of deterministic software systems, emergent artificial intelligence, and tactile graphic design. I construct resilient software architectures and expressive brand experiences for forward-looking studios.\n\nCrafting with intentional pacing, mathematical structural restraint, and typographic permanence.`
    );
    setHeroImage("/hanslay-portrait.png");
    setIsDraft(false);
  };

  // JSON Schema Document Payload
  const documentPayload = {
    _id: "profile.hanslay.narrative",
    _type: "profileHero",
    _rev: isDraft ? "draft.rev_89f02c" : "published.rev_91b70a",
    status: isDraft ? "draft_pending" : "published",
    identity: {
      moniker: moniker,
      tagline: tagline,
      disciplines: ["Software Engineering", "AI Systems", "Graphic Design"],
    },
    heroAsset: {
      _type: "image",
      url: heroImage,
      dimensions: { width: 2400, height: 3200, format: "webp" },
      hotspot: hotspot,
      crop: { top: 0, bottom: 0, left: 0.05, right: 0.05 },
      aspectRatio: "3:4 vertical editorial arch",
    },
    bioPhilosophy: {
      _type: "portableText",
      rawText: bio,
      wordCount: wordCount,
    },
    updatedAt: new Date().toISOString(),
  };

  return (
    <div className="flex-1 flex flex-col xl:flex-row overflow-hidden w-full min-w-0">
      
      {/* ── RESPONSIVE MOBILE TABS BAR (VISIBLE ON < XL SCREENS) ── */}
      <div className="xl:hidden flex items-center justify-between border-b border-[#e8e2d9] bg-white px-4 py-2 shrink-0">
        <div className="flex items-center gap-1 bg-[#faf8f5] p-1 rounded-lg border border-[#e8e2d9] text-xs font-mono">
          <button
            onClick={() => setMobileTab("editor")}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1 rounded transition-all",
              mobileTab === "editor"
                ? "bg-[#201a16] text-white font-medium shadow-xs"
                : "text-[#7d6657] hover:text-[#201a16]"
            )}
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Document Editor</span>
          </button>
          <button
            onClick={() => setMobileTab("preview")}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1 rounded transition-all",
              mobileTab === "preview"
                ? "bg-[#201a16] text-white font-medium shadow-xs"
                : "text-[#7d6657] hover:text-[#201a16]"
            )}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Live Preview</span>
          </button>
        </div>

        <button
          onClick={handlePublish}
          disabled={publishing}
          className="flex items-center gap-1 px-3 py-1 rounded-lg bg-[#201a16] text-white text-xs font-mono"
        >
          <RotateCw className={cn("w-3 h-3", publishing && "animate-spin")} />
          <span>{publishing ? "..." : "Publish"}</span>
        </button>
      </div>

      {/* ── COLUMN 2: MIDDLE DOCUMENT EDITOR PANE ── */}
      <section
        className={cn(
          "flex-1 border-r border-[#e8e2d9] bg-white flex flex-col min-w-0 overflow-y-auto",
          mobileTab !== "editor" && "hidden xl:flex"
        )}
      >
        {/* Editor Top Bar: Breadcrumb + Status + Actions */}
        <div className="min-h-14 py-2.5 border-b border-[#e8e2d9] px-4 sm:px-6 flex flex-wrap items-center justify-between gap-3 sticky top-0 bg-white/95 backdrop-blur z-10 shrink-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#9e8677]">
              DOCUMENT
            </span>
            <span className="text-[#c7b49e] font-mono">/</span>
            <h1 className="text-xs font-semibold text-[#201a16] tracking-tight">
              Profile &amp; Hero Narrative
            </h1>

            {/* Draft status pill */}
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#faf8f5] border border-[#e8e2d9] text-[10px] font-mono">
              <span className="text-[#a9937c]">
                {isDraft ? "(draft edits pending)" : "(synced)"}
              </span>
              <span className="text-[#ded2c0]">|</span>
              <span className="font-semibold text-emerald-800">PUBLISHED</span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleDiscard}
              className="px-2.5 sm:px-3 py-1.5 rounded-lg border border-[#e8e2d9] hover:bg-[#faf8f5] text-xs font-mono text-[#634f43] transition-colors"
            >
              Discard Draft
            </button>
            <button
              onClick={handlePublish}
              disabled={publishing}
              className="px-3 sm:px-4 py-1.5 rounded-lg bg-[#201a16] text-[#faf8f5] text-xs font-mono font-semibold hover:bg-[#362b25] transition-all flex items-center gap-1.5 shadow-sm disabled:opacity-50"
            >
              <RotateCw className={cn("w-3 h-3", publishing && "animate-spin")} />
              <span>{publishing ? "PUBLISHING..." : "PUBLISH CHANGES"}</span>
            </button>
            <button
              onClick={() => setShowPayloadModal(true)}
              title="Inspect JSON Schema Payload"
              className="p-1.5 rounded-lg border border-[#e8e2d9] hover:bg-[#faf8f5] text-[#7d6657] hover:text-[#201a16] transition-colors font-mono text-xs"
            >
              <Code className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Editor Form Body */}
        <div className="p-4 sm:p-6 md:p-8 space-y-8 max-w-3xl w-full">
          
          {/* Info Banner: Next.js On-Demand ISR */}
          <div className="p-3.5 rounded-xl bg-[#faf8f5] border border-[#e8e2d9] flex items-start gap-3 text-[#634f43]">
            <Info className="w-4 h-4 text-[#7d6657] shrink-0 mt-0.5" />
            <p className="text-xs leading-relaxed">
              Modifications here trigger Next.js On-Demand ISR revalidation upon publishing. Changes reflect instantaneously across the edge nodes without cache latency.
            </p>
          </div>

          {/* SECTION 1: IDENTITY & ROLE DEFINITION */}
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-[#f0ece4] pb-2">
              <h2 className="text-xs font-mono uppercase tracking-wider font-semibold text-[#201a16]">
                IDENTITY &amp; ROLE DEFINITION
              </h2>
              <span className="text-[11px] font-mono text-[#a9937c]">
                string • required
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
              <div className="md:col-span-4 space-y-1.5">
                <label className="block text-[10px] font-mono uppercase tracking-wider text-[#7d6657]">
                  FULL MONIKER
                </label>
                <input
                  type="text"
                  value={moniker}
                  onChange={(e) => {
                    setMoniker(e.target.value);
                    setIsDraft(true);
                  }}
                  className="w-full px-3 py-2 rounded-lg border border-[#e8e2d9] bg-white text-xs font-medium text-[#201a16] focus:outline-none focus:border-[#201a16] transition-colors"
                />
              </div>

              <div className="md:col-span-8 space-y-1.5">
                <label className="block text-[10px] font-mono uppercase tracking-wider text-[#7d6657]">
                  3-ROLE POLYMATH TAGLINE
                </label>
                <input
                  type="text"
                  value={tagline}
                  onChange={(e) => {
                    setTagline(e.target.value);
                    setIsDraft(true);
                  }}
                  className="w-full px-3 py-2 rounded-lg border border-[#e8e2d9] bg-white text-xs font-medium text-[#201a16] focus:outline-none focus:border-[#201a16] transition-colors"
                />
              </div>
            </div>
          </div>

          {/* SECTION 2: HERO PORTRAIT ASSET (WITH LIVE IMAGE UPLOADER) */}
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-[#f0ece4] pb-2">
              <h2 className="text-xs font-mono uppercase tracking-wider font-semibold text-[#201a16]">
                HERO PORTRAIT ASSET
              </h2>
              <span className="text-[11px] font-mono text-[#a9937c]">
                image • hotspot enabled
              </span>
            </div>

            {/* Custom Image Uploader wired to Supabase Storage */}
            <ImageUploader
              label="Upload Arched Hero Portrait"
              value={heroImage}
              onChange={(url) => {
                setHeroImage(url);
                setIsDraft(true);
              }}
              folder="heroes"
              aspectRatio="arch"
              recommendedSize="2400 × 3200 px · WebP / PNG"
              helperText="Upload your custom high-res portrait. It automatically adapts into Hanslay's signature editorial arch frame."
            />

            {/* Hotspot & Metadata Controls */}
            <div className="border border-[#e8e2d9] rounded-xl p-4 bg-[#faf8f5]/60 space-y-3">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <Target className="w-4 h-4 text-[#7d6657]" />
                  <span className="text-xs font-mono font-medium text-[#201a16]">
                    Focus Reticle Hotspot: cx: {hotspot.cx} cy: {hotspot.cy}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setHotspot({
                      cx: +(Math.random() * 0.2 + 0.4).toFixed(2),
                      cy: +(Math.random() * 0.2 + 0.3).toFixed(2),
                    });
                    setIsDraft(true);
                  }}
                  className="px-3 py-1 rounded-lg border border-[#e8e2d9] bg-white text-xs font-mono text-[#201a16] hover:bg-[#faf8f5] shadow-xs"
                >
                  Randomize Hotspot
                </button>
              </div>

              <div className="p-3 rounded-lg bg-white border border-[#e8e2d9] font-mono text-[11px] text-[#634f43] space-y-1">
                <p>
                  <span className="text-[#a9937c]">Crop coordinates:</span>{" "}
                  {"{ top: 0, bottom: 0, left: 0.05, right: 0.05 }"}
                </p>
                <p>
                  <span className="text-[#a9937c]">Responsive Aspect Ratio:</span>{" "}
                  3:4 Vertical Editorial Arch
                </p>
              </div>
            </div>
          </div>

          {/* SECTION 3: BIO & DESIGN PHILOSOPHY */}
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-[#f0ece4] pb-2">
              <h2 className="text-xs font-mono uppercase tracking-wider font-semibold text-[#201a16]">
                BIO &amp; DESIGN PHILOSOPHY
              </h2>
              <span className="text-[11px] font-mono text-[#a9937c]">
                portableText block
              </span>
            </div>

            {/* Rich Text Toolbar */}
            <div className="border border-[#e8e2d9] rounded-xl overflow-hidden bg-white shadow-sm">
              <div className="p-2 border-b border-[#f0ece4] bg-[#faf8f5] flex items-center justify-between flex-wrap gap-2 text-xs">
                <div className="flex items-center gap-1">
                  <button type="button" className="p-1.5 rounded hover:bg-white text-[#7d6657] hover:text-[#201a16] font-mono text-xs font-semibold">
                    H1
                  </button>
                  <button type="button" className="p-1.5 rounded hover:bg-white text-[#7d6657] hover:text-[#201a16] font-mono text-xs font-semibold">
                    H2
                  </button>
                  <div className="h-4 w-px bg-[#e8e2d9] mx-1" />
                  <button type="button" className="p-1.5 rounded hover:bg-white text-[#7d6657] hover:text-[#201a16]">
                    <Bold className="w-3.5 h-3.5" />
                  </button>
                  <button type="button" className="p-1.5 rounded hover:bg-white text-[#7d6657] hover:text-[#201a16]">
                    <Italic className="w-3.5 h-3.5" />
                  </button>
                  <button type="button" className="p-1.5 rounded hover:bg-white text-[#7d6657] hover:text-[#201a16]">
                    <Link2 className="w-3.5 h-3.5" />
                  </button>
                  <button type="button" className="p-1.5 rounded hover:bg-white text-[#7d6657] hover:text-[#201a16]">
                    <Code className="w-3.5 h-3.5" />
                  </button>
                  <button type="button" className="p-1.5 rounded hover:bg-white text-[#7d6657] hover:text-[#201a16]">
                    <Quote className="w-3.5 h-3.5" />
                  </button>
                  <button type="button" className="p-1.5 rounded hover:bg-white text-[#7d6657] hover:text-[#201a16]">
                    <List className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="text-[11px] font-mono text-[#a9937c]">
                  Words: <strong className="text-[#201a16]">{wordCount}</strong>
                </div>
              </div>

              {/* Textarea editor */}
              <textarea
                rows={6}
                value={bio}
                onChange={(e) => {
                  setBio(e.target.value);
                  setIsDraft(true);
                }}
                className="w-full p-4 text-xs font-sans text-[#201a16] leading-relaxed focus:outline-none resize-y min-h-[140px]"
                placeholder="Enter biographical essay and architectural philosophy..."
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── COLUMN 3: RIGHT LIVE VIEWPORT SYNC PANE ── */}
      <section
        className={cn(
          "w-full xl:w-[440px] 2xl:w-[480px] bg-[#f4f0e8]/50 flex flex-col shrink-0 overflow-y-auto",
          mobileTab !== "preview" && "hidden xl:flex"
        )}
      >
        {/* Viewport Controls Bar */}
        <div className="h-14 border-b border-[#e8e2d9] px-4 sm:px-5 flex items-center justify-between sticky top-0 bg-[#f4f0e8]/90 backdrop-blur z-10 shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[11px] font-mono uppercase tracking-wider font-semibold text-[#201a16]">
              LIVE VIEWPORT SYNC
            </span>
          </div>

          <div className="flex items-center gap-1 bg-white p-1 rounded-lg border border-[#e8e2d9] text-[11px] font-mono">
            <button
              onClick={() => setViewMode("desktop")}
              className={cn(
                "px-2 sm:px-2.5 py-0.5 rounded transition-all",
                viewMode === "desktop"
                  ? "bg-[#201a16] text-white font-medium"
                  : "text-[#7d6657] hover:text-[#201a16]"
              )}
            >
              Desktop
            </button>
            <button
              onClick={() => setViewMode("mobile")}
              className={cn(
                "px-2 sm:px-2.5 py-0.5 rounded transition-all",
                viewMode === "mobile"
                  ? "bg-[#201a16] text-white font-medium"
                  : "text-[#7d6657] hover:text-[#201a16]"
              )}
            >
              Mobile
            </button>
            <button
              onClick={() => setViewMode("payload")}
              className={cn(
                "px-2 sm:px-2.5 py-0.5 rounded transition-all",
                viewMode === "payload"
                  ? "bg-[#201a16] text-white font-medium"
                  : "text-[#7d6657] hover:text-[#201a16]"
              )}
            >
              &lt;&gt; Payload
            </button>
          </div>
        </div>

        {/* Viewport Frame Container */}
        <div className="p-4 sm:p-6 flex-1 flex flex-col items-center justify-start">
          
          {viewMode === "payload" ? (
            /* Payload JSON Inspector View */
            <div className="w-full bg-[#201a16] text-amber-100/90 rounded-2xl p-4 font-mono text-[11px] shadow-card overflow-x-auto border border-[#362b25]">
              <div className="flex items-center justify-between pb-2 mb-3 border-b border-[#362b25] text-[10px] text-[#a9937c]">
                <span>SCHEMA PAYLOAD (LIVE GRAPH)</span>
                <span>application/json</span>
              </div>
              <pre className="overflow-x-auto">
                {JSON.stringify(documentPayload, null, 2)}
              </pre>
            </div>
          ) : (
            /* Mock Browser / Device Frame */
            <div
              className={cn(
                "w-full bg-white rounded-2xl border border-[#ded2c0] shadow-card overflow-hidden transition-all duration-300 flex flex-col",
                viewMode === "mobile" ? "max-w-[340px]" : "max-w-full"
              )}
            >
              {/* Browser Mock Chrome Bar */}
              <div className="h-8 border-b border-[#f0ece4] bg-[#faf8f5] px-3 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-400/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400/80" />
                </div>
                <div className="text-[10px] font-mono text-[#7d6657] bg-white border border-[#e8e2d9] rounded-md px-3 py-0.5 truncate max-w-[180px]">
                  https://hanslay.com
                </div>
                <div className="w-6" />
              </div>

              {/* Inside Live Preview Content */}
              <div className="p-5 sm:p-6 space-y-6">
                
                {/* Header in Preview */}
                <div className="flex items-center justify-between border-b border-[#f0ece4] pb-3">
                  <span className="font-serif font-bold text-xs tracking-wider text-[#201a16] uppercase">
                    {moniker}
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-[#f4f0e8] text-[9px] font-mono text-[#7d6657] border border-[#e8e2d9]">
                    02/04 AVAILABLE
                  </span>
                </div>

                {/* Arched Portrait Frame (Live Synced with uploaded hero image) */}
                <div className="flex justify-center">
                  <div className="w-44 sm:w-48 h-56 sm:h-60 rounded-t-full rounded-b-xl border border-[#e8e2d9] bg-[#faf8f5] overflow-hidden flex flex-col items-center justify-center relative shadow-inner">
                    {heroImage && (heroImage.startsWith("http") || heroImage.startsWith("data:") || heroImage.startsWith("/")) ? (
                      <img
                        src={heroImage}
                        alt={moniker}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-20 h-28 rounded-t-full rounded-b-md bg-[#ded2c0]/40 flex items-center justify-center font-serif text-3xl font-bold text-[#7d6657]">
                        {moniker.charAt(0)}
                      </div>
                    )}
                  </div>
                </div>

                {/* Titles and Bio Live Updates */}
                <div className="space-y-3">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#7d6657]">
                    — {moniker}
                  </span>
                  <h3 className="font-serif text-lg sm:text-xl font-medium text-[#201a16] leading-tight">
                    {tagline}
                  </h3>
                  <p className="text-[11px] text-[#634f43] leading-relaxed line-clamp-4">
                    {bio}
                  </p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {["Distributed Systems", "Autonomous AI", "Typography"].map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 rounded-full border border-[#e8e2d9] text-[9px] font-mono text-[#634f43] bg-[#faf8f5]"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* CTA Button */}
                <button className="w-full py-2.5 rounded-xl bg-[#201a16] text-[#faf8f5] text-xs font-mono font-medium uppercase tracking-wider hover:bg-[#362b25] transition-colors">
                  GET IN TOUCH
                </button>

                {/* Staged ISR Notification Footer */}
                <div className="text-center pt-2 border-t border-[#f0ece4]">
                  <p className="text-[9px] font-mono text-[#a9937c]">
                    Reflecting Staged Draft • ISR Hook Triggered
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── JSON SCHEMA MODAL ── */}
      {showPayloadModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6">
          <div className="w-full max-w-2xl bg-white rounded-2xl border border-[#e8e2d9] shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
            <div className="p-4 border-b border-[#e8e2d9] flex items-center justify-between bg-[#faf8f5]">
              <div className="flex items-center gap-2">
                <FileCode className="w-4 h-4 text-[#7d6657]" />
                <span className="text-xs font-mono font-semibold text-[#201a16]">
                  DOCUMENT SCHEMA PAYLOAD · profileHero
                </span>
              </div>
              <button
                onClick={() => setShowPayloadModal(false)}
                className="p-1 rounded-lg text-[#7d6657] hover:bg-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-4 bg-[#201a16] text-amber-100 font-mono text-xs overflow-y-auto flex-1">
              <pre>{JSON.stringify(documentPayload, null, 2)}</pre>
            </div>
            <div className="p-3 border-t border-[#e8e2d9] bg-white flex justify-end">
              <button
                onClick={() => setShowPayloadModal(false)}
                className="px-4 py-1.5 rounded-lg bg-[#201a16] text-white text-xs font-mono"
              >
                Close Inspector
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── PUBLISHED TOAST ── */}
      {publishedToast && (
        <div className="fixed bottom-10 right-4 sm:right-10 z-50 bg-[#201a16] text-[#faf8f5] px-4 sm:px-5 py-3 rounded-xl border border-[#4e3e35] shadow-2xl flex items-center gap-3 text-xs animate-in fade-in slide-in-from-bottom-3 font-mono">
          <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
            <Check className="w-3 h-3" />
          </div>
          <div>
            <p className="font-semibold text-white">Published to Content Lake</p>
            <p className="text-[10px] text-[#c7b49e]">
              Next.js 14 On-Demand ISR refreshed the public edge cache
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
