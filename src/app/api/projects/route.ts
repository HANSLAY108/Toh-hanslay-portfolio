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
      title_fr: body.title_fr || "",
      summary: body.summary || "",
      summary_fr: body.summary_fr || "",
      category: body.category || "AI Systems",
      roles: body.roles && body.roles.length > 0 ? body.roles : ["Software"],
      tags: body.tags || [],
      tech_stack: body.tech_stack && body.tech_stack.length > 0 ? body.tech_stack : body.tags || [],
      cover_image: body.cover_image || "",
      client: body.client || "",
      role: body.role || "",
      role_fr: body.role_fr || "",
      timeline: body.timeline || "",
      timeline_fr: body.timeline_fr || "",
      year: body.year || new Date().getFullYear().toString(),
      live_url: body.live_url || "",
      github_url: body.github_url || "",
      problem: body.problem || "",
      problem_fr: body.problem_fr || "",
      process: body.process || "",
      process_fr: body.process_fr || "",
      solution: body.solution || "",
      solution_fr: body.solution_fr || "",
      results: body.results || [],
      case_study_content: body.case_study_content || "",
      case_study_content_fr: body.case_study_content_fr || "",
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
      revalidatePath("/en");
      revalidatePath("/fr");
      revalidatePath("/projects");
      revalidatePath("/en/projects");
      revalidatePath("/fr/projects");
      revalidatePath(`/projects/${newProject.slug}`);
      revalidatePath(`/en/projects/${newProject.slug}`);
      revalidatePath(`/fr/projects/${newProject.slug}`);
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
