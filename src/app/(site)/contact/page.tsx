import React from "react";
import type { Metadata } from "next";
import { getProfile, getSiteSettings } from "@/lib/supabase/db";
import { ContactView } from "@/components/site/ContactView";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title: "Contact — Hanslay",
  description: "Inquire about consulting, technical architecture, AI systems, or editorial brand identity projects.",
  alternates: {
    canonical: "/en/contact",
    languages: {
      en: "/en/contact",
      fr: "/fr/contact",
      "x-default": "/en/contact",
    },
  },
};

export default async function ContactPage() {
  const [profile, settings] = await Promise.all([
    getProfile(),
    getSiteSettings(),
  ]);

  return (
    <ContactView
      profile={profile}
      settings={settings}
      locale="en"
    />
  );
}
