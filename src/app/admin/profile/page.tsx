"use client";

import React, { useState, useEffect } from "react";
import { Save, Check, RotateCw } from "lucide-react";
import { ImageUploader } from "@/components/admin/ImageUploader";

export default function AdminProfilePage() {
  const [profile, setProfile] = useState({
    full_name: "Hanslay",
    tagline: "Software Engineer, AI Engineer & Graphic Designer",
    bio: "Engineering high-throughput systems, training domain-specific models, and crafting minimalist interfaces. Dedicated to the convergence of technical rigor, cognitive architecture, and typographic purity.",
    hero_photo_url: "/hanslay-portrait.png",
    cv_url: "/hanslay-cv.pdf",
    email: "hanslay@atelier.dev",
    location: "San Francisco & Remote",
    available_for_work: true,
    socials: {
      github: "https://github.com",
      twitter: "https://twitter.com",
      linkedin: "https://linkedin.com",
      readcv: "https://read.cv",
    },
    metrics: {
      years_experience: 7,
      projects_completed: 34,
      design_awards: 6,
      models_deployed: 18,
    },
  });

  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/profile")
      .then((res) => res.json())
      .then((data) => {
        if (data && data.profile) {
          setProfile((prev) => ({
            ...prev,
            ...data.profile,
            socials: {
              ...prev.socials,
              ...(data.profile.socials || {}),
            },
            metrics: {
              ...prev.metrics,
              ...(data.profile.metrics || {}),
            },
          }));
        }
      })
      .catch((err) => console.warn(err));
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch("/api/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profile),
      });
      const data = await res.json();
      if (data.success) {
        setSaved(true);
        setTimeout(() => setSaved(false), 2500);
      }
    } catch (err) {
      console.error("Save profile error:", err);
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (field: string, value: string | boolean) => {
    setProfile((p) => ({ ...p, [field]: value }));
  };

  const handleSocialChange = (key: string, value: string) => {
    setProfile((p) => ({
      ...p,
      socials: { ...p.socials, [key]: value },
    }));
  };

  const handleMetricChange = (key: string, value: number) => {
    setProfile((p) => ({
      ...p,
      metrics: { ...p.metrics, [key]: value },
    }));
  };

  return (
    <div className="flex-1 p-4 sm:p-6 md:p-8 overflow-y-auto w-full max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between gap-3">
        <div>
          <span className="text-[11px] font-mono uppercase tracking-wider text-[#7d6657]">
            Admin / Profile &amp; Identity
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-medium text-[#201a16] mt-1">
            Identity &amp; Biographic Data
          </h1>
          <p className="text-xs text-[#634f43] mt-1">
            Changes here update the public hero section, about page, contact page, navbar, and footer.
          </p>
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#201a16] text-white text-xs font-mono font-medium hover:bg-[#362b25] transition-all disabled:opacity-50 shadow-sm shrink-0"
        >
          {saving ? (
            <RotateCw className="w-3.5 h-3.5 animate-spin" />
          ) : saved ? (
            <Check className="w-3.5 h-3.5 text-emerald-400" />
          ) : (
            <Save className="w-3.5 h-3.5" />
          )}
          <span>{saving ? "Saving..." : saved ? "Synced to Frontend ✓" : "Save Profile"}</span>
        </button>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Hero Photo Uploader */}
        <div className="bg-white border border-[#e8e2d9] rounded-2xl p-5 sm:p-6 space-y-4 shadow-xs">
          <h2 className="text-xs font-mono uppercase tracking-wider font-semibold text-[#201a16]">
            Hero Portrait Asset
          </h2>
          <ImageUploader
            label="Arched Hero Portrait Photo"
            value={profile.hero_photo_url}
            onChange={(url) => handleChange("hero_photo_url", url)}
            folder="heroes"
            aspectRatio="arch"
            recommendedSize="2400 × 3200 px · WebP / PNG"
            helperText="Upload your custom portrait photo. Automatically updates both the Homepage and About page portraits."
          />
        </div>

        {/* Core Details */}
        <div className="bg-white border border-[#e8e2d9] rounded-2xl p-5 sm:p-6 space-y-4 shadow-xs">
          <h2 className="text-xs font-mono uppercase tracking-wider font-semibold text-[#201a16]">
            Core Moniker &amp; Credentials
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-[11px] font-mono uppercase tracking-wider text-[#7d6657]">
                Full Name / Moniker
              </label>
              <input
                type="text"
                value={profile.full_name}
                onChange={(e) => handleChange("full_name", e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-[#e8e2d9] bg-[#faf8f5] text-xs font-medium text-[#201a16] focus:outline-none focus:border-[#201a16]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-[11px] font-mono uppercase tracking-wider text-[#7d6657]">
                Contact Email
              </label>
              <input
                type="email"
                value={profile.email}
                onChange={(e) => handleChange("email", e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-[#e8e2d9] bg-[#faf8f5] text-xs font-mono text-[#201a16] focus:outline-none focus:border-[#201a16]"
              />
            </div>

            <div className="sm:col-span-2 space-y-1.5">
              <label className="block text-[11px] font-mono uppercase tracking-wider text-[#7d6657]">
                Professional Tagline (comma or &amp; separated roles)
              </label>
              <input
                type="text"
                value={profile.tagline}
                onChange={(e) => handleChange("tagline", e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-[#e8e2d9] bg-[#faf8f5] text-xs font-medium text-[#201a16] focus:outline-none focus:border-[#201a16]"
              />
            </div>

            <div className="sm:col-span-2 space-y-1.5">
              <label className="block text-[11px] font-mono uppercase tracking-wider text-[#7d6657]">
                Biographical Narrative
              </label>
              <textarea
                rows={4}
                value={profile.bio}
                onChange={(e) => handleChange("bio", e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#e8e2d9] bg-[#faf8f5] text-xs leading-relaxed text-[#201a16] focus:outline-none focus:border-[#201a16]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-[11px] font-mono uppercase tracking-wider text-[#7d6657]">
                Location Base
              </label>
              <input
                type="text"
                value={profile.location}
                onChange={(e) => handleChange("location", e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-[#e8e2d9] bg-[#faf8f5] text-xs text-[#201a16] focus:outline-none focus:border-[#201a16]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-[11px] font-mono uppercase tracking-wider text-[#7d6657]">
                CV / Resume Link
              </label>
              <input
                type="text"
                value={profile.cv_url}
                onChange={(e) => handleChange("cv_url", e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-[#e8e2d9] bg-[#faf8f5] text-xs font-mono text-[#201a16] focus:outline-none focus:border-[#201a16]"
              />
            </div>
          </div>

          <label className="flex items-center gap-2.5 cursor-pointer pt-2 border-t border-[#f0ece4]">
            <div
              onClick={() => handleChange("available_for_work", !profile.available_for_work)}
              className={`w-10 h-5 rounded-full transition-colors cursor-pointer ${
                profile.available_for_work ? "bg-[#201a16]" : "bg-[#e8e2d9]"
              }`}
            >
              <div
                className={`w-4 h-4 bg-white rounded-full m-0.5 transition-transform ${
                  profile.available_for_work ? "translate-x-5" : ""
                }`}
              />
            </div>
            <span className="text-xs font-mono uppercase tracking-wider text-[#201a16]">
              Available for New Collaborations &amp; Work
            </span>
          </label>
        </div>

        {/* Career Metrics */}
        <div className="bg-white border border-[#e8e2d9] rounded-2xl p-5 sm:p-6 space-y-4 shadow-xs">
          <h2 className="text-xs font-mono uppercase tracking-wider font-semibold text-[#201a16]">
            Quantified Career Metrics (Hero &amp; About Counters)
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="space-y-1.5">
              <label className="block text-[11px] font-mono uppercase tracking-wider text-[#7d6657]">
                Years Experience
              </label>
              <input
                type="number"
                value={profile.metrics.years_experience}
                onChange={(e) =>
                  handleMetricChange("years_experience", parseInt(e.target.value) || 0)
                }
                className="w-full px-3.5 py-2 rounded-xl border border-[#e8e2d9] bg-[#faf8f5] text-xs font-mono text-[#201a16] focus:outline-none focus:border-[#201a16]"
              />
            </div>
            <div className="space-y-1.5">
              <label className="block text-[11px] font-mono uppercase tracking-wider text-[#7d6657]">
                Projects Shipped
              </label>
              <input
                type="number"
                value={profile.metrics.projects_completed}
                onChange={(e) =>
                  handleMetricChange("projects_completed", parseInt(e.target.value) || 0)
                }
                className="w-full px-3.5 py-2 rounded-xl border border-[#e8e2d9] bg-[#faf8f5] text-xs font-mono text-[#201a16] focus:outline-none focus:border-[#201a16]"
              />
            </div>
            <div className="space-y-1.5">
              <label className="block text-[11px] font-mono uppercase tracking-wider text-[#7d6657]">
                Models Deployed
              </label>
              <input
                type="number"
                value={profile.metrics.models_deployed}
                onChange={(e) =>
                  handleMetricChange("models_deployed", parseInt(e.target.value) || 0)
                }
                className="w-full px-3.5 py-2 rounded-xl border border-[#e8e2d9] bg-[#faf8f5] text-xs font-mono text-[#201a16] focus:outline-none focus:border-[#201a16]"
              />
            </div>
            <div className="space-y-1.5">
              <label className="block text-[11px] font-mono uppercase tracking-wider text-[#7d6657]">
                Design Awards
              </label>
              <input
                type="number"
                value={profile.metrics.design_awards}
                onChange={(e) =>
                  handleMetricChange("design_awards", parseInt(e.target.value) || 0)
                }
                className="w-full px-3.5 py-2 rounded-xl border border-[#e8e2d9] bg-[#faf8f5] text-xs font-mono text-[#201a16] focus:outline-none focus:border-[#201a16]"
              />
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="bg-white border border-[#e8e2d9] rounded-2xl p-5 sm:p-6 space-y-4 shadow-xs">
          <h2 className="text-xs font-mono uppercase tracking-wider font-semibold text-[#201a16]">
            Social Channels &amp; Index
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-[11px] font-mono uppercase tracking-wider text-[#7d6657]">
                GitHub Profile
              </label>
              <input
                type="url"
                value={profile.socials.github || ""}
                onChange={(e) => handleSocialChange("github", e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-[#e8e2d9] bg-[#faf8f5] text-xs font-mono text-[#201a16] focus:outline-none focus:border-[#201a16]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-[11px] font-mono uppercase tracking-wider text-[#7d6657]">
                Twitter / X Profile
              </label>
              <input
                type="url"
                value={profile.socials.twitter || ""}
                onChange={(e) => handleSocialChange("twitter", e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-[#e8e2d9] bg-[#faf8f5] text-xs font-mono text-[#201a16] focus:outline-none focus:border-[#201a16]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-[11px] font-mono uppercase tracking-wider text-[#7d6657]">
                LinkedIn Profile
              </label>
              <input
                type="url"
                value={profile.socials.linkedin || ""}
                onChange={(e) => handleSocialChange("linkedin", e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-[#e8e2d9] bg-[#faf8f5] text-xs font-mono text-[#201a16] focus:outline-none focus:border-[#201a16]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-[11px] font-mono uppercase tracking-wider text-[#7d6657]">
                Read.cv / Portfolio Profile
              </label>
              <input
                type="url"
                value={profile.socials.readcv || ""}
                onChange={(e) => handleSocialChange("readcv", e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-[#e8e2d9] bg-[#faf8f5] text-xs font-mono text-[#201a16] focus:outline-none focus:border-[#201a16]"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end pb-8">
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#201a16] text-white text-xs font-mono font-medium hover:bg-[#362b25] transition-all disabled:opacity-50"
          >
            <Save className="w-3.5 h-3.5" />
            <span>{saving ? "Saving..." : "Save Profile"}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
