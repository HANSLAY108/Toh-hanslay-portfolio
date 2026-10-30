/* eslint-disable @next/next/no-img-element */
import React from "react";
import Link from "next/link";
import { ArrowUpRight, Download } from "lucide-react";
import { getProfile, getSkills, getServices } from "@/lib/supabase/db";
import { hasValidImage } from "@/lib/utils";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SkillLogo } from "@/components/ui/SkillLogo";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title: "About — Hanslay",
  description:
    "The engineering philosophy, background, and skill architecture of Hanslay — software engineer, AI architect, and design director.",
};

export default async function AboutPage() {
  const [profile, skills, services] = await Promise.all([
    getProfile(),
    getSkills(),
    getServices(),
  ]);

  const SKILL_CATEGORIES = [
    "Core & Systems Architecture",
    "Artificial Intelligence & ML",
    "Design & Creative Direction",
    "Cloud & Tooling",
  ];

  const groupedSkills = SKILL_CATEGORIES.map((cat) => ({
    category: cat,
    skills: skills.filter((s) => s.category === cat),
  }));

  return (
    <div className="bg-white min-h-screen">
      {/* ── PAGE HERO ── */}
      <section className="max-w-6xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <ScrollReveal direction="up" delay={50}>
              <span className="text-xs font-mono uppercase tracking-wider text-[#7d6657]">
                About / Engineering Philosophy
              </span>
            </ScrollReveal>
            <ScrollReveal direction="up" delay={140}>
              <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight text-[#201a16] leading-tight">
                The Architecture of Practice
              </h1>
            </ScrollReveal>
            <ScrollReveal direction="up" delay={230}>
              <p className="text-lg text-[#634f43] leading-relaxed max-w-xl">
                {profile.bio}
              </p>
            </ScrollReveal>
            <ScrollReveal direction="up" delay={320}>
              <div className="flex flex-wrap gap-3">
                {profile.cv_url && (
                  <a
                    href={profile.cv_url}
                    download
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#201a16] text-[#faf8f5] text-sm font-medium hover:bg-[#362b25] hover:-translate-y-0.5 transition-all"
                  >
                    <Download className="w-4 h-4" />
                    Download CV
                  </a>
                )}
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#e8e2d9] text-sm font-medium text-[#201a16] hover:bg-[#faf8f5] hover:-translate-y-0.5 transition-all"
                >
                  Initiate a Conversation
                  <ArrowUpRight className="w-4 h-4 text-[#7d6657]" />
                </Link>
              </div>
            </ScrollReveal>
          </div>

          {/* Portrait */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <ScrollReveal direction="scale" delay={180} duration={900}>
              <div className="relative animate-float-slow">
                <div className="absolute inset-0 translate-x-3 translate-y-3 rounded-[120px_120px_20px_20px] bg-[#f4f0e8] border border-[#e8e2d9]" />
                <div className="relative w-64 h-80 md:w-72 md:h-96 rounded-[120px_120px_20px_20px] overflow-hidden bg-[#eae2d5] border border-[#e8e2d9]">
                  {hasValidImage(profile.hero_photo_url) ? (
                    <img
                      src={profile.hero_photo_url}
                      alt={`${profile.full_name} — Portrait`}
                      className="w-full h-full object-cover object-top"
                    />
                  ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                      <div className="w-20 h-20 rounded-full bg-[#e8e2d9] flex items-center justify-center">
                        <span className="font-serif text-4xl text-[#7d6657]">
                          {profile.full_name.charAt(0)}
                        </span>
                      </div>
                      <p className="text-xs font-mono text-[#7d6657]">{profile.location}</p>
                    </div>
                  )}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── METRICS ── */}
      <section className="bg-[#faf8f5] border-y border-[#e8e2d9]">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: `${profile.metrics.years_experience}+`, label: "Years Engineering" },
              { value: `${profile.metrics.projects_completed}`, label: "Projects Delivered" },
              { value: `${profile.metrics.models_deployed}`, label: "AI Models Deployed" },
              { value: `${profile.metrics.design_awards}`, label: "Design Recognitions" },
            ].map((m, i) => (
              <ScrollReveal key={m.label} direction="up" delay={i * 90}>
                <div className="text-center space-y-1">
                  <p className="font-serif text-4xl font-medium text-[#201a16]">{m.value}</p>
                  <p className="text-xs tracking-wider uppercase text-[#7d6657]">{m.label}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── SKILLS MATRIX ── */}
      <section className="max-w-6xl mx-auto px-6 py-20 md:py-24">
        <ScrollReveal direction="up">
          <div className="mb-12 space-y-2">
            <span className="text-xs font-mono uppercase tracking-wider text-[#7d6657]">
              Competency Architecture
            </span>
            <h2 className="font-serif text-4xl md:text-5xl font-medium tracking-tight text-[#201a16]">
              Technical Skill Matrix
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {groupedSkills.map(({ category, skills: catSkills }, i) => (
            <ScrollReveal key={category} direction="up" delay={i * 110}>
              <div className="h-full bg-[#faf8f5] border border-[#e8e2d9] rounded-2xl overflow-hidden editorial-card-hover">
                <div className="px-5 py-3 bg-[#f4f0e8] border-b border-[#e8e2d9]">
                  <h3 className="text-xs font-mono uppercase tracking-wider text-[#7d6657]">
                    {category}
                  </h3>
                </div>
                <div className="p-5 space-y-3.5">
                  {catSkills.map((skill) => (
                    <div key={skill.id} className="flex items-start gap-3.5">
                      <SkillLogo name={skill.name} category={skill.category} className="mt-0.5" />
                      <div className="space-y-1 min-w-0 flex-1">
                        <p className="text-sm font-medium text-[#201a16]">{skill.name}</p>
                        {skill.proficiency_notes && (
                          <p className="text-xs text-[#7d6657] leading-relaxed">
                            {skill.proficiency_notes}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section className="bg-[#faf8f5] border-y border-[#e8e2d9]">
        <div className="max-w-6xl mx-auto px-6 py-20 md:py-24">
          <ScrollReveal direction="up">
            <div className="mb-12 space-y-2">
              <span className="text-xs font-mono uppercase tracking-wider text-[#7d6657]">
                Client Offerings
              </span>
              <h2 className="font-serif text-4xl md:text-5xl font-medium tracking-tight text-[#201a16]">
                Services &amp; Disciplines
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {services.map((service, i) => (
              <ScrollReveal key={service.id} direction="up" delay={i * 120}>
                <div className="h-full bg-white border border-[#e8e2d9] rounded-2xl p-6 space-y-4 editorial-card-hover">
                  <span className="text-xs font-mono text-[#c7b49e]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-serif text-xl font-medium text-[#201a16]">
                    {service.title}
                  </h3>
                  <p className="text-sm text-[#634f43] leading-relaxed">
                    {service.description}
                  </p>
                  <ul className="space-y-2 pt-2">
                    {service.deliverables.map((d) => (
                      <li key={d} className="flex items-start gap-2 text-xs text-[#634f43]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#c7b49e] mt-1.5 shrink-0" />
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="max-w-6xl mx-auto px-6 py-20 text-center">
        <ScrollReveal direction="up">
          <div className="max-w-xl mx-auto space-y-6">
            <h2 className="font-serif text-4xl md:text-5xl font-medium text-[#201a16]">
              Start a Collaboration
            </h2>
            <p className="text-[#634f43] leading-relaxed">
              Whether it&apos;s a complex system to architect, a model to train, or an interface to craft — I build with precision and intention.
            </p>
            <div className="flex gap-3 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#201a16] text-[#faf8f5] text-sm font-medium hover:bg-[#362b25] hover:-translate-y-0.5 transition-all"
              >
                Get in Touch
                <ArrowUpRight className="w-4 h-4" />
              </Link>
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[#e8e2d9] text-sm font-medium text-[#201a16] hover:bg-[#faf8f5] hover:-translate-y-0.5 transition-all"
              >
                View Work
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}
