/* eslint-disable @next/next/no-img-element */
import React from "react";
import Link from "next/link";
import { ArrowUpRight, ArrowRight, ChevronRight } from "lucide-react";
import { getProfile, getProjects, getBlogPosts, getSkills } from "@/lib/supabase/db";
import { formatDate, hasValidImage } from "@/lib/utils";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SkillLogo } from "@/components/ui/SkillLogo";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function HomePage() {
  const [profile, featuredProjects, latestPosts, skills] = await Promise.all([
    getProfile(),
    getProjects({ featuredOnly: true, publishedOnly: true }),
    getBlogPosts({ publishedOnly: true }),
    getSkills(),
  ]);

  const roles = profile.tagline
    ? profile.tagline
        .split(/[,&·]+/)
        .map((r) => r.trim())
        .filter(Boolean)
    : ["Software Engineer", "AI Engineer", "Graphic Designer"];

  const metrics = profile.metrics;
  const displayedProjects = featuredProjects.slice(0, 4);
  const displayedPosts = latestPosts.slice(0, 3);

  return (
    <div className="bg-white">

      {/* ── HERO SECTION ── */}
      <section className="max-w-6xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

          {/* Left: Text Content */}
          <div className="lg:col-span-7 space-y-8">
            {/* Name */}
            <ScrollReveal direction="up" delay={140}>
              <div>
                <h1 className="font-serif text-7xl md:text-8xl lg:text-9xl font-medium tracking-tight text-[#201a16] leading-none">
                  {profile.full_name.split("").map((char, i) => (
                    <span key={i} className="inline-block">{char}</span>
                  ))}
                </h1>
                {/* Role tagline */}
                <div className="mt-5 flex flex-wrap gap-2">
                  {roles.map((role, i) => (
                    <React.Fragment key={role}>
                      <span className="text-base md:text-lg font-serif italic text-[#634f43]">
                        {role}
                      </span>
                      {i < roles.length - 1 && (
                        <span className="text-[#c7b49e] text-base md:text-lg self-center">·</span>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            {/* Bio */}
            <ScrollReveal direction="up" delay={230}>
              <p className="text-base md:text-lg text-[#634f43] leading-relaxed max-w-lg">
                {profile.bio}
              </p>
            </ScrollReveal>

            {/* CTA Buttons */}
            <ScrollReveal direction="up" delay={320}>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/projects"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#201a16] text-[#faf8f5] text-sm font-medium tracking-wide hover:bg-[#362b25] hover:-translate-y-0.5 transition-all shadow-subtle hover:shadow-hover"
                >
                  <span>Explore Selected Work</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[#e8e2d9] text-[#201a16] text-sm font-medium tracking-wide hover:bg-[#faf8f5] hover:-translate-y-0.5 transition-all"
                >
                  <span>Initiate a Conversation</span>
                  <ChevronRight className="w-4 h-4 text-[#7d6657]" />
                </Link>
              </div>
            </ScrollReveal>

            {/* Metrics Row */}
            <ScrollReveal direction="up" delay={400}>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-4 border-t border-[#f0ece4]">
                {[
                  { value: `${metrics.years_experience}+`, label: "Years of Practice" },
                  { value: `${metrics.projects_completed}`, label: "Projects Shipped" },
                  { value: `${metrics.models_deployed}`, label: "AI Models Deployed" },
                  { value: `${metrics.design_awards}`, label: "Design Awards" },
                ].map((m) => (
                  <div key={m.label} className="space-y-1">
                    <p className="font-serif text-3xl font-medium text-[#201a16]">{m.value}</p>
                    <p className="text-[11px] tracking-wider uppercase text-[#7d6657]">{m.label}</p>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>

          {/* Right: Arched Portrait */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <ScrollReveal direction="scale" delay={200} duration={950}>
              <div className="relative animate-float-slow">
                {/* Decorative offset layer */}
                <div className="absolute inset-0 translate-x-3 translate-y-3 rounded-[160px_160px_24px_24px] bg-[#f4f0e8] border border-[#e8e2d9]" />
                {/* Main portrait frame */}
                <div className="relative w-72 h-96 md:w-80 md:h-[440px] rounded-[160px_160px_24px_24px] overflow-hidden bg-[#eae2d5] border border-[#e8e2d9]">
                  {hasValidImage(profile.hero_photo_url) ? (
                    <img
                      src={profile.hero_photo_url}
                      alt={`${profile.full_name} — Portrait`}
                      className="w-full h-full object-cover object-top"
                    />
                  ) : (
                    /* Editorial Placeholder */
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-[#f4f0e8]">
                      <div className="w-24 h-24 rounded-full bg-[#e8e2d9] border border-[#d5cbbe] flex items-center justify-center shadow-xs">
                        <span className="font-serif text-5xl text-[#7d6657] font-medium">
                          {profile.full_name.charAt(0)}
                        </span>
                      </div>
                      <div className="text-center space-y-1 px-6">
                        <p className="text-xs font-mono text-[#7d6657] tracking-wider uppercase">Portrait</p>
                        <p className="text-[10px] text-[#a9937c] leading-relaxed">Upload in Studio CMS (/admin)</p>
                      </div>
                      {/* Decorative lines */}
                      <div className="absolute bottom-8 left-0 right-0 flex flex-col items-center gap-2 opacity-30">
                        <div className="w-16 h-px bg-[#c7b49e]" />
                        <div className="w-10 h-px bg-[#c7b49e]" />
                        <div className="w-6 h-px bg-[#c7b49e]" />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── SELECTED WORK ── */}
      <section className="bg-[#faf8f5] border-y border-[#e8e2d9]">
        <div className="max-w-6xl mx-auto px-6 py-20 md:py-24">
          <ScrollReveal direction="up">
            <div className="flex items-end justify-between mb-12">
              <div className="space-y-2">
                <span className="text-xs font-mono uppercase tracking-wider text-[#7d6657]">
                  Selected Architecture &amp; Systems
                </span>
                <h2 className="font-serif text-4xl md:text-5xl font-medium tracking-tight text-[#201a16]">
                  Featured Work
                </h2>
              </div>
              <Link
                href="/projects"
                className="hidden sm:inline-flex items-center gap-2 text-sm font-medium text-[#634f43] hover:text-[#201a16] transition-colors group"
              >
                <span>All Projects</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {displayedProjects.map((project, index) => (
              <ScrollReveal key={project.id} direction="up" delay={index * 110}>
                <Link
                  href={`/projects/${project.slug}`}
                  className="block h-full group relative bg-white border border-[#e8e2d9] rounded-2xl overflow-hidden hover:border-[#d5cbbe] hover:shadow-hover editorial-card-hover"
                >
                  {/* Cover Image / Colored Block */}
                  <div
                    className={`h-52 relative flex items-center justify-center overflow-hidden ${
                      index % 4 === 0
                        ? "bg-[#201a16]"
                        : index % 4 === 1
                        ? "bg-[#f4f0e8]"
                        : index % 4 === 2
                        ? "bg-[#eae2d5]"
                        : "bg-[#faf8f5]"
                    }`}
                  >
                    {hasValidImage(project.cover_image) ? (
                      <>
                        <img
                          src={project.cover_image}
                          alt={project.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                        <span className="absolute bottom-3 left-4 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-sm text-[10px] font-mono uppercase tracking-wider text-[#201a16]">
                          {project.category}
                        </span>
                      </>
                    ) : (
                      <div className="text-center space-y-2 px-6">
                        <span
                          className="text-4xl font-serif font-medium tracking-tight"
                          style={{ color: index % 4 === 0 ? "#7d6657" : "#201a16" }}
                        >
                          {String(project.order_index).padStart(2, "0")}
                        </span>
                        <p
                          className="text-xs font-mono tracking-wider uppercase"
                          style={{ color: index % 4 === 0 ? "#a9937c" : "#7d6657" }}
                        >
                          {project.category}
                        </p>
                      </div>
                    )}
                    <div className="absolute top-4 right-4">
                      <ArrowUpRight
                        className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-all -translate-y-1 translate-x-1 group-hover:translate-y-0 group-hover:translate-x-0"
                        style={{ color: index % 4 === 0 ? "#a9937c" : "#7d6657" }}
                      />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5 space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="font-serif text-lg font-medium text-[#201a16] leading-tight line-clamp-2">
                        {project.title}
                      </h3>
                      {project.year && (
                        <span className="text-xs font-mono text-[#7d6657] shrink-0 mt-0.5">{project.year}</span>
                      )}
                    </div>
                    <p className="text-sm text-[#634f43] leading-relaxed line-clamp-2">{project.summary}</p>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {project.tags.slice(0, 4).map((tag) => (
                        <span key={tag} className="editorial-tag">{tag}</span>
                      ))}
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>

          <div className="sm:hidden mt-8 text-center">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#e8e2d9] text-sm text-[#201a16] hover:bg-white transition-colors"
            >
              <span>View All Projects</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── ABOUT / PHILOSOPHY ── */}
      <section className="max-w-6xl mx-auto px-6 py-20 md:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          <ScrollReveal direction="right">
            <div className="space-y-6">
              <span className="text-xs font-mono uppercase tracking-wider text-[#7d6657]">Engineering Philosophy</span>
              <h2 className="font-serif text-4xl md:text-5xl font-medium tracking-tight text-[#201a16] leading-tight">
                Engineering with Aesthetic Conviction
              </h2>
              <p className="text-base text-[#634f43] leading-relaxed">
                The finest systems are not merely functional — they are architecturally honest, visually deliberate, and cognitively humane. I build at the intersection of machine precision and human nuance.
              </p>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-sm font-medium text-[#201a16] border-b border-[#201a16] pb-px hover:text-[#634f43] hover:border-[#634f43] transition-colors group"
              >
                <span>Read my full philosophy</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-2 gap-4">
            {[
              {
                title: "Systems First",
                body: "Every interface is the product of underlying architecture. Design the system before designing the screen.",
                index: "01",
              },
              {
                title: "Aesthetic Rigor",
                body: "Visual decisions are engineering decisions. Spacing, rhythm, and contrast have measurable cognitive impact.",
                index: "02",
              },
              {
                title: "AI-Native",
                body: "Intelligence should be embedded from the first architectural decision, not bolted on as an afterthought.",
                index: "03",
              },
              {
                title: "Craft Over Speed",
                body: "A product built with restraint and precision outlasts one built with velocity and shortcuts.",
                index: "04",
              },
            ].map((card, i) => (
              <ScrollReveal key={card.index} direction="up" delay={i * 100}>
                <div className="h-full bg-[#faf8f5] border border-[#e8e2d9] rounded-2xl p-5 space-y-3 editorial-card-hover">
                  <span className="text-xs font-mono text-[#c7b49e]">{card.index}</span>
                  <h3 className="font-serif text-base font-medium text-[#201a16]">{card.title}</h3>
                  <p className="text-xs text-[#634f43] leading-relaxed">{card.body}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* ── SKILLS & LANGUAGES STRIP ── */}
        {skills.length > 0 && (
          <ScrollReveal direction="up" delay={150}>
            <div className="mt-16 pt-12 border-t border-[#f0ece4] space-y-5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-wider text-[#7d6657]">
                  Languages, Frameworks &amp; Technical Stack
                </span>
                <Link
                  href="/about"
                  className="text-xs font-mono text-[#7d6657] hover:text-[#201a16] transition-colors"
                >
                  Full Skill Matrix &rarr;
                </Link>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {skills.map((skill) => (
                  <div
                    key={skill.id}
                    className="inline-flex items-center gap-2.5 pl-1.5 pr-3.5 py-1.5 rounded-2xl bg-[#faf8f5] border border-[#e8e2d9] hover:border-[#d5cbbe] transition-all editorial-card-hover"
                  >
                    <SkillLogo
                      name={skill.name}
                      category={skill.category}
                      className="w-7 h-7 rounded-lg"
                    />
                    <span className="text-xs font-medium text-[#201a16]">
                      {skill.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        )}
      </section>

      {/* ── WRITING / BLOG ── */}
      {displayedPosts.length > 0 && (
        <section className="bg-[#faf8f5] border-y border-[#e8e2d9]">
          <div className="max-w-6xl mx-auto px-6 py-20 md:py-24">
            <ScrollReveal direction="up">
              <div className="flex items-end justify-between mb-12">
                <div className="space-y-2">
                  <span className="text-xs font-mono uppercase tracking-wider text-[#7d6657]">
                    Technical Writing &amp; Research
                  </span>
                  <h2 className="font-serif text-4xl md:text-5xl font-medium tracking-tight text-[#201a16]">
                    Latest Writing
                  </h2>
                </div>
                <Link
                  href="/blog"
                  className="hidden sm:inline-flex items-center gap-2 text-sm font-medium text-[#634f43] hover:text-[#201a16] transition-colors group"
                >
                  <span>All Articles</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </ScrollReveal>

            <div className="space-y-0 divide-y divide-[#e8e2d9]">
              {displayedPosts.map((post, i) => (
                <ScrollReveal key={post.id} direction="up" delay={i * 100}>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="group flex flex-col sm:flex-row items-start justify-between gap-6 py-8 hover:bg-transparent transition-colors"
                  >
                    {hasValidImage(post.cover_image) && (
                      <div className="w-full sm:w-44 h-36 sm:h-28 rounded-xl overflow-hidden border border-[#e8e2d9] bg-[#f4f0e8] shrink-0">
                        <img
                          src={post.cover_image}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}
                    <div className="flex-1 min-w-0 space-y-2">
                      <div className="flex flex-wrap gap-1.5">
                        {post.tags.slice(0, 3).map((tag) => (
                          <span key={tag} className="editorial-tag">{tag}</span>
                        ))}
                      </div>
                      <h3 className="font-serif text-xl md:text-2xl font-medium text-[#201a16] group-hover:text-[#4e3e35] transition-colors leading-tight">
                        {post.title}
                      </h3>
                      <p className="text-sm text-[#634f43] leading-relaxed line-clamp-2">{post.excerpt}</p>
                      <div className="flex items-center gap-3 text-xs font-mono text-[#7d6657]">
                        {post.published_at && <span>{formatDate(post.published_at)}</span>}
                        <span>·</span>
                        <span>{post.reading_time}</span>
                      </div>
                    </div>
                    <ArrowUpRight className="hidden sm:block w-5 h-5 text-[#c7b49e] group-hover:text-[#7d6657] shrink-0 mt-1 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── CONTACT CTA ── */}
      <section className="max-w-6xl mx-auto px-6 py-20 md:py-24">
        <ScrollReveal direction="scale" duration={850}>
          <div className="bg-[#201a16] rounded-3xl px-8 md:px-14 py-14 md:py-16 text-center space-y-6">
            <span className="inline-block text-xs font-mono uppercase tracking-widest text-[#7d6657]">
              Begin a Collaboration
            </span>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium text-white tracking-tight leading-tight">
              Initiate a Conversation
            </h2>
            <p className="text-base text-[#a9937c] max-w-md mx-auto leading-relaxed">
              Whether you have a complex technical challenge, a design vision, or an AI architecture to build — let&apos;s discuss it.
            </p>
            <div className="flex flex-wrap gap-3 justify-center pt-2">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white text-[#201a16] text-sm font-medium tracking-wide hover:bg-[#faf8f5] hover:-translate-y-0.5 transition-all shadow-hover"
              >
                <span>Start a Project</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
              <a
                href={`mailto:${profile.email}`}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-[#362b25] text-[#a9937c] text-sm font-medium tracking-wide hover:border-[#4e3e35] hover:text-white transition-all"
              >
                <span>{profile.email}</span>
              </a>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}
