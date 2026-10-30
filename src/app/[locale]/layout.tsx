import React from "react";
import { notFound } from "next/navigation";
import "@/app/globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SmoothScrollProvider } from "@/components/ui/SmoothScrollProvider";
import { getProfile, getSiteSettings } from "@/lib/supabase/db";
import { isValidLocale, localizeField, type Locale } from "@/lib/i18n/dictionaries";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";
export const revalidate = 0;

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: {
    locale: string;
  };
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const locale: Locale = isValidLocale(params.locale) ? params.locale : "en";
  const settings = await getSiteSettings();
  const title = localizeField(settings, "site_title", locale);
  const description = localizeField(settings, "meta_description", locale);

  return {
    title,
    description,
    keywords: settings.keywords,
    alternates: {
      canonical: `/${locale}`,
      languages: {
        en: "/en",
        fr: "/fr",
        "x-default": "/en",
      },
    },
    openGraph: {
      title,
      description,
      type: "website",
      locale: locale === "fr" ? "fr_FR" : "en_US",
      alternateLocale: locale === "fr" ? ["en_US"] : ["fr_FR"],
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  if (!isValidLocale(params.locale)) {
    notFound();
  }

  const locale: Locale = params.locale;
  const [profile, settings] = await Promise.all([
    getProfile(),
    getSiteSettings(),
  ]);

  const footerText = localizeField(settings, "footer_text", locale);
  const footerLocation =
    localizeField(settings, "footer_location", locale) ||
    localizeField(profile, "location", locale);
  const footerCopyright = localizeField(settings, "footer_copyright", locale);
  const footerTechStack = localizeField(settings, "footer_tech_stack", locale);

  return (
    <SmoothScrollProvider>
      <div className="flex flex-col min-h-screen" lang={locale}>
        <Navbar
          availableForWork={profile.available_for_work}
          fullName={profile.full_name}
          calUrl={settings.cal_com_url}
          locale={locale}
        />
        <main className="flex-1">{children}</main>
        <Footer
          fullName={profile.full_name}
          footerText={footerText}
          location={footerLocation}
          footerVersion={settings.footer_version}
          footerCopyright={footerCopyright}
          footerTechStack={footerTechStack}
          socials={profile.socials}
          locale={locale}
          basePath={`/${locale}`}
        />
      </div>
    </SmoothScrollProvider>
  );
}
