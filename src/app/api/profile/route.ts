import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { createClient } from "@supabase/supabase-js";
import { readCmsStore, writeCmsStore } from "@/lib/cms-store";
import { Profile } from "@/types/database";

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
  return NextResponse.json({ profile: store.profile });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const store = readCmsStore();
    const current = store.profile;

    const updatedProfile: Profile = {
      ...current,
      ...(body.full_name !== undefined && { full_name: body.full_name }),
      ...(body.tagline !== undefined && { tagline: body.tagline }),
      ...(body.bio !== undefined && { bio: body.bio }),
      ...(body.hero_photo_url !== undefined && { hero_photo_url: body.hero_photo_url }),
      ...(body.cv_url !== undefined && { cv_url: body.cv_url }),
      ...(body.location !== undefined && { location: body.location }),
      ...(body.email !== undefined && { email: body.email }),
      ...(body.available_for_work !== undefined && { available_for_work: body.available_for_work }),
      ...(body.socials !== undefined && { socials: { ...current.socials, ...body.socials } }),
      ...(body.metrics !== undefined && { metrics: { ...current.metrics, ...body.metrics } }),
      updated_at: new Date().toISOString(),
    };

    // Also keep siteSettings available_for_work & contact_email in sync
    const updatedSettings = {
      ...store.siteSettings,
      ...(body.available_for_work !== undefined && { available_for_work: body.available_for_work }),
      ...(body.email !== undefined && { contact_email: body.email }),
    };

    writeCmsStore({
      profile: updatedProfile,
      siteSettings: updatedSettings,
    });

    let savedToSupabase = false;
    try {
      const supabase = getAdminClient();
      if (supabase) {
        const { error } = await supabase
          .from("profiles")
          .upsert([updatedProfile], { onConflict: "id" });
        if (!error) savedToSupabase = true;
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
      // No-op if not needed
    }

    return NextResponse.json({
      success: true,
      savedToSupabase,
      profile: updatedProfile,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Update failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
