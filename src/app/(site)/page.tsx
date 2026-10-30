import React from "react";
import {
  getProfile,
  getProjects,
  getSkills,
  getBlogPosts,
  getSiteSettings,
} from "@/lib/supabase/db";
import { HomeView } from "@/components/site/HomeView";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function HomePage() {
  const [profile, featuredProjects, skills, latestPosts, settings] = await Promise.all([
    getProfile(),
    getProjects({ featuredOnly: true, publishedOnly: true }),
    getSkills(),
    getBlogPosts({ publishedOnly: true }),
    getSiteSettings(),
  ]);

  return (
    <HomeView
      profile={profile}
      featuredProjects={featuredProjects}
      latestPosts={latestPosts}
      skills={skills}
      settings={settings}
      locale="en"
      basePath="/en"
    />
  );
}
