/* eslint-disable @next/next/no-img-element */
import React from "react";
import Link from "next/link";
import { ArrowUpRight, ArrowRight, ChevronRight } from "lucide-react";
import {
  BlogPost,
  Locale,
  Profile,
  Project,
  SiteSettings,
  Skill,
} from "@/types/database";
import { formatDate, hasValidImage } from "@/lib/utils";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SkillLogo } from "@/components/ui/SkillLogo";
import { FeaturedProjectsSection } from "@/components/projects/FeaturedProjectsSection";
import { CalBookingButton } from "@/components/booking/CalBookingModal";
import { getDictionary, localizeField } from "@/lib/i18n/dictionaries";

interface HomeViewProps {
  profile: Profile;
  featuredProjects: Project[];
  latestPosts: BlogPost[];
  skills: Skill[];
  settings: SiteSettings;
  locale: Locale;
  basePath: string;
}

export function HomeView({
  profile,
  featuredProjects,
  latestPosts,
  skills,
  settings,
  locale,
  basePath,
}: HomeViewProps) {
  const dict = getDictionary(locale);
  const taglineText = localizeField(profile, "tagline", locale);
  const bioText = localizeField(profile, "bio", locale);

  const roles = taglineText
    ? taglineText
        .split(/[,&·]+/)
        .map((r) => r.trim())
        .filter(Boolean)
    : ["Software Engineer", "AI Engineer", "Graphic Designer"];

  const metrics = profile.metrics;
  const displayedPosts = latestPosts.slice(0, 3);

  const philosophyCards =
    locale === "fr"
      ? [
          {
            title: "Architecture d'Abord",
            body: "Chaque interface est le produit de son architecture sous-jacente. Concevoir le système avant de dessiner l'écran.",
            index: "01",
          },
          {
            title: "Rigueur Esthétique",
            body: "Les choix visuels sont des décisions d'ingénierie. L'espacement, le rythme et le contraste ont un impact cognitif mesurable.",
            index: "02",
          },
          {
            title: "IA Native",
            body: "L'intelligence artificielle doit être intégrée dès la première décision d'architecture, et non ajoutée après coup.",
            index: "03",
          },
          {
            title: "L'Art avant la Vitesse",
            body: "Un produit conçu avec retenue et précision traverse le temps bien mieux qu'un produit assemblé dans la précipitation.",
            index: "04",
          },
        ]
      : [
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
        ];

  return (
    <div className="bg-white">
      {/* ── HERO SECTION ── */}
      <section className="max-w-6xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left: Text Content */}
          <div className="lg:col-span-7 space-y-8">
            <ScrollReveal direction="up" delay={140}>
              <div>
                <h1 className="font-serif text-7xl md:text-8xl lg:text-9xl font-medium tracking-tight text-[#201a16] leading-none">
                  {profile.full_name.split("").map((char, i) => (
                    <span key={i} className="inline-block">
                      {char}
                    </span>
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
                        <span className="text-[#c7b49e] text-base md:text-lg self-center">
                          ·
                        </span>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            {/* Bio */}
            <ScrollReveal direction="up" delay={230}>
              <p className="text-base md:text-lg text-[#634f43] leading-relaxed max-w-lg">
                {bioText}
              </p>
            </ScrollReveal>

            {/* CTA Buttons */}
            <ScrollReveal direction="up" delay={320}>
              <div className="flex flex-wrap gap-3">
                <Link
                  href={`${basePath}/projects`}
                  data-analytics-event="cta_click"
                  data-analytics-location="hero_view_work"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#201a16] text-[#faf8f5] text-sm font-medium tracking-wide hover:bg-[#362b25] hover:-translate-y-0.5 transition-all shadow-subtle hover:shadow-hover"
                >
                  <span>{dict.home.viewWork}</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
                <CalBookingButton
                  calUrl={settings.cal_com_url}
                  label={dict.home.bookCall}
                  variant="outline"
                  locationTag="hero_book_call"
                />
                <Link
                  href={`${basePath}/contact`}
                  data-analytics-event="cta_click"
                  data-analytics-location="hero_contact"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[#e8e2d9] text-[#201a16] text-sm font-medium tracking-wide hover:bg-[#faf8f5] hover:-translate-y-0.5 transition-all"
                >
                  <span>{dict.home.startConversation}</span>
                  <ChevronRight className="w-4 h-4 text-[#7d6657]" />
                </Link>
              </div>
            </ScrollReveal>

            {/* Metrics Row */}
            <ScrollReveal direction="up" delay={400}>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-4 border-t border-[#f0ece4]">
                {[
                  {
                    value: `${metrics.years_experience}+`,
                    label: dict.home.yearsExp,
                  },
                  {
                    value: `${metrics.projects_completed}`,
                    label: dict.home.projectsShipped,
                  },
                  {
                    value: `${metrics.models_deployed}`,
                    label: dict.home.modelsDeployed,
                  },
                  {
                    value: `${metrics.design_awards}`,
                    label: dict.home.designAwards,
                  },
                ].map((m) => (
                  <div key={m.label} className="space-y-1">
                    <p className="font-serif text-3xl font-medium text-[#201a16]">
                      {m.value}
                    </p>
                    <p className="text-[11px] tracking-wider uppercase text-[#7d6657]">
                      {m.label}
                    </p>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>

          {/* Right: Arched Portrait */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <ScrollReveal direction="scale" delay={200} duration={950}>
              <div className="relative animate-float-slow">
                <div className="absolute inset-0 translate-x-3 translate-y-3 rounded-[160px_160px_24px_24px] bg-[#f4f0e8] border border-[#e8e2d9]" />
                <div className="relative w-72 h-96 md:w-80 md:h-[440px] rounded-[160px_160px_24px_24px] overflow-hidden bg-[#eae2d5] border border-[#e8e2d9]">
                  {hasValidImage(profile.hero_photo_url) ? (
                    <img
                      src={profile.hero_photo_url}
                      alt={`${profile.full_name} — Portrait`}
                      className="w-full h-full object-cover object-top"
                    />
                  ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-[#f4f0e8]">
                      <div className="w-24 h-24 rounded-full bg-[#e8e2d9] border border-[#d5cbbe] flex items-center justify-center shadow-xs">
                        <span className="font-serif text-5xl text-[#7d6657] font-medium">
                          {profile.full_name.charAt(0)}
                        </span>
                      </div>
                      <div className="text-center space-y-1 px-6">
                        <p className="text-xs font-mono text-[#7d6657] tracking-wider uppercase">
                          Portrait
                        </p>
                        <p className="text-[10px] text-[#a9937c] leading-relaxed">
                          Upload in Studio CMS (/admin)
                        </p>
                      </div>
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

      {/* ── SELECTED WORK WITH ROLE FILTER ── */}
      <FeaturedProjectsSection
        projects={featuredProjects}
        locale={locale}
        basePath={basePath}
      />

      {/* ── ABOUT / PHILOSOPHY ── */}
      <section className="max-w-6xl mx-auto px-6 py-20 md:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          <ScrollReveal direction="right">
            <div className="space-y-6">
              <span className="text-xs font-mono uppercase tracking-wider text-[#7d6657]">
                {dict.about.eyebrow}
              </span>
              <h2 className="font-serif text-4xl md:text-5xl font-medium tracking-tight text-[#201a16] leading-tight">
                {dict.about.coreValuesTitle}
              </h2>
              <p className="text-base text-[#634f43] leading-relaxed">
                {locale === "fr"
                  ? "Les meilleurs systèmes ne sont pas simplement fonctionnels — ils sont architecturalement honnêtes, visuellement délibérés et cognitivement humains."
                  : "The finest systems are not merely functional — they are architecturally honest, visually deliberate, and cognitively humane. I build at the intersection of machine precision and human nuance."}
              </p>
              <Link
                href={`${basePath}/about`}
                className="inline-flex items-center gap-2 text-sm font-medium text-[#201a16] border-b border-[#201a16] pb-px hover:text-[#634f43] hover:border-[#634f43] transition-colors group"
              >
                <span>
                  {locale === "fr"
                    ? "Lire ma philosophie complète"
                    : "Read my full philosophy"}
                </span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-2 gap-4">
            {philosophyCards.map((card, i) => (
              <ScrollReveal key={card.index} direction="up" delay={i * 100}>
                <div className="h-full bg-[#faf8f5] border border-[#e8e2d9] rounded-2xl p-5 space-y-3 editorial-card-hover">
                  <span className="text-xs font-mono text-[#c7b49e]">
                    {card.index}
                  </span>
                  <h3 className="font-serif text-base font-medium text-[#201a16]">
                    {card.title}
                  </h3>
                  <p className="text-xs text-[#634f43] leading-relaxed">
                    {card.body}
                  </p>
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
                  {dict.about.skillsTitle}
                </span>
                <Link
                  href={`${basePath}/about`}
                  className="text-xs font-mono text-[#7d6657] hover:text-[#201a16] transition-colors"
                >
                  {dict.about.skillsEyebrow} &rarr;
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
                    {dict.home.fromTheJournalEyebrow}
                  </span>
                  <h2 className="font-serif text-4xl md:text-5xl font-medium tracking-tight text-[#201a16]">
                    {dict.home.latestWritingTitle}
                  </h2>
                </div>
                <Link
                  href={`${basePath}/blog`}
                  className="hidden sm:inline-flex items-center gap-2 text-sm font-medium text-[#634f43] hover:text-[#201a16] transition-colors group"
                >
                  <span>{dict.home.readAllArticles}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </ScrollReveal>

            <div className="space-y-0 divide-y divide-[#e8e2d9]">
              {displayedPosts.map((post, i) => {
                const postTitle = localizeField(post, "title", locale);
                const postExcerpt = localizeField(post, "excerpt", locale);
                const readingTime = localizeField(post, "reading_time", locale);
                return (
                  <ScrollReveal key={post.id} direction="up" delay={i * 100}>
                    <Link
                      href={`${basePath}/blog/${post.slug}`}
                      className="group flex flex-col sm:flex-row items-start justify-between gap-6 py-8 hover:bg-transparent transition-colors"
                    >
                      {hasValidImage(post.cover_image) && (
                        <div className="w-full sm:w-44 h-36 sm:h-28 rounded-xl overflow-hidden border border-[#e8e2d9] bg-[#f4f0e8] shrink-0">
                          <img
                            src={post.cover_image}
                            alt={postTitle}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      )}
                      <div className="flex-1 min-w-0 space-y-2">
                        <div className="flex flex-wrap gap-1.5">
                          {post.tags.slice(0, 3).map((tag) => (
                            <span key={tag} className="editorial-tag">
                              {tag}
                            </span>
                          ))}
                        </div>
                        <h3 className="font-serif text-xl md:text-2xl font-medium text-[#201a16] group-hover:text-[#4e3e35] transition-colors leading-tight">
                          {postTitle}
                        </h3>
                        <p className="text-sm text-[#634f43] leading-relaxed line-clamp-2">
                          {postExcerpt}
                        </p>
                        <div className="flex items-center gap-3 text-xs font-mono text-[#7d6657]">
                          {post.published_at && (
                            <span>{formatDate(post.published_at)}</span>
                          )}
                          <span>·</span>
                          <span>{readingTime}</span>
                        </div>
                      </div>
                      <ArrowUpRight className="hidden sm:block w-5 h-5 text-[#c7b49e] group-hover:text-[#7d6657] shrink-0 mt-1 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                    </Link>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ── CONTACT CTA ── */}
      <section className="max-w-6xl mx-auto px-6 py-20 md:py-24">
        <ScrollReveal direction="scale" duration={850}>
          <div className="bg-[#201a16] rounded-3xl px-8 md:px-14 py-14 md:py-16 text-center space-y-6">
            <span className="inline-block text-xs font-mono uppercase tracking-widest text-[#7d6657]">
              {dict.home.ctaEyebrow}
            </span>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium text-white tracking-tight leading-tight">
              {dict.home.ctaHeading}
            </h2>
            <p className="text-base text-[#a9937c] max-w-md mx-auto leading-relaxed">
              {dict.home.ctaBody}
            </p>
            <div className="flex flex-wrap gap-3 justify-center pt-2">
              <Link
                href={`${basePath}/contact`}
                data-analytics-event="cta_click"
                data-analytics-location="home_bottom_cta"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white text-[#201a16] text-sm font-medium tracking-wide hover:bg-[#faf8f5] hover:-translate-y-0.5 transition-all shadow-hover"
              >
                <span>{dict.home.startConversation}</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
              <CalBookingButton
                calUrl={settings.cal_com_url}
                label={dict.home.scheduleCall}
                variant="dark"
                locationTag="home_bottom_cta"
              />
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

