import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SmoothScrollProvider } from "@/components/ui/SmoothScrollProvider";
import { getProfile, getSiteSettings } from "@/lib/supabase/db";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  return {
    title: settings.site_title,
    description: settings.meta_description,
    keywords: settings.keywords,
  };
}

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [profile, settings] = await Promise.all([
    getProfile(),
    getSiteSettings(),
  ]);

  return (
    <SmoothScrollProvider>
      <div className="flex flex-col min-h-screen">
        <Navbar
          availableForWork={profile.available_for_work}
          fullName={profile.full_name}
          calUrl={settings.cal_com_url}
        />
        <main className="flex-1">{children}</main>
        <Footer
          fullName={profile.full_name}
          footerText={settings.footer_text}
          location={settings.footer_location || profile.location}
          footerVersion={settings.footer_version}
          footerCopyright={settings.footer_copyright}
          footerTechStack={settings.footer_tech_stack}
          socials={profile.socials}
        />
      </div>
    </SmoothScrollProvider>
  );
}
