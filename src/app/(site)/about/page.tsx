import React from "react";
import type { Metadata } from "next";
import { getProfile, getSkills, getServices } from "@/lib/supabase/db";
import { AboutView } from "@/components/site/AboutView";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title: "About — Hanslay",
  description: "Background, philosophy, technical stack, and multidisciplinary capabilities of Hanslay.",
  alternates: {
    canonical: "/en/about",
    languages: {
      en: "/en/about",
      fr: "/fr/about",
      "x-default": "/en/about",
    },
  },
};

export default async function AboutPage() {
  const [profile, skills, services] = await Promise.all([
    getProfile(),
    getSkills(),
    getServices(),
  ]);

  return (
    <AboutView
      profile={profile}
      skills={skills}
      services={services}
      locale="en"
      basePath="/en"
    />
  );
}
