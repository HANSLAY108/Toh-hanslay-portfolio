import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { createClient } from "@supabase/supabase-js";
import { readCmsStore, writeCmsStore } from "@/lib/cms-store";
import { SiteSettings } from "@/types/database";

export const dynamic = "force-dynamic";

function getAdminClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const serviceKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    "";
  if (!supabaseUrl || !serviceKey) return null;
  return createClient(supabaseUrl, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

export async function GET() {
  const store = readCmsStore();
  return NextResponse.json({
    settings: store.siteSettings,
    socials: store.profile.socials,
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { socials, ...settingsFields } = body;
    const store = readCmsStore();

    const updatedSettings: SiteSettings = {
      ...store.siteSettings,
      ...settingsFields,
    };

    // Sync shared fields (available_for_work, email, location, socials) with profile
    const updatedProfile = {
      ...store.profile,
      ...(settingsFields.available_for_work !== undefined && {
        available_for_work: settingsFields.available_for_work,
      }),
      ...(settingsFields.contact_email !== undefined && {
        email: settingsFields.contact_email,
      }),
      ...(settingsFields.contact_location !== undefined && {
        location: settingsFields.contact_location,
      }),
      ...(socials !== undefined && {
        socials: { ...store.profile.socials, ...socials },
      }),
    };

    writeCmsStore({
      siteSettings: updatedSettings,
      profile: updatedProfile,
    });

    let savedToSupabase = false;
    try {
      const supabase = getAdminClient();
      if (supabase) {
        const { data: existing } = await supabase
          .from("site_settings")
          .select("id")
          .limit(1);
        if (existing && existing.length > 0) {
          const { error } = await supabase
            .from("site_settings")
            .update({
              site_title: updatedSettings.site_title,
              meta_description: updatedSettings.meta_description,
              keywords: updatedSettings.keywords,
              og_image_url: updatedSettings.og_image_url,
              contact_email: updatedSettings.contact_email,
              footer_text: updatedSettings.footer_text,
              available_for_work: updatedSettings.available_for_work,
              updated_at: new Date().toISOString(),
            })
            .eq("id", existing[0].id);
          if (!error) savedToSupabase = true;
        }
      }
    } catch {
      // Local store already updated
    }

    try {
      revalidatePath("/", "layout");
      revalidatePath("/");
      revalidatePath("/about");
      revalidatePath("/contact");
    } catch {
      // no-op
    }

    return NextResponse.json({
      success: true,
      savedToSupabase,
      settings: updatedSettings,
      socials: updatedProfile.socials,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Update failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
