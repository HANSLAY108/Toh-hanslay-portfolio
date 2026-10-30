import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { createClient } from "@supabase/supabase-js";
import { readCmsStore, writeCmsStore } from "@/lib/cms-store";
import { Project } from "@/types/database";

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

/** GET /api/projects — return all projects */
export async function GET() {
  const store = readCmsStore();
  const projects = [...store.projects].sort((a, b) => a.order_index - b.order_index);
  return NextResponse.json({ projects });
}

/** POST /api/projects — create a new project */
export async function POST(request: NextRequest) {
  try {
    const body: Partial<Project> = await request.json();
    const store = readCmsStore();

    const slug =
      body.slug ||
      (body.title || "untitled")
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-");

    const newProject: Project = {
      id: body.id || crypto.randomUUID(),
      slug,
      title: body.title || "Untitled Project",
      summary: body.summary || "",
      category: body.category || "AI Systems",
      tags: body.tags || [],
      cover_image: body.cover_image || "",
      client: body.client || "",
      role: body.role || "",
      year: body.year || new Date().getFullYear().toString(),
      live_url: body.live_url || "",
      github_url: body.github_url || "",
      case_study_content: body.case_study_content || "",
      featured: body.featured ?? true,
      order_index: body.order_index ?? store.projects.length + 1,
      published: body.published ?? true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const updatedProjects = [...store.projects, newProject];
    writeCmsStore({ projects: updatedProjects });

    let savedToSupabase = false;
    try {
      const supabase = getAdminClient();
      if (supabase) {
        const { error } = await supabase
          .from("projects")
          .upsert([newProject], { onConflict: "id" });
        if (!error) savedToSupabase = true;
      }
    } catch {
      // Local store already updated
    }

    try {
      revalidatePath("/", "layout");
      revalidatePath("/");
      revalidatePath("/projects");
      revalidatePath(`/projects/${newProject.slug}`);
    } catch {
      // no-op
    }

    return NextResponse.json({
      success: true,
      savedToSupabase,
      project: newProject,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Create failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
