"use client";

import React, { useState, useEffect } from "react";
import { Save, X, Check, RotateCw, Mail, LayoutTemplate, Globe } from "lucide-react";

type SettingsTab = "contact" | "footer" | "seo";

export default function AdminSettingsPage() {
  const [activeTab, setActiveTab] = useState<SettingsTab>("contact");

  const [settings, setSettings] = useState({
    site_title: "Hanslay — Software Engineer, AI Engineer & Graphic Designer",
    site_title_fr: "Hanslay — Ingénieur Logiciel, Ingénieur IA & Designer Graphique",
    meta_description:
      "Personal portfolio and technical writing of Hanslay. Exploring autonomous AI architectures, distributed systems, and editorial typography.",
    meta_description_fr:
      "Portfolio personnel et écrits techniques de Hanslay.",
    contact_email: "hanslay@atelier.dev",
    cal_com_url: "https://cal.com/hanslay/30min",
    footer_text:
      "Crafted with architectural precision, cognitive depth, and typographic conviction.",
    footer_text_fr:
      "Conçu avec précision architecturale, profondeur cognitive et conviction typographique.",
    available_for_work: true,
    // Contact Page fields
    contact_eyebrow: "Open for Work",
    contact_eyebrow_fr: "Disponible pour Projets",
    contact_heading: "Let's Build Together",
    contact_heading_fr: "Construisons Ensemble",
    contact_description:
      "Whether you have a complex AI system to architect, a full-stack product to build, or a design identity to create — every great collaboration starts with a single message.",
    contact_description_fr:
      "Que vous ayez un système d'IA complexe à architecturer, un produit full-stack à bâtir ou une identité visuelle à créer — chaque grande collaboration commence par un message.",
    contact_phone: "",
    contact_location: "San Francisco & Remote",
    response_time: "Within 24–48 hours",
    response_time_fr: "Sous 24 à 48 heures",
    availability_headline: "Available for Select Projects",
    availability_headline_fr: "Disponible pour des Missions Sélectionnées",
    availability_description:
      "I'm taking on new collaborations for Q4 2024 — AI architecture, full-stack builds, and editorial design commissions.",
    availability_description_fr:
      "J'accepte de nouvelles collaborations — architecture IA, développement full-stack et direction artistique éditoriale.",
    // Footer fields
    footer_version: "v2.4",
    footer_location: "SF & Remote • Pacific Standard Time",
    footer_copyright: "All rights reserved. Editorial Minimalist Architecture.",
    footer_copyright_fr: "Tous droits réservés. Architecture Minimaliste Éditoriale.",
    footer_tech_stack: "Next.js 14 · Supabase · Tailwind",
  });
  const [contentLang, setContentLang] = useState<"en" | "fr">("en");

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
                  Eyebrow Badge Text ({contentLang.toUpperCase()})
                </label>
                <input
                  type="text"
                  value={contentLang === "en" ? settings.contact_eyebrow : (settings.contact_eyebrow_fr || "")}
                  onChange={(e) =>
                    setSettings((s) =>
                      contentLang === "en"
                        ? { ...s, contact_eyebrow: e.target.value }
                        : { ...s, contact_eyebrow_fr: e.target.value }
                    )
                  }
                  placeholder={contentLang === "en" ? "Open for Work" : "Disponible pour Projets"}
                  className="w-full px-3.5 py-2 rounded-xl border border-[#e8e2d9] bg-[#faf8f5] text-xs text-[#201a16] focus:outline-none focus:border-[#201a16]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-[11px] font-mono uppercase tracking-wider text-[#7d6657]">
                  Main Page Heading ({contentLang.toUpperCase()})
                </label>
                <input
                  type="text"
                  value={contentLang === "en" ? settings.contact_heading : (settings.contact_heading_fr || "")}
                  onChange={(e) =>
                    setSettings((s) =>
                      contentLang === "en"
                        ? { ...s, contact_heading: e.target.value }
                        : { ...s, contact_heading_fr: e.target.value }
                    )
                  }
                  placeholder={contentLang === "en" ? "Let's Build Together" : "Construisons Ensemble"}
                  className="w-full px-3.5 py-2 rounded-xl border border-[#e8e2d9] bg-[#faf8f5] text-xs font-medium text-[#201a16] focus:outline-none focus:border-[#201a16]"
                />
              </div>

              <div className="sm:col-span-2 space-y-1.5">
                <label className="block text-[11px] font-mono uppercase tracking-wider text-[#7d6657]">
                  Introductory Paragraph ({contentLang.toUpperCase()})
                </label>
                <textarea
                  rows={3}
                  value={contentLang === "en" ? settings.contact_description : (settings.contact_description_fr || "")}
                  onChange={(e) =>
                    setSettings((s) =>
                      contentLang === "en"
                        ? { ...s, contact_description: e.target.value }
                        : { ...s, contact_description_fr: e.target.value }
                    )
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
                  Response Time Estimate ({contentLang.toUpperCase()})
                </label>
                <input
                  type="text"
                  value={contentLang === "en" ? settings.response_time : (settings.response_time_fr || "")}
                  onChange={(e) =>
                    setSettings((s) =>
                      contentLang === "en"
                        ? { ...s, response_time: e.target.value }
                        : { ...s, response_time_fr: e.target.value }
                    )
                  }
                  placeholder={contentLang === "en" ? "Within 24–48 hours" : "Sous 24 à 48 heures"}
                  className="w-full px-3.5 py-2 rounded-xl border border-[#e8e2d9] bg-[#faf8f5] text-xs text-[#201a16] focus:outline-none focus:border-[#201a16]"
                />
              </div>

              <div className="sm:col-span-2 space-y-1.5 pt-2 border-t border-[#f0ece4]">
                <label className="block text-[11px] font-mono uppercase tracking-wider text-[#7d6657]">
                  Cal.com Booking Link (Used for Navbar, Home CTA &amp; Contact Page Embed)
                </label>
                <input
                  type="text"
                  value={settings.cal_com_url || ""}
                  onChange={(e) =>
                    setSettings((s) => ({ ...s, cal_com_url: e.target.value }))
                  }
                  placeholder="https://cal.com/hanslay/30min"
                  className="w-full px-3.5 py-2 rounded-xl border border-[#e8e2d9] bg-[#faf8f5] text-xs font-mono text-[#201a16] focus:outline-none focus:border-[#201a16]"
                />
                <p className="text-[11px] text-[#7d6657]">
                  Enter your full Cal.com link (e.g. <code>https://cal.com/username/30min</code>) or username/slug.
                </p>
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
                  Availability Card Headline ({contentLang.toUpperCase()})
                </label>
                <input
                  type="text"
                  value={contentLang === "en" ? settings.availability_headline : (settings.availability_headline_fr || "")}
                  onChange={(e) =>
                    setSettings((s) =>
                      contentLang === "en"
                        ? { ...s, availability_headline: e.target.value }
                        : { ...s, availability_headline_fr: e.target.value }
                    )
                  }
                  placeholder="Available for Select Projects"
                  className="w-full px-3.5 py-2 rounded-xl border border-[#e8e2d9] bg-[#faf8f5] text-xs font-medium text-[#201a16] focus:outline-none focus:border-[#201a16]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-[11px] font-mono uppercase tracking-wider text-[#7d6657]">
                  Availability Card Description ({contentLang.toUpperCase()})
                </label>
                <textarea
                  rows={2}
                  value={contentLang === "en" ? settings.availability_description : (settings.availability_description_fr || "")}
                  onChange={(e) =>
                    setSettings((s) =>
                      contentLang === "en"
                        ? { ...s, availability_description: e.target.value }
                        : { ...s, availability_description_fr: e.target.value }
                    )
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
                  Footer Bio / Editorial Statement ({contentLang.toUpperCase()})
                </label>
                <textarea
                  rows={2}
                  value={contentLang === "en" ? settings.footer_text : (settings.footer_text_fr || "")}
                  onChange={(e) =>
                    setSettings((s) =>
                      contentLang === "en"
                        ? { ...s, footer_text: e.target.value }
                        : { ...s, footer_text_fr: e.target.value }
                    )
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
                Site Title Tag ({contentLang.toUpperCase()})
              </label>
              <input
                type="text"
                value={contentLang === "en" ? settings.site_title : (settings.site_title_fr || "")}
                onChange={(e) =>
                  setSettings((s) =>
                    contentLang === "en"
                      ? { ...s, site_title: e.target.value }
                      : { ...s, site_title_fr: e.target.value }
                  )
                }
                className="w-full px-3.5 py-2 rounded-xl border border-[#e8e2d9] bg-[#faf8f5] text-xs font-medium text-[#201a16] focus:outline-none focus:border-[#201a16]"
              />
            </div>
            <div className="space-y-1.5">
              <label className="block text-[11px] font-mono uppercase tracking-wider text-[#7d6657]">
                Meta Description ({contentLang.toUpperCase()})
              </label>
              <textarea
                rows={3}
                value={contentLang === "en" ? settings.meta_description : (settings.meta_description_fr || "")}
                onChange={(e) =>
                  setSettings((s) =>
                    contentLang === "en"
                      ? { ...s, meta_description: e.target.value }
                      : { ...s, meta_description_fr: e.target.value }
                  )
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
