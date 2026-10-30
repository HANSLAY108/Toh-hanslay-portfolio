"use client";

import React, { useState, useEffect } from "react";
import { Save, X, Check, RotateCw, Mail, LayoutTemplate, Globe } from "lucide-react";

type SettingsTab = "contact" | "footer" | "seo";

export default function AdminSettingsPage() {
  const [activeTab, setActiveTab] = useState<SettingsTab>("contact");

  const [settings, setSettings] = useState({
    site_title: "Hanslay — Software Engineer, AI Engineer & Graphic Designer",
    meta_description:
      "Personal portfolio and technical writing of Hanslay. Exploring autonomous AI architectures, distributed systems, and editorial typography.",
    contact_email: "hanslay@atelier.dev",
    footer_text:
      "Crafted with architectural precision, cognitive depth, and typographic conviction.",
    available_for_work: true,
    // Contact Page fields
    contact_eyebrow: "Open for Work",
    contact_heading: "Let's Build Together",
    contact_description:
      "Whether you have a complex AI system to architect, a full-stack product to build, or a design identity to create — every great collaboration starts with a single message.",
    contact_phone: "",
    contact_location: "San Francisco & Remote",
    response_time: "Within 24–48 hours",
    availability_headline: "Available for Select Projects",
    availability_description:
      "I'm taking on new collaborations for Q4 2024 — AI architecture, full-stack builds, and editorial design commissions.",
    // Footer fields
    footer_version: "v2.4",
    footer_location: "SF & Remote • Pacific Standard Time",
    footer_copyright: "All rights reserved. Editorial Minimalist Architecture.",
    footer_tech_stack: "Next.js 14 · Supabase · Tailwind",
  });

  const [socials, setSocials] = useState({
    github: "https://github.com",
    twitter: "https://twitter.com",
    linkedin: "https://linkedin.com",
    readcv: "https://read.cv",
  });

  const [keywords, setKeywords] = useState([
    "Hanslay",
    "Software Engineer",
    "AI Engineer",
    "Graphic Designer",
    "Next.js",
    "TypeScript",
  ]);
  const [kwInput, setKwInput] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/settings")
      .then((res) => res.json())
      .then((data) => {
        if (data?.settings) {
          setSettings((prev) => ({
            ...prev,
            ...data.settings,
          }));
          if (Array.isArray(data.settings.keywords)) {
            setKeywords(data.settings.keywords);
          }
        }
        if (data?.socials) {
          setSocials((prev) => ({
            ...prev,
            ...data.socials,
          }));
        }
      })
      .catch(() => {});
  }, []);

  const addKw = () => {
    if (kwInput.trim() && !keywords.includes(kwInput.trim())) {
      setKeywords([...keywords, kwInput.trim()]);
      setKwInput("");
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await fetch("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...settings, keywords, socials }),
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="flex-1 p-4 sm:p-6 md:p-8 overflow-y-auto w-full max-w-4xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-mono uppercase tracking-wider text-[#7d6657]">
            Admin / Studio Settings
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-medium text-[#201a16] mt-1">
            Contact Page, Footer &amp; SEO
          </h1>
          <p className="text-xs text-[#634f43] mt-1">
            Customize every detail shown on the public Contact page, global Footer, social links, and search metadata.
          </p>
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#201a16] text-white text-xs font-mono font-medium hover:bg-[#362b25] transition-all disabled:opacity-50 shrink-0 shadow-sm"
        >
          {saving ? (
            <RotateCw className="w-3.5 h-3.5 animate-spin" />
          ) : saved ? (
            <Check className="w-3.5 h-3.5 text-emerald-400" />
          ) : (
            <Save className="w-3.5 h-3.5" />
          )}
          <span>{saving ? "Saving..." : saved ? "Synced to Frontend ✓" : "Save All Changes"}</span>
        </button>
      </div>

      {/* Tab Navigation */}
      <div className="flex flex-wrap gap-2 border-b border-[#e8e2d9] pb-0">
        {[
          { id: "contact" as const, label: "Contact Page Details", icon: Mail },
          { id: "footer" as const, label: "Footer & Social Links", icon: LayoutTemplate },
          { id: "seo" as const, label: "SEO & Metadata", icon: Globe },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`inline-flex items-center gap-2 px-4 py-2.5 -mb-px text-xs font-mono uppercase tracking-wider font-medium border-b-2 transition-colors ${
                activeTab === tab.id
                  ? "border-[#201a16] text-[#201a16]"
                  : "border-transparent text-[#7d6657] hover:text-[#201a16]"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* ── TAB 1: CONTACT PAGE DETAILS ── */}
      {activeTab === "contact" && (
        <div className="space-y-6">
          <div className="bg-white border border-[#e8e2d9] rounded-2xl p-5 sm:p-6 space-y-4 shadow-xs">
            <h2 className="text-xs font-mono uppercase tracking-wider font-semibold text-[#201a16]">
              Contact Page Header &amp; Copy
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-[11px] font-mono uppercase tracking-wider text-[#7d6657]">
                  Eyebrow Badge Text
                </label>
                <input
                  type="text"
                  value={settings.contact_eyebrow}
                  onChange={(e) =>
                    setSettings((s) => ({ ...s, contact_eyebrow: e.target.value }))
                  }
                  placeholder="Open for Work"
                  className="w-full px-3.5 py-2 rounded-xl border border-[#e8e2d9] bg-[#faf8f5] text-xs text-[#201a16] focus:outline-none focus:border-[#201a16]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-[11px] font-mono uppercase tracking-wider text-[#7d6657]">
                  Main Page Heading
                </label>
                <input
                  type="text"
                  value={settings.contact_heading}
                  onChange={(e) =>
                    setSettings((s) => ({ ...s, contact_heading: e.target.value }))
                  }
                  placeholder="Let's Build Together"
                  className="w-full px-3.5 py-2 rounded-xl border border-[#e8e2d9] bg-[#faf8f5] text-xs font-medium text-[#201a16] focus:outline-none focus:border-[#201a16]"
                />
              </div>

              <div className="sm:col-span-2 space-y-1.5">
                <label className="block text-[11px] font-mono uppercase tracking-wider text-[#7d6657]">
                  Introductory Paragraph
                </label>
                <textarea
                  rows={3}
                  value={settings.contact_description}
                  onChange={(e) =>
                    setSettings((s) => ({ ...s, contact_description: e.target.value }))
                  }
                  className="w-full px-3.5 py-2 rounded-xl border border-[#e8e2d9] bg-[#faf8f5] text-xs text-[#201a16] focus:outline-none focus:border-[#201a16] leading-relaxed resize-none"
                />
              </div>
            </div>
          </div>

          <div className="bg-white border border-[#e8e2d9] rounded-2xl p-5 sm:p-6 space-y-4 shadow-xs">
            <h2 className="text-xs font-mono uppercase tracking-wider font-semibold text-[#201a16]">
              Direct Contact Information
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-[11px] font-mono uppercase tracking-wider text-[#7d6657]">
                  Contact Email Address
                </label>
                <input
                  type="email"
                  value={settings.contact_email}
                  onChange={(e) =>
                    setSettings((s) => ({ ...s, contact_email: e.target.value }))
                  }
                  className="w-full px-3.5 py-2 rounded-xl border border-[#e8e2d9] bg-[#faf8f5] text-xs font-mono text-[#201a16] focus:outline-none focus:border-[#201a16]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-[11px] font-mono uppercase tracking-wider text-[#7d6657]">
                  Phone / WhatsApp (Optional)
                </label>
                <input
                  type="text"
                  value={settings.contact_phone}
                  onChange={(e) =>
                    setSettings((s) => ({ ...s, contact_phone: e.target.value }))
                  }
                  placeholder="+1 (555) 234-5678"
                  className="w-full px-3.5 py-2 rounded-xl border border-[#e8e2d9] bg-[#faf8f5] text-xs font-mono text-[#201a16] focus:outline-none focus:border-[#201a16]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-[11px] font-mono uppercase tracking-wider text-[#7d6657]">
                  Location Display
                </label>
                <input
                  type="text"
                  value={settings.contact_location}
                  onChange={(e) =>
                    setSettings((s) => ({ ...s, contact_location: e.target.value }))
                  }
                  placeholder="San Francisco & Remote"
                  className="w-full px-3.5 py-2 rounded-xl border border-[#e8e2d9] bg-[#faf8f5] text-xs text-[#201a16] focus:outline-none focus:border-[#201a16]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-[11px] font-mono uppercase tracking-wider text-[#7d6657]">
                  Response Time Estimate
                </label>
                <input
                  type="text"
                  value={settings.response_time}
                  onChange={(e) =>
                    setSettings((s) => ({ ...s, response_time: e.target.value }))
                  }
                  placeholder="Within 24–48 hours"
                  className="w-full px-3.5 py-2 rounded-xl border border-[#e8e2d9] bg-[#faf8f5] text-xs text-[#201a16] focus:outline-none focus:border-[#201a16]"
                />
              </div>
            </div>
          </div>

          <div className="bg-white border border-[#e8e2d9] rounded-2xl p-5 sm:p-6 space-y-4 shadow-xs">
            <h2 className="text-xs font-mono uppercase tracking-wider font-semibold text-[#201a16]">
              Availability Status Box (Contact Page &amp; Navbar)
            </h2>

            <label className="flex items-center gap-2.5 cursor-pointer">
              <div
                onClick={() =>
                  setSettings((s) => ({
                    ...s,
                    available_for_work: !s.available_for_work,
                  }))
                }
                className={`w-10 h-5 rounded-full transition-colors ${
                  settings.available_for_work ? "bg-[#201a16]" : "bg-[#e8e2d9]"
                }`}
              >
                <div
                  className={`w-4 h-4 bg-white rounded-full m-0.5 transition-transform ${
                    settings.available_for_work ? "translate-x-5" : ""
                  }`}
                />
              </div>
              <span className="text-xs font-mono uppercase tracking-wider text-[#201a16]">
                Show &quot;Available for Work&quot; status pulse across site
              </span>
            </label>

            <div className="grid grid-cols-1 gap-4 pt-2">
              <div className="space-y-1.5">
                <label className="block text-[11px] font-mono uppercase tracking-wider text-[#7d6657]">
                  Availability Card Headline
                </label>
                <input
                  type="text"
                  value={settings.availability_headline}
                  onChange={(e) =>
                    setSettings((s) => ({
                      ...s,
                      availability_headline: e.target.value,
                    }))
                  }
                  placeholder="Available for Select Projects"
                  className="w-full px-3.5 py-2 rounded-xl border border-[#e8e2d9] bg-[#faf8f5] text-xs font-medium text-[#201a16] focus:outline-none focus:border-[#201a16]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-[11px] font-mono uppercase tracking-wider text-[#7d6657]">
                  Availability Card Description
                </label>
                <textarea
                  rows={2}
                  value={settings.availability_description}
                  onChange={(e) =>
                    setSettings((s) => ({
                      ...s,
                      availability_description: e.target.value,
                    }))
                  }
                  className="w-full px-3.5 py-2 rounded-xl border border-[#e8e2d9] bg-[#faf8f5] text-xs text-[#201a16] focus:outline-none focus:border-[#201a16] leading-relaxed resize-none"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── TAB 2: FOOTER & SOCIAL LINKS ── */}
      {activeTab === "footer" && (
        <div className="space-y-6">
          <div className="bg-white border border-[#e8e2d9] rounded-2xl p-5 sm:p-6 space-y-4 shadow-xs">
            <h2 className="text-xs font-mono uppercase tracking-wider font-semibold text-[#201a16]">
              Footer Content &amp; Inscriptions
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2 space-y-1.5">
                <label className="block text-[11px] font-mono uppercase tracking-wider text-[#7d6657]">
                  Footer Bio / Editorial Statement
                </label>
                <textarea
                  rows={2}
                  value={settings.footer_text}
                  onChange={(e) =>
                    setSettings((s) => ({ ...s, footer_text: e.target.value }))
                  }
                  className="w-full px-3.5 py-2 rounded-xl border border-[#e8e2d9] bg-[#faf8f5] text-xs text-[#201a16] focus:outline-none focus:border-[#201a16] leading-relaxed resize-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-[11px] font-mono uppercase tracking-wider text-[#7d6657]">
                  Footer Location &amp; Timezone Line
                </label>
                <input
                  type="text"
                  value={settings.footer_location}
                  onChange={(e) =>
                    setSettings((s) => ({ ...s, footer_location: e.target.value }))
                  }
                  placeholder="SF & Remote • Pacific Standard Time"
                  className="w-full px-3.5 py-2 rounded-xl border border-[#e8e2d9] bg-[#faf8f5] text-xs font-mono text-[#201a16] focus:outline-none focus:border-[#201a16]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-[11px] font-mono uppercase tracking-wider text-[#7d6657]">
                  Version Badge (Next to Brand Name)
                </label>
                <input
                  type="text"
                  value={settings.footer_version}
                  onChange={(e) =>
                    setSettings((s) => ({ ...s, footer_version: e.target.value }))
                  }
                  placeholder="v2.4"
                  className="w-full px-3.5 py-2 rounded-xl border border-[#e8e2d9] bg-[#faf8f5] text-xs font-mono text-[#201a16] focus:outline-none focus:border-[#201a16]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-[11px] font-mono uppercase tracking-wider text-[#7d6657]">
                  Bottom Copyright Suffix
                </label>
                <input
                  type="text"
                  value={settings.footer_copyright}
                  onChange={(e) =>
                    setSettings((s) => ({ ...s, footer_copyright: e.target.value }))
                  }
                  placeholder="All rights reserved. Editorial Minimalist Architecture."
                  className="w-full px-3.5 py-2 rounded-xl border border-[#e8e2d9] bg-[#faf8f5] text-xs text-[#201a16] focus:outline-none focus:border-[#201a16]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-[11px] font-mono uppercase tracking-wider text-[#7d6657]">
                  Bottom Right Tech Stack Credit
                </label>
                <input
                  type="text"
                  value={settings.footer_tech_stack}
                  onChange={(e) =>
                    setSettings((s) => ({
                      ...s,
                      footer_tech_stack: e.target.value,
                    }))
                  }
                  placeholder="Next.js 14 · Supabase · Tailwind"
                  className="w-full px-3.5 py-2 rounded-xl border border-[#e8e2d9] bg-[#faf8f5] text-xs font-mono text-[#201a16] focus:outline-none focus:border-[#201a16]"
                />
              </div>
            </div>
          </div>

          <div className="bg-white border border-[#e8e2d9] rounded-2xl p-5 sm:p-6 space-y-4 shadow-xs">
            <h2 className="text-xs font-mono uppercase tracking-wider font-semibold text-[#201a16]">
              Footer Social Links (Connect &amp; Signals)
            </h2>
            <p className="text-xs text-[#7d6657]">
              Leave any field blank to hide that social link in the public footer.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-[11px] font-mono uppercase tracking-wider text-[#7d6657]">
                  GitHub URL
                </label>
                <input
                  type="url"
                  value={socials.github || ""}
                  onChange={(e) =>
                    setSocials((s) => ({ ...s, github: e.target.value }))
                  }
                  placeholder="https://github.com/..."
                  className="w-full px-3.5 py-2 rounded-xl border border-[#e8e2d9] bg-[#faf8f5] text-xs font-mono text-[#201a16] focus:outline-none focus:border-[#201a16]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-[11px] font-mono uppercase tracking-wider text-[#7d6657]">
                  X / Twitter URL
                </label>
                <input
                  type="url"
                  value={socials.twitter || ""}
                  onChange={(e) =>
                    setSocials((s) => ({ ...s, twitter: e.target.value }))
                  }
                  placeholder="https://twitter.com/..."
                  className="w-full px-3.5 py-2 rounded-xl border border-[#e8e2d9] bg-[#faf8f5] text-xs font-mono text-[#201a16] focus:outline-none focus:border-[#201a16]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-[11px] font-mono uppercase tracking-wider text-[#7d6657]">
                  LinkedIn URL
                </label>
                <input
                  type="url"
                  value={socials.linkedin || ""}
                  onChange={(e) =>
                    setSocials((s) => ({ ...s, linkedin: e.target.value }))
                  }
                  placeholder="https://linkedin.com/in/..."
                  className="w-full px-3.5 py-2 rounded-xl border border-[#e8e2d9] bg-[#faf8f5] text-xs font-mono text-[#201a16] focus:outline-none focus:border-[#201a16]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-[11px] font-mono uppercase tracking-wider text-[#7d6657]">
                  Read.cv / External Portfolio URL
                </label>
                <input
                  type="url"
                  value={socials.readcv || ""}
                  onChange={(e) =>
                    setSocials((s) => ({ ...s, readcv: e.target.value }))
                  }
                  placeholder="https://read.cv/..."
                  className="w-full px-3.5 py-2 rounded-xl border border-[#e8e2d9] bg-[#faf8f5] text-xs font-mono text-[#201a16] focus:outline-none focus:border-[#201a16]"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── TAB 3: SEO & METADATA ── */}
      {activeTab === "seo" && (
        <div className="space-y-6">
          <div className="bg-white border border-[#e8e2d9] rounded-2xl p-5 sm:p-6 space-y-4 shadow-xs">
            <h2 className="text-xs font-mono uppercase tracking-wider font-semibold text-[#201a16]">
              SEO &amp; Open Graph Meta
            </h2>
            <div className="space-y-1.5">
              <label className="block text-[11px] font-mono uppercase tracking-wider text-[#7d6657]">
                Site Title Tag
              </label>
              <input
                type="text"
                value={settings.site_title}
                onChange={(e) =>
                  setSettings((s) => ({ ...s, site_title: e.target.value }))
                }
                className="w-full px-3.5 py-2 rounded-xl border border-[#e8e2d9] bg-[#faf8f5] text-xs font-medium text-[#201a16] focus:outline-none focus:border-[#201a16]"
              />
            </div>
            <div className="space-y-1.5">
              <label className="block text-[11px] font-mono uppercase tracking-wider text-[#7d6657]">
                Meta Description
              </label>
              <textarea
                rows={3}
                value={settings.meta_description}
                onChange={(e) =>
                  setSettings((s) => ({ ...s, meta_description: e.target.value }))
                }
                className="w-full px-3.5 py-2 rounded-xl border border-[#e8e2d9] bg-[#faf8f5] text-xs text-[#201a16] focus:outline-none focus:border-[#201a16] leading-relaxed resize-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-[11px] font-mono uppercase tracking-wider text-[#7d6657]">
                Index Keywords
              </label>
              <div className="flex flex-wrap gap-1.5 mb-2">
                {keywords.map((kw) => (
                  <span
                    key={kw}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#f4f0e8] border border-[#e8e2d9] text-xs text-[#201a16]"
                  >
                    {kw}
                    <button onClick={() => setKeywords(keywords.filter((k) => k !== kw))}>
                      <X className="w-3 h-3 text-[#7d6657] hover:text-red-500" />
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={kwInput}
                  onChange={(e) => setKwInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addKw())}
                  placeholder="Add keyword..."
                  className="flex-1 px-3.5 py-2 rounded-xl border border-[#e8e2d9] bg-[#faf8f5] text-xs text-[#201a16] focus:outline-none focus:border-[#201a16]"
                />
                <button
                  type="button"
                  onClick={addKw}
                  className="px-3 py-2 rounded-xl bg-[#faf8f5] border border-[#e8e2d9] text-[#7d6657] hover:bg-[#f4f0e8] text-xs font-medium"
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Save Button */}
      <div className="flex justify-end pb-8">
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#201a16] text-white text-xs font-mono font-medium hover:bg-[#362b25] transition-all disabled:opacity-50 shadow-sm"
        >
          {saving ? (
            <RotateCw className="w-3.5 h-3.5 animate-spin" />
          ) : saved ? (
            <Check className="w-3.5 h-3.5 text-emerald-400" />
          ) : (
            <Save className="w-3.5 h-3.5" />
          )}
          <span>{saving ? "Saving..." : saved ? "Synced to Frontend ✓" : "Save All Changes"}</span>
        </button>
      </div>
    </div>
  );
}
