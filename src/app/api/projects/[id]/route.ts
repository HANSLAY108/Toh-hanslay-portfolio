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

/** GET /api/projects/[id] — fetch a single project */
export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const store = readCmsStore();
  const project = store.projects.find((p) => p.id === id);

  if (!project) {
    return NextResponse.json({ error: "Project not found" }, { status: 404 });
  }
  return NextResponse.json({ project });
}

/** PATCH /api/projects/[id] — update an existing project */
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  try {
    const body: Partial<Project> = await request.json();
    const store = readCmsStore();
    const idx = store.projects.findIndex((p) => p.id === id);

    if (idx === -1) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    const oldSlug = store.projects[idx].slug;
    const updatedProject: Project = {
      ...store.projects[idx],
      ...body,
      id,
      updated_at: new Date().toISOString(),
    };

    const nextProjects = [...store.projects];
    nextProjects[idx] = updatedProject;
    writeCmsStore({ projects: nextProjects });

    let savedToSupabase = false;
    try {
      const supabase = getAdminClient();
      if (supabase) {
        const { error } = await supabase
          .from("projects")
          .upsert([updatedProject], { onConflict: "id" });
        if (!error) savedToSupabase = true;
      }
    } catch {
      // Local store already updated
    }

    try {
      revalidatePath("/", "layout");
      revalidatePath("/");
      revalidatePath("/projects");
      revalidatePath(`/projects/${oldSlug}`);
      revalidatePath(`/projects/${updatedProject.slug}`);
    } catch {
      // no-op
    }

    return NextResponse.json({
      success: true,
      savedToSupabase,
      project: updatedProject,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Update failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

/** DELETE /api/projects/[id] — delete a project */
export async function DELETE(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  try {
    const store = readCmsStore();
    const nextProjects = store.projects.filter((p) => p.id !== id);
    writeCmsStore({ projects: nextProjects });

    let savedToSupabase = false;
    try {
      const supabase = getAdminClient();
      if (supabase) {
        const { error } = await supabase.from("projects").delete().eq("id", id);
        if (!error) savedToSupabase = true;
      }
    } catch {
      // Local store already updated
    }

    try {
      revalidatePath("/", "layout");
      revalidatePath("/");
      revalidatePath("/projects");
    } catch {
      // no-op
    }

    return NextResponse.json({ success: true, savedToSupabase });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Delete failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
