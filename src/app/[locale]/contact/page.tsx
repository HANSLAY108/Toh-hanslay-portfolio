import React from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProfile, getSiteSettings } from "@/lib/supabase/db";
import { ContactView } from "@/components/site/ContactView";
import { getDictionary, isValidLocale, localizeField, type Locale } from "@/lib/i18n/dictionaries";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const locale: Locale = isValidLocale(params.locale) ? params.locale : "en";
  const dict = getDictionary(locale);
  const settings = await getSiteSettings();
  const title = `${dict.nav.contact} — Hanslay`;
  const description =
    localizeField(settings, "contact_description", locale) ||
    dict.contact.bookCallSubtitle;

  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}/contact`,
      languages: {
        en: "/en/contact",
        fr: "/fr/contact",
        "x-default": "/en/contact",
      },
    },
    openGraph: {
      title,
      description,
      locale: locale === "fr" ? "fr_FR" : "en_US",
    },
  };
}

export default async function LocaleContactPage({
  params,
}: {
  params: { locale: string };
}) {
  if (!isValidLocale(params.locale)) {
    notFound();
  }

  const locale: Locale = params.locale;
  const [profile, settings] = await Promise.all([
    getProfile(),
    getSiteSettings(),
  ]);

  return (
    <ContactView
      profile={profile}
      settings={settings}
      locale={locale}
    />
  );
}
