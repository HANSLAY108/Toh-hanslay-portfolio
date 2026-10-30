import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { createClient } from "@supabase/supabase-js";
import { readCmsStore, writeCmsStore } from "@/lib/cms-store";
import { Skill, Service } from "@/types/database";

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
    skills: store.skills,
    services: store.services,
  });
}

export async function POST(request: NextRequest) {
  try {
    const body: { skills?: Skill[]; services?: Service[] } = await request.json();
    const store = readCmsStore();

    const nextSkills = body.skills !== undefined ? body.skills : store.skills;
    const nextServices = body.services !== undefined ? body.services : store.services;

    writeCmsStore({
      skills: nextSkills,
      services: nextServices,
    });

    let savedToSupabase = false;
    try {
      const supabase = getAdminClient();
      if (supabase) {
        if (body.skills) {
          await supabase.from("skills").delete().neq("id", "00000000-0000-0000-0000-000000000000");
          const { error: sErr } = await supabase.from("skills").insert(
            nextSkills.map((s, i) => ({
              category: s.category,
              name: s.name,
              proficiency_notes: s.proficiency_notes || "",
              order_index: s.order_index || i + 1,
            }))
          );
          if (!sErr) savedToSupabase = true;
        }
        if (body.services) {
          await supabase.from("services").delete().neq("id", "00000000-0000-0000-0000-000000000000");
          const { error: svErr } = await supabase.from("services").insert(
            nextServices.map((sv, i) => ({
              title: sv.title,
              description: sv.description,
              deliverables: sv.deliverables,
              order_index: sv.order_index || i + 1,
              active: sv.active ?? true,
            }))
          );
          if (!svErr) savedToSupabase = true;
        }
      }
    } catch {
      // Local store already updated
    }

    try {
      revalidatePath("/", "layout");
      revalidatePath("/about");
      revalidatePath("/");
    } catch {
      // no-op
    }

    return NextResponse.json({
      success: true,
      savedToSupabase,
      skills: nextSkills,
      services: nextServices,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Update failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

